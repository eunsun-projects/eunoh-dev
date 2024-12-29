/*! For license information please see 648.js.LICENSE.txt */
'use strict';
(self.webpackChunkmp_webgl = self.webpackChunkmp_webgl || []).push([
  [648],
  {
    27150: (A, I, g) => {
      g.d(I, {
        CMx: () => s,
        Eqt: () => a,
        FVZ: () => i,
        HMq: () => E,
        IJq: () => d,
        IgZ: () => f,
        Iio: () => w,
        LR2: () => L,
        M0b: () => o,
        MCP: () => U,
        Oi: () => C,
        OmG: () => R,
        TyM: () => r,
        VRY: () => t,
        bWS: () => k,
        c6w: () => Q,
        cWm: () => x,
        cmT: () => D,
        e1Y: () => y,
        eQx: () => l,
        gJS: () => G,
        hLC: () => p,
        hOc: () => n,
        ij3: () => H,
        jNP: () => h,
        kXg: () => c,
        qHj: () => e,
        qfi: () => N,
        tLr: () => F,
        wOb: () => S,
      });
      var B = g(48764).lW;
      const C = 0,
        Q = 2,
        E = 1,
        e = 1,
        t = 1,
        i = 2,
        o = 1,
        s = 0,
        r = 1,
        a = 2,
        n = 15,
        D = 128,
        h = 64,
        w = 16,
        c = 0,
        F = 9,
        y = 15,
        G = 16,
        d = 22,
        U = 37,
        R = 43,
        S = 76,
        L = 83,
        f = 97,
        l = 100,
        k = 103,
        N = 109;
      class p {
        constructor() {
          (this.vkFormat = 0),
            (this.typeSize = 1),
            (this.pixelWidth = 0),
            (this.pixelHeight = 0),
            (this.pixelDepth = 0),
            (this.layerCount = 0),
            (this.faceCount = 1),
            (this.supercompressionScheme = 0),
            (this.levels = []),
            (this.dataFormatDescriptor = [
              {
                vendorId: 0,
                descriptorType: 0,
                descriptorBlockSize: 0,
                versionNumber: 2,
                colorModel: 0,
                colorPrimaries: 1,
                transferFunction: 2,
                flags: 0,
                texelBlockDimension: [0, 0, 0, 0],
                bytesPlane: [0, 0, 0, 0, 0, 0, 0, 0],
                samples: [],
              },
            ]),
            (this.keyValue = {}),
            (this.globalData = null);
        }
      }
      class M {
        constructor(A, I, g, B) {
          (this._dataView = new DataView(A.buffer, A.byteOffset + I, g)),
            (this._littleEndian = B),
            (this._offset = 0);
        }
        _nextUint8() {
          const A = this._dataView.getUint8(this._offset);
          return (this._offset += 1), A;
        }
        _nextUint16() {
          const A = this._dataView.getUint16(this._offset, this._littleEndian);
          return (this._offset += 2), A;
        }
        _nextUint32() {
          const A = this._dataView.getUint32(this._offset, this._littleEndian);
          return (this._offset += 4), A;
        }
        _nextUint64() {
          const A =
            this._dataView.getUint32(this._offset, this._littleEndian) +
            2 ** 32 * this._dataView.getUint32(this._offset + 4, this._littleEndian);
          return (this._offset += 8), A;
        }
        _nextInt32() {
          const A = this._dataView.getInt32(this._offset, this._littleEndian);
          return (this._offset += 4), A;
        }
        _skip(A) {
          return (this._offset += A), this;
        }
        _scan(A, I = 0) {
          const g = this._offset;
          let B = 0;
          for (; this._dataView.getUint8(this._offset) !== I && B < A; ) B++, this._offset++;
          return (
            B < A && this._offset++,
            new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + g, B)
          );
        }
      }
      const q = new Uint8Array([0]),
        J = [171, 75, 84, 88, 32, 50, 48, 187, 13, 10, 26, 10];
      function m(A) {
        return 'undefined' != typeof TextEncoder ? new TextEncoder().encode(A) : B.from(A);
      }
      function u(A) {
        return 'undefined' != typeof TextDecoder
          ? new TextDecoder().decode(A)
          : B.from(A).toString('utf8');
      }
      function Y(A) {
        let I = 0;
        for (const g of A) I += g.byteLength;
        const g = new Uint8Array(I);
        let B = 0;
        for (const I of A) g.set(new Uint8Array(I), B), (B += I.byteLength);
        return g;
      }
      function H(A) {
        const I = new Uint8Array(A.buffer, A.byteOffset, J.length);
        if (
          I[0] !== J[0] ||
          I[1] !== J[1] ||
          I[2] !== J[2] ||
          I[3] !== J[3] ||
          I[4] !== J[4] ||
          I[5] !== J[5] ||
          I[6] !== J[6] ||
          I[7] !== J[7] ||
          I[8] !== J[8] ||
          I[9] !== J[9] ||
          I[10] !== J[10] ||
          I[11] !== J[11]
        )
          throw new Error('Missing KTX 2.0 identifier.');
        const g = new p(),
          B = 17 * Uint32Array.BYTES_PER_ELEMENT,
          C = new M(A, J.length, B, !0);
        (g.vkFormat = C._nextUint32()),
          (g.typeSize = C._nextUint32()),
          (g.pixelWidth = C._nextUint32()),
          (g.pixelHeight = C._nextUint32()),
          (g.pixelDepth = C._nextUint32()),
          (g.layerCount = C._nextUint32()),
          (g.faceCount = C._nextUint32());
        const Q = C._nextUint32();
        g.supercompressionScheme = C._nextUint32();
        const E = C._nextUint32(),
          e = C._nextUint32(),
          t = C._nextUint32(),
          i = C._nextUint32(),
          o = C._nextUint64(),
          s = C._nextUint64(),
          r = new M(A, J.length + B, 3 * Q * 8, !0);
        for (let I = 0; I < Q; I++)
          g.levels.push({
            levelData: new Uint8Array(A.buffer, A.byteOffset + r._nextUint64(), r._nextUint64()),
            uncompressedByteLength: r._nextUint64(),
          });
        const a = new M(A, E, e, !0),
          n = {
            vendorId: a._skip(4)._nextUint16(),
            descriptorType: a._nextUint16(),
            versionNumber: a._nextUint16(),
            descriptorBlockSize: a._nextUint16(),
            colorModel: a._nextUint8(),
            colorPrimaries: a._nextUint8(),
            transferFunction: a._nextUint8(),
            flags: a._nextUint8(),
            texelBlockDimension: [a._nextUint8(), a._nextUint8(), a._nextUint8(), a._nextUint8()],
            bytesPlane: [
              a._nextUint8(),
              a._nextUint8(),
              a._nextUint8(),
              a._nextUint8(),
              a._nextUint8(),
              a._nextUint8(),
              a._nextUint8(),
              a._nextUint8(),
            ],
            samples: [],
          },
          D = (n.descriptorBlockSize / 4 - 6) / 4;
        for (let A = 0; A < D; A++) {
          const I = {
            bitOffset: a._nextUint16(),
            bitLength: a._nextUint8(),
            channelType: a._nextUint8(),
            samplePosition: [a._nextUint8(), a._nextUint8(), a._nextUint8(), a._nextUint8()],
            sampleLower: -1 / 0,
            sampleUpper: 1 / 0,
          };
          64 & I.channelType
            ? ((I.sampleLower = a._nextInt32()), (I.sampleUpper = a._nextInt32()))
            : ((I.sampleLower = a._nextUint32()), (I.sampleUpper = a._nextUint32())),
            (n.samples[A] = I);
        }
        (g.dataFormatDescriptor.length = 0), g.dataFormatDescriptor.push(n);
        const h = new M(A, t, i, !0);
        for (; h._offset < i; ) {
          const A = h._nextUint32(),
            I = h._scan(A),
            B = u(I),
            C = h._scan(A - I.byteLength);
          (g.keyValue[B] = B.match(/^ktx/i) ? u(C) : C),
            h._offset % 4 && h._skip(4 - (h._offset % 4));
        }
        if (s <= 0) return g;
        const w = new M(A, o, s, !0),
          c = w._nextUint16(),
          F = w._nextUint16(),
          y = w._nextUint32(),
          G = w._nextUint32(),
          d = w._nextUint32(),
          U = w._nextUint32(),
          R = [];
        for (let A = 0; A < Q; A++)
          R.push({
            imageFlags: w._nextUint32(),
            rgbSliceByteOffset: w._nextUint32(),
            rgbSliceByteLength: w._nextUint32(),
            alphaSliceByteOffset: w._nextUint32(),
            alphaSliceByteLength: w._nextUint32(),
          });
        const S = o + w._offset,
          L = S + y,
          f = L + G,
          l = f + d,
          k = new Uint8Array(A.buffer, A.byteOffset + S, y),
          N = new Uint8Array(A.buffer, A.byteOffset + L, G),
          q = new Uint8Array(A.buffer, A.byteOffset + f, d),
          m = new Uint8Array(A.buffer, A.byteOffset + l, U);
        return (
          (g.globalData = {
            endpointCount: c,
            selectorCount: F,
            imageDescs: R,
            endpointsData: k,
            selectorsData: N,
            tablesData: q,
            extendedData: m,
          }),
          g
        );
      }
      function _() {
        return (_ =
          Object.assign ||
          function (A) {
            for (var I = 1; I < arguments.length; I++) {
              var g = arguments[I];
              for (var B in g) Object.prototype.hasOwnProperty.call(g, B) && (A[B] = g[B]);
            }
            return A;
          }).apply(this, arguments);
      }
      const T = { keepWriter: !1 };
      function x(A, I = {}) {
        I = _({}, T, I);
        let g = new ArrayBuffer(0);
        if (A.globalData) {
          const I = new ArrayBuffer(20 + 5 * A.globalData.imageDescs.length * 4),
            B = new DataView(I);
          B.setUint16(0, A.globalData.endpointCount, !0),
            B.setUint16(2, A.globalData.selectorCount, !0),
            B.setUint32(4, A.globalData.endpointsData.byteLength, !0),
            B.setUint32(8, A.globalData.selectorsData.byteLength, !0),
            B.setUint32(12, A.globalData.tablesData.byteLength, !0),
            B.setUint32(16, A.globalData.extendedData.byteLength, !0);
          for (let I = 0; I < A.globalData.imageDescs.length; I++) {
            const g = A.globalData.imageDescs[I];
            B.setUint32(20 + 5 * I * 4 + 0, g.imageFlags, !0),
              B.setUint32(20 + 5 * I * 4 + 4, g.rgbSliceByteOffset, !0),
              B.setUint32(20 + 5 * I * 4 + 8, g.rgbSliceByteLength, !0),
              B.setUint32(20 + 5 * I * 4 + 12, g.alphaSliceByteOffset, !0),
              B.setUint32(20 + 5 * I * 4 + 16, g.alphaSliceByteLength, !0);
          }
          g = Y([
            I,
            A.globalData.endpointsData,
            A.globalData.selectorsData,
            A.globalData.tablesData,
            A.globalData.extendedData,
          ]);
        }
        const B = [];
        let C = A.keyValue;
        I.keepWriter || (C = _({}, A.keyValue, { KTXwriter: 'KTX-Parse v0.3.1' }));
        for (const A in C) {
          const I = C[A],
            g = m(A),
            Q = 'string' == typeof I ? m(I) : I,
            E = g.byteLength + 1 + Q.byteLength + 1,
            e = E % 4 ? 4 - (E % 4) : 0;
          B.push(Y([new Uint32Array([E]), g, q, Q, q, new Uint8Array(e).fill(0)]));
        }
        const Q = Y(B);
        if (1 !== A.dataFormatDescriptor.length || 0 !== A.dataFormatDescriptor[0].descriptorType)
          throw new Error('Only BASICFORMAT Data Format Descriptor output supported.');
        const E = A.dataFormatDescriptor[0],
          e = new ArrayBuffer(28 + 16 * E.samples.length),
          t = new DataView(e),
          i = 24 + 16 * E.samples.length;
        if (
          (t.setUint32(0, e.byteLength, !0),
          t.setUint16(4, E.vendorId, !0),
          t.setUint16(6, E.descriptorType, !0),
          t.setUint16(8, E.versionNumber, !0),
          t.setUint16(10, i, !0),
          t.setUint8(12, E.colorModel),
          t.setUint8(13, E.colorPrimaries),
          t.setUint8(14, E.transferFunction),
          t.setUint8(15, E.flags),
          !Array.isArray(E.texelBlockDimension))
        )
          throw new Error(
            'texelBlockDimension is now an array. For dimensionality `d`, set `d - 1`.',
          );
        t.setUint8(16, E.texelBlockDimension[0]),
          t.setUint8(17, E.texelBlockDimension[1]),
          t.setUint8(18, E.texelBlockDimension[2]),
          t.setUint8(19, E.texelBlockDimension[3]);
        for (let A = 0; A < 8; A++) t.setUint8(20 + A, E.bytesPlane[A]);
        for (let A = 0; A < E.samples.length; A++) {
          const I = E.samples[A],
            g = 28 + 16 * A;
          if (I.channelID) throw new Error('channelID has been renamed to channelType.');
          t.setUint16(g + 0, I.bitOffset, !0),
            t.setUint8(g + 2, I.bitLength),
            t.setUint8(g + 3, I.channelType),
            t.setUint8(g + 4, I.samplePosition[0]),
            t.setUint8(g + 5, I.samplePosition[1]),
            t.setUint8(g + 6, I.samplePosition[2]),
            t.setUint8(g + 7, I.samplePosition[3]),
            64 & I.channelType
              ? (t.setInt32(g + 8, I.sampleLower, !0), t.setInt32(g + 12, I.sampleUpper, !0))
              : (t.setUint32(g + 8, I.sampleLower, !0), t.setUint32(g + 12, I.sampleUpper, !0));
        }
        const o = J.length + 68 + 3 * A.levels.length * 8,
          s = o + e.byteLength;
        let r = g.byteLength > 0 ? s + Q.byteLength : 0;
        r % 8 && (r += 8 - (r % 8));
        const a = [],
          n = new DataView(new ArrayBuffer(3 * A.levels.length * 8));
        let D = (r || s + Q.byteLength) + g.byteLength;
        for (let I = 0; I < A.levels.length; I++) {
          const g = A.levels[I];
          a.push(g.levelData),
            n.setBigUint64(24 * I + 0, BigInt(D), !0),
            n.setBigUint64(24 * I + 8, BigInt(g.levelData.byteLength), !0),
            n.setBigUint64(24 * I + 16, BigInt(g.uncompressedByteLength), !0),
            (D += g.levelData.byteLength);
        }
        const h = new ArrayBuffer(68),
          w = new DataView(h);
        return (
          w.setUint32(0, A.vkFormat, !0),
          w.setUint32(4, A.typeSize, !0),
          w.setUint32(8, A.pixelWidth, !0),
          w.setUint32(12, A.pixelHeight, !0),
          w.setUint32(16, A.pixelDepth, !0),
          w.setUint32(20, A.layerCount, !0),
          w.setUint32(24, A.faceCount, !0),
          w.setUint32(28, A.levels.length, !0),
          w.setUint32(32, A.supercompressionScheme, !0),
          w.setUint32(36, o, !0),
          w.setUint32(40, e.byteLength, !0),
          w.setUint32(44, s, !0),
          w.setUint32(48, Q.byteLength, !0),
          w.setBigUint64(52, BigInt(g.byteLength > 0 ? r : 0), !0),
          w.setBigUint64(60, BigInt(g.byteLength), !0),
          new Uint8Array(
            Y([
              new Uint8Array(J).buffer,
              h,
              n.buffer,
              e,
              Q,
              r > 0 ? new ArrayBuffer(r - (s + Q.byteLength)) : new ArrayBuffer(0),
              g,
              ...a,
            ]),
          )
        );
      }
    },
    82854: (A, I, g) => {
      g.r(I), g.d(I, { DRACOLoader: () => Q });
      var B = g(81396);
      const C = new WeakMap();
      class Q extends B.Loader {
        constructor(A) {
          super(A),
            (this.decoderPath = ''),
            (this.decoderConfig = {}),
            (this.decoderBinary = null),
            (this.decoderPending = null),
            (this.workerLimit = 4),
            (this.workerPool = []),
            (this.workerNextTaskID = 1),
            (this.workerSourceURL = ''),
            (this.defaultAttributeIDs = {
              position: 'POSITION',
              normal: 'NORMAL',
              color: 'COLOR',
              uv: 'TEX_COORD',
            }),
            (this.defaultAttributeTypes = {
              position: 'Float32Array',
              normal: 'Float32Array',
              color: 'Float32Array',
              uv: 'Float32Array',
            });
        }
        setDecoderPath(A) {
          return (this.decoderPath = A), this;
        }
        setDecoderConfig(A) {
          return (this.decoderConfig = A), this;
        }
        setWorkerLimit(A) {
          return (this.workerLimit = A), this;
        }
        load(A, I, g, C) {
          const Q = new B.FileLoader(this.manager);
          Q.setPath(this.path),
            Q.setResponseType('arraybuffer'),
            Q.setRequestHeader(this.requestHeader),
            Q.setWithCredentials(this.withCredentials),
            Q.load(
              A,
              (A) => {
                this.parse(A, I, C);
              },
              g,
              C,
            );
        }
        parse(A, I, g) {
          this.decodeDracoFile(A, I, null, null, B.SRGBColorSpace).catch(g);
        }
        decodeDracoFile(A, I, g, C, Q = B.LinearSRGBColorSpace) {
          const E = {
            attributeIDs: g || this.defaultAttributeIDs,
            attributeTypes: C || this.defaultAttributeTypes,
            useUniqueIDs: !!g,
            vertexColorSpace: Q,
          };
          return this.decodeGeometry(A, E).then(I);
        }
        decodeGeometry(A, I) {
          const g = JSON.stringify(I);
          if (C.has(A)) {
            const I = C.get(A);
            if (I.key === g) return I.promise;
            if (0 === A.byteLength)
              throw new Error(
                'THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.',
              );
          }
          let B;
          const Q = this.workerNextTaskID++,
            E = A.byteLength,
            e = this._getWorker(Q, E)
              .then(
                (g) => (
                  (B = g),
                  new Promise((g, C) => {
                    (B._callbacks[Q] = { resolve: g, reject: C }),
                      B.postMessage({ type: 'decode', id: Q, taskConfig: I, buffer: A }, [A]);
                  })
                ),
              )
              .then((A) => this._createGeometry(A.geometry));
          return (
            e
              .catch(() => !0)
              .then(() => {
                B && Q && this._releaseTask(B, Q);
              }),
            C.set(A, { key: g, promise: e }),
            e
          );
        }
        _createGeometry(A) {
          const I = new B.BufferGeometry();
          A.index && I.setIndex(new B.BufferAttribute(A.index.array, 1));
          for (let g = 0; g < A.attributes.length; g++) {
            const C = A.attributes[g],
              Q = C.name,
              E = C.array,
              e = C.itemSize,
              t = new B.BufferAttribute(E, e);
            'color' === Q && this._assignVertexColorSpace(t, C.vertexColorSpace),
              I.setAttribute(Q, t);
          }
          return I;
        }
        _assignVertexColorSpace(A, I) {
          if (I !== B.SRGBColorSpace) return;
          const g = new B.Color();
          for (let I = 0, B = A.count; I < B; I++)
            g.fromBufferAttribute(A, I).convertSRGBToLinear(), A.setXYZ(I, g.r, g.g, g.b);
        }
        _loadLibrary(A, I) {
          const g = new B.FileLoader(this.manager);
          return (
            g.setPath(this.decoderPath),
            g.setResponseType(I),
            g.setWithCredentials(this.withCredentials),
            new Promise((I, B) => {
              g.load(A, I, void 0, B);
            })
          );
        }
        preload() {
          return this._initDecoder(), this;
        }
        _initDecoder() {
          if (this.decoderPending) return this.decoderPending;
          const A = 'object' != typeof WebAssembly || 'js' === this.decoderConfig.type,
            I = [];
          return (
            A
              ? I.push(this._loadLibrary('draco_decoder.js', 'text'))
              : (I.push(this._loadLibrary('draco_wasm_wrapper.js', 'text')),
                I.push(this._loadLibrary('draco_decoder.wasm', 'arraybuffer'))),
            (this.decoderPending = Promise.all(I).then((I) => {
              const g = I[0];
              A || (this.decoderConfig.wasmBinary = I[1]);
              const B = E.toString(),
                C = [
                  '/* draco decoder */',
                  g,
                  '',
                  '/* worker */',
                  B.substring(B.indexOf('{') + 1, B.lastIndexOf('}')),
                ].join('\n');
              this.workerSourceURL = URL.createObjectURL(new Blob([C]));
            })),
            this.decoderPending
          );
        }
        _getWorker(A, I) {
          return this._initDecoder().then(() => {
            if (this.workerPool.length < this.workerLimit) {
              const A = new Worker(this.workerSourceURL);
              (A._callbacks = {}),
                (A._taskCosts = {}),
                (A._taskLoad = 0),
                A.postMessage({ type: 'init', decoderConfig: this.decoderConfig }),
                (A.onmessage = function (I) {
                  const g = I.data;
                  switch (g.type) {
                    case 'decode':
                      A._callbacks[g.id].resolve(g);
                      break;
                    case 'error':
                      A._callbacks[g.id].reject(g);
                      break;
                    default:
                      console.error('THREE.DRACOLoader: Unexpected message, "' + g.type + '"');
                  }
                }),
                this.workerPool.push(A);
            } else
              this.workerPool.sort(function (A, I) {
                return A._taskLoad > I._taskLoad ? -1 : 1;
              });
            const g = this.workerPool[this.workerPool.length - 1];
            return (g._taskCosts[A] = I), (g._taskLoad += I), g;
          });
        }
        _releaseTask(A, I) {
          (A._taskLoad -= A._taskCosts[I]), delete A._callbacks[I], delete A._taskCosts[I];
        }
        debug() {
          console.log(
            'Task load: ',
            this.workerPool.map((A) => A._taskLoad),
          );
        }
        dispose() {
          for (let A = 0; A < this.workerPool.length; ++A) this.workerPool[A].terminate();
          return (
            (this.workerPool.length = 0),
            '' !== this.workerSourceURL && URL.revokeObjectURL(this.workerSourceURL),
            this
          );
        }
      }
      function E() {
        let A, I;
        function g(A, I, g, B, C, Q) {
          const E = Q.num_components(),
            e = g.num_points() * E,
            t = e * C.BYTES_PER_ELEMENT,
            i = (function (A, I) {
              switch (I) {
                case Float32Array:
                  return A.DT_FLOAT32;
                case Int8Array:
                  return A.DT_INT8;
                case Int16Array:
                  return A.DT_INT16;
                case Int32Array:
                  return A.DT_INT32;
                case Uint8Array:
                  return A.DT_UINT8;
                case Uint16Array:
                  return A.DT_UINT16;
                case Uint32Array:
                  return A.DT_UINT32;
              }
            })(A, C),
            o = A._malloc(t);
          I.GetAttributeDataArrayForAllPoints(g, Q, i, t, o);
          const s = new C(A.HEAPF32.buffer, o, e).slice();
          return A._free(o), { name: B, array: s, itemSize: E };
        }
        onmessage = function (B) {
          const C = B.data;
          switch (C.type) {
            case 'init':
              (A = C.decoderConfig),
                (I = new Promise(function (I) {
                  (A.onModuleLoaded = function (A) {
                    I({ draco: A });
                  }),
                    DracoDecoderModule(A);
                }));
              break;
            case 'decode':
              const B = C.buffer,
                Q = C.taskConfig;
              I.then((A) => {
                const I = A.draco,
                  E = new I.Decoder();
                try {
                  const A = (function (A, I, B, C) {
                      const Q = C.attributeIDs,
                        E = C.attributeTypes;
                      let e, t;
                      const i = I.GetEncodedGeometryType(B);
                      if (i === A.TRIANGULAR_MESH)
                        (e = new A.Mesh()), (t = I.DecodeArrayToMesh(B, B.byteLength, e));
                      else {
                        if (i !== A.POINT_CLOUD)
                          throw new Error('THREE.DRACOLoader: Unexpected geometry type.');
                        (e = new A.PointCloud()),
                          (t = I.DecodeArrayToPointCloud(B, B.byteLength, e));
                      }
                      if (!t.ok() || 0 === e.ptr)
                        throw new Error('THREE.DRACOLoader: Decoding failed: ' + t.error_msg());
                      const o = { index: null, attributes: [] };
                      for (const B in Q) {
                        const t = self[E[B]];
                        let i, s;
                        if (C.useUniqueIDs) (s = Q[B]), (i = I.GetAttributeByUniqueId(e, s));
                        else {
                          if (((s = I.GetAttributeId(e, A[Q[B]])), -1 === s)) continue;
                          i = I.GetAttribute(e, s);
                        }
                        const r = g(A, I, e, B, t, i);
                        'color' === B && (r.vertexColorSpace = C.vertexColorSpace),
                          o.attributes.push(r);
                      }
                      i === A.TRIANGULAR_MESH &&
                        (o.index = (function (A, I, g) {
                          const B = 3 * g.num_faces(),
                            C = 4 * B,
                            Q = A._malloc(C);
                          I.GetTrianglesUInt32Array(g, C, Q);
                          const E = new Uint32Array(A.HEAPF32.buffer, Q, B).slice();
                          return A._free(Q), { array: E, itemSize: 1 };
                        })(A, I, e));
                      return A.destroy(e), o;
                    })(I, E, new Int8Array(B), Q),
                    e = A.attributes.map((A) => A.array.buffer);
                  A.index && e.push(A.index.array.buffer),
                    self.postMessage({ type: 'decode', id: C.id, geometry: A }, e);
                } catch (A) {
                  console.error(A), self.postMessage({ type: 'error', id: C.id, error: A.message });
                } finally {
                  I.destroy(E);
                }
              });
          }
        };
      }
    },
    72348: (A, I, g) => {
      g.r(I), g.d(I, { KTX2Loader: () => h });
      var B = g(81396),
        C = g(85479),
        Q = g(27150),
        E = g(48764).lW;
      let e, t, i;
      const o = {
        env: {
          emscripten_notify_memory_growth: function (A) {
            i = new Uint8Array(t.exports.memory.buffer);
          },
        },
      };
      class s {
        init() {
          return (
            e ||
            ((e =
              'undefined' != typeof fetch
                ? fetch('data:application/wasm;base64,' + r)
                    .then((A) => A.arrayBuffer())
                    .then((A) => WebAssembly.instantiate(A, o))
                    .then(this._init)
                : WebAssembly.instantiate(E.from(r, 'base64'), o).then(this._init)),
            e)
          );
        }
        _init(A) {
          (t = A.instance), o.env.emscripten_notify_memory_growth(0);
        }
        decode(A, I = 0) {
          if (!t) throw new Error('ZSTDDecoder: Await .init() before decoding.');
          const g = A.byteLength,
            B = t.exports.malloc(g);
          i.set(A, B), (I = I || Number(t.exports.ZSTD_findDecompressedSize(B, g)));
          const C = t.exports.malloc(I),
            Q = t.exports.ZSTD_decompress(C, I, B, g),
            E = i.slice(C, C + Q);
          return t.exports.free(B), t.exports.free(C), E;
        }
      }
      const r =
          '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IAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQhBSAGQQR2IQRBICAAdCIAQQFyIQkgASgCACEPQQAhAiADIQYCQANAIAlBAkggAiAPS3JFBEAgAiEHAkAgCARAA0AgBEH//wNxQf//A0YEQCAHQRhqIQcgBiAQSQR/IAZBAmoiBigAACAFdgUgBUEQaiEFIARBEHYLIQQMAQsLA0AgBEEDcSIIQQNGBEAgBUECaiEFIARBAnYhBCAHQQNqIQcMAQsLIAcgCGoiByAPSw0EIAVBAmohBQNAIAIgB0kEQCANIAJBAXRqQQA7AQAgAkEBaiECDAELCyAGIA5LQQAgBiAFQQN1aiIHIAxLG0UEQCAHKAAAIAVBB3EiBXYhBAwCCyAEQQJ2IQQLIAYhBwsCfyALQX9qIAQgAEF/anEiBiAAQQF0QX9qIgggCWsiEUkNABogBCAIcSIEQQAgESAEIABIG2shBiALCyEIIA0gAkEBdGogBkF/aiIEOwEAIAlBASAGayAEIAZBAUgbayEJA0AgCSAASARAIABBAXUhACALQX9qIQsMAQsLAn8gByAOS0EAIAcgBSAIaiIFQQN1aiIGIAxLG0UEQCAFQQdxDAELIAUgDCIGIAdrQQN0awshBSACQQFqIQIgBEUhCCAGKAAAIAVBH3F2IQQMAQsLQWwgCUEBRyAFQSBKcg0BGiABIAJBf2o2AgAgBiAFQQdqQQN1aiADawwBC0FQCyEAIApBEGokACAACwkAQQFBBSAAGwsMACAAIAEoAAA2AAALqgMBCn8jAEHwAGsiCiQAIAJBAWohDiAAQQhqIQtBgIAEIAVBf2p0QRB1IQxBACECQQEhBkEBIAV0IglBf2oiDyEIA0AgAiAORkUEQAJAIAEgAkEBdCINai8BACIHQf//A0YEQCALIAhBA3RqIAI2AgQgCEF/aiEIQQEhBwwBCyAGQQAgDCAHQRB0QRB1ShshBgsgCiANaiAHOwEAIAJBAWohAgwBCwsgACAFNgIEIAAgBjYCACAJQQN2IAlBAXZqQQNqIQxBACEAQQAhBkEAIQIDQCAGIA5GBEADQAJAIAAgCUYNACAKIAsgAEEDdGoiASgCBCIGQQF0aiICIAIvAQAiAkEBajsBACABIAUgAhAUayIIOgADIAEgAiAIQf8BcXQgCWs7AQAgASAEIAZBAnQiAmooAgA6AAIgASACIANqKAIANgIEIABBAWohAAwBCwsFIAEgBkEBdGouAQAhDUEAIQcDQCAHIA1ORQRAIAsgAkEDdGogBjYCBANAIAIgDGogD3EiAiAISw0ACyAHQQFqIQcMAQsLIAZBAWohBgwBCwsgCkHwAGokAAsjAEIAIAEQCSAAhUKHla+vmLbem55/fkLj3MqV/M7y9YV/fAsQACAAQn43AwggACABNgIACyQBAX8gAARAIAEoAgQiAgRAIAEoAgggACACEQEADwsgABAmCwsfACAAIAEgAi8BABAINgIAIAEQBBogACACQQRqNgIEC0oBAX9BoCAoAgAiASAAaiIAQX9MBEBBiCBBMDYCAEF/DwsCQCAAPwBBEHRNDQAgABBmDQBBiCBBMDYCAEF/DwtBoCAgADYCACABC9cBAQh/Qbp/IQoCQCACKAIEIgggAigCACIJaiIOIAEgAGtLDQBBbCEKIAkgBCADKAIAIgtrSw0AIAAgCWoiBCACKAIIIgxrIQ0gACABQWBqIg8gCyAJQQAQKSADIAkgC2o2AgACQAJAIAwgBCAFa00EQCANIQUMAQsgDCAEIAZrSw0CIAcgDSAFayIAaiIBIAhqIAdNBEAgBCABIAgQDxoMAgsgBCABQQAgAGsQDyEBIAIgACAIaiIINgIEIAEgAGshBAsgBCAPIAUgCEEBECkLIA4hCgsgCgubAgEBfyMAQYABayINJAAgDSADNgJ8AkAgAkEDSwRAQX8hCQwBCwJAAkACQAJAIAJBAWsOAwADAgELIAZFBEBBuH8hCQwEC0FsIQkgBS0AACICIANLDQMgACAHIAJBAnQiAmooAgAgAiAIaigCABA7IAEgADYCAEEBIQkMAwsgASAJNgIAQQAhCQwCCyAKRQRAQWwhCQwCC0EAIQkgC0UgDEEZSHINAUEIIAR0QQhqIQBBACECA0AgAiAATw0CIAJBQGshAgwAAAsAC0FsIQkgDSANQfwAaiANQfgAaiAFIAYQFSICEAMNACANKAJ4IgMgBEsNACAAIA0gDSgCfCAHIAggAxAYIAEgADYCACACIQkLIA1BgAFqJAAgCQsLACAAIAEgAhALGgsQACAALwAAIAAtAAJBEHRyCy8AAn9BuH8gAUEISQ0AGkFyIAAoAAQiAEF3Sw0AGkG4fyAAQQhqIgAgACABSxsLCwkAIAAgATsAAAsDAAELigYBBX8gACAAKAIAIgVBfnE2AgBBACAAIAVBAXZqQYQgKAIAIgQgAEYbIQECQAJAIAAoAgQiAkUNACACKAIAIgNBAXENACACQQhqIgUgA0EBdkF4aiIDQQggA0EISxtnQR9zQQJ0QYAfaiIDKAIARgRAIAMgAigCDDYCAAsgAigCCCIDBEAgAyACKAIMNgIECyACKAIMIgMEQCADIAIoAgg2AgALIAIgAigCACAAKAIAQX5xajYCAEGEICEAAkACQCABRQ0AIAEgAjYCBCABKAIAIgNBAXENASADQQF2QXhqIgNBCCADQQhLG2dBH3NBAnRBgB9qIgMoAgAgAUEIakYEQCADIAEoAgw2AgALIAEoAggiAwRAIAMgASgCDDYCBAsgASgCDCIDBEAgAyABKAIINgIAQYQgKAIAIQQLIAIgAigCACABKAIAQX5xajYCACABIARGDQAgASABKAIAQQF2akEEaiEACyAAIAI2AgALIAIoAgBBAXZBeGoiAEEIIABBCEsbZ0Efc0ECdEGAH2oiASgCACEAIAEgBTYCACACIAA2AgwgAkEANgIIIABFDQEgACAFNgIADwsCQCABRQ0AIAEoAgAiAkEBcQ0AIAJBAXZBeGoiAkEIIAJBCEsbZ0Efc0ECdEGAH2oiAigCACABQQhqRgRAIAIgASgCDDYCAAsgASgCCCICBEAgAiABKAIMNgIECyABKAIMIgIEQCACIAEoAgg2AgBBhCAoAgAhBAsgACAAKAIAIAEoAgBBfnFqIgI2AgACQCABIARHBEAgASABKAIAQQF2aiAANgIEIAAoAgAhAgwBC0GEICAANgIACyACQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgIoAgAhASACIABBCGoiAjYCACAAIAE2AgwgAEEANgIIIAFFDQEgASACNgIADwsgBUEBdkF4aiIBQQggAUEISxtnQR9zQQJ0QYAfaiICKAIAIQEgAiAAQQhqIgI2AgAgACABNgIMIABBADYCCCABRQ0AIAEgAjYCAAsLDgAgAARAIABBeGoQJQsLgAIBA38CQCAAQQ9qQXhxQYQgKAIAKAIAQQF2ayICEB1Bf0YNAAJAQYQgKAIAIgAoAgAiAUEBcQ0AIAFBAXZBeGoiAUEIIAFBCEsbZ0Efc0ECdEGAH2oiASgCACAAQQhqRgRAIAEgACgCDDYCAAsgACgCCCIBBEAgASAAKAIMNgIECyAAKAIMIgFFDQAgASAAKAIINgIAC0EBIQEgACAAKAIAIAJBAXRqIgI2AgAgAkEBcQ0AIAJBAXZBeGoiAkEIIAJBCEsbZ0Efc0ECdEGAH2oiAygCACECIAMgAEEIaiIDNgIAIAAgAjYCDCAAQQA2AgggAkUNACACIAM2AgALIAELtwIBA38CQAJAIABBASAAGyICEDgiAA0AAkACQEGEICgCACIARQ0AIAAoAgAiA0EBcQ0AIAAgA0EBcjYCACADQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgEoAgAgAEEIakYEQCABIAAoAgw2AgALIAAoAggiAQRAIAEgACgCDDYCBAsgACgCDCIBBEAgASAAKAIINgIACyACECchAkEAIQFBhCAoAgAhACACDQEgACAAKAIAQX5xNgIAQQAPCyACQQ9qQXhxIgMQHSICQX9GDQIgAkEHakF4cSIAIAJHBEAgACACaxAdQX9GDQMLAkBBhCAoAgAiAUUEQEGAICAANgIADAELIAAgATYCBAtBhCAgADYCACAAIANBAXRBAXI2AgAMAQsgAEUNAQsgAEEIaiEBCyABC7kDAQJ/IAAgA2ohBQJAIANBB0wEQANAIAAgBU8NAiAAIAItAAA6AAAgAEEBaiEAIAJBAWohAgwAAAsACyAEQQFGBEACQCAAIAJrIgZBB00EQCAAIAItAAA6AAAgACACLQABOgABIAAgAi0AAjoAAiAAIAItAAM6AAMgAEEEaiACIAZBAnQiBkHAHmooAgBqIgIQFyACIAZB4B5qKAIAayECDAELIAAgAhAMCyACQQhqIQIgAEEIaiEACwJAAkACQAJAIAUgAU0EQCAAIANqIQEgBEEBRyAAIAJrQQ9Kcg0BA0AgACACEAwgAkEIaiECIABBCGoiACABSQ0ACwwFCyAAIAFLBEAgACEBDAQLIARBAUcgACACa0EPSnINASAAIQMgAiEEA0AgAyAEEAwgBEEIaiEEIANBCGoiAyABSQ0ACwwCCwNAIAAgAhAHIAJBEGohAiAAQRBqIgAgAUkNAAsMAwsgACEDIAIhBANAIAMgBBAHIARBEGohBCADQRBqIgMgAUkNAAsLIAIgASAAa2ohAgsDQCABIAVPDQEgASACLQAAOgAAIAFBAWohASACQQFqIQIMAAALAAsLQQECfyAAIAAoArjgASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigC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C0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdB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IAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY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wOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEE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',
        a = new WeakMap();
      let n,
        D = 0;
      class h extends B.Loader {
        constructor(A) {
          super(A),
            (this.transcoderPath = ''),
            (this.transcoderBinary = null),
            (this.transcoderPending = null),
            (this.workerPool = new C.WorkerPool()),
            (this.workerSourceURL = ''),
            (this.workerConfig = null),
            'undefined' != typeof MSC_TRANSCODER &&
              console.warn(
                'THREE.KTX2Loader: Please update to latest "basis_transcoder". "msc_basis_transcoder" is no longer supported in three.js r125+.',
              );
        }
        setTranscoderPath(A) {
          return (this.transcoderPath = A), this;
        }
        setWorkerLimit(A) {
          return this.workerPool.setWorkerLimit(A), this;
        }
        detectSupport(A) {
          return (
            (this.workerConfig = {
              astcSupported: A.extensions.has('WEBGL_compressed_texture_astc'),
              etc1Supported: A.extensions.has('WEBGL_compressed_texture_etc1'),
              etc2Supported: A.extensions.has('WEBGL_compressed_texture_etc'),
              dxtSupported: A.extensions.has('WEBGL_compressed_texture_s3tc'),
              bptcSupported: A.extensions.has('EXT_texture_compression_bptc'),
              pvrtcSupported:
                A.extensions.has('WEBGL_compressed_texture_pvrtc') ||
                A.extensions.has('WEBKIT_WEBGL_compressed_texture_pvrtc'),
            }),
            A.capabilities.isWebGL2 && (this.workerConfig.etc1Supported = !1),
            this
          );
        }
        init() {
          if (!this.transcoderPending) {
            const A = new B.FileLoader(this.manager);
            A.setPath(this.transcoderPath), A.setWithCredentials(this.withCredentials);
            const I = A.loadAsync('basis_transcoder.js'),
              g = new B.FileLoader(this.manager);
            g.setPath(this.transcoderPath),
              g.setResponseType('arraybuffer'),
              g.setWithCredentials(this.withCredentials);
            const C = g.loadAsync('basis_transcoder.wasm');
            (this.transcoderPending = Promise.all([I, C]).then(([A, I]) => {
              const g = h.BasisWorker.toString(),
                B = [
                  '/* constants */',
                  'let _EngineFormat = ' + JSON.stringify(h.EngineFormat),
                  'let _TranscoderFormat = ' + JSON.stringify(h.TranscoderFormat),
                  'let _BasisFormat = ' + JSON.stringify(h.BasisFormat),
                  '/* basis_transcoder.js */',
                  A,
                  '/* worker */',
                  g.substring(g.indexOf('{') + 1, g.lastIndexOf('}')),
                ].join('\n');
              (this.workerSourceURL = URL.createObjectURL(new Blob([B]))),
                (this.transcoderBinary = I),
                this.workerPool.setWorkerCreator(() => {
                  const A = new Worker(this.workerSourceURL),
                    I = this.transcoderBinary.slice(0);
                  return (
                    A.postMessage(
                      { type: 'init', config: this.workerConfig, transcoderBinary: I },
                      [I],
                    ),
                    A
                  );
                });
            })),
              D > 0 &&
                console.warn(
                  'THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances.',
                ),
              D++;
          }
          return this.transcoderPending;
        }
        load(A, I, g, C) {
          if (null === this.workerConfig)
            throw new Error(
              'THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.',
            );
          const Q = new B.FileLoader(this.manager);
          Q.setResponseType('arraybuffer'),
            Q.setWithCredentials(this.withCredentials),
            Q.load(
              A,
              (A) => {
                if (a.has(A)) {
                  return a.get(A).promise.then(I).catch(C);
                }
                this._createTexture(A)
                  .then((A) => (I ? I(A) : null))
                  .catch(C);
              },
              g,
              C,
            );
        }
        _createTextureFrom(A, I) {
          const {
            mipmaps: g,
            width: C,
            height: E,
            format: e,
            type: t,
            error: i,
            dfdTransferFn: o,
            dfdFlags: s,
          } = A;
          if ('error' === t) return Promise.reject(i);
          const r =
            I.layerCount > 1
              ? new B.CompressedArrayTexture(g, C, E, I.layerCount, e, B.UnsignedByteType)
              : new B.CompressedTexture(g, C, E, e, B.UnsignedByteType);
          return (
            (r.minFilter = 1 === g.length ? B.LinearFilter : B.LinearMipmapLinearFilter),
            (r.magFilter = B.LinearFilter),
            (r.generateMipmaps = !1),
            (r.needsUpdate = !0),
            (r.encoding = o === Q.FVZ ? B.sRGBEncoding : B.LinearEncoding),
            (r.premultiplyAlpha = !!(s & Q.qHj)),
            r
          );
        }
        async _createTexture(A, I = {}) {
          const g = (0, Q.ij3)(new Uint8Array(A));
          if (g.vkFormat !== Q.kXg)
            return (async function (A) {
              const { vkFormat: I, pixelWidth: g, pixelHeight: C, pixelDepth: E } = A;
              if (void 0 === w[I]) throw new Error('THREE.KTX2Loader: Unsupported vkFormat.');
              const e = A.levels[0];
              let t, i;
              if (A.supercompressionScheme === Q.Oi) t = e.levelData;
              else {
                if (A.supercompressionScheme !== Q.c6w)
                  throw new Error('THREE.KTX2Loader: Unsupported supercompressionScheme.');
                n ||
                  (n = new Promise(async (A) => {
                    const I = new s();
                    await I.init(), A(I);
                  })),
                  (t = (await n).decode(e.levelData, e.uncompressedByteLength));
              }
              i =
                c[I] === B.FloatType
                  ? new Float32Array(
                      t.buffer,
                      t.byteOffset,
                      t.byteLength / Float32Array.BYTES_PER_ELEMENT,
                    )
                  : c[I] === B.HalfFloatType
                    ? new Uint16Array(
                        t.buffer,
                        t.byteOffset,
                        t.byteLength / Uint16Array.BYTES_PER_ELEMENT,
                      )
                    : t;
              const o = 0 === E ? new B.DataTexture(i, g, C) : new B.Data3DTexture(i, g, C, E);
              return (
                (o.type = c[I]),
                (o.format = w[I]),
                (o.encoding = F[I] || B.LinearEncoding),
                (o.needsUpdate = !0),
                Promise.resolve(o)
              );
            })(g);
          const C = I,
            E = this.init()
              .then(() =>
                this.workerPool.postMessage({ type: 'transcode', buffer: A, taskConfig: C }, [A]),
              )
              .then((A) => this._createTextureFrom(A.data, g));
          return a.set(A, { promise: E }), E;
        }
        dispose() {
          return (
            this.workerPool.dispose(),
            this.workerSourceURL && URL.revokeObjectURL(this.workerSourceURL),
            D--,
            this
          );
        }
      }
      (h.BasisFormat = { ETC1S: 0, UASTC_4x4: 1 }),
        (h.TranscoderFormat = {
          ETC1: 0,
          ETC2: 1,
          BC1: 2,
          BC3: 3,
          BC4: 4,
          BC5: 5,
          BC7_M6_OPAQUE_ONLY: 6,
          BC7_M5: 7,
          PVRTC1_4_RGB: 8,
          PVRTC1_4_RGBA: 9,
          ASTC_4x4: 10,
          ATC_RGB: 11,
          ATC_RGBA_INTERPOLATED_ALPHA: 12,
          RGBA32: 13,
          RGB565: 14,
          BGR565: 15,
          RGBA4444: 16,
        }),
        (h.EngineFormat = {
          RGBAFormat: B.RGBAFormat,
          RGBA_ASTC_4x4_Format: B.RGBA_ASTC_4x4_Format,
          RGBA_BPTC_Format: B.RGBA_BPTC_Format,
          RGBA_ETC2_EAC_Format: B.RGBA_ETC2_EAC_Format,
          RGBA_PVRTC_4BPPV1_Format: B.RGBA_PVRTC_4BPPV1_Format,
          RGBA_S3TC_DXT5_Format: B.RGBA_S3TC_DXT5_Format,
          RGB_ETC1_Format: B.RGB_ETC1_Format,
          RGB_ETC2_Format: B.RGB_ETC2_Format,
          RGB_PVRTC_4BPPV1_Format: B.RGB_PVRTC_4BPPV1_Format,
          RGB_S3TC_DXT1_Format: B.RGB_S3TC_DXT1_Format,
        }),
        (h.BasisWorker = function () {
          let A, I, g;
          const B = _EngineFormat,
            C = _TranscoderFormat,
            Q = _BasisFormat;
          self.addEventListener('message', function (E) {
            const s = E.data;
            switch (s.type) {
              case 'init':
                (A = s.config),
                  (r = s.transcoderBinary),
                  (I = new Promise((A) => {
                    (g = { wasmBinary: r, onRuntimeInitialized: A }), BASIS(g);
                  }).then(() => {
                    g.initializeBasis(),
                      void 0 === g.KTX2File &&
                        console.warn('THREE.KTX2Loader: Please update Basis Universal transcoder.');
                  }));
                break;
              case 'transcode':
                I.then(() => {
                  try {
                    const {
                        width: I,
                        height: E,
                        hasAlpha: r,
                        mipmaps: a,
                        format: n,
                        dfdTransferFn: D,
                        dfdFlags: h,
                      } = (function (I) {
                        const E = new g.KTX2File(new Uint8Array(I));
                        function s() {
                          E.close(), E.delete();
                        }
                        if (!E.isValid())
                          throw (
                            (s(), new Error('THREE.KTX2Loader:\tInvalid or unsupported .ktx2 file'))
                          );
                        const r = E.isUASTC() ? Q.UASTC_4x4 : Q.ETC1S,
                          a = E.getWidth(),
                          n = E.getHeight(),
                          D = E.getLayers() || 1,
                          h = E.getLevels(),
                          w = E.getHasAlpha(),
                          c = E.getDFDTransferFunc(),
                          F = E.getDFDFlags(),
                          { transcoderFormat: y, engineFormat: G } = (function (I, g, E, o) {
                            let s, r;
                            const a = I === Q.ETC1S ? e : t;
                            for (let B = 0; B < a.length; B++) {
                              const C = a[B];
                              if (
                                A[C.if] &&
                                C.basisFormat.includes(I) &&
                                !(o && C.transcoderFormat.length < 2) &&
                                (!C.needsPowerOfTwo || (i(g) && i(E)))
                              )
                                return (
                                  (s = C.transcoderFormat[o ? 1 : 0]),
                                  (r = C.engineFormat[o ? 1 : 0]),
                                  { transcoderFormat: s, engineFormat: r }
                                );
                            }
                            return (
                              console.warn(
                                'THREE.KTX2Loader: No suitable compressed texture format found. Decoding to RGBA32.',
                              ),
                              (s = C.RGBA32),
                              (r = B.RGBAFormat),
                              { transcoderFormat: s, engineFormat: r }
                            );
                          })(r, a, n, w);
                        if (!a || !n || !h)
                          throw (s(), new Error('THREE.KTX2Loader:\tInvalid texture'));
                        if (!E.startTranscoding())
                          throw (s(), new Error('THREE.KTX2Loader: .startTranscoding failed'));
                        const d = [];
                        for (let A = 0; A < h; A++) {
                          const I = [];
                          let g, B;
                          for (let C = 0; C < D; C++) {
                            const Q = E.getImageLevelInfo(A, C, 0);
                            (g = Q.origWidth < 4 ? Q.origWidth : Q.width),
                              (B = Q.origHeight < 4 ? Q.origHeight : Q.height);
                            const e = new Uint8Array(E.getImageTranscodedSizeInBytes(A, C, 0, y));
                            if (!E.transcodeImage(e, A, C, 0, y, 0, -1, -1))
                              throw (s(), new Error('THREE.KTX2Loader: .transcodeImage failed.'));
                            I.push(e);
                          }
                          d.push({ data: o(I), width: g, height: B });
                        }
                        return (
                          s(),
                          {
                            width: a,
                            height: n,
                            hasAlpha: w,
                            mipmaps: d,
                            format: G,
                            dfdTransferFn: c,
                            dfdFlags: F,
                          }
                        );
                      })(s.buffer),
                      w = [];
                    for (let A = 0; A < a.length; ++A) w.push(a[A].data.buffer);
                    self.postMessage(
                      {
                        type: 'transcode',
                        id: s.id,
                        width: I,
                        height: E,
                        hasAlpha: r,
                        mipmaps: a,
                        format: n,
                        dfdTransferFn: D,
                        dfdFlags: h,
                      },
                      w,
                    );
                  } catch (A) {
                    console.error(A),
                      self.postMessage({ type: 'error', id: s.id, error: A.message });
                  }
                });
            }
            var r;
          });
          const E = [
              {
                if: 'astcSupported',
                basisFormat: [Q.UASTC_4x4],
                transcoderFormat: [C.ASTC_4x4, C.ASTC_4x4],
                engineFormat: [B.RGBA_ASTC_4x4_Format, B.RGBA_ASTC_4x4_Format],
                priorityETC1S: 1 / 0,
                priorityUASTC: 1,
                needsPowerOfTwo: !1,
              },
              {
                if: 'bptcSupported',
                basisFormat: [Q.ETC1S, Q.UASTC_4x4],
                transcoderFormat: [C.BC7_M5, C.BC7_M5],
                engineFormat: [B.RGBA_BPTC_Format, B.RGBA_BPTC_Format],
                priorityETC1S: 3,
                priorityUASTC: 2,
                needsPowerOfTwo: !1,
              },
              {
                if: 'dxtSupported',
                basisFormat: [Q.ETC1S, Q.UASTC_4x4],
                transcoderFormat: [C.BC1, C.BC3],
                engineFormat: [B.RGB_S3TC_DXT1_Format, B.RGBA_S3TC_DXT5_Format],
                priorityETC1S: 4,
                priorityUASTC: 5,
                needsPowerOfTwo: !1,
              },
              {
                if: 'etc2Supported',
                basisFormat: [Q.ETC1S, Q.UASTC_4x4],
                transcoderFormat: [C.ETC1, C.ETC2],
                engineFormat: [B.RGB_ETC2_Format, B.RGBA_ETC2_EAC_Format],
                priorityETC1S: 1,
                priorityUASTC: 3,
                needsPowerOfTwo: !1,
              },
              {
                if: 'etc1Supported',
                basisFormat: [Q.ETC1S, Q.UASTC_4x4],
                transcoderFormat: [C.ETC1],
                engineFormat: [B.RGB_ETC1_Format],
                priorityETC1S: 2,
                priorityUASTC: 4,
                needsPowerOfTwo: !1,
              },
              {
                if: 'pvrtcSupported',
                basisFormat: [Q.ETC1S, Q.UASTC_4x4],
                transcoderFormat: [C.PVRTC1_4_RGB, C.PVRTC1_4_RGBA],
                engineFormat: [B.RGB_PVRTC_4BPPV1_Format, B.RGBA_PVRTC_4BPPV1_Format],
                priorityETC1S: 5,
                priorityUASTC: 6,
                needsPowerOfTwo: !0,
              },
            ],
            e = E.sort(function (A, I) {
              return A.priorityETC1S - I.priorityETC1S;
            }),
            t = E.sort(function (A, I) {
              return A.priorityUASTC - I.priorityUASTC;
            });
          function i(A) {
            return A <= 2 || (0 == (A & (A - 1)) && 0 !== A);
          }
          function o(A) {
            let I = 0;
            for (const g of A) I += g.byteLength;
            const g = new Uint8Array(I);
            let B = 0;
            for (const I of A) g.set(I, B), (B += I.byteLength);
            return g;
          }
        });
      const w = {
          [Q.qfi]: B.RGBAFormat,
          [Q.IgZ]: B.RGBAFormat,
          [Q.MCP]: B.RGBAFormat,
          [Q.OmG]: B.RGBAFormat,
          [Q.bWS]: B.RGFormat,
          [Q.LR2]: B.RGFormat,
          [Q.gJS]: B.RGFormat,
          [Q.IJq]: B.RGFormat,
          [Q.eQx]: B.RedFormat,
          [Q.wOb]: B.RedFormat,
          [Q.e1Y]: B.RedFormat,
          [Q.tLr]: B.RedFormat,
        },
        c = {
          [Q.qfi]: B.FloatType,
          [Q.IgZ]: B.HalfFloatType,
          [Q.MCP]: B.UnsignedByteType,
          [Q.OmG]: B.UnsignedByteType,
          [Q.bWS]: B.FloatType,
          [Q.LR2]: B.HalfFloatType,
          [Q.gJS]: B.UnsignedByteType,
          [Q.IJq]: B.UnsignedByteType,
          [Q.eQx]: B.FloatType,
          [Q.wOb]: B.HalfFloatType,
          [Q.e1Y]: B.UnsignedByteType,
          [Q.tLr]: B.UnsignedByteType,
        },
        F = { [Q.OmG]: B.sRGBEncoding, [Q.IJq]: B.sRGBEncoding, [Q.e1Y]: B.sRGBEncoding };
    },
    85479: (A, I, g) => {
      g.r(I), g.d(I, { WorkerPool: () => B });
      class B {
        constructor(A = 4) {
          (this.pool = A),
            (this.queue = []),
            (this.workers = []),
            (this.workersResolve = []),
            (this.workerStatus = 0);
        }
        _initWorker(A) {
          if (!this.workers[A]) {
            const I = this.workerCreator();
            I.addEventListener('message', this._onMessage.bind(this, A)), (this.workers[A] = I);
          }
        }
        _getIdleWorker() {
          for (let A = 0; A < this.pool; A++) if (!(this.workerStatus & (1 << A))) return A;
          return -1;
        }
        _onMessage(A, I) {
          const g = this.workersResolve[A];
          if ((g && g(I), this.queue.length)) {
            const { resolve: I, msg: g, transfer: B } = this.queue.shift();
            (this.workersResolve[A] = I), this.workers[A].postMessage(g, B);
          } else this.workerStatus ^= 1 << A;
        }
        setWorkerCreator(A) {
          this.workerCreator = A;
        }
        setWorkerLimit(A) {
          this.pool = A;
        }
        postMessage(A, I) {
          return new Promise((g) => {
            const B = this._getIdleWorker();
            -1 !== B
              ? (this._initWorker(B),
                (this.workerStatus |= 1 << B),
                (this.workersResolve[B] = g),
                this.workers[B].postMessage(A, I))
              : this.queue.push({ resolve: g, msg: A, transfer: I });
          });
        }
        dispose() {
          this.workers.forEach((A) => A.terminate()),
            (this.workersResolve.length = 0),
            (this.workers.length = 0),
            (this.queue.length = 0),
            (this.workerStatus = 0);
        }
      }
    },
  },
]);
