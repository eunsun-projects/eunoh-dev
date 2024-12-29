/*! For license information please see 217.js.LICENSE.txt */
'use strict';
(self.webpackChunkmp_webgl = self.webpackChunkmp_webgl || []).push([
  [217],
  {
    1217: (e, t, r) => {
      r.r(t), r.d(t, { GLTFLoader: () => o });
      var s = r(81396),
        n = r(40140);
      class o extends s.Loader {
        constructor(e) {
          super(e),
            (this.dracoLoader = null),
            (this.ktx2Loader = null),
            (this.meshoptDecoder = null),
            (this.pluginCallbacks = []),
            this.register(function (e) {
              return new h(e);
            }),
            this.register(function (e) {
              return new T(e);
            }),
            this.register(function (e) {
              return new x(e);
            }),
            this.register(function (e) {
              return new b(e);
            }),
            this.register(function (e) {
              return new f(e);
            }),
            this.register(function (e) {
              return new m(e);
            }),
            this.register(function (e) {
              return new p(e);
            }),
            this.register(function (e) {
              return new g(e);
            }),
            this.register(function (e) {
              return new l(e);
            }),
            this.register(function (e) {
              return new A(e);
            }),
            this.register(function (e) {
              return new d(e);
            }),
            this.register(function (e) {
              return new c(e);
            }),
            this.register(function (e) {
              return new R(e);
            }),
            this.register(function (e) {
              return new w(e);
            });
        }
        load(e, t, r, n) {
          const o = this;
          let i;
          (i =
            '' !== this.resourcePath
              ? this.resourcePath
              : '' !== this.path
                ? this.path
                : s.LoaderUtils.extractUrlBase(e)),
            this.manager.itemStart(e);
          const a = function (t) {
              n ? n(t) : console.error(t), o.manager.itemError(e), o.manager.itemEnd(e);
            },
            c = new s.FileLoader(this.manager);
          c.setPath(this.path),
            c.setResponseType('arraybuffer'),
            c.setRequestHeader(this.requestHeader),
            c.setWithCredentials(this.withCredentials),
            c.load(
              e,
              function (r) {
                try {
                  o.parse(
                    r,
                    i,
                    function (r) {
                      t(r), o.manager.itemEnd(e);
                    },
                    a,
                  );
                } catch (e) {
                  a(e);
                }
              },
              r,
              a,
            );
        }
        setDRACOLoader(e) {
          return (this.dracoLoader = e), this;
        }
        setDDSLoader() {
          throw new Error(
            'THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".',
          );
        }
        setKTX2Loader(e) {
          return (this.ktx2Loader = e), this;
        }
        setMeshoptDecoder(e) {
          return (this.meshoptDecoder = e), this;
        }
        register(e) {
          return -1 === this.pluginCallbacks.indexOf(e) && this.pluginCallbacks.push(e), this;
        }
        unregister(e) {
          return (
            -1 !== this.pluginCallbacks.indexOf(e) &&
              this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1),
            this
          );
        }
        parse(e, t, r, s) {
          let n;
          const o = {},
            i = {},
            c = new TextDecoder();
          if ('string' == typeof e) n = JSON.parse(e);
          else if (e instanceof ArrayBuffer) {
            if (c.decode(new Uint8Array(e, 0, 4)) === E) {
              try {
                o[a.KHR_BINARY_GLTF] = new M(e);
              } catch (e) {
                return void (s && s(e));
              }
              n = JSON.parse(o[a.KHR_BINARY_GLTF].content);
            } else n = JSON.parse(c.decode(e));
          } else n = e;
          if (void 0 === n.asset || n.asset.version[0] < 2)
            return void (
              s &&
              s(
                new Error(
                  'THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.',
                ),
              )
            );
          const l = new Z(n, {
            path: t || this.resourcePath || '',
            crossOrigin: this.crossOrigin,
            requestHeader: this.requestHeader,
            manager: this.manager,
            ktx2Loader: this.ktx2Loader,
            meshoptDecoder: this.meshoptDecoder,
          });
          l.fileLoader.setRequestHeader(this.requestHeader);
          for (let e = 0; e < this.pluginCallbacks.length; e++) {
            const t = this.pluginCallbacks[e](l);
            (i[t.name] = t), (o[t.name] = !0);
          }
          if (n.extensionsUsed)
            for (let e = 0; e < n.extensionsUsed.length; ++e) {
              const t = n.extensionsUsed[e],
                r = n.extensionsRequired || [];
              switch (t) {
                case a.KHR_MATERIALS_UNLIT:
                  o[t] = new u();
                  break;
                case a.KHR_DRACO_MESH_COMPRESSION:
                  o[t] = new _(n, this.dracoLoader);
                  break;
                case a.KHR_TEXTURE_TRANSFORM:
                  o[t] = new S();
                  break;
                case a.KHR_MESH_QUANTIZATION:
                  o[t] = new I();
                  break;
                default:
                  r.indexOf(t) >= 0 &&
                    void 0 === i[t] &&
                    console.warn('THREE.GLTFLoader: Unknown extension "' + t + '".');
              }
            }
          l.setExtensions(o), l.setPlugins(i), l.parse(r, s);
        }
        parseAsync(e, t) {
          const r = this;
          return new Promise(function (s, n) {
            r.parse(e, t, s, n);
          });
        }
      }
      function i() {
        let e = {};
        return {
          get: function (t) {
            return e[t];
          },
          add: function (t, r) {
            e[t] = r;
          },
          remove: function (t) {
            delete e[t];
          },
          removeAll: function () {
            e = {};
          },
        };
      }
      const a = {
        KHR_BINARY_GLTF: 'KHR_binary_glTF',
        KHR_DRACO_MESH_COMPRESSION: 'KHR_draco_mesh_compression',
        KHR_LIGHTS_PUNCTUAL: 'KHR_lights_punctual',
        KHR_MATERIALS_CLEARCOAT: 'KHR_materials_clearcoat',
        KHR_MATERIALS_IOR: 'KHR_materials_ior',
        KHR_MATERIALS_SHEEN: 'KHR_materials_sheen',
        KHR_MATERIALS_SPECULAR: 'KHR_materials_specular',
        KHR_MATERIALS_TRANSMISSION: 'KHR_materials_transmission',
        KHR_MATERIALS_IRIDESCENCE: 'KHR_materials_iridescence',
        KHR_MATERIALS_UNLIT: 'KHR_materials_unlit',
        KHR_MATERIALS_VOLUME: 'KHR_materials_volume',
        KHR_TEXTURE_BASISU: 'KHR_texture_basisu',
        KHR_TEXTURE_TRANSFORM: 'KHR_texture_transform',
        KHR_MESH_QUANTIZATION: 'KHR_mesh_quantization',
        KHR_MATERIALS_EMISSIVE_STRENGTH: 'KHR_materials_emissive_strength',
        EXT_TEXTURE_WEBP: 'EXT_texture_webp',
        EXT_TEXTURE_AVIF: 'EXT_texture_avif',
        EXT_MESHOPT_COMPRESSION: 'EXT_meshopt_compression',
        EXT_MESH_GPU_INSTANCING: 'EXT_mesh_gpu_instancing',
      };
      class c {
        constructor(e) {
          (this.parser = e),
            (this.name = a.KHR_LIGHTS_PUNCTUAL),
            (this.cache = { refs: {}, uses: {} });
        }
        _markDefs() {
          const e = this.parser,
            t = this.parser.json.nodes || [];
          for (let r = 0, s = t.length; r < s; r++) {
            const s = t[r];
            s.extensions &&
              s.extensions[this.name] &&
              void 0 !== s.extensions[this.name].light &&
              e._addNodeRef(this.cache, s.extensions[this.name].light);
          }
        }
        _loadLight(e) {
          const t = this.parser,
            r = 'light:' + e;
          let n = t.cache.get(r);
          if (n) return n;
          const o = t.json,
            i = (((o.extensions && o.extensions[this.name]) || {}).lights || [])[e];
          let a;
          const c = new s.Color(16777215);
          void 0 !== i.color && c.fromArray(i.color);
          const u = void 0 !== i.range ? i.range : 0;
          switch (i.type) {
            case 'directional':
              (a = new s.DirectionalLight(c)), a.target.position.set(0, 0, -1), a.add(a.target);
              break;
            case 'point':
              (a = new s.PointLight(c)), (a.distance = u);
              break;
            case 'spot':
              (a = new s.SpotLight(c)),
                (a.distance = u),
                (i.spot = i.spot || {}),
                (i.spot.innerConeAngle =
                  void 0 !== i.spot.innerConeAngle ? i.spot.innerConeAngle : 0),
                (i.spot.outerConeAngle =
                  void 0 !== i.spot.outerConeAngle ? i.spot.outerConeAngle : Math.PI / 4),
                (a.angle = i.spot.outerConeAngle),
                (a.penumbra = 1 - i.spot.innerConeAngle / i.spot.outerConeAngle),
                a.target.position.set(0, 0, -1),
                a.add(a.target);
              break;
            default:
              throw new Error('THREE.GLTFLoader: Unexpected light type: ' + i.type);
          }
          return (
            a.position.set(0, 0, 0),
            (a.decay = 2),
            z(a, i),
            void 0 !== i.intensity && (a.intensity = i.intensity),
            (a.name = t.createUniqueName(i.name || 'light_' + e)),
            (n = Promise.resolve(a)),
            t.cache.add(r, n),
            n
          );
        }
        getDependency(e, t) {
          if ('light' === e) return this._loadLight(t);
        }
        createNodeAttachment(e) {
          const t = this,
            r = this.parser,
            s = r.json.nodes[e],
            n = ((s.extensions && s.extensions[this.name]) || {}).light;
          return void 0 === n
            ? null
            : this._loadLight(n).then(function (e) {
                return r._getNodeRef(t.cache, n, e);
              });
        }
      }
      class u {
        constructor() {
          this.name = a.KHR_MATERIALS_UNLIT;
        }
        getMaterialType() {
          return s.MeshBasicMaterial;
        }
        extendParams(e, t, r) {
          const n = [];
          (e.color = new s.Color(1, 1, 1)), (e.opacity = 1);
          const o = t.pbrMetallicRoughness;
          if (o) {
            if (Array.isArray(o.baseColorFactor)) {
              const t = o.baseColorFactor;
              e.color.fromArray(t), (e.opacity = t[3]);
            }
            void 0 !== o.baseColorTexture &&
              n.push(r.assignTexture(e, 'map', o.baseColorTexture, s.sRGBEncoding));
          }
          return Promise.all(n);
        }
      }
      class l {
        constructor(e) {
          (this.parser = e), (this.name = a.KHR_MATERIALS_EMISSIVE_STRENGTH);
        }
        extendMaterialParams(e, t) {
          const r = this.parser.json.materials[e];
          if (!r.extensions || !r.extensions[this.name]) return Promise.resolve();
          const s = r.extensions[this.name].emissiveStrength;
          return void 0 !== s && (t.emissiveIntensity = s), Promise.resolve();
        }
      }
      class h {
        constructor(e) {
          (this.parser = e), (this.name = a.KHR_MATERIALS_CLEARCOAT);
        }
        getMaterialType(e) {
          const t = this.parser.json.materials[e];
          return t.extensions && t.extensions[this.name] ? s.MeshPhysicalMaterial : null;
        }
        extendMaterialParams(e, t) {
          const r = this.parser,
            n = r.json.materials[e];
          if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
          const o = [],
            i = n.extensions[this.name];
          if (
            (void 0 !== i.clearcoatFactor && (t.clearcoat = i.clearcoatFactor),
            void 0 !== i.clearcoatTexture &&
              o.push(r.assignTexture(t, 'clearcoatMap', i.clearcoatTexture)),
            void 0 !== i.clearcoatRoughnessFactor &&
              (t.clearcoatRoughness = i.clearcoatRoughnessFactor),
            void 0 !== i.clearcoatRoughnessTexture &&
              o.push(r.assignTexture(t, 'clearcoatRoughnessMap', i.clearcoatRoughnessTexture)),
            void 0 !== i.clearcoatNormalTexture &&
              (o.push(r.assignTexture(t, 'clearcoatNormalMap', i.clearcoatNormalTexture)),
              void 0 !== i.clearcoatNormalTexture.scale))
          ) {
            const e = i.clearcoatNormalTexture.scale;
            t.clearcoatNormalScale = new s.Vector2(e, e);
          }
          return Promise.all(o);
        }
      }
      class d {
        constructor(e) {
          (this.parser = e), (this.name = a.KHR_MATERIALS_IRIDESCENCE);
        }
        getMaterialType(e) {
          const t = this.parser.json.materials[e];
          return t.extensions && t.extensions[this.name] ? s.MeshPhysicalMaterial : null;
        }
        extendMaterialParams(e, t) {
          const r = this.parser,
            s = r.json.materials[e];
          if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
          const n = [],
            o = s.extensions[this.name];
          return (
            void 0 !== o.iridescenceFactor && (t.iridescence = o.iridescenceFactor),
            void 0 !== o.iridescenceTexture &&
              n.push(r.assignTexture(t, 'iridescenceMap', o.iridescenceTexture)),
            void 0 !== o.iridescenceIor && (t.iridescenceIOR = o.iridescenceIor),
            void 0 === t.iridescenceThicknessRange && (t.iridescenceThicknessRange = [100, 400]),
            void 0 !== o.iridescenceThicknessMinimum &&
              (t.iridescenceThicknessRange[0] = o.iridescenceThicknessMinimum),
            void 0 !== o.iridescenceThicknessMaximum &&
              (t.iridescenceThicknessRange[1] = o.iridescenceThicknessMaximum),
            void 0 !== o.iridescenceThicknessTexture &&
              n.push(r.assignTexture(t, 'iridescenceThicknessMap', o.iridescenceThicknessTexture)),
            Promise.all(n)
          );
        }
      }
      class f {
        constructor(e) {
          (this.parser = e), (this.name = a.KHR_MATERIALS_SHEEN);
        }
        getMaterialType(e) {
          const t = this.parser.json.materials[e];
          return t.extensions && t.extensions[this.name] ? s.MeshPhysicalMaterial : null;
        }
        extendMaterialParams(e, t) {
          const r = this.parser,
            n = r.json.materials[e];
          if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
          const o = [];
          (t.sheenColor = new s.Color(0, 0, 0)), (t.sheenRoughness = 0), (t.sheen = 1);
          const i = n.extensions[this.name];
          return (
            void 0 !== i.sheenColorFactor && t.sheenColor.fromArray(i.sheenColorFactor),
            void 0 !== i.sheenRoughnessFactor && (t.sheenRoughness = i.sheenRoughnessFactor),
            void 0 !== i.sheenColorTexture &&
              o.push(r.assignTexture(t, 'sheenColorMap', i.sheenColorTexture, s.sRGBEncoding)),
            void 0 !== i.sheenRoughnessTexture &&
              o.push(r.assignTexture(t, 'sheenRoughnessMap', i.sheenRoughnessTexture)),
            Promise.all(o)
          );
        }
      }
      class m {
        constructor(e) {
          (this.parser = e), (this.name = a.KHR_MATERIALS_TRANSMISSION);
        }
        getMaterialType(e) {
          const t = this.parser.json.materials[e];
          return t.extensions && t.extensions[this.name] ? s.MeshPhysicalMaterial : null;
        }
        extendMaterialParams(e, t) {
          const r = this.parser,
            s = r.json.materials[e];
          if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
          const n = [],
            o = s.extensions[this.name];
          return (
            void 0 !== o.transmissionFactor && (t.transmission = o.transmissionFactor),
            void 0 !== o.transmissionTexture &&
              n.push(r.assignTexture(t, 'transmissionMap', o.transmissionTexture)),
            Promise.all(n)
          );
        }
      }
      class p {
        constructor(e) {
          (this.parser = e), (this.name = a.KHR_MATERIALS_VOLUME);
        }
        getMaterialType(e) {
          const t = this.parser.json.materials[e];
          return t.extensions && t.extensions[this.name] ? s.MeshPhysicalMaterial : null;
        }
        extendMaterialParams(e, t) {
          const r = this.parser,
            n = r.json.materials[e];
          if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
          const o = [],
            i = n.extensions[this.name];
          (t.thickness = void 0 !== i.thicknessFactor ? i.thicknessFactor : 0),
            void 0 !== i.thicknessTexture &&
              o.push(r.assignTexture(t, 'thicknessMap', i.thicknessTexture)),
            (t.attenuationDistance = i.attenuationDistance || 1 / 0);
          const a = i.attenuationColor || [1, 1, 1];
          return (t.attenuationColor = new s.Color(a[0], a[1], a[2])), Promise.all(o);
        }
      }
      class g {
        constructor(e) {
          (this.parser = e), (this.name = a.KHR_MATERIALS_IOR);
        }
        getMaterialType(e) {
          const t = this.parser.json.materials[e];
          return t.extensions && t.extensions[this.name] ? s.MeshPhysicalMaterial : null;
        }
        extendMaterialParams(e, t) {
          const r = this.parser.json.materials[e];
          if (!r.extensions || !r.extensions[this.name]) return Promise.resolve();
          const s = r.extensions[this.name];
          return (t.ior = void 0 !== s.ior ? s.ior : 1.5), Promise.resolve();
        }
      }
      class A {
        constructor(e) {
          (this.parser = e), (this.name = a.KHR_MATERIALS_SPECULAR);
        }
        getMaterialType(e) {
          const t = this.parser.json.materials[e];
          return t.extensions && t.extensions[this.name] ? s.MeshPhysicalMaterial : null;
        }
        extendMaterialParams(e, t) {
          const r = this.parser,
            n = r.json.materials[e];
          if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
          const o = [],
            i = n.extensions[this.name];
          (t.specularIntensity = void 0 !== i.specularFactor ? i.specularFactor : 1),
            void 0 !== i.specularTexture &&
              o.push(r.assignTexture(t, 'specularIntensityMap', i.specularTexture));
          const a = i.specularColorFactor || [1, 1, 1];
          return (
            (t.specularColor = new s.Color(a[0], a[1], a[2])),
            void 0 !== i.specularColorTexture &&
              o.push(
                r.assignTexture(t, 'specularColorMap', i.specularColorTexture, s.sRGBEncoding),
              ),
            Promise.all(o)
          );
        }
      }
      class T {
        constructor(e) {
          (this.parser = e), (this.name = a.KHR_TEXTURE_BASISU);
        }
        loadTexture(e) {
          const t = this.parser,
            r = t.json,
            s = r.textures[e];
          if (!s.extensions || !s.extensions[this.name]) return null;
          const n = s.extensions[this.name],
            o = t.options.ktx2Loader;
          if (!o) {
            if (r.extensionsRequired && r.extensionsRequired.indexOf(this.name) >= 0)
              throw new Error(
                'THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures',
              );
            return null;
          }
          return t.loadTextureImage(e, n.source, o);
        }
      }
      class x {
        constructor(e) {
          (this.parser = e), (this.name = a.EXT_TEXTURE_WEBP), (this.isSupported = null);
        }
        loadTexture(e) {
          const t = this.name,
            r = this.parser,
            s = r.json,
            n = s.textures[e];
          if (!n.extensions || !n.extensions[t]) return null;
          const o = n.extensions[t],
            i = s.images[o.source];
          let a = r.textureLoader;
          if (i.uri) {
            const e = r.options.manager.getHandler(i.uri);
            null !== e && (a = e);
          }
          return this.detectSupport().then(function (n) {
            if (n) return r.loadTextureImage(e, o.source, a);
            if (s.extensionsRequired && s.extensionsRequired.indexOf(t) >= 0)
              throw new Error('THREE.GLTFLoader: WebP required by asset but unsupported.');
            return r.loadTexture(e);
          });
        }
        detectSupport() {
          return (
            this.isSupported ||
              (this.isSupported = new Promise(function (e) {
                const t = new Image();
                (t.src =
                  'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA'),
                  (t.onload = t.onerror =
                    function () {
                      e(1 === t.height);
                    });
              })),
            this.isSupported
          );
        }
      }
      class b {
        constructor(e) {
          (this.parser = e), (this.name = a.EXT_TEXTURE_AVIF), (this.isSupported = null);
        }
        loadTexture(e) {
          const t = this.name,
            r = this.parser,
            s = r.json,
            n = s.textures[e];
          if (!n.extensions || !n.extensions[t]) return null;
          const o = n.extensions[t],
            i = s.images[o.source];
          let a = r.textureLoader;
          if (i.uri) {
            const e = r.options.manager.getHandler(i.uri);
            null !== e && (a = e);
          }
          return this.detectSupport().then(function (n) {
            if (n) return r.loadTextureImage(e, o.source, a);
            if (s.extensionsRequired && s.extensionsRequired.indexOf(t) >= 0)
              throw new Error('THREE.GLTFLoader: AVIF required by asset but unsupported.');
            return r.loadTexture(e);
          });
        }
        detectSupport() {
          return (
            this.isSupported ||
              (this.isSupported = new Promise(function (e) {
                const t = new Image();
                (t.src =
                  'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI='),
                  (t.onload = t.onerror =
                    function () {
                      e(1 === t.height);
                    });
              })),
            this.isSupported
          );
        }
      }
      class R {
        constructor(e) {
          (this.name = a.EXT_MESHOPT_COMPRESSION), (this.parser = e);
        }
        loadBufferView(e) {
          const t = this.parser.json,
            r = t.bufferViews[e];
          if (r.extensions && r.extensions[this.name]) {
            const e = r.extensions[this.name],
              s = this.parser.getDependency('buffer', e.buffer),
              n = this.parser.options.meshoptDecoder;
            if (!n || !n.supported) {
              if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0)
                throw new Error(
                  'THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files',
                );
              return null;
            }
            return s.then(function (t) {
              const r = e.byteOffset || 0,
                s = e.byteLength || 0,
                o = e.count,
                i = e.byteStride,
                a = new Uint8Array(t, r, s);
              return n.decodeGltfBufferAsync
                ? n.decodeGltfBufferAsync(o, i, a, e.mode, e.filter).then(function (e) {
                    return e.buffer;
                  })
                : n.ready.then(function () {
                    const t = new ArrayBuffer(o * i);
                    return n.decodeGltfBuffer(new Uint8Array(t), o, i, a, e.mode, e.filter), t;
                  });
            });
          }
          return null;
        }
      }
      class w {
        constructor(e) {
          (this.name = a.EXT_MESH_GPU_INSTANCING), (this.parser = e);
        }
        createNodeMesh(e) {
          const t = this.parser.json,
            r = t.nodes[e];
          if (!r.extensions || !r.extensions[this.name] || void 0 === r.mesh) return null;
          const n = t.meshes[r.mesh];
          for (const e of n.primitives)
            if (
              e.mode !== C.TRIANGLES &&
              e.mode !== C.TRIANGLE_STRIP &&
              e.mode !== C.TRIANGLE_FAN &&
              void 0 !== e.mode
            )
              return null;
          const o = r.extensions[this.name].attributes,
            i = [],
            a = {};
          for (const e in o)
            i.push(this.parser.getDependency('accessor', o[e]).then((t) => ((a[e] = t), a[e])));
          return i.length < 1
            ? null
            : (i.push(this.parser.createNodeMesh(e)),
              Promise.all(i).then((e) => {
                const t = e.pop(),
                  r = t.isGroup ? t.children : [t],
                  n = e[0].count,
                  o = [];
                for (const e of r) {
                  const t = new s.Matrix4(),
                    r = new s.Vector3(),
                    i = new s.Quaternion(),
                    c = new s.Vector3(1, 1, 1),
                    u = new s.InstancedMesh(e.geometry, e.material, n);
                  for (let e = 0; e < n; e++)
                    a.TRANSLATION && r.fromBufferAttribute(a.TRANSLATION, e),
                      a.ROTATION && i.fromBufferAttribute(a.ROTATION, e),
                      a.SCALE && c.fromBufferAttribute(a.SCALE, e),
                      u.setMatrixAt(e, t.compose(r, i, c));
                  for (const t in a)
                    'TRANSLATION' !== t &&
                      'ROTATION' !== t &&
                      'SCALE' !== t &&
                      e.geometry.setAttribute(t, a[t]);
                  s.Object3D.prototype.copy.call(u, e),
                    this.parser.assignFinalMaterial(u),
                    o.push(u);
                }
                return t.isGroup ? (t.clear(), t.add(...o), t) : o[0];
              }));
        }
      }
      const E = 'glTF',
        y = 1313821514,
        v = 5130562;
      class M {
        constructor(e) {
          (this.name = a.KHR_BINARY_GLTF), (this.content = null), (this.body = null);
          const t = new DataView(e, 0, 12),
            r = new TextDecoder();
          if (
            ((this.header = {
              magic: r.decode(new Uint8Array(e.slice(0, 4))),
              version: t.getUint32(4, !0),
              length: t.getUint32(8, !0),
            }),
            this.header.magic !== E)
          )
            throw new Error('THREE.GLTFLoader: Unsupported glTF-Binary header.');
          if (this.header.version < 2)
            throw new Error('THREE.GLTFLoader: Legacy binary file detected.');
          const s = this.header.length - 12,
            n = new DataView(e, 12);
          let o = 0;
          for (; o < s; ) {
            const t = n.getUint32(o, !0);
            o += 4;
            const s = n.getUint32(o, !0);
            if (((o += 4), s === y)) {
              const s = new Uint8Array(e, 12 + o, t);
              this.content = r.decode(s);
            } else if (s === v) {
              const r = 12 + o;
              this.body = e.slice(r, r + t);
            }
            o += t;
          }
          if (null === this.content) throw new Error('THREE.GLTFLoader: JSON content not found.');
        }
      }
      class _ {
        constructor(e, t) {
          if (!t) throw new Error('THREE.GLTFLoader: No DRACOLoader instance provided.');
          (this.name = a.KHR_DRACO_MESH_COMPRESSION),
            (this.json = e),
            (this.dracoLoader = t),
            this.dracoLoader.preload();
        }
        decodePrimitive(e, t) {
          const r = this.json,
            s = this.dracoLoader,
            n = e.extensions[this.name].bufferView,
            o = e.extensions[this.name].attributes,
            i = {},
            a = {},
            c = {};
          for (const e in o) {
            const t = G[e] || e.toLowerCase();
            i[t] = o[e];
          }
          for (const t in e.attributes) {
            const s = G[t] || t.toLowerCase();
            if (void 0 !== o[t]) {
              const n = r.accessors[e.attributes[t]],
                o = O[n.componentType];
              (c[s] = o.name), (a[s] = !0 === n.normalized);
            }
          }
          return t.getDependency('bufferView', n).then(function (e) {
            return new Promise(function (t) {
              s.decodeDracoFile(
                e,
                function (e) {
                  for (const t in e.attributes) {
                    const r = e.attributes[t],
                      s = a[t];
                    void 0 !== s && (r.normalized = s);
                  }
                  t(e);
                },
                i,
                c,
              );
            });
          });
        }
      }
      class S {
        constructor() {
          this.name = a.KHR_TEXTURE_TRANSFORM;
        }
        extendTexture(e, t) {
          return (void 0 !== t.texCoord && t.texCoord !== e.channel) ||
            void 0 !== t.offset ||
            void 0 !== t.rotation ||
            void 0 !== t.scale
            ? ((e = e.clone()),
              void 0 !== t.texCoord && (e.channel = t.texCoord),
              void 0 !== t.offset && e.offset.fromArray(t.offset),
              void 0 !== t.rotation && (e.rotation = t.rotation),
              void 0 !== t.scale && e.repeat.fromArray(t.scale),
              (e.needsUpdate = !0),
              e)
            : e;
        }
      }
      class I {
        constructor() {
          this.name = a.KHR_MESH_QUANTIZATION;
        }
      }
      class L extends s.Interpolant {
        constructor(e, t, r, s) {
          super(e, t, r, s);
        }
        copySampleValue_(e) {
          const t = this.resultBuffer,
            r = this.sampleValues,
            s = this.valueSize,
            n = e * s * 3 + s;
          for (let e = 0; e !== s; e++) t[e] = r[n + e];
          return t;
        }
        interpolate_(e, t, r, s) {
          const n = this.resultBuffer,
            o = this.sampleValues,
            i = this.valueSize,
            a = 2 * i,
            c = 3 * i,
            u = s - t,
            l = (r - t) / u,
            h = l * l,
            d = h * l,
            f = e * c,
            m = f - c,
            p = -2 * d + 3 * h,
            g = d - h,
            A = 1 - p,
            T = g - h + l;
          for (let e = 0; e !== i; e++) {
            const t = o[m + e + i],
              r = o[m + e + a] * u,
              s = o[f + e + i],
              c = o[f + e] * u;
            n[e] = A * t + T * r + p * s + g * c;
          }
          return n;
        }
      }
      const N = new s.Quaternion();
      class B extends L {
        interpolate_(e, t, r, s) {
          const n = super.interpolate_(e, t, r, s);
          return N.fromArray(n).normalize().toArray(n), n;
        }
      }
      const C = {
          FLOAT: 5126,
          FLOAT_MAT3: 35675,
          FLOAT_MAT4: 35676,
          FLOAT_VEC2: 35664,
          FLOAT_VEC3: 35665,
          FLOAT_VEC4: 35666,
          LINEAR: 9729,
          REPEAT: 10497,
          SAMPLER_2D: 35678,
          POINTS: 0,
          LINES: 1,
          LINE_LOOP: 2,
          LINE_STRIP: 3,
          TRIANGLES: 4,
          TRIANGLE_STRIP: 5,
          TRIANGLE_FAN: 6,
          UNSIGNED_BYTE: 5121,
          UNSIGNED_SHORT: 5123,
        },
        O = {
          5120: Int8Array,
          5121: Uint8Array,
          5122: Int16Array,
          5123: Uint16Array,
          5125: Uint32Array,
          5126: Float32Array,
        },
        P = {
          9728: s.NearestFilter,
          9729: s.LinearFilter,
          9984: s.NearestMipmapNearestFilter,
          9985: s.LinearMipmapNearestFilter,
          9986: s.NearestMipmapLinearFilter,
          9987: s.LinearMipmapLinearFilter,
        },
        H = {
          33071: s.ClampToEdgeWrapping,
          33648: s.MirroredRepeatWrapping,
          10497: s.RepeatWrapping,
        },
        F = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT2: 4, MAT3: 9, MAT4: 16 },
        G = {
          POSITION: 'position',
          NORMAL: 'normal',
          TANGENT: 'tangent',
          TEXCOORD_0: 'uv',
          TEXCOORD_1: 'uv2',
          COLOR_0: 'color',
          WEIGHTS_0: 'skinWeight',
          JOINTS_0: 'skinIndex',
        },
        k = {
          scale: 'scale',
          translation: 'position',
          rotation: 'quaternion',
          weights: 'morphTargetInfluences',
        },
        U = { CUBICSPLINE: void 0, LINEAR: s.InterpolateLinear, STEP: s.InterpolateDiscrete },
        D = 'OPAQUE',
        V = 'MASK',
        j = 'BLEND';
      function K(e, t, r) {
        for (const s in r.extensions)
          void 0 === e[s] &&
            ((t.userData.gltfExtensions = t.userData.gltfExtensions || {}),
            (t.userData.gltfExtensions[s] = r.extensions[s]));
      }
      function z(e, t) {
        void 0 !== t.extras &&
          ('object' == typeof t.extras
            ? Object.assign(e.userData, t.extras)
            : console.warn('THREE.GLTFLoader: Ignoring primitive type .extras, ' + t.extras));
      }
      function X(e, t) {
        if ((e.updateMorphTargets(), void 0 !== t.weights))
          for (let r = 0, s = t.weights.length; r < s; r++)
            e.morphTargetInfluences[r] = t.weights[r];
        if (t.extras && Array.isArray(t.extras.targetNames)) {
          const r = t.extras.targetNames;
          if (e.morphTargetInfluences.length === r.length) {
            e.morphTargetDictionary = {};
            for (let t = 0, s = r.length; t < s; t++) e.morphTargetDictionary[r[t]] = t;
          } else
            console.warn('THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.');
        }
      }
      function q(e) {
        const t = e.extensions && e.extensions[a.KHR_DRACO_MESH_COMPRESSION];
        let r;
        return (
          (r = t
            ? 'draco:' + t.bufferView + ':' + t.indices + ':' + W(t.attributes)
            : e.indices + ':' + W(e.attributes) + ':' + e.mode),
          r
        );
      }
      function W(e) {
        let t = '';
        const r = Object.keys(e).sort();
        for (let s = 0, n = r.length; s < n; s++) t += r[s] + ':' + e[r[s]] + ';';
        return t;
      }
      function Y(e) {
        switch (e) {
          case Int8Array:
            return 1 / 127;
          case Uint8Array:
            return 1 / 255;
          case Int16Array:
            return 1 / 32767;
          case Uint16Array:
            return 1 / 65535;
          default:
            throw new Error('THREE.GLTFLoader: Unsupported normalized accessor component type.');
        }
      }
      const Q = new s.Matrix4();
      class Z {
        constructor(e = {}, t = {}) {
          (this.json = e),
            (this.extensions = {}),
            (this.plugins = {}),
            (this.options = t),
            (this.cache = new i()),
            (this.associations = new Map()),
            (this.primitiveCache = {}),
            (this.nodeCache = {}),
            (this.meshCache = { refs: {}, uses: {} }),
            (this.cameraCache = { refs: {}, uses: {} }),
            (this.lightCache = { refs: {}, uses: {} }),
            (this.sourceCache = {}),
            (this.textureCache = {}),
            (this.nodeNamesUsed = {});
          let r = !1,
            n = !1,
            o = -1;
          'undefined' != typeof navigator &&
            ((r = !0 === /^((?!chrome|android).)*safari/i.test(navigator.userAgent)),
            (n = navigator.userAgent.indexOf('Firefox') > -1),
            (o = n ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1)),
            'undefined' == typeof createImageBitmap || r || (n && o < 98)
              ? (this.textureLoader = new s.TextureLoader(this.options.manager))
              : (this.textureLoader = new s.ImageBitmapLoader(this.options.manager)),
            this.textureLoader.setCrossOrigin(this.options.crossOrigin),
            this.textureLoader.setRequestHeader(this.options.requestHeader),
            (this.fileLoader = new s.FileLoader(this.options.manager)),
            this.fileLoader.setResponseType('arraybuffer'),
            'use-credentials' === this.options.crossOrigin &&
              this.fileLoader.setWithCredentials(!0);
        }
        setExtensions(e) {
          this.extensions = e;
        }
        setPlugins(e) {
          this.plugins = e;
        }
        parse(e, t) {
          const r = this,
            s = this.json,
            n = this.extensions;
          this.cache.removeAll(),
            (this.nodeCache = {}),
            this._invokeAll(function (e) {
              return e._markDefs && e._markDefs();
            }),
            Promise.all(
              this._invokeAll(function (e) {
                return e.beforeRoot && e.beforeRoot();
              }),
            )
              .then(function () {
                return Promise.all([
                  r.getDependencies('scene'),
                  r.getDependencies('animation'),
                  r.getDependencies('camera'),
                ]);
              })
              .then(function (t) {
                const o = {
                  scene: t[0][s.scene || 0],
                  scenes: t[0],
                  animations: t[1],
                  cameras: t[2],
                  asset: s.asset,
                  parser: r,
                  userData: {},
                };
                K(n, o, s),
                  z(o, s),
                  Promise.all(
                    r._invokeAll(function (e) {
                      return e.afterRoot && e.afterRoot(o);
                    }),
                  ).then(function () {
                    e(o);
                  });
              })
              .catch(t);
        }
        _markDefs() {
          const e = this.json.nodes || [],
            t = this.json.skins || [],
            r = this.json.meshes || [];
          for (let r = 0, s = t.length; r < s; r++) {
            const s = t[r].joints;
            for (let t = 0, r = s.length; t < r; t++) e[s[t]].isBone = !0;
          }
          for (let t = 0, s = e.length; t < s; t++) {
            const s = e[t];
            void 0 !== s.mesh &&
              (this._addNodeRef(this.meshCache, s.mesh),
              void 0 !== s.skin && (r[s.mesh].isSkinnedMesh = !0)),
              void 0 !== s.camera && this._addNodeRef(this.cameraCache, s.camera);
          }
        }
        _addNodeRef(e, t) {
          void 0 !== t && (void 0 === e.refs[t] && (e.refs[t] = e.uses[t] = 0), e.refs[t]++);
        }
        _getNodeRef(e, t, r) {
          if (e.refs[t] <= 1) return r;
          const s = r.clone(),
            n = (e, t) => {
              const r = this.associations.get(e);
              null != r && this.associations.set(t, r);
              for (const [r, s] of e.children.entries()) n(s, t.children[r]);
            };
          return n(r, s), (s.name += '_instance_' + e.uses[t]++), s;
        }
        _invokeOne(e) {
          const t = Object.values(this.plugins);
          t.push(this);
          for (let r = 0; r < t.length; r++) {
            const s = e(t[r]);
            if (s) return s;
          }
          return null;
        }
        _invokeAll(e) {
          const t = Object.values(this.plugins);
          t.unshift(this);
          const r = [];
          for (let s = 0; s < t.length; s++) {
            const n = e(t[s]);
            n && r.push(n);
          }
          return r;
        }
        getDependency(e, t) {
          const r = e + ':' + t;
          let s = this.cache.get(r);
          if (!s) {
            switch (e) {
              case 'scene':
                s = this.loadScene(t);
                break;
              case 'node':
                s = this._invokeOne(function (e) {
                  return e.loadNode && e.loadNode(t);
                });
                break;
              case 'mesh':
                s = this._invokeOne(function (e) {
                  return e.loadMesh && e.loadMesh(t);
                });
                break;
              case 'accessor':
                s = this.loadAccessor(t);
                break;
              case 'bufferView':
                s = this._invokeOne(function (e) {
                  return e.loadBufferView && e.loadBufferView(t);
                });
                break;
              case 'buffer':
                s = this.loadBuffer(t);
                break;
              case 'material':
                s = this._invokeOne(function (e) {
                  return e.loadMaterial && e.loadMaterial(t);
                });
                break;
              case 'texture':
                s = this._invokeOne(function (e) {
                  return e.loadTexture && e.loadTexture(t);
                });
                break;
              case 'skin':
                s = this.loadSkin(t);
                break;
              case 'animation':
                s = this._invokeOne(function (e) {
                  return e.loadAnimation && e.loadAnimation(t);
                });
                break;
              case 'camera':
                s = this.loadCamera(t);
                break;
              default:
                if (
                  ((s = this._invokeOne(function (r) {
                    return r != this && r.getDependency && r.getDependency(e, t);
                  })),
                  !s)
                )
                  throw new Error('Unknown type: ' + e);
            }
            this.cache.add(r, s);
          }
          return s;
        }
        getDependencies(e) {
          let t = this.cache.get(e);
          if (!t) {
            const r = this,
              s = this.json[e + ('mesh' === e ? 'es' : 's')] || [];
            (t = Promise.all(
              s.map(function (t, s) {
                return r.getDependency(e, s);
              }),
            )),
              this.cache.add(e, t);
          }
          return t;
        }
        loadBuffer(e) {
          const t = this.json.buffers[e],
            r = this.fileLoader;
          if (t.type && 'arraybuffer' !== t.type)
            throw new Error('THREE.GLTFLoader: ' + t.type + ' buffer type is not supported.');
          if (void 0 === t.uri && 0 === e)
            return Promise.resolve(this.extensions[a.KHR_BINARY_GLTF].body);
          const n = this.options;
          return new Promise(function (e, o) {
            r.load(s.LoaderUtils.resolveURL(t.uri, n.path), e, void 0, function () {
              o(new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'));
            });
          });
        }
        loadBufferView(e) {
          const t = this.json.bufferViews[e];
          return this.getDependency('buffer', t.buffer).then(function (e) {
            const r = t.byteLength || 0,
              s = t.byteOffset || 0;
            return e.slice(s, s + r);
          });
        }
        loadAccessor(e) {
          const t = this,
            r = this.json,
            n = this.json.accessors[e];
          if (void 0 === n.bufferView && void 0 === n.sparse) {
            const e = F[n.type],
              t = O[n.componentType],
              r = !0 === n.normalized,
              o = new t(n.count * e);
            return Promise.resolve(new s.BufferAttribute(o, e, r));
          }
          const o = [];
          return (
            void 0 !== n.bufferView
              ? o.push(this.getDependency('bufferView', n.bufferView))
              : o.push(null),
            void 0 !== n.sparse &&
              (o.push(this.getDependency('bufferView', n.sparse.indices.bufferView)),
              o.push(this.getDependency('bufferView', n.sparse.values.bufferView))),
            Promise.all(o).then(function (e) {
              const o = e[0],
                i = F[n.type],
                a = O[n.componentType],
                c = a.BYTES_PER_ELEMENT,
                u = c * i,
                l = n.byteOffset || 0,
                h = void 0 !== n.bufferView ? r.bufferViews[n.bufferView].byteStride : void 0,
                d = !0 === n.normalized;
              let f, m;
              if (h && h !== u) {
                const e = Math.floor(l / h),
                  r =
                    'InterleavedBuffer:' +
                    n.bufferView +
                    ':' +
                    n.componentType +
                    ':' +
                    e +
                    ':' +
                    n.count;
                let u = t.cache.get(r);
                u ||
                  ((f = new a(o, e * h, (n.count * h) / c)),
                  (u = new s.InterleavedBuffer(f, h / c)),
                  t.cache.add(r, u)),
                  (m = new s.InterleavedBufferAttribute(u, i, (l % h) / c, d));
              } else
                (f = null === o ? new a(n.count * i) : new a(o, l, n.count * i)),
                  (m = new s.BufferAttribute(f, i, d));
              if (void 0 !== n.sparse) {
                const t = F.SCALAR,
                  r = O[n.sparse.indices.componentType],
                  c = n.sparse.indices.byteOffset || 0,
                  u = n.sparse.values.byteOffset || 0,
                  l = new r(e[1], c, n.sparse.count * t),
                  h = new a(e[2], u, n.sparse.count * i);
                null !== o &&
                  (m = new s.BufferAttribute(m.array.slice(), m.itemSize, m.normalized));
                for (let e = 0, t = l.length; e < t; e++) {
                  const t = l[e];
                  if (
                    (m.setX(t, h[e * i]),
                    i >= 2 && m.setY(t, h[e * i + 1]),
                    i >= 3 && m.setZ(t, h[e * i + 2]),
                    i >= 4 && m.setW(t, h[e * i + 3]),
                    i >= 5)
                  )
                    throw new Error(
                      'THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.',
                    );
                }
              }
              return m;
            })
          );
        }
        loadTexture(e) {
          const t = this.json,
            r = this.options,
            s = t.textures[e].source,
            n = t.images[s];
          let o = this.textureLoader;
          if (n.uri) {
            const e = r.manager.getHandler(n.uri);
            null !== e && (o = e);
          }
          return this.loadTextureImage(e, s, o);
        }
        loadTextureImage(e, t, r) {
          const n = this,
            o = this.json,
            i = o.textures[e],
            a = o.images[t],
            c = (a.uri || a.bufferView) + ':' + i.sampler;
          if (this.textureCache[c]) return this.textureCache[c];
          const u = this.loadImageSource(t, r)
            .then(function (t) {
              (t.flipY = !1),
                (t.name = i.name || a.name || ''),
                '' === t.name &&
                  'string' == typeof a.uri &&
                  !1 === a.uri.startsWith('data:image/') &&
                  (t.name = a.uri);
              const r = (o.samplers || {})[i.sampler] || {};
              return (
                (t.magFilter = P[r.magFilter] || s.LinearFilter),
                (t.minFilter = P[r.minFilter] || s.LinearMipmapLinearFilter),
                (t.wrapS = H[r.wrapS] || s.RepeatWrapping),
                (t.wrapT = H[r.wrapT] || s.RepeatWrapping),
                n.associations.set(t, { textures: e }),
                t
              );
            })
            .catch(function () {
              return null;
            });
          return (this.textureCache[c] = u), u;
        }
        loadImageSource(e, t) {
          const r = this,
            n = this.json,
            o = this.options;
          if (void 0 !== this.sourceCache[e]) return this.sourceCache[e].then((e) => e.clone());
          const i = n.images[e],
            a = self.URL || self.webkitURL;
          let c = i.uri || '',
            u = !1;
          if (void 0 !== i.bufferView)
            c = r.getDependency('bufferView', i.bufferView).then(function (e) {
              u = !0;
              const t = new Blob([e], { type: i.mimeType });
              return (c = a.createObjectURL(t)), c;
            });
          else if (void 0 === i.uri)
            throw new Error('THREE.GLTFLoader: Image ' + e + ' is missing URI and bufferView');
          const l = Promise.resolve(c)
            .then(function (e) {
              return new Promise(function (r, n) {
                let i = r;
                !0 === t.isImageBitmapLoader &&
                  (i = function (e) {
                    const t = new s.Texture(e);
                    (t.needsUpdate = !0), r(t);
                  }),
                  t.load(s.LoaderUtils.resolveURL(e, o.path), i, void 0, n);
              });
            })
            .then(function (e) {
              var t;
              return (
                !0 === u && a.revokeObjectURL(c),
                (e.userData.mimeType =
                  i.mimeType ||
                  ((t = i.uri).search(/\.jpe?g($|\?)/i) > 0 || 0 === t.search(/^data\:image\/jpeg/)
                    ? 'image/jpeg'
                    : t.search(/\.webp($|\?)/i) > 0 || 0 === t.search(/^data\:image\/webp/)
                      ? 'image/webp'
                      : 'image/png')),
                e
              );
            })
            .catch(function (e) {
              throw (console.error("THREE.GLTFLoader: Couldn't load texture", c), e);
            });
          return (this.sourceCache[e] = l), l;
        }
        assignTexture(e, t, r, s) {
          const n = this;
          return this.getDependency('texture', r.index).then(function (o) {
            if (!o) return null;
            if (
              (void 0 !== r.texCoord && r.texCoord > 0 && ((o = o.clone()).channel = r.texCoord),
              n.extensions[a.KHR_TEXTURE_TRANSFORM])
            ) {
              const e = void 0 !== r.extensions ? r.extensions[a.KHR_TEXTURE_TRANSFORM] : void 0;
              if (e) {
                const t = n.associations.get(o);
                (o = n.extensions[a.KHR_TEXTURE_TRANSFORM].extendTexture(o, e)),
                  n.associations.set(o, t);
              }
            }
            return void 0 !== s && (o.encoding = s), (e[t] = o), o;
          });
        }
        assignFinalMaterial(e) {
          const t = e.geometry;
          let r = e.material;
          const n = void 0 === t.attributes.tangent,
            o = void 0 !== t.attributes.color,
            i = void 0 === t.attributes.normal;
          if (e.isPoints) {
            const e = 'PointsMaterial:' + r.uuid;
            let t = this.cache.get(e);
            t ||
              ((t = new s.PointsMaterial()),
              s.Material.prototype.copy.call(t, r),
              t.color.copy(r.color),
              (t.map = r.map),
              (t.sizeAttenuation = !1),
              this.cache.add(e, t)),
              (r = t);
          } else if (e.isLine) {
            const e = 'LineBasicMaterial:' + r.uuid;
            let t = this.cache.get(e);
            t ||
              ((t = new s.LineBasicMaterial()),
              s.Material.prototype.copy.call(t, r),
              t.color.copy(r.color),
              (t.map = r.map),
              this.cache.add(e, t)),
              (r = t);
          }
          if (n || o || i) {
            let e = 'ClonedMaterial:' + r.uuid + ':';
            n && (e += 'derivative-tangents:'),
              o && (e += 'vertex-colors:'),
              i && (e += 'flat-shading:');
            let t = this.cache.get(e);
            t ||
              ((t = r.clone()),
              o && (t.vertexColors = !0),
              i && (t.flatShading = !0),
              n &&
                (t.normalScale && (t.normalScale.y *= -1),
                t.clearcoatNormalScale && (t.clearcoatNormalScale.y *= -1)),
              this.cache.add(e, t),
              this.associations.set(t, this.associations.get(r))),
              (r = t);
          }
          e.material = r;
        }
        getMaterialType() {
          return s.MeshStandardMaterial;
        }
        loadMaterial(e) {
          const t = this,
            r = this.json,
            n = this.extensions,
            o = r.materials[e];
          let i;
          const c = {},
            u = [];
          if ((o.extensions || {})[a.KHR_MATERIALS_UNLIT]) {
            const e = n[a.KHR_MATERIALS_UNLIT];
            (i = e.getMaterialType()), u.push(e.extendParams(c, o, t));
          } else {
            const r = o.pbrMetallicRoughness || {};
            if (
              ((c.color = new s.Color(1, 1, 1)), (c.opacity = 1), Array.isArray(r.baseColorFactor))
            ) {
              const e = r.baseColorFactor;
              c.color.fromArray(e), (c.opacity = e[3]);
            }
            void 0 !== r.baseColorTexture &&
              u.push(t.assignTexture(c, 'map', r.baseColorTexture, s.sRGBEncoding)),
              (c.metalness = void 0 !== r.metallicFactor ? r.metallicFactor : 1),
              (c.roughness = void 0 !== r.roughnessFactor ? r.roughnessFactor : 1),
              void 0 !== r.metallicRoughnessTexture &&
                (u.push(t.assignTexture(c, 'metalnessMap', r.metallicRoughnessTexture)),
                u.push(t.assignTexture(c, 'roughnessMap', r.metallicRoughnessTexture))),
              (i = this._invokeOne(function (t) {
                return t.getMaterialType && t.getMaterialType(e);
              })),
              u.push(
                Promise.all(
                  this._invokeAll(function (t) {
                    return t.extendMaterialParams && t.extendMaterialParams(e, c);
                  }),
                ),
              );
          }
          !0 === o.doubleSided && (c.side = s.DoubleSide);
          const l = o.alphaMode || D;
          if (
            (l === j
              ? ((c.transparent = !0), (c.depthWrite = !1))
              : ((c.transparent = !1),
                l === V && (c.alphaTest = void 0 !== o.alphaCutoff ? o.alphaCutoff : 0.5)),
            void 0 !== o.normalTexture &&
              i !== s.MeshBasicMaterial &&
              (u.push(t.assignTexture(c, 'normalMap', o.normalTexture)),
              (c.normalScale = new s.Vector2(1, 1)),
              void 0 !== o.normalTexture.scale))
          ) {
            const e = o.normalTexture.scale;
            c.normalScale.set(e, e);
          }
          return (
            void 0 !== o.occlusionTexture &&
              i !== s.MeshBasicMaterial &&
              (u.push(t.assignTexture(c, 'aoMap', o.occlusionTexture)),
              void 0 !== o.occlusionTexture.strength &&
                (c.aoMapIntensity = o.occlusionTexture.strength)),
            void 0 !== o.emissiveFactor &&
              i !== s.MeshBasicMaterial &&
              (c.emissive = new s.Color().fromArray(o.emissiveFactor)),
            void 0 !== o.emissiveTexture &&
              i !== s.MeshBasicMaterial &&
              u.push(t.assignTexture(c, 'emissiveMap', o.emissiveTexture, s.sRGBEncoding)),
            Promise.all(u).then(function () {
              const r = new i(c);
              return (
                o.name && (r.name = o.name),
                z(r, o),
                t.associations.set(r, { materials: e }),
                o.extensions && K(n, r, o),
                r
              );
            })
          );
        }
        createUniqueName(e) {
          const t = s.PropertyBinding.sanitizeNodeName(e || '');
          let r = t;
          for (let e = 1; this.nodeNamesUsed[r]; ++e) r = t + '_' + e;
          return (this.nodeNamesUsed[r] = !0), r;
        }
        loadGeometries(e) {
          const t = this,
            r = this.extensions,
            n = this.primitiveCache;
          function o(e) {
            return r[a.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e, t).then(function (r) {
              return J(r, e, t);
            });
          }
          const i = [];
          for (let r = 0, c = e.length; r < c; r++) {
            const c = e[r],
              u = q(c),
              l = n[u];
            if (l) i.push(l.promise);
            else {
              let e;
              (e =
                c.extensions && c.extensions[a.KHR_DRACO_MESH_COMPRESSION]
                  ? o(c)
                  : J(new s.BufferGeometry(), c, t)),
                (n[u] = { primitive: c, promise: e }),
                i.push(e);
            }
          }
          return Promise.all(i);
        }
        loadMesh(e) {
          const t = this,
            r = this.json,
            o = this.extensions,
            i = r.meshes[e],
            a = i.primitives,
            c = [];
          for (let e = 0, t = a.length; e < t; e++) {
            const t =
              void 0 === a[e].material
                ? (void 0 === (u = this.cache).DefaultMaterial &&
                    (u.DefaultMaterial = new s.MeshStandardMaterial({
                      color: 16777215,
                      emissive: 0,
                      metalness: 1,
                      roughness: 1,
                      transparent: !1,
                      depthTest: !0,
                      side: s.FrontSide,
                    })),
                  u.DefaultMaterial)
                : this.getDependency('material', a[e].material);
            c.push(t);
          }
          var u;
          return (
            c.push(t.loadGeometries(a)),
            Promise.all(c).then(function (r) {
              const c = r.slice(0, r.length - 1),
                u = r[r.length - 1],
                l = [];
              for (let r = 0, h = u.length; r < h; r++) {
                const h = u[r],
                  d = a[r];
                let f;
                const m = c[r];
                if (
                  d.mode === C.TRIANGLES ||
                  d.mode === C.TRIANGLE_STRIP ||
                  d.mode === C.TRIANGLE_FAN ||
                  void 0 === d.mode
                )
                  (f = !0 === i.isSkinnedMesh ? new s.SkinnedMesh(h, m) : new s.Mesh(h, m)),
                    !0 === f.isSkinnedMesh && f.normalizeSkinWeights(),
                    d.mode === C.TRIANGLE_STRIP
                      ? (f.geometry = (0, n.toTrianglesDrawMode)(
                          f.geometry,
                          s.TriangleStripDrawMode,
                        ))
                      : d.mode === C.TRIANGLE_FAN &&
                        (f.geometry = (0, n.toTrianglesDrawMode)(
                          f.geometry,
                          s.TriangleFanDrawMode,
                        ));
                else if (d.mode === C.LINES) f = new s.LineSegments(h, m);
                else if (d.mode === C.LINE_STRIP) f = new s.Line(h, m);
                else if (d.mode === C.LINE_LOOP) f = new s.LineLoop(h, m);
                else {
                  if (d.mode !== C.POINTS)
                    throw new Error('THREE.GLTFLoader: Primitive mode unsupported: ' + d.mode);
                  f = new s.Points(h, m);
                }
                Object.keys(f.geometry.morphAttributes).length > 0 && X(f, i),
                  (f.name = t.createUniqueName(i.name || 'mesh_' + e)),
                  z(f, i),
                  d.extensions && K(o, f, d),
                  t.assignFinalMaterial(f),
                  l.push(f);
              }
              for (let r = 0, s = l.length; r < s; r++)
                t.associations.set(l[r], { meshes: e, primitives: r });
              if (1 === l.length) return l[0];
              const h = new s.Group();
              t.associations.set(h, { meshes: e });
              for (let e = 0, t = l.length; e < t; e++) h.add(l[e]);
              return h;
            })
          );
        }
        loadCamera(e) {
          let t;
          const r = this.json.cameras[e],
            n = r[r.type];
          if (n)
            return (
              'perspective' === r.type
                ? (t = new s.PerspectiveCamera(
                    s.MathUtils.radToDeg(n.yfov),
                    n.aspectRatio || 1,
                    n.znear || 1,
                    n.zfar || 2e6,
                  ))
                : 'orthographic' === r.type &&
                  (t = new s.OrthographicCamera(-n.xmag, n.xmag, n.ymag, -n.ymag, n.znear, n.zfar)),
              r.name && (t.name = this.createUniqueName(r.name)),
              z(t, r),
              Promise.resolve(t)
            );
          console.warn('THREE.GLTFLoader: Missing camera parameters.');
        }
        loadSkin(e) {
          const t = this.json.skins[e],
            r = [];
          for (let e = 0, s = t.joints.length; e < s; e++)
            r.push(this._loadNodeShallow(t.joints[e]));
          return (
            void 0 !== t.inverseBindMatrices
              ? r.push(this.getDependency('accessor', t.inverseBindMatrices))
              : r.push(null),
            Promise.all(r).then(function (e) {
              const r = e.pop(),
                n = e,
                o = [],
                i = [];
              for (let e = 0, a = n.length; e < a; e++) {
                const a = n[e];
                if (a) {
                  o.push(a);
                  const t = new s.Matrix4();
                  null !== r && t.fromArray(r.array, 16 * e), i.push(t);
                } else
                  console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[e]);
              }
              return new s.Skeleton(o, i);
            })
          );
        }
        loadAnimation(e) {
          const t = this.json.animations[e],
            r = t.name ? t.name : 'animation_' + e,
            n = [],
            o = [],
            i = [],
            a = [],
            c = [];
          for (let e = 0, r = t.channels.length; e < r; e++) {
            const r = t.channels[e],
              s = t.samplers[r.sampler],
              u = r.target,
              l = u.node,
              h = void 0 !== t.parameters ? t.parameters[s.input] : s.input,
              d = void 0 !== t.parameters ? t.parameters[s.output] : s.output;
            void 0 !== u.node &&
              (n.push(this.getDependency('node', l)),
              o.push(this.getDependency('accessor', h)),
              i.push(this.getDependency('accessor', d)),
              a.push(s),
              c.push(u));
          }
          return Promise.all([
            Promise.all(n),
            Promise.all(o),
            Promise.all(i),
            Promise.all(a),
            Promise.all(c),
          ]).then(function (e) {
            const t = e[0],
              n = e[1],
              o = e[2],
              i = e[3],
              a = e[4],
              c = [];
            for (let e = 0, r = t.length; e < r; e++) {
              const r = t[e],
                u = n[e],
                l = o[e],
                h = i[e],
                d = a[e];
              if (void 0 === r) continue;
              let f;
              switch ((r.updateMatrix(), k[d.path])) {
                case k.weights:
                  f = s.NumberKeyframeTrack;
                  break;
                case k.rotation:
                  f = s.QuaternionKeyframeTrack;
                  break;
                case k.position:
                case k.scale:
                default:
                  f = s.VectorKeyframeTrack;
              }
              const m = r.name ? r.name : r.uuid,
                p = void 0 !== h.interpolation ? U[h.interpolation] : s.InterpolateLinear,
                g = [];
              k[d.path] === k.weights
                ? r.traverse(function (e) {
                    e.morphTargetInfluences && g.push(e.name ? e.name : e.uuid);
                  })
                : g.push(m);
              let A = l.array;
              if (l.normalized) {
                const e = Y(A.constructor),
                  t = new Float32Array(A.length);
                for (let r = 0, s = A.length; r < s; r++) t[r] = A[r] * e;
                A = t;
              }
              for (let e = 0, t = g.length; e < t; e++) {
                const t = new f(g[e] + '.' + k[d.path], u.array, A, p);
                'CUBICSPLINE' === h.interpolation &&
                  ((t.createInterpolant = function (e) {
                    return new (this instanceof s.QuaternionKeyframeTrack ? B : L)(
                      this.times,
                      this.values,
                      this.getValueSize() / 3,
                      e,
                    );
                  }),
                  (t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0)),
                  c.push(t);
              }
            }
            return new s.AnimationClip(r, void 0, c);
          });
        }
        createNodeMesh(e) {
          const t = this.json,
            r = this,
            s = t.nodes[e];
          return void 0 === s.mesh
            ? null
            : r.getDependency('mesh', s.mesh).then(function (e) {
                const t = r._getNodeRef(r.meshCache, s.mesh, e);
                return (
                  void 0 !== s.weights &&
                    t.traverse(function (e) {
                      if (e.isMesh)
                        for (let t = 0, r = s.weights.length; t < r; t++)
                          e.morphTargetInfluences[t] = s.weights[t];
                    }),
                  t
                );
              });
        }
        loadNode(e) {
          const t = this,
            r = this.json.nodes[e],
            s = t._loadNodeShallow(e),
            n = [],
            o = r.children || [];
          for (let e = 0, r = o.length; e < r; e++) n.push(t.getDependency('node', o[e]));
          const i = void 0 === r.skin ? Promise.resolve(null) : t.getDependency('skin', r.skin);
          return Promise.all([s, Promise.all(n), i]).then(function (e) {
            const t = e[0],
              r = e[1],
              s = e[2];
            null !== s &&
              t.traverse(function (e) {
                e.isSkinnedMesh && e.bind(s, Q);
              });
            for (let e = 0, s = r.length; e < s; e++) t.add(r[e]);
            return t;
          });
        }
        _loadNodeShallow(e) {
          const t = this.json,
            r = this.extensions,
            n = this;
          if (void 0 !== this.nodeCache[e]) return this.nodeCache[e];
          const o = t.nodes[e],
            i = o.name ? n.createUniqueName(o.name) : '',
            a = [],
            c = n._invokeOne(function (t) {
              return t.createNodeMesh && t.createNodeMesh(e);
            });
          return (
            c && a.push(c),
            void 0 !== o.camera &&
              a.push(
                n.getDependency('camera', o.camera).then(function (e) {
                  return n._getNodeRef(n.cameraCache, o.camera, e);
                }),
              ),
            n
              ._invokeAll(function (t) {
                return t.createNodeAttachment && t.createNodeAttachment(e);
              })
              .forEach(function (e) {
                a.push(e);
              }),
            (this.nodeCache[e] = Promise.all(a).then(function (t) {
              let a;
              if (
                ((a =
                  !0 === o.isBone
                    ? new s.Bone()
                    : t.length > 1
                      ? new s.Group()
                      : 1 === t.length
                        ? t[0]
                        : new s.Object3D()),
                a !== t[0])
              )
                for (let e = 0, r = t.length; e < r; e++) a.add(t[e]);
              if (
                (o.name && ((a.userData.name = o.name), (a.name = i)),
                z(a, o),
                o.extensions && K(r, a, o),
                void 0 !== o.matrix)
              ) {
                const e = new s.Matrix4();
                e.fromArray(o.matrix), a.applyMatrix4(e);
              } else
                void 0 !== o.translation && a.position.fromArray(o.translation),
                  void 0 !== o.rotation && a.quaternion.fromArray(o.rotation),
                  void 0 !== o.scale && a.scale.fromArray(o.scale);
              return (
                n.associations.has(a) || n.associations.set(a, {}),
                (n.associations.get(a).nodes = e),
                a
              );
            })),
            this.nodeCache[e]
          );
        }
        loadScene(e) {
          const t = this.extensions,
            r = this.json.scenes[e],
            n = this,
            o = new s.Group();
          r.name && (o.name = n.createUniqueName(r.name)), z(o, r), r.extensions && K(t, o, r);
          const i = r.nodes || [],
            a = [];
          for (let e = 0, t = i.length; e < t; e++) a.push(n.getDependency('node', i[e]));
          return Promise.all(a).then(function (e) {
            for (let t = 0, r = e.length; t < r; t++) o.add(e[t]);
            return (
              (n.associations = ((e) => {
                const t = new Map();
                for (const [e, r] of n.associations)
                  (e instanceof s.Material || e instanceof s.Texture) && t.set(e, r);
                return (
                  e.traverse((e) => {
                    const r = n.associations.get(e);
                    null != r && t.set(e, r);
                  }),
                  t
                );
              })(o)),
              o
            );
          });
        }
      }
      function J(e, t, r) {
        const n = t.attributes,
          o = [];
        function i(t, s) {
          return r.getDependency('accessor', t).then(function (t) {
            e.setAttribute(s, t);
          });
        }
        for (const t in n) {
          const r = G[t] || t.toLowerCase();
          r in e.attributes || o.push(i(n[t], r));
        }
        if (void 0 !== t.indices && !e.index) {
          const s = r.getDependency('accessor', t.indices).then(function (t) {
            e.setIndex(t);
          });
          o.push(s);
        }
        return (
          z(e, t),
          (function (e, t, r) {
            const n = t.attributes,
              o = new s.Box3();
            if (void 0 === n.POSITION) return;
            {
              const e = r.json.accessors[n.POSITION],
                t = e.min,
                i = e.max;
              if (void 0 === t || void 0 === i)
                return void console.warn(
                  'THREE.GLTFLoader: Missing min/max properties for accessor POSITION.',
                );
              if (
                (o.set(new s.Vector3(t[0], t[1], t[2]), new s.Vector3(i[0], i[1], i[2])),
                e.normalized)
              ) {
                const t = Y(O[e.componentType]);
                o.min.multiplyScalar(t), o.max.multiplyScalar(t);
              }
            }
            const i = t.targets;
            if (void 0 !== i) {
              const e = new s.Vector3(),
                t = new s.Vector3();
              for (let s = 0, n = i.length; s < n; s++) {
                const n = i[s];
                if (void 0 !== n.POSITION) {
                  const s = r.json.accessors[n.POSITION],
                    o = s.min,
                    i = s.max;
                  if (void 0 !== o && void 0 !== i) {
                    if (
                      (t.setX(Math.max(Math.abs(o[0]), Math.abs(i[0]))),
                      t.setY(Math.max(Math.abs(o[1]), Math.abs(i[1]))),
                      t.setZ(Math.max(Math.abs(o[2]), Math.abs(i[2]))),
                      s.normalized)
                    ) {
                      const e = Y(O[s.componentType]);
                      t.multiplyScalar(e);
                    }
                    e.max(t);
                  } else
                    console.warn(
                      'THREE.GLTFLoader: Missing min/max properties for accessor POSITION.',
                    );
                }
              }
              o.expandByVector(e);
            }
            e.boundingBox = o;
            const a = new s.Sphere();
            o.getCenter(a.center), (a.radius = o.min.distanceTo(o.max) / 2), (e.boundingSphere = a);
          })(e, t, r),
          Promise.all(o).then(function () {
            return void 0 !== t.targets
              ? (function (e, t, r) {
                  let s = !1,
                    n = !1,
                    o = !1;
                  for (let e = 0, r = t.length; e < r; e++) {
                    const r = t[e];
                    if (
                      (void 0 !== r.POSITION && (s = !0),
                      void 0 !== r.NORMAL && (n = !0),
                      void 0 !== r.COLOR_0 && (o = !0),
                      s && n && o)
                    )
                      break;
                  }
                  if (!s && !n && !o) return Promise.resolve(e);
                  const i = [],
                    a = [],
                    c = [];
                  for (let u = 0, l = t.length; u < l; u++) {
                    const l = t[u];
                    if (s) {
                      const t =
                        void 0 !== l.POSITION
                          ? r.getDependency('accessor', l.POSITION)
                          : e.attributes.position;
                      i.push(t);
                    }
                    if (n) {
                      const t =
                        void 0 !== l.NORMAL
                          ? r.getDependency('accessor', l.NORMAL)
                          : e.attributes.normal;
                      a.push(t);
                    }
                    if (o) {
                      const t =
                        void 0 !== l.COLOR_0
                          ? r.getDependency('accessor', l.COLOR_0)
                          : e.attributes.color;
                      c.push(t);
                    }
                  }
                  return Promise.all([Promise.all(i), Promise.all(a), Promise.all(c)]).then(
                    function (t) {
                      const r = t[0],
                        i = t[1],
                        a = t[2];
                      return (
                        s && (e.morphAttributes.position = r),
                        n && (e.morphAttributes.normal = i),
                        o && (e.morphAttributes.color = a),
                        (e.morphTargetsRelative = !0),
                        e
                      );
                    },
                  );
                })(e, t.targets, r)
              : e;
          })
        );
      }
    },
    40140: (e, t, r) => {
      r.r(t),
        r.d(t, {
          computeMikkTSpaceTangents: () => n,
          computeMorphedAttributes: () => m,
          deepCloneAttribute: () => a,
          deinterleaveAttribute: () => u,
          deinterleaveGeometry: () => l,
          estimateBytesUsed: () => h,
          interleaveAttributes: () => c,
          mergeAttributes: () => i,
          mergeBufferAttributes: () => T,
          mergeBufferGeometries: () => A,
          mergeGeometries: () => o,
          mergeGroups: () => p,
          mergeVertices: () => d,
          toCreasedNormals: () => g,
          toTrianglesDrawMode: () => f,
        });
      var s = r(81396);
      function n(e, t, r = !0) {
        if (!t || !t.isReady)
          throw new Error('BufferGeometryUtils: Initialized MikkTSpace library required.');
        if (!e.hasAttribute('position') || !e.hasAttribute('normal') || !e.hasAttribute('uv'))
          throw new Error(
            'BufferGeometryUtils: Tangents require "position", "normal", and "uv" attributes.',
          );
        function n(e) {
          if (e.normalized || e.isInterleavedBufferAttribute) {
            const t = new Float32Array(e.getCount() * e.itemSize);
            for (let r = 0, s = 0; r < e.getCount(); r++)
              (t[s++] = e.getX(r)), (t[s++] = e.getY(r)), e.itemSize > 2 && (t[s++] = e.getZ(r));
            return t;
          }
          return e.array instanceof Float32Array ? e.array : new Float32Array(e.array);
        }
        const o = e.index ? e.toNonIndexed() : e,
          i = t.generateTangents(
            n(o.attributes.position),
            n(o.attributes.normal),
            n(o.attributes.uv),
          );
        if (r) for (let e = 3; e < i.length; e += 4) i[e] *= -1;
        return o.setAttribute('tangent', new s.BufferAttribute(i, 4)), e !== o && e.copy(o), e;
      }
      function o(e, t = !1) {
        const r = null !== e[0].index,
          n = new Set(Object.keys(e[0].attributes)),
          o = new Set(Object.keys(e[0].morphAttributes)),
          a = {},
          c = {},
          u = e[0].morphTargetsRelative,
          l = new s.BufferGeometry();
        let h = 0;
        for (let s = 0; s < e.length; ++s) {
          const i = e[s];
          let d = 0;
          if (r !== (null !== i.index))
            return (
              console.error(
                'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' +
                  s +
                  '. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.',
              ),
              null
            );
          for (const e in i.attributes) {
            if (!n.has(e))
              return (
                console.error(
                  'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' +
                    s +
                    '. All geometries must have compatible attributes; make sure "' +
                    e +
                    '" attribute exists among all geometries, or in none of them.',
                ),
                null
              );
            void 0 === a[e] && (a[e] = []), a[e].push(i.attributes[e]), d++;
          }
          if (d !== n.size)
            return (
              console.error(
                'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' +
                  s +
                  '. Make sure all geometries have the same number of attributes.',
              ),
              null
            );
          if (u !== i.morphTargetsRelative)
            return (
              console.error(
                'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' +
                  s +
                  '. .morphTargetsRelative must be consistent throughout all geometries.',
              ),
              null
            );
          for (const e in i.morphAttributes) {
            if (!o.has(e))
              return (
                console.error(
                  'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' +
                    s +
                    '.  .morphAttributes must be consistent throughout all geometries.',
                ),
                null
              );
            void 0 === c[e] && (c[e] = []), c[e].push(i.morphAttributes[e]);
          }
          if (t) {
            let e;
            if (r) e = i.index.count;
            else {
              if (void 0 === i.attributes.position)
                return (
                  console.error(
                    'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' +
                      s +
                      '. The geometry must have either an index or a position attribute',
                  ),
                  null
                );
              e = i.attributes.position.count;
            }
            l.addGroup(h, e, s), (h += e);
          }
        }
        if (r) {
          let t = 0;
          const r = [];
          for (let s = 0; s < e.length; ++s) {
            const n = e[s].index;
            for (let e = 0; e < n.count; ++e) r.push(n.getX(e) + t);
            t += e[s].attributes.position.count;
          }
          l.setIndex(r);
        }
        for (const e in a) {
          const t = i(a[e]);
          if (!t)
            return (
              console.error(
                'THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the ' +
                  e +
                  ' attribute.',
              ),
              null
            );
          l.setAttribute(e, t);
        }
        for (const e in c) {
          const t = c[e][0].length;
          if (0 === t) break;
          (l.morphAttributes = l.morphAttributes || {}), (l.morphAttributes[e] = []);
          for (let r = 0; r < t; ++r) {
            const t = [];
            for (let s = 0; s < c[e].length; ++s) t.push(c[e][s][r]);
            const s = i(t);
            if (!s)
              return (
                console.error(
                  'THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the ' +
                    e +
                    ' morphAttribute.',
                ),
                null
              );
            l.morphAttributes[e].push(s);
          }
        }
        return l;
      }
      function i(e) {
        let t,
          r,
          n,
          o = 0;
        for (let s = 0; s < e.length; ++s) {
          const i = e[s];
          if (i.isInterleavedBufferAttribute)
            return (
              console.error(
                'THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported.',
              ),
              null
            );
          if ((void 0 === t && (t = i.array.constructor), t !== i.array.constructor))
            return (
              console.error(
                'THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.',
              ),
              null
            );
          if ((void 0 === r && (r = i.itemSize), r !== i.itemSize))
            return (
              console.error(
                'THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.',
              ),
              null
            );
          if ((void 0 === n && (n = i.normalized), n !== i.normalized))
            return (
              console.error(
                'THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.',
              ),
              null
            );
          o += i.array.length;
        }
        const i = new t(o);
        let a = 0;
        for (let t = 0; t < e.length; ++t) i.set(e[t].array, a), (a += e[t].array.length);
        return new s.BufferAttribute(i, r, n);
      }
      function a(e) {
        return e.isInstancedInterleavedBufferAttribute || e.isInterleavedBufferAttribute
          ? u(e)
          : e.isInstancedBufferAttribute
            ? new s.InstancedBufferAttribute().copy(e)
            : new s.BufferAttribute().copy(e);
      }
      function c(e) {
        let t,
          r = 0,
          n = 0;
        for (let s = 0, o = e.length; s < o; ++s) {
          const o = e[s];
          if ((void 0 === t && (t = o.array.constructor), t !== o.array.constructor))
            return console.error('AttributeBuffers of different types cannot be interleaved'), null;
          (r += o.array.length), (n += o.itemSize);
        }
        const o = new s.InterleavedBuffer(new t(r), n);
        let i = 0;
        const a = [],
          c = ['getX', 'getY', 'getZ', 'getW'],
          u = ['setX', 'setY', 'setZ', 'setW'];
        for (let t = 0, r = e.length; t < r; t++) {
          const r = e[t],
            n = r.itemSize,
            l = r.count,
            h = new s.InterleavedBufferAttribute(o, n, i, r.normalized);
          a.push(h), (i += n);
          for (let e = 0; e < l; e++) for (let t = 0; t < n; t++) h[u[t]](e, r[c[t]](e));
        }
        return a;
      }
      function u(e) {
        const t = e.data.array.constructor,
          r = e.count,
          n = e.itemSize,
          o = e.normalized,
          i = new t(r * n);
        let a;
        a = e.isInstancedInterleavedBufferAttribute
          ? new s.InstancedBufferAttribute(i, n, o, e.meshPerAttribute)
          : new s.BufferAttribute(i, n, o);
        for (let t = 0; t < r; t++)
          a.setX(t, e.getX(t)),
            n >= 2 && a.setY(t, e.getY(t)),
            n >= 3 && a.setZ(t, e.getZ(t)),
            n >= 4 && a.setW(t, e.getW(t));
        return a;
      }
      function l(e) {
        const t = e.attributes,
          r = e.morphTargets,
          s = new Map();
        for (const e in t) {
          const r = t[e];
          r.isInterleavedBufferAttribute && (s.has(r) || s.set(r, u(r)), (t[e] = s.get(r)));
        }
        for (const e in r) {
          const t = r[e];
          t.isInterleavedBufferAttribute && (s.has(t) || s.set(t, u(t)), (r[e] = s.get(t)));
        }
      }
      function h(e) {
        let t = 0;
        for (const r in e.attributes) {
          const s = e.getAttribute(r);
          t += s.count * s.itemSize * s.array.BYTES_PER_ELEMENT;
        }
        const r = e.getIndex();
        return (t += r ? r.count * r.itemSize * r.array.BYTES_PER_ELEMENT : 0), t;
      }
      function d(e, t = 1e-4) {
        t = Math.max(t, Number.EPSILON);
        const r = {},
          n = e.getIndex(),
          o = e.getAttribute('position'),
          i = n ? n.count : o.count;
        let a = 0;
        const c = Object.keys(e.attributes),
          u = {},
          l = {},
          h = [],
          d = ['getX', 'getY', 'getZ', 'getW'],
          f = ['setX', 'setY', 'setZ', 'setW'];
        for (let t = 0, r = c.length; t < r; t++) {
          const r = c[t],
            n = e.attributes[r];
          u[r] = new s.BufferAttribute(
            new n.array.constructor(n.count * n.itemSize),
            n.itemSize,
            n.normalized,
          );
          const o = e.morphAttributes[r];
          o &&
            (l[r] = new s.BufferAttribute(
              new o.array.constructor(o.count * o.itemSize),
              o.itemSize,
              o.normalized,
            ));
        }
        const m = Math.log10(1 / t),
          p = Math.pow(10, m);
        for (let t = 0; t < i; t++) {
          const s = n ? n.getX(t) : t;
          let o = '';
          for (let t = 0, r = c.length; t < r; t++) {
            const r = c[t],
              n = e.getAttribute(r),
              i = n.itemSize;
            for (let e = 0; e < i; e++) o += ~~(n[d[e]](s) * p) + ',';
          }
          if (o in r) h.push(r[o]);
          else {
            for (let t = 0, r = c.length; t < r; t++) {
              const r = c[t],
                n = e.getAttribute(r),
                o = e.morphAttributes[r],
                i = n.itemSize,
                h = u[r],
                m = l[r];
              for (let e = 0; e < i; e++) {
                const t = d[e],
                  r = f[e];
                if ((h[r](a, n[t](s)), o))
                  for (let e = 0, n = o.length; e < n; e++) m[e][r](a, o[e][t](s));
              }
            }
            (r[o] = a), h.push(a), a++;
          }
        }
        const g = e.clone();
        for (const t in e.attributes) {
          const e = u[t];
          if (
            (g.setAttribute(
              t,
              new s.BufferAttribute(e.array.slice(0, a * e.itemSize), e.itemSize, e.normalized),
            ),
            t in l)
          )
            for (let e = 0; e < l[t].length; e++) {
              const r = l[t][e];
              g.morphAttributes[t][e] = new s.BufferAttribute(
                r.array.slice(0, a * r.itemSize),
                r.itemSize,
                r.normalized,
              );
            }
        }
        return g.setIndex(h), g;
      }
      function f(e, t) {
        if (t === s.TrianglesDrawMode)
          return (
            console.warn(
              'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.',
            ),
            e
          );
        if (t === s.TriangleFanDrawMode || t === s.TriangleStripDrawMode) {
          let r = e.getIndex();
          if (null === r) {
            const t = [],
              s = e.getAttribute('position');
            if (void 0 === s)
              return (
                console.error(
                  'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.',
                ),
                e
              );
            for (let e = 0; e < s.count; e++) t.push(e);
            e.setIndex(t), (r = e.getIndex());
          }
          const n = r.count - 2,
            o = [];
          if (t === s.TriangleFanDrawMode)
            for (let e = 1; e <= n; e++)
              o.push(r.getX(0)), o.push(r.getX(e)), o.push(r.getX(e + 1));
          else
            for (let e = 0; e < n; e++)
              e % 2 == 0
                ? (o.push(r.getX(e)), o.push(r.getX(e + 1)), o.push(r.getX(e + 2)))
                : (o.push(r.getX(e + 2)), o.push(r.getX(e + 1)), o.push(r.getX(e)));
          o.length / 3 !== n &&
            console.error(
              'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.',
            );
          const i = e.clone();
          return i.setIndex(o), i.clearGroups(), i;
        }
        return (
          console.error('THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:', t), e
        );
      }
      function m(e) {
        const t = new s.Vector3(),
          r = new s.Vector3(),
          n = new s.Vector3(),
          o = new s.Vector3(),
          i = new s.Vector3(),
          a = new s.Vector3(),
          c = new s.Vector3(),
          u = new s.Vector3(),
          l = new s.Vector3();
        function h(e, s, h, d, f, m, p, g) {
          t.fromBufferAttribute(s, f), r.fromBufferAttribute(s, m), n.fromBufferAttribute(s, p);
          const A = e.morphTargetInfluences;
          if (h && A) {
            c.set(0, 0, 0), u.set(0, 0, 0), l.set(0, 0, 0);
            for (let e = 0, s = h.length; e < s; e++) {
              const s = A[e],
                g = h[e];
              0 !== s &&
                (o.fromBufferAttribute(g, f),
                i.fromBufferAttribute(g, m),
                a.fromBufferAttribute(g, p),
                d
                  ? (c.addScaledVector(o, s), u.addScaledVector(i, s), l.addScaledVector(a, s))
                  : (c.addScaledVector(o.sub(t), s),
                    u.addScaledVector(i.sub(r), s),
                    l.addScaledVector(a.sub(n), s)));
            }
            t.add(c), r.add(u), n.add(l);
          }
          e.isSkinnedMesh &&
            (e.applyBoneTransform(f, t), e.applyBoneTransform(m, r), e.applyBoneTransform(p, n)),
            (g[3 * f + 0] = t.x),
            (g[3 * f + 1] = t.y),
            (g[3 * f + 2] = t.z),
            (g[3 * m + 0] = r.x),
            (g[3 * m + 1] = r.y),
            (g[3 * m + 2] = r.z),
            (g[3 * p + 0] = n.x),
            (g[3 * p + 1] = n.y),
            (g[3 * p + 2] = n.z);
        }
        const d = e.geometry,
          f = e.material;
        let m, p, g;
        const A = d.index,
          T = d.attributes.position,
          x = d.morphAttributes.position,
          b = d.morphTargetsRelative,
          R = d.attributes.normal,
          w = d.morphAttributes.position,
          E = d.groups,
          y = d.drawRange;
        let v, M, _, S, I, L, N;
        const B = new Float32Array(T.count * T.itemSize),
          C = new Float32Array(R.count * R.itemSize);
        if (null !== A)
          if (Array.isArray(f))
            for (v = 0, _ = E.length; v < _; v++)
              for (
                I = E[v],
                  L = Math.max(I.start, y.start),
                  N = Math.min(I.start + I.count, y.start + y.count),
                  M = L,
                  S = N;
                M < S;
                M += 3
              )
                (m = A.getX(M)),
                  (p = A.getX(M + 1)),
                  (g = A.getX(M + 2)),
                  h(e, T, x, b, m, p, g, B),
                  h(e, R, w, b, m, p, g, C);
          else
            for (
              L = Math.max(0, y.start), N = Math.min(A.count, y.start + y.count), v = L, _ = N;
              v < _;
              v += 3
            )
              (m = A.getX(v)),
                (p = A.getX(v + 1)),
                (g = A.getX(v + 2)),
                h(e, T, x, b, m, p, g, B),
                h(e, R, w, b, m, p, g, C);
        else if (Array.isArray(f))
          for (v = 0, _ = E.length; v < _; v++)
            for (
              I = E[v],
                L = Math.max(I.start, y.start),
                N = Math.min(I.start + I.count, y.start + y.count),
                M = L,
                S = N;
              M < S;
              M += 3
            )
              (m = M),
                (p = M + 1),
                (g = M + 2),
                h(e, T, x, b, m, p, g, B),
                h(e, R, w, b, m, p, g, C);
        else
          for (
            L = Math.max(0, y.start), N = Math.min(T.count, y.start + y.count), v = L, _ = N;
            v < _;
            v += 3
          )
            (m = v), (p = v + 1), (g = v + 2), h(e, T, x, b, m, p, g, B), h(e, R, w, b, m, p, g, C);
        return {
          positionAttribute: T,
          normalAttribute: R,
          morphedPositionAttribute: new s.Float32BufferAttribute(B, 3),
          morphedNormalAttribute: new s.Float32BufferAttribute(C, 3),
        };
      }
      function p(e) {
        if (0 === e.groups.length)
          return (
            console.warn(
              'THREE.BufferGeometryUtils.mergeGroups(): No groups are defined. Nothing to merge.',
            ),
            e
          );
        let t = e.groups;
        if (
          ((t = t.sort((e, t) =>
            e.materialIndex !== t.materialIndex
              ? e.materialIndex - t.materialIndex
              : e.start - t.start,
          )),
          null === e.getIndex())
        ) {
          const t = e.getAttribute('position'),
            r = [];
          for (let e = 0; e < t.count; e += 3) r.push(e, e + 1, e + 2);
          e.setIndex(r);
        }
        const r = e.getIndex(),
          s = [];
        for (let e = 0; e < t.length; e++) {
          const n = t[e],
            o = n.start,
            i = o + n.count;
          for (let e = o; e < i; e++) s.push(r.getX(e));
        }
        e.dispose(), e.setIndex(s);
        let n = 0;
        for (let e = 0; e < t.length; e++) {
          const r = t[e];
          (r.start = n), (n += r.count);
        }
        let o = t[0];
        e.groups = [o];
        for (let r = 1; r < t.length; r++) {
          const s = t[r];
          o.materialIndex === s.materialIndex ? (o.count += s.count) : ((o = s), e.groups.push(o));
        }
        return e;
      }
      function g(e, t = Math.PI / 3) {
        const r = Math.cos(t),
          n = 100 * (1 + 1e-10),
          o = [new s.Vector3(), new s.Vector3(), new s.Vector3()],
          i = new s.Vector3(),
          a = new s.Vector3(),
          c = new s.Vector3(),
          u = new s.Vector3();
        function l(e) {
          return `${~~(e.x * n)},${~~(e.y * n)},${~~(e.z * n)}`;
        }
        const h = e.toNonIndexed(),
          d = h.attributes.position,
          f = {};
        for (let e = 0, t = d.count / 3; e < t; e++) {
          const t = 3 * e,
            r = o[0].fromBufferAttribute(d, t + 0),
            n = o[1].fromBufferAttribute(d, t + 1),
            c = o[2].fromBufferAttribute(d, t + 2);
          i.subVectors(c, n), a.subVectors(r, n);
          const u = new s.Vector3().crossVectors(i, a).normalize();
          for (let e = 0; e < 3; e++) {
            const t = l(o[e]);
            t in f || (f[t] = []), f[t].push(u);
          }
        }
        const m = new Float32Array(3 * d.count),
          p = new s.BufferAttribute(m, 3, !1);
        for (let e = 0, t = d.count / 3; e < t; e++) {
          const t = 3 * e,
            s = o[0].fromBufferAttribute(d, t + 0),
            n = o[1].fromBufferAttribute(d, t + 1),
            h = o[2].fromBufferAttribute(d, t + 2);
          i.subVectors(h, n), a.subVectors(s, n), c.crossVectors(i, a).normalize();
          for (let e = 0; e < 3; e++) {
            const s = f[l(o[e])];
            u.set(0, 0, 0);
            for (let e = 0, t = s.length; e < t; e++) {
              const t = s[e];
              c.dot(t) > r && u.add(t);
            }
            u.normalize(), p.setXYZ(t + e, u.x, u.y, u.z);
          }
        }
        return h.setAttribute('normal', p), h;
      }
      function A(e, t = !1) {
        return (
          console.warn(
            'THREE.BufferGeometryUtils: mergeBufferGeometries() has been renamed to mergeGeometries().',
          ),
          o(e, t)
        );
      }
      function T(e) {
        return (
          console.warn(
            'THREE.BufferGeometryUtils: mergeBufferAttributes() has been renamed to mergeAttributes().',
          ),
          i(e)
        );
      }
    },
  },
]);
