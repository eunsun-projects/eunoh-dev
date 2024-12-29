/*! For license information please see 423.js.LICENSE.txt */
(self.webpackChunkmp_webgl = self.webpackChunkmp_webgl || []).push([
  [423],
  {
    55228: (t, e, i) => {
      'use strict';
      i.d(e, { c: () => f });
      var s = i(81396),
        n = i(14778);
      class r extends s.Mesh {
        constructor(t, e) {
          super(),
            (this.type = 'Line'),
            (this.part = n.B.line),
            (this.computeLineDistances = (() => {
              const t = new s.Vector3(),
                e = new s.Vector3();
              return () => {
                const i = this.geometry,
                  n = i.attributes.instanceStart,
                  r = i.attributes.instanceEnd,
                  o = new Float32Array(2 * n.data.count);
                for (let i = 0, s = 0, a = n.data.count; i < a; i++, s += 2)
                  t.fromBufferAttribute(n, i),
                    e.fromBufferAttribute(r, i),
                    (o[s] = 0 === s ? 0 : o[s - 1]),
                    (o[s + 1] = o[s] + t.distanceTo(e));
                return (
                  this.instanceDistanceBuffer
                    ? (this.instanceDistanceBuffer.set(o, 0),
                      (this.instanceDistanceBuffer.needsUpdate = !0))
                    : ((this.instanceDistanceBuffer = new s.InstancedInterleavedBuffer(o, 2, 1)),
                      i.setAttribute(
                        'instanceDistanceStart',
                        new s.InterleavedBufferAttribute(this.instanceDistanceBuffer, 1, 0, !1),
                      ),
                      i.setAttribute(
                        'instanceDistanceEnd',
                        new s.InterleavedBufferAttribute(this.instanceDistanceBuffer, 1, 1, !1),
                      )),
                  this
                );
              };
            })()),
            (this.geometry = t),
            (this.material = e);
        }
        copy(t) {
          throw Error('not implemented');
        }
      }
      class o extends s.InstancedBufferGeometry {
        constructor() {
          super(), (this.type = 'LineSegmentsGeometry');
          this.setIndex([0, 2, 1, 2, 3, 1, 2, 4, 3, 4, 5, 3, 4, 6, 5, 6, 7, 5]),
            this.setAttribute(
              'position',
              new s.Float32BufferAttribute(
                [-1, 2, 0, 1, 2, 0, -1, 1, 0, 1, 1, 0, -1, 0, 0, 1, 0, 0, -1, -1, 0, 1, -1, 0],
                3,
              ),
            ),
            this.setAttribute(
              'uv',
              new s.Float32BufferAttribute(
                [0, 1, 0.5, 1, 0, 0.5, 0.5, 0.5, 0, 0, 0.5, 0, 0, 1, 0.5, 1],
                2,
              ),
            );
        }
        applyMatrix(t) {
          const e = this.attributes.instanceStart,
            i = this.attributes.instanceEnd;
          return (
            void 0 !== e &&
              void 0 !== i &&
              (e.applyMatrix4(t), i.applyMatrix4(t), (this.positionBuffer.needsUpdate = !0)),
            null !== this.boundingBox && this.computeBoundingBox(),
            null !== this.boundingSphere && this.computeBoundingSphere(),
            this
          );
        }
        setPositions(t) {
          let e;
          return (
            t instanceof Float32Array ? (e = t) : Array.isArray(t) && (e = new Float32Array(t)),
            e &&
              (this.positionBuffer
                ? (this.positionBuffer.set(e, 0), (this.positionBuffer.needsUpdate = !0))
                : ((this.positionBuffer = new s.InstancedInterleavedBuffer(e, 6, 1)),
                  this.setAttribute(
                    'instanceStart',
                    new s.InterleavedBufferAttribute(this.positionBuffer, 3, 0, !1),
                  ),
                  this.setAttribute(
                    'instanceEnd',
                    new s.InterleavedBufferAttribute(this.positionBuffer, 3, 3, !1),
                  )),
              this.computeBoundingBox(),
              this.computeBoundingSphere()),
            this
          );
        }
        setColors(t) {
          let e;
          return (
            t instanceof Float32Array ? (e = t) : Array.isArray(t) && (e = new Float32Array(t)),
            e &&
              (this.colorBuffer
                ? (this.colorBuffer.set(e, 0), (this.colorBuffer.needsUpdate = !0))
                : ((this.colorBuffer = new s.InstancedInterleavedBuffer(e, 6, 1)),
                  this.setAttribute(
                    'instanceColorStart',
                    new s.InterleavedBufferAttribute(this.colorBuffer, 3, 0, !1),
                  ),
                  this.setAttribute(
                    'instanceColorEnd',
                    new s.InterleavedBufferAttribute(this.colorBuffer, 3, 3, !1),
                  ))),
            this
          );
        }
        fromWireframeGeometry(t) {
          return this.setPositions(t.attributes.position.array), this;
        }
        fromEdgesGeometry(t) {
          return this.setPositions(t.attributes.position.array), this;
        }
        fromMesh(t) {
          return this.fromWireframeGeometry(new s.WireframeGeometry(t.geometry)), this;
        }
        fromLineSegements(t) {
          const e = t.geometry;
          return e instanceof s.BufferGeometry && this.setPositions(e.position.array), this;
        }
        computeBoundingBox() {
          this.boundingBox || (this.boundingBox = new s.Box3()),
            this.box || (this.box = new s.Box3());
          const t = this.attributes.instanceStart,
            e = this.attributes.instanceEnd;
          void 0 !== t &&
            void 0 !== e &&
            (this.boundingBox.setFromBufferAttribute(t),
            this.box.setFromBufferAttribute(e),
            this.boundingBox.union(this.box));
        }
        computeBoundingSphere() {
          this.tempVector || (this.tempVector = new s.Vector3()),
            this.boundingSphere || (this.boundingSphere = new s.Sphere()),
            this.boundingBox || this.computeBoundingBox();
          const t = this.attributes.instanceStart,
            e = this.attributes.instanceEnd;
          if (void 0 !== t && void 0 !== e) {
            const i = this.boundingSphere.center;
            this.boundingBox.getCenter(i);
            let s = 0;
            for (let n = 0, r = t.count; n < r; n++)
              this.tempVector.fromBufferAttribute(t, n),
                (s = Math.max(s, i.distanceToSquared(this.tempVector))),
                this.tempVector.fromBufferAttribute(e, n),
                (s = Math.max(s, i.distanceToSquared(this.tempVector)));
            (this.boundingSphere.radius = Math.sqrt(s)),
              isNaN(this.boundingSphere.radius) &&
                console.error(
                  'computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.',
                  this,
                );
          }
        }
      }
      class a extends o {
        constructor() {
          super(), (this.type = 'LineGeometry'), (this.isLineGeometry = !0);
        }
        setPositions(t) {
          const e = t.length - 3,
            i = new Float32Array(2 * e);
          for (let s = 0; s < e; s += 3)
            (i[2 * s] = t[s]),
              (i[2 * s + 1] = t[s + 1]),
              (i[2 * s + 2] = t[s + 2]),
              (i[2 * s + 3] = t[s + 3]),
              (i[2 * s + 4] = t[s + 4]),
              (i[2 * s + 5] = t[s + 5]);
          return o.prototype.setPositions.call(this, i), this;
        }
        setColors(t) {
          const e = t.length - 3,
            i = new Float32Array(2 * e);
          for (let s = 0; s < e; s += 3)
            (i[2 * s] = t[s]),
              (i[2 * s + 1] = t[s + 1]),
              (i[2 * s + 2] = t[s + 2]),
              (i[2 * s + 3] = t[s + 3]),
              (i[2 * s + 4] = t[s + 4]),
              (i[2 * s + 5] = t[s + 5]);
          return o.prototype.setColors.call(this, i), this;
        }
        fromLine(t) {
          throw new Error('LineGeometry.fromLine not converted to TS yet');
        }
        copy(t) {
          return this;
        }
      }
      var h = i(26059),
        c = i(12241);
      class d extends s.Mesh {
        constructor(t, e, i = c.V9.endpointSelected, s = c.V9.endpointDefault) {
          super(t, e),
            (this.selectedSize = i),
            (this.defaultSize = s),
            (this.currentSize = c.V9.endpointDefault),
            (this.currentSize = this.defaultSize),
            this.scale.set(c.Ey, c.Ey, c.Ey);
        }
        dispose() {
          this.material.dispose(), this.geometry.dispose();
        }
        billboardScale(t, e, i) {
          const s = (0, h.mY)(e, t, this.position, i, 0.5),
            n = Math.max(Math.min((1 / s) * this.currentSize, c.g4), c.Ey);
          this.scale.set(n, n, n);
        }
        updateSelected(t) {
          this.currentSize = t ? this.selectedSize : this.defaultSize;
        }
      }
      var l = i(72803),
        u = i(25565);
      class f {
        constructor(t, e, i, o, c) {
          (this.lineMaterial = i),
            (this.options = o),
            (this.endpointMaterial = c),
            (this.startPosition = new s.Vector3()),
            (this.endPosition = new s.Vector3()),
            (this.endpoints = !1),
            (this.isVisible = !0),
            (this.meshToLinePartMap = {}),
            (this.opacity = (t) => (
              this.endpointMaterial && this.endpointMaterial.setOpacity(t),
              this.lineMesh.material.setOpacity(t),
              this
            )),
            (this.updatePositions = (t, e) => (
              this.startPosition.copy(t),
              this.endPosition.copy(e),
              this.options.beforeUpdatePositions &&
                ((t = this.options.beforeUpdatePositions(t)),
                (e = this.options.beforeUpdatePositions(e))),
              this.lineMesh.geometry.setPositions([t.x, t.y, t.z, e.x, e.y, e.z]),
              this.endpoints &&
                (this.endMesh.position.copy(e),
                this.startMesh.position.copy(t),
                this.lastBillboardOptions && this.updateBillboard(this.lastBillboardOptions)),
              this.lineMesh.material.dashed && this.lineMesh.computeLineDistances(),
              this
            )),
            (this.updateBillboard = (t) => {
              if (
                this.endpoints &&
                (t.rotation &&
                  (this.endMesh.quaternion.copy(t.rotation),
                  this.startMesh.quaternion.copy(t.rotation)),
                t.position && t.projection && !(0, h.s1)(t.projection))
              ) {
                const e = this.lineMesh.material.resolution.y;
                this.endMesh.billboardScale(t.position, t.projection, e),
                  this.startMesh.billboardScale(t.position, t.projection, e);
              }
              return (this.lastBillboardOptions = t), this;
            }),
            (this.updateSelected = (t) => (
              this.lineMesh.material.updateSelected(t),
              this.endpoints &&
                (this.endMesh.material.updateHovered(t),
                this.endMesh.updateSelected(t),
                this.startMesh.updateSelected(t)),
              this
            )),
            (this.setRenderLayer = (t) => {
              this.children.forEach((e) => (e.layers.mask = t.mask));
            }),
            (this.setRenderOrder = (t) => {
              this.children.forEach((e) => (e.renderOrder = t));
            }),
            (this.updateResolution = (t, e) => (this.lineMesh.material.resolution.set(t, e), this)),
            (this.hide = () => {
              this.options.onHide && this.options.onHide(), (this.isVisible = !1);
            }),
            (this.show = () => {
              this.options.onShow && this.options.onShow(), (this.isVisible = !0);
            }),
            (this.toggle = (t) => (t ? this.show() : this.hide(), this)),
            (this.dispose = () => {
              this.options.onHide && this.options.onHide(),
                this.lineMesh.geometry.dispose(),
                this.lineMesh.material.dispose(),
                this.endMesh && this.endMesh.dispose(),
                this.startMesh && this.startMesh.dispose(),
                (this.meshToLinePartMap = {});
            }),
            (this.overrideLineMaterial = (t) => {
              this.lineMesh.material = t;
            }),
            (this.restoreLineMaterial = () => {
              this.lineMesh.material = this.lineMaterial;
            }),
            this.startPosition.copy(t),
            this.endPosition.copy(e),
            (this.lineMesh = new r(new a(), i)),
            (this.lineMesh.matrixAutoUpdate = !1),
            (this.lineMesh.part = n.B.line),
            (this.lineMesh.renderOrder = l.z.lines),
            (this.meshToLinePartMap[n.B.line] = this.lineMesh),
            c &&
              ((this.endpoints = !0),
              (this.endMesh = new d((0, u.fc)(), c)),
              (this.endMesh.part = n.B.end),
              (this.endMesh.renderOrder = l.z.endpoints),
              (this.meshToLinePartMap[n.B.end] = this.endMesh),
              (this.startMesh = new d((0, u.fc)(), c)),
              (this.startMesh.part = n.B.start),
              (this.startMesh.renderOrder = l.z.endpoints),
              (this.meshToLinePartMap[n.B.start] = this.startMesh)),
            this.updatePositions(this.startPosition, this.endPosition),
            this.updateSelected(!1);
        }
        get currentOpacity() {
          return this.lineMesh.material.getOpacity();
        }
        getMesh(t) {
          return this.meshToLinePartMap[t];
        }
        get children() {
          return Object.keys(this.meshToLinePartMap).map((t) => this.meshToLinePartMap[t]);
        }
        get visible() {
          return this.isVisible;
        }
      }
    },
    14778: (t, e, i) => {
      'use strict';
      var s;
      i.d(e, { B: () => s }),
        (function (t) {
          (t.line = 'line'), (t.start = 'start'), (t.end = 'end');
        })(s || (s = {}));
    },
    22770: (t, e, i) => {
      'use strict';
      i.r(e),
        i.d(e, { default: () => S, makeEndpointMaterial: () => y, makeLineMaterial: () => E });
      var s = i(933),
        n = i(4763),
        r = i(81396),
        o = i(55228),
        a = i(71472);
      var h;
      !(function (t) {
        (t[(t.LINE_DEFAULT = 0)] = 'LINE_DEFAULT'),
          (t[(t.LINE_HOVER = 1)] = 'LINE_HOVER'),
          (t[(t.END_DEFAULT = 2)] = 'END_DEFAULT'),
          (t[(t.END_HOVER = 3)] = 'END_HOVER');
      })(h || (h = {}));
      class c {
        constructor() {
          const t = (0, a.p)(
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAJ1BMVEUAAAD///////////////////////////////////////////////+uPUo5AAAADHRSTlMA4ZNBI+fLwLSGYE5aqgIgAAAAlUlEQVQoz2MAAy91mYNFSxjgwEjmDBAcVIbxPWPOgMHRKRA+c88ZKDhhABbYdgYOssEKchACx0BKPM4ggRagwBxkgZNAHTHIAkcNGJjOoAAFBkdUARGGNagCpxh0UAUOMdSgChxnkEEVOMhwBg1gCGBowTAUw1oMh2E4HcNzGN5HDyCMIMQIZPRowIgozKjEjGyM5AAACSg5ooJJElsAAAAASUVORK5CYII=',
            ),
            e = (0, a.p)(
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAPFBMVEUAAAD/AVL/AVL/AVL/AVL/AVL/AVL/AVL/AVL/AVL/AVL/AVL/////+fr/5er/0tv/ytX/iaH/dJL/cpA84uD/AAAAC3RSTlMA45NBI8vAtIZgTrS8MGcAAAC5SURBVDjLhVPtDoQgDBuICPKpvP+7Xs4t6LlL2j9GWtYCG91w0XqTkvE2OtJYrEkTxi4v2gWhpyS4n+1bUtgeRfY1/cG6z/3Ma8Ui/rP+6LWU2sd04RxBfs+WBe2UpXAZSP4jP3DIWb4m9ua1whI5w/XzC+xiHEWWtreg8XoUh5EVhnj469u1oF+EJ45QtaByCGKrogWFGSiAFjAkPCa8KHjV6LHgc6OGgS2Hmha2PR4cPHp4eOH4fwAGdiPh+RS0GAAAAABJRU5ErkJggg==',
            ),
            i = (0, a.p)(
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAIBAMAAABqq+CcAAAAD1BMVEUAAAD///////////////+PQt5oAAAABHRSTlMAy4AzqjrmZgAAABRJREFUCNdjAAMjERcXR2Uwc4AEAIn2CZHn9cAcAAAAAElFTkSuQmCC',
            ),
            s = (0, a.p)(
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAIBAMAAABqq+CcAAAAGFBMVEUAAAD/AVL/AVL/AVL/////AVL/r7//OWiicYg+AAAABHRSTlMAy4AzqjrmZgAAABlJREFUCNdjYGBgVgwtcwGC9FAhAyB3YAQAVg4X6a0jaXAAAAAASUVORK5CYII=',
            );
          (this.textures = {
            [h.LINE_DEFAULT]: i,
            [h.LINE_HOVER]: s,
            [h.END_DEFAULT]: t,
            [h.END_HOVER]: e,
          }),
            (i.minFilter = r.LinearFilter),
            (s.minFilter = r.LinearFilter),
            (t.minFilter = r.LinearFilter),
            (e.minFilter = r.LinearFilter);
        }
        get(t) {
          return this.textures[t];
        }
        dispose() {
          for (const t in this.textures) {
            const e = Number(t);
            this.get(e).dispose();
          }
        }
      }
      var d = i(91435);
      class l extends r.RawShaderMaterial {
        constructor(t, e, i) {
          const s = r.UniformsUtils.clone(d.T.endpoint.uniforms);
          super({
            fragmentShader: d.T.endpoint.fragmentShader,
            vertexShader: d.T.endpoint.vertexShader,
            uniforms: s,
            name: 'LineEndpointMaterial',
            transparent: !0,
            depthWrite: !1,
            depthTest: !0,
          }),
            (this.color = t),
            (this.defaultTex = e),
            (this.hoverTex = i),
            (this.uniforms.bg.value = e),
            this.uniforms.color.value.copy(this.color);
        }
        clone() {
          return new l(this.color, this.defaultTex, this.hoverTex).copy(this);
        }
        setOpacity(t) {
          this.uniforms && t !== this.uniforms.opacity.value && (this.uniforms.opacity.value = t);
        }
        getOpacity() {
          return this.uniforms.opacity.value;
        }
        updateHovered(t) {
          const e = t ? this.hoverTex : this.defaultTex;
          this.uniforms.bg.value !== e && (this.uniforms.bg.value = e);
        }
      }
      var u = i(12241);
      class f extends r.RawShaderMaterial {
        constructor(t, e, i, s = u.V9.lineSelected) {
          super(),
            (this.parameters = t),
            (this.hoverTexture = e),
            (this.defaultTexture = i),
            (this.selectedWidth = s),
            (this.type = 'LineMaterial'),
            (this.isLineMaterial = !0),
            (this.defaultWidth = u.V9.lineDefault),
            this.setValues({
              uniforms: r.UniformsUtils.clone(d.T.line.uniforms),
              vertexShader: d.T.line.vertexShader,
              fragmentShader: d.T.line.fragmentShader,
              transparent: !0,
              depthWrite: !1,
              depthTest: !0,
              opacity: 1,
            }),
            this.setValues(t),
            i && (this.mask = i),
            (this.defaultWidth = t && t.linewidth ? t.linewidth : u.V9.lineDefault);
        }
        updateSelected(t) {
          const e = t ? this.hoverTexture : this.defaultTexture;
          e &&
            this.mask !== e &&
            ((this.mask = e),
            t ? this.setLinewidth(this.selectedWidth) : this.setLinewidth(this.defaultWidth));
        }
        setLinewidth(t) {
          this.uniforms.linewidth || (this.uniforms = r.UniformsUtils.clone(d.T.line.uniforms)),
            this.getLinewidth() !== t && (this.uniforms.linewidth.value = t);
        }
        getLinewidth() {
          return this.uniforms.linewidth.value;
        }
        get color() {
          return this.uniforms.diffuse.value;
        }
        set color(t) {
          this.uniforms.diffuse.value = t;
        }
        getOpacity() {
          return this.uniforms.opacity.value;
        }
        setOpacity(t) {
          this.uniforms || (this.uniforms = r.UniformsUtils.clone(d.T.line.uniforms)),
            this.getOpacity() !== t && (this.uniforms.opacity.value = t);
        }
        get dashScale() {
          return this.uniforms.dashScale.value;
        }
        set dashScale(t) {
          this.uniforms.dashScale.value = t;
        }
        set dashed(t) {
          t ? (this.defines.USE_DASH = '') : delete this.defines.USE_DASH, (this.needsUpdate = !0);
        }
        get dashed() {
          return 'USE_DASH' in this.defines;
        }
        get dashSize() {
          return this.uniforms.dashSize.value;
        }
        set dashSize(t) {
          this.uniforms.dashSize.value = t;
        }
        get gapSize() {
          return this.uniforms.gapSize.value;
        }
        set gapSize(t) {
          this.uniforms.gapSize.value = t;
        }
        get resolution() {
          return this.uniforms.resolution.value;
        }
        set resolution(t) {
          this.uniforms.resolution.value = t;
        }
        set mask(t) {
          this.uniforms.mask.value !== t &&
            (t ? (this.defines.USE_MASK = '') : delete this.defines.USE_MASK,
            (this.uniforms.mask.value = t),
            (this.needsUpdate = !0));
        }
        get mask() {
          return this.uniforms.mask.value;
        }
        copy(t) {
          return (
            r.RawShaderMaterial.prototype.copy.call(this, t),
            (this.parameters = t.parameters),
            this.color.copy(t.color),
            (this.defaultWidth = t.defaultWidth),
            this.setLinewidth(t.getLinewidth()),
            this.resolution.copy(t.resolution),
            (this.defaultTexture = t.defaultTexture),
            (this.hoverTexture = t.hoverTexture),
            (this.mask = t.mask),
            this.setOpacity(t.getOpacity()),
            (this.dashed = t.dashed),
            (this.dashScale = t.dashScale),
            (this.dashSize = t.dashSize),
            (this.gapSize = t.gapSize),
            this
          );
        }
      }
      var p = i(57793),
        A = i(1945),
        m = i(23998);
      let v = null;
      function g() {
        return v || (v = new c()), v;
      }
      class S extends s.Y {
        constructor() {
          super(...arguments), (this.name = 'lines');
        }
        async init(t, e) {
          const i = await e.getModuleBySymbol(n.Aj);
          (this.scene = i.getScene()),
            (this.canvas = await e.market.waitForData(m.W)),
            (this.cameraData = await e.market.waitForData(p.M)),
            this.bindings.push(this.canvas.onChanged(this.onCanvasChange.bind(this))),
            (this.cameraPosition = new r.Vector3()),
            (this.segments = []);
        }
        onUpdate() {
          this.cameraPosition.copy(this.cameraData.pose.position);
        }
        dispose(t) {
          super.dispose(t), this.segments.forEach((t) => t.dispose());
        }
        makeLine(t, e, i, s, n = () => !1) {
          const r = n() ? u.iV.OFFSET_TOWARDS_CAMERA : 0,
            a = n() ? (t) => this.cameraPosition.clone().sub(t).setLength(r).add(t) : (t) => t,
            h = new o.c(
              t,
              e,
              i,
              {
                beforeUpdatePositions: a,
                onShow: () => h.children.forEach((t) => this.scene.addChild(A.a.Root, t)),
                onHide: () => h.children.forEach((t) => this.scene.removeChild(A.a.Root, t)),
              },
              s,
            );
          return (
            h.updateResolution(this.canvas.width, this.canvas.height),
            h.opacity(1),
            h.show(),
            h.updatePositions(t, e),
            this.segments.push(h),
            h
          );
        }
        makeLineMaterial(t, e, i = {}, s, n) {
          return E(t, e, i, s, n);
        }
        makeEndpointMaterial(t, e, i) {
          return y(t, e, i);
        }
        onCanvasChange(t) {
          for (const e of this.segments) e.updateResolution(t.width, t.height);
        }
      }
      function y(t, e, i) {
        const s = i || g().get(h.END_HOVER),
          n = e || g().get(h.END_DEFAULT);
        return new l(new r.Color(t), n, s);
      }
      function E(t, e, i = {}, s, n) {
        const o = n || g().get(h.LINE_HOVER),
          a = s || g().get(h.LINE_DEFAULT),
          c = new r.Vector2(window.innerWidth, window.innerHeight);
        return e
          ? new f(Object.assign({ color: new r.Color(t), resolution: c }, i), o, a)
          : new f(Object.assign({ color: new r.Color(t) }, i));
      }
    },
    91435: (t, e, i) => {
      'use strict';
      i.d(e, { T: () => A });
      var s = i(81396),
        n = i(44850),
        r = i(44724),
        o = i.n(r),
        a = i(7188),
        h = i.n(a),
        c = i(52059),
        d = i.n(c),
        l = i(75215),
        u = i.n(l),
        f = i(56449),
        p = i.n(f);
      const A = {
        endpoint: {
          uniforms: {
            opacity: { type: 'f', value: 1 },
            color: { type: 'c', value: new s.Color() },
            bg: { type: 't', value: null },
          },
          vertexShader: n.Z.basicTextured.vertexShader,
          fragmentShader: o(),
        },
        line: {
          uniforms: s.UniformsUtils.merge([
            s.UniformsLib.common,
            s.UniformsLib.fog,
            {
              linewidth: { value: 4 },
              resolution: { value: new s.Vector2(0, 0) },
              dashScale: { value: 1 },
              dashSize: { value: 0.025 },
              gapSize: { value: 0.05 },
              mask: { value: null },
            },
          ]),
          vertexShader: h(),
          fragmentShader: d(),
        },
        screenline: {
          uniforms: {
            lineWidth: { value: 1 },
            screenSize: { value: new s.Vector2(0, 0) },
            dashed: { value: 0 },
            dashSize: { value: 1 },
            gapSize: { value: 1 },
            antialiasWidth: { value: 1 },
            color: { value: new s.Color(1, 0, 0) },
            globalOpacity: { value: 1 },
            start: { value: new s.Vector3() },
            end: { value: new s.Vector3() },
            cameraPos: { value: new s.Vector3() },
          },
          vertexShader: u(),
          fragmentShader: p(),
        },
      };
    },
    12241: (t, e, i) => {
      'use strict';
      i.d(e, { Ey: () => r, V9: () => n, g4: () => o, iV: () => s });
      const s = {
          FADE_DURATION: 100,
          LABEL_HIDDEN_OPACITY: 0.15,
          DEPTH_WRITE_THRESHOD: 0.15,
          ALIGN_LABELS: !1,
          LABEL_SIZING: 0.14,
          LABEL_NDC_SCALEFACTOR: 0.5,
          LABEL_ASPECT_SCALEFACTOR: 0.035,
          OFFSET_TOWARDS_CAMERA: 0.25,
          HIDE_LABELS: !1,
        },
        n = {
          dottedLineDefault: 2,
          lineDefault: 6,
          lineSelected: 6,
          endpointDefault: 2.5,
          endpointSelected: 3.75,
        },
        r = 0.01,
        o = 5;
    },
    26302: (t, e, i) => {
      'use strict';
      i.d(e, { i: () => n });
      var s = i(81396);
      class n extends s.Mesh {}
    },
    71835: (t, e, i) => {
      'use strict';
      i.d(e, { Bv: () => u, Dv: () => h, TE: () => c, l0: () => l, o7: () => d });
      var s = i(81396);
      const n = -1,
        r = 10,
        o = 5,
        a = -5,
        h =
          (t, e = n) =>
          (i) =>
            t.distanceToSquared(i.position) * e,
        c =
          (t, e = n) =>
          (i) =>
            t.distanceTo(i.position) * e,
        d = (t, e, i = r) => {
          const n = new s.Vector3();
          return (s) => n.copy(s.position).sub(t).normalize().dot(e) * i;
        },
        l =
          (t, e = n) =>
          (i) =>
            t.distanceToSquared(i.floorPosition) * e,
        u =
          (t, e = o, i = a) =>
          (s) =>
            t === s.floorId ? e : i;
    },
    44724: (t) => {
      t.exports =
        'precision highp float;precision highp int;uniform mat4 viewMatrix;uniform vec3 cameraPosition;vec3 closestPointToRay(vec3 point,vec3 origin,vec3 direction){vec3 d=point-origin;float D=dot(d,direction);return origin+D*direction;}vec3 rayIntersectsSphere(vec3 origin,float radius,vec3 rayOrigin,vec3 rayDirection){vec3 chordPoint=closestPointToRay(origin,rayOrigin,rayDirection);float D1=length(rayOrigin-chordPoint);float D=length(chordPoint-origin);float D2=sqrt(radius*radius-D*D);return rayOrigin+(D1+D2)*rayDirection;}uniform float opacity;uniform vec3 color;uniform sampler2D bg;varying vec2 vUv;void main(){vec4 bgColor=texture2D(bg,vUv);gl_FragColor=vec4(bgColor.rgb,bgColor.a*opacity);}';
    },
    52059: (t) => {
      t.exports =
        'precision highp float;precision highp int;uniform mat4 viewMatrix;uniform vec3 cameraPosition;vec3 closestPointToRay(vec3 point,vec3 origin,vec3 direction){vec3 d=point-origin;float D=dot(d,direction);return origin+D*direction;}vec3 rayIntersectsSphere(vec3 origin,float radius,vec3 rayOrigin,vec3 rayDirection){vec3 chordPoint=closestPointToRay(origin,rayOrigin,rayDirection);float D1=length(rayOrigin-chordPoint);float D=length(chordPoint-origin);float D2=sqrt(radius*radius-D*D);return rayOrigin+(D1+D2)*rayDirection;}uniform vec3 diffuse;uniform float opacity;uniform sampler2D mask;\n#ifdef USE_DASH\nuniform float dashSize;uniform float gapSize;\n#endif\nvarying float vLineDistance;\n#include <common>\nvarying vec2 vUv;void main(){\n#ifdef USE_DASH\nif(vUv.y<-1.||vUv.y>1.)discard;if(mod(vLineDistance,dashSize+gapSize)>dashSize)discard;\n#endif\n#ifdef USE_MASK\nvec2 modUv=vec2(vUv);modUv*=2.;vec4 texelColor=texture2D(mask,modUv);gl_FragColor=vec4(texelColor.rgb,min(texelColor.a,opacity));\n#else\ngl_FragColor=vec4(diffuse,opacity);\n#endif\n}';
    },
    7188: (t) => {
      t.exports =
        'precision highp float;precision highp int;uniform mat4 modelMatrix;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;uniform mat4 viewMatrix;uniform mat3 normalMatrix;uniform vec3 cameraPosition;attribute vec3 position;attribute vec3 normal;attribute vec2 uv;\n#include <common>\nuniform float linewidth;uniform vec2 resolution;attribute vec3 instanceStart;attribute vec3 instanceEnd;attribute vec3 instanceColorStart;attribute vec3 instanceColorEnd;varying vec2 vUv;\n#ifdef USE_DASH\nuniform float dashScale;attribute float instanceDistanceStart;attribute float instanceDistanceEnd;varying float vLineDistance;\n#endif\nvoid trimSegment(const in vec4 start,inout vec4 end){float a=projectionMatrix[2][2];float b=projectionMatrix[3][2];float nearEstimate=-0.5*b/a;float alpha=(nearEstimate-start.z)/(end.z-start.z);end.xyz=mix(start.xyz,end.xyz,alpha);}void main(){\n#ifdef USE_COLOR\nvColor.xyz=(position.y<0.5)?instanceColorStart:instanceColorEnd;\n#endif\n#ifdef USE_DASH\nvLineDistance=(position.y<0.5)?dashScale*instanceDistanceStart:dashScale*instanceDistanceEnd;\n#endif\nfloat aspect=resolution.x/resolution.y;vUv=uv;vec4 start=modelViewMatrix*vec4(instanceStart,1.);vec4 end=modelViewMatrix*vec4(instanceEnd,1.);bool perspective=(projectionMatrix[2][3]==-1.);if(perspective){if(start.z<0.&&end.z>=0.){trimSegment(start,end);}else if(end.z<0.&&start.z>=0.){trimSegment(end,start);}}vec4 clipStart=projectionMatrix*start;vec4 clipEnd=projectionMatrix*end;vec2 ndcStart=clipStart.xy/clipStart.w;vec2 ndcEnd=clipEnd.xy/clipEnd.w;vec2 dir=ndcEnd-ndcStart;dir.x*=aspect;dir=normalize(dir);vec2 offset=vec2(dir.y,-dir.x);dir.x/=aspect;offset.x/=aspect;if(position.x<0.)offset*=-1.;offset*=linewidth;offset/=resolution.y;vec4 clip=(position.y<0.5)?clipStart:clipEnd;\n#ifdef USE_MASK\noffset*=(clipEnd.w+clipStart.w)*0.5;\n#else\noffset*=clip.w;\n#endif\nclip.xy+=offset;gl_Position=clip;\n#include <worldpos_vertex>\n}';
    },
    56449: (t) => {
      t.exports =
        'precision highp float;uniform vec3 color;uniform float antialiasWidth;uniform float lineWidth;uniform float dashed;uniform float dashSize;uniform float gapSize;uniform float globalOpacity;varying float vDistanceFromAxis;varying float vDistanceAlong;varying float vOpacity;\n#ifdef FADE_DISTANCE_FROM_CAMERA\nvarying float vDistanceFromCamera;\n#endif\nvoid main(){float halfWidth=lineWidth*0.5;float antialiasing=1.-smoothstep(halfWidth,halfWidth+antialiasWidth,vDistanceFromAxis);float dashOpacity=1.;float cameraDistanceFadeOpacity=1.;if(dashed>0.){\n#ifdef WORLDSPACE_DASH\nfloat dashAA=fwidth(vDistanceAlong)*antialiasWidth*0.5;\n#else\nfloat dashAA=antialiasWidth*0.5;\n#endif\nfloat dashT=mod(vDistanceAlong,dashSize+gapSize);dashOpacity=smoothstep(0.,dashAA,dashT)*(1.-smoothstep(dashSize-dashAA,dashSize,dashT));}\n#ifdef FADE_DISTANCE_FROM_CAMERA\nfloat fadeStartDist=FADE_DISTANCE_FROM_CAMERA-1.;float fadeEndFist=FADE_DISTANCE_FROM_CAMERA+1.;float fadeT=clamp((vDistanceFromCamera-fadeStartDist)/(fadeEndFist-fadeStartDist),0.,1.);cameraDistanceFadeOpacity=1.-mix(0.,1.,fadeT);\n#endif\ngl_FragColor=vec4(color,globalOpacity*dashOpacity*antialiasing*vOpacity*cameraDistanceFadeOpacity);}';
    },
    75215: (t) => {
      t.exports =
        'precision highp float;uniform vec2 screenSize;vec2 rotate90(vec2 v){return vec2(-v.y,v.x);}vec2 ndcToScreen(vec4 pt){return(vec2(pt.x,pt.y)+vec2(1.,1.))*screenSize/2.;}vec2 screenToNdc(vec2 pt){return(pt*2./screenSize)-vec2(1.,1.);}uniform float lineWidth;uniform float antialiasWidth;uniform mat4 projectionMatrix;uniform mat4 modelViewMatrix;attribute float offsetDirection;attribute vec3 start;attribute vec3 end;attribute float t;attribute float opacity;varying float vDistanceFromAxis;varying float vDistanceAlong;varying float vOpacity;\n#ifdef FADE_DISTANCE_FROM_CAMERA\nvarying float vDistanceFromCamera;uniform vec3 cameraPos;\n#endif\nvoid main(){vOpacity=opacity;vec4 startNdc=projectionMatrix*modelViewMatrix*vec4(start,1.);vec4 endNdc=projectionMatrix*modelViewMatrix*vec4(end,1.);vec2 startScreen=ndcToScreen(startNdc/startNdc.w);vec2 endScreen=ndcToScreen(endNdc/endNdc.w);float halfWidth=lineWidth*0.5+antialiasWidth;vec2 directionScreen=endScreen-startScreen;vec2 widthOffsetScreen=rotate90(normalize(directionScreen))*offsetDirection*halfWidth;vec2 centerlinePos=startScreen+directionScreen*t;vec2 position=centerlinePos+widthOffsetScreen*1.3;\n#ifdef FADE_DISTANCE_FROM_CAMERA\nvec3 worldPos=start+(end-start)*t;vDistanceFromCamera=length(worldPos-cameraPos);\n#endif\nvDistanceFromAxis=length(widthOffsetScreen);float clippedT=length(centerlinePos-startScreen)/length(directionScreen);\n#ifdef WORLDSPACE_DASH\nvDistanceAlong=length((end-start)*clippedT);\n#else\nvDistanceAlong=length(directionScreen*clippedT);\n#endif\nfloat z=mix(startNdc.z,endNdc.z,clippedT);float w=mix(startNdc.w,endNdc.w,clippedT);vec2 posNdc=screenToNdc(position);gl_Position=vec4(posNdc*w,z,w);}';
    },
  },
]);
