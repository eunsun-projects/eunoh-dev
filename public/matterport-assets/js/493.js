/*! For license information please see 493.js.LICENSE.txt */
'use strict';
(self.webpackChunkmp_webgl = self.webpackChunkmp_webgl || []).push([
  [493],
  {
    92327: (e, t, n) => {
      n.r(t),
        n.d(t, {
          TransformControls: () => p,
          TransformControlsGizmo: () => _,
          TransformControlsPlane: () => F,
        });
      var r = n(81396);
      const o = new r.Raycaster(),
        s = new r.Vector3(),
        i = new r.Vector3(),
        a = new r.Quaternion(),
        c = { X: new r.Vector3(1, 0, 0), Y: new r.Vector3(0, 1, 0), Z: new r.Vector3(0, 0, 1) },
        l = { type: 'change' },
        h = { type: 'mouseDown' },
        u = { type: 'mouseUp', mode: null },
        d = { type: 'objectChange' };
      class p extends r.Object3D {
        constructor(e, t) {
          super(),
            void 0 === t &&
              (console.warn(
                'THREE.TransformControls: The second parameter "domElement" is now mandatory.',
              ),
              (t = document)),
            (this.isTransformControls = !0),
            (this.visible = !1),
            (this.domElement = t),
            (this.domElement.style.touchAction = 'none');
          const n = new _();
          (this._gizmo = n), this.add(n);
          const o = new F();
          (this._plane = o), this.add(o);
          const s = this;
          function i(e, t) {
            let r = t;
            Object.defineProperty(s, e, {
              get: function () {
                return void 0 !== r ? r : t;
              },
              set: function (t) {
                r !== t &&
                  ((r = t),
                  (o[e] = t),
                  (n[e] = t),
                  s.dispatchEvent({ type: e + '-changed', value: t }),
                  s.dispatchEvent(l));
              },
            }),
              (s[e] = t),
              (o[e] = t),
              (n[e] = t);
          }
          i('camera', e),
            i('object', void 0),
            i('enabled', !0),
            i('axis', null),
            i('mode', 'translate'),
            i('translationSnap', null),
            i('rotationSnap', null),
            i('scaleSnap', null),
            i('space', 'world'),
            i('size', 1),
            i('dragging', !1),
            i('showX', !0),
            i('showY', !0),
            i('showZ', !0);
          const a = new r.Vector3(),
            c = new r.Vector3(),
            h = new r.Quaternion(),
            u = new r.Quaternion(),
            d = new r.Vector3(),
            p = new r.Quaternion(),
            w = new r.Vector3(),
            b = new r.Vector3(),
            x = new r.Vector3(),
            M = new r.Vector3();
          i('worldPosition', a),
            i('worldPositionStart', c),
            i('worldQuaternion', h),
            i('worldQuaternionStart', u),
            i('cameraPosition', d),
            i('cameraQuaternion', p),
            i('pointStart', w),
            i('pointEnd', b),
            i('rotationAxis', x),
            i('rotationAngle', 0),
            i('eye', M),
            (this._offset = new r.Vector3()),
            (this._startNorm = new r.Vector3()),
            (this._endNorm = new r.Vector3()),
            (this._cameraScale = new r.Vector3()),
            (this._parentPosition = new r.Vector3()),
            (this._parentQuaternion = new r.Quaternion()),
            (this._parentQuaternionInv = new r.Quaternion()),
            (this._parentScale = new r.Vector3()),
            (this._worldScaleStart = new r.Vector3()),
            (this._worldQuaternionInv = new r.Quaternion()),
            (this._worldScale = new r.Vector3()),
            (this._positionStart = new r.Vector3()),
            (this._quaternionStart = new r.Quaternion()),
            (this._scaleStart = new r.Vector3()),
            (this._getPointer = f.bind(this)),
            (this._onPointerDown = g.bind(this)),
            (this._onPointerHover = m.bind(this)),
            (this._onPointerMove = y.bind(this)),
            (this._onPointerUp = v.bind(this)),
            this.domElement.addEventListener('pointerdown', this._onPointerDown),
            this.domElement.addEventListener('pointermove', this._onPointerHover),
            this.domElement.addEventListener('pointerup', this._onPointerUp);
        }
        updateMatrixWorld() {
          void 0 !== this.object &&
            (this.object.updateMatrixWorld(),
            null === this.object.parent
              ? console.error(
                  'TransformControls: The attached 3D object must be a part of the scene graph.',
                )
              : this.object.parent.matrixWorld.decompose(
                  this._parentPosition,
                  this._parentQuaternion,
                  this._parentScale,
                ),
            this.object.matrixWorld.decompose(
              this.worldPosition,
              this.worldQuaternion,
              this._worldScale,
            ),
            this._parentQuaternionInv.copy(this._parentQuaternion).invert(),
            this._worldQuaternionInv.copy(this.worldQuaternion).invert()),
            this.camera.updateMatrixWorld(),
            this.camera.matrixWorld.decompose(
              this.cameraPosition,
              this.cameraQuaternion,
              this._cameraScale,
            ),
            this.camera.isOrthographicCamera
              ? this.camera.getWorldDirection(this.eye).negate()
              : this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize(),
            super.updateMatrixWorld(this);
        }
        pointerHover(e) {
          if (void 0 === this.object || !0 === this.dragging) return;
          o.setFromCamera(e, this.camera);
          const t = w(this._gizmo.picker[this.mode], o);
          this.axis = t ? t.object.name : null;
        }
        pointerDown(e) {
          if (
            void 0 !== this.object &&
            !0 !== this.dragging &&
            0 === e.button &&
            null !== this.axis
          ) {
            o.setFromCamera(e, this.camera);
            const t = w(this._plane, o, !0);
            t &&
              (this.object.updateMatrixWorld(),
              this.object.parent.updateMatrixWorld(),
              this._positionStart.copy(this.object.position),
              this._quaternionStart.copy(this.object.quaternion),
              this._scaleStart.copy(this.object.scale),
              this.object.matrixWorld.decompose(
                this.worldPositionStart,
                this.worldQuaternionStart,
                this._worldScaleStart,
              ),
              this.pointStart.copy(t.point).sub(this.worldPositionStart)),
              (this.dragging = !0),
              (h.mode = this.mode),
              this.dispatchEvent(h);
          }
        }
        pointerMove(e) {
          const t = this.axis,
            n = this.mode,
            r = this.object;
          let h = this.space;
          if (
            ('scale' === n
              ? (h = 'local')
              : ('E' !== t && 'XYZE' !== t && 'XYZ' !== t) || (h = 'world'),
            void 0 === r || null === t || !1 === this.dragging || -1 !== e.button)
          )
            return;
          o.setFromCamera(e, this.camera);
          const u = w(this._plane, o, !0);
          if (u) {
            if ((this.pointEnd.copy(u.point).sub(this.worldPositionStart), 'translate' === n))
              this._offset.copy(this.pointEnd).sub(this.pointStart),
                'local' === h &&
                  'XYZ' !== t &&
                  this._offset.applyQuaternion(this._worldQuaternionInv),
                -1 === t.indexOf('X') && (this._offset.x = 0),
                -1 === t.indexOf('Y') && (this._offset.y = 0),
                -1 === t.indexOf('Z') && (this._offset.z = 0),
                'local' === h && 'XYZ' !== t
                  ? this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale)
                  : this._offset
                      .applyQuaternion(this._parentQuaternionInv)
                      .divide(this._parentScale),
                r.position.copy(this._offset).add(this._positionStart),
                this.translationSnap &&
                  ('local' === h &&
                    (r.position.applyQuaternion(a.copy(this._quaternionStart).invert()),
                    -1 !== t.search('X') &&
                      (r.position.x =
                        Math.round(r.position.x / this.translationSnap) * this.translationSnap),
                    -1 !== t.search('Y') &&
                      (r.position.y =
                        Math.round(r.position.y / this.translationSnap) * this.translationSnap),
                    -1 !== t.search('Z') &&
                      (r.position.z =
                        Math.round(r.position.z / this.translationSnap) * this.translationSnap),
                    r.position.applyQuaternion(this._quaternionStart)),
                  'world' === h &&
                    (r.parent && r.position.add(s.setFromMatrixPosition(r.parent.matrixWorld)),
                    -1 !== t.search('X') &&
                      (r.position.x =
                        Math.round(r.position.x / this.translationSnap) * this.translationSnap),
                    -1 !== t.search('Y') &&
                      (r.position.y =
                        Math.round(r.position.y / this.translationSnap) * this.translationSnap),
                    -1 !== t.search('Z') &&
                      (r.position.z =
                        Math.round(r.position.z / this.translationSnap) * this.translationSnap),
                    r.parent && r.position.sub(s.setFromMatrixPosition(r.parent.matrixWorld))));
            else if ('scale' === n) {
              if (-1 !== t.search('XYZ')) {
                let e = this.pointEnd.length() / this.pointStart.length();
                this.pointEnd.dot(this.pointStart) < 0 && (e *= -1), i.set(e, e, e);
              } else
                s.copy(this.pointStart),
                  i.copy(this.pointEnd),
                  s.applyQuaternion(this._worldQuaternionInv),
                  i.applyQuaternion(this._worldQuaternionInv),
                  i.divide(s),
                  -1 === t.search('X') && (i.x = 1),
                  -1 === t.search('Y') && (i.y = 1),
                  -1 === t.search('Z') && (i.z = 1);
              r.scale.copy(this._scaleStart).multiply(i),
                this.scaleSnap &&
                  (-1 !== t.search('X') &&
                    (r.scale.x =
                      Math.round(r.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap),
                  -1 !== t.search('Y') &&
                    (r.scale.y =
                      Math.round(r.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap),
                  -1 !== t.search('Z') &&
                    (r.scale.z =
                      Math.round(r.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap));
            } else if ('rotate' === n) {
              this._offset.copy(this.pointEnd).sub(this.pointStart);
              const e =
                20 /
                this.worldPosition.distanceTo(s.setFromMatrixPosition(this.camera.matrixWorld));
              'E' === t
                ? (this.rotationAxis.copy(this.eye),
                  (this.rotationAngle = this.pointEnd.angleTo(this.pointStart)),
                  this._startNorm.copy(this.pointStart).normalize(),
                  this._endNorm.copy(this.pointEnd).normalize(),
                  (this.rotationAngle *=
                    this._endNorm.cross(this._startNorm).dot(this.eye) < 0 ? 1 : -1))
                : 'XYZE' === t
                  ? (this.rotationAxis.copy(this._offset).cross(this.eye).normalize(),
                    (this.rotationAngle =
                      this._offset.dot(s.copy(this.rotationAxis).cross(this.eye)) * e))
                  : ('X' !== t && 'Y' !== t && 'Z' !== t) ||
                    (this.rotationAxis.copy(c[t]),
                    s.copy(c[t]),
                    'local' === h && s.applyQuaternion(this.worldQuaternion),
                    (this.rotationAngle = this._offset.dot(s.cross(this.eye).normalize()) * e)),
                this.rotationSnap &&
                  (this.rotationAngle =
                    Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap),
                'local' === h && 'E' !== t && 'XYZE' !== t
                  ? (r.quaternion.copy(this._quaternionStart),
                    r.quaternion
                      .multiply(a.setFromAxisAngle(this.rotationAxis, this.rotationAngle))
                      .normalize())
                  : (this.rotationAxis.applyQuaternion(this._parentQuaternionInv),
                    r.quaternion.copy(a.setFromAxisAngle(this.rotationAxis, this.rotationAngle)),
                    r.quaternion.multiply(this._quaternionStart).normalize());
            }
            this.dispatchEvent(l), this.dispatchEvent(d);
          }
        }
        pointerUp(e) {
          0 === e.button &&
            (this.dragging && null !== this.axis && ((u.mode = this.mode), this.dispatchEvent(u)),
            (this.dragging = !1),
            (this.axis = null));
        }
        dispose() {
          this.domElement.removeEventListener('pointerdown', this._onPointerDown),
            this.domElement.removeEventListener('pointermove', this._onPointerHover),
            this.domElement.removeEventListener('pointermove', this._onPointerMove),
            this.domElement.removeEventListener('pointerup', this._onPointerUp),
            this.traverse(function (e) {
              e.geometry && e.geometry.dispose(), e.material && e.material.dispose();
            });
        }
        attach(e) {
          return (this.object = e), (this.visible = !0), this;
        }
        detach() {
          return (this.object = void 0), (this.visible = !1), (this.axis = null), this;
        }
        reset() {
          this.enabled &&
            this.dragging &&
            (this.object.position.copy(this._positionStart),
            this.object.quaternion.copy(this._quaternionStart),
            this.object.scale.copy(this._scaleStart),
            this.dispatchEvent(l),
            this.dispatchEvent(d),
            this.pointStart.copy(this.pointEnd));
        }
        getRaycaster() {
          return o;
        }
        getMode() {
          return this.mode;
        }
        setMode(e) {
          this.mode = e;
        }
        setTranslationSnap(e) {
          this.translationSnap = e;
        }
        setRotationSnap(e) {
          this.rotationSnap = e;
        }
        setScaleSnap(e) {
          this.scaleSnap = e;
        }
        setSize(e) {
          this.size = e;
        }
        setSpace(e) {
          this.space = e;
        }
      }
      function f(e) {
        if (this.domElement.ownerDocument.pointerLockElement)
          return { x: 0, y: 0, button: e.button };
        {
          const t = this.domElement.getBoundingClientRect();
          return {
            x: ((e.clientX - t.left) / t.width) * 2 - 1,
            y: (-(e.clientY - t.top) / t.height) * 2 + 1,
            button: e.button,
          };
        }
      }
      function m(e) {
        if (this.enabled)
          switch (e.pointerType) {
            case 'mouse':
            case 'pen':
              this.pointerHover(this._getPointer(e));
          }
      }
      function g(e) {
        this.enabled &&
          (document.pointerLockElement || this.domElement.setPointerCapture(e.pointerId),
          this.domElement.addEventListener('pointermove', this._onPointerMove),
          this.pointerHover(this._getPointer(e)),
          this.pointerDown(this._getPointer(e)));
      }
      function y(e) {
        this.enabled && this.pointerMove(this._getPointer(e));
      }
      function v(e) {
        this.enabled &&
          (this.domElement.releasePointerCapture(e.pointerId),
          this.domElement.removeEventListener('pointermove', this._onPointerMove),
          this.pointerUp(this._getPointer(e)));
      }
      function w(e, t, n) {
        const r = t.intersectObject(e, !0);
        for (let e = 0; e < r.length; e++) if (r[e].object.visible || n) return r[e];
        return !1;
      }
      const b = new r.Euler(),
        x = new r.Vector3(0, 1, 0),
        M = new r.Vector3(0, 0, 0),
        A = new r.Matrix4(),
        T = new r.Quaternion(),
        k = new r.Quaternion(),
        N = new r.Vector3(),
        I = new r.Matrix4(),
        E = new r.Vector3(1, 0, 0),
        C = new r.Vector3(0, 1, 0),
        P = new r.Vector3(0, 0, 1),
        S = new r.Vector3(),
        L = new r.Vector3(),
        R = new r.Vector3();
      class _ extends r.Object3D {
        constructor() {
          super(), (this.isTransformControlsGizmo = !0), (this.type = 'TransformControlsGizmo');
          const e = new r.MeshBasicMaterial({
              depthTest: !1,
              depthWrite: !1,
              fog: !1,
              toneMapped: !1,
              transparent: !0,
            }),
            t = new r.LineBasicMaterial({
              depthTest: !1,
              depthWrite: !1,
              fog: !1,
              toneMapped: !1,
              transparent: !0,
            }),
            n = e.clone();
          n.opacity = 0.15;
          const o = t.clone();
          o.opacity = 0.5;
          const s = e.clone();
          s.color.setHex(16711680);
          const i = e.clone();
          i.color.setHex(65280);
          const a = e.clone();
          a.color.setHex(255);
          const c = e.clone();
          c.color.setHex(16711680), (c.opacity = 0.5);
          const l = e.clone();
          l.color.setHex(65280), (l.opacity = 0.5);
          const h = e.clone();
          h.color.setHex(255), (h.opacity = 0.5);
          const u = e.clone();
          u.opacity = 0.25;
          const d = e.clone();
          d.color.setHex(16776960), (d.opacity = 0.25);
          e.clone().color.setHex(16776960);
          const p = e.clone();
          p.color.setHex(7895160);
          const f = new r.CylinderGeometry(0, 0.04, 0.1, 12);
          f.translate(0, 0.05, 0);
          const m = new r.BoxGeometry(0.08, 0.08, 0.08);
          m.translate(0, 0.04, 0);
          const g = new r.BufferGeometry();
          g.setAttribute('position', new r.Float32BufferAttribute([0, 0, 0, 1, 0, 0], 3));
          const y = new r.CylinderGeometry(0.0075, 0.0075, 0.5, 3);
          function v(e, t) {
            const n = new r.TorusGeometry(e, 0.0075, 3, 64, t * Math.PI * 2);
            return n.rotateY(Math.PI / 2), n.rotateX(Math.PI / 2), n;
          }
          y.translate(0, 0.25, 0);
          const w = {
              X: [
                [new r.Mesh(f, s), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
                [new r.Mesh(f, s), [-0.5, 0, 0], [0, 0, Math.PI / 2]],
                [new r.Mesh(y, s), [0, 0, 0], [0, 0, -Math.PI / 2]],
              ],
              Y: [
                [new r.Mesh(f, i), [0, 0.5, 0]],
                [new r.Mesh(f, i), [0, -0.5, 0], [Math.PI, 0, 0]],
                [new r.Mesh(y, i)],
              ],
              Z: [
                [new r.Mesh(f, a), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
                [new r.Mesh(f, a), [0, 0, -0.5], [-Math.PI / 2, 0, 0]],
                [new r.Mesh(y, a), null, [Math.PI / 2, 0, 0]],
              ],
              XYZ: [[new r.Mesh(new r.OctahedronGeometry(0.1, 0), u.clone()), [0, 0, 0]]],
              XY: [[new r.Mesh(new r.BoxGeometry(0.15, 0.15, 0.01), h.clone()), [0.15, 0.15, 0]]],
              YZ: [
                [
                  new r.Mesh(new r.BoxGeometry(0.15, 0.15, 0.01), c.clone()),
                  [0, 0.15, 0.15],
                  [0, Math.PI / 2, 0],
                ],
              ],
              XZ: [
                [
                  new r.Mesh(new r.BoxGeometry(0.15, 0.15, 0.01), l.clone()),
                  [0.15, 0, 0.15],
                  [-Math.PI / 2, 0, 0],
                ],
              ],
            },
            b = {
              X: [
                [
                  new r.Mesh(new r.CylinderGeometry(0.2, 0, 0.6, 4), n),
                  [0.3, 0, 0],
                  [0, 0, -Math.PI / 2],
                ],
                [
                  new r.Mesh(new r.CylinderGeometry(0.2, 0, 0.6, 4), n),
                  [-0.3, 0, 0],
                  [0, 0, Math.PI / 2],
                ],
              ],
              Y: [
                [new r.Mesh(new r.CylinderGeometry(0.2, 0, 0.6, 4), n), [0, 0.3, 0]],
                [
                  new r.Mesh(new r.CylinderGeometry(0.2, 0, 0.6, 4), n),
                  [0, -0.3, 0],
                  [0, 0, Math.PI],
                ],
              ],
              Z: [
                [
                  new r.Mesh(new r.CylinderGeometry(0.2, 0, 0.6, 4), n),
                  [0, 0, 0.3],
                  [Math.PI / 2, 0, 0],
                ],
                [
                  new r.Mesh(new r.CylinderGeometry(0.2, 0, 0.6, 4), n),
                  [0, 0, -0.3],
                  [-Math.PI / 2, 0, 0],
                ],
              ],
              XYZ: [[new r.Mesh(new r.OctahedronGeometry(0.2, 0), n)]],
              XY: [[new r.Mesh(new r.BoxGeometry(0.2, 0.2, 0.01), n), [0.15, 0.15, 0]]],
              YZ: [
                [
                  new r.Mesh(new r.BoxGeometry(0.2, 0.2, 0.01), n),
                  [0, 0.15, 0.15],
                  [0, Math.PI / 2, 0],
                ],
              ],
              XZ: [
                [
                  new r.Mesh(new r.BoxGeometry(0.2, 0.2, 0.01), n),
                  [0.15, 0, 0.15],
                  [-Math.PI / 2, 0, 0],
                ],
              ],
            },
            x = {
              START: [
                [new r.Mesh(new r.OctahedronGeometry(0.01, 2), o), null, null, null, 'helper'],
              ],
              END: [[new r.Mesh(new r.OctahedronGeometry(0.01, 2), o), null, null, null, 'helper']],
              DELTA: [
                [
                  new r.Line(
                    (function () {
                      const e = new r.BufferGeometry();
                      return (
                        e.setAttribute(
                          'position',
                          new r.Float32BufferAttribute([0, 0, 0, 1, 1, 1], 3),
                        ),
                        e
                      );
                    })(),
                    o,
                  ),
                  null,
                  null,
                  null,
                  'helper',
                ],
              ],
              X: [[new r.Line(g, o.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], 'helper']],
              Y: [
                [
                  new r.Line(g, o.clone()),
                  [0, -1e3, 0],
                  [0, 0, Math.PI / 2],
                  [1e6, 1, 1],
                  'helper',
                ],
              ],
              Z: [
                [
                  new r.Line(g, o.clone()),
                  [0, 0, -1e3],
                  [0, -Math.PI / 2, 0],
                  [1e6, 1, 1],
                  'helper',
                ],
              ],
            },
            M = {
              XYZE: [[new r.Mesh(v(0.5, 1), p), null, [0, Math.PI / 2, 0]]],
              X: [[new r.Mesh(v(0.5, 0.5), s)]],
              Y: [[new r.Mesh(v(0.5, 0.5), i), null, [0, 0, -Math.PI / 2]]],
              Z: [[new r.Mesh(v(0.5, 0.5), a), null, [0, Math.PI / 2, 0]]],
              E: [[new r.Mesh(v(0.75, 1), d), null, [0, Math.PI / 2, 0]]],
            },
            A = { AXIS: [[new r.Line(g, o.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], 'helper']] },
            T = {
              XYZE: [[new r.Mesh(new r.SphereGeometry(0.25, 10, 8), n)]],
              X: [
                [
                  new r.Mesh(new r.TorusGeometry(0.5, 0.1, 4, 24), n),
                  [0, 0, 0],
                  [0, -Math.PI / 2, -Math.PI / 2],
                ],
              ],
              Y: [
                [
                  new r.Mesh(new r.TorusGeometry(0.5, 0.1, 4, 24), n),
                  [0, 0, 0],
                  [Math.PI / 2, 0, 0],
                ],
              ],
              Z: [
                [
                  new r.Mesh(new r.TorusGeometry(0.5, 0.1, 4, 24), n),
                  [0, 0, 0],
                  [0, 0, -Math.PI / 2],
                ],
              ],
              E: [[new r.Mesh(new r.TorusGeometry(0.75, 0.1, 2, 24), n)]],
            },
            k = {
              X: [
                [new r.Mesh(m, s), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
                [new r.Mesh(y, s), [0, 0, 0], [0, 0, -Math.PI / 2]],
                [new r.Mesh(m, s), [-0.5, 0, 0], [0, 0, Math.PI / 2]],
              ],
              Y: [
                [new r.Mesh(m, i), [0, 0.5, 0]],
                [new r.Mesh(y, i)],
                [new r.Mesh(m, i), [0, -0.5, 0], [0, 0, Math.PI]],
              ],
              Z: [
                [new r.Mesh(m, a), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
                [new r.Mesh(y, a), [0, 0, 0], [Math.PI / 2, 0, 0]],
                [new r.Mesh(m, a), [0, 0, -0.5], [-Math.PI / 2, 0, 0]],
              ],
              XY: [[new r.Mesh(new r.BoxGeometry(0.15, 0.15, 0.01), h), [0.15, 0.15, 0]]],
              YZ: [
                [
                  new r.Mesh(new r.BoxGeometry(0.15, 0.15, 0.01), c),
                  [0, 0.15, 0.15],
                  [0, Math.PI / 2, 0],
                ],
              ],
              XZ: [
                [
                  new r.Mesh(new r.BoxGeometry(0.15, 0.15, 0.01), l),
                  [0.15, 0, 0.15],
                  [-Math.PI / 2, 0, 0],
                ],
              ],
              XYZ: [[new r.Mesh(new r.BoxGeometry(0.1, 0.1, 0.1), u.clone())]],
            },
            N = {
              X: [
                [
                  new r.Mesh(new r.CylinderGeometry(0.2, 0, 0.6, 4), n),
                  [0.3, 0, 0],
                  [0, 0, -Math.PI / 2],
                ],
                [
                  new r.Mesh(new r.CylinderGeometry(0.2, 0, 0.6, 4), n),
                  [-0.3, 0, 0],
                  [0, 0, Math.PI / 2],
                ],
              ],
              Y: [
                [new r.Mesh(new r.CylinderGeometry(0.2, 0, 0.6, 4), n), [0, 0.3, 0]],
                [
                  new r.Mesh(new r.CylinderGeometry(0.2, 0, 0.6, 4), n),
                  [0, -0.3, 0],
                  [0, 0, Math.PI],
                ],
              ],
              Z: [
                [
                  new r.Mesh(new r.CylinderGeometry(0.2, 0, 0.6, 4), n),
                  [0, 0, 0.3],
                  [Math.PI / 2, 0, 0],
                ],
                [
                  new r.Mesh(new r.CylinderGeometry(0.2, 0, 0.6, 4), n),
                  [0, 0, -0.3],
                  [-Math.PI / 2, 0, 0],
                ],
              ],
              XY: [[new r.Mesh(new r.BoxGeometry(0.2, 0.2, 0.01), n), [0.15, 0.15, 0]]],
              YZ: [
                [
                  new r.Mesh(new r.BoxGeometry(0.2, 0.2, 0.01), n),
                  [0, 0.15, 0.15],
                  [0, Math.PI / 2, 0],
                ],
              ],
              XZ: [
                [
                  new r.Mesh(new r.BoxGeometry(0.2, 0.2, 0.01), n),
                  [0.15, 0, 0.15],
                  [-Math.PI / 2, 0, 0],
                ],
              ],
              XYZ: [[new r.Mesh(new r.BoxGeometry(0.2, 0.2, 0.2), n), [0, 0, 0]]],
            },
            I = {
              X: [[new r.Line(g, o.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], 'helper']],
              Y: [
                [
                  new r.Line(g, o.clone()),
                  [0, -1e3, 0],
                  [0, 0, Math.PI / 2],
                  [1e6, 1, 1],
                  'helper',
                ],
              ],
              Z: [
                [
                  new r.Line(g, o.clone()),
                  [0, 0, -1e3],
                  [0, -Math.PI / 2, 0],
                  [1e6, 1, 1],
                  'helper',
                ],
              ],
            };
          function E(e) {
            const t = new r.Object3D();
            for (const n in e)
              for (let r = e[n].length; r--; ) {
                const o = e[n][r][0].clone(),
                  s = e[n][r][1],
                  i = e[n][r][2],
                  a = e[n][r][3],
                  c = e[n][r][4];
                (o.name = n),
                  (o.tag = c),
                  s && o.position.set(s[0], s[1], s[2]),
                  i && o.rotation.set(i[0], i[1], i[2]),
                  a && o.scale.set(a[0], a[1], a[2]),
                  o.updateMatrix();
                const l = o.geometry.clone();
                l.applyMatrix4(o.matrix),
                  (o.geometry = l),
                  (o.renderOrder = 1 / 0),
                  o.position.set(0, 0, 0),
                  o.rotation.set(0, 0, 0),
                  o.scale.set(1, 1, 1),
                  t.add(o);
              }
            return t;
          }
          (this.gizmo = {}),
            (this.picker = {}),
            (this.helper = {}),
            this.add((this.gizmo.translate = E(w))),
            this.add((this.gizmo.rotate = E(M))),
            this.add((this.gizmo.scale = E(k))),
            this.add((this.picker.translate = E(b))),
            this.add((this.picker.rotate = E(T))),
            this.add((this.picker.scale = E(N))),
            this.add((this.helper.translate = E(x))),
            this.add((this.helper.rotate = E(A))),
            this.add((this.helper.scale = E(I))),
            (this.picker.translate.visible = !1),
            (this.picker.rotate.visible = !1),
            (this.picker.scale.visible = !1);
        }
        updateMatrixWorld(e) {
          const t =
            'local' === ('scale' === this.mode ? 'local' : this.space) ? this.worldQuaternion : k;
          (this.gizmo.translate.visible = 'translate' === this.mode),
            (this.gizmo.rotate.visible = 'rotate' === this.mode),
            (this.gizmo.scale.visible = 'scale' === this.mode),
            (this.helper.translate.visible = 'translate' === this.mode),
            (this.helper.rotate.visible = 'rotate' === this.mode),
            (this.helper.scale.visible = 'scale' === this.mode);
          let n = [];
          (n = n.concat(this.picker[this.mode].children)),
            (n = n.concat(this.gizmo[this.mode].children)),
            (n = n.concat(this.helper[this.mode].children));
          for (let e = 0; e < n.length; e++) {
            const r = n[e];
            let o;
            if (
              ((r.visible = !0),
              r.rotation.set(0, 0, 0),
              r.position.copy(this.worldPosition),
              (o = this.camera.isOrthographicCamera
                ? (this.camera.top - this.camera.bottom) / this.camera.zoom
                : this.worldPosition.distanceTo(this.cameraPosition) *
                  Math.min(
                    (1.9 * Math.tan((Math.PI * this.camera.fov) / 360)) / this.camera.zoom,
                    7,
                  )),
              r.scale.set(1, 1, 1).multiplyScalar((o * this.size) / 4),
              'helper' !== r.tag)
            ) {
              if ((r.quaternion.copy(t), 'translate' === this.mode || 'scale' === this.mode)) {
                const e = 0.99,
                  n = 0.2;
                'X' === r.name &&
                  Math.abs(x.copy(E).applyQuaternion(t).dot(this.eye)) > e &&
                  (r.scale.set(1e-10, 1e-10, 1e-10), (r.visible = !1)),
                  'Y' === r.name &&
                    Math.abs(x.copy(C).applyQuaternion(t).dot(this.eye)) > e &&
                    (r.scale.set(1e-10, 1e-10, 1e-10), (r.visible = !1)),
                  'Z' === r.name &&
                    Math.abs(x.copy(P).applyQuaternion(t).dot(this.eye)) > e &&
                    (r.scale.set(1e-10, 1e-10, 1e-10), (r.visible = !1)),
                  'XY' === r.name &&
                    Math.abs(x.copy(P).applyQuaternion(t).dot(this.eye)) < n &&
                    (r.scale.set(1e-10, 1e-10, 1e-10), (r.visible = !1)),
                  'YZ' === r.name &&
                    Math.abs(x.copy(E).applyQuaternion(t).dot(this.eye)) < n &&
                    (r.scale.set(1e-10, 1e-10, 1e-10), (r.visible = !1)),
                  'XZ' === r.name &&
                    Math.abs(x.copy(C).applyQuaternion(t).dot(this.eye)) < n &&
                    (r.scale.set(1e-10, 1e-10, 1e-10), (r.visible = !1));
              } else
                'rotate' === this.mode &&
                  (T.copy(t),
                  x.copy(this.eye).applyQuaternion(a.copy(t).invert()),
                  -1 !== r.name.search('E') &&
                    r.quaternion.setFromRotationMatrix(A.lookAt(this.eye, M, C)),
                  'X' === r.name &&
                    (a.setFromAxisAngle(E, Math.atan2(-x.y, x.z)),
                    a.multiplyQuaternions(T, a),
                    r.quaternion.copy(a)),
                  'Y' === r.name &&
                    (a.setFromAxisAngle(C, Math.atan2(x.x, x.z)),
                    a.multiplyQuaternions(T, a),
                    r.quaternion.copy(a)),
                  'Z' === r.name &&
                    (a.setFromAxisAngle(P, Math.atan2(x.y, x.x)),
                    a.multiplyQuaternions(T, a),
                    r.quaternion.copy(a)));
              (r.visible = r.visible && (-1 === r.name.indexOf('X') || this.showX)),
                (r.visible = r.visible && (-1 === r.name.indexOf('Y') || this.showY)),
                (r.visible = r.visible && (-1 === r.name.indexOf('Z') || this.showZ)),
                (r.visible =
                  r.visible &&
                  (-1 === r.name.indexOf('E') || (this.showX && this.showY && this.showZ))),
                (r.material._color = r.material._color || r.material.color.clone()),
                (r.material._opacity = r.material._opacity || r.material.opacity),
                r.material.color.copy(r.material._color),
                (r.material.opacity = r.material._opacity),
                this.enabled &&
                  this.axis &&
                  (r.name === this.axis ||
                    this.axis.split('').some(function (e) {
                      return r.name === e;
                    })) &&
                  (r.material.color.setHex(16776960), (r.material.opacity = 1));
            } else
              (r.visible = !1),
                'AXIS' === r.name
                  ? ((r.visible = !!this.axis),
                    'X' === this.axis &&
                      (a.setFromEuler(b.set(0, 0, 0)),
                      r.quaternion.copy(t).multiply(a),
                      Math.abs(x.copy(E).applyQuaternion(t).dot(this.eye)) > 0.9 &&
                        (r.visible = !1)),
                    'Y' === this.axis &&
                      (a.setFromEuler(b.set(0, 0, Math.PI / 2)),
                      r.quaternion.copy(t).multiply(a),
                      Math.abs(x.copy(C).applyQuaternion(t).dot(this.eye)) > 0.9 &&
                        (r.visible = !1)),
                    'Z' === this.axis &&
                      (a.setFromEuler(b.set(0, Math.PI / 2, 0)),
                      r.quaternion.copy(t).multiply(a),
                      Math.abs(x.copy(P).applyQuaternion(t).dot(this.eye)) > 0.9 &&
                        (r.visible = !1)),
                    'XYZE' === this.axis &&
                      (a.setFromEuler(b.set(0, Math.PI / 2, 0)),
                      x.copy(this.rotationAxis),
                      r.quaternion.setFromRotationMatrix(A.lookAt(M, x, C)),
                      r.quaternion.multiply(a),
                      (r.visible = this.dragging)),
                    'E' === this.axis && (r.visible = !1))
                  : 'START' === r.name
                    ? (r.position.copy(this.worldPositionStart), (r.visible = this.dragging))
                    : 'END' === r.name
                      ? (r.position.copy(this.worldPosition), (r.visible = this.dragging))
                      : 'DELTA' === r.name
                        ? (r.position.copy(this.worldPositionStart),
                          r.quaternion.copy(this.worldQuaternionStart),
                          s
                            .set(1e-10, 1e-10, 1e-10)
                            .add(this.worldPositionStart)
                            .sub(this.worldPosition)
                            .multiplyScalar(-1),
                          s.applyQuaternion(this.worldQuaternionStart.clone().invert()),
                          r.scale.copy(s),
                          (r.visible = this.dragging))
                        : (r.quaternion.copy(t),
                          this.dragging
                            ? r.position.copy(this.worldPositionStart)
                            : r.position.copy(this.worldPosition),
                          this.axis && (r.visible = -1 !== this.axis.search(r.name)));
          }
          super.updateMatrixWorld(e);
        }
      }
      class F extends r.Mesh {
        constructor() {
          super(
            new r.PlaneGeometry(1e5, 1e5, 2, 2),
            new r.MeshBasicMaterial({
              visible: !1,
              wireframe: !0,
              side: r.DoubleSide,
              transparent: !0,
              opacity: 0.1,
              toneMapped: !1,
            }),
          ),
            (this.isTransformControlsPlane = !0),
            (this.type = 'TransformControlsPlane');
        }
        updateMatrixWorld(e) {
          let t = this.space;
          switch (
            (this.position.copy(this.worldPosition),
            'scale' === this.mode && (t = 'local'),
            S.copy(E).applyQuaternion('local' === t ? this.worldQuaternion : k),
            L.copy(C).applyQuaternion('local' === t ? this.worldQuaternion : k),
            R.copy(P).applyQuaternion('local' === t ? this.worldQuaternion : k),
            x.copy(L),
            this.mode)
          ) {
            case 'translate':
            case 'scale':
              switch (this.axis) {
                case 'X':
                  x.copy(this.eye).cross(S), N.copy(S).cross(x);
                  break;
                case 'Y':
                  x.copy(this.eye).cross(L), N.copy(L).cross(x);
                  break;
                case 'Z':
                  x.copy(this.eye).cross(R), N.copy(R).cross(x);
                  break;
                case 'XY':
                  N.copy(R);
                  break;
                case 'YZ':
                  N.copy(S);
                  break;
                case 'XZ':
                  x.copy(R), N.copy(L);
                  break;
                case 'XYZ':
                case 'E':
                  N.set(0, 0, 0);
              }
              break;
            case 'rotate':
            default:
              N.set(0, 0, 0);
          }
          0 === N.length()
            ? this.quaternion.copy(this.cameraQuaternion)
            : (I.lookAt(s.set(0, 0, 0), N, x), this.quaternion.setFromRotationMatrix(I)),
            super.updateMatrixWorld(e);
        }
      }
    },
    4103: (e, t, n) => {
      n.r(t), n.d(t, { NURBSCurve: () => s });
      var r = n(81396),
        o = n(26200);
      class s extends r.Curve {
        constructor(e, t, n, o, s) {
          super(),
            (this.degree = e),
            (this.knots = t),
            (this.controlPoints = []),
            (this.startKnot = o || 0),
            (this.endKnot = s || this.knots.length - 1);
          for (let e = 0; e < n.length; ++e) {
            const t = n[e];
            this.controlPoints[e] = new r.Vector4(t.x, t.y, t.z, t.w);
          }
        }
        getPoint(e, t = new r.Vector3()) {
          const n = t,
            s =
              this.knots[this.startKnot] +
              e * (this.knots[this.endKnot] - this.knots[this.startKnot]),
            i = o.calcBSplinePoint(this.degree, this.knots, this.controlPoints, s);
          return 1 !== i.w && i.divideScalar(i.w), n.set(i.x, i.y, i.z);
        }
        getTangent(e, t = new r.Vector3()) {
          const n = t,
            s = this.knots[0] + e * (this.knots[this.knots.length - 1] - this.knots[0]),
            i = o.calcNURBSDerivatives(this.degree, this.knots, this.controlPoints, s, 1);
          return n.copy(i[1]).normalize(), n;
        }
      }
    },
    26200: (e, t, n) => {
      n.r(t),
        n.d(t, {
          calcBSplineDerivatives: () => c,
          calcBSplinePoint: () => i,
          calcBasisFunctionDerivatives: () => a,
          calcBasisFunctions: () => s,
          calcKoverI: () => l,
          calcNURBSDerivatives: () => u,
          calcRationalCurveDerivatives: () => h,
          calcSurfacePoint: () => d,
          findSpan: () => o,
        });
      var r = n(81396);
      function o(e, t, n) {
        const r = n.length - e - 1;
        if (t >= n[r]) return r - 1;
        if (t <= n[e]) return e;
        let o = e,
          s = r,
          i = Math.floor((o + s) / 2);
        for (; t < n[i] || t >= n[i + 1]; )
          t < n[i] ? (s = i) : (o = i), (i = Math.floor((o + s) / 2));
        return i;
      }
      function s(e, t, n, r) {
        const o = [],
          s = [],
          i = [];
        o[0] = 1;
        for (let a = 1; a <= n; ++a) {
          (s[a] = t - r[e + 1 - a]), (i[a] = r[e + a] - t);
          let n = 0;
          for (let e = 0; e < a; ++e) {
            const t = i[e + 1],
              r = s[a - e],
              c = o[e] / (t + r);
            (o[e] = n + t * c), (n = r * c);
          }
          o[a] = n;
        }
        return o;
      }
      function i(e, t, n, i) {
        const a = o(e, i, t),
          c = s(a, i, e, t),
          l = new r.Vector4(0, 0, 0, 0);
        for (let t = 0; t <= e; ++t) {
          const r = n[a - e + t],
            o = c[t],
            s = r.w * o;
          (l.x += r.x * s), (l.y += r.y * s), (l.z += r.z * s), (l.w += r.w * o);
        }
        return l;
      }
      function a(e, t, n, r, o) {
        const s = [];
        for (let e = 0; e <= n; ++e) s[e] = 0;
        const i = [];
        for (let e = 0; e <= r; ++e) i[e] = s.slice(0);
        const a = [];
        for (let e = 0; e <= n; ++e) a[e] = s.slice(0);
        a[0][0] = 1;
        const c = s.slice(0),
          l = s.slice(0);
        for (let r = 1; r <= n; ++r) {
          (c[r] = t - o[e + 1 - r]), (l[r] = o[e + r] - t);
          let n = 0;
          for (let e = 0; e < r; ++e) {
            const t = l[e + 1],
              o = c[r - e];
            a[r][e] = t + o;
            const s = a[e][r - 1] / a[r][e];
            (a[e][r] = n + t * s), (n = o * s);
          }
          a[r][r] = n;
        }
        for (let e = 0; e <= n; ++e) i[0][e] = a[e][n];
        for (let e = 0; e <= n; ++e) {
          let t = 0,
            o = 1;
          const c = [];
          for (let e = 0; e <= n; ++e) c[e] = s.slice(0);
          c[0][0] = 1;
          for (let s = 1; s <= r; ++s) {
            let r = 0;
            const l = e - s,
              h = n - s;
            e >= s && ((c[o][0] = c[t][0] / a[h + 1][l]), (r = c[o][0] * a[l][h]));
            const u = e - 1 <= h ? s - 1 : n - e;
            for (let e = l >= -1 ? 1 : -l; e <= u; ++e)
              (c[o][e] = (c[t][e] - c[t][e - 1]) / a[h + 1][l + e]), (r += c[o][e] * a[l + e][h]);
            e <= h && ((c[o][s] = -c[t][s - 1] / a[h + 1][e]), (r += c[o][s] * a[e][h])),
              (i[s][e] = r);
            const d = t;
            (t = o), (o = d);
          }
        }
        let h = n;
        for (let e = 1; e <= r; ++e) {
          for (let t = 0; t <= n; ++t) i[e][t] *= h;
          h *= n - e;
        }
        return i;
      }
      function c(e, t, n, s, i) {
        const c = i < e ? i : e,
          l = [],
          h = o(e, s, t),
          u = a(h, s, e, c, t),
          d = [];
        for (let e = 0; e < n.length; ++e) {
          const t = n[e].clone(),
            r = t.w;
          (t.x *= r), (t.y *= r), (t.z *= r), (d[e] = t);
        }
        for (let t = 0; t <= c; ++t) {
          const n = d[h - e].clone().multiplyScalar(u[t][0]);
          for (let r = 1; r <= e; ++r) n.add(d[h - e + r].clone().multiplyScalar(u[t][r]));
          l[t] = n;
        }
        for (let e = c + 1; e <= i + 1; ++e) l[e] = new r.Vector4(0, 0, 0);
        return l;
      }
      function l(e, t) {
        let n = 1;
        for (let t = 2; t <= e; ++t) n *= t;
        let r = 1;
        for (let e = 2; e <= t; ++e) r *= e;
        for (let n = 2; n <= e - t; ++n) r *= n;
        return n / r;
      }
      function h(e) {
        const t = e.length,
          n = [],
          o = [];
        for (let s = 0; s < t; ++s) {
          const t = e[s];
          (n[s] = new r.Vector3(t.x, t.y, t.z)), (o[s] = t.w);
        }
        const s = [];
        for (let e = 0; e < t; ++e) {
          const t = n[e].clone();
          for (let n = 1; n <= e; ++n) t.sub(s[e - n].clone().multiplyScalar(l(e, n) * o[n]));
          s[e] = t.divideScalar(o[0]);
        }
        return s;
      }
      function u(e, t, n, r, o) {
        return h(c(e, t, n, r, o));
      }
      function d(e, t, n, i, a, c, l, h) {
        const u = o(e, c, n),
          d = o(t, l, i),
          p = s(u, c, e, n),
          f = s(d, l, t, i),
          m = [];
        for (let n = 0; n <= t; ++n) {
          m[n] = new r.Vector4(0, 0, 0, 0);
          for (let r = 0; r <= e; ++r) {
            const o = a[u - e + r][d - t + n].clone(),
              s = o.w;
            (o.x *= s), (o.y *= s), (o.z *= s), m[n].add(o.multiplyScalar(p[r]));
          }
        }
        const g = new r.Vector4(0, 0, 0, 0);
        for (let e = 0; e <= t; ++e) g.add(m[e].multiplyScalar(f[e]));
        g.divideScalar(g.w), h.set(g.x, g.y, g.z);
      }
    },
    78646: (e, t, n) => {
      n.d(t, {
        GZ: () => xe,
        HT: () => ae,
        T8: () => pe,
        TD: () => de,
        Xo: () => be,
        _Z: () => se,
        iZ: () => ie,
      });
      var r = function (e) {
        return URL.createObjectURL(new Blob([e], { type: 'text/javascript' }));
      };
      try {
        URL.revokeObjectURL(r(''));
      } catch (e) {
        (r = function (e) {
          return 'data:application/javascript;charset=UTF-8,' + encodeURI(e);
        }),
          function (e) {
            return new Worker(e, { type: 'module' });
          };
      }
      var o = Uint8Array,
        s = Uint16Array,
        i = Uint32Array,
        a = new o([
          0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0,
          0, 0,
        ]),
        c = new o([
          0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12,
          13, 13, 0, 0,
        ]),
        l = new o([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
        h = function (e, t) {
          for (var n = new s(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
          var o = new i(n[30]);
          for (r = 1; r < 30; ++r)
            for (var a = n[r]; a < n[r + 1]; ++a) o[a] = ((a - n[r]) << 5) | r;
          return [n, o];
        },
        u = h(a, 2),
        d = u[0],
        p = u[1];
      (d[28] = 258), (p[258] = 28);
      for (var f = h(c, 0), m = f[0], g = f[1], y = new s(32768), v = 0; v < 32768; ++v) {
        var w = ((43690 & v) >>> 1) | ((21845 & v) << 1);
        (w = ((61680 & (w = ((52428 & w) >>> 2) | ((13107 & w) << 2))) >>> 4) | ((3855 & w) << 4)),
          (y[v] = (((65280 & w) >>> 8) | ((255 & w) << 8)) >>> 1);
      }
      var b = function (e, t, n) {
          for (var r = e.length, o = 0, i = new s(t); o < r; ++o) ++i[e[o] - 1];
          var a,
            c = new s(t);
          for (o = 0; o < t; ++o) c[o] = (c[o - 1] + i[o - 1]) << 1;
          if (n) {
            a = new s(1 << t);
            var l = 15 - t;
            for (o = 0; o < r; ++o)
              if (e[o])
                for (
                  var h = (o << 4) | e[o],
                    u = t - e[o],
                    d = c[e[o] - 1]++ << u,
                    p = d | ((1 << u) - 1);
                  d <= p;
                  ++d
                )
                  a[y[d] >>> l] = h;
          } else
            for (a = new s(r), o = 0; o < r; ++o) e[o] && (a[o] = y[c[e[o] - 1]++] >>> (15 - e[o]));
          return a;
        },
        x = new o(288);
      for (v = 0; v < 144; ++v) x[v] = 8;
      for (v = 144; v < 256; ++v) x[v] = 9;
      for (v = 256; v < 280; ++v) x[v] = 7;
      for (v = 280; v < 288; ++v) x[v] = 8;
      var M = new o(32);
      for (v = 0; v < 32; ++v) M[v] = 5;
      var A = b(x, 9, 0),
        T = b(x, 9, 1),
        k = b(M, 5, 0),
        N = b(M, 5, 1),
        I = function (e) {
          for (var t = e[0], n = 1; n < e.length; ++n) e[n] > t && (t = e[n]);
          return t;
        },
        E = function (e, t, n) {
          var r = (t / 8) | 0;
          return ((e[r] | (e[r + 1] << 8)) >> (7 & t)) & n;
        },
        C = function (e, t) {
          var n = (t / 8) | 0;
          return (e[n] | (e[n + 1] << 8) | (e[n + 2] << 16)) >> (7 & t);
        },
        P = function (e) {
          return ((e / 8) | 0) + (7 & e && 1);
        },
        S = function (e, t, n) {
          (null == t || t < 0) && (t = 0), (null == n || n > e.length) && (n = e.length);
          var r = new (e instanceof s ? s : e instanceof i ? i : o)(n - t);
          return r.set(e.subarray(t, n)), r;
        },
        L = function (e, t, n) {
          var r = e.length;
          if (!r || (n && !n.l && r < 5)) return t || new o(0);
          var s = !t || n,
            i = !n || n.i;
          n || (n = {}), t || (t = new o(3 * r));
          var h = function (e) {
              var n = t.length;
              if (e > n) {
                var r = new o(Math.max(2 * n, e));
                r.set(t), (t = r);
              }
            },
            u = n.f || 0,
            p = n.p || 0,
            f = n.b || 0,
            g = n.l,
            y = n.d,
            v = n.m,
            w = n.n,
            x = 8 * r;
          do {
            if (!g) {
              n.f = u = E(e, p, 1);
              var M = E(e, p + 1, 3);
              if (((p += 3), !M)) {
                var A = e[(U = P(p) + 4) - 4] | (e[U - 3] << 8),
                  k = U + A;
                if (k > r) {
                  if (i) throw 'unexpected EOF';
                  break;
                }
                s && h(f + A), t.set(e.subarray(U, k), f), (n.b = f += A), (n.p = p = 8 * k);
                continue;
              }
              if (1 == M) (g = T), (y = N), (v = 9), (w = 5);
              else {
                if (2 != M) throw 'invalid block type';
                var L = E(e, p, 31) + 257,
                  R = E(e, p + 10, 15) + 4,
                  _ = L + E(e, p + 5, 31) + 1;
                p += 14;
                for (var F = new o(_), O = new o(19), B = 0; B < R; ++B)
                  O[l[B]] = E(e, p + 3 * B, 7);
                p += 3 * R;
                var D = I(O),
                  j = (1 << D) - 1,
                  V = b(O, D, 1);
                for (B = 0; B < _; ) {
                  var U,
                    G = V[E(e, p, j)];
                  if (((p += 15 & G), (U = G >>> 4) < 16)) F[B++] = U;
                  else {
                    var z = 0,
                      X = 0;
                    for (
                      16 == U
                        ? ((X = 3 + E(e, p, 3)), (p += 2), (z = F[B - 1]))
                        : 17 == U
                          ? ((X = 3 + E(e, p, 7)), (p += 3))
                          : 18 == U && ((X = 11 + E(e, p, 127)), (p += 7));
                      X--;

                    )
                      F[B++] = z;
                  }
                }
                var H = F.subarray(0, L),
                  q = F.subarray(L);
                (v = I(H)), (w = I(q)), (g = b(H, v, 1)), (y = b(q, w, 1));
              }
              if (p > x) {
                if (i) throw 'unexpected EOF';
                break;
              }
            }
            s && h(f + 131072);
            for (var W = (1 << v) - 1, Q = (1 << w) - 1, Z = p; ; Z = p) {
              var Y = (z = g[C(e, p) & W]) >>> 4;
              if ((p += 15 & z) > x) {
                if (i) throw 'unexpected EOF';
                break;
              }
              if (!z) throw 'invalid length/literal';
              if (Y < 256) t[f++] = Y;
              else {
                if (256 == Y) {
                  (Z = p), (g = null);
                  break;
                }
                var K = Y - 254;
                if (Y > 264) {
                  var J = a[(B = Y - 257)];
                  (K = E(e, p, (1 << J) - 1) + d[B]), (p += J);
                }
                var $ = y[C(e, p) & Q],
                  ee = $ >>> 4;
                if (!$) throw 'invalid distance';
                p += 15 & $;
                q = m[ee];
                if (ee > 3) {
                  J = c[ee];
                  (q += C(e, p) & ((1 << J) - 1)), (p += J);
                }
                if (p > x) {
                  if (i) throw 'unexpected EOF';
                  break;
                }
                s && h(f + 131072);
                for (var te = f + K; f < te; f += 4)
                  (t[f] = t[f - q]),
                    (t[f + 1] = t[f + 1 - q]),
                    (t[f + 2] = t[f + 2 - q]),
                    (t[f + 3] = t[f + 3 - q]);
                f = te;
              }
            }
            (n.l = g), (n.p = Z), (n.b = f), g && ((u = 1), (n.m = v), (n.d = y), (n.n = w));
          } while (!u);
          return f == t.length ? t : S(t, 0, f);
        },
        R = function (e, t, n) {
          n <<= 7 & t;
          var r = (t / 8) | 0;
          (e[r] |= n), (e[r + 1] |= n >>> 8);
        },
        _ = function (e, t, n) {
          n <<= 7 & t;
          var r = (t / 8) | 0;
          (e[r] |= n), (e[r + 1] |= n >>> 8), (e[r + 2] |= n >>> 16);
        },
        F = function (e, t) {
          for (var n = [], r = 0; r < e.length; ++r) e[r] && n.push({ s: r, f: e[r] });
          var i = n.length,
            a = n.slice();
          if (!i) return [G, 0];
          if (1 == i) {
            var c = new o(n[0].s + 1);
            return (c[n[0].s] = 1), [c, 1];
          }
          n.sort(function (e, t) {
            return e.f - t.f;
          }),
            n.push({ s: -1, f: 25001 });
          var l = n[0],
            h = n[1],
            u = 0,
            d = 1,
            p = 2;
          for (n[0] = { s: -1, f: l.f + h.f, l: l, r: h }; d != i - 1; )
            (l = n[n[u].f < n[p].f ? u++ : p++]),
              (h = n[u != d && n[u].f < n[p].f ? u++ : p++]),
              (n[d++] = { s: -1, f: l.f + h.f, l: l, r: h });
          var f = a[0].s;
          for (r = 1; r < i; ++r) a[r].s > f && (f = a[r].s);
          var m = new s(f + 1),
            g = O(n[d - 1], m, 0);
          if (g > t) {
            r = 0;
            var y = 0,
              v = g - t,
              w = 1 << v;
            for (
              a.sort(function (e, t) {
                return m[t.s] - m[e.s] || e.f - t.f;
              });
              r < i;
              ++r
            ) {
              var b = a[r].s;
              if (!(m[b] > t)) break;
              (y += w - (1 << (g - m[b]))), (m[b] = t);
            }
            for (y >>>= v; y > 0; ) {
              var x = a[r].s;
              m[x] < t ? (y -= 1 << (t - m[x]++ - 1)) : ++r;
            }
            for (; r >= 0 && y; --r) {
              var M = a[r].s;
              m[M] == t && (--m[M], ++y);
            }
            g = t;
          }
          return [new o(m), g];
        },
        O = function (e, t, n) {
          return -1 == e.s ? Math.max(O(e.l, t, n + 1), O(e.r, t, n + 1)) : (t[e.s] = n);
        },
        B = function (e) {
          for (var t = e.length; t && !e[--t]; );
          for (
            var n = new s(++t),
              r = 0,
              o = e[0],
              i = 1,
              a = function (e) {
                n[r++] = e;
              },
              c = 1;
            c <= t;
            ++c
          )
            if (e[c] == o && c != t) ++i;
            else {
              if (!o && i > 2) {
                for (; i > 138; i -= 138) a(32754);
                i > 2 && (a(i > 10 ? ((i - 11) << 5) | 28690 : ((i - 3) << 5) | 12305), (i = 0));
              } else if (i > 3) {
                for (a(o), --i; i > 6; i -= 6) a(8304);
                i > 2 && (a(((i - 3) << 5) | 8208), (i = 0));
              }
              for (; i--; ) a(o);
              (i = 1), (o = e[c]);
            }
          return [n.subarray(0, r), t];
        },
        D = function (e, t) {
          for (var n = 0, r = 0; r < t.length; ++r) n += e[r] * t[r];
          return n;
        },
        j = function (e, t, n) {
          var r = n.length,
            o = P(t + 2);
          (e[o] = 255 & r),
            (e[o + 1] = r >>> 8),
            (e[o + 2] = 255 ^ e[o]),
            (e[o + 3] = 255 ^ e[o + 1]);
          for (var s = 0; s < r; ++s) e[o + s + 4] = n[s];
          return 8 * (o + 4 + r);
        },
        V = function (e, t, n, r, o, i, h, u, d, p, f) {
          R(t, f++, n), ++o[256];
          for (
            var m = F(o, 15),
              g = m[0],
              y = m[1],
              v = F(i, 15),
              w = v[0],
              T = v[1],
              N = B(g),
              I = N[0],
              E = N[1],
              C = B(w),
              P = C[0],
              S = C[1],
              L = new s(19),
              O = 0;
            O < I.length;
            ++O
          )
            L[31 & I[O]]++;
          for (O = 0; O < P.length; ++O) L[31 & P[O]]++;
          for (var V = F(L, 7), U = V[0], G = V[1], z = 19; z > 4 && !U[l[z - 1]]; --z);
          var X,
            H,
            q,
            W,
            Q = (p + 5) << 3,
            Z = D(o, x) + D(i, M) + h,
            Y = D(o, g) + D(i, w) + h + 14 + 3 * z + D(L, U) + (2 * L[16] + 3 * L[17] + 7 * L[18]);
          if (Q <= Z && Q <= Y) return j(t, f, e.subarray(d, d + p));
          if ((R(t, f, 1 + (Y < Z)), (f += 2), Y < Z)) {
            (X = b(g, y, 0)), (H = g), (q = b(w, T, 0)), (W = w);
            var K = b(U, G, 0);
            R(t, f, E - 257), R(t, f + 5, S - 1), R(t, f + 10, z - 4), (f += 14);
            for (O = 0; O < z; ++O) R(t, f + 3 * O, U[l[O]]);
            f += 3 * z;
            for (var J = [I, P], $ = 0; $ < 2; ++$) {
              var ee = J[$];
              for (O = 0; O < ee.length; ++O) {
                var te = 31 & ee[O];
                R(t, f, K[te]),
                  (f += U[te]),
                  te > 15 && (R(t, f, (ee[O] >>> 5) & 127), (f += ee[O] >>> 12));
              }
            }
          } else (X = A), (H = x), (q = k), (W = M);
          for (O = 0; O < u; ++O)
            if (r[O] > 255) {
              te = (r[O] >>> 18) & 31;
              _(t, f, X[te + 257]),
                (f += H[te + 257]),
                te > 7 && (R(t, f, (r[O] >>> 23) & 31), (f += a[te]));
              var ne = 31 & r[O];
              _(t, f, q[ne]), (f += W[ne]), ne > 3 && (_(t, f, (r[O] >>> 5) & 8191), (f += c[ne]));
            } else _(t, f, X[r[O]]), (f += H[r[O]]);
          return _(t, f, X[256]), f + H[256];
        },
        U = new i([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]),
        G = new o(0),
        z = function (e, t, n, r, l, h) {
          var u = e.length,
            d = new o(r + u + 5 * (1 + Math.ceil(u / 7e3)) + l),
            f = d.subarray(r, d.length - l),
            m = 0;
          if (!t || u < 8)
            for (var y = 0; y <= u; y += 65535) {
              var v = y + 65535;
              v < u
                ? (m = j(f, m, e.subarray(y, v)))
                : ((f[y] = h), (m = j(f, m, e.subarray(y, u))));
            }
          else {
            for (
              var w = U[t - 1],
                b = w >>> 13,
                x = 8191 & w,
                M = (1 << n) - 1,
                A = new s(32768),
                T = new s(M + 1),
                k = Math.ceil(n / 3),
                N = 2 * k,
                I = function (t) {
                  return (e[t] ^ (e[t + 1] << k) ^ (e[t + 2] << N)) & M;
                },
                E = new i(25e3),
                C = new s(288),
                L = new s(32),
                R = 0,
                _ = 0,
                F = ((y = 0), 0),
                O = 0,
                B = 0;
              y < u;
              ++y
            ) {
              var D = I(y),
                z = 32767 & y,
                X = T[D];
              if (((A[z] = X), (T[D] = z), O <= y)) {
                var H = u - y;
                if ((R > 7e3 || F > 24576) && H > 423) {
                  (m = V(e, f, 0, E, C, L, _, F, B, y - B, m)), (F = R = _ = 0), (B = y);
                  for (var q = 0; q < 286; ++q) C[q] = 0;
                  for (q = 0; q < 30; ++q) L[q] = 0;
                }
                var W = 2,
                  Q = 0,
                  Z = x,
                  Y = (z - X) & 32767;
                if (H > 2 && D == I(y - Y))
                  for (
                    var K = Math.min(b, H) - 1, J = Math.min(32767, y), $ = Math.min(258, H);
                    Y <= J && --Z && z != X;

                  ) {
                    if (e[y + W] == e[y + W - Y]) {
                      for (var ee = 0; ee < $ && e[y + ee] == e[y + ee - Y]; ++ee);
                      if (ee > W) {
                        if (((W = ee), (Q = Y), ee > K)) break;
                        var te = Math.min(Y, ee - 2),
                          ne = 0;
                        for (q = 0; q < te; ++q) {
                          var re = (y - Y + q + 32768) & 32767,
                            oe = (re - A[re] + 32768) & 32767;
                          oe > ne && ((ne = oe), (X = re));
                        }
                      }
                    }
                    Y += ((z = X) - (X = A[z]) + 32768) & 32767;
                  }
                if (Q) {
                  E[F++] = 268435456 | (p[W] << 18) | g[Q];
                  var se = 31 & p[W],
                    ie = 31 & g[Q];
                  (_ += a[se] + c[ie]), ++C[257 + se], ++L[ie], (O = y + W), ++R;
                } else (E[F++] = e[y]), ++C[e[y]];
              }
            }
            (m = V(e, f, h, E, C, L, _, F, B, y - B, m)), !h && 7 & m && (m = j(f, m + 1, G));
          }
          return S(d, 0, r + P(m) + l);
        },
        X = (function () {
          for (var e = new i(256), t = 0; t < 256; ++t) {
            for (var n = t, r = 9; --r; ) n = (1 & n && 3988292384) ^ (n >>> 1);
            e[t] = n;
          }
          return e;
        })(),
        H = function () {
          var e = -1;
          return {
            p: function (t) {
              for (var n = e, r = 0; r < t.length; ++r) n = X[(255 & n) ^ t[r]] ^ (n >>> 8);
              e = n;
            },
            d: function () {
              return ~e;
            },
          };
        },
        q = function () {
          var e = 1,
            t = 0;
          return {
            p: function (n) {
              for (var r = e, o = t, s = n.length, i = 0; i != s; ) {
                for (var a = Math.min(i + 2655, s); i < a; ++i) o += r += n[i];
                (r = (65535 & r) + 15 * (r >> 16)), (o = (65535 & o) + 15 * (o >> 16));
              }
              (e = r), (t = o);
            },
            d: function () {
              return (
                ((255 & (e %= 65521)) << 24) |
                ((e >>> 8) << 16) |
                ((255 & (t %= 65521)) << 8) |
                (t >>> 8)
              );
            },
          };
        },
        W = function (e, t, n, r, o) {
          return z(
            e,
            null == t.level ? 6 : t.level,
            null == t.mem
              ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(e.length))))
              : 12 + t.mem,
            n,
            r,
            !o,
          );
        },
        Q = function (e, t) {
          var n = {};
          for (var r in e) n[r] = e[r];
          for (var r in t) n[r] = t[r];
          return n;
        },
        Z = function (e, t) {
          return e[t] | (e[t + 1] << 8);
        },
        Y = function (e, t) {
          return (e[t] | (e[t + 1] << 8) | (e[t + 2] << 16) | (e[t + 3] << 24)) >>> 0;
        },
        K = function (e, t) {
          return Y(e, t) + 4294967296 * Y(e, t + 4);
        },
        J = function (e, t, n) {
          for (; n; ++t) (e[t] = n), (n >>>= 8);
        },
        $ = function (e) {
          if (31 != e[0] || 139 != e[1] || 8 != e[2]) throw 'invalid gzip data';
          var t = e[3],
            n = 10;
          4 & t && (n += e[10] | (2 + (e[11] << 8)));
          for (var r = ((t >> 3) & 1) + ((t >> 4) & 1); r > 0; r -= !e[n++]);
          return n + (2 & t);
        },
        ee = function (e) {
          var t = e.length;
          return (e[t - 4] | (e[t - 3] << 8) | (e[t - 2] << 16) | (e[t - 1] << 24)) >>> 0;
        },
        te = function (e, t) {
          var n = t.level,
            r = 0 == n ? 0 : n < 6 ? 1 : 9 == n ? 3 : 2;
          (e[0] = 120), (e[1] = (r << 6) | (r ? 32 - 2 * r : 1));
        },
        ne = function (e) {
          if (8 != (15 & e[0]) || e[0] >>> 4 > 7 || ((e[0] << 8) | e[1]) % 31)
            throw 'invalid zlib data';
          if (32 & e[1]) throw 'invalid zlib data: preset dictionaries not supported';
        };
      function re(e, t) {
        return W(e, t || {}, 0, 0);
      }
      function oe(e, t) {
        return L(e, t);
      }
      function se(e, t) {
        return L(e.subarray($(e), -8), t || new o(ee(e)));
      }
      function ie(e, t) {
        t || (t = {});
        var n = q();
        n.p(e);
        var r = W(e, t, 2, 4);
        return te(r, t), J(r, r.length - 4, n.d()), r;
      }
      function ae(e, t) {
        return L((ne(e), e.subarray(2, -4)), t);
      }
      var ce = function (e, t, n, r) {
          for (var s in e) {
            var i = e[s],
              a = t + s;
            i instanceof o
              ? (n[a] = [i, r])
              : Array.isArray(i)
                ? (n[a] = [i[0], Q(r, i[1])])
                : ce(i, a + '/', n, r);
          }
        },
        le = 'undefined' != typeof TextEncoder && new TextEncoder(),
        he = 'undefined' != typeof TextDecoder && new TextDecoder();
      try {
        he.decode(G, { stream: !0 }), 1;
      } catch (e) {}
      var ue = function (e) {
        for (var t = '', n = 0; ; ) {
          var r = e[n++],
            o = (r > 127) + (r > 223) + (r > 239);
          if (n + o > e.length) return [t, S(e, n - 1)];
          o
            ? 3 == o
              ? ((r =
                  (((15 & r) << 18) |
                    ((63 & e[n++]) << 12) |
                    ((63 & e[n++]) << 6) |
                    (63 & e[n++])) -
                  65536),
                (t += String.fromCharCode(55296 | (r >> 10), 56320 | (1023 & r))))
              : (t +=
                  1 & o
                    ? String.fromCharCode(((31 & r) << 6) | (63 & e[n++]))
                    : String.fromCharCode(((15 & r) << 12) | ((63 & e[n++]) << 6) | (63 & e[n++])))
            : (t += String.fromCharCode(r));
        }
      };
      function de(e, t) {
        if (t) {
          for (var n = new o(e.length), r = 0; r < e.length; ++r) n[r] = e.charCodeAt(r);
          return n;
        }
        if (le) return le.encode(e);
        var s = e.length,
          i = new o(e.length + (e.length >> 1)),
          a = 0,
          c = function (e) {
            i[a++] = e;
          };
        for (r = 0; r < s; ++r) {
          if (a + 5 > i.length) {
            var l = new o(a + 8 + ((s - r) << 1));
            l.set(i), (i = l);
          }
          var h = e.charCodeAt(r);
          h < 128 || t
            ? c(h)
            : h < 2048
              ? (c(192 | (h >> 6)), c(128 | (63 & h)))
              : h > 55295 && h < 57344
                ? (c(240 | ((h = (65536 + (1047552 & h)) | (1023 & e.charCodeAt(++r))) >> 18)),
                  c(128 | ((h >> 12) & 63)),
                  c(128 | ((h >> 6) & 63)),
                  c(128 | (63 & h)))
                : (c(224 | (h >> 12)), c(128 | ((h >> 6) & 63)), c(128 | (63 & h)));
        }
        return S(i, 0, a);
      }
      function pe(e, t) {
        if (t) {
          for (var n = '', r = 0; r < e.length; r += 16384)
            n += String.fromCharCode.apply(null, e.subarray(r, r + 16384));
          return n;
        }
        if (he) return he.decode(e);
        var o = ue(e),
          s = o[0];
        if (o[1].length) throw 'invalid utf-8 data';
        return s;
      }
      var fe = function (e, t) {
          return t + 30 + Z(e, t + 26) + Z(e, t + 28);
        },
        me = function (e, t, n) {
          var r = Z(e, t + 28),
            o = pe(e.subarray(t + 46, t + 46 + r), !(2048 & Z(e, t + 8))),
            s = t + 46 + r,
            i = Y(e, t + 20),
            a = n && 4294967295 == i ? ge(e, s) : [i, Y(e, t + 24), Y(e, t + 42)],
            c = a[0],
            l = a[1],
            h = a[2];
          return [Z(e, t + 10), c, l, o, s + Z(e, t + 30) + Z(e, t + 32), h];
        },
        ge = function (e, t) {
          for (; 1 != Z(e, t); t += 4 + Z(e, t + 2));
          return [K(e, t + 12), K(e, t + 4), K(e, t + 20)];
        },
        ye = function (e) {
          var t = 0;
          if (e)
            for (var n in e) {
              var r = e[n].length;
              if (r > 65535) throw 'extra field too long';
              t += r + 4;
            }
          return t;
        },
        ve = function (e, t, n, r, o, s, i, a) {
          var c = r.length,
            l = n.extra,
            h = a && a.length,
            u = ye(l);
          J(e, t, null != i ? 33639248 : 67324752),
            (t += 4),
            null != i && ((e[t++] = 20), (e[t++] = n.os)),
            (e[t] = 20),
            (t += 2),
            (e[t++] = (n.flag << 1) | (null == s && 8)),
            (e[t++] = o && 8),
            (e[t++] = 255 & n.compression),
            (e[t++] = n.compression >> 8);
          var d = new Date(null == n.mtime ? Date.now() : n.mtime),
            p = d.getFullYear() - 1980;
          if (p < 0 || p > 119) throw 'date not in range 1980-2099';
          if (
            (J(
              e,
              t,
              (p << 25) |
                ((d.getMonth() + 1) << 21) |
                (d.getDate() << 16) |
                (d.getHours() << 11) |
                (d.getMinutes() << 5) |
                (d.getSeconds() >>> 1),
            ),
            (t += 4),
            null != s && (J(e, t, n.crc), J(e, t + 4, s), J(e, t + 8, n.size)),
            J(e, t + 12, c),
            J(e, t + 14, u),
            (t += 16),
            null != i && (J(e, t, h), J(e, t + 6, n.attrs), J(e, t + 10, i), (t += 14)),
            e.set(r, t),
            (t += c),
            u)
          )
            for (var f in l) {
              var m = l[f],
                g = m.length;
              J(e, t, +f), J(e, t + 2, g), e.set(m, t + 4), (t += 4 + g);
            }
          return h && (e.set(a, t), (t += h)), t;
        },
        we = function (e, t, n, r, o) {
          J(e, t, 101010256), J(e, t + 8, n), J(e, t + 10, n), J(e, t + 12, r), J(e, t + 16, o);
        };
      function be(e, t) {
        t || (t = {});
        var n = {},
          r = [];
        ce(e, '', n, t);
        var s = 0,
          i = 0;
        for (var a in n) {
          var c = n[a],
            l = c[0],
            h = c[1],
            u = 0 == h.level ? 0 : 8,
            d = (T = de(a)).length,
            p = h.comment,
            f = p && de(p),
            m = f && f.length,
            g = ye(h.extra);
          if (d > 65535) throw 'filename too long';
          var y = u ? re(l, h) : l,
            v = y.length,
            w = H();
          w.p(l),
            r.push(
              Q(h, {
                size: l.length,
                crc: w.d(),
                c: y,
                f: T,
                m: f,
                u: d != a.length || (f && p.length != m),
                o: s,
                compression: u,
              }),
            ),
            (s += 30 + d + g + v),
            (i += 76 + 2 * (d + g) + (m || 0) + v);
        }
        for (var b = new o(i + 22), x = s, M = i - s, A = 0; A < r.length; ++A) {
          var T = r[A];
          ve(b, T.o, T, T.f, T.u, T.c.length);
          var k = 30 + T.f.length + ye(T.extra);
          b.set(T.c, T.o + k),
            ve(b, s, T, T.f, T.u, T.c.length, T.o, T.m),
            (s += 16 + k + (T.m ? T.m.length : 0));
        }
        return we(b, s, r.length, M, x), b;
      }
      function xe(e) {
        for (var t = {}, n = e.length - 22; 101010256 != Y(e, n); --n)
          if (!n || e.length - n > 65558) throw 'invalid zip file';
        var r = Z(e, n + 8);
        if (!r) return {};
        var s = Y(e, n + 16),
          i = 4294967295 == s;
        if (i) {
          if (((n = Y(e, n - 12)), 101075792 != Y(e, n))) throw 'invalid zip file';
          (r = Y(e, n + 32)), (s = Y(e, n + 48));
        }
        for (var a = 0; a < r; ++a) {
          var c = me(e, s, i),
            l = c[0],
            h = c[1],
            u = c[2],
            d = c[3],
            p = c[4],
            f = c[5],
            m = fe(e, f);
          if (((s = p), l)) {
            if (8 != l) throw 'unknown compression type ' + l;
            t[d] = oe(e.subarray(m, m + h), new o(u));
          } else t[d] = S(e, m, m + h);
        }
        return t;
      }
    },
    69706: (e, t, n) => {
      n.r(t), n.d(t, { ColladaLoader: () => s });
      var r = n(81396),
        o = n(20650);
      class s extends r.Loader {
        constructor(e) {
          super(e);
        }
        load(e, t, n, o) {
          const s = this,
            i = '' === s.path ? r.LoaderUtils.extractUrlBase(e) : s.path,
            a = new r.FileLoader(s.manager);
          a.setPath(s.path),
            a.setRequestHeader(s.requestHeader),
            a.setWithCredentials(s.withCredentials),
            a.load(
              e,
              function (n) {
                try {
                  t(s.parse(n, i));
                } catch (t) {
                  o ? o(t) : console.error(t), s.manager.itemError(e);
                }
              },
              n,
              o,
            );
        }
        parse(e, t) {
          function n(e, t) {
            const n = [],
              r = e.childNodes;
            for (let e = 0, o = r.length; e < o; e++) {
              const o = r[e];
              o.nodeName === t && n.push(o);
            }
            return n;
          }
          function s(e) {
            if (0 === e.length) return [];
            const t = e.trim().split(/\s+/),
              n = new Array(t.length);
            for (let e = 0, r = t.length; e < r; e++) n[e] = t[e];
            return n;
          }
          function i(e) {
            if (0 === e.length) return [];
            const t = e.trim().split(/\s+/),
              n = new Array(t.length);
            for (let e = 0, r = t.length; e < r; e++) n[e] = parseFloat(t[e]);
            return n;
          }
          function a(e) {
            if (0 === e.length) return [];
            const t = e.trim().split(/\s+/),
              n = new Array(t.length);
            for (let e = 0, r = t.length; e < r; e++) n[e] = parseInt(t[e]);
            return n;
          }
          function c(e) {
            return e.substring(1);
          }
          function l(e) {
            return 0 === Object.keys(e).length;
          }
          function h(e) {
            return void 0 !== e && !0 === e.hasAttribute('meter')
              ? parseFloat(e.getAttribute('meter'))
              : 1;
          }
          function u(e) {
            return void 0 !== e ? e.textContent : 'Y_UP';
          }
          function d(e, t, r, o) {
            const s = n(e, t)[0];
            if (void 0 !== s) {
              const e = n(s, r);
              for (let t = 0; t < e.length; t++) o(e[t]);
            }
          }
          function p(e, t) {
            for (const n in e) {
              e[n].build = t(e[n]);
            }
          }
          function f(e, t) {
            return void 0 !== e.build || (e.build = t(e)), e.build;
          }
          function m(e) {
            const t = { inputs: {} };
            for (let n = 0, r = e.childNodes.length; n < r; n++) {
              const r = e.childNodes[n];
              if (1 === r.nodeType)
                switch (r.nodeName) {
                  case 'input':
                    const e = c(r.getAttribute('source')),
                      n = r.getAttribute('semantic');
                    t.inputs[n] = e;
                }
            }
            return t;
          }
          function g(e) {
            const t = {};
            let n = e.getAttribute('target').split('/');
            const r = n.shift();
            let o = n.shift();
            const s = -1 !== o.indexOf('('),
              i = -1 !== o.indexOf('.');
            if (i) (n = o.split('.')), (o = n.shift()), (t.member = n.shift());
            else if (s) {
              const e = o.split('(');
              o = e.shift();
              for (let t = 0; t < e.length; t++) e[t] = parseInt(e[t].replace(/\)/, ''));
              t.indices = e;
            }
            return (
              (t.id = r),
              (t.sid = o),
              (t.arraySyntax = s),
              (t.memberSyntax = i),
              (t.sampler = c(e.getAttribute('source'))),
              t
            );
          }
          function y(e) {
            const t = [],
              n = e.channels,
              r = e.samplers,
              o = e.sources;
            for (const e in n)
              if (n.hasOwnProperty(e)) {
                const s = n[e],
                  i = r[s.sampler],
                  a = i.inputs.INPUT,
                  c = i.inputs.OUTPUT;
                A(w(s, o[a], o[c]), t);
              }
            return t;
          }
          function v(e) {
            return f(Je.animations[e], y);
          }
          function w(e, t, n) {
            const r = Je.nodes[e.id],
              o = De(r.id),
              s = r.transforms[e.sid],
              i = r.matrix.clone().transpose();
            let a, c, l, h, u, d;
            const p = {};
            switch (s) {
              case 'matrix':
                for (l = 0, h = t.array.length; l < h; l++)
                  if (
                    ((a = t.array[l]),
                    (c = l * n.stride),
                    void 0 === p[a] && (p[a] = {}),
                    !0 === e.arraySyntax)
                  ) {
                    const t = n.array[c],
                      r = e.indices[0] + 4 * e.indices[1];
                    p[a][r] = t;
                  } else for (u = 0, d = n.stride; u < d; u++) p[a][u] = n.array[c + u];
                break;
              case 'translate':
              case 'rotate':
              case 'scale':
                console.warn(
                  'THREE.ColladaLoader: Animation transform type "%s" not yet implemented.',
                  s,
                );
            }
            const f = (function (e, t) {
              const n = [];
              for (const t in e) n.push({ time: parseFloat(t), value: e[t] });
              n.sort(r);
              for (let e = 0; e < 16; e++) T(n, e, t.elements[e]);
              return n;
              function r(e, t) {
                return e.time - t.time;
              }
            })(p, i);
            return { name: o.uuid, keyframes: f };
          }
          const b = new r.Vector3(),
            x = new r.Vector3(),
            M = new r.Quaternion();
          function A(e, t) {
            const n = e.keyframes,
              o = e.name,
              s = [],
              i = [],
              a = [],
              c = [];
            for (let e = 0, t = n.length; e < t; e++) {
              const t = n[e],
                r = t.time,
                o = t.value;
              Ie.fromArray(o).transpose(),
                Ie.decompose(b, M, x),
                s.push(r),
                i.push(b.x, b.y, b.z),
                a.push(M.x, M.y, M.z, M.w),
                c.push(x.x, x.y, x.z);
            }
            return (
              i.length > 0 && t.push(new r.VectorKeyframeTrack(o + '.position', s, i)),
              a.length > 0 && t.push(new r.QuaternionKeyframeTrack(o + '.quaternion', s, a)),
              c.length > 0 && t.push(new r.VectorKeyframeTrack(o + '.scale', s, c)),
              t
            );
          }
          function T(e, t, n) {
            let r,
              o,
              s,
              i = !0;
            for (o = 0, s = e.length; o < s; o++)
              (r = e[o]), void 0 === r.value[t] ? (r.value[t] = null) : (i = !1);
            if (!0 === i) for (o = 0, s = e.length; o < s; o++) (r = e[o]), (r.value[t] = n);
            else
              !(function (e, t) {
                let n, r;
                for (let o = 0, s = e.length; o < s; o++) {
                  const s = e[o];
                  if (null === s.value[t]) {
                    if (((n = k(e, o, t)), (r = N(e, o, t)), null === n)) {
                      s.value[t] = r.value[t];
                      continue;
                    }
                    if (null === r) {
                      s.value[t] = n.value[t];
                      continue;
                    }
                    I(s, n, r, t);
                  }
                }
              })(e, t);
          }
          function k(e, t, n) {
            for (; t >= 0; ) {
              const r = e[t];
              if (null !== r.value[n]) return r;
              t--;
            }
            return null;
          }
          function N(e, t, n) {
            for (; t < e.length; ) {
              const r = e[t];
              if (null !== r.value[n]) return r;
              t++;
            }
            return null;
          }
          function I(e, t, n, r) {
            n.time - t.time != 0
              ? (e.value[r] =
                  ((e.time - t.time) * (n.value[r] - t.value[r])) / (n.time - t.time) + t.value[r])
              : (e.value[r] = t.value[r]);
          }
          function E(e) {
            const t = [],
              n = e.name,
              o = e.end - e.start || -1,
              s = e.animations;
            for (let e = 0, n = s.length; e < n; e++) {
              const n = v(s[e]);
              for (let e = 0, r = n.length; e < r; e++) t.push(n[e]);
            }
            return new r.AnimationClip(n, o, t);
          }
          function C(e) {
            return f(Je.clips[e], E);
          }
          function P(e) {
            const t = { sources: {} };
            for (let n = 0, r = e.childNodes.length; n < r; n++) {
              const r = e.childNodes[n];
              if (1 === r.nodeType)
                switch (r.nodeName) {
                  case 'bind_shape_matrix':
                    t.bindShapeMatrix = i(r.textContent);
                    break;
                  case 'source':
                    const e = r.getAttribute('id');
                    t.sources[e] = ae(r);
                    break;
                  case 'joints':
                    t.joints = S(r);
                    break;
                  case 'vertex_weights':
                    t.vertexWeights = L(r);
                }
            }
            return t;
          }
          function S(e) {
            const t = { inputs: {} };
            for (let n = 0, r = e.childNodes.length; n < r; n++) {
              const r = e.childNodes[n];
              if (1 === r.nodeType)
                switch (r.nodeName) {
                  case 'input':
                    const e = r.getAttribute('semantic'),
                      n = c(r.getAttribute('source'));
                    t.inputs[e] = n;
                }
            }
            return t;
          }
          function L(e) {
            const t = { inputs: {} };
            for (let n = 0, r = e.childNodes.length; n < r; n++) {
              const r = e.childNodes[n];
              if (1 === r.nodeType)
                switch (r.nodeName) {
                  case 'input':
                    const e = r.getAttribute('semantic'),
                      n = c(r.getAttribute('source')),
                      o = parseInt(r.getAttribute('offset'));
                    t.inputs[e] = { id: n, offset: o };
                    break;
                  case 'vcount':
                    t.vcount = a(r.textContent);
                    break;
                  case 'v':
                    t.v = a(r.textContent);
                }
            }
            return t;
          }
          function R(e) {
            const t = { id: e.id },
              n = Je.geometries[t.id];
            return (
              void 0 !== e.skin &&
                ((t.skin = (function (e) {
                  const t = 4,
                    n = {
                      joints: [],
                      indices: { array: [], stride: t },
                      weights: { array: [], stride: t },
                    },
                    o = e.sources,
                    s = e.vertexWeights,
                    i = s.vcount,
                    a = s.v,
                    c = s.inputs.JOINT.offset,
                    l = s.inputs.WEIGHT.offset,
                    h = e.sources[e.joints.inputs.JOINT],
                    u = e.sources[e.joints.inputs.INV_BIND_MATRIX],
                    d = o[s.inputs.WEIGHT.id].array;
                  let p,
                    f,
                    m,
                    g = 0;
                  for (p = 0, m = i.length; p < m; p++) {
                    const e = i[p],
                      r = [];
                    for (f = 0; f < e; f++) {
                      const e = a[g + c],
                        t = d[a[g + l]];
                      r.push({ index: e, weight: t }), (g += 2);
                    }
                    for (r.sort(y), f = 0; f < t; f++) {
                      const e = r[f];
                      void 0 !== e
                        ? (n.indices.array.push(e.index), n.weights.array.push(e.weight))
                        : (n.indices.array.push(0), n.weights.array.push(0));
                    }
                  }
                  e.bindShapeMatrix
                    ? (n.bindMatrix = new r.Matrix4().fromArray(e.bindShapeMatrix).transpose())
                    : (n.bindMatrix = new r.Matrix4().identity());
                  for (p = 0, m = h.array.length; p < m; p++) {
                    const e = h.array[p],
                      t = new r.Matrix4().fromArray(u.array, p * u.stride).transpose();
                    n.joints.push({ name: e, boneInverse: t });
                  }
                  return n;
                  function y(e, t) {
                    return t.weight - e.weight;
                  }
                })(e.skin)),
                (n.sources.skinIndices = t.skin.indices),
                (n.sources.skinWeights = t.skin.weights)),
              t
            );
          }
          function _(e) {
            return void 0 !== e.build ? e.build : e.init_from;
          }
          function F(e) {
            const t = Je.images[e];
            return void 0 !== t
              ? f(t, _)
              : (console.warn("THREE.ColladaLoader: Couldn't find image with ID:", e), null);
          }
          function O(e) {
            const t = { surfaces: {}, samplers: {} };
            for (let n = 0, r = e.childNodes.length; n < r; n++) {
              const r = e.childNodes[n];
              if (1 === r.nodeType)
                switch (r.nodeName) {
                  case 'newparam':
                    B(r, t);
                    break;
                  case 'technique':
                    t.technique = V(r);
                    break;
                  case 'extra':
                    t.extra = q(r);
                }
            }
            return t;
          }
          function B(e, t) {
            const n = e.getAttribute('sid');
            for (let r = 0, o = e.childNodes.length; r < o; r++) {
              const o = e.childNodes[r];
              if (1 === o.nodeType)
                switch (o.nodeName) {
                  case 'surface':
                    t.surfaces[n] = D(o);
                    break;
                  case 'sampler2D':
                    t.samplers[n] = j(o);
                }
            }
          }
          function D(e) {
            const t = {};
            for (let n = 0, r = e.childNodes.length; n < r; n++) {
              const r = e.childNodes[n];
              if (1 === r.nodeType)
                switch (r.nodeName) {
                  case 'init_from':
                    t.init_from = r.textContent;
                }
            }
            return t;
          }
          function j(e) {
            const t = {};
            for (let n = 0, r = e.childNodes.length; n < r; n++) {
              const r = e.childNodes[n];
              if (1 === r.nodeType)
                switch (r.nodeName) {
                  case 'source':
                    t.source = r.textContent;
                }
            }
            return t;
          }
          function V(e) {
            const t = {};
            for (let n = 0, r = e.childNodes.length; n < r; n++) {
              const r = e.childNodes[n];
              if (1 === r.nodeType)
                switch (r.nodeName) {
                  case 'constant':
                  case 'lambert':
                  case 'blinn':
                  case 'phong':
                    (t.type = r.nodeName), (t.parameters = U(r));
                    break;
                  case 'extra':
                    t.extra = q(r);
                }
            }
            return t;
          }
          function U(e) {
            const t = {};
            for (let n = 0, r = e.childNodes.length; n < r; n++) {
              const r = e.childNodes[n];
              if (1 === r.nodeType)
                switch (r.nodeName) {
                  case 'emission':
                  case 'diffuse':
                  case 'specular':
                  case 'bump':
                  case 'ambient':
                  case 'shininess':
                  case 'transparency':
                    t[r.nodeName] = G(r);
                    break;
                  case 'transparent':
                    t[r.nodeName] = {
                      opaque: r.hasAttribute('opaque') ? r.getAttribute('opaque') : 'A_ONE',
                      data: G(r),
                    };
                }
            }
            return t;
          }
          function G(e) {
            const t = {};
            for (let n = 0, r = e.childNodes.length; n < r; n++) {
              const r = e.childNodes[n];
              if (1 === r.nodeType)
                switch (r.nodeName) {
                  case 'color':
                    t[r.nodeName] = i(r.textContent);
                    break;
                  case 'float':
                    t[r.nodeName] = parseFloat(r.textContent);
                    break;
                  case 'texture':
                    t[r.nodeName] = { id: r.getAttribute('texture'), extra: z(r) };
                }
            }
            return t;
          }
          function z(e) {
            const t = { technique: {} };
            for (let n = 0, r = e.childNodes.length; n < r; n++) {
              const r = e.childNodes[n];
              if (1 === r.nodeType)
                switch (r.nodeName) {
                  case 'extra':
                    X(r, t);
                }
            }
            return t;
          }
          function X(e, t) {
            for (let n = 0, r = e.childNodes.length; n < r; n++) {
              const r = e.childNodes[n];
              if (1 === r.nodeType)
                switch (r.nodeName) {
                  case 'technique':
                    H(r, t);
                }
            }
          }
          function H(e, t) {
            for (let n = 0, r = e.childNodes.length; n < r; n++) {
              const r = e.childNodes[n];
              if (1 === r.nodeType)
                switch (r.nodeName) {
                  case 'repeatU':
                  case 'repeatV':
                  case 'offsetU':
                  case 'offsetV':
                    t.technique[r.nodeName] = parseFloat(r.textContent);
                    break;
                  case 'wrapU':
                  case 'wrapV':
                    'TRUE' === r.textContent.toUpperCase()
                      ? (t.technique[r.nodeName] = 1)
                      : 'FALSE' === r.textContent.toUpperCase()
                        ? (t.technique[r.nodeName] = 0)
                        : (t.technique[r.nodeName] = parseInt(r.textContent));
                    break;
                  case 'bump':
                    t[r.nodeName] = Q(r);
                }
            }
          }
          function q(e) {
            const t = {};
            for (let n = 0, r = e.childNodes.length; n < r; n++) {
              const r = e.childNodes[n];
              if (1 === r.nodeType)
                switch (r.nodeName) {
                  case 'technique':
                    t.technique = W(r);
                }
            }
            return t;
          }
          function W(e) {
            const t = {};
            for (let n = 0, r = e.childNodes.length; n < r; n++) {
              const r = e.childNodes[n];
              if (1 === r.nodeType)
                switch (r.nodeName) {
                  case 'double_sided':
                    t[r.nodeName] = parseInt(r.textContent);
                    break;
                  case 'bump':
                    t[r.nodeName] = Q(r);
                }
            }
            return t;
          }
          function Q(e) {
            const t = {};
            for (let n = 0, r = e.childNodes.length; n < r; n++) {
              const r = e.childNodes[n];
              if (1 === r.nodeType)
                switch (r.nodeName) {
                  case 'texture':
                    t[r.nodeName] = {
                      id: r.getAttribute('texture'),
                      texcoord: r.getAttribute('texcoord'),
                      extra: z(r),
                    };
                }
            }
            return t;
          }
          function Z(e) {
            return e;
          }
          function Y(e) {
            const t = ((n = e.url), f(Je.effects[n], Z));
            var n;
            const o = t.profile.technique;
            let s;
            switch (o.type) {
              case 'phong':
              case 'blinn':
                s = new r.MeshPhongMaterial();
                break;
              case 'lambert':
                s = new r.MeshLambertMaterial();
                break;
              default:
                s = new r.MeshBasicMaterial();
            }
            function i(e, n = null) {
              const o = t.profile.samplers[e.id];
              let s = null;
              if (void 0 !== o) {
                s = F(t.profile.surfaces[o.source].init_from);
              } else
                console.warn(
                  'THREE.ColladaLoader: Undefined sampler. Access image directly (see #12530).',
                ),
                  (s = F(e.id));
              if (null !== s) {
                const t = (function (e) {
                  let t,
                    n = e.slice(2 + ((e.lastIndexOf('.') - 1) >>> 0));
                  switch (((n = n.toLowerCase()), n)) {
                    case 'tga':
                      t = We;
                      break;
                    default:
                      t = qe;
                  }
                  return t;
                })(s);
                if (void 0 !== t) {
                  const o = t.load(s),
                    i = e.extra;
                  if (void 0 !== i && void 0 !== i.technique && !1 === l(i.technique)) {
                    const e = i.technique;
                    (o.wrapS = e.wrapU ? r.RepeatWrapping : r.ClampToEdgeWrapping),
                      (o.wrapT = e.wrapV ? r.RepeatWrapping : r.ClampToEdgeWrapping),
                      o.offset.set(e.offsetU || 0, e.offsetV || 0),
                      o.repeat.set(e.repeatU || 1, e.repeatV || 1);
                  } else (o.wrapS = r.RepeatWrapping), (o.wrapT = r.RepeatWrapping);
                  return null !== n && (o.encoding = n), o;
                }
                return (
                  console.warn('THREE.ColladaLoader: Loader for texture %s not found.', s), null
                );
              }
              return (
                console.warn("THREE.ColladaLoader: Couldn't create texture with ID:", e.id), null
              );
            }
            s.name = e.name || '';
            const a = o.parameters;
            for (const e in a) {
              const t = a[e];
              switch (e) {
                case 'diffuse':
                  t.color && s.color.fromArray(t.color),
                    t.texture && (s.map = i(t.texture, r.sRGBEncoding));
                  break;
                case 'specular':
                  t.color && s.specular && s.specular.fromArray(t.color),
                    t.texture && (s.specularMap = i(t.texture));
                  break;
                case 'bump':
                  t.texture && (s.normalMap = i(t.texture));
                  break;
                case 'ambient':
                  t.texture && (s.lightMap = i(t.texture, r.sRGBEncoding));
                  break;
                case 'shininess':
                  t.float && s.shininess && (s.shininess = t.float);
                  break;
                case 'emission':
                  t.color && s.emissive && s.emissive.fromArray(t.color),
                    t.texture && (s.emissiveMap = i(t.texture, r.sRGBEncoding));
              }
            }
            s.color.convertSRGBToLinear(),
              s.specular && s.specular.convertSRGBToLinear(),
              s.emissive && s.emissive.convertSRGBToLinear();
            let c = a.transparent,
              h = a.transparency;
            if (
              (void 0 === h && c && (h = { float: 1 }),
              void 0 === c && h && (c = { opaque: 'A_ONE', data: { color: [1, 1, 1, 1] } }),
              c && h)
            )
              if (c.data.texture) s.transparent = !0;
              else {
                const e = c.data.color;
                switch (c.opaque) {
                  case 'A_ONE':
                    s.opacity = e[3] * h.float;
                    break;
                  case 'RGB_ZERO':
                    s.opacity = 1 - e[0] * h.float;
                    break;
                  case 'A_ZERO':
                    s.opacity = 1 - e[3] * h.float;
                    break;
                  case 'RGB_ONE':
                    s.opacity = e[0] * h.float;
                    break;
                  default:
                    console.warn(
                      'THREE.ColladaLoader: Invalid opaque type "%s" of transparent tag.',
                      c.opaque,
                    );
                }
                s.opacity < 1 && (s.transparent = !0);
              }
            if (void 0 !== o.extra && void 0 !== o.extra.technique) {
              const e = o.extra.technique;
              for (const t in e) {
                const n = e[t];
                switch (t) {
                  case 'double_sided':
                    s.side = 1 === n ? r.DoubleSide : r.FrontSide;
                    break;
                  case 'bump':
                    (s.normalMap = i(n.texture)), (s.normalScale = new r.Vector2(1, 1));
                }
              }
            }
            return s;
          }
          function K(e) {
            return f(Je.materials[e], Y);
          }
          function J(e) {
            for (let t = 0; t < e.childNodes.length; t++) {
              const n = e.childNodes[t];
              switch (n.nodeName) {
                case 'technique_common':
                  return $(n);
              }
            }
            return {};
          }
          function $(e) {
            const t = {};
            for (let n = 0; n < e.childNodes.length; n++) {
              const r = e.childNodes[n];
              switch (r.nodeName) {
                case 'perspective':
                case 'orthographic':
                  (t.technique = r.nodeName), (t.parameters = ee(r));
              }
            }
            return t;
          }
          function ee(e) {
            const t = {};
            for (let n = 0; n < e.childNodes.length; n++) {
              const r = e.childNodes[n];
              switch (r.nodeName) {
                case 'xfov':
                case 'yfov':
                case 'xmag':
                case 'ymag':
                case 'znear':
                case 'zfar':
                case 'aspect_ratio':
                  t[r.nodeName] = parseFloat(r.textContent);
              }
            }
            return t;
          }
          function te(e) {
            let t;
            switch (e.optics.technique) {
              case 'perspective':
                t = new r.PerspectiveCamera(
                  e.optics.parameters.yfov,
                  e.optics.parameters.aspect_ratio,
                  e.optics.parameters.znear,
                  e.optics.parameters.zfar,
                );
                break;
              case 'orthographic':
                let n = e.optics.parameters.ymag,
                  o = e.optics.parameters.xmag;
                const s = e.optics.parameters.aspect_ratio;
                (o = void 0 === o ? n * s : o),
                  (n = void 0 === n ? o / s : n),
                  (o *= 0.5),
                  (n *= 0.5),
                  (t = new r.OrthographicCamera(
                    -o,
                    o,
                    n,
                    -n,
                    e.optics.parameters.znear,
                    e.optics.parameters.zfar,
                  ));
                break;
              default:
                t = new r.PerspectiveCamera();
            }
            return (t.name = e.name || ''), t;
          }
          function ne(e) {
            const t = Je.cameras[e];
            return void 0 !== t
              ? f(t, te)
              : (console.warn("THREE.ColladaLoader: Couldn't find camera with ID:", e), null);
          }
          function re(e) {
            const t = {};
            for (let n = 0, r = e.childNodes.length; n < r; n++) {
              const r = e.childNodes[n];
              if (1 === r.nodeType)
                switch (r.nodeName) {
                  case 'directional':
                  case 'point':
                  case 'spot':
                  case 'ambient':
                    (t.technique = r.nodeName), (t.parameters = oe(r));
                }
            }
            return t;
          }
          function oe(e) {
            const t = {};
            for (let n = 0, o = e.childNodes.length; n < o; n++) {
              const o = e.childNodes[n];
              if (1 === o.nodeType)
                switch (o.nodeName) {
                  case 'color':
                    const e = i(o.textContent);
                    t.color = new r.Color().fromArray(e).convertSRGBToLinear();
                    break;
                  case 'falloff_angle':
                    t.falloffAngle = parseFloat(o.textContent);
                    break;
                  case 'quadratic_attenuation':
                    const n = parseFloat(o.textContent);
                    t.distance = n ? Math.sqrt(1 / n) : 0;
                }
            }
            return t;
          }
          function se(e) {
            let t;
            switch (e.technique) {
              case 'directional':
                t = new r.DirectionalLight();
                break;
              case 'point':
                t = new r.PointLight();
                break;
              case 'spot':
                t = new r.SpotLight();
                break;
              case 'ambient':
                t = new r.AmbientLight();
            }
            return (
              e.parameters.color && t.color.copy(e.parameters.color),
              e.parameters.distance && (t.distance = e.parameters.distance),
              t
            );
          }
          function ie(e) {
            const t = Je.lights[e];
            return void 0 !== t
              ? f(t, se)
              : (console.warn("THREE.ColladaLoader: Couldn't find light with ID:", e), null);
          }
          function ae(e) {
            const t = { array: [], stride: 3 };
            for (let r = 0; r < e.childNodes.length; r++) {
              const o = e.childNodes[r];
              if (1 === o.nodeType)
                switch (o.nodeName) {
                  case 'float_array':
                    t.array = i(o.textContent);
                    break;
                  case 'Name_array':
                    t.array = s(o.textContent);
                    break;
                  case 'technique_common':
                    const e = n(o, 'accessor')[0];
                    void 0 !== e && (t.stride = parseInt(e.getAttribute('stride')));
                }
            }
            return t;
          }
          function ce(e) {
            const t = {};
            for (let n = 0; n < e.childNodes.length; n++) {
              const r = e.childNodes[n];
              1 === r.nodeType && (t[r.getAttribute('semantic')] = c(r.getAttribute('source')));
            }
            return t;
          }
          function le(e) {
            const t = {
              type: e.nodeName,
              material: e.getAttribute('material'),
              count: parseInt(e.getAttribute('count')),
              inputs: {},
              stride: 0,
              hasUV: !1,
            };
            for (let n = 0, r = e.childNodes.length; n < r; n++) {
              const r = e.childNodes[n];
              if (1 === r.nodeType)
                switch (r.nodeName) {
                  case 'input':
                    const e = c(r.getAttribute('source')),
                      n = r.getAttribute('semantic'),
                      o = parseInt(r.getAttribute('offset')),
                      s = parseInt(r.getAttribute('set')),
                      i = s > 0 ? n + s : n;
                    (t.inputs[i] = { id: e, offset: o }),
                      (t.stride = Math.max(t.stride, o + 1)),
                      'TEXCOORD' === n && (t.hasUV = !0);
                    break;
                  case 'vcount':
                    t.vcount = a(r.textContent);
                    break;
                  case 'p':
                    t.p = a(r.textContent);
                }
            }
            return t;
          }
          function he(e) {
            let t = 0;
            for (let n = 0, r = e.length; n < r; n++) {
              !0 === e[n].hasUV && t++;
            }
            t > 0 && t < e.length && (e.uvsNeedsFix = !0);
          }
          function ue(e) {
            const t = {},
              n = e.sources,
              r = e.vertices,
              o = e.primitives;
            if (0 === o.length) return {};
            const s = (function (e) {
              const t = {};
              for (let n = 0; n < e.length; n++) {
                const r = e[n];
                void 0 === t[r.type] && (t[r.type] = []), t[r.type].push(r);
              }
              return t;
            })(o);
            for (const e in s) {
              const o = s[e];
              he(o), (t[e] = de(o, n, r));
            }
            return t;
          }
          function de(e, t, n) {
            const o = {},
              s = { array: [], stride: 0 },
              i = { array: [], stride: 0 },
              a = { array: [], stride: 0 },
              c = { array: [], stride: 0 },
              l = { array: [], stride: 0 },
              h = [],
              u = 4,
              d = [],
              p = 4,
              f = new r.BufferGeometry(),
              m = [];
            let g = 0;
            for (let r = 0; r < e.length; r++) {
              const o = e[r],
                u = o.inputs;
              let p = 0;
              switch (o.type) {
                case 'lines':
                case 'linestrips':
                  p = 2 * o.count;
                  break;
                case 'triangles':
                  p = 3 * o.count;
                  break;
                case 'polylist':
                  for (let e = 0; e < o.count; e++) {
                    const t = o.vcount[e];
                    switch (t) {
                      case 3:
                        p += 3;
                        break;
                      case 4:
                        p += 6;
                        break;
                      default:
                        p += 3 * (t - 2);
                    }
                  }
                  break;
                default:
                  console.warn('THREE.ColladaLoader: Unknow primitive type:', o.type);
              }
              f.addGroup(g, p, r), (g += p), o.material && m.push(o.material);
              for (const r in u) {
                const p = u[r];
                switch (r) {
                  case 'VERTEX':
                    for (const r in n) {
                      const u = n[r];
                      switch (r) {
                        case 'POSITION':
                          const n = s.array.length;
                          if (
                            (pe(o, t[u], p.offset, s.array),
                            (s.stride = t[u].stride),
                            t.skinWeights &&
                              t.skinIndices &&
                              (pe(o, t.skinIndices, p.offset, h),
                              pe(o, t.skinWeights, p.offset, d)),
                            !1 === o.hasUV && !0 === e.uvsNeedsFix)
                          ) {
                            const e = (s.array.length - n) / s.stride;
                            for (let t = 0; t < e; t++) a.array.push(0, 0);
                          }
                          break;
                        case 'NORMAL':
                          pe(o, t[u], p.offset, i.array), (i.stride = t[u].stride);
                          break;
                        case 'COLOR':
                          pe(o, t[u], p.offset, l.array), (l.stride = t[u].stride);
                          break;
                        case 'TEXCOORD':
                          pe(o, t[u], p.offset, a.array), (a.stride = t[u].stride);
                          break;
                        case 'TEXCOORD1':
                          pe(o, t[u], p.offset, c.array), (a.stride = t[u].stride);
                          break;
                        default:
                          console.warn(
                            'THREE.ColladaLoader: Semantic "%s" not handled in geometry build process.',
                            r,
                          );
                      }
                    }
                    break;
                  case 'NORMAL':
                    pe(o, t[p.id], p.offset, i.array), (i.stride = t[p.id].stride);
                    break;
                  case 'COLOR':
                    pe(o, t[p.id], p.offset, l.array, !0), (l.stride = t[p.id].stride);
                    break;
                  case 'TEXCOORD':
                    pe(o, t[p.id], p.offset, a.array), (a.stride = t[p.id].stride);
                    break;
                  case 'TEXCOORD1':
                    pe(o, t[p.id], p.offset, c.array), (c.stride = t[p.id].stride);
                }
              }
            }
            return (
              s.array.length > 0 &&
                f.setAttribute('position', new r.Float32BufferAttribute(s.array, s.stride)),
              i.array.length > 0 &&
                f.setAttribute('normal', new r.Float32BufferAttribute(i.array, i.stride)),
              l.array.length > 0 &&
                f.setAttribute('color', new r.Float32BufferAttribute(l.array, l.stride)),
              a.array.length > 0 &&
                f.setAttribute('uv', new r.Float32BufferAttribute(a.array, a.stride)),
              c.array.length > 0 &&
                f.setAttribute('uv2', new r.Float32BufferAttribute(c.array, c.stride)),
              h.length > 0 && f.setAttribute('skinIndex', new r.Float32BufferAttribute(h, u)),
              d.length > 0 && f.setAttribute('skinWeight', new r.Float32BufferAttribute(d, p)),
              (o.data = f),
              (o.type = e[0].type),
              (o.materialKeys = m),
              o
            );
          }
          function pe(e, t, n, r, o = !1) {
            const s = e.p,
              i = e.stride,
              a = e.vcount;
            function c(e) {
              let t = s[e + n] * h;
              const i = t + h;
              for (; t < i; t++) r.push(l[t]);
              if (o) {
                const e = r.length - h - 1;
                Qe.setRGB(r[e + 0], r[e + 1], r[e + 2]).convertSRGBToLinear(),
                  (r[e + 0] = Qe.r),
                  (r[e + 1] = Qe.g),
                  (r[e + 2] = Qe.b);
              }
            }
            const l = t.array,
              h = t.stride;
            if (void 0 !== e.vcount) {
              let e = 0;
              for (let t = 0, n = a.length; t < n; t++) {
                const n = a[t];
                if (4 === n) {
                  const t = e + 1 * i,
                    n = e + 2 * i,
                    r = e + 3 * i;
                  c(e + 0 * i), c(t), c(r), c(t), c(n), c(r);
                } else if (3 === n) {
                  const t = e + 1 * i,
                    n = e + 2 * i;
                  c(e + 0 * i), c(t), c(n);
                } else if (n > 4)
                  for (let t = 1, r = n - 2; t <= r; t++) {
                    const n = e + i * t,
                      r = e + i * (t + 1);
                    c(e + 0 * i), c(n), c(r);
                  }
                e += i * n;
              }
            } else for (let e = 0, t = s.length; e < t; e += i) c(e);
          }
          function fe(e) {
            return f(Je.geometries[e], ue);
          }
          function me(e) {
            return void 0 !== e.build ? e.build : e;
          }
          function ge(e, t) {
            for (let n = 0; n < e.childNodes.length; n++) {
              const r = e.childNodes[n];
              if (1 === r.nodeType)
                switch (r.nodeName) {
                  case 'joint':
                    t.joints[r.getAttribute('sid')] = ye(r);
                    break;
                  case 'link':
                    t.links.push(we(r));
                }
            }
          }
          function ye(e) {
            let t;
            for (let n = 0; n < e.childNodes.length; n++) {
              const r = e.childNodes[n];
              if (1 === r.nodeType)
                switch (r.nodeName) {
                  case 'prismatic':
                  case 'revolute':
                    t = ve(r);
                }
            }
            return t;
          }
          function ve(e) {
            const t = {
              sid: e.getAttribute('sid'),
              name: e.getAttribute('name') || '',
              axis: new r.Vector3(),
              limits: { min: 0, max: 0 },
              type: e.nodeName,
              static: !1,
              zeroPosition: 0,
              middlePosition: 0,
            };
            for (let n = 0; n < e.childNodes.length; n++) {
              const r = e.childNodes[n];
              if (1 === r.nodeType)
                switch (r.nodeName) {
                  case 'axis':
                    const e = i(r.textContent);
                    t.axis.fromArray(e);
                    break;
                  case 'limits':
                    const n = r.getElementsByTagName('max')[0],
                      o = r.getElementsByTagName('min')[0];
                    (t.limits.max = parseFloat(n.textContent)),
                      (t.limits.min = parseFloat(o.textContent));
                }
            }
            return (
              t.limits.min >= t.limits.max && (t.static = !0),
              (t.middlePosition = (t.limits.min + t.limits.max) / 2),
              t
            );
          }
          function we(e) {
            const t = {
              sid: e.getAttribute('sid'),
              name: e.getAttribute('name') || '',
              attachments: [],
              transforms: [],
            };
            for (let n = 0; n < e.childNodes.length; n++) {
              const r = e.childNodes[n];
              if (1 === r.nodeType)
                switch (r.nodeName) {
                  case 'attachment_full':
                    t.attachments.push(be(r));
                    break;
                  case 'matrix':
                  case 'translate':
                  case 'rotate':
                    t.transforms.push(xe(r));
                }
            }
            return t;
          }
          function be(e) {
            const t = {
              joint: e.getAttribute('joint').split('/').pop(),
              transforms: [],
              links: [],
            };
            for (let n = 0; n < e.childNodes.length; n++) {
              const r = e.childNodes[n];
              if (1 === r.nodeType)
                switch (r.nodeName) {
                  case 'link':
                    t.links.push(we(r));
                    break;
                  case 'matrix':
                  case 'translate':
                  case 'rotate':
                    t.transforms.push(xe(r));
                }
            }
            return t;
          }
          function xe(e) {
            const t = { type: e.nodeName },
              n = i(e.textContent);
            switch (t.type) {
              case 'matrix':
                (t.obj = new r.Matrix4()), t.obj.fromArray(n).transpose();
                break;
              case 'translate':
                (t.obj = new r.Vector3()), t.obj.fromArray(n);
                break;
              case 'rotate':
                (t.obj = new r.Vector3()),
                  t.obj.fromArray(n),
                  (t.angle = r.MathUtils.degToRad(n[3]));
            }
            return t;
          }
          function Me(e, t) {
            for (let n = 0; n < e.childNodes.length; n++) {
              const r = e.childNodes[n];
              if (1 === r.nodeType)
                switch (r.nodeName) {
                  case 'technique_common':
                    Ae(r, t);
                }
            }
          }
          function Ae(e, t) {
            for (let n = 0; n < e.childNodes.length; n++) {
              const r = e.childNodes[n];
              if (1 === r.nodeType)
                switch (r.nodeName) {
                  case 'inertia':
                    t.inertia = i(r.textContent);
                    break;
                  case 'mass':
                    t.mass = i(r.textContent)[0];
                }
            }
          }
          function Te(e) {
            const t = { target: e.getAttribute('target').split('/').pop() };
            for (let n = 0; n < e.childNodes.length; n++) {
              const r = e.childNodes[n];
              if (1 === r.nodeType)
                switch (r.nodeName) {
                  case 'axis':
                    const e = r.getElementsByTagName('param')[0];
                    t.axis = e.textContent;
                    const n = t.axis.split('inst_').pop().split('axis')[0];
                    t.jointIndex = n.substring(0, n.length - 1);
                }
            }
            return t;
          }
          function ke(e) {
            return void 0 !== e.build ? e.build : e;
          }
          function Ne(e) {
            const t = [],
              n = Ge.querySelector('[id="' + e.id + '"]');
            for (let e = 0; e < n.childNodes.length; e++) {
              const o = n.childNodes[e];
              if (1 !== o.nodeType) continue;
              let s, a;
              switch (o.nodeName) {
                case 'matrix':
                  s = i(o.textContent);
                  const e = new r.Matrix4().fromArray(s).transpose();
                  t.push({ sid: o.getAttribute('sid'), type: o.nodeName, obj: e });
                  break;
                case 'translate':
                case 'scale':
                  (s = i(o.textContent)),
                    (a = new r.Vector3().fromArray(s)),
                    t.push({ sid: o.getAttribute('sid'), type: o.nodeName, obj: a });
                  break;
                case 'rotate':
                  (s = i(o.textContent)), (a = new r.Vector3().fromArray(s));
                  const n = r.MathUtils.degToRad(s[3]);
                  t.push({ sid: o.getAttribute('sid'), type: o.nodeName, obj: a, angle: n });
              }
            }
            return t;
          }
          const Ie = new r.Matrix4(),
            Ee = new r.Vector3();
          function Ce(e) {
            const t = {
              name: e.getAttribute('name') || '',
              type: e.getAttribute('type'),
              id: e.getAttribute('id'),
              sid: e.getAttribute('sid'),
              matrix: new r.Matrix4(),
              nodes: [],
              instanceCameras: [],
              instanceControllers: [],
              instanceLights: [],
              instanceGeometries: [],
              instanceNodes: [],
              transforms: {},
            };
            for (let n = 0; n < e.childNodes.length; n++) {
              const o = e.childNodes[n];
              if (1 !== o.nodeType) continue;
              let s;
              switch (o.nodeName) {
                case 'node':
                  t.nodes.push(o.getAttribute('id')), Ce(o);
                  break;
                case 'instance_camera':
                  t.instanceCameras.push(c(o.getAttribute('url')));
                  break;
                case 'instance_controller':
                  t.instanceControllers.push(Pe(o));
                  break;
                case 'instance_light':
                  t.instanceLights.push(c(o.getAttribute('url')));
                  break;
                case 'instance_geometry':
                  t.instanceGeometries.push(Pe(o));
                  break;
                case 'instance_node':
                  t.instanceNodes.push(c(o.getAttribute('url')));
                  break;
                case 'matrix':
                  (s = i(o.textContent)),
                    t.matrix.multiply(Ie.fromArray(s).transpose()),
                    (t.transforms[o.getAttribute('sid')] = o.nodeName);
                  break;
                case 'translate':
                  (s = i(o.textContent)),
                    Ee.fromArray(s),
                    t.matrix.multiply(Ie.makeTranslation(Ee.x, Ee.y, Ee.z)),
                    (t.transforms[o.getAttribute('sid')] = o.nodeName);
                  break;
                case 'rotate':
                  s = i(o.textContent);
                  const e = r.MathUtils.degToRad(s[3]);
                  t.matrix.multiply(Ie.makeRotationAxis(Ee.fromArray(s), e)),
                    (t.transforms[o.getAttribute('sid')] = o.nodeName);
                  break;
                case 'scale':
                  (s = i(o.textContent)),
                    t.matrix.scale(Ee.fromArray(s)),
                    (t.transforms[o.getAttribute('sid')] = o.nodeName);
                  break;
                case 'extra':
                  break;
                default:
                  console.log(o);
              }
            }
            return (
              Be(t.id)
                ? console.warn(
                    'THREE.ColladaLoader: There is already a node with ID %s. Exclude current node from further processing.',
                    t.id,
                  )
                : (Je.nodes[t.id] = t),
              t
            );
          }
          function Pe(e) {
            const t = { id: c(e.getAttribute('url')), materials: {}, skeletons: [] };
            for (let n = 0; n < e.childNodes.length; n++) {
              const r = e.childNodes[n];
              switch (r.nodeName) {
                case 'bind_material':
                  const e = r.getElementsByTagName('instance_material');
                  for (let n = 0; n < e.length; n++) {
                    const r = e[n],
                      o = r.getAttribute('symbol'),
                      s = r.getAttribute('target');
                    t.materials[o] = c(s);
                  }
                  break;
                case 'skeleton':
                  t.skeletons.push(c(r.textContent));
              }
            }
            return t;
          }
          function Se(e, t) {
            const n = [],
              o = [];
            let s, i, a;
            for (s = 0; s < e.length; s++) {
              const r = e[s];
              let o;
              if (Be(r)) (o = De(r)), Le(o, t, n);
              else if (((c = r), void 0 !== Je.visualScenes[c])) {
                const e = Je.visualScenes[r].children;
                for (let r = 0; r < e.length; r++) {
                  const o = e[r];
                  if ('JOINT' === o.type) {
                    Le(De(o.id), t, n);
                  }
                }
              } else
                console.error(
                  'THREE.ColladaLoader: Unable to find root bone of skeleton with ID:',
                  r,
                );
            }
            var c;
            for (s = 0; s < t.length; s++)
              for (i = 0; i < n.length; i++)
                if (((a = n[i]), a.bone.name === t[s].name)) {
                  (o[s] = a), (a.processed = !0);
                  break;
                }
            for (s = 0; s < n.length; s++)
              (a = n[s]), !1 === a.processed && (o.push(a), (a.processed = !0));
            const l = [],
              h = [];
            for (s = 0; s < o.length; s++) (a = o[s]), l.push(a.bone), h.push(a.boneInverse);
            return new r.Skeleton(l, h);
          }
          function Le(e, t, n) {
            e.traverse(function (e) {
              if (!0 === e.isBone) {
                let o;
                for (let n = 0; n < t.length; n++) {
                  const r = t[n];
                  if (r.name === e.name) {
                    o = r.boneInverse;
                    break;
                  }
                }
                void 0 === o && (o = new r.Matrix4()),
                  n.push({ bone: e, boneInverse: o, processed: !1 });
              }
            });
          }
          function Re(e) {
            const t = [],
              n = e.matrix,
              o = e.nodes,
              s = e.type,
              i = e.instanceCameras,
              a = e.instanceControllers,
              c = e.instanceLights,
              l = e.instanceGeometries,
              h = e.instanceNodes;
            for (let e = 0, n = o.length; e < n; e++) t.push(De(o[e]));
            for (let e = 0, n = i.length; e < n; e++) {
              const n = ne(i[e]);
              null !== n && t.push(n.clone());
            }
            for (let e = 0, n = a.length; e < n; e++) {
              const n = a[e],
                r = ((u = n.id), f(Je.controllers[u], R)),
                o = Oe(fe(r.id), n.materials),
                s = Se(n.skeletons, r.skin.joints);
              for (let e = 0, n = o.length; e < n; e++) {
                const n = o[e];
                n.isSkinnedMesh && (n.bind(s, r.skin.bindMatrix), n.normalizeSkinWeights()),
                  t.push(n);
              }
            }
            var u;
            for (let e = 0, n = c.length; e < n; e++) {
              const n = ie(c[e]);
              null !== n && t.push(n.clone());
            }
            for (let e = 0, n = l.length; e < n; e++) {
              const n = l[e],
                r = Oe(fe(n.id), n.materials);
              for (let e = 0, n = r.length; e < n; e++) t.push(r[e]);
            }
            for (let e = 0, n = h.length; e < n; e++) t.push(De(h[e]).clone());
            let d;
            if (0 === o.length && 1 === t.length) d = t[0];
            else {
              d = 'JOINT' === s ? new r.Bone() : new r.Group();
              for (let e = 0; e < t.length; e++) d.add(t[e]);
            }
            return (
              (d.name = 'JOINT' === s ? e.sid : e.name),
              d.matrix.copy(n),
              d.matrix.decompose(d.position, d.quaternion, d.scale),
              d
            );
          }
          const _e = new r.MeshBasicMaterial({ color: 16711935 });
          function Fe(e, t) {
            const n = [];
            for (let r = 0, o = e.length; r < o; r++) {
              const o = t[e[r]];
              void 0 === o
                ? (console.warn(
                    'THREE.ColladaLoader: Material with key %s not found. Apply fallback material.',
                    e[r],
                  ),
                  n.push(_e))
                : n.push(K(o));
            }
            return n;
          }
          function Oe(e, t) {
            const n = [];
            for (const o in e) {
              const s = e[o],
                i = Fe(s.materialKeys, t);
              if (
                (0 === i.length &&
                  ('lines' === o || 'linestrips' === o
                    ? i.push(new r.LineBasicMaterial())
                    : i.push(new r.MeshPhongMaterial())),
                'lines' === o || 'linestrips' === o)
              )
                for (let e = 0, t = i.length; e < t; e++) {
                  const t = i[e];
                  if (!0 === t.isMeshPhongMaterial || !0 === t.isMeshLambertMaterial) {
                    const n = new r.LineBasicMaterial();
                    n.color.copy(t.color),
                      (n.opacity = t.opacity),
                      (n.transparent = t.transparent),
                      (i[e] = n);
                  }
                }
              const a = void 0 !== s.data.attributes.skinIndex,
                c = 1 === i.length ? i[0] : i;
              let l;
              switch (o) {
                case 'lines':
                  l = new r.LineSegments(s.data, c);
                  break;
                case 'linestrips':
                  l = new r.Line(s.data, c);
                  break;
                case 'triangles':
                case 'polylist':
                  l = a ? new r.SkinnedMesh(s.data, c) : new r.Mesh(s.data, c);
              }
              n.push(l);
            }
            return n;
          }
          function Be(e) {
            return void 0 !== Je.nodes[e];
          }
          function De(e) {
            return f(Je.nodes[e], Re);
          }
          function je(e) {
            const t = new r.Group();
            t.name = e.name;
            const n = e.children;
            for (let e = 0; e < n.length; e++) {
              const r = n[e];
              t.add(De(r.id));
            }
            return t;
          }
          function Ve(e) {
            return f(Je.visualScenes[e], je);
          }
          if (0 === e.length) return { scene: new r.Scene() };
          const Ue = new DOMParser().parseFromString(e, 'application/xml'),
            Ge = n(Ue, 'COLLADA')[0],
            ze = Ue.getElementsByTagName('parsererror')[0];
          if (void 0 !== ze) {
            const e = n(ze, 'div')[0];
            let t;
            return (
              (t = e
                ? e.textContent
                : (function (e) {
                    let t = '';
                    const n = [e];
                    for (; n.length; ) {
                      const e = n.shift();
                      e.nodeType === Node.TEXT_NODE
                        ? (t += e.textContent)
                        : ((t += '\n'), n.push.apply(n, e.childNodes));
                    }
                    return t.trim();
                  })(ze)),
              console.error('THREE.ColladaLoader: Failed to parse collada file.\n', t),
              null
            );
          }
          const Xe = Ge.getAttribute('version');
          console.debug('THREE.ColladaLoader: File version', Xe);
          const He = (function (e) {
              return { unit: h(n(e, 'unit')[0]), upAxis: u(n(e, 'up_axis')[0]) };
            })(n(Ge, 'asset')[0]),
            qe = new r.TextureLoader(this.manager);
          let We;
          qe.setPath(this.resourcePath || t).setCrossOrigin(this.crossOrigin),
            o.TGALoader &&
              ((We = new o.TGALoader(this.manager)), We.setPath(this.resourcePath || t));
          const Qe = new r.Color(),
            Ze = [];
          let Ye = {},
            Ke = 0;
          const Je = {
            animations: {},
            clips: {},
            controllers: {},
            images: {},
            effects: {},
            materials: {},
            cameras: {},
            lights: {},
            geometries: {},
            nodes: {},
            visualScenes: {},
            kinematicsModels: {},
            physicsModels: {},
            kinematicsScenes: {},
          };
          d(Ge, 'library_animations', 'animation', function e(t) {
            const n = { sources: {}, samplers: {}, channels: {} };
            let o = !1;
            for (let r = 0, s = t.childNodes.length; r < s; r++) {
              const s = t.childNodes[r];
              if (1 !== s.nodeType) continue;
              let i;
              switch (s.nodeName) {
                case 'source':
                  (i = s.getAttribute('id')), (n.sources[i] = ae(s));
                  break;
                case 'sampler':
                  (i = s.getAttribute('id')), (n.samplers[i] = m(s));
                  break;
                case 'channel':
                  (i = s.getAttribute('target')), (n.channels[i] = g(s));
                  break;
                case 'animation':
                  e(s), (o = !0);
                  break;
                default:
                  console.log(s);
              }
            }
            !1 === o && (Je.animations[t.getAttribute('id') || r.MathUtils.generateUUID()] = n);
          }),
            d(Ge, 'library_animation_clips', 'animation_clip', function (e) {
              const t = {
                name: e.getAttribute('id') || 'default',
                start: parseFloat(e.getAttribute('start') || 0),
                end: parseFloat(e.getAttribute('end') || 0),
                animations: [],
              };
              for (let n = 0, r = e.childNodes.length; n < r; n++) {
                const r = e.childNodes[n];
                if (1 === r.nodeType)
                  switch (r.nodeName) {
                    case 'instance_animation':
                      t.animations.push(c(r.getAttribute('url')));
                  }
              }
              Je.clips[e.getAttribute('id')] = t;
            }),
            d(Ge, 'library_controllers', 'controller', function (e) {
              const t = {};
              for (let n = 0, r = e.childNodes.length; n < r; n++) {
                const r = e.childNodes[n];
                if (1 === r.nodeType)
                  switch (r.nodeName) {
                    case 'skin':
                      (t.id = c(r.getAttribute('source'))), (t.skin = P(r));
                      break;
                    case 'morph':
                      (t.id = c(r.getAttribute('source'))),
                        console.warn(
                          'THREE.ColladaLoader: Morph target animation not supported yet.',
                        );
                  }
              }
              Je.controllers[e.getAttribute('id')] = t;
            }),
            d(Ge, 'library_images', 'image', function (e) {
              const t = { init_from: n(e, 'init_from')[0].textContent };
              Je.images[e.getAttribute('id')] = t;
            }),
            d(Ge, 'library_effects', 'effect', function (e) {
              const t = {};
              for (let n = 0, r = e.childNodes.length; n < r; n++) {
                const r = e.childNodes[n];
                if (1 === r.nodeType)
                  switch (r.nodeName) {
                    case 'profile_COMMON':
                      t.profile = O(r);
                  }
              }
              Je.effects[e.getAttribute('id')] = t;
            }),
            d(Ge, 'library_materials', 'material', function (e) {
              const t = { name: e.getAttribute('name') };
              for (let n = 0, r = e.childNodes.length; n < r; n++) {
                const r = e.childNodes[n];
                if (1 === r.nodeType)
                  switch (r.nodeName) {
                    case 'instance_effect':
                      t.url = c(r.getAttribute('url'));
                  }
              }
              Je.materials[e.getAttribute('id')] = t;
            }),
            d(Ge, 'library_cameras', 'camera', function (e) {
              const t = { name: e.getAttribute('name') };
              for (let n = 0, r = e.childNodes.length; n < r; n++) {
                const r = e.childNodes[n];
                if (1 === r.nodeType)
                  switch (r.nodeName) {
                    case 'optics':
                      t.optics = J(r);
                  }
              }
              Je.cameras[e.getAttribute('id')] = t;
            }),
            d(Ge, 'library_lights', 'light', function (e) {
              let t = {};
              for (let n = 0, r = e.childNodes.length; n < r; n++) {
                const r = e.childNodes[n];
                if (1 === r.nodeType)
                  switch (r.nodeName) {
                    case 'technique_common':
                      t = re(r);
                  }
              }
              Je.lights[e.getAttribute('id')] = t;
            }),
            d(Ge, 'library_geometries', 'geometry', function (e) {
              const t = { name: e.getAttribute('name'), sources: {}, vertices: {}, primitives: [] },
                r = n(e, 'mesh')[0];
              if (void 0 !== r) {
                for (let e = 0; e < r.childNodes.length; e++) {
                  const n = r.childNodes[e];
                  if (1 !== n.nodeType) continue;
                  const o = n.getAttribute('id');
                  switch (n.nodeName) {
                    case 'source':
                      t.sources[o] = ae(n);
                      break;
                    case 'vertices':
                      t.vertices = ce(n);
                      break;
                    case 'polygons':
                      console.warn('THREE.ColladaLoader: Unsupported primitive type: ', n.nodeName);
                      break;
                    case 'lines':
                    case 'linestrips':
                    case 'polylist':
                    case 'triangles':
                      t.primitives.push(le(n));
                      break;
                    default:
                      console.log(n);
                  }
                }
                Je.geometries[e.getAttribute('id')] = t;
              }
            }),
            d(Ge, 'library_nodes', 'node', Ce),
            d(Ge, 'library_visual_scenes', 'visual_scene', function (e) {
              const t = { name: e.getAttribute('name'), children: [] };
              !(function (e) {
                const t = e.getElementsByTagName('node');
                for (let e = 0; e < t.length; e++) {
                  const n = t[e];
                  !1 === n.hasAttribute('id') && n.setAttribute('id', 'three_default_' + Ke++);
                }
              })(e);
              const r = n(e, 'node');
              for (let e = 0; e < r.length; e++) t.children.push(Ce(r[e]));
              Je.visualScenes[e.getAttribute('id')] = t;
            }),
            d(Ge, 'library_kinematics_models', 'kinematics_model', function (e) {
              const t = { name: e.getAttribute('name') || '', joints: {}, links: [] };
              for (let n = 0; n < e.childNodes.length; n++) {
                const r = e.childNodes[n];
                if (1 === r.nodeType)
                  switch (r.nodeName) {
                    case 'technique_common':
                      ge(r, t);
                  }
              }
              Je.kinematicsModels[e.getAttribute('id')] = t;
            }),
            d(Ge, 'library_physics_models', 'physics_model', function (e) {
              const t = { name: e.getAttribute('name') || '', rigidBodies: {} };
              for (let n = 0; n < e.childNodes.length; n++) {
                const r = e.childNodes[n];
                if (1 === r.nodeType)
                  switch (r.nodeName) {
                    case 'rigid_body':
                      (t.rigidBodies[r.getAttribute('name')] = {}),
                        Me(r, t.rigidBodies[r.getAttribute('name')]);
                  }
              }
              Je.physicsModels[e.getAttribute('id')] = t;
            }),
            d(Ge, 'scene', 'instance_kinematics_scene', function (e) {
              const t = { bindJointAxis: [] };
              for (let n = 0; n < e.childNodes.length; n++) {
                const r = e.childNodes[n];
                if (1 === r.nodeType)
                  switch (r.nodeName) {
                    case 'bind_joint_axis':
                      t.bindJointAxis.push(Te(r));
                  }
              }
              Je.kinematicsScenes[c(e.getAttribute('url'))] = t;
            }),
            p(Je.animations, y),
            p(Je.clips, E),
            p(Je.controllers, R),
            p(Je.images, _),
            p(Je.effects, Z),
            p(Je.materials, Y),
            p(Je.cameras, te),
            p(Je.lights, se),
            p(Je.geometries, ue),
            p(Je.visualScenes, je),
            (function () {
              const e = Je.clips;
              if (!0 === l(e)) {
                if (!1 === l(Je.animations)) {
                  const e = [];
                  for (const t in Je.animations) {
                    const n = v(t);
                    for (let t = 0, r = n.length; t < r; t++) e.push(n[t]);
                  }
                  Ze.push(new r.AnimationClip('default', -1, e));
                }
              } else for (const t in e) Ze.push(C(t));
            })(),
            (function () {
              const e = Object.keys(Je.kinematicsModels)[0],
                t = Object.keys(Je.kinematicsScenes)[0],
                n = Object.keys(Je.visualScenes)[0];
              if (void 0 === e || void 0 === t) return;
              const o = ((s = e), f(Je.kinematicsModels[s], me));
              var s;
              const i = (function (e) {
                  return f(Je.kinematicsScenes[e], ke);
                })(t),
                a = Ve(n),
                c = i.bindJointAxis,
                l = {};
              for (let e = 0, t = c.length; e < t; e++) {
                const t = c[e],
                  n = Ge.querySelector('[sid="' + t.target + '"]');
                if (n) {
                  const e = n.parentElement;
                  h(t.jointIndex, e);
                }
              }
              function h(e, t) {
                const n = t.getAttribute('name'),
                  r = o.joints[e];
                a.traverse(function (o) {
                  o.name === n &&
                    (l[e] = { object: o, transforms: Ne(t), joint: r, position: r.zeroPosition });
                });
              }
              const u = new r.Matrix4();
              Ye = {
                joints: o && o.joints,
                getJointValue: function (e) {
                  const t = l[e];
                  if (t) return t.position;
                  console.warn('THREE.ColladaLoader: Joint ' + e + " doesn't exist.");
                },
                setJointValue: function (e, t) {
                  const n = l[e];
                  if (n) {
                    const o = n.joint;
                    if (t > o.limits.max || t < o.limits.min)
                      console.warn(
                        'THREE.ColladaLoader: Joint ' +
                          e +
                          ' value ' +
                          t +
                          ' outside of limits (min: ' +
                          o.limits.min +
                          ', max: ' +
                          o.limits.max +
                          ').',
                      );
                    else if (o.static)
                      console.warn('THREE.ColladaLoader: Joint ' + e + ' is static.');
                    else {
                      const s = n.object,
                        i = o.axis,
                        a = n.transforms;
                      Ie.identity();
                      for (let n = 0; n < a.length; n++) {
                        const s = a[n];
                        if (s.sid && -1 !== s.sid.indexOf(e))
                          switch (o.type) {
                            case 'revolute':
                              Ie.multiply(u.makeRotationAxis(i, r.MathUtils.degToRad(t)));
                              break;
                            case 'prismatic':
                              Ie.multiply(u.makeTranslation(i.x * t, i.y * t, i.z * t));
                              break;
                            default:
                              console.warn('THREE.ColladaLoader: Unknown joint type: ' + o.type);
                          }
                        else
                          switch (s.type) {
                            case 'matrix':
                              Ie.multiply(s.obj);
                              break;
                            case 'translate':
                              Ie.multiply(u.makeTranslation(s.obj.x, s.obj.y, s.obj.z));
                              break;
                            case 'scale':
                              Ie.scale(s.obj);
                              break;
                            case 'rotate':
                              Ie.multiply(u.makeRotationAxis(s.obj, s.angle));
                          }
                      }
                      s.matrix.copy(Ie),
                        s.matrix.decompose(s.position, s.quaternion, s.scale),
                        (l[e].position = t);
                    }
                  } else console.log('THREE.ColladaLoader: ' + e + ' does not exist.');
                },
              };
            })();
          const $e = (function (e) {
            return Ve(c(n(e, 'instance_visual_scene')[0].getAttribute('url')));
          })(n(Ge, 'scene')[0]);
          return (
            ($e.animations = Ze),
            'Z_UP' === He.upAxis &&
              (console.warn(
                'THREE.ColladaLoader: You are loading an asset with a Z-UP coordinate system. The loader just rotates the asset to transform it into Y-UP. The vertex data are not converted, see #24289.',
              ),
              $e.rotation.set(-Math.PI / 2, 0, 0)),
            $e.scale.multiplyScalar(He.unit),
            {
              get animations() {
                return (
                  console.warn(
                    'THREE.ColladaLoader: Please access animations over scene.animations now.',
                  ),
                  Ze
                );
              },
              kinematics: Ye,
              library: Je,
              scene: $e,
            }
          );
        }
      }
    },
    62515: (e, t, n) => {
      n.r(t), n.d(t, { FBXLoader: () => l });
      var r = n(81396),
        o = n(78646),
        s = n(4103);
      let i, a, c;
      class l extends r.Loader {
        constructor(e) {
          super(e);
        }
        load(e, t, n, o) {
          const s = this,
            i = '' === s.path ? r.LoaderUtils.extractUrlBase(e) : s.path,
            a = new r.FileLoader(this.manager);
          a.setPath(s.path),
            a.setResponseType('arraybuffer'),
            a.setRequestHeader(s.requestHeader),
            a.setWithCredentials(s.withCredentials),
            a.load(
              e,
              function (n) {
                try {
                  t(s.parse(n, i));
                } catch (t) {
                  o ? o(t) : console.error(t), s.manager.itemError(e);
                }
              },
              n,
              o,
            );
        }
        parse(e, t) {
          if (
            (function (e) {
              const t = 'Kaydara FBX Binary  \0';
              return e.byteLength >= t.length && t === N(e, 0, t.length);
            })(e)
          )
            i = new f().parse(e);
          else {
            const t = N(e);
            if (
              !(function (e) {
                const t = [
                  'K',
                  'a',
                  'y',
                  'd',
                  'a',
                  'r',
                  'a',
                  '\\',
                  'F',
                  'B',
                  'X',
                  '\\',
                  'B',
                  'i',
                  'n',
                  'a',
                  'r',
                  'y',
                  '\\',
                  '\\',
                ];
                let n = 0;
                function r(t) {
                  const r = e[t - 1];
                  return (e = e.slice(n + t)), n++, r;
                }
                for (let e = 0; e < t.length; ++e) {
                  if (r(1) === t[e]) return !1;
                }
                return !0;
              })(t)
            )
              throw new Error('THREE.FBXLoader: Unknown format.');
            if (y(t) < 7e3)
              throw new Error('THREE.FBXLoader: FBX version not supported, FileVersion: ' + y(t));
            i = new p().parse(t);
          }
          const n = new r.TextureLoader(this.manager)
            .setPath(this.resourcePath || t)
            .setCrossOrigin(this.crossOrigin);
          return new h(n, this.manager).parse(i);
        }
      }
      class h {
        constructor(e, t) {
          (this.textureLoader = e), (this.manager = t);
        }
        parse() {
          a = this.parseConnections();
          const e = this.parseImages(),
            t = this.parseTextures(e),
            n = this.parseMaterials(t),
            r = this.parseDeformers(),
            o = new u().parse(r);
          return this.parseScene(r, o, n), c;
        }
        parseConnections() {
          const e = new Map();
          if ('Connections' in i) {
            i.Connections.connections.forEach(function (t) {
              const n = t[0],
                r = t[1],
                o = t[2];
              e.has(n) || e.set(n, { parents: [], children: [] });
              const s = { ID: r, relationship: o };
              e.get(n).parents.push(s), e.has(r) || e.set(r, { parents: [], children: [] });
              const i = { ID: n, relationship: o };
              e.get(r).children.push(i);
            });
          }
          return e;
        }
        parseImages() {
          const e = {},
            t = {};
          if ('Video' in i.Objects) {
            const n = i.Objects.Video;
            for (const r in n) {
              const o = n[r];
              if (((e[parseInt(r)] = o.RelativeFilename || o.Filename), 'Content' in o)) {
                const e = o.Content instanceof ArrayBuffer && o.Content.byteLength > 0,
                  s = 'string' == typeof o.Content && '' !== o.Content;
                if (e || s) {
                  const e = this.parseImage(n[r]);
                  t[o.RelativeFilename || o.Filename] = e;
                }
              }
            }
          }
          for (const n in e) {
            const r = e[n];
            void 0 !== t[r] ? (e[n] = t[r]) : (e[n] = e[n].split('\\').pop());
          }
          return e;
        }
        parseImage(e) {
          const t = e.Content,
            n = e.RelativeFilename || e.Filename,
            r = n.slice(n.lastIndexOf('.') + 1).toLowerCase();
          let o;
          switch (r) {
            case 'bmp':
              o = 'image/bmp';
              break;
            case 'jpg':
            case 'jpeg':
              o = 'image/jpeg';
              break;
            case 'png':
              o = 'image/png';
              break;
            case 'tif':
              o = 'image/tiff';
              break;
            case 'tga':
              null === this.manager.getHandler('.tga') &&
                console.warn('FBXLoader: TGA loader not found, skipping ', n),
                (o = 'image/tga');
              break;
            default:
              return void console.warn('FBXLoader: Image type "' + r + '" is not supported.');
          }
          if ('string' == typeof t) return 'data:' + o + ';base64,' + t;
          {
            const e = new Uint8Array(t);
            return window.URL.createObjectURL(new Blob([e], { type: o }));
          }
        }
        parseTextures(e) {
          const t = new Map();
          if ('Texture' in i.Objects) {
            const n = i.Objects.Texture;
            for (const r in n) {
              const o = this.parseTexture(n[r], e);
              t.set(parseInt(r), o);
            }
          }
          return t;
        }
        parseTexture(e, t) {
          const n = this.loadTexture(e, t);
          (n.ID = e.id), (n.name = e.attrName);
          const o = e.WrapModeU,
            s = e.WrapModeV,
            i = void 0 !== o ? o.value : 0,
            a = void 0 !== s ? s.value : 0;
          if (
            ((n.wrapS = 0 === i ? r.RepeatWrapping : r.ClampToEdgeWrapping),
            (n.wrapT = 0 === a ? r.RepeatWrapping : r.ClampToEdgeWrapping),
            'Scaling' in e)
          ) {
            const t = e.Scaling.value;
            (n.repeat.x = t[0]), (n.repeat.y = t[1]);
          }
          if ('Translation' in e) {
            const t = e.Translation.value;
            (n.offset.x = t[0]), (n.offset.y = t[1]);
          }
          return n;
        }
        loadTexture(e, t) {
          let n;
          const o = this.textureLoader.path,
            s = a.get(e.id).children;
          let i;
          void 0 !== s &&
            s.length > 0 &&
            void 0 !== t[s[0].ID] &&
            ((n = t[s[0].ID]),
            (0 !== n.indexOf('blob:') && 0 !== n.indexOf('data:')) ||
              this.textureLoader.setPath(void 0));
          const c = e.FileName.slice(-3).toLowerCase();
          if ('tga' === c) {
            const t = this.manager.getHandler('.tga');
            null === t
              ? (console.warn(
                  'FBXLoader: TGA loader not found, creating placeholder texture for',
                  e.RelativeFilename,
                ),
                (i = new r.Texture()))
              : (t.setPath(this.textureLoader.path), (i = t.load(n)));
          } else
            'psd' === c
              ? (console.warn(
                  'FBXLoader: PSD textures are not supported, creating placeholder texture for',
                  e.RelativeFilename,
                ),
                (i = new r.Texture()))
              : (i = this.textureLoader.load(n));
          return this.textureLoader.setPath(o), i;
        }
        parseMaterials(e) {
          const t = new Map();
          if ('Material' in i.Objects) {
            const n = i.Objects.Material;
            for (const r in n) {
              const o = this.parseMaterial(n[r], e);
              null !== o && t.set(parseInt(r), o);
            }
          }
          return t;
        }
        parseMaterial(e, t) {
          const n = e.id,
            o = e.attrName;
          let s = e.ShadingModel;
          if (('object' == typeof s && (s = s.value), !a.has(n))) return null;
          const i = this.parseParameters(e, t, n);
          let c;
          switch (s.toLowerCase()) {
            case 'phong':
              c = new r.MeshPhongMaterial();
              break;
            case 'lambert':
              c = new r.MeshLambertMaterial();
              break;
            default:
              console.warn(
                'THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.',
                s,
              ),
                (c = new r.MeshPhongMaterial());
          }
          return c.setValues(i), (c.name = o), c;
        }
        parseParameters(e, t, n) {
          const o = {};
          e.BumpFactor && (o.bumpScale = e.BumpFactor.value),
            e.Diffuse
              ? (o.color = new r.Color().fromArray(e.Diffuse.value).convertSRGBToLinear())
              : !e.DiffuseColor ||
                ('Color' !== e.DiffuseColor.type && 'ColorRGB' !== e.DiffuseColor.type) ||
                (o.color = new r.Color().fromArray(e.DiffuseColor.value).convertSRGBToLinear()),
            e.DisplacementFactor && (o.displacementScale = e.DisplacementFactor.value),
            e.Emissive
              ? (o.emissive = new r.Color().fromArray(e.Emissive.value).convertSRGBToLinear())
              : !e.EmissiveColor ||
                ('Color' !== e.EmissiveColor.type && 'ColorRGB' !== e.EmissiveColor.type) ||
                (o.emissive = new r.Color().fromArray(e.EmissiveColor.value).convertSRGBToLinear()),
            e.EmissiveFactor && (o.emissiveIntensity = parseFloat(e.EmissiveFactor.value)),
            e.Opacity && (o.opacity = parseFloat(e.Opacity.value)),
            o.opacity < 1 && (o.transparent = !0),
            e.ReflectionFactor && (o.reflectivity = e.ReflectionFactor.value),
            e.Shininess && (o.shininess = e.Shininess.value),
            e.Specular
              ? (o.specular = new r.Color().fromArray(e.Specular.value).convertSRGBToLinear())
              : e.SpecularColor &&
                'Color' === e.SpecularColor.type &&
                (o.specular = new r.Color().fromArray(e.SpecularColor.value).convertSRGBToLinear());
          const s = this;
          return (
            a.get(n).children.forEach(function (e) {
              const n = e.relationship;
              switch (n) {
                case 'Bump':
                  o.bumpMap = s.getTexture(t, e.ID);
                  break;
                case 'Maya|TEX_ao_map':
                  o.aoMap = s.getTexture(t, e.ID);
                  break;
                case 'DiffuseColor':
                case 'Maya|TEX_color_map':
                  (o.map = s.getTexture(t, e.ID)),
                    void 0 !== o.map && (o.map.encoding = r.sRGBEncoding);
                  break;
                case 'DisplacementColor':
                  o.displacementMap = s.getTexture(t, e.ID);
                  break;
                case 'EmissiveColor':
                  (o.emissiveMap = s.getTexture(t, e.ID)),
                    void 0 !== o.emissiveMap && (o.emissiveMap.encoding = r.sRGBEncoding);
                  break;
                case 'NormalMap':
                case 'Maya|TEX_normal_map':
                  o.normalMap = s.getTexture(t, e.ID);
                  break;
                case 'ReflectionColor':
                  (o.envMap = s.getTexture(t, e.ID)),
                    void 0 !== o.envMap &&
                      ((o.envMap.mapping = r.EquirectangularReflectionMapping),
                      (o.envMap.encoding = r.sRGBEncoding));
                  break;
                case 'SpecularColor':
                  (o.specularMap = s.getTexture(t, e.ID)),
                    void 0 !== o.specularMap && (o.specularMap.encoding = r.sRGBEncoding);
                  break;
                case 'TransparentColor':
                case 'TransparencyFactor':
                  (o.alphaMap = s.getTexture(t, e.ID)), (o.transparent = !0);
                  break;
                case 'AmbientColor':
                case 'ShininessExponent':
                case 'SpecularFactor':
                case 'VectorDisplacementColor':
                default:
                  console.warn(
                    'THREE.FBXLoader: %s map is not supported in three.js, skipping texture.',
                    n,
                  );
              }
            }),
            o
          );
        }
        getTexture(e, t) {
          return (
            'LayeredTexture' in i.Objects &&
              t in i.Objects.LayeredTexture &&
              (console.warn(
                'THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer.',
              ),
              (t = a.get(t).children[0].ID)),
            e.get(t)
          );
        }
        parseDeformers() {
          const e = {},
            t = {};
          if ('Deformer' in i.Objects) {
            const n = i.Objects.Deformer;
            for (const r in n) {
              const o = n[r],
                s = a.get(parseInt(r));
              if ('Skin' === o.attrType) {
                const t = this.parseSkeleton(s, n);
                (t.ID = r),
                  s.parents.length > 1 &&
                    console.warn(
                      'THREE.FBXLoader: skeleton attached to more than one geometry is not supported.',
                    ),
                  (t.geometryID = s.parents[0].ID),
                  (e[r] = t);
              } else if ('BlendShape' === o.attrType) {
                const e = { id: r };
                (e.rawTargets = this.parseMorphTargets(s, n)),
                  (e.id = r),
                  s.parents.length > 1 &&
                    console.warn(
                      'THREE.FBXLoader: morph target attached to more than one geometry is not supported.',
                    ),
                  (t[r] = e);
              }
            }
          }
          return { skeletons: e, morphTargets: t };
        }
        parseSkeleton(e, t) {
          const n = [];
          return (
            e.children.forEach(function (e) {
              const o = t[e.ID];
              if ('Cluster' !== o.attrType) return;
              const s = {
                ID: e.ID,
                indices: [],
                weights: [],
                transformLink: new r.Matrix4().fromArray(o.TransformLink.a),
              };
              'Indexes' in o && ((s.indices = o.Indexes.a), (s.weights = o.Weights.a)), n.push(s);
            }),
            { rawBones: n, bones: [] }
          );
        }
        parseMorphTargets(e, t) {
          const n = [];
          for (let r = 0; r < e.children.length; r++) {
            const o = e.children[r],
              s = t[o.ID],
              i = {
                name: s.attrName,
                initialWeight: s.DeformPercent,
                id: s.id,
                fullWeights: s.FullWeights.a,
              };
            if ('BlendShapeChannel' !== s.attrType) return;
            (i.geoID = a.get(parseInt(o.ID)).children.filter(function (e) {
              return void 0 === e.relationship;
            })[0].ID),
              n.push(i);
          }
          return n;
        }
        parseScene(e, t, n) {
          c = new r.Group();
          const o = this.parseModels(e.skeletons, t, n),
            s = i.Objects.Model,
            l = this;
          o.forEach(function (e) {
            const t = s[e.ID];
            l.setLookAtProperties(e, t);
            a.get(e.ID).parents.forEach(function (t) {
              const n = o.get(t.ID);
              void 0 !== n && n.add(e);
            }),
              null === e.parent && c.add(e);
          }),
            this.bindSkeleton(e.skeletons, t, o),
            this.createAmbientLight(),
            c.traverse(function (e) {
              if (e.userData.transformData) {
                e.parent &&
                  ((e.userData.transformData.parentMatrix = e.parent.matrix),
                  (e.userData.transformData.parentMatrixWorld = e.parent.matrixWorld));
                const t = A(e.userData.transformData);
                e.applyMatrix4(t), e.updateWorldMatrix();
              }
            });
          const h = new d().parse();
          1 === c.children.length &&
            c.children[0].isGroup &&
            ((c.children[0].animations = h), (c = c.children[0])),
            (c.animations = h);
        }
        parseModels(e, t, n) {
          const o = new Map(),
            s = i.Objects.Model;
          for (const i in s) {
            const c = parseInt(i),
              l = s[i],
              h = a.get(c);
            let u = this.buildSkeleton(h, e, c, l.attrName);
            if (!u) {
              switch (l.attrType) {
                case 'Camera':
                  u = this.createCamera(h);
                  break;
                case 'Light':
                  u = this.createLight(h);
                  break;
                case 'Mesh':
                  u = this.createMesh(h, t, n);
                  break;
                case 'NurbsCurve':
                  u = this.createCurve(h, t);
                  break;
                case 'LimbNode':
                case 'Root':
                  u = new r.Bone();
                  break;
                case 'Null':
                default:
                  u = new r.Group();
              }
              (u.name = l.attrName ? r.PropertyBinding.sanitizeNodeName(l.attrName) : ''),
                (u.ID = c);
            }
            this.getTransformData(u, l), o.set(c, u);
          }
          return o;
        }
        buildSkeleton(e, t, n, o) {
          let s = null;
          return (
            e.parents.forEach(function (e) {
              for (const i in t) {
                const a = t[i];
                a.rawBones.forEach(function (t, i) {
                  if (t.ID === e.ID) {
                    const e = s;
                    (s = new r.Bone()),
                      s.matrixWorld.copy(t.transformLink),
                      (s.name = o ? r.PropertyBinding.sanitizeNodeName(o) : ''),
                      (s.ID = n),
                      (a.bones[i] = s),
                      null !== e && s.add(e);
                  }
                });
              }
            }),
            s
          );
        }
        createCamera(e) {
          let t, n;
          if (
            (e.children.forEach(function (e) {
              const t = i.Objects.NodeAttribute[e.ID];
              void 0 !== t && (n = t);
            }),
            void 0 === n)
          )
            t = new r.Object3D();
          else {
            let e = 0;
            void 0 !== n.CameraProjectionType && 1 === n.CameraProjectionType.value && (e = 1);
            let o = 1;
            void 0 !== n.NearPlane && (o = n.NearPlane.value / 1e3);
            let s = 1e3;
            void 0 !== n.FarPlane && (s = n.FarPlane.value / 1e3);
            let i = window.innerWidth,
              a = window.innerHeight;
            void 0 !== n.AspectWidth &&
              void 0 !== n.AspectHeight &&
              ((i = n.AspectWidth.value), (a = n.AspectHeight.value));
            const c = i / a;
            let l = 45;
            void 0 !== n.FieldOfView && (l = n.FieldOfView.value);
            const h = n.FocalLength ? n.FocalLength.value : null;
            switch (e) {
              case 0:
                (t = new r.PerspectiveCamera(l, c, o, s)), null !== h && t.setFocalLength(h);
                break;
              case 1:
                t = new r.OrthographicCamera(-i / 2, i / 2, a / 2, -a / 2, o, s);
                break;
              default:
                console.warn('THREE.FBXLoader: Unknown camera type ' + e + '.'),
                  (t = new r.Object3D());
            }
          }
          return t;
        }
        createLight(e) {
          let t, n;
          if (
            (e.children.forEach(function (e) {
              const t = i.Objects.NodeAttribute[e.ID];
              void 0 !== t && (n = t);
            }),
            void 0 === n)
          )
            t = new r.Object3D();
          else {
            let e;
            e = void 0 === n.LightType ? 0 : n.LightType.value;
            let o = 16777215;
            void 0 !== n.Color &&
              (o = new r.Color().fromArray(n.Color.value).convertSRGBToLinear());
            let s = void 0 === n.Intensity ? 1 : n.Intensity.value / 100;
            void 0 !== n.CastLightOnObject && 0 === n.CastLightOnObject.value && (s = 0);
            let i = 0;
            void 0 !== n.FarAttenuationEnd &&
              (i =
                void 0 !== n.EnableFarAttenuation && 0 === n.EnableFarAttenuation.value
                  ? 0
                  : n.FarAttenuationEnd.value);
            const a = 1;
            switch (e) {
              case 0:
                t = new r.PointLight(o, s, i, a);
                break;
              case 1:
                t = new r.DirectionalLight(o, s);
                break;
              case 2:
                let e = Math.PI / 3;
                void 0 !== n.InnerAngle && (e = r.MathUtils.degToRad(n.InnerAngle.value));
                let c = 0;
                void 0 !== n.OuterAngle &&
                  ((c = r.MathUtils.degToRad(n.OuterAngle.value)), (c = Math.max(c, 1))),
                  (t = new r.SpotLight(o, s, i, e, c, a));
                break;
              default:
                console.warn(
                  'THREE.FBXLoader: Unknown light type ' +
                    n.LightType.value +
                    ', defaulting to a PointLight.',
                ),
                  (t = new r.PointLight(o, s));
            }
            void 0 !== n.CastShadows && 1 === n.CastShadows.value && (t.castShadow = !0);
          }
          return t;
        }
        createMesh(e, t, n) {
          let o,
            s = null,
            i = null;
          const a = [];
          return (
            e.children.forEach(function (e) {
              t.has(e.ID) && (s = t.get(e.ID)), n.has(e.ID) && a.push(n.get(e.ID));
            }),
            a.length > 1
              ? (i = a)
              : a.length > 0
                ? (i = a[0])
                : ((i = new r.MeshPhongMaterial({ color: 13421772 })), a.push(i)),
            'color' in s.attributes &&
              a.forEach(function (e) {
                e.vertexColors = !0;
              }),
            s.FBX_Deformer
              ? ((o = new r.SkinnedMesh(s, i)), o.normalizeSkinWeights())
              : (o = new r.Mesh(s, i)),
            o
          );
        }
        createCurve(e, t) {
          const n = e.children.reduce(function (e, n) {
              return t.has(n.ID) && (e = t.get(n.ID)), e;
            }, null),
            o = new r.LineBasicMaterial({ color: 3342591, linewidth: 1 });
          return new r.Line(n, o);
        }
        getTransformData(e, t) {
          const n = {};
          'InheritType' in t && (n.inheritType = parseInt(t.InheritType.value)),
            (n.eulerOrder = 'RotationOrder' in t ? T(t.RotationOrder.value) : 'ZYX'),
            'Lcl_Translation' in t && (n.translation = t.Lcl_Translation.value),
            'PreRotation' in t && (n.preRotation = t.PreRotation.value),
            'Lcl_Rotation' in t && (n.rotation = t.Lcl_Rotation.value),
            'PostRotation' in t && (n.postRotation = t.PostRotation.value),
            'Lcl_Scaling' in t && (n.scale = t.Lcl_Scaling.value),
            'ScalingOffset' in t && (n.scalingOffset = t.ScalingOffset.value),
            'ScalingPivot' in t && (n.scalingPivot = t.ScalingPivot.value),
            'RotationOffset' in t && (n.rotationOffset = t.RotationOffset.value),
            'RotationPivot' in t && (n.rotationPivot = t.RotationPivot.value),
            (e.userData.transformData = n);
        }
        setLookAtProperties(e, t) {
          if ('LookAtProperty' in t) {
            a.get(e.ID).children.forEach(function (t) {
              if ('LookAtProperty' === t.relationship) {
                const n = i.Objects.Model[t.ID];
                if ('Lcl_Translation' in n) {
                  const t = n.Lcl_Translation.value;
                  void 0 !== e.target
                    ? (e.target.position.fromArray(t), c.add(e.target))
                    : e.lookAt(new r.Vector3().fromArray(t));
                }
              }
            });
          }
        }
        bindSkeleton(e, t, n) {
          const o = this.parsePoseNodes();
          for (const s in e) {
            const i = e[s];
            a.get(parseInt(i.ID)).parents.forEach(function (e) {
              if (t.has(e.ID)) {
                const t = e.ID;
                a.get(t).parents.forEach(function (e) {
                  if (n.has(e.ID)) {
                    n.get(e.ID).bind(new r.Skeleton(i.bones), o[e.ID]);
                  }
                });
              }
            });
          }
        }
        parsePoseNodes() {
          const e = {};
          if ('Pose' in i.Objects) {
            const t = i.Objects.Pose;
            for (const n in t)
              if ('BindPose' === t[n].attrType && t[n].NbPoseNodes > 0) {
                const o = t[n].PoseNode;
                Array.isArray(o)
                  ? o.forEach(function (t) {
                      e[t.Node] = new r.Matrix4().fromArray(t.Matrix.a);
                    })
                  : (e[o.Node] = new r.Matrix4().fromArray(o.Matrix.a));
              }
          }
          return e;
        }
        createAmbientLight() {
          if ('GlobalSettings' in i && 'AmbientColor' in i.GlobalSettings) {
            const e = i.GlobalSettings.AmbientColor.value,
              t = e[0],
              n = e[1],
              o = e[2];
            if (0 !== t || 0 !== n || 0 !== o) {
              const e = new r.Color(t, n, o).convertSRGBToLinear();
              c.add(new r.AmbientLight(e, 1));
            }
          }
        }
      }
      class u {
        constructor() {
          this.negativeMaterialIndices = !1;
        }
        parse(e) {
          const t = new Map();
          if ('Geometry' in i.Objects) {
            const n = i.Objects.Geometry;
            for (const r in n) {
              const o = a.get(parseInt(r)),
                s = this.parseGeometry(o, n[r], e);
              t.set(parseInt(r), s);
            }
          }
          return (
            !0 === this.negativeMaterialIndices &&
              console.warn(
                'THREE.FBXLoader: The FBX file contains invalid (negative) material indices. The asset might not render as expected.',
              ),
            t
          );
        }
        parseGeometry(e, t, n) {
          switch (t.attrType) {
            case 'Mesh':
              return this.parseMeshGeometry(e, t, n);
            case 'NurbsCurve':
              return this.parseNurbsGeometry(t);
          }
        }
        parseMeshGeometry(e, t, n) {
          const r = n.skeletons,
            o = [],
            s = e.parents.map(function (e) {
              return i.Objects.Model[e.ID];
            });
          if (0 === s.length) return;
          const a = e.children.reduce(function (e, t) {
            return void 0 !== r[t.ID] && (e = r[t.ID]), e;
          }, null);
          e.children.forEach(function (e) {
            void 0 !== n.morphTargets[e.ID] && o.push(n.morphTargets[e.ID]);
          });
          const c = s[0],
            l = {};
          'RotationOrder' in c && (l.eulerOrder = T(c.RotationOrder.value)),
            'InheritType' in c && (l.inheritType = parseInt(c.InheritType.value)),
            'GeometricTranslation' in c && (l.translation = c.GeometricTranslation.value),
            'GeometricRotation' in c && (l.rotation = c.GeometricRotation.value),
            'GeometricScaling' in c && (l.scale = c.GeometricScaling.value);
          const h = A(l);
          return this.genGeometry(t, a, o, h);
        }
        genGeometry(e, t, n, o) {
          const s = new r.BufferGeometry();
          e.attrName && (s.name = e.attrName);
          const i = this.parseGeoNode(e, t),
            a = this.genBuffers(i),
            c = new r.Float32BufferAttribute(a.vertex, 3);
          if (
            (c.applyMatrix4(o),
            s.setAttribute('position', c),
            a.colors.length > 0 &&
              s.setAttribute('color', new r.Float32BufferAttribute(a.colors, 3)),
            t &&
              (s.setAttribute('skinIndex', new r.Uint16BufferAttribute(a.weightsIndices, 4)),
              s.setAttribute('skinWeight', new r.Float32BufferAttribute(a.vertexWeights, 4)),
              (s.FBX_Deformer = t)),
            a.normal.length > 0)
          ) {
            const e = new r.Matrix3().getNormalMatrix(o),
              t = new r.Float32BufferAttribute(a.normal, 3);
            t.applyNormalMatrix(e), s.setAttribute('normal', t);
          }
          if (
            (a.uvs.forEach(function (e, t) {
              let n = 'uv' + (t + 1).toString();
              0 === t && (n = 'uv'), s.setAttribute(n, new r.Float32BufferAttribute(a.uvs[t], 2));
            }),
            i.material && 'AllSame' !== i.material.mappingType)
          ) {
            let e = a.materialIndex[0],
              t = 0;
            if (
              (a.materialIndex.forEach(function (n, r) {
                n !== e && (s.addGroup(t, r - t, e), (e = n), (t = r));
              }),
              s.groups.length > 0)
            ) {
              const t = s.groups[s.groups.length - 1],
                n = t.start + t.count;
              n !== a.materialIndex.length && s.addGroup(n, a.materialIndex.length - n, e);
            }
            0 === s.groups.length && s.addGroup(0, a.materialIndex.length, a.materialIndex[0]);
          }
          return this.addMorphTargets(s, e, n, o), s;
        }
        parseGeoNode(e, t) {
          const n = {};
          if (
            ((n.vertexPositions = void 0 !== e.Vertices ? e.Vertices.a : []),
            (n.vertexIndices = void 0 !== e.PolygonVertexIndex ? e.PolygonVertexIndex.a : []),
            e.LayerElementColor && (n.color = this.parseVertexColors(e.LayerElementColor[0])),
            e.LayerElementMaterial &&
              (n.material = this.parseMaterialIndices(e.LayerElementMaterial[0])),
            e.LayerElementNormal && (n.normal = this.parseNormals(e.LayerElementNormal[0])),
            e.LayerElementUV)
          ) {
            n.uv = [];
            let t = 0;
            for (; e.LayerElementUV[t]; )
              e.LayerElementUV[t].UV && n.uv.push(this.parseUVs(e.LayerElementUV[t])), t++;
          }
          return (
            (n.weightTable = {}),
            null !== t &&
              ((n.skeleton = t),
              t.rawBones.forEach(function (e, t) {
                e.indices.forEach(function (r, o) {
                  void 0 === n.weightTable[r] && (n.weightTable[r] = []),
                    n.weightTable[r].push({ id: t, weight: e.weights[o] });
                });
              })),
            n
          );
        }
        genBuffers(e) {
          const t = {
            vertex: [],
            normal: [],
            colors: [],
            uvs: [],
            materialIndex: [],
            vertexWeights: [],
            weightsIndices: [],
          };
          let n = 0,
            r = 0,
            o = !1,
            s = [],
            i = [],
            a = [],
            c = [],
            l = [],
            h = [];
          const u = this;
          return (
            e.vertexIndices.forEach(function (d, p) {
              let f,
                m = !1;
              d < 0 && ((d ^= -1), (m = !0));
              let g = [],
                y = [];
              if ((s.push(3 * d, 3 * d + 1, 3 * d + 2), e.color)) {
                const t = b(p, n, d, e.color);
                a.push(t[0], t[1], t[2]);
              }
              if (e.skeleton) {
                if (
                  (void 0 !== e.weightTable[d] &&
                    e.weightTable[d].forEach(function (e) {
                      y.push(e.weight), g.push(e.id);
                    }),
                  y.length > 4)
                ) {
                  o ||
                    (console.warn(
                      'THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights.',
                    ),
                    (o = !0));
                  const e = [0, 0, 0, 0],
                    t = [0, 0, 0, 0];
                  y.forEach(function (n, r) {
                    let o = n,
                      s = g[r];
                    t.forEach(function (t, n, r) {
                      if (o > t) {
                        (r[n] = o), (o = t);
                        const i = e[n];
                        (e[n] = s), (s = i);
                      }
                    });
                  }),
                    (g = e),
                    (y = t);
                }
                for (; y.length < 4; ) y.push(0), g.push(0);
                for (let e = 0; e < 4; ++e) l.push(y[e]), h.push(g[e]);
              }
              if (e.normal) {
                const t = b(p, n, d, e.normal);
                i.push(t[0], t[1], t[2]);
              }
              e.material &&
                'AllSame' !== e.material.mappingType &&
                ((f = b(p, n, d, e.material)[0]),
                f < 0 && ((u.negativeMaterialIndices = !0), (f = 0))),
                e.uv &&
                  e.uv.forEach(function (e, t) {
                    const r = b(p, n, d, e);
                    void 0 === c[t] && (c[t] = []), c[t].push(r[0]), c[t].push(r[1]);
                  }),
                r++,
                m &&
                  (r > 4 &&
                    console.warn(
                      'THREE.FBXLoader: Polygons with more than four sides are not supported. Make sure to triangulate the geometry during export.',
                    ),
                  u.genFace(t, e, s, f, i, a, c, l, h, r),
                  n++,
                  (r = 0),
                  (s = []),
                  (i = []),
                  (a = []),
                  (c = []),
                  (l = []),
                  (h = []));
            }),
            t
          );
        }
        genFace(e, t, n, r, o, s, i, a, c, l) {
          for (let h = 2; h < l; h++)
            e.vertex.push(t.vertexPositions[n[0]]),
              e.vertex.push(t.vertexPositions[n[1]]),
              e.vertex.push(t.vertexPositions[n[2]]),
              e.vertex.push(t.vertexPositions[n[3 * (h - 1)]]),
              e.vertex.push(t.vertexPositions[n[3 * (h - 1) + 1]]),
              e.vertex.push(t.vertexPositions[n[3 * (h - 1) + 2]]),
              e.vertex.push(t.vertexPositions[n[3 * h]]),
              e.vertex.push(t.vertexPositions[n[3 * h + 1]]),
              e.vertex.push(t.vertexPositions[n[3 * h + 2]]),
              t.skeleton &&
                (e.vertexWeights.push(a[0]),
                e.vertexWeights.push(a[1]),
                e.vertexWeights.push(a[2]),
                e.vertexWeights.push(a[3]),
                e.vertexWeights.push(a[4 * (h - 1)]),
                e.vertexWeights.push(a[4 * (h - 1) + 1]),
                e.vertexWeights.push(a[4 * (h - 1) + 2]),
                e.vertexWeights.push(a[4 * (h - 1) + 3]),
                e.vertexWeights.push(a[4 * h]),
                e.vertexWeights.push(a[4 * h + 1]),
                e.vertexWeights.push(a[4 * h + 2]),
                e.vertexWeights.push(a[4 * h + 3]),
                e.weightsIndices.push(c[0]),
                e.weightsIndices.push(c[1]),
                e.weightsIndices.push(c[2]),
                e.weightsIndices.push(c[3]),
                e.weightsIndices.push(c[4 * (h - 1)]),
                e.weightsIndices.push(c[4 * (h - 1) + 1]),
                e.weightsIndices.push(c[4 * (h - 1) + 2]),
                e.weightsIndices.push(c[4 * (h - 1) + 3]),
                e.weightsIndices.push(c[4 * h]),
                e.weightsIndices.push(c[4 * h + 1]),
                e.weightsIndices.push(c[4 * h + 2]),
                e.weightsIndices.push(c[4 * h + 3])),
              t.color &&
                (e.colors.push(s[0]),
                e.colors.push(s[1]),
                e.colors.push(s[2]),
                e.colors.push(s[3 * (h - 1)]),
                e.colors.push(s[3 * (h - 1) + 1]),
                e.colors.push(s[3 * (h - 1) + 2]),
                e.colors.push(s[3 * h]),
                e.colors.push(s[3 * h + 1]),
                e.colors.push(s[3 * h + 2])),
              t.material &&
                'AllSame' !== t.material.mappingType &&
                (e.materialIndex.push(r), e.materialIndex.push(r), e.materialIndex.push(r)),
              t.normal &&
                (e.normal.push(o[0]),
                e.normal.push(o[1]),
                e.normal.push(o[2]),
                e.normal.push(o[3 * (h - 1)]),
                e.normal.push(o[3 * (h - 1) + 1]),
                e.normal.push(o[3 * (h - 1) + 2]),
                e.normal.push(o[3 * h]),
                e.normal.push(o[3 * h + 1]),
                e.normal.push(o[3 * h + 2])),
              t.uv &&
                t.uv.forEach(function (t, n) {
                  void 0 === e.uvs[n] && (e.uvs[n] = []),
                    e.uvs[n].push(i[n][0]),
                    e.uvs[n].push(i[n][1]),
                    e.uvs[n].push(i[n][2 * (h - 1)]),
                    e.uvs[n].push(i[n][2 * (h - 1) + 1]),
                    e.uvs[n].push(i[n][2 * h]),
                    e.uvs[n].push(i[n][2 * h + 1]);
                });
        }
        addMorphTargets(e, t, n, r) {
          if (0 === n.length) return;
          (e.morphTargetsRelative = !0), (e.morphAttributes.position = []);
          const o = this;
          n.forEach(function (n) {
            n.rawTargets.forEach(function (n) {
              const s = i.Objects.Geometry[n.geoID];
              void 0 !== s && o.genMorphGeometry(e, t, s, r, n.name);
            });
          });
        }
        genMorphGeometry(e, t, n, o, s) {
          const i = void 0 !== t.PolygonVertexIndex ? t.PolygonVertexIndex.a : [],
            a = void 0 !== n.Vertices ? n.Vertices.a : [],
            c = void 0 !== n.Indexes ? n.Indexes.a : [],
            l = 3 * e.attributes.position.count,
            h = new Float32Array(l);
          for (let e = 0; e < c.length; e++) {
            const t = 3 * c[e];
            (h[t] = a[3 * e]), (h[t + 1] = a[3 * e + 1]), (h[t + 2] = a[3 * e + 2]);
          }
          const u = { vertexIndices: i, vertexPositions: h },
            d = this.genBuffers(u),
            p = new r.Float32BufferAttribute(d.vertex, 3);
          (p.name = s || n.attrName), p.applyMatrix4(o), e.morphAttributes.position.push(p);
        }
        parseNormals(e) {
          const t = e.MappingInformationType,
            n = e.ReferenceInformationType,
            r = e.Normals.a;
          let o = [];
          return (
            'IndexToDirect' === n &&
              ('NormalIndex' in e
                ? (o = e.NormalIndex.a)
                : 'NormalsIndex' in e && (o = e.NormalsIndex.a)),
            { dataSize: 3, buffer: r, indices: o, mappingType: t, referenceType: n }
          );
        }
        parseUVs(e) {
          const t = e.MappingInformationType,
            n = e.ReferenceInformationType,
            r = e.UV.a;
          let o = [];
          return (
            'IndexToDirect' === n && (o = e.UVIndex.a),
            { dataSize: 2, buffer: r, indices: o, mappingType: t, referenceType: n }
          );
        }
        parseVertexColors(e) {
          const t = e.MappingInformationType,
            n = e.ReferenceInformationType,
            o = e.Colors.a;
          let s = [];
          'IndexToDirect' === n && (s = e.ColorIndex.a);
          for (let e = 0, t = new r.Color(); e < o.length; e += 4)
            t.fromArray(o, e).convertSRGBToLinear().toArray(o, e);
          return { dataSize: 4, buffer: o, indices: s, mappingType: t, referenceType: n };
        }
        parseMaterialIndices(e) {
          const t = e.MappingInformationType,
            n = e.ReferenceInformationType;
          if ('NoMappingInformation' === t)
            return {
              dataSize: 1,
              buffer: [0],
              indices: [0],
              mappingType: 'AllSame',
              referenceType: n,
            };
          const r = e.Materials.a,
            o = [];
          for (let e = 0; e < r.length; ++e) o.push(e);
          return { dataSize: 1, buffer: r, indices: o, mappingType: t, referenceType: n };
        }
        parseNurbsGeometry(e) {
          const t = parseInt(e.Order);
          if (isNaN(t))
            return (
              console.error(
                'THREE.FBXLoader: Invalid Order %s given for geometry ID: %s',
                e.Order,
                e.id,
              ),
              new r.BufferGeometry()
            );
          const n = t - 1,
            o = e.KnotVector.a,
            i = [],
            a = e.Points.a;
          for (let e = 0, t = a.length; e < t; e += 4) i.push(new r.Vector4().fromArray(a, e));
          let c, l;
          if ('Closed' === e.Form) i.push(i[0]);
          else if ('Periodic' === e.Form) {
            (c = n), (l = o.length - 1 - c);
            for (let e = 0; e < n; ++e) i.push(i[e]);
          }
          const h = new s.NURBSCurve(n, o, i, c, l).getPoints(12 * i.length);
          return new r.BufferGeometry().setFromPoints(h);
        }
      }
      class d {
        parse() {
          const e = [],
            t = this.parseClips();
          if (void 0 !== t)
            for (const n in t) {
              const r = t[n],
                o = this.addClip(r);
              e.push(o);
            }
          return e;
        }
        parseClips() {
          if (void 0 === i.Objects.AnimationCurve) return;
          const e = this.parseAnimationCurveNodes();
          this.parseAnimationCurves(e);
          const t = this.parseAnimationLayers(e);
          return this.parseAnimStacks(t);
        }
        parseAnimationCurveNodes() {
          const e = i.Objects.AnimationCurveNode,
            t = new Map();
          for (const n in e) {
            const r = e[n];
            if (null !== r.attrName.match(/S|R|T|DeformPercent/)) {
              const e = { id: r.id, attr: r.attrName, curves: {} };
              t.set(e.id, e);
            }
          }
          return t;
        }
        parseAnimationCurves(e) {
          const t = i.Objects.AnimationCurve;
          for (const n in t) {
            const r = { id: t[n].id, times: t[n].KeyTime.a.map(v), values: t[n].KeyValueFloat.a },
              o = a.get(r.id);
            if (void 0 !== o) {
              const t = o.parents[0].ID,
                n = o.parents[0].relationship;
              n.match(/X/)
                ? (e.get(t).curves.x = r)
                : n.match(/Y/)
                  ? (e.get(t).curves.y = r)
                  : n.match(/Z/)
                    ? (e.get(t).curves.z = r)
                    : n.match(/DeformPercent/) && e.has(t) && (e.get(t).curves.morph = r);
            }
          }
        }
        parseAnimationLayers(e) {
          const t = i.Objects.AnimationLayer,
            n = new Map();
          for (const o in t) {
            const t = [],
              s = a.get(parseInt(o));
            if (void 0 !== s) {
              s.children.forEach(function (n, o) {
                if (e.has(n.ID)) {
                  const s = e.get(n.ID);
                  if (void 0 !== s.curves.x || void 0 !== s.curves.y || void 0 !== s.curves.z) {
                    if (void 0 === t[o]) {
                      const e = a.get(n.ID).parents.filter(function (e) {
                        return void 0 !== e.relationship;
                      })[0].ID;
                      if (void 0 !== e) {
                        const s = i.Objects.Model[e.toString()];
                        if (void 0 === s)
                          return void console.warn(
                            'THREE.FBXLoader: Encountered a unused curve.',
                            n,
                          );
                        const a = {
                          modelName: s.attrName
                            ? r.PropertyBinding.sanitizeNodeName(s.attrName)
                            : '',
                          ID: s.id,
                          initialPosition: [0, 0, 0],
                          initialRotation: [0, 0, 0],
                          initialScale: [1, 1, 1],
                        };
                        c.traverse(function (e) {
                          e.ID === s.id &&
                            ((a.transform = e.matrix),
                            e.userData.transformData &&
                              (a.eulerOrder = e.userData.transformData.eulerOrder));
                        }),
                          a.transform || (a.transform = new r.Matrix4()),
                          'PreRotation' in s && (a.preRotation = s.PreRotation.value),
                          'PostRotation' in s && (a.postRotation = s.PostRotation.value),
                          (t[o] = a);
                      }
                    }
                    t[o] && (t[o][s.attr] = s);
                  } else if (void 0 !== s.curves.morph) {
                    if (void 0 === t[o]) {
                      const e = a.get(n.ID).parents.filter(function (e) {
                          return void 0 !== e.relationship;
                        })[0].ID,
                        s = a.get(e).parents[0].ID,
                        c = a.get(s).parents[0].ID,
                        l = a.get(c).parents[0].ID,
                        h = i.Objects.Model[l],
                        u = {
                          modelName: h.attrName
                            ? r.PropertyBinding.sanitizeNodeName(h.attrName)
                            : '',
                          morphName: i.Objects.Deformer[e].attrName,
                        };
                      t[o] = u;
                    }
                    t[o][s.attr] = s;
                  }
                }
              }),
                n.set(parseInt(o), t);
            }
          }
          return n;
        }
        parseAnimStacks(e) {
          const t = i.Objects.AnimationStack,
            n = {};
          for (const r in t) {
            const o = a.get(parseInt(r)).children;
            o.length > 1 &&
              console.warn(
                'THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.',
              );
            const s = e.get(o[0].ID);
            n[r] = { name: t[r].attrName, layer: s };
          }
          return n;
        }
        addClip(e) {
          let t = [];
          const n = this;
          return (
            e.layer.forEach(function (e) {
              t = t.concat(n.generateTracks(e));
            }),
            new r.AnimationClip(e.name, -1, t)
          );
        }
        generateTracks(e) {
          const t = [];
          let n = new r.Vector3(),
            o = new r.Quaternion(),
            s = new r.Vector3();
          if (
            (e.transform && e.transform.decompose(n, o, s),
            (n = n.toArray()),
            (o = new r.Euler().setFromQuaternion(o, e.eulerOrder).toArray()),
            (s = s.toArray()),
            void 0 !== e.T && Object.keys(e.T.curves).length > 0)
          ) {
            const r = this.generateVectorTrack(e.modelName, e.T.curves, n, 'position');
            void 0 !== r && t.push(r);
          }
          if (void 0 !== e.R && Object.keys(e.R.curves).length > 0) {
            const n = this.generateRotationTrack(
              e.modelName,
              e.R.curves,
              o,
              e.preRotation,
              e.postRotation,
              e.eulerOrder,
            );
            void 0 !== n && t.push(n);
          }
          if (void 0 !== e.S && Object.keys(e.S.curves).length > 0) {
            const n = this.generateVectorTrack(e.modelName, e.S.curves, s, 'scale');
            void 0 !== n && t.push(n);
          }
          if (void 0 !== e.DeformPercent) {
            const n = this.generateMorphTrack(e);
            void 0 !== n && t.push(n);
          }
          return t;
        }
        generateVectorTrack(e, t, n, o) {
          const s = this.getTimesForAllAxes(t),
            i = this.getKeyframeTrackValues(s, t, n);
          return new r.VectorKeyframeTrack(e + '.' + o, s, i);
        }
        generateRotationTrack(e, t, n, o, s, i) {
          void 0 !== t.x &&
            (this.interpolateRotations(t.x), (t.x.values = t.x.values.map(r.MathUtils.degToRad))),
            void 0 !== t.y &&
              (this.interpolateRotations(t.y), (t.y.values = t.y.values.map(r.MathUtils.degToRad))),
            void 0 !== t.z &&
              (this.interpolateRotations(t.z), (t.z.values = t.z.values.map(r.MathUtils.degToRad)));
          const a = this.getTimesForAllAxes(t),
            c = this.getKeyframeTrackValues(a, t, n);
          void 0 !== o &&
            ((o = o.map(r.MathUtils.degToRad)).push(i),
            (o = new r.Euler().fromArray(o)),
            (o = new r.Quaternion().setFromEuler(o))),
            void 0 !== s &&
              ((s = s.map(r.MathUtils.degToRad)).push(i),
              (s = new r.Euler().fromArray(s)),
              (s = new r.Quaternion().setFromEuler(s).invert()));
          const l = new r.Quaternion(),
            h = new r.Euler(),
            u = [];
          for (let e = 0; e < c.length; e += 3)
            h.set(c[e], c[e + 1], c[e + 2], i),
              l.setFromEuler(h),
              void 0 !== o && l.premultiply(o),
              void 0 !== s && l.multiply(s),
              l.toArray(u, (e / 3) * 4);
          return new r.QuaternionKeyframeTrack(e + '.quaternion', a, u);
        }
        generateMorphTrack(e) {
          const t = e.DeformPercent.curves.morph,
            n = t.values.map(function (e) {
              return e / 100;
            }),
            o = c.getObjectByName(e.modelName).morphTargetDictionary[e.morphName];
          return new r.NumberKeyframeTrack(
            e.modelName + '.morphTargetInfluences[' + o + ']',
            t.times,
            n,
          );
        }
        getTimesForAllAxes(e) {
          let t = [];
          if (
            (void 0 !== e.x && (t = t.concat(e.x.times)),
            void 0 !== e.y && (t = t.concat(e.y.times)),
            void 0 !== e.z && (t = t.concat(e.z.times)),
            (t = t.sort(function (e, t) {
              return e - t;
            })),
            t.length > 1)
          ) {
            let e = 1,
              n = t[0];
            for (let r = 1; r < t.length; r++) {
              const o = t[r];
              o !== n && ((t[e] = o), (n = o), e++);
            }
            t = t.slice(0, e);
          }
          return t;
        }
        getKeyframeTrackValues(e, t, n) {
          const r = n,
            o = [];
          let s = -1,
            i = -1,
            a = -1;
          return (
            e.forEach(function (e) {
              if (
                (t.x && (s = t.x.times.indexOf(e)),
                t.y && (i = t.y.times.indexOf(e)),
                t.z && (a = t.z.times.indexOf(e)),
                -1 !== s)
              ) {
                const e = t.x.values[s];
                o.push(e), (r[0] = e);
              } else o.push(r[0]);
              if (-1 !== i) {
                const e = t.y.values[i];
                o.push(e), (r[1] = e);
              } else o.push(r[1]);
              if (-1 !== a) {
                const e = t.z.values[a];
                o.push(e), (r[2] = e);
              } else o.push(r[2]);
            }),
            o
          );
        }
        interpolateRotations(e) {
          for (let t = 1; t < e.values.length; t++) {
            const n = e.values[t - 1],
              r = e.values[t] - n,
              o = Math.abs(r);
            if (o >= 180) {
              const s = o / 180,
                i = r / s;
              let a = n + i;
              const c = e.times[t - 1],
                l = (e.times[t] - c) / s;
              let h = c + l;
              const u = [],
                d = [];
              for (; h < e.times[t]; ) u.push(h), (h += l), d.push(a), (a += i);
              (e.times = I(e.times, t, u)), (e.values = I(e.values, t, d));
            }
          }
        }
      }
      class p {
        getPrevNode() {
          return this.nodeStack[this.currentIndent - 2];
        }
        getCurrentNode() {
          return this.nodeStack[this.currentIndent - 1];
        }
        getCurrentProp() {
          return this.currentProp;
        }
        pushStack(e) {
          this.nodeStack.push(e), (this.currentIndent += 1);
        }
        popStack() {
          this.nodeStack.pop(), (this.currentIndent -= 1);
        }
        setCurrentProp(e, t) {
          (this.currentProp = e), (this.currentPropName = t);
        }
        parse(e) {
          (this.currentIndent = 0),
            (this.allNodes = new g()),
            (this.nodeStack = []),
            (this.currentProp = []),
            (this.currentPropName = '');
          const t = this,
            n = e.split(/[\r\n]+/);
          return (
            n.forEach(function (e, r) {
              const o = e.match(/^[\s\t]*;/),
                s = e.match(/^[\s\t]*$/);
              if (o || s) return;
              const i = e.match('^\\t{' + t.currentIndent + '}(\\w+):(.*){', ''),
                a = e.match('^\\t{' + t.currentIndent + '}(\\w+):[\\s\\t\\r\\n](.*)'),
                c = e.match('^\\t{' + (t.currentIndent - 1) + '}}');
              i
                ? t.parseNodeBegin(e, i)
                : a
                  ? t.parseNodeProperty(e, a, n[++r])
                  : c
                    ? t.popStack()
                    : e.match(/^[^\s\t}]/) && t.parseNodePropertyContinued(e);
            }),
            this.allNodes
          );
        }
        parseNodeBegin(e, t) {
          const n = t[1].trim().replace(/^"/, '').replace(/"$/, ''),
            r = t[2].split(',').map(function (e) {
              return e.trim().replace(/^"/, '').replace(/"$/, '');
            }),
            o = { name: n },
            s = this.parseNodeAttr(r),
            i = this.getCurrentNode();
          0 === this.currentIndent
            ? this.allNodes.add(n, o)
            : n in i
              ? ('PoseNode' === n
                  ? i.PoseNode.push(o)
                  : void 0 !== i[n].id && ((i[n] = {}), (i[n][i[n].id] = i[n])),
                '' !== s.id && (i[n][s.id] = o))
              : 'number' == typeof s.id
                ? ((i[n] = {}), (i[n][s.id] = o))
                : 'Properties70' !== n && (i[n] = 'PoseNode' === n ? [o] : o),
            'number' == typeof s.id && (o.id = s.id),
            '' !== s.name && (o.attrName = s.name),
            '' !== s.type && (o.attrType = s.type),
            this.pushStack(o);
        }
        parseNodeAttr(e) {
          let t = e[0];
          '' !== e[0] && ((t = parseInt(e[0])), isNaN(t) && (t = e[0]));
          let n = '',
            r = '';
          return (
            e.length > 1 && ((n = e[1].replace(/^(\w+)::/, '')), (r = e[2])),
            { id: t, name: n, type: r }
          );
        }
        parseNodeProperty(e, t, n) {
          let r = t[1].replace(/^"/, '').replace(/"$/, '').trim(),
            o = t[2].replace(/^"/, '').replace(/"$/, '').trim();
          'Content' === r && ',' === o && (o = n.replace(/"/g, '').replace(/,$/, '').trim());
          const s = this.getCurrentNode();
          if ('Properties70' !== s.name) {
            if ('C' === r) {
              const e = o.split(',').slice(1),
                t = parseInt(e[0]),
                n = parseInt(e[1]);
              let i = o.split(',').slice(3);
              (i = i.map(function (e) {
                return e.trim().replace(/^"/, '');
              })),
                (r = 'connections'),
                (o = [t, n]),
                (function (e, t) {
                  for (let n = 0, r = e.length, o = t.length; n < o; n++, r++) e[r] = t[n];
                })(o, i),
                void 0 === s[r] && (s[r] = []);
            }
            'Node' === r && (s.id = o),
              r in s && Array.isArray(s[r]) ? s[r].push(o) : 'a' !== r ? (s[r] = o) : (s.a = o),
              this.setCurrentProp(s, r),
              'a' === r && ',' !== o.slice(-1) && (s.a = k(o));
          } else this.parseNodeSpecialProperty(e, r, o);
        }
        parseNodePropertyContinued(e) {
          const t = this.getCurrentNode();
          (t.a += e), ',' !== e.slice(-1) && (t.a = k(t.a));
        }
        parseNodeSpecialProperty(e, t, n) {
          const r = n.split('",').map(function (e) {
              return e.trim().replace(/^\"/, '').replace(/\s/, '_');
            }),
            o = r[0],
            s = r[1],
            i = r[2],
            a = r[3];
          let c = r[4];
          switch (s) {
            case 'int':
            case 'enum':
            case 'bool':
            case 'ULongLong':
            case 'double':
            case 'Number':
            case 'FieldOfView':
              c = parseFloat(c);
              break;
            case 'Color':
            case 'ColorRGB':
            case 'Vector3D':
            case 'Lcl_Translation':
            case 'Lcl_Rotation':
            case 'Lcl_Scaling':
              c = k(c);
          }
          (this.getPrevNode()[o] = { type: s, type2: i, flag: a, value: c }),
            this.setCurrentProp(this.getPrevNode(), o);
        }
      }
      class f {
        parse(e) {
          const t = new m(e);
          t.skip(23);
          const n = t.getUint32();
          if (n < 6400)
            throw new Error('THREE.FBXLoader: FBX version not supported, FileVersion: ' + n);
          const r = new g();
          for (; !this.endOfContent(t); ) {
            const e = this.parseNode(t, n);
            null !== e && r.add(e.name, e);
          }
          return r;
        }
        endOfContent(e) {
          return e.size() % 16 == 0
            ? ((e.getOffset() + 160 + 16) & -16) >= e.size()
            : e.getOffset() + 160 + 16 >= e.size();
        }
        parseNode(e, t) {
          const n = {},
            r = t >= 7500 ? e.getUint64() : e.getUint32(),
            o = t >= 7500 ? e.getUint64() : e.getUint32();
          t >= 7500 ? e.getUint64() : e.getUint32();
          const s = e.getUint8(),
            i = e.getString(s);
          if (0 === r) return null;
          const a = [];
          for (let t = 0; t < o; t++) a.push(this.parseProperty(e));
          const c = a.length > 0 ? a[0] : '',
            l = a.length > 1 ? a[1] : '',
            h = a.length > 2 ? a[2] : '';
          for (n.singleProperty = 1 === o && e.getOffset() === r; r > e.getOffset(); ) {
            const r = this.parseNode(e, t);
            null !== r && this.parseSubNode(i, n, r);
          }
          return (
            (n.propertyList = a),
            'number' == typeof c && (n.id = c),
            '' !== l && (n.attrName = l),
            '' !== h && (n.attrType = h),
            '' !== i && (n.name = i),
            n
          );
        }
        parseSubNode(e, t, n) {
          if (!0 === n.singleProperty) {
            const e = n.propertyList[0];
            Array.isArray(e) ? ((t[n.name] = n), (n.a = e)) : (t[n.name] = e);
          } else if ('Connections' === e && 'C' === n.name) {
            const e = [];
            n.propertyList.forEach(function (t, n) {
              0 !== n && e.push(t);
            }),
              void 0 === t.connections && (t.connections = []),
              t.connections.push(e);
          } else if ('Properties70' === n.name) {
            Object.keys(n).forEach(function (e) {
              t[e] = n[e];
            });
          } else if ('Properties70' === e && 'P' === n.name) {
            let e = n.propertyList[0],
              r = n.propertyList[1];
            const o = n.propertyList[2],
              s = n.propertyList[3];
            let i;
            0 === e.indexOf('Lcl ') && (e = e.replace('Lcl ', 'Lcl_')),
              0 === r.indexOf('Lcl ') && (r = r.replace('Lcl ', 'Lcl_')),
              (i =
                'Color' === r ||
                'ColorRGB' === r ||
                'Vector' === r ||
                'Vector3D' === r ||
                0 === r.indexOf('Lcl_')
                  ? [n.propertyList[4], n.propertyList[5], n.propertyList[6]]
                  : n.propertyList[4]),
              (t[e] = { type: r, type2: o, flag: s, value: i });
          } else
            void 0 === t[n.name]
              ? 'number' == typeof n.id
                ? ((t[n.name] = {}), (t[n.name][n.id] = n))
                : (t[n.name] = n)
              : 'PoseNode' === n.name
                ? (Array.isArray(t[n.name]) || (t[n.name] = [t[n.name]]), t[n.name].push(n))
                : void 0 === t[n.name][n.id] && (t[n.name][n.id] = n);
        }
        parseProperty(e) {
          const t = e.getString(1);
          let n;
          switch (t) {
            case 'C':
              return e.getBoolean();
            case 'D':
              return e.getFloat64();
            case 'F':
              return e.getFloat32();
            case 'I':
              return e.getInt32();
            case 'L':
              return e.getInt64();
            case 'R':
              return (n = e.getUint32()), e.getArrayBuffer(n);
            case 'S':
              return (n = e.getUint32()), e.getString(n);
            case 'Y':
              return e.getInt16();
            case 'b':
            case 'c':
            case 'd':
            case 'f':
            case 'i':
            case 'l':
              const r = e.getUint32(),
                s = e.getUint32(),
                i = e.getUint32();
              if (0 === s)
                switch (t) {
                  case 'b':
                  case 'c':
                    return e.getBooleanArray(r);
                  case 'd':
                    return e.getFloat64Array(r);
                  case 'f':
                    return e.getFloat32Array(r);
                  case 'i':
                    return e.getInt32Array(r);
                  case 'l':
                    return e.getInt64Array(r);
                }
              const a = o.HT(new Uint8Array(e.getArrayBuffer(i))),
                c = new m(a.buffer);
              switch (t) {
                case 'b':
                case 'c':
                  return c.getBooleanArray(r);
                case 'd':
                  return c.getFloat64Array(r);
                case 'f':
                  return c.getFloat32Array(r);
                case 'i':
                  return c.getInt32Array(r);
                case 'l':
                  return c.getInt64Array(r);
              }
              break;
            default:
              throw new Error('THREE.FBXLoader: Unknown property type ' + t);
          }
        }
      }
      class m {
        constructor(e, t) {
          (this.dv = new DataView(e)),
            (this.offset = 0),
            (this.littleEndian = void 0 === t || t),
            (this._textDecoder = new TextDecoder());
        }
        getOffset() {
          return this.offset;
        }
        size() {
          return this.dv.buffer.byteLength;
        }
        skip(e) {
          this.offset += e;
        }
        getBoolean() {
          return 1 == (1 & this.getUint8());
        }
        getBooleanArray(e) {
          const t = [];
          for (let n = 0; n < e; n++) t.push(this.getBoolean());
          return t;
        }
        getUint8() {
          const e = this.dv.getUint8(this.offset);
          return (this.offset += 1), e;
        }
        getInt16() {
          const e = this.dv.getInt16(this.offset, this.littleEndian);
          return (this.offset += 2), e;
        }
        getInt32() {
          const e = this.dv.getInt32(this.offset, this.littleEndian);
          return (this.offset += 4), e;
        }
        getInt32Array(e) {
          const t = [];
          for (let n = 0; n < e; n++) t.push(this.getInt32());
          return t;
        }
        getUint32() {
          const e = this.dv.getUint32(this.offset, this.littleEndian);
          return (this.offset += 4), e;
        }
        getInt64() {
          let e, t;
          return (
            this.littleEndian
              ? ((e = this.getUint32()), (t = this.getUint32()))
              : ((t = this.getUint32()), (e = this.getUint32())),
            2147483648 & t
              ? ((t = 4294967295 & ~t),
                (e = 4294967295 & ~e),
                4294967295 === e && (t = (t + 1) & 4294967295),
                (e = (e + 1) & 4294967295),
                -(4294967296 * t + e))
              : 4294967296 * t + e
          );
        }
        getInt64Array(e) {
          const t = [];
          for (let n = 0; n < e; n++) t.push(this.getInt64());
          return t;
        }
        getUint64() {
          let e, t;
          return (
            this.littleEndian
              ? ((e = this.getUint32()), (t = this.getUint32()))
              : ((t = this.getUint32()), (e = this.getUint32())),
            4294967296 * t + e
          );
        }
        getFloat32() {
          const e = this.dv.getFloat32(this.offset, this.littleEndian);
          return (this.offset += 4), e;
        }
        getFloat32Array(e) {
          const t = [];
          for (let n = 0; n < e; n++) t.push(this.getFloat32());
          return t;
        }
        getFloat64() {
          const e = this.dv.getFloat64(this.offset, this.littleEndian);
          return (this.offset += 8), e;
        }
        getFloat64Array(e) {
          const t = [];
          for (let n = 0; n < e; n++) t.push(this.getFloat64());
          return t;
        }
        getArrayBuffer(e) {
          const t = this.dv.buffer.slice(this.offset, this.offset + e);
          return (this.offset += e), t;
        }
        getString(e) {
          const t = this.offset;
          let n = new Uint8Array(this.dv.buffer, t, e);
          this.skip(e);
          const r = n.indexOf(0);
          return r >= 0 && (n = new Uint8Array(this.dv.buffer, t, r)), this._textDecoder.decode(n);
        }
      }
      class g {
        add(e, t) {
          this[e] = t;
        }
      }
      function y(e) {
        const t = e.match(/FBXVersion: (\d+)/);
        if (t) {
          return parseInt(t[1]);
        }
        throw new Error('THREE.FBXLoader: Cannot find the version number for the file given.');
      }
      function v(e) {
        return e / 46186158e3;
      }
      const w = [];
      function b(e, t, n, r) {
        let o;
        switch (r.mappingType) {
          case 'ByPolygonVertex':
            o = e;
            break;
          case 'ByPolygon':
            o = t;
            break;
          case 'ByVertice':
            o = n;
            break;
          case 'AllSame':
            o = r.indices[0];
            break;
          default:
            console.warn('THREE.FBXLoader: unknown attribute mapping type ' + r.mappingType);
        }
        'IndexToDirect' === r.referenceType && (o = r.indices[o]);
        const s = o * r.dataSize,
          i = s + r.dataSize;
        return (function (e, t, n, r) {
          for (let o = n, s = 0; o < r; o++, s++) e[s] = t[o];
          return e;
        })(w, r.buffer, s, i);
      }
      const x = new r.Euler(),
        M = new r.Vector3();
      function A(e) {
        const t = new r.Matrix4(),
          n = new r.Matrix4(),
          o = new r.Matrix4(),
          s = new r.Matrix4(),
          i = new r.Matrix4(),
          a = new r.Matrix4(),
          c = new r.Matrix4(),
          l = new r.Matrix4(),
          h = new r.Matrix4(),
          u = new r.Matrix4(),
          d = new r.Matrix4(),
          p = new r.Matrix4(),
          f = e.inheritType ? e.inheritType : 0;
        if ((e.translation && t.setPosition(M.fromArray(e.translation)), e.preRotation)) {
          const t = e.preRotation.map(r.MathUtils.degToRad);
          t.push(e.eulerOrder || r.Euler.DEFAULT_ORDER), n.makeRotationFromEuler(x.fromArray(t));
        }
        if (e.rotation) {
          const t = e.rotation.map(r.MathUtils.degToRad);
          t.push(e.eulerOrder || r.Euler.DEFAULT_ORDER), o.makeRotationFromEuler(x.fromArray(t));
        }
        if (e.postRotation) {
          const t = e.postRotation.map(r.MathUtils.degToRad);
          t.push(e.eulerOrder || r.Euler.DEFAULT_ORDER),
            s.makeRotationFromEuler(x.fromArray(t)),
            s.invert();
        }
        e.scale && i.scale(M.fromArray(e.scale)),
          e.scalingOffset && c.setPosition(M.fromArray(e.scalingOffset)),
          e.scalingPivot && a.setPosition(M.fromArray(e.scalingPivot)),
          e.rotationOffset && l.setPosition(M.fromArray(e.rotationOffset)),
          e.rotationPivot && h.setPosition(M.fromArray(e.rotationPivot)),
          e.parentMatrixWorld && (d.copy(e.parentMatrix), u.copy(e.parentMatrixWorld));
        const m = n.clone().multiply(o).multiply(s),
          g = new r.Matrix4();
        g.extractRotation(u);
        const y = new r.Matrix4();
        y.copyPosition(u);
        const v = y.clone().invert().multiply(u),
          w = g.clone().invert().multiply(v),
          b = i,
          A = new r.Matrix4();
        if (0 === f) A.copy(g).multiply(m).multiply(w).multiply(b);
        else if (1 === f) A.copy(g).multiply(w).multiply(m).multiply(b);
        else {
          const e = new r.Matrix4().scale(new r.Vector3().setFromMatrixScale(d)).clone().invert(),
            t = w.clone().multiply(e);
          A.copy(g).multiply(m).multiply(t).multiply(b);
        }
        const T = h.clone().invert(),
          k = a.clone().invert();
        let N = t
          .clone()
          .multiply(l)
          .multiply(h)
          .multiply(n)
          .multiply(o)
          .multiply(s)
          .multiply(T)
          .multiply(c)
          .multiply(a)
          .multiply(i)
          .multiply(k);
        const I = new r.Matrix4().copyPosition(N),
          E = u.clone().multiply(I);
        return p.copyPosition(E), (N = p.clone().multiply(A)), N.premultiply(u.invert()), N;
      }
      function T(e) {
        const t = ['ZYX', 'YZX', 'XZY', 'ZXY', 'YXZ', 'XYZ'];
        return 6 === (e = e || 0)
          ? (console.warn(
              'THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect.',
            ),
            t[0])
          : t[e];
      }
      function k(e) {
        return e.split(',').map(function (e) {
          return parseFloat(e);
        });
      }
      function N(e, t, n) {
        return (
          void 0 === t && (t = 0),
          void 0 === n && (n = e.byteLength),
          new TextDecoder().decode(new Uint8Array(e, t, n))
        );
      }
      function I(e, t, n) {
        return e.slice(0, t).concat(n).concat(e.slice(t));
      }
    },
    36023: (e, t, n) => {
      n.r(t), n.d(t, { MTLLoader: () => o });
      var r = n(81396);
      class o extends r.Loader {
        constructor(e) {
          super(e);
        }
        load(e, t, n, o) {
          const s = this,
            i = '' === this.path ? r.LoaderUtils.extractUrlBase(e) : this.path,
            a = new r.FileLoader(this.manager);
          a.setPath(this.path),
            a.setRequestHeader(this.requestHeader),
            a.setWithCredentials(this.withCredentials),
            a.load(
              e,
              function (n) {
                try {
                  t(s.parse(n, i));
                } catch (t) {
                  o ? o(t) : console.error(t), s.manager.itemError(e);
                }
              },
              n,
              o,
            );
        }
        setMaterialOptions(e) {
          return (this.materialOptions = e), this;
        }
        parse(e, t) {
          const n = e.split('\n');
          let r = {};
          const o = /\s+/,
            i = {};
          for (let e = 0; e < n.length; e++) {
            let t = n[e];
            if (((t = t.trim()), 0 === t.length || '#' === t.charAt(0))) continue;
            const s = t.indexOf(' ');
            let a = s >= 0 ? t.substring(0, s) : t;
            a = a.toLowerCase();
            let c = s >= 0 ? t.substring(s + 1) : '';
            if (((c = c.trim()), 'newmtl' === a)) (r = { name: c }), (i[c] = r);
            else if ('ka' === a || 'kd' === a || 'ks' === a || 'ke' === a) {
              const e = c.split(o, 3);
              r[a] = [parseFloat(e[0]), parseFloat(e[1]), parseFloat(e[2])];
            } else r[a] = c;
          }
          const a = new s(this.resourcePath || t, this.materialOptions);
          return (
            a.setCrossOrigin(this.crossOrigin), a.setManager(this.manager), a.setMaterials(i), a
          );
        }
      }
      class s {
        constructor(e = '', t = {}) {
          (this.baseUrl = e),
            (this.options = t),
            (this.materialsInfo = {}),
            (this.materials = {}),
            (this.materialsArray = []),
            (this.nameLookup = {}),
            (this.crossOrigin = 'anonymous'),
            (this.side = void 0 !== this.options.side ? this.options.side : r.FrontSide),
            (this.wrap = void 0 !== this.options.wrap ? this.options.wrap : r.RepeatWrapping);
        }
        setCrossOrigin(e) {
          return (this.crossOrigin = e), this;
        }
        setManager(e) {
          this.manager = e;
        }
        setMaterials(e) {
          (this.materialsInfo = this.convert(e)),
            (this.materials = {}),
            (this.materialsArray = []),
            (this.nameLookup = {});
        }
        convert(e) {
          if (!this.options) return e;
          const t = {};
          for (const n in e) {
            const r = e[n],
              o = {};
            t[n] = o;
            for (const e in r) {
              let t = !0,
                n = r[e];
              const s = e.toLowerCase();
              switch (s) {
                case 'kd':
                case 'ka':
                case 'ks':
                  this.options &&
                    this.options.normalizeRGB &&
                    (n = [n[0] / 255, n[1] / 255, n[2] / 255]),
                    this.options &&
                      this.options.ignoreZeroRGBs &&
                      0 === n[0] &&
                      0 === n[1] &&
                      0 === n[2] &&
                      (t = !1);
              }
              t && (o[s] = n);
            }
          }
          return t;
        }
        preload() {
          for (const e in this.materialsInfo) this.create(e);
        }
        getIndex(e) {
          return this.nameLookup[e];
        }
        getAsArray() {
          let e = 0;
          for (const t in this.materialsInfo)
            (this.materialsArray[e] = this.create(t)), (this.nameLookup[t] = e), e++;
          return this.materialsArray;
        }
        create(e) {
          return void 0 === this.materials[e] && this.createMaterial_(e), this.materials[e];
        }
        createMaterial_(e) {
          const t = this,
            n = this.materialsInfo[e],
            o = { name: e, side: this.side };
          function s(e, n) {
            if (o[e]) return;
            const s = t.getTextureParams(n, o),
              i = t.loadTexture(
                ((a = t.baseUrl),
                'string' != typeof (c = s.url) || '' === c
                  ? ''
                  : /^https?:\/\//i.test(c)
                    ? c
                    : a + c),
              );
            var a, c;
            i.repeat.copy(s.scale),
              i.offset.copy(s.offset),
              (i.wrapS = t.wrap),
              (i.wrapT = t.wrap),
              ('map' !== e && 'emissiveMap' !== e) || (i.encoding = r.sRGBEncoding),
              (o[e] = i);
          }
          for (const e in n) {
            const t = n[e];
            let i;
            if ('' !== t)
              switch (e.toLowerCase()) {
                case 'kd':
                  o.color = new r.Color().fromArray(t).convertSRGBToLinear();
                  break;
                case 'ks':
                  o.specular = new r.Color().fromArray(t).convertSRGBToLinear();
                  break;
                case 'ke':
                  o.emissive = new r.Color().fromArray(t).convertSRGBToLinear();
                  break;
                case 'map_kd':
                  s('map', t);
                  break;
                case 'map_ks':
                  s('specularMap', t);
                  break;
                case 'map_ke':
                  s('emissiveMap', t);
                  break;
                case 'norm':
                  s('normalMap', t);
                  break;
                case 'map_bump':
                case 'bump':
                  s('bumpMap', t);
                  break;
                case 'map_d':
                  s('alphaMap', t), (o.transparent = !0);
                  break;
                case 'ns':
                  o.shininess = parseFloat(t);
                  break;
                case 'd':
                  (i = parseFloat(t)), i < 1 && ((o.opacity = i), (o.transparent = !0));
                  break;
                case 'tr':
                  (i = parseFloat(t)),
                    this.options && this.options.invertTrProperty && (i = 1 - i),
                    i > 0 && ((o.opacity = 1 - i), (o.transparent = !0));
              }
          }
          return (this.materials[e] = new r.MeshPhongMaterial(o)), this.materials[e];
        }
        getTextureParams(e, t) {
          const n = { scale: new r.Vector2(1, 1), offset: new r.Vector2(0, 0) },
            o = e.split(/\s+/);
          let s;
          return (
            (s = o.indexOf('-bm')),
            s >= 0 && ((t.bumpScale = parseFloat(o[s + 1])), o.splice(s, 2)),
            (s = o.indexOf('-s')),
            s >= 0 && (n.scale.set(parseFloat(o[s + 1]), parseFloat(o[s + 2])), o.splice(s, 4)),
            (s = o.indexOf('-o')),
            s >= 0 && (n.offset.set(parseFloat(o[s + 1]), parseFloat(o[s + 2])), o.splice(s, 4)),
            (n.url = o.join(' ').trim()),
            n
          );
        }
        loadTexture(e, t, n, o, s) {
          const i = void 0 !== this.manager ? this.manager : r.DefaultLoadingManager;
          let a = i.getHandler(e);
          null === a && (a = new r.TextureLoader(i)),
            a.setCrossOrigin && a.setCrossOrigin(this.crossOrigin);
          const c = a.load(e, n, o, s);
          return void 0 !== t && (c.mapping = t), c;
        }
      }
    },
    87011: (e, t, n) => {
      n.r(t), n.d(t, { OBJLoader: () => g });
      var r = n(81396);
      const o = /^[og]\s*(.+)?/,
        s = /^mtllib /,
        i = /^usemtl /,
        a = /^usemap /,
        c = /\s+/,
        l = new r.Vector3(),
        h = new r.Vector3(),
        u = new r.Vector3(),
        d = new r.Vector3(),
        p = new r.Vector3(),
        f = new r.Color();
      function m() {
        const e = {
          objects: [],
          object: {},
          vertices: [],
          normals: [],
          colors: [],
          uvs: [],
          materials: {},
          materialLibraries: [],
          startObject: function (e, t) {
            if (this.object && !1 === this.object.fromDeclaration)
              return (this.object.name = e), void (this.object.fromDeclaration = !1 !== t);
            const n =
              this.object && 'function' == typeof this.object.currentMaterial
                ? this.object.currentMaterial()
                : void 0;
            if (
              (this.object &&
                'function' == typeof this.object._finalize &&
                this.object._finalize(!0),
              (this.object = {
                name: e || '',
                fromDeclaration: !1 !== t,
                geometry: { vertices: [], normals: [], colors: [], uvs: [], hasUVIndices: !1 },
                materials: [],
                smooth: !0,
                startMaterial: function (e, t) {
                  const n = this._finalize(!1);
                  n && (n.inherited || n.groupCount <= 0) && this.materials.splice(n.index, 1);
                  const r = {
                    index: this.materials.length,
                    name: e || '',
                    mtllib: Array.isArray(t) && t.length > 0 ? t[t.length - 1] : '',
                    smooth: void 0 !== n ? n.smooth : this.smooth,
                    groupStart: void 0 !== n ? n.groupEnd : 0,
                    groupEnd: -1,
                    groupCount: -1,
                    inherited: !1,
                    clone: function (e) {
                      const t = {
                        index: 'number' == typeof e ? e : this.index,
                        name: this.name,
                        mtllib: this.mtllib,
                        smooth: this.smooth,
                        groupStart: 0,
                        groupEnd: -1,
                        groupCount: -1,
                        inherited: !1,
                      };
                      return (t.clone = this.clone.bind(t)), t;
                    },
                  };
                  return this.materials.push(r), r;
                },
                currentMaterial: function () {
                  if (this.materials.length > 0) return this.materials[this.materials.length - 1];
                },
                _finalize: function (e) {
                  const t = this.currentMaterial();
                  if (
                    (t &&
                      -1 === t.groupEnd &&
                      ((t.groupEnd = this.geometry.vertices.length / 3),
                      (t.groupCount = t.groupEnd - t.groupStart),
                      (t.inherited = !1)),
                    e && this.materials.length > 1)
                  )
                    for (let e = this.materials.length - 1; e >= 0; e--)
                      this.materials[e].groupCount <= 0 && this.materials.splice(e, 1);
                  return (
                    e &&
                      0 === this.materials.length &&
                      this.materials.push({ name: '', smooth: this.smooth }),
                    t
                  );
                },
              }),
              n && n.name && 'function' == typeof n.clone)
            ) {
              const e = n.clone(0);
              (e.inherited = !0), this.object.materials.push(e);
            }
            this.objects.push(this.object);
          },
          finalize: function () {
            this.object && 'function' == typeof this.object._finalize && this.object._finalize(!0);
          },
          parseVertexIndex: function (e, t) {
            const n = parseInt(e, 10);
            return 3 * (n >= 0 ? n - 1 : n + t / 3);
          },
          parseNormalIndex: function (e, t) {
            const n = parseInt(e, 10);
            return 3 * (n >= 0 ? n - 1 : n + t / 3);
          },
          parseUVIndex: function (e, t) {
            const n = parseInt(e, 10);
            return 2 * (n >= 0 ? n - 1 : n + t / 2);
          },
          addVertex: function (e, t, n) {
            const r = this.vertices,
              o = this.object.geometry.vertices;
            o.push(r[e + 0], r[e + 1], r[e + 2]),
              o.push(r[t + 0], r[t + 1], r[t + 2]),
              o.push(r[n + 0], r[n + 1], r[n + 2]);
          },
          addVertexPoint: function (e) {
            const t = this.vertices;
            this.object.geometry.vertices.push(t[e + 0], t[e + 1], t[e + 2]);
          },
          addVertexLine: function (e) {
            const t = this.vertices;
            this.object.geometry.vertices.push(t[e + 0], t[e + 1], t[e + 2]);
          },
          addNormal: function (e, t, n) {
            const r = this.normals,
              o = this.object.geometry.normals;
            o.push(r[e + 0], r[e + 1], r[e + 2]),
              o.push(r[t + 0], r[t + 1], r[t + 2]),
              o.push(r[n + 0], r[n + 1], r[n + 2]);
          },
          addFaceNormal: function (e, t, n) {
            const r = this.vertices,
              o = this.object.geometry.normals;
            l.fromArray(r, e),
              h.fromArray(r, t),
              u.fromArray(r, n),
              p.subVectors(u, h),
              d.subVectors(l, h),
              p.cross(d),
              p.normalize(),
              o.push(p.x, p.y, p.z),
              o.push(p.x, p.y, p.z),
              o.push(p.x, p.y, p.z);
          },
          addColor: function (e, t, n) {
            const r = this.colors,
              o = this.object.geometry.colors;
            void 0 !== r[e] && o.push(r[e + 0], r[e + 1], r[e + 2]),
              void 0 !== r[t] && o.push(r[t + 0], r[t + 1], r[t + 2]),
              void 0 !== r[n] && o.push(r[n + 0], r[n + 1], r[n + 2]);
          },
          addUV: function (e, t, n) {
            const r = this.uvs,
              o = this.object.geometry.uvs;
            o.push(r[e + 0], r[e + 1]), o.push(r[t + 0], r[t + 1]), o.push(r[n + 0], r[n + 1]);
          },
          addDefaultUV: function () {
            const e = this.object.geometry.uvs;
            e.push(0, 0), e.push(0, 0), e.push(0, 0);
          },
          addUVLine: function (e) {
            const t = this.uvs;
            this.object.geometry.uvs.push(t[e + 0], t[e + 1]);
          },
          addFace: function (e, t, n, r, o, s, i, a, c) {
            const l = this.vertices.length;
            let h = this.parseVertexIndex(e, l),
              u = this.parseVertexIndex(t, l),
              d = this.parseVertexIndex(n, l);
            if ((this.addVertex(h, u, d), this.addColor(h, u, d), void 0 !== i && '' !== i)) {
              const e = this.normals.length;
              (h = this.parseNormalIndex(i, e)),
                (u = this.parseNormalIndex(a, e)),
                (d = this.parseNormalIndex(c, e)),
                this.addNormal(h, u, d);
            } else this.addFaceNormal(h, u, d);
            if (void 0 !== r && '' !== r) {
              const e = this.uvs.length;
              (h = this.parseUVIndex(r, e)),
                (u = this.parseUVIndex(o, e)),
                (d = this.parseUVIndex(s, e)),
                this.addUV(h, u, d),
                (this.object.geometry.hasUVIndices = !0);
            } else this.addDefaultUV();
          },
          addPointGeometry: function (e) {
            this.object.geometry.type = 'Points';
            const t = this.vertices.length;
            for (let n = 0, r = e.length; n < r; n++) {
              const r = this.parseVertexIndex(e[n], t);
              this.addVertexPoint(r), this.addColor(r);
            }
          },
          addLineGeometry: function (e, t) {
            this.object.geometry.type = 'Line';
            const n = this.vertices.length,
              r = this.uvs.length;
            for (let t = 0, r = e.length; t < r; t++)
              this.addVertexLine(this.parseVertexIndex(e[t], n));
            for (let e = 0, n = t.length; e < n; e++) this.addUVLine(this.parseUVIndex(t[e], r));
          },
        };
        return e.startObject('', !1), e;
      }
      class g extends r.Loader {
        constructor(e) {
          super(e), (this.materials = null);
        }
        load(e, t, n, o) {
          const s = this,
            i = new r.FileLoader(this.manager);
          i.setPath(this.path),
            i.setRequestHeader(this.requestHeader),
            i.setWithCredentials(this.withCredentials),
            i.load(
              e,
              function (n) {
                try {
                  t(s.parse(n));
                } catch (t) {
                  o ? o(t) : console.error(t), s.manager.itemError(e);
                }
              },
              n,
              o,
            );
        }
        setMaterials(e) {
          return (this.materials = e), this;
        }
        parse(e) {
          const t = new m();
          -1 !== e.indexOf('\r\n') && (e = e.replace(/\r\n/g, '\n')),
            -1 !== e.indexOf('\\\n') && (e = e.replace(/\\\n/g, ''));
          const n = e.split('\n');
          let l = [];
          for (let e = 0, r = n.length; e < r; e++) {
            const r = n[e].trimStart();
            if (0 === r.length) continue;
            const h = r.charAt(0);
            if ('#' !== h)
              if ('v' === h) {
                const e = r.split(c);
                switch (e[0]) {
                  case 'v':
                    t.vertices.push(parseFloat(e[1]), parseFloat(e[2]), parseFloat(e[3])),
                      e.length >= 7
                        ? (f
                            .setRGB(parseFloat(e[4]), parseFloat(e[5]), parseFloat(e[6]))
                            .convertSRGBToLinear(),
                          t.colors.push(f.r, f.g, f.b))
                        : t.colors.push(void 0, void 0, void 0);
                    break;
                  case 'vn':
                    t.normals.push(parseFloat(e[1]), parseFloat(e[2]), parseFloat(e[3]));
                    break;
                  case 'vt':
                    t.uvs.push(parseFloat(e[1]), parseFloat(e[2]));
                }
              } else if ('f' === h) {
                const e = r.slice(1).trim().split(c),
                  n = [];
                for (let t = 0, r = e.length; t < r; t++) {
                  const r = e[t];
                  if (r.length > 0) {
                    const e = r.split('/');
                    n.push(e);
                  }
                }
                const o = n[0];
                for (let e = 1, r = n.length - 1; e < r; e++) {
                  const r = n[e],
                    s = n[e + 1];
                  t.addFace(o[0], r[0], s[0], o[1], r[1], s[1], o[2], r[2], s[2]);
                }
              } else if ('l' === h) {
                const e = r.substring(1).trim().split(' ');
                let n = [];
                const o = [];
                if (-1 === r.indexOf('/')) n = e;
                else
                  for (let t = 0, r = e.length; t < r; t++) {
                    const r = e[t].split('/');
                    '' !== r[0] && n.push(r[0]), '' !== r[1] && o.push(r[1]);
                  }
                t.addLineGeometry(n, o);
              } else if ('p' === h) {
                const e = r.slice(1).trim().split(' ');
                t.addPointGeometry(e);
              } else if (null !== (l = o.exec(r))) {
                const e = (' ' + l[0].slice(1).trim()).slice(1);
                t.startObject(e);
              } else if (i.test(r))
                t.object.startMaterial(r.substring(7).trim(), t.materialLibraries);
              else if (s.test(r)) t.materialLibraries.push(r.substring(7).trim());
              else if (a.test(r))
                console.warn(
                  'THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.',
                );
              else if ('s' === h) {
                if (((l = r.split(' ')), l.length > 1)) {
                  const e = l[1].trim().toLowerCase();
                  t.object.smooth = '0' !== e && 'off' !== e;
                } else t.object.smooth = !0;
                const e = t.object.currentMaterial();
                e && (e.smooth = t.object.smooth);
              } else {
                if ('\0' === r) continue;
                console.warn('THREE.OBJLoader: Unexpected line: "' + r + '"');
              }
          }
          t.finalize();
          const h = new r.Group();
          h.materialLibraries = [].concat(t.materialLibraries);
          if (!0 === !(1 === t.objects.length && 0 === t.objects[0].geometry.vertices.length))
            for (let e = 0, n = t.objects.length; e < n; e++) {
              const n = t.objects[e],
                o = n.geometry,
                s = n.materials,
                i = 'Line' === o.type,
                a = 'Points' === o.type;
              let c = !1;
              if (0 === o.vertices.length) continue;
              const l = new r.BufferGeometry();
              l.setAttribute('position', new r.Float32BufferAttribute(o.vertices, 3)),
                o.normals.length > 0 &&
                  l.setAttribute('normal', new r.Float32BufferAttribute(o.normals, 3)),
                o.colors.length > 0 &&
                  ((c = !0), l.setAttribute('color', new r.Float32BufferAttribute(o.colors, 3))),
                !0 === o.hasUVIndices &&
                  l.setAttribute('uv', new r.Float32BufferAttribute(o.uvs, 2));
              const u = [];
              for (let e = 0, n = s.length; e < n; e++) {
                const n = s[e],
                  o = n.name + '_' + n.smooth + '_' + c;
                let l = t.materials[o];
                if (null !== this.materials)
                  if (
                    ((l = this.materials.create(n.name)),
                    !i || !l || l instanceof r.LineBasicMaterial)
                  ) {
                    if (a && l && !(l instanceof r.PointsMaterial)) {
                      const e = new r.PointsMaterial({ size: 10, sizeAttenuation: !1 });
                      r.Material.prototype.copy.call(e, l),
                        e.color.copy(l.color),
                        (e.map = l.map),
                        (l = e);
                    }
                  } else {
                    const e = new r.LineBasicMaterial();
                    r.Material.prototype.copy.call(e, l), e.color.copy(l.color), (l = e);
                  }
                void 0 === l &&
                  ((l = i
                    ? new r.LineBasicMaterial()
                    : a
                      ? new r.PointsMaterial({ size: 1, sizeAttenuation: !1 })
                      : new r.MeshPhongMaterial()),
                  (l.name = n.name),
                  (l.flatShading = !n.smooth),
                  (l.vertexColors = c),
                  (t.materials[o] = l)),
                  u.push(l);
              }
              let d;
              if (u.length > 1) {
                for (let e = 0, t = s.length; e < t; e++) {
                  const t = s[e];
                  l.addGroup(t.groupStart, t.groupCount, e);
                }
                d = i ? new r.LineSegments(l, u) : a ? new r.Points(l, u) : new r.Mesh(l, u);
              } else
                d = i
                  ? new r.LineSegments(l, u[0])
                  : a
                    ? new r.Points(l, u[0])
                    : new r.Mesh(l, u[0]);
              (d.name = n.name), h.add(d);
            }
          else if (t.vertices.length > 0) {
            const e = new r.PointsMaterial({ size: 1, sizeAttenuation: !1 }),
              n = new r.BufferGeometry();
            n.setAttribute('position', new r.Float32BufferAttribute(t.vertices, 3)),
              t.colors.length > 0 &&
                void 0 !== t.colors[0] &&
                (n.setAttribute('color', new r.Float32BufferAttribute(t.colors, 3)),
                (e.vertexColors = !0));
            const o = new r.Points(n, e);
            h.add(o);
          }
          return h;
        }
      }
    },
  },
]);
