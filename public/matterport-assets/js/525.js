/*! For license information please see 525.js.LICENSE.txt */
'use strict';
(self.webpackChunkmp_webgl = self.webpackChunkmp_webgl || []).push([
  [525],
  {
    11279: (e, t, s) => {
      s.r(t), s.d(t, { EffectComposer: () => n });
      var r = s(81396),
        i = s(1154),
        a = s(7531),
        h = s(94604);
      class n {
        constructor(e, t) {
          if (((this.renderer = e), void 0 === t)) {
            const s = e.getSize(new r.Vector2());
            (this._pixelRatio = e.getPixelRatio()),
              (this._width = s.width),
              (this._height = s.height),
              ((t = new r.WebGLRenderTarget(
                this._width * this._pixelRatio,
                this._height * this._pixelRatio,
              )).texture.name = 'EffectComposer.rt1');
          } else (this._pixelRatio = 1), (this._width = t.width), (this._height = t.height);
          (this.renderTarget1 = t),
            (this.renderTarget2 = t.clone()),
            (this.renderTarget2.texture.name = 'EffectComposer.rt2'),
            (this.writeBuffer = this.renderTarget1),
            (this.readBuffer = this.renderTarget2),
            (this.renderToScreen = !0),
            (this.passes = []),
            (this.copyPass = new a.ShaderPass(i.CopyShader)),
            (this.clock = new r.Clock());
        }
        swapBuffers() {
          const e = this.readBuffer;
          (this.readBuffer = this.writeBuffer), (this.writeBuffer = e);
        }
        addPass(e) {
          this.passes.push(e),
            e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
        }
        insertPass(e, t) {
          this.passes.splice(t, 0, e),
            e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
        }
        removePass(e) {
          const t = this.passes.indexOf(e);
          -1 !== t && this.passes.splice(t, 1);
        }
        isLastEnabledPass(e) {
          for (let t = e + 1; t < this.passes.length; t++) if (this.passes[t].enabled) return !1;
          return !0;
        }
        render(e) {
          void 0 === e && (e = this.clock.getDelta());
          const t = this.renderer.getRenderTarget();
          let s = !1;
          for (let t = 0, r = this.passes.length; t < r; t++) {
            const r = this.passes[t];
            if (!1 !== r.enabled) {
              if (
                ((r.renderToScreen = this.renderToScreen && this.isLastEnabledPass(t)),
                r.render(this.renderer, this.writeBuffer, this.readBuffer, e, s),
                r.needsSwap)
              ) {
                if (s) {
                  const t = this.renderer.getContext(),
                    s = this.renderer.state.buffers.stencil;
                  s.setFunc(t.NOTEQUAL, 1, 4294967295),
                    this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, e),
                    s.setFunc(t.EQUAL, 1, 4294967295);
                }
                this.swapBuffers();
              }
              void 0 !== h.MaskPass &&
                (r instanceof h.MaskPass ? (s = !0) : r instanceof h.ClearMaskPass && (s = !1));
            }
          }
          this.renderer.setRenderTarget(t);
        }
        reset(e) {
          if (void 0 === e) {
            const t = this.renderer.getSize(new r.Vector2());
            (this._pixelRatio = this.renderer.getPixelRatio()),
              (this._width = t.width),
              (this._height = t.height),
              (e = this.renderTarget1.clone()).setSize(
                this._width * this._pixelRatio,
                this._height * this._pixelRatio,
              );
          }
          this.renderTarget1.dispose(),
            this.renderTarget2.dispose(),
            (this.renderTarget1 = e),
            (this.renderTarget2 = e.clone()),
            (this.writeBuffer = this.renderTarget1),
            (this.readBuffer = this.renderTarget2);
        }
        setSize(e, t) {
          (this._width = e), (this._height = t);
          const s = this._width * this._pixelRatio,
            r = this._height * this._pixelRatio;
          this.renderTarget1.setSize(s, r), this.renderTarget2.setSize(s, r);
          for (let e = 0; e < this.passes.length; e++) this.passes[e].setSize(s, r);
        }
        setPixelRatio(e) {
          (this._pixelRatio = e), this.setSize(this._width, this._height);
        }
        dispose() {
          this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.copyPass.dispose();
        }
      }
    },
    94604: (e, t, s) => {
      s.r(t), s.d(t, { ClearMaskPass: () => a, MaskPass: () => i });
      var r = s(78304);
      class i extends r.Pass {
        constructor(e, t) {
          super(),
            (this.scene = e),
            (this.camera = t),
            (this.clear = !0),
            (this.needsSwap = !1),
            (this.inverse = !1);
        }
        render(e, t, s) {
          const r = e.getContext(),
            i = e.state;
          let a, h;
          i.buffers.color.setMask(!1),
            i.buffers.depth.setMask(!1),
            i.buffers.color.setLocked(!0),
            i.buffers.depth.setLocked(!0),
            this.inverse ? ((a = 0), (h = 1)) : ((a = 1), (h = 0)),
            i.buffers.stencil.setTest(!0),
            i.buffers.stencil.setOp(r.REPLACE, r.REPLACE, r.REPLACE),
            i.buffers.stencil.setFunc(r.ALWAYS, a, 4294967295),
            i.buffers.stencil.setClear(h),
            i.buffers.stencil.setLocked(!0),
            e.setRenderTarget(s),
            this.clear && e.clear(),
            e.render(this.scene, this.camera),
            e.setRenderTarget(t),
            this.clear && e.clear(),
            e.render(this.scene, this.camera),
            i.buffers.color.setLocked(!1),
            i.buffers.depth.setLocked(!1),
            i.buffers.stencil.setLocked(!1),
            i.buffers.stencil.setFunc(r.EQUAL, 1, 4294967295),
            i.buffers.stencil.setOp(r.KEEP, r.KEEP, r.KEEP),
            i.buffers.stencil.setLocked(!0);
        }
      }
      class a extends r.Pass {
        constructor() {
          super(), (this.needsSwap = !1);
        }
        render(e) {
          e.state.buffers.stencil.setLocked(!1), e.state.buffers.stencil.setTest(!1);
        }
      }
    },
    78304: (e, t, s) => {
      s.r(t), s.d(t, { FullScreenQuad: () => n, Pass: () => i });
      var r = s(81396);
      class i {
        constructor() {
          (this.isPass = !0),
            (this.enabled = !0),
            (this.needsSwap = !0),
            (this.clear = !1),
            (this.renderToScreen = !1);
        }
        setSize() {}
        render() {
          console.error('THREE.Pass: .render() must be implemented in derived pass.');
        }
        dispose() {}
      }
      const a = new r.OrthographicCamera(-1, 1, 1, -1, 0, 1),
        h = new r.BufferGeometry();
      h.setAttribute('position', new r.Float32BufferAttribute([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)),
        h.setAttribute('uv', new r.Float32BufferAttribute([0, 2, 0, 0, 2, 0], 2));
      class n {
        constructor(e) {
          this._mesh = new r.Mesh(h, e);
        }
        dispose() {
          this._mesh.geometry.dispose();
        }
        render(e) {
          e.render(this._mesh, a);
        }
        get material() {
          return this._mesh.material;
        }
        set material(e) {
          this._mesh.material = e;
        }
      }
    },
    54458: (e, t, s) => {
      s.r(t), s.d(t, { RenderPass: () => a });
      var r = s(81396),
        i = s(78304);
      class a extends i.Pass {
        constructor(e, t, s, i, a) {
          super(),
            (this.scene = e),
            (this.camera = t),
            (this.overrideMaterial = s),
            (this.clearColor = i),
            (this.clearAlpha = void 0 !== a ? a : 0),
            (this.clear = !0),
            (this.clearDepth = !1),
            (this.needsSwap = !1),
            (this._oldClearColor = new r.Color());
        }
        render(e, t, s) {
          const r = e.autoClear;
          let i, a;
          (e.autoClear = !1),
            void 0 !== this.overrideMaterial &&
              ((a = this.scene.overrideMaterial),
              (this.scene.overrideMaterial = this.overrideMaterial)),
            this.clearColor &&
              (e.getClearColor(this._oldClearColor),
              (i = e.getClearAlpha()),
              e.setClearColor(this.clearColor, this.clearAlpha)),
            this.clearDepth && e.clearDepth(),
            e.setRenderTarget(this.renderToScreen ? null : s),
            this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil),
            e.render(this.scene, this.camera),
            this.clearColor && e.setClearColor(this._oldClearColor, i),
            void 0 !== this.overrideMaterial && (this.scene.overrideMaterial = a),
            (e.autoClear = r);
        }
      }
    },
    7531: (e, t, s) => {
      s.r(t), s.d(t, { ShaderPass: () => a });
      var r = s(81396),
        i = s(78304);
      class a extends i.Pass {
        constructor(e, t) {
          super(),
            (this.textureID = void 0 !== t ? t : 'tDiffuse'),
            e instanceof r.ShaderMaterial
              ? ((this.uniforms = e.uniforms), (this.material = e))
              : e &&
                ((this.uniforms = r.UniformsUtils.clone(e.uniforms)),
                (this.material = new r.ShaderMaterial({
                  defines: Object.assign({}, e.defines),
                  uniforms: this.uniforms,
                  vertexShader: e.vertexShader,
                  fragmentShader: e.fragmentShader,
                }))),
            (this.fsQuad = new i.FullScreenQuad(this.material));
        }
        render(e, t, s) {
          this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = s.texture),
            (this.fsQuad.material = this.material),
            this.renderToScreen
              ? (e.setRenderTarget(null), this.fsQuad.render(e))
              : (e.setRenderTarget(t),
                this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil),
                this.fsQuad.render(e));
        }
        dispose() {
          this.material.dispose(), this.fsQuad.dispose();
        }
      }
    },
    1154: (e, t, s) => {
      s.r(t), s.d(t, { CopyShader: () => r });
      const r = {
        uniforms: { tDiffuse: { value: null }, opacity: { value: 1 } },
        vertexShader:
          '\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}',
        fragmentShader:
          '\n\n\t\tuniform float opacity;\n\n\t\tuniform sampler2D tDiffuse;\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tgl_FragColor = texture2D( tDiffuse, vUv );\n\t\t\tgl_FragColor.a *= opacity;\n\n\n\t\t}',
      };
    },
  },
]);
