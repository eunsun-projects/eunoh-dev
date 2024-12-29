/*! For license information please see 136.js.LICENSE.txt */
(self.webpackChunkmp_webgl = self.webpackChunkmp_webgl || []).push([
  [136],
  {
    80862: () => {},
    11669: () => {},
    51132: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => C });
      var n = i(933),
        s = i(34608),
        a = i(4763),
        o = i(45796),
        r = i(82863),
        d = i(57793),
        c = i(31740),
        l = i(59452),
        h = i(81619),
        u = i(56253),
        m = i(16928),
        p = i(90129),
        g = i(78383),
        v = i(64150),
        y = i(20360),
        f = i(38496),
        w = i(30922),
        b = i(74565),
        T = i(56620);
      class C extends n.Y {
        constructor() {
          super(...arguments), (this.name = 'quick-menus');
        }
        async init(e, t) {
          (this.settingsModule = await t.getModuleBySymbol(s.Ak)),
            (this.scanInfoDataModule = await t.getModuleBySymbol(a.$q)),
            (this.settingsGui = this.settingsModule.getSettingsGui());
          const i = await t.getModuleBySymbol(o.DeepLinksModuleKey),
            n = await t.market.waitForData(c.Z),
            C = await t.market.waitForData(v.e),
            E = await t.market.waitForData(d.M);
          this.uIndex = this.settingsGui.addPanel('Link to location', [y.R.U], {
            allowSubGroups: !1,
            width: 400,
            ratio: 90,
          });
          const D = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, y.R.O];
          (this.oIndex = this.settingsGui.addPanel('Scan Info', D, {
            allowSubGroups: !1,
            width: 400,
            ratio: 75,
          })),
            (this.pIndex = this.settingsGui.addPanel('Quick settings', [y.R.P], {
              allowSubGroups: !1,
            })),
            this.settingsGui.loadPromise.then(() => {
              this.settingsGui.addControl(this.uIndex, '', 'Link', {}),
                this.settingsGui.addButton(this.uIndex, '', 'Copy to clipboard', () => {
                  const e = document.createElement('input');
                  (e.type = 'text'),
                    (e.value = this.buildLink(i)),
                    document.body.appendChild(e),
                    e.select(),
                    document.execCommand('copy'),
                    document.body.removeChild(e);
                }),
                this.settingsGui.toggle(this.uIndex),
                this.settingsGui.addControl(this.oIndex, '', 'Scan ID', {}),
                this.settingsGui.addControl(this.oIndex, '', 'Anchor ID', {}),
                this.settingsGui.addControl(this.oIndex, '', 'Created', {}),
                this.settingsGui.addControl(this.oIndex, '', 'Time of Day', {}),
                this.settingsGui.addControl(this.oIndex, '', 'Alignment', {}),
                this.settingsGui.addControl(this.oIndex, '', 'Options', {}),
                this.settingsGui.addControl(this.oIndex, '', 'Camera', {}),
                this.settingsGui.addControl(this.oIndex, '', 'Camera Types', {}),
                this.settingsGui.addControl(this.oIndex, '', 'Sensor Serials', {}),
                this.settingsGui.addControl(this.oIndex, '', 'Serial Number', {}),
                this.settingsGui.addControl(this.oIndex, '', 'Mount Calibration', {}),
                this.settingsGui.addControl(this.oIndex, '', 'Software Version', {}),
                this.settingsGui.addButton(this.oIndex, '', 'Copy Scan ID', async () => {
                  if (n.currentSweepObject) {
                    const e = await this.scanInfoDataModule.getScanInfo(
                      n.currentSweepObject.platformId,
                    );
                    if (e) {
                      const t = document.createElement('input');
                      (t.type = 'text'),
                        (t.value = e.id),
                        document.body.appendChild(t),
                        t.select(),
                        document.execCommand('copy'),
                        document.body.removeChild(t);
                    }
                  }
                }),
                this.settingsGui.addButton(this.oIndex, '', 'Download Scan', async () => {
                  if (n.currentSweepObject) {
                    const e = await this.scanInfoDataModule.getScanDownloadURL(
                      n.currentSweepObject.platformId,
                    );
                    e && window.open(e);
                  }
                }),
                this.settingsGui.toggle(this.oIndex);
              const e = h.WI * (180 / Math.PI) * 60;
              this.settingsGui.addControl(this.pIndex, '', m.U, !0),
                this.settingsGui.addControl(this.pIndex, '', f.s, !0),
                this.settingsGui.addControl(this.pIndex, '', w.re, !0),
                this.settingsGui.addControl(this.pIndex, '', b.b, !0),
                this.settingsGui.addSlider(this.pIndex, '', T.NR, T.Kb, 0, 100, 1),
                this.settingsGui.addSlider(this.pIndex, '', u.lookAccelerationKey, e, 0.25, 10, 2),
                this.settingsGui.addSlider(
                  this.pIndex,
                  '',
                  r.baseTransitionSpeedKey,
                  l.ZP.camera.baseTransitionTime,
                  1,
                  5e3,
                  0,
                );
              const t = C.tryGetProperty(p.EU, p.Im);
              this.settingsGui.addSlider(this.pIndex, '', p.WQ, (0, g.JG)(t), 0.5, 10, 2),
                this.settingsGui.toggle(this.pIndex),
                this.settingsModule.registerSetting('Quick settings', u.lookAccelerationKey, e, !1),
                this.settingsModule.registerSetting(
                  'Quick settings',
                  r.baseTransitionSpeedKey,
                  l.ZP.camera.baseTransitionTime,
                  !1,
                ),
                this.settingsModule.registerSetting('Quick settings', T.NR, T.Kb, !1),
                this.settingsGui.onToggle(this.uIndex, (e) => {
                  e && this.settingsGui.updateSetting(this.uIndex, 'Link', this.buildLink(i));
                }),
                this.settingsGui.onToggle(this.oIndex, (e) => {
                  e && this.refreshScanInfo(n);
                }),
                E.pose.onChanged(() => {
                  this.settingsGui.isLoaded &&
                    this.settingsGui.isVisible(this.uIndex) &&
                    this.settingsGui.updateSetting(this.uIndex, 'Link', this.buildLink(i)),
                    this.settingsGui.isLoaded &&
                      this.settingsGui.isVisible(this.oIndex) &&
                      this.refreshScanInfo(n);
                }),
                C.onPropertyChanged(p.WQ, (e) => {
                  C.setProperty(p.EU, (0, g.HG)(e));
                });
            });
        }
        refreshScanInfo(e) {
          e.currentSweep
            ? this.scanInfoDataModule.getScanInfo(e.currentSweep).then((e) => {
                this.updateScanInfo(e);
              })
            : this.updateScanInfo(void 0);
        }
        updateScanInfo(e) {
          this.settingsGui.updateSetting(this.oIndex, 'Scan ID', e ? e.id : ''),
            this.settingsGui.updateSetting(this.oIndex, 'Anchor ID', e ? e.anchorId : ''),
            this.settingsGui.updateSetting(this.oIndex, 'Created', e ? e.created : ''),
            this.settingsGui.updateSetting(this.oIndex, 'Time of Day', e ? e.timeOfDay : ''),
            this.settingsGui.updateSetting(this.oIndex, 'Alignment', e ? e.alignment : ''),
            this.settingsGui.updateSetting(
              this.oIndex,
              'Options',
              e ? JSON.stringify(e.options) : '',
            ),
            this.settingsGui.updateSetting(
              this.oIndex,
              'Camera',
              e ? `${e.camera.vendor} ${e.camera.model}` : '',
            ),
            this.settingsGui.updateSetting(
              this.oIndex,
              'Camera Types',
              e ? JSON.stringify(e.camera.cameraTypes) : '',
            ),
            this.settingsGui.updateSetting(
              this.oIndex,
              'Sensor Serials',
              e ? JSON.stringify(e.camera.sensorSerialNumbers) : '',
            ),
            this.settingsGui.updateSetting(
              this.oIndex,
              'Serial Number',
              e ? e.camera.serialNumber : '',
            ),
            this.settingsGui.updateSetting(
              this.oIndex,
              'Mount Calibration',
              e ? e.camera.mountCalibrationVersion : '',
            ),
            this.settingsGui.updateSetting(
              this.oIndex,
              'Software Version',
              e ? e.camera.softwareVersion : '',
            );
        }
        buildLink(e) {
          return decodeURIComponent(e.creator.createDeepLink().href);
        }
      }
    },
    5494: (e, t, i) => {
      'use strict';
      i.d(t, { o: () => n });
      class n {
        constructor(e) {
          this.config = e;
        }
        serialize(e) {
          const { serializer: t } = this.config;
          if (!e || !Array.isArray(e) || !t) return null;
          const i = [];
          for (const n of e) {
            const e = t.serialize(n);
            e && i.push(e);
          }
          return i;
        }
        deserialize(e) {
          const { deserializer: t } = this.config;
          if (!e || !Array.isArray(e) || !t) return null;
          const i = [];
          for (const n of e) {
            const e = t.deserialize(n);
            e && i.push(e);
          }
          return i;
        }
      }
    },
    40232: (e, t, i) => {
      'use strict';
      var n;
      function s(e) {
        const t = new Date();
        t.setHours(0, 0, 0, 0), e.setHours(0, 0, 0, 0);
        const i = (t.getTime() - e.getTime()) / 864e5;
        if (0 === i) return n.TODAY;
        if (1 === i) return n.YESTERDAY;
        if (i < 7) return n.THIS_WEEK;
        const s = Math.floor(i / 7);
        return 1 === s
          ? n.ONE_WEEK_AGO
          : 2 === s
            ? n.TWO_WEEKS_AGO
            : 3 === s
              ? n.THREE_WEEKS_AGO
              : n.OLDER;
      }
      i.d(t, { Z: () => n, f: () => s }),
        (function (e) {
          (e.TODAY = 'TODAY'),
            (e.YESTERDAY = 'YESTERDAY'),
            (e.THIS_WEEK = 'THIS_WEEK'),
            (e.ONE_WEEK_AGO = 'ONE_WEEK_AGO'),
            (e.TWO_WEEKS_AGO = 'TWO_WEEKS_AGO'),
            (e.THREE_WEEKS_AGO = 'THREE_WEEKS_AGO'),
            (e.OLDER = 'OLDER');
        })(n || (n = {}));
    },
    25100: (e, t, i) => {
      'use strict';
      var n;
      i.d(t, { J: () => n }),
        (function (e) {
          (e.NOTE = 'note'), (e.TAG = 'tag'), (e.OBJECT = 'object');
        })(n || (n = {}));
    },
    62402: (e, t, i) => {
      'use strict';
      i.d(t, { s: () => x });
      var n = i(85893),
        s = i(94184),
        a = i.n(s),
        o = i(67294),
        r = i(38908),
        d = i(51141);
      const c = (0, r.u)(d.b);
      function l(e) {
        const t = c(),
          [i, n] = (0, o.useState)(h(t, e));
        return (
          (0, o.useEffect)(() => {
            if (!t) return () => {};
            function i() {
              n(h(t, e));
            }
            const s = t[e].onChanged(i);
            return i(), () => s.cancel();
          }, [t, e]),
          i
        );
      }
      function h(e, t) {
        return e ? e[t].values : [];
      }
      var u = i(25100),
        m = i(50645),
        p = i(38772),
        g = i(29707),
        v = i(25629),
        y = i(12437),
        f = i(15811),
        w = i(7321),
        b = i(80308),
        T = function (e, t, i, n) {
          var s,
            a = arguments.length,
            o = a < 3 ? t : null === n ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
          if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
            o = Reflect.decorate(e, t, i, n);
          else
            for (var r = e.length - 1; r >= 0; r--)
              (s = e[r]) && (o = (a < 3 ? s(o) : a > 3 ? s(t, i, o) : s(t, i)) || o);
          return a > 3 && o && Object.defineProperty(t, i, o), o;
        },
        C = function (e, t) {
          if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
            return Reflect.metadata(e, t);
        };
      const { ATTACHMENTS: E } = w.Z.SHOWCASE;
      let D = class extends o.Component {
        constructor(e) {
          super(e),
            (this.setContainerRef = (e) => {
              this.setState({ containerRef: e });
            }),
            (this.handleCancelClick = (e) => {
              e.preventDefault(), this.context.commandBinder.issueCommand(new v.sE(this.props.id));
            }),
            (this.onRemoveFailed = (e) => {
              const { id: t, error: i } = this.props;
              i && (e.stopPropagation(), this.context.commandBinder.issueCommand(new v.Rh(t)));
            }),
            (this.state = { containerRef: null });
        }
        render() {
          const { className: e, error: t, progress: i, fileName: s } = this.props;
          let o = E.ERROR_UPLOAD_FAIL;
          const r = this.context.locale.t(E.REMOVE_TOOLTIP),
            d = t ? this.onRemoveFailed : this.handleCancelClick;
          switch (t) {
            case y.kV.FILE_TOO_LARGE:
              o = E.ERROR_FILE_TOO_LARGE;
              break;
            case y.kV.EMPTY_FILE:
              o = E.ERROR_EMPTY_FILE;
              break;
            case y.kV.OVER_QUOTA:
              o = E.ERROR_OVER_QUOTA;
              break;
            case y.kV.PERMISSION_DENIED:
              o = E.ERROR_PERMISSION_DENIED;
          }
          const c = t ? this.context.locale.t(o) : s,
            l = { 'upload-error': !!t };
          return (0, n.jsxs)(
            'div',
            Object.assign(
              { className: a()('attachment', 'attachment-upload', l, e) },
              {
                children: [
                  (0, n.jsx)(
                    'div',
                    Object.assign(
                      { ref: this.setContainerRef, className: 'upload-status' },
                      {
                        children: t
                          ? (0, n.jsx)(b.JO, { name: 'error', size: b.Jh.MEDIUM })
                          : (0, n.jsx)(f.$, { progress: i, innerRadius: 20, barWidth: 4 }),
                      },
                    ),
                  ),
                  (0, n.jsx)(b.u, { target: this.state.containerRef, title: c }),
                  (0, n.jsx)(b.zx, {
                    icon: 'close',
                    className: 'attachment-delete',
                    size: b.qE.SMALL,
                    variant: b.Wu.FAB,
                    theme: 'dark',
                    tooltip: r,
                    tooltipOptions: { placement: 'bottom-start' },
                    onClick: d,
                  }),
                ],
              },
            ),
          );
        }
      };
      function x(e) {
        const {
            inline: t,
            canDelete: i,
            attachments: s,
            annotationType: o,
            nonViewable: r,
            children: d,
            parentId: c,
            onViewAttachment: h,
          } = e,
          p = l('uploads'),
          g = l('failures'),
          v = (e, t) => {
            h && h(t);
          },
          y = (e) =>
            c !== e.parentId
              ? null
              : (0, n.jsx)(
                  D,
                  {
                    id: e.id,
                    fileName: e.file.name,
                    className: 'inline',
                    progress: e.progress,
                    error: e.error,
                  },
                  e.id,
                ),
          f = o === u.J.NOTE;
        return (0, n.jsxs)(
          'div',
          Object.assign(
            {
              className: a()('annotation-attachments', {
                'annotation-attachments-inline': !!t,
                'annotation-attachments-preview': !r,
                'annotation-attachments-list': r,
              }),
            },
            {
              children: [
                s.map((e, a) => {
                  const o = s.length,
                    d = !t && !r && (1 === o || (0 === a && o > 2));
                  let c, l;
                  return (
                    f && (t ? ((c = 60), (l = 60)) : d || ((c = 140), (l = 140))),
                    (0, n.jsx)(
                      m.P,
                      {
                        attachment: e,
                        inline: !!t,
                        canDelete: !!i,
                        hero: d,
                        onClick: v,
                        thumbnail: !!t || !d,
                        width: c,
                        height: l,
                      },
                      e.id,
                    )
                  );
                }),
                p && p.map(y),
                g && g.map(y),
                d,
              ],
            },
          ),
        );
      }
      (D.contextType = g.I), (D = T([p.Z, C('design:paramtypes', [Object])], D));
    },
    60770: (e, t, i) => {
      'use strict';
      i.d(t, { w: () => Se });
      var n = i(85893),
        s = i(30922),
        a = i(38386),
        o = i(40475),
        r = i(27163),
        d = i(43948),
        c = i(77963),
        l = i(67294),
        h = i(94184),
        u = i.n(h),
        m = i(25100),
        p = i(73515),
        g = i(7555),
        v = i(46629),
        y = i(26143),
        f = i(86388);
      const {
          UP: w,
          DOWN: b,
          LEFT: T,
          RIGHT: C,
          UP_LEFT: E,
          UP_RIGHT: D,
          DOWN_LEFT: x,
          DOWN_RIGHT: A,
        } = v.Od,
        O = (0, l.memo)(({ className: e, onClick: t, children: i }) => {
          const s = (0, y.v)(),
            [a, o] = (0, l.useState)(null),
            { width: r, height: d, ref: c } = (0, f.Z)(),
            [{ width: h, height: m }, p] = (0, l.useState)({ width: 0, height: 0 }),
            { ref: g } = (0, f.Z)({
              onResize: ({ width: e, height: t }) => {
                null === a && p({ width: e || 0, height: t || 0 });
              },
            });
          let v;
          if (
            ((0, l.useEffect)(() => {
              if (r && d && h && m && s) {
                let e = a;
                const t = s.y < m,
                  i = s.y > d - m,
                  n = s.x < h,
                  c = s.x > r - h;
                t && i
                  ? (e = c && !n ? T : C)
                  : t
                    ? (e = n ? A : c ? x : b)
                    : i
                      ? (e = n ? D : c ? E : w)
                      : n && c
                        ? (e = t ? b : w)
                        : n
                          ? (e = C)
                          : c
                            ? (e = T)
                            : null === e && (e = C),
                  e !== a && o(e);
              }
            }, [s, r, d, h, m, a]),
            r && s)
          ) {
            v = a === C && s.x > r - h ? r - s.x : void 0;
          }
          return (0, n.jsx)(
            'div',
            Object.assign(
              { ref: c, className: 'annotations-preview-layer' },
              {
                children:
                  s &&
                  i &&
                  (0, n.jsx)(
                    'div',
                    Object.assign(
                      {
                        ref: g,
                        className: u()('annotation-preview', `annotation-preview-${a}`, e),
                        style: {
                          top: s.y,
                          left: s.x,
                          visibility: null === a ? 'hidden' : void 0,
                          width: v,
                        },
                        onClick: t,
                      },
                      { children: i },
                    ),
                  ),
              },
            ),
          );
        });
      var S = i(59537);
      function P(e) {
        const t = (function () {
          const [, e] = (0, l.useState)(0);
          return (0, l.useCallback)(() => {
            e((e) => e + 1);
          }, []);
        })();
        return (
          (0, l.useEffect)(() => {
            if ((t(), null != e)) {
              const i = e.onChanged(t);
              return () => {
                i.cancel();
              };
            }
            return () => {};
          }, [e, t]),
          e
        );
      }
      var I = i(29707),
        k = i(27444),
        N = i(54297),
        R = i(7321),
        M = i(78897),
        j = i(92394);
      const { NOTES: L } = R.Z.SHOWCASE;
      function B({ comment: e, noteView: t }) {
        const i = t ? t.created : e.created,
          { userData: s } = (0, l.useContext)(I.I),
          a = (0, M.b)(),
          o = t ? t.user.email : e.user.email,
          r = s.getUserDisplay(o),
          d = r.color,
          c = t ? t.comments.length - 1 : 0,
          h = a.t(L.REPLIES, c),
          u =
            '' === e.text && !(e.attachments.length > 0)
              ? a.t(L.CONTENT_DELETED)
              : i.toLocaleString();
        return (0, n.jsxs)(
          'header',
          Object.assign(
            { className: 'note-header' },
            {
              children: [
                (0, n.jsx)(j.C, { label: r.initials, badgeStyle: { color: d, borderColor: d } }),
                (0, n.jsxs)(
                  'div',
                  Object.assign(
                    { className: 'note-details' },
                    {
                      children: [
                        (0, n.jsx)(
                          'span',
                          Object.assign({ className: 'note-user' }, { children: r.name }),
                        ),
                        c > 0 &&
                          (0, n.jsx)(
                            'span',
                            Object.assign(
                              { className: 'note-summary-info note-replies' },
                              { children: h },
                            ),
                          ),
                        (0, n.jsx)(
                          'div',
                          Object.assign({ className: 'note-subheader' }, { children: u }),
                        ),
                      ],
                    },
                  ),
                ),
              ],
            },
          ),
        );
      }
      var V = i(64474);
      function F(e) {
        const { attachments: t } = e,
          { analytics: i } = (0, l.useContext)(I.I);
        if (!(t.length > 0)) return null;
        return (0, n.jsx)(V.T, {
          attachments: t,
          onClick: (t, n) => {
            i.trackToolGuiEvent('notes', 'notes_preview_click_attachment'),
              t.stopPropagation(),
              e.onClick(n);
          },
        });
      }
      var _ = i(58894),
        H = i(46785),
        U = i(13819);
      function G({ text: e, noteId: t }) {
        const i = (0, H.l)(),
          s = (0, U.x)();
        return (0, n.jsx)(
          'div',
          Object.assign(
            { className: u()('note-post', { 'note-summary-info': !e }) },
            {
              children:
                e &&
                i &&
                (0, n.jsx)(_.e, {
                  text: e,
                  textParser: i,
                  linkHandler: s,
                  maxLength: 150,
                  annotationType: m.J.NOTE,
                  annotationId: t,
                }),
            },
          ),
        );
      }
      var z = i(62402);
      function W(e) {
        const t = (0, M.b)(),
          { moreAttachmentsCount: i } = e;
        if (0 === i) return null;
        const s = t.t(R.Z.SHOWCASE.ATTACHMENTS.MORE_ATTACHMENT, i);
        return (0, n.jsx)(
          'div',
          Object.assign(
            { className: 'attachment attachments-truncated' },
            {
              children: (0, n.jsx)(
                'div',
                Object.assign(
                  { className: 'attachment-view attachment-other ' },
                  {
                    children: (0, n.jsx)(
                      'div',
                      Object.assign(
                        { className: 'attachment-label' },
                        {
                          children: (0, n.jsx)(
                            'div',
                            Object.assign({ className: 'file-label' }, { children: s }),
                          ),
                        },
                      ),
                    ),
                  },
                ),
              ),
            },
          ),
        );
      }
      var $ = i(39262),
        K = i(20470);
      const { ANNOTATIONS: Z } = R.Z.SHOWCASE;
      function Y(e) {
        const { previewId: t } = e,
          i = (0, l.useRef)(null),
          s = (0, M.b)(),
          { commandBinder: a } = (0, l.useContext)(I.I),
          o = (0, k.e)(t),
          r = (0, N.V)(t);
        if (
          ((0, l.useEffect)(() => (r && i.current && i.current.focus(), () => {}), [i.current, r]),
          !r)
        )
          return null;
        const d = r.comments.get(0),
          c = d && d.attachments.length > 0,
          h = d.attachments.values(),
          g = (0, $.Ug)(h),
          v = (0, $.ae)(h),
          y = v.slice(0, K.Ii),
          f = Math.max(v.length - K.Ii, 0),
          w = r.comments.length > 1 || f > 0,
          b = s.t(Z.READ_MORE_MESSAGE),
          T = u()('annotation-preview-contents', 'note-preview-contents', { 'viewable-media': c });
        return (0, n.jsxs)(
          'div',
          Object.assign(
            {
              ref: i,
              role: 'dialog',
              tabIndex: 0,
              className: T,
              onClick: (t) => {
                t.stopPropagation(), e.onClick();
              },
              onKeyDown: (e) => {
                'Escape' === e.code && (e.stopPropagation(), a.issueCommand(new p.G5()));
              },
            },
            {
              children: [
                d &&
                  (0, n.jsxs)(n.Fragment, {
                    children: [
                      (0, n.jsx)(F, { attachments: g, onClick: e.onClick }),
                      (0, n.jsx)(B, { noteView: r, comment: d }),
                      (0, n.jsx)(G, { text: d.text, noteId: t }),
                      (0, n.jsx)(
                        z.s,
                        Object.assign(
                          { annotationType: m.J.NOTE, attachments: y },
                          { children: (0, n.jsx)(W, { moreAttachmentsCount: f }) },
                        ),
                      ),
                    ],
                  }),
                o &&
                  (0, n.jsxs)(
                    'div',
                    Object.assign(
                      { className: 'nested-comment-preview' },
                      {
                        children: [
                          (0, n.jsx)(B, { comment: o }),
                          (0, n.jsx)(G, { text: o.text, noteId: t }),
                        ],
                      },
                    ),
                  ),
                w &&
                  (0, n.jsx)(
                    'div',
                    Object.assign({ className: 'link link-more' }, { children: b }),
                  ),
              ],
            },
          ),
        );
      }
      var J = i(75287),
        q = i(42966),
        Q = i(74608),
        X = i(20449),
        ee = i(80308),
        te = i(43255),
        ie = i(72153);
      const { TAGS: ne } = R.Z.SHOWCASE;
      function se(e) {
        const { tag: t, tagType: i, capabilities: s } = e,
          { analytics: a, commandBinder: o, editMode: r, locale: d } = (0, l.useContext)(I.I),
          c = r ? d.t(ne.EDIT_TAG_LABEL) : void 0,
          h = r ? 'toggle-pencil' : 'dock',
          g = r ? void 0 : d.t(ne.DOCK_TAG_LABEL),
          v = t.id,
          y = (0, l.useCallback)(
            (e) => {
              e.stopPropagation(),
                r && i === m.J.OBJECT
                  ? (a.trackToolGuiEvent('object_tags', 'object_tags_billboard_edit_tag'),
                    o.issueCommand(new ie.OD(v)))
                  : (a.trackToolGuiEvent(
                      'tags',
                      r ? 'tags_billboard_edit_tag' : 'tags_billboard_dock_tag',
                    ),
                    o.issueCommand(new p.bd(v, i)));
            },
            [v, r, i],
          );
        return i !== m.J.OBJECT || r
          ? s.share || s.dock
            ? (0, n.jsxs)(
                'header',
                Object.assign(
                  { className: u()('tag-billboard-header', { editable: r }) },
                  {
                    children: [
                      !r &&
                        s.share &&
                        (0, n.jsx)(te.O, {
                          prefix: 'tag',
                          pin: t,
                          id: t.id,
                          darkTheme: !0,
                          includeCameraView: !0,
                          analyticAction: 'tags_copy_share_link',
                          buttonVariant: ee.Wu.TERTIARY,
                        }),
                      s.dock &&
                        (0, n.jsx)(ee.zx, {
                          icon: h,
                          label: c,
                          size: ee.qE.SMALL,
                          variant: ee.Wu.TERTIARY,
                          theme: 'dark',
                          onClick: y,
                          reverse: !0,
                          tooltip: g,
                          tooltipOptions: { placement: 'bottom' },
                        }),
                    ],
                  },
                ),
              )
            : (0, n.jsx)('div', {})
          : null;
      }
      var ae = i(86077),
        oe = i(41865),
        re = i(38908),
        de = i(10163);
      const ce = (0, re.u)(de.n);
      var le = i(27445);
      const he = (0, re.u)(le.h);
      var ue = i(89056);
      const { ANNOTATIONS: me } = R.Z.SHOWCASE;
      function pe(e) {
        const t = new J.v({ links: !0 }),
          i = (0, oe.z)(),
          { commandBinder: s, editMode: a } = (0, l.useContext)(I.I),
          o = (0, S.P)(),
          r = (0, q.w)(),
          d = ce(),
          h = he(),
          g = (0, M.b)(),
          v = (0, Q.L)(),
          y = (0, l.useRef)(null),
          [f, w] = (0, l.useState)(!1),
          [b, T] = (0, l.useState)(null),
          [C, E] = (0, l.useState)({ dock: !0, share: !0 }),
          D = (0, c.y)(ue.ho, !0),
          x = (0, c.y)(ue.MS, !0),
          A = 'true' === (0, c.y)(ue.QM, !1),
          O = (0, l.useCallback)(
            (e) => {
              i.trackToolGuiEvent('tags', e);
            },
            [i],
          ),
          P = (0, l.useCallback)(
            (t, i) => {
              O('tags_billboard_click_attachment'), e.onClick(i);
            },
            [e, O],
          ),
          k = (0, l.useCallback)(
            (t) => {
              O(a ? 'tags_billboard_click_to_edit' : 'tags_billboard_click_to_dock'),
                t.stopPropagation(),
                e.onClick();
            },
            [e, O, a],
          ),
          N = (0, l.useCallback)((e) => {
            w(e);
          }, []);
        (0, l.useEffect)(() => (b && y.current && y.current.focus(), () => {}), [b, y.current]),
          (0, l.useEffect)(() => {
            const t = e.previewType,
              i = e.previewId;
            if (r && d)
              switch (t) {
                case m.J.OBJECT:
                  const e = null == h ? void 0 : h.getObjectTag(i);
                  if (!e) return;
                  const t = e.mattertagId ? d.getTag(e.mattertagId) : void 0,
                    s = e.toTagView(t);
                  T(Object.assign({}, s));
                  break;
                case m.J.TAG:
                  const a = d.getTag(i),
                    c = r.getTagView(i);
                  if (!a || !c) return void T(null);
                  function n() {
                    const e = null == o ? void 0 : o.getCapabilities(i);
                    return e && E(Object.assign({}, e)), e;
                  }
                  T(Object.assign({}, c));
                  const l = n(),
                    u = null == l ? void 0 : l.onChanged(n),
                    p = a.onChanged(() => {
                      const e = r.getTagView(i);
                      e && T(Object.assign({}, e));
                    });
                  return () => {
                    null == u || u.cancel(), p.cancel();
                  };
              }
          }, [o, d, null == h ? void 0 : h.collection, e.previewId, e.previewType, r]);
        if (!b) return null;
        const { previewType: R } = e,
          { id: j, label: L, attachments: B, description: V, keywords: F } = b,
          H = (0, $.Ug)(B),
          U = H.length > 0,
          G = (0, $.ae)(B),
          Z = Math.max(G.length - K.Ii, 0);
        Z > 0 && (G.length = K.Ii);
        const Y = g.t(me.READ_MORE_MESSAGE),
          ee = !L && !V,
          te = (0, n.jsx)(X.v, { attachments: H, onClick: P }),
          ie =
            L &&
            (0, n.jsx)('div', Object.assign({ className: 'tag-billboard-title' }, { children: L })),
          ne = u()('annotation-preview-contents', 'tag-billboard', {
            'viewable-media': U,
            'media-only': ee,
            'has-keywords': F && F.length > 0,
          });
        return (0, n.jsxs)(
          'div',
          Object.assign(
            {
              ref: y,
              role: 'dialog',
              tabIndex: 0,
              className: ne,
              onClick: k,
              onKeyDown: (e) => {
                'Escape' === e.code && (e.stopPropagation(), s.issueCommand(new p.G5()));
              },
            },
            {
              children: [
                (0, n.jsx)(se, {
                  tag: b,
                  tagType: R,
                  capabilities: { share: D && C.share, dock: x && C.dock },
                }),
                (0, n.jsxs)(
                  'div',
                  Object.assign(
                    { className: 'tag-billboard-contents' },
                    {
                      children: [
                        L
                          ? (() => {
                              const e = A ? ie : te,
                                t = A ? te : ie;
                              return (0, n.jsxs)(n.Fragment, { children: [e, t] });
                            })()
                          : te,
                        V &&
                          (0, n.jsx)(
                            'div',
                            Object.assign(
                              { className: 'tag-billboard-description' },
                              {
                                children: (0, n.jsx)(_.e, {
                                  text: V,
                                  textParser: t,
                                  linkHandler: v,
                                  annotationType: m.J.TAG,
                                  annotationId: j,
                                  maxLength: 100,
                                  maxLines: 4,
                                  onTruncationChange: N,
                                }),
                              },
                            ),
                          ),
                        F &&
                          (0, n.jsx)(ae.s, {
                            keywords: F,
                            theme: 'dark',
                            className: 'tag-previewer-keywords',
                          }),
                        G.length > 0 &&
                          (0, n.jsx)(
                            z.s,
                            Object.assign(
                              { annotationType: m.J.TAG, attachments: G },
                              { children: (0, n.jsx)(W, { moreAttachmentsCount: Z }) },
                            ),
                          ),
                        f &&
                          (0, n.jsx)(
                            'div',
                            Object.assign(
                              { className: 'annotation-read-more' },
                              {
                                children: (0, n.jsx)(
                                  'span',
                                  Object.assign({ className: 'link link-more' }, { children: Y }),
                                ),
                              },
                            ),
                          ),
                      ],
                    },
                  ),
                ),
              ],
            },
          ),
        );
      }
      const ge = (0, l.memo)(({ notesEnabled: e, openModal: t }) => {
        const { messageBus: i, analytics: s, commandBinder: a } = (0, l.useContext)(I.I),
          {
            billboardAnnotation: o,
            selectedAnnotation: r,
            dockedAnnotation: d,
          } = P((0, S.P)()) || {},
          c = (null == o ? void 0 : o.annotationType) === m.J.TAG,
          h = (null == o ? void 0 : o.annotationType) === m.J.OBJECT,
          v = e && (null == o ? void 0 : o.annotationType) === m.J.NOTE,
          y = (0, l.useCallback)(() => {
            o &&
              (s.trackGuiEvent(`annotations_dock_${o.annotationType}`),
              a.issueCommand(new p.bd(o.id, o.annotationType)));
          }, [s, o, a]),
          f = (0, l.useCallback)(() => {
            o &&
              (s.trackGuiEvent(`annotations_select_${o.annotationType}`),
              a.issueCommand(new p.oM(o.id, o.annotationType)));
          }, [s, o, a]),
          w = (0, l.useCallback)(
            (e) => {
              if (o) {
                s.trackGuiEvent(v ? 'click_note_preview' : 'tags_click_tag_billboard');
                const { id: t, annotationType: n } = o;
                (e && !d) || h || y(), e && i.broadcast(new g.q(n, t, e));
              }
            },
            [o, s, d, h, v, y, i],
          ),
          b = (0, l.useCallback)(() => {
            if (o)
              if (r) a.issueCommand(new p.Aj(o.id, o.annotationType));
              else {
                v || d ? y() : f();
              }
          }, [o, a, y, d, v, f, r]);
        return t
          ? null
          : (0, n.jsx)(
              O,
              Object.assign(
                { className: u()({ 'tag-preview': c || h, 'note-preview': v }), onClick: b },
                {
                  children:
                    c || h
                      ? (0, n.jsx)(pe, {
                          previewId: o.id,
                          previewType: o.annotationType,
                          onClick: w,
                        })
                      : v
                        ? (0, n.jsx)(Y, { previewId: o.id, onClick: w })
                        : null,
                },
              ),
              null == o ? void 0 : o.id,
            );
      });
      var ve = i(38772),
        ye = i(20360),
        fe = i(9993),
        we = i(13760),
        be = i(17545),
        Te = i(25629),
        Ce = i(86809),
        Ee = i(38637),
        De = function (e, t, i, n) {
          var s,
            a = arguments.length,
            o = a < 3 ? t : null === n ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
          if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
            o = Reflect.decorate(e, t, i, n);
          else
            for (var r = e.length - 1; r >= 0; r--)
              (s = e[r]) && (o = (a < 3 ? s(o) : a > 3 ? s(t, i, o) : s(t, i)) || o);
          return a > 3 && o && Object.defineProperty(t, i, o), o;
        },
        xe = function (e, t) {
          if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
            return Reflect.metadata(e, t);
        };
      const { ATTACHMENTS: Ae } = R.Z.SHOWCASE;
      let Oe = class extends l.Component {
        constructor(e) {
          super(e),
            (this.bindings = []),
            (this.onKey = async (e) => {
              const { attachments: t, attachmentIndex: i } = this.state,
                n = t.length;
              let s = -1;
              switch (e.keyCode) {
                case ye.R.ESCAPE:
                  e.stopPropagation(), this.closeAttachmentViewer();
                  break;
                case ye.R.LEFTARROW:
                  e.stopPropagation(), (s = i - 1), s < 0 && (s = n - 1);
                  break;
                case ye.R.RIGHTARROW:
                  e.stopPropagation(), (s = i + 1), s >= n && (s = 0);
              }
              -1 !== s && this.setState({ attachmentIndex: s });
            }),
            (this.closeAttachmentViewer = () => {
              this.state.open && this.context.commandBinder.issueCommand(new Te.xW(!1));
            }),
            (this.onModalToggled = (e) => {
              e.modal !== fe.P.ATTACHMENT || e.open || this.closeAttachmentViewer();
            }),
            (this.onViewerClosed = () => {
              this.state.open &&
                (this.context.mainDiv
                  .getRootNode()
                  .removeEventListener('keydown', this.onKey, { capture: !0 }),
                this.context.commandBinder.issueCommand(new we.B(fe.P.ATTACHMENT, !1)),
                this.setState({ open: !1 }));
            }),
            (this.onNavigate = (e) => {
              this.setState({ attachmentIndex: e });
            }),
            (this.onViewAttachments = (e) => {
              const { attachments: t, attachmentId: i } = e,
                n = i || this.getCurrentAttachmentId(),
                s = t.findIndex((e) => e.id === n);
              0 === t.length || -1 === s
                ? this.closeAttachmentViewer()
                : (this.state.open ||
                    (this.context.mainDiv
                      .getRootNode()
                      .addEventListener('keydown', this.onKey, { capture: !0 }),
                    this.context.commandBinder.issueCommand(new we.B(fe.P.ATTACHMENT, !0)),
                    this.setState({ open: !0 })),
                  this.setState({ attachments: t, attachmentIndex: s }));
            }),
            (this.state = { open: !1, attachmentIndex: -1, attachments: [] });
        }
        componentDidMount() {
          const { messageBus: e } = this.context;
          this.bindings.push(
            e.subscribe(Ce.O, this.onViewAttachments),
            e.subscribe(Ce.Rd, this.onViewerClosed),
            e.subscribe(be.nV, this.onModalToggled),
          );
        }
        componentWillUnmount() {
          for (const e of this.bindings) e.cancel();
          this.context.mainDiv
            .getRootNode()
            .removeEventListener('keydown', this.onKey, { capture: !0 });
        }
        getCurrentAttachmentId() {
          var e;
          const { attachmentIndex: t, attachments: i } = this.state;
          return (null === (e = i[t]) || void 0 === e ? void 0 : e.id) || void 0;
        }
        render() {
          const { open: e, attachments: t, attachmentIndex: i } = this.state,
            { locale: s } = this.context,
            a = s.t(Ae.CLOSE_TOOLTIP),
            o = s.t(Ae.VIEWER_INDEX_COUNT, { currentNumber: i + 1, totalNumber: t.length });
          return (0, n.jsx)(
            'div',
            Object.assign(
              { className: u()('overlay-layer', 'attachment-overlay', { open: e }) },
              {
                children:
                  e &&
                  (0, n.jsxs)(n.Fragment, {
                    children: [
                      (0, n.jsxs)(
                        'div',
                        Object.assign(
                          { className: 'overlay-top-bar' },
                          {
                            children: [
                              (0, n.jsx)(
                                'div',
                                Object.assign({ className: 'overlay-label' }, { children: o }),
                              ),
                              (0, n.jsx)(Ee.P, {
                                theme: 'overlay',
                                tooltip: a,
                                onClose: this.closeAttachmentViewer,
                              }),
                            ],
                          },
                        ),
                      ),
                      (0, n.jsx)(V.T, {
                        attachments: t,
                        startIndex: i,
                        onNavigate: this.onNavigate,
                      }),
                    ],
                  }),
              },
            ),
          );
        }
      };
      function Se({ parentTool: e }) {
        const t = (0, c.y)(s.re, !1),
          i = (0, c.y)(o.Mp, !1),
          l = (0, c.y)(a.IA, !1),
          h = (0, d.R)(),
          u = i && l;
        return (!u && !t) || (t && e !== r.w1.TAGS) || (!t && e !== r.w1.NOTES)
          ? null
          : (0, n.jsxs)(
              'div',
              Object.assign(
                { className: 'overlay-ui' },
                {
                  children: [(0, n.jsx)(Oe, {}), (0, n.jsx)(ge, { notesEnabled: u, openModal: h })],
                },
              ),
            );
      }
      (Oe.contextType = I.I), (Oe = De([ve.Z, xe('design:paramtypes', [Object])], Oe));
    },
    58894: (e, t, i) => {
      'use strict';
      i.d(t, { e: () => y });
      var n = i(85893),
        s = i(67294),
        a = i(38772),
        o = i(29707),
        r = i(89555),
        d = i(53484),
        c = i(73515),
        l = i(7555),
        h = i(91774),
        u = i(78989),
        m = i(62402),
        p = i(31286),
        g =
          (i(80862),
          function (e, t, i, n) {
            var s,
              a = arguments.length,
              o = a < 3 ? t : null === n ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
            if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
              o = Reflect.decorate(e, t, i, n);
            else
              for (var r = e.length - 1; r >= 0; r--)
                (s = e[r]) && (o = (a < 3 ? s(o) : a > 3 ? s(t, i, o) : s(t, i)) || o);
            return a > 3 && o && Object.defineProperty(t, i, o), o;
          }),
        v = function (e, t) {
          if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
            return Reflect.metadata(e, t);
        };
      let y = class extends s.Component {
        constructor(e) {
          super(e),
            (this.onTextReplaced = (e) => {
              const { onTruncationChange: t } = this.props,
                i = this.state.truncated;
              this.setState({ truncated: e }), t && i !== e && t(e);
            }),
            (this.onClickAnchor = (e) => {
              const t = e.target,
                i = t.dataset.blocktype;
              if ((e.stopPropagation(), i)) {
                const { annotationType: n, annotationId: s, linkHandler: a } = this.props,
                  o = { blockType: i, text: t.innerText, value: t.dataset.value, id: t.dataset.id };
                if (i === r.C.LINK && a && o.value) {
                  e.preventDefault();
                  const t = (0, d.V)(o.value),
                    { url: i, modelId: r, pose: l } = t;
                  r
                    ? a.handler.openLink({ fullLink: i, modelId: r })
                    : l
                      ? (a.handler.openLink({ fullLink: i, pose: l }),
                        this.context.commandBinder.issueCommand(new c.Aj(s, n)))
                      : (a.handler.openLink(i), this.context.messageBus.broadcast(new u.Ik(i)));
                }
                this.context.messageBus.broadcast(new l.i(n, s, o));
              }
            }),
            (this.state = { truncated: !1 });
        }
        renderAttachments(e) {
          if (0 === e.length) return null;
          const { onViewAttachment: t, annotationType: i } = this.props;
          return (0, n.jsx)(m.s, { attachments: e, onViewAttachment: t, annotationType: i });
        }
        render() {
          const { settings: e } = this.context,
            {
              text: t,
              textParser: i,
              edited: s,
              attachments: a,
              maxLength: o,
              maxLines: r,
              readMore: d,
            } = this.props,
            { truncated: c } = this.state,
            l = e.tryGetProperty(h.sX, !1);
          return (0, n.jsxs)(
            'div',
            Object.assign(
              { className: 'annotation-box' },
              {
                children: [
                  (0, n.jsx)(
                    'div',
                    Object.assign(
                      { className: 'annotation-text-box' },
                      {
                        children: (0, n.jsx)(p.Z, {
                          text: t,
                          textParser: i,
                          onClickAnchor: l ? void 0 : this.onClickAnchor,
                          clickableLinks: !l,
                          onTextReplaced: this.onTextReplaced,
                          maxLength: o,
                          maxLines: r,
                          readonly: !0,
                        }),
                      },
                    ),
                  ),
                  s &&
                    (0, n.jsx)(
                      'div',
                      Object.assign({ className: 'annotation-edited' }, { children: '(edited)' }),
                    ),
                  d &&
                    c &&
                    (0, n.jsx)(
                      'div',
                      Object.assign(
                        { className: 'annotation-read-more' },
                        {
                          children: (0, n.jsx)(
                            'span',
                            Object.assign({ className: 'link link-more' }, { children: d }),
                          ),
                        },
                      ),
                    ),
                  a && !l && this.renderAttachments(a),
                ],
              },
            ),
          );
        }
      };
      (y.contextType = o.I), (y = g([a.Z, v('design:paramtypes', [Object])], y));
    },
    59537: (e, t, i) => {
      'use strict';
      i.d(t, { P: () => a });
      var n = i(38908),
        s = i(12925);
      const a = (0, n.u)(s.A);
    },
    18909: (e, t, i) => {
      'use strict';
      i.r(t),
        i.d(t, {
          AnnotationAttachmentClickedMessage: () => h.q,
          AnnotationBlockClickedMessage: () => h.i,
          AnnotationType: () => u.J,
          AnnotationsViewData: () => r.A,
          CloseAnnotationCommand: () => d.Aj,
          CloseBillboardCommand: () => d.G5,
          CloseDockedAnnotationCommand: () => d.JD,
          CloseOtherAnnotationsCommand: () => d.yL,
          DockAnnotationCommand: () => d.bd,
          PreviewAnnotationCommand: () => d.Kw,
          SelectAnnotationCommand: () => d.oM,
          default: () => m,
        });
      var n = i(933),
        s = i(2159),
        a = i(24938),
        o = i(22925),
        r = i(12925),
        d = i(73515),
        c = i(98375);
      class l extends n.Y {
        constructor() {
          super(...arguments),
            (this.name = 'annotations'),
            (this.handleDockAnnotation = async (e) => {
              const t = this.viewData,
                { dockedAnnotation: i } = t,
                { id: n, annotationType: s, force: a } = e;
              (this.viewData.getCapabilities(n).dock || a) &&
                ((null == i ? void 0 : i.id) !== n || (null == i ? void 0 : i.annotationType) !== s
                  ? t.atomic(() => {
                      t.setDockedAnnotation(n, s), t.setBillboardAnnotation(null);
                    })
                  : this.log.debug('Annotation is already docked'));
            }),
            (this.handleSelectAnnotation = async (e) => {
              const t = this.viewData,
                { billboardAnnotation: i, billboardSelected: n } = t,
                { id: s, annotationType: a, force: o } = e;
              (this.viewData.getCapabilities(s).preview || o) &&
                (n &&
                (null == i ? void 0 : i.id) === s &&
                (null == i ? void 0 : i.annotationType) === a
                  ? this.log.debug('Annotation is already selected')
                  : t.atomic(() => {
                      t.setBillboardAnnotation(s, a, !0), t.setDockedAnnotation(null);
                    }));
            }),
            (this.handlePreviewAnnotation = async (e) => {
              this.viewData.getCapabilities(e.id).preview &&
                this.viewData.setBillboardAnnotation(e.id, e.annotationType, !1);
            }),
            (this.handleCloseBillboard = async () => {
              this.viewData.setBillboardAnnotation(null);
            }),
            (this.handleCloseDockedAnnotation = async () => {
              this.viewData.setDockedAnnotation(null);
            }),
            (this.handleClosingOtherAnnotations = async (e) => {
              const { exceptType: t, exceptId: i } = e;
              this.closeOtherAnnotations(t, i);
            }),
            (this.closeOtherAnnotations = (e, t) => {
              const i = this.viewData,
                { billboardAnnotation: n, dockedAnnotation: s } = i,
                a = n && !this.isMatchingAnnotation(n, e, t),
                o = s && !this.isMatchingAnnotation(s, e, t);
              i.atomic(() => {
                n && a && i.setBillboardAnnotation(null), s && o && i.setDockedAnnotation(null);
              });
            }),
            (this.handleCloseAnnotation = async (e) => {
              const t = this.viewData,
                { billboardAnnotation: i, dockedAnnotation: n } = t,
                { id: s, annotationType: a } = e;
              t.atomic(() => {
                s === (null == i ? void 0 : i.id) &&
                  a === (null == i ? void 0 : i.annotationType) &&
                  t.setBillboardAnnotation(null),
                  s === (null == n ? void 0 : n.id) &&
                    a === (null == n ? void 0 : n.annotationType) &&
                    t.setDockedAnnotation(null);
              });
            }),
            (this.handleDockedAnnotationChanged = () => {
              this.viewData.dockedAnnotation
                ? this.engine.broadcast(new s.ro())
                : this.engine.broadcast(new s.A());
            });
        }
        async init(e, t) {
          (this.viewData = new r.A()),
            (this.engine = t),
            ([this.applicationData, this.layersData] = await Promise.all([
              t.market.waitForData(a.pu),
              t.market.waitForData(o.R),
            ])),
            this.bindings.push(
              t.commandBinder.addBinding(d.bd, this.handleDockAnnotation),
              t.commandBinder.addBinding(d.oM, this.handleSelectAnnotation),
              t.commandBinder.addBinding(d.Kw, this.handlePreviewAnnotation),
              t.commandBinder.addBinding(d.Aj, this.handleCloseAnnotation),
              t.commandBinder.addBinding(d.G5, this.handleCloseBillboard),
              t.commandBinder.addBinding(d.JD, this.handleCloseDockedAnnotation),
              t.commandBinder.addBinding(d.yL, this.handleClosingOtherAnnotations),
              t.subscribe(c.oR, this.handleCloseBillboard),
              this.applicationData.onPropertyChanged('application', this.closeOtherAnnotations),
              this.layersData.onPropertyChanged('currentViewId', this.handleCloseBillboard),
              this.viewData.onDockedAnnotationChanged(this.handleDockedAnnotationChanged),
            ),
            t.market.register(this, r.A, this.viewData);
        }
        dispose(e) {
          this.bindings.forEach((e) => {
            e.cancel();
          }),
            (this.bindings = []),
            super.dispose(e);
        }
        onUpdate() {}
        isMatchingAnnotation(e, t, i) {
          return !(!i && !t) && (!i || i === e.id) && (!t || t === e.annotationType);
        }
      }
      var h = i(7555),
        u = i(25100);
      const m = l;
    },
    51141: (e, t, i) => {
      'use strict';
      i.d(t, { b: () => o });
      var n = i(42141),
        s = i(42896),
        a = i(37250);
      class o extends n.V {
        constructor() {
          super(),
            (this.name = 'attachments-data'),
            (this.pendingAttachments = (0, s.q)()),
            (this.removedAttachments = (0, s.q)()),
            (this.currentUploads = (0, s.q)()),
            (this.failedUploads = (0, s.q)());
        }
        iteratePending(e) {
          for (const t of this.pendingAttachments) e(t);
        }
        iterateRemoved(e) {
          for (const t of this.removedAttachments) e(t);
        }
        get pendings() {
          return this.pendingAttachments;
        }
        get removals() {
          return this.removedAttachments;
        }
        getPendingAttachment(e) {
          return this.pendingAttachments.get(e);
        }
        getRemovedAttachment(e) {
          return this.removedAttachments.get(e);
        }
        addPending(e) {
          this.pendingAttachments.set(e.id, e);
        }
        removePendingAttachment(e) {
          this.pendingAttachments.has(e) && this.pendingAttachments.delete(e);
        }
        clearPending() {
          this.pendingAttachments.clear();
        }
        getPendingAttachmentsForAsset(e, t) {
          const i = [];
          return (
            this.iteratePending((n) => {
              n.parentType === t && n.parentId === e && i.push(n);
            }),
            i
          );
        }
        getRemovedAttachmentsForAsset(e, t) {
          const i = [];
          return (
            this.iterateRemoved((n) => {
              n.parentType === t && n.parentId === e && i.push(n);
            }),
            i
          );
        }
        markAttachmentForDelete(e) {
          const t = new a.P(e);
          this.removedAttachments.set(t.id, t);
        }
        clearRemovals() {
          this.removedAttachments.clear();
        }
        get uploads() {
          return this.currentUploads;
        }
        addUpload(e) {
          this.uploads.set(e.id, e);
        }
        updateUpload(e) {
          this.uploads.has(e.id) && this.uploads.set(e.id, e);
        }
        removeUpload(e) {
          this.uploads.has(e) && this.uploads.delete(e);
        }
        clearUploads() {
          this.uploads.clear();
        }
        get failures() {
          return this.failedUploads;
        }
        addFailure(e) {
          this.failures.set(e.id, e);
        }
        removeFailure(e) {
          this.failures.has(e) && this.failures.delete(e);
        }
        clearFailures() {
          this.failures.clear();
        }
      }
    },
    50645: (e, t, i) => {
      'use strict';
      i.d(t, { P: () => X });
      var n = i(85893),
        s = i(67294),
        a = i(94184),
        o = i.n(a),
        r = i(29707),
        d = i(25629),
        c = i(12437),
        l = i(41865),
        h = i(17106),
        u = i(49627),
        m = i(7321),
        p = i(38772),
        g = i(11234),
        v = i(53257),
        y = i(68738);
      class f extends s.Component {
        constructor(e) {
          super(e);
        }
        render() {
          const { className: e, cover: t, data: i, onClick: s, style: a } = this.props,
            r = o()('oembed', 'oembed-text', e, { 'oembed-text--cover': t }),
            d = i.provider_name ? `${i.provider_name} content` : 'Embedded content',
            c = i.author_name ? `from ${i.author_name}` : '';
          return (0, n.jsxs)(
            'div',
            Object.assign(
              { className: r, style: a, onClick: s },
              {
                children: [
                  i.title && (0, n.jsx)('h3', { children: i.title }),
                  (0, n.jsx)('p', { children: `${d} ${c}` }),
                ],
              },
            ),
          );
        }
      }
      const w = ['soundcloud', 'spotify'];
      class b extends s.Component {
        constructor(e) {
          super(e);
        }
        getAttributes() {
          const { data: e } = this.props;
          let t = e.thumbnail_url,
            i = e.thumbnail_width,
            n = e.thumbnail_height;
          return (
            (!t || !i || !n) &&
              e.type === g.ht.PHOTO &&
              ((t = e.url), (i = e.width), (n = e.height)),
            { url: t, width: i, height: n }
          );
        }
        render() {
          const {
              className: e,
              cover: t,
              data: i,
              disabled: s,
              maxHeight: a,
              maxWidth: r,
              onClick: d,
              style: c,
            } = this.props,
            { url: l, width: h, height: u } = this.getAttributes();
          if (!l || !h || !u) return (0, n.jsx)(f, Object.assign({}, this.props));
          const m = (function (e, t) {
              return e < 128 || t < 128;
            })(h, u),
            p =
              !s &&
              (function (e) {
                const t = (e.provider_name || '').toLowerCase();
                return e.type === g.ht.VIDEO
                  ? 'giphy' !== t
                  : !(e.type !== g.ht.RICH || !w.includes(t));
              })(i),
            v = o()('oembed', 'oembed-thumbnail', e, {
              'oembed-thumbnail--cover': t,
              'oembed-thumbnail--cover--icon': t && m,
            }),
            b = Object.assign(Object.assign({}, c), { backgroundImage: `url('${l}')` });
          if (!t) {
            const { width: e, height: t } = (function (e, t, i, n) {
              let s = e,
                a = t;
              if (i && s > i) {
                const e = i / s;
                (s *= e), a && (a *= e);
              }
              if (a && n && a > n) {
                const e = n / a;
                (s *= e), (a *= e);
              }
              return { width: s, height: a };
            })(h, u, r, a);
            (b.width = `${e}px`), (b.height = `${t}px`);
          }
          return (
            t && m && (b.maxWidth = 1.5 * h + 'px'),
            (0, n.jsx)(
              'div',
              Object.assign(
                { className: v, style: b, onClick: s ? void 0 : d },
                {
                  children:
                    p &&
                    (0, n.jsx)(y.hU, {
                      className: 'oembed-thumbnail__cta',
                      iconClass: 'icon-play-unicode',
                      buttonStyle: y.Dd.OVERLAY,
                      buttonSize: y.rm.LARGE,
                    }),
                },
              ),
            )
          );
        }
      }
      const T = ({
        id: e,
        className: t,
        onClick: i,
        url: a,
        cover: r,
        style: d,
        containerWidth: c,
      }) => {
        const { height: l } = (0, u.iP)(),
          h = (0, s.useCallback)(
            (t) => {
              i && i(t, e);
            },
            [i, e],
          ),
          m = o()({ 'image-cover': !!r }, t),
          p = 4 / 3,
          g = 0.8 * l,
          v = Math.min(Math.round(c / p), g);
        return (0, n.jsxs)(
          'div',
          Object.assign(
            {
              className: o()('oembed-image fill-cover-image', m),
              style: Object.assign(Object.assign({}, d), { minHeight: v, maxWidth: c }),
              onClick: i ? h : void 0,
            },
            {
              children: [
                (0, n.jsx)('div', {
                  className: 'fill-blur',
                  style: { backgroundImage: `url('${a}')` },
                }),
                (0, n.jsx)('img', {
                  className: o()('image', m),
                  src: a,
                  style: { maxHeight: Math.min(g, Math.round(c * p)) },
                  onClick: i ? h : void 0,
                }),
              ],
            },
          ),
        );
      };
      class C extends s.Component {
        constructor(e) {
          super(e);
        }
        render() {
          const {
              className: e,
              cover: t,
              data: i,
              onClick: s,
              style: a,
              containerWidth: r,
            } = this.props,
            d = o()('oembed', 'oembed-photo', e, { 'oembed-photo--cover': t });
          return (0, n.jsx)(T, {
            url: i.url,
            style: a,
            onClick: s,
            className: d,
            containerWidth: r,
          });
        }
      }
      var E = i(61173);
      function D(e) {
        const { className: t, children: i } = e;
        if (!i) return null;
        const s = o()('oembed', 'oembed-loading', t);
        return (0, n.jsx)('div', Object.assign({ className: s }, { children: i }));
      }
      var x = i(91631);
      const A = { flickr: !0, instagram: !0 },
        O = /^<iframe.*>.*<\/iframe>$/;
      function S(e) {
        return O.test(e);
      }
      function P(e, t) {
        let i;
        return (
          (i = S(e)
            ? (function (e) {
                const t = document.createElement('div');
                t.innerHTML = e;
                const i = t.firstChild,
                  n = i.style;
                return (
                  (n.maxWidth = '100%'),
                  (n.maxHeight = '100%'),
                  (n.minWidth = ''),
                  (n.minHeight = ''),
                  i
                );
              })(e)
            : (function (e, t) {
                const i = document.createElement('iframe');
                i.setAttribute('allow', 'encrypted-media; autoplay; fullscreen');
                let n = '';
                return (
                  (n =
                    t && t === x.z.Instagram
                      ? '\n      <style>\n        html, body { padding: 0; margin: 0; border: 0; }\n        img { display: block; max-width: 100%; height: auto; border: 0; }\n        iframe { display: block; max-width: 100%; border: 0; }\n      </style>\n    '
                      : '\n      <style>\n        html, body { padding: 0; margin: 0; border: 0; }\n        img, iframe { display: block; max-width: 100%; height: auto; border: 0; }\n      </style>\n    '),
                  (i.srcdoc = `<!doctype html>${n.replace(/\s+/g, ' ')}${e}`),
                  i
                );
              })(e, t)),
          i.src || ((e) => void 0 !== e && !!A[e.toLowerCase()])(t)
            ? i.setAttribute(
                'sandbox',
                'allow-scripts allow-same-origin allow-popups allow-presentation',
              )
            : i.setAttribute('sandbox', 'allow-same-origin'),
          i
        );
      }
      function I(e) {
        const { className: t, data: i, loadingComponent: a, onClick: r, style: d, onLoad: c } = e,
          [l, h] = (0, s.useState)(),
          [u, m] = (0, s.useState)(),
          [p, g] = (0, s.useState)(!0),
          [v, y] = (0, s.useState)(i.height);
        (0, s.useLayoutEffect)(() => {
          const e = l;
          let t = null;
          if (e) {
            for (; e.lastChild; ) e.removeChild(e.lastChild);
            const n = P(i.html, i.provider_name);
            (n.onload = () => {
              c && n && c(n), g(!1);
            }),
              e.appendChild(n),
              (t = (e) => {
                const t = ((e) => {
                  let t;
                  try {
                    t = JSON.parse(e.data);
                  } catch (e) {
                    return;
                  }
                  if ('iframe.resize' !== t.context) return;
                  const i = t.src.replace(/http(s?):\/\//, '//'),
                    n = document.querySelector('iframe[src="' + i + '"]');
                  return n ? { iframe: n, height: t.height } : void 0;
                })(e);
                t && t.iframe === n && y(t.height);
              }),
              window.addEventListener('message', t);
          }
          return () => {
            t && window.removeEventListener('message', t);
          };
        }, [l, i.html, i.provider_name, c]);
        const f = (0, s.useCallback)((e) => {
            e && (m(e.offsetWidth), h(e));
          }, []),
          w = (0, s.useMemo)(() => {
            var e;
            if (!v || !u) return '30%';
            let t;
            if (
              (null === (e = i.provider_name) || void 0 === e ? void 0 : e.toLowerCase()) ===
              x.z.Flickr
            )
              t = (i.height || i.thumbnail_height || 220) / i.width;
            else {
              t = (v || i.height || i.thumbnail_height || 220) / u;
            }
            return `${Math.max(30, 100 * t).toPrecision(4)}%`;
          }, [v, u, i.height, i.width, i.thumbnail_height, i.provider_name]);
        return (0, n.jsxs)(
          'div',
          Object.assign(
            { className: o()('oembed-iframe--wrapper', t), style: d, onClick: r },
            {
              children: [
                (0, n.jsx)(D, Object.assign({ className: p ? '' : 'is-loaded' }, { children: a })),
                (0, n.jsx)('div', {
                  className: o()(
                    'oembed-iframe__container',
                    i.provider_name && `oembed-iframe--src-${i.provider_name.replace(/\s/g, '-')}`,
                    p && 'is-loading',
                  ),
                  ref: f,
                  style: { paddingBottom: w },
                }),
              ],
            },
          ),
        );
      }
      var k = i(17141);
      const N = new v.Z('oembed-video');
      class R extends s.Component {
        constructor() {
          super(...arguments),
            (this.isUnmounting = !1),
            (this.onIFrameLoad = async (e) => {
              if (!this.isUnmounting)
                try {
                  const t = await (function (e) {
                    const t = new k.Player(e);
                    return new Promise((e, i) => {
                      t.on('ready', () => {
                        e(t);
                      });
                    });
                  })(e);
                  if (this.isUnmounting) return;
                  (0, E.tq)() || t.play();
                } catch (e) {
                  N.warn('unable to autoplay video'), N.warn(e);
                }
            });
        }
        componentWillUnmount() {
          this.isUnmounting = !0;
        }
        render() {
          const { className: e, cover: t } = this.props;
          if (t) return (0, n.jsx)(b, Object.assign({}, this.props));
          const i = o()('oembed', 'oembed-video', e);
          return (0, n.jsx)(
            I,
            Object.assign({}, this.props, { className: i, onLoad: this.onIFrameLoad }),
          );
        }
      }
      const M = (e) => {
        const { className: t, cover: i } = e;
        if (i) return (0, n.jsx)(b, Object.assign({}, e));
        const s = o()('oembed', 'oembed-rich', t);
        return (0, n.jsx)(I, Object.assign({}, e, { className: s }));
      };
      function j(e) {
        const { children: t, className: i } = e;
        if (!t) return null;
        const s = o()('oembed', 'oembed-error', i);
        return (0, n.jsx)('div', Object.assign({ className: s }, { children: t }));
      }
      const L = new v.Z('oembed-errors');
      class B extends s.Component {
        constructor(e) {
          super(e), (this.state = { caughtError: void 0 });
        }
        static getDerivedStateFromError(e) {
          return { caughtError: e };
        }
        componentDidCatch(e) {
          L.warn(e.message);
        }
        componentDidUpdate(e) {
          var t, i;
          e.data !== this.props.data && this.setState({ caughtError: void 0 }),
            e.error !== this.props.error &&
              (null === (i = (t = this.props).onError) || void 0 === i || i.call(t));
        }
        render() {
          const {
              className: e,
              cover: t,
              data: i,
              disabled: s,
              renderError: a,
              loadingComponent: o,
              maxHeight: r,
              maxWidth: d,
              onClick: c,
              style: l,
              thumbnail: h,
              error: u,
              containerWidth: m,
            } = this.props,
            { caughtError: p } = this.state;
          if (a && (u || p))
            return (0, n.jsx)(j, Object.assign({ className: e }, { children: a(u, p) }));
          if (!i) return (0, n.jsx)(D, Object.assign({ className: e }, { children: o }));
          const v = {
            className: e,
            cover: t,
            maxHeight: r,
            maxWidth: d,
            onClick: c,
            style: l,
            containerWidth: m,
          };
          return h
            ? (0, n.jsx)(b, Object.assign({ data: i, disabled: s }, v))
            : i.type === g.ht.PHOTO
              ? (0, n.jsx)(C, Object.assign({ data: i }, v))
              : i.type === g.ht.VIDEO
                ? (0, n.jsx)(R, Object.assign({ data: i, loadingComponent: o }, v))
                : i.type === g.ht.RICH
                  ? (0, n.jsx)(M, Object.assign({ data: i, loadingComponent: o }, v))
                  : null;
        }
      }
      var V = i(78897),
        F = i(80308);
      const { ATTACHMENTS: _ } = m.Z.SHOWCASE,
        H = {
          200: _.ERROR_200_MESSAGE,
          401: _.ERROR_401_MESSAGE,
          403: _.ERROR_403_MESSAGE,
          404: _.ERROR_404_MESSAGE,
          429: _.ERROR_429_MESSAGE,
        },
        U = ({ error: e, compact: t, scriptError: i }) => {
          const [a, o] = (0, s.useState)(null),
            r = (0, V.b)(),
            d =
              (null == e ? void 0 : e.status) &&
              ((e) => {
                const t = H[e];
                if (t) return t;
                switch (Math.floor(+e / 100)) {
                  case 2:
                    return _.ERROR_200_MESSAGE;
                  case 4:
                    return _.ERROR_4XX_MESSAGE;
                  case 5:
                    return _.ERROR_5XX_MESSAGE;
                }
              })(e.status),
            c = i ? i.message : r.t(d || _.FAILED_TO_LOAD_MESSAGE),
            l = (0, s.useCallback)((e) => {
              o(e);
            }, []);
          return (0, n.jsx)(
            'div',
            Object.assign(
              { className: 'embed-error-container', ref: l },
              {
                children: t
                  ? (0, n.jsx)(F.u, { title: c, target: a })
                  : (0, n.jsxs)(n.Fragment, {
                      children: [
                        (0, n.jsx)('span', { className: 'icon icon-error' }),
                        (0, n.jsx)(
                          'div',
                          Object.assign({ className: 'embed-error-message' }, { children: c }),
                        ),
                      ],
                    }),
              },
            ),
          );
        };
      var G = function (e, t, i, n) {
          var s,
            a = arguments.length,
            o = a < 3 ? t : null === n ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
          if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
            o = Reflect.decorate(e, t, i, n);
          else
            for (var r = e.length - 1; r >= 0; r--)
              (s = e[r]) && (o = (a < 3 ? s(o) : a > 3 ? s(t, i, o) : s(t, i)) || o);
          return a > 3 && o && Object.defineProperty(t, i, o), o;
        },
        z = function (e, t) {
          if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
            return Reflect.metadata(e, t);
        };
      let W = class extends s.Component {
        constructor(e) {
          super(e),
            (this.isUnmounting = !1),
            (this.handleError = () => {
              const { onError: e } = this.props;
              e && e(this.props.attachment.parentId);
            }),
            (this.renderError = (e, t) => {
              const { compact: i } = this.props;
              return (0, n.jsx)(U, { error: e, scriptError: t, compact: i });
            }),
            (this.state = { embed: null, error: void 0 });
        }
        componentDidMount() {
          this.getEmbeddedMedia();
        }
        componentWillUnmount() {
          this.isUnmounting = !0;
        }
        componentDidUpdate(e) {
          this.props.attachment.id !== e.attachment.id && this.getEmbeddedMedia();
        }
        async getEmbeddedMedia() {
          const { attachment: e } = this.props,
            { commandBinder: t } = this.context;
          let i,
            n = null;
          try {
            if (((n = await t.issueCommand(new d.st(e))), !n)) throw new Error('embed not found');
          } catch (e) {
            i = e;
          }
          this.isUnmounting || this.setState({ attachmentId: e.id, embed: n, error: i });
        }
        render() {
          const {
              compact: e,
              height: t,
              width: i,
              onClick: s,
              style: a,
              thumbnail: r,
              containerWidth: d,
            } = this.props,
            { embed: c, error: l } = this.state,
            h = c && this.state.attachmentId === this.props.attachment.id,
            u = (0, n.jsx)('div', { className: 'gui-spinner-icon' }),
            m = !!i && !!t,
            p = o()('embedded-media', { clickable: s && !l });
          return (0, n.jsx)(B, {
            className: p,
            data: h && null != c ? c : void 0,
            style: a,
            cover: m,
            loadingComponent: u,
            renderError: this.renderError,
            error: l,
            thumbnail: r,
            disabled: e,
            maxWidth: i,
            maxHeight: t,
            onClick: l ? void 0 : s,
            onError: this.handleError,
            containerWidth: d,
          });
        }
      };
      (W.contextType = r.I), (W = G([p.Z, z('design:paramtypes', [Object])], W));
      var $ = i(39262),
        K = function (e, t, i, n) {
          var s,
            a = arguments.length,
            o = a < 3 ? t : null === n ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
          if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
            o = Reflect.decorate(e, t, i, n);
          else
            for (var r = e.length - 1; r >= 0; r--)
              (s = e[r]) && (o = (a < 3 ? s(o) : a > 3 ? s(t, i, o) : s(t, i)) || o);
          return a > 3 && o && Object.defineProperty(t, i, o), o;
        },
        Z = function (e, t) {
          if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
            return Reflect.metadata(e, t);
        };
      const { ATTACHMENTS: Y } = m.Z.SHOWCASE;
      let J = class extends s.Component {
        constructor(e) {
          super(e),
            (this.isUnmounting = !1),
            (this.setContainerRef = (e) => {
              this.setState({ containerRef: e });
            }),
            (this.state = { mediaUrl: '', containerRef: null });
        }
        componentDidMount() {
          this.loadMedia();
        }
        componentWillUnmount() {
          this.isUnmounting = !0;
        }
        componentDidUpdate(e) {
          e.attachment.id !== this.props.attachment.id && this.loadMedia();
        }
        getImageUrl() {
          const { attachment: e, cover: t, smartWidth: i, smartHeight: n } = this.props,
            { mediaUrl: s } = this.state;
          if (!(0, $.lV)(e)) return null;
          if (!t || void 0 === i || void 0 === n || !(0, $.Uq)(e)) return s;
          const a = -1 !== s.indexOf('?');
          return `${s}${a ? '&' : '?'}height=${n}&crop=${i}:${n},smart`;
        }
        async loadMedia() {
          const { attachment: e, thumbnail: t } = this.props,
            i = t && e.thumbnailUrl ? e.thumbnailUrl : e.url,
            n = await i.get();
          this.isUnmounting || this.setState({ mediaUrl: n });
        }
        onDownloadClicked(e) {
          e.stopPropagation(),
            this.context.analytics.trackGuiEvent('attachment_media_download_clicked', {
              data: this.props.attachment.mimeType,
            });
        }
        render() {
          const { attachment: e, inline: t, onClick: i, style: s, containerWidth: a } = this.props,
            { id: r, category: d, filename: l, bytes: h } = e;
          if (d !== c.G$.UPLOAD) return null;
          const u = this.getImageUrl(),
            m = o()('attachment-view', { clickable: !!i });
          if (u)
            return (0, n.jsx)(T, {
              id: r,
              url: u,
              style: s,
              onClick: i,
              className: m,
              containerWidth: a,
            });
          {
            const { mediaUrl: e } = this.state,
              a = this.context.locale.t(Y.DOWNLOAD_TOOLTIP),
              r = h ? (0, $.VV)(h) : '';
            return (0, n.jsxs)(
              'div',
              Object.assign(
                { className: o()(m, 'attachment-other', { inline: t }), onClick: i, style: s },
                {
                  children: [
                    !t && (0, n.jsx)('div', { className: 'icon icon-paper-clip' }),
                    (0, n.jsxs)(
                      'div',
                      Object.assign(
                        { className: 'attachment-label' },
                        {
                          children: [
                            (0, n.jsx)(
                              'div',
                              Object.assign({ className: 'file-label' }, { children: l }),
                            ),
                            r &&
                              !t &&
                              (0, n.jsx)(
                                'div',
                                Object.assign({ className: 'size-label' }, { children: r }),
                              ),
                          ],
                        },
                      ),
                    ),
                    !t &&
                      e &&
                      (0, n.jsxs)(n.Fragment, {
                        children: [
                          (0, n.jsx)(
                            'a',
                            Object.assign(
                              {
                                className: 'link download-link',
                                ref: this.setContainerRef,
                                href: e,
                                download: !0,
                                target: '_blank',
                                onClick: (e) => {
                                  this.onDownloadClicked(e);
                                },
                              },
                              { children: (0, n.jsx)('span', { className: 'icon-download' }) },
                            ),
                          ),
                          (0, n.jsx)(F.u, { target: this.state.containerRef, title: a }),
                        ],
                      }),
                  ],
                },
              ),
            );
          }
        }
      };
      function q({ id: e, width: t, height: i, srcDoc: a, onLoad: o }) {
        const r = new URLSearchParams(new URL(e, window.location.href).search).get('parent'),
          d = (0, s.useCallback)(
            function (e) {
              o(e.currentTarget, r || '');
            },
            [o, r],
          );
        return (0, n.jsx)(
          'iframe',
          {
            style: { width: t ? `${t}px` : '100%', height: i ? `${i}px` : '100%', border: 0 },
            srcDoc: a,
            onLoad: d,
            referrerPolicy: 'no-referrer',
            sandbox: 'allow-scripts',
          },
          e,
        );
      }
      (J.contextType = r.I), (J = K([p.Z, Z('design:paramtypes', [Object])], J));
      const { ATTACHMENTS: Q } = m.Z.SHOWCASE,
        X = ({
          attachment: e,
          onClick: t,
          inline: i,
          canDelete: a,
          hero: m,
          containerWidth: p,
          width: g,
          height: v,
          thumbnail: y,
          onError: f,
          onDelete: w,
        }) => {
          const { commandBinder: b, locale: T } = (0, s.useContext)(r.I),
            C = (0, l.z)(),
            [E, D] = (0, s.useState)(null),
            [x, A] = (0, u.h4)(),
            O = (0, s.useMemo)(() => T.t(Q.DELETE_ATTACHMENT_TOOLTIP), [T]),
            S = (0, $.lV)(e),
            P = (0, h.e)(),
            I = {
              attachment: e,
              thumbnail: y,
              containerWidth: p || A.width,
              onClick: t
                ? (i) => {
                    t && t(i, e.id);
                  }
                : void 0,
            };
          return (0, n.jsxs)(
            'div',
            Object.assign(
              {
                className: o()('attachment', `attachment-${e.category}`, {
                  inline: !!i,
                  hero: !!m,
                  'non-viewable': !S,
                }),
                ref: x,
              },
              {
                children: [
                  e.category === c.G$.UPLOAD
                    ? (0, n.jsxs)(n.Fragment, {
                        children: [
                          (0, n.jsx)(
                            'div',
                            Object.assign(
                              { className: 'attachment-preview', ref: D },
                              { children: (0, n.jsx)(J, Object.assign({}, I, { inline: i })) },
                            ),
                          ),
                          a &&
                            (0, n.jsx)(F.u, { target: E, title: null == e ? void 0 : e.filename }),
                        ],
                      })
                    : e.category === c.G$.EXTERNAL
                      ? (0, n.jsx)(
                          W,
                          Object.assign({}, I, { compact: i, width: g, height: v, onError: f }),
                        )
                      : ee(e)
                        ? (0, n.jsx)(q, {
                            id: e.src,
                            width: e.width,
                            height: e.height,
                            srcDoc: e.srcDoc,
                            onLoad: e.onLoad,
                          })
                        : (0, n.jsx)('div', { children: 'Unknown Attachment Category' }),
                  a &&
                    (0, n.jsx)(F.zx, {
                      icon: 'close',
                      className: 'attachment-delete',
                      size: F.qE.SMALL,
                      variant: F.Wu.FAB,
                      theme: 'dark',
                      tooltip: O,
                      tooltipOptions: { placement: 'bottom-start' },
                      onClick: (t) => {
                        t.stopPropagation(),
                          t.preventDefault(),
                          a &&
                            (C.trackGuiEvent('attachments_click_remove', { tool: P }),
                            w ? w(e) : b.issueCommand(new d.$T(e)));
                      },
                    }),
                ],
              },
            ),
          );
        };
      function ee(e) {
        return e.category === c.G$.SANDBOX;
      }
    },
    64474: (e, t, i) => {
      'use strict';
      i.d(t, { T: () => g });
      var n = i(85893),
        s = i(67294),
        a = i(94184),
        o = i.n(a),
        r = i(49627),
        d = i(86388),
        c = i(80308),
        l = i(17106),
        h = i(50645),
        u = i(68738),
        m = i(41865),
        p = i(72043);
      const g = ({ attachments: e, onClick: t, onNavigate: i, startIndex: a = 0, onError: c }) => {
        const g = (0, m.z)(),
          [y, { width: f }] = (0, r.h4)(),
          w = (0, p.n)(),
          { ref: b, height: T } = (0, d.Z)({ box: 'border-box' }),
          [C, E] = (0, s.useState)(a),
          [D, x] = (0, s.useState)(),
          A = e.length,
          O = (0, l.e)();
        (0, s.useEffect)(() => {
          a !== C && E(a);
        }, [a, e]),
          (0, s.useEffect)(() => {
            x(w ? 0 : T);
          }, [T, w]);
        const S = (0, s.useCallback)(
            (e) => {
              e.stopPropagation();
              const t = C + 1 < A ? C + 1 : 0;
              g.trackGuiEvent('attachments_viewer_next', { tool: O }), E(t), i && i(t);
            },
            [i, C, g, A],
          ),
          P = (0, s.useCallback)(
            (e) => {
              e.stopPropagation();
              const t = C > 0 ? C - 1 : A - 1;
              g.trackGuiEvent('attachments_viewer_prev', { tool: O }), E(t), i && i(t);
            },
            [i, C, g, A],
          ),
          I = (0, s.useCallback)(
            (e, t) => {
              e.stopPropagation();
              const n = t;
              g.trackGuiEvent('attachments_viewer_dot_clicked', { tool: O }), E(n), i && i(n);
            },
            [i, g],
          ),
          k = e[C];
        if (!k) return null;
        const N = A > 1;
        return (0, n.jsxs)(
          'div',
          Object.assign(
            { className: 'attachment-carousel', ref: y },
            {
              children: [
                (0, n.jsx)(
                  'div',
                  Object.assign(
                    { className: 'attachment-carousel-view', style: { height: D } },
                    {
                      children: (0, n.jsx)(
                        'div',
                        Object.assign(
                          { className: 'attachment-container', ref: b },
                          {
                            children: (0, n.jsx)(h.P, {
                              attachment: k,
                              onClick: t,
                              thumbnail: !1,
                              containerWidth: f || 318,
                              onError: c,
                            }),
                          },
                        ),
                      ),
                    },
                  ),
                ),
                N &&
                  (0, n.jsx)(u.hU, {
                    className: o()('modal-nav', 'modal-prev'),
                    iconClass: 'icon-dpad-left',
                    onClick: P,
                  }),
                N &&
                  (0, n.jsx)(u.hU, {
                    className: o()('modal-nav', 'modal-next'),
                    iconClass: 'icon-dpad-right',
                    onClick: S,
                  }),
                N &&
                  (0, n.jsx)(
                    'div',
                    Object.assign(
                      { className: 'carousel-bullets' },
                      {
                        children: e.map((e, t) =>
                          (0, n.jsx)(v, { index: t, active: t === C, onSelect: I }, t),
                        ),
                      },
                    ),
                  ),
              ],
            },
          ),
        );
      };
      function v({ index: e, active: t, onSelect: i }) {
        return (0, n.jsx)(c.zx, {
          icon: 'simple-tag',
          onClick: (t) => i(t, e),
          className: o()('carousel-bullet', { 'carousel-bullet-active': t }),
        });
      }
    },
    97250: (e, t, i) => {
      'use strict';
      i.r(t),
        i.d(t, {
          Attachment: () => o.P,
          AttachmentCategory: () => r.G$,
          AttachmentEmbedStatus: () => r._V,
          AttachmentUploadDoneMessage: () => d.RE,
          AttachmentUploadError: () => r.kV,
          AttachmentUploadProgressMessage: () => d.Vj,
          AttachmentViewerCommand: () => R.xW,
          AttachmentsData: () => N.b,
          AttachmentsStore: () => w,
          CancelAttachmentChangesCommand: () => R.Ze,
          CancelAttachmentUploadCommand: () => R.sE,
          CloseAttachmentViewerMessage: () => d.Rd,
          ConfirmAttachmentChangesCommand: () => R.iu,
          DeleteAttachmentCommand: () => R.ZT,
          EmbedMediaCommand: () => R.wu,
          EmbeddingDoneMessage: () => d.v8,
          ExternalAttachmentDeserializer: () => p.d,
          ExternalAttachmentSerializer: () => m,
          FileAttachmentDeserializer: () => g.O,
          FileAttachmentStorage: () => k,
          FileUploadDeserializer: () => S,
          FileUploadSerializer: () => P,
          LoadEmbeddedMediaCommand: () => R.st,
          MediaType: () => r.DD,
          RemoveAttachmentCommand: () => R.$T,
          RemoveFailureCommand: () => R.Rh,
          ResetAttachmentChangesCommand: () => R.x9,
          UploadAttachmentsCommand: () => R.It,
          ViewAttachmentsMessage: () => d.O,
          default: () => _,
          makeExternalAttachmentDeserializer: () => p.n,
          makeFileAttachmentDeserializer: () => g.f,
        });
      var n = i(933),
        s = i(25589),
        a = i(80383),
        o = i(37250),
        r = i(12437),
        d = i(86809),
        c = i(93797),
        l = i(99793),
        h = i(53257),
        u = i(39262);
      class m {
        constructor() {
          (this.getAttachmentDetails = (e) =>
            e.mediaType
              ? {
                  mediaType: (0, u.m)(e.mediaType),
                  srcUrl: e.src,
                  thumbnailUrl: e.src,
                  width: e.width,
                  height: e.height,
                }
              : null),
            (this.validate = (e) => !!e && void 0 !== e.mediaType);
        }
        serialize(e) {
          const t = this.getAttachmentDetails(e);
          return t && this.validate(t) ? t : null;
        }
      }
      var p = i(15352),
        g = i(47994),
        v = i(36159),
        y = i(63437);
      const f = new h.Z('AttachmentsStore');
      class w extends c.u {
        constructor(e) {
          super(e),
            (this.embedSerializer = new m()),
            (this.embedDeserializer = new p.d()),
            (this.fileDeserializer = new g.O());
        }
        create(e) {
          if (0 === e.length) return Promise.resolve(null);
          const t = e[0].parentId,
            i = e[0].parentType;
          if (e.find((e) => e.parentId !== t || e.parentType !== i))
            throw new Error('Cannot attach to different parents in one request');
          const n = this.getViewId(),
            s = [],
            o = [];
          let d, c;
          if (
            (e.forEach((e) => {
              if (e.category === r.G$.EXTERNAL) {
                const t = this.embedSerializer.serialize(e);
                if (!t)
                  throw (
                    (f.error('Failure attaching external attachment:', e),
                    new Error('Could not attach External Attachment'))
                  );
                s.push(t);
              } else e.category === r.G$.UPLOAD && o.push(e.id);
            }),
            i !== a.ud.COMMENT)
          )
            throw new Error(`Cannot attach to attachment to a ${i}`);
          return (
            (d = v.AddCommentAttachments),
            (c = 'addCommentAttachments'),
            this.mutate(d, {
              modelId: n,
              parentId: t,
              externalAttachments: s,
              fileAttachments: o,
            }).then((e) => {
              const t = [],
                i = (0, l.q)(e, `data.${c}.externalAttachments`);
              if (i && Array.isArray(i))
                for (const e of i) {
                  const i = this.embedDeserializer.deserialize(e);
                  i && t.push(i);
                }
              const n = (0, l.q)(e, `data.${c}.fileAttachments`);
              if (n && Array.isArray(n))
                for (const e of n) {
                  const i = this.fileDeserializer.deserialize(e);
                  i && t.push(i);
                }
              return t.reduce((e, t) => ((e[t.id] = t), e), {});
            })
          );
        }
        async remove(e) {
          const { id: t, parentId: i, parentType: n } = e,
            s = this.getViewId(),
            a = await this.mutate(y.RemoveFileAttachment, {
              modelId: s,
              attachmentId: t,
              parentType: n,
              parentId: i,
            }),
            o = (0, l.q)(a, 'data.removeFileAttachment') || !1;
          return o || f.error('remove file attachment failed!'), o;
        }
        async delete(e, t, i) {
          const n = this.getViewId();
          return Promise.all(
            e.map((e) =>
              this.mutate(y.DeleteExternalAttachment, {
                modelId: n,
                attachmentId: e,
                parentType: i,
                parentId: t,
              }),
            ),
          );
        }
        getViewId() {
          if (!this.viewId) throw new Error('Invalid valid id!');
          return this.viewId;
        }
      }
      var b = i(98231),
        T = i(3952),
        C = i(79978),
        E = i(10637);
      var D = i(44602),
        x = i(38256),
        A = i(96544);
      const O = new h.Z('file-upload-deserializer');
      class S {
        deserialize(e) {
          if (!e || !this.validate(e))
            return O.debug('Deserialized invalid file attachment data from MDS', e), null;
          const t = new o.P();
          return (
            (t.id = e.id),
            (t.created = (0, x.p)(e.created)),
            e.mimeType && ((t.mimeType = e.mimeType), (t.mediaType = (0, u.id)(e.mimeType))),
            (t.thumbnailUrl = new A.n(e.url || '', (0, x.p)(e.validUntil, null))),
            (t.url = new A.n(e.url || '', (0, x.p)(e.validUntil, null))),
            (t.filename = e.filename || ''),
            (t.bytes = e.bytes || 0),
            (t.category = r.G$.UPLOAD),
            (t.width = e.imageWidth || 0),
            (t.height = e.imageHeight || 0),
            t
          );
        }
        validate(e) {
          return ['id', 'created', 'url', 'filename', 'mimeType', 'validUntil'].every(
            (t) => t in e,
          );
        }
      }
      class P {
        constructor() {}
        serialize(e) {
          return { filename: e.file.name, contents: { filename: e.file.name, blob: e.file } };
        }
      }
      const I = new h.Z('FileAttachmentStorage');
      class k extends class {
        constructor(e) {
          const { baseUrl: t } = e;
          (this.config = e),
            (this.context = e.context),
            (this.client = new T.w({ baseUrl: t, server: E.wO, apqEnabled: e.context.apqEnabled }));
        }
        get readonly() {
          return this.config.readonly;
        }
        async create(...e) {
          throw new b.n();
        }
        async read(e = {}) {
          throw new b.n();
        }
        async update(...e) {
          throw new b.n();
        }
        async delete(...e) {
          throw new b.n();
        }
        async query(e, t, i = {}) {
          if (!this.context.baseViewId)
            throw new C.SN('Cannot read Attachments, no model view configured');
          return this.client.query(e, t, i);
        }
        async mutate(e, t, i) {
          const { readonly: n } = this.config;
          if (n) throw new C.pp('Cannot write Attachments, model is in read-only mode');
          if (!this.context.baseViewId)
            throw new C.SN('Cannot write Attachments, no model view configured');
          return this.client.mutate(e, t, i);
        }
      } {
        constructor(e) {
          super(e),
            (this.uploadDeserializer = new S()),
            (this.uploadSerializer = new P()),
            (this.attachmentDeserializer = new g.O());
        }
        async create(e, t) {
          const i = this.context.baseViewId,
            n = this.uploadSerializer.serialize(e);
          let s;
          try {
            s = await this.client.upload(
              D.UploadFileAttachmentToModel,
              'UploadFileAttachmentToModel',
              Object.assign(Object.assign({}, n), {
                modelId: i,
                organizationId: this.config.organizationId,
              }),
              t,
              e.xhr,
            );
          } catch (t) {
            return (
              I.error(t),
              t.code.includes('quota.exceeded')
                ? (e.error = r.kV.OVER_QUOTA)
                : (e.error = r.kV.UPLOAD_FAILED),
              (e.progress = 100),
              e
            );
          }
          if (s.errors && s.errors.length > 0) I.error(s.errors), (e.error = r.kV.UPLOAD_FAILED);
          else {
            const t = (0, l.q)(s, 'data.uploadFileAttachmentToModel') || null;
            if (t) {
              const i = this.uploadDeserializer.deserialize(t);
              i
                ? (I.info('upload successful!'), (e.attachment = i))
                : (I.error('cannot create attachment'), (e.error = r.kV.UPLOAD_FAILED));
            } else I.error('upload failed!'), (e.error = r.kV.UPLOAD_FAILED);
          }
          return (e.progress = 100), e;
        }
        async delete(e) {
          const t = await this.client.mutate(D.DeleteFileAttachment, { id: e }),
            i = (0, l.q)(t, 'data.deleteFileAttachment') || !1;
          return i ? I.info('upload deleted!') : I.error('upload deletion failed!'), i;
        }
        async read() {
          var e, t, i;
          const n = this.context.baseViewId;
          if (!n) return I.error('Missing model ID'), [];
          const s =
              null !==
                (i =
                  null ===
                    (t =
                      null ===
                        (e = (
                          await this.client.query(D.FileAttachments, { modelId: n, pageSize: 1e3 })
                        ).data) || void 0 === e
                        ? void 0
                        : e.fileAttachmentsByModelId) || void 0 === t
                    ? void 0
                    : t.results) && void 0 !== i
                ? i
                : [],
            a = [];
          return (
            s.forEach((e) => {
              const t = this.attachmentDeserializer.deserialize(e);
              t && a.push(t);
            }),
            a
          );
        }
      }
      var N = i(51141),
        R = i(25629),
        M = i(39786),
        j = i(11234);
      function L(e) {
        switch (e) {
          case j.ht.PHOTO:
            return r.DD.IMAGE;
          case j.ht.VIDEO:
            return r.DD.VIDEO;
          case j.ht.RICH:
            return r.DD.RICH;
          default:
            return;
        }
      }
      function B(e) {
        const { height: t, width: i, thumbnail_height: n, thumbnail_width: s, cache_age: a } = e,
          o = (void 0 === t || void 0 === i) && s && n,
          r = e.type === j.ht.PHOTO ? e.url : void 0,
          d = e.thumbnail_url || r,
          c = a ? new Date(Date.now() + 1e3 * a) : null;
        return {
          width: o ? s : i,
          height: o ? n : t,
          mediaType: L(e.type),
          url: new A.n(r || '', c),
          thumbnailUrl: new A.n(d || '', c),
        };
      }
      var V = i(22925);
      class F extends n.Y {
        constructor() {
          super(...arguments),
            (this.name = 'attachments-module'),
            (this.loadEmbeddedAttachment = async (e) => this.getUpdatedEmbed(e.attachment)),
            (this.embedMedia = async (e) => {
              let t,
                i = null;
              const n = await this.oEmbedConsumer.getOEmbedData(e.src);
              return (
                n
                  ? ((i = new o.P()),
                    (i.id = (0, s.fV)()),
                    (i.parentType = e.parentType),
                    (i.parentId = e.parentId),
                    (i.src = e.src),
                    (i.category = r.G$.EXTERNAL),
                    Object.assign(i, B(n)),
                    this.attachmentsData.addPending(i),
                    (t = r._V.EMBED_SUCCESS))
                  : (t = r._V.EMBED_FAIL),
                this.engine.broadcast(new d.v8(i, t, e.parentId, e.parentType)),
                i
              );
            }),
            (this.uploadAttachments = (e) => {
              const { parentType: t, parentId: i, files: n } = e,
                s = this.attachmentsData,
                a = [];
              return (
                n.forEach((e) => {
                  const n = this.uploadAttachment(e, i, t).then(
                    (e) => (
                      s.atomic(() => {
                        e.error
                          ? (s.removeUpload(e.id), s.addFailure(e))
                          : e.attachment &&
                            ((e.attachment.parentId = i),
                            (e.attachment.parentType = t),
                            s.removeUpload(e.id),
                            s.addPending(e.attachment));
                      }),
                      this.engine.broadcast(new d.RE(e)),
                      e
                    ),
                  );
                  a.push(n);
                }),
                Promise.all(a)
              );
            }),
            (this.onProgress = (e, t) => {
              if (!e.lengthComputable) return;
              const i = e.total > 0 ? Math.floor((e.loaded / e.total) * 100) : 100,
                n = Object.assign(Object.assign({}, t), { progress: i });
              this.attachmentsData.updateUpload(n), this.engine.broadcast(new d.Vj(n));
            }),
            (this.removeFailure = async (e) => {
              this.attachmentsData.removeFailure(e.id);
            }),
            (this.removeAttachment = async (e) => {
              if (this.fileAttachmentStorage.readonly)
                return void this.log.error('File attachment storage is readonly');
              const { attachment: t } = e,
                i = this.attachmentsData,
                n = i.getPendingAttachment(t.id);
              n
                ? (n.category === r.G$.UPLOAD && (await this.fileAttachmentStorage.delete(t.id)),
                  i.removePendingAttachment(t.id))
                : i.markAttachmentForDelete(t);
            }),
            (this.confirmAttachmentChanges = async (e) => {
              const t = this.attachmentsData,
                { pendings: i, removals: n } = t,
                { parentId: s, parentType: o, prevParentId: d } = e,
                c = i.length > 0 || n.length > 0;
              if (i.length > 0) {
                const e = d || s;
                t.iteratePending((t) => {
                  d && t.parentId === e && t.parentType === o && (t.parentId = s);
                });
                const n =
                  o !== a.ud.MATTERTAG
                    ? i.values
                    : i.values.filter((e) => e.category === r.G$.UPLOAD);
                await this.attachmentsStore.create(n);
              }
              if (n.length > 0) {
                const e =
                  o !== a.ud.MATTERTAG
                    ? n.values
                    : n.values.filter((e) => e.category === r.G$.UPLOAD);
                e.length > 0 && (await this.deleteAttachments(e, s, o));
              }
              return this.resetAttachmentData(), c;
            }),
            (this.cancelAttachmentUpload = async (e) => {
              const { uploads: t } = this.attachmentsData,
                i = null == t ? void 0 : t.get(e.uploadId);
              (null == i ? void 0 : i.xhr) &&
                (i.xhr.abort(), this.attachmentsData.removeUpload(e.uploadId));
            }),
            (this.cancelAttachmentChanges = async () => {
              const e = this.attachmentsData,
                { pendings: t, uploads: i, removals: n } = e;
              (0 === t.length && 0 === n.length && 0 === i.length) ||
                (this.fileAttachmentStorage.readonly
                  ? this.log.error('File attachment storage is readonly')
                  : (t.values.forEach((e) => {
                      e.category === r.G$.UPLOAD && this.fileAttachmentStorage.delete(e.id);
                    }),
                    i.length &&
                      i.values.map((e) => this.cancelAttachmentUpload({ uploadId: e.id })),
                    this.resetAttachmentData()));
            }),
            (this.deleteAttachments = async (e, t, i) => {
              if (this.fileAttachmentStorage.readonly)
                return void this.log.error('File attachment storage is readonly');
              if (0 === e.length) return;
              const n = [],
                s = [];
              this.attachmentsData.atomic(() => {
                e.forEach((e) => {
                  e.category === r.G$.UPLOAD
                    ? n.push(e)
                    : e.category === r.G$.EXTERNAL && s.push(e.id);
                });
              }),
                n.length > 0 && (await Promise.all(n.map((e) => this.attachmentsStore.remove(e)))),
                s.length > 0 && (await this.attachmentsStore.delete(s, t, i));
            }),
            (this.handleAttachmentViewerCommand = async (e) => {
              const { open: t, attachments: i, attachmentId: n } = e;
              t && i ? this.openAttachmentViewer(i, n) : this.closeAttachmentViewer();
            }),
            (this.immediatelyDeleteAttachment = async (e) => {
              this.fileAttachmentStorage.readonly
                ? this.log.error('File attachment storage is readonly')
                : e.id
                  ? await this.fileAttachmentStorage.delete(e.id)
                  : this.log.error('ID required to delete attachment');
            });
        }
        async init(e, t) {
          this.engine = t;
          const i = await t.market.waitForData(V.R),
            { organizationId: n, oEmbedConsumer: s } = e;
          this.attachmentsStore = new w({ context: i.mdsContext, readonly: !1 });
          const a = () => {
            this.attachmentsStore.setStoreViewId(i.getNonworkshopViewId());
          };
          a(),
            this.bindings.push(i.onPropertyChanged('currentViewId', a)),
            (this.fileAttachmentStorage = new k(
              Object.assign({ context: i.mdsContext, readonly: !n, organizationId: n }, e),
            )),
            (this.oEmbedConsumer = await s),
            (this.attachmentsData = new N.b()),
            this.bindings.push(
              t.commandBinder.addBinding(R.It, this.uploadAttachments),
              t.commandBinder.addBinding(R.wu, this.embedMedia),
              t.commandBinder.addBinding(R.st, this.loadEmbeddedAttachment),
              t.commandBinder.addBinding(R.iu, this.confirmAttachmentChanges),
              t.commandBinder.addBinding(R.sE, this.cancelAttachmentUpload),
              t.commandBinder.addBinding(R.Ze, this.cancelAttachmentChanges),
              t.commandBinder.addBinding(R.x9, async () => this.resetAttachmentData()),
              t.commandBinder.addBinding(R.$T, this.removeAttachment),
              t.commandBinder.addBinding(R.Rh, this.removeFailure),
              t.commandBinder.addBinding(R.xW, this.handleAttachmentViewerCommand),
              t.commandBinder.addBinding(R.ZT, this.immediatelyDeleteAttachment),
            ),
            t.market.register(this, N.b, this.attachmentsData);
        }
        async getUpdatedEmbed(e) {
          if (e.category === r.G$.EXTERNAL) {
            const t = await this.oEmbedConsumer.getOEmbedData(e.src);
            return Object.assign(e, B(t)), t;
          }
          return null;
        }
        async uploadAttachment(e, t, i) {
          const n = {
            file: e,
            id: (0, s.fV)(),
            progress: 0,
            error: null,
            attachment: null,
            parentId: t,
            parentType: i,
            xhr: new XMLHttpRequest(),
          };
          if (this.fileAttachmentStorage.readonly)
            return (
              this.log.error('File attachment storage is readonly'),
              (n.error = r.kV.PERMISSION_DENIED),
              Promise.resolve(n)
            );
          const a = e.size;
          return 0 === a
            ? ((n.error = r.kV.EMPTY_FILE), Promise.resolve(n))
            : a > M.z6
              ? ((n.error = r.kV.FILE_TOO_LARGE), Promise.resolve(n))
              : (this.attachmentsData.addUpload(n),
                this.fileAttachmentStorage.create(n, (e) => this.onProgress(e, n)));
        }
        resetAttachmentData() {
          const e = this.attachmentsData;
          e.atomic(() => {
            e.clearPending(), e.clearRemovals(), e.clearUploads(), e.clearFailures();
          });
        }
        openAttachmentViewer(e, t) {
          (this.viewerOpen = !0), this.engine.broadcast(new d.O(e, t));
        }
        closeAttachmentViewer() {
          this.viewerOpen && ((this.viewerOpen = !1), this.engine.broadcast(new d.Rd()));
        }
        async getAllAttachments() {
          return this.fileAttachmentStorage.read();
        }
      }
      const _ = F;
    },
    86809: (e, t, i) => {
      'use strict';
      i.d(t, { O: () => s, RE: () => r, Rd: () => a, Vj: () => o, v8: () => d });
      var n = i(8126);
      class s extends n.v0 {
        constructor(e, t) {
          super(), (this.attachments = e), (this.attachmentId = t);
        }
      }
      class a extends n.v0 {}
      class o extends n.v0 {
        constructor(e) {
          super(), (this.upload = e);
        }
      }
      class r extends n.v0 {
        constructor(e) {
          super(), (this.upload = e);
        }
      }
      class d extends n.v0 {
        constructor(e, t, i, n) {
          super(),
            (this.attachment = e),
            (this.status = t),
            (this.parentId = i),
            (this.parentType = n);
        }
      }
    },
    3433: (e, t, i) => {
      'use strict';
      i.d(t, { Z: () => s });
      var n = i(933);
      class s extends n.Y {
        constructor() {
          super(...arguments), (this.name = 'base-controls'), (this.inputBindings = []);
        }
        registerActiveStateChangeBinding() {
          this.bindings.push(this.controls.onActiveStateChanged(() => this.onActiveStateChanged()));
        }
        updateInputBindings() {
          this.controls.isActive
            ? this.inputBindings.forEach((e) => e.renew())
            : this.inputBindings.forEach((e) => e.cancel());
        }
        onActiveStateChanged() {
          this.controls.stop(), this.updateInputBindings();
        }
        dispose(e) {
          super.dispose(e);
          for (const e of this.inputBindings) e.cancel();
          this.inputBindings = [];
        }
      }
    },
    68467: (e, t, i) => {
      'use strict';
      i.d(t, { Z: () => s });
      var n = i(85726);
      class s {
        constructor() {
          this.poseControllerObservable = (0, n.Y)(null);
        }
        get poseController() {
          return this.poseControllerObservable.value;
        }
        setController(e) {
          return (this.poseControllerObservable.value = e), this;
        }
        get isActive() {
          return null != this.poseController;
        }
        onActiveStateChanged(e) {
          return this.poseControllerObservable.onChanged(e);
        }
      }
    },
    31849: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => y });
      var n = i(933),
        s = i(4763),
        a = i(81396),
        o = i(72803),
        r = i(37437);
      const d = new a.Vector3(0, 1, 0),
        c = 16724312,
        l = [
          { innerRadius: 0, outerRadius: 0.42, color: c, opacity: 0.7 },
          { innerRadius: 0.67, outerRadius: 1, color: c, opacity: 0.7 },
        ];
      class h {
        constructor(e, t, i) {
          (this.scene = e),
            (this.sweepData = t),
            (this.mesh = new r.f({ radius: 0.25, normal: d, rings: l })),
            (this.mesh.name = 'CurrentPanoMarker'),
            (this.mesh.renderOrder = o.z.panoMarker),
            (this.mesh.layers.mask = i.mask);
        }
        init() {}
        dispose() {
          this.mesh.dispose();
        }
        render() {
          const e = this.sweepData.currentAlignedSweepObject;
          e && this.move(e.floorPosition);
        }
        activate() {
          this.scene.add(this.mesh);
        }
        deactivate() {
          this.scene.remove(this.mesh);
        }
        move(e) {
          this.mesh.position.copy(e).setY(e.y + h.floorOffset);
        }
      }
      h.floorOffset = 0.01;
      var u = i(90512),
        m = i(31740),
        p = i(56063);
      class g extends p.m {
        constructor(e) {
          super(), (this.payload = { enabled: e });
        }
      }
      g.id = 'TOGGLE_PANO_MARKER';
      var v = i(43017);
      class y extends n.Y {
        constructor() {
          super(...arguments),
            (this.name = 'current-pano-marker'),
            (this.state = { markerEnabled: !1, transitionPromise: null });
        }
        async init(e, t) {
          const i = (await t.getModuleBySymbol(s.Aj)).getScene(),
            n = t.claimRenderLayer(this.name),
            [a, o] = await Promise.all([t.market.waitForData(m.Z), t.market.waitForData(u.O)]);
          (this.engine = t),
            (this.sweepData = a),
            (this.viewmodeData = o),
            (this.markerRenderer = new h(i, a, n)),
            this.bindings.push(
              t.commandBinder.addBinding(g, async ({ enabled: e }) => this.setCommandOverride(e)),
              this.viewmodeData.makeModeChangeSubscription(() => this.updateMarker()),
              this.sweepData.makeSweepChangeSubscription(() => this.updateMarker()),
            ),
            this.updateMarker();
        }
        setCommandOverride(e) {
          (this.state.commandOverride = e), this.updateMarker();
        }
        async updateMarker() {
          const { commandOverride: e } = this.state,
            t = this.viewmodeData.currentMode,
            i = this.sweepData.currentAlignedSweepObject,
            n = !1 === e || (0, v.Bw)(t) || t === v.Ey.Transition;
          return this.toggleMarker(!!i && !n);
        }
        async toggleMarker(e) {
          const { markerEnabled: t, transitionPromise: i } = this.state;
          if ((i && (await i), t === e)) return;
          const n = e ? this.enableMarker() : this.disableMarker();
          return (
            (this.state.transitionPromise = n.finally(() => {
              (this.state.markerEnabled = e), (this.state.transitionPromise = null);
            })),
            this.state.transitionPromise
          );
        }
        async enableMarker() {
          return this.engine.addComponent(this, this.markerRenderer);
        }
        async disableMarker() {
          return this.engine.removeComponent(this, this.markerRenderer);
        }
      }
    },
    59536: (e, t, i) => {
      'use strict';
      i.d(t, { y: () => s });
      var n = i(56063);
      class s extends n.m {
        constructor(e) {
          super(), (this.payload = { disable: e });
        }
      }
      s.id = 'DISABLE_CURSOR_MESH';
    },
    20883: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => m });
      var n = i(933),
        s = i(4763),
        a = i(43017),
        o = i(90512),
        r = i(72392),
        d = i(55574),
        c = i(31740),
        l = i(59536),
        h = i(64150),
        u = i(74565);
      class m extends n.Y {
        constructor() {
          super(...arguments),
            (this.name = 'cursor-controller'),
            (this.visibilityRules = []),
            (this.disabled = !1);
        }
        async init(e, t) {
          this.bindings.push(
            t.commandBinder.addBinding(l.y, async (e) => {
              this.disabled = e.disable;
            }),
          ),
            ([this.cursorMesh, this.cursorModule] = await Promise.all([
              t.getModuleBySymbol(s.Zp),
              t.getModuleBySymbol(s.tg),
            ])),
            this.visibilityRules.push(
              () => {
                const e = t.market.tryGetData(o.O);
                return !!e && (0, a.Bw)(e.closestMode);
              },
              () => {
                const e = t.market.tryGetData(c.Z);
                return !!e && !e.isSweepUnaligned(e.currentSweep);
              },
              () => {
                const e = t.market.tryGetData(r.k);
                return !!e && !e.isTourActive();
              },
              () => {
                const e = t.market.tryGetData(d.Z);
                return !!e && !e.isMobile();
              },
              () => {
                const e = t.market.tryGetData(h.e);
                return !!e && e.tryGetProperty(u.b, !0);
              },
            );
        }
        onUpdate() {
          this.updateCursorVisibility();
        }
        addVisibilityRule(e) {
          this.visibilityRules.push(e);
        }
        removeVisibilityRule(e) {
          const t = this.visibilityRules.indexOf(e);
          -1 !== t && this.visibilityRules.splice(t, 1);
        }
        setFadeProps(e) {
          this.cursorModule.setFadeProps(e);
        }
        updateCursorVisibility() {
          const e = !this.disabled && this.visibilityRules.reduce((e, t) => e && t(), !0);
          this.cursorMesh.setVisible(e);
        }
        setTexture(e) {
          this.cursorModule.setTexture(e);
        }
      }
    },
    74565: (e, t, i) => {
      'use strict';
      i.d(t, { b: () => n });
      const n = 'features/cursor';
    },
    37796: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => l });
      var n = i(4763),
        s = i(933),
        a = i(81396),
        o = i(5829),
        r = i(95142),
        d = i(59228),
        c = i(33716);
      class l extends s.Y {
        constructor() {
          super(...arguments),
            (this.name = 'cursor-data'),
            (this.fadeOutDelay = 700),
            (this.fadeOutDuration = 700),
            (this.fadeInDuration = 300),
            (this.movementThreshold = 0.003),
            (this.cursorState = new r.Y()),
            (this.position = new a.Vector2()),
            (this.timeToFade = 0);
        }
        async init(e, t) {
          (this.input = await t.getModuleBySymbol(n.PZ)),
            (this.raycasterData = await t.market.waitForData(c.P)),
            t.market.register(this, r.Y, this.cursorState),
            this.bindings.push(this.input.registerHandler(d.mE, this.onPointerMove.bind(this))),
            this.fadeInDuration > this.fadeOutDelay &&
              this.log.warn('fadeInDuration should be less than fadeOutDelay!');
        }
        onUpdate(e) {
          let t = !1;
          this.timeToFade > 0 && ((this.timeToFade -= e), this.timeToFade <= 0 && (t = !0)),
            this.cursorState.opacity.tick(e),
            this.cursorState.commit(),
            t && this.cursorState.opacity.modifyAnimation(1, 0, this.fadeOutDuration);
        }
        setFadeProps(e) {
          const { fadeOut: t, fadeIn: i } = e;
          (this.fadeOutDuration = t && t.duration ? t.duration : this.fadeOutDuration),
            (this.fadeOutDelay = t && t.delay ? t.delay : this.fadeOutDelay),
            (this.fadeInDuration = i && i.duration ? i.duration : this.fadeInDuration);
        }
        setTexture(e) {
          this.cursorState.texture = e;
        }
        onPointerMove() {
          if (
            null !== this.raycasterData.hit &&
            this.raycasterData.pointerNdcPosition.distanceToSquared(this.position) >
              this.movementThreshold
          ) {
            this.position.copy(this.raycasterData.pointerNdcPosition),
              (this.timeToFade = this.fadeOutDelay);
            const e = (0, o.t)(0, this.fadeInDuration, 1 - this.cursorState.opacity.value);
            this.cursorState.opacity.modifyAnimation(this.cursorState.opacity.value, 1, e),
              this.cursorState.commit();
          }
        }
        dispose(e) {
          super.dispose(e);
        }
      }
    },
    95142: (e, t, i) => {
      'use strict';
      i.d(t, { Y: () => a });
      var n = i(63926),
        s = i(42141);
      class a extends s.V {
        constructor() {
          super(), (this.name = 'cursor'), (this.opacity = new n.z(0)), (this.texture = null);
        }
      }
    },
    70102: (e, t, i) => {
      'use strict';
      var n;
      i.d(t, { L: () => n }),
        (function (e) {
          (e[(e.Reticle = 0)] = 'Reticle'), (e[(e.GridPlane = 1)] = 'GridPlane');
        })(n || (n = {}));
    },
    23670: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => p });
      var n = i(933),
        s = i(4763),
        a = i(81396),
        o = i(95142),
        r = i(33716),
        d = i(63511),
        c = i(70102),
        l = i(72803),
        h = i(37437);
      const u = [
        { outerRadius: 0.977, innerRadius: 0.926, color: 16777215, opacity: 1 },
        { outerRadius: 0.898, innerRadius: 0.648, color: 16777215, opacity: 0.73 },
      ];
      class m {
        constructor(e, t = d.o.ALL) {
          (this.scene = e),
            (this.layer = t),
            (this.supportsMobile = !1),
            (this.style = c.L.Reticle),
            (this.bindings = []),
            (this.onCursorDataUpdated = (e) => {
              this.mesh.configure({ opacity: e.opacity.value, texture: e.texture });
            }),
            (this.onPositionUpdate = (e) => {
              if (e.hit && e.hit.face) {
                const t = e.hit.point.clone(),
                  i = e.hit.face.normal;
                this.container.position.copy(t), this.mesh.configure({ normal: i });
              }
            }),
            (this.container = new a.Group()),
            (this.container.name = 'cursor'),
            (this.mesh = new h.f({ radius: 0.2, rings: u })),
            this.container.add(this.mesh),
            (this.mesh.renderOrder = l.z.reticule),
            (this.mesh.layers.mask = this.layer.mask);
        }
        init() {}
        render() {}
        dispose() {
          this.mesh.dispose(),
            this.container.children.forEach((e) => {
              if (e.isMesh && e !== this.mesh) {
                e.geometry.dispose();
                const t = e.material;
                t.dispose(), t.map && t.map.dispose();
              }
            });
        }
        async activate(e) {
          const t = await e.market.waitForData(o.Y),
            i = await e.market.waitForData(r.P);
          this.bindings.push(
            t.onChanged(this.onCursorDataUpdated),
            i.onChanged(this.onPositionUpdate),
          ),
            this.scene.add(this.container);
        }
        deactivate() {
          for (const e of this.bindings) e.cancel();
          (this.bindings.length = 0), this.scene.remove(this.container);
        }
        setVisible(e) {
          this.container.visible = e;
        }
      }
      class p extends n.Y {
        constructor() {
          super(...arguments),
            (this.name = 'cursor-mesh'),
            (this.setVisible = (e) => {
              this.cursor && this.cursor.setVisible(e);
            });
        }
        async init(e, t) {
          const i = (await t.getModuleBySymbol(s.Aj)).getScene(),
            n = t.claimRenderLayer(this.name);
          (this.cursor = new m(i, n)), t.addComponent(this, this.cursor);
        }
        get container() {
          return this.cursor.container;
        }
      }
    },
    24889: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => d });
      var n = i(933),
        s = i(4763),
        a = i(58066),
        o = i(81396),
        r = i(3835);
      class d extends n.Y {
        constructor() {
          super(...arguments),
            (this.name = 'fat-caster'),
            (this.rayAssembly = new Array(d.rayCount)),
            (this.rayPlaneOrientation = new o.Quaternion()),
            (this.rayVisuals = []);
        }
        async init(e, t) {
          (this.config = { debug: !!e.debug }), (this.raycaster = await t.getModuleBySymbol(s.fQ));
          for (let e = 0; e < d.rayCount; ++e) this.rayAssembly[e] = new o.Ray();
          if (e.debug) {
            const e = (await t.getModuleBySymbol(s.Aj)).getScene();
            for (let t = 0; t < d.rayCount; ++t) {
              this.rayVisuals[t] = new o.ArrowHelper(new o.Vector3(), new o.Vector3());
              const i = this.rayVisuals[t];
              i.remove(i.cone), i.setLength(1e3), e.add(this.rayVisuals[t]);
            }
          }
        }
        async dispose(e) {
          const t = (await e.getModuleBySymbol(s.Aj)).getScene();
          for (const e of this.rayVisuals) t.remove(e);
        }
        get ray() {
          return this.raycaster.pointer.pointerRay.clone();
        }
        cast(e, t, i = a.a.Filter.AVERAGE) {
          const n = this.ray;
          return this.updateRayAssembly(n.origin, n.direction, e), this.castRays(t, i);
        }
        castRays(e, t) {
          const i = [];
          let n = null;
          for (const t of this.rayAssembly) {
            const s = this.raycaster.picking.pick(t.origin, t.direction, e);
            s &&
              (t === this.rayAssembly[0] && (n = s),
              s.point.add(this.rayAssembly[0].origin).sub(t.origin),
              i.push(s));
          }
          return t(i, n, this.rayAssembly);
        }
        updateRayAssembly(e, t, i) {
          for (const e of this.rayAssembly) e.direction.copy(t);
          if (
            (this.rayPlaneOrientation.setFromUnitVectors(r.fU.FORWARD, t),
            this.rayAssembly[0].origin.copy(e),
            this.rayAssembly[1].origin
              .copy(r.fU.RIGHT)
              .multiplyScalar(i)
              .applyQuaternion(this.rayPlaneOrientation)
              .add(e),
            this.rayAssembly[2].origin
              .copy(r.fU.UP)
              .multiplyScalar(i)
              .applyQuaternion(this.rayPlaneOrientation)
              .add(e),
            this.rayAssembly[3].origin
              .copy(r.fU.LEFT)
              .multiplyScalar(i)
              .applyQuaternion(this.rayPlaneOrientation)
              .add(e),
            this.rayAssembly[4].origin
              .copy(r.fU.DOWN)
              .multiplyScalar(i)
              .applyQuaternion(this.rayPlaneOrientation)
              .add(e),
            this.rayAssembly[5].origin
              .copy(r.fU.UP)
              .add(r.fU.RIGHT)
              .setLength(i)
              .applyQuaternion(this.rayPlaneOrientation)
              .add(e),
            this.rayAssembly[6].origin
              .copy(r.fU.UP)
              .add(r.fU.LEFT)
              .setLength(i)
              .applyQuaternion(this.rayPlaneOrientation)
              .add(e),
            this.rayAssembly[7].origin
              .copy(r.fU.DOWN)
              .add(r.fU.RIGHT)
              .setLength(i)
              .applyQuaternion(this.rayPlaneOrientation)
              .add(e),
            this.rayAssembly[8].origin
              .copy(r.fU.DOWN)
              .add(r.fU.LEFT)
              .setLength(i)
              .applyQuaternion(this.rayPlaneOrientation)
              .add(e),
            this.config.debug)
          )
            for (let e = 0; e < this.rayVisuals.length; ++e) {
              const i = this.rayVisuals[e];
              i.setDirection(t), i.position.copy(this.rayAssembly[e].origin);
            }
        }
      }
      d.rayCount = 9;
    },
    58066: (e, t, i) => {
      'use strict';
      i.d(t, { a: () => n });
      var n,
        s = i(81396);
      !(function (e) {
        let t;
        !(function (e) {
          const t = (e) => {
              for (const t of e)
                if (t.face)
                  return { point: t.point, object: t.object, distance: t.distance, face: t.face };
              return null;
            },
            i = (e, t) => e.distance - t.distance;
          (e.CENTER_FIRST = (e, i) =>
            i && i.face
              ? {
                  point: i.point,
                  normal: i.face.normal,
                  object: i.object,
                  distance: i.distance,
                  face: i.face,
                }
              : t(e)),
            (e.CLOSEST = (e) => t(e.sort(i))),
            (e.AVERAGE = (e) => {
              if (0 === e.length) return null;
              const t = {
                point: new s.Vector3(),
                face: { a: 0, b: 1, c: 2, normal: new s.Vector3(), materialIndex: 0 },
                distance: 0,
                object: e[0].object,
              };
              for (const i of e)
                t.face && i.face && (t.point.add(i.point), t.face.normal.add(i.face.normal));
              return (
                t.point.divideScalar(e.length),
                t.face && t.face.normal.divideScalar(e.length).normalize(),
                t
              );
            });
          e.CENTER_GROUP = (t) => (i, s, a) => {
            if (s) {
              const n = [s];
              for (let e = 1; e < i.length && e < 3; ++e) {
                const o = i[e];
                if (o.face) {
                  const i = Math.abs(a[e].direction.dot(o.face.normal));
                  s.point.distanceTo(o.point) * i <= t && n.push(o);
                }
              }
              if (n.length >= 3) {
                const t = e.AVERAGE(n, null, a);
                if (t && t.face && s.face) return (t.face.normal = s.face.normal), t;
              }
            }
            const o = n(i, a, t);
            return o ? e.AVERAGE(o, null, a) : e.CENTER_FIRST(i, s, a);
          };
          const n = (e, t, n) => {
            const s = e.slice().sort(i),
              a = [s[0]];
            let o;
            for (o = 1; o < s.length && a.length < 3; ++o) {
              const e = s[o];
              if (e.face) {
                const i = Math.abs(t[o].direction.dot(e.face.normal));
                a[0].point.distanceTo(e.point) * i > n && (a.length = 0), a.push(e);
              }
            }
            return a.length < 3 ? null : a;
          };
        })((t = e.Filter || (e.Filter = {})));
      })(n || (n = {}));
    },
    78134: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { GetFloorIntersectCommand: () => n.Z, default: () => v });
      var n = i(76536),
        s = i(933),
        a = i(4763),
        o = i(69484),
        r = i(57793),
        d = i(11250),
        c = i(17295),
        l = i(49940),
        h = i(41513),
        u = i(26059),
        m = i(81396),
        p = i(3835);
      class g extends s.Y {
        constructor() {
          super(...arguments),
            (this.name = 'floor-caster'),
            (this.cameraPosition = new m.Vector3()),
            (this.forwardPosition = new m.Vector3()),
            (this.targetPlane = new m.Plane());
        }
        async init(e, t) {
          (this.engine = t),
            ([this.renderer, this.cameraData, this.raycaster, this.floorsData, this.meshQuery] =
              await Promise.all([
                t.getModuleBySymbol(a.Aj),
                t.market.waitForData(r.M),
                t.getModuleBySymbol(a.fQ),
                t.market.waitForData(c.i),
                t.getModuleBySymbol(a.hi),
              ])),
            t.commandBinder.addBinding(n.Z, (e) =>
              this.castToFloor(e.screenPosition, e.height, e.includeHiddenFloors),
            );
        }
        async castToFloor(e, t, i = !0) {
          await this.engine.after(o.A.End);
          const n = this.renderer.getScene().camera,
            s = (0, d.z5)(e.x, e.y, this.cameraData.width, this.cameraData.height);
          let a,
            r = null;
          this.cameraPosition.set(s.x, s.y, -1).unproject(n),
            this.forwardPosition.set(s.x, s.y, 1).unproject(n);
          const c = this.raycaster.picking.cast(
            this.cameraPosition,
            this.forwardPosition.clone().sub(this.cameraPosition).normalize(),
            i ? h.T0 : h.Pv,
          )[0];
          if (c && c.object instanceof l.S) {
            r = (c && c.point) || null;
            const e = this.meshQuery.floorIdFromObject(c.object);
            e
              ? (a = this.floorsData.getFloor(e))
              : r && (a = this.floorsData.getClosestFloorAtHeight(r.y));
          }
          if (void 0 !== t && !r) {
            this.cameraPosition.copy(this.cameraData.pose.position);
            const e = (0, d.st)(this.cameraData, s);
            if (this.cameraData.isOrtho()) (e.y = t), (r = e);
            else {
              const i = (0, u.n0)(this.cameraPosition, e);
              this.targetPlane.set(p.fU.DOWN, t),
                (r = (0, u.Fe)(this.cameraPosition, i, this.targetPlane) || null);
            }
          }
          const m = a ? a.index : -1;
          return { position: r, floor: m, floorIndex: m };
        }
      }
      const v = g;
    },
    10545: (e, t, i) => {
      'use strict';
      i.d(t, { J: () => p });
      var n = i(85893),
        s = i(67294),
        a = i(94184),
        o = i.n(a),
        r = i(27163),
        d = i(27538),
        c = i(80366),
        l = i(61173),
        h = i(17545),
        u = i(24160),
        m = i(20510);
      const p = (0, s.forwardRef)(
        ({ children: e, open: t, className: i, onClose: a, scrollingDisabled: p = !1 }, g) => {
          const v = (0, s.useRef)(null),
            y = (0, s.useRef)(null),
            f = (0, s.useMemo)(() => (0, l.Jm)(), []),
            w = (0, d.T)(),
            [b, T] = (0, s.useState)(!1),
            C = (0, m.O)();
          (0, c.U)(h.SN, (e) => {
            T(e.focused);
          }),
            (0, s.useImperativeHandle)(
              g,
              () => ({
                resetScrollTop: () => {
                  y.current && y.current.resetScrollTop();
                },
                scrollToSelector: (e) => {
                  y.current && y.current.scrollToSelector(e);
                },
              }),
              [y],
            );
          const E = w === r.wS.BOTTOM_PANEL,
            D = f && b && E,
            x =
              D &&
              !(function () {
                var e;
                if (!y.current) return !1;
                const t = y.current.getScrollHeight(),
                  i =
                    (null === (e = y.current.getScroller()) || void 0 === e
                      ? void 0
                      : e.getBoundingClientRect().top) || 0;
                return t <= C.height - i;
              })(),
            A = E,
            O = { open: t, 'sticky-header': !D, 'detail-panel-align-top': x };
          return (0, n.jsx)(
            'div',
            Object.assign(
              {
                className: o()('detail-panel', O, i),
                onKeyDown: function (e) {
                  a && 'Escape' === e.code && (e.stopPropagation(), a());
                },
                ref: v,
                tabIndex: t ? 0 : void 0,
                onTransitionEnd: (e) => {
                  v.current && e.target === v.current && t && v.current.focus();
                },
              },
              {
                children: (0, n.jsx)(
                  u.T,
                  Object.assign({ ref: y, hideThumb: A, disabled: p }, { children: e }),
                ),
              },
            ),
          );
        },
      );
    },
    92394: (e, t, i) => {
      'use strict';
      i.d(t, { C: () => l });
      var n = i(85893),
        s = i(67294),
        a = i(38772),
        o = i(94184),
        r = i.n(o),
        d = function (e, t, i, n) {
          var s,
            a = arguments.length,
            o = a < 3 ? t : null === n ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
          if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
            o = Reflect.decorate(e, t, i, n);
          else
            for (var r = e.length - 1; r >= 0; r--)
              (s = e[r]) && (o = (a < 3 ? s(o) : a > 3 ? s(t, i, o) : s(t, i)) || o);
          return a > 3 && o && Object.defineProperty(t, i, o), o;
        },
        c = function (e, t) {
          if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
            return Reflect.metadata(e, t);
        };
      let l = class extends s.Component {
        constructor(e) {
          super(e);
        }
        render() {
          const {
            iconClass: e,
            label: t,
            badgeStyle: i,
            onClick: s,
            className: a,
            imageUrl: o,
          } = this.props;
          return (0, n.jsxs)(
            'span',
            Object.assign(
              { className: r()('badge', a, { clickable: !!s }), style: i, onClick: s },
              {
                children: [
                  e && (0, n.jsx)('span', { className: `icon badge-icon ${e}` }),
                  t &&
                    (0, n.jsx)(
                      'span',
                      Object.assign({ className: 'badge-label' }, { children: t }),
                    ),
                  o &&
                    (0, n.jsx)(
                      'span',
                      Object.assign(
                        { className: 'badge-img' },
                        { children: (0, n.jsx)('img', { src: o }) },
                      ),
                    ),
                ],
              },
            ),
          );
        }
      };
      l = d([a.Z, c('design:paramtypes', [Object])], l);
    },
    23084: (e, t, i) => {
      'use strict';
      i.d(t, { $: () => l });
      var n = i(85893),
        s = i(67294),
        a = i(38772),
        o = i(80308),
        r = i(20360),
        d = i(29707),
        c = function (e, t, i, n) {
          var s,
            a = arguments.length,
            o = a < 3 ? t : null === n ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
          if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
            o = Reflect.decorate(e, t, i, n);
          else
            for (var r = e.length - 1; r >= 0; r--)
              (s = e[r]) && (o = (a < 3 ? s(o) : a > 3 ? s(t, i, o) : s(t, i)) || o);
          return a > 3 && o && Object.defineProperty(t, i, o), o;
        };
      let l = class extends s.Component {
        constructor() {
          super(...arguments),
            (this.onKey = async (e) => {
              if (this.props.disabled) return;
              switch (e.keyCode) {
                case r.R.COMMA:
                  this.onGotoPrev();
                  break;
                case r.R.PERIOD:
                  this.onGotoNext();
              }
            }),
            (this.onGotoNext = () => {
              const e = this.getNextIndex();
              -1 !== e && this.props.onNavigate(e);
            }),
            (this.onGotoPrev = () => {
              const e = this.getPrevIndex();
              -1 !== e && this.props.onNavigate(e);
            });
        }
        componentDidMount() {
          this.context.mainDiv
            .getRootNode()
            .addEventListener('keydown', this.onKey, { capture: !0 });
        }
        componentWillUnmount() {
          this.context.mainDiv
            .getRootNode()
            .removeEventListener('keydown', this.onKey, { capture: !0 });
        }
        getNextIndex() {
          const { total: e, index: t, wrapAround: i } = this.props;
          return t + 1 < e ? t + 1 : i ? 0 : -1;
        }
        getPrevIndex() {
          const { total: e, index: t, wrapAround: i } = this.props;
          return t > 0 ? t - 1 : i ? e - 1 : -1;
        }
        render() {
          const { total: e, index: t, disabled: i, overlay: s } = this.props;
          if (e < 2 || -1 === t) return null;
          const a = s ? 'dark' : 'light',
            r = s ? void 0 : o.qE.LARGE,
            d = `${t + 1} of ${e}`;
          return (0, n.jsxs)(
            'div',
            Object.assign(
              { className: 'list-nav' },
              {
                children: [
                  (0, n.jsx)(o.zx, {
                    icon: 'dpad-left',
                    variant: o.Wu.TERTIARY,
                    size: r,
                    disabled: i,
                    theme: a,
                    onClick: this.onGotoPrev,
                  }),
                  (0, n.jsx)(
                    'span',
                    Object.assign({ className: 'list-nav-label' }, { children: d }),
                  ),
                  (0, n.jsx)(o.zx, {
                    icon: 'dpad-right',
                    variant: o.Wu.TERTIARY,
                    size: r,
                    disabled: i,
                    theme: a,
                    onClick: this.onGotoNext,
                  }),
                ],
              },
            ),
          );
        }
      };
      (l.contextType = d.I), (l = c([a.Z], l));
    },
    39159: (e, t, i) => {
      'use strict';
      i.d(t, { Z: () => p });
      var n = i(85893),
        s = i(67294),
        a = i(38772),
        o = i(29707),
        r = i(94184),
        d = i.n(r),
        c = i(20360),
        l = i(17545),
        h = function (e, t, i, n) {
          var s,
            a = arguments.length,
            o = a < 3 ? t : null === n ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
          if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
            o = Reflect.decorate(e, t, i, n);
          else
            for (var r = e.length - 1; r >= 0; r--)
              (s = e[r]) && (o = (a < 3 ? s(o) : a > 3 ? s(t, i, o) : s(t, i)) || o);
          return a > 3 && o && Object.defineProperty(t, i, o), o;
        },
        u = function (e, t) {
          if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
            return Reflect.metadata(e, t);
        };
      let m = class extends s.Component {
        constructor(e) {
          super(e),
            (this.focusTimeout = 0),
            (this.onInput = (e) => {
              if (this.props.onInput) {
                const t = e.target;
                this.props.onInput(t.value);
              }
            }),
            (this.onKeyPress = (e) => {
              e.stopPropagation();
              const { allowTabbing: t } = this.props,
                i = e.which || e.keyCode,
                n = [c.R.TAB, c.R.RETURN, c.R.ESCAPE];
              if ('keydown' === e.type && !n.includes(i)) return !1;
              const s = e.target;
              switch (
                (this.props.maxLength &&
                  s.value.length > this.props.maxLength &&
                  e.preventDefault(),
                i)
              ) {
                case c.R.ESCAPE:
                  this.props.onCancel && this.props.onCancel();
                  break;
                case c.R.TAB:
                case c.R.RETURN:
                  this.props.onBlur ||
                    e.shiftKey ||
                    ((i === c.R.TAB && t) || e.preventDefault(), this.blur());
              }
              return !1;
            }),
            (this.stopPropagation = (e) => e.stopPropagation()),
            (this.onFocus = (e) => {
              this.context.messageBus.broadcast(new l.SN(this.input, !0)),
                this.props.onFocus && this.props.onFocus(e);
            }),
            (this.onBlur = (e) => {
              this.context.messageBus.broadcast(new l.SN(this.input, !1));
              const t = e.target.value,
                { onBlur: i, onDone: n } = this.props;
              i ? i(t) : n && n(t);
            }),
            (this.setRef = (e) => (this.input = e)),
            (this.state = { currentText: e.text });
        }
        componentWillUnmount() {
          window.clearTimeout(this.focusTimeout), this.input && this.input.blur();
        }
        componentDidMount() {
          const { focusOnMount: e, readOnly: t } = this.props;
          t ||
            (0 === e
              ? this.focus()
              : void 0 !== e &&
                (this.focusTimeout = window.setTimeout(() => {
                  this.focus();
                }, e)));
        }
        UNSAFE_componentWillReceiveProps(e) {
          e.text !== this.props.text && this.setState({ currentText: e.text });
        }
        getText() {
          return this.input ? this.input.value : '';
        }
        focus() {
          this.input.focus();
        }
        blur() {
          this.input.blur();
        }
        scrollIntoView(e) {
          this.input.scrollIntoView(e);
        }
        render() {
          const {
              placeholder: e,
              tabIndex: t,
              maxLength: i,
              type: s,
              className: a,
              readOnly: o,
              disabled: r,
            } = this.props,
            { currentText: c } = this.state;
          return (0, n.jsx)(
            'div',
            Object.assign(
              { className: d()('text-field', a) },
              {
                children: (0, n.jsx)('input', {
                  ref: this.setRef,
                  className: 'text-input-box',
                  type: s || 'text',
                  value: c,
                  placeholder: e,
                  'aria-label': e,
                  maxLength: i,
                  onInput: this.onInput,
                  onKeyPress: this.onKeyPress,
                  onKeyDown: this.onKeyPress,
                  onKeyUp: this.stopPropagation,
                  onBlur: this.onBlur,
                  onFocus: this.onFocus,
                  tabIndex: t,
                  readOnly: o,
                  disabled: !!r,
                }),
              },
            ),
          );
        }
      };
      (m.contextType = o.I), (m = h([a.Z, u('design:paramtypes', [Object])], m));
      const p = m;
    },
    53484: (e, t, i) => {
      'use strict';
      i.d(t, { V: () => a });
      var n = i(50652);
      function s(e) {
        return e.get('m') || e.get('model');
      }
      function a(e) {
        const t = -1 !== e.indexOf('matterport.com/show'),
          i = -1 !== e.indexOf(window.location.host + '/show');
        if (t || i) {
          const t = new URL(e),
            i = n.K.deserialize(e) || void 0,
            a = s(t.searchParams),
            o = s(new URLSearchParams(window.location.search));
          return { url: e, pose: i, modelId: a && a !== o ? a : void 0 };
        }
        return { url: e };
      }
    },
    31286: (e, t, i) => {
      'use strict';
      i.d(t, { Z: () => p });
      var n = i(85893),
        s = i(67294),
        a = i(94184),
        o = i.n(a),
        r = i(38772),
        d = i(29707),
        c = i(20360),
        l = i(17545),
        h = function (e, t, i, n) {
          var s,
            a = arguments.length,
            o = a < 3 ? t : null === n ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
          if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
            o = Reflect.decorate(e, t, i, n);
          else
            for (var r = e.length - 1; r >= 0; r--)
              (s = e[r]) && (o = (a < 3 ? s(o) : a > 3 ? s(t, i, o) : s(t, i)) || o);
          return a > 3 && o && Object.defineProperty(t, i, o), o;
        },
        u = function (e, t) {
          if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
            return Reflect.metadata(e, t);
        };
      let m = class extends s.Component {
        constructor(e) {
          super(e),
            (this.textElement = (0, s.createRef)()),
            (this.editing = !1),
            (this.isUnmounting = !1),
            (this.stopPropagation = (e) => e.stopPropagation()),
            (this.onPaste = (e) => {
              if (!e.clipboardData || !this.textElement.current) return;
              let t = e.clipboardData.getData('text/plain');
              (t = this.props.textParser.sanitizeText(t)),
                e.preventDefault(),
                t && document.execCommand('insertText', !1, t);
            }),
            (this.onKeyDown = (e) => {
              if (!this.textElement.current) return;
              const { onKeyDown: t } = this.props;
              (e.which || e.keyCode) === c.R.RETURN && (e.shiftKey || e.altKey)
                ? document.execCommand('insertText', !1, '\n')
                : t && t(e);
            }),
            (this.onMouseDown = (e) => {
              const { onClick: t, clickToEdit: i, readonly: n } = this.props;
              t && (e.stopPropagation(), t(e)), n || (!this.editing && i && this.toggleEditing(!0));
            }),
            (this.onFocus = (e) => {
              this.textElement.current &&
                (this.context.messageBus.broadcast(new l.SN(this.textElement.current, !0)),
                this.props.onFocus && this.props.onFocus(e));
            }),
            (this.onBlur = (e) => {
              this.textElement.current &&
                (this.context.messageBus.broadcast(new l.SN(this.textElement.current, !1)),
                this.props.onBlur && this.props.onBlur(e));
            });
        }
        componentDidMount() {
          this.replaceTextContent(this.props.text);
        }
        componentWillUnmount() {
          (this.isUnmounting = !0), this.textElement.current && this.textElement.current.blur();
        }
        componentDidUpdate(e) {
          const { text: t, active: i } = this.props;
          (t === e.text && i === e.active) || this.replaceTextContent(t);
        }
        shouldComponentUpdate() {
          return !1;
        }
        getTextElement() {
          return this.textElement.current;
        }
        getPlainText() {
          var e;
          return (
            (null === (e = this.textElement.current) || void 0 === e ? void 0 : e.innerText) || ''
          );
        }
        focus() {
          this.editing && this.textElement.current && this.textElement.current.focus();
        }
        toggleEditing(e, t = !0) {
          clearTimeout(this.toggleEditingTimeout),
            (this.toggleEditingTimeout = window.setTimeout(() => {
              this.textElement.current &&
                !this.isUnmounting &&
                (this.editing !== e &&
                  ((this.editing = e),
                  (this.textElement.current.contentEditable = e ? 'true' : 'false'),
                  e
                    ? this.textElement.current.classList.add('editing')
                    : this.textElement.current.classList.remove('editing')),
                e && t ? this.textElement.current.focus() : this.textElement.current.blur());
            }, 0));
        }
        replaceTextContent(e) {
          clearTimeout(this.replaceTextContentTimeout),
            (this.replaceTextContentTimeout = window.setTimeout(() => {
              if (!this.textElement.current || this.isUnmounting) return;
              for (; this.textElement.current.firstChild; )
                this.textElement.current.removeChild(this.textElement.current.firstChild);
              const t = document.createDocumentFragment(),
                {
                  textParser: i,
                  markers: n,
                  onClickAnchor: s,
                  active: a,
                  readonly: o,
                  maxLength: r,
                  clickableLinks: d,
                } = this.props,
                c = void 0 !== d ? d : !a,
                l = i.deserialize(e, c, s, n);
              let h = 0,
                u = !l.every((e) => {
                  var i;
                  const n = (null === (i = e.textContent) || void 0 === i ? void 0 : i.length) || 0;
                  if (o && r && h + n > r) {
                    if ('#text' === e.nodeName) {
                      const i = e.textContent || '';
                      (e.textContent = i.substring(0, r - h)), t.appendChild(e);
                    }
                    return !1;
                  }
                  return (
                    !o && a && 'A' === e.nodeName && (e.contentEditable = 'true'),
                    (h += n),
                    t.appendChild(e),
                    !0
                  );
                });
              u && t.appendChild(document.createTextNode('...')),
                this.textElement.current.appendChild(t),
                this.focus(),
                o &&
                  !u &&
                  this.props.maxLines &&
                  this.textElement.current.scrollHeight > this.textElement.current.offsetHeight &&
                  ((u = !0), this.textElement.current.appendChild(document.createTextNode('...'))),
                this.props.onTextReplaced && this.props.onTextReplaced(u);
            }, 0));
        }
        render() {
          const {
              placeholder: e,
              tabIndex: t,
              onInput: i,
              readonly: s,
              maxLines: a,
              text: r,
            } = this.props,
            d = s && a,
            c = d ? { WebkitLineClamp: a } : {},
            l = o()('text-box-text', { clamped: d, placeholder: !!e && !r });
          return (0, n.jsx)('div', {
            ref: this.textElement,
            className: l,
            style: c,
            role: 'textbox',
            draggable: !1,
            spellCheck: !0,
            contentEditable: !1,
            placeholder: e,
            'aria-label': e,
            onMouseDown: this.onMouseDown,
            onKeyDown: s ? void 0 : this.onKeyDown,
            onKeyUp: s ? void 0 : this.stopPropagation,
            onFocus: s ? void 0 : this.onFocus,
            onBlur: s ? void 0 : this.onBlur,
            onInput: s ? void 0 : i,
            onPaste: s ? void 0 : this.onPaste,
            tabIndex: t,
          });
        }
      };
      (m.contextType = d.I), (m = h([r.A, u('design:paramtypes', [Object])], m));
      const p = m;
    },
    18808: (e, t, i) => {
      'use strict';
      i.d(t, { p: () => s });
      var n = i(20470);
      function s(e) {
        return e.width <= n.MN;
      }
    },
    72960: (e, t, i) => {
      'use strict';
      i.d(t, { $: () => r });
      var n = i(79146),
        s = i(50652),
        a = i(86172),
        o = i(61173);
      class r {
        constructor(e) {
          this.capabilites = { links: { enable: e.supportLinks, keepLabels: e.keepLinkLabels } };
        }
        parse(e, t) {
          const i = [];
          if (!e) return [];
          return (
            e
              .split('[')
              .map(function (e, t) {
                return 0 === t ? e : '[' + e;
              })
              .forEach((e) => {
                const n = this.findLink(e);
                n
                  ? /javascript:/i.test(n.url) ||
                    (this.addLinkChunk(i, n, t), this.addTextChunk(i, e.slice(n.markdown.length)))
                  : this.addTextChunk(i, e);
              }),
            i
          );
        }
        findLink(e) {
          const t = e.match(/\[([^\]]*)\]\((.*)\)/);
          if (!t) return null;
          const i = t[2];
          let n = 1,
            s = 0;
          for (; s < i.length && ('(' === i[s] ? n++ : ')' === i[s] && n--, 0 !== n); ) s++;
          const a = i.length - s;
          return {
            markdown: t[0].substring(0, t[0].length - a),
            label: t[1],
            url: this.conditionallyEncode(t[2].substring(0, s)),
          };
        }
        conditionallyEncode(e) {
          const t = e.trim();
          return this.needsEncoding(t) ? encodeURI(t) : t;
        }
        needsEncoding(e) {
          if (e.match(o.jx)) return !0;
          let t = e;
          try {
            t = decodeURI(e);
          } catch (e) {}
          return !1;
        }
        addTextChunk(e, t) {
          0 !== t.length && e.push({ type: a.z.text, text: t });
        }
        addLinkChunk(e, t, i) {
          if (!this.capabilites.links.enable)
            return void (this.capabilites.links.keepLabels && this.addTextChunk(e, t.label));
          const o = { label: t.label, url: t.url, type: n.U.EXT_LINK };
          -1 === o.url.indexOf('://') && (o.url = 'http://' + o.url);
          const r = -1 !== o.url.indexOf('matterport.com/show'),
            d = -1 !== o.url.indexOf(window.location.host + '/show');
          if (r || d) {
            const e = -1 !== o.url.indexOf(i),
              t = s.K.deserialize(o.url);
            e && t
              ? ((o.type = n.U.NAVIGATION), (o.navigationData = t))
              : ((o.type = n.U.MODEL), (o.url += '&play=1'));
          }
          e.push({ type: a.z.link, link: o });
        }
        static getNumLinks(e) {
          let t = 0;
          return (
            e.forEach((e) => {
              'link' === e.type && void 0 !== e.link && t++;
            }),
            t
          );
        }
      }
    },
    69235: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => K, makeMattertagDeserializer: () => S.a });
      var n = i(933),
        s = i(4763),
        a = i(89072),
        o = i(28721),
        r = i(35659),
        d = i(37137),
        c = i(68661),
        l = i(4218),
        h = i(83069),
        u = i(10306),
        m = i(24650),
        p = i(86172),
        g = i(10163),
        v = i(72960),
        y = i(71439),
        f = i(5494),
        w = i(93797),
        b = i(53257),
        T = i(99793),
        C = i(47994),
        E = i(15352),
        D = i(80383),
        x = i(73908);
      const A = new b.Z('mds-mattertag-serializer');
      class O {
        constructor(e, t) {
          (this.updateSerializer = e), (this.mediaSerializer = t);
        }
        serialize(e, t) {
          const i = this.mediaSerializer.serialize(e),
            n = this.updateSerializer.serialize(e, t),
            s = null !== i ? Object.assign(Object.assign({}, i), n) : n;
          return this.validate(s) ? s : null;
        }
        validate(e) {
          if (!e) return !1;
          const t = ['label', 'description', 'mediaUrl'].some((t) => t in e),
            i = ['floorId', 'enabled', 'anchorPosition'].filter((t) => !(t in e)),
            n = 0 === i.length,
            s = !!e.anchorPosition && (0, x.u)(e.anchorPosition),
            a = n && t && s;
          return (
            a || A.debug('Invalid MattertagDetails:', { missingFields: i, validPosition: s }), a
          );
        }
      }
      var S = i(56932);
      class P {
        serialize(e) {
          return this.validate(e) ? { sid: e.sid } : null;
        }
        validate(e) {
          const t = null !== e && !!e.mediaType && e.mediaType === p.z.none;
          return null !== e && !!e.sid && t;
        }
      }
      const I = new b.Z('mds-mattertag-serializer');
      class k {
        serialize(e) {
          const t = this.extractMedia(e);
          return this.validate(t) ? t : null;
        }
        validate(e) {
          if (!e) return !1;
          const t = ['mediaUrl', 'mediaType'].every((t) => t in e),
            i = void 0 !== e.mediaType && ['rich', 'photo', 'video'].includes(e.mediaType),
            n = t && i;
          return (
            n || I.debug('invalid media', e, { hasRequiredFields: t, hasValidMediaType: i }), n
          );
        }
        extractMedia(e) {
          const t = {};
          return (
            e.mediaSrc && (t.mediaUrl = e.mediaSrc),
            e.mediaType && e.mediaType in N && (t.mediaType = e.mediaType),
            t.mediaUrl && t.mediaType ? t : null
          );
        }
      }
      const N = { [p.z.photo]: [D.L0.PHOTO], [p.z.rich]: [D.L0.RICH], [p.z.video]: [D.L0.VIDEO] };
      var R = i(5429),
        M = i(32197);
      const j = new b.Z('mds-mattertag-serializer');
      class L {
        serialize(e, t) {
          var i;
          if (!e) return null;
          const n = {};
          return (
            void 0 !== e.enabled && (n.enabled = e.enabled),
            void 0 !== e.stemVisible && (n.stemEnabled = e.stemVisible),
            void 0 !== e.label && (n.label = e.label),
            void 0 !== e.description && (n.description = e.description),
            void 0 !== e.color && (0, R.D5)(e.color) && (n.color = (0, R.Ex)(e.color)),
            void 0 !== e.anchorPosition &&
              (0, x.u)(e.anchorPosition) &&
              (n.anchorPosition = M.ep.toVisionVector(e.anchorPosition)),
            void 0 !== e.anchorNormal &&
              (0, x.u)(e.anchorNormal) &&
              (n.stemNormal = M.ep.toVisionVector(e.anchorNormal)),
            void 0 !== e.stemHeight && (n.stemLength = e.stemHeight),
            Object.prototype.hasOwnProperty.call(e, 'icon') &&
              (n.icon = null !== (i = e.icon) && void 0 !== i ? i : ''),
            void 0 !== e.keywords && (n.keywords = e.keywords),
            e.floorId && (n.floorId = e.floorId),
            e.roomId && (n.roomId = e.roomId),
            e.layerId && t && (n.layerId = e.layerId),
            e.objectAnnotationId && (n.objectAnnotationId = e.objectAnnotationId),
            n && this.validate(n) ? n : null
          );
        }
        validate(e) {
          if (!e) return !1;
          const t = [
              'layerId',
              'floorId',
              'roomId',
              'color',
              'label',
              'description',
              'enabled',
              'stemEnabled',
              'stemLength',
              'stemNormal',
              'stemDirection',
              'anchorPosition',
              'objectAnnotationId',
              'keywords',
              'icon',
            ],
            i = Object.keys(e).length > 0,
            n = Object.keys(e).every((e) => t.includes(e)),
            s = n && i;
          return (
            s || j.debug('Invalid MattertagPatch:', { hasContents: i, hasValidFields: n, data: e }),
            s
          );
        }
      }
      class B {
        serialize(e) {
          const t = e.fileAttachments;
          return void 0 === t ? null : { fileAttachments: t.map((e) => e.id) };
        }
      }
      var V = i(82686);
      const F = new b.Z('MdsMattertagStore');
      class _ extends w.u {
        constructor(e, t) {
          super(e),
            (this.includeObjectTags = t),
            (this.layeredType = D.SF.MATTERTAG),
            (this.prefetchKey = 'data.model.mattertags'),
            (this.fileAttachmentDeserializer = new C.O()),
            (this.fileAttachmentSerializer = new B()),
            (this.patchSerializer = new L()),
            (this.mediaUpdateSerializer = new k()),
            (this.mediaRemovalSerializer = new P()),
            (this.createSerializer = new O(this.patchSerializer, this.mediaUpdateSerializer)),
            (this.tagDeserializer = new S.d(this.fileAttachmentDeserializer, new E.d())),
            (this.deserializer = new f.o({ deserializer: this.tagDeserializer }));
        }
        async read(e) {
          const { includeDisabled: t = !1 } = this.config,
            i = {
              modelId: this.getViewId(),
              includeDisabled: t,
              prefetchKey: this.prefetchKey,
              includeLayers: this.readLayerId(),
            };
          return this.query(V.GetMattertags, i, e).then((e) => {
            var t, i;
            const n =
              null ===
                (i =
                  null === (t = null == e ? void 0 : e.data) || void 0 === t ? void 0 : t.model) ||
              void 0 === i
                ? void 0
                : i.mattertags;
            if (!n || !Array.isArray(n)) return null;
            return (this.deserializer.deserialize(n) || []).reduce(
              (e, t) => ((!this.includeObjectTags && t.objectAnnotationId) || (e[t.sid] = t), e),
              {},
            );
          });
        }
        async refreshFileAttachments(e) {
          const { includeDisabled: t = !1 } = this.config,
            i = {
              modelId: (null == e ? void 0 : e.modelId) || this.getViewId(),
              includeDisabled: t,
            };
          return this.query(V.RefreshTagFileAttachments, i, e).then((e) => {
            var t, i;
            const n =
              null ===
                (i =
                  null === (t = null == e ? void 0 : e.data) || void 0 === t ? void 0 : t.model) ||
              void 0 === i
                ? void 0
                : i.mattertags;
            if (!n || !Array.isArray(n)) return {};
            const s = [];
            for (const e of n) {
              if (!e.id || !e.fileAttachments)
                throw (
                  (F.error('Failure refreshing tag file attachments'),
                  new Error('Failure refreshing tag file attachments'))
                );
              e.fileAttachments.forEach((e) => {
                const t = this.fileAttachmentDeserializer.deserialize(e);
                t && s.push(t);
              });
            }
            return s.reduce((e, t) => ((e[t.id] = t), e), {});
          });
        }
        async create(e) {
          const t = this.getViewId(),
            i = [];
          for (const n of e) {
            const e = this.createSerializer.serialize(n, this.writeLayerId(n.layerId));
            if (!e)
              throw (
                (F.error('Failure saving tag:', n.sid, n), new Error('Could not save Mattertag'))
              );
            const s = n.sid;
            let o = ', $data: MattertagDetails!';
            const r = { modelId: t, mattertagId: s, data: e },
              d = this.fileAttachmentSerializer.serialize(n);
            d && ((o += ', $fileAttachments: [ID!]'), (r.fileAttachments = d.fileAttachments));
            const c = `\n        addMattertag(\n          modelId: $modelId,\n          mattertagId: "${s}",\n          mattertag: $data) {\n            id\n            created\n            modified\n          }\n        ${d ? `addMattertagAttachments(\n            modelId: $modelId,\n            mattertagId: "${s}",\n            fileAttachments: $fileAttachments) {\n              id\n            }` : ''}\n      `,
              l = y.gql`
        mutation AddMattertag($modelId: ID! ${o}) {
          ${c}
        }
      `,
              h = await this.mutate(l, r),
              u = (0, T.q)(h, 'data.addMattertag'),
              m = new a.U().copy(n);
            (m.sid = u.id), m.commit(), i.push(m);
          }
          return i;
        }
        async update(e, t) {
          if (!e || 0 === e.length) return;
          let i = '';
          const n = {},
            s = this.getViewId();
          n.modelId = s;
          let a = '';
          for (const t of e) {
            const e = t.sid,
              s = this.mediaUpdateSerializer.serialize(t),
              o = this.mediaRemovalSerializer.serialize(t),
              r = this.patchSerializer.serialize(t, !1),
              d = r || o || s,
              c = this.fileAttachmentSerializer.serialize(t);
            if (!(r || s || o || c)) return void F.debug(`Nothing to update for tag ${e}`, t);
            if (d) {
              const t = r || {};
              (i += `, $patch${e}: MattertagPatch!`),
                o && (t.mediaUrl = ''),
                s && ((t.mediaUrl = s.mediaUrl), (t.mediaType = s.mediaType)),
                (n[`patch${e}`] = t);
            }
            c &&
              ((i += `, $fileAttachments${e}: [ID!]`),
              (n[`fileAttachments${e}`] = c.fileAttachments)),
              (n[`mediaType${e}`] = s && s.mediaType),
              (n[`mediaUrl${e}`] = s && s.mediaUrl);
            a += `\n        update${e}:\n        ${d ? `patchMattertag(\n            modelId: $modelId,\n            mattertagId: "${e}",\n            patch: $patch${e}) {\n              id\n            }` : ''}\n        ${c ? `addMattertagAttachments(\n            modelId: $modelId,\n            mattertagId: "${e}",\n            fileAttachments: $fileAttachments${e}) {\n              id\n            }` : ''}\n      `;
          }
          for (const { attachment: e } of t)
            (null == e ? void 0 : e.id) && (null == e ? void 0 : e.parentId) && e.parentType
              ? ((i += `, $parentType${e.id}: ParentType!`),
                (n[`parentType${e.id}`] = e.parentType),
                (a += `\n        unattach${e.id}:\n        removeFileAttachment(modelId: $modelId,\n                             attachmentId: "${e.id}",\n                             parentType: $parentType${e.id},\n                             parentId: "${e.parentId}") `))
              : F.debug('MattertagStore.update: unable to remove file attachment');
          const o = y.gql`
      mutation tagUpdate($modelId: ID! ${i}) {
        ${a}
      }
    `;
          await this.mutate(o, n);
        }
        async delete(e) {
          if (!e || 0 === e.length) return;
          const t = this.getViewId();
          let i = '';
          for (const t of e) {
            if (!t || (t && !t.sid)) throw new Error('MattertagStore.delete failed');
            i += `delete${t.sid}: deleteMattertag(modelId: $modelId, mattertagId: "${t.sid}") `;
          }
          const n = y.gql`
      mutation batchDeleteMattertag($modelId: ID!) {
        ${i}
      }
    `;
          return this.mutate(n, { modelId: t }).then(() => {});
        }
      }
      var H = i(57793),
        U = i(11250),
        G = i(81396),
        z = i(72153),
        W = i(22925),
        $ = i(35922);
      class K extends n.Y {
        constructor() {
          super(...arguments),
            (this.name = 'mattertag-data'),
            (this.monitor = null),
            (this.filesToUnattach = []),
            (this.refreshIds = new Set()),
            (this.getDiscPositions = (() => {
              const e = [],
                t = {},
                i = {},
                n = new G.Vector3();
              return async (s) => (
                (e.length = 0),
                s.tags.forEach((s) => {
                  const a = this.data.getTag(s);
                  a &&
                    (i[s] || (i[s] = new G.Vector3()),
                    i[s].copy(a.anchorPosition).add(a.stemVector),
                    t[s] || (t[s] = new G.Vector2()),
                    (0, U.q9)(this.cameraData, i[s], t[s], n),
                    e.push({ sid: s, screen: n.z > 1 ? null : t[s], world: i[s] }));
                }),
                e
              );
            })()),
            (this.addTag = async (e) => {
              const t = [];
              return (
                this.data.atomic(() => {
                  var i, n, s;
                  for (const a of e) {
                    const { positionOptions: e, standardOptions: r, mediaOptions: d } = a,
                      c = Object.assign(Object.assign({}, e), r),
                      l = this.createTag(
                        a.id || (0, o.O1)(11),
                        c,
                        (null === (i = a.attachmentOptions) || void 0 === i
                          ? void 0
                          : i.fileAttachments) || [],
                        d,
                      );
                    l.externalAttachments.concat(
                      (null === (n = a.attachmentOptions) || void 0 === n
                        ? void 0
                        : n.externalAttachments) || [],
                    ),
                      (l.modified = new Date()),
                      l.commit(),
                      t.push(l.sid);
                    for (const e of (null === (s = a.attachmentOptions) || void 0 === s
                      ? void 0
                      : s.refreshIds) || [])
                      this.refreshIds.add(e);
                    this.data.updateOnStaleCallbacks(l.sid);
                  }
                }),
                t
              );
            }),
            (this.editTag = async (e) => {
              const { sid: t, positionOptions: i, standardOptions: n, mediaOptions: s } = e,
                a = Object.assign(Object.assign({}, i), n),
                o = this.data.getTag(t);
              o && (this.updateTag(o, a, s), (o.modified = new Date()), o.commit());
            }),
            (this.removeTag = async (e) => {
              const t = this.data.getTag(e.sid);
              if (void 0 !== t && this.data.removeTag(e.sid))
                return (
                  t &&
                    t.objectAnnotationId &&
                    this.engine.commandBinder.issueCommand(new z.SO(t.objectAnnotationId)),
                  e.sid
                );
            }),
            (this.saveNewTag = async (e) => {
              const { id: t, properties: i, embed: n, fileAttachments: s } = e,
                a = n ? { mediaSrc: n.src, mediaType: (0, m.F5)(n.mediaType) } : void 0;
              return (
                this.createTag(t, i, s, a),
                this.engine.commandBinder.issueCommand(new d.V({ dataTypes: [r.g.MATTERTAGS] }))
              );
            }),
            (this.saveTag = async (e) => {
              const {
                  id: t,
                  properties: i,
                  pendingAttachments: n,
                  removedAttachments: s,
                  embed: a,
                } = e,
                o = this.data.getTag(t);
              if (!o) return void this.log.debug('Cannot save non-existent tag');
              const c = a ? (0, m.F5)(a.mediaType) : p.z.none,
                l = a ? a.src : '';
              void 0 !== a &&
                ((l === o.mediaSrc && c !== o.mediaType) || this.updateExternalAttachment(o, a));
              const h = void 0 !== a ? { mediaSrc: l, mediaType: c } : void 0;
              return (
                this.updateTag(o, i, h),
                n.forEach((e) => {
                  o.fileAttachments.push(e);
                }),
                this.removeFileAttachments(o, s),
                this.data.addTag(o),
                this.data.updateOnStaleCallbacks(t),
                this.engine.commandBinder.issueCommand(new d.V({ dataTypes: [r.g.MATTERTAGS] }))
              );
            });
        }
        async init(e, t) {
          const { readonly: i, baseUrl: n } = e;
          (this.engine = t),
            (this.descParser = new v.$({ supportLinks: !0, keepLinkLabels: !0 })),
            ([this.meshQueryModule, this.cameraData, this.layersData] = await Promise.all([
              t.getModuleBySymbol(s.hi),
              t.market.waitForData(H.M),
              t.market.waitForData(W.R),
            ])),
            (this.store = new _(
              { context: this.layersData.mdsContext, readonly: i, includeDisabled: !i, baseUrl: n },
              e.objectTagsEnabled,
            ));
          const a = await t.getModuleBySymbol(s.Lx);
          (this.data = new g.n()),
            this.bindings.push(
              this.store.onNewData(async (i) => {
                this.initializeTagData(i, t.market, e.parserOptions);
              }),
              t.commandBinder.addBinding(u.cH, this.getDiscPositions),
              t.commandBinder.addBinding(u.Fz, this.addTag),
              t.commandBinder.addBinding(u.Ek, this.editTag),
              t.commandBinder.addBinding(u.Gn, this.removeTag),
            ),
            await this.store.refresh(),
            i ||
              (this.bindings.push(
                t.commandBinder.addBinding(u.Mm, this.saveNewTag),
                t.commandBinder.addBinding(u.qq, this.saveTag),
                a.onSave(() => this.save(), { dataType: r.g.MATTERTAGS }),
              ),
              (this.monitor = new l.c(this.data.collection, {
                aggregationType: h.E.Manual,
                shallow: !0,
              }))),
            this.registerRoomAssociationSource(t),
            t.market.register(this, g.n, this.data);
        }
        dispose(e) {
          this.store.dispose(), super.dispose(e);
        }
        async save() {
          if ((this.monitor && this.monitor.commitChanges(), !this.store || !this.monitor))
            return void this.log.warn('Mattertags changes will NOT be saved');
          const e = this.monitor.getDiffRecord();
          this.monitor.clearDiffRecord();
          const t = e
              .map((e) => {
                var t;
                const i =
                  e.diff.layerId ||
                  (null === (t = this.data.getTag(e.index)) || void 0 === t ? void 0 : t.layerId);
                return Object.assign({ layerId: i }, e);
              })
              .filter((e) => !this.layersData.isInMemoryLayer(e.layerId)),
            i = t
              .filter((e) => e.action === c.KI.removed)
              .map((e) => ({ sid: e.index, layerId: e.layerId })),
            n = t.filter((e) => e.action === c.KI.added).map((e) => this.data.getTag(e.index)),
            s = t
              .filter((e) => e.action === c.KI.updated)
              .map((e) => {
                const t = Object.assign({ sid: e.index, layerId: e.layerId }, e.diff),
                  i = this.data.getTag(e.index);
                return (
                  'mediaSrc' in t && (t.mediaType = i.mediaType),
                  (t.objectAnnotationId = i.objectAnnotationId),
                  !t.roomId && i.roomId && (t.roomId = i.roomId),
                  t
                );
              });
          await this.store.delete(i),
            await this.store.create(n),
            await this.store.update(s, this.filesToUnattach);
        }
        initializeTagData(e, t, i) {
          var n;
          const s = i ? new v.$(i) : this.descParser;
          this.data.atomic(() => {
            this.layersData.replaceBackendLayers(this.data.collection, {});
          }),
            this.data.atomic(() => {
              for (const t in e) {
                const i = e[t];
                (i.parsedDescription = s.parse(e[t].description, this.layersData.currentViewId)),
                  this.meshQueryModule.inferMeshIdsFromPoint(i, i.anchorPosition, !1),
                  this.data.addTag(i);
              }
            }),
            (this.data.onStale = async () => {
              const e = [this.store.refreshFileAttachments()];
              for (const t of this.refreshIds)
                e.push(this.store.refreshFileAttachments({ modelId: t }));
              return (await Promise.all(e)).reduce(
                (e, t) => Object.assign(Object.assign({}, e), t),
                {},
              );
            }),
            this.data.updateOnStaleCallbacks(),
            null === (n = this.monitor) || void 0 === n || n.clearDiffRecord();
        }
        createTag(e, t, i, n) {
          let s = e;
          for (; this.data.getTag(s); ) s = (0, o.O1)(11);
          const r = new a.U();
          if (((r.sid = s), (r.layerId = this.layersData.activeLayerId), n)) {
            const e = (0, m.gj)(n.mediaType);
            if (n.mediaSrc && e) {
              const t = (0, m.Nc)(s, n.mediaSrc, e);
              t && r.externalAttachments.push(t);
            }
          }
          t.objectAnnotationId && (r.objectAnnotationId = t.objectAnnotationId),
            t.keywords && (r.keywords = t.keywords);
          for (const e of i) r.fileAttachments.push(e);
          return (
            this.updateTag(r, t, n), this.data.addTag(r), this.data.updateOnStaleCallbacks(s), r
          );
        }
        updateTag(e, t, i) {
          e.updateFromOptions(t, this.descParser, this.layersData.currentViewId),
            void 0 !== (null == i ? void 0 : i.mediaType) && (e.mediaType = i.mediaType),
            void 0 !== (null == i ? void 0 : i.mediaSrc) && (e.mediaSrc = i.mediaSrc.slice());
        }
        removeFileAttachments(e, t) {
          const { fileAttachments: i } = e;
          t.forEach((t) => {
            const n = i.findIndex((e) => e.id === t.id);
            -1 !== n
              ? (i.splice(n, 1), this.filesToUnattach.push({ attachment: t, layerId: e.layerId }))
              : this.log.debug('Attempting to remove an attachment that is not in the tag');
          });
        }
        updateExternalAttachment(e, t) {
          const { mediaSrc: i } = e;
          i && e.externalAttachments.replace([]), t && e.externalAttachments.replace([t]);
        }
        registerRoomAssociationSource(e) {
          const t = this.data;
          e.commandBinder.issueCommandWhenBound(
            new $.I({
              type: 'mattertags',
              getPositionId: function* () {
                for (const e of t)
                  yield {
                    id: e.sid,
                    roomId: e.roomId,
                    floorId: e.floorId,
                    position: e.anchorPosition,
                    layerId: e.layerId,
                  };
              },
              updateRoomForId: (e, t) => {
                const i = this.data.getTag(e);
                if (!i) throw new Error('Invalid tag id!');
                i.roomId = t || void 0;
              },
            }),
          );
        }
      }
    },
    7230: (e, t, i) => {
      'use strict';
      var n;
      i.d(t, { S: () => n }),
        (function (e) {
          (e[(e.Standard = 0)] = 'Standard'),
            (e[(e.Depth = 1)] = 'Depth'),
            (e[(e.Transparent = 2)] = 'Transparent'),
            (e[(e.Wireframe = 3)] = 'Wireframe'),
            (e[(e.UV = 4)] = 'UV');
        })(n || (n = {}));
    },
    28438: (e, t, i) => {
      'use strict';
      i.d(t, { g: () => c });
      var n = i(81396),
        s = i(63511),
        a = i(25565),
        o = i(49940),
        r = i(72803),
        d = i(56620);
      class c extends o.S {
        constructor(e, t, i = s.o.ALL) {
          super(),
            (this._opacity = 1),
            (this._chunks = []),
            (this.size = new n.Vector3()),
            (this.center = new n.Vector3()),
            (this.built = !1),
            (this.layers.mask = i.mask),
            (this.name = `RoomMesh:${e}-${t}`),
            (this.meshGroup = e),
            (this.meshSubgroup = t),
            (this.renderOrder = r.z.default),
            (this.onBeforeRender = (e, t, i, n, s, a) => {
              this.updateUniforms(s, a);
            });
        }
        dispose() {
          this.reset();
        }
        reset() {
          (this._chunks.length = 0),
            this.geometry.dispose(),
            delete this.onBuild,
            delete this.onOpacityUpdate,
            (this.built = !1);
        }
        addChunk(e) {
          -1 === this._chunks.indexOf(e) && this._chunks.push(e);
        }
        getChunk(e) {
          return this._chunks[e];
        }
        build() {
          if (this.built) throw new Error('build() should only be called once');
          if (!this._chunks.length) return;
          const e = (0, a.qf)(this._chunks.map((e) => e.geometry));
          e.clearGroups();
          let t = 0;
          (this.material = []),
            this._chunks.forEach((i, n) => {
              i.geometry &&
                i.geometry.index &&
                (e.addGroup(t, i.geometry.index.count, n),
                (t += i.geometry.index.count),
                i.geometry.dispose(),
                (i.geometry = e),
                i.notifyOnMaterialUpdated((e) => {
                  Array.isArray(this.material) && (this.material[n] = e),
                    this.onMaterialUpdate && this.onMaterialUpdate();
                }),
                (i.onOpacityUpdate = (e) => {
                  this.opacity = e;
                }));
            }),
            (this.geometry = e),
            this.geometry.computeBoundingBox(),
            this.geometry.computeBoundingSphere(),
            (this.material = this._chunks.map((e) => e.material)),
            (this.size = this.boundingBox.getSize(this.size)),
            (this.center = this.boundingBox.getCenter(this.center)),
            (this.built = !0),
            this.onBuild && this.onBuild();
        }
        buildWithSingleChunk(e) {
          if (this.built) return;
          const { meshGroup: t, meshSubgroup: i, lod: n } = e;
          (this.name = `RoomMesh:${n}-${t}-${i}-${e.chunkIndex}`),
            (this.meshGroup = t),
            (this.meshSubgroup = i),
            this._chunks.push(e),
            e.notifyOnMaterialUpdated((e) => {
              (this.material = e), this.onMaterialUpdate && this.onMaterialUpdate();
            }),
            (e.onOpacityUpdate = (e) => {
              this.opacity = e;
            }),
            (this.size = this.boundingBox.getSize(this.size)),
            (this.center = this.boundingBox.getCenter(this.center)),
            (this.built = !0),
            this.onBuild && this.onBuild();
        }
        updateUniforms(e, t) {
          e instanceof n.RawShaderMaterial &&
            (t
              ? this.chunks[t.materialIndex].onBeforeDraw(e)
              : this.chunks.length && this.chunks[0].onBeforeDraw(e));
        }
        get boundingBox() {
          return (0, a.A5)(this.geometry);
        }
        set opacity(e) {
          e !== this.opacity &&
            ((this._opacity = e),
            (this.raycastEnabled = e > d.xx.FADE_CLICKABLE_THRESHOLD),
            (this.renderOrder = e < d.xx.FADE_OPAQUE ? r.z.ghostFloor : r.z.default),
            this.onOpacityUpdate && this.onOpacityUpdate(e));
        }
        get opacity() {
          return this._opacity;
        }
        get chunks() {
          return this._chunks;
        }
        getSortKey() {
          return this.chunks.length ? this._chunks[0].getSortKey() : 0;
        }
      }
    },
    41946: (e, t, i) => {
      'use strict';
      i.d(t, { n: () => s });
      var n = i(56063);
      class s extends n.m {
        constructor(e, t, i) {
          super(), (this.payload = { enabled: e, previewCirclePosition: t, size: i });
        }
      }
      s.id = 'MESH_PREVIEW_POSITION';
    },
    16419: (e, t, i) => {
      'use strict';
      i.d(t, { U: () => a });
      var n = i(56063),
        s = i(7230);
      class a extends n.m {
        constructor(e) {
          super(), (this.payload = { mode: e });
        }
      }
      (a.modes = s.S), (a.id = 'SET_CHUNK_RENDER_MODE');
    },
    74094: (e, t, i) => {
      'use strict';
      i.d(t, { u: () => s });
      var n = i(56063);
      class s extends n.m {
        constructor(e = null) {
          super(), (this.payload = { cursor: e });
        }
      }
      s.id = 'SET_MOUSE_CURSOR';
    },
    945: (e, t, i) => {
      'use strict';
      var n;
      i.d(t, { C: () => n }),
        (function (e) {
          (e.NONE = 'none'),
            (e.DEFAULT = 'default'),
            (e.MOVE = 'move'),
            (e.MOVE_LF = 'col-resize'),
            (e.MOVE_UD = 'row-resize'),
            (e.XHAIR = 'crosshair'),
            (e.PLUS = 'cell'),
            (e.QUESTION = 'help'),
            (e.NOPE = 'not-allowed'),
            (e.FINGER = 'pointer'),
            (e.TEXT = 'text'),
            (e.TEXT_VERT = 'vertical-text'),
            (e.ZOOM_IN = 'zoom-in'),
            (e.ZOOM_OUT = 'zoom-in'),
            (e.GRAB = 'grab'),
            (e.GRABBING = 'grabbing'),
            (e.ARROW_R = 'e-resize'),
            (e.ARROW_L = 'w-resize'),
            (e.ARROW_U = 'n-resize'),
            (e.ARROW_D = 's-resize'),
            (e.ARROW_UR = 'ne-resize'),
            (e.ARROW_UL = 'nw-resize'),
            (e.ARROW_DR = 'se-resize'),
            (e.ARROW_DL = 'sw-resize'),
            (e.ARROW_LR = 'ew-resize'),
            (e.ARROW_UD = 'ns-resize'),
            (e.ARROW_URDL = 'nesw-resize'),
            (e.ARROW_ULDR = 'nwse-resize'),
            (e.ROOMBOUNDS_DEFAULT = 'rbe-default'),
            (e.ROOMBOUNDS_MOVING = 'rbe-moving'),
            (e.ROOMBOUNDS_PLACE_NODE = 'rbe-place-node'),
            (e.ROOMBOUNDS_FINISH_ROOM = 'rbe-finish-room');
        })(n || (n = {}));
    },
    50720: (e, t, i) => {
      'use strict';
      var n;
      i.d(t, { U: () => n }),
        (function (e) {
          (e.CLOSED = 'closed'),
            (e.IDLE = 'idle'),
            (e.CREATING = 'creating'),
            (e.OPENING = 'opening'),
            (e.OPEN = 'open'),
            (e.EDITING = 'editing');
        })(n || (n = {}));
    },
    61260: (e, t, i) => {
      'use strict';
      i.d(t, { X: () => l });
      var n = i(42141),
        s = i(85726),
        a = i(42896),
        o = i(6373),
        r = i(50720),
        d = i(53008),
        c = i(46629);
      class l extends n.V {
        constructor(e, t, i, n) {
          super(),
            (this.data = e),
            (this.textParser = t),
            (this.linkHandler = i),
            (this.backgroundTexture = n),
            (this.name = 'notes-view-data'),
            (this.noteViewsMap = (0, a.q)()),
            (this.isNewNote = !1),
            (this.openNoteViewObservable = (0, s.Y)(null)),
            (this.focusedCommentObservable = (0, s.Y)(null)),
            (this.activeNotationObservable = (0, s.Y)(null)),
            (this.idVisibilityEnabled = !1),
            (this.idVisibility = new Set()),
            (this.notesPhaseObservable = (0, s.Y)(r.U.CLOSED)),
            (this.notesFilterObservable = (0, s.Y)(d.$.OPEN)),
            (this.updateNoteViews = () => {
              const e = {};
              this.data.iterate((t) => {
                var i;
                const n = this.createNoteView(t);
                (e[t.id] = n),
                  (null === (i = this.openNoteView) || void 0 === i ? void 0 : i.id) === n.id &&
                    this.setOpenNoteView(n);
              }),
                this.noteViewsMap.replace(e);
            }),
            (this.sortByDate = (e, t) => t.lastCommentMs - e.lastCommentMs),
            (this.filterByResolved = (e) =>
              this.notesFilter === d.$.ALL || e.resolved === (this.notesFilter === d.$.RESOLVED)),
            (this.noteViews = new o.Q(this.noteViewsMap)),
            (this.noteViews.priority = o.K.LOW),
            this.notesFilter !== d.$.ALL &&
              this.noteViews.setFilter(this.notesFilter, this.filterByResolved),
            this.noteViews.sort(this.sortByDate),
            this.updateNoteViews();
        }
        getFilteredNotesMap() {
          return this.noteViews;
        }
        getNoteViewsMap() {
          return this.noteViewsMap;
        }
        getNoteView(e) {
          return this.noteViewsMap.get(e);
        }
        getTextParser() {
          return this.textParser;
        }
        getLinkHandler() {
          return this.linkHandler;
        }
        getComment(e, t) {
          const i = this.getNoteView(e);
          return (null == i ? void 0 : i.comments.find((e) => e.id === t)) || null;
        }
        getReply(e, t) {
          const i = this.getNoteView(e);
          return (null == i ? void 0 : i.comments.find((e, i) => i > 0 && e.id === t)) || null;
        }
        getAttachment(e, t, i) {
          var n;
          const s =
            (null === (n = this.getNoteView(e)) || void 0 === n
              ? void 0
              : n.comments.find((e) => e.id === t)) || null;
          return (null == s ? void 0 : s.attachments.find((e) => e.id === i)) || null;
        }
        createNoteView(e) {
          return Object.assign(Object.assign({}, e), {
            backgroundTexture: this.backgroundTexture,
            icon: c.Qk[c.Er.NOTE],
          });
        }
        getCommentUserMentions(e, t) {
          const i = [];
          return (
            this.textParser.getUserMentions(e).forEach((e) => {
              const n = t[e];
              n && i.push(n);
            }),
            i
          );
        }
        getNoteAttachments(e) {
          const t = [],
            i = this.getNoteView(e);
          return (
            i &&
              i.comments.forEach((e) => {
                t.push(...e.attachments);
              }),
            t
          );
        }
        getPendingNote() {
          return this.isNewNote && this.openNoteView ? this.openNoteView : null;
        }
        setNotesPhase(e) {
          this.notesPhaseObservable.value = e;
        }
        get notesPhase() {
          return this.notesPhaseObservable.value;
        }
        onNotesPhaseChanged(e) {
          return this.notesPhaseObservable.onChanged(e);
        }
        setNotesFilter(e) {
          const t = this.notesFilterObservable.value;
          (this.notesFilterObservable.value = e),
            this.noteViews.atomic(() => {
              this.noteViews.clearFilter(t),
                e !== d.$.ALL && this.noteViews.setFilter(e, this.filterByResolved);
            });
        }
        get notesFilter() {
          return this.notesFilterObservable.value;
        }
        onNotesFilterChanged(e) {
          return this.notesFilterObservable.onChanged(e);
        }
        setActiveNotation(e) {
          this.activeNotationObservable.value = e;
        }
        get activeNotation() {
          return this.activeNotationObservable.value;
        }
        onActiveNotationChanged(e) {
          return this.activeNotationObservable.onChanged(e);
        }
        setOpenNoteView(e) {
          this.openNoteViewObservable.value = e;
        }
        get openNoteView() {
          return this.openNoteViewObservable.value;
        }
        onOpenNoteViewChanged(e) {
          return this.openNoteViewObservable.onChanged(e);
        }
        resetOpenNoteView() {
          const e = this.openNoteView;
          if (e) {
            const t = this.data.getNoteProperties(e.id);
            t && this.updateOpenNoteView(t);
          }
        }
        updateOpenNoteView(e) {
          const t = this.openNoteView;
          t && Object.assign(t, e);
        }
        setFocusedComment(e) {
          this.focusedCommentObservable.value = e;
        }
        get focusedComment() {
          return this.focusedCommentObservable.value;
        }
        onFocusedCommentChanged(e) {
          return this.focusedCommentObservable.onChanged(e);
        }
      }
    },
    53008: (e, t, i) => {
      'use strict';
      var n, s;
      i.d(t, { $: () => n, Y: () => s }),
        (function (e) {
          (e.OPEN = 'open'), (e.RESOLVED = 'resolved'), (e.ALL = 'all');
        })(n || (n = {})),
        (function (e) {
          (e.DEFAULT = 'default'), (e.HIGHLIGHTED = 'highlighted'), (e.DIMMED = 'dimmed');
        })(s || (s = {}));
    },
    27444: (e, t, i) => {
      'use strict';
      i.d(t, { e: () => o });
      var n = i(67294),
        s = i(9755);
      function a(e, t) {
        return t && e && e.focusedComment ? e.getReply(t, e.focusedComment.id) : null;
      }
      function o(e) {
        const t = (0, s.Q)(),
          [i, o] = (0, n.useState)(a(t, e));
        return (
          (0, n.useEffect)(() => {
            if (!t) return () => {};
            const i = t.onFocusedCommentChanged(function () {
              o(a(t, e));
            });
            return () => i.cancel();
          }, [t, e]),
          i
        );
      }
    },
    54297: (e, t, i) => {
      'use strict';
      i.d(t, { V: () => a });
      var n = i(67294),
        s = i(9755);
      function a(e) {
        const t = (0, s.Q)(),
          [i, a] = (0, n.useState)((null == t ? void 0 : t.getNoteView(e)) || null);
        return (
          (0, n.useEffect)(() => {
            if (!t) return () => {};
            const i = t.getNoteViewsMap().onChanged(function () {
              t && a(t.getNoteView(e));
            });
            return () => i.cancel();
          }, [t, e]),
          i
        );
      }
    },
    13819: (e, t, i) => {
      'use strict';
      i.d(t, { x: () => o });
      var n = i(67294),
        s = i(9755);
      function a(e) {
        return e ? e.getLinkHandler() : null;
      }
      function o() {
        const e = (0, s.Q)(),
          [t, i] = (0, n.useState)(a(e));
        return (0, n.useEffect)(() => (t || i(a(e)), () => {}), [e]), t;
      }
    },
    46785: (e, t, i) => {
      'use strict';
      i.d(t, { l: () => o });
      var n = i(67294),
        s = i(9755);
      function a(e) {
        return e ? e.getTextParser() : null;
      }
      function o() {
        const e = (0, s.Q)(),
          [t, i] = (0, n.useState)(a(e));
        return (0, n.useEffect)(() => (t || i(a(e)), () => {}), [e]), t;
      }
    },
    9755: (e, t, i) => {
      'use strict';
      i.d(t, { Q: () => a });
      var n = i(38908),
        s = i(61260);
      const a = (0, n.u)(s.X);
    },
    44684: (e, t, i) => {
      'use strict';
      i.r(t),
        i.d(t, {
          AddCommentCommand: () => se.Df,
          CancelCommentChangesCommand: () => se.oH,
          CancelNewNoteCommand: () => se.gc,
          CloseNoteCommand: () => se._N,
          Comment: () => xe,
          DeleteCommentCommand: () => se.mH,
          DeleteNoteCommand: () => se.sG,
          EditCommentCommand: () => se.x4,
          FilterVisibleNotesCommand: () => se.Gx,
          FocusCommentMessage: () => re,
          HashtagData: () => ne,
          Note: () => Q,
          NoteColorVariant: () => $.Y,
          NoteResolutionChangeMessage: () => oe,
          NotesData: () => te,
          NotesFilter: () => $.$,
          NotesModeToggleCommand: () => se.yK,
          NotesPhase: () => W.U,
          NotesViewData: () => ie.X,
          NotesVisibilityFilterEnabledCommand: () => se.GV,
          OpenNoteCommentCommand: () => se.yP,
          RegisterNotesTool: () => se.vn,
          ResolveNoteCommand: () => se.yp,
          SaveNewNoteCommand: () => se.FB,
          SaveNoteAppearanceCommand: () => se.oE,
          SaveNoteChangesCommand: () => se.kd,
          StartNewNoteCommand: () => se.VI,
          ToggleNoteToolEditorCommand: () => se.df,
          ToggleNotesFilterCommand: () => se.RO,
          UpdateCommentCommand: () => se.Uw,
          default: () => Ss,
        });
      var n = i(933),
        s = i(45796),
        a = i(59491),
        o = i(80383),
        r = i(71472);
      const d = i.p + 'images/NoteColor.png';
      var c = i(28721),
        l = i(90288),
        h = i(75287),
        u = i(89555),
        m = i(59635),
        p = i(27163),
        g = i(92257),
        v = i(2159),
        y = i(70593),
        f = i(13760),
        w = i(93355),
        b = i(87168),
        T = i(61725),
        C = i(88288),
        E = i(31740),
        D = i(90512),
        x = i(64150),
        A = i(55574),
        O = i(60937),
        S = i(22925),
        P = i(68687),
        I = i(3999),
        k = i(38063),
        N = i(94989),
        R = i(46629),
        M = i(83730),
        j = i(44009),
        L = i(73515),
        B = i(25100),
        V = i(12925),
        F = i(7555);
      function _(e, t) {
        return !!t && t.id === e.getCurrentUserId();
      }
      function H(e, t, i) {
        if (t === B.J.NOTE) {
          return e.isCommenter() && _(e, i);
        }
        return e.isEditor();
      }
      function U(e, t, i) {
        if (t === B.J.NOTE) {
          return (e.isCommenter() && _(e, i)) || e.isOrgAdmin();
        }
        return e.isEditor();
      }
      var G = i(25629),
        z = i(39262),
        W = i(50720),
        $ = i(53008),
        K = i(81396),
        Z = i(64831),
        Y = i(53584),
        J = i(60493),
        q = i(40475);
      class Q extends Z.T {
        constructor(e) {
          super(),
            (this.id = ''),
            (this.layerId = ''),
            (this.color = q.Rn),
            (this.anchorPosition = new K.Vector3()),
            (this.stemNormal = new K.Vector3()),
            (this.stemLength = q.ZP.stem.length),
            (this.stemEnabled = !0),
            (this.created = new Date()),
            (this.modified = new Date()),
            (this.lastCommentMs = new Date().getTime()),
            (this.resolved = !1),
            (this.user = (0, J.Q)('')),
            (this.comments = (0, Y.C)([])),
            e && Object.assign(this, e);
        }
        copy(e) {
          return (
            (this.id = e.id),
            (this.user = e.user),
            (this.resolved = e.resolved),
            (this.color = e.color),
            (this.floorId = e.floorId),
            (this.roomId = e.roomId),
            this.anchorPosition.copy(e.anchorPosition),
            this.stemNormal.copy(e.stemNormal),
            (this.stemLength = e.stemLength),
            (this.stemEnabled = e.stemEnabled),
            this.created.setTime(e.created.getTime()),
            this.modified.setTime(e.modified.getTime()),
            (this.lastCommentMs = e.lastCommentMs),
            this.comments.replace(e.comments.values()),
            this.commit(),
            this
          );
        }
        getComment(e) {
          return this.comments.find((t) => t.id === e) || null;
        }
        updateComment(e) {
          const t = this.comments.findIndex((t) => t.id === e.id);
          -1 !== t && ((e.assetId = this.id), this.comments.update(t, e));
        }
        deleteComment(e) {
          const t = this.comments.findIndex((t) => t.id === e);
          -1 !== t && this.comments.splice(t, 1);
        }
      }
      var X = i(42141),
        ee = i(42896);
      class te extends X.V {
        constructor(e) {
          super(), (this.name = 'notes-data'), (this.notes = (0, ee.q)(e));
        }
        iterate(e) {
          for (const t of this.notes) e(t);
        }
        updateNote(e) {
          this.notes.has(e.id) ? this.notes.get(e.id).copy(e) : this.notes.set(e.id, e);
        }
        updateNoteProperties(e, t) {
          if (this.notes.has(e)) {
            const i = this.notes.get(e);
            let n = !1;
            void 0 !== t.resolved &&
              t.resolved !== i.resolved &&
              ((i.resolved = t.resolved), (n = !0)),
              void 0 !== t.color && t.color !== i.color && ((i.color = t.color), (n = !0)),
              void 0 !== t.anchorPosition &&
                t.anchorPosition !== i.anchorPosition &&
                ((i.anchorPosition = t.anchorPosition), (n = !0)),
              void 0 !== t.stemNormal &&
                t.stemNormal !== i.stemNormal &&
                ((i.stemNormal = t.stemNormal), (n = !0)),
              void 0 !== t.stemLength &&
                t.stemLength !== i.stemLength &&
                ((i.stemLength = t.stemLength), (n = !0)),
              void 0 !== t.stemEnabled &&
                t.stemEnabled !== i.stemEnabled &&
                ((i.stemEnabled = t.stemEnabled), (n = !0)),
              void 0 !== t.floorId &&
                t.floorId !== i.floorId &&
                ((i.floorId = t.floorId), (n = !0)),
              void 0 !== t.roomId && t.roomId !== i.roomId && ((i.roomId = t.roomId), (n = !0)),
              n && i.commit();
          }
        }
        removeNote(e) {
          this.notes.has(e) && (this.notes.delete(e), this.commit());
        }
        getNote(e) {
          return this.notes.get(e);
        }
        getNoteProperties(e) {
          const t = this.notes.get(e);
          if (!t) return null;
          return Object.assign({}, t);
        }
        get collection() {
          return this.notes;
        }
      }
      var ie = i(61260);
      class ne extends X.V {
        constructor() {
          super(...arguments), (this.name = 'hashtag-data'), (this.hashtags = (0, Y.C)([]));
        }
        addHashtags(e) {
          this.atomic(() => {
            e.forEach((e) => {
              this.addHashtag(e);
            });
          });
        }
        addHashtag(e) {
          const t = e.trim().toLowerCase();
          -1 === this.hashtags.map((e) => e.trim().toLowerCase()).indexOf(t) &&
            this.hashtags.push(e);
        }
        getHashtags() {
          return this.hashtags.values();
        }
      }
      var se = i(18510),
        ae = i(8126);
      class oe extends ae.v0 {
        constructor(e, t) {
          super(), (this.id = e), (this.resolved = t);
        }
      }
      class re extends ae.v0 {
        constructor(e) {
          super(), (this.commentId = e);
        }
      }
      var de = i(38386),
        ce = i(93797),
        le = i(79978),
        he = i(53257),
        ue = i(15352),
        me = i(47994),
        pe = i(73908),
        ge = i(32197);
      const ve = new he.Z('mds-note-serialize');
      class ye {
        constructor() {
          (this.getNoteDetails = (e, t, i) => {
            const n = { enabled: !0, floorId: '', roomId: void 0 };
            void 0 !== e.floorId && '' !== e.floorId && (n.floorId = e.floorId),
              void 0 !== e.roomId && '' !== e.roomId && (n.roomId = e.roomId),
              void 0 !== e.color && '' !== e.color && (n.color = e.color),
              void 0 !== e.stemEnabled && (n.stemEnabled = e.stemEnabled),
              void 0 !== e.stemLength && (n.stemLength = e.stemLength),
              void 0 !== e.anchorPosition &&
                (0, pe.u)(e.anchorPosition) &&
                (n.anchorPosition = ge.ep.toVisionVector(e.anchorPosition)),
              void 0 !== e.stemNormal &&
                (0, pe.u)(e.stemNormal) &&
                (n.stemNormal = ge.ep.toVisionVector(e.stemNormal)),
              void 0 !== e.resolved && (n.resolution = e.resolved ? o.d7.RESOLVED : o.d7.OPEN),
              i && e.layerId && (n.layerId = e.layerId);
            const s = { text: t };
            return (n.comment = s), Object.keys(n).length > 0 ? n : null;
          }),
            (this.validate = (e) => {
              if (!e) return !1;
              const t = ['floorId', 'roomId', 'enabled'].filter((t) => !(t in e)),
                i = 0 === t.length,
                n = !!e.floorId && 'string' == typeof e.floorId,
                s = !!e.anchorPosition && (0, pe.u)(e.anchorPosition),
                a = i && n && s;
              return a || ve.debug('Note invalid:', { missingFields: t, validPosition: s }), a;
            });
        }
        serialize(e, t, i) {
          const n = this.getNoteDetails(e, t, i);
          return this.validate(n) ? n : null;
        }
      }
      class fe {
        constructor() {
          (this.getNotePatch = (e, t) => {
            if (!e) return null;
            const i = {};
            return (
              void 0 !== e.floorId && '' !== e.floorId && (i.floorId = e.floorId),
              void 0 !== e.roomId && '' !== e.roomId && (i.roomId = e.roomId),
              void 0 !== e.color && '' !== e.color && (i.color = e.color),
              void 0 !== e.stemEnabled && (i.stemEnabled = e.stemEnabled),
              void 0 !== e.stemLength && (i.stemLength = e.stemLength),
              void 0 !== e.anchorPosition &&
                (0, pe.u)(e.anchorPosition) &&
                (i.anchorPosition = ge.ep.toVisionVector(e.anchorPosition)),
              void 0 !== e.stemNormal &&
                (0, pe.u)(e.stemNormal) &&
                (i.stemNormal = ge.ep.toVisionVector(e.stemNormal.normalize())),
              t && e.layerId && (i.layerId = e.layerId),
              Object.keys(i).length > 0 ? i : null
            );
          }),
            (this.validate = (e) => {
              if (!e) return !1;
              const t = [
                'floorId',
                'roomId',
                'color',
                'anchorPosition',
                'stemNormal',
                'stemLength',
                'stemEnabled',
                'stemNormal',
                'enabled',
              ];
              return Object.keys(e).every((e) => t.includes(e));
            });
        }
        serialize(e, t) {
          const i = this.getNotePatch(e, t);
          return i && this.validate(i) ? i : null;
        }
      }
      var we = i(38256),
        be = i(49518);
      function Te(e) {
        const t = Object.assign({ modelAccess: o.x6.PUBLIC }, e);
        return t.__typename && delete t.__typename, t;
      }
      const Ce = new he.Z('mds-note-deserializer');
      class Ee {
        constructor(e, t) {
          (this.commentDeserializer = e),
            (this.userData = t),
            (this.validate = (e) => {
              if (!e) return !1;
              const t = ['id', 'created', 'modified', 'floor', 'resolution'].filter(
                  (t) => !(t in e),
                ),
                i = 0 === t.length,
                n = !(!e.floor || !e.floor.id);
              return (
                (i && n) || Ce.debug('Note invalid:', { missingFields: t, validFloor: n }), i && n
              );
            });
        }
        deserialize(e) {
          var t;
          if (!e || !this.validate(e) || !e.floor)
            return Ce.debug('Deserialized invalid Note data from MDS', e), null;
          const i = new Q();
          (i.id = e.id),
            (i.layerId = (null === (t = e.layer) || void 0 === t ? void 0 : t.id) || ''),
            (i.floorId = e.floor.id),
            e.room && e.room.id && (i.roomId = e.room.id),
            (i.resolved = e.resolution === o.d7.RESOLVED),
            (i.created = (0, we.p)(e.created)),
            (i.modified = (0, we.p)(e.modified)),
            (i.user = this.userData.loadContributor(Te(e.createdBy))),
            (i.lastCommentMs = (0, we.p)(e.lastCommentAt).getTime());
          const n = this.deserializeComments(e);
          if (!(n.length > 0)) return Ce.error('Note without a comment:', i.id), null;
          i.comments.replace(n), e.color && (i.color = e.color);
          const s = e.anchorPosition ? ge.ep.fromVisionVector(e.anchorPosition) : void 0;
          s && (i.anchorPosition = s), (0, be.hj)(e.stemLength) && (i.stemLength = e.stemLength);
          const a = e.stemNormal ? ge.ep.fromVisionVector(e.stemNormal) : void 0;
          return (
            a
              ? ((i.stemNormal = a), (i.stemEnabled = !!e.stemEnabled))
              : ((i.stemNormal = new K.Vector3(0, 0, 0)), (i.stemEnabled = !!e.stemEnabled)),
            i
          );
        }
        deserializeComments(e) {
          var t;
          const i = (null === (t = e.comments) || void 0 === t ? void 0 : t.results) || [],
            n = [];
          return (
            i.forEach((t) => {
              const i = this.commentDeserializer.deserialize(t);
              i && ((i.assetId = e.id), n.push(i));
            }),
            n
          );
        }
      }
      class De {
        constructor() {
          this.validate = (e) => !!e;
        }
        serialize(e) {
          if (void 0 === e.text) return null;
          const t = { text: e.text };
          return t && this.validate(t) ? t : null;
        }
      }
      class xe extends Z.T {
        constructor(e) {
          super(),
            (this.id = ''),
            (this.assetId = ''),
            (this.text = ''),
            (this.user = (0, J.Q)('')),
            (this.created = new Date()),
            (this.modified = new Date()),
            (this.edited = !1),
            (this.attachments = (0, Y.C)([])),
            e && Object.assign(this, e);
        }
        copy(e) {
          return (
            (this.id = e.id),
            (this.user = e.user),
            (this.assetId = e.assetId),
            this.created.setTime(e.created.getTime()),
            this.modified.setTime(e.modified.getTime()),
            (this.text = e.text),
            (this.edited = e.edited),
            (this.attachments = e.attachments),
            this.commit(),
            this
          );
        }
      }
      const Ae = new he.Z('mds-comment-deserializer');
      class Oe {
        constructor(e, t, i) {
          (this.fileDeserializer = e), (this.embedDeserializer = t), (this.userData = i);
        }
        deserialize(e) {
          if (!e || !this.validate(e))
            return Ae.debug('Deserialized invalid Comment data from MDS', e), null;
          const t = new xe();
          (t.id = e.id),
            (t.created = (0, we.p)(e.created)),
            (t.modified = (0, we.p)(e.modified)),
            e.text && (t.text = e.text),
            (t.edited = e.edited),
            (t.user = this.userData.loadContributor(Te(e.createdBy)));
          const i = this.deserializeExternalAttachments(e),
            n = this.deserializeFileAttachments(e),
            s = i.concat(n).sort((e, t) => e.created.getTime() - t.created.getTime());
          return s.length > 0 && t.attachments.replace(s), t;
        }
        deserializeExternalAttachments(e) {
          const t = e.externalAttachments || [],
            i = [];
          return (
            t.forEach((t) => {
              const n = this.embedDeserializer.deserialize(t);
              n && ((n.parentId = e.id), (n.parentType = o.ud.COMMENT), i.push(n));
            }),
            i
          );
        }
        deserializeFileAttachments(e) {
          const t = e.fileAttachments || [],
            i = [];
          return (
            t.forEach((t) => {
              const n = this.fileDeserializer.deserialize(t);
              n && ((n.parentId = e.id), (n.parentType = o.ud.COMMENT), i.push(n));
            }),
            i
          );
        }
        validate(e) {
          if (!e) return !1;
          const t = ['id', 'created', 'modified', 'edited', 'createdBy'].filter((t) => !(t in e)),
            i = 0 === t.length;
          return i || Ae.debug('Comment invalid:', { missingFields: t }), i;
        }
      }
      var Se = i(44571),
        Pe = i(36159);
      const Ie = new he.Z('MdsNoteStore');
      class ke extends ce.u {
        constructor(e, t) {
          super(e),
            (this.userData = t),
            (this.prefetchKey = 'data.model.notes'),
            (this.layeredType = o.SF.NOTE),
            (this.embedDeserializer = new ue.d()),
            (this.fileDeserializer = new me.O()),
            (this.commentDeserializer = new Oe(
              this.fileDeserializer,
              this.embedDeserializer,
              this.userData,
            )),
            (this.deserializer = new Ee(this.commentDeserializer, this.userData)),
            (this.createSerializer = new ye()),
            (this.patchSerializer = new fe()),
            (this.commentSerializer = new De());
        }
        async read(e) {
          const t = { modelId: this.getViewId(), ids: null, includeLayers: this.readLayerId() };
          return this.query(Se.GetNotes, t, e).then((e) => {
            var t, i;
            const n =
              null ===
                (i =
                  null === (t = null == e ? void 0 : e.data) || void 0 === t ? void 0 : t.model) ||
              void 0 === i
                ? void 0
                : i.notes;
            if (!n || !Array.isArray(n)) return {};
            const s = [];
            for (const e of n) {
              const t = this.deserializer.deserialize(e);
              t && s.push(t);
            }
            return s.reduce((e, t) => ((e[t.id] = t), e), {});
          });
        }
        async readNote(e, t) {
          const i = { modelId: this.getViewId(), ids: [e], includeLayers: this.readLayerId() };
          return this.query(Se.GetNotes, i, t).then((e) => {
            var t, i;
            const n =
              null ===
                (i =
                  null === (t = null == e ? void 0 : e.data) || void 0 === t ? void 0 : t.model) ||
              void 0 === i
                ? void 0
                : i.notes;
            return n && Array.isArray(n) && 1 === n.length
              ? this.deserializer.deserialize(n[0])
              : null;
          });
        }
        async create(e, t) {
          var i;
          const n = this.getViewId(),
            s = this.createSerializer.serialize(e, t, this.writeLayerId(e.layerId));
          if (!s)
            throw (Ie.error('Failure creating note:', e.id, e), new Error('Could not create Note'));
          const a = { modelId: n, data: s, includeLayers: this.readLayerId() },
            o = await this.mutate(Se.AddNote, a).catch((e) => {
              throw new le.w0(e);
            });
          if (null === (i = o.data) || void 0 === i ? void 0 : i.addNote) {
            const e = this.deserializer.deserialize(o.data.addNote);
            if (e)
              return e.layerId && (await this.context.updateForAutoProvisionedLayer(e.layerId)), e;
          }
          throw new Error('Unable to create new Note');
        }
        async update(e) {
          const t = this.getViewId(),
            i = e.id,
            n = this.patchSerializer.serialize(e, !1);
          if (!n || !i)
            throw (Ie.error('Failure updating note:', i), new Error('Could not update Note'));
          const s = { modelId: t, noteId: i, data: n, includeLayers: this.readLayerId() };
          return this.mutate(Se.PatchNote, s).then((e) => {
            var t, i;
            return (null === (t = e.data) || void 0 === t ? void 0 : t.patchNote)
              ? this.deserializer.deserialize(
                  null === (i = e.data) || void 0 === i ? void 0 : i.patchNote,
                )
              : null;
          });
        }
        async updateResolution(e, t) {
          const i = { modelId: this.getViewId(), noteId: e };
          return t
            ? this.mutate(Se.ResolveNote, i).then((e) => {
                var t;
                return null === (t = e.data) || void 0 === t ? void 0 : t.resolveNote;
              })
            : this.mutate(Se.ReopenNote, i).then((e) => {
                var t;
                return null === (t = e.data) || void 0 === t ? void 0 : t.reopenNote;
              });
        }
        async delete(e) {
          const t = this.getViewId();
          for (const i of e) await this.mutate(Se.DeleteNote, { modelId: t, noteId: i.id });
        }
        async createComment(e, t) {
          const i = this.getViewId(),
            n = this.commentSerializer.serialize(t);
          if (!n)
            throw (Ie.error('Failure creating comment:', t), new Error('Could not create Comment'));
          const s = { modelId: i, noteId: e, data: n };
          return this.mutate(Se.AddNoteComment, s).then((e) => {
            var t;
            return (null === (t = e.data) || void 0 === t ? void 0 : t.addNoteComment)
              ? this.commentDeserializer.deserialize(e.data.addNoteComment)
              : null;
          });
        }
        async updateComment(e) {
          const t = this.getViewId(),
            i = e.id,
            n = this.commentSerializer.serialize(e);
          if (!n || !i)
            throw (Ie.error('Failure updating comment:', i), new Error('Could not update Comment'));
          const s = { modelId: t, commentId: i, data: n };
          return this.mutate(Pe.PatchComment, s).then((e) => {
            var t, i;
            return (null === (t = e.data) || void 0 === t ? void 0 : t.patchComment)
              ? this.commentDeserializer.deserialize(
                  null === (i = e.data) || void 0 === i ? void 0 : i.patchComment,
                )
              : null;
          });
        }
        async deleteComment(e) {
          const t = this.getViewId();
          if (!e || !(null == e ? void 0 : e.id))
            throw new Error('MdsNoteStore.deleteComment failed');
          const i = { modelId: t, commentId: e.id };
          await this.mutate(Pe.DeleteComment, i);
        }
      }
      var Ne = i(24938),
        Re = i(20348),
        Me = i(32137),
        je = i(73521),
        Le = i(40232);
      class Be extends je.K {
        constructor(e, t, i, n, s, a, r) {
          super(e, t, i),
            (this.comment = n),
            (this.note = s),
            (this.textParser = a),
            (this.asWholeNote = r),
            (this.id = this.comment.id),
            (this.parentId = this.note.id),
            (this.title = this.comment.user.name),
            (this.description = this.textParser.getPlainText(this.comment.text)),
            (this.icon = 'icon-comment'),
            (this.typeId = o.SF.NOTE),
            (this.floorId = this.note.floorId),
            (this.roomId = this.note.roomId || ''),
            (this.layerId = this.note.layerId),
            (this.dateBucket = this.getNoteOrCommentDateBucket()),
            (this.color = this.note.color),
            (this.resolved = this.note.resolved),
            (this.numAttachments = this.comment.attachments.length),
            (this.numComments = this.note.comments.length),
            (this.user = this.comment.user),
            (this.enabled = !this.note.resolved),
            (this.onSelect = async (e, t, i) => {
              super.onSelect(), await this.commandBinder.issueCommand(new L.yL());
              const n = t === p.w1.NOTES || i || e;
              this.commandBinder.issueCommand(new se.yP(this.note.id, n, !1, this.comment.id));
            });
        }
        supportsLayeredCopyMove() {
          return !0;
        }
        supportsBatchDelete() {
          return !0;
        }
        getNoteOrCommentDateBucket() {
          return (0, Le.f)(
            new Date(this.asWholeNote ? this.note.lastCommentMs : this.comment.created),
          );
        }
      }
      var Ve = i(7321);
      const { NOTES: Fe } = Ve.Z.SHOWCASE;
      var _e = i(37137),
        He = i(35659),
        Ue = i(34014),
        Ge = i(35922),
        ze = i(85893),
        We = i(44303),
        $e = i(67294),
        Ke = i(9755),
        Ze = i(16824);
      function Ye() {
        const e = (0, Ke.Q)(),
          [t, i] = (0, $e.useState)(e ? e.openNoteView : null);
        return (
          (0, $e.useEffect)(() => {
            if (!e) return () => {};
            const t = e.onOpenNoteViewChanged(i);
            return i(e.openNoteView), () => t.cancel();
          }, [e]),
          t
        );
      }
      (0, Ze.M)('openNoteView', Ye);
      var Je = i(31864),
        qe = i(54889);
      function Qe() {
        const e = (0, Ke.Q)(),
          [t, i] = (0, $e.useState)((null == e ? void 0 : e.notesFilter) || $.$.OPEN);
        return (
          (0, $e.useEffect)(() => {
            if (!e) return () => {};
            const t = e.onNotesFilterChanged(i);
            return () => t.cancel();
          }, [e]),
          t
        );
      }
      var Xe = i(43948),
        et = i(27538),
        tt = i(16996);
      const it = (0, tt.M)(y.t, 'softOpening', !1);
      var nt = i(9993),
        st = i(59537);
      function at() {
        const e = (0, st.P)(),
          [t, i] = (0, $e.useState)(e ? e.dockedAnnotation : null);
        return (
          (0, $e.useEffect)(() => {
            if (!e) return () => {};
            function t() {
              i(e ? e.dockedAnnotation : null);
            }
            const n = e.onChanged(t);
            return t(), () => n.cancel();
          }, [e]),
          t
        );
      }
      (0, Ze.M)('dockedAnnotation', at);
      const ot = (0, tt.M)(ie.X, 'isNewNote', !1);
      var rt = i(29707),
        dt = i(80366),
        ct = i(38908);
      const lt = (0, ct.u)(w.m);
      function ht() {
        const e = (0, Ke.Q)(),
          [t, i] = (0, $e.useState)((null == e ? void 0 : e.notesPhase) || W.U.CLOSED);
        return (
          (0, $e.useEffect)(() => {
            if (!e) return () => {};
            const t = e.onNotesPhaseChanged(i);
            return i(e.notesPhase), () => t.cancel();
          }, [e]),
          t
        );
      }
      var ut = i(94184),
        mt = i.n(ut);
      function pt() {
        const e = (0, Ke.Q)(),
          [t, i] = (0, $e.useState)((null == e ? void 0 : e.activeNotation) || null);
        return (
          (0, $e.useEffect)(() => {
            if (!e) return () => {};
            const t = e.onActiveNotationChanged(i);
            return () => t.cancel();
          }, [e]),
          t
        );
      }
      var gt = i(54297);
      function vt(e) {
        const t = [];
        return (
          e &&
            e.comments.forEach((e) => {
              t.push(...e.attachments);
            }),
          t
        );
      }
      var yt = i(78897);
      function ft() {
        const e = lt(),
          [t, i] = (0, $e.useState)((null == e ? void 0 : e.getUsersWhoMayNeedAccess()) || {});
        return (
          (0, $e.useEffect)(() => {
            if (!e) return () => {};
            function t() {
              i((null == e ? void 0 : e.getUsersWhoMayNeedAccess()) || {});
            }
            const n = e.onChanged(t);
            return t(), () => n.cancel();
          }, [e]),
          t
        );
      }
      var wt = i(46785),
        bt = i(13819);
      const Tt = (0, ct.u)(ne);
      function Ct() {
        const e = Tt(),
          [t, i] = (0, $e.useState)((null == e ? void 0 : e.getHashtags()) || []);
        return (
          (0, $e.useEffect)(() => {
            if (!e) return () => {};
            function t() {
              i((null == e ? void 0 : e.getHashtags()) || []);
            }
            const n = e.onChanged(t);
            return (
              t(),
              () => {
                n.cancel();
              }
            );
          }, [e]),
          t
        );
      }
      var Et = i(80308),
        Dt = i(38772),
        xt = i(53484),
        At = i(51141),
        Ot = i(39786),
        St = i(62402),
        Pt = i(6394),
        It = i(20360),
        kt = new RegExp(
          '^(?:(?:(?:https?|ftp):)?\\/\\/)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z0-9\\u00a1-\\uffff][a-z0-9\\u00a1-\\uffff_-]{0,62})?[a-z0-9\\u00a1-\\uffff]\\.)+(?:[a-z\\u00a1-\\uffff]{2,}\\.?))(?::\\d{2,5})?(?:[/?#]\\S*)?$',
          'i',
        );
      const Nt = (e) => ((e) => kt.test(e))(e) && /^https?:\/\//.test(e);
      var Rt = i(31286),
        Mt = i(92394),
        jt = function (e, t, i, n) {
          var s,
            a = arguments.length,
            o = a < 3 ? t : null === n ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
          if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
            o = Reflect.decorate(e, t, i, n);
          else
            for (var r = e.length - 1; r >= 0; r--)
              (s = e[r]) && (o = (a < 3 ? s(o) : a > 3 ? s(t, i, o) : s(t, i)) || o);
          return a > 3 && o && Object.defineProperty(t, i, o), o;
        },
        Lt = function (e, t) {
          if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
            return Reflect.metadata(e, t);
        };
      const Bt = '​';
      let Vt = class extends $e.Component {
        constructor(e) {
          super(e),
            (this.emailMention = !1),
            (this.wordToken = null),
            (this.endTokens = {
              '@': [',', ' ', '!', '?', '/', ';', ':', '(', ')'],
              '#': [',', ' ', '.', '!', '?', '/', ';', ':'],
            }),
            (this.wordElement = null),
            (this.linkElement = null),
            (this.onClickAnchor = (e) => {
              const t = e.target,
                i = t.dataset.blocktype;
              this.props.active
                ? (e.preventDefault(), i === u.C.LINK && this.prepareLinkForEdit(t))
                : i &&
                  this.props.onClickBlock(
                    { blockType: i, text: t.innerText, value: t.dataset.value, id: t.dataset.id },
                    e,
                  );
            }),
            (this.onSelectionChange = () => {
              const e = this.getCurrentRange();
              if (e) {
                this.range = e.cloneRange();
                const t = this.wordElement && null === this.wordElement.parentElement,
                  i = !!this.wordElement && this.wordElement !== this.getAnchorFromSelection();
                (t || i) &&
                  this.wordElement &&
                  (this.wordElement.classList.add('link-annotation-active'),
                  this.endWordMatching()),
                  this.insertFocusNodeIfNeeded();
              }
            }),
            (this.addFauxHighlight = () => {
              this.execCommand('backColor', '#ff315840');
            }),
            (this.removeFauxHighlight = () => {
              this.execCommand('backColor', 'transparent');
            }),
            (this.isEmailMention = (e = '') => e.lastIndexOf('@') > 0),
            (this.onInput = (e) => {
              var t;
              const i = e.nativeEvent,
                n = i.inputType,
                s = n.startsWith('insert'),
                a = 'insertLineBreak' === n,
                o = i.data,
                r = this.startTokens;
              e.stopPropagation();
              const { isLinkNode: d, isSpecialNode: c, anchorNode: l } = this.tryGetAnchorNode();
              if (r.length && !d && !a) {
                let a = o && o.length > 0 ? o.charAt(o.length - 1) : '';
                const d = this.getTextElement(),
                  h = ((null == d ? void 0 : d.innerText) || '').trim().length;
                if (
                  (d && n.startsWith('delete') && 0 === h && (d.innerHTML = ''),
                  this.updateWordElement(i, c, l),
                  !this.wordToken && r.includes(a)
                    ? (e.preventDefault(),
                      (this.wordToken = a),
                      (this.emailMention = !1),
                      this.createWordElement(a),
                      this.updateSuggestions())
                    : !this.wordToken &&
                      o &&
                      o.length > 1 &&
                      r.includes(o[0]) &&
                      (e.preventDefault(),
                      (this.wordToken = o[0]),
                      (a = o[o.length - 1]),
                      (this.emailMention = this.isEmailMention(o)),
                      this.createWordElement(o),
                      this.updateSuggestions()),
                  this.wordToken && this.wordElement)
                ) {
                  const i = this.wordElement.textContent || '',
                    n = this.getMatches(i),
                    o = n.length,
                    r =
                      null === (t = this.endTokens[this.wordToken]) || void 0 === t
                        ? void 0
                        : t.includes(a);
                  1 === o && this.sanitizeForSearch(i) === this.sanitizeForSearch(n[0].text) && s
                    ? (e.preventDefault(), this.chooseMatch(n[0].text, n[0].value, n[0].id))
                    : r && '#' === this.wordToken
                      ? (e.preventDefault(), this.finishWordElement(!0))
                      : r && '@' === this.wordToken
                        ? (e.preventDefault(),
                          this.emailMention
                            ? this.finishWordElement(!0)
                            : 0 === o && this.clearWordElement())
                        : '@' === this.wordToken
                          ? (this.updateUserMatches(),
                            this.isEmailMention(i) &&
                              (this.wordElement.classList.add('link-annotation-active'),
                              (this.emailMention = !0)))
                          : this.filterSuggestions();
                }
              }
              this.props.onInput(this.getMarkdown());
            }),
            (this.updateUserMatches = (0, Pt.D)(() => this.fetchUserMatches(), 350)),
            (this.onClickMatch = (e) => {
              const t = e.currentTarget;
              if (t) {
                const i = t.dataset.value,
                  n = t.dataset.id,
                  s = t.dataset.text || t.innerText;
                e.stopPropagation(), e.preventDefault(), this.chooseMatch(s, i, n);
              }
            }),
            (this.onHoverMatch = (e) => {
              const t = e.currentTarget;
              if (t) {
                const e = parseInt(t.dataset.index || '0', 10);
                this.setState({ activeMatch: e });
              }
            }),
            (this.onClick = (e) => {
              const { active: t, clickToEdit: i, onStartEditing: n } = this.props;
              t ? (this.removeFauxHighlight(), (this.range = null)) : i && n && n(e);
            }),
            (this.handleFocus = () => {
              const { onFocusChange: e } = this.props;
              e && e(!0);
            }),
            (this.onBlur = () => {
              this.endWordMatching(), this.setState({ sortedSuggestions: [] });
              const { onFocusChange: e } = this.props;
              e && e(!1);
            }),
            (this.onDone = () => {
              const { onDoneEditing: e } = this.props;
              e ? e() : this.toggleEditing(!1);
            }),
            (this.onKeyDown = (e) => {
              const { onCancelEditing: t, allowTabbing: i, allowReturnKey: n } = this.props,
                { matches: s, activeMatch: a } = this.state;
              e.stopPropagation(), this.range || (this.range = this.getCurrentRange());
              const o = e.which || e.keyCode;
              switch (o) {
                case It.R.ESCAPE:
                  return void (t && t());
                case It.R.TAB:
                case It.R.RETURN:
                  if (s.length && a > -1)
                    e.preventDefault(), this.chooseMatch(s[a].text, s[a].value, s[a].id);
                  else {
                    const { isSpecialNode: t, anchorNode: s } = this.tryGetAnchorNode();
                    if (
                      (t &&
                        s &&
                        this.range &&
                        (e.preventDefault(), this.insertAndFocusCharacter(s, !1, '\n​')),
                      this.wordToken && (e.preventDefault(), this.finishWordElement(!1, !0)),
                      !e.shiftKey)
                    ) {
                      const t = o === It.R.TAB && i,
                        s = o === It.R.RETURN && n;
                      t || s || (e.preventDefault(), this.onDone());
                    }
                  }
                  return;
                case It.R.DOWNARROW:
                  return void (
                    s.length &&
                    (e.preventDefault(),
                    this.setState((e) => {
                      const t = (e.activeMatch + 1) % s.length;
                      return this.ensureActiveMatchIsVisible(t), { activeMatch: t };
                    }))
                  );
                case It.R.UPARROW:
                  return void (
                    s.length &&
                    (e.preventDefault(),
                    this.setState((e) => {
                      const t = 0 === e.activeMatch ? s.length - 1 : e.activeMatch - 1;
                      return this.ensureActiveMatchIsVisible(t), { activeMatch: t };
                    }))
                  );
                case It.R.B:
                case It.R.I:
                case It.R.U:
                  if (e.ctrlKey || e.metaKey) return void e.preventDefault();
                  break;
                case It.R.BACKSPACE:
                case It.R.SHIFT:
                case It.R.CONTROL:
                case It.R.ALT:
                case It.R.LEFTARROW:
                case It.R.RIGHTARROW:
                case It.R.DELETE:
                  return;
              }
            }),
            (this.saveRef = (e) => {
              this.textBox = e;
            }),
            (this.bindSuggestionMenuRef = (e) => {
              this.suggestionMenuRef = e;
            }),
            (this.state = { activeMatch: -1, matches: [], sortedSuggestions: [] });
        }
        componentDidMount() {
          this.props.active && this.toggleEditing(!0, this.props.focusOnMount);
        }
        componentWillUnmount() {
          this.toggleEditing(!1), (this.wordElement = null);
        }
        componentDidUpdate(e, t) {
          const { active: i } = this.props;
          i !== e.active && this.toggleEditing(i);
        }
        toggleEditing(e, t) {
          this.textBox && this.textBox.toggleEditing(e, t),
            this.endWordMatching(),
            this.setState({ sortedSuggestions: [] }),
            e
              ? document.addEventListener('selectionchange', this.onSelectionChange)
              : document.removeEventListener('selectionchange', this.onSelectionChange);
        }
        ensureActiveMatchIsVisible(e) {
          if (!this.suggestionMenuRef) return;
          const { scrollTop: t, offsetHeight: i } = this.suggestionMenuRef,
            n = this.suggestionMenuRef.querySelector(`[data-index="${e}"]`);
          if (!n) return;
          const { offsetTop: s, offsetHeight: a } = n,
            o = t > s;
          if (t + i < s + a || o) {
            const e = o;
            n.scrollIntoView(e);
          }
        }
        getTextElement() {
          var e;
          return null === (e = this.textBox) || void 0 === e ? void 0 : e.getTextElement();
        }
        focus() {
          this.textBox && this.textBox.focus();
        }
        getMarkdown() {
          const e = this.getTextElement();
          return e ? this.props.textParser.serialize(e) : '';
        }
        hasTextSelected() {
          return !(!this.range || this.range.startOffset === this.range.endOffset);
        }
        createAnchor(e, t) {
          const i = document.createElement('a');
          return (
            (i.href = t),
            (i.text = this.props.textParser.sanitizeText(e)),
            i.classList.add(h.o.LINK),
            i.setAttribute('data-value', t),
            i
          );
        }
        prepareLinkForEdit(e) {
          const t = e || this.getAnchorFromSelection();
          let i = '';
          const n = window.getSelection();
          if (n) {
            const e = this.getTextElement();
            t || this.range || !e
              ? (this.addFauxHighlight(),
                t || (i = this.range ? this.range.toString() : n.toString()))
              : (this.focus(),
                n.selectAllChildren(e),
                n.collapseToEnd(),
                (this.range = n.getRangeAt(0)),
                (i = this.range.toString()));
          }
          i === Bt && (i = ''), (this.linkElement = t);
          const s = t ? t.innerText : i,
            a = t ? t.dataset.value || t.href : '';
          this.props.onClickBlock({ blockType: u.C.LINK, text: s, value: a });
        }
        saveLink(e, t) {
          this.linkElement
            ? '' !== t
              ? this.updateLink(this.linkElement, e, t)
              : this.unlink(this.linkElement)
            : this.linkify(e, t);
        }
        updateLink(e, t, i) {
          const n = this.createAnchor(t, i);
          return (e.href = n.href), (e.text = n.text), e.setAttribute('data-value', i), !0;
        }
        cancelLink() {
          this.focus(), this.removeFauxHighlight();
        }
        linkify(e, t) {
          this.removeFauxHighlight(), this.execCommand('createLink', t);
          let i = this.getAnchorFromSelection();
          !i &&
            this.range &&
            ((i = document.createElement('a')), (i.href = t), this.range.insertNode(i)),
            i &&
              ((i.text = e),
              (i.className = `link-annotation ${h.o.LINK}`),
              i.setAttribute('data-blocktype', u.C.LINK),
              i.setAttribute('data-value', t),
              (i.onclick = this.onClickAnchor),
              this.insertAndFocusCharacter(i));
        }
        insertAndFocusCharacter(e, t = !1, i = '​') {
          if (((this.range = this.getCurrentRange()), this.range)) {
            const n = document.createTextNode(i),
              s = t ? 'setStartBefore' : 'setStartAfter',
              a = t ? 'setEndBefore' : 'setEndAfter';
            this.range[s](e),
              this.range[a](e),
              this.range.insertNode(n),
              this.range.selectNodeContents(n),
              i !== Bt && this.range.collapse(!1),
              this.applyRange();
          }
        }
        unlink(e) {
          const t = e.parentNode,
            i = e.textContent;
          t && (t.removeChild(e), i && !Nt(i) && this.execCommand('insertText', i));
        }
        execCommand(e, t) {
          this.range &&
            (this.applyRange(), document.execCommand(e, !1, t), this.onSelectionChange());
        }
        applyRange() {
          if (this.range) {
            const e = window.getSelection();
            e && (e.removeAllRanges(), e.addRange(this.range));
          }
        }
        getAnchorFromSelection() {
          const e = this.getCurrentRange();
          if (!e) return null;
          let t = e.commonAncestorContainer;
          for (; t && 'A' !== t.nodeName; ) {
            if (t === this.getTextElement()) return null;
            t = t.parentNode;
          }
          return t || null;
        }
        insertFocusNodeIfNeeded() {
          var e, t;
          const i = window.getSelection();
          if (!i || !this.range) return;
          const { anchorNode: n, isLinkNode: s } = this.tryGetAnchorNode();
          if (n) {
            const a =
                null !== (t = null === (e = n.textContent) || void 0 === e ? void 0 : e.length) &&
                void 0 !== t
                  ? t
                  : 0,
              o = 0 === i.focusOffset && a > 0,
              r = null === n.nextSibling && a === i.focusOffset && s;
            (o || r) && this.insertAndFocusCharacter(n, o);
          }
        }
        getCurrentRange() {
          const e = window.getSelection();
          if (e && e.rangeCount > 0) {
            const t = e.getRangeAt(0),
              i = this.getTextElement();
            if (
              i &&
              (i === t.commonAncestorContainer ||
                i.compareDocumentPosition(t.commonAncestorContainer) &
                  Node.DOCUMENT_POSITION_CONTAINED_BY)
            )
              return t;
          }
          return null;
        }
        sortWords(e) {
          return e.sort((e, t) => (e.text.toLowerCase() < t.text.toLowerCase() ? -1 : 1));
        }
        tryGetAnchorNode() {
          var e;
          const t = this.getAnchorFromSelection();
          if (t && t instanceof HTMLAnchorElement) {
            const i = null === (e = t.dataset) || void 0 === e ? void 0 : e.blocktype,
              n = i === u.C.USER || i === u.C.HASH,
              s = i === u.C.LINK;
            return { isSpecialNode: n, isLinkNode: s, anchorNode: n || s ? t : null };
          }
          return { isSpecialNode: !1, isLinkNode: !1, anchorNode: null };
        }
        updateWordElement(e, t, i) {
          const n = e.inputType.startsWith('delete'),
            s = window.getSelection(),
            a = this.startTokens;
          if (!this.wordElement || this.wordElement.parentElement) {
            if (t && i && i.parentElement && s) {
              const e = i.textContent || '';
              if (!a.includes(e[0] || '')) return void this.clearWordElement();
              const t = e.substr(0, s.focusOffset),
                o = s && s.focusOffset < e.length,
                r = n || o;
              if (
                ((this.wordElement = i),
                (this.wordToken = t[0]),
                (this.emailMention = this.isEmailMention(t)),
                this.updateSuggestions(),
                (this.range = this.getCurrentRange()),
                r && this.range)
              ) {
                this.range.selectNode(i);
                const n = this.range.extractContents();
                if (n && n.firstElementChild && n.firstElementChild instanceof HTMLElement) {
                  const i = e.substring(t.length),
                    s = document.createTextNode(i);
                  (n.firstElementChild.innerText = t),
                    n.firstElementChild.classList.remove('link-annotation-active'),
                    n.firstElementChild.removeAttribute('data-value'),
                    n.firstElementChild.removeAttribute('data-id'),
                    n.appendChild(s),
                    this.range.insertNode(n),
                    this.range.setStartBefore(s),
                    this.range.setEndBefore(s),
                    this.range.collapse(!1),
                    this.range.selectNodeContents(this.wordElement),
                    this.range.collapse(!1),
                    this.applyRange();
                }
              }
            }
          } else this.endWordMatching();
        }
        get startTokens() {
          const { hashtags: e, userMentions: t } = this.props,
            i = [];
          return t && i.push('@'), e && i.push('#'), i;
        }
        fetchUserMatches() {
          const e = this.wordElement ? this.wordElement.textContent : null;
          if (this.props.active && this.wordToken && e) {
            const t = this.sanitizeForSearch(e, !0);
            this.context.commandBinder.issueCommand(new T.V1(t)).then(() => {
              this.updateSuggestions();
            });
          }
        }
        filterSuggestions() {
          const { wordToken: e, wordElement: t } = this;
          if (e && t && t.textContent) {
            const e = this.sanitizeForSearch(t.textContent),
              i = this.getMatches(e),
              n = i.length > 0 ? 0 : -1;
            this.setState({ matches: i, activeMatch: n });
          }
        }
        sanitizeForSearch(e = '', t) {
          if (!this.wordToken) return e;
          let i = (e.startsWith(this.wordToken) ? e.substr(1) : e)
            .toLowerCase()
            .trim()
            .replace(/\s\s+/g, ' ');
          if (t) {
            const e = /([^\s]+)/.exec(i);
            i = (e && e[0]) || '';
          }
          return i;
        }
        getMatches(e) {
          const { sortedSuggestions: t = [] } = this.state,
            i = this.sanitizeForSearch(e) || '';
          return 0 === i.length
            ? t
            : t.filter((e) => {
                let t = 0 === this.sanitizeForSearch(e.text).indexOf(i);
                return (
                  !t &&
                    '@' === this.wordToken &&
                    e.value &&
                    (t = 0 === this.sanitizeForSearch(e.value).indexOf(i)),
                  t
                );
              });
        }
        chooseMatch(e, t, i) {
          const n = this.wordElement;
          if (n) {
            const s = this.wordToken && !e.startsWith(this.wordToken) ? this.wordToken : '';
            (n.innerText = `${s}${e}`),
              n.classList.add('link-annotation-active'),
              t && n.setAttribute('data-value', t),
              i && n.setAttribute('data-id', i),
              this.finishWordElement(!1, !0),
              this.props.onInput(this.getMarkdown());
          }
        }
        updateSuggestions() {
          const { wordToken: e } = this,
            { hashtags: t, userMentions: i } = this.props;
          let n = [];
          if ('#' === e && t) n = this.sortWords(t.map((e) => ({ text: e, blockType: u.C.HASH })));
          else if ('@' === e && i) {
            const e = this.context.userData.getKnownUsers();
            n = this.sortWords(
              e.map((e) => ({ text: e.name, id: e.id, value: e.email, blockType: u.C.USER })),
            );
          }
          this.setState({ sortedSuggestions: n }, this.filterSuggestions);
        }
        endWordMatching() {
          this.setState({ matches: [], activeMatch: -1 }),
            (this.wordToken = null),
            (this.wordElement = null),
            (this.emailMention = !1);
        }
        createWordElement(e) {
          const t = window.getSelection(),
            i = this.range;
          if (!i || !t || !this.wordToken) return;
          const n = document.createElement('a');
          n.removeAttribute('href'),
            (n.innerText = e),
            '#' === this.wordToken
              ? ((n.className = `link-annotation ${h.o.HASH}`),
                n.setAttribute('data-blocktype', u.C.HASH))
              : '@' === this.wordToken &&
                ((n.className = `link-annotation ${h.o.USER}`),
                n.setAttribute('data-blocktype', u.C.USER));
          const s = i.startContainer,
            a = i.startOffset,
            o = i.endOffset + e.length,
            r = Math.max(0, (s.textContent || '').length);
          try {
            i.setStart(s, Math.min(a, r)), i.setEnd(s, Math.min(o, r));
          } catch (e) {
            i.selectNodeContents(s);
          }
          i.deleteContents(),
            i.insertNode(n),
            i.selectNodeContents(n),
            i.collapse(!1),
            this.applyRange(),
            (this.wordElement = n);
        }
        clearWordElement() {
          const e = this.range,
            t = window.getSelection();
          e &&
            t &&
            this.wordElement &&
            this.wordToken &&
            (this.stripAnchorFromNode(this.wordElement), this.endWordMatching());
        }
        stripAnchorFromNode(e) {
          const t = this.range;
          if (!t) return;
          const i = e.textContent;
          if ((this.focus(), t.selectNode(e), t.deleteContents(), t.collapse(!1), i)) {
            const e = document.createTextNode(i);
            t.insertNode(e), t.selectNodeContents(e), t.collapse(!1);
          }
          this.applyRange();
        }
        isValidSpecialWord(e, t) {
          return 0 !== this.sanitizeForSearch(t).length || (this.clearWordElement(), !1);
        }
        finishWordElement(e, t) {
          const { range: i, wordElement: n, wordToken: s } = this,
            a = window.getSelection();
          if (!(i && a && n && s)) return;
          (n.contentEditable = 'true'), n.classList.add('link-annotation-active');
          let o = '';
          const r = n.textContent;
          if (this.isValidSpecialWord(s, r || '')) {
            if (
              (e && r && r.length > 1
                ? ((o = r.charAt(r.length - 1)), (n.textContent = r.slice(0, -1)))
                : t && (o = ' '),
              this.focus(),
              i.setStartAfter(n),
              o)
            ) {
              const e = document.createTextNode(o);
              i.insertNode(e), i.selectNodeContents(e), i.collapse(!1);
            }
            this.applyRange(), this.endWordMatching();
          } else this.clearWordElement();
        }
        renderMatch(e, t) {
          const { activeMatch: i } = this.state,
            n = t === i,
            s = e.blockType === u.C.USER,
            a = s && e.value ? this.context.userData.getUserDisplay(e.value) : null,
            o = s ? e.value : void 0,
            r = `${e.text}-${t}`;
          return (0, ze.jsxs)(
            'div',
            Object.assign(
              {
                className: mt()('suggestion', { selected: n }),
                onMouseDown: this.onClickMatch,
                onMouseEnter: this.onHoverMatch,
                'data-value': e.value,
                'data-id': e.id,
                'data-text': e.text,
                'data-index': t,
              },
              {
                children: [
                  s &&
                    a &&
                    (0, ze.jsx)(Mt.C, {
                      badgeStyle: {
                        color: a.color,
                        borderColor: a.color,
                        backgroundColor: 'transparent',
                      },
                      label: a.initials,
                    }),
                  (0, ze.jsx)(
                    'span',
                    Object.assign({ className: 'suggestion-text' }, { children: e.text }),
                  ),
                  o &&
                    (0, ze.jsxs)(
                      'p',
                      Object.assign({ className: 'suggestion-hint' }, { children: ['(', o, ')'] }),
                    ),
                ],
              },
            ),
            r,
          );
        }
        renderMatches() {
          if (!this.props.active) return null;
          const { matches: e } = this.state,
            t = e.length > 0;
          return (0, ze.jsx)(
            'div',
            Object.assign(
              { className: mt()('suggestion-menu', { open: t }), ref: this.bindSuggestionMenuRef },
              { children: t && e.map((e, t) => this.renderMatch(e, t)) },
            ),
          );
        }
        render() {
          const {
            text: e,
            textParser: t,
            clickToEdit: i,
            placeholder: n,
            tabIndex: s,
            className: a,
            active: o,
          } = this.props;
          return (0, ze.jsxs)(
            'div',
            Object.assign(
              { className: mt()('smart-text-box', a) },
              {
                children: [
                  (0, ze.jsx)(Rt.Z, {
                    ref: this.saveRef,
                    text: e,
                    textParser: t,
                    active: o,
                    placeholder: n,
                    tabIndex: s,
                    clickToEdit: i && !o,
                    onClick: this.onClick,
                    onInput: this.onInput,
                    onKeyDown: this.onKeyDown,
                    onBlur: this.onBlur,
                    onFocus: this.handleFocus,
                    onClickAnchor: this.onClickAnchor,
                  }),
                  this.renderMatches(),
                ],
              },
            ),
          );
        }
      };
      (Vt.contextType = rt.I), (Vt = jt([Dt.A, Lt('design:paramtypes', [Object])], Vt));
      var Ft = function (e, t, i, n) {
          var s,
            a = arguments.length,
            o = a < 3 ? t : null === n ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
          if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
            o = Reflect.decorate(e, t, i, n);
          else
            for (var r = e.length - 1; r >= 0; r--)
              (s = e[r]) && (o = (a < 3 ? s(o) : a > 3 ? s(t, i, o) : s(t, i)) || o);
          return a > 3 && o && Object.defineProperty(t, i, o), o;
        },
        _t = function (e, t) {
          if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
            return Reflect.metadata(e, t);
        };
      let Ht = class extends $e.Component {
        constructor(e) {
          super(e),
            (this.handleUpload = (e) => {
              const t = e.target;
              if (!t) return;
              const i = t.files;
              i && this.props.onUpload(i), (t.value = '');
            });
        }
        render() {
          const {
              accept: e,
              id: t,
              multi: i,
              enabled: n,
              children: s,
              className: a,
              tooltip: o,
            } = this.props,
            r = `file-upload-${t}`;
          return (0, ze.jsxs)(
            'div',
            Object.assign(
              { className: mt()('file-upload-button', a, { disabled: !n }) },
              {
                children: [
                  (0, ze.jsx)(
                    'label',
                    Object.assign(
                      {
                        className: 'file-upload-trigger',
                        htmlFor: r,
                        'data-balloon': o,
                        'data-balloon-pos': 'down',
                      },
                      { children: s },
                    ),
                  ),
                  n &&
                    (0, ze.jsx)('input', {
                      type: 'file',
                      className: 'file-input',
                      id: r,
                      accept: e,
                      multiple: !!i,
                      onChange: this.handleUpload,
                    }),
                ],
              },
            ),
          );
        }
      };
      Ht = Ft([Dt.Z, _t('design:paramtypes', [Object])], Ht);
      var Ut = function (e, t, i, n) {
          var s,
            a = arguments.length,
            o = a < 3 ? t : null === n ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
          if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
            o = Reflect.decorate(e, t, i, n);
          else
            for (var r = e.length - 1; r >= 0; r--)
              (s = e[r]) && (o = (a < 3 ? s(o) : a > 3 ? s(t, i, o) : s(t, i)) || o);
          return a > 3 && o && Object.defineProperty(t, i, o), o;
        },
        Gt = function (e, t) {
          if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
            return Reflect.metadata(e, t);
        };
      let zt = class extends $e.Component {
        constructor(e) {
          super(e),
            (this.active = !1),
            (this.dropZone = null),
            (this.onDragOver = (e) => {
              e.dataTransfer &&
                e.dataTransfer.types &&
                e.dataTransfer.types.includes('Files') &&
                (e.preventDefault(), e.stopPropagation(), this.activate());
            }),
            (this.onDrop = (e) => {
              e.preventDefault(),
                e.stopPropagation(),
                e.dataTransfer &&
                  e.dataTransfer.files &&
                  this.props.onDropped(e.dataTransfer.files),
                this.deactivate();
            }),
            (this.onDragEnd = (e) => {
              e.preventDefault(), e.stopPropagation(), this.deactivate();
            }),
            (this.onDragLeave = (e) => {
              e.preventDefault(), e.stopPropagation(), this.deactivate();
            }),
            (this.setDropZoneRef = (e) => {
              this.dropZone = e;
            });
        }
        activate() {
          !this.active &&
            this.dropZone &&
            (this.props.onActivate && this.props.onActivate(!0),
            (this.active = !0),
            this.dropZone.classList.add('active'));
        }
        deactivate() {
          this.active &&
            this.dropZone &&
            ((this.active = !1),
            this.dropZone.classList.remove('active'),
            this.props.onDone && this.props.onDone());
        }
        render() {
          const { className: e, children: t, disabled: i } = this.props;
          return (0, ze.jsxs)(
            'div',
            Object.assign(
              {
                className: e,
                onDragEnter: i ? void 0 : this.onDragOver,
                onDragLeave: i ? void 0 : this.onDragLeave,
                onDragOver: i ? void 0 : this.onDragOver,
                onDragEnd: i ? void 0 : this.onDragEnd,
                onDrop: i ? void 0 : this.onDrop,
              },
              {
                children: [
                  (0, ze.jsxs)(
                    'div',
                    Object.assign(
                      { className: 'file-drop-zone', ref: this.setDropZoneRef },
                      {
                        children: [
                          (0, ze.jsx)('span', { className: 'icon icon-attach' }),
                          (0, ze.jsx)('label', { children: 'Upload file' }),
                        ],
                      },
                    ),
                  ),
                  t,
                ],
              },
            ),
          );
        }
      };
      zt = Ut([Dt.Z, Gt('design:paramtypes', [Object])], zt);
      var Wt = i(68738);
      const { MATTERTAGS: $t } = Ve.Z.WORKSHOP;
      function Kt(e) {
        const { url: t, text: i, error: n, newLink: s } = e,
          { locale: a } = (0, $e.useContext)(rt.I),
          o = '' === i && '' === t && s ? a.t($t.LINK_EDITOR_TIP_TEXT) : null,
          r = n ? a.t($t.LINK_EDITOR_INVALID_TIP) : null,
          d = mt()('modal-message', { 'modal-message-error': !!n }),
          c = r || o || '';
        return (0, ze.jsx)('div', Object.assign({ className: d }, { children: c }));
      }
      const { MATTERTAGS: Zt, MODAL: Yt } = Ve.Z.WORKSHOP;
      function Jt(e) {
        return Nt(e);
      }
      function qt(e) {
        const { linkUrl: t, linkText: i, onSaveLink: n, onRemoveLink: s, onCancelLink: a } = e,
          { locale: o } = (0, $e.useContext)(rt.I),
          [r, d] = (0, $e.useState)(!1),
          [c, l] = (0, $e.useState)(i),
          [h, u] = (0, $e.useState)(t),
          [m, p] = (0, $e.useState)(Jt(t));
        (0, $e.useEffect)(() => (u(t), l(i), p(Jt(t)), d(!1), () => {}), [i, t]);
        const g = (0, $e.useCallback)(() => {
            m && window.open(h, '_blank', 'noreferrer');
          }, [h, m]),
          v = (0, $e.useCallback)(
            (e, t) => {
              const i = void 0 !== t ? t : h;
              n((void 0 !== e ? e : c) || i, i);
            },
            [h, c, n],
          ),
          y = (0, $e.useCallback)(() => {
            v(c, h);
          }, [c, h]),
          f = (0, $e.useCallback)(
            (e, t) => {
              const i = Jt(e);
              p(i), d(!i && '' !== e), t && i && v(c, e);
            },
            [c, v],
          ),
          w = (0, $e.useCallback)((e) => {
            l(e);
          }, []),
          b = (0, $e.useCallback)(
            (e) => {
              u(e);
              const t = Jt(e);
              p(t), r && t && d(!1);
            },
            [r],
          ),
          T = (0, $e.useCallback)(() => {
            f(h, !1);
          }, [h, f]),
          C = (0, $e.useCallback)(() => {
            f(h, !0);
          }, [h, f]),
          E = !t,
          D = o.t(Zt.LINK_EDITOR_TEXT_PLACEHOLDER),
          x = o.t(Yt.SAVE),
          A = o.t(Yt.CANCEL),
          O = o.t(Zt.LINK_EDITOR_PREVIEW_TIP),
          S = o.t(Zt.LINK_EDITOR_REMOVE_TIP),
          P = !E && s;
        return (0, ze.jsxs)(
          'div',
          Object.assign(
            { className: 'modal-contents' },
            {
              children: [
                (0, ze.jsxs)(
                  'div',
                  Object.assign(
                    { className: 'modal-body' },
                    {
                      children: [
                        (0, ze.jsx)(
                          'div',
                          Object.assign(
                            { className: 'link-editor-field link-text-field' },
                            {
                              children: (0, ze.jsx)(Et.oi, {
                                text: c,
                                placeholder: D,
                                autofocus: !i,
                                onInput: w,
                                onCancel: a,
                              }),
                            },
                          ),
                        ),
                        (0, ze.jsxs)(
                          'div',
                          Object.assign(
                            { className: 'link-editor-field link-url-field' },
                            {
                              children: [
                                (0, ze.jsx)(Et.oi, {
                                  text: h,
                                  type: 'url',
                                  placeholder: 'https://',
                                  autofocus: !!i,
                                  onBlur: T,
                                  onReturn: C,
                                  onInput: b,
                                  onCancel: a,
                                }),
                                m &&
                                  h &&
                                  (0, ze.jsx)(Et.zx, {
                                    className: 'preview-link',
                                    icon: 'ext-link',
                                    variant: Et.Wu.TERTIARY,
                                    size: Et.qE.SMALL,
                                    tooltip: O,
                                    onClick: g,
                                  }),
                              ],
                            },
                          ),
                        ),
                        (0, ze.jsx)(Kt, { newLink: E, text: i, url: h, error: r }),
                      ],
                    },
                  ),
                ),
                (0, ze.jsx)(
                  'div',
                  Object.assign(
                    { className: 'modal-footer' },
                    {
                      children: (0, ze.jsxs)(
                        Et.hE,
                        Object.assign(
                          { className: mt()('modal-footer', { stretch: P }) },
                          {
                            children: [
                              P &&
                                (0, ze.jsx)(Et.zx, {
                                  icon: 'delete',
                                  label: S,
                                  className: 'remove-link',
                                  variant: Et.Wu.TERTIARY,
                                  size: Et.qE.SMALL,
                                  onClick: s,
                                }),
                              (0, ze.jsxs)(
                                Et.hE,
                                Object.assign(
                                  { spacing: 'small' },
                                  {
                                    children: [
                                      (0, ze.jsx)(Et.zx, {
                                        label: A,
                                        variant: Et.Wu.SECONDARY,
                                        size: Et.qE.SMALL,
                                        onClick: a,
                                      }),
                                      (0, ze.jsx)(Et.zx, {
                                        label: x,
                                        variant: Et.Wu.PRIMARY,
                                        disabled: !m,
                                        size: Et.qE.SMALL,
                                        onClick: y,
                                      }),
                                    ],
                                  },
                                ),
                              ),
                            ],
                          },
                        ),
                      ),
                    },
                  ),
                ),
              ],
            },
          ),
        );
      }
      var Qt = i(73935),
        Xt = i(38637),
        ei = i(34763);
      function ti(e) {
        const { children: t, className: i, title: n, open: s, onClose: a, fullModal: o } = e,
          { commandBinder: r, mainDiv: d } = (0, $e.useContext)(rt.I);
        let c = !1;
        const l = (0, $e.useCallback)(() => {
            r.issueCommand(new f.r()), a && a();
          }, [r, a]),
          h = (0, $e.useCallback)(() => {
            (c = !0),
              window.setTimeout(() => {
                c = !1;
              }, 500);
          }, []),
          u = (0, $e.useCallback)(() => {
            c && ((c = !1), l());
          }, [l]),
          m = d.querySelector('#react-render-root') || document.body,
          p = mt()(i, { open: s, 'full-modal': o });
        return (0, Qt.createPortal)(
          (0, ze.jsx)(
            ei.N,
            Object.assign(
              {
                open: s,
                className: mt()('modal-background', { open: s }),
                onPointerUp: u,
                onPointerDown: h,
              },
              {
                children: (0, ze.jsxs)(
                  Et.Vq,
                  Object.assign(
                    { className: p, onClose: l },
                    {
                      children: [
                        (0, ze.jsxs)(
                          'header',
                          Object.assign(
                            { className: 'modal-header' },
                            {
                              children: [
                                (0, ze.jsx)(
                                  'div',
                                  Object.assign({ className: 'modal-title' }, { children: n }),
                                ),
                                (0, ze.jsx)(Xt.P, { onClose: l }),
                              ],
                            },
                          ),
                        ),
                        t,
                      ],
                    },
                  ),
                ),
              },
            ),
          ),
          m,
        );
      }
      const { MATTERTAGS: ii } = Ve.Z.WORKSHOP;
      function ni(e) {
        const { linkUrl: t, linkText: i, onSaveLink: n, onRemoveLink: s, onCancelLink: a } = e,
          { locale: o } = (0, $e.useContext)(rt.I),
          r = (0, Xe.R)(),
          d = '' === t ? o.t(ii.LINK_EDITOR_LINK_ADD_LABEL) : o.t(ii.LINK_EDITOR_LINK_EDIT_LABEL),
          c = r === nt.P.LINK_EDITOR;
        return (0, ze.jsx)(
          ti,
          Object.assign(
            { open: c, title: d, fullModal: !1, className: 'link-editor-modal' },
            {
              children: (0, ze.jsx)(qt, {
                linkText: i,
                linkUrl: t,
                onCancelLink: a,
                onSaveLink: n,
                onRemoveLink: s,
              }),
            },
          ),
        );
      }
      var si,
        ai = i(39159),
        oi = i(11234),
        ri = function (e, t, i, n) {
          var s,
            a = arguments.length,
            o = a < 3 ? t : null === n ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
          if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
            o = Reflect.decorate(e, t, i, n);
          else
            for (var r = e.length - 1; r >= 0; r--)
              (s = e[r]) && (o = (a < 3 ? s(o) : a > 3 ? s(t, i, o) : s(t, i)) || o);
          return a > 3 && o && Object.defineProperty(t, i, o), o;
        },
        di = function (e, t) {
          if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
            return Reflect.metadata(e, t);
        };
      const { EMBED: ci } = Ve.Z.WORKSHOP;
      var li;
      !(function (e) {
        (e.NONE = 'none'),
          (e.INVALID_URL_SYNTAX = 'invalid'),
          (e.LOADING = 'loading'),
          (e.LOADED = 'loaded'),
          (e.ERROR = 'error');
      })(li || (li = {}));
      let hi = (si = class extends $e.Component {
        constructor(e) {
          super(e),
            (this.inputRef = (0, $e.createRef)()),
            (this.isUnmounting = !1),
            (this.onInput = (e) => {
              const t = Nt(e) ? li.NONE : li.INVALID_URL_SYNTAX;
              this.setState({ validationPhase: t, currentUrl: e });
            }),
            (this.onApply = () => {
              this.isDisabled() || this.onDoneEditing(this.state.currentUrl);
            }),
            (this.stopPropagation = (e) => {
              e.stopPropagation();
            }),
            (this.onDoneEditing = async (e) => {
              const { onEmbed: t, onEmbedCleared: i, url: n } = this.props;
              if ('' === e)
                return (
                  i && i(),
                  void this.setState({ validationPhase: li.NONE, error: void 0, currentUrl: '' })
                );
              const s = (0, oi.V0)(e);
              if (s && s !== n)
                try {
                  const e = await this.loadMedia(s);
                  if (this.isUnmounting) return;
                  e
                    ? (this.setState({ validationPhase: li.LOADED, error: void 0, currentUrl: s }),
                      t(e))
                    : this.onEmbedError(s);
                } catch (e) {
                  if (this.isUnmounting) return;
                  this.onEmbedError(s, e);
                }
            }),
            (this.loadMedia = async (e) => {
              const { parentId: t, parentType: i } = this.props;
              return (
                this.setState({ validationPhase: li.LOADING }),
                this.context.commandBinder.issueCommand(new G.wu(t, i, e))
              );
            }),
            (this.state = { currentUrl: e.url || '', validationPhase: li.NONE, error: void 0 });
        }
        componentWillUnmount() {
          (this.isUnmounting = !0),
            this.setState({ currentUrl: '', validationPhase: li.NONE, error: void 0 });
        }
        componentDidUpdate(e, t) {
          const { url: i, onValidationPhaseChange: n } = this.props;
          let s = this.state.validationPhase;
          i !== e.url &&
            ((s = li.NONE),
            this.setState({ currentUrl: i || '', validationPhase: li.NONE, error: void 0 })),
            n && s !== t.validationPhase && n(s);
        }
        focus() {
          this.inputRef.current && this.inputRef.current.focus();
        }
        onEmbedError(e, t) {
          this.setState({ error: t, validationPhase: li.ERROR, currentUrl: e });
        }
        isDisabled() {
          const { validationPhase: e, currentUrl: t } = this.state;
          return (
            e === li.ERROR ||
            e === li.LOADING ||
            (e === li.INVALID_URL_SYNTAX && '' !== t) ||
            '' === t
          );
        }
        renderError() {
          const { locale: e } = this.context,
            { error: t } = this.state;
          let i = e.t(ci.ERROR_MESSAGE);
          return (
            t instanceof oi.HF
              ? (i = e.t(ci.PROVIDER_NOT_SUPPORTED_MESSAGE))
              : t instanceof oi.t1 && (i = e.t(ci.LINK_TYPE_NOT_SUPPORTED_MESSAGE)),
            (0, ze.jsxs)(
              'div',
              Object.assign(
                { className: 'popover-message popover-message-error' },
                {
                  children: [
                    i,
                    ' ',
                    (0, ze.jsx)(
                      'a',
                      Object.assign(
                        {
                          className: 'link',
                          target: '_blank',
                          rel: 'noreferrer',
                          href: si.supportPage,
                        },
                        { children: e.t(ci.HELP_CTA) },
                      ),
                    ),
                  ],
                },
              ),
            )
          );
        }
        renderHelpMessage() {
          const { locale: e } = this.context,
            { currentUrl: t, validationPhase: i } = this.state;
          switch (i) {
            case li.ERROR:
              return this.renderError();
            case li.LOADING:
              return (0, ze.jsx)(
                'div',
                Object.assign(
                  { className: 'popover-message' },
                  { children: e.t(ci.LOADING_MESSAGE) },
                ),
              );
            case li.INVALID_URL_SYNTAX:
              if ('' !== t)
                return (0, ze.jsx)(
                  'div',
                  Object.assign(
                    { className: 'popover-message popover-message-error' },
                    { children: e.t(ci.INVALID_URL_MESSAGE) },
                  ),
                );
          }
          return (0, ze.jsx)(
            'div',
            Object.assign(
              { className: 'popover-message' },
              {
                children: (0, ze.jsx)(
                  'a',
                  Object.assign(
                    { className: 'link', target: '_blank', href: si.supportPage, tabIndex: -1 },
                    { children: e.t(ci.SUPPORTED_FORMATS_MESSAGE) },
                  ),
                ),
              },
            ),
          );
        }
        render() {
          const { locale: e } = this.context,
            { className: t, tabIndex: i } = this.props,
            { currentUrl: n } = this.state,
            s = void 0 !== i && i >= 0,
            a = e.t(ci.MEDIA_EMBED_PLACEHOLDER);
          return (0, ze.jsxs)(ze.Fragment, {
            children: [
              (0, ze.jsxs)(
                'div',
                Object.assign(
                  { className: 'media-embed-editor', onClick: this.stopPropagation },
                  {
                    children: [
                      (0, ze.jsx)(ai.Z, {
                        ref: this.inputRef,
                        text: n,
                        type: 'url',
                        className: mt()(t),
                        placeholder: a,
                        onDone: this.onDoneEditing,
                        onInput: this.onInput,
                        allowTabbing: s,
                        tabIndex: i,
                      }),
                      (0, ze.jsx)(
                        'div',
                        Object.assign(
                          { className: 'popover-footer' },
                          { children: this.renderHelpMessage() },
                        ),
                      ),
                    ],
                  },
                ),
              ),
              (0, ze.jsx)(
                'div',
                Object.assign(
                  { className: 'modal-footer embed-apply' },
                  {
                    children: (0, ze.jsx)(Et.zx, {
                      variant: Et.Wu.PRIMARY,
                      size: 'small',
                      disabled: this.isDisabled(),
                      onClick: this.onApply,
                      label: e.t(ci.APPLY_CTA),
                    }),
                  },
                ),
              ),
            ],
          });
        }
      });
      (hi.contextType = rt.I),
        (hi.supportPage =
          'https://support.matterport.com/hc/en-us/articles/115006363868-Add-Multimedia-to-a-Mattertag-Post'),
        (hi = si = ri([Dt.Z, di('design:paramtypes', [Object])], hi));
      const { EMBED: ui } = Ve.Z.WORKSHOP;
      function mi(e) {
        const { parentType: t, parentId: i, onEmbed: n, onCancel: s } = e,
          { locale: a } = (0, $e.useContext)(rt.I),
          o = (0, Xe.R)(),
          r = a.t(ui.MEDIA_LINK_LABEL),
          d = o === nt.P.MEDIA_EMBED_POPUP;
        return (0, ze.jsx)(
          ti,
          Object.assign(
            { open: d, title: r, fullModal: !1, className: 'media-embed-popup', onClose: s },
            { children: (0, ze.jsx)(hi, { parentId: i, parentType: t, onEmbed: n }) },
          ),
        );
      }
      i(80862);
      function pi({ current: e, min: t, max: i }) {
        const n = (void 0 !== t && e < t) || e > i;
        return (0, ze.jsxs)(
          'div',
          Object.assign(
            { className: mt()('text-counter', { error: n }) },
            { children: [e, '/', i] },
          ),
        );
      }
      var gi = function (e, t, i, n) {
          var s,
            a = arguments.length,
            o = a < 3 ? t : null === n ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
          if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
            o = Reflect.decorate(e, t, i, n);
          else
            for (var r = e.length - 1; r >= 0; r--)
              (s = e[r]) && (o = (a < 3 ? s(o) : a > 3 ? s(t, i, o) : s(t, i)) || o);
          return a > 3 && o && Object.defineProperty(t, i, o), o;
        },
        vi = function (e, t) {
          if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
            return Reflect.metadata(e, t);
        };
      const { ANNOTATIONS: yi } = Ve.Z.SHOWCASE;
      let fi = class extends $e.Component {
        constructor(e) {
          super(e),
            (this.uploadTooltipTimeout = 0),
            (this.bindings = []),
            (this.isUnmounting = !1),
            (this.getAttachmentsState = () => {
              if (!this.attachmentsData) return;
              const { active: e, parentId: t, parentType: i } = this.props;
              if (!e) return;
              return {
                pendingAttachments: this.attachmentsData.getPendingAttachmentsForAsset(t, i),
                removedAttachments: this.attachmentsData.getRemovedAttachmentsForAsset(t, i),
                failures: this.attachmentsData.failures.values,
                uploads: this.attachmentsData.uploads.values,
              };
            }),
            (this.updateAttachments = () => {
              const e = this.getAttachmentsState();
              e && this.setState(e);
            }),
            (this.cancelEdits = () => {
              this.props.onCancelEditing && this.props.onCancelEditing();
            }),
            (this.saveEdits = () => {
              this.onDoneEditing();
            }),
            (this.onDoneEditing = () => {
              const { onDoneEditing: e } = this.props;
              if (e) {
                const t = this.getMarkdown();
                e(t, '' === t && 0 === this.getAttachmentCount());
              }
            }),
            (this.onInput = (e) => {
              this.setState({ textChanged: e.trim() !== this.props.text, charCount: e.length });
            }),
            (this.openLinkEditor = () => {
              !(this.props.openModal === nt.P.LINK_EDITOR) &&
                this.textEditor &&
                (this.context.analytics.trackGuiEvent('annotation_open_link_editor', {
                  tool: 'notes',
                }),
                this.textEditor.prepareLinkForEdit());
            }),
            (this.onClickBlock = (e, t) => {
              const { active: i, annotationType: n, annotationId: s, linkHandler: a } = this.props,
                o = e.blockType;
              if (o === u.C.LINK && i)
                this.setState({ selectedBlock: e }),
                  this.context.commandBinder.issueCommand(new f.B(nt.P.LINK_EDITOR, !0));
              else if (!i) {
                if (o === u.C.LINK && a && e.value) {
                  t && t.preventDefault();
                  const i = (0, xt.V)(e.value),
                    { url: o, modelId: r, pose: d } = i;
                  r
                    ? a.handler.openLink({ fullLink: o, modelId: r })
                    : d
                      ? (a.handler.openLink({ fullLink: o, pose: d }),
                        this.context.commandBinder.issueCommand(new L.Aj(s, n)))
                      : a.handler.openLink(o);
                }
                this.context.messageBus.broadcast(new F.i(n, s, e));
              }
            }),
            (this.closeLinkEditor = async () => (
              this.setState({ selectedBlock: null }),
              this.context.commandBinder.issueCommand(new f.B(nt.P.LINK_EDITOR, !1))
            )),
            (this.onCancelLink = async () => {
              await this.closeLinkEditor();
            }),
            (this.openEmbedEditor = () => {
              this.context.analytics.trackGuiEvent('annotation_open_embed_editor', {
                tool: 'notes',
              }),
                this.context.commandBinder.issueCommand(new f.B(nt.P.MEDIA_EMBED_POPUP, !0));
            }),
            (this.closeEmbedEditor = () => {
              this.context.commandBinder.issueCommand(new f.B(nt.P.MEDIA_EMBED_POPUP, !1));
            }),
            (this.onRemoveLink = () => {
              this.onSaveLink('', '');
            }),
            (this.onSaveLink = (e, t) => {
              this.props.openModal === nt.P.LINK_EDITOR &&
                this.textEditor &&
                (this.setState({ textChanged: !0 }),
                this.textEditor.saveLink(e, t),
                this.closeLinkEditor());
            }),
            (this.onClickFileInput = () => {
              const { active: e, onClickToEdit: t } = this.props;
              this.isAtMaxAttachments()
                ? (window.clearTimeout(this.uploadTooltipTimeout),
                  this.setState({ showUploadTooltip: !0 }),
                  (this.uploadTooltipTimeout = window.setTimeout(() => {
                    this.setState({ showUploadTooltip: !1 });
                  }, 2500)))
                : !e && t && t();
            }),
            (this.onFileUpload = (e) => {
              const { parentId: t, parentType: i } = this.props,
                n = Array.from(e),
                s = this.getAttachmentCount();
              e.length + s > Ot.yk && n.splice(Ot.yk - s),
                this.context.commandBinder.issueCommand(new G.It(t, i, n)),
                this.edit();
            }),
            (this.onDrop = (e) => {
              this.context.analytics.trackGuiEvent('attachment_drag_and_dropped', {
                tool: 'notes',
              }),
                this.onFileUpload(e);
            }),
            (this.onFilesChosen = (e) => {
              this.context.analytics.trackGuiEvent('annotation_files_chosen', { tool: 'notes' }),
                this.onFileUpload(e);
            }),
            (this.dropActivated = () => {
              const { active: e, creating: t, onClickToEdit: i } = this.props;
              t && !e && i && i();
            }),
            (this.setTextEditorRef = (e) => (this.textEditor = e)),
            (this.state = {
              textChanged: !1,
              charCount: e.text.length,
              selectedBlock: null,
              showUploadTooltip: !1,
              pendingAttachments: [],
              removedAttachments: [],
              uploads: [],
              failures: [],
            });
        }
        componentDidMount() {
          this.context.market.waitForData(At.b).then((e) => {
            (this.attachmentsData = e),
              this.bindings.push(this.attachmentsData.onChanged(this.updateAttachments)),
              this.isUnmounting || this.updateAttachments();
          });
        }
        componentWillUnmount() {
          (this.isUnmounting = !0), window.clearTimeout(this.uploadTooltipTimeout);
          for (const e of this.bindings) e.cancel();
        }
        componentDidUpdate(e, t) {
          const { active: i, parentId: n, parentType: s } = this.props;
          e.active && !i
            ? this.setState({
                textChanged: !1,
                pendingAttachments: [],
                removedAttachments: [],
                uploads: [],
                failures: [],
              })
            : (n === e.parentId && s === e.parentType) || this.updateAttachments();
        }
        edit() {
          this.textEditor && this.textEditor.toggleEditing(!0);
        }
        focus() {
          this.textEditor && this.textEditor.focus();
        }
        getMarkdown() {
          let e;
          return (e = this.textEditor ? this.textEditor.getMarkdown() : this.props.text), e.trim();
        }
        getAttachmentCount() {
          const { attachments: e } = this.props,
            { pendingAttachments: t, removedAttachments: i, uploads: n } = this.state;
          return e.length + t.length + n.length - i.length;
        }
        isAtMaxAttachments() {
          return this.getAttachmentCount() >= Ot.yk;
        }
        inEmptyState() {
          const { active: e, text: t } = this.props;
          return !e && '' === t.trim() && 0 === this.getAttachmentCount();
        }
        renderButtonBar() {
          const { active: e, creating: t, parentId: i, maxLength: n } = this.props;
          if (!e) return null;
          const {
              pendingAttachments: s,
              removedAttachments: a,
              textChanged: o,
              charCount: r,
              uploads: d,
              showUploadTooltip: c,
            } = this.state,
            l = this.isAtMaxAttachments(),
            h = o || a.length > 0 || s.length > 0,
            u = d.length > 0,
            m = !l && !u,
            p = h && e && !u && !(n && r > n),
            g = l ? Wt.wr.DIMMED : u ? Wt.wr.DISABLED : Wt.wr.ENABLED,
            v = this.context.locale.t(l ? yi.MAX_ATTACHMENTS_TOOLTIP : yi.UPLOAD_TOOLTIP, Ot.yk),
            y = this.context.locale.t(l ? yi.MAX_ATTACHMENTS_TOOLTIP : yi.EMBED_TOOLTIP, Ot.yk),
            f = this.context.locale.t(t ? yi.ADD_CTA : yi.SAVE_CTA),
            w = this.context.locale.t(yi.LINK_TOOLTIP),
            b = this.context.locale.t(yi.CANCEL_CTA);
          return (0, ze.jsxs)(
            'div',
            Object.assign(
              { className: 'annotation-button-bar' },
              {
                children: [
                  (0, ze.jsxs)(
                    'div',
                    Object.assign(
                      { className: 'annotation-editors' },
                      {
                        children: [
                          (0, ze.jsx)(
                            Ht,
                            Object.assign(
                              {
                                id: `${i}-annotation`,
                                multi: !0,
                                enabled: m,
                                onUpload: this.onFilesChosen,
                              },
                              {
                                children: (0, ze.jsx)(Wt.hU, {
                                  iconClass: 'icon-attach',
                                  buttonStyle: Wt.Dd.PLAIN,
                                  buttonState: g,
                                  onClick: this.onClickFileInput,
                                  tooltipMsg: v,
                                  tooltipPersist: c,
                                }),
                              },
                            ),
                          ),
                          (0, ze.jsx)(Wt.hU, {
                            iconClass: 'icon-media-mix',
                            buttonStyle: Wt.Dd.PLAIN,
                            buttonState: g,
                            tooltipMsg: y,
                            onClick: this.openEmbedEditor,
                          }),
                          (0, ze.jsx)(Wt.hU, {
                            iconClass: 'icon-add-link',
                            buttonStyle: Wt.Dd.PLAIN,
                            tooltipMsg: w,
                            onClick: this.openLinkEditor,
                          }),
                        ],
                      },
                    ),
                  ),
                  (0, ze.jsxs)(
                    Et.hE,
                    Object.assign(
                      { className: 'annotation-cta-buttons', spacing: 'small' },
                      {
                        children: [
                          (0, ze.jsx)(
                            Et.zx,
                            {
                              variant: Et.Wu.TERTIARY,
                              size: 'small',
                              onClick: this.cancelEdits,
                              label: b,
                            },
                            'cancel',
                          ),
                          (0, ze.jsx)(
                            Et.zx,
                            {
                              variant: Et.Wu.TERTIARY,
                              size: 'small',
                              disabled: !p,
                              onClick: this.saveEdits,
                              label: f,
                            },
                            'save',
                          ),
                        ],
                      },
                    ),
                  ),
                ],
              },
            ),
          );
        }
        renderAttachments() {
          const {
              attachments: e,
              active: t,
              onViewAttachment: i,
              annotationType: n,
              parentId: s,
            } = this.props,
            { pendingAttachments: a } = this.state,
            o = this.attachmentsData
              ? e.filter((e) => !this.attachmentsData.removals.get(e.id))
              : e;
          if ((a.forEach((e) => o.push(e)), t))
            return (0, ze.jsx)(St.s, {
              annotationType: n,
              parentId: s,
              canDelete: t,
              inline: t,
              attachments: o,
              onViewAttachment: i,
            });
          const r = (o || []).reduce(
            (e, t) => {
              const i = (0, z.lV)(t) ? 'viewable' : 'nonViewable';
              return (e[i] = [...e[i], t]), e;
            },
            { viewable: [], nonViewable: [] },
          );
          return (0, ze.jsxs)(ze.Fragment, {
            children: [
              (0, ze.jsx)(St.s, {
                annotationType: n,
                parentId: s,
                canDelete: t,
                inline: t,
                attachments: r.viewable,
                onViewAttachment: i,
              }),
              (0, ze.jsx)(St.s, {
                annotationType: n,
                parentId: s,
                canDelete: t,
                inline: t,
                attachments: r.nonViewable,
                nonViewable: !0,
                onViewAttachment: i,
              }),
            ],
          });
        }
        renderSmartEditor() {
          const {
              placeholder: e,
              hashtags: t,
              text: i,
              creating: n,
              textParser: s,
              active: a,
              maxLength: o,
              tabIndex: r,
              annotationType: d,
              onClickToEdit: c,
            } = this.props,
            l = d === B.J.NOTE,
            h = this.inEmptyState() && l && !n ? this.context.locale.t(yi.CONTENT_DELETED) : e;
          return (0, ze.jsx)(Vt, {
            ref: this.setTextEditorRef,
            textParser: s,
            text: i,
            active: !!a,
            clickToEdit: !!c,
            placeholder: h,
            onClickBlock: this.onClickBlock,
            onStartEditing: a ? void 0 : c,
            onDoneEditing: this.onDoneEditing,
            onCancelEditing: this.cancelEdits,
            onInput: this.onInput,
            tabIndex: r,
            maxLength: o,
            hashtags: t || [],
            userMentions: l,
          });
        }
        render() {
          const {
              className: e,
              creating: t,
              active: i,
              parentId: n,
              parentType: s,
              annotationType: a,
              onClickToEdit: o,
              edited: r,
              title: d,
              maxLength: c,
            } = this.props,
            { uploads: l, selectedBlock: h, charCount: m } = this.state,
            p = this.getAttachmentCount() < Ot.yk,
            g = !(l.length > 0) && (i || t) && p,
            v = a === B.J.NOTE,
            y = this.inEmptyState() && !t && v,
            f = !i && r && !y,
            w = {
              annotating: i,
              'editor-box': i || !!o,
              'annotation-emptied': y,
              invalid: i && !!c && m > c,
            };
          let b = '',
            T = '';
          return (
            h && h.blockType === u.C.LINK && ((b = h.text), (T = h.value || '')),
            (0, ze.jsxs)(
              zt,
              Object.assign(
                {
                  className: 'annotation-box',
                  onDropped: this.onDrop,
                  disabled: !g,
                  onActivate: this.dropActivated,
                },
                {
                  children: [
                    d,
                    (0, ze.jsxs)(
                      'div',
                      Object.assign(
                        { className: mt()('annotation-text-box', w, e) },
                        {
                          children: [
                            this.renderSmartEditor(),
                            i && this.renderAttachments(),
                            i && this.renderButtonBar(),
                            i && c && c - m < 50 && (0, ze.jsx)(pi, { current: m, max: c }),
                          ],
                        },
                      ),
                    ),
                    f &&
                      (0, ze.jsx)(
                        'div',
                        Object.assign({ className: 'annotation-edited' }, { children: '(edited)' }),
                      ),
                    !i && !t && this.renderAttachments(),
                    i &&
                      !!n &&
                      (0, ze.jsx)(mi, {
                        parentId: n,
                        parentType: s,
                        onEmbed: this.closeEmbedEditor,
                        onCancel: this.closeEmbedEditor,
                      }),
                    i &&
                      !!n &&
                      (0, ze.jsx)(ni, {
                        linkText: b,
                        linkUrl: T,
                        onCancelLink: this.onCancelLink,
                        onSaveLink: this.onSaveLink,
                        onRemoveLink: this.onRemoveLink,
                      }),
                  ],
                },
              ),
            )
          );
        }
      };
      (fi.contextType = rt.I), (fi = gi([Dt.Z, vi('design:paramtypes', [Object])], fi));
      var wi = i(58894),
        bi = function (e, t, i, n) {
          var s,
            a = arguments.length,
            o = a < 3 ? t : null === n ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
          if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
            o = Reflect.decorate(e, t, i, n);
          else
            for (var r = e.length - 1; r >= 0; r--)
              (s = e[r]) && (o = (a < 3 ? s(o) : a > 3 ? s(t, i, o) : s(t, i)) || o);
          return a > 3 && o && Object.defineProperty(t, i, o), o;
        },
        Ti = function (e, t) {
          if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
            return Reflect.metadata(e, t);
        };
      const {
        INVITE_USER: Ci,
        INVITE_BUTTON: Ei,
        INVITE_USERS: Di,
        INVITE_VISIBLE_MSG: xi,
      } = Ve.Z.USERS;
      let Ai = class extends $e.Component {
        constructor(e) {
          super(e),
            (this.onInviteUsers = () => {
              this.props.onInviteUsers(this.props.invitees);
            });
        }
        render() {
          const { invitees: e } = this.props;
          if (0 === e.length) return null;
          const { locale: t } = this.context;
          let i;
          const n = t.t(Ei, e.length);
          i = 1 === e.length ? t.t(Ci, { email: e[0] }) : t.t(Di, { emails: e.join(', ') });
          const s = t.t(xi);
          return (0, ze.jsxs)(
            'div',
            Object.assign(
              { className: 'user-invite-card' },
              {
                children: [
                  (0, ze.jsxs)(
                    'div',
                    Object.assign(
                      { className: 'user-invite-info' },
                      {
                        children: [
                          (0, ze.jsx)('span', { className: 'icon icon-eye-show' }),
                          (0, ze.jsx)('span', Object.assign({ className: '' }, { children: s })),
                        ],
                      },
                    ),
                  ),
                  (0, ze.jsx)(
                    'p',
                    Object.assign({ className: 'user-invite-msg' }, { children: i }),
                  ),
                  (0, ze.jsx)(Et.zx, {
                    onClick: this.onInviteUsers,
                    variant: Et.Wu.TERTIARY,
                    className: mt()('button-inline', 'user-invite-button'),
                    label: n,
                  }),
                ],
              },
            ),
          );
        }
      };
      (Ai.contextType = rt.I), (Ai = bi([Dt.Z, Ti('design:paramtypes', [Object])], Ai));
      var Oi = function (e, t, i, n) {
          var s,
            a = arguments.length,
            o = a < 3 ? t : null === n ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
          if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
            o = Reflect.decorate(e, t, i, n);
          else
            for (var r = e.length - 1; r >= 0; r--)
              (s = e[r]) && (o = (a < 3 ? s(o) : a > 3 ? s(t, i, o) : s(t, i)) || o);
          return a > 3 && o && Object.defineProperty(t, i, o), o;
        },
        Si = function (e, t) {
          if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
            return Reflect.metadata(e, t);
        };
      const {
        INVITE_VISIBLE_MSG: Pi,
        INVITE_USER_FAILED: Ii,
        INVITE_USERS_FAILED: ki,
      } = Ve.Z.USERS;
      let Ni = class extends $e.Component {
        constructor(e) {
          super(e);
        }
        render() {
          const { failedEmails: e } = this.props,
            { locale: t } = this.context;
          if (0 === e.length) return null;
          let i;
          i = 1 === e.length ? t.t(Ii, { email: e[0] }) : t.t(ki, { failedEmails: e.join(', ') });
          const n = t.t(Pi);
          return (0, ze.jsxs)(
            'div',
            Object.assign(
              { className: 'user-invite-card' },
              {
                children: [
                  (0, ze.jsxs)(
                    'div',
                    Object.assign(
                      { className: 'user-invite-info' },
                      {
                        children: [
                          (0, ze.jsx)('span', { className: 'icon icon-eye-show' }),
                          (0, ze.jsx)('span', Object.assign({ className: '' }, { children: n })),
                        ],
                      },
                    ),
                  ),
                  (0, ze.jsx)(
                    'p',
                    Object.assign({ className: 'user-invite-msg' }, { children: i }),
                  ),
                ],
              },
            ),
          );
        }
      };
      (Ni.contextType = rt.I), (Ni = Oi([Dt.Z, Si('design:paramtypes', [Object])], Ni));
      var Ri = function (e, t, i, n) {
        var s,
          a = arguments.length,
          o = a < 3 ? t : null === n ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
        if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
          o = Reflect.decorate(e, t, i, n);
        else
          for (var r = e.length - 1; r >= 0; r--)
            (s = e[r]) && (o = (a < 3 ? s(o) : a > 3 ? s(t, i, o) : s(t, i)) || o);
        return a > 3 && o && Object.defineProperty(t, i, o), o;
      };
      const { UNKNOWN_USER: Mi, UNKNOWN_USERS: ji, INVITE_VISIBLE_MSG: Li } = Ve.Z.USERS;
      let Bi = class extends $e.Component {
        render() {
          const { locale: e } = this.context,
            { emails: t } = this.props;
          if (0 === t.length) return null;
          let i;
          i = 1 === t.length ? e.t(Mi, { email: t[0] }) : e.t(ji, { emails: t.join(', ') });
          const n = e.t(Li);
          return (0, ze.jsxs)(
            'div',
            Object.assign(
              { className: 'user-invite-card' },
              {
                children: [
                  (0, ze.jsxs)(
                    'div',
                    Object.assign(
                      { className: 'user-invite-info' },
                      {
                        children: [
                          (0, ze.jsx)('span', { className: 'icon icon-eye-show' }),
                          (0, ze.jsx)('span', Object.assign({ className: '' }, { children: n })),
                        ],
                      },
                    ),
                  ),
                  (0, ze.jsx)(
                    'p',
                    Object.assign({ className: 'user-invite-msg' }, { children: i }),
                  ),
                ],
              },
            ),
          );
        }
      };
      (Bi.contextType = rt.I), (Bi = Ri([Dt.Z], Bi));
      var Vi = function (e, t, i, n) {
          var s,
            a = arguments.length,
            o = a < 3 ? t : null === n ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
          if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
            o = Reflect.decorate(e, t, i, n);
          else
            for (var r = e.length - 1; r >= 0; r--)
              (s = e[r]) && (o = (a < 3 ? s(o) : a > 3 ? s(t, i, o) : s(t, i)) || o);
          return a > 3 && o && Object.defineProperty(t, i, o), o;
        },
        Fi = function (e, t) {
          if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
            return Reflect.metadata(e, t);
        };
      let _i = class extends $e.Component {
        constructor(e) {
          super(e),
            (this.inviteUsers = async (e) => {
              if (0 === e.length) return;
              const { noteId: t, message: i } = this.props;
              await this.context.commandBinder.issueCommand(new T.JB(e, i, q.AT, t));
            });
        }
        getInvitees() {
          const { userMentions: e } = this.props,
            t = [];
          return (
            e.forEach((e) => {
              (e.userStatus === b.J.MENTIONED ||
                (e.userStatus === b.J.KNOWN && e.modelAccess === o.x6.PUBLIC)) &&
                t.push(e.email);
            }),
            t
          );
        }
        getFailedEmails() {
          const { userMentions: e } = this.props,
            t = [];
          return (
            e.forEach((e) => {
              e.userStatus === b.J.FAILED && t.push(e.email);
            }),
            t
          );
        }
        render() {
          const { expires: e, noteId: t } = this.props;
          if (new Date().getTime() > e) return null;
          const { userData: i } = this.context,
            n = i.isInviter(),
            s = this.getInvitees(),
            a = this.getFailedEmails();
          return (0, ze.jsxs)(
            'div',
            Object.assign(
              { className: 'user-mentions-unknown' },
              {
                children: [
                  n &&
                    s.length > 0 &&
                    (0, ze.jsx)(Ai, {
                      invitees: s,
                      modelAccess: q.AT,
                      noteId: t,
                      onInviteUsers: this.inviteUsers,
                    }),
                  !n && s.length > 0 && (0, ze.jsx)(Bi, { emails: s }),
                  a.length > 0 && (0, ze.jsx)(Ni, { failedEmails: a }),
                ],
              },
            ),
          );
        }
      };
      (_i.contextType = rt.I), (_i = Vi([Dt.Z, Fi('design:paramtypes', [Object])], _i));
      const { NOTES: Hi } = Ve.Z.SHOWCASE;
      function Ui(e) {
        const { comment: t, noteId: i, onCancel: n, onViewAttachment: s } = e,
          { user: a, created: r, edited: d, id: c, text: l } = t,
          { analytics: h, commandBinder: u } = (0, $e.useContext)(rt.I),
          m = lt(),
          p = (0, yt.b)(),
          g = (0, Xe.R)(),
          v = (0, et.T)(),
          y = (0, $e.useRef)(null),
          f = (0, wt.l)(),
          w = (0, bt.x)(),
          b = (0, Ke.Q)(),
          T = pt(),
          C = Ct(),
          E = ft();
        if (!b || !f || !m) return null;
        function D(e) {
          h.trackToolGuiEvent('notes', e);
        }
        const x = T === c,
          A = t.attachments.values(),
          O = H(m, B.J.NOTE, a),
          S = U(m, B.J.NOTE, a),
          P = t.modified.getTime() + 60 * q.E8 * 1e3,
          I = m.getUserDisplay(a.email),
          k = I.color,
          N = f.getPlainText(l),
          R = b.getCommentUserMentions(l, E),
          M =
            !x && (O || S)
              ? (0, ze.jsxs)(
                  Et.xz,
                  Object.assign(
                    {
                      icon: 'more-vert',
                      variant: Et.Wu.TERTIARY,
                      ariaLabel: p.t(Ve.Z.MORE_OPTIONS),
                      menuArrow: !0,
                      menuClassName: 'search-result-menu',
                      menuPlacement: 'bottom-end',
                    },
                    {
                      children: [
                        O &&
                          (0, ze.jsx)(Et.zx, {
                            label: p.t(Hi.EDIT),
                            size: Et.qE.SMALL,
                            variant: Et.Wu.TERTIARY,
                            onClick: () => {
                              y.current &&
                                (D('notes_click_edit_comment'),
                                u.issueCommand(new se.x4(t.id)),
                                y.current.edit());
                            },
                          }),
                        S &&
                          (0, ze.jsx)(Et.zx, {
                            className: 'menu-delete-btn',
                            label: p.t(Hi.DELETE),
                            size: Et.qE.SMALL,
                            variant: Et.Wu.TERTIARY,
                            onClick: () => {
                              D('notes_click_delete_comment'), u.issueCommand(new se.mH(i, t.id));
                            },
                          }),
                      ],
                    },
                  ),
                )
              : null;
        return (0, ze.jsxs)(
          'div',
          Object.assign(
            { className: mt()('comment', { active: x }), 'data-id': c },
            {
              children: [
                (0, ze.jsxs)(
                  'div',
                  Object.assign(
                    { className: 'note-header comment-header' },
                    {
                      children: [
                        (0, ze.jsx)(Mt.C, {
                          badgeStyle: { color: k, borderColor: k },
                          label: I.initials,
                        }),
                        (0, ze.jsxs)(
                          'div',
                          Object.assign(
                            { className: 'note-details' },
                            {
                              children: [
                                (0, ze.jsx)(
                                  'span',
                                  Object.assign({ className: 'note-user' }, { children: I.name }),
                                ),
                                (0, ze.jsx)(
                                  'div',
                                  Object.assign(
                                    { className: 'note-subheader' },
                                    { children: r.toLocaleString() },
                                  ),
                                ),
                              ],
                            },
                          ),
                        ),
                        M,
                      ],
                    },
                  ),
                ),
                O
                  ? (0, ze.jsx)(fi, {
                      ref: y,
                      textParser: f,
                      linkHandler: w,
                      annotationId: i,
                      annotationType: B.J.NOTE,
                      parentId: c,
                      parentType: o.ud.COMMENT,
                      attachments: A,
                      active: x,
                      edited: d,
                      creating: !1,
                      text: l,
                      hashtags: C,
                      toolPanelLayout: v,
                      openModal: g,
                      onViewAttachment: s,
                      onDoneEditing: (e, s) => {
                        s
                          ? (D('notes_delete_empty_comment'),
                            u.issueCommand(new se.mH(i, t.id)),
                            n())
                          : u.issueCommand(new se.Uw(i, t.id, e));
                      },
                      onCancelEditing: n,
                      maxLength: q.Ko,
                    })
                  : (0, ze.jsx)(wi.e, {
                      text: l,
                      textParser: f,
                      linkHandler: w,
                      annotationType: B.J.NOTE,
                      annotationId: i,
                      attachments: A,
                      edited: d,
                      onViewAttachment: s,
                    }),
                O &&
                  R.length > 0 &&
                  (0, ze.jsx)(_i, { noteId: i, message: N, userMentions: R, expires: P }),
              ],
            },
          ),
        );
      }
      const { NOTES: Gi } = Ve.Z.SHOWCASE;
      function zi({ noteId: e, replyId: t, active: i, onCancel: n, onReply: s }) {
        const a = (0, yt.b)(),
          { commandBinder: r, analytics: d } = (0, $e.useContext)(rt.I),
          c = (0, Xe.R)(),
          l = (0, et.T)(),
          h = (0, wt.l)(),
          u = (0, bt.x)(),
          m = Ct();
        if (!h) return null;
        return (0, ze.jsx)(fi, {
          className: 'reply-box',
          textParser: h,
          linkHandler: u,
          annotationType: B.J.NOTE,
          annotationId: e,
          parentType: o.ud.COMMENT,
          parentId: t,
          attachments: [],
          active: i,
          edited: !1,
          creating: !0,
          text: '',
          hashtags: m,
          toolPanelLayout: l,
          openModal: c,
          placeholder: a.t(Gi.REPLY_PLACEHOLDER),
          onClickToEdit: () => {
            d.trackToolGuiEvent('notes', 'notes_click_new_comment'), r.issueCommand(new se.x4(t));
          },
          onDoneEditing: (e, i) => {
            i ? n() : s(t, e);
          },
          onCancelEditing: n,
          maxLength: q.Ko,
        });
      }
      var Wi = i(43255);
      const { NOTES: $i } = Ve.Z.SHOWCASE;
      function Ki({ note: e, active: t, onCancelNote: i }) {
        const { analytics: n, commandBinder: s } = (0, $e.useContext)(rt.I),
          a = lt(),
          o = ot(),
          r = (0, yt.b)();
        if (!a) return null;
        const d = e.comments.get(0);
        function c(e) {
          n.trackToolGuiEvent('notes', e);
        }
        const l = H(a, B.J.NOTE, e.user),
          h = a.getUserDisplay(e.user.email),
          u = h.color,
          m = !o && !t,
          p = m && U(a, B.J.NOTE, e.user),
          g = m && !e.resolved,
          v = m && e.resolved,
          y =
            !o && (l || v || p)
              ? (0, ze.jsxs)(
                  Et.xz,
                  Object.assign(
                    {
                      icon: 'more-vert',
                      ariaLabel: r.t(Ve.Z.MORE_OPTIONS),
                      variant: Et.Wu.TERTIARY,
                      menuArrow: !0,
                      menuClassName: 'search-result-menu',
                      menuPlacement: 'bottom-end',
                    },
                    {
                      children: [
                        l &&
                          (0, ze.jsx)(Et.zx, {
                            label: r.t($i.EDIT),
                            size: Et.qE.SMALL,
                            variant: Et.Wu.TERTIARY,
                            onClick: () => {
                              c('notes_click_edit_note'), d && s.issueCommand(new se.x4(d.id));
                            },
                          }),
                        v &&
                          (0, ze.jsx)(Et.zx, {
                            label: r.t($i.UNRESOLVE),
                            size: Et.qE.SMALL,
                            variant: Et.Wu.TERTIARY,
                            onClick: () => {
                              c('notes_click_unresolve_note'), s.issueCommand(new se.yp(e.id, !1));
                            },
                          }),
                        p &&
                          (0, ze.jsx)(Et.zx, {
                            className: 'menu-delete-btn',
                            label: r.t($i.DELETE),
                            size: Et.qE.SMALL,
                            variant: Et.Wu.TERTIARY,
                            onClick: () => {
                              c('notes_click_delete_note'), s.issueCommand(new se.sG(e.id));
                            },
                          }),
                      ],
                    },
                  ),
                )
              : null,
          f = r.t($i.MARK_AS_RESOLVED);
        return (0, ze.jsxs)(
          'header',
          Object.assign(
            { className: 'note-header' },
            {
              children: [
                (0, ze.jsx)(Mt.C, { badgeStyle: { color: u, borderColor: u }, label: h.initials }),
                (0, ze.jsxs)(
                  'div',
                  Object.assign(
                    { className: 'note-details' },
                    {
                      children: [
                        (0, ze.jsx)(
                          'span',
                          Object.assign({ className: 'note-user' }, { children: h.name }),
                        ),
                        (0, ze.jsx)(
                          'div',
                          Object.assign(
                            { className: 'note-subheader' },
                            { children: e.created.toLocaleString() },
                          ),
                        ),
                      ],
                    },
                  ),
                ),
                (0, ze.jsxs)(
                  Et.hE,
                  Object.assign(
                    { spacing: 'small' },
                    {
                      children: [
                        o &&
                          (0, ze.jsx)(Et.zx, {
                            icon: 'close',
                            tooltip: r.t($i.CANCEL),
                            onClick: i,
                            tooltipOptions: { placement: 'bottom-end' },
                          }),
                        g &&
                          (0, ze.jsx)(Et.zx, {
                            icon: 'checkmark',
                            size: Et.qE.SMALL,
                            variant: Et.Wu.FAB,
                            theme: 'dark',
                            tooltip: f,
                            onClick: () => {
                              c('notes_click_resolve_note'), s.issueCommand(new se.yp(e.id, !0));
                            },
                          }),
                        m &&
                          (0, ze.jsx)(Wi.O, {
                            prefix: 'note',
                            pin: e,
                            id: e.id,
                            darkTheme: !0,
                            analyticAction: 'copy_note_share_link',
                            includeCameraView: !0,
                          }),
                        y,
                      ],
                    },
                  ),
                ),
              ],
            },
          ),
        );
      }
      const { NOTES: Zi } = Ve.Z.SHOWCASE;
      function Yi({ note: e, onViewAttachment: t, onCancel: i }) {
        var n;
        const { commandBinder: s } = (0, $e.useContext)(rt.I),
          a = (0, yt.b)(),
          r = (0, Xe.R)(),
          d = (0, et.T)(),
          c = lt(),
          l = ft(),
          h = (0, $e.useRef)(null),
          u = (0, Ke.Q)(),
          m = pt(),
          p = ot(),
          g = Ct(),
          v = (0, wt.l)(),
          y = (0, bt.x)(),
          f = e.comments.get(0),
          w = null == f ? void 0 : f.id,
          b = !!m && (m === w || p);
        if (
          ((0, dt.U)(j.cd, () => {
            p && k();
          }),
          (0, $e.useEffect)(() => {
            b && k();
          }, [b]),
          !u || !v || !c)
        )
          return null;
        const T = e.id,
          C =
            (null === (n = null == f ? void 0 : f.attachments) || void 0 === n
              ? void 0
              : n.values()) || [],
          E = (null == f ? void 0 : f.text) || '',
          D = (null == f ? void 0 : f.edited) || !1,
          x = (null == f ? void 0 : f.modified.getTime()) + 60 * q.E8 * 1e3,
          A = e.user.id === c.getCurrentUserId(),
          O = !!A && c.isCommenter(),
          S = v.getPlainText(E),
          P = u.getCommentUserMentions(E, l),
          I = b ? a.t(Zi.ADD_NOTE_MESSAGE) : void 0,
          k = () => {
            h.current && m === T && h.current.edit();
          };
        return (0, ze.jsxs)(
          'div',
          Object.assign(
            { className: 'note-post' },
            {
              children: [
                (0, ze.jsx)(Ki, { note: e, active: b, onCancelNote: i }),
                O
                  ? (0, ze.jsx)(fi, {
                      ref: h,
                      textParser: v,
                      linkHandler: y,
                      annotationId: T,
                      annotationType: B.J.NOTE,
                      parentId: w || T,
                      parentType: o.ud.COMMENT,
                      attachments: C,
                      active: b,
                      edited: D,
                      creating: p,
                      text: E,
                      hashtags: g,
                      placeholder: I,
                      toolPanelLayout: d,
                      openModal: r,
                      onViewAttachment: t,
                      onDoneEditing: async (e, t) => {
                        t
                          ? i()
                          : p
                            ? await s.issueCommand(new se.FB(e))
                            : await s.issueCommand(new se.kd(T, e));
                      },
                      onCancelEditing: i,
                      maxLength: q.TM,
                    })
                  : (0, ze.jsx)(wi.e, {
                      text: E,
                      textParser: v,
                      linkHandler: y,
                      annotationType: B.J.NOTE,
                      annotationId: T,
                      attachments: C,
                      edited: D,
                      onViewAttachment: t,
                    }),
                !p &&
                  f &&
                  A &&
                  P.length > 0 &&
                  (0, ze.jsx)(_i, { message: S, noteId: T, expires: x, userMentions: P }),
              ],
            },
          ),
        );
      }
      function Ji({ note: e }) {
        const { commandBinder: t, analytics: i } = (0, $e.useContext)(rt.I),
          n = lt(),
          s = pt(),
          a = ot(),
          o = (function (e) {
            const t = (0, gt.V)(e),
              [i, n] = (0, $e.useState)(vt(t));
            return (
              (0, $e.useEffect)(() => {
                if (!t) return () => {};
                function e() {
                  n(vt(t));
                }
                const i = t.comments.onChanged(e);
                return (
                  e(),
                  () => {
                    i.cancel();
                  }
                );
              }, [t]),
              i
            );
          })(e.id),
          [r, d] = (0, $e.useState)((0, c.O1)(11)),
          l = () => {
            t.issueCommand(new se.oH());
          },
          h = (e) => {
            if (o.length) {
              i.trackToolGuiEvent('notes', 'notes_click_view_attachment');
              const n = o.filter((e) => (0, z.lV)(e));
              n.length > 0 && t.issueCommand(new G.xW(!0, n, e));
            }
          },
          u = { annotating: !!s, creating: a },
          m = s === r,
          p = !a && (null == n ? void 0 : n.isCommenter()) && (m || !s);
        return (0, ze.jsxs)(
          'div',
          Object.assign(
            { className: mt()('note-widget', u) },
            {
              children: [
                e &&
                  (0, ze.jsx)(Yi, {
                    note: e,
                    onViewAttachment: h,
                    onCancel: () => {
                      a ? t.issueCommand(new se.gc()) : s && l();
                    },
                  }),
                !a &&
                  (0, ze.jsx)(
                    'div',
                    Object.assign(
                      { className: 'note-comments' },
                      {
                        children: e.comments.map((t, i) =>
                          0 === i
                            ? null
                            : (0, ze.jsx)(
                                Ui,
                                { noteId: e.id, comment: t, onCancel: l, onViewAttachment: h },
                                t.id,
                              ),
                        ),
                      },
                    ),
                  ),
                p &&
                  (0, ze.jsx)(zi, {
                    replyId: r,
                    noteId: e.id,
                    active: m,
                    onCancel: () => {
                      l(), d((0, c.O1)(11));
                    },
                    onReply: (i, n) => {
                      t.issueCommand(new se.Df(e.id, n, i)), d((0, c.O1)(11));
                    },
                  }),
              ],
            },
          ),
        );
      }
      var qi = i(10545),
        Qi = function (e, t, i, n) {
          var s,
            a = arguments.length,
            o = a < 3 ? t : null === n ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
          if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
            o = Reflect.decorate(e, t, i, n);
          else
            for (var r = e.length - 1; r >= 0; r--)
              (s = e[r]) && (o = (a < 3 ? s(o) : a > 3 ? s(t, i, o) : s(t, i)) || o);
          return a > 3 && o && Object.defineProperty(t, i, o), o;
        },
        Xi = function (e, t) {
          if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
            return Reflect.metadata(e, t);
        };
      let en = class extends $e.Component {
        constructor(e) {
          super(e),
            (this.clickColor = (e) => {
              const t = e.currentTarget;
              if (t && t.dataset) {
                const i = t.dataset.value;
                i &&
                  (e.stopPropagation(),
                  this.props.onColorPicked(i),
                  this.setState({ activeColor: i }));
              }
            }),
            (this.renderColorSwatch = (e) => {
              const { activeColor: t } = this.state,
                i = { backgroundColor: e },
                n = mt()({ 'color-swatch': !0, 'icon-checkmark': !0, active: e === t });
              return (0, ze.jsx)(
                'div',
                { className: n, style: i, 'data-value': e, onClick: this.clickColor },
                e,
              );
            }),
            (this.state = { activeColor: e.defaultColor || '' });
        }
        UNSAFE_componentWillReceiveProps(e) {
          e.defaultColor &&
            !this.state.activeColor &&
            this.setState({ activeColor: e.defaultColor });
        }
        render() {
          const { colors: e } = this.props;
          return (0, ze.jsx)(
            'div',
            Object.assign(
              { className: 'color-picker' },
              { children: e.map((e) => this.renderColorSwatch(e)) },
            ),
          );
        }
      };
      en = Qi([Dt.Z, Xi('design:paramtypes', [Object])], en);
      var tn = i(65919),
        nn = i(71392),
        sn = i(52803);
      var an = i(70759);
      i(85925);
      let on = 0;
      class rn extends $e.Component {
        constructor(e) {
          super(e),
            (this.mdcRef = (0, $e.createRef)()),
            (this.setValue = (e) => {
              this.setState({ value: e });
            }),
            (this.onSliderInput = (e) => {
              var t;
              const i = e.detail.value;
              this.layoutRecalculated ||
                (null === (t = this.mdcRef.current) || void 0 === t || t.layout(),
                (this.layoutRecalculated = !0)),
                this.setState({ value: i }),
                this.props.onInput && this.props.onInput(i);
            }),
            (this.onSliderChange = (e) => {
              const t = e.detail.value;
              this.setState({ value: t }), this.props.onChange && this.props.onChange(t);
            }),
            (this.getLeftOffset = () =>
              (100 * (this.state.value - this.props.min)) / (this.props.max - this.props.min) +
              '%'),
            (this.getSliderId = () => `slider-with-tooltip-${this.id}`),
            (this.getStyleElement = () =>
              `#${this.getSliderId()} .mdc-slider__thumb-container {\n        left: ${this.getLeftOffset()}\n    }`),
            (this.getDisplayValue = (e) => {
              const { formatNumbers: t, units: i } = this.props;
              return (t ? t(e) : e) + (i || '');
            }),
            (this.setActive = (e) => () => this.setState({ active: e })),
            (this.hasChanged = () => {
              this.setState({ hasChanged: !1 });
            }),
            (this.onMouseDown = (e) => {
              this.props.onInputStart && this.props.onInputStart();
            }),
            (this.onEventMouseUp = (e) => {
              this.props.onInputEnd && this.props.onInputEnd();
            }),
            (this.onMouseUp = (e) => {
              this.props.onInputEnd && this.props.onInputEnd();
            }),
            (this.id = on++),
            (this.state = {
              value: void 0 !== e.initialValue ? e.initialValue : (e.max + e.min) / 2,
              active: !1,
              hasChanged: !1,
            }),
            (this.setActiveSlider = this.setActive(!0)),
            (this.setInactiveSlider = this.setActive(!1));
        }
        componentDidMount() {
          document.addEventListener('mouseup', this.onEventMouseUp),
            document.addEventListener('mouseleave', this.onEventMouseUp);
        }
        componentWillUnmount() {
          document.removeEventListener('mouseup', this.onEventMouseUp),
            document.removeEventListener('mouseleave', this.onEventMouseUp);
        }
        componentDidUpdate(e, t) {
          t.value !== this.state.value &&
            (clearTimeout(this.hasChangedTimeout),
            this.setState({ hasChanged: !0 }),
            (this.hasChangedTimeout = window.setTimeout(this.hasChanged, 450)));
        }
        render() {
          const {
              width: e,
              displayBounds: t,
              min: i,
              max: n,
              discrete: s,
              tooltipPosition: a = dn.DOWN,
              variant: o = 'default',
              disabled: r,
              tabIndex: d,
            } = this.props,
            { active: c, hasChanged: l, value: h } = this.state,
            u = { left: this.getLeftOffset() },
            m = 'inline-value' === o,
            p = !m && t,
            g = !m,
            v = void 0 !== d ? d : 0;
          return (0, ze.jsxs)(
            'div',
            Object.assign(
              {
                id: this.getSliderId(),
                className: mt()('slider-with-tooltip', { displayBounds: t, disabled: r }),
                style: { width: `${e}px` },
                onMouseEnter: this.setActiveSlider,
                onMouseLeave: this.setInactiveSlider,
              },
              {
                children: [
                  g &&
                    a === dn.UP &&
                    (0, ze.jsx)('div', {
                      className: mt()('slider-tooltip', { active: c || l }),
                      'data-balloon': this.getDisplayValue(h),
                      'data-balloon-pos': dn.UP,
                      style: u,
                    }),
                  p &&
                    (0, ze.jsx)(
                      'div',
                      Object.assign(
                        { className: 'min-amount' },
                        { children: this.getDisplayValue(i) },
                      ),
                    ),
                  m &&
                    (0, ze.jsx)(
                      'div',
                      Object.assign(
                        { className: 'min-amount' },
                        { children: this.getDisplayValue(h) },
                      ),
                    ),
                  (0, ze.jsx)(an.i, {
                    discrete: s,
                    min: i,
                    max: n,
                    value: h,
                    onInput: this.onSliderInput,
                    onChange: this.onSliderChange,
                    onMouseDown: this.onMouseDown,
                    onMouseUp: this.onMouseUp,
                    foundationRef: this.mdcRef,
                    disabled: r,
                    tabIndex: v,
                  }),
                  p &&
                    (0, ze.jsx)(
                      'div',
                      Object.assign(
                        { className: 'max-amount' },
                        { children: this.getDisplayValue(n) },
                      ),
                    ),
                  (0, ze.jsx)('style', {
                    dangerouslySetInnerHTML: { __html: this.getStyleElement() },
                  }),
                  g &&
                    a === dn.DOWN &&
                    (0, ze.jsx)('div', {
                      className: mt()('slider-tooltip', { active: c || l }),
                      'data-balloon': this.getDisplayValue(h),
                      'data-balloon-pos': dn.DOWN,
                      style: u,
                    }),
                ],
              },
            ),
          );
        }
      }
      var dn;
      !(function (e) {
        (e.UP = 'up'), (e.DOWN = 'down');
      })(dn || (dn = {}));
      var cn = i(37617),
        ln = Ve.Z.WORKSHOP.MATTERTAGS;
      function hn(e) {
        const {
            stemEnabled: t,
            stemLength: i,
            onLengthUpdate: n,
            onLengthChanged: s,
            onStemEnabledChanged: a,
            variant: o,
            disabled: r,
            tabIndex: d,
          } = e,
          c = (0, $e.useRef)(null),
          l = (0, nn.O)(),
          h = (0, yt.b)();
        (0, $e.useEffect)(() => {
          c.current && c.current.setValue((0, sn.zy)(i));
        }, [i]);
        const u = h.t(ln.SHOW_STEM_LABEL);
        return (0, ze.jsxs)(
          'div',
          Object.assign(
            { className: 'stem-editor', onClick: (e) => e.stopPropagation() },
            {
              children: [
                (0, ze.jsx)(
                  'div',
                  Object.assign(
                    { className: 'stem-slider' },
                    {
                      children: (0, ze.jsx)(rn, {
                        ref: c,
                        discrete: !1,
                        min: 0.1,
                        max: 9,
                        initialValue: (0, sn.zy)(i),
                        onChange: (e, t = !0) => {
                          const i = t ? (0, sn._F)(e) : e;
                          s(i);
                        },
                        onInput: (e, t = !0) => {
                          const s = t ? (0, sn._F)(e) : e;
                          s !== i && n(s);
                        },
                        displayBounds: !0,
                        width: 150,
                        formatNumbers: (e) => {
                          if (l === tn.M.IMPERIAL)
                            return ((e) => {
                              let t = '';
                              t += Math.floor(e) + "'";
                              const i = Math.floor((e % 1) * 12);
                              return i < 10 && (t += '0'), (t += i + "''"), t;
                            })(e);
                          return `${Math.round(100 * (0, sn._F)(e)) / 100}m`;
                        },
                        tooltipPosition: dn.DOWN,
                        variant: o,
                        disabled: r,
                        tabIndex: d,
                      }),
                    },
                  ),
                ),
                (0, ze.jsx)(cn.X, {
                  enabled: !0,
                  checked: t,
                  label: u,
                  onChange: (e) => {
                    const t = e.classList.contains('checked');
                    a(t);
                  },
                }),
              ],
            },
          ),
        );
      }
      var un = function (e, t, i, n) {
          var s,
            a = arguments.length,
            o = a < 3 ? t : null === n ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
          if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
            o = Reflect.decorate(e, t, i, n);
          else
            for (var r = e.length - 1; r >= 0; r--)
              (s = e[r]) && (o = (a < 3 ? s(o) : a > 3 ? s(t, i, o) : s(t, i)) || o);
          return a > 3 && o && Object.defineProperty(t, i, o), o;
        },
        mn = function (e, t) {
          if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
            return Reflect.metadata(e, t);
        };
      const { PINS: pn } = Ve.Z.WORKSHOP;
      let gn = class extends $e.Component {
        constructor(e) {
          super(e),
            (this.closePinAssetEditor = () => {
              this.props.onClose();
            }),
            (this.handleColorPicked = (e) => {
              this.context.analytics.trackGuiEvent('pin_change_color'),
                this.props.onSave({ color: e });
            }),
            (this.saveStemEnabled = (e) => {
              this.context.analytics.trackGuiEvent(e ? 'pin_show_stem' : 'pin_hide_stem'),
                this.props.onSave({ stemEnabled: e });
            }),
            (this.saveStemLength = (e) => {
              this.context.analytics.trackGuiEvent('pin_change_stem_height'),
                this.props.onSave({ stemLength: e });
            }),
            (this.previewStemLength = (e) => {
              const { id: t, pinType: i } = this.props;
              this.context.commandBinder.issueCommand(new N.tE(t, i, { stemLength: e }));
            }),
            (this.stopPropagation = (e) => {
              e.stopPropagation();
            });
        }
        renderStemEditor() {
          const { pin: e } = this.props;
          return (0, ze.jsx)(hn, {
            stemLength: e.stemLength,
            stemEnabled: e.stemEnabled,
            onLengthUpdate: this.previewStemLength,
            onLengthChanged: this.saveStemLength,
            onStemEnabledChanged: this.saveStemEnabled,
          });
        }
        render() {
          const { toolPanelLayout: e, open: t, pin: i, colors: n } = this.props,
            s = e === p.wS.BOTTOM_PANEL;
          if (!t && !s) return null;
          const a = this.context.locale.t(pn.COLOR_STEM_EDITOR_TITLE);
          return (0, ze.jsxs)(
            'div',
            Object.assign(
              {
                className: mt()('pin-tool-editor', { 'tool-popup': !s, open: s && t }),
                onClick: this.stopPropagation,
              },
              {
                children: [
                  (0, ze.jsxs)(
                    'div',
                    Object.assign(
                      { className: 'tool-editor-title' },
                      {
                        children: [
                          (0, ze.jsx)('span', { children: a }),
                          (0, ze.jsx)(Xt.P, {
                            theme: 'dark',
                            tooltip: '',
                            onClose: this.closePinAssetEditor,
                          }),
                        ],
                      },
                    ),
                  ),
                  (0, ze.jsx)(en, {
                    colors: n,
                    defaultColor: i.color,
                    onColorPicked: this.handleColorPicked,
                  }),
                  this.renderStemEditor(),
                ],
              },
            ),
          );
        }
      };
      (gn.contextType = rt.I), (gn = un([Dt.Z, mn('design:paramtypes', [Object])], gn));
      var vn = i(39049),
        yn = i(85726),
        fn = i(49474);
      const wn = (0, yn.Y)(!1);
      function bn(e) {
        wn.value = e;
      }
      function Tn() {
        return [(0, fn.y)(wn), bn];
      }
      var Cn = i(27444),
        En = i(23084);
      function Dn(e) {
        const { analyticAction: t } = e,
          { analytics: i, commandBinder: n } = (0, $e.useContext)(rt.I),
          s = (0, Je.s)(),
          a = Ye(),
          o = (0, Cn.e)(null == a ? void 0 : a.id),
          [r, d] = Tn();
        if (!(a && s.length > 1)) return null;
        const c = s.findIndex((e) => {
          const t = e.id,
            i = e.parentId;
          return (
            i && i === (null == a ? void 0 : a.id) && (!o || t === (null == o ? void 0 : o.id))
          );
        });
        return (0, ze.jsx)(En.$, {
          index: c,
          total: s.length,
          disabled: r,
          wrapAround: !0,
          onNavigate: (e) => {
            const o = s[e];
            if (!o) return;
            const r = o.id,
              c = o.parentId;
            if (!r || !c) return;
            d(!0);
            const h = a ? null : l.nF.Interpolate;
            i.trackToolGuiEvent('notes', t),
              n.issueCommand(new se.yP(c, !0, !1, r, h)).then(() => {
                d(!1);
              });
          },
        });
      }
      const { NOTES: xn } = Ve.Z.SHOWCASE;
      function An() {
        const e = pt(),
          { commandBinder: t } = (0, $e.useContext)(rt.I),
          i = (0, yt.b)(),
          n = it(),
          s = (0, vn.A)(),
          [a] = Tn(),
          o = n && s && (s === p.w1.SEARCH || s === p.w1.LAYERS),
          r = o || !n,
          d = !e && !o,
          c = r ? i.t(xn.NAV_BACK) : i.t(xn.NAV_CLOSE),
          l = r ? 'back' : 'close';
        return (0, ze.jsxs)(
          'div',
          Object.assign(
            { className: 'detail-panel-header' },
            {
              children: [
                (0, ze.jsx)(Xt.P, {
                  icon: l,
                  label: c,
                  onClose: () => {
                    a ||
                      (o
                        ? t.issueCommand(new g.cR()).then(() => {
                            t.issueCommand(new g.qy(!1));
                          })
                        : n
                          ? t.issueCommand(new g.CH(p.w1.NOTES))
                          : t.issueCommand(new se._N()));
                  },
                }),
                d && (0, ze.jsx)(Dn, { analyticAction: 'notes_navigate_in_panel' }),
              ],
            },
          ),
        );
      }
      function On({ panelOpen: e, note: t }) {
        const { commandBinder: i } = (0, $e.useContext)(rt.I),
          n = lt(),
          s = (0, et.T)(),
          a = (0, $e.useRef)(null),
          o = ht(),
          r = ot(),
          d = null == t ? void 0 : t.id;
        (0, dt.U)(re, (e) => {
          a.current && a.current.scrollToSelector(`[data-id='${e.commentId}']`);
        }),
          (0, $e.useEffect)(() => {
            a.current && d && a.current.resetScrollTop();
          }, [d]);
        const c = !(!t || !n) && H(n, B.J.NOTE, t.user),
          l = o === W.U.EDITING,
          h = s === p.wS.BOTTOM_PANEL,
          u = l && h;
        return (0, ze.jsxs)(
          qi.J,
          Object.assign(
            {
              ref: a,
              open: e,
              className: 'note-panel',
              scrollingDisabled: u,
              onClose: () => {
                i.issueCommand(new se._N());
              },
            },
            {
              children: [
                t && !r && (0, ze.jsx)(An, {}),
                t && (0, ze.jsx)(Ji, { note: t }),
                t &&
                  d &&
                  h &&
                  c &&
                  (0, ze.jsx)(
                    gn,
                    {
                      id: d,
                      pin: t,
                      pinType: R.Er.NOTE,
                      onSave: (e) => {
                        d && i.issueCommand(new se.oE(d, e));
                      },
                      onClose: () => {
                        i.issueCommand(new se.df(!1));
                      },
                      colors: q.ZP.colors,
                      open: l,
                      toolPanelLayout: s,
                    },
                    d,
                  ),
              ],
            },
          ),
        );
      }
      var Sn = i(46199),
        Pn = i(36010),
        In = i(34474);
      i(11669);
      const { NOTES: kn } = Ve.Z.SHOWCASE;
      function Nn() {
        const e = (0, yt.b)(),
          t = Qe(),
          i = (0, $e.useRef)(null);
        return (0, ze.jsx)(
          'div',
          Object.assign(
            { className: 'search-filter' },
            {
              children: (0, ze.jsxs)(
                Et.xz,
                Object.assign(
                  {
                    ref: i,
                    icon: 'filter',
                    ariaLabel: e.t(kn.FILTER),
                    variant: Et.Wu.TERTIARY,
                    size: Et.qE.SMALL,
                    menuClassName: 'search-filter-menu',
                  },
                  {
                    children: [
                      (0, ze.jsxs)(
                        'div',
                        Object.assign(
                          { className: 'search-filter-menu-header' },
                          {
                            children: [
                              (0, ze.jsx)('div', { children: e.t(kn.FILTER_BY) }),
                              (0, ze.jsx)(Xt.P, {
                                onClose: () => {
                                  i.current && i.current.closeMenu();
                                },
                              }),
                            ],
                          },
                        ),
                      ),
                      (0, ze.jsx)(
                        Rn,
                        { id: $.$.ALL, label: e.t(kn.FILTER_ALL), selected: t === $.$.ALL },
                        $.$.ALL,
                      ),
                      (0, ze.jsx)(
                        Rn,
                        {
                          id: $.$.OPEN,
                          label: e.t(kn.FILTER_UNRESOLVED),
                          selected: t === $.$.OPEN,
                        },
                        $.$.OPEN,
                      ),
                      (0, ze.jsx)(
                        Rn,
                        {
                          id: $.$.RESOLVED,
                          label: e.t(kn.FILTER_RESOLVED),
                          selected: t === $.$.RESOLVED,
                        },
                        $.$.RESOLVED,
                      ),
                    ],
                  },
                ),
              ),
            },
          ),
        );
      }
      function Rn({ id: e, label: t, selected: i }) {
        const { commandBinder: n, analytics: s } = (0, $e.useContext)(rt.I);
        return (0, ze.jsx)(In.e, {
          id: e,
          label: t,
          selected: i,
          onToggled: () => {
            i ||
              (s.trackToolGuiEvent('notes', 'notes_list_change_filter'),
              n.issueCommand(new se.RO(e, !0)));
          },
        });
      }
      var Mn = i(65162);
      const { NOTES: jn } = Ve.Z.SHOWCASE;
      function Ln({ children: e, title: t, hideBadge: i }) {
        const n = (0, yt.b)(),
          s = (0, Sn.A)(),
          a = (0, Je.s)().length,
          o = (0, ze.jsx)(Mn.B, { filter: (0, ze.jsx)(Nn, {}) }),
          r = t || n.t(s ? jn.COMMENTS : jn.NOTES, a);
        return (0, ze.jsx)(
          Pn.L,
          Object.assign(
            {
              toolId: p.w1.NOTES,
              className: 'notes-list-panel',
              title: r,
              subheader: o,
              hideBadge: i,
            },
            { children: e },
          ),
        );
      }
      function Bn({ children: e, title: t, hideBadge: i }) {
        const n = (0, Xe.R)(),
          s = (0, et.T)(),
          a = it(),
          o = Ye(),
          r = (function () {
            const e = Ye(),
              t = at();
            return (null == e ? void 0 : e.id) === (null == t ? void 0 : t.id) ? e : null;
          })(),
          d = ot(),
          [c, l] = (0, $e.useState)(r),
          h = a;
        (0, $e.useEffect)(() => {
          o && (null == o ? void 0 : o.id) !== (null == c ? void 0 : c.id) && l(o);
        }, [null == o ? void 0 : o.id]);
        const u = d ? r : o,
          m = s === p.wS.BOTTOM_PANEL,
          g = n && n !== nt.P.CONFIRM,
          v = !(!u || (m && g));
        return (0, ze.jsxs)(ze.Fragment, {
          children: [
            (0, ze.jsx)(On, { panelOpen: v, note: u || c }),
            !h && (0, ze.jsx)(Ln, Object.assign({ title: t, hideBadge: i }, { children: e })),
          ],
        });
      }
      var Vn = i(77267),
        Fn = i(30300),
        _n = i(17106),
        Hn = i(35748),
        Un = i(69634);
      const { NOTES: Gn } = Ve.Z.SHOWCASE;
      function zn({
        userName: e,
        description: t,
        numAttachments: i,
        numComments: n,
        searchText: s,
      }) {
        const a = (0, wt.l)(),
          o = (0, yt.b)(),
          r = n - 1,
          d = (s ? (0, Hn.vr)(e, s) : e).trim(),
          c = o.t(Gn.REPLIES, r);
        let l = '';
        return (
          '' === t
            ? i > 0
              ? (l = o.t(Gn.NUM_ATTACHMENTS, i))
              : 0 === r && (l = o.t(Gn.CONTENT_DELETED))
            : (l = (s ? (0, Hn.vr)(t, s) : t).trim()),
          (0, ze.jsxs)(
            'div',
            Object.assign(
              { className: 'item-details' },
              {
                children: [
                  (0, ze.jsxs)(
                    'div',
                    Object.assign(
                      { className: 'item-header' },
                      {
                        children: [
                          a && (0, ze.jsx)(Un.S, { text: d.trim(), textParser: a, markers: Hn.PP }),
                          r > 0 &&
                            !s &&
                            (0, ze.jsx)(
                              'span',
                              Object.assign(
                                { className: 'note-summary-info note-replies' },
                                { children: c },
                              ),
                            ),
                        ],
                      },
                    ),
                  ),
                  a &&
                    (0, ze.jsx)(
                      'div',
                      Object.assign(
                        { className: 'item-description' },
                        {
                          children: (0, ze.jsx)(Un.S, {
                            text: l,
                            textParser: a,
                            markers: Hn.PP,
                            linksActive: !1,
                          }),
                        },
                      ),
                    ),
                ],
              },
            ),
          )
        );
      }
      const { NOTES: Wn } = Ve.Z.SHOWCASE,
        $n = ({ item: e }) => (e ? (0, ze.jsx)(Kn, { item: e }, e.id) : null),
        Kn = ({ item: e }) => {
          const t = (0, $e.useRef)(null),
            { commandBinder: i, analytics: n, editMode: s } = (0, $e.useContext)(rt.I),
            a = (0, yt.b)(),
            o = (0, Vn.Y)(),
            r = (0, Fn.B)(),
            d = Ye(),
            c = (0, Sn.A)(),
            l = lt(),
            h = (0, _n.e)();
          if (!l) return null;
          const {
              id: u,
              title: m,
              description: p,
              color: g,
              resolved: v,
              user: y,
              numAttachments: f,
              numComments: w,
            } = e,
            b = u,
            T = e.parentId;
          if (!T || !b) return null;
          const C = T === (null == d ? void 0 : d.id),
            E = v || !e.isLayerVisible(),
            D = H(l, B.J.NOTE, y),
            x = U(l, B.J.NOTE, y),
            A = a.t(Wn.EDIT_LIST_ITEM_OPTION_CTA),
            O = a.t(Wn.DELETE_LIST_ITEM_OPTION_CTA),
            S =
              D || x
                ? (0, ze.jsx)(Et.hE, {
                    children: (0, ze.jsxs)(
                      Et.xz,
                      Object.assign(
                        {
                          ref: t,
                          icon: 'more-vert',
                          ariaLabel: a.t(Ve.Z.MORE_OPTIONS),
                          variant: Et.Wu.TERTIARY,
                          menuArrow: !0,
                          menuClassName: 'search-result-menu',
                        },
                        {
                          children: [
                            (0, ze.jsx)(Et.zx, {
                              label: A,
                              size: Et.qE.SMALL,
                              disabled: !D,
                              variant: Et.Wu.TERTIARY,
                              onClick: () => {
                                n.trackGuiEvent('notes_list_edit_note', { tool: h }),
                                  i.issueCommand(new se.yP(T, !0, !0, b));
                              },
                            }),
                            (0, ze.jsx)(Et.zx, {
                              className: 'menu-delete-btn',
                              label: O,
                              size: Et.qE.SMALL,
                              disabled: !x,
                              variant: Et.Wu.TERTIARY,
                              onClick: () => {
                                n.trackGuiEvent('notes_list_delete_note', { tool: h }),
                                  i.issueCommand(new se.sG(T));
                              },
                            }),
                          ],
                        },
                      ),
                    ),
                  })
                : void 0,
            P = (0, ze.jsx)(zn, {
              description: p,
              userName: m,
              numAttachments: f,
              numComments: w,
              searchText: c,
            }),
            I = (0, ze.jsx)(Mt.C, {
              badgeStyle: g ? { backgroundColor: g, borderColor: g } : void 0,
              iconClass: 'icon-comment',
            });
          return (0, ze.jsx)(
            Et.HC,
            {
              id: b,
              className: 'search-result-item notes-list-item',
              title: P,
              badge: I,
              active: C,
              disabled: E,
              onClick: async () => {
                n.trackGuiEvent('search_item_note_click', { tool: h }), e.onSelect(s, r, o);
              },
              actions: S,
            },
            b,
          );
        };
      var Zn = i(64444),
        Yn = i(83455);
      const { NOTES: Jn } = Ve.Z.SHOWCASE;
      function qn() {
        const e = Ye(),
          t = We.HH.DATE,
          i = !!(0 === (0, Je.s)().length) || void 0;
        let n;
        const s = Qe();
        if (!(0, qe.D)())
          switch (s) {
            case $.$.OPEN:
              n = Jn.HAVE_NONE_OPEN;
              break;
            case $.$.RESOLVED:
              n = Jn.HAVE_NONE_RESOLVED;
              break;
            default:
              n = Jn.HAVE_NONE;
          }
        return (0, ze.jsx)(Bn, {
          children: (0, ze.jsx)(
            'div',
            Object.assign(
              { className: 'panel-list' },
              {
                children: (0, ze.jsx)(Zn.D, {
                  renderItem: $n,
                  renderGroup: Yn.v,
                  activeItemId: null == e ? void 0 : e.id,
                  grouping: t,
                  excludeEmptyGroups: i,
                  emptyPhrase: n,
                }),
              },
            ),
          ),
        });
      }
      var Qn = i(71914),
        Xn = i(38210);
      function es() {
        const e = (0, Xn.P)(),
          [t, i] = (0, $e.useState)(e ? e.pinEditorState : R.V8.IDLE);
        return (
          (0, $e.useEffect)(() => {
            if (!e) return () => {};
            const t = e.onPinEditorStateChanged(i);
            return () => t.cancel();
          }, [e]),
          t
        );
      }
      var ts = i(26143),
        is = i(77006),
        ns = i(61173);
      function ss({ children: e }) {
        return (0, ze.jsx)('div', Object.assign({ className: 'overlay-message' }, { children: e }));
      }
      const { NOTES: as } = Ve.Z.SHOWCASE;
      function os() {
        const e = (0, $e.useMemo)(() => (0, ns.Jm)(), []),
          t = es(),
          i = (function () {
            const e = (0, Xn.P)(),
              [t, i] = (0, $e.useState)(!!e && e.canPlace);
            return (
              (0, $e.useEffect)(() => {
                if (!e) return () => {};
                const t = e.onCanPlaceChanged(i);
                return i(e.canPlace), () => t.cancel();
              }, [e]),
              t
            );
          })(),
          n = (0, yt.b)(),
          s = t === R.V8.CREATING,
          a = t === R.V8.PLACING;
        let o = null;
        if (s || !i || (!e && a)) {
          const t = n.t(e ? as.OVERLAY_ADD_TOUCH : as.OVERLAY_ADD_CLICK),
            s = n.t(e ? as.OVERLAY_PLACE_TOUCH : as.OVERLAY_PLACE_CLICK);
          o = i ? t : s;
        }
        return o
          ? (0, ze.jsxs)(ss, {
              children: [
                (0, ze.jsx)('div', { className: 'icon icon-notes' }),
                (0, ze.jsx)('span', Object.assign({ className: 'message' }, { children: o })),
              ],
            })
          : null;
      }
      var rs = i(66379);
      var ds = i(72439),
        cs = i(37649),
        ls = i(69757);
      const { NOTES: hs } = Ve.Z.SHOWCASE;
      function us({ canEdit: e, canDelete: t }) {
        const i = (0, $e.useRef)(null),
          { commandBinder: n, analytics: s } = (0, $e.useContext)(rt.I),
          a = ht(),
          o = Ye(),
          r = ot(),
          d = (0, et.T)(),
          c = es(),
          l = (function () {
            const e = (0, Xn.P)(),
              [t, i] = (0, $e.useState)(!!e && e.canAdd);
            return (
              (0, $e.useEffect)(() => {
                if (!e) return () => {};
                const t = e.onCanAddChanged(i);
                return i(e.canAdd), () => t.cancel();
              }, [e]),
              t
            );
          })(),
          h = (0, yt.b)(),
          u = c !== R.V8.IDLE,
          m = a === W.U.EDITING;
        function g() {
          i.current && i.current.dismissNudge();
        }
        const v = h.t(hs.COLOR_STEM_TOOLTIP),
          y = h.t(hs.DELETE_TOOLTIP),
          f = h.t(hs.ADD_TOOLTIP),
          w = h.t(hs.CANCEL_TOOLTIP),
          b = u ? w : f,
          T = d === p.wS.SIDE_PANEL,
          C = !T || u,
          E = h.t(hs.ADD_CTA_TOOLTIP),
          D = rs.F.NotesAddNudgeSeen,
          x = u ? ds.d.CANCEL : ds.d.ADD,
          A = u,
          O =
            T && e && !u
              ? (0, ze.jsx)(Et.zx, {
                  className: 'action-button-outer',
                  icon: 'stem-height',
                  variant: Et.Wu.FAB,
                  theme: 'overlay',
                  active: m,
                  tooltip: v,
                  onClick: () => {
                    g(), n.issueCommand(new se.df(!m));
                  },
                })
              : void 0,
          S =
            T && t && !u
              ? (0, ze.jsx)(Et.zx, {
                  className: 'action-button-outer',
                  variant: Et.Wu.FAB,
                  theme: 'overlay',
                  icon: 'delete',
                  tooltip: y,
                  onClick: () => {
                    g(),
                      o &&
                        (s.trackToolGuiEvent('notes', 'notes_overlay_click_delete'),
                        n.issueCommand(new se.sG(o.id)));
                  },
                })
              : void 0;
        return (0, ze.jsx)(
          ls.o,
          Object.assign(
            { outerLeft: O, outerRight: S },
            {
              children: (0, ze.jsx)(cs.W, {
                ref: i,
                addIcon: x,
                allowLayerChange: A,
                disabled: !l,
                onClick: () => {
                  g(),
                    u
                      ? r && n.issueCommand(new se.gc())
                      : (s.trackToolGuiEvent('notes', 'notes_overlay_click_add'),
                        n.issueCommand(new se.VI()));
                },
                tooltip: b,
                nudgeFeatureKey: q.pE,
                nudgeDisabled: C,
                nudgeMessage: E,
                nudgeLocalStorage: D,
              }),
            },
          ),
        );
      }
      function ms() {
        const { commandBinder: e } = (0, $e.useContext)(rt.I),
          t = (0, Xe.R)(),
          i = (0, et.T)(),
          n = Ye(),
          s = ht(),
          a = es(),
          o = (function () {
            const e = (0, Xn.P)(),
              [t, i] = (0, $e.useState)((null == e ? void 0 : e.progress) || 0);
            return (
              (0, $e.useEffect)(() => {
                if (!e) return () => {};
                const t = e.onProgressChanged(i);
                return i(e.progress), () => t.cancel();
              }, [e]),
              t
            );
          })(),
          r = (0, ts.v)(),
          d = lt(),
          c = pt(),
          l = ot(),
          h = s === W.U.CLOSED,
          u = (0, Qn.q)();
        if (t || !d || h) return null;
        const m = s === W.U.OPENING,
          g = s === W.U.EDITING,
          v = d.isCommenter() && !u && !c,
          y = !!n && H(d, B.J.NOTE, n.user),
          f = !!n && U(d, B.J.NOTE, n.user),
          w = i === p.wS.SIDE_PANEL,
          b = a === R.V8.PRESSING,
          T = !!n && !m,
          C = !w && !l && n && y;
        return (0, ze.jsxs)(
          'div',
          Object.assign(
            { className: 'overlay grid-overlay notes-overlay' },
            {
              children: [
                C &&
                  (0, ze.jsx)(
                    'div',
                    Object.assign(
                      { className: 'overlay-top-right' },
                      {
                        children: (0, ze.jsx)(Et.zx, {
                          icon: 'stem-height',
                          variant: Et.Wu.FAB,
                          theme: 'overlay',
                          disabled: !T,
                          active: g,
                          onClick: (t) => {
                            t.stopPropagation(), e.issueCommand(new se.df(!g));
                          },
                        }),
                      },
                    ),
                  ),
                (0, ze.jsx)(os, {}),
                v && (0, ze.jsx)(us, { canEdit: y, canDelete: f }),
                n &&
                  w &&
                  y &&
                  (0, ze.jsx)(gn, {
                    pin: n,
                    id: n.id,
                    pinType: R.Er.NOTE,
                    onSave: (t) => {
                      n && e.issueCommand(new se.oE(n.id, t));
                    },
                    onClose: () => {
                      e.issueCommand(new se.df(!1));
                    },
                    open: g,
                    colors: q.ZP.colors,
                    toolPanelLayout: i,
                  }),
                b && (0, ze.jsx)(is.B, { progress: o, screenPosition: r }),
              ],
            },
          ),
        );
      }
      var ps = i(60770);
      class gs {
        constructor() {
          (this.renderPanel = () => (0, ze.jsx)(qn, {})),
            (this.renderPersistentOverlay = () =>
              (0, ze.jsx)(ps.w, { parentTool: p.w1.NOTES }, 'notes-panel-ui')),
            (this.renderOverlay = () => (0, ze.jsx)(ms, {}));
        }
      }
      var vs = i(47149),
        ys = i(46301),
        fs = i(38496),
        ws = i(82196),
        bs = i(16928),
        Ts = i(30922),
        Cs = i(1055),
        Es = i(95845),
        Ds = i(8334);
      const { NOTES: xs } = Ve.Z.SHOWCASE;
      class As {
        constructor(e, t) {
          (this.engine = e),
            (this.settings = t),
            (this.disabledAssets = { [bs.U]: !1, [ws.Nj]: !1, [fs.s]: !1, [Ts.re]: !1 }),
            (this.settingsToggler = new ys.u(this.settings, this.disabledAssets)),
            (this.initPromise = this.init());
        }
        async init() {
          const { market: e } = this.engine;
          ([this.notesViewData, this.searchData] = await Promise.all([
            e.waitForData(ie.X),
            e.waitForData(vs.T),
          ])),
            this.setSearchItemFC(!0);
        }
        async activate() {
          this.settingsToggler.toggle(!0),
            await this.initPromise,
            await this.engine.commandBinder.issueCommand(new se.yK(!0));
        }
        async deactivate() {
          await this.engine.commandBinder.issueCommand(new se.yK(!1)),
            this.settingsToggler.toggle(!1);
        }
        async dispose() {
          await this.initPromise, this.setSearchItemFC(!1);
        }
        setSearchItemFC(e) {
          const t = this.searchData.getSearchDataTypeGroup(o.SF.NOTE);
          t && (t.itemFC = e ? Kn : void 0);
        }
        async deepLink(e) {
          const t = (await this.engine.market.waitForData(ie.X)).getNoteView(e);
          if (t)
            (0, Es.W4)(this.settings, t, (t) => {
              this.engine.commandBinder.issueCommand(new se.yP(e, !0, !1, (0, Cs.FU)().comment, t));
            });
          else {
            const e = { messagePhraseKey: xs.MISSING_MESSAGE, timeout: 4e3, dismissesOnAction: !0 };
            this.engine.commandBinder.issueCommand(new Ds.L(e)),
              this.engine.commandBinder.issueCommandWhenBound(new g.tT(p.w1.NOTES, !0));
          }
        }
        async hasPendingEdits() {
          const { notesPhase: e, activeNotation: t } = this.notesViewData;
          switch (e) {
            case W.U.IDLE:
            case W.U.CLOSED:
            case W.U.OPENING:
              return !1;
            case W.U.EDITING:
            case W.U.CREATING:
              return !0;
            default:
              return !!t;
          }
        }
      }
      class Os extends n.Y {
        constructor() {
          super(...arguments),
            (this.name = 'notes'),
            (this.activated = !1),
            (this.registered = !1),
            (this.activeBindings = []),
            (this.refreshPromise = null),
            (this.pollOnNotes = () => {
              let e;
              return (0, a.k1)(
                () => {
                  clearInterval(e),
                    (e = window.setInterval(() => {
                      this.refreshNotes();
                    }, 1e3 * q.GR));
                },
                () => {
                  window.clearInterval(e);
                },
                !0,
              );
            }),
            (this.modelViewChanged = () => {
              this.cancelNoteCreation(!0);
            }),
            (this.updatePerSettings = () => {
              const e = this.settingsData.tryGetProperty(q.Mp, !1),
                t = !this.in360View(),
                i = !this.interactionmodeData.isVR(),
                n = t && i && e,
                s = n ? this.getFilteredNoteIds(!1) : [];
              this.engine.commandBinder.issueCommand(new N.kb(R.Er.NOTE, n ? 1 : 0, s)),
                n || this.closeNoteBillboard();
            }),
            (this.registerNotesTool = async () => {
              const e = new m.U({
                id: p.w1.NOTES,
                deepLinkParam: 'note',
                searchModeType: o.SF.NOTE,
                namePhraseKey: Ve.Z.TOOLS.NOTES,
                panel: !0,
                icon: 'icon-comment-outline',
                analytic: 'notes',
                palette: p.$r.VIEW_BASED,
                order: 80,
                dimmed: !1,
                enabled: this.settingsData.tryGetProperty(de.IA, !1),
                hidesAppBar: !0,
                ui: new gs(),
                manager: new As(this.engine, this.settingsData),
                helpMessagePhraseKey: Ve.Z.TOOLS.NOTES_HELP_MESSAGE,
                helpHref: 'https://support.matterport.com/s/article/Matterport-Notes',
              });
              this.engine.commandBinder.issueCommand(new g.MV([e]));
            }),
            (this.toggleNotesMode = async (e) => {
              e.opened ? this.activateTool() : this.deactivateTool();
            }),
            (this.togglePinAssetEditor = async (e) => {
              this.viewData.setActiveNotation(null),
                e.opened
                  ? this.changeNotesPhase(W.U.EDITING)
                  : this.viewData.notesPhase === W.U.EDITING && this.changeNotesPhase(W.U.OPEN);
            }),
            (this.toggleNotesFilter = async (e) => {
              const { filter: t, enabled: i } = e;
              i ? this.viewData.setNotesFilter(t) : this.viewData.setNotesFilter($.$.ALL);
            }),
            (this.openNoteToComment = async (e) => {
              const { noteId: t, commentId: i, dock: n, edit: s, transition: a } = e,
                o = this.viewData,
                r = o.getNoteView(t);
              if (!r) return void this.log.error(`Missing note ${t}`);
              const { notesFilter: d } = o,
                c = d === $.$.RESOLVED;
              d !== $.$.ALL && r.resolved !== c && o.setNotesFilter($.$.ALL);
              const h = n || s,
                u =
                  this.toolsData.toolPanelLayout === p.wS.SIDE_PANEL
                    ? l.nF.FadeToBlack
                    : l.nF.Instant;
              await this.openNote(t, a || u, h, i, s), this.openAnnotation(t, h);
            }),
            (this.onAppChange = () => {
              this.deactivateTool(), this.updatePerSettings(), this.displayNotes();
            }),
            (this.onNotesPhaseChanged = () => {
              let e = !0;
              const t = this.toolsData.toolPanelLayout === p.wS.BOTTOM_PANEL;
              switch (this.viewData.notesPhase) {
                case W.U.EDITING:
                case W.U.CREATING:
                  e = !1;
                  break;
                case W.U.OPENING:
                case W.U.OPEN:
                  e = !t;
              }
              this.engine.broadcast(new v.ps(e));
            }),
            (this.changeNotesPhase = (e) => {
              e !== this.viewData.notesPhase && this.viewData.setNotesPhase(e);
            }),
            (this.onCloseNote = async () => {
              this.closeNote();
            }),
            (this.pinAddCancelled = (e) => {
              e.pinType === R.Er.NOTE && this.cancelNoteCreation(!1);
            }),
            (this.onCancelNewNote = async () => {
              this.cancelNoteCreation(!0);
            }),
            (this.cancelNoteCreation = (e) => {
              var t;
              if (!this.userData.isCommenter()) return;
              const i = this.viewData,
                n = null === (t = i.openNoteView) || void 0 === t ? void 0 : t.id;
              n &&
                (e && this.engine.commandBinder.issueCommand(new N.tT(n, R.Er.NOTE)),
                this.engine.commandBinder.issueCommand(new L.Aj(n, B.J.NOTE))),
                this.cancelAttachmentChanges(),
                i.setActiveNotation(null),
                i.setOpenNoteView(null),
                i.setFocusedComment(null),
                (i.isNewNote = !1),
                i.commit(),
                this.changeNotesPhase(W.U.IDLE);
            }),
            (this.notesWereChanged = () => {
              this.parseNotes(), this.updateNoteViewData(), this.displayNotes();
            }),
            (this.onNoteFilterChanged = () => {
              this.viewData.setOpenNoteView(null),
                this.viewData.setFocusedComment(null),
                this.updateNoteViewData(),
                this.displayNotes();
            }),
            (this.onViewModeOrFloorChanged = () => {
              this.updatePerSettings();
            }),
            (this.onLayersChanged = () => {
              this.closeNoteBillboard(), this.displayNotes();
            }),
            (this.onElementsChanged = ({ added: e, updated: t, removed: i }) => {
              if (e && e.length) {
                const t = e.map(([, e]) => this.getPinUpdate(e));
                this.engine.commandBinder.issueCommand(new N.mE(t));
              }
              if (t && t.length) {
                const e = t.map(([, e]) => this.getPinUpdate(e));
                this.engine.commandBinder.issueCommand(new N.mE(e));
              }
              null == i ||
                i.forEach(([, e]) => {
                  this.removeNotePin(e);
                });
            }),
            (this.onOpenNoteViewChanged = () => {
              const e = this.viewData.openNoteView;
              e && this.updateNotePin(e);
            }),
            (this.startNoteCreation = async () => {
              if (!this.userData.isCommenter()) return;
              this.toolsData.softOpening &&
                (await this.engine.commandBinder.issueCommand(new g.z2(p.w1.NOTES, !1)));
              const e = this.viewData,
                t = this.appData.application === Ne.Mx.WORKSHOP;
              let i = (0, c.O1)(11);
              for (; this.notesData.getNote(i); ) i = (0, c.O1)(11);
              const n = new Q();
              (n.user = this.userData.getCurrentUser()),
                (n.id = i),
                (n.floorId = this.floorsViewData.getHighestVisibleFloorId()),
                (n.layerId = this.layersData.getNotesLayerId(t));
              const s = e.createNoteView(n);
              (e.isNewNote = !0),
                e.commit(),
                this.changeNotesPhase(W.U.CREATING),
                e.setOpenNoteView(s),
                e.setFocusedComment(null),
                this.engine.commandBinder.issueCommand(
                  new N.fM(n.id, this.getPinUpdate(n), R.Er.NOTE, s.backgroundTexture),
                );
            }),
            (this.saveNewNote = async (e) => {
              if (!this.userData.isCommenter()) return;
              const { text: t } = e,
                i = this.viewData,
                n = i.getPendingNote();
              if (n) {
                if (this.layersData.isInMemoryLayer(n.layerId)) {
                  const e = new Q(n);
                  return (
                    this.notesData.updateNote(e),
                    i.setActiveNotation(null),
                    (i.isNewNote = !1),
                    i.commit(),
                    void this.updateNoteViewData()
                  );
                }
                const e = await this.store.create(n, t);
                if (!e) return void this.log.error('MDS Note saved failed');
                const s = e.comments.get(0);
                if (!s) throw new Error('No root comment in the new note');
                const a = await this.confirmAttachmentChanges(s.id, n.id);
                this.notesData.updateNote(e),
                  a && (await this.refreshNote(e.id)),
                  this.parseMarkdown(t),
                  i.setOpenNoteView(i.getNoteView(e.id));
                const o = i.openNoteView;
                if (o) {
                  const t = H(this.userData, B.J.NOTE, o.user);
                  this.engine.commandBinder.issueCommand(new N.Ar(e.id, R.Er.NOTE, t)),
                    this.engine.commandBinder.issueCommand(new N.OL(n.id, R.Er.NOTE));
                }
                i.setActiveNotation(null),
                  (i.isNewNote = !1),
                  i.commit(),
                  this.updateNoteViewData();
              } else this.log.debug('No pending note');
            }),
            (this.pinMoved = async (e) => {
              const { id: t, pinType: i, pinPos: n } = e,
                s = this.viewData.openNoteView;
              if (s && i === R.Er.NOTE && t === s.id) {
                const e = this.notesData.getNote(t);
                if (e) {
                  if (this.layersData.isInMemoryLayer(e.layerId)) return;
                  const { anchorPosition: i, stemNormal: s, floorId: a, roomId: o } = n;
                  this.store
                    .update({ id: t, anchorPosition: i, stemNormal: s, floorId: a, roomId: o })
                    .then((e) => {
                      e && this.notesData.updateNote(e);
                    });
                } else this.log.debug('Cannot move a non-existent note');
              }
            }),
            (this.pinPlaced = (e) => {
              const t = this.viewData.openNoteView;
              t &&
                e.pinType === R.Er.NOTE &&
                e.id === t.id &&
                (this.viewData.updateOpenNoteView(e.pinPos),
                this.changeNotesPhase(W.U.OPEN),
                this.viewData.setActiveNotation(t.id),
                this.openAnnotation(t.id, !0));
            }),
            (this.onEditComment = async (e) => {
              this.viewData.setActiveNotation(e.id);
            }),
            (this.handlePinFocusChange = async () => {
              const { openNoteView: e, isNewNote: t } = this.viewData;
              if (t) return;
              const { commandBinder: i } = this.engine,
                { focusedPin: n, selectedPinId: s } = this.pinsViewData,
                { billboardAnnotation: a, billboardSelected: o } = this.annotationsViewData;
              if (!n)
                return void (
                  a &&
                  a.annotationType === B.J.NOTE &&
                  a.id !== s &&
                  this.closeNoteBillboard()
                );
              const r = (null == e ? void 0 : e.id) === (null == a ? void 0 : a.id) && o,
                d = e && (null == e ? void 0 : e.id) === (null == n ? void 0 : n.id);
              if ((e && r && !d && this.closeNote(), n.pinType === R.Er.NOTE)) {
                const t = this.viewData.getNoteView(n.id);
                if (!t) return void this.log.debug('Focused pin changed, but no note view.');
                t.id !== (null == e ? void 0 : e.id) && i.issueCommand(new L.Kw(t.id, B.J.NOTE));
              }
            }),
            (this.handleAnnotationsChanged = async () => {
              const { openNoteView: e, isNewNote: t, focusedComment: i } = this.viewData;
              if (t) return;
              const { softOpening: n } = this.toolsData,
                { dockedAnnotation: s, selectedAnnotation: a } = this.annotationsViewData,
                o = s || a,
                r = (null == s ? void 0 : s.annotationType) === B.J.NOTE && s,
                d = (null == a ? void 0 : a.annotationType) === B.J.NOTE && a,
                c = r || d,
                l = !!r;
              c && c.id !== (null == e ? void 0 : e.id)
                ? await this.openNote(c.id, null, l)
                : e && e.id !== (null == o ? void 0 : o.id) && this.closeNote(),
                l
                  ? (this.activated ||
                      (await this.engine.commandBinder.issueCommand(new g.z2(p.w1.NOTES, !0))),
                    i && this.engine.broadcast(new re(i.id)))
                  : this.activated &&
                    n &&
                    (await this.engine.commandBinder.issueCommand(new g.CH(p.w1.NOTES)));
            }),
            (this.handlePinSelectionChange = async () => {
              const { openNoteView: e, activeNotation: t } = this.viewData,
                { selectedPinId: i } = this.pinsViewData;
              if (t || (null == e ? void 0 : e.id) === i) return;
              const n = i ? this.pinsViewData.getPin(i) : null;
              if (!e || (n && n.pinType === R.Er.NOTE)) {
                if (i && n && n.pinType === R.Er.NOTE) {
                  const t = H(this.userData, B.J.NOTE, null == e ? void 0 : e.user);
                  this.engine.commandBinder.issueCommand(new N.ic(i, !!t));
                  const n = !0;
                  await this.openNote(i, l.nF.Interpolate, n), this.openAnnotation(i, n);
                }
              } else {
                const e = !this.toolsData.softOpening;
                this.activated && !e
                  ? await this.engine.commandBinder.issueCommand(new g.CH(p.w1.NOTES))
                  : this.closeNote();
              }
            }),
            (this.handleViewingAttachment = (e) => {
              const { annotationType: t, id: i, attachmentId: n } = e;
              if (t !== B.J.NOTE) return;
              const s = this.viewData.getNoteAttachments(i),
                a = s.find((e) => e.id === n);
              if (a && (0, z.lV)(a)) {
                const e = s.filter((e) => (0, z.lV)(e));
                this.engine.commandBinder.issueCommand(new G.xW(!0, e, n));
              }
            }),
            (this.deleteNote = async (e) => {
              const t = e.noteId,
                i = this.notesData.getNote(t);
              if (i) {
                this.engine.commandBinder.issueCommand(new f.r()),
                  this.layersData.isInMemoryLayer(i.layerId) || this.store.delete([i]),
                  this.notesData.removeNote(t);
                const e = this.viewData.openNoteView;
                e && e.id === t && this.closeNote(),
                  this.engine.commandBinder.issueCommand(new N.OL(t, R.Er.NOTE));
              } else this.log.debug('Cannot delete a non-existent note');
            }),
            (this.onResolveNoteCommand = async (e) => {
              const { noteId: t, resolved: i } = e;
              i ? await this.resolveNote(t) : await this.reopenNote(t);
            }),
            (this.onSaveNoteChanges = async (e) => {
              const { noteId: t, text: i } = e,
                n = this.notesData.getNote(t);
              if (n) {
                const e = n.comments.get(0);
                if (e) return this.updateNoteComment(t, e.id, i);
                this.log.warn('no root comment');
              } else this.log.debug('Cannot update a non-existent note');
            }),
            (this.cancelCommentChanges = async (e) => {
              this.cancelAttachmentChanges(), this.viewData.setActiveNotation(null);
            }),
            (this.saveNoteAppearance = async (e) => {
              const t = this.notesData,
                { noteId: i, properties: n } = e,
                s = t.getNote(i);
              if (s) {
                const e = this.viewData,
                  { openNoteView: a } = e;
                if (Object.keys(n)) {
                  const o = this.layersData.isInMemoryLayer(s.layerId)
                    ? Object.assign(s, n)
                    : await this.store.update(Object.assign({ id: i }, n));
                  o &&
                    (this.updateNotePin(o),
                    t.updateNote(o),
                    (null == a ? void 0 : a.id) === i && e.updateOpenNoteView(n));
                }
              } else this.log.debug('Cannot update a non-existent note');
            }),
            (this.addComment = async (e) => {
              const { noteId: t, text: i, replyId: n } = e,
                s = this.notesData.getNote(t);
              if (s) {
                s.resolved && (this.viewData.setNotesFilter($.$.ALL), this.reopenNote(s.id));
                const e = await this.store.createComment(t, { text: i });
                return e
                  ? (this.viewData.setActiveNotation(null),
                    this.parseMarkdown(i),
                    await this.confirmAttachmentChanges(e.id, n),
                    await this.refreshNote(s.id),
                    this.refreshNotes(),
                    e)
                  : (this.log.error('Cannot create MDS comment'), null);
              }
              return this.log.debug('Cannot add a comment to a non-existent note'), null;
            }),
            (this.onUpdateComment = async (e) => {
              const { noteId: t, commentId: i, text: n } = e;
              return this.updateNoteComment(t, i, n);
            }),
            (this.deleteComment = async (e) => {
              const { commentId: t, noteId: i } = e,
                n = this.notesData.getNote(i);
              if (n) {
                const e = n.getComment(t);
                e &&
                  (this.layersData.isInMemoryLayer(n.layerId) ||
                    (await this.store.deleteComment(e)),
                  n.deleteComment(t)),
                  this.refreshNotes();
              } else this.log.debug('Cannot delete a comment in a non-existent note');
            }),
            (this.notationBlockClicked = async (e) => {
              const { annotationType: t, block: i } = e;
              t === B.J.NOTE &&
                ((i.blockType !== u.C.USER && i.blockType !== u.C.HASH) ||
                  ((this.activated && !this.toolsData.softOpening) ||
                    (await this.engine.commandBinder.issueCommand(new g.z2(p.w1.NOTES, !1))),
                  this.engine.commandBinder.issueCommand(new Me.H1(i.text || '')),
                  i.text && this.closeNote()));
            }),
            (this.filterVisibleNotes = async (e) => {
              const { idVisibility: t } = this.viewData;
              t.clear(),
                e.ids.forEach((e) => t.add(e)),
                this.viewData.commit(),
                this.displayNotes();
            }),
            (this.noteVisbilityFilterEnabled = async (e) => {
              (this.viewData.idVisibilityEnabled = e.enabled),
                this.viewData.commit(),
                this.displayNotes();
            });
        }
        async init(e, t) {
          const [i, n, a, c] = await Promise.all([
            t.market.waitForData(x.e),
            t.market.waitForData(A.Z),
            t.market.waitForData(w.m),
            t.market.waitForData(Ne.pu),
          ]);
          if (!a.isLoggedIn() || n.isVR() || !i.tryGetProperty(de.IA, !1)) return;
          (this.engine = t),
            (this.config = e),
            (this.interactionmodeData = n),
            (this.userData = a),
            (this.settingsData = i),
            (this.appData = c);
          const [l, u, m, p, g, v, f] = await Promise.all([
            t.market.waitForData(y.t),
            t.market.waitForData(E.Z),
            t.market.waitForData(D.O),
            t.market.waitForData(O.c),
            t.market.waitForData(V.A),
            t.getModuleBySymbol(s.DeepLinksModuleKey),
            t.market.waitForData(S.R),
          ]);
          (this.toolsData = l),
            (this.sweepData = u),
            (this.viewmodeData = m),
            (this.floorsViewData = p),
            (this.annotationsViewData = g),
            (this.linkHandler = v),
            (this.layersData = f);
          const { readonly: b, baseUrl: T } = this.config;
          this.store = new ke(
            { context: f.mdsContext, readonly: b, includeDisabled: !0, baseUrl: T },
            this.userData,
          );
          const k = () => {
            this.store.setStoreViewId(f.getNonworkshopViewId());
          };
          k(),
            this.bindings.push(
              f.onPropertyChanged('currentViewId', k),
              f.onPropertyChanged('activeLayerId', () => this.updatePendingNote()),
              this.store.onNewData(async (e) => {
                this.loadNewNotes(e);
              }),
            ),
            (this.notesData = new te({})),
            (this.textParser = new h.v({ links: !0, hashtags: !0, users: this.userData })),
            (this.backgroundTexture = (0, r.p)(d)),
            (this.viewData = new ie.X(
              this.notesData,
              this.textParser,
              this.linkHandler,
              this.backgroundTexture,
            )),
            (this.hashtagData = new ne()),
            t.market.register(this, ne, this.hashtagData),
            (this.pinsViewData = await t.market.waitForData(M.B)),
            this.bindings.push(
              i.onPropertyChanged(q.Mp, this.updatePerSettings),
              t.commandBinder.addBinding(se.vn, this.registerNotesTool),
              t.commandBinder.addBinding(se.yK, this.toggleNotesMode),
              t.commandBinder.addBinding(se.sG, this.modifyInsideSaveCommand(this.deleteNote)),
              this.pinsViewData.onFocusedPinChanged(this.handlePinFocusChange),
              this.pinsViewData.onSelectedPinChanged(this.handlePinSelectionChange),
              g.onChanged(this.handleAnnotationsChanged),
              t.subscribe(F.q, this.handleViewingAttachment),
              t.subscribe(F.i, this.notationBlockClicked),
              t.commandBinder.addBinding(se.yP, this.openNoteToComment),
              t.subscribe(C.bS, this.onAppChange),
              m.makeModeChangeSubscription(this.onViewModeOrFloorChanged),
              p.makeFloorChangeSubscription(this.onViewModeOrFloorChanged),
              t.subscribe(P.Z, this.updatePerSettings),
              t.subscribe(I.m, this.updatePerSettings),
              this.layersData.onCurrentLayersChanged(this.onLayersChanged),
              t.commandBinder.addBinding(se.Gx, this.filterVisibleNotes),
              t.commandBinder.addBinding(se.GV, this.noteVisbilityFilterEnabled),
              this.pollOnNotes(),
              this.viewData.onOpenNoteViewChanged(this.onOpenNoteViewChanged),
              this.notesData.onChanged(this.notesWereChanged),
              this.notesData.collection.onElementsChanged(this.onElementsChanged.bind(this)),
              t.subscribe(Ue.YB, this.modelViewChanged),
            ),
            t.market.register(this, ie.X, this.viewData),
            this.updatePerSettings(),
            this.parseNotes(),
            this.registerRoomAssociationSource(t),
            (async function (e, t, i, n, s, a, r) {
              let d = n.application === Ne.Mx.WORKSHOP;
              const c = (n, a, o, r = []) => {
                  const c = [],
                    l = t.getFilteredNotesMap().values,
                    h = !o,
                    u = [];
                  return (
                    0 === r.length &&
                      l.forEach((t) => {
                        if (!d && !i.layerToggled(t.layerId)) return;
                        let o = 0;
                        t.comments.forEach((r, d) => {
                          (h && d > 0) ||
                            (n(r.user.name, s.getPlainText(r.text)) &&
                              (o++, c.push(new Be(e, i, a, r, t, s, h))));
                        }),
                          o > 0 && u.push(t.id);
                      }),
                    e.issueCommand(new se.Gx(u)),
                    c
                  );
                },
                l = (t) => {
                  e.issueCommand(new se.GV(!!t));
                },
                h = (e) => new Re.V(t.getFilteredNotesMap().onChanged(e), a.onChanged(e)),
                u = {
                  renew: () => {
                    e.issueCommandWhenBound(
                      new Me.c6({
                        id: o.SF.NOTE,
                        groupPhraseKey: Fe.SEARCH_GROUP_HEADER_NOTES,
                        groupMatchingPhraseKey: Fe.SEARCH_GROUP_HEADER,
                        getSimpleMatches: c,
                        registerChangeObserver: h,
                        onSearchActivatedChanged: l,
                        groupOrder: 50,
                        groupIcon: 'comment-outline',
                        batchSupported: !0,
                      }),
                    );
                  },
                  cancel: () => {
                    e.issueCommandWhenBound(new Me.Pe(o.SF.NOTE));
                  },
                },
                m = () => {
                  (d = n.application === Ne.Mx.WORKSHOP),
                    r.tryGetProperty(de.IA, !1) || d ? u.renew() : u.cancel();
                },
                p = n.onPropertyChanged('application', m),
                g = r.onPropertyChanged(de.IA, m);
              return m(), new Re.V(u, p, g);
            })(
              t.commandBinder,
              this.viewData,
              this.layersData,
              c,
              this.textParser,
              this.userData,
              this.settingsData,
            ).then((e) => this.bindings.push(e)),
            await this.refreshNotes(),
            t.market.register(this, te, this.notesData);
        }
        dispose(e) {
          this.deactivateTool(),
            this.bindings.forEach((e) => {
              e.cancel();
            }),
            (this.bindings = []),
            (this.activeBindings = []),
            this.engine.commandBinder.issueCommand(new N.zM(R.Er.NOTE)),
            this.backgroundTexture.dispose(),
            this.store.dispose(),
            super.dispose(e);
        }
        onUpdate() {}
        async refreshNotes() {
          if (this.refreshPromise) return;
          const e = this.viewData,
            { isNewNote: t, notesPhase: i } = e;
          t ||
            i === W.U.EDITING ||
            (this.refreshPromise = this.store.refresh().finally(() => {
              this.refreshPromise = null;
            }));
        }
        loadNewNotes(e) {
          var t;
          const { viewData: i } = this,
            n = null === (t = i.openNoteView) || void 0 === t ? void 0 : t.id,
            s = n ? { [n]: this.notesData.getNote(n) } : {};
          this.notesData.atomic(() => {
            this.layersData.replaceBackendLayers(this.notesData.collection, s);
          }),
            this.notesData.atomic(() => {
              this.layersData.replaceBackendLayers(this.notesData.collection, e);
            }),
            n &&
              !e[n] &&
              (this.log.debug('Open note was deleted'),
              i.setOpenNoteView(null),
              i.setFocusedComment(null),
              i.setActiveNotation(null),
              i.setNotesPhase(W.U.IDLE));
        }
        async refreshNote(e) {
          if (this.refreshPromise) return;
          const t = this.notesData.getNote(e);
          if (this.layersData.isInMemoryLayer(null == t ? void 0 : t.layerId))
            this.notesData.updateNote(t);
          else {
            const t = await this.store.readNote(e);
            t && this.notesData.updateNote(t);
          }
        }
        activateTool() {
          this.activated ||
            (this.engine.commandBinder.issueCommand(new L.yL(B.J.NOTE)),
            this.userData.isCommenter() && this.engine.commandBinder.issueCommand(new N.Ki(!0)),
            this.changeNotesPhase(W.U.IDLE),
            this.updateNoteViewData(),
            this.registered
              ? this.activeBindings.forEach((e) => {
                  e.renew();
                })
              : this.registerHandlers(),
            (this.activated = !0));
        }
        deactivateTool(e) {
          var t;
          if (!this.activated) return;
          this.activated = !1;
          const { isNewNote: i, openNoteView: n } = this.viewData,
            s =
              (null === (t = this.annotationsViewData.dockedAnnotation) || void 0 === t
                ? void 0
                : t.annotationType) === B.J.NOTE;
          i ? this.cancelNoteCreation(!0) : n && (e || s) && this.closeNote(),
            this.changeNotesPhase(W.U.CLOSED),
            this.engine.commandBinder.issueCommand(new N.iK()),
            this.engine.commandBinder.issueCommand(new N.Ki(!1)),
            this.activeBindings.forEach((e) => {
              e.cancel();
            });
        }
        registerHandlers() {
          const e = this.engine.commandBinder;
          this.activeBindings.push(
            this.engine.subscribe(j.b0, this.pinPlaced),
            this.engine.subscribe(j.bV, this.modifyInsideSaveCommand(this.pinMoved)),
            this.engine.subscribe(j.hu, this.pinAddCancelled),
            e.addBinding(se.VI, this.startNoteCreation),
            e.addBinding(se.FB, this.modifyInsideSaveCommand(this.saveNewNote)),
            e.addBinding(se.gc, this.onCancelNewNote),
            e.addBinding(se._N, this.onCloseNote),
            e.addBinding(se.kd, this.modifyInsideSaveCommand(this.onSaveNoteChanges)),
            e.addBinding(se.oH, this.cancelCommentChanges),
            e.addBinding(se.x4, this.onEditComment),
            e.addBinding(se.yp, this.modifyInsideSaveCommand(this.onResolveNoteCommand)),
            e.addBinding(se.Df, this.modifyInsideSaveCommand(this.addComment)),
            e.addBinding(se.Uw, this.modifyInsideSaveCommand(this.onUpdateComment)),
            e.addBinding(se.mH, this.modifyInsideSaveCommand(this.deleteComment)),
            e.addBinding(se.oE, this.modifyInsideSaveCommand(this.saveNoteAppearance)),
            e.addBinding(se.df, this.togglePinAssetEditor),
            e.addBinding(se.RO, this.toggleNotesFilter),
            this.viewData.onNotesFilterChanged(this.onNoteFilterChanged),
            this.viewData.onNotesPhaseChanged(this.onNotesPhaseChanged),
          ),
            (this.registered = !0);
        }
        async parseNotes() {
          const e = [],
            t = [];
          return (
            this.notesData.iterate((i) => {
              i.comments.forEach((i) => {
                const n = this.getUserMentionsAndHashtags(i.text);
                n.emails.forEach((t) => {
                  e.push({ email: t, userStatus: b.J.MENTIONED });
                }),
                  t.push(...n.hashtags);
              });
            }),
            this.hashtagData.addHashtags(t),
            this.engine.commandBinder.issueCommand(new T.Vu(e))
          );
        }
        async parseMarkdown(e) {
          const t = [],
            i = this.getUserMentionsAndHashtags(e);
          return (
            i.emails.forEach((e) => {
              t.push({ email: e, userStatus: b.J.MENTIONED });
            }),
            this.hashtagData.addHashtags(i.hashtags),
            this.engine.commandBinder.issueCommand(new T.Vu(t))
          );
        }
        getUserMentionsAndHashtags(e) {
          const t = [],
            i = [];
          for (const n of this.textParser.parse(e))
            n.blockType === u.C.USER && n.value
              ? t.push(n.value)
              : n.blockType === u.C.HASH && i.push(n.text);
          return { emails: t, hashtags: i };
        }
        closeNoteBillboard() {
          const { billboardAnnotation: e } = this.annotationsViewData;
          e &&
            e.annotationType === B.J.NOTE &&
            this.engine.commandBinder.issueCommand(new L.Aj(e.id, B.J.NOTE));
        }
        openAnnotation(e, t) {
          t
            ? this.engine.commandBinder.issueCommand(new L.bd(e, B.J.NOTE))
            : this.engine.commandBinder.issueCommand(new L.oM(e, B.J.NOTE));
        }
        in360View() {
          const e = this.sweepData.currentSweep ? this.sweepData.currentSweep : '';
          return this.viewmodeData.isInside() && this.sweepData.isSweepUnaligned(e);
        }
        async closeNote() {
          var e;
          const { commandBinder: t } = this.engine,
            { openNoteView: i, notesPhase: n } = this.viewData;
          if (
            (this.viewData.setActiveNotation(null),
            this.viewData.setOpenNoteView(null),
            this.viewData.setFocusedComment(null),
            n !== W.U.CLOSED && this.changeNotesPhase(W.U.IDLE),
            i)
          ) {
            const n = i.id;
            this.cancelAttachmentChanges(),
              t.issueCommand(new Me.IL(null)),
              t.issueCommand(new G.xW(!1));
            const s = this.notesData.getNote(n);
            s &&
              (t.issueCommand(new N.RH(n, R.Er.NOTE)),
              t.issueCommand(
                new N.ik(n, R.Er.NOTE, this.getNoteVisibility(n, s.layerId, i.resolved)),
              ));
            (null === (e = this.annotationsViewData.dockedAnnotation) || void 0 === e
              ? void 0
              : e.annotationType) === B.J.NOTE && (await t.issueCommand(new L.JD()));
          }
        }
        updateNoteViewData() {
          this.viewData.updateNoteViews();
        }
        getFilteredNoteIds(e) {
          const t = [];
          return (
            this.notesData.iterate((i) => {
              this.getNoteVisibility(i.id, i.layerId, i.resolved) === e && t.push(i.id);
            }),
            t
          );
        }
        getNoteVisibility(e, t, i) {
          if (!this.settingsData.tryGetProperty(q.Mp, !1)) return !1;
          const {
              notesFilter: n,
              openNoteView: s,
              idVisibilityEnabled: a,
              idVisibility: o,
            } = this.viewData,
            r = this.appData.application === Ne.Mx.WORKSHOP || this.layersData.layerToggled(t),
            d = this.layersData.layerVisible(t),
            c = (null == s ? void 0 : s.id) === e,
            l = !a || o.has(e),
            h = n === $.$.ALL || (i && n === $.$.RESOLVED) || (!i && n === $.$.OPEN);
          return r && (c || (h && l && d));
        }
        displayNotes() {
          const e = [];
          this.notesData.iterate((t) => {
            const i = this.getPinUpdate(t);
            e.push(i);
          }),
            e.length && this.engine.commandBinder.issueCommand(new N.mE(e));
        }
        updateNotePin(e) {
          const t = this.getPinUpdate(e);
          this.engine.commandBinder.issueCommand(new N.mE([t]));
        }
        getPinUpdate(e) {
          const {
            id: t,
            layerId: i,
            resolved: n,
            anchorPosition: s,
            color: a,
            stemEnabled: o,
            floorId: r,
            roomId: d,
            stemNormal: c,
            stemLength: l,
          } = e;
          return {
            id: t,
            anchorPosition: s,
            color: a,
            floorId: r,
            roomId: d,
            stemEnabled: o,
            stemNormal: c,
            stemLength: l,
            pinType: R.Er.NOTE,
            backgroundTexture: this.backgroundTexture,
            icon: R.Qk[R.Er.NOTE],
            visible: this.getNoteVisibility(t, i, n),
          };
        }
        removeNotePin(e) {
          this.engine.commandBinder.issueCommand(new N.OL(e.id, R.Er.NOTE));
        }
        async confirmAttachmentChanges(e, t) {
          return this.engine.commandBinder.issueCommand(new G.iu(e, o.ud.COMMENT, t));
        }
        async cancelAttachmentChanges() {
          return this.engine.commandBinder.issueCommand(new G.Ze());
        }
        updatePendingNote() {
          const e = this.viewData.getPendingNote(),
            t = this.appData.application === Ne.Mx.WORKSHOP;
          e &&
            t &&
            !this.layersData.isInMemoryLayer(e.layerId) &&
            (e.layerId = this.layersData.getNotesLayerId(t));
        }
        setFocusedNoteComment(e, t) {
          if (t) {
            const i = this.viewData.getComment(e, t);
            this.viewData.setFocusedComment(i);
          } else this.viewData.setFocusedComment(null);
        }
        async openNote(e, t, i, n, s) {
          var a;
          const r =
              (null === (a = this.annotationsViewData.dockedAnnotation) || void 0 === a
                ? void 0
                : a.annotationType) === B.J.NOTE,
            d = null !== i ? i : r;
          return (
            this.engine.commandBinder.issueCommand(new Me.IL(e, o.SF.NOTE)),
            d ? this.dockNote(e, t, n, s) : this.selectNote(e, t, n)
          );
        }
        async selectNote(e, t, i) {
          var n;
          const { commandBinder: s } = this.engine;
          this.setFocusedNoteComment(e, i);
          const a = this.viewData.getNoteView(e);
          if (a) {
            const { openNoteView: i } = this.viewData,
              o = (null == i ? void 0 : i.id) === e,
              r =
                (null === (n = this.annotationsViewData.dockedAnnotation) || void 0 === n
                  ? void 0
                  : n.id) === e;
            if (o && !r && i) return void this.log.debug('Note is already selected');
            this.activated && (await s.issueCommand(new g.CH(p.w1.NOTES))),
              s.issueCommand(new G.xW(!1)),
              i &&
                (s.issueCommand(new L.Aj(i.id, B.J.NOTE)),
                s.issueCommand(new N.RH(i.id, R.Er.NOTE))),
              this.viewData.setOpenNoteView(a),
              await s.issueCommand(new N.Ar(e, R.Er.NOTE, !1)),
              null !== t && (await s.issueCommand(new k.OR({ pinPosition: a, transition: t })));
          } else this.log.debug('Cannot select a non-existent note');
        }
        async dockNote(e, t, i, n = !1) {
          var s;
          const { toolsData: a, viewData: o, engine: r, activated: d, userData: c } = this,
            l = o.getNoteView(e);
          if (l) {
            const { openNoteView: h, focusedComment: u } = this.viewData,
              m = (null == h ? void 0 : h.id) === e,
              v =
                (null === (s = this.annotationsViewData.dockedAnnotation) || void 0 === s
                  ? void 0
                  : s.id) === e;
            if (
              (a.toolCollapsed && r.commandBinder.issueCommand(new g.Fg(!1)),
              this.setFocusedNoteComment(e, i),
              m && v)
            )
              return void (
                o.focusedComment &&
                i !== (null == u ? void 0 : u.id) &&
                this.engine.broadcast(new re(o.focusedComment.id))
              );
            r.commandBinder.issueCommand(new f.r()),
              d || (await r.commandBinder.issueCommand(new g.z2(p.w1.NOTES, !0))),
              m || o.setOpenNoteView(l);
            const y = H(c, B.J.NOTE, l.user);
            if (
              (r.commandBinder.issueCommand(new N.Ar(e, R.Er.NOTE, y)),
              this.changeNotesPhase(W.U.OPENING),
              null !== t &&
                (await r.commandBinder.issueCommand(new k.OR({ pinPosition: l, transition: t }))),
              this.changeNotesPhase(W.U.OPEN),
              n)
            ) {
              const t = l.comments.get(0);
              let n = i ? o.getComment(e, i) : void 0;
              if ((n || (n = t), !n)) throw new Error('No root comment in the note');
              const s = H(c, B.J.NOTE, n.user);
              o.setActiveNotation(s ? n.id : null);
            } else o.setActiveNotation(null);
          } else this.log.debug('Cannot open a non-existent note');
        }
        async resolveNote(e) {
          const t = this.notesData.getNote(e);
          if (t) {
            if (t.resolved) return;
            this.closeNote(), await (0, c.gw)(350), this.engine.broadcast(new oe(e, !0));
            !!this.layersData.isInMemoryLayer(t.layerId) ||
            (await this.store.updateResolution(e, !0))
              ? this.notesData.updateNoteProperties(e, { resolved: !0 })
              : this.log.error('Resolving note failed');
          } else this.log.debug('Cannot resolve a non-existent note');
        }
        async reopenNote(e) {
          const t = this.notesData.getNote(e);
          if (t) {
            if (!t.resolved) return;
            this.viewData.updateOpenNoteView({ resolved: !1 });
            !!this.layersData.isInMemoryLayer(t.layerId) ||
            (await this.store.updateResolution(e, !1))
              ? this.notesData.updateNoteProperties(e, { resolved: !1 })
              : this.log.error('Reopen note failed');
          } else this.log.debug('Cannot reopen a non-existent note');
        }
        modifyInsideSaveCommand(e) {
          return async (...t) => {
            await this.engine.commandBinder.issueCommand(
              new _e.V({ dataTypes: [He.g.NOTES], onCallback: () => e(...t), skipDirtyUpdate: !0 }),
            );
          };
        }
        async updateNoteComment(e, t, i) {
          const n = this.notesData.getNote(e);
          if (n) {
            const s = this.layersData.isInMemoryLayer(n.layerId),
              a = n.getComment(t);
            if (a)
              if (a.user.id === this.userData.getCurrentUserId()) {
                const r = !s && (await this.confirmAttachmentChanges(t, o.ud.COMMENT)),
                  d = i !== a.text;
                if (d) {
                  if (s) a.text = i;
                  else {
                    const e = await this.store.updateComment({ id: t, text: i });
                    e && n.updateComment(e);
                  }
                  this.parseMarkdown(i);
                }
                (r || d) &&
                  (await this.refreshNote(n.id),
                  n.resolved && (this.viewData.setNotesFilter($.$.ALL), this.reopenNote(e))),
                  this.viewData.setActiveNotation(null);
              } else this.log.debug("Cannot update another user's comment");
            else this.log.debug('Cannot update a non-existent comment');
          } else this.log.debug('Cannot update a comment in a non-existent note');
        }
        registerRoomAssociationSource(e) {
          const t = this.notesData;
          e.commandBinder.issueCommandWhenBound(
            new Ge.I({
              type: 'notes',
              getPositionId: function* () {
                for (const e of t.collection.values)
                  yield {
                    id: e.id,
                    roomId: e.roomId,
                    floorId: e.floorId,
                    position: e.anchorPosition,
                    layerId: e.layerId,
                  };
              },
              updateRoomForId: (e, t) => {
                const i = this.notesData.getNote(e);
                if (!i) throw new Error('Invalid note id!');
                i.roomId = t || void 0;
              },
            }),
          );
        }
      }
      const Ss = Os;
    },
    27445: (e, t, i) => {
      'use strict';
      i.d(t, { h: () => a });
      var n = i(42141),
        s = i(42896);
      class a extends n.V {
        constructor() {
          super(), (this.name = 'object-tags'), (this.suggestions = (0, s.q)());
        }
        get collection() {
          return this.suggestions;
        }
        iterate(e) {
          for (const t of this.suggestions) e(t);
        }
        getObjectTag(e) {
          return this.suggestions.get(e);
        }
        getObjectTagIds() {
          return this.suggestions.keys;
        }
        updateObjectTag(e) {
          this.suggestions.set(e.id, e);
        }
        removeObjectTag(e) {
          return this.suggestions.delete(e);
        }
      }
    },
    72153: (e, t, i) => {
      'use strict';
      i.d(t, {
        AN: () => s,
        I2: () => l,
        OD: () => h,
        Q_: () => r,
        SO: () => c,
        cO: () => d,
        w$: () => o,
        yJ: () => a,
      });
      var n = i(56063);
      class s extends n.m {
        constructor(e) {
          super(), (this.payload = { enabled: e });
        }
      }
      s.id = 'OBJECTS_ANNOTATIONS_ENABLED';
      class a extends n.m {
        constructor(e) {
          super(), (this.payload = { ids: e });
        }
      }
      a.id = 'FILTER_TAG_SUGGESTION';
      class o extends n.m {
        constructor(e) {
          super(), (this.payload = { id: e });
        }
      }
      o.id = 'NAVIGATE_TO_TAG_SUGGESTION';
      class r extends n.m {
        constructor(e, t) {
          super(), (this.payload = { id: e, enabled: t });
        }
      }
      r.id = 'TOGGLE_OBJECT_ENABLED';
      class d extends n.m {
        constructor(e, ...t) {
          super(), (this.payload = { ids: t, enabled: e });
        }
      }
      d.id = 'TOGGLE_OBJECT_TAG_ENABLED';
      class c extends n.m {
        constructor(...e) {
          super(), (this.payload = { ids: e });
        }
      }
      c.id = 'DISMISS_OBJECT_TAG';
      class l extends n.m {
        constructor(e, t, i, n) {
          super(), (this.payload = { id: e, options: t, pendingAttachments: i, embed: n });
        }
      }
      l.id = 'CREATE_OBJECT_TAG';
      class h extends n.m {
        constructor(e) {
          super(), (this.payload = { id: e });
        }
      }
      h.id = 'DOCK_OBJECT_TAG';
    },
    35934: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => ve });
      var n = i(933),
        s = i(4763),
        a = i(81396),
        o = i(80383),
        r = i(37137),
        d = i(35659),
        c = i(90288),
        l = i(38063),
        h = i(46629),
        u = i(94989),
        m = i(83730),
        p = i(73515),
        g = i(12925),
        v = i(72153),
        y = i(27445),
        f = i(24938),
        w = i(20348),
        b = i(32137),
        T = i(73521),
        C = i(40232),
        E = i(16896);
      function D(e) {
        const t = e.toLowerCase().replace(' & ', ' ').replace(' ', '-');
        return E.g.includes(`object-${t}`) ? `object-${t}` : 'simple-tag-small';
      }
      class x extends T.K {
        constructor(e, t, i, n, s) {
          var a, r, d;
          super(e, t, i),
            (this.suggestion = n),
            (this.mattertag = s),
            (this.id = this.suggestion.id),
            (this.title = this.suggestion.displayLabel),
            (this.description = this.suggestion.displayCategory),
            (this.icon = `icon-${D(this.suggestion.displayLabel)}`),
            (this.color = this.suggestion.color),
            (this.enabled = this.suggestion.visible),
            (this.typeId = o.SF.OBJECTANNOTATION),
            (this.floorId = this.suggestion.floorId),
            (this.roomId = this.suggestion.roomId || ''),
            (this.dateBucket = (0, C.f)(this.suggestion.created)),
            (this.layerId = this.suggestion.layerId),
            (this.onSelect = () => {
              super.onSelect(), this.commandBinder.issueCommand(new v.w$(this.suggestion.id));
            }),
            (this.title = (null === (a = this.mattertag) || void 0 === a ? void 0 : a.label)
              ? this.mattertag.label
              : this.suggestion.displayLabel),
            (this.description = (
              null === (r = this.mattertag) || void 0 === r ? void 0 : r.description
            )
              ? this.mattertag.description
              : this.suggestion.displayCategory),
            (this.color = (null === (d = this.mattertag) || void 0 === d ? void 0 : d.color)
              ? `#${this.mattertag.color.getHexString()}`
              : this.suggestion.color);
        }
        supportsLayeredCopyMove() {
          return !0;
        }
        supportsBatchDelete() {
          return !0;
        }
      }
      var A = i(85893),
        O = i(67294),
        S = i(29707),
        P = i(7321),
        I = i(78897),
        k = i(25100),
        N = i(80308),
        R = i(58131);
      const { WORKSHOP: M, HIDE: j, SHOW: L } = P.Z;
      function B({ item: e, onToggle: t }) {
        const { commandBinder: i } = (0, O.useContext)(S.I),
          n = (0, I.b)(),
          { enabled: s, id: a, typeId: o } = e,
          r = !e.isLayerVisible(),
          d = !s || r ? 'eye-hide' : 'eye-show',
          c = (0, R.k)(),
          l = r ? n.t(M.LAYERS.HIDDEN_LAYER_ITEM_TOOLTIP) : s ? n.t(j) : n.t(L);
        return (0, A.jsx)(N.zx, {
          icon: d,
          dimmed: !s,
          variant: N.Wu.TERTIARY,
          onClick: (e) => {
            e.stopPropagation(), r || (s && c === a && i.issueCommand(new b.IL(null, o)), t(!s));
          },
          tooltip: l,
        });
      }
      const { OBJECT_TAG_SUGGESTION: V } = P.Z.WORKSHOP,
        F = ({ item: e }) => {
          const { id: t, typeId: i } = e,
            { analytics: n, commandBinder: s, editMode: a } = (0, O.useContext)(S.I),
            r = (0, I.b)();
          if (!a || i !== o.SF.OBJECTANNOTATION) return null;
          function d(e) {
            n.track('showcase_gui', { tool: 'object_tags', gui_action: e });
          }
          return (0, A.jsxs)(N.hE, {
            children: [
              (0, A.jsx)(B, {
                item: e,
                onToggle: (e) => {
                  s.issueCommand(new v.Q_(t, e)),
                    d(e ? 'object_tags_show_click' : 'object_tags_hide_click');
                },
              }),
              (0, A.jsxs)(
                N.xz,
                Object.assign(
                  {
                    icon: 'more-vert',
                    ariaLabel: r.t(P.Z.MORE_OPTIONS),
                    menuArrow: !0,
                    menuClassName: 'search-result-menu',
                  },
                  {
                    children: [
                      (0, A.jsx)(N.zx, {
                        label: r.t(V.SEARCH_ITEM_EDIT),
                        onClick: () => {
                          s.issueCommand(new b.IL(t, i)),
                            s.issueCommand(new v.OD(t)),
                            d('object_tags_edit_click');
                        },
                        variant: N.Wu.TERTIARY,
                        size: N.qE.SMALL,
                      }),
                      (0, A.jsx)(N.zx, {
                        className: 'menu-delete-btn',
                        label: r.t(V.SEARCH_ITEM_DELETE),
                        onClick: () => {
                          s.issueCommand(new v.SO(t)),
                            s.issueCommand(new u.OL(t, h.Er.OBJECT)),
                            s.issueCommand(new p.Aj(t, k.J.OBJECT)),
                            d('object_tags_delete_click');
                        },
                        variant: N.Wu.TERTIARY,
                        size: N.qE.SMALL,
                      }),
                    ],
                  },
                ),
              ),
            ],
          });
        };
      var _ = i(67951);
      const { OBJECT_TAG_SUGGESTION: H } = P.Z.WORKSHOP,
        U = ({ group: e }) => {
          const { analytics: t, commandBinder: i, editMode: n } = (0, O.useContext)(S.I),
            s = (0, I.b)(),
            a = (0, _._)(),
            { matches: o } = e;
          if (!n) return null;
          if (0 === o.length) return null;
          const r = o.filter((e) => e.enabled).length,
            d = r === o.length,
            c = 0 === r;
          function l(e) {
            t.track('showcase_gui', { tool: 'object_tags', gui_action: e });
          }
          const h = !a || !a.canBatchDeleteInActiveView();
          return (0, A.jsx)(N.hE, {
            children: (0, A.jsxs)(
              N.xz,
              Object.assign(
                {
                  icon: 'more-vert',
                  ariaLabel: s.t(P.Z.MORE_OPTIONS),
                  menuArrow: !0,
                  menuClassName: 'search-result-menu',
                },
                {
                  children: [
                    (0, A.jsx)(N.zx, {
                      label: s.t(H.SEARCH_GROUP_HIDE_ALL),
                      onClick: () => {
                        i.issueCommand(new v.cO(!1, ...o.map((e) => e.id))), l('hide_all_click');
                      },
                      variant: N.Wu.TERTIARY,
                      size: N.qE.SMALL,
                      disabled: c,
                    }),
                    (0, A.jsx)(N.zx, {
                      label: s.t(H.SEARCH_GROUP_SHOW_ALL),
                      onClick: () => {
                        i.issueCommand(new v.cO(!0, ...o.map((e) => e.id))), l('show_all_click');
                      },
                      variant: N.Wu.TERTIARY,
                      size: N.qE.SMALL,
                      disabled: d,
                    }),
                    h &&
                      (0, A.jsx)(N.zx, {
                        className: 'menu-delete-btn',
                        label: s.t(H.SEARCH_GROUP_DELETE_ALL),
                        onClick: () => {
                          i.issueCommand(new v.SO(...o.map((e) => e.id))), l('delete_all_click');
                        },
                        variant: N.Wu.TERTIARY,
                        size: N.qE.SMALL,
                      }),
                  ],
                },
              ),
            ),
          });
        };
      var G = i(69665),
        z = i(32197),
        W = i(93797),
        $ = i(5494),
        K = i(64831);
      const Z = 0.065;
      class Y extends K.T {
        constructor(e) {
          super(),
            (this.created = new Date()),
            (this.modified = new Date()),
            (this.position = new a.Vector3()),
            (this.stemDirection = new a.Vector3()),
            (this.stemLength = Z),
            (this.stemEnabled = !1),
            (this.enabled = !0),
            (this.icon = 'simple-tag'),
            e &&
              (Object.assign(this, e),
              (this.keywords = e.keywords || []),
              this.label && (this.icon = D(this.label)));
        }
        get displayLabel() {
          return this.localizedName ? this.localizedName : this.label;
        }
        get displayCategory() {
          return this.localizedCategory ? this.localizedCategory : '';
        }
        get visible() {
          return this.enabled;
        }
        set visible(e) {
          (this.enabled = e), this.commit();
        }
        getMattertagOptions() {
          return {
            color: new a.Color(this.color),
            description: this.displayCategory,
            enabled: !0,
            floorId: this.floorId,
            roomId: this.roomId,
            label: this.displayLabel,
            normal: this.stemDirection.clone(),
            objectAnnotationId: this.id,
            position: this.position.clone(),
            stemHeight: this.stemLength,
            stemVisible: !0,
            keywords: this.keywords.slice(),
            icon: this.icon,
          };
        }
        getPin(e) {
          return {
            id: this.id,
            floorId: this.floorId,
            anchorPosition: this.position.clone(),
            stemNormal: this.stemDirection.clone(),
            stemEnabled: !1,
            stemLength: Z,
            color: e ? `#${e.color.getHexString()}` : this.color,
            roomId: this.roomId,
            icon: this.icon,
          };
        }
        toTagView(e) {
          return {
            id: this.id,
            label: e ? e.label : this.displayLabel,
            description: e ? e.description : this.displayCategory,
            enabled: this.enabled,
            backgroundTexture: ge,
            attachments: (null == e ? void 0 : e.fileAttachments.values()) || [],
            created: this.created,
            modified: this.modified,
            stemEnabled: this.stemEnabled,
            color: this.color,
            anchorPosition: this.position.clone(),
            stemNormal: this.stemDirection.clone(),
            stemLength: this.stemLength,
            floorId: this.floorId,
            roomId: this.roomId,
            layerId: this.layerId,
            keywords: e ? (null == e ? void 0 : e.keywords.slice()) : this.keywords.slice(),
            icon: this.icon,
          };
        }
      }
      var J,
        q = i(38256),
        Q = i(53257);
      !(function (e) {
        (e.APPLIANCE = 'Appliance'),
          (e.CONSUMER_ELECTRONICS = 'Consumer Electronics'),
          (e.FIXTURE = 'Fixture'),
          (e.FURNITURE = 'Furniture'),
          (e.LIGHTING = 'Lighting');
      })(J || (J = {}));
      const X = Object.freeze({
          pink: '#f78da7',
          plum: '#9c4b92',
          purple: '#673ab7',
          teal: '#03687d',
          cerulean: '#03a9f4',
          ocean: '#00bcd4',
          fog: '#abb8c3',
          iron: '#607d8b',
          forest: '#417505',
          emerald: '#51a868',
          mint: '#37d67a',
          lime: '#cddc39',
          canary: '#fbcd00',
          sunflower: '#ffac17',
          tangerine: '#ff6900',
          sunset: '#f44336',
          sierra: '#d44441',
          magenta: '#e91e63',
        }),
        ee = 'WORKSHOP.OBJECT_TAG_SUGGESTION.VISION.';
      class te {
        constructor(e) {
          (this.locale = e),
            (this.locale = e),
            (this.log = new Q.Z('Object-tag-deserializer')),
            (this.keywordList = Object.values(J));
        }
        deserialize(e) {
          var t, i, n, s;
          if (!e || !this.validate(e)) return null;
          const a = e.region,
            o = (null == a ? void 0 : a.anchorPosition)
              ? z.ep.fromVisionVector(a.anchorPosition)
              : void 0,
            r = (null == a ? void 0 : a.stemNormal) ? z.ep.fromVisionVector(a.stemNormal) : void 0,
            d = new Y({
              id: e.id,
              confidence: null !== (t = e.confidence) && void 0 !== t ? t : 0,
              created: (0, q.p)(e.created),
              modified: (0, q.p)(e.created),
              enabled: e.enabled,
            });
          (null === (i = e.region) || void 0 === i ? void 0 : i.stemLength) &&
            (d.stemLength = e.region.stemLength),
            e.floor && e.floor.id && (d.floorId = e.floor.id),
            e.room && e.room.id && (d.roomId = e.room.id),
            e.layer && e.layer.id && (d.layerId = e.layer.id),
            o && (d.position = o),
            r && (d.stemDirection = r),
            (d.mattertagId = null === (n = e.tag) || void 0 === n ? void 0 : n.id);
          let c = e.keywords || [],
            l = e.label || '';
          if (e.classification) {
            const t = e.classification,
              i = ee + this.formatStringToPhraseKey(t.label);
            this.locale.has(i) && (d.localizedName = this.locale.t(i));
            const { defaultKeywords: n } = t;
            if (n && n.length > 0) {
              const e = n[n.length - 1],
                t = ee + this.formatStringToPhraseKey(e);
              this.locale.has(t) && (d.localizedCategory = this.locale.t(t));
            }
            t.label && ((l = t.label), (d.icon = D(l))),
              t.defaultKeywords && (c = t.defaultKeywords);
            const s = [];
            for (const e of c) {
              const t = ee + this.formatStringToPhraseKey(e);
              this.locale.has(t) ? s.push(this.locale.t(t)) : s.push(e);
            }
            c = s;
          }
          return (
            (d.keywords = c),
            (d.label = l),
            this.postProcess(
              d,
              null === (s = e.classification) || void 0 === s ? void 0 : s.defaultKeywords,
            ),
            d
          );
        }
        formatStringToPhraseKey(e) {
          return e.trim().replace(/\s/, '_').toUpperCase();
        }
        validate(e) {
          if (!e) return !1;
          const t = ['id', 'label', 'created', 'modified', 'region'];
          for (const i of t) {
            if (!(i in e)) return this.log.error('Missing field: ', i), !1;
          }
          return !0;
        }
        postProcess(e, t) {
          let [i, n] = e.label.split('.').slice(1);
          if (i && !e.localizedCategory) {
            const t = ee + i.toUpperCase();
            this.locale.has(t)
              ? (e.localizedCategory = this.locale.t(t))
              : (e.localizedCategory = i);
          }
          if (n && !e.localizedName) {
            const t = ee + n.toUpperCase();
            this.locale.has(t) ? (e.localizedName = this.locale.t(t)) : (e.localizedName = n);
          }
          if (t && t.length > 0)
            for (const e of this.keywordList)
              if (t.includes(e)) {
                i = e;
                break;
              }
          e.color = this.getCategoryColor(i);
        }
        getCategoryColor(e) {
          switch (e) {
            case 'appliances':
              return X.cerulean;
            case 'consumer_electronics':
              return X.emerald;
            case 'fixtures':
              return X.sunset;
            case J.APPLIANCE:
              return X.cerulean;
            case J.CONSUMER_ELECTRONICS:
              return X.emerald;
            case J.FIXTURE:
              return X.sunset;
            case J.FURNITURE:
              return X.canary;
            case J.LIGHTING:
              return X.fog;
            default:
              return X.forest;
          }
        }
      }
      class ie extends W.u {
        constructor(e, t, i) {
          super(e),
            (this.classifications = []),
            (this.layeredType = o.SF.OBJECTANNOTATION),
            (this.confidence = i || 0.9),
            (this.objectDeserializer = new te(t)),
            (this.deserializer = new $.o({ deserializer: this.objectDeserializer }));
        }
        async read(e) {
          const t = {
            modelId: this.getViewId(),
            minConfidence: this.confidence,
            includeDisabled: !0,
            inferenceEvents: null,
            ids: null,
            includeLayers: this.readLayerId(),
          };
          return this.query(G.GetObjectAnnotations, t, e).then((e) => {
            var t, i;
            const n =
              null ===
                (i =
                  null === (t = null == e ? void 0 : e.data) || void 0 === t ? void 0 : t.model) ||
              void 0 === i
                ? void 0
                : i.objectAnnotations;
            if (!n || !Array.isArray(n)) return null;
            return (this.deserializer.deserialize(n) || []).reduce(
              (e, t) => ((e[t.id] = t), e),
              {},
            );
          });
        }
        async toggleEnabled(e, t) {
          const i = {
            modelId: this.getViewId(),
            objectAnnotationId: e,
            data: { enabled: t },
            includeLayers: this.readLayerId(),
          };
          return this.mutate(G.PatchObjectAnnotation, i).then((e) => {
            var t;
            const i = null === (t = e.data) || void 0 === t ? void 0 : t.patchObjectAnnotation;
            if (i) {
              const e = this.objectDeserializer.deserialize(i);
              if (e) return e;
            }
            throw new Error('Could not update Object Annotation');
          });
        }
        async toggleAllEnabled(e, ...t) {
          const i = {
            modelId: this.getViewId(),
            objectAnnotationIds: t,
            setEnabled: e,
            includeLayers: this.readLayerId(),
          };
          return this.mutate(G.SetBulkObjectAnnotationsEnabled, i).then((e) => {
            var t;
            const i =
              null === (t = null == e ? void 0 : e.data) || void 0 === t
                ? void 0
                : t.setBulkObjectAnnotationsEnabled;
            if (!i) throw new Error('Could not update Object Annotations');
            return i.map((e) => e.id);
          });
        }
        async deleteObjectAnnotation(e) {
          const t = { modelId: this.getViewId(), objectAnnotationId: e };
          return this.mutate(G.DeleteObjectAnnotation, t).then((e) => {
            var t;
            return !!(null === (t = null == e ? void 0 : e.data) || void 0 === t
              ? void 0
              : t.deleteObjectAnnotation);
          });
        }
        async createObjectTag(e) {
          const t = {
              label: e.label,
              keywords: e.keywords || [],
              floorId: e.floorId,
              layerId: this.writeLayerId(e.layerId) ? e.layerId : void 0,
              enabled: !0,
              vectorRegion: {
                anchorPosition: z.ep.toVisionVector(e.position),
                stemNormal: z.ep.toVisionVector(e.stemDirection),
                stemLength: e.stemLength,
              },
            },
            i = {
              modelId: this.getViewId(),
              objectAnnotation: t,
              includeLayers: this.readLayerId(),
            };
          return this.mutate(G.AddObjectAnnotation, i).then((e) => {
            var t;
            const i =
              null === (t = null == e ? void 0 : e.data) || void 0 === t
                ? void 0
                : t.addObjectAnnotation;
            if (i) {
              const e = this.objectDeserializer.deserialize(i);
              if (e) return e;
            }
            throw new Error('Could not create Object Annotation');
          });
        }
      }
      var ne = i(71472);
      const se = i.p + 'images/objectColor.png';
      var ae = i(47149),
        oe = i(10163),
        re = i(62603),
        de = i(28721),
        ce = i(10306),
        le = i(92257),
        he = i(27163),
        ue = i(93412),
        me = i(22925),
        pe = i(35922);
      const ge = (0, ne.p)(se);
      class ve extends n.Y {
        constructor() {
          super(...arguments),
            (this.name = 'object-tag-suggestions-data'),
            (this.visibilityEnabled = !1),
            (this.idVisibility = new Set()),
            (this.createdTag = null),
            (this.onPinSelectionChange = (e) => {
              const { commandBinder: t } = this.engine,
                { billboardAnnotation: i } = this.annotationsViewData,
                n = e ? this.data.getObjectTag(e) : null;
              n
                ? (t.issueCommand(new b.IL(n.id, o.SF.OBJECTANNOTATION)),
                  t.issueCommand(new p.Kw(n.id, k.J.OBJECT)))
                : i &&
                  i.annotationType === k.J.OBJECT &&
                  t.issueCommand(new p.Aj(i.id, k.J.OBJECT));
            }),
            (this.onPinFocusChange = async () => {
              const { commandBinder: e } = this.engine,
                { focusedPin: t, selectedPinId: i } = this.pinsViewData,
                { billboardAnnotation: n, dockedAnnotation: s } = this.annotationsViewData;
              if (!t)
                return void (
                  n &&
                  n.annotationType === k.J.OBJECT &&
                  n.id !== i &&
                  (await e.issueCommand(new p.Aj(n.id, k.J.OBJECT)))
                );
              const a = i ? this.pinsViewData.getPin(i) : null;
              a &&
                a.pinType === h.Er.OBJECT &&
                (e.issueCommand(new u.RH(a.id, h.Er.OBJECT)), e.issueCommand(new b.IL(null))),
                t.pinType === h.Er.OBJECT &&
                  t.id !== (null == s ? void 0 : s.id) &&
                  e.issueCommand(new p.Kw(t.id, k.J.OBJECT));
            }),
            (this.onLayersChanged = () => {
              this.unselectObjectPin(), this.unselectObjectSearchResult(), this.displayObjects();
            }),
            (this.toggleObjectAnnotations = async (e) => {
              const { enabled: t } = e;
              (this.visibilityEnabled = t),
                this.engine.commandBinder.issueCommand(new u.qN(h.Er.OBJECT, t)),
                t || (this.unselectObjectPin(), this.unselectObjectSearchResult()),
                this.displayObjects();
            }),
            (this.selectedItemChanged = () => {
              const { activeItemId: e, selectedType: t } = this.searchData;
              if (e && t === o.SF.OBJECTANNOTATION) {
                const t = this.data.getObjectTag(e);
                t && this.updatePin(t);
              }
            }),
            (this.setAllObjectTagsEnabled = async (e) => {
              const { ids: t, enabled: i } = e;
              0 !== t.length &&
                (await this.store.toggleAllEnabled(i, ...t),
                this.data.atomic(() => {
                  for (const e of this.data.collection)
                    t.includes(e.id) && ((e.enabled = i), e.commit());
                }),
                this.unselectObjectPin(),
                this.unselectObjectSearchResult());
            }),
            (this.toggleObjectTagEnabled = async (e) => {
              const { id: t, enabled: i } = e,
                n = this.data.getObjectTag(t);
              if (!n) throw new Error('Object tag not found!');
              if (n.enabled === i) return;
              (await this.store.toggleEnabled(t, i)) &&
                ((n.enabled = i),
                n.commit(),
                this.unselectObjectPin(t),
                this.unselectObjectSearchResult(t));
            }),
            (this.deleteTags = async (e) => {
              const { ids: t } = e;
              if (0 === t.length) return;
              const i = this.annotationsViewData.billboardAnnotation;
              (null == i ? void 0 : i.annotationType) === k.J.OBJECT &&
                this.engine.commandBinder.issueCommand(new p.Aj(i.id, i.annotationType));
              for (const e of t) {
                if (!(await this.store.deleteObjectAnnotation(e)))
                  throw new Error('Could not delete Object Annotation');
                {
                  this.data.removeObjectTag(e);
                  const t = this.data.getObjectTag(e);
                  t &&
                    t.mattertagId &&
                    (await this.engine.commandBinder.issueCommand(
                      new re.T3(t.mattertagId, 'search_menu_object_tag'),
                    ));
                }
              }
            }),
            (this.createObjectTag = async (e) => {
              const { id: t, options: i, pendingAttachments: n, embed: s } = e,
                r = new Y(),
                d = null == i ? void 0 : i.color,
                c = d ? `#${new a.Color(d.r, d.g, d.b).getHexString()}` : '#ffffff';
              if (
                ((r.label = i.label || ''),
                (r.floorId = i.floorId || ''),
                (r.keywords = i.keywords || []),
                (r.stemDirection = i.normal || new a.Vector3()),
                (r.stemLength = i.stemHeight ? Math.max(i.stemHeight, Z) : Z),
                (r.position = i.position || new a.Vector3()),
                (r.color = c),
                (r.layerId = this.layersData.activeLayerId),
                await this.modifyInsideSaveCommand(async () => {
                  this.createdTag = await this.store.createObjectTag(r);
                })(),
                !this.createdTag)
              )
                return;
              const l = this.createdTag.id,
                { commandBinder: m } = this.engine;
              (i.objectAnnotationId = l),
                await m.issueCommand(new re.QG(t, i, n, void 0, s)),
                (this.createdTag.mattertagId = t),
                this.data.updateObjectTag(this.createdTag);
              const p = this.getPinUpdate(this.createdTag);
              (this.createdTag = null),
                m.issueCommand(new u.tE(l, h.Er.OBJECT, p)),
                await m.issueCommand(new le.CH(he.w1.TAGS)),
                m.issueCommand(new ue.M()),
                await m.issueCommand(new le.z2(he.w1.LAYERS)),
                m.issueCommand(new ue.I()),
                m.issueCommand(new b.IL(l, o.SF.OBJECTANNOTATION)),
                await m.issueCommand(new v.w$(l));
            }),
            (this.dockObjectTag = async (e) => {
              const { id: t } = e,
                i = this.data.getObjectTag(t);
              if (!i) return;
              const { commandBinder: n } = this.engine;
              if (!i.mattertagId) {
                const e = i.getMattertagOptions(),
                  t = (0, de.O1)(11);
                n.issueCommand(new ce.Mm(t, e)), (i.mattertagId = t);
              }
              n.issueCommand(new re.lt(i.mattertagId, { dock: !0, objectTag: !0 }));
            });
        }
        async init(e, t) {
          super.init(e, t),
            (this.engine = t),
            ([
              this.locale,
              this.pinsViewData,
              this.annotationsViewData,
              this.mattertagsData,
              this.layersData,
              this.searchData,
              this.appData,
            ] = await Promise.all([
              t.getModuleBySymbol(s.e9),
              t.market.waitForData(m.B),
              t.market.waitForData(g.A),
              t.market.waitForData(oe.n),
              t.market.waitForData(me.R),
              t.market.waitForData(ae.T),
              t.market.waitForData(f.pu),
            ])),
            (this.store = new ie(
              { context: this.layersData.mdsContext, readonly: !1, baseUrl: e.baseUrl },
              this.locale,
              e.minConfidence,
            )),
            this.engine.commandBinder.issueCommand(new u.qN(h.Er.OBJECT, !1)),
            (this.data = new y.h()),
            this.store.onNewData(this.loadNewData.bind(this));
          const { commandBinder: i } = this.engine;
          this.bindings.push(
            i.addBinding(v.AN, this.toggleObjectAnnotations),
            i.addBinding(v.yJ, async (e) => this.filterObjectTagSuggestions(e.ids)),
            i.addBinding(v.w$, async ({ id: e }) => this.navigateToSuggestion(e)),
            i.addBinding(v.cO, this.modifyInsideSaveCommand(this.setAllObjectTagsEnabled)),
            i.addBinding(v.Q_, this.modifyInsideSaveCommand(this.toggleObjectTagEnabled)),
            i.addBinding(v.SO, this.modifyInsideSaveCommand(this.deleteTags)),
            i.addBinding(v.I2, this.createObjectTag),
            i.addBinding(v.OD, async (e) => this.dockObjectTag(e)),
            this.appData.onChanged(() => this.displayObjects()),
            this.layersData.onCurrentLayersChanged(this.onLayersChanged),
            this.searchData.onPropertyChanged('activeItemId', this.selectedItemChanged),
            this.pinsViewData.onSelectedPinChanged(this.onPinSelectionChange),
            this.pinsViewData.onFocusedPinChanged(() => this.onPinFocusChange()),
            this.data.onChanged(() => this.displayObjects()),
            this.data.collection.onElementChanged({
              onAdded: this.updatePin.bind(this),
              onUpdated: this.updatePin.bind(this),
              onRemoved: this.removePin.bind(this),
            }),
          ),
            await this.store.refresh(),
            this.engine.market.register(this, y.h, this.data),
            this.registerRoomAssociationSource(t),
            (async function (e, t, i, n) {
              const s = await e.market.waitForData(f.pu);
              let a = s.application === f.Mx.WORKSHOP;
              const r = (s, o, r, c = []) => {
                  const l = [];
                  return (
                    t.iterate((t) => {
                      if (!(a || (t.visible && n.layerToggled(t.layerId)))) return;
                      const r = [t.displayLabel, t.displayCategory],
                        d = [...t.keywords],
                        h = t.mattertagId ? i.getTag(t.mattertagId) : void 0;
                      h &&
                        ((r.length = 0),
                        (d.length = 0),
                        r.push(h.label, h.description),
                        d.push(...h.keywords));
                      const u = r.filter((e) => !!e);
                      let m = s(...u);
                      m && c.length > 0 && (m = d.length > 0 && d.some((e) => c.includes(e))),
                        m && l.push(new x(e.commandBinder, n, o, t, h));
                    }),
                    e.commandBinder.issueCommand(new v.yJ(l.map((e) => e.id))),
                    d(l),
                    l
                  );
                },
                d = (e) => {
                  e.sort((e, t) => {
                    var i;
                    const n = e,
                      s = t,
                      a =
                        null === (i = n.description) || void 0 === i
                          ? void 0
                          : i.localeCompare(s.description);
                    return 0 !== a ? a : n.title.localeCompare(s.title);
                  });
                },
                c = (t) => {
                  e.commandBinder.issueCommand(new v.AN(!!t));
                },
                l = () => {
                  let e = [];
                  return (
                    t.iterate((t) => {
                      t.visible &&
                        t.keywords.length &&
                        !t.mattertagId &&
                        (e = e.concat(t.keywords));
                    }),
                    e
                  );
                },
                h = (e) => new w.V(t.onChanged(e), i.onChanged(e)),
                u = () => {
                  e.commandBinder.issueCommandWhenBound(
                    new b.c6({
                      id: o.SF.OBJECTANNOTATION,
                      groupPhraseKey: 'WORKSHOP.OBJECT_TAG_SUGGESTION.SEARCH_GROUP_HEADER',
                      getSimpleMatches: r,
                      registerChangeObserver: h,
                      onSearchActivatedChanged: c,
                      getKeywords: l,
                      groupOrder: 90,
                      groupIcon: 'snap',
                      groupActionsFC: U,
                      itemActionsFC: F,
                      batchSupported: !0,
                    }),
                  );
                },
                m = () => {
                  e.commandBinder.issueCommandWhenBound(new b.Pe(o.SF.OBJECTANNOTATION));
                },
                p = { renew: u, cancel: m },
                g = (e) => {
                  (a = e === f.Mx.WORKSHOP), m(), u();
                },
                y = s.onPropertyChanged('application', g);
              return g(s.application), new w.V(p, y);
            })(t, this.data, this.mattertagsData, this.layersData).then((e) =>
              this.bindings.push(e),
            );
        }
        loadNewData(e) {
          this.data.atomic(() => {
            this.layersData.replaceBackendLayers(this.data.collection, e || {});
          });
        }
        dispose(e) {
          super.dispose(e), this.data && e.market.unregister(this, y.h);
        }
        modifyInsideSaveCommand(e) {
          return async (...t) => {
            await this.engine.commandBinder.issueCommand(
              new r.V({
                dataTypes: [d.g.OBJECT_ANNOTATIONS],
                onCallback: () => e(...t),
                skipDirtyUpdate: !0,
              }),
            );
          };
        }
        displayObjects() {
          const e = [];
          this.data.collection.values.forEach((t) => {
            e.push(this.getPinUpdate(t));
          }),
            this.engine.commandBinder.issueCommand(new u.mE(e));
        }
        removePin(e) {
          this.engine.commandBinder.issueCommand(new u.OL(e.id, h.Er.OBJECT));
        }
        updatePin(e) {
          const t = this.getPinUpdate(e);
          this.engine.commandBinder.issueCommand(new u.mE([t]));
        }
        getPinUpdate(e) {
          const t = this.mattertagsData.getTag(e.mattertagId || ''),
            i = e.getPin(t);
          return Object.assign(
            {
              id: e.id,
              pinType: h.Er.OBJECT,
              backgroundTexture: ge,
              visible: this.getObjectVisibility(e.id, e.layerId, e.visible),
              scale: new a.Vector3(0.75, 0.75, 0.75),
            },
            i,
          );
        }
        getObjectVisibility(e, t, i) {
          if (!this.visibilityEnabled) return !1;
          const { activeItemId: n, selectedType: s } = this.searchData,
            a = this.appData.application === f.Mx.WORKSHOP || this.layersData.layerToggled(t),
            r = this.layersData.layerVisible(t),
            d = this.idVisibility.has(e),
            c = n === e && s === o.SF.OBJECTANNOTATION;
          return a && (c || (i && d && r));
        }
        async filterObjectTagSuggestions(e) {
          this.idVisibility.clear(),
            e.forEach((e) => this.idVisibility.add(e)),
            this.displayObjects();
        }
        async navigateToSuggestion(e) {
          const t = this.data.getObjectTag(e);
          if (!t) return;
          const i = {
            anchorPosition: t.position.clone(),
            stemNormal: t.stemDirection.clone(),
            stemLength: t.stemLength,
            stemEnabled: !0,
            color: '',
            floorId: t.floorId,
            roomId: t.roomId,
          };
          await this.engine.commandBinder.issueCommand(
            new l.OR({ pinPosition: i, transition: c.nF.FadeToBlack }),
          ),
            this.engine.commandBinder.issueCommand(new u.Ar(e, h.Er.OBJECT, !1));
        }
        unselectObjectPin(e) {
          const { selectedPinId: t } = this.pinsViewData;
          if (t) {
            const i = this.pinsViewData.getPin(t);
            i &&
              (i.pinType !== h.Er.OBJECT ||
                (e && e !== t) ||
                this.engine.commandBinder.issueCommand(new u.RH(t, h.Er.OBJECT)));
          }
        }
        unselectObjectSearchResult(e) {
          const { selectedType: t, activeItemId: i } = this.searchData;
          i &&
            t === o.SF.OBJECTANNOTATION &&
            ((e && e !== i) || this.engine.commandBinder.issueCommand(new b.IL(null)));
        }
        registerRoomAssociationSource(e) {
          const t = this.data;
          e.commandBinder.issueCommandWhenBound(
            new pe.I({
              type: 'objectAnnotations',
              getPositionId: function* () {
                for (const e of t.collection.values) yield e;
              },
              updateRoomForId: (e, i) => {
                const n = t.getObjectTag(e);
                if (!n) throw new Error('Invalid object detection id!');
                n.roomId = i || void 0;
              },
            }),
          );
        }
      }
    },
    21286: (e, t, i) => {
      'use strict';
      i.d(t, { W: () => a });
      var n = i(42141),
        s = i(42896);
      class a extends n.V {
        constructor(e) {
          super(), (this.name = 'ordered-list-data'), (this.lists = (0, s.q)(e));
        }
        replace(e) {
          this.lists.replace(e);
        }
        getOrderedLists() {
          return this.lists.values;
        }
        getOrderedList(e) {
          return this.lists.get(e);
        }
        updateOrderedList(e) {
          this.lists.has(e.name) ? this.lists.get(e.name).copy(e) : this.lists.set(e.name, e);
        }
      }
    },
    19272: (e, t, i) => {
      'use strict';
      i.d(t, { Bd: () => a, ui: () => o, wg: () => s });
      var n = i(56063);
      class s extends n.m {
        constructor(e, t) {
          super(), (this.payload = { name: e, entries: t });
        }
      }
      s.id = 'ORDERED_LIST_NAMED_SAVE';
      class a extends n.m {
        constructor(e, t) {
          super(), (this.payload = { name: e, entries: t });
        }
      }
      a.id = 'ORDERED_LIST_CREATE';
      class o extends n.m {
        constructor(e, t, i) {
          super(), (this.payload = { id: e, name: t, entries: i });
        }
      }
      o.id = 'ORDERED_LIST_UPDATE';
    },
    63160: (e, t, i) => {
      'use strict';
      var n;
      i.d(t, { l: () => n }),
        (function (e) {
          e.TAG = 'tag';
        })(n || (n = {}));
    },
    8154: (e, t, i) => {
      'use strict';
      i.r(t),
        i.d(t, {
          CreateOrderedListCommand: () => b.Bd,
          MdsOrderedListDeserializer: () => v,
          MdsOrderedListStore: () => f,
          OrderedList: () => d,
          OrderedListData: () => w.W,
          OrderedListEntryType: () => E.l,
          SaveNamedOrderedListCommand: () => b.wg,
          TAG_ORDERED_LIST_NAME: () => D.q,
          UpdateOrderedListCommand: () => b.ui,
          default: () => x,
        });
      var n = i(933),
        s = i(4763),
        a = i(35659),
        o = i(37137),
        r = i(64831);
      class d extends r.T {
        constructor(e) {
          super(),
            (this.id = ''),
            (this.name = ''),
            (this.description = ''),
            (this.entries = []),
            (this.layerId = ''),
            e && Object.assign(this, e);
        }
        copy(e) {
          return (
            (this.id = e.id),
            (this.name = e.name),
            e.description && (this.description = e.description),
            (this.entries = e.entries.slice()),
            this.commit(),
            this
          );
        }
      }
      var c = i(93797),
        l = i(79978),
        h = i(71439),
        u = i(99793),
        m = i(53257),
        p = i(22001);
      const g = new m.Z('ordered-list-deserializer');
      class v {
        deserialize(e) {
          var t, i, n;
          return e && this.validate(e)
            ? new d({
                id: e.id,
                name: null !== (t = e.label) && void 0 !== t ? t : '',
                layerId:
                  null !== (n = null === (i = e.layer) || void 0 === i ? void 0 : i.id) &&
                  void 0 !== n
                    ? n
                    : '',
                entries: e.entries.filter((e) => !!e).map((e) => ({ id: e.id, type: e.type })),
              })
            : (g.debug('Deserialized invalid ordered list data from Mds', e), null);
        }
        validate(e) {
          return ['id', 'label', 'entries'].every((t) => t in e);
        }
      }
      const y = new m.Z('MdsOrderedListStore');
      class f extends c.u {
        constructor(e) {
          super(e), (this.prefetchKey = 'data.model.orderedLists'), (this.deserializer = new v());
        }
        async read() {
          const e = { modelId: this.getViewId(), includeLayers: this.readLayerId() };
          return this.query(p.GetOrderedLists, e).then((e) => {
            var t, i;
            const n =
              null === (i = null === (t = e.data) || void 0 === t ? void 0 : t.model) ||
              void 0 === i
                ? void 0
                : i.orderedLists;
            if (!n || !Array.isArray(n)) return y.debug('GetOrderedLists failed'), {};
            return n.reduce((e, t) => {
              const i = this.deserializer.deserialize(t);
              return (
                i &&
                  (e[i.name] && y.debug(`Duplicate orderedList found with label: ${i.name}`),
                  (e[i.name] = i)),
                e
              );
            }, {});
          });
        }
        async create(e, t) {
          return 0 === e.length ? [] : Promise.all(e.map((e) => this.createOrderedList(e, t)));
        }
        async createOrderedList(e, t) {
          var i;
          const n = {
            modelId: this.getViewId(),
            label: e.name,
            description: e.description,
            entries: e.entries,
            includeLayers: this.readLayerId(),
          };
          let s;
          if (t && this.writeLayerId(t)) {
            const e = Object.assign({ layerId: t }, n);
            s = await this.mutate(p.AddOrderedListWithLayer, e).catch((e) => {
              throw new l.w0(e);
            });
          } else
            s = await this.mutate(p.AddOrderedList, n).catch((e) => {
              throw new l.w0(e);
            });
          if (null === (i = s.data) || void 0 === i ? void 0 : i.addOrderedList) {
            const e = this.deserializer.deserialize(s.data.addOrderedList);
            if (e)
              return e.layerId && (await this.context.updateForAutoProvisionedLayer(e.layerId)), e;
          }
          throw new Error('Unable to create new OrderedList');
        }
        async update(e) {
          if (0 === e.length) return;
          const t = this.getViewId();
          let i = '';
          const n = {};
          n.modelId = t;
          let s = '';
          for (const t of e) {
            const e = t.id;
            (i += `\n        , $label${e}: String!\n        , $description${e}: String!\n        , $entries${e}: [EntryInput!]\n      `),
              (n[`label${e}`] = t.name),
              (n[`description${e}`] = t.description),
              (n[`entries${e}`] = t.entries),
              (s += `\n        update${e}:\n        patchOrderedList(modelId: $modelId,\n                         orderedListId: "${e}",\n                         label: $label${e},\n                         description: $description${e},\n                         entries: $entries${e}) {\n          id\n          label\n          entries {\n            id\n            type\n          }\n        }\n      `);
          }
          const a = h.gql`
      mutation orderedListsUpdate($modelId: ID! ${i}) {
        ${s}
      }
    `;
          return this.mutate(a, n).then((e) => {
            y.debug(
              Object.assign({ type: 'patchOrderedList' }, Object.values((0, u.q)(e, 'data'))),
            );
          });
        }
      }
      var w = i(21286),
        b = i(19272),
        T = i(22925);
      class C extends n.Y {
        constructor() {
          super(...arguments),
            (this.name = 'ordered-lists'),
            (this.saveNamedOrderedList = async (e) => {
              const { name: t, entries: i } = e;
              let n = this.data.getOrderedList(t);
              return (
                n ? (n.entries = i) : (n = new d({ name: t, entries: i })),
                this.data.updateOrderedList(n),
                this.engine.commandBinder.issueCommand(new o.V({ dataTypes: [a.g.ORDERED_LISTS] }))
              );
            });
        }
        async init(e, t) {
          const { baseUrl: i, workshop: n } = e;
          if (
            ((this.engine = t),
            (this.layersData = await t.market.waitForData(T.R)),
            (this.store = new f({ context: this.layersData.mdsContext, baseUrl: i, readonly: !n })),
            this.bindings.push(
              this.store.onNewData(async (e) => {
                this.data.replace(e);
              }),
            ),
            (this.data = new w.W({})),
            await this.store.refresh(),
            n)
          ) {
            const e = await t.getModuleBySymbol(s.Lx);
            this.bindings.push(
              t.commandBinder.addBinding(b.wg, this.saveNamedOrderedList),
              e.onSave(() => this.save(), { dataType: a.g.ORDERED_LISTS }),
            );
          }
          t.market.register(this, w.W, this.data);
        }
        dispose(e) {
          this.store.dispose(), super.dispose(e);
        }
        onUpdate() {}
        async save() {
          const e = this.data.getOrderedLists(),
            t = [],
            i = [];
          e.forEach((e) => {
            '' === e.id ? t.push(e) : i.push(e);
          });
          return Promise.all([
            this.store.create(t, this.layersData.getOrderedListsLayerId()),
            this.store.update(i),
          ]).then((e) => {
            e[0].forEach((e) => {
              e && this.data.updateOrderedList(e);
            });
          });
        }
      }
      var E = i(63160),
        D = i(96263);
      const x = C;
    },
    96263: (e, t, i) => {
      'use strict';
      i.d(t, { q: () => n });
      const n = 'mp.tags';
    },
    81619: (e, t, i) => {
      'use strict';
      i.d(t, { O8: () => r, SI: () => s, WI: () => d, uQ: () => a, zf: () => o });
      var n = i(43627);
      const s = 1e3 / 60,
        a = (0, n.Id)(70),
        o = -a,
        r = 0.05,
        d = 0.1 / 60;
    },
    56253: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => E, lookAccelerationKey: () => C });
      var n = i(81396),
        s = i(3835),
        a = i(81619),
        o = i(2897),
        r = i(96783),
        d = i(68467),
        c = i(93827);
      class l extends d.Z {
        constructor(e) {
          super(),
            (this.cameraPoseProxy = e),
            (this.lookVelocity = new n.Vector2()),
            (this.lookAccel = new n.Vector2()),
            (this.tempAxis = new n.Vector3()),
            (this.tempOrientation = new n.Quaternion()),
            (this.currentOrientation = new n.Quaternion()),
            (this.tempEuler = new n.Euler()),
            (this.transition = {
              active: !1,
              startTime: 0,
              elapsed: 0,
              duration: 0,
              velocity: new n.Vector2(),
              easeOut: !1,
            });
        }
        setController(e) {
          return null == e && this.stop(), super.setController(e);
        }
        setLookAcceleration(e, t = !1) {
          this.transition.active ||
            (t &&
              (e.x &&
                this.lookVelocity.x &&
                Math.sign(e.x) !== Math.sign(this.lookVelocity.x) &&
                (this.lookVelocity.x = 0),
              e.y &&
                this.lookVelocity.y &&
                Math.sign(e.y) !== Math.sign(this.lookVelocity.y) &&
                (this.lookVelocity.y = 0)),
            (this.lookAccel.x = void 0 !== e.x ? e.x : this.lookAccel.x),
            (this.lookAccel.y = void 0 !== e.y ? e.y : this.lookAccel.y));
        }
        startTransition(e, t, i) {
          var n;
          const s = new c.Q();
          return (
            (this.transition.active = !0),
            (this.transition.duration = e),
            (this.transition.elapsed = 0),
            (this.transition.startTime = Date.now()),
            (this.transition.deferred = s),
            this.transition.velocity.copy(t),
            (this.transition.easeOut = i),
            this.lookAccel.set(0, 0),
            this.lookVelocity.copy(t),
            null === (n = this.poseController) || void 0 === n || n.beginExternalTransition(),
            s.promise()
          );
        }
        stopTransition() {
          var e;
          this.transition.active &&
            (null === (e = this.poseController) || void 0 === e || e.endExternalTransition(),
            (this.transition.active = !1)),
            this.transition.deferred &&
              (this.transition.deferred.resolve(), (this.transition.deferred = void 0));
        }
        updateTransition(e) {
          const t = e / a.SI;
          if (
            (this.lookVelocity.copy(this.transition.velocity),
            (this.transition.elapsed += e),
            this.transition.elapsed >= this.transition.duration)
          ) {
            const t = this.transition.duration - (this.transition.elapsed - e);
            this.lookVelocity.multiplyScalar(t / e);
          } else this.lookVelocity.multiplyScalar(t);
        }
        updateCameraParameters() {
          var e;
          const t = this.cameraPoseProxy.pose;
          this.tempEuler.setFromQuaternion(t.rotation, 'YXZ');
          const i = this.tempEuler.x,
            n = (0, r.uZ)(this.lookVelocity.y, a.zf - i, a.uQ - i);
          this.tempAxis.copy(s.fU.RIGHT),
            this.tempOrientation.setFromAxisAngle(this.tempAxis.applyQuaternion(t.rotation), n),
            this.currentOrientation.copy(t.rotation).premultiply(this.tempOrientation),
            this.tempOrientation.setFromAxisAngle(s.fU.UP, this.lookVelocity.x),
            this.currentOrientation.premultiply(this.tempOrientation),
            t.rotation.equals(this.currentOrientation) ||
              (this.tempOrientation.copy(this.currentOrientation).normalize(),
              null === (e = this.poseController) ||
                void 0 === e ||
                e.updateCameraRotation(this.tempOrientation));
        }
        update(e) {
          const t = this.cameraPoseProxy.pose,
            i = e / a.SI;
          t.rotation.equals(this.currentOrientation) || this.currentOrientation.copy(t.rotation),
            this.transition.active
              ? (this.updateTransition(e),
                this.updateCameraParameters(),
                this.transition.elapsed >= this.transition.duration &&
                  (this.stop(this.transition.easeOut), (this.transition.active = !1)))
              : (this.lookAccel.length() > o.Z.epsilon ||
                  this.lookVelocity.length() > o.Z.epsilon) &&
                (this.lookVelocity.addScaledVector(this.lookAccel, i),
                this.updateCameraParameters(),
                this.lookVelocity.multiplyScalar(Math.pow(1 - a.O8, i)));
        }
        stop(e = !1) {
          this.stopTransition(), this.lookAccel.set(0, 0), e || this.lookVelocity.set(0, 0);
        }
        startRotateTransition(e, t, i) {
          return (
            this.beforeStartRotationTransition && this.beforeStartRotationTransition(),
            this.startTransition(e, t.clone().multiplyScalar(a.SI), i).nativePromise()
          );
        }
        startTranslateTransition(e, t, i = !0) {
          throw new Error("Panning isn't supported in Panorama Controls");
        }
        startZoomTransition(e, t, i) {
          throw new Error("Zooming isn't supported in Panorama Controls");
        }
      }
      var h = i(55574),
        u = i(43017),
        m = i(40333),
        p = i(20360),
        g = i(69947),
        v = i(95840),
        y = i(31971),
        f = i(64150),
        w = i(4763),
        b = i(57793),
        T = i(3433);
      const C = 'Rotation speed';
      class E extends T.Z {
        constructor() {
          super(...arguments),
            (this.name = 'panorama-controls'),
            (this.controlsEngaged = !1),
            (this.lookAccelerationSpeed = a.WI),
            (this.calcRotationAngle = (() => {
              const e = new n.Matrix4(),
                t = new n.Vector3(),
                i = new n.Vector3();
              return (s, a) => {
                e.copy(this.cameraData.pose.projection.asThreeMatrix4()),
                  e.invert(),
                  t.set(s.x - a.x, s.y - a.y, -1).applyMatrix4(e),
                  i.set(s.x, s.y, -1).applyMatrix4(e);
                const o = Math.sqrt(t.x * t.x + t.z * t.z),
                  r = Math.sqrt(i.x * i.x + i.z * i.z),
                  d = Math.atan2(t.y, o),
                  c = Math.atan2(i.y, r) - d;
                (t.y = 0), (i.y = 0), t.normalize(), i.normalize();
                const l = Math.acos(t.dot(i));
                let h = 0;
                return isNaN(l) || ((h = l), a.x > 0 && (h *= -1)), new n.Vector2(-h, -c);
              };
            })());
        }
        async init(e, t) {
          const i = await t.getModuleBySymbol(w.Ng);
          (this.controls = new l(i.cameraPoseProxy)),
            (this.cameraData = await t.market.waitForData(b.M));
          const n = this.cameraData;
          (this.controls.beforeStartRotationTransition = () => {
            n.transition &&
              n.transition.activeInternal &&
              n.transition.to.rotation &&
              (n.transition.to.rotation = void 0);
          }),
            i.addControls(u.Ey.Panorama, this.controls),
            i.addControls(u.Ey.Mesh, this.controls),
            (this.market = t.market),
            this.registerActiveStateChangeBinding(),
            t.getModuleBySymbol(w.PZ).then((e) => {
              e.registerHandler(v.E0, (e) => {
                this.shouldBeActive() && this.controls.stop();
              }),
                e.registerHandler(v._t, (e) => {
                  this.shouldBeActive() &&
                    e.buttons & m.r.PRIMARY &&
                    ((this.controlsEngaged = !0),
                    this.onDrag(e.position, e.delta),
                    this.controls.update(a.SI),
                    this.controls.stop());
                }),
                e.registerHandler(v._R, (e) => {
                  this.shouldBeActive() &&
                    this.controlsEngaged &&
                    (e.timeSinceLastMove < 100 &&
                      !(e.buttons & m.r.PRIMARY) &&
                      (this.onDrag(e.position, e.delta),
                      this.controls.update(a.SI),
                      this.controls.setLookAcceleration({ x: 0, y: 0 })),
                    (this.controlsEngaged = !1));
                }),
                e.registerHandler(y.e, (e) => {
                  this.shouldBeActive() && this.onKey(e.key, e.state);
                }),
                this.updateInputBindings();
            });
        }
        onUpdate(e) {
          this.shouldBeActive() && this.controls.update(e);
        }
        onDrag(e, t) {
          this.controls.setLookAcceleration(this.calcRotationAngle(e, t));
        }
        onKey(e, t) {
          var i, n;
          const s =
            null !==
              (n =
                null === (i = this.market.tryGetData(f.e)) || void 0 === i
                  ? void 0
                  : i.tryGetProperty(C, null)) && void 0 !== n
              ? n
              : null;
          this.lookAccelerationSpeed = s ? (s * (Math.PI / 180)) / 60 : this.lookAccelerationSpeed;
          const a = t === g.M.DOWN;
          switch (e) {
            case p.R.LEFTARROW:
            case p.R.J:
              this.controls.setLookAcceleration({ x: a ? this.lookAccelerationSpeed : 0 }, !0);
              break;
            case p.R.RIGHTARROW:
            case p.R.L:
              this.controls.setLookAcceleration({ x: a ? -this.lookAccelerationSpeed : 0 }, !0);
              break;
            case p.R.K:
              this.controls.setLookAcceleration({ y: a ? -this.lookAccelerationSpeed : 0 }, !0);
              break;
            case p.R.I:
              this.controls.setLookAcceleration({ y: a ? this.lookAccelerationSpeed : 0 }, !0);
          }
        }
        shouldBeActive() {
          var e, t;
          return (
            null !==
              (t = !(null === (e = this.market.tryGetData(h.Z)) || void 0 === e
                ? void 0
                : e.isVR())) &&
            void 0 !== t &&
            t
          );
        }
      }
    },
    43255: (e, t, i) => {
      'use strict';
      i.d(t, { O: () => f });
      var n = i(85893),
        s = i(50652),
        a = i(81396),
        o = i(67294),
        r = i(94184),
        d = i.n(r),
        c = i(29707),
        l = i(27946),
        h = i(7321),
        u = i(91774),
        m = i(17106),
        p = i(80308),
        g = i(45796);
      function v(e) {
        const {
            label: t,
            className: i,
            darkTheme: s,
            analyticAction: a,
            urlParams: r,
            includeCameraView: v,
            buttonVariant: y,
          } = e,
          {
            analytics: f,
            engine: w,
            editMode: b,
            locale: T,
            market: C,
            settings: E,
          } = (0, o.useContext)(c.I),
          [D, x] = (0, o.useState)(!1),
          A = b || E.tryGetProperty(u.Yo, !1),
          O = (0, m.e)(),
          S = (0, o.useCallback)((e) => {
            e.stopPropagation();
          }, []),
          P = (0, o.useCallback)(
            (e) => {
              e.stopPropagation(),
                D ||
                  (!(async function (e, t) {
                    const i = (
                      await t.getModuleBySymbol(g.DeepLinksModuleKey)
                    ).creator.createDeepLink({
                      additionalParams: e,
                      paramFilter: (e) =>
                        ![
                          'q',
                          'qK',
                          'qF',
                          'tag',
                          'note',
                          'comment',
                          'pin-pos',
                          'cloudEdit',
                        ].includes(e),
                    });
                    (i.hash = ''), (0, l.v)(i.href);
                  })(r, w),
                  x(!0),
                  f.trackGuiEvent(a, { tool: O }));
            },
            [r, D, x, f, b, v, C],
          );
        (0, o.useEffect)(() => {
          if (!D) return () => {};
          const e = window.setTimeout(() => x(!1), 2500);
          return () => window.clearTimeout(e);
        }, [D]);
        let I = y || (!t ? p.Wu.FAB : p.Wu.TERTIARY),
          k = 'share',
          N = t,
          R = t ? void 0 : T.t(h.Z.COPY_LINK),
          M = !1;
        return (
          D &&
            ((I = p.Wu.TERTIARY),
            (k = void 0),
            (N = T.t(h.Z.SHARE_COPIED)),
            (R = void 0),
            (M = !0)),
          A
            ? (0, n.jsx)(
                'div',
                Object.assign(
                  { className: d()('url-link-copy', i, { 'link-copied': D }), onClick: S },
                  {
                    children: (0, n.jsx)(p.zx, {
                      icon: k,
                      label: N,
                      size: p.qE.SMALL,
                      variant: I,
                      theme: s ? 'dark' : 'light',
                      disabled: M,
                      tooltip: R,
                      tooltipOptions: { placement: 'bottom' },
                      onClick: P,
                    }),
                  },
                ),
              )
            : null
        );
      }
      var y = function (e, t) {
        var i = {};
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (i[n] = e[n]);
        if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
          var s = 0;
          for (n = Object.getOwnPropertySymbols(e); s < n.length; s++)
            t.indexOf(n[s]) < 0 &&
              Object.prototype.propertyIsEnumerable.call(e, n[s]) &&
              (i[n[s]] = e[n[s]]);
        }
        return i;
      };
      function f(e) {
        const { prefix: t, pin: i, id: o } = e,
          r = y(e, ['prefix', 'pin', 'id']),
          { stemNormal: d, stemLength: c, anchorPosition: l } = i,
          h = {
            [`${t}`]: o,
            'pin-pos': s.K.encodeVector3(new a.Vector3().copy(d).setLength(c).add(l)),
          };
        return (0, n.jsx)(v, Object.assign({ urlParams: h }, r));
      }
    },
    26143: (e, t, i) => {
      'use strict';
      i.d(t, { v: () => a });
      var n = i(67294),
        s = i(38210);
      function a() {
        const e = (0, s.P)(),
          [t, i] = (0, n.useState)((null == e ? void 0 : e.screenPosition) || null);
        return (
          (0, n.useEffect)(() => {
            if (!e) return () => {};
            const t = e.onScreenPositionChanged(i);
            return i(e.screenPosition), () => t.cancel();
          }, [e]),
          t
        );
      }
    },
    38210: (e, t, i) => {
      'use strict';
      i.d(t, { P: () => a });
      var n = i(38908),
        s = i(83730);
      const a = (0, n.u)(s.B);
    },
    73225: (e, t, i) => {
      'use strict';
      i.r(t),
        i.d(t, {
          CancelNewPinCommand: () => K.tT,
          ChangePinOpacityByTypeCommand: () => K.kb,
          ChangePinOpacityCommand: () => K._Y,
          ChangePinOpacityScaleCommand: () => K.nP,
          ChangePinVisibilityByTypeCommand: () => K.qN,
          ChangePinVisibilityCommand: () => K.ik,
          ClearPinSelectionCommand: () => K.iK,
          ClickOffPinCommand: () => K.yR,
          CreatePinCommand: () => K.fM,
          EnablePinCreationCommand: () => K.Ki,
          MovePinCommand: () => K.I$,
          NewPinReadyMessage: () => Z.cd,
          PinAddCancelledMessage: () => Z.hu,
          PinAnchorMesh: () => $,
          PinClickedMessage: () => Z.F7,
          PinColorVariant: () => F.K_,
          PinEditor: () => X,
          PinEditorState: () => F.V8,
          PinHeadMesh: () => _.$,
          PinHoverChangeMessage: () => Z.tP,
          PinMovedMessage: () => Z.bV,
          PinPlacedMessage: () => Z.b0,
          PinPlacementCancelledMessage: () => Z.pe,
          PinPreviewDirection: () => F.Od,
          PinRenderer: () => le,
          PinType: () => F.Er,
          PinsViewData: () => C.B,
          PlacePinCommand: () => K.ip,
          RemovePinCommand: () => K.OL,
          RemovePinsByTypeCommand: () => K.zM,
          SelectPinCommand: () => K.Ar,
          TogglePinEditingCommand: () => K.ic,
          UnselectPinCommand: () => K.RH,
          UpdatePinCommand: () => K.tE,
          UpdatePinViewsCommand: () => K.mE,
          default: () => Oe,
        });
      var n = i(81396),
        s = i(933),
        a = i(4763),
        o = i(11250),
        r = i(61173),
        d = i(24938),
        c = i(23998),
        l = i(60937),
        h = i(55574),
        u = i(57793),
        m = i(31740),
        p = i(90512),
        g = i(43017),
        v = i(59536),
        y = i(74094),
        f = i(945),
        w = i(68687),
        b = i(87549),
        T = i(3189),
        C = i(83730),
        E = i(20348),
        D = i(58066),
        x = i(49940);
      var A = i(26302),
        O = i(53257),
        S = i(21676),
        P = i(41513),
        I = i(40333),
        k = i(59228),
        N = i(79242),
        R = i(95840),
        M = i(11798),
        j = i(31971),
        L = i(67781),
        B = i(69947),
        V = i(20360),
        F = i(46629),
        _ = i(25525),
        H = i(72803),
        U = i(71472);
      const G = i.p + 'images/pinAnchor.png';
      var z = i(84373),
        W = i(26059);
      class $ extends n.Mesh {
        constructor(e) {
          super(
            new n.PlaneGeometry(z.Z.anchor.size, z.Z.anchor.size),
            new n.MeshBasicMaterial({
              depthTest: !1,
              depthWrite: !1,
              transparent: !0,
              map: $.getTexture(),
              side: n.DoubleSide,
            }),
          ),
            (this.visible = !1),
            (this.layers.mask = e.mask),
            (this.renderOrder = H.z.pins),
            (this.worldPosition = new n.Vector3());
        }
        update(e, t, i) {
          const n = z.Z.pinHeadMesh.scale;
          this.getWorldPosition(this.worldPosition);
          const s = (0, W.W3)(this.worldPosition, e, t, i, n);
          this.scale.set(s, s, s);
        }
        static getTexture() {
          return $.anchorTexture || ($.anchorTexture = (0, U.p)(G)), $.anchorTexture;
        }
      }
      var K = i(94989),
        Z = i(44009),
        Y = i(17295),
        J = i(62900),
        q = i(38063),
        Q = i(41946);
      class X {
        constructor(e, t, i, s) {
          (this.viewData = e),
            (this.engine = t),
            (this.input = i),
            (this.pinRenderer = s),
            (this.editEnabled = !1),
            (this.handlersRegistered = !1),
            (this.bindings = []),
            (this.externalBehaviorsBlocked = !1),
            (this.touchDevice = (0, r.Jm)()),
            (this.longPressCreateThreshold = 500),
            (this.ndcPoint = new n.Vector3()),
            (this.movingPin = !1),
            (this.anchored = !1),
            (this.inAnchorClick = !1),
            (this.startingPinData = void 0),
            (this.log = new O.Z('pin-editor')),
            (this.stopEventPropagation = () => !0),
            (this.updateMeshPreviewSphere = async (e, t) => {
              this.engine.commandBinder.issueCommand(new Q.n(e, t));
            }),
            (this.startPinCreation = () => {
              this.editEnabled &&
                (this.addingHandlers.renew(),
                this.touchDevice || this.engine.commandBinder.issueCommand(new y.u(f.C.XHAIR)),
                this.engine.commandBinder.issueCommand(new J.ZD()));
            }),
            (this.endPinCreation = () => {
              this.editEnabled &&
                (this.draggingHandlers.cancel(),
                this.addingHandlers.cancel(),
                this.clearLongPressTimeout(),
                this.allowExternalBehaviors(!0),
                this.engine.commandBinder.issueCommand(new y.u(f.C.DEFAULT)),
                this.engine.commandBinder.issueCommand(new J.zd()));
            }),
            (this.onSelectedPinChanged = () => {
              const { selectedPinId: e } = this.viewData;
              e ? this.selectedHandlers.renew() : this.selectedHandlers.cancel(),
                this.updateAnchorMesh();
            }),
            (this.onPinStateUpdated = () => {
              const e = this.viewData.pinEditorState;
              switch ((this.updateAnchorMesh(), e)) {
                case F.V8.PLACING:
                  this.draggingHandlers.renew();
                  break;
                case F.V8.IDLE:
                  this.allowExternalBehaviors(!0);
              }
            }),
            (this.updateAnchorMesh = () => {
              if (!this.editEnabled) return;
              const { pinEditorState: e, isPinEditable: t, selectedPinId: i } = this.viewData,
                n = i ? this.viewData.getPin(i) : null;
              n && e !== F.V8.CREATING
                ? ([F.V8.PLACING, F.V8.PLACED].includes(e) || t
                    ? (this.pinRenderer.showAnchorMesh(n.pinType, n.id, n), (this.anchored = !0))
                    : this.removePinAnchorMesh(),
                  this.editableSelectedHandlers.renew())
                : (this.editableSelectedHandlers.cancel(),
                  this.anchored && this.removePinAnchorMesh(),
                  this.updateMeshPreviewSphere(!1));
            }),
            (this.clearLongPressTimeout = () => {
              (this.longPressStart = 0),
                -1 !== this.longPressTimeout && window.clearTimeout(this.longPressTimeout),
                (this.longPressTimeout = -1);
            }),
            (this.placePin = () => {
              this.viewData.pinEditorState === F.V8.PLACING &&
                (this.engine.commandBinder.issueCommand(new y.u(f.C.DEFAULT)),
                this.engine.commandBinder.issueCommand(new K.ip()),
                this.engine.broadcast(new Z.cd()),
                this.updateMeshPreviewSphere(!1));
            }),
            (this.onDragEvent = (e) => {
              (e.buttons !== I.r.PRIMARY && (this.touchDevice || this.viewData.selectedPinId)) ||
                this.positionPin(e);
            }),
            (this.onDragEnd = (e) => {
              const { creatingNewPin: t, pinEditorState: i, selectedPinId: n } = this.viewData,
                s = n ? this.viewData.getPin(n) : null;
              (t && !this.touchDevice && i === F.V8.PLACING) ||
                (s &&
                  !t &&
                  (this.engine.commandBinder.issueCommand(
                    new K.I$(s.id, this.copyPinData(s), this.startingPinData),
                  ),
                  this.updateMeshPreviewSphere(!1)),
                this.doneMovingPin(),
                (this.inAnchorClick = !1));
            }),
            (this.positionPin = (() => {
              const e = new n.Vector3();
              return async (t) => {
                if (this.touchDevice && t.buttons !== I.r.PRIMARY) return !1;
                const i = this.viewData,
                  { pinEditorState: n, selectedPinId: s } = i;
                if (n === F.V8.CREATING) this.engine.commandBinder.issueCommand(new v.y(!0));
                else if (n !== F.V8.PLACING && !this.movingPin) return !1;
                const a = s ? i.getPin(s) : null;
                if (!a) return !1;
                this.saveScreenPosition(t.position.x, t.position.y);
                const o = this.getModelIntersection();
                if (o && o.face) {
                  this.engine.commandBinder.issueCommand(new y.u(f.C.XHAIR)), i.setCanPlace(!0);
                  const t = ((e, t, i) => {
                    var n;
                    return null !== (n = t.floorIdFromObject(i.object)) && void 0 !== n
                      ? n
                      : e.getClosestFloorAtHeight(i.point.y).id;
                  })(this.floorsData, this.meshQuery, o);
                  if (null === t) return !1;
                  const s = this.meshQuery.mdsRoomIdFromObject(o.object);
                  e.copy(a.stemNormal).setLength(a.stemLength),
                    this.updateMeshPreviewSphere(!0, a.anchorPosition);
                  const r = {
                    anchorPosition: a.anchorPosition.copy(o.point),
                    stemNormal: a.stemNormal.copy(o.face.normal).normalize(),
                    floorId: t,
                    roomId: s,
                  };
                  return (
                    this.engine.commandBinder.issueCommand(new K.tE(a.id, a.pinType, r)),
                    n === F.V8.CREATING && i.setPinEditorState(F.V8.PLACING),
                    !0
                  );
                }
                return (
                  this.engine.commandBinder.issueCommand(new y.u(f.C.NOPE)), i.setCanPlace(!1), !1
                );
              };
            })()),
            (this.allowExternalBehaviors = async (e) => {
              e || this.externalBehaviorsBlocked
                ? e &&
                  this.externalBehaviorsBlocked &&
                  (this.dragInterceptor.cancel(),
                  this.engine.commandBinder.issueCommand(new q.Lp()),
                  this.engine.commandBinder.issueCommand(new L.U()),
                  (this.externalBehaviorsBlocked = !1))
                : (this.dragInterceptor.renew(),
                  this.engine.commandBinder.issueCommand(new q.ZK()),
                  this.engine.commandBinder.issueCommand(new L.t()),
                  (this.externalBehaviorsBlocked = !0));
            }),
            (this.getModelIntersection = () =>
              this.fatcaster.cast(
                0.05,
                (e) =>
                  !!(0, P.Pv)(e) &&
                  ((!this.viewmodeData.isDollhouse() && !this.viewmodeData.isFloorplan()) ||
                    this.floorsViewData.isCurrentMeshGroupOrAllFloors(e.meshGroup)),
                D.a.Filter.CENTER_GROUP(0.05),
              )),
            (this.onPointerButton = (e) => {
              e.down ||
                this.viewData.pinEditorState !== F.V8.PLACED ||
                (this.allowExternalBehaviors(!0),
                this.engine.commandBinder.issueCommand(new v.y(!1)));
            }),
            (this.onAnchorDragBegin = (e) => {
              const { isPinEditable: t, pinEditorState: i, selectedPinId: n } = this.viewData,
                s = n ? this.viewData.getPin(n) : null;
              !s ||
                e.buttons !== I.r.PRIMARY ||
                (i !== F.V8.PLACED && i !== F.V8.IDLE) ||
                (t
                  ? ((this.movingPin = !0),
                    (this.startingPinData = this.copyPinData(s)),
                    this.allowExternalBehaviors(!1),
                    this.draggingHandlers.renew(),
                    this.engine.commandBinder.issueCommand(new y.u(f.C.GRABBING)),
                    this.engine.commandBinder.issueCommand(new v.y(!0)),
                    this.engine.commandBinder.issueCommand(new L.t()),
                    (this.inAnchorClick = !0))
                  : this.log.debug('onAnchorSelect called on a non-editable pin'));
            }),
            (this.doneMovingPin = () => {
              this.viewData.selectedPinId &&
                this.movingPin &&
                (this.draggingHandlers.cancel(),
                this.engine.commandBinder.issueCommand(new y.u(null)),
                this.engine.commandBinder.issueCommand(new v.y(!1)),
                this.engine.commandBinder.issueCommand(new L.U()),
                (this.movingPin = !1),
                (this.startingPinData = void 0),
                this.allowExternalBehaviors(!0),
                this.updateMeshPreviewSphere(!1));
            }),
            (this.onClickElsewhere = (e) => {
              const { selectedPinId: t, pinEditorState: i } = this.viewData;
              if (!((i === F.V8.CREATING && t) || this.inAnchorClick))
                return (
                  t &&
                    (this.movingPin
                      ? this.doneMovingPin()
                      : this.engine.commandBinder.issueCommand(new K.yR())),
                  !0
                );
            }),
            (this.onLongPressStart = async (e) => {
              if (e.buttons !== I.r.PRIMARY) return;
              const t = this.viewData;
              t.pinEditorState === F.V8.CREATING &&
                ((this.longPressStart = Date.now()),
                t.setPinEditorState(F.V8.PRESSING),
                this.allowExternalBehaviors(!1),
                this.saveScreenPosition(e.position.x, e.position.y),
                (this.longPressTimeout = window.setTimeout(async () => {
                  t.setPinEditorState(F.V8.PLACING);
                  (await this.positionPin(e)) ||
                    (t.setPinEditorState(F.V8.CREATING), t.setCanPlace(!1)),
                    (this.longPressTimeout = -1);
                }, this.longPressCreateThreshold)));
            }),
            (this.onLongPressEnd = () => {
              const e = this.viewData.pinEditorState;
              e === F.V8.PRESSING
                ? (this.log.debug('Did not press long enough'), this.endPinCreation())
                : e === F.V8.PLACING && this.placePin();
            }),
            (this.onPointerEvent = (e) => {
              const t = this.viewData.pinEditorState;
              (t !== F.V8.PLACING && t !== F.V8.CREATING) || this.positionPin(e);
            }),
            (this.onClickToPlacePin = () => {
              this.placePin();
            }),
            (this.onKeyEvent = (e) => {
              if (e.state === B.M.PRESSED)
                switch (e.key) {
                  case V.R.ESCAPE:
                    this.viewData.creatingNewPin && this.engine.broadcast(new Z.pe());
                }
            }),
            Promise.all([
              t.market.waitForData(u.M),
              t.market.waitForData(Y.i),
              t.market.waitForData(l.c),
              t.market.waitForData(p.O),
              t.getModuleBySymbol(a.c3),
              t.getModuleBySymbol(a.hi),
            ]).then(([t, n, s, a, o, r]) => {
              (this.cameraData = t),
                (this.floorsData = n),
                (this.floorsViewData = s),
                (this.viewmodeData = a),
                (this.fatcaster = o),
                (this.meshQuery = r),
                this.bindings.push(
                  i.registerPriorityHandler(k.er, _.$, this.stopEventPropagation),
                  e.onSelectedPinChanged(this.onSelectedPinChanged),
                ),
                (this.selectedHandlers = new E.V(
                  i.registerPriorityHandler(N.Rd, x.S, this.onClickElsewhere),
                  i.registerPriorityHandler(N.Rd, A.i, this.onClickElsewhere),
                )),
                this.selectedHandlers.cancel();
            });
        }
        dispose() {
          var e, t, i, n, s;
          this.removePinAnchorMesh(),
            null === (e = this.dragInterceptor) || void 0 === e || e.cancel(),
            null === (t = this.addingHandlers) || void 0 === t || t.cancel(),
            null === (i = this.draggingHandlers) || void 0 === i || i.cancel(),
            null === (n = this.selectedHandlers) || void 0 === n || n.cancel(),
            null === (s = this.editableSelectedHandlers) || void 0 === s || s.cancel(),
            this.bindings.forEach((e) => {
              e.cancel();
            });
        }
        update() {
          if (!this.editEnabled) return;
          const e = this.viewData;
          if (this.touchDevice && e.pinEditorState === F.V8.PRESSING) {
            const t = Math.min(
              1,
              (Date.now() - this.longPressStart) / this.longPressCreateThreshold,
            );
            e.setProgress(t);
          }
        }
        toggleEditing(e) {
          e !== this.editEnabled &&
            ((this.editEnabled = e),
            e
              ? (this.handlersRegistered ? this.creationHandlers.renew() : this.registerHandlers(),
                this.updateAnchorMesh())
              : ((this.inAnchorClick = !1),
                (this.anchored = !1),
                (this.movingPin = !1),
                this.creationHandlers.cancel(),
                this.allowExternalBehaviors(!0),
                this.removePinAnchorMesh(),
                this.updateMeshPreviewSphere(!1)),
            this.dragInterceptor.cancel(),
            this.draggingHandlers.cancel(),
            this.addingHandlers.cancel(),
            this.editableSelectedHandlers.cancel());
        }
        registerHandlers() {
          const e = this.input,
            t = this.viewData;
          (this.creationHandlers = new E.V(t.onPinEditorStateChanged(this.onPinStateUpdated))),
            (this.dragInterceptor = new E.V(
              e.registerPriorityHandler(R._t, x.S, () => !0),
              e.registerPriorityHandler(R._t, A.i, () => !0),
            )),
            (this.draggingHandlers = new E.V(
              e.registerUnfilteredHandler(R._t, this.onDragEvent),
              e.registerUnfilteredHandler(R._R, this.onDragEnd),
            )),
            (this.editableSelectedHandlers = new E.V(
              e.registerMeshHandler(R.E0, S.s.isType($), this.onAnchorDragBegin),
            )),
            this.touchDevice
              ? (this.addingHandlers = new E.V(
                  e.registerHandler(k.er, this.onPointerButton),
                  e.registerUnfilteredHandler(M.Vh, this.onLongPressStart),
                  e.registerUnfilteredHandler(M.pt, this.onLongPressEnd),
                ))
              : (this.addingHandlers = new E.V(
                  e.registerHandler(j.e, this.onKeyEvent),
                  e.registerHandler(k.er, this.onPointerButton),
                  e.registerUnfilteredHandler(N.Rd, this.onClickToPlacePin),
                  e.registerHandler(k.mE, this.onPointerEvent),
                ));
        }
        removePinAnchorMesh() {
          this.pinRenderer.hideAnchorMesh(), (this.anchored = !1);
        }
        copyPinData(e) {
          return {
            anchorPosition: e.anchorPosition.clone(),
            stemNormal: e.stemNormal.clone(),
            floorId: e.floorId,
            roomId: e.roomId,
            stemLength: e.stemLength,
            stemEnabled: e.stemEnabled,
            color: e.color,
          };
        }
        saveScreenPosition(e, t) {
          this.ndcPoint.set(e, t, 0);
          const i = (0, o.fi)(this.cameraData.width, this.cameraData.height, this.ndcPoint);
          this.viewData.setScreenPosition(i);
        }
      }
      var ee = i(86210),
        te = i(65703),
        ie = i(28438),
        ne = i(86743),
        se = i(59916);
      class ae extends n.Mesh {
        constructor(e) {
          super(new n.PlaneGeometry(z.Z.selection.size, z.Z.selection.size), new se.Dx()),
            (this.visible = !1),
            (this.layers.mask = e.mask),
            (this.renderOrder = H.z.pinSelectedHalo);
        }
      }
      var oe = i(42714);
      class re {
        constructor(e, t, i = 1) {
          (this.atlasMaxSize = e),
            (this.iconSize = t),
            (this.padding = i),
            (this.uvRects = new Map()),
            (this.iconCount = 0),
            (this.onResize = new oe.$());
          const s = (this.canvas = document.createElement('canvas'));
          (s.width = e), (s.height = t), (this.texture = new n.CanvasTexture(s));
        }
        addIcon(e, t) {
          var i, n;
          const { atlasMaxSize: s, iconSize: a, padding: o, canvas: r, uvRects: d } = this,
            c = r.getContext('2d');
          let l = !1,
            h = d.get(e);
          if (!h) {
            const t = this.iconCount++,
              i = s / a,
              n = Math.floor(t / i),
              o = t % i;
            if ((n + 1) * a > r.height) {
              const e = c.getImageData(0, 0, r.width, r.height);
              (r.height *= 2),
                c.putImageData(e, 0, r.height / 2),
                this.texture.dispose(),
                d.forEach((e) => {
                  (e.minV /= 2), (e.maxV /= 2);
                }),
                (l = !0);
            }
            (h = {
              minU: o / i,
              minV: n / (r.height / a),
              maxU: (o + 1) / i,
              maxV: (n + 1) / (r.height / a),
            }),
              d.set(e, h);
          }
          const u = h.minU * s,
            m = (1 - h.maxV) * r.height;
          return (
            c.clearRect(u, m, a, a),
            'font' === t.type
              ? ((c.font = `${a - 2 * o}px ${t.family}`),
                (c.textAlign = 'center'),
                (c.textBaseline = 'top'),
                (c.fillStyle = '#fff'),
                c.fillText(
                  String.fromCodePoint(t.codePoint),
                  u + a / 2 + ((null === (i = t.offset) || void 0 === i ? void 0 : i.x) || 0),
                  m + o + ((null === (n = t.offset) || void 0 === n ? void 0 : n.y) || 0),
                ))
              : c.drawImage(t.image, u + o, m + o, a - 2 * o, a - 2 * o),
            (this.texture.needsUpdate = !0),
            l && this.onResize.notify(),
            h
          );
        }
      }
      var de = i(26203),
        ce = i(95845);
      class le {
        constructor(e, t, i, s, a, o, r = !1) {
          (this.input = e),
            (this.camera = t),
            (this.canvasData = i),
            (this.layer = s),
            (this.commandBinder = a),
            (this.raycaster = o),
            (this.iconsEnabled = r),
            (this.container = new n.Object3D()),
            (this.floorIdToContainer = new Map()),
            (this.hexColorToColor = new Map()),
            (this.bindings = []),
            (this.anchor = null),
            (this.selected = null),
            (this.haloEasing = (0, ne.tf)(0.5, 0.52, 0, 1.98)),
            (this.pinViews = new Map()),
            (this.pinsWithOverrideTexture = new Set()),
            (this.refreshPins = () => {
              this.pinViews.forEach((e, t) => {
                this.updatePin(t, e.pinType, e, e.backgroundTexture);
              });
            }),
            (this.updateAnchorPosition = (() => {
              const e = new n.Vector3(),
                t = new n.Vector3(),
                i = new n.Vector3();
              return (n) => {
                const s = this.anchorMesh;
                if (!s) return;
                const a = this.raycaster.picking;
                e.copy(n.stemNormal).normalize(),
                  t.copy(e).multiplyScalar(0.2).add(n.anchorPosition),
                  i.copy(e).multiplyScalar(-1);
                const o = a.pick(t, i, (e) => e instanceof ie.g);
                if (o) {
                  const e = Math.min(0.2, o.distance);
                  s.position.copy(t).add(i.multiplyScalar(0.999 * e));
                } else s.position.copy(t).add(i.multiplyScalar(0.999 * n.stemLength));
                s.lookAt(t);
              };
            })()),
            (this.onAnchorHover = () => {
              this.commandBinder.issueCommand(new y.u(f.C.GRAB)),
                this.commandBinder.issueCommand(new v.y(!0));
            }),
            (this.onAnchorUnhover = () => {
              this.commandBinder.issueCommand(new y.u(null)),
                this.commandBinder.issueCommand(new v.y(!1));
            }),
            (this.iconAtlas = new re(4096, 128, 4)),
            this.iconAtlas.onResize.observe({ notify: this.refreshPins });
        }
        init() {
          (this.container.name = 'PinContainer'),
            (this.container.layers.mask = this.layer.mask),
            (this.anchorMesh = new $(this.layer)),
            (this.anchorMesh.name = 'Anchor Mesh'),
            this.container.add(this.anchorMesh),
            (this.selectedMesh = new ae(this.layer)),
            (this.selectedMesh.name = 'Selected Mesh'),
            this.container.add(this.selectedMesh);
          for (const e of Object.values(F.Qk))
            this.iconAtlas.addIcon(e, {
              type: 'font',
              family: 'mp-font',
              codePoint: +de.f[e],
              offset: (0, ce.m1)(e),
            });
        }
        dispose() {
          this.container.parent && this.container.parent.remove(this.container);
          for (const e of [this.anchorMesh, this.selectedMesh]) e && e.parent && e.parent.remove(e);
        }
        activate(e) {
          this.bindings.length > 0 ||
            this.bindings.push(
              this.input.registerMeshHandler(ee.z, S.s.isType($), this.onAnchorHover),
              this.input.registerMeshHandler(ee.A, S.s.isType($), this.onAnchorUnhover),
            );
        }
        deactivate(e) {
          for (const e of this.bindings) e.cancel();
          this.bindings.length = 0;
        }
        render(e) {
          if (this.selected) {
            const { animation: e, hideWhenDoneAnimating: t } = this.selected,
              i = this.selectedMesh;
            if (i && i.visible && e) {
              const s = this.pinHeadTransform(this.selected.id),
                a = new n.Vector3(),
                o = new n.Quaternion(),
                r = new n.Vector3();
              s.decompose(a, o, r),
                r.multiplyScalar(e.getUpdatedValue()),
                t && !e.isAnimating
                  ? ((i.visible = !1), (this.selected = null))
                  : (i.position.copy(a), i.quaternion.copy(o), i.scale.copy(r));
            }
          }
          if (this.anchorMesh && this.anchorMesh.visible) {
            const e = this.getViewportScale(this.canvasData);
            this.anchorMesh.update(this.camera, e, this.canvasData);
          }
        }
        updatePin(e, t, i, n, s) {
          this.anchorMesh &&
            this.anchorMesh.visible &&
            this.anchor &&
            this.anchor.pinType === t &&
            this.anchor.id === e &&
            this.updateAnchorPosition(i),
            this.pinViews.set(
              e,
              Object.assign(Object.assign({}, i), { id: e, pinType: t, backgroundTexture: n }),
            );
        }
        removePin(e) {
          this.selected && this.selected.id === e && this.clearSelected(), this.pinViews.delete(e);
        }
        removePinsByType(e) {
          this.removePinsByPredicate((t) => t === e);
        }
        removePinsByPredicate(e) {}
        setPinVisible(e, t) {}
        setPinColorVariant(e, t) {}
        setPinColorVariants(e, t) {}
        setPinColorVariantByType(e, t, i) {}
        setPinOpacity(e, t) {}
        setPinOpacityByType(e, t, i) {}
        fadePinOpacity(e, t) {}
        fadePinOpacityByType(e, t, i = []) {}
        setPinRenderOverrides(e, t, i) {
          t
            ? (this.pinsWithOverrideTexture.add(e),
              this.selected && this.selected.id === e && this.clearSelected())
            : this.pinsWithOverrideTexture.delete(e);
        }
        setFloorsHidden(e) {
          this.floorIdToContainer.forEach((t, i) => {
            t.visible = !e(i);
          });
        }
        setPinTypeVisible(e, t) {
          this.floorIdToContainer.forEach((i) => {
            i.userData.typeContainers[e].visible = t;
          });
        }
        showAnchorMesh(e, t, i) {
          (this.anchor = { pinType: e, id: t }),
            this.anchorMesh &&
              !this.anchorMesh.visible &&
              ((this.anchorMesh.visible = !0), this.input.registerMesh(this.anchorMesh, !1)),
            this.updateAnchorPosition(i);
        }
        hideAnchorMesh() {
          this.anchorMesh &&
            this.anchorMesh.visible &&
            ((this.anchorMesh.visible = !1), this.input.unregisterMesh(this.anchorMesh));
        }
        showSelectedMesh(e, t) {
          const i = this.selected && this.selected.pinType === e && this.selected.id === t;
          (this.selected && i) ||
            this.pinsWithOverrideTexture.has(t) ||
            ((this.selected = {
              pinType: e,
              id: t,
              hideWhenDoneAnimating: !1,
              animation: new te.Z({
                startValue: 1,
                endValue: 1.4,
                duration: 300,
                easingFunction: this.haloEasing,
              }),
            }),
            (this.selectedMesh.visible = !0));
        }
        hideSelectedMesh() {
          this.selected &&
            ((this.selected.animation = new te.Z({ startValue: 1.4, endValue: 1, duration: 300 })),
            (this.selected.hideWhenDoneAnimating = !0));
        }
        getFloorContainer(e) {
          let t = this.floorIdToContainer.get(e);
          if (t) return t;
          (t = new n.Object3D()),
            (t.name = 'Floor ' + e),
            (t.userData.typeContainers = {}),
            (t.layers.mask = this.layer.mask);
          for (const e of Object.values(F.Er)) {
            const i = new n.Object3D();
            (i.name = e),
              (i.layers.mask = this.layer.mask),
              t.add(i),
              (t.userData.typeContainers[e] = i);
          }
          return (
            this.container.add(t), this.floorIdToContainer.set(e, t), (t.userData.floorId = e), t
          );
        }
        getColor(e) {
          let t = this.hexColorToColor.get(e);
          if (t) return t;
          const i = new n.Color(e),
            s = { h: 0, s: 0, l: 0 };
          i.getHSL(s);
          return (
            (t = {
              baseColor: i,
              hoverColor: new n.Color().setHSL(s.h, s.s, 0.8 * s.l),
              dimmedColor: new n.Color().setHSL(s.h, 0.5 * s.s, s.l),
            }),
            this.hexColorToColor.set(e, t),
            t
          );
        }
        getViewportScale(e) {
          return Math.sqrt(Math.min(e.width, e.height) / z.Z.pinHeadMesh.scale.baseViewportSize);
        }
        clearSelected() {
          (this.selectedMesh.visible = !1), (this.selected = null);
        }
      }
      class he extends n.Line {
        constructor(e, t, i, s, a) {
          const o = new n.BufferGeometry(),
            r = new Float32Array(6);
          (r[0] = r[1] = r[2] = 0),
            (r[3] = e.x),
            (r[4] = e.y),
            (r[5] = e.z),
            o.setAttribute('position', new n.BufferAttribute(r, 3));
          const d = new se.l0();
          super(o, d),
            (this.geometry = o),
            (this.layers.mask = i.mask),
            (this.visible = t),
            (this.vector = e.clone()),
            (this.onBeforeRender = (e, t, i, n, o) => {
              const r = o;
              r.uniforms.pinHeadMatrix.value.copy(s.matrixWorld),
                r.uniforms.resolution.value.set(a.width, a.height),
                (r.uniformsNeedUpdate = !0);
            }),
            (this.pinStemMaterial = d);
        }
        dispose() {
          this.geometry.dispose();
        }
        updatePosition(e) {
          this.vector.copy(e.stemNormal).setLength(Math.max(e.stemLength, 0.01));
          const t = this.geometry.getAttribute('position');
          t.setXYZ(1, this.vector.x, this.vector.y, this.vector.z), (t.needsUpdate = !0);
        }
      }
      var ue = i(63926);
      class me extends n.Object3D {
        constructor(e, t, i, s, a, o, r, d, c, l) {
          super(),
            (this.pinId = e),
            (this.pinType = t),
            (this.pinColor = s),
            (this.stemVector = new n.Vector3()),
            (this.stemEnabled = !0),
            (this.currentColorVariant = F.K_.DEFAULT),
            (this.baseOpacity = 1),
            (this.opacityScale = 1),
            (this.pinHeadGeometryInst = new n.PlaneGeometry(z.l, z.l)),
            this.pinHeadGeometryInst.setAttribute('instanceMaskRect', new n.BufferAttribute(a, 4)),
            this.pinHeadGeometryInst.setAttribute(
              'instanceStrokeWidth',
              new n.BufferAttribute(l, 1),
            ),
            me.pinHeadGeometry || (me.pinHeadGeometry = new n.PlaneGeometry(z.l, z.l));
          const h = new n.Color().copy(s.baseColor);
          (this.pinHeadMeshMaterial = new se.Nv(h, d, c, 1)),
            (this.pinHeadMesh = new _.$(e, this.pinHeadGeometryInst, this.pinHeadMeshMaterial, o)),
            this.add(this.pinHeadMesh),
            (this.stemMesh = new he(i.stemNormal, i.stemEnabled, o, this.pinHeadMesh, r)),
            this.add(this.stemMesh),
            this.updateMeshPosition(i),
            (this.opacityAnimation = new ue.z(1));
        }
        dispose() {
          this.remove(this.pinHeadMesh),
            this.pinHeadMesh.material.dispose(),
            this.pinHeadMesh.dispose(),
            this.remove(this.stemMesh),
            this.stemMesh.dispose();
        }
        static disposeAll() {
          me.pinHeadGeometry.dispose();
        }
        updateFromPin(e, t, i, s, a, o) {
          this.position.copy(e.anchorPosition),
            this.pinHeadMesh.updatePosition(e),
            this.stemVector.copy(e.stemNormal).setLength(e.stemLength),
            (this.stemEnabled = e.stemEnabled),
            this.stemMesh.updatePosition(e),
            (this.stemMesh.visible = e.stemEnabled),
            this.pinHeadGeometryInst.setAttribute('instanceMaskRect', new n.BufferAttribute(i, 4)),
            this.pinHeadGeometryInst.setAttribute(
              'instanceStrokeWidth',
              new n.BufferAttribute(o, 1),
            ),
            t !== this.pinColor &&
              ((this.pinColor = t), this.setColorVariant(this.currentColorVariant));
          const r = this.pinHeadMeshMaterial.uniforms;
          (r.bg.value === s && r.mask.value === a) ||
            ((r.bg.value = s),
            (r.mask.value = a),
            (this.pinHeadMeshMaterial.uniformsNeedUpdate = !0));
        }
        setColorVariant(e) {
          const t = (0, ce.ke)(this.pinColor, e);
          this.pinHeadMeshMaterial.uniforms.color.value.copy(t), (this.currentColorVariant = e);
        }
        setOpacity(e) {
          (this.baseOpacity = e), this.updateOpacity();
        }
        setOpacityScale(e) {
          (this.opacityScale = e), this.updateOpacity();
        }
        fadeOpacity(e) {
          e > 0 && (this.visible = !0),
            this.opacityAnimation
              .modifyAnimation(this.opacityAnimation.value, e, 300)
              .onComplete(() => {
                e <= 0 && (this.visible = !1);
              });
        }
        setVisibility(e, t) {
          (this.visible = e), (this.pinHeadMesh.visible = e), (this.stemMesh.visible = e && t);
        }
        setStemEnabled(e) {
          this.stemMesh.visible = this.visible && e;
        }
        updateMeshPosition(e) {
          this.position.copy(e.anchorPosition),
            this.pinHeadMesh.updatePosition(e),
            this.stemMesh.updatePosition(e);
        }
        update(e, t, i, n) {
          this.pinHeadMesh.update(t, i, n);
          const s = this.opacityAnimation.active;
          this.opacityAnimation.tick(e), s && this.updateOpacity();
        }
        setRenderOverrides(e, t) {
          (this.pinHeadMesh.material = e ? new se.m0(e, !1) : this.pinHeadMeshMaterial),
            t ? this.pinHeadMesh.geomScale.copy(t) : this.pinHeadMesh.geomScale.set(1, 1, 1),
            this.setOpacity(this.pinHeadMeshMaterial.opacity);
        }
        updateOpacity() {
          const e = this.opacityAnimation.value * this.baseOpacity * this.opacityScale;
          if (
            ((this.pinHeadMeshMaterial.opacity = e),
            (this.pinHeadMeshMaterial.uniforms.alpha.value = e),
            this.pinHeadMesh.material !== this.pinHeadMeshMaterial)
          ) {
            this.pinHeadMesh.material.opacity = e;
            const t = this.pinHeadMesh.material;
            t && t.uniforms && t.uniforms.alpha && (t.uniforms.alpha.value = e);
          }
          this.stemMesh.pinStemMaterial.uniforms.alpha.value = e;
        }
      }
      class pe extends le {
        constructor(e, t, i, n, s, a, o, r = !1) {
          super(e, t, i, n, s, a, r), (this.idToMesh = new Map()), (this.inputCallbacks = o);
        }
        dispose() {
          super.dispose(), this.removePinsByPredicate(() => !0), me.disposeAll();
        }
        activate(e) {
          this.bindings.length > 0 ||
            (super.activate(e),
            this.bindings.push(
              this.input.registerPriorityHandler(N.Rd, _.$, (e, t) => {
                const i = t.parent;
                return this.inputCallbacks.onClick(i.pinId, i.pinType), !0;
              }),
            ),
            (0, r.Jm)() ||
              (this.bindings.push(
                this.input.registerMeshHandler(ee.z, S.s.isType(_.$), (e, t) => {
                  const i = t.parent;
                  this.inputCallbacks.onHover(i.pinId, i.pinType);
                }),
              ),
              this.bindings.push(
                this.input.registerMeshHandler(ee.A, S.s.isType(_.$), (e, t) => {
                  const i = t.parent;
                  this.inputCallbacks.onUnhover(i.pinId, i.pinType);
                }),
              )));
        }
        render(e) {
          const t = this.getViewportScale(this.canvasData);
          this.idToMesh.forEach((i) => {
            i.update(e, this.camera, t, this.canvasData);
          }),
            super.render(e);
        }
        updatePin(e, t, i, n, s) {
          var a, o;
          super.updatePin(e, t, i, n, s);
          const r = this.getColor(i.color),
            d = (0, ce.mg)(t, i.icon, this.iconsEnabled);
          let c = this.iconAtlas.uvRects.get(d);
          c ||
            (c = this.iconAtlas.addIcon(d, {
              type: 'font',
              family: 'mp-font',
              codePoint: +de.f[d],
              offset: (0, ce.m1)(d),
            }));
          const l = new Float32Array(16),
            h = new Float32Array(4),
            u = this.iconAtlas.texture;
          for (let e = 0; e < l.length; e += 4)
            (l[e] = c.minU), (l[e + 1] = c.minV), (l[e + 2] = c.maxU), (l[e + 3] = c.maxV);
          const m = t === F.Er.OBJECT ? 0 : 0.06;
          (h[0] = m), (h[1] = m), (h[2] = m), (h[3] = m);
          let p = this.idToMesh.get(e);
          p ||
            ((p = new me(e, t, i, r, l, this.layer, this.canvasData, n, u, h)),
            this.idToMesh.set(e, p),
            this.input.registerMesh(p.pinHeadMesh, !1)),
            void 0 !== s && (p.visible = s),
            p.updateFromPin(i, r, l, n, u, h);
          const g = i.floorId;
          (p.parent &&
            (null === (a = p.parent) || void 0 === a ? void 0 : a.userData.floorId) === g) ||
            (p.parent && (null === (o = p.parent) || void 0 === o || o.remove(p)),
            this.getFloorContainer(g).userData.typeContainers[t].add(p));
        }
        removePin(e) {
          var t;
          super.removePin(e);
          const i = this.idToMesh.get(e);
          i &&
            (this.idToMesh.delete(e),
            null === (t = i.parent) || void 0 === t || t.remove(i),
            this.input.unregisterMesh(i.pinHeadMesh),
            i.dispose());
        }
        removePinsByPredicate(e) {
          this.idToMesh.forEach((t, i) => {
            e(t.pinType) && this.removePin(i);
          });
        }
        setPinVisible(e, t) {
          const i = this.idToMesh.get(e);
          i && (i.visible = t);
        }
        setPinColorVariant(e, t) {
          const i = this.idToMesh.get(e);
          i && i.setColorVariant(t);
        }
        setPinColorVariants(e, t) {
          this.idToMesh.forEach((i) => {
            i.pinId !== t && i.setColorVariant(e);
          });
        }
        setPinColorVariantByType(e, t, i) {
          this.idToMesh.forEach((n) => {
            n.pinType === e && n.pinId !== i && n.setColorVariant(t);
          });
        }
        setPinOpacity(e, t) {
          const i = this.idToMesh.get(e);
          i && i.setOpacity(t);
        }
        setPinOpacityScale(e, t) {
          const i = this.idToMesh.get(e);
          i && i.setOpacityScale(t);
        }
        fadePinOpacity(e, t) {
          const i = this.idToMesh.get(e);
          i && i.fadeOpacity(t);
        }
        setPinOpacityByType(e, t, i) {
          this.idToMesh.forEach((n) => {
            n.pinType === e && n.pinId !== i && n.setOpacity(t);
          });
        }
        fadePinOpacityByType(e, t, i = []) {
          this.idToMesh.forEach((n) => {
            n.pinType !== e || i.includes(n.pinId) || n.fadeOpacity(t);
          });
        }
        setPinRenderOverrides(e, t, i) {
          super.setPinRenderOverrides(e, t, i);
          const n = this.idToMesh.get(e);
          n && n.setRenderOverrides(t, i);
        }
        pinHeadTransform(e) {
          const t = this.idToMesh.get(e);
          return t ? t.pinHeadMesh.matrixWorld : new n.Matrix4();
        }
      }
      var ge = i(48492),
        ve = i(96783),
        ye = i(2897),
        fe = i(3835),
        we = i(86425);
      const be = new se.uW(),
        Te = new O.Z('InstancedPinHeads');
      class Ce extends n.InstancedMesh {
        constructor(e) {
          const t = new n.BufferGeometry(),
            i = new Float32Array(6);
          (i[0] = i[1] = i[2] = 0),
            (i[3] = 1),
            (i[4] = 1),
            (i[5] = 1),
            t.setAttribute('position', new n.BufferAttribute(i, 3));
          const s = new Float32Array(3 * e),
            a = new n.InstancedBufferAttribute(s, 3);
          t.setAttribute('stemVector', a);
          const o = new Float32Array(e),
            r = new n.InstancedBufferAttribute(o, 1);
          t.setAttribute('instanceAlpha', r);
          const d = [],
            c = [];
          for (let i = 0; i < 4; i++) {
            const s = new Float32Array(4 * e),
              a = new n.InstancedBufferAttribute(s, 4);
            t.setAttribute(`pinHeadMatrixCol${i}`, a), d.push(s), c.push(a);
          }
          super(t, be, e),
            (this.maxCount = e),
            (this.stemVectorArray = s),
            (this.stemVectorAttrib = a),
            (this.pinHeadMatrixArray = d),
            (this.pinHeadMatrixAttrib = c),
            (this.opacityArray = o),
            (this.opacityAttrib = r),
            (this.renderOrder = H.z.lines),
            (this.posMatrix = new n.Matrix4()),
            (this.isLine = !0),
            (this.isMesh = !1);
        }
        update(e, t) {
          let i = 0;
          for (const t of e) {
            if (!t.visible || !t.stemEnabled || t.stemLength < 0.001) continue;
            if (i >= this.maxCount) {
              Te.error('Instance count is too small!');
              continue;
            }
            this.posMatrix.setPosition(t.anchorPosition),
              this.setMatrixAt(i, this.posMatrix),
              (this.opacityArray[i] = t.opacity * t.opacityAnimation.value * t.opacityScale);
            const e = 3 * i;
            t.pinHeadObjPosition.toArray(this.stemVectorArray, e);
            let n = 0;
            for (let e = 0; e < 4; e++)
              for (let s = 0; s < 4; s++)
                this.pinHeadMatrixArray[e][s + 4 * i] = t.pinHeadMatrix.elements[n++];
            i++;
          }
          (this.count = i),
            (this.visible = this.count > 0),
            (this.instanceMatrix.needsUpdate = !0),
            (this.stemVectorAttrib.needsUpdate = !0);
          for (const e of this.pinHeadMatrixAttrib) e.needsUpdate = !0;
          (this.opacityAttrib.needsUpdate = !0),
            be.uniforms.resolution.value.set(t.width, t.height),
            (be.uniformsNeedUpdate = !0),
            this.computeBoundingSphere();
        }
      }
      const Ee = new O.Z('InstancedPinRenderer');
      class De extends le {
        constructor(e, t, i, s, a, o, r, d = !1) {
          super(e, t, i, s, a, o, d),
            (this.pins = new Map()),
            (this.idToPin = new Map()),
            (this.keyToRenderObjs = new Map()),
            (this.updatePinHeadMatrix = (() => {
              const e = new n.Vector3(),
                t = new n.Vector3(),
                i = new n.Vector3(),
                s = new n.Vector3(),
                a = new n.Vector3(),
                o = new n.Vector3(),
                r = new n.Vector3();
              return (n) => {
                const d = z.Z.pinHeadMesh.scale,
                  c = this.getViewportScale(this.canvasData),
                  l = 1 + (d.responsiveness / 100) * (c - 1);
                this.camera.getWorldPosition(o);
                const h = this.camera.quaternion,
                  u = this.canvasData;
                for (const c of n) {
                  r.copy(c.pinHeadObjPosition).add(c.anchorPosition);
                  const n = o.distanceTo(r),
                    m = d.maxSize - (d.maxSize - d.minSize) * (0, ge.C)(n, d.nearBound, d.farBound);
                  t.copy(r).project(this.camera),
                    i.set(u.width / 2, u.height / 2, 1).multiply(t),
                    s.set(m / 2, 0, 0).add(i),
                    a.set(2 / u.width, 2 / u.height, 1).multiply(s);
                  const p = a.unproject(this.camera).distanceTo(r) * l,
                    g = (0, ve.uZ)(p, ye.Z.epsilon, p),
                    v = c.geomScale || fe.fU.UNIT;
                  e.set(g * v.x, g * v.y, g * v.z), c.pinHeadMatrix.compose(r, h, e);
                }
              };
            })()),
            (this.inputCallbacks = r);
        }
        dispose() {
          super.dispose();
        }
        activate(e) {
          this.bindings.length > 0 ||
            (super.activate(e),
            this.bindings.push(
              this.input.registerPriorityHandler(N.Rd, we.z, (e, t, i) => {
                if (!i || void 0 === i.instanceId) return !0;
                const n = t.renderedPins[i.instanceId];
                return this.inputCallbacks.onClick(n.id, n.pinType), !0;
              }),
            ),
            (0, r.Jm)() ||
              (this.bindings.push(
                this.input.registerMeshHandler(ee.z, S.s.isType(we.z), (e, t, i) => {
                  if (!i || void 0 === i.instanceId) return;
                  const n = t.renderedPins[i.instanceId];
                  (this.lastHoverId = n.id),
                    (this.lastHoverType = n.pinType),
                    this.inputCallbacks.onHover(n.id, n.pinType);
                }),
              ),
              this.bindings.push(
                this.input.registerMeshHandler(ee.A, S.s.isType(we.z), () => {
                  this.inputCallbacks.onUnhover(this.lastHoverId, this.lastHoverType);
                }),
              )));
        }
        render(e) {
          var t, i, n, s;
          for (const a of this.pins.values()) {
            const o = Array.from(a.values());
            if (0 === o.length) continue;
            const r = this.keyFromPin(o[0]),
              d = this.keyToRenderObjs.get(r);
            if (!d) {
              Ee.error(
                'Expecting renderObjs for this key.',
                this.keyToRenderObjs,
                this.keyFromPin(o[0]),
              );
              continue;
            }
            let { lines: c, pinHeads: l } = d;
            if (
              (o.forEach((t) => t.opacityAnimation.tick(e)),
              this.updatePinHeadMatrix(o),
              c.maxCount < o.length)
            ) {
              const e = c.parent;
              if (!e) {
                Ee.error('Expecting a parent.');
                continue;
              }
              e.remove(c), c.dispose(), e.remove(l), this.input.unregisterMesh(l);
              const { backgroundTexture: t, maskTexture: i, overrideTexture: n } = o[0];
              l.dispose(),
                Object.assign(d, this.createInstances(e, d.id, o.length + 16, t, i, n)),
                (c = d.lines),
                (l = d.pinHeads);
            }
            c.update(o, this.canvasData),
              (null === (t = o[0].maskTexture) || void 0 === t ? void 0 : t.uuid) &&
                (null ===
                  (s =
                    null ===
                      (n = null === (i = l.material.uniforms) || void 0 === i ? void 0 : i.mask) ||
                    void 0 === n
                      ? void 0
                      : n.value) || void 0 === s
                  ? void 0
                  : s.uuid) &&
                o[0].maskTexture.uuid !== l.material.uniforms.mask.value.uuid &&
                l.updateMaskTexture(o[0].maskTexture),
              l.update(o);
          }
          super.render(e);
        }
        updatePin(e, t, i, s, a) {
          var o;
          super.updatePin(e, t, i, s, a);
          let r = this.idToPin.get(e);
          const d = i.floorId,
            c = this.getColor(i.color).baseColor,
            l = `${d}_${t}_${(null === (o = null == r ? void 0 : r.overrideTexture) || void 0 === o ? void 0 : o.uuid) || s.uuid}`,
            h = (0, ce.mg)(t, i.icon, this.iconsEnabled);
          let u = this.iconAtlas.uvRects.get(h);
          u ||
            (u = this.iconAtlas.addIcon(h, {
              type: 'font',
              family: 'mp-font',
              codePoint: +de.f[h],
              offset: (0, ce.m1)(h),
            }));
          const m = t === F.Er.OBJECT ? 0 : 0.06;
          if (!r) {
            (r = Object.assign(Object.assign({ id: e }, i), {
              visible: !0,
              opacity: 1,
              opacityScale: 1,
              pinType: t,
              opacityAnimation: new ue.z(0),
              backgroundTexture: s,
              maskTexture: this.iconAtlas.texture,
              pinHeadMatrix: new n.Matrix4(),
              pinHeadObjPosition: new n.Vector3(),
              pinColor: c,
              colorVariant: F.K_.DEFAULT,
              overrideTexture: null,
              geomScale: null,
              pinIconUVRect: u,
              pinStrokeWidth: m,
              needsEntryAnimation: !0,
            })),
              this.idToPin.set(e, r);
            let a = this.pins.get(l);
            a || ((a = new Map()), this.pins.set(l, a)),
              a.set(e, r),
              this.createRenderObjsForPin(r);
          }
          const p = this.keyFromPin(r);
          Object.assign(r, i, {
            pinType: t,
            textureId: s.uuid,
            maskTexture: this.iconAtlas.texture,
          }),
            this.changePinHeadGroupIfNeeded(p, l, r),
            r.pinHeadObjPosition.copy(r.stemNormal).setLength(r.stemLength),
            (r.pinColor = (0, ce.ke)(this.getColor(r.color), r.colorVariant)),
            (r.pinIconUVRect = u),
            (r.pinStrokeWidth = m),
            void 0 !== a && this.setPinVisible(e, a),
            u &&
              r.needsEntryAnimation &&
              (r.opacityAnimation.modifyAnimation(r.opacityAnimation.value, 1, 500, ne.ad),
              r.opacityAnimation.onComplete(() => {
                r && (r.needsEntryAnimation = !1);
              }));
        }
        removePin(e) {
          super.removePin(e);
          const t = this.idToPin.get(e);
          if (!t) return;
          this.idToPin.delete(e);
          const i = this.keyFromPin(t),
            n = this.pins.get(i);
          n && (n.delete(e), this.cleanupRenderObjIfNeeded(i));
        }
        removePinsByPredicate(e) {
          this.idToPin.forEach((t, i) => {
            e(t.pinType) && this.removePin(i);
          });
        }
        setPinVisible(e, t) {
          const i = this.idToPin.get(e);
          i ? (i.visible = t) : Ee.error("setPinVisible on a pin that doesn't exist.", e);
        }
        setPinColorVariant(e, t) {
          const i = this.idToPin.get(e);
          i
            ? ((i.colorVariant = t), (i.pinColor = (0, ce.ke)(this.getColor(i.color), t)))
            : Ee.error("setPinColorVariant on a pin that doesn't exist.");
        }
        setPinColorVariants(e, t) {
          this.idToPin.forEach((i, n) => {
            n !== t && this.setPinColorVariant(n, e);
          });
        }
        setPinColorVariantByType(e, t, i) {
          this.idToPin.forEach((n, s) => {
            n.pinType === e && s !== i && this.setPinColorVariant(s, t);
          });
        }
        setPinOpacity(e, t) {
          const i = this.idToPin.get(e);
          i ? (i.opacity = t) : Ee.error("setPinOpacity on a pin that doesn't exist.");
        }
        setPinOpacityScale(e, t) {
          const i = this.idToPin.get(e);
          i ? (i.opacityScale = t) : Ee.error("setPinOpacityScale on a pin that doesn't exist.");
        }
        fadePinOpacity(e, t) {
          const i = this.idToPin.get(e);
          i
            ? (t > 0 && this.setPinVisible(e, !0),
              i.opacityAnimation
                .modifyAnimation(i.opacityAnimation.value, t, 300)
                .onComplete(() => {
                  i.opacityAnimation.endValue <= 0 && this.setPinVisible(e, !1);
                }))
            : Ee.error("setPinVisible on a pin that doesn't exist.", e);
        }
        setPinOpacityByType(e, t, i) {
          this.idToPin.forEach((n, s) => {
            n.pinType === e && s !== i && this.setPinOpacity(s, t);
          });
        }
        fadePinOpacityByType(e, t, i = []) {
          this.idToPin.forEach((n, s) => {
            n.pinType !== e || i.includes(s) || this.fadePinOpacity(s, t);
          });
        }
        setPinRenderOverrides(e, t, i) {
          super.setPinRenderOverrides(e, t, i);
          const n = this.idToPin.get(e);
          if (!n) return void Ee.error("setPinRenderOverrides on a pin that doesn't exist.");
          const s = this.keyFromPin(n);
          if (!this.keyToRenderObjs.get(s))
            return void Ee.error('Expecting renderObjs while setting override material');
          (n.overrideTexture = t), (n.geomScale = i);
          const a = this.keyFromPin(n);
          this.changePinHeadGroupIfNeeded(s, a, n);
        }
        pinHeadTransform(e) {
          const t = this.idToPin.get(e);
          return t
            ? t.pinHeadMatrix
            : (Ee.error("pinHeadTransform on a pin that doesn't exist."), new n.Matrix4());
        }
        keyFromPin(e) {
          return `${e.floorId}_${e.pinType}_${e.overrideTexture ? e.overrideTexture.uuid : e.backgroundTexture.uuid}`;
        }
        createRenderObjsForPin(e) {
          const { backgroundTexture: t, maskTexture: i, overrideTexture: n } = e,
            s = this.keyFromPin(e);
          if (this.keyToRenderObjs.get(s)) return;
          const a = this.getFloorContainer(e.floorId).userData.typeContainers[e.pinType];
          a.userData || (a.userData = {});
          const o = e.overrideTexture ? e.overrideTexture.uuid : e.backgroundTexture.uuid;
          if (!a.userData[o]) {
            const e = this.createInstances(a, o, 16, t, i, n);
            (a.userData[o] = e), this.keyToRenderObjs.set(s, e);
          }
        }
        createInstances(e, t, i, n, s, a) {
          const o = new Ce(i);
          (o.layers.mask = this.layer.mask), e.add(o);
          const r = new we.z(i, a || n, a ? null : s, !a);
          return (
            (r.layers.mask = this.layer.mask),
            e.add(r),
            this.input.registerMesh(r, !1),
            { lines: o, pinHeads: r, id: t }
          );
        }
        changePinHeadGroupIfNeeded(e, t, i) {
          if (e !== t) {
            let n = this.pins.get(t);
            n || ((n = new Map()), this.pins.set(t, n)),
              n.set(i.id, i),
              this.createRenderObjsForPin(i);
            const s = this.pins.get(e);
            s && (null == s || s.delete(i.id), this.cleanupRenderObjIfNeeded(e));
          }
        }
        cleanupRenderObjIfNeeded(e) {
          const t = this.pins.get(e),
            i = this.keyToRenderObjs.get(e);
          if (t && 0 === t.size && i) {
            const t = i.lines.parent;
            if (
              (this.input.unregisterMesh(i.pinHeads),
              this.pins.delete(e),
              this.keyToRenderObjs.delete(e),
              !t)
            )
              return void Ee.error('Expecting pinTypeObj!');
            (t.userData[i.id] = void 0), t.remove(i.lines), t.remove(i.pinHeads);
          }
        }
      }
      var xe = i(22925);
      class Ae extends s.Y {
        constructor() {
          super(...arguments),
            (this.name = 'pins'),
            (this.editActivated = !1),
            (this.editBindings = []),
            (this.touchDevice = (0, r.Jm)()),
            (this.worldPosition = new n.Vector3()),
            (this.visibilityChanged = () => {
              const e = !this.in360View(),
                t = !this.interactionmodeData.isVR();
              this.pinRenderer.container.visible = e && t;
              const { floorsViewData: i } = this,
                n = this.viewmode === g.Ey.Dollhouse || this.viewmode === g.Ey.Floorplan,
                s = i.transition.progress.active ? () => !0 : i.isHidden;
              this.pinRenderer.setFloorsHidden(n ? s : () => !1);
            }),
            (this.viewmodeChanged = (e) => {
              (this.viewmode = e.toMode), this.visibilityChanged();
            }),
            (this.onEnablePinEditing = async (e) => {
              e.enabled ? this.enableEditing() : this.disableEditing();
            }),
            (this.updateCurrentPin = () => {
              const { pinEditorState: e, focusedPin: t, selectedPinId: i } = this.viewData;
              if (e !== F.V8.CREATING) {
                const e = i ? this.viewData.getPin(i) : null,
                  n = t || e;
                if ((this.pinEditor.updateAnchorMesh(), n)) {
                  const { id: e, pinType: t, backgroundTexture: i } = n;
                  this.pinRenderer.updatePin(e, t, n, i),
                    this.pinRenderer.setPinColorVariant(e, F.K_.HIGHLIGHTED),
                    this.pinRenderer.setPinColorVariants(F.K_.DEFAULT, e);
                } else this.pinRenderer.setPinColorVariants(F.K_.DEFAULT);
              }
            }),
            (this.onUpdatePin = async (e) => {
              const { id: t, pinType: i, properties: n } = e,
                s = this.viewData.getPin(t);
              if (s && s.pinType === i) {
                const { focusedPin: e, selectedPinId: i } = this.viewData,
                  a = i ? this.viewData.getPin(i) : null,
                  o = Object.assign(Object.assign({}, s), n);
                this.viewData.updatePin(o),
                  this.pinRenderer.updatePin(o.id, o.pinType, o, o.backgroundTexture),
                  (null == a ? void 0 : a.id) === t &&
                    (this.saveScreenPosition(o), this.updateCurrentPin()),
                  (null == e ? void 0 : e.id) === t && this.saveScreenPosition(o);
              } else this.log.debug(`Cannot update non-existent ${i} pin`);
            }),
            (this.onUpdatePinViews = async (e) => {
              const { pinViews: t } = e;
              t.forEach((e) => {
                this.viewData.updatePin(e),
                  this.pinRenderer.updatePin(e.id, e.pinType, e, e.backgroundTexture, e.visible),
                  this.viewData.selectedPinId === e.id &&
                    (this.viewData.updatePin(e), this.updateCurrentPin()),
                  void 0 !== e.opacity && this.pinRenderer.setPinOpacity(e.id, e.opacity),
                  void 0 !== e.scale && this.pinRenderer.setPinRenderOverrides(e.id, null, e.scale);
              });
            }),
            (this.onChangePinVisibility = async (e) => {
              const { id: t, pinType: i, visible: n } = e,
                s = this.viewData.getPin(t);
              if (s && s.pinType === i) {
                this.pinRenderer.setPinVisible(t, n);
                const { selectedPinId: e, focusedPin: i } = this.viewData;
                n || e !== t || this.changeSelectedPin(null),
                  n || (null == i ? void 0 : i.id) !== t || this.viewData.setFocusedPin(null);
              } else this.log.debug(`Cannot change visibility of non-existent ${i} pin`);
            }),
            (this.onChangePinVisibilityByType = async (e) => {
              const { pinType: t, visible: i } = e;
              this.pinRenderer.setPinTypeVisible(t, i);
            }),
            (this.onChangePinOpacity = async (e) => {
              const { id: t, pinType: i, opacity: n } = e,
                s = this.viewData.getPin(t);
              s && s.pinType === i
                ? this.pinRenderer.setPinOpacity(t, n)
                : this.log.debug(`Cannot change opacity of non-existent ${i} pin`);
            }),
            (this.onChangePinOpacityScale = async (e) => {
              const { id: t, pinType: i, scale: n } = e,
                s = this.viewData.getPin(t);
              s && s.pinType === i
                ? this.pinRenderer.setPinOpacityScale(t, n)
                : this.log.debug(`Cannot change opacity scaling of non-existent ${i} pin`);
            }),
            (this.onChangePinOpacityByType = async (e) => {
              const { pinType: t, opacity: i, skipIds: n } = e;
              this.pinRenderer.fadePinOpacityByType(t, i, n);
            }),
            (this.onUnselectPin = async (e) => {
              const { pinType: t, id: i } = e,
                { selectedPinId: n } = this.viewData,
                s = n ? this.viewData.getPin(n) : null;
              (null == s ? void 0 : s.pinType) === t &&
                (null == s ? void 0 : s.id) === i &&
                this.changeSelectedPin(null);
            }),
            (this.clearPinSelection = async () => {
              this.changeSelectedPin(null);
            }),
            (this.onStartPinCreation = async (e) => {
              const { id: t, pin: i, pinType: n, backgroundTexture: s } = e,
                a = this.viewData,
                o = Object.assign(Object.assign({ id: t, pinType: n }, i), {
                  backgroundTexture: s,
                });
              a.setEditablePin(!0),
                a.setPinEditorState(F.V8.CREATING),
                this.changeSelectedPin(o),
                this.pinEditor.startPinCreation();
            }),
            (this.saveScreenPosition = (e) => {
              const t = this.viewData,
                i = e.stemNormal.clone().normalize();
              this.worldPosition.copy(e.anchorPosition).addScaledVector(i, e.stemLength);
              const n = (0, o.q9)(this.cameraData, this.worldPosition);
              t.setScreenPosition(n.ndcPosition.z > 1 ? null : n.screenPosition);
            }),
            (this.onCameraUpdate = () => {
              const { creatingNewPin: e, focusedPin: t, selectedPinId: i } = this.viewData,
                n = i ? this.viewData.getPin(i) : null;
              !e && t ? this.saveScreenPosition(t) : n && this.saveScreenPosition(n);
            }),
            (this.handleSweepChange = () => this.handleSweepAndViewModeChange()),
            (this.handleViewModeChange = () => this.handleSweepAndViewModeChange()),
            (this.cancelPinCreation = () => {
              const { creatingNewPin: e, selectedPinId: t } = this.viewData;
              if ((this.changeSelectedPin(null), t)) {
                const i = t ? this.viewData.getPin(t) : null;
                e &&
                  i &&
                  (this.engine.broadcast(new Z.hu(i.id, i.pinType)),
                  this.removePin(i.id, i.pinType),
                  this.pinEditor.endPinCreation());
              }
              this.resetEditingState();
            }),
            (this.onPinPlacementCancelled = () => {
              this.cancelPinCreation();
            }),
            (this.onCancelNewPin = async () => {
              this.cancelPinCreation();
            }),
            (this.onViewChange = () => {
              this.cancelPinCreation();
            }),
            (this.handleRemovingPin = async (e) => {
              const { pinType: t, id: i } = e;
              this.removePin(i, t);
            }),
            (this.handleRemovingPinsByType = async (e) => {
              const { pinType: t } = e,
                { focusedPin: i, selectedPinId: n } = this.viewData,
                s = n ? this.viewData.getPin(n) : null;
              (null == s ? void 0 : s.pinType) === t && this.changeSelectedPin(null),
                (null == i ? void 0 : i.pinType) === t && this.viewData.setFocusedPin(null),
                this.viewData.removePinsByType(t),
                this.pinRenderer.removePinsByType(t);
            }),
            (this.onTogglePinEditing = async (e) => {
              const { id: t, editable: i } = e;
              this.viewData.getPin(t) && this.viewData.setEditablePin(i);
            }),
            (this.onPinClicked = (e) => {
              const { pinType: t, id: i } = e,
                { creatingNewPin: n, selectedPinId: s } = this.viewData,
                a = s ? this.viewData.getPin(s) : null,
                o = i === (null == a ? void 0 : a.id) && t === (null == a ? void 0 : a.pinType);
              if (a && o) {
                if (n) return;
                this.changeSelectedPin(null);
              } else if (n) this.cancelPinCreation();
              else {
                if (
                  !(i === (null == a ? void 0 : a.id) && t === (null == a ? void 0 : a.pinType))
                ) {
                  const e = this.viewData.getPin(i);
                  e && this.changeSelectedPin(e);
                }
              }
            }),
            (this.onHoverChanged = (e) => {
              const { pinType: t, id: i, hovering: n } = e,
                { creatingNewPin: s, focusedPin: a, selectedPinId: o } = this.viewData;
              if (!s)
                if (n) {
                  const e = this.viewData.getPin(i);
                  if (!e) return void this.log.debug('Cannot find pin to focus');
                  const n = o ? this.viewData.getPin(o) : null;
                  if ((this.viewData.setFocusedPin(e), n && n.id === i && n.pinType === t)) return;
                  this.saveScreenPosition(e),
                    this.pinRenderer.setPinColorVariantByType(
                      t,
                      F.K_.DEFAULT,
                      null == a ? void 0 : a.id,
                    ),
                    this.pinRenderer.setPinColorVariant(i, F.K_.HIGHLIGHTED);
                } else
                  a &&
                    (this.pinRenderer.setPinColorVariant(a.id, F.K_.DEFAULT),
                    this.viewData.setFocusedPin(null));
            }),
            (this.onSelectPin = async (e) => {
              const { id: t, pinType: i, editable: n } = e,
                s = this.viewData,
                { selectedPinId: a, isPinEditable: o } = s;
              if ((s.setPinEditorState(F.V8.IDLE), t === a && n === o))
                return void this.log.debug('Pin is already selected');
              const r = this.viewData.getPin(t);
              r && r.pinType === i
                ? (s.setEditablePin(n), this.changeSelectedPin(r))
                : this.log.debug(`Cannot select ${i} pin`);
            }),
            (this.clickOffPin = async () => {
              this.viewData.creatingNewPin || this.changeSelectedPin(null);
            }),
            (this.movePin = async (e) => {
              const { isPinEditable: t, selectedPinId: i } = this.viewData;
              if (!t) return;
              const { pos: n, previousPos: s, id: a } = e,
                o = i ? this.viewData.getPin(i) : null;
              if (o && o.id === a) {
                const t = Object.assign(Object.assign({}, o), e.pos);
                this.viewData.updatePin(t),
                  this.updateCurrentPin(),
                  this.engine.broadcast(new Z.bV(o.id, o.pinType, n, s));
              } else this.log.debug('Cannot move the pin, not open for edit');
            }),
            (this.placePin = async (e) => {
              const { isPinEditable: t, canPlace: i, selectedPinId: n } = this.viewData;
              if (!t) return;
              const s = n ? this.viewData.getPin(n) : null;
              s && i
                ? (this.viewData.setPinEditorState(F.V8.PLACED),
                  this.engine.broadcast(new Z.b0(s.id, s.pinType, s)))
                : (this.log.debug('Cannot place pin because there is no open pin'),
                  this.cancelPinCreation());
            });
        }
        async init(e, t) {
          this.engine = t;
          const [i, n, s, o, r, g] = await Promise.all([
            t.getModuleBySymbol(a.PZ),
            t.getModuleBySymbol(a.Aj),
            t.market.waitForData(c.W),
            t.market.waitForData(d.pu),
            t.getModuleBySymbol(a.fQ),
            t.market.waitForData(xe.R),
            document.fonts.ready,
          ]);
          this.input = i;
          const E = {
              onClick: (e, i) => {
                t.broadcast(new Z.F7(e, i));
              },
              onHover: (e, i) => {
                t.broadcast(new Z.tP(e, !0, i)),
                  t.commandBinder.issueCommand(new y.u(f.C.FINGER)),
                  t.commandBinder.issueCommand(new v.y(!0));
              },
              onUnhover(e, i) {
                t.broadcast(new Z.tP(e, !1, i)),
                  t.commandBinder.issueCommand(new y.u(null)),
                  t.commandBinder.issueCommand(new v.y(!1));
              },
            },
            D = t.claimRenderLayer(this.name);
          (this.pinRenderer = n.supportsInstancing()
            ? new De(i, n.getCamera(), s, D, t.commandBinder, r, E, e.tagIconsEnabled)
            : new pe(i, n.getCamera(), s, D, t.commandBinder, r, E, e.tagIconsEnabled)),
            n.getScene().add(this.pinRenderer.container),
            t.addComponent(this, this.pinRenderer),
            ([
              this.floorsViewData,
              this.viewmodeData,
              this.interactionmodeData,
              this.sweepData,
              this.cameraData,
            ] = await Promise.all([
              t.market.waitForData(l.c),
              t.market.waitForData(p.O),
              t.market.waitForData(h.Z),
              t.market.waitForData(m.Z),
              t.market.waitForData(u.M),
            ])),
            (this.viewData = new C.B()),
            (this.pinEditor = new X(this.viewData, this.engine, this.input, this.pinRenderer)),
            this.floorsViewData.iterate((e) => this.pinRenderer.getFloorContainer(e.id)),
            (this.viewmode = this.viewmodeData.currentMode),
            this.bindings.push(
              t.commandBinder.addBinding(K.Ki, this.onEnablePinEditing),
              t.commandBinder.addBinding(K.Ar, this.onSelectPin),
              t.commandBinder.addBinding(K.RH, this.onUnselectPin),
              t.commandBinder.addBinding(K.iK, this.clearPinSelection),
              t.commandBinder.addBinding(K.yR, this.clickOffPin),
              t.commandBinder.addBinding(K.tE, this.onUpdatePin),
              t.commandBinder.addBinding(K.mE, this.onUpdatePinViews),
              t.commandBinder.addBinding(K.ik, this.onChangePinVisibility),
              t.commandBinder.addBinding(K.qN, this.onChangePinVisibilityByType),
              t.commandBinder.addBinding(K._Y, this.onChangePinOpacity),
              t.commandBinder.addBinding(K.nP, this.onChangePinOpacityScale),
              t.commandBinder.addBinding(K.kb, this.onChangePinOpacityByType),
              t.commandBinder.addBinding(K.fM, this.onStartPinCreation),
              t.commandBinder.addBinding(K.OL, this.handleRemovingPin),
              t.commandBinder.addBinding(K.zM, this.handleRemovingPinsByType),
              t.commandBinder.addBinding(K.I$, this.movePin),
              t.commandBinder.addBinding(K.ic, this.onTogglePinEditing),
              this.interactionmodeData.onChanged(this.visibilityChanged),
              this.floorsViewData.onChanged(this.visibilityChanged),
              this.viewmodeData.makeModeChangeSubscription(this.visibilityChanged),
              t.subscribe(w.Z, this.visibilityChanged),
              t.subscribe(T.a, this.viewmodeChanged),
              t.subscribe(b.Z, this.viewmodeChanged),
              t.subscribe(Z.F7, this.onPinClicked),
              this.viewData.onPinEditorStateChanged(this.updateCurrentPin),
              this.viewData.onSelectedPinChanged(this.updateCurrentPin),
              this.viewData.onFocusedPinChanged(this.updateCurrentPin),
              this.viewData.onPinEditableChanged(this.updateCurrentPin),
              this.cameraData.onChanged(this.onCameraUpdate),
              g.onPropertyChanged('currentViewId', this.onViewChange),
            ),
            this.touchDevice || this.bindings.push(t.subscribe(Z.tP, this.onHoverChanged));
          let x = o.application;
          this.bindings.push(
            o.onPropertyChanged('application', (e) => {
              e !== x &&
                (this.visibilityChanged(),
                this.viewData.creatingNewPin
                  ? this.cancelPinCreation()
                  : (this.changeSelectedPin(null),
                    this.viewData.setFocusedPin(null),
                    this.resetEditingState()),
                (x = e));
            }),
          ),
            this.visibilityChanged(),
            t.market.register(this, C.B, this.viewData);
        }
        dispose(e) {
          this.disableEditing(),
            this.pinEditor.dispose(),
            this.pinRenderer.dispose(),
            this.bindings.forEach((e) => {
              e.cancel();
            }),
            (this.bindings = []),
            (this.editBindings = []),
            super.dispose(e);
        }
        onUpdate() {
          this.editActivated && this.pinEditor.update();
        }
        in360View() {
          const e = this.sweepData.currentSweep ? this.sweepData.currentSweep : '';
          return this.viewmodeData.isInside() && this.sweepData.isSweepUnaligned(e);
        }
        enableEditing() {
          if (!this.editActivated) {
            if (
              ((this.editActivated = !0),
              this.pinEditor.toggleEditing(!0),
              0 === this.editBindings.length)
            ) {
              const e = this.engine,
                t = e.commandBinder;
              this.editBindings.push(
                t.addBinding(K.ip, this.placePin),
                t.addBinding(K.tT, this.onCancelNewPin),
                this.sweepData.makeSweepChangeSubscription(this.handleSweepChange),
                e.subscribe(b.Z, this.handleViewModeChange),
                e.subscribe(Z.pe, this.onPinPlacementCancelled),
              );
            } else
              this.editBindings.forEach((e) => {
                e.renew();
              });
            this.handleSweepAndViewModeChange();
          }
        }
        disableEditing() {
          this.editActivated &&
            ((this.editActivated = !1),
            this.pinEditor.toggleEditing(!1),
            this.cancelPinCreation(),
            this.editBindings.forEach((e) => {
              e.cancel();
            }));
        }
        changeSelectedPin(e) {
          const { selectedPinId: t } = this.viewData;
          if (((null == e ? void 0 : e.id) || null) === t)
            return void this.log.debug('Pin selection did not change');
          (t ? this.viewData.getPin(t) : null) && this.pinRenderer.hideSelectedMesh(),
            e
              ? (this.saveScreenPosition(e),
                this.viewData.setSelectedPinId(e.id),
                this.pinRenderer.showSelectedMesh(e.pinType, e.id))
              : (this.viewData.setScreenPosition(null), this.viewData.setSelectedPinId(null));
        }
        handleSweepAndViewModeChange() {
          const e = this.viewData,
            t = !this.in360View();
          e.creatingNewPin && !t ? this.cancelPinCreation() : e.setCanAdd(t);
        }
        resetEditingState() {
          const e = this.viewData;
          e.setPinEditorState(F.V8.IDLE),
            e.setEditablePin(!1),
            e.setCanPlace(!0),
            e.setCanAdd(!this.in360View());
        }
        removePin(e, t) {
          const { focusedPin: i, selectedPinId: n } = this.viewData;
          n === e && this.changeSelectedPin(null),
            (null == i ? void 0 : i.id) === e &&
              (null == i ? void 0 : i.pinType) === t &&
              this.viewData.setFocusedPin(null),
            this.viewData.removePin(e),
            this.pinRenderer.removePin(e);
        }
      }
      const Oe = Ae;
    },
    95845: (e, t, i) => {
      'use strict';
      i.d(t, { W4: () => h, ke: () => d, m1: () => l, mg: () => c });
      var n = i(81396),
        s = i(26203),
        a = i(46629),
        o = i(90288),
        r = i(50652);
      function d(e, t) {
        switch (t) {
          case a.K_.DEFAULT:
            return e.baseColor;
          case a.K_.DIMMED:
            return e.dimmedColor;
          case a.K_.HIGHLIGHTED:
            return e.hoverColor;
        }
      }
      function c(e, t, i) {
        const n = i ? t : void 0;
        return n && s.f[n] ? n : a.Qk[e];
      }
      function l(e) {
        if (e === s.e.CommentLarge) return { x: 0, y: 5 };
      }
      const h = async (e, t, i) => {
        const s = new n.Vector3().copy(t.stemNormal).setLength(t.stemLength).add(t.anchorPosition),
          a = r.K.decodeVector3(e.getOverrideParam('pin-pos', r.K.encodeVector3(s)));
        i((a && a.distanceTo(s) > 0.1) || null === r.K.deserialize() ? o.nF.FadeToBlack : null);
      };
    },
    9094: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => u });
      var n,
        s = i(933),
        a = i(4763),
        o = i(31740),
        r = i(72317),
        d = i(49128),
        c = i(28721);
      !(function (e) {
        (e.None = 'none'),
          (e.Queued = 'queued'),
          (e.Rendering = 'loading'),
          (e.Rendered = 'loaded');
      })(n || (n = {}));
      class l {
        constructor(e) {
          (this.panoRenderer = e), (this.statusMap = {}), (this.active = []), (this.queued = []);
        }
        processQueued() {
          let e = 0;
          for (const t of Object.keys(this.statusMap)) this.statusMap[t] === n.Rendering && e++;
          if (0 === e && this.queued.length > 0) {
            const e = this.queued.shift();
            if (e) {
              this.active.push(e), (this.statusMap[e] = n.Rendering);
              this.panoRenderer.activateSweep(e, !1).then(() => {
                this.statusMap[e] = n.Rendered;
              });
            }
          }
        }
        tryPreRender(e) {
          return (
            this.getPreRenderState(e) === n.None &&
            (this.queued.push(e), (this.statusMap[e] = n.Queued), !0)
          );
        }
        getPreRenderState(e) {
          const t = this.statusMap[e];
          return void 0 !== t ? t : n.None;
        }
        cleanup(e = []) {
          const t = (0, c.ow)(e),
            i = [];
          for (const e of this.queued) t[e] ? i.push(e) : (this.statusMap[e] = n.None);
          (this.queued.length = 0), this.queued.push(...i);
          const s = [];
          for (const e of this.active) t[e] ? s.push(e) : (this.statusMap[e] = n.None);
          (this.active.length = 0), this.active.push(...s);
        }
      }
      var h = i(64150);
      class u extends s.Y {
        constructor() {
          super(...arguments), (this.name = 'prerenderer-module'), (this.lastPrerendered = null);
        }
        async init(e, t) {
          ([this.settings, this.sweepData] = await Promise.all([
            await t.market.waitForData(h.e),
            await t.market.waitForData(o.Z),
          ])),
            (this.panoRenderer = (await t.getModuleBySymbol(a.RR)).getRenderer()),
            (this.preRenderer = new l(this.panoRenderer)),
            this.bindings.push(
              t.subscribe(r.Z, (e) => this.onRestrictSweepsSet(e.sweepIds)),
              t.subscribe(d.Z, () => this.onRestrictedSweepsClear()),
            );
        }
        enabled() {
          return this.settings.getOverrideParam('pre', true);
        }
        onUpdate() {
          this.enabled() && this.preRenderer.processQueued();
        }
        getCurrentSweeps() {
          return this.currentRestrictedSweeps || [];
        }
        onRestrictSweepsSet(e) {
          this.enabled() &&
            ((this.lastPrerendered = null),
            e &&
              e.length >= 3 &&
              ((this.lastPrerendered = e[2]), this.preRenderer.tryPreRender(this.lastPrerendered)),
            this.cleanup(this.sweepData),
            (this.currentRestrictedSweeps = e));
        }
        onRestrictedSweepsClear() {
          this.enabled() &&
            (this.cleanup(this.sweepData, !0), (this.currentRestrictedSweeps = null));
        }
        cleanup(e, t = !1) {
          const i = [];
          e.transition.active
            ? (e.transition.from && i.push(e.transition.from),
              e.transition.to && i.push(e.transition.to))
            : e.currentSweep && i.push(e.currentSweep),
            this.lastPrerendered && i.push(this.lastPrerendered),
            t && this.panoRenderer.freeAllTextures(i),
            this.preRenderer.cleanup(i);
        }
      }
    },
    58950: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => y });
      var n = i(933),
        s = i(4763),
        a = i(15709),
        o = i(35557),
        r = i(81396),
        d = i(59491),
        c = i(20348),
        l = i(59228),
        h = i(79242),
        u = i(21676);
      const m = new r.Vector2();
      class p {
        constructor(e, t) {
          (this.inputIni = e),
            (this.rendererModule = t),
            (this.registrations = new Map()),
            (this.hovered = new Map()),
            (this.checkPointerLeave = () => {
              if (this.hovered.size) {
                const e = v(this.inputIni.getCurrentRayHits());
                this.hovered.forEach((t, i) => {
                  var n, s, a, o, r, d;
                  if (!e.find((e) => e.object === i)) {
                    this.hovered.delete(i);
                    const c = Object.assign(Object.assign({}, t), { intersections: e });
                    null ===
                      (a =
                        null === (n = i.__r3f) || void 0 === n
                          ? void 0
                          : (s = n.handlers).onPointerOut) ||
                      void 0 === a ||
                      a.call(s, c),
                      null ===
                        (d =
                          null === (o = i.__r3f) || void 0 === o
                            ? void 0
                            : (r = o.handlers).onPointerLeave) ||
                        void 0 === d ||
                        d.call(r, c);
                  }
                });
              }
            }),
            (this.checkPointerMissed = () => {
              var e, t, i;
              const n = new Set(this.inputIni.getCurrentRayHits().map((e) => e.object));
              for (const s of this.registrations.keys())
                n.has(s) ||
                  null ===
                    (i =
                      null === (e = s.__r3f) || void 0 === e
                        ? void 0
                        : (t = e.handlers).onPointerMissed) ||
                  void 0 === i ||
                  i.call(t, new MouseEvent('click', this.lastPointerUp.nativeEvent));
            }),
            (this.handlers = [
              this.initMeshHandlers(),
              e.registerUnfilteredHandler(l.mE, this.checkPointerLeave),
              e.registerUnfilteredHandler(h.Rd, this.checkPointerMissed),
              e.registerUnfilteredHandler(l.er, (e) => {
                e.down ? (this.lastPointerDown = e) : (this.lastPointerUp = e);
              }),
            ]);
        }
        dispose() {
          [...this.handlers, ...this.registrations.values()].forEach((e) => e.cancel());
        }
        registerObject3D(e) {
          const t = this.registrations.get(e);
          if (t) return t;
          const i = (0, d.k1)(
            () => {
              this.registrations.set(e, i),
                this.inputIni.registerMesh(
                  e,
                  !1,
                  (t) =>
                    (function (e) {
                      let t = e;
                      for (; t && !g(t); ) t = t.parent;
                      return t;
                    })(t) === e,
                );
            },
            () => {
              this.registrations.delete(e), this.hovered.delete(e), this.inputIni.unregisterMesh(e);
            },
            !1,
          );
          return i.renew(), i;
        }
        initMeshHandlers() {
          const e = new WeakMap(),
            t = (t, i, n) => {
              var s, a, o, d, c, u, p, y, f, w, b, T;
              let C = null;
              for (let e = i; e; e = e.parent) g(e) && (C || (C = [])).push(e);
              if (!C) return !1;
              const E = this.rendererModule.getCamera(),
                D = new r.Vector2(t.position.x, t.position.y);
              let x;
              n || (n = e.get(i) || {});
              let A = 0;
              if (t instanceof h.Rd) {
                const { x: e, y: t } = this.lastPointerDown.clientPosition,
                  { x: i, y: n } = this.lastPointerUp.clientPosition;
                (A = m.set(i - e, n - t).length()),
                  (x = new MouseEvent('click', this.lastPointerUp.nativeEvent));
              } else x = t.nativeEvent;
              const O = v(this.inputIni.getCurrentRayHits()),
                S = {};
              for (const e in x) 'function' != typeof x[e] && (S[e] = x[e]);
              const P = Object.assign(Object.assign(Object.assign({}, S), n), {
                intersections: O,
                camera: E,
                delta: A,
                eventObject: i,
                nativeEvent: x,
                sourceEvent: x,
                pointer: D,
                ray: this.inputIni.getCurrentPointerRay(),
                stopPropagation: () => {
                  (P.stopped = !0),
                    this.handleStopPropagation(P.eventObject, O),
                    t.stopPropagation(),
                    t.preventDefault();
                },
                stopped: !1,
                unprojectedPoint: new r.Vector3(D.x, D.y, 0).unproject(E),
                spaceX: D.x,
                spaceY: D.y,
              });
              for (const i of C) {
                e.set(i, n);
                const r = i.__r3f;
                if (
                  r &&
                  g(i) &&
                  ((P.eventObject = i),
                  t instanceof l.er
                    ? t.down
                      ? null === (a = (s = r.handlers).onPointerDown) ||
                        void 0 === a ||
                        a.call(s, P)
                      : null === (d = (o = r.handlers).onPointerUp) || void 0 === d || d.call(o, P)
                    : t instanceof l.mE
                      ? (this.hovered.has(i) ||
                          (this.hovered.set(i, P),
                          null === (u = (c = r.handlers).onPointerOver) ||
                            void 0 === u ||
                            u.call(c, P),
                          null === (y = (p = r.handlers).onPointerEnter) ||
                            void 0 === y ||
                            y.call(p, P)),
                        null === (w = (f = r.handlers).onPointerMove) ||
                          void 0 === w ||
                          w.call(f, P))
                      : t instanceof h.Rd &&
                        (null === (T = (b = r.handlers).onClick) || void 0 === T || T.call(b, P)),
                  P.stopped)
                )
                  return !0;
              }
              return !1;
            },
            i = [l.er, l.mE, h.Rd];
          return new c.V(...i.map((e) => this.inputIni.registerMeshHandler(e, u.s.isAny(), t)));
        }
        handleStopPropagation(e, t) {
          if (this.hovered.has(e)) {
            const i = t.findIndex((t) => t.object === e);
            if (i > -1) {
              const e = [];
              for (let n = i + 1; n < t.length; n++)
                for (let i = t[n].object; i; i = i.parent) {
                  const t = this.hovered.get(i);
                  t && e.push({ obj: i, origEvent: t });
                }
              e.forEach(({ obj: e, origEvent: i }) => {
                var n, s, a;
                const o = Object.assign(Object.assign({}, i), { intersections: t, eventObject: e });
                this.hovered.delete(e);
                const r = null === (n = e.__r3f) || void 0 === n ? void 0 : n.handlers;
                null === (s = null == r ? void 0 : r.onPointerOut) || void 0 === s || s.call(r, o),
                  null === (a = null == r ? void 0 : r.onPointerLeave) ||
                    void 0 === a ||
                    a.call(r, o);
              });
            }
          }
        }
      }
      function g(e) {
        const t = e.__r3f;
        return (
          !!t &&
          (t.hasOwnProperty('eventCount')
            ? (t.eventCount || 0) > 0
            : t.handlers && Object.keys(t.handlers).length > 0)
        );
      }
      function v(e) {
        const t = new Set();
        return e.filter((e) => {
          const i = t.has(e.object);
          return t.add(e.object), !i;
        });
      }
      class y extends n.Y {
        constructor() {
          super(...arguments),
            (this.name = 'react-three-fiber-external'),
            (this.onPlayerResized = (e) => {
              var t;
              null === (t = this.externalCallbacks) ||
                void 0 === t ||
                t.onSizeChange(e.width, e.height);
            }),
            (this.onPixelRatioChanged = (e) => {
              var t;
              null === (t = this.externalCallbacks) ||
                void 0 === t ||
                t.onPixelRatioChange(e.pixelRatio);
            });
        }
        async init(e, t) {
          this.bindings.push(
            t.subscribe(a.a, this.onPlayerResized),
            t.subscribe(o.Vx, this.onPixelRatioChanged),
          );
          const [i, n] = await Promise.all([t.getModuleBySymbol(s.PZ), t.getModuleBySymbol(s.Aj)]);
          (this.rendererModule = n), (this.eventsAdapter = new p(i, n));
        }
        dispose(e) {
          this.eventsAdapter.dispose(), super.dispose(e);
        }
        onUpdate(e) {
          var t;
          null === (t = this.externalCallbacks) || void 0 === t || t.onFrame();
        }
        registerExternalR3F(e) {
          if (this.externalCallbacks) throw new Error('registerExternalR3F called twice');
          return (
            (this.externalCallbacks = e),
            {
              renderer: this.rendererModule.threeRenderer,
              scene: this.rendererModule.getScene().scene,
              camera: this.rendererModule.getCamera(),
              registerMeshEvents: (e) => this.eventsAdapter.registerObject3D(e),
            }
          );
        }
      }
    },
    35922: (e, t, i) => {
      'use strict';
      i.d(t, { I: () => s });
      var n = i(56063);
      class s extends n.m {
        constructor(e) {
          super(), (this.payload = { roomAssociation: e });
        }
      }
      s.id = 'REGISTER_ROOM_ASSOCIATION_SOURCE';
    },
    22647: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => y });
      var n = i(933),
        s = i(34608),
        a = i(4763),
        o = i(23998),
        r = i(63511),
        d = i(61173),
        c = i(29433),
        l = i(16419),
        h = i(81396),
        u = i(9832),
        m = i(90512),
        p = i(97187),
        g = i(90288),
        v = i(43017);
      class y extends n.Y {
        constructor() {
          super(...arguments), (this.name = 'screenshots-module'), (this.capturer = new f());
        }
        async init(e, t) {
          (this.engine = t),
            ([this.settingsModule, this.canvas, this.renderer, this.renderToTexture] =
              await Promise.all([
                t.getModuleBySymbol(s.Ak),
                t.market.waitForData(o.W),
                t.getModuleBySymbol(a.Aj),
                t.getModuleBySymbol(a.tA),
              ])),
            this.settingsModule.registerButton('Debug', 'Take screenshot', async () => {
              const e = Date.now();
              await this.takeAndDownloadScreenshot(
                { height: this.canvas.height, width: this.canvas.width },
                `image_${e}.jpg`,
                r.o.ALL,
              );
            }),
            this.settingsModule.registerButton('Debug', 'Take 4k screenshot', async () => {
              const e = Date.now();
              await this.takeAndDownloadScreenshot(
                { height: 2304, width: 4096 },
                `image_${e}.jpg`,
                r.o.ALL,
              );
            }),
            this.settingsModule.registerButton('Debug', 'Take 8k screenshot', async () => {
              const e = Date.now();
              await this.takeAndDownloadScreenshot(
                { height: 4608, width: 8192 },
                `image_${e}.jpg`,
                r.o.ALL,
              );
            }),
            this.settingsModule.registerButton('Debug', 'Take 16k screenshot', async () => {
              const e = Date.now();
              await this.takeAndDownloadScreenshot(
                { height: 9e3, width: 16e3 },
                `image_${e}.jpg`,
                r.o.ALL,
              );
            }),
            this.settingsModule.registerButton('Debug', 'Take FB 3D screenshot', async () => {
              const e = Date.now(),
                t = this.engine.getRenderLayer('model-mesh'),
                i = this.engine.getRenderLayer('skybox'),
                n = t.clone();
              n.addLayers(i);
              const s = (await this.engine.market.waitForData(m.O)).currentMode;
              try {
                await this.takeAndDownloadScreenshot(
                  { height: this.canvas.height, width: this.canvas.width },
                  `image_${e}.jpg`,
                  n,
                ),
                  await this.engine.commandBinder.issueCommand(new l.U(l.U.modes.Depth)),
                  await this.engine.commandBinder.issueCommand(new p._i(p.BD.MESH, g.nF.Instant)),
                  await this.takeAndDownloadScreenshot(
                    {
                      height: Math.floor(this.canvas.height / 4),
                      width: Math.floor(this.canvas.width / 4),
                    },
                    `image_${e}_depth.jpg`,
                    t,
                  );
              } catch (e) {
                throw (this.log.error('Could not take screenshot'), e);
              } finally {
                await this.engine.commandBinder.issueCommand(new l.U(null)),
                  await this.engine.commandBinder.issueCommand(new p._i(p.KP[s || v.Ey.Panorama]));
              }
            });
        }
        async takeAndDownloadScreenshot(e, t, i) {
          this.renderTarget ||
            (this.renderTarget = await this.engine.commandBinder.issueCommandWhenBound(new u.oM()));
          const n = await this.capturer.capture(
            i,
            e,
            this.renderer,
            this.renderToTexture,
            this.renderTarget,
          );
          (0, d.Hx)((0, c.Xk)(n), t);
        }
      }
      class f {
        constructor() {
          this.captureCamera = new h.PerspectiveCamera();
        }
        async capture(e, t, i, n, s) {
          const { camera: a, scene: o } = i.getScene();
          return (
            a.getWorldPosition(this.captureCamera.position),
            a.getWorldQuaternion(this.captureCamera.quaternion),
            this.captureCamera.projectionMatrix.copy(a.projectionMatrix),
            (this.captureCamera.layers.mask = e.mask),
            s.setSize(t.width, t.height),
            n.render(s.target, o, this.captureCamera),
            await (0, c.vP)(s)
          );
        }
      }
    },
    73521: (e, t, i) => {
      'use strict';
      i.d(t, { K: () => r });
      var n = i(75287),
        s = i(32137),
        a = i(44303);
      const o = new n.v({});
      class r {
        constructor(e, t, i) {
          (this.commandBinder = e),
            (this.layersData = t),
            (this.dataTypeGroup = i),
            (this.textParser = o),
            (this.enabled = !0),
            (this.bindings = []);
        }
        getGroupingId(e) {
          switch (e) {
            case a.HH.TYPE:
              return this.getTypeId();
            case a.HH.FLOOR:
              return this.getFloorId();
            case a.HH.ROOM:
              return this.getRoomId();
            case a.HH.LAYER:
              return this.getLayerGroupId();
            case a.HH.DATE:
              return this.dateBucket;
          }
        }
        getFloorId() {
          return this.floorId;
        }
        getRoomId() {
          return this.roomId;
        }
        getDateBucket() {
          return this.dateBucket;
        }
        getTypeId() {
          return this.typeId;
        }
        supportsBatchDelete() {
          return !1;
        }
        supportsLayeredCopyMove() {
          return !1;
        }
        getLayerGroupId() {
          var e, t;
          const i = null === (e = this.layersData) || void 0 === e ? void 0 : e.getBaseLayerId(),
            n = null === (t = this.layersData) || void 0 === t ? void 0 : t.getViewLayerId();
          return this.layerId && n && this.layerId === i ? n : this.layerId;
        }
        isLayerVisible() {
          return !this.layersData || !this.layerId || this.layersData.layerVisible(this.layerId);
        }
        onSelect(e, t, i) {
          this.commandBinder.issueCommand(new s.IL(this.id, this.typeId));
        }
        registerBindings() {}
        cancelBindings() {
          this.bindings.forEach((e) => e.cancel());
        }
      }
    },
    32137: (e, t, i) => {
      'use strict';
      i.d(t, {
        FZ: () => a,
        H1: () => s,
        Hf: () => d,
        IL: () => l,
        M8: () => o,
        Mp: () => c,
        Pe: () => u,
        SN: () => r,
        c6: () => h,
      });
      var n = i(56063);
      class s extends n.m {
        constructor(e) {
          super(), (this.payload = { query: e });
        }
      }
      s.id = 'UPDATE_SEARCH_QUERY';
      class a extends n.m {
        constructor(e) {
          super(), (this.payload = { keywords: e });
        }
      }
      a.id = 'UPDATE_SEARCH_QUERY_KEYWORDS';
      class o extends n.m {
        constructor(e) {
          super(), (this.payload = { keywordId: e });
        }
      }
      o.id = 'TOGGLE_SEARCH_QUERY_KEYWORD';
      class r extends n.m {
        constructor(e) {
          super(), (this.payload = { grouping: e });
        }
      }
      r.id = 'CHANGE_SEARCH_GROUPING';
      class d extends n.m {
        constructor() {
          super();
        }
      }
      d.id = 'SEARCH_FILTER_CLEAR';
      class c extends n.m {
        constructor(e, t) {
          super(), (this.payload = { groupId: e, enabled: t });
        }
      }
      c.id = 'SEARCH_FILTER_TOGGLE';
      class l extends n.m {
        constructor(e, t) {
          super(), (this.payload = { id: e, typeId: t });
        }
      }
      l.id = 'SELECT_SEARCH_RESULT';
      class h extends n.m {
        constructor(e) {
          super(), (this.payload = e);
        }
      }
      h.id = 'SEARCH_GROUP_REGISTER';
      class u extends n.m {
        constructor(e) {
          super(), (this.payload = { id: e });
        }
      }
      u.id = 'SEARCH_GROUP_DEREGISTER';
    },
    34474: (e, t, i) => {
      'use strict';
      i.d(t, { e: () => r });
      var n = i(85893),
        s = i(78897),
        a = i(7321),
        o = i(80308);
      function r({ id: e, icon: t, label: i, selected: r, onToggled: d }) {
        const c = (0, s.b)();
        return (0, n.jsx)(
          o.zx,
          Object.assign(
            {
              icon: t,
              label: i,
              ariaLabel: r ? c.t(a.Z.SHOWCASE.SEARCH.FILTER_SEARCH_SELECTED) : i,
              size: o.qE.SMALL,
              variant: o.Wu.TERTIARY,
              onClick: d,
              appendChildren: !1,
            },
            {
              children: (0, n.jsx)(
                'div',
                Object.assign(
                  { className: 'search-filter-selected' },
                  { children: r && (0, n.jsx)(o.JO, { name: 'checkmark' }) },
                ),
              ),
            },
          ),
          e,
        );
      }
    },
    64444: (e, t, i) => {
      'use strict';
      i.d(t, { D: () => F });
      var n = i(85893),
        s = i(67294),
        a = i(7321),
        o = i(78897),
        r = i(44303),
        d = i(54889),
        c = i(31864),
        l = i(29707),
        h = i(80366),
        u = i(38908),
        m = i(53924);
      const p = (0, u.u)(m.v);
      var g = i(40232);
      var v = i(20799),
        y = i(75921);
      function f(e) {
        return e ? e.floors.getOrderedValues() : [];
      }
      var w = i(83847),
        b = i(82441),
        T = i(16968);
      function C(e = !0) {
        const t = (function () {
          const e = (0, y.I)(),
            [t, i] = (0, s.useState)(f(e));
          return (
            (0, s.useEffect)(() => {
              if (!e) return () => {};
              const t = () => i(f(e)),
                n = e.floors.getCollection().onChanged(t);
              return t(), () => n.cancel();
            }, [e]),
            t
          );
        })();
        return D((0, c.s)(), t, r.HH.FLOOR, e);
      }
      function E(e = !0) {
        return D(
          (0, c.s)(),
          (function () {
            const e = [];
            for (const t in g.Z) e.push({ id: t });
            const [t] = (0, s.useState)(e);
            return t;
          })(),
          r.HH.DATE,
          e,
        );
      }
      function D(e, t, i, n) {
        const a = (0, v.s)(),
          [o, d] = (0, s.useState)([]);
        return (
          (0, s.useEffect)(() => {
            if (!a) return () => {};
            const s = t.reduce(
                (e, t, n) =>
                  Object.assign(Object.assign({}, e), {
                    [t.id]: { id: t.id, grouping: i, groupOrder: n, items: [], batchSupported: !0 },
                  }),
                {},
              ),
              o = {};
            e.forEach((e) => {
              const t = e.getGroupingId(i);
              if (t && s[t]) t && s[t].items.push(e);
              else {
                const t = e.getGroupingId(r.HH.TYPE);
                if (t) {
                  const i = a.getSearchDataTypeGroup(t);
                  o[t] ||
                    (o[t] = {
                      id: t,
                      grouping: r.HH.TYPE,
                      groupOrder: (0, T.j)(a, t, r.HH.TYPE),
                      items: [],
                      batchSupported: i.batchSupported,
                    }),
                    o[t].items.push(e);
                }
              }
            });
            let c = Object.values(s);
            return (
              n && (c = c.filter((e) => e.items.length > 0)),
              d(c.concat(Object.values(o))),
              () => {}
            );
          }, [a, e, t, i, n]),
          o
        );
      }
      var x = i(10535),
        A = i(92447);
      var O = i(34014),
        S = i(7254),
        P = i(80308);
      const { SEARCH: I } = a.Z.SHOWCASE,
        k = ({ group: e }) => {
          const t = (0, o.b)().t(I.EMPTY_LIST_MESSAGE);
          return (0, n.jsx)(P.gQ, { message: t });
        };
      function N(e) {
        const { excludeEmptyGroups: t } = e,
          i = C(t);
        return (0, n.jsx)(B, Object.assign({}, e, { dataGroups: i }));
      }
      function R(e) {
        const { excludeEmptyGroups: t } = e,
          i = (function (e = !0) {
            const t = (0, w.q)();
            return D((0, c.s)(), t, r.HH.ROOM, e);
          })(t);
        return (0, n.jsx)(B, Object.assign({}, e, { dataGroups: i }));
      }
      function M(e) {
        const { excludeEmptyGroups: t } = e,
          i = E(t);
        return (0, n.jsx)(B, Object.assign({}, e, { dataGroups: i }));
      }
      function j(e) {
        const { excludeEmptyGroups: t } = e,
          i = (function (e = !0) {
            const t = (0, x.b)(),
              i = Object.values(t)
                .sort((e, t) => (e.groupOrder || A.Xs) - (t.groupOrder || A.Xs))
                .map((e) => ({
                  id: e.id,
                  grouping: r.HH.TYPE,
                  groupOrder: e.groupOrder || A.Xs,
                  items: e.matches,
                  batchSupported: e.batchSupported,
                }));
            return e ? i.filter((e) => e.items.length > 0) : i;
          })(t);
        return (0, n.jsx)(B, Object.assign({}, e, { dataGroups: i }));
      }
      function L(e) {
        const { excludeEmptyGroups: t } = e,
          { editMode: i } = (0, s.useContext)(l.I),
          a = (function (e = !0) {
            const t = (0, b.Y)();
            return D((0, c.s)(), t, r.HH.LAYER, e);
          })(t),
          o = (0, S.LP)(),
          d = (i && (null == o ? void 0 : o.id)) || void 0,
          [u, m] = (0, s.useState)(void 0);
        return (
          (0, h.U)(O.ue, ({ layerId: e }) => {
            m(e);
          }),
          (0, n.jsx)(
            B,
            Object.assign({}, e, {
              dataGroups: a,
              activeGroupId: d,
              scrollToGroupId: u,
              onScrolled: () => {
                m(void 0);
              },
            }),
          )
        );
      }
      function B(e) {
        const {
            renderGroup: t,
            renderItem: i,
            dataGroups: r,
            activeItemId: c,
            activeGroupId: l,
            scrollToGroupId: h,
            onScrolled: u,
          } = e,
          [m, g] = (function () {
            const e = p(),
              [t, i] = (0, s.useState)(
                (null == e ? void 0 : e.getAccordionGroupCollapsedStates()) || {},
              );
            return (
              (0, s.useEffect)(() => {
                if (!e) return () => {};
                function t() {
                  e && i(e.getAccordionGroupCollapsedStates());
                }
                const n = e.onAccordionCollapsedGroupsChanged(t);
                return t(), () => n.cancel();
              }, [e]),
              [
                t,
                (t, i) => {
                  e && e.setAccordionGroupCollapsed(t, i);
                },
              ]
            );
          })(),
          v = (0, s.useRef)(null),
          y = (0, d.D)(),
          f = (0, s.useRef)(0),
          w = (0, o.b)();
        return (
          (0, s.useEffect)(
            () => () => {
              window.clearTimeout(f.current);
            },
            [],
          ),
          (0, s.useEffect)(
            () => (
              window.clearTimeout(f.current),
              y &&
                (f.current = window.setTimeout(() => {
                  y &&
                    r.forEach((e) => {
                      e.items.length > 0 && g(e.id, !1);
                    });
                }, 500)),
              () => {}
            ),
            [r],
          ),
          (0, s.useEffect)(() => {
            if (h && v.current) {
              v.current.scrollIntoView(`[data-id='${h}']`) && u && u();
            }
            return () => {};
          }, [h, v.current, r]),
          (0, s.useEffect)(() => {
            var e;
            if (c) {
              let t = -1;
              const i =
                null ===
                  (e = r.find((e) => {
                    const i = e.items.findIndex((e) => e.id === c);
                    return -1 !== i && ((t = i), !0);
                  })) || void 0 === e
                  ? void 0
                  : e.id;
              v.current && i && v.current.focusGroupItem(i, t);
            }
            return () => {};
          }, [r, c, v]),
          (0, n.jsx)(P.UQ, {
            ref: v,
            ariaExpandLabel: w.t(a.Z.ACCORDIONS.EXPAND),
            ariaCollapseLabel: w.t(a.Z.ACCORDIONS.COLLAPSE),
            data: r,
            itemHeight: 60,
            renderItem: i,
            renderGroup: t,
            renderEmpty: k,
            onToggleCollapse: g,
            collapsedIds: m,
            activeGroupId: l,
            collapseEmptyGroups: r.length > 1,
          })
        );
      }
      const { SEARCH: V } = a.Z.SHOWCASE;
      function F(e) {
        const { excludeEmptyGroups: t, activeItemId: i, grouping: a, emptyPhrase: l } = e,
          h = (0, s.useRef)(null),
          u = (0, o.b)(),
          m = (0, d.D)(),
          p = 0 === (0, c.s)().length,
          g = a === r.HH.FLOOR,
          v = a === r.HH.ROOM,
          y = a === r.HH.LAYER,
          f = a === r.HH.DATE,
          w = void 0 !== t ? t : m,
          b = u.t(l || V.EMPTY_LIST_MESSAGE),
          T = !!w && p,
          C = Object.assign(Object.assign({}, e), {
            scrollRef: null == h ? void 0 : h.current,
            excludeEmptyGroups: w,
            activeItemId: i,
          });
        return T
          ? (0, n.jsx)(P.gQ, { message: b })
          : (0, n.jsx)(
              'div',
              Object.assign(
                { className: 'list-contents searchable-list', ref: h },
                {
                  children: g
                    ? (0, n.jsx)(N, Object.assign({}, C))
                    : v
                      ? (0, n.jsx)(R, Object.assign({}, C))
                      : y
                        ? (0, n.jsx)(L, Object.assign({}, C))
                        : f
                          ? (0, n.jsx)(M, Object.assign({}, C))
                          : (0, n.jsx)(j, Object.assign({}, C)),
                },
              ),
            );
      }
    },
    83455: (e, t, i) => {
      'use strict';
      i.d(t, { v: () => b });
      var n = i(85893),
        s = i(7321),
        a = i(78897),
        o = i(44303),
        r = i(75921),
        d = i(67294),
        c = i(15376),
        l = i(87389);
      var h = i(15187),
        u = i(18131),
        m = i(80308);
      function p({ id: e, numItems: t }) {
        const i = (0, h.K)(),
          s = (0, u.W)(e, i);
        return (0, n.jsx)(m._m, {
          id: e,
          title: s,
          className: 'layers-group-header',
          decals: (0, n.jsx)(
            'span',
            Object.assign({ className: 'mp-list-item-text' }, { children: `(${t})` }),
          ),
        });
      }
      var g = i(10535),
        v = i(46199);
      function y({ dataTypeGroup: e }) {
        return e.groupActionsFC ? (0, n.jsx)(e.groupActionsFC, { group: e }) : null;
      }
      function f(e) {
        const {
            id: t,
            numItems: i,
            numSelected: s,
            selected: o,
            selectDisabled: r,
            selectMode: d,
            onSelect: c,
          } = e,
          l = (0, g.b)(),
          h = (0, v.A)(),
          u = (0, a.b)(),
          p = l[t];
        if (!p) return null;
        const f = (h && p.groupMatchingPhraseKey) || p.groupPhraseKey,
          w = f ? u.t(f) : t,
          b = d ? `(${s}/${i})` : `(${i})`;
        return (0, n.jsx)(m._m, {
          id: t,
          title: w,
          decals: (0, n.jsx)(
            'span',
            Object.assign({ className: 'mp-list-item-text' }, { children: b }),
          ),
          actions: (0, n.jsx)(y, { dataTypeGroup: p }),
          selectMode: d,
          selectDisabled: r,
          selected: o,
          onSelect: c,
        });
      }
      function w(e) {
        const { id: t, numItems: i, numSelected: s, selected: o, selectMode: r, onSelect: d } = e,
          c = (0, a.b)().t(`SHOWCASE.NOTES.${t}`),
          l = r ? `(${s}/${i})` : `(${i})`;
        return (0, n.jsx)(m._m, {
          id: t,
          title: c,
          decals: (0, n.jsx)(
            'span',
            Object.assign({ className: 'mp-list-item-text' }, { children: l }),
          ),
          selectMode: r,
          selected: o,
          onSelect: d,
        });
      }
      const b = ({ group: e }) => {
        const { id: t, items: i, grouping: s } = e;
        switch (s) {
          case o.HH.TYPE:
            return (0, n.jsx)(f, { id: t, numItems: i.length });
          case o.HH.FLOOR:
            return (0, n.jsx)(T, { id: t, numItems: i.length });
          case o.HH.ROOM:
            return (0, n.jsx)(C, { id: t, numItems: i.length });
          case o.HH.DATE:
            return (0, n.jsx)(w, { id: t, numItems: i.length });
          case o.HH.LAYER:
            return (0, n.jsx)(p, { id: t, numItems: i.length });
        }
      };
      function T({ id: e, numItems: t }) {
        const i = (0, r.I)();
        let o = (0, a.b)().t(s.Z.FLOOR_ALL);
        return (
          i && e && (o = i.getFloorName(e)),
          (0, n.jsx)(m._m, {
            id: e,
            title: o,
            decals: (0, n.jsx)(
              'span',
              Object.assign({ className: 'mp-list-item-text' }, { children: `(${t})` }),
            ),
          })
        );
      }
      function C({ id: e, numItems: t }) {
        const i = (function (e) {
          const t = (0, c.S)(),
            i = (0, a.b)(),
            [n, s] = (0, d.useState)((0, l.LN)(e, i, t));
          return (
            (0, d.useEffect)(() => {
              if (!t) return () => {};
              function n() {
                s((0, l.LN)(e, i, t));
              }
              const a = t.onRoomsChanged({ onUpdated: n });
              return n(), () => a.cancel();
            }, [i, t, e]),
            n
          );
        })(e);
        return (0, n.jsx)(m._m, {
          id: e,
          title: i,
          decals: (0, n.jsx)(
            'span',
            Object.assign({ className: 'mp-list-item-text' }, { children: `(${t})` }),
          ),
        });
      }
    },
    65162: (e, t, i) => {
      'use strict';
      i.d(t, { B: () => M });
      var n = i(85893),
        s = i(67294),
        a = i(94184),
        o = i.n(a),
        r = i(29707),
        d = i(7321),
        c = i(27163),
        l = i(92257),
        h = i(27538),
        u = i(6704),
        m = i(78897),
        p = i(61173),
        g = i(20470),
        v = i(46199),
        y = i(92815),
        f = i(60631),
        w = i(32137),
        b = i(27946),
        T = i(10765),
        C = i(80308),
        E = i(91774);
      function D(e) {
        const { query: t, keywordFilters: i, typeFilters: a } = e,
          { locale: o, analytics: c, editMode: l, settings: h } = (0, s.useContext)(r.I),
          [u, m] = (0, s.useState)(!1),
          p = l || h.tryGetProperty(E.Yo, !1),
          g = (0, s.useCallback)(() => {
            const e = (0, T.Uo)(t, i, a);
            (0, b.v)(e), m(!0);
            const n = l ? 'workshop_gui' : 'showcase_gui';
            c.track(n, { gui_action: 'space_search_share_link_clicked' });
          }, [t, i, a, l, c]);
        return (
          (0, s.useEffect)(() => {
            if (!u) return () => {};
            const e = window.setTimeout(() => m(!1), 2500);
            return () => window.clearTimeout(e);
          }, [u]),
          p
            ? u
              ? (0, n.jsx)(
                  'span',
                  Object.assign({ className: 'link-copied' }, { children: o.t(d.Z.SHARE_COPIED) }),
                )
              : (0, n.jsx)(C.zx, {
                  onClick: g,
                  icon: 'share',
                  variant: C.Wu.TERTIARY,
                  tooltip: o.t(d.Z.COPY_URL),
                })
            : null
        );
      }
      var x = i(39159),
        A = i(18808),
        O = i(20510);
      const { SEARCH: S } = d.Z.SHOWCASE;
      function P({ filter: e, readOnly: t, shareEnabled: i }) {
        const { commandBinder: a } = (0, s.useContext)(r.I),
          d = (0, s.useRef)(null),
          b = (0, s.useRef)(null),
          T = (0, m.b)(),
          E = (0, h.T)(),
          P = (0, u.E)(),
          I = (0, v.A)(),
          k = (0, y.f)(),
          N = (0, f.b)(),
          R = (0, s.useMemo)(() => (0, p.Jm)(), []),
          M = E === c.wS.BOTTOM_PANEL && P,
          j = (0, A.p)((0, O.O)()),
          L = (0, s.useCallback)(
            (e) => {
              a.issueCommand(new w.H1(e));
            },
            [a],
          ),
          B = T.t(S.SEARCH_IN_TOOL_PLACEHOLDER),
          V = T.t(S.CLEAR_SEARCH).toLocaleUpperCase(),
          F = k.length > 0 || N.length > 0 || '' !== I,
          _ = i && F,
          H = R ? void 0 : g.El;
        return (0, n.jsxs)(
          'div',
          Object.assign(
            { ref: b, className: o()('list-search', 'search-panel-header') },
            {
              children: [
                (0, n.jsxs)(
                  'div',
                  Object.assign(
                    { className: 'search-bar' },
                    {
                      children: [
                        (0, n.jsx)('span', {
                          className: o()('search-header-icon', 'icon', 'icon-magnifying-glass', {
                            'search-header-icon-active': F,
                          }),
                        }),
                        (0, n.jsx)(x.Z, {
                          text: I,
                          onInput: L,
                          onDone: (e) => {
                            M && e && a.issueCommand(new l.Fg(!1));
                          },
                          onCancel: () => {
                            a.issueCommand(new l.eS());
                          },
                          placeholder: B,
                          onFocus: () => {
                            j &&
                              M &&
                              R &&
                              (a.issueCommand(new l.Fg(!1)),
                              window.setTimeout(() => {
                                b.current &&
                                  b.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }, g.El));
                          },
                          ref: d,
                          focusOnMount: H,
                          readOnly: t,
                        }),
                        (0, n.jsxs)(
                          'div',
                          Object.assign(
                            { className: 'search-header-button-container' },
                            {
                              children: [
                                '' !== I &&
                                  (0, n.jsx)(C.zx, {
                                    onClick: () => {
                                      L(''), d.current && !R && d.current.focus();
                                    },
                                    label: V,
                                    size: C.qE.SMALL,
                                    variant: C.Wu.TERTIARY,
                                  }),
                                _ && (0, n.jsx)(D, { query: I, keywordFilters: k, typeFilters: N }),
                              ],
                            },
                          ),
                        ),
                      ],
                    },
                  ),
                ),
                e,
              ],
            },
          ),
        );
      }
      var I = i(10535);
      const { SEARCH: k } = d.Z.SHOWCASE;
      function N({ id: e, label: t }) {
        const { commandBinder: i } = (0, s.useContext)(r.I),
          a = (0, m.b)().t(k.FILTER_SEARCH_REMOVE);
        return (0, n.jsx)(C.zx, {
          icon: 'close',
          label: t,
          tooltip: a,
          tooltipOptions: { placement: 'bottom' },
          size: C.qE.SMALL,
          variant: C.Wu.FAB,
          theme: 'dark',
          onClick: () => {
            i.issueCommand(new w.Mp(e, !1));
          },
          reverse: !0,
        });
      }
      function R() {
        const e = (0, m.b)(),
          t = (0, I.b)(),
          i = (0, f.b)();
        if (0 === i.length) return null;
        const s = [];
        return (
          i.forEach((i) => {
            const a = t[i];
            if (a) {
              const t = e.t(a.groupPhraseKey);
              s.push((0, n.jsx)(N, { id: i, label: t }, i));
            }
          }),
          (0, n.jsx)('div', Object.assign({ className: 'search-filter-pills' }, { children: s }))
        );
      }
      function M(e) {
        const { shareEnabled: t = !1, filterPills: i = !1, filter: s } = e;
        return (0, n.jsxs)(
          'div',
          Object.assign(
            { className: 'list-subheaders' },
            { children: [(0, n.jsx)(P, { filter: s, shareEnabled: t }), i && (0, n.jsx)(R, {})] },
          ),
        );
      }
    },
    54889: (e, t, i) => {
      'use strict';
      i.d(t, { D: () => d });
      var n = i(46199),
        s = i(60631),
        a = i(92815),
        o = i(27163),
        r = i(30300);
      function d() {
        const e = (0, n.A)(),
          t = (0, s.b)(),
          i = (0, a.f)(),
          d = (0, r.B)(),
          c = d === o.w1.SEARCH || d === o.w1.LAYERS;
        return !!e || (c && t.length > 0) || i.length > 0;
      }
    },
    20799: (e, t, i) => {
      'use strict';
      i.d(t, { s: () => a });
      var n = i(38908),
        s = i(47149);
      const a = (0, n.u)(s.T);
    },
    10535: (e, t, i) => {
      'use strict';
      i.d(t, { b: () => a });
      var n = i(67294),
        s = i(20799);
      function a() {
        const e = (0, s.s)(),
          [t, i] = (0, n.useState)((null == e ? void 0 : e.dataTypeGroups) || {});
        return (
          (0, n.useEffect)(() => {
            if (!e) return () => {};
            function t() {
              e && i(e.dataTypeGroups);
            }
            const n = e.onChanged(t);
            return t(), () => n.cancel();
          }, [e]),
          t
        );
      }
    },
    92815: (e, t, i) => {
      'use strict';
      i.d(t, { f: () => a });
      var n = i(67294),
        s = i(20799);
      function a() {
        const e = (0, s.s)(),
          [t, i] = (0, n.useState)((null == e ? void 0 : e.getKeywordFilters()) || []);
        return (
          (0, n.useEffect)(() => {
            if (!e) return () => {};
            function t() {
              e && i(e.getKeywordFilters());
            }
            const n = e.keywordFilters.onChanged(t);
            return t(), () => n.cancel();
          }, [e]),
          t
        );
      }
    },
    46199: (e, t, i) => {
      'use strict';
      i.d(t, { A: () => a });
      var n = i(16996),
        s = i(47149);
      const a = (0, n.M)(s.T, 'query', '');
    },
    31864: (e, t, i) => {
      'use strict';
      i.d(t, { s: () => a });
      var n = i(67294),
        s = i(20799);
      function a() {
        const e = (0, s.s)(),
          [t, i] = (0, n.useState)((null == e ? void 0 : e.getResults()) || []);
        return (
          (0, n.useEffect)(() => {
            if (!e) return () => {};
            function t() {
              e && i(e.getResults());
            }
            const n = e.onSearchResultsChanged(t);
            return t(), () => n.cancel();
          }, [e]),
          t
        );
      }
    },
    60631: (e, t, i) => {
      'use strict';
      i.d(t, { b: () => a });
      var n = i(67294),
        s = i(20799);
      function a() {
        const e = (0, s.s)(),
          [t, i] = (0, n.useState)((null == e ? void 0 : e.getTypeFilters()) || []);
        return (
          (0, n.useEffect)(() => {
            if (!e) return () => {};
            function t() {
              e && i(e.getTypeFilters());
            }
            const n = e.typeFilters.onChanged(t);
            return t(), () => n.cancel();
          }, [e]),
          t
        );
      }
    },
    58131: (e, t, i) => {
      'use strict';
      i.d(t, { k: () => a });
      var n = i(16996),
        s = i(47149);
      const a = (0, n.M)(s.T, 'activeItemId', null);
    },
    61254: (e, t, i) => {
      'use strict';
      i.r(t),
        i.d(t, {
          ChangeSearchGroupingCommand: () => A.SN,
          ClearSearchFiltersCommand: () => A.Hf,
          DeregisterSearchGroupCommand: () => A.Pe,
          RegisterSearchGroupCommand: () => A.c6,
          SelectSearchResultCommand: () => A.IL,
          ToggleSearchFilterCommand: () => A.Mp,
          ToggleSearchQueryKeywordCommand: () => A.M8,
          UpdateSearchQueryCommand: () => A.H1,
          UpdateSearchQueryKeywordsCommand: () => A.FZ,
          default: () => Se,
        });
      var n = i(933),
        s = i(4763),
        a = i(7321),
        o = i(6394),
        r = i(88288),
        d = i(24938),
        c = i(64150),
        l = i(96768),
        h = i(70593),
        u = i(27163),
        m = i(92257),
        p = i(59635),
        g = i(53310);
      class v {
        constructor(e) {
          this.engine = e;
        }
        async activate() {
          await this.engine.commandBinder.issueCommandWhenBound(new g.O(!0, !1, !1));
        }
        async deactivate() {
          await this.engine.commandBinder.issueCommandWhenBound(new g.O(!1, !1, !1));
        }
      }
      var y = i(85893),
        f = i(67294),
        w = i(29707),
        b = i(78897),
        T = i(16996),
        C = i(47149);
      const E = (0, T.M)(C.T, 'grouping', C.T.defaultGrouping);
      var D = i(31864),
        x = i(58131),
        A = i(32137),
        O = i(20470),
        S = i(80308),
        P = i(77963);
      const I = (0, T.M)(C.T, 'searchMode', !1);
      var k = i(17106),
        N = i(56966),
        R = i(44303);
      const { SEARCH: M } = a.Z.SHOWCASE;
      function j({ phraseKeys: e = {}, grouping: t, onGroupBy: i }) {
        const n = (0, b.b)(),
          s = (0, P.y)(N.Wp, !1),
          a = I(),
          o = [R.HH.DATE, R.HH.FLOOR];
        'boolean' == typeof a && o.unshift(R.HH.TYPE), s && o.push(R.HH.LAYER);
        const r = n.t(B(t, !0, e));
        return (0, y.jsx)(
          S.xz,
          Object.assign(
            {
              className: 'grouping-sort-menu-button',
              ariaLabel: r,
              variant: S.Wu.TERTIARY,
              label: r,
              caret: !0,
            },
            {
              children: o.map((t) =>
                (0, y.jsx)(L, { onGroupBy: i, grouping: t, phraseKeys: e }, t),
              ),
            },
          ),
        );
      }
      function L({ grouping: e, onGroupBy: t, phraseKeys: i = {} }) {
        const { analytics: n } = (0, f.useContext)(w.I),
          s = (0, b.b)().t(B(e, !1, i)),
          a = (0, k.e)();
        return (0, y.jsx)(
          S.zx,
          {
            label: s,
            size: S.qE.SMALL,
            variant: S.Wu.TERTIARY,
            onClick: () => {
              t(e), n.trackGuiEvent(`items_group_by_${e}`, { tool: a });
            },
          },
          e,
        );
      }
      function B(e, t, i) {
        var n, s, a, o, r, d, c, l, h, u;
        switch (e) {
          case R.HH.TYPE:
            return t
              ? (null === (n = i[R.HH.TYPE]) || void 0 === n ? void 0 : n.selectedTextKey) ||
                  M.GROUP_TYPE_SELECTED
              : (null === (s = i[R.HH.TYPE]) || void 0 === s ? void 0 : s.textKey) || M.GROUP_TYPE;
          case R.HH.FLOOR:
            return t
              ? (null === (a = i[R.HH.FLOOR]) || void 0 === a ? void 0 : a.selectedTextKey) ||
                  M.GROUP_FLOOR_SELECTED
              : (null === (o = i[R.HH.FLOOR]) || void 0 === o ? void 0 : o.textKey) ||
                  M.GROUP_FLOOR;
          case R.HH.ROOM:
            return t
              ? (null === (r = i[R.HH.ROOM]) || void 0 === r ? void 0 : r.selectedTextKey) ||
                  M.GROUP_ROOM_SELECTED
              : (null === (d = i[R.HH.ROOM]) || void 0 === d ? void 0 : d.textKey) || M.GROUP_ROOM;
          case R.HH.LAYER:
            return t
              ? (null === (c = i[R.HH.LAYER]) || void 0 === c ? void 0 : c.selectedTextKey) ||
                  M.GROUP_LAYER_SELECTED
              : (null === (l = i[R.HH.LAYER]) || void 0 === l ? void 0 : l.textKey) ||
                  M.GROUP_LAYER;
          case R.HH.DATE:
          default:
            return t
              ? (null === (h = i[R.HH.DATE]) || void 0 === h ? void 0 : h.selectedTextKey) ||
                  M.GROUP_DATE_SELECTED
              : (null === (u = i[R.HH.DATE]) || void 0 === u ? void 0 : u.textKey) || M.GROUP_DATE;
        }
      }
      var V = i(83455),
        F = i(94184),
        _ = i.n(F),
        H = i(73515),
        U = i(53972),
        G = i(92394);
      function z({ item: e }) {
        const { imgUrl: t, color: i, icon: n } = e;
        return t
          ? (0, y.jsx)(U.X, { className: 'thumbnail-image', resource: t })
          : n
            ? (0, y.jsx)(G.C, {
                badgeStyle: void 0 !== i ? { background: i, borderColor: i } : {},
                iconClass: n,
              })
            : null;
      }
      var W = i(46199),
        $ = i(35748),
        K = i(69634);
      function Z({ item: e }) {
        const { textParser: t, title: i, description: n } = e,
          s = (0, W.A)();
        let a = i;
        a && (a = (0, $.vr)(a, s));
        let o = n;
        return (
          o && (o = (0, $.zf)(o, s)),
          (0, y.jsxs)(
            'div',
            Object.assign(
              { className: 'item-details' },
              {
                children: [
                  (0, y.jsx)(
                    'div',
                    Object.assign(
                      { className: 'item-header' },
                      {
                        children: (0, y.jsx)(K.S, { text: a || '', textParser: t, markers: $.PP }),
                      },
                    ),
                  ),
                  t &&
                    (0, y.jsx)(
                      'div',
                      Object.assign(
                        { className: 'item-description' },
                        {
                          children: (0, y.jsx)(K.S, {
                            text: o || '',
                            textParser: t,
                            markers: $.PP,
                          }),
                        },
                      ),
                    ),
                ],
              },
            ),
          )
        );
      }
      const { SEARCH: Y } = a.Z.SHOWCASE,
        J = ({ item: e }) => {
          const t = (0, b.b)();
          if (!e) {
            const e = t.t(Y.EMPTY_LIST_MESSAGE);
            return (0, y.jsx)(S.gQ, { message: e });
          }
          const { dataTypeGroup: i } = e;
          return (null == i ? void 0 : i.itemFC)
            ? (0, y.jsx)(i.itemFC, { item: e })
            : (0, y.jsx)(q, { item: e }, e.id);
        };
      function q({ item: e, className: t }) {
        const i = (0, x.k)(),
          n = e.id,
          s = !!i && n === i,
          { analytics: a, commandBinder: o } = (0, f.useContext)(w.I),
          r = (0, y.jsx)(z, { item: e }),
          d = (0, y.jsx)(Z, { item: e });
        return (0, y.jsx)(
          S.HC,
          {
            id: n,
            className: _()('search-result-item', t),
            title: d,
            active: s,
            disabled: !e.enabled,
            onClick: async () => {
              const t = 'search_item_' + e.typeId.toLowerCase() + '_click';
              a.track('showcase_gui', { tool: 'search', gui_action: t }),
                o.issueCommand(new m.qy(!0)),
                await o.issueCommand(new H.yL()),
                e.onSelect();
            },
            badge: r || void 0,
          },
          n,
        );
      }
      var Q = i(64444),
        X = i(10535),
        ee = i(60631),
        te = i(92447),
        ie = i(34474);
      function ne({ id: e, icon: t, label: i, selected: n }) {
        const { commandBinder: s, analytics: a } = (0, f.useContext)(w.I),
          o = (0, k.e)();
        return (0, y.jsx)(ie.e, {
          id: e,
          icon: t,
          label: i,
          selected: n,
          onToggled: (t) => {
            t.stopPropagation(),
              'ALL' === e ? n || s.issueCommand(new A.Hf()) : s.issueCommand(new A.Mp(e, !n)),
              n || a.trackGuiEvent(`items_filter_by_${e.toLowerCase()}`, { tool: o });
          },
        });
      }
      var se = i(38637);
      i(11669);
      const { SEARCH: ae } = a.Z.SHOWCASE;
      function oe() {
        const e = (0, b.b)(),
          t = Object.values((0, X.b)()),
          i = (0, ee.b)(),
          n = 0 === i.length,
          s = (0, f.useRef)(null),
          a = t
            .sort((e, t) => (e.groupOrder || te.Xs) - (t.groupOrder || te.Xs))
            .map((t) => {
              const { id: s, groupIcon: a, groupPhraseKey: o } = t,
                r = e.t(o),
                d = !n && i.includes(s);
              return (0, y.jsx)(ne, { id: s, icon: a, label: r, selected: d }, s);
            }),
          o = e.t(ae.FILTER_SEARCH),
          r = e.t(ae.FILTER_SEARCH_ALL);
        return (0, y.jsx)(
          'div',
          Object.assign(
            { className: 'search-filter', onClick: (e) => e.stopPropagation() },
            {
              children: (0, y.jsxs)(
                S.xz,
                Object.assign(
                  {
                    ariaLabel: e.t(ae.FILTER_SEARCH_LABEL),
                    ref: s,
                    icon: 'filter',
                    variant: S.Wu.TERTIARY,
                    size: S.qE.SMALL,
                    menuClassName: 'search-filter-menu',
                  },
                  {
                    children: [
                      (0, y.jsxs)(
                        'div',
                        Object.assign(
                          { className: 'search-filter-menu-header' },
                          {
                            children: [
                              (0, y.jsx)('div', { children: o }),
                              (0, y.jsx)(se.P, {
                                onClose: () => {
                                  s.current && s.current.closeMenu();
                                },
                              }),
                            ],
                          },
                        ),
                      ),
                      (0, y.jsx)(ne, { id: 'ALL', icon: 'fullscreen', label: r, selected: n }),
                      a,
                    ],
                  },
                ),
              ),
            },
          ),
        );
      }
      var re = i(65162),
        de = i(36010);
      const { SEARCH: ce } = a.Z.SHOWCASE;
      function le() {
        const { commandBinder: e } = (0, f.useContext)(w.I),
          t = E(),
          i = (0, D.s)(),
          n = (0, x.k)(),
          s = (0, b.b)();
        const a = i.length,
          o = s.t(ce.ITEMS, a),
          r = s.t(ce.EMPTY_LIST_MESSAGE),
          d = (0, y.jsx)(re.B, { filter: (0, y.jsx)(oe, {}), filterPills: !0, shareEnabled: !0 });
        return (0, y.jsxs)(
          de.L,
          Object.assign(
            {
              toolId: u.w1.SEARCH,
              className: 'search-tool-panel',
              title: o,
              subheader: d,
              subheaderCollapsedHeight: O.vH,
            },
            {
              children: [
                (0, y.jsx)(
                  S.w0,
                  Object.assign(
                    { className: 'list-panel-controls' },
                    {
                      children: (0, y.jsx)(j, {
                        grouping: t,
                        onGroupBy: function (t) {
                          e.issueCommand(new A.SN(t));
                        },
                      }),
                    },
                  ),
                ),
                (0, y.jsx)(
                  'div',
                  Object.assign(
                    { className: 'panel-list search-panel-list' },
                    {
                      children:
                        0 === a
                          ? (0, y.jsx)(S.gQ, { message: r })
                          : (0, y.jsx)(Q.D, {
                              renderGroup: V.v,
                              renderItem: J,
                              activeItemId: n,
                              grouping: t,
                              excludeEmptyGroups: !0,
                            }),
                    },
                  ),
                ),
              ],
            },
          ),
        );
      }
      var he = i(20799);
      const ue = (e, t) =>
          Number(t.isSelected) - Number(e.isSelected) || e.text.localeCompare(t.text),
        me = { fixtures: 'KEYWORDS_FIXTURES' };
      function pe() {
        const e = (0, b.b)(),
          t = (function () {
            const e = (0, he.s)(),
              [t, i] = (0, f.useState)((null == e ? void 0 : e.getKeywordSummaries()) || []);
            return (
              (0, f.useEffect)(() => {
                if (!e) return () => {};
                function t() {
                  e && i(e.getKeywordSummaries());
                }
                const n = e.keywordCounts.onChanged(t),
                  s = e.keywordFilters.onChanged(t);
                return (
                  t(),
                  () => {
                    n.cancel(), s.cancel();
                  }
                );
              }, [e]),
              t
            );
          })();
        return (0, f.useMemo)(
          () =>
            t
              .map((t) =>
                Object.assign(Object.assign({}, t), { text: me[t.id] ? e.t(me[t.id]) : t.text }),
              )
              .sort(ue),
          [t, e],
        );
      }
      const ge = () => {
        const e = pe(),
          t = (function (e, t) {
            const { engine: i } = (0, f.useContext)(w.I);
            return (0, f.useCallback)(
              (...n) => {
                const s = t ? (Array.isArray(t) ? t : t(...n)) : [];
                i.commandBinder.issueCommand(new e(...s));
              },
              [e, t, i],
            );
          })(A.M8, (e) => [e.id]);
        return (0, y.jsx)(S.no, {
          className: 'search-keyword-summary',
          tokens: e,
          onTokenClick: t,
          maxVisibleTruncated: 5,
          allowSelect: !0,
        });
      };
      var ve = i(15290),
        ye = i(3989),
        fe = i(6704),
        we = i(27538),
        be = i(43948);
      function Te() {
        const e = (0, fe.E)(),
          t = (0, we.T)(),
          i = t === u.wS.NARROW || t === u.wS.BOTTOM_PANEL,
          n = !e && t === u.wS.BOTTOM_PANEL;
        return (0, be.R)() && n
          ? null
          : (0, y.jsx)(
              'div',
              Object.assign(
                { className: 'search-tool-overlay' },
                {
                  children: i
                    ? (0, y.jsx)(
                        ve.Z,
                        Object.assign(
                          { direction: ye.Nm.horizontal },
                          { children: (0, y.jsx)(ge, {}) },
                        ),
                      )
                    : (0, y.jsx)(ge, {}),
                },
              ),
            );
      }
      class Ce {
        constructor() {
          (this.renderPanel = () => (0, y.jsx)(le, {})),
            (this.renderOverlay = () => (0, y.jsx)(Te, {}));
        }
      }
      function Ee(...e) {
        return !0;
      }
      function De(...e) {
        return !1;
      }
      class xe {
        constructor(e) {
          (this.searchData = e),
            (this.subscriptions = []),
            (this.isSearchingGroup = (e) => {
              const t = this.searchData.searchMode;
              return !0 === t || t === e;
            }),
            (this.onFiltersChanged = () => {
              this.updateAvailableKeywords(),
                this.clearUnavailableKeywordFilters(),
                this.searchData.getSearchDataTypeList().forEach(this.updateMatches),
                this.updateResults();
            }),
            (this.updateAvailableKeywords = () => {
              const e = this.getActiveSearchDataTypeList().reduce((e, { getKeywords: t }) => {
                if (t) {
                  t().forEach((t) => {
                    e[t] ? e[t]++ : (e[t] = 1);
                  });
                }
                return e;
              }, {});
              this.searchData.setKeywordCounts(e);
            }),
            (this.updateMatches = (e) => {
              const { id: t, getSimpleMatches: i } = e,
                n = this.searchData.getTypeFilters(),
                s = this.searchData.getQuery(),
                a =
                  0 === n.length || n.includes(t)
                    ? (function (e) {
                        if (!e) return Ee;
                        const t = e.toLowerCase();
                        return (...e) =>
                          (function (e, ...t) {
                            return t.some((t) => t.toLowerCase().includes(e));
                          })(t, ...e);
                      })(s)
                    : De,
                o = this.searchData.getKeywordFilters();
              e.matches = i(a, e, s, o);
            }),
            (this.activationChanged = (e) => {
              e
                ? this.updateAllMatchesAndResults()
                : this.searchData.getSearchDataTypeList().forEach(this.revealItems);
            }),
            (this.revealItems = (e) => {
              e.getSimpleMatches(Ee, e, '', []);
            }),
            (this.updateAllMatchesAndResults = (0, o.D)(() => {
              this.updateAvailableKeywords(),
                this.searchData.getSearchDataTypeList().forEach(this.updateMatches),
                this.updateResults();
            }, 200)),
            this.subscriptions.push(
              e.onPropertyChanged('query', this.updateAllMatchesAndResults),
              e.onPropertyChanged('keywordFilters', this.updateAllMatchesAndResults),
              e.onPropertyChanged('searchMode', this.activationChanged),
              e.typeFilters.onChanged(this.onFiltersChanged),
            );
        }
        dispose() {
          const e = (e) => e.cancel();
          this.subscriptions.forEach(e),
            this.searchData.getSearchDataTypeList().forEach((t) => t.subscriptions.forEach(e));
        }
        registerSearchGroup(e, t, i) {
          const n = () => {
            this.updateMatches(e), this.updateResults(), this.updateAvailableKeywords();
          };
          let s = !1,
            a = !1;
          const r = (0, o.D)(() => {
            a ? (n(), (s = !1)) : (s = !0);
          }, 200);
          t && e.subscriptions.push(t(r));
          const d = (t) => {
            const n = a;
            (a = this.isSearchingGroup(e.id)), i && n !== a && i(a && t), a && s && r();
          };
          e.subscriptions.push(this.searchData.onPropertyChanged('searchMode', d)),
            d(this.searchData.searchMode);
        }
        deregisterSearchGroup(e) {
          e.subscriptions.forEach((e) => e.cancel()), this.updateResults();
        }
        clearUnavailableKeywordFilters() {
          const e = this.searchData.getTypeFilters().length > 0,
            t = this.getActiveSearchDataTypeList().find((e) => !!e.getKeywords);
          e && !t && this.searchData.setKeywordFilters([]);
        }
        getActiveSearchDataTypeList() {
          const e = this.searchData.typeFilters;
          return this.searchData
            .getSearchDataTypeList()
            .filter((t) => 0 === e.length || e.includes(t.id));
        }
        updateResults() {
          const e = this.searchData
            .getSearchDataTypeList()
            .reduce((e, t) => (e.push(...t.matches), e), []);
          this.searchData.setResults(e);
        }
      }
      const { TOOLS: Ae } = a.Z;
      class Oe extends n.Y {
        constructor() {
          super(...arguments),
            (this.name = 'search'),
            (this.searchData = new C.T()),
            (this.deactivateTimeout = 0),
            (this.hasStartedTrackingQueries = !1),
            (this.onApplicationChange = async () => {
              this.updateFeatureEnablement();
            }),
            (this.registerSearchGroup = async (e) => {
              const {
                id: t,
                groupPhraseKey: i,
                groupMatchingPhraseKey: n,
                getSimpleMatches: s,
                getKeywords: a,
                groupOrder: o,
                groupIcon: r,
                registerChangeObserver: d,
                onSearchActivatedChanged: c,
                itemFC: l,
                itemActionsFC: h,
                groupActionsFC: u,
                batchSupported: m = !1,
              } = e;
              if (this.searchData.dataTypeGroups[t])
                return void this.log.debug('Search group already registered');
              const p = {
                id: t,
                groupPhraseKey: i,
                groupMatchingPhraseKey: n,
                getSimpleMatches: s,
                getKeywords: a,
                groupOrder: o,
                groupIcon: r,
                matches: [],
                subscriptions: [],
                itemFC: l,
                itemActionsFC: h,
                groupActionsFC: u,
                batchSupported: m,
              };
              (this.searchData.dataTypeGroups[t] = p),
                this.searchResultsUpdater.registerSearchGroup(p, d, c);
            }),
            (this.deregisterSearchGroup = async (e) => {
              const { id: t } = e,
                i = this.searchData.dataTypeGroups[t];
              i
                ? (delete this.searchData.dataTypeGroups[t],
                  this.searchResultsUpdater.deregisterSearchGroup(i))
                : this.log.debug('Search group not found to deregister');
            }),
            (this.updateQuery = async (e) => {
              this.searchData.setQuery(e.query), this.searchData.commit();
            }),
            (this.updateQueryKeywords = async (e) => {
              this.searchData.setKeywordFilters(e.keywords);
            }),
            (this.toggleQueryKeyword = async ({ keywordId: e }) => {
              const t = [...this.searchData.getKeywordFilters()];
              t.includes(e) ? t.splice(t.indexOf(e), 1) : t.push(e),
                this.searchData.setKeywordFilters(t);
            }),
            (this.selectSearchResult = async (e) => {
              const { id: t, typeId: i } = e,
                { activeItemId: n, selectedType: s } = this.searchData;
              (t === n && i === s) ||
                ((this.searchData.activeItemId = t),
                (this.searchData.selectedType = (t && i) || null),
                this.searchData.commit());
            }),
            (this.changeGrouping = async (e) => {
              (this.searchData.grouping = e.grouping), this.searchData.commit();
            }),
            (this.toggleSearchFilter = async (e) => {
              const { groupId: t, enabled: i } = e;
              this.searchData.toggleSearchFilter(t, i);
              this.searchData.getTypeFilters().length ===
                Object.keys(this.searchData.dataTypeGroups).length &&
                this.searchData.clearTypeFilters();
            }),
            (this.onToolChanged = () => {
              const e = this.toolsData.getActiveTool(),
                t = null == e ? void 0 : e.searchModeType;
              if ((window.clearTimeout(this.deactivateTimeout), t)) {
                const e = 'string' == typeof t ? t : void 0;
                this.activateSearchMode(e),
                  e ? this.searchData.setTypeFilter(e) : this.searchData.clearTypeFilters();
              } else this.deactivateSearchMode();
            }),
            (this.trackQuery = (0, o.D)(() => {
              const e = this.searchData.query.substring(0, 1e3),
                t = this.searchData
                  .getKeywordFilters()
                  .map((e) => e.trim())
                  .sort()
                  .join(',');
              if (!e && !t) return;
              const i = !this.hasStartedTrackingQueries && e === this.config.urlQuery;
              this.analytics.track('space_search_queried', {
                query: e,
                queryKeywords: t,
                submittedByUrlParam: i,
              }),
                (this.hasStartedTrackingQueries = !0);
            }, 1e3));
        }
        async init(e, t) {
          if (
            ((this.config = e),
            (this.engine = t),
            ([this.toolsData, this.appData, this.settingsData, this.analytics] = await Promise.all([
              t.market.waitForData(h.t),
              t.market.waitForData(d.pu),
              t.market.waitForData(c.e),
              t.getModuleBySymbol(s.V6),
            ])),
            this.bindings.push(
              t.subscribe(r.bS, this.onApplicationChange),
              this.searchData.onPropertyChanged('query', this.trackQuery),
              this.searchData.onPropertyChanged('keywordFilters', this.trackQuery),
              this.toolsData.onPropertyChanged('activeToolName', this.onToolChanged),
              t.commandBinder.addBinding(A.H1, this.updateQuery),
              t.commandBinder.addBinding(A.FZ, this.updateQueryKeywords),
              t.commandBinder.addBinding(A.M8, this.toggleQueryKeyword),
              t.commandBinder.addBinding(A.SN, this.changeGrouping),
              t.commandBinder.addBinding(A.Mp, this.toggleSearchFilter),
              t.commandBinder.addBinding(A.Hf, async () => this.searchData.clearTypeFilters()),
              t.commandBinder.addBinding(A.IL, this.selectSearchResult),
              t.commandBinder.addBinding(A.c6, this.registerSearchGroup),
              t.commandBinder.addBinding(A.Pe, this.deregisterSearchGroup),
            ),
            (this.searchResultsUpdater = new xe(this.searchData)),
            this.updateFeatureEnablement(),
            (0, l.J)(this.settingsData) &&
              (void 0 !== e.urlQuery ||
                void 0 !== e.urlQueryKeywords ||
                void 0 !== e.urlQueryFilters))
          ) {
            const t = decodeURIComponent(e.urlQuery || '');
            this.searchData.setQuery(t), this.searchData.commit();
            const i = decodeURIComponent(e.urlQueryFilters || '').trim(),
              n = i ? i.split(',') : [];
            n.length > 0 && this.searchData.setTypeFilters(n);
            const s = decodeURIComponent(e.urlQueryKeywords || '').trim(),
              a = s ? s.split(',') : [];
            a.length > 0 && this.searchData.setKeywordFilters(a);
            const o = this.toolsData.getTool(u.w1.LAYERS) ? u.w1.LAYERS : u.w1.SEARCH;
            this.engine.commandBinder.issueCommand(new m.tT(o, !0));
          }
          t.market.register(this, C.T, this.searchData);
        }
        dispose(e) {
          super.dispose(e),
            window.clearTimeout(this.deactivateTimeout),
            this.searchResultsUpdater && this.searchResultsUpdater.dispose();
        }
        updateFeatureEnablement() {
          if (
            !(this.appData.application === d.Mx.WORKSHOP) &&
            (0, l.J)(this.settingsData) &&
            !this.toolsData.getTool(u.w1.SEARCH)
          ) {
            const e = new p.U({
              id: u.w1.SEARCH,
              searchModeType: !0,
              namePhraseKey: Ae.SEARCH,
              panel: !0,
              panelLeft: !0,
              icon: 'icon-magnifying-glass',
              analytic: 'search',
              dimmed: !1,
              enabled: !0,
              hidesAppBar: !0,
              order: 1,
              ui: new Ce(),
              manager: new v(this.engine),
            });
            this.engine.commandBinder.issueCommand(new m.MV([e]));
          }
        }
        activateSearchMode(e) {
          const t = e || !0;
          this.searchData.searchMode !== t &&
            ((this.searchData.searchMode = t), this.searchData.commit());
        }
        deactivateSearchMode() {
          this.searchData.searchMode &&
            (this.searchData.setKeywordFilters([]),
            (this.searchData.searchMode = !1),
            (this.searchData.activeItemId = null),
            this.searchData.commit(),
            (this.deactivateTimeout = window.setTimeout(() => {
              this.searchData.clearTypeFilters();
            }, 300)));
        }
      }
      const Se = Oe;
    },
    35068: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => Y });
      var n,
        s = i(933),
        a = i(4763),
        o = i(63511),
        r = i(31740),
        d = i(57793),
        c = i(43017),
        l = i(90512),
        h = i(9832),
        u = i(29433),
        m = i(7516),
        p = i(33968),
        g = i(39060),
        v = i(43627),
        y = i(3835),
        f = i(26059),
        w = i(28721),
        b = i(10648),
        T = i(71472),
        C = i(85726),
        E = i(90420),
        D = i(10999),
        x = i(60937),
        A = i(84376),
        O = i(38063),
        S = i(11200);
      !(function (e) {
        (e.CAPTURING = 'capturing'),
          (e.UPLOADING = 'uploading'),
          (e.ERROR = 'error'),
          (e.DONE = 'done');
      })(n || (n = {}));
      var P = i(86099),
        I = i(93412),
        k = i(70593),
        N = i(27163),
        R = i(64150),
        M = i(59452),
        j = i(22925),
        L = i(49095),
        B = i(8126);
      class V extends B.v0 {
        constructor(e) {
          super(), (this.error = e);
        }
      }
      var F = i(73943);
      class _ extends F.y {
        constructor(e, t = '72002') {
          super(e, t), (this.name = 'SnapshotCaptureError');
        }
      }
      class H extends F.y {
        constructor(e, t = '73002') {
          super(e, t), (this.name = 'SnapshotUploadError');
        }
      }
      class U extends F.y {
        constructor(e, t = '74002') {
          super(e, t), (this.name = 'SnapshotEncodingError');
        }
      }
      var G = i(56063);
      const z = 16 / 9;
      class W extends G.m {
        constructor(e) {
          super(),
            (this.payload = {
              maxSize: e.maxSize || m.SL.ULTRAHIGH,
              aspect: e.aspect || z,
              category: e.category || D.i.USER,
              onProgress: e.onProgress,
              waitForUpload: void 0 === e.waitForUpload || e.waitForUpload,
            });
        }
      }
      W.id = 'CAPTURE_SNAPSHOT';
      class $ extends G.m {
        constructor(e) {
          super(),
            (this.payload = {
              onProgress: e.onProgress,
              waitForUpload: void 0 === e.waitForUpload || e.waitForUpload,
            });
        }
      }
      $.id = 'EQUIRECTANGULAR_SNAPSHOT';
      const K = i.p + 'images/ai-watermark-512.svg',
        Z = g.Xd.uploadIntervalDelay;
      class Y extends s.Y {
        constructor() {
          super(...arguments), (this.name = 'snapshots-editor'), (this.peekabooActive = !1);
        }
        async init(e, t) {
          (this.engine = t),
            ([this.renderer, this.sweepRenderer, this.rtt] = await Promise.all([
              t.getModuleBySymbol(a.Aj),
              t.getModuleBySymbol(a.RR),
              t.getModuleBySymbol(a.tA),
            ])),
            ([
              this.sweepData,
              this.viewmodeData,
              this.cameraData,
              this.floorsViewData,
              this.layersData,
            ] = await Promise.all([
              t.market.waitForData(r.Z),
              t.market.waitForData(l.O),
              t.market.waitForData(d.M),
              t.market.waitForData(x.c),
              t.market.waitForData(j.R),
              t.market.waitForData(E.P),
            ])),
            ([this.snapshotTarget, this.snapshotOverlayTarget] = await Promise.all([
              t.commandBinder.issueCommandWhenBound(new h.oM()),
              t.commandBinder.issueCommandWhenBound(new h.oM()),
            ]));
          const [i, n] = await Promise.all([t.market.waitForData(k.t), t.market.waitForData(R.e)]);
          (this.peekabooActive = n.tryGetProperty(M.eC, !1)),
            this.bindings.push(
              i.onPropertyChanged('activeToolName', this.onToolChanged.bind(this)),
              t.commandBinder.addBinding(W, this.onCaptureSnapshotCommand.bind(this)),
              t.commandBinder.addBinding($, this.onCaptureEquirectCommand.bind(this)),
            );
        }
        onToolChanged(e) {
          this.sweepRenderer.setPreloadQuality(
            e === N.w1.PHOTOS || e === N.w1.START_LOCATION
              ? this.sweepRenderer.enum.resolution.ULTRAHIGH
              : null,
          );
        }
        async onCaptureEquirectCommand(e) {
          const t = e.onProgress || (0, C.Y)(0);
          (t.value = 10), this.engine.commandBinder.issueCommand(new O.ZK()), await (0, w.gw)(50);
          const i = this.sweepData.currentSweepObject;
          if (!i) throw new _('Equirectangular capture is only supported in Panorama mode');
          const n = this.queryIdealEqResolution();
          this.snapshotTarget.setSize(n.width, n.height);
          const s = y.fU.FORWARD.clone().applyQuaternion(i.rotation).setY(0),
            a = y.fU.FORWARD.clone().applyQuaternion(this.cameraData.pose.rotation).setY(0),
            o = (0, f.k2)(s, a) + Math.PI;
          await this.fetchHighestAvailable(!0, m.SL.ULTRAHIGH, (e) => (t.value = Math.max(10, e))),
            await this.takeEquirectangular(o),
            await this.sweepRenderer.resetSweep(i.id),
            this.engine.commandBinder.issueCommand(new O.Lp());
          const r = (0, u.fY)(this.snapshotTarget.width, this.snapshotTarget.height, o, 0),
            d = this.uploadAndAddSnapshot(D.i.PANORAMA, r)
              .then((e) => e && e.sid)
              .catch((e) => {
                throw (this.log.error(e), this.engine.broadcast(new V(e)), e);
              });
          return e.waitForUpload ? d : null;
        }
        async onCaptureSnapshotCommand(e) {
          const t = e.onProgress || (0, C.Y)(0);
          (t.value = 10),
            this.engine.commandBinder.issueCommand(new O.ZK()),
            this.engine.commandBinder.issueCommand(new I.M());
          const i = this.queryIdealResolution(e.maxSize, e.aspect);
          this.snapshotTarget.setSize(i.width, i.height),
            this.snapshotOverlayTarget.setSize(i.width, i.height),
            await this.fetchHighestAvailable(!1, e.maxSize, (e) => (t.value = Math.max(10, e))),
            await (0, w.gw)(2 * Z),
            await this.takeScreenshot();
          const n = this.sweepData.currentSweepObject;
          n &&
            this.viewmodeData.currentMode === c.Ey.Panorama &&
            (await this.sweepRenderer.resetSweep(n.id)),
            this.engine.commandBinder.issueCommand(new O.Lp()),
            this.engine.commandBinder.issueCommand(new I.I());
          let s = e.category;
          n &&
            (n.alignmentType === A.z9.UNALIGNED || n.placementType === A.hU.MANUAL) &&
            s === D.i.USER &&
            (s = D.i.UNALIGNED);
          const a = this.uploadAndAddSnapshot(s)
            .then((e) => e && e.sid)
            .catch((e) => {
              throw (this.log.error(e), this.engine.broadcast(new V(e)), e);
            });
          return e.waitForUpload ? a : null;
        }
        async uploadAndAddSnapshot(e, t) {
          const i = this.createSnapshot(e);
          i.state = n.CAPTURING;
          try {
            const e = await (0, u.vP)(this.snapshotTarget, t);
            i.imageBlob = (0, u.Xk)(e);
          } catch (e) {
            throw ((i.state = n.ERROR), this.log.error(e), new U(e));
          }
          i.state = n.UPLOADING;
          try {
            const e = await this.engine.commandBinder.issueCommand(new P.nM(i));
            if (!e)
              throw (
                ((i.state = n.ERROR),
                this.log.error('Exception during snapshot upload'),
                new H('Exception during snapshot upload'))
              );
            return (i.state = n.DONE), e;
          } catch (e) {
            throw ((i.state = n.ERROR), this.log.error(e), new H(e));
          }
        }
        createSnapshot(e) {
          const t = this.viewmodeData.isInside(),
            i = this.sweepData.currentSweep;
          let n = (0, w.DZ)(new Date());
          if (i && t) {
            const e = this.sweepData.getSweep(i).name;
            e && (n = e);
          }
          (0, L.eU)(this.layersData.getCurrentView()) && (n += '_defurnished');
          const { position: s, viewmode: a } = (0, b.pG)(
              this.cameraData,
              this.floorsViewData,
              this.viewmodeData,
              this.peekabooActive,
            ),
            o = new S.a();
          return (
            (o.name = n),
            (o.category = e),
            (o.is360 = t && !this.sweepData.currentAlignedSweepObject),
            (o.metadata = {
              cameraMode: a,
              cameraPosition: s,
              cameraQuaternion: this.cameraData.pose.rotation.clone(),
              orthoZoom: a === c.Ey.Floorplan ? this.cameraData.zoom() : -1,
              ssZoom: this.cameraData.zoom(),
              scanId:
                this.sweepData.currentSweep && t
                  ? this.sweepData.getSweep(this.sweepData.currentSweep).platformId
                  : void 0,
              floorId: this.floorsViewData.currentFloorId,
              floorVisibility: this.floorsViewData.getFloorsVisibility(),
            }),
            o
          );
        }
        queryIdealResolution(e = m.SL.ULTRAHIGH, t) {
          var i, n;
          const s = 1 / Math.max(t, Number.EPSILON);
          let a = 3840,
            o = a * s;
          const r = this.renderer.maxTextureSize;
          if (
            (a > r &&
              (this.log.warn(
                `The active gl context does not support 4k x 2k equirectangular capture\nCapture is limited to a max size of ${r}`,
              ),
              (a = r),
              (o = a * s)),
            this.viewmodeData.currentMode === c.Ey.Panorama)
          ) {
            const s =
                null !==
                  (n =
                    null === (i = this.sweepData.currentSweepObject) || void 0 === i
                      ? void 0
                      : i.availableResolution(e)) && void 0 !== n
                  ? n
                  : m.SL.STANDARD,
              d = (p.Z.getPanoSize(s) * (this.cameraData.fovY() * v.MN)) / 90;
            (a = Math.min(Math.round(d * t), r)), (o = Math.round(a / t));
          }
          return { width: a, height: o };
        }
        queryIdealEqResolution() {
          let e = 8192,
            t = 0.5 * e;
          const i = this.renderer.maxTextureSize;
          return (
            e > i &&
              this.log.warn(
                `The active gl context does not support 4k x 2k equirectangular capture\nCapture is limited to a max size of ${i}`,
              ),
            (e = Math.min(i, e)),
            (t = 0.5 * e),
            { width: e, height: t }
          );
        }
        fetchHighestAvailable(e, t = m.SL.ULTRAHIGH, i) {
          const n = this.sweepData.currentSweepObject;
          if (n && this.viewmodeData.currentMode === c.Ey.Panorama) {
            const s = e
                ? this.sweepRenderer.enum.queueStyle.FullPanorama
                : this.sweepRenderer.enum.queueStyle.CurrentView,
              a = i ? (e) => i(e * Y.captureProgressFudgeFactor) : void 0;
            return this.sweepRenderer.requestResolution({
              sweepId: n.id,
              resolution: t,
              queueType: s,
              quickly: !0,
              onProgress: a,
            }).promise;
          }
          return i && i(Y.captureProgressFudgeFactor), Promise.resolve();
        }
        async takeScreenshot() {
          const e = o.o.ALL;
          e.removeLayers(this.engine.getRenderLayer('grid-underlay')),
            e.removeLayers(this.engine.getRenderLayer('cursor-mesh')),
            e.removeLayers(this.engine.getRenderLayer('current-pano-marker'));
          const t = this.renderer.getScene().scene,
            i = this.renderer.getScene().camera,
            n = i.layers.mask;
          (i.layers.mask = e.mask),
            this.rtt.render(this.snapshotTarget.target, t, i, void 0, !0),
            (0, L.eU)(this.layersData.getCurrentView()) &&
              (this.watermarkTexture || (this.watermarkTexture = await (0, T.f)(K)),
              this.rtt.compose(this.snapshotTarget.target, this.watermarkTexture, {
                sourceMask: this.watermarkTexture,
                sourceResize: !1,
                sourceScale: 0.5,
              })),
            (i.layers.mask = n);
        }
        async takeEquirectangular(e) {
          const t = this.sweepData.currentSweep,
            i = this.sweepRenderer.getRenderer(),
            n = i.useTexture(t),
            s = this.engine.commandBinder.issueCommand(new h.fZ(this.snapshotTarget, n, e));
          await s, i.freeTexture(t);
        }
      }
      Y.captureProgressFudgeFactor = 90;
    },
    33968: (e, t, i) => {
      'use strict';
      i.d(t, { Z: () => o });
      var n,
        s = i(7516),
        a = i(39060);
      !(function (e) {
        (e[(e.Untested = 0)] = 'Untested'),
          (e[(e.Testing = 1)] = 'Testing'),
          (e[(e.Success = 2)] = 'Success'),
          (e[(e.Fail = 3)] = 'Fail');
      })(n || (n = {}));
      class o {
        constructor(e, t, i, n) {
          (this.maxCubemapSize = e),
            (this.maxNavPanoSize = t),
            (this.maxZoomPanoSize = i),
            (this.overrideWindow = !1),
            (this.navPanoSize = s.AB.STANDARD),
            (this.zoomPanoSize = s.AB.STANDARD),
            (this.defaultMaxNavPanoSize = this.maxNavPanoSize),
            (this.resolution = n),
            (this.highQualityThreshold =
              a.Xd.windowHeightHighQualityThresholdOverride ||
              a.Xd.windowHeightHighQualityThreshold),
            this.updateMaximums();
        }
        update({ height: e, fov: t }) {
          (this.resolution = e), this.updateMaximums();
        }
        overrideWindowMaximums(e) {
          (this.overrideWindow = e), this.updateMaximums();
        }
        overrideNavPanoSize(e) {
          (this.maxNavPanoSize = null != e ? e : this.defaultMaxNavPanoSize), this.updateMaximums();
        }
        updateMaximums() {
          this.resolution < this.highQualityThreshold && !this.overrideWindow
            ? ((this.navPanoSize = Math.min(o.getPanoSize(s.SL.STANDARD), this.maxNavPanoSize)),
              (this.zoomPanoSize = Math.min(o.getPanoSize(s.SL.HIGH), this.maxZoomPanoSize)))
            : ((this.navPanoSize = this.maxNavPanoSize),
              (this.zoomPanoSize = this.maxZoomPanoSize)),
            this.zoomPanoSize < this.navPanoSize && (this.navPanoSize = this.zoomPanoSize),
            (this.zoomPanoSize = Math.min(this.maxCubemapSize, this.zoomPanoSize)),
            (this.navPanoSize = Math.min(this.maxCubemapSize, this.navPanoSize));
        }
        static getPanoSize(e) {
          if (e in s.eE) return s.eE[e];
          throw new Error(`Not a panoSizeClass: ${e}`);
        }
        static getPanoSizeClass(e) {
          if (e in s.Qf) return s.Qf[e];
          throw new Error(`Not a valid pano resolution: ${e}`);
        }
        getNavPanoSize() {
          return this.navPanoSize;
        }
        getZoomPanoSize() {
          return this.zoomPanoSize;
        }
      }
    },
    49128: (e, t, i) => {
      'use strict';
      i.d(t, { Z: () => s });
      var n = i(8126);
      class s extends n.v0 {
        constructor() {
          super();
        }
      }
    },
    72317: (e, t, i) => {
      'use strict';
      i.d(t, { Z: () => s });
      var n = i(8126);
      class s extends n.v0 {
        constructor(e) {
          super(), (this.sweepIds = e);
        }
      }
    },
    80782: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => l });
      var n = i(81396),
        s = i(933),
        a = i(98214),
        o = i(4763),
        r = i(72317),
        d = i(49128);
      const c = Object.freeze({ sweeps: { maxNeighborDistance: 50 } });
      class l extends s.Y {
        constructor() {
          super(...arguments),
            (this.distanceMap = {}),
            (this.name = 'sweep-path'),
            (this.getDistance = (() => {
              const e = new n.Vector3(0, 0, 0);
              return (t, i) => {
                var n;
                const s = this.distanceMap[t],
                  a = this.distanceMap[i];
                s || (this.distanceMap[t] = {}), a || (this.distanceMap[i] = {});
                let o =
                  null !== (n = this.distanceMap[t][i]) && void 0 !== n
                    ? n
                    : this.distanceMap[i][t];
                if (void 0 !== o) return o;
                const r = this.sweepDataModule.getSweepOnView(t),
                  d = this.sweepDataModule.getSweepOnView(i);
                e.copy(r.position).sub(d.position);
                let c = Math.max(0, Math.abs(e.y) - 0.2),
                  l = Math.sqrt(e.x * e.x + e.z * e.z);
                return (
                  c > 0
                    ? ((c = Math.pow(4 * c, 2)),
                      (l = Math.pow(l, 2)),
                      (o = Math.sqrt(c * c + l * l)))
                    : (o = e.length()),
                  (this.distanceMap[t][i] = o),
                  (this.distanceMap[i][t] = o),
                  o
                );
              };
            })());
        }
        async init(e, t) {
          (this.engine = t),
            (this.sweepDataModule = await t.getModuleBySymbol(o.l)),
            (this.validNeighbors = {}),
            (this.distanceMap = {}),
            (this.maxNeighborDistance = e.maxNeighborDistance || c.sweeps.maxNeighborDistance);
        }
        setRestrictedSweeps(e, t = 0) {
          if (((this.restrictedSweeps = []), e)) {
            for (let i = t; i < e.length; i++) this.restrictedSweeps.push(e[i].id);
            this.engine.broadcast(new r.Z(this.restrictedSweeps));
          } else (this.restrictedSweeps = void 0), this.engine.broadcast(new d.Z());
        }
        findShortestPath(e, t, i, n, s, o = 5e3) {
          const r = this.sweepDataModule.getSweepOnView(e),
            d = this.sweepDataModule.getSweepOnView(t);
          if (!r || !d) return null;
          const c = this,
            l = (0, a.K)({
              start: r,
              isEnd: (e) => e === d,
              *neighbors(e) {
                for (const t of e.neighbours) yield c.sweepDataModule.getSweepOnView(t);
              },
              distance: (e, t) => c.getDistance(e.id, t.id),
              heuristic: (e, t) => 1,
              timeout: o,
            });
          return l.status === a.h.Success && l.path.length < s
            ? (this.addSweepsNearPath(l.path, i), this.filterCloseSweepsFromPath(l.path, n))
            : null;
        }
        addSweepsNearPath(e, t) {
          const i = new n.Vector3(),
            s = new n.Vector3(),
            a = new n.Vector3(),
            o = new n.Vector3(),
            r = new n.Vector3(),
            d = new n.Vector3(),
            c = [],
            l = new n.Vector3(),
            h = (e, t, i) => (a.copy(t).sub(e), a.dot(i)),
            u = (e, t) => h(l, e.position, i) - h(l, t.position, i);
          let m = 0;
          for (; m < e.length - 1; ) {
            const n = e[m].id,
              h = e[m + 1].id,
              p = this.sweepDataModule.getSweepOnView(n),
              g = this.sweepDataModule.getSweepOnView(h);
            l.copy(p.position), (c.length = 0), i.copy(g.position).sub(l).normalize();
            const v = this.findConnectedSweeps(p, this.maxNeighborDistance),
              y = this.findConnectedSweeps(g, this.maxNeighborDistance),
              f = v.concat(y);
            for (const e of f) {
              const n = a.copy(e.position).sub(l).dot(i);
              if (n > 0) {
                r.copy(i), r.multiplyScalar(n), o.copy(a), o.sub(r);
                if (o.length() < t) {
                  s.copy(i).negate(), d.copy(e.position).sub(g.position);
                  d.dot(s) > 0 && c.push(e);
                }
              }
            }
            if (c.length > 0) {
              c.sort(u);
              for (let t = e.length + c.length - 1; t >= m + c.length; t--) e[t] = e[t - c.length];
              for (let t = 0; t < c.length; t++) e[t + m + 1] = c[t];
            }
            m += c.length + 1;
          }
        }
        findConnectedSweeps(e, t, i = 2) {
          const n = [];
          return this._findConnectedSweeps(e, e, t, n, {}, i, 0), n;
        }
        _findConnectedSweeps(e, t, i, n, s, a, o) {
          const r = this.getValidNeighbors(e.id);
          for (const e of r)
            if (!s[e.id]) {
              e.position.distanceTo(t.position) < i &&
                (n.push(e),
                (s[e.id] = !0),
                o < a && this._findConnectedSweeps(e, t, i, n, s, a, o + 1));
            }
        }
        getValidNeighbors(e) {
          let t = this.validNeighbors[e];
          if (!t) {
            (t = []), (this.validNeighbors[e] = t);
            const i = this.sweepDataModule.getSweepOnView(e).neighbours;
            for (const n of i) {
              const i = this.sweepDataModule.getSweepOnView(n);
              if (!i.enabled) continue;
              this.getDistance(e, n) > this.maxNeighborDistance || t.push(i);
            }
          }
          return t;
        }
        filterCloseSweepsFromPath(e, t) {
          const i = [];
          let n = null,
            s = !1;
          for (const a of e)
            (s = (n && a.position.distanceTo(n.position) < t) || !1),
              (n && s) || (i.push(a), (n = a));
          return i.length < 2 ? e : (s && e.length > 1 && (i[i.length - 1] = e[e.length - 1]), i);
        }
        getCurveForPath(e) {
          let t = 0;
          const i = [0];
          for (let n = 1; n < e.length; n++) (t += e[n - 1].distanceTo(e[n])), i.push(t);
          const s = [0];
          for (let n = 1; n < e.length; n++) s.push(i[n] / t);
          const a = new n.CatmullRomCurve3(e, !1);
          return {
            curve: new n.CatmullRomCurve3(a.getSpacedPoints(2 * t).concat(e[e.length - 1])),
            totalLength: t,
            sourceDistances: i,
            normalSourceDistances: s,
          };
        }
      }
    },
    26360: (e, t, i) => {
      'use strict';
      i.d(t, { m1: () => g, Vp: () => f });
      var n = i(81396),
        s = i(77256),
        a = i.n(s),
        o = i(62118),
        r = i.n(o);
      class d extends n.RawShaderMaterial {
        constructor(e, t) {
          const i = n.UniformsUtils.clone(d.uniforms);
          (i.tMask.value = e),
            (i.tPinHole.value = t),
            super({
              vertexShader: a(),
              fragmentShader: r(),
              uniforms: i,
              name: 'PinMaterial',
              transparent: !0,
            });
        }
      }
      d.uniforms = {
        tMask: { type: 't', value: null },
        tPinHole: { type: 't', value: null },
        pinColor: { type: 'c', value: new n.Color() },
        opacity: { type: 'f', value: 1 },
      };
      var c = i(71472),
        l = i(96783),
        h = i(72803),
        u = i(50831),
        m = i(97957);
      const p = i.p + 'images/360_placement_pin_mask.png';
      class g extends n.Mesh {}
      let v;
      const y = () => v || ((v = (0, c.p)(p)), v);
      class f extends m.E {
        constructor(e, t, i, n) {
          const s = new d(y(), t);
          super(f.geometry, s),
            (this.layers.mask = n.mask),
            (this.name = 'PinMesh'),
            (this.cameraData = i),
            (this._collider = new g(f.colliderGeometry, f.colliderMaterial)),
            (this._collider.name = 'PinMeshCollider'),
            (this._collider.material.visible = !1),
            this.add(this._collider),
            (this.opacityProgress = 0),
            (this.shouldHide = !0),
            (this.uniforms = s.uniforms),
            this.unhover(),
            (this.selected = 0),
            (this.visible = !1),
            this.position.copy(e),
            (this.renderOrder = h.z.pins360);
        }
        updatePosition(e) {
          this.position.copy(e);
        }
        get collider() {
          return this._collider;
        }
        render(e) {
          this.quaternion.copy(this.cameraData.pose.rotation),
            null === this.uniforms.tPinHole.value
              ? (this.opacityProgress = 0)
              : !this.shouldHide && this.opacityProgress < 1
                ? (this.opacityProgress += e / f.FADE_DURATION)
                : this.shouldHide &&
                  this.opacityProgress > 0 &&
                  (this.opacityProgress -= e / f.FADE_DURATION),
            (this.opacityProgress = (0, l.uZ)(this.opacityProgress, 0, 1)),
            (this.uniforms.opacity.value = this.opacityProgress),
            (this.visible = 0 !== this.opacityProgress);
        }
        activate() {
          this.shouldHide = !1;
        }
        deactivate() {
          this.shouldHide = !0;
        }
        isActive() {
          return !this.shouldHide;
        }
        dispose() {
          this.collider.geometry.dispose(), this.collider.material.dispose();
        }
        setPinHover(e, t = !0, i = !0) {
          const n = Math.min(Math.max(e, 0), 1);
          this.selected !== n &&
            (i && this.uniforms.pinColor.value.copy(u.I.WHITE).lerp(u.I.MP_BRAND, n),
            t && n > 0 && n <= 1 && (this.material.depthTest = !1),
            0 === n && (this.material.depthTest = !0),
            (this.selected = n));
        }
        unhover() {
          this.uniforms.pinColor.value.copy(u.I.WHITE);
        }
      }
      (f.FADE_DURATION = 500),
        (f.geometry = new n.PlaneGeometry(1.5, 1.5)),
        (f.colliderGeometry = new n.SphereGeometry(1.5 * 0.65)),
        (f.colliderMaterial = new n.MeshBasicMaterial({
          transparent: !0,
          opacity: 0.5,
          depthWrite: !1,
          color: 16724312,
        }));
    },
    19775: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => M });
      var n = i(933),
        s = i(4763),
        a = i(81396),
        o = i(26360),
        r = i(8126);
      class d extends r.v0 {
        constructor(e, t) {
          super(), (this.sweepId = e), (this.selected = t);
        }
      }
      class c extends r.v0 {
        constructor(e, t, i) {
          super(), (this.sweepId = e), (this.pinIndex = t), (this.placed = i);
        }
      }
      var l = i(7516),
        h = i(61565),
        u = i(86210),
        m = i(53257),
        p = i(62900),
        g = i(21676);
      const v = new m.Z('pin-mesh'),
        y = (e) => (0, h.WO)()(e) && (0, h.H7)(e);
      class f {
        constructor(e, t, i, n, s, o) {
          (this.sweepViewData = e),
            (this.scene = t),
            (this.sweepTextureLoader = i),
            (this.input = n),
            (this.layer = o),
            (this.container = new a.Object3D()),
            (this.bindings = []),
            (this.visibilityFilter = () => !0),
            (this.hoverSweep = (e, t) => {
              this.issueCommand(new p.kR(e, t, 0));
              const i = this.sweepViewData.selectedSweep === e;
              this.highlightPin(e, t || i);
            }),
            (this.meshes = []),
            (this.meshToDataMap = {}),
            (this.dataToMeshMap = {}),
            (this.cameraData = s);
          const r = e.data.getCollection(),
            d = ({ added: e, updated: t, removed: i }) => {
              if (e) for (const [, t] of e) y(t) && this.createPinMesh(t, this.cameraData);
              if (t)
                for (const [e, i] of t) {
                  const t = this.sweepViewData.getIndexByAlignment(!1, e);
                  y(i)
                    ? (this.dataToMeshMap[e] ||
                        (this.createPinMesh(i, this.cameraData),
                        this.engine.broadcast(new c(e, t, !0))),
                      this.updatePinMeshPosition(e, i.position))
                    : this.dataToMeshMap[e] &&
                      (this.removePinMesh(i), this.engine.broadcast(new c(e, t, !1)));
                }
              if (i) for (const [, e] of i) this.removePinMesh(e);
            };
          this.bindings.push(r.onElementsChanged(d)), d({ added: r.entries() });
        }
        updatePinMeshPosition(e, t) {
          this.mapSweepToMesh(e).updatePosition(t);
        }
        mapSweepToMesh(e) {
          return this.dataToMeshMap[e];
        }
        mapColliderToSweep(e) {
          const t = e.hasOwnProperty('collider') ? e : e.parent;
          if (t) {
            const e = this.meshToDataMap[t.id];
            if (e) return e.sweep;
          }
          return null;
        }
        filter(e) {
          this.visibilityFilter = e;
          for (const e of this.meshes) this.filterMesh(e);
        }
        init() {}
        dispose() {
          for (const e in this.meshToDataMap) {
            const t = this.meshToDataMap[e];
            this.removePinMesh(t.sweep);
          }
        }
        render(e) {
          for (const t of this.meshes) t.render(e);
        }
        activate(e) {
          (this.engine = e),
            (this.issueCommand = e.commandBinder.issueCommand.bind(e.commandBinder)),
            this.bindings.push(
              this.input.registerMeshHandler(u.z, g.s.isType(o.m1), (e, t) =>
                this.onHoverEvent(t, !0),
              ),
            ),
            this.bindings.push(
              this.input.registerMeshHandler(u.A, g.s.isType(o.m1), (e, t) =>
                this.onHoverEvent(t, !1),
              ),
            ),
            this.scene.add(this.container);
        }
        deactivate(e) {
          for (const e of this.bindings) e.cancel();
          (this.bindings.length = 0), this.scene.remove(this.container);
        }
        getMeshes() {
          return this.meshToDataMap;
        }
        highlightPin(e, t, i = !1) {
          this.dataToMeshMap[e] &&
            (t &&
              i &&
              Object.entries(this.dataToMeshMap).forEach(([t, i]) => {
                t !== e && i.unhover();
              }),
            this.dataToMeshMap[e].setPinHover(t ? 1 : 0, !1));
        }
        lockSelection(e, t) {
          return t && (this.engine.broadcast(new d(e.id, !0)), this.hoverSweep(e.id, !0)), !0;
        }
        createPinMesh(e, t) {
          const i = new o.Vp(e.position, null, t, this.layer);
          this.meshes.push(i),
            (this.dataToMeshMap[e.id] = i),
            (this.meshToDataMap[i.id] = { id: i.id, sweep: e }),
            this.container.add(i),
            this.filterMesh(i),
            this.sweepTextureLoader
              .loadFace(e, l.SL.BASE, 1, { flipY: !0 })
              .then((e) => {
                i.material.uniforms.tPinHole.value = e;
              })
              .catch((t) => {
                v.error(`${e.id} failed to load texture: ${t}`);
              });
        }
        removePinMesh(e) {
          const t = this.dataToMeshMap[e.id];
          if (!t) return;
          const i = this.meshes.findIndex((e) => e.id === t.id);
          this.meshes.splice(i, 1),
            this.container.remove(t),
            this.deactivateMesh(t),
            delete this.meshToDataMap[t.id],
            delete this.dataToMeshMap[e.id],
            t.dispose();
        }
        filterMesh(e) {
          const t = this.meshToDataMap[e.id];
          if (t) {
            const i = t.sweep;
            this.visibilityFilter(i) ? this.activateMesh(e) : this.deactivateMesh(e);
          }
        }
        onHoverEvent(e, t) {
          const i = this.mapColliderToSweep(e);
          i && this.hoverSweep(i.id, t);
        }
        activateMesh(e) {
          this.input.registerMesh(e.collider, !1), e.activate();
        }
        deactivateMesh(e) {
          this.input.unregisterMesh(e.collider);
          const t = this.meshToDataMap[e.id];
          t && e.isActive() && (this.hoverSweep(t.sweep.id, !1), e.deactivate());
        }
      }
      f.MENU_CLEAR_DEBOUNCE = 100;
      var w = i(56063);
      class b extends w.m {
        constructor(e) {
          super(), (this.payload = { id: e });
        }
      }
      b.id = 'PIN_UNSELECT';
      class T extends w.m {
        constructor(e, t) {
          super(), (this.payload = { sweepId: e, highlight: t });
        }
      }
      T.id = 'HIGHLIGHT_PIN';
      var C = i(24938),
        E = i(57793),
        D = i(90512),
        x = i(64150),
        A = i(43017),
        O = i(60937),
        S = i(79884),
        P = i(42456),
        I = i(82076);
      class k extends r.v0 {
        constructor(e) {
          super(), (this.sweepId = e);
        }
      }
      class N extends r.v0 {
        constructor(e) {
          super(), (this.sweepId = e);
        }
      }
      var R = i(38496);
      class M extends n.Y {
        constructor() {
          super(...arguments),
            (this.name = 'sweep-pin-mesh'),
            (this.onChange = () => {
              const e = this.sweepViewData,
                t = e.selectedSweep,
                i = e.toolState === P._.ROTATING || e.toolState === P._.ROTATED;
              this.pinRenderer.filter((e) => {
                if (!this.settingsData.tryGetProperty(R.s, !0)) return !1;
                if (i && t === e.id) return !1;
                if (
                  this.viewmodeData.transition.active &&
                  (0, A.Bw)(this.viewmodeData.transition.to)
                )
                  return !1;
                const n = !this.nextFloor || this.nextFloor === e.floorId || !e.floorId,
                  s =
                    this.config.showPinsInFloorplanDollhouse ||
                    this.applicationData.application === C.Mx.WORKSHOP,
                  a =
                    this.viewmodeData.closestMode === A.Ey.Dollhouse ||
                    this.viewmodeData.closestMode === A.Ey.Floorplan;
                return n && a && s;
              });
            }),
            (this.onSelectedPinChange = () => {
              const e = this.sweepViewData.selectedSweep;
              e &&
                (this.engine.commandBinder.issueCommand(new p.iF(e, !0, 0)),
                this.pinRenderer.highlightPin(e, !0, !0));
            });
        }
        async init(e, t) {
          var i;
          [
            this.webglRenderer,
            this.input,
            this.sweepViewData,
            this.cameraData,
            this.settingsData,
            this.viewmodeData,
            this.floorsViewData,
            this.applicationData,
          ] = await Promise.all([
            t.getModuleBySymbol(s.Aj),
            t.getModuleBySymbol(s.PZ),
            t.market.waitForData(S.D),
            t.market.waitForData(E.M),
            t.market.waitForData(x.e),
            t.market.waitForData(D.O),
            t.market.waitForData(O.c),
            t.market.waitForData(C.pu),
          ]);
          const n = await t.getModuleBySymbol(s.hD),
            a = t.claimRenderLayer(this.name),
            o = this.webglRenderer.getScene().scene;
          (this.config = {
            showPinsInFloorplanDollhouse:
              null === (i = e && e.showPinsInFloorplanDollhouse) || void 0 === i || i,
          }),
            (this.engine = t),
            (this.pinRenderer = new f(this.sweepViewData, o, n, this.input, this.cameraData, a)),
            t.addComponent(this, this.pinRenderer),
            this.bindings.push(
              this.applicationData.onPropertyChanged('application', this.onChange),
              this.settingsData.onPropertyChanged(R.s, this.onChange),
              this.viewmodeData.onChanged(this.onChange),
              this.sweepViewData.onSelectedSweepChanged(this.onSelectedPinChange),
              t.subscribe(I.S, (e) => {
                (this.nextFloor = e.to), this.onChange();
              }),
              t.subscribe(k, this.onChange),
              t.subscribe(N, this.onChange),
              t.commandBinder.addBinding(b, async (e) => {
                this.pinRenderer.highlightPin(e.id, !1);
              }),
            ),
            (this.nextFloor = this.floorsViewData.currentFloorId),
            this.onChange();
        }
        mapColliderToSweep(e) {
          return this.pinRenderer.mapColliderToSweep(e);
        }
        selectPinMesh(e, t) {
          return this.pinRenderer.lockSelection(e, t);
        }
        highlightPinMesh(e, t) {
          this.pinRenderer.highlightPin(e, t);
        }
        mapSweepToMesh(e) {
          return this.pinRenderer.mapSweepToMesh(e);
        }
        updatePosition(e, t) {
          this.pinRenderer.updatePinMeshPosition(e, t);
        }
      }
    },
    61236: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => g });
      var n = i(933),
        s = i(4763),
        a = i(26360),
        o = i(74094),
        r = i(945),
        d = i(43017),
        c = i(90288),
        l = i(90512),
        h = i(81396),
        u = i(79242),
        m = i(86210),
        p = i(21676);
      class g extends n.Y {
        constructor() {
          super(...arguments), (this.name = 'sweep-pin-navigation');
        }
        async init(e, t) {
          const [i, n, g, v] = await Promise.all([
              t.getModuleBySymbol(s.i0),
              t.getModuleBySymbol(s.XT),
              t.market.waitForData(l.O),
              t.getModuleBySymbol(s.PZ),
            ]),
            y = new h.Quaternion();
          this.bindings.push(
            v.registerMeshHandler(u.Rd, p.s.isType(a.m1), (e, t, s) => {
              const a = i.mapColliderToSweep(t);
              return (
                !(!a || g.transition.active) &&
                (y.set(0, 0, 0, 1).multiply(a.rotation),
                (o = a.id),
                (r = y),
                g.currentMode &&
                  g.currentMode !== d.Ey.Panorama &&
                  n.switchToMode(d.Ey.Panorama, c.nF.FadeToBlack, { sweepID: o, rotation: r }),
                !0)
              );
              var o, r;
            }),
            v.registerMeshHandler(m.z, p.s.isType(a.m1), (e, n) => {
              i.mapColliderToSweep(n) && t.commandBinder.issueCommand(new o.u(r.C.FINGER));
            }),
            v.registerMeshHandler(m.A, p.s.isType(a.m1), (e, n) => {
              i.mapColliderToSweep(n) && t.commandBinder.issueCommand(new o.u(null));
            }),
          );
        }
      }
    },
    702: (e, t, i) => {
      'use strict';
      i.d(t, { p: () => b, Y: () => v });
      var n = i(81396),
        s = i(35490),
        a = i.n(s),
        o = i(8346),
        r = i.n(o);
      class d extends n.RawShaderMaterial {
        constructor(e, t) {
          const i = n.UniformsUtils.clone(d.uniforms);
          (i.tNoHover.value = e),
            (i.tHover.value = t),
            (i.tPortal.value = null),
            super({
              vertexShader: a(),
              fragmentShader: r(),
              uniforms: i,
              name: 'PortalMaterial',
              transparent: !0,
            });
        }
      }
      d.uniforms = {
        tNoHover: { type: 't', value: null },
        tHover: { type: 't', value: null },
        tPortal: { type: 't', vlaue: null },
        progress: { type: 'f', value: 1 },
        opacity: { type: 'f', value: 1 },
      };
      var c = i(71472);
      const l = i.p + 'images/exterior.png',
        h = i.p + 'images/exterior_hover.png',
        u = i.p + 'images/interior.png',
        m = i.p + 'images/interior_hover.png';
      let p;
      const g = {
        get: () =>
          p ||
          ((p = {
            toExteriorTexture: (0, c.p)(l),
            toExteriorHoverTexture: (0, c.p)(h),
            toInteriorTexture: (0, c.p)(u),
            toInteriorHoverTexture: (0, c.p)(m),
          }),
          p),
      };
      var v,
        y = i(96783),
        f = i(72803),
        w = i(8403);
      !(function (e) {
        (e[(e.HIDE = 0)] = 'HIDE'), (e[(e.SHOW = 1)] = 'SHOW'), (e[(e.ONTOP = 2)] = 'ONTOP');
      })(v || (v = {}));
      class b extends n.Mesh {
        constructor(e, t) {
          const i = new d(g.get().toInteriorTexture, g.get().toInteriorHoverTexture);
          super(b.geometry, i),
            (this.layers.mask = t.mask),
            (this.uniforms = i.uniforms),
            (this.renderOrder = f.z.portals),
            this.setState(v.HIDE),
            this.update(e);
        }
        update(e) {
          if (((this.portalData = e), this.position.copy(e.position), null !== e.lookDirection)) {
            const t = e.lookDirection.clone().add(e.position);
            this.lookAt(t);
          }
          (this.hoverProgress = 0),
            (this.hovered = !1),
            e.toExterior
              ? ((this.uniforms.tNoHover.value = g.get().toExteriorTexture),
                (this.uniforms.tHover.value = g.get().toExteriorHoverTexture))
              : ((this.uniforms.tNoHover.value = g.get().toInteriorTexture),
                (this.uniforms.tHover.value = g.get().toInteriorHoverTexture));
        }
        resetMesh(e = 0, t = !1, i = !1) {
          (this.uniforms.opacity.value = e),
            (this.visible = 0 !== e),
            (this.material.depthTest = t),
            (this.material.depthWrite = i);
        }
        setHover(e) {
          this.hovered = e;
        }
        setState(e) {
          switch (e) {
            case v.HIDE:
              this.resetMesh(0, !0, !0);
              break;
            case v.SHOW:
              this.resetMesh(1, !0, !0);
              break;
            case v.ONTOP:
              this.resetMesh(1);
          }
        }
        render(e, t) {
          var i;
          if (
            (this.hovered && this.hoverProgress < 1
              ? (this.hoverProgress += e / 300)
              : !this.hovered && this.hoverProgress > 0 && (this.hoverProgress -= e / 300),
            (this.hoverProgress = (0, y.uZ)(this.hoverProgress, 0, 1)),
            (this.uniforms.progress.value = this.hoverProgress),
            null === (i = this.portalData) || void 0 === i ? void 0 : i.billboard)
          ) {
            const e = t.pose.position,
              i = this.position.copy(this.portalData.position),
              n = e.distanceTo(i);
            n < w.nm ? i.lerpVectors(e, i, w.nm / n) : n > w.iz && i.lerpVectors(e, i, w.iz / n),
              this.lookAt(t.pose.position);
          }
        }
        updatePortalTexture(e) {
          this.uniforms.tPortal.value = e;
        }
        raycast(e, t) {
          if (!this.visible) return;
          const i = [];
          super.raycast(e, i), i.length > 0 && ((i[0].distance /= 1e4), t.push(i[0]));
        }
      }
      b.geometry = new n.PlaneGeometry(w.vX, w.vX);
    },
    44776: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => O });
      var n = i(81396),
        s = i(933),
        a = i(4763),
        o = i(41513),
        r = i(57793),
        d = i(31740),
        c = i(84376),
        l = i(61565),
        h = i(71835),
        u = i(7516),
        m = i(29837),
        p = i.n(m),
        g = i(45405),
        v = i.n(g);
      class y extends n.RawShaderMaterial {
        constructor() {
          const e = n.UniformsUtils.clone(y.uniforms);
          super({
            vertexShader: p(),
            fragmentShader: v(),
            uniforms: e,
            name: 'PortalViewportMaterial',
            side: n.BackSide,
          });
        }
        updateTexture(e) {
          this.uniforms.tMap.value = e;
        }
      }
      y.uniforms = { tMap: { type: 't', value: null } };
      class f {
        constructor(e, t, i, s) {
          (this.tempLookDirection = new n.Vector3()),
            (this.worldCamera = s),
            (this.camera = new n.PerspectiveCamera()),
            (this.renderSize = i),
            (this.sweepTextureLoader = e),
            (this.textureRenderer = t),
            (this.renderTargets = {}),
            (this.renderCube = new n.Mesh(new n.BoxGeometry(4, 4, 4), new y()));
        }
        async getPortalTexture(e, t, i) {
          const n =
              this.renderTargets[e.id] ||
              this.textureRenderer.createRenderTarget2D(this.renderSize, this.renderSize),
            s = await this.sweepTextureLoader.load(e, u.SL.BASE);
          return (
            this.renderCube.material.updateTexture(s),
            this.renderCube.quaternion.copy(t),
            this.camera.projectionMatrix.copy(this.worldCamera.projectionMatrix),
            this.worldCamera.getWorldPosition(this.tempLookDirection),
            this.camera.lookAt(this.tempLookDirection.sub(i).negate()),
            this.textureRenderer.render(n, this.renderCube, this.camera),
            n.texture
          );
        }
        releasePortalTexture(e) {
          const t = this.renderTargets[e];
          t && this.textureRenderer.disposeRenderTarget2D(t);
        }
      }
      var w = i(702),
        b = i(65281),
        T = i(86210),
        C = i(79242),
        E = i(21676),
        D = i(9034);
      class x {
        constructor(e, t, i, s, a) {
          (this.container = new n.Object3D()),
            (this.bindings = []),
            (this.visibilityFilter = (e) => w.Y.HIDE),
            (this.scene = e),
            (this.input = t),
            (this.layer = s),
            (this.cameraData = a),
            (this.viewportLoader = i),
            (this.meshes = []),
            (this.activeMeshes = {}),
            (this.meshToDataMap = {}),
            (this.dataToMeshMap = {}),
            (this.activeTexturePromises = {}),
            (this.meshPool = new b.L());
        }
        addPortal(e) {
          let t;
          const i = this.meshPool.get();
          i
            ? ((t = i.object), t.update(e))
            : (t = this.meshPool.add(new w.p(e, this.layer)).object),
            this.meshes.push(t),
            this.container.add(t),
            (this.meshToDataMap[t.id] = e),
            (this.dataToMeshMap[e.index] = t),
            this.activateMesh(t, this.visibilityFilter(e));
        }
        removePortal(e) {
          const t = this.dataToMeshMap[e.index];
          if (t) {
            this.meshPool.free(t);
            const i = this.meshes.findIndex((e) => e.id === t.id);
            this.meshes.splice(i, 1),
              this.container.remove(t),
              this.deactivateMesh(t),
              delete this.meshToDataMap[t.id],
              delete this.dataToMeshMap[e.index];
          }
        }
        init() {}
        activate(e) {
          (this.broadcast = e.broadcast.bind(e)),
            this.bindings.push(
              this.input.registerMeshHandler(T.z, E.s.isType(w.p), (e, t) => {
                this.onPuckSelect(t);
              }),
            ),
            this.bindings.push(
              this.input.registerMeshHandler(T.A, E.s.isType(w.p), (e, t) => {
                this.onPuckDeselect(t);
              }),
            ),
            this.bindings.push(
              this.input.registerMeshHandler(C.Rd, E.s.isType(w.p), (e, t) => {
                this.onPuckClick(t);
              }),
            ),
            this.scene.add(this.container);
        }
        dispose() {
          for (const e of Object.keys(this.meshToDataMap)) {
            const t = this.meshToDataMap[e],
              i = this.dataToMeshMap[t.index];
            this.removePortal(t), i.material.dispose(), i.geometry.dispose();
          }
        }
        deactivate(e) {
          for (const e of this.bindings) e.cancel();
          (this.bindings.length = 0), this.scene.remove(this.container);
        }
        render(e) {
          for (const t of this.meshes) t.render(e, this.cameraData);
        }
        filter(e) {
          this.visibilityFilter = e;
          for (const t of this.meshes) {
            const i = e(this.meshToDataMap[t.id]);
            i === w.Y.HIDE ? this.deactivateMesh(t) : this.activateMesh(t, i);
          }
        }
        mapSweepToMesh(e) {
          for (const t in this.meshToDataMap) {
            const i = this.meshToDataMap[t];
            if (i.toSweep.id === e && i.toExterior && i.fromInterior)
              return this.dataToMeshMap[i.index];
          }
          return null;
        }
        activateMesh(e, t = 0) {
          this.activeMeshes[e.id] ||
            (this.input.registerMesh(e, !1), (this.activeMeshes[e.id] = !0)),
            e.setState(t);
        }
        deactivateMesh(e) {
          this.input.unregisterMesh(e),
            (this.activeMeshes[e.id] = !1),
            this.onPuckDeselect(e),
            e.setState(w.Y.HIDE);
        }
        onPuckClick(e) {
          this.broadcast(new D.K(this.meshToDataMap[e.id]));
        }
        onPuckSelect(e) {
          this.broadcast(new D.x(!0));
          const t = this.meshToDataMap[e.id].toSweep,
            i = this.viewportLoader.getPortalTexture(t, t.rotation, e.position);
          (this.activeTexturePromises[e.id] = i),
            i.then((t) => {
              this.activeTexturePromises.hasOwnProperty(e.id) &&
                i === this.activeTexturePromises[e.id] &&
                (e.updatePortalTexture(t), e.setHover(!0));
            });
        }
        onPuckDeselect(e) {
          this.broadcast(new D.x(!1)),
            e.setHover(!1),
            this.viewportLoader.releasePortalTexture(this.meshToDataMap[e.id].toSweep.id),
            delete this.activeTexturePromises[e.id];
        }
      }
      var A = i(8403);
      class O extends s.Y {
        constructor() {
          super(...arguments), (this.name = 'sweep-portal-mesh'), (this.portalCount = 0);
        }
        async init(e, t) {
          const [i, n, s, o, h, u, m] = await Promise.all([
              t.getModuleBySymbol(a.hD),
              t.getModuleBySymbol(a.fQ),
              t.getModuleBySymbol(a.PZ),
              t.getModuleBySymbol(a.tA),
              t.getModuleBySymbol(a.Aj),
              t.market.waitForData(d.Z),
              t.market.waitForData(r.M),
            ]),
            p = t.claimRenderLayer(this.name);
          this.portalData = {};
          const g = h.getScene().camera;
          this.raycaster = n;
          const v = new f(i, o, 256, g),
            y = h.getScene().scene;
          (this.portalRenderer = new x(y, s, v, p, m)),
            await Promise.all([t.getModuleBySymbol(a.EX)]);
          const w = new Map(),
            b = (e) => {
              var t;
              this.portalData[e.id] &&
                (this.removePortals(e.id, this.portalRenderer),
                null === (t = w.get(e.id)) || void 0 === t || t.cancel(),
                w.delete(e.id),
                delete this.portalData[e.id]);
            },
            T = (e) => {
              if (!this.portalData[e.id]) {
                (this.portalData[e.id] = []),
                  l.H7(e) &&
                    this.addPortals(
                      e,
                      this.portalRenderer,
                      u,
                      u.filter((e) => l.H7(e)),
                    );
                let t = e.placementType;
                w.set(
                  e.id,
                  e.onPropertyChanged('placementType', (i) => {
                    t !== c.hU.MANUAL &&
                      i === c.hU.MANUAL &&
                      this.addPortals(
                        e,
                        this.portalRenderer,
                        u,
                        u.filter((e) => l.H7(e)),
                      ),
                      t === c.hU.MANUAL &&
                        i !== c.hU.MANUAL &&
                        this.removePortals(e.id, this.portalRenderer),
                      (t = i);
                  }),
                );
              }
            },
            C = u.getCollection();
          this.bindings.push(
            C.onElementsChanged((e) => {
              var t, i, n;
              null === (t = e.removed) || void 0 === t || t.forEach(([e, t]) => b(t)),
                null === (i = e.added) || void 0 === i || i.forEach(([e, t]) => T(t)),
                null === (n = e.updated) ||
                  void 0 === n ||
                  n.forEach(([e, t]) => {
                    this.portalData[t.id] &&
                      l.H7(t) &&
                      (this.removePortals(t.id, this.portalRenderer),
                      this.addPortals(
                        t,
                        this.portalRenderer,
                        u,
                        u.filter((e) => l.H7(e)),
                      ));
                  });
            }),
          ),
            C.forEach(T),
            t.addComponent(this, this.portalRenderer);
        }
        filter(e) {
          this.portalRenderer.filter(e);
        }
        getPortalToExterior(e) {
          return this.portalRenderer.mapSweepToMesh(e);
        }
        removePortals(e, t) {
          for (const i of this.portalData[e]) t.removePortal(i);
          this.portalData[e].length = 0;
        }
        addPortals(e, t, i, n) {
          const s = this.nearestAlignedSweep(e, i);
          if (s) {
            const i = this.entryLinks(e, s),
              a = this.neighborLinks(e, n);
            (this.portalData[e.id].length = 0), this.portalData[e.id].push(...i, ...a);
            for (const i of this.portalData[e.id]) t.addPortal(i);
          } else
            this.log.debug(
              `Couldn't find the nearest sweep for a 360 on floor ${e.floorId}; not adding portals`,
            );
        }
        nearestAlignedSweep(e, t) {
          const i = [l.ff(e), l._k(), l._T(), l.b1(e)],
            n = [h.TE(e.position)],
            s = t.sortByScore(i, n)[0];
          return s ? s.sweep : null;
        }
        modelIntersection(e, t, i = 1 / 0) {
          const s = new n.Vector3().copy(e.position).sub(t.position).setY(0).normalize(),
            a = this.raycaster.picking.pick(t.position, s, o.T0);
          return { intersect: a && a.distance <= i ? a : null, rayDirection: s };
        }
        entryLinks(e, t) {
          const i = [],
            s = e.position.distanceTo(t.position),
            a = this.modelIntersection(e, t, s + A.vX);
          let o,
            r,
            d = !1;
          a.intersect && a.intersect.face
            ? ((o = a.intersect.face.normal.clone().setY(0).normalize()),
              Math.abs(a.rayDirection.dot(o)) < 0.3 && o.copy(a.rayDirection).multiplyScalar(-1),
              (r = a.intersect.point.clone().addScaledVector(o, A.AF)))
            : ((o = null), (d = !0), (r = e.position.clone())),
            (r.y = t.position.y),
            i.push({
              index: this.portalCount++,
              toSweep: e,
              fromSweep: t,
              position: r,
              lookDirection: o,
              billboard: d,
              toExterior: !0,
              fromInterior: !0,
            });
          const c = new n.Vector3().lerpVectors(e.position, t.position, 2 / s).setY(e.position.y);
          return (
            i.push({
              index: this.portalCount++,
              toSweep: t,
              fromSweep: e,
              position: c,
              lookDirection: o ? o.clone().negate() : null,
              billboard: d,
              toExterior: !1,
              fromInterior: !1,
            }),
            i
          );
        }
        neighborLinks(e, t) {
          const i = [];
          for (const n of t)
            if (e !== n && n.floorId === e.floorId && e.position.distanceTo(n.position) < A.M0) {
              const t = e.position.distanceTo(n.position);
              if (
                this.modelIntersection(e, n, t).intersect ||
                this.modelIntersection(n, e, t).intersect
              )
                continue;
              const s = e.position.clone().sub(n.position).setY(0).normalize(),
                a = n.position.clone(),
                o = A.iz;
              t > o && a.addScaledVector(s, t - o),
                i.push({
                  index: this.portalCount++,
                  toSweep: n,
                  fromSweep: e,
                  position: a,
                  lookDirection: s,
                  billboard: !1,
                  toExterior: !0,
                  fromInterior: !1,
                });
            }
          return i;
        }
      }
    },
    9034: (e, t, i) => {
      'use strict';
      i.d(t, { K: () => s, x: () => a });
      var n = i(8126);
      class s extends n.v0 {
        constructor(e) {
          super(),
            (this.toSweep = e.toSweep),
            (this.toExterior = e.toExterior),
            (this.fromInterior = e.fromInterior),
            (this.meshPosition = e.position);
        }
      }
      class a extends n.v0 {
        constructor(e) {
          super(), (this.hovered = e);
        }
      }
    },
    8403: (e, t, i) => {
      'use strict';
      i.d(t, { AF: () => s, M0: () => n, iz: () => r, nm: () => o, vX: () => a });
      const n = 15,
        s = 0.1,
        a = 0.3,
        o = 0.75,
        r = 4;
    },
    79419: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => w });
      const n = (0, i(52803)._F)(20);
      var s = i(933),
        a = i(4763),
        o = i(84376),
        r = i(43017),
        d = i(90288),
        c = i(57793),
        l = i(31740),
        h = i(90512),
        u = i(702),
        m = i(9034),
        p = i(38063),
        g = i(64150),
        v = i(38496),
        y = i(945),
        f = i(74094);
      class w extends s.Y {
        constructor() {
          super(...arguments),
            (this.name = 'sweep-portal-navigation'),
            (this.onChange = () => {
              this.portalRenderer.filter((e) => {
                if (!this.settingsData.tryGetProperty(v.s, !0)) return u.Y.HIDE;
                if (!(0, r.Bw)(this.viewmodeData.closestMode)) return u.Y.HIDE;
                const t = this.sweepData.getSweep(this.sweepData.currentSweep || '');
                if (t)
                  if (t.alignmentType === o.z9.ALIGNED) {
                    if (e.fromInterior && e.toExterior && e.position.distanceTo(t.position) < n)
                      return u.Y.SHOW;
                  } else if (t.placementType === o.hU.MANUAL && e.fromSweep.id === t.id)
                    return u.Y.ONTOP;
                return u.Y.HIDE;
              });
            });
        }
        async init(e, t) {
          (this.engine = t),
            ([
              this.portalRenderer,
              this.cameraData,
              this.viewmodeModule,
              this.viewmodeData,
              this.sweepData,
              this.settingsData,
            ] = await Promise.all([
              t.getModuleBySymbol(a.MI),
              t.market.waitForData(c.M),
              t.getModuleBySymbol(a.XT),
              t.market.waitForData(h.O),
              t.market.waitForData(l.Z),
              t.market.waitForData(g.e),
            ]));
          const i = (e, i) => {
            this.viewmodeData.currentMode &&
              this.cameraData.canTransition() &&
              (this.viewmodeData.currentMode !== r.Ey.Panorama
                ? this.viewmodeModule.switchToMode(r.Ey.Panorama, d.nF.FadeToBlack, {
                    sweepID: e,
                    rotation: i,
                  })
                : t.commandBinder.issueCommand(
                    new p.ju({ sweep: e, rotation: i, transition: d.nF.FadeToBlack }),
                  ));
          };
          this.settingsData.onPropertyChanged(v.s, this.onChange),
            this.bindings.push(
              t.subscribe(m.K, (e) => {
                i(e.toSweep.id);
              }),
              t.subscribe(m.x, (e) => this.onPortalHover(e.hovered)),
              this.viewmodeData.onChanged(this.onChange),
              this.sweepData.onChanged(this.onChange),
            ),
            this.onChange();
        }
        onPortalHover(e) {
          const t = e ? y.C.FINGER : null;
          this.engine.commandBinder.issueCommand(new f.u(t));
        }
      }
    },
    42436: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => c });
      var n = i(933),
        s = i(7516),
        a = i(81396),
        o = i(4763);
      const r = new (i(53257).Z)('sweep-textures'),
        d = { [s.SL.BASE]: 256, [s.SL.STANDARD]: 1024, [s.SL.HIGH]: 2048, [s.SL.ULTRAHIGH]: 4096 };
      class c extends n.Y {
        constructor() {
          super(...arguments), (this.name = 'sweep-textures'), (this.sweepCubeTextures = {});
        }
        async init({ sizes: e = d }, t) {
          (this.api = (await t.getModuleBySymbol(o.Vs)).getApi()), (this.sizes = e);
        }
        useTexture(e) {
          const t = this.getTexture(e);
          if (!t) throw Error('Texture for sweep not loaded before using');
          return t;
        }
        loadFace(e, t, i, n) {
          return this.loadFaceImage(e, t, i, n).then((e) => {
            const t = new a.Texture(e);
            return (t.needsUpdate = !0), t;
          });
        }
        load(e, t = s.SL.STANDARD) {
          const i = this.sweepCubeTextures[e.id];
          if (i)
            return (
              r.debug('Skipping load of pano, already loaded'),
              new Promise(function (e, t) {
                e(i);
              })
            );
          const n = [2, 4, 0, 5, 1, 3].map((i) => this.loadFaceImage(e, t, i)),
            o = Promise.all(n).then((t) => {
              const i = new a.CubeTexture(t);
              return (i.flipY = !1), (i.needsUpdate = !0), (this.sweepCubeTextures[e.id] = i), i;
            });
          return (
            o.catch(() => {
              r.error(`Downloading cubemap for pano ${e.id} failed`);
            }),
            o
          );
        }
        unload(e) {
          var t;
          const i = this.sweepCubeTextures[e];
          if (!i) throw Error('Texture for sweep not loaded before unloading');
          i.dispose(),
            null === (t = i.images) ||
              void 0 === t ||
              t.forEach((e) => {
                var t, i;
                null === (i = (t = e).close) || void 0 === i || i.call(t);
              }),
            (this.sweepCubeTextures[e] = null);
        }
        async loadFaceImage(e, t, i, n) {
          const s = this.sizes[t],
            a = await e.getFaceUrl(t, i);
          return this.api.getImageBitmap(a, s, s, n);
        }
        getTexture(e) {
          return this.sweepCubeTextures[e];
        }
      }
    },
    86077: (e, t, i) => {
      'use strict';
      i.d(t, { s: () => u });
      var n = i(85893),
        s = i(67294),
        a = i(94184),
        o = i.n(a),
        r = i(80308),
        d = i(32137),
        c = i(29707),
        l = i(27163),
        h = i(92257);
      const u = ({ keywords: e, className: t, maxVisible: i = 2, theme: a }) => {
        const { engine: u, editMode: m } = (0, s.useContext)(c.I),
          p = (0, s.useCallback)(
            ({ text: e }, t) => {
              t.stopPropagation();
              const i = m ? l.w1.LAYERS : l.w1.SEARCH;
              u.commandBinder.issueCommand(new h.tT(i, !0)),
                u.commandBinder.issueCommand(new d.FZ([e]));
            },
            [u, m],
          );
        return (0, n.jsx)(r.no, {
          className: o()('tag-keywords', t),
          tokens: e.map((e) => ({ id: e, text: e })),
          onTokenClick: p,
          maxVisibleTruncated: i,
          tokenSize: 'small',
          tokenTheme: a,
        });
      };
    },
    20449: (e, t, i) => {
      'use strict';
      i.d(t, { v: () => u });
      var n = i(85893),
        s = i(67294),
        a = i(94184),
        o = i.n(a),
        r = i(29707),
        d = i(91774),
        c = i(64474),
        l = i(62603),
        h = i(72043);
      const u = ({ attachments: e, onClick: t }) => {
        const { settings: i, engine: a } = (0, s.useContext)(r.I),
          u = (0, h.n)(),
          m = i.tryGetProperty(d.sX, !1);
        (0, s.useEffect)(() => {
          var t;
          (null === (t = e[0]) || void 0 === t ? void 0 : t.parentId) !== u &&
            a.commandBinder.issueCommand(new l.gD());
        }, [e]);
        const p = (0, s.useCallback)(
            (i, n) => {
              0 !== e.length && (i.stopPropagation(), t(i, n));
            },
            [e, t],
          ),
          g = (0, s.useCallback)((t) => {
            1 === e.length && a.commandBinder.issueCommand(new l.gD(t));
          }, []);
        return m || 0 === e.length
          ? null
          : (0, n.jsx)(
              'div',
              Object.assign(
                { className: o()('tag-media', { 'embed-error': !!u }) },
                { children: (0, n.jsx)(c.T, { attachments: e, onClick: p, onError: g }) },
              ),
            );
      };
    },
    72043: (e, t, i) => {
      'use strict';
      i.d(t, { n: () => a });
      var n = i(16996),
        s = i(54798);
      const a = (0, n.M)(s.n, 'embedErrorTagId', void 0);
    },
    74608: (e, t, i) => {
      'use strict';
      i.d(t, { L: () => o });
      var n = i(67294),
        s = i(42966);
      function a(e) {
        return e ? e.getLinkHandler() : null;
      }
      function o() {
        const e = (0, s.w)(),
          [t, i] = (0, n.useState)(a(e));
        return (0, n.useEffect)(() => (t || i(a(e)), () => {}), [e]), t;
      }
    },
    42966: (e, t, i) => {
      'use strict';
      i.d(t, { w: () => a });
      var n = i(38908),
        s = i(54798);
      const a = (0, n.u)(s.n);
    },
    96853: (e, t, i) => {
      'use strict';
      i.r(t),
        i.d(t, {
          CancelTagEditsCommand: () => M.Rj,
          CloseTagCommand: () => M.xb,
          DeleteTagCommand: () => M.T3,
          EditTagCommand: () => M.zt,
          FilterVisibleTagsCommand: () => M.Sq,
          OpenTagCommand: () => M.lt,
          RegisterTagsToolCommand: () => M.Ws,
          SaveCustomTagOrderCommand: () => M.$B,
          SaveTagCommand: () => M.QG,
          SaveTagVisibilityCommand: () => M.bg,
          SetEmbedErrorTagIdCommand: () => M.gD,
          SetTagOrderByCommand: () => M.kT,
          SetTagsModeCommand: () => M.Li,
          StartNewTagCommand: () => M.$J,
          TagOrderBy: () => R.D,
          TagsMode: () => R.U,
          TagsToolToggleCommand: () => M.yU,
          TagsViewData: () => ge.n,
          TagsVisibilityFilterEnabledCommand: () => M.aI,
          ToggleDirtyTagStateCommand: () => M.q4,
          UpdateOpenTagViewCommand: () => M.fe,
          default: () => vt,
        });
      var n = i(81396),
        s = i(933),
        a = i(4763),
        o = i(45796),
        r = i(80383),
        d = i(7321),
        c = i(28721),
        l = i(71472);
      const h = i.p + 'images/tagColor.png';
      var u = i(35659),
        m = i(37137),
        p = i(90288),
        g = i(38063),
        v = i(75287),
        y = i(72960),
        f = i(68687),
        w = i(3999),
        b = i(24650),
        T = i(86172),
        C = i(24938),
        E = i(20348),
        D = i(73521),
        x = i(40232),
        A = i(73515),
        O = i(25100),
        S = i(95845),
        P = i(46629),
        I = i(18808);
      class k extends D.K {
        constructor(e, t, i, s, a, o, d, c) {
          super(e, t, i),
            (this.containerData = s),
            (this.tag = a),
            (this.tagIconsEnabled = d),
            (this.defaultTagLabel = c),
            (this.id = this.tag.id),
            (this.title =
              this.tag.label ||
              this.textParser.getPlainText(this.tag.description) ||
              this.defaultTagLabel),
            (this.description = this.tag.label
              ? this.textParser.getPlainText(this.tag.description)
              : ''),
            (this.icon = `icon-${(0, S.mg)(P.Er.MATTERTAG, this.tag.icon, this.tagIconsEnabled)}`),
            (this.typeId = r.SF.MATTERTAG),
            (this.floorId = this.tag.floorId),
            (this.roomId = this.tag.roomId || ''),
            (this.layerId = this.tag.layerId),
            (this.dateBucket = (0, x.f)(this.tag.created)),
            (this.color = (function (e) {
              const t = new n.Color(e);
              return `rgb(${255 * t.r}, ${255 * t.g}, ${255 * t.b})`;
            })(this.tag.color)),
            (this.enabled = this.tag.enabled),
            (this.onSelect = async () => {
              await this.commandBinder.issueCommand(new A.yL()),
                await this.commandBinder.issueCommand(
                  new g.OR({ pinPosition: this.tag, transition: p.nF.FadeToBlack }),
                ),
                (0, I.p)(this.containerData.size)
                  ? this.commandBinder.issueCommand(new A.bd(this.id, O.J.TAG))
                  : this.commandBinder.issueCommand(new A.oM(this.id, O.J.TAG));
            }),
            (this.textParser = o);
        }
        supportsLayeredCopyMove() {
          return !0;
        }
        supportsBatchDelete() {
          return !0;
        }
      }
      var N = i(1055),
        R = i(1455),
        M = i(62603),
        j = i(32137),
        L = i(89056);
      const { TAGS: B } = d.Z.SHOWCASE,
        V = new v.v({ links: !0 }),
        F = '0' === (0, N.eY)('mt');
      function _(e, t, i, n, s, a, o, d) {
        let c = o.application === C.Mx.WORKSHOP;
        const l = a.tryGetProperty(L.RV, !1),
          h = (t, a, o, r = []) => {
            const h = [];
            return (
              (i.tagOrder === R.D.ALPHABETICAL
                ? i.getAlphabeticTagViewMapFilter().values
                : i.getOrderedTagViewMapFilter().values
              ).forEach((i) => {
                if (!(c || (i.enabled && n.layerToggled(i.layerId)))) return;
                if (i.objectAnnotationId) return;
                let o = t(i.label, V.getPlainText(i.description));
                o &&
                  r.length > 0 &&
                  (o = i.keywords.length > 0 && i.keywords.some((e) => r.includes(e))),
                  o && h.push(new k(e, n, a, s, i, V, l, d));
              }),
              e.issueCommand(new M.Sq(h.map((e) => e.id))),
              h
            );
          },
          u = (t) => {
            e.issueCommand(new M.aI(!!t));
          },
          m = (e) =>
            new E.V(
              i.getOrderedTagViewMapFilter().onChanged(e),
              i.onPropertyChanged('tagOrder', e),
            ),
          p = {
            renew: () => {
              e.issueCommandWhenBound(
                new j.c6({
                  id: r.SF.MATTERTAG,
                  groupPhraseKey: B.SEARCH_GROUP_HEADER,
                  getSimpleMatches: h,
                  registerChangeObserver: m,
                  onSearchActivatedChanged: u,
                  getKeywords: t.getTagKeywords.bind(t),
                  groupOrder: 20,
                  groupIcon: 'toolbar-mattertags',
                  batchSupported: !0,
                }),
              );
            },
            cancel: () => {
              e.issueCommandWhenBound(new j.Pe(r.SF.MATTERTAG));
            },
          },
          g = (e) => {
            c = e === C.Mx.WORKSHOP;
            !F || c ? p.renew() : p.cancel();
          },
          v = o.onPropertyChanged('application', g);
        return g(o.application), new E.V(p, v);
      }
      var H,
        U = i(8126);
      class G extends U.v0 {
        constructor(e, t, i) {
          super(), (this.sid = e), (this.position = t), (this.distanceFromCamera = i);
        }
      }
      class z extends U.v0 {
        constructor(e, t) {
          super(), (this.sid = e), (this.removeMethod = t);
        }
      }
      class W extends U.v0 {
        constructor(e, t) {
          super(), (this.sid = e), (this.characterCount = t);
        }
      }
      class $ extends U.v0 {
        constructor(e, t, i) {
          super(), (this.sid = e), (this.characterCount = t), (this.tagDescriptionChunks = i);
        }
      }
      class K extends U.v0 {
        constructor(e, t, i) {
          super(), (this.sid = e), (this.mediaType = t), (this.mediaSrc = i);
        }
      }
      class Z extends U.v0 {
        constructor(e, t, i) {
          super(), (this.sid = e), (this.property = t), (this.value = i);
        }
      }
      class Y extends U.v0 {
        constructor(e, t, i, n) {
          super(),
            (this.sid = e),
            (this.position = t),
            (this.distanceFromCamera = i),
            (this.distanceMoved = n);
        }
      }
      !(function (e) {
        (e.DISC_COLOR = 'disc_color'),
          (e.STEM_VISIBLE = 'stem_visible'),
          (e.STEM_LENGTH = 'stem_length'),
          (e.TITLE = 'title'),
          (e.DESCRIPTION = 'description'),
          (e.MEDIA = 'media'),
          (e.LINKS = 'links'),
          (e.ENABLED = 'enabled'),
          (e.KEYWORDS = 'keywords');
      })(H || (H = {}));
      var J = i(94989),
        q = i(83730),
        Q = i(44009),
        X = i(12925),
        ee = i(7555),
        te = i(59635),
        ie = i(27163),
        ne = i(92257),
        se = i(2159),
        ae = i(70593),
        oe = i(13760),
        re = i(63160),
        de = i(19272),
        ce = i(21286),
        le = i(96263),
        he = i(30922),
        ue = i(10306),
        me = i(89072),
        pe = i(10163),
        ge = i(54798),
        ve = i(25629),
        ye = i(39262),
        fe = i(60937),
        we = i(31740),
        be = i(64150),
        Te = i(90512),
        Ce = i(8374),
        Ee = i(57793),
        De = i(17295),
        xe = i(22925),
        Ae = i(34014),
        Oe = i(78989),
        Se = i(58642),
        Pe = i(99220),
        Ie = i(85893),
        ke = i(67294),
        Ne = i(29707),
        Re = i(39049),
        Me = i(27538),
        je = i(43948),
        Le = i(9993),
        Be = i(38637),
        Ve = i(10545),
        Fe = i(94184),
        _e = i.n(Fe),
        He = i(91774),
        Ue = i(62402),
        Ge = i(38908),
        ze = i(77963),
        We = i(42966);
      function $e() {
        const e = (0, We.w)(),
          [t, i] = (0, ke.useState)(e ? e.openTagView : null);
        return (
          (0, ke.useEffect)(() => {
            if (!e) return () => {};
            const t = e.onOpenTagViewChanged(i);
            return i(e.openTagView), () => t.cancel();
          }, [e]),
          t
        );
      }
      var Ke = i(74608),
        Ze = i(80308),
        Ye = i(86077),
        Je = i(20449),
        qe = i(58894),
        Qe = i(43255),
        Xe = i(92394);
      function et() {
        const { commandBinder: e } = (0, ke.useContext)(Ne.I),
          t = $e(),
          i = (0, Ke.L)(),
          n = (0, Ge.m)(pe.n),
          s = (0, Ge.m)(ge.n),
          a = (0, Ge.m)(X.A),
          [o, r] = (0, ke.useState)(null),
          [d, c] = (0, ke.useState)(!0),
          l = (0, ze.y)(L.ho, !0),
          h = (0, ze.y)(He.sX, !1),
          u = (0, ze.y)(L.RV, !1);
        (0, ke.useEffect)(() => {
          if (!(n && s && t && (null == n ? void 0 : n.getTag(t.id)))) return;
          const e = n.getTag(t.id);
          function i(e) {
            const t = null == a ? void 0 : a.getCapabilities(e);
            return t && c(t.share), t;
          }
          r(Object.assign({}, t));
          const o = i(t.id),
            d = null == o ? void 0 : o.onChanged(() => i(t.id)),
            l = e.onChanged(() => {
              const e = s.getTagView(t.id);
              r(e ? Object.assign({}, e) : null);
            });
          return () => {
            l.cancel(), null == d || d.cancel();
          };
        }, [a, t, n, s]);
        const m = (t) => {
          e.issueCommand(new ve.xW(!0, f, t));
        };
        if (!o) return null;
        const {
            id: p,
            description: g,
            label: y,
            attachments: f,
            keywords: w,
            icon: b,
            color: T,
          } = o,
          C = new v.v({ links: !0 }),
          E = (0, ye.Ug)(f),
          D = (0, ye.ae)(f),
          x = E.length > 0,
          A = d && l;
        return (0, Ie.jsxs)(
          'div',
          Object.assign(
            { className: _e()('tag-view-panel', { 'viewable-media': x }) },
            {
              children: [
                x &&
                  !h &&
                  (0, Ie.jsx)(Je.v, {
                    attachments: E,
                    onClick: (e, t) => {
                      m(t);
                    },
                  }),
                (0, Ie.jsxs)(
                  'div',
                  Object.assign(
                    { className: _e()('tag-view-panel-header', { 'no-media': h || !x }) },
                    {
                      children: [
                        (0, Ie.jsx)(Xe.C, {
                          badgeStyle: { background: T },
                          iconClass: `icon-${(0, S.mg)(P.Er.MATTERTAG, b, u)}`,
                        }),
                        (0, Ie.jsxs)(
                          'div',
                          Object.assign(
                            { className: 'tag-view-panel-header-contents' },
                            {
                              children: [
                                (0, Ie.jsxs)(
                                  'div',
                                  Object.assign(
                                    { className: 'tag-view-panel-top' },
                                    {
                                      children: [
                                        y &&
                                          (0, Ie.jsx)(
                                            'div',
                                            Object.assign(
                                              { className: 'tag-view-panel-title' },
                                              { children: y },
                                            ),
                                          ),
                                        (void 0 === A || A) &&
                                          (0, Ie.jsx)(
                                            Qe.O,
                                            {
                                              prefix: 'tag',
                                              pin: o,
                                              id: o.id,
                                              darkTheme: !1,
                                              includeCameraView: !0,
                                              analyticAction: 'tags_copy_share_link',
                                              buttonVariant: Ze.Wu.TERTIARY,
                                            },
                                            o.id,
                                          ),
                                      ],
                                    },
                                  ),
                                ),
                                w &&
                                  (0, Ie.jsx)(Ye.s, {
                                    className: 'tag-view-panel-keywords',
                                    keywords: w,
                                    maxVisible: 5,
                                  }),
                                (0, Ie.jsx)(qe.e, {
                                  text: g,
                                  textParser: C,
                                  linkHandler: i,
                                  annotationType: O.J.TAG,
                                  annotationId: p,
                                  attachments: [],
                                  onViewAttachment: m,
                                }),
                              ],
                            },
                          ),
                        ),
                      ],
                    },
                  ),
                ),
                D.length > 0 &&
                  (0, Ie.jsxs)(
                    'div',
                    Object.assign(
                      { className: 'tag-view-panel-attachments' },
                      {
                        children: [
                          (0, Ie.jsx)('h4', { children: 'Attachments' }),
                          (0, Ie.jsx)(Ue.s, { annotationType: O.J.TAG, attachments: D }),
                        ],
                      },
                    ),
                  ),
              ],
            },
          ),
        );
      }
      var tt = i(77267),
        it = i(67951);
      var nt = i(23084),
        st = i(79284);
      function at(e) {
        const { overlay: t, analyticAction: i } = e,
          { analytics: n, commandBinder: s, editMode: a } = (0, ke.useContext)(Ne.I),
          o = (0, tt.Y)(),
          r = (function (e) {
            const t = (0, We.w)(),
              [i, n] = (0, ke.useState)((null == t ? void 0 : t.getOrderedTags(e)) || []);
            return (
              (0, ke.useEffect)(() => {
                if (!t) return () => {};
                function i() {
                  t && n(t.getOrderedTags(e));
                }
                const s = t.getOrderedTagViewMapFilter().onChanged(i);
                return i(), () => s.cancel();
              }, [t, e]),
              i
            );
          })(!0),
          d = $e(),
          c = (0, it._)(),
          l = (0, We.w)(),
          [h, u] = (0, ke.useState)(!1),
          m =
            a || !c
              ? r
              : r.filter((e) => c.layerToggled(e.layerId) && (!l || l.getCapabilities(e.id).focus));
        if (!(d && m.length > 1)) return null;
        const g = m.findIndex((e) => e.id === (null == d ? void 0 : d.id));
        if (-1 === g) return null;
        const v = (0, Ie.jsx)(nt.$, {
          index: g,
          total: m.length,
          disabled: h,
          overlay: t,
          wrapAround: !0,
          onNavigate: (e) => {
            const t = m[e];
            if (!t) return;
            u(!0);
            const a = d ? (o ? p.nF.Instant : p.nF.FadeToBlack) : p.nF.Interpolate;
            n.trackToolGuiEvent('tags', i),
              s.issueCommand(new M.lt(t.id, { transition: a })).then(() => {
                u(!1);
              });
          },
        });
        return t
          ? (0, Ie.jsx)(
              st.u,
              Object.assign({ className: 'tags-navigation-overlay' }, { children: v }),
            )
          : v;
      }
      const { TAGS: ot } = d.Z.SHOWCASE;
      function rt() {
        const e = (0, Re.A)(),
          t = (0, Me.T)(),
          i = (0, je.R)(),
          n = (0, ze.y)(L.ek, '1'),
          { commandBinder: s, locale: a } = (0, ke.useContext)(Ne.I),
          o = e && (e === ie.w1.SEARCH || e === ie.w1.LAYERS),
          r = () => {
            o
              ? s.issueCommand(new ne.cR()).then(() => {
                  s.issueCommand(new ne.qy(!1));
                })
              : s.issueCommand(new ne.CH(ie.w1.TAGS));
          },
          d = e ? 'back' : 'close',
          c = a.t(o ? ot.NAV_BACK_LABEL : ot.CLOSE_TAG_LABEL),
          l = t === ie.wS.BOTTOM_PANEL,
          h = i && i !== Le.P.CONFIRM,
          u = !l || !h;
        return (0, Ie.jsxs)(
          Ve.J,
          Object.assign(
            { className: 'tags-panel', open: u, scrollingDisabled: !1, onClose: r },
            {
              children: [
                (0, Ie.jsxs)(
                  'div',
                  Object.assign(
                    { className: 'detail-panel-header' },
                    {
                      children: [
                        (0, Ie.jsx)(Be.P, { icon: d, label: c, onClose: r }),
                        n && (0, Ie.jsx)(at, { analyticAction: 'tags_navigate_in_panel' }),
                      ],
                    },
                  ),
                ),
                (0, Ie.jsx)(et, {}),
              ],
            },
          ),
        );
      }
      var dt = i(60770),
        ct = i(30300);
      function lt() {
        const e = (0, je.R)(),
          t = (0, ct.B)(),
          i = (0, ze.y)(L.ek, '1');
        return e || t || !i
          ? null
          : (0, Ie.jsx)(
              'div',
              Object.assign(
                { className: 'overlay grid-overlay tags-overlay' },
                {
                  children: (0, Ie.jsx)(at, {
                    overlay: !0,
                    analyticAction: 'tags_navigate_in_canvas',
                  }),
                },
              ),
            );
      }
      class ht {
        constructor() {
          this.renderPanel = () => (0, Ie.jsx)(rt, {});
        }
        renderPersistentOverlay() {
          return (0, Ie.jsxs)(
            'div',
            { children: [(0, Ie.jsx)(dt.w, { parentTool: ie.w1.TAGS }), (0, Ie.jsx)(lt, {})] },
            'tags-panel-ui',
          );
        }
      }
      var ut = i(8334);
      const { TAGS: mt } = d.Z.SHOWCASE;
      class pt {
        constructor(e, t) {
          (this.engine = e), (this.settings = t);
        }
        async activate() {
          await this.engine.commandBinder.issueCommand(new M.yU(!0));
        }
        async deactivate() {
          await this.engine.commandBinder.issueCommand(new M.yU(!1));
        }
        async deepLink(e) {
          const t = (await this.engine.market.waitForData(ge.n)).getTagView(e);
          if (t)
            (0, S.W4)(this.settings, t, (t) => {
              this.engine.commandBinder.issueCommand(new M.lt(e, { transition: t, dock: !0 }));
            });
          else {
            const e = { messagePhraseKey: mt.MISSING_MESSAGE, timeout: 4e3, dismissesOnAction: !0 };
            this.engine.commandBinder.issueCommand(new ut.L(e));
          }
        }
      }
      class gt extends s.Y {
        constructor() {
          super(...arguments),
            (this.name = 'tags-module'),
            (this.opening = null),
            (this.activated = !1),
            (this.registered = !1),
            (this.activeBindings = []),
            (this.updatePerSettings = () => {
              const e = this.settingsData.tryGetProperty(he.re, !1),
                t = !this.in360View() && e;
              this.engine.commandBinder.issueCommand(new J.qN(P.Er.MATTERTAG, t)),
                t || this.closeTagBillboard();
            }),
            (this.registerTagsTool = async () => {
              const e = new te.U({
                id: ie.w1.TAGS,
                namePhraseKey: d.Z.TOOLS.TAGS,
                deepLinkParam: 'tag',
                panel: !0,
                icon: 'icon-toolbar-mattertags',
                analytic: 'tags',
                dimmed: !1,
                enabled: !0,
                hidesAppBar: !0,
                ui: new ht(),
                manager: new pt(this.engine, this.settingsData),
              });
              this.engine.commandBinder.issueCommand(new ne.MV([e]));
            }),
            (this.tagsToolToggled = async (e) => {
              e.opened ? this.activateTool() : this.deactivateTool();
            }),
            (this.updateViewingControls = () => {
              const { openTagView: e } = this.viewData,
                t = this.toolsData.toolPanelLayout === ie.wS.BOTTOM_PANEL,
                i = !this.activated || (!t && !e);
              this.engine.broadcast(new se.ps(i));
            }),
            (this.onCloseTag = async () => {
              this.closeTag();
            }),
            (this.pinAddCancelled = (e) => {
              e.pinType === P.Er.MATTERTAG && this.cancelTagCreation(!1);
            }),
            (this.cancelTagEdits = async () => {
              this.viewData.creatingTag ? this.cancelTagCreation(!0) : this.closeTag();
            }),
            (this.cancelTagCreation = (e) => {
              var t;
              const i = this.viewData,
                n = null === (t = i.openTagView) || void 0 === t ? void 0 : t.id;
              this.cancelAttachmentChanges(),
                i.setOpenTagView(null),
                (i.creatingTag = !1),
                (i.openTagIsDirty = !1),
                i.commit(),
                n &&
                  (e && this.engine.commandBinder.issueCommand(new J.tT(n, P.Er.MATTERTAG)),
                  this.engine.commandBinder.issueCommand(new A.Aj(n, O.J.TAG)));
            }),
            (this.tagsWereChanged = () => {
              this.refreshTagViews(), this.displayTags();
            }),
            (this.refreshTagViews = () => {
              this.viewData.refreshTagViews(this.getCustomTagOrder());
            }),
            (this.onTagRemoved = (e) => {
              const t = e.objectAnnotationId ? P.Er.OBJECT : P.Er.MATTERTAG;
              this.engine.commandBinder.issueCommand(new J.OL(e.sid, t));
            }),
            (this.handleModelViewChange = () => {
              if (this.viewData.openTagView)
                if (this.viewData.creatingTag) this.cancelTagCreation(!0);
                else {
                  this.tagsData.getTag(this.viewData.openTagView.id) || this.closeTag();
                }
            }),
            (this.onLayersChanged = () => {
              this.closeTagBillboard(), this.displayTags();
            }),
            (this.onOpenTagViewChanged = () => {
              const e = this.viewData.openTagView;
              e && this.updateTagPin(e);
            }),
            (this.startTagCreation = async () => {
              const e = this.viewData;
              e.setTagsMode(R.U.DEFAULT), await this.closeTag();
              let t = (0, c.O1)(11);
              for (; this.tagsData.getTag(t); ) t = (0, c.O1)(11);
              const i = new me.U();
              (i.sid = t),
                (i.floorId = this.floorsViewData.getHighestVisibleFloor().id),
                (i.layerId = this.layersData.activeLayerId);
              const n = e.createTagView(i);
              return (
                (e.creatingTag = !0),
                e.commit(),
                e.setOpenTagView(n),
                this.engine.commandBinder.issueCommand(
                  new J.fM(n.id, this.getPinUpdate(n), P.Er.MATTERTAG, n.backgroundTexture),
                ),
                t
              );
            }),
            (this.saveTag = async (e) => {
              const {
                  id: t,
                  properties: i,
                  pendingAttachments: n,
                  removedAttachments: s,
                  embed: a,
                } = e,
                o = this.viewData,
                { openTagView: r, creatingTag: d } = o;
              if (!r) return void this.log.debug('No open tag');
              const c = Object.assign({}, r, i);
              this.trackChanges(t, c, a),
                d
                  ? ((o.creatingTag = !1),
                    (o.openTagIsDirty = !1),
                    o.commit(),
                    await this.engine.commandBinder.issueCommand(new ue.Mm(t, c, n, a)))
                  : await this.engine.commandBinder.issueCommand(new ue.qq(t, c, n, s, a)),
                c.objectAnnotationId || this.selectPin(t, !0),
                await this.engine.commandBinder.issueCommand(new ve.x9()),
                this.closeTag();
            }),
            (this.saveTagVisibility = async (e) => {
              const { id: t, visible: i } = e,
                n = this.tagsData.getTag(t);
              if (!n) throw new Error('Tag not found!');
              this.engine.commandBinder.issueCommand(
                new J.ik(t, P.Er.MATTERTAG, this.getTagVisibility(t, n.layerId, i)),
              );
              const s = { enabled: i };
              return (
                this.trackChanges(t, s),
                i || this.closeTag(),
                this.engine.commandBinder.issueCommand(new ue.qq(t, s))
              );
            }),
            (this.onDeleteTag = async (e) => {
              const t = e.id;
              this.tagsData.getTag(t)
                ? (this.toggleTagDirty(!1),
                  this.engine.commandBinder.issueCommand(new oe.r()),
                  this.engine.broadcast(new z(t, e.removalMethod)),
                  this.engine.commandBinder.issueCommand(new ue.Gn(t)).then(() => {
                    this.saveTags().then(() => {
                      this.engine.commandBinder.issueCommand(new J.OL(t, P.Er.MATTERTAG));
                      const e = this.viewData.openTagView;
                      e && e.id === t && this.closeTag();
                    });
                  }),
                  this.engine.commandBinder.issueCommand(new ve.x9()))
                : this.log.debug('Cannot delete a non-existent tag');
            }),
            (this.onEditTag = async (e) => {
              const { tagId: t } = e;
              this.tagsData.getTag(t)
                ? (await this.engine.commandBinder.issueCommand(new ve.x9()),
                  await this.openTag(t, p.nF.FadeToBlack, !0, !0),
                  this.openAnnotation(t, !0),
                  this.selectPin(t, !0))
                : this.log.debug('Cannot edit a non-existent tag');
            }),
            (this.updateOpenTagView = async (e) => {
              const { updates: t } = e,
                i = this.viewData.openTagView;
              if (i) {
                this.viewData.setOpenTagView(Object.assign(Object.assign({}, i), t));
                const e = i.objectAnnotationId || i.id,
                  n = i.objectAnnotationId ? P.Er.OBJECT : P.Er.MATTERTAG;
                await this.engine.commandBinder.issueCommand(new J.tE(e, n, t));
              } else this.log.debug('No open tag to update');
            }),
            (this.onSaveCustomTagOrder = async (e) => {
              const { ids: t } = e,
                i = t.map((e) => ({ id: e, type: re.l.TAG }));
              await this.engine.commandBinder.issueCommand(new de.wg(le.q, i)),
                this.viewData.refreshTagViews(t);
            }),
            (this.setEmbedErrorTagId = async (e) => {
              this.viewData.setEmbedErrorTagId(e.id);
            }),
            (this.pinMoved = (e) => {
              const { id: t, pinType: i, pinPos: n, previousPos: s } = e,
                a = this.viewData.openTagView;
              if (a && i === P.Er.MATTERTAG && t === a.id) {
                if (this.tagsData.getTag(t)) {
                  const { anchorPosition: e, stemNormal: i, floorId: a, roomId: o } = n,
                    r = { position: e, normal: i, floorId: a, roomId: o };
                  this.engine.broadcast(
                    new Y(
                      t,
                      r.position,
                      r.position.distanceTo(this.cameraData.pose.position),
                      s ? r.position.distanceTo(s.anchorPosition) : 0,
                    ),
                  ),
                    this.engine.commandBinder.issueCommand(new ue.qq(t, r));
                } else this.log.debug('Cannot move a non-existent tag');
              }
            }),
            (this.pinPlaced = (e) => {
              const { openTagView: t } = this.viewData;
              t &&
                e.pinType === P.Er.MATTERTAG &&
                e.id === t.id &&
                (Object.assign(t, e.pinPos), this.openAnnotation(t.id, !0));
            }),
            (this.handlePinFocusChange = async () => {
              const { openTagView: e, creatingTag: t } = this.viewData;
              if (t) return;
              const { commandBinder: i } = this.engine,
                { focusedPin: n, selectedPinId: s } = this.pinsViewData,
                { billboardAnnotation: a } = this.annotationsViewData;
              if (!n)
                return void (
                  a &&
                  a.annotationType === O.J.TAG &&
                  a.id !== s &&
                  (await i.issueCommand(new A.Aj(a.id, O.J.TAG)))
                );
              const o = this.getSelectedTag(),
                r = o && (null == o ? void 0 : o.id) === (null == e ? void 0 : e.id),
                d = e && (null == e ? void 0 : e.id) === (null == n ? void 0 : n.id);
              if ((e && r && !d && this.closeTag(), n.pinType === P.Er.MATTERTAG)) {
                const t = this.viewData.getTagView(n.id);
                if (!t) return void this.log.debug('Focused pin changed, but no tag view.');
                t.id !== (null == e ? void 0 : e.id) &&
                  (i.issueCommand(new A.Kw(t.id, O.J.TAG)),
                  this.engine.broadcast(new Oe.dJ(t.id, Se.V.HOVER)));
              }
            }),
            (this.handlePinSelectionChange = async () => {
              const { openTagView: e, openTagIsDirty: t } = this.viewData,
                { selectedPinId: i } = this.pinsViewData;
              if (t || (null == e ? void 0 : e.id) === i) return;
              const n = i ? this.pinsViewData.getPin(i) : null,
                s = this.appData.application === C.Mx.WORKSHOP;
              if (e && !n)
                !s && this.activated
                  ? await this.engine.commandBinder.issueCommand(new ne.CH(ie.w1.TAGS))
                  : this.closeTag();
              else if (n && n.pinType === P.Er.MATTERTAG) {
                (0, I.p)(this.containerData.size) &&
                  (await this.engine.commandBinder.issueCommand(new A.bd(n.id, O.J.TAG)));
                const e = this.isTagDocked() || !!this.getSelectedTag(),
                  t = s && e;
                this.engine.commandBinder.issueCommand(new J.ic(n.id, t)),
                  this.engine.broadcast(new Oe.dJ(n.id, Se.V.OPEN));
                const i = this.isDocking();
                await this.openTag(n.id, p.nF.Interpolate, i), this.openAnnotation(n.id, i);
              }
            }),
            (this.isDocking = () =>
              (0, I.p)(this.containerData.size) || (this.activated && this.isTagDocked())),
            (this.handleAnnotationsChanged = async () => {
              const { openTagView: e, creatingTag: t } = this.viewData;
              if (t || this.opening) return;
              const i = this.getDockedTag(),
                n = this.getSelectedTag(),
                s = i || n,
                a = !!i,
                { dockedAnnotation: o } = this.annotationsViewData;
              if (e && !s && (null == o ? void 0 : o.annotationType) !== O.J.OBJECT)
                this.closeTag();
              else if (s && s.id !== (null == e ? void 0 : e.id)) {
                this.engine.broadcast(new Oe.dJ(s.id, Se.V.OPEN));
                const e = this.appData.application !== C.Mx.WORKSHOP || !a;
                await this.openTag(s.id, p.nF.Interpolate, a, e), await this.selectPin(s.id, a);
              }
              a
                ? (this.activated ||
                    (await this.engine.commandBinder.issueCommand(new ne.z2(ie.w1.TAGS, !0))),
                  s && (await this.selectPin(s.id, a)))
                : this.activated &&
                  this.toolsData.softOpening &&
                  (await this.engine.commandBinder.issueCommand(new ne.CH(ie.w1.TAGS)));
            }),
            (this.handleViewingAttachment = (e) => {
              const { annotationType: t, id: i, attachmentId: n } = e;
              if (t !== O.J.TAG) return;
              const s = this.viewData.getTagView(i);
              if (!s) return void this.log.debug('Cannot view attachment for a non-existent tag');
              const a = s.attachments,
                o = a.find((e) => e.id === n);
              if (o && (0, ye.lV)(o)) {
                const e = a.filter((e) => (0, ye.lV)(e));
                this.engine.commandBinder.issueCommand(new ve.xW(!0, e, n));
              }
            }),
            (this.onOpenTag = async (e) => {
              const { tagId: t, dock: i, transition: n, objectTag: s, forceOpen: a } = e;
              this.toggleTagDirty(!1);
              const o = this.annotationsViewData.getCapabilities(t).dock,
                r = !(!i || !o),
                d = null === i && this.isTagDocked() && o,
                c = r || d || !(!i || !a);
              c && s
                ? this.dockObjectTag(t)
                : (await this.openTag(t, n, c), this.openAnnotation(t, c, a), this.selectPin(t, c));
            }),
            (this.filterVisibleTags = async (e) => {
              const { idVisibility: t } = this.viewData;
              t.clear(), e.ids.forEach((e) => t.add(e)), this.viewData.commit(), this.displayTags();
            }),
            (this.tagVisbilityFilterEnabled = async (e) => {
              (this.viewData.idVisibilityEnabled = e.enabled),
                this.viewData.commit(),
                this.displayTags();
            }),
            (this.setTagOrderBy = async ({ order: e }) => {
              e !== this.viewData.tagOrder &&
                ((this.viewData.tagOrder = e), this.viewData.commit());
            }),
            (this.setTagsMode = async ({ mode: e }) => {
              e === R.U.REORDERING && this.closeTag(), this.viewData.setTagsMode(e);
            });
        }
        async init(e, t) {
          const [i, n, s, r, c, u, m, p, g, b, T, E, D] = await Promise.all([
              t.market.waitForData(Ee.M),
              t.market.waitForData(pe.n),
              t.market.waitForData(ae.t),
              t.market.waitForData(we.Z),
              t.market.waitForData(be.e),
              t.market.waitForData(Te.O),
              t.market.waitForData(X.A),
              t.market.waitForData(C.pu),
              t.market.waitForData(fe.c),
              t.market.waitForData(ce.W),
              t.market.waitForData(xe.R),
              t.market.waitForData(Pe.V),
              t.getModuleBySymbol(a.e9),
            ]),
            [x, A, O] = await Promise.all([
              t.market.waitForData(De.i),
              t.market.waitForData(Ce.O),
              t.getModuleBySymbol(o.DeepLinksModuleKey),
            ]);
          (this.cameraData = i),
            (this.tagsData = n),
            (this.toolsData = s),
            (this.sweepData = r),
            (this.settingsData = c),
            (this.viewmodeData = u),
            (this.annotationsViewData = m),
            (this.appData = p),
            (this.floorsViewData = g),
            (this.orderedListData = b),
            (this.layersData = T),
            (this.containerData = E),
            (this.engine = t),
            (this.backgroundTexture = (0, l.p)(h)),
            (this.descriptionParser = new y.$({ supportLinks: !0, keepLinkLabels: !0 }));
          const S = new v.v({ links: !0, hashtags: !1 }),
            P = this.getCustomTagOrder(),
            I = D.t(d.Z.WORKSHOP.MATTERTAGS.DEFAULT_TAG_TITLE);
          (this.viewData = new ge.n(
            this.tagsData,
            x,
            A,
            P,
            S,
            O,
            I,
            this.backgroundTexture,
            e.objectTagsEnabled,
          )),
            (this.pinsViewData = await t.market.waitForData(q.B)),
            this.bindings.push(
              c.onPropertyChanged(he.re, this.updatePerSettings),
              t.commandBinder.addBinding(M.Ws, this.registerTagsTool),
              t.commandBinder.addBinding(M.yU, this.tagsToolToggled),
              t.subscribe(ee.q, this.handleViewingAttachment),
              t.subscribe(f.Z, this.updatePerSettings),
              t.subscribe(w.m, this.updatePerSettings),
              u.makeModeChangeSubscription(this.updatePerSettings),
              t.commandBinder.addBinding(M.xb, this.onCloseTag),
              t.commandBinder.addBinding(M.lt, this.onOpenTag),
              t.commandBinder.addBinding(M.Li, this.setTagsMode),
              t.commandBinder.addBinding(M.kT, this.setTagOrderBy),
              t.commandBinder.addBinding(M.QG, this.saveTag),
              t.commandBinder.addBinding(M.q4, async (e) => this.toggleTagDirty(e.dirty)),
              t.commandBinder.addBinding(M.T3, this.onDeleteTag),
              t.commandBinder.addBinding(M.bg, this.saveTagVisibility),
              t.commandBinder.addBinding(M.zt, this.onEditTag),
              t.commandBinder.addBinding(M.fe, this.updateOpenTagView),
              t.commandBinder.addBinding(M.gD, this.setEmbedErrorTagId),
              this.pinsViewData.onSelectedPinChanged(this.handlePinSelectionChange),
              this.pinsViewData.onFocusedPinChanged(this.handlePinFocusChange),
              this.annotationsViewData.onChanged(this.handleAnnotationsChanged),
              this.viewData.onOpenTagViewChanged(this.onOpenTagViewChanged),
              this.orderedListData.onChanged(this.refreshTagViews),
              this.tagsData.onChanged(this.tagsWereChanged),
              this.tagsData.collection.onElementChanged({ onRemoved: this.onTagRemoved }),
              this.appData.onChanged(() => this.displayTags()),
              this.layersData.onCurrentLayersChanged(this.onLayersChanged),
              this.layersData.onPropertyChanged('activeLayerId', () => this.updatePendingTag()),
              t.commandBinder.addBinding(M.Sq, this.filterVisibleTags),
              t.commandBinder.addBinding(M.aI, this.tagVisbilityFilterEnabled),
              t.subscribe(Ae.YB, this.handleModelViewChange),
            ),
            t.market.register(this, ge.n, this.viewData),
            this.updatePerSettings(),
            this.displayTags();
          const k = _(
            t.commandBinder,
            this.tagsData,
            this.viewData,
            this.layersData,
            E,
            this.settingsData,
            this.appData,
            I,
          );
          this.bindings.push(k);
        }
        dispose(e) {
          this.deactivateTool(!0),
            this.bindings.forEach((e) => {
              e.cancel();
            }),
            (this.bindings = []),
            (this.activeBindings = []),
            this.engine.commandBinder.issueCommand(new J.zM(P.Er.MATTERTAG)),
            this.backgroundTexture.dispose(),
            super.dispose(e);
        }
        onUpdate() {}
        activateTool() {
          this.activated ||
            (this.engine.commandBinder.issueCommand(new A.yL(O.J.TAG)),
            this.engine.commandBinder.issueCommand(new J.Ki(!0)),
            this.registered
              ? this.activeBindings.forEach((e) => {
                  e.renew();
                })
              : this.registerHandlers(),
            (this.activated = !0),
            this.updateViewingControls());
        }
        deactivateTool(e) {
          if (!this.activated) return;
          this.activated = !1;
          const { creatingTag: t, openTagView: i, tagsMode: n } = this.viewData;
          n !== R.U.DEFAULT && this.viewData.setTagsMode(R.U.DEFAULT),
            t ? this.cancelTagCreation(!0) : i && this.closeTag(),
            this.engine.commandBinder.issueCommand(new J.iK()),
            this.engine.commandBinder.issueCommand(new J.Ki(!1)),
            this.activeBindings.forEach((e) => {
              e.cancel();
            }),
            this.updateViewingControls(),
            this.engine.commandBinder.issueCommand(new ve.x9());
        }
        registerHandlers() {
          const e = this.engine.commandBinder;
          this.activeBindings.push(
            this.engine.subscribe(Q.b0, this.pinPlaced),
            this.engine.subscribe(Q.bV, this.pinMoved),
            this.engine.subscribe(Q.hu, this.pinAddCancelled),
            e.addBinding(M.$J, this.startTagCreation),
            e.addBinding(M.Rj, this.cancelTagEdits),
            e.addBinding(M.$B, this.onSaveCustomTagOrder),
            this.viewData.onOpenTagViewChanged(this.updateViewingControls),
            this.viewData.onPropertyChanged('creatingTag', this.updateViewingControls),
            this.viewData.onPropertyChanged('tagsMode', () => this.displayTags()),
          ),
            (this.registered = !0);
        }
        closeTagBillboard() {
          const { billboardAnnotation: e } = this.annotationsViewData;
          e &&
            e.annotationType === O.J.TAG &&
            this.engine.commandBinder.issueCommand(new A.Aj(e.id, O.J.TAG));
        }
        in360View() {
          const e = this.sweepData.currentSweep ? this.sweepData.currentSweep : '';
          return this.viewmodeData.isInside() && this.sweepData.isSweepUnaligned(e);
        }
        async closeTag() {
          const { commandBinder: e } = this.engine,
            t = this.viewData,
            { openTagView: i } = t;
          if ((this.toggleTagDirty(!1), i)) {
            const { id: n, layerId: s, enabled: a } = i;
            t.setOpenTagView(null),
              this.cancelAttachmentChanges(),
              e.issueCommand(new j.IL(null)),
              e.issueCommand(new ve.xW(!1));
            const o = this.tagsData.getTag(n);
            o &&
              (e.issueCommand(new J.RH(n, P.Er.MATTERTAG)),
              o.objectAnnotationId
                ? e.issueCommand(new J.OL(n, P.Er.MATTERTAG))
                : (e.issueCommand(new J.ik(n, P.Er.MATTERTAG, this.getTagVisibility(n, s, a))),
                  e.issueCommand(new J.tE(n, P.Er.MATTERTAG, o.getPin())))),
              await e.issueCommand(new A.Aj(n, O.J.TAG));
          }
          this.engine.commandBinder.issueCommand(new ve.x9());
        }
        getTagVisibility(e, t, i) {
          const {
              openTagView: n,
              idVisibilityEnabled: s,
              idVisibility: a,
              tagsMode: o,
            } = this.viewData,
            r = this.appData.application === C.Mx.WORKSHOP || this.layersData.layerToggled(t),
            d = this.layersData.layerVisible(t),
            c = o === R.U.REORDERING,
            l = !s || a.has(e),
            h = (null == n ? void 0 : n.id) === e;
          return r && (h || (i && c) || (i && l && d));
        }
        displayTags() {
          const e = [];
          this.viewData.getOrderedTags(!1).forEach((t) => {
            if (!t.objectAnnotationId) {
              const i = this.getPinUpdate(t);
              e.push(i);
            }
          }),
            this.engine.commandBinder.issueCommand(new J.mE(e));
        }
        updateTagPin(e) {
          if (!e.objectAnnotationId) {
            const t = this.getPinUpdate(e);
            this.engine.commandBinder.issueCommand(new J.mE([t]));
          }
        }
        getPinUpdate(e) {
          const { openTagView: t } = this.viewData,
            i = t && t.id === e.id ? t : e,
            {
              id: n,
              layerId: s,
              enabled: a,
              anchorPosition: o,
              color: r,
              icon: d,
              stemEnabled: c,
              floorId: l,
              roomId: h,
              stemNormal: u,
              stemLength: m,
            } = i;
          return {
            id: n,
            anchorPosition: o,
            color: r,
            floorId: l,
            roomId: h,
            stemEnabled: c,
            stemNormal: u,
            stemLength: m,
            pinType: P.Er.MATTERTAG,
            backgroundTexture: this.backgroundTexture,
            icon: d,
            visible: this.getTagVisibility(n, s, a),
          };
        }
        updatePendingTag() {
          const { creatingTag: e, openTagView: t } = this.viewData;
          e &&
            t &&
            (this.layersData.isInMemoryLayer(t.layerId) ||
              (t.layerId = this.layersData.activeLayerId));
        }
        async cancelAttachmentChanges() {
          return this.engine.commandBinder.issueCommand(new ve.Ze());
        }
        toggleTagDirty(e) {
          (this.viewData.openTagIsDirty = e), this.viewData.commit();
        }
        getCustomTagOrder() {
          const e = this.orderedListData.getOrderedList(le.q);
          return e ? e.entries.map((e) => e.id) : [];
        }
        async saveTags() {
          this.engine.commandBinder.issueCommand(new m.V({ dataTypes: [u.g.MATTERTAGS] }));
        }
        openAnnotation(e, t, i = !1) {
          const n = this.annotationsViewData.getCapabilities(e);
          t
            ? (n.dock || i) && this.engine.commandBinder.issueCommand(new A.bd(e, O.J.TAG, i))
            : (n.preview || i) && this.engine.commandBinder.issueCommand(new A.oM(e, O.J.TAG, i));
        }
        async selectPin(e, t = !1) {
          const i = t && this.activated && this.appData.application === C.Mx.WORKSHOP;
          t
            ? this.engine.broadcast(new Oe.dJ(e, Se.V.DOCKED))
            : this.engine.broadcast(new Oe.dJ(e, Se.V.OPEN)),
            await this.engine.commandBinder.issueCommand(new J.Ar(e, P.Er.MATTERTAG, i));
        }
        dockObjectTag(e) {
          const t = this.viewData.getTagView(e);
          t
            ? (this.engine.commandBinder.issueCommand(new A.bd(e, O.J.OBJECT)),
              this.viewData.setOpenTagView(Object.assign({}, t)),
              this.selectPin(e, !0),
              this.toolsData.toolCollapsed && this.engine.commandBinder.issueCommand(new ne.Fg(!1)))
            : this.log.debug('Cannot dock a non-existent tag');
        }
        async openTag(e, t, i, n = !0) {
          const s = this.viewData,
            a = s.getTagView(e);
          if (a) {
            const { openTagView: o, tagsMode: d } = this.viewData,
              { commandBinder: c } = this.engine,
              { dockedAnnotation: l, selectedAnnotation: h } = this.annotationsViewData;
            i && d === R.U.REORDERING && s.setTagsMode(R.U.DEFAULT),
              i && this.toolsData.toolCollapsed && this.activated && c.issueCommand(new ne.Fg(!1));
            const u = (null == o ? void 0 : o.id) === e;
            if (u && this.activated === i)
              return void this.log.debug('Tag is already open and ' + (i ? 'docked' : 'undocked'));
            if (i !== !!l) {
              const t = this.annotationsViewData.getCapabilities(e);
              i
                ? t.dock &&
                  !this.activated &&
                  (await this.engine.commandBinder.issueCommand(new ne.z2(ie.w1.TAGS, !0)))
                : l &&
                  (await this.engine.commandBinder.issueCommand(new A.Aj(l.id, l.annotationType)));
            }
            if (!u && this.opening !== e) {
              (this.opening = e),
                c.issueCommand(new oe.r()),
                h &&
                  h.id !== e &&
                  (await this.engine.commandBinder.issueCommand(new A.Aj(h.id, h.annotationType))),
                s.setOpenTagView(Object.assign({}, a));
              const i = s.getCapabilities(e);
              null !== t &&
                i.focus &&
                (n || this.viewmodeData.isInside()) &&
                (await this.engine.commandBinder
                  .issueCommand(new g.OR({ pinPosition: a, transition: t }))
                  .then(() => {
                    this.engine.broadcast(new Oe.QY(a.id));
                  })),
                this.engine.commandBinder.issueCommand(new j.IL(a.id, r.SF.MATTERTAG)),
                setTimeout(() => {
                  this.opening = null;
                }, 0);
            }
          } else this.log.debug('Cannot open a non-existent tag');
        }
        isTagDocked() {
          const { dockedAnnotation: e } = this.annotationsViewData;
          return (null == e ? void 0 : e.annotationType) === O.J.TAG;
        }
        getDockedTag() {
          const { dockedAnnotation: e } = this.annotationsViewData;
          return e && e.annotationType === O.J.TAG ? this.viewData.getTagView(e.id) : null;
        }
        getSelectedTag() {
          const { billboardAnnotation: e, billboardSelected: t } = this.annotationsViewData;
          return (e && t && e.annotationType === O.J.TAG) ||
            (null == e ? void 0 : e.annotationType) === O.J.OBJECT
            ? this.viewData.getTagView(e.id)
            : null;
        }
        trackChanges(e, t, i) {
          const s = this.tagsData.getTag(e),
            {
              position: a,
              color: o,
              description: r,
              label: d,
              stemHeight: c,
              stemVisible: l,
              enabled: h,
              keywords: u,
            } = t;
          if (!s && a)
            return void this.engine.broadcast(
              new G(e, a, a.distanceTo(this.cameraData.pose.position)),
            );
          if (
            (void 0 !== h && s.enabled !== h && this.engine.broadcast(new Z(e, H.ENABLED, h)), o)
          ) {
            const t = new n.Color(o.r, o.g, o.b).getHexString();
            s.color.getHexString() !== t && this.engine.broadcast(new Z(e, H.DISC_COLOR, `#${t}`));
          }
          if (
            (void 0 !== c &&
              s.stemHeight !== c &&
              this.engine.broadcast(new Z(e, H.STEM_LENGTH, c)),
            void 0 !== l &&
              s.stemVisible !== l &&
              this.engine.broadcast(new Z(e, H.STEM_VISIBLE, l)),
            void 0 !== d &&
              s.label !== d &&
              (this.engine.broadcast(new Z(e, H.TITLE, d.length)),
              this.engine.broadcast(new W(e, d.length))),
            void 0 !== r && s.description !== r)
          ) {
            this.engine.broadcast(new Z(e, H.DESCRIPTION, r.length));
            const t = this.descriptionParser.parse(r, this.layersData.getNonworkshopViewId());
            this.engine.broadcast(new $(e, r.length, t));
            const i = y.$.getNumLinks(t);
            y.$.getNumLinks(s.parsedDescription) !== i &&
              this.engine.broadcast(new Z(e, H.LINKS, i));
          }
          if (i) {
            const t = i ? i.src : '',
              n = i ? (0, b.F5)(i.mediaType) : T.z.none;
            (s.mediaSrc === t && s.mediaType === n) ||
              (this.engine.broadcast(new Z(e, H.MEDIA, n)), this.engine.broadcast(new K(e, n, t)));
          }
          const m = s.keywords.every((e) => u && u.includes(e));
          if ((null == u ? void 0 : u.length) !== s.keywords.length || !m) {
            const t = (null == u ? void 0 : u.length) || 0;
            this.engine.broadcast(new Z(e, H.KEYWORDS, t));
          }
        }
      }
      const vt = gt;
    },
    39049: (e, t, i) => {
      'use strict';
      i.d(t, { A: () => a });
      var n = i(16996),
        s = i(70593);
      const a = (0, n.M)(s.t, 'previousToolName', null);
    },
    65281: (e, t, i) => {
      'use strict';
      i.d(t, { L: () => n });
      class n {
        constructor(e) {
          (this.comparer = e || this.defaultComparer), (this.poolArray = []);
        }
        add(e) {
          const t = this.createObjectDescriptor(e);
          return (t.object = e), (t.inUse = !0), this.addObjectDescriptorToPool(t), t;
        }
        get(e) {
          for (const t of this.poolArray)
            if (!t.inUse && this.comparer(t, e)) return (t.inUse = !0), t;
          return null;
        }
        free(e) {
          for (const t of this.poolArray) if (t.object === e) return (t.inUse = !1), !0;
          return !1;
        }
        all() {
          return this.poolArray;
        }
        remove(e) {
          const t = this.poolArray.findIndex((t) => t.object === e);
          return -1 !== t && (this.poolArray.splice(t, 1), !0);
        }
        defaultComparer(e, t) {
          return !0;
        }
        createObjectDescriptor(e) {
          return { object: e, inUse: !1 };
        }
        addObjectDescriptorToPool(e) {
          this.poolArray.push(e);
        }
      }
    },
    97957: (e, t, i) => {
      'use strict';
      i.d(t, { E: () => s });
      var n = i(81396);
      class s extends n.Mesh {
        constructor(e, t) {
          super(e, t);
        }
      }
    },
    5429: (e, t, i) => {
      'use strict';
      i.d(t, { D5: () => c, Ex: () => l, G1: () => r, rn: () => d });
      var n = i(81396),
        s = i(28721);
      const a = () => Math.random(),
        o = {},
        r = (e, t = a()) => (o[t] || (o[t] = new n.Vector4(a(), a(), a(), e)), o[t]),
        d = () => new n.Color(a(), a(), a()),
        c = (e) => e instanceof Object && 'r' in e && 'g' in e && 'b' in e;
      function l(e) {
        return `#${(0, s.Q_)(255 * e.r, 2, '0', 16)}${(0, s.Q_)(255 * e.g, 2, '0', 16)}${(0, s.Q_)(255 * e.b, 2, '0', 16)}`;
      }
    },
    62118: (e) => {
      e.exports =
        'precision highp float;precision highp int;varying vec2 vUv;uniform sampler2D tMask;uniform sampler2D tPinHole;uniform vec3 pinColor;uniform float opacity;void main(){vec4 maskColor=texture2D(tMask,vUv);vec4 pinHoleColor=vec4(texture2D(tPinHole,vec2(vUv.x,vUv.y-0.11)).xyz,1.);float redness=maskColor.r-maskColor.b;vec4 mixedPinColor=mix(vec4(pinColor,1.),pinHoleColor,redness);mixedPinColor.a=min(mixedPinColor.a,maskColor.a)*opacity;if(mixedPinColor.a==0.)discard;gl_FragColor=mixedPinColor;}';
    },
    77256: (e) => {
      e.exports =
        'precision highp float;precision highp int;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;attribute vec3 position;attribute vec2 uv;varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}';
    },
    45405: (e) => {
      e.exports =
        'precision highp float;precision highp int;uniform samplerCube tMap;varying vec3 vUvw;void main(){vec4 color=textureCube(tMap,vec3(-vUvw.x,vUvw.yz));gl_FragColor=vec4(color.rgb,1.);}';
    },
    29837: (e) => {
      e.exports =
        'precision highp float;precision highp int;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;attribute vec3 position;varying vec3 vUvw;void main(){vUvw=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}';
    },
    8346: (e) => {
      e.exports =
        'precision highp float;precision highp int;varying vec2 vUv;uniform float progress;uniform float opacity;uniform sampler2D tNoHover;uniform sampler2D tHover;uniform sampler2D tPortal;void main(){vec4 noHoverColor=texture2D(tNoHover,vUv);vec4 hoverColor=texture2D(tHover,vUv);vec4 portalColor=texture2D(tPortal,vUv);float xToCtr=2.*vUv.x-1.;float yToCtr=2.*vUv.y-1.;float withinRadius=step(xToCtr*xToCtr+yToCtr*yToCtr,0.9);vec4 mixedPortalColor=mix(hoverColor,portalColor,withinRadius);mixedPortalColor=mix(mixedPortalColor,hoverColor,hoverColor.a);mixedPortalColor=mix(noHoverColor,mixedPortalColor,progress);mixedPortalColor.a=min(mixedPortalColor.a,opacity);gl_FragColor=mixedPortalColor;}';
    },
    35490: (e) => {
      e.exports =
        'precision highp float;precision highp int;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;attribute vec3 position;attribute vec2 uv;varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}';
    },
    44602: (e) => {
      var t = {
        kind: 'Document',
        definitions: [
          {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'FileAttachments' },
            variableDefinitions: [
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'modelId' } },
                type: {
                  kind: 'NonNullType',
                  type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
                },
                directives: [],
              },
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'pageSize' } },
                type: {
                  kind: 'NonNullType',
                  type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
                },
                directives: [],
              },
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fileAttachmentsByModelId' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'modelId' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'modelId' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'pageSize' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'pageSize' } },
                    },
                  ],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'results' },
                        arguments: [],
                        directives: [],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'FileAttachmentDetails' },
                              directives: [],
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'DeleteFileAttachment' },
            variableDefinitions: [
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                type: {
                  kind: 'NonNullType',
                  type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
                },
                directives: [],
              },
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'deleteFileAttachment' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'id' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                  directives: [],
                },
              ],
            },
          },
          {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'FileAttachmentDetails' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'FileAttachment' } },
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'id' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'created' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'filename' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'url' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'validUntil' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'bytes' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'mimeType' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ImageFileAttachment' },
                  },
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'imageWidth' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'imageHeight' },
                        arguments: [],
                        directives: [],
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UploadFileAttachmentToModel' },
            variableDefinitions: [
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'organizationId' } },
                type: {
                  kind: 'NonNullType',
                  type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
                },
                directives: [],
              },
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'modelId' } },
                type: {
                  kind: 'NonNullType',
                  type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
                },
                directives: [],
              },
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'contents' } },
                type: {
                  kind: 'NonNullType',
                  type: { kind: 'NamedType', name: { kind: 'Name', value: 'FileUpload' } },
                },
                directives: [],
              },
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'filename' } },
                type: {
                  kind: 'NonNullType',
                  type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
                directives: [],
              },
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'uploadFileAttachmentToModel' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'organizationId' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'organizationId' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'modelId' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'modelId' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'contents' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'contents' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'filename' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'filename' } },
                    },
                  ],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'FileAttachmentDetails' },
                        directives: [],
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
        loc: { start: 0, end: 795 },
      };
      t.loc.source = {
        body: '# read all attachments for the specified model\nquery FileAttachments($modelId: ID!, $pageSize: Int!) {\n  fileAttachmentsByModelId(modelId: $modelId, pageSize: $pageSize) {\n    results { ...FileAttachmentDetails }\n  }\n}\n\nmutation DeleteFileAttachment($id: ID!) {\n  deleteFileAttachment(id: $id)\n}\n\nfragment FileAttachmentDetails on FileAttachment {\n  id\n  created\n  filename\n  url\n  validUntil\n  bytes\n  mimeType\n  ...on ImageFileAttachment {\n      imageWidth\n      imageHeight\n  }\n}\n\nmutation UploadFileAttachmentToModel($organizationId: ID!, $modelId: ID!, $contents: FileUpload!, $filename: String!) {\n  uploadFileAttachmentToModel(organizationId: $organizationId, modelId: $modelId,\n                              contents: $contents, filename: $filename) {\n    ...FileAttachmentDetails\n  }\n}\n',
        name: 'GraphQL request',
        locationOffset: { line: 1, column: 1 },
      };
      function i(e, t) {
        if ('FragmentSpread' === e.kind) t.add(e.name.value);
        else if ('VariableDefinition' === e.kind) {
          var n = e.type;
          'NamedType' === n.kind && t.add(n.name.value);
        }
        e.selectionSet &&
          e.selectionSet.selections.forEach(function (e) {
            i(e, t);
          }),
          e.variableDefinitions &&
            e.variableDefinitions.forEach(function (e) {
              i(e, t);
            }),
          e.definitions &&
            e.definitions.forEach(function (e) {
              i(e, t);
            });
      }
      var n = {};
      function s(e, t) {
        for (var i = 0; i < e.definitions.length; i++) {
          var n = e.definitions[i];
          if (n.name && n.name.value == t) return n;
        }
      }
      function a(e, t) {
        var i = { kind: e.kind, definitions: [s(e, t)] };
        e.hasOwnProperty('loc') && (i.loc = e.loc);
        var a = n[t] || new Set(),
          o = new Set(),
          r = new Set();
        for (
          a.forEach(function (e) {
            r.add(e);
          });
          r.size > 0;

        ) {
          var d = r;
          (r = new Set()),
            d.forEach(function (e) {
              o.has(e) ||
                (o.add(e),
                (n[e] || new Set()).forEach(function (e) {
                  r.add(e);
                }));
            });
        }
        return (
          o.forEach(function (t) {
            var n = s(e, t);
            n && i.definitions.push(n);
          }),
          i
        );
      }
      t.definitions.forEach(function (e) {
        if (e.name) {
          var t = new Set();
          i(e, t), (n[e.name.value] = t);
        }
      }),
        (e.exports = t),
        (e.exports.FileAttachments = a(t, 'FileAttachments')),
        (e.exports.DeleteFileAttachment = a(t, 'DeleteFileAttachment')),
        (e.exports.FileAttachmentDetails = a(t, 'FileAttachmentDetails')),
        (e.exports.UploadFileAttachmentToModel = a(t, 'UploadFileAttachmentToModel'));
    },
    69665: (e) => {
      var t = {
        kind: 'Document',
        definitions: [
          {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetObjectAnnotations' },
            variableDefinitions: [
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'modelId' } },
                type: {
                  kind: 'NonNullType',
                  type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
                },
                directives: [],
              },
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'inferenceEvents' } },
                type: {
                  kind: 'ListType',
                  type: {
                    kind: 'NonNullType',
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
                  },
                },
                directives: [],
              },
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'minConfidence' } },
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
                directives: [],
              },
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'ids' } },
                type: {
                  kind: 'ListType',
                  type: {
                    kind: 'NonNullType',
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
                  },
                },
                directives: [],
              },
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'includeDisabled' } },
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
                directives: [],
              },
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'includeLayers' } },
                type: {
                  kind: 'NonNullType',
                  type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
                },
                directives: [],
              },
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'model' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'id' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'modelId' } },
                    },
                  ],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'objectAnnotations' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'inferenceEvents' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'inferenceEvents' },
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'minimumConfidenceOverride' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'minConfidence' },
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'ids' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'ids' } },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'includeDisabled' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'includeDisabled' },
                            },
                          },
                        ],
                        directives: [],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'ObjectAnnotationInfo' },
                              directives: [],
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'AddObjectAnnotation' },
            variableDefinitions: [
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'modelId' } },
                type: {
                  kind: 'NonNullType',
                  type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
                },
                directives: [],
              },
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'objectAnnotation' } },
                type: {
                  kind: 'NonNullType',
                  type: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ObjectAnnotationDetails' },
                  },
                },
                directives: [],
              },
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'includeLayers' } },
                type: {
                  kind: 'NonNullType',
                  type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
                },
                directives: [],
              },
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addObjectAnnotation' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'modelId' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'modelId' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'objectAnnotation' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'objectAnnotation' },
                      },
                    },
                  ],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'ObjectAnnotationInfo' },
                        directives: [],
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'PatchObjectAnnotation' },
            variableDefinitions: [
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'modelId' } },
                type: {
                  kind: 'NonNullType',
                  type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
                },
                directives: [],
              },
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'objectAnnotationId' } },
                type: {
                  kind: 'NonNullType',
                  type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
                },
                directives: [],
              },
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
                type: {
                  kind: 'NonNullType',
                  type: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ObjectAnnotationPatch' },
                  },
                },
                directives: [],
              },
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'includeLayers' } },
                type: {
                  kind: 'NonNullType',
                  type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
                },
                directives: [],
              },
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'patchObjectAnnotation' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'modelId' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'modelId' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'objectAnnotationId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'objectAnnotationId' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'patch' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
                    },
                  ],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'ObjectAnnotationInfo' },
                        directives: [],
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'SetBulkObjectAnnotationsEnabled' },
            variableDefinitions: [
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'modelId' } },
                type: {
                  kind: 'NonNullType',
                  type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
                },
                directives: [],
              },
              {
                kind: 'VariableDefinition',
                variable: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'objectAnnotationIds' },
                },
                type: {
                  kind: 'NonNullType',
                  type: {
                    kind: 'ListType',
                    type: {
                      kind: 'NonNullType',
                      type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
                    },
                  },
                },
                directives: [],
              },
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'setEnabled' } },
                type: {
                  kind: 'NonNullType',
                  type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
                },
                directives: [],
              },
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'includeLayers' } },
                type: {
                  kind: 'NonNullType',
                  type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
                },
                directives: [],
              },
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'setBulkObjectAnnotationsEnabled' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'modelId' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'modelId' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'objectAnnotationIds' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'objectAnnotationIds' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'setEnabled' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'setEnabled' } },
                    },
                  ],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'ObjectAnnotationInfo' },
                        directives: [],
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'DeleteObjectAnnotation' },
            variableDefinitions: [
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'modelId' } },
                type: {
                  kind: 'NonNullType',
                  type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
                },
                directives: [],
              },
              {
                kind: 'VariableDefinition',
                variable: { kind: 'Variable', name: { kind: 'Name', value: 'objectAnnotationId' } },
                type: {
                  kind: 'NonNullType',
                  type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
                },
                directives: [],
              },
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'deleteObjectAnnotation' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'modelId' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'modelId' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'objectAnnotationId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'objectAnnotationId' },
                      },
                    },
                  ],
                  directives: [],
                },
              ],
            },
          },
          {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'ObjectAnnotationInfo' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ObjectAnnotation' } },
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'id' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'created' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'modified' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'model' },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'id' },
                        arguments: [],
                        directives: [],
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'floor' },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'id' },
                        arguments: [],
                        directives: [],
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'room' },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'id' },
                        arguments: [],
                        directives: [],
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'layer' },
                  arguments: [],
                  directives: [
                    {
                      kind: 'Directive',
                      name: { kind: 'Name', value: 'include' },
                      arguments: [
                        {
                          kind: 'Argument',
                          name: { kind: 'Name', value: 'if' },
                          value: {
                            kind: 'Variable',
                            name: { kind: 'Name', value: 'includeLayers' },
                          },
                        },
                      ],
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'id' },
                        arguments: [],
                        directives: [],
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'enabled' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'label' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'confidence' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'region' },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'VectorRegion' },
                        },
                        directives: [],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'anchorPosition' },
                              arguments: [],
                              directives: [],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'x' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'y' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'z' },
                                    arguments: [],
                                    directives: [],
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stemNormal' },
                              arguments: [],
                              directives: [],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'x' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'y' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'z' },
                                    arguments: [],
                                    directives: [],
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stemLength' },
                              arguments: [],
                              directives: [],
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tag' },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'id' },
                        arguments: [],
                        directives: [],
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'keywords' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'classification' },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'id' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'label' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'defaultKeywords' },
                        arguments: [],
                        directives: [],
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
        loc: { start: 0, end: 1990 },
      };
      t.loc.source = {
        body: '# Object Tag Suggestions\n# Reference: https://matterport-confluence.atlassian.net/wiki/spaces/PP/pages/2678521926/Datafication+Object+Detection+Schema+Proposal\n\nquery GetObjectAnnotations($modelId: ID!, $inferenceEvents: [ID!], $minConfidence: Float, $ids: [ID!], $includeDisabled: Boolean, $includeLayers: Boolean!) {\n  model(id: $modelId) {\n    objectAnnotations(inferenceEvents: $inferenceEvents, minimumConfidenceOverride: $minConfidence, ids: $ids, includeDisabled: $includeDisabled) {\n      ...ObjectAnnotationInfo\n    }\n  }\n}\n\nmutation AddObjectAnnotation($modelId: ID!, $objectAnnotation: ObjectAnnotationDetails!, $includeLayers: Boolean!) {\n  addObjectAnnotation(modelId: $modelId, objectAnnotation: $objectAnnotation) {\n    ...ObjectAnnotationInfo\n  }\n}\n\n# Update a single object annotation\nmutation PatchObjectAnnotation($modelId: ID!, $objectAnnotationId: ID!, $data: ObjectAnnotationPatch!, $includeLayers: Boolean!) {\n  patchObjectAnnotation(modelId: $modelId, , objectAnnotationId: $objectAnnotationId, patch: $data) {\n    ...ObjectAnnotationInfo\n  }\n}\n\nmutation SetBulkObjectAnnotationsEnabled($modelId: ID! $objectAnnotationIds:[ID!]!, $setEnabled: Boolean!, $includeLayers: Boolean!) {\n  setBulkObjectAnnotationsEnabled(modelId: $modelId, objectAnnotationIds: $objectAnnotationIds, setEnabled: $setEnabled) {\n    ...ObjectAnnotationInfo\n  }\n}\n\nmutation DeleteObjectAnnotation($modelId: ID!, $objectAnnotationId: ID!) {\n  deleteObjectAnnotation(modelId: $modelId, objectAnnotationId: $objectAnnotationId)\n}\n\nfragment ObjectAnnotationInfo on ObjectAnnotation {\n  id\n  created\n  modified\n  model {\n    id\n  }\n  floor {\n    id\n  }\n  room {\n    id\n  }\n  layer @include(if: $includeLayers) { id } \n  enabled\n  label\n  confidence\n  region {\n    ... on VectorRegion {\n      anchorPosition {\n        x, y, z\n      }\n      stemNormal {\n        x, y, z\n      }\n      stemLength\n    }\n  }\n  tag {\n    id\n  }\n  keywords\n  classification {\n    id,\n    label,\n    defaultKeywords\n  }\n}\n',
        name: 'GraphQL request',
        locationOffset: { line: 1, column: 1 },
      };
      function i(e, t) {
        if ('FragmentSpread' === e.kind) t.add(e.name.value);
        else if ('VariableDefinition' === e.kind) {
          var n = e.type;
          'NamedType' === n.kind && t.add(n.name.value);
        }
        e.selectionSet &&
          e.selectionSet.selections.forEach(function (e) {
            i(e, t);
          }),
          e.variableDefinitions &&
            e.variableDefinitions.forEach(function (e) {
              i(e, t);
            }),
          e.definitions &&
            e.definitions.forEach(function (e) {
              i(e, t);
            });
      }
      var n = {};
      function s(e, t) {
        for (var i = 0; i < e.definitions.length; i++) {
          var n = e.definitions[i];
          if (n.name && n.name.value == t) return n;
        }
      }
      function a(e, t) {
        var i = { kind: e.kind, definitions: [s(e, t)] };
        e.hasOwnProperty('loc') && (i.loc = e.loc);
        var a = n[t] || new Set(),
          o = new Set(),
          r = new Set();
        for (
          a.forEach(function (e) {
            r.add(e);
          });
          r.size > 0;

        ) {
          var d = r;
          (r = new Set()),
            d.forEach(function (e) {
              o.has(e) ||
                (o.add(e),
                (n[e] || new Set()).forEach(function (e) {
                  r.add(e);
                }));
            });
        }
        return (
          o.forEach(function (t) {
            var n = s(e, t);
            n && i.definitions.push(n);
          }),
          i
        );
      }
      t.definitions.forEach(function (e) {
        if (e.name) {
          var t = new Set();
          i(e, t), (n[e.name.value] = t);
        }
      }),
        (e.exports = t),
        (e.exports.GetObjectAnnotations = a(t, 'GetObjectAnnotations')),
        (e.exports.AddObjectAnnotation = a(t, 'AddObjectAnnotation')),
        (e.exports.PatchObjectAnnotation = a(t, 'PatchObjectAnnotation')),
        (e.exports.SetBulkObjectAnnotationsEnabled = a(t, 'SetBulkObjectAnnotationsEnabled')),
        (e.exports.DeleteObjectAnnotation = a(t, 'DeleteObjectAnnotation')),
        (e.exports.ObjectAnnotationInfo = a(t, 'ObjectAnnotationInfo'));
    },
  },
]);
