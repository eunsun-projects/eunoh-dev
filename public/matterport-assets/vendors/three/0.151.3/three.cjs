/*! For license information please see three.cjs.LICENSE.txt */
'use strict';
const REVISION = '151',
  MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2, ROTATE: 0, DOLLY: 1, PAN: 2 },
  TOUCH = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 },
  CullFaceNone = 0,
  CullFaceBack = 1,
  CullFaceFront = 2,
  CullFaceFrontBack = 3,
  BasicShadowMap = 0,
  PCFShadowMap = 1,
  PCFSoftShadowMap = 2,
  VSMShadowMap = 3,
  FrontSide = 0,
  BackSide = 1,
  DoubleSide = 2,
  TwoPassDoubleSide = 2,
  NoBlending = 0,
  NormalBlending = 1,
  AdditiveBlending = 2,
  SubtractiveBlending = 3,
  MultiplyBlending = 4,
  CustomBlending = 5,
  AddEquation = 100,
  SubtractEquation = 101,
  ReverseSubtractEquation = 102,
  MinEquation = 103,
  MaxEquation = 104,
  ZeroFactor = 200,
  OneFactor = 201,
  SrcColorFactor = 202,
  OneMinusSrcColorFactor = 203,
  SrcAlphaFactor = 204,
  OneMinusSrcAlphaFactor = 205,
  DstAlphaFactor = 206,
  OneMinusDstAlphaFactor = 207,
  DstColorFactor = 208,
  OneMinusDstColorFactor = 209,
  SrcAlphaSaturateFactor = 210,
  NeverDepth = 0,
  AlwaysDepth = 1,
  LessDepth = 2,
  LessEqualDepth = 3,
  EqualDepth = 4,
  GreaterEqualDepth = 5,
  GreaterDepth = 6,
  NotEqualDepth = 7,
  MultiplyOperation = 0,
  MixOperation = 1,
  AddOperation = 2,
  NoToneMapping = 0,
  LinearToneMapping = 1,
  ReinhardToneMapping = 2,
  CineonToneMapping = 3,
  ACESFilmicToneMapping = 4,
  CustomToneMapping = 5,
  UVMapping = 300,
  CubeReflectionMapping = 301,
  CubeRefractionMapping = 302,
  EquirectangularReflectionMapping = 303,
  EquirectangularRefractionMapping = 304,
  CubeUVReflectionMapping = 306,
  RepeatWrapping = 1e3,
  ClampToEdgeWrapping = 1001,
  MirroredRepeatWrapping = 1002,
  NearestFilter = 1003,
  NearestMipmapNearestFilter = 1004,
  NearestMipMapNearestFilter = 1004,
  NearestMipmapLinearFilter = 1005,
  NearestMipMapLinearFilter = 1005,
  LinearFilter = 1006,
  LinearMipmapNearestFilter = 1007,
  LinearMipMapNearestFilter = 1007,
  LinearMipmapLinearFilter = 1008,
  LinearMipMapLinearFilter = 1008,
  UnsignedByteType = 1009,
  ByteType = 1010,
  ShortType = 1011,
  UnsignedShortType = 1012,
  IntType = 1013,
  UnsignedIntType = 1014,
  FloatType = 1015,
  HalfFloatType = 1016,
  UnsignedShort4444Type = 1017,
  UnsignedShort5551Type = 1018,
  UnsignedInt248Type = 1020,
  AlphaFormat = 1021,
  RGBAFormat = 1023,
  LuminanceFormat = 1024,
  LuminanceAlphaFormat = 1025,
  DepthFormat = 1026,
  DepthStencilFormat = 1027,
  RedFormat = 1028,
  RedIntegerFormat = 1029,
  RGFormat = 1030,
  RGIntegerFormat = 1031,
  RGBAIntegerFormat = 1033,
  RGB_S3TC_DXT1_Format = 33776,
  RGBA_S3TC_DXT1_Format = 33777,
  RGBA_S3TC_DXT3_Format = 33778,
  RGBA_S3TC_DXT5_Format = 33779,
  RGB_PVRTC_4BPPV1_Format = 35840,
  RGB_PVRTC_2BPPV1_Format = 35841,
  RGBA_PVRTC_4BPPV1_Format = 35842,
  RGBA_PVRTC_2BPPV1_Format = 35843,
  RGB_ETC1_Format = 36196,
  RGB_ETC2_Format = 37492,
  RGBA_ETC2_EAC_Format = 37496,
  RGBA_ASTC_4x4_Format = 37808,
  RGBA_ASTC_5x4_Format = 37809,
  RGBA_ASTC_5x5_Format = 37810,
  RGBA_ASTC_6x5_Format = 37811,
  RGBA_ASTC_6x6_Format = 37812,
  RGBA_ASTC_8x5_Format = 37813,
  RGBA_ASTC_8x6_Format = 37814,
  RGBA_ASTC_8x8_Format = 37815,
  RGBA_ASTC_10x5_Format = 37816,
  RGBA_ASTC_10x6_Format = 37817,
  RGBA_ASTC_10x8_Format = 37818,
  RGBA_ASTC_10x10_Format = 37819,
  RGBA_ASTC_12x10_Format = 37820,
  RGBA_ASTC_12x12_Format = 37821,
  RGBA_BPTC_Format = 36492,
  RED_RGTC1_Format = 36283,
  SIGNED_RED_RGTC1_Format = 36284,
  RED_GREEN_RGTC2_Format = 36285,
  SIGNED_RED_GREEN_RGTC2_Format = 36286,
  LoopOnce = 2200,
  LoopRepeat = 2201,
  LoopPingPong = 2202,
  InterpolateDiscrete = 2300,
  InterpolateLinear = 2301,
  InterpolateSmooth = 2302,
  ZeroCurvatureEnding = 2400,
  ZeroSlopeEnding = 2401,
  WrapAroundEnding = 2402,
  NormalAnimationBlendMode = 2500,
  AdditiveAnimationBlendMode = 2501,
  TrianglesDrawMode = 0,
  TriangleStripDrawMode = 1,
  TriangleFanDrawMode = 2,
  LinearEncoding = 3e3,
  sRGBEncoding = 3001,
  BasicDepthPacking = 3200,
  RGBADepthPacking = 3201,
  TangentSpaceNormalMap = 0,
  ObjectSpaceNormalMap = 1,
  NoColorSpace = '',
  SRGBColorSpace = 'srgb',
  LinearSRGBColorSpace = 'srgb-linear',
  DisplayP3ColorSpace = 'display-p3',
  ZeroStencilOp = 0,
  KeepStencilOp = 7680,
  ReplaceStencilOp = 7681,
  IncrementStencilOp = 7682,
  DecrementStencilOp = 7683,
  IncrementWrapStencilOp = 34055,
  DecrementWrapStencilOp = 34056,
  InvertStencilOp = 5386,
  NeverStencilFunc = 512,
  LessStencilFunc = 513,
  EqualStencilFunc = 514,
  LessEqualStencilFunc = 515,
  GreaterStencilFunc = 516,
  NotEqualStencilFunc = 517,
  GreaterEqualStencilFunc = 518,
  AlwaysStencilFunc = 519,
  StaticDrawUsage = 35044,
  DynamicDrawUsage = 35048,
  StreamDrawUsage = 35040,
  StaticReadUsage = 35045,
  DynamicReadUsage = 35049,
  StreamReadUsage = 35041,
  StaticCopyUsage = 35046,
  DynamicCopyUsage = 35050,
  StreamCopyUsage = 35042,
  GLSL1 = '100',
  GLSL3 = '300 es',
  _SRGBAFormat = 1035;
class EventDispatcher {
  addEventListener(e, t) {
    void 0 === this._listeners && (this._listeners = {});
    const r = this._listeners;
    void 0 === r[e] && (r[e] = []), -1 === r[e].indexOf(t) && r[e].push(t);
  }
  hasEventListener(e, t) {
    if (void 0 === this._listeners) return !1;
    const r = this._listeners;
    return void 0 !== r[e] && -1 !== r[e].indexOf(t);
  }
  removeEventListener(e, t) {
    if (void 0 === this._listeners) return;
    const r = this._listeners[e];
    if (void 0 !== r) {
      const e = r.indexOf(t);
      -1 !== e && r.splice(e, 1);
    }
  }
  dispatchEvent(e) {
    if (void 0 === this._listeners) return;
    const t = this._listeners[e.type];
    if (void 0 !== t) {
      e.target = this;
      const r = t.slice(0);
      for (let t = 0, n = r.length; t < n; t++) r[t].call(this, e);
      e.target = null;
    }
  }
}
const _lut = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '0a',
  '0b',
  '0c',
  '0d',
  '0e',
  '0f',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '1a',
  '1b',
  '1c',
  '1d',
  '1e',
  '1f',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '2a',
  '2b',
  '2c',
  '2d',
  '2e',
  '2f',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '3a',
  '3b',
  '3c',
  '3d',
  '3e',
  '3f',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
  '49',
  '4a',
  '4b',
  '4c',
  '4d',
  '4e',
  '4f',
  '50',
  '51',
  '52',
  '53',
  '54',
  '55',
  '56',
  '57',
  '58',
  '59',
  '5a',
  '5b',
  '5c',
  '5d',
  '5e',
  '5f',
  '60',
  '61',
  '62',
  '63',
  '64',
  '65',
  '66',
  '67',
  '68',
  '69',
  '6a',
  '6b',
  '6c',
  '6d',
  '6e',
  '6f',
  '70',
  '71',
  '72',
  '73',
  '74',
  '75',
  '76',
  '77',
  '78',
  '79',
  '7a',
  '7b',
  '7c',
  '7d',
  '7e',
  '7f',
  '80',
  '81',
  '82',
  '83',
  '84',
  '85',
  '86',
  '87',
  '88',
  '89',
  '8a',
  '8b',
  '8c',
  '8d',
  '8e',
  '8f',
  '90',
  '91',
  '92',
  '93',
  '94',
  '95',
  '96',
  '97',
  '98',
  '99',
  '9a',
  '9b',
  '9c',
  '9d',
  '9e',
  '9f',
  'a0',
  'a1',
  'a2',
  'a3',
  'a4',
  'a5',
  'a6',
  'a7',
  'a8',
  'a9',
  'aa',
  'ab',
  'ac',
  'ad',
  'ae',
  'af',
  'b0',
  'b1',
  'b2',
  'b3',
  'b4',
  'b5',
  'b6',
  'b7',
  'b8',
  'b9',
  'ba',
  'bb',
  'bc',
  'bd',
  'be',
  'bf',
  'c0',
  'c1',
  'c2',
  'c3',
  'c4',
  'c5',
  'c6',
  'c7',
  'c8',
  'c9',
  'ca',
  'cb',
  'cc',
  'cd',
  'ce',
  'cf',
  'd0',
  'd1',
  'd2',
  'd3',
  'd4',
  'd5',
  'd6',
  'd7',
  'd8',
  'd9',
  'da',
  'db',
  'dc',
  'dd',
  'de',
  'df',
  'e0',
  'e1',
  'e2',
  'e3',
  'e4',
  'e5',
  'e6',
  'e7',
  'e8',
  'e9',
  'ea',
  'eb',
  'ec',
  'ed',
  'ee',
  'ef',
  'f0',
  'f1',
  'f2',
  'f3',
  'f4',
  'f5',
  'f6',
  'f7',
  'f8',
  'f9',
  'fa',
  'fb',
  'fc',
  'fd',
  'fe',
  'ff',
];
let _seed = 1234567;
const DEG2RAD = Math.PI / 180,
  RAD2DEG = 180 / Math.PI;
function generateUUID() {
  const e = (4294967295 * Math.random()) | 0,
    t = (4294967295 * Math.random()) | 0,
    r = (4294967295 * Math.random()) | 0,
    n = (4294967295 * Math.random()) | 0;
  return (
    _lut[255 & e] +
    _lut[(e >> 8) & 255] +
    _lut[(e >> 16) & 255] +
    _lut[(e >> 24) & 255] +
    '-' +
    _lut[255 & t] +
    _lut[(t >> 8) & 255] +
    '-' +
    _lut[((t >> 16) & 15) | 64] +
    _lut[(t >> 24) & 255] +
    '-' +
    _lut[(63 & r) | 128] +
    _lut[(r >> 8) & 255] +
    '-' +
    _lut[(r >> 16) & 255] +
    _lut[(r >> 24) & 255] +
    _lut[255 & n] +
    _lut[(n >> 8) & 255] +
    _lut[(n >> 16) & 255] +
    _lut[(n >> 24) & 255]
  ).toLowerCase();
}
function clamp(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
function euclideanModulo(e, t) {
  return ((e % t) + t) % t;
}
function mapLinear(e, t, r, n, i) {
  return n + ((e - t) * (i - n)) / (r - t);
}
function inverseLerp(e, t, r) {
  return e !== t ? (r - e) / (t - e) : 0;
}
function lerp(e, t, r) {
  return (1 - r) * e + r * t;
}
function damp(e, t, r, n) {
  return lerp(e, t, 1 - Math.exp(-r * n));
}
function pingpong(e, t = 1) {
  return t - Math.abs(euclideanModulo(e, 2 * t) - t);
}
function smoothstep(e, t, r) {
  return e <= t ? 0 : e >= r ? 1 : (e = (e - t) / (r - t)) * e * (3 - 2 * e);
}
function smootherstep(e, t, r) {
  return e <= t ? 0 : e >= r ? 1 : (e = (e - t) / (r - t)) * e * e * (e * (6 * e - 15) + 10);
}
function randInt(e, t) {
  return e + Math.floor(Math.random() * (t - e + 1));
}
function randFloat(e, t) {
  return e + Math.random() * (t - e);
}
function randFloatSpread(e) {
  return e * (0.5 - Math.random());
}
function seededRandom(e) {
  void 0 !== e && (_seed = e);
  let t = (_seed += 1831565813);
  return (
    (t = Math.imul(t ^ (t >>> 15), 1 | t)),
    (t ^= t + Math.imul(t ^ (t >>> 7), 61 | t)),
    ((t ^ (t >>> 14)) >>> 0) / 4294967296
  );
}
function degToRad(e) {
  return e * DEG2RAD;
}
function radToDeg(e) {
  return e * RAD2DEG;
}
function isPowerOfTwo(e) {
  return 0 == (e & (e - 1)) && 0 !== e;
}
function ceilPowerOfTwo(e) {
  return Math.pow(2, Math.ceil(Math.log(e) / Math.LN2));
}
function floorPowerOfTwo(e) {
  return Math.pow(2, Math.floor(Math.log(e) / Math.LN2));
}
function setQuaternionFromProperEuler(e, t, r, n, i) {
  const a = Math.cos,
    s = Math.sin,
    o = a(r / 2),
    l = s(r / 2),
    c = a((t + n) / 2),
    h = s((t + n) / 2),
    u = a((t - n) / 2),
    d = s((t - n) / 2),
    p = a((n - t) / 2),
    m = s((n - t) / 2);
  switch (i) {
    case 'XYX':
      e.set(o * h, l * u, l * d, o * c);
      break;
    case 'YZY':
      e.set(l * d, o * h, l * u, o * c);
      break;
    case 'ZXZ':
      e.set(l * u, l * d, o * h, o * c);
      break;
    case 'XZX':
      e.set(o * h, l * m, l * p, o * c);
      break;
    case 'YXY':
      e.set(l * p, o * h, l * m, o * c);
      break;
    case 'ZYZ':
      e.set(l * m, l * p, o * h, o * c);
      break;
    default:
      console.warn(
        'THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: ' + i,
      );
  }
}
function denormalize(e, t) {
  switch (t.constructor) {
    case Float32Array:
      return e;
    case Uint16Array:
      return e / 65535;
    case Uint8Array:
      return e / 255;
    case Int16Array:
      return Math.max(e / 32767, -1);
    case Int8Array:
      return Math.max(e / 127, -1);
    default:
      throw new Error('Invalid component type.');
  }
}
function normalize(e, t) {
  switch (t.constructor) {
    case Float32Array:
      return e;
    case Uint16Array:
      return Math.round(65535 * e);
    case Uint8Array:
      return Math.round(255 * e);
    case Int16Array:
      return Math.round(32767 * e);
    case Int8Array:
      return Math.round(127 * e);
    default:
      throw new Error('Invalid component type.');
  }
}
const MathUtils = {
  DEG2RAD: DEG2RAD,
  RAD2DEG: RAD2DEG,
  generateUUID: generateUUID,
  clamp: clamp,
  euclideanModulo: euclideanModulo,
  mapLinear: mapLinear,
  inverseLerp: inverseLerp,
  lerp: lerp,
  damp: damp,
  pingpong: pingpong,
  smoothstep: smoothstep,
  smootherstep: smootherstep,
  randInt: randInt,
  randFloat: randFloat,
  randFloatSpread: randFloatSpread,
  seededRandom: seededRandom,
  degToRad: degToRad,
  radToDeg: radToDeg,
  isPowerOfTwo: isPowerOfTwo,
  ceilPowerOfTwo: ceilPowerOfTwo,
  floorPowerOfTwo: floorPowerOfTwo,
  setQuaternionFromProperEuler: setQuaternionFromProperEuler,
  normalize: normalize,
  denormalize: denormalize,
};
class Vector2 {
  constructor(e = 0, t = 0) {
    (Vector2.prototype.isVector2 = !0), (this.x = e), (this.y = t);
  }
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  set(e, t) {
    return (this.x = e), (this.y = t), this;
  }
  setScalar(e) {
    return (this.x = e), (this.y = e), this;
  }
  setX(e) {
    return (this.x = e), this;
  }
  setY(e) {
    return (this.y = e), this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      default:
        throw new Error('index is out of range: ' + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error('index is out of range: ' + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(e) {
    return (this.x = e.x), (this.y = e.y), this;
  }
  add(e) {
    return (this.x += e.x), (this.y += e.y), this;
  }
  addScalar(e) {
    return (this.x += e), (this.y += e), this;
  }
  addVectors(e, t) {
    return (this.x = e.x + t.x), (this.y = e.y + t.y), this;
  }
  addScaledVector(e, t) {
    return (this.x += e.x * t), (this.y += e.y * t), this;
  }
  sub(e) {
    return (this.x -= e.x), (this.y -= e.y), this;
  }
  subScalar(e) {
    return (this.x -= e), (this.y -= e), this;
  }
  subVectors(e, t) {
    return (this.x = e.x - t.x), (this.y = e.y - t.y), this;
  }
  multiply(e) {
    return (this.x *= e.x), (this.y *= e.y), this;
  }
  multiplyScalar(e) {
    return (this.x *= e), (this.y *= e), this;
  }
  divide(e) {
    return (this.x /= e.x), (this.y /= e.y), this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  applyMatrix3(e) {
    const t = this.x,
      r = this.y,
      n = e.elements;
    return (this.x = n[0] * t + n[3] * r + n[6]), (this.y = n[1] * t + n[4] * r + n[7]), this;
  }
  min(e) {
    return (this.x = Math.min(this.x, e.x)), (this.y = Math.min(this.y, e.y)), this;
  }
  max(e) {
    return (this.x = Math.max(this.x, e.x)), (this.y = Math.max(this.y, e.y)), this;
  }
  clamp(e, t) {
    return (
      (this.x = Math.max(e.x, Math.min(t.x, this.x))),
      (this.y = Math.max(e.y, Math.min(t.y, this.y))),
      this
    );
  }
  clampScalar(e, t) {
    return (
      (this.x = Math.max(e, Math.min(t, this.x))), (this.y = Math.max(e, Math.min(t, this.y))), this
    );
  }
  clampLength(e, t) {
    const r = this.length();
    return this.divideScalar(r || 1).multiplyScalar(Math.max(e, Math.min(t, r)));
  }
  floor() {
    return (this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), this;
  }
  ceil() {
    return (this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), this;
  }
  round() {
    return (this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this;
  }
  roundToZero() {
    return (
      (this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x)),
      (this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y)),
      this
    );
  }
  negate() {
    return (this.x = -this.x), (this.y = -this.y), this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (0 === t) return Math.PI / 2;
    const r = this.dot(e) / t;
    return Math.acos(clamp(r, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x,
      r = this.y - e.y;
    return t * t + r * r;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return (this.x += (e.x - this.x) * t), (this.y += (e.y - this.y) * t), this;
  }
  lerpVectors(e, t, r) {
    return (this.x = e.x + (t.x - e.x) * r), (this.y = e.y + (t.y - e.y) * r), this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  fromArray(e, t = 0) {
    return (this.x = e[t]), (this.y = e[t + 1]), this;
  }
  toArray(e = [], t = 0) {
    return (e[t] = this.x), (e[t + 1] = this.y), e;
  }
  fromBufferAttribute(e, t) {
    return (this.x = e.getX(t)), (this.y = e.getY(t)), this;
  }
  rotateAround(e, t) {
    const r = Math.cos(t),
      n = Math.sin(t),
      i = this.x - e.x,
      a = this.y - e.y;
    return (this.x = i * r - a * n + e.x), (this.y = i * n + a * r + e.y), this;
  }
  random() {
    return (this.x = Math.random()), (this.y = Math.random()), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class Matrix3 {
  constructor() {
    (Matrix3.prototype.isMatrix3 = !0), (this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]);
  }
  set(e, t, r, n, i, a, s, o, l) {
    const c = this.elements;
    return (
      (c[0] = e),
      (c[1] = n),
      (c[2] = s),
      (c[3] = t),
      (c[4] = i),
      (c[5] = o),
      (c[6] = r),
      (c[7] = a),
      (c[8] = l),
      this
    );
  }
  identity() {
    return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
  }
  copy(e) {
    const t = this.elements,
      r = e.elements;
    return (
      (t[0] = r[0]),
      (t[1] = r[1]),
      (t[2] = r[2]),
      (t[3] = r[3]),
      (t[4] = r[4]),
      (t[5] = r[5]),
      (t[6] = r[6]),
      (t[7] = r[7]),
      (t[8] = r[8]),
      this
    );
  }
  extractBasis(e, t, r) {
    return (
      e.setFromMatrix3Column(this, 0),
      t.setFromMatrix3Column(this, 1),
      r.setFromMatrix3Column(this, 2),
      this
    );
  }
  setFromMatrix4(e) {
    const t = e.elements;
    return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const r = e.elements,
      n = t.elements,
      i = this.elements,
      a = r[0],
      s = r[3],
      o = r[6],
      l = r[1],
      c = r[4],
      h = r[7],
      u = r[2],
      d = r[5],
      p = r[8],
      m = n[0],
      f = n[3],
      g = n[6],
      _ = n[1],
      v = n[4],
      x = n[7],
      y = n[2],
      M = n[5],
      S = n[8];
    return (
      (i[0] = a * m + s * _ + o * y),
      (i[3] = a * f + s * v + o * M),
      (i[6] = a * g + s * x + o * S),
      (i[1] = l * m + c * _ + h * y),
      (i[4] = l * f + c * v + h * M),
      (i[7] = l * g + c * x + h * S),
      (i[2] = u * m + d * _ + p * y),
      (i[5] = u * f + d * v + p * M),
      (i[8] = u * g + d * x + p * S),
      this
    );
  }
  multiplyScalar(e) {
    const t = this.elements;
    return (
      (t[0] *= e),
      (t[3] *= e),
      (t[6] *= e),
      (t[1] *= e),
      (t[4] *= e),
      (t[7] *= e),
      (t[2] *= e),
      (t[5] *= e),
      (t[8] *= e),
      this
    );
  }
  determinant() {
    const e = this.elements,
      t = e[0],
      r = e[1],
      n = e[2],
      i = e[3],
      a = e[4],
      s = e[5],
      o = e[6],
      l = e[7],
      c = e[8];
    return t * a * c - t * s * l - r * i * c + r * s * o + n * i * l - n * a * o;
  }
  invert() {
    const e = this.elements,
      t = e[0],
      r = e[1],
      n = e[2],
      i = e[3],
      a = e[4],
      s = e[5],
      o = e[6],
      l = e[7],
      c = e[8],
      h = c * a - s * l,
      u = s * o - c * i,
      d = l * i - a * o,
      p = t * h + r * u + n * d;
    if (0 === p) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const m = 1 / p;
    return (
      (e[0] = h * m),
      (e[1] = (n * l - c * r) * m),
      (e[2] = (s * r - n * a) * m),
      (e[3] = u * m),
      (e[4] = (c * t - n * o) * m),
      (e[5] = (n * i - s * t) * m),
      (e[6] = d * m),
      (e[7] = (r * o - l * t) * m),
      (e[8] = (a * t - r * i) * m),
      this
    );
  }
  transpose() {
    let e;
    const t = this.elements;
    return (
      (e = t[1]),
      (t[1] = t[3]),
      (t[3] = e),
      (e = t[2]),
      (t[2] = t[6]),
      (t[6] = e),
      (e = t[5]),
      (t[5] = t[7]),
      (t[7] = e),
      this
    );
  }
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  transposeIntoArray(e) {
    const t = this.elements;
    return (
      (e[0] = t[0]),
      (e[1] = t[3]),
      (e[2] = t[6]),
      (e[3] = t[1]),
      (e[4] = t[4]),
      (e[5] = t[7]),
      (e[6] = t[2]),
      (e[7] = t[5]),
      (e[8] = t[8]),
      this
    );
  }
  setUvTransform(e, t, r, n, i, a, s) {
    const o = Math.cos(i),
      l = Math.sin(i);
    return (
      this.set(
        r * o,
        r * l,
        -r * (o * a + l * s) + a + e,
        -n * l,
        n * o,
        -n * (-l * a + o * s) + s + t,
        0,
        0,
        1,
      ),
      this
    );
  }
  scale(e, t) {
    return this.premultiply(_m3.makeScale(e, t)), this;
  }
  rotate(e) {
    return this.premultiply(_m3.makeRotation(-e)), this;
  }
  translate(e, t) {
    return this.premultiply(_m3.makeTranslation(e, t)), this;
  }
  makeTranslation(e, t) {
    return this.set(1, 0, e, 0, 1, t, 0, 0, 1), this;
  }
  makeRotation(e) {
    const t = Math.cos(e),
      r = Math.sin(e);
    return this.set(t, -r, 0, r, t, 0, 0, 0, 1), this;
  }
  makeScale(e, t) {
    return this.set(e, 0, 0, 0, t, 0, 0, 0, 1), this;
  }
  equals(e) {
    const t = this.elements,
      r = e.elements;
    for (let e = 0; e < 9; e++) if (t[e] !== r[e]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let r = 0; r < 9; r++) this.elements[r] = e[r + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const r = this.elements;
    return (
      (e[t] = r[0]),
      (e[t + 1] = r[1]),
      (e[t + 2] = r[2]),
      (e[t + 3] = r[3]),
      (e[t + 4] = r[4]),
      (e[t + 5] = r[5]),
      (e[t + 6] = r[6]),
      (e[t + 7] = r[7]),
      (e[t + 8] = r[8]),
      e
    );
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const _m3 = new Matrix3();
function arrayNeedsUint32(e) {
  for (let t = e.length - 1; t >= 0; --t) if (e[t] >= 65535) return !0;
  return !1;
}
const TYPED_ARRAYS = {
  Int8Array: Int8Array,
  Uint8Array: Uint8Array,
  Uint8ClampedArray: Uint8ClampedArray,
  Int16Array: Int16Array,
  Uint16Array: Uint16Array,
  Int32Array: Int32Array,
  Uint32Array: Uint32Array,
  Float32Array: Float32Array,
  Float64Array: Float64Array,
};
function getTypedArray(e, t) {
  return new TYPED_ARRAYS[e](t);
}
function createElementNS(e) {
  return document.createElementNS('http://www.w3.org/1999/xhtml', e);
}
function SRGBToLinear(e) {
  return e < 0.04045 ? 0.0773993808 * e : Math.pow(0.9478672986 * e + 0.0521327014, 2.4);
}
function LinearToSRGB(e) {
  return e < 0.0031308 ? 12.92 * e : 1.055 * Math.pow(e, 0.41666) - 0.055;
}
const LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = new Matrix3().fromArray([
    0.8224621, 0.0331941, 0.0170827, 0.177538, 0.9668058, 0.0723974, -1e-7, 1e-7, 0.9105199,
  ]),
  LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = new Matrix3().fromArray([
    1.2249401, -0.0420569, -0.0196376, -0.2249404, 1.0420571, -0.0786361, 1e-7, 0, 1.0982735,
  ]);
function DisplayP3ToLinearSRGB(e) {
  return e.convertSRGBToLinear().applyMatrix3(LINEAR_DISPLAY_P3_TO_LINEAR_SRGB);
}
function LinearSRGBToDisplayP3(e) {
  return e.applyMatrix3(LINEAR_SRGB_TO_LINEAR_DISPLAY_P3).convertLinearToSRGB();
}
const TO_LINEAR = {
    'srgb-linear': (e) => e,
    srgb: (e) => e.convertSRGBToLinear(),
    'display-p3': DisplayP3ToLinearSRGB,
  },
  FROM_LINEAR = {
    'srgb-linear': (e) => e,
    srgb: (e) => e.convertLinearToSRGB(),
    'display-p3': LinearSRGBToDisplayP3,
  },
  ColorManagement = {
    enabled: !1,
    get legacyMode() {
      return (
        console.warn('THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150.'),
        !this.enabled
      );
    },
    set legacyMode(e) {
      console.warn('THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150.'),
        (this.enabled = !e);
    },
    get workingColorSpace() {
      return 'srgb-linear';
    },
    set workingColorSpace(e) {
      console.warn('THREE.ColorManagement: .workingColorSpace is readonly.');
    },
    convert: function (e, t, r) {
      if (!1 === this.enabled || t === r || !t || !r) return e;
      const n = TO_LINEAR[t],
        i = FROM_LINEAR[r];
      if (void 0 === n || void 0 === i)
        throw new Error(`Unsupported color space conversion, "${t}" to "${r}".`);
      return i(n(e));
    },
    fromWorkingColorSpace: function (e, t) {
      return this.convert(e, this.workingColorSpace, t);
    },
    toWorkingColorSpace: function (e, t) {
      return this.convert(e, t, this.workingColorSpace);
    },
  };
let _canvas;
class ImageUtils {
  static getDataURL(e) {
    if (/^data:/i.test(e.src)) return e.src;
    if ('undefined' == typeof HTMLCanvasElement) return e.src;
    let t;
    if (e instanceof HTMLCanvasElement) t = e;
    else {
      void 0 === _canvas && (_canvas = createElementNS('canvas')),
        (_canvas.width = e.width),
        (_canvas.height = e.height);
      const r = _canvas.getContext('2d');
      e instanceof ImageData ? r.putImageData(e, 0, 0) : r.drawImage(e, 0, 0, e.width, e.height),
        (t = _canvas);
    }
    return t.width > 2048 || t.height > 2048
      ? (console.warn(
          'THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons',
          e,
        ),
        t.toDataURL('image/jpeg', 0.6))
      : t.toDataURL('image/png');
  }
  static sRGBToLinear(e) {
    if (
      ('undefined' != typeof HTMLImageElement && e instanceof HTMLImageElement) ||
      ('undefined' != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement) ||
      ('undefined' != typeof ImageBitmap && e instanceof ImageBitmap)
    ) {
      const t = createElementNS('canvas');
      (t.width = e.width), (t.height = e.height);
      const r = t.getContext('2d');
      r.drawImage(e, 0, 0, e.width, e.height);
      const n = r.getImageData(0, 0, e.width, e.height),
        i = n.data;
      for (let e = 0; e < i.length; e++) i[e] = 255 * SRGBToLinear(i[e] / 255);
      return r.putImageData(n, 0, 0), t;
    }
    if (e.data) {
      const t = e.data.slice(0);
      for (let e = 0; e < t.length; e++)
        t instanceof Uint8Array || t instanceof Uint8ClampedArray
          ? (t[e] = Math.floor(255 * SRGBToLinear(t[e] / 255)))
          : (t[e] = SRGBToLinear(t[e]));
      return { data: t, width: e.width, height: e.height };
    }
    return (
      console.warn(
        'THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.',
      ),
      e
    );
  }
}
class Source {
  constructor(e = null) {
    (this.isSource = !0), (this.uuid = generateUUID()), (this.data = e), (this.version = 0);
  }
  set needsUpdate(e) {
    !0 === e && this.version++;
  }
  toJSON(e) {
    const t = void 0 === e || 'string' == typeof e;
    if (!t && void 0 !== e.images[this.uuid]) return e.images[this.uuid];
    const r = { uuid: this.uuid, url: '' },
      n = this.data;
    if (null !== n) {
      let e;
      if (Array.isArray(n)) {
        e = [];
        for (let t = 0, r = n.length; t < r; t++)
          n[t].isDataTexture ? e.push(serializeImage(n[t].image)) : e.push(serializeImage(n[t]));
      } else e = serializeImage(n);
      r.url = e;
    }
    return t || (e.images[this.uuid] = r), r;
  }
}
function serializeImage(e) {
  return ('undefined' != typeof HTMLImageElement && e instanceof HTMLImageElement) ||
    ('undefined' != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement) ||
    ('undefined' != typeof ImageBitmap && e instanceof ImageBitmap)
    ? ImageUtils.getDataURL(e)
    : e.data
      ? {
          data: Array.from(e.data),
          width: e.width,
          height: e.height,
          type: e.data.constructor.name,
        }
      : (console.warn('THREE.Texture: Unable to serialize Texture.'), {});
}
let textureId = 0;
class Texture extends EventDispatcher {
  constructor(
    e = Texture.DEFAULT_IMAGE,
    t = Texture.DEFAULT_MAPPING,
    r = 1001,
    n = 1001,
    i = 1006,
    a = 1008,
    s = 1023,
    o = 1009,
    l = Texture.DEFAULT_ANISOTROPY,
    c = 3e3,
  ) {
    super(),
      (this.isTexture = !0),
      Object.defineProperty(this, 'id', { value: textureId++ }),
      (this.uuid = generateUUID()),
      (this.name = ''),
      (this.source = new Source(e)),
      (this.mipmaps = []),
      (this.mapping = t),
      (this.channel = 0),
      (this.wrapS = r),
      (this.wrapT = n),
      (this.magFilter = i),
      (this.minFilter = a),
      (this.anisotropy = l),
      (this.format = s),
      (this.internalFormat = null),
      (this.type = o),
      (this.offset = new Vector2(0, 0)),
      (this.repeat = new Vector2(1, 1)),
      (this.center = new Vector2(0, 0)),
      (this.rotation = 0),
      (this.matrixAutoUpdate = !0),
      (this.matrix = new Matrix3()),
      (this.generateMipmaps = !0),
      (this.premultiplyAlpha = !1),
      (this.flipY = !0),
      (this.unpackAlignment = 4),
      (this.encoding = c),
      (this.userData = {}),
      (this.version = 0),
      (this.onUpdate = null),
      (this.isRenderTargetTexture = !1),
      (this.needsPMREMUpdate = !1);
  }
  get image() {
    return this.source.data;
  }
  set image(e = null) {
    this.source.data = e;
  }
  updateMatrix() {
    this.matrix.setUvTransform(
      this.offset.x,
      this.offset.y,
      this.repeat.x,
      this.repeat.y,
      this.rotation,
      this.center.x,
      this.center.y,
    );
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return (
      (this.name = e.name),
      (this.source = e.source),
      (this.mipmaps = e.mipmaps.slice(0)),
      (this.mapping = e.mapping),
      (this.channel = e.channel),
      (this.wrapS = e.wrapS),
      (this.wrapT = e.wrapT),
      (this.magFilter = e.magFilter),
      (this.minFilter = e.minFilter),
      (this.anisotropy = e.anisotropy),
      (this.format = e.format),
      (this.internalFormat = e.internalFormat),
      (this.type = e.type),
      this.offset.copy(e.offset),
      this.repeat.copy(e.repeat),
      this.center.copy(e.center),
      (this.rotation = e.rotation),
      (this.matrixAutoUpdate = e.matrixAutoUpdate),
      this.matrix.copy(e.matrix),
      (this.generateMipmaps = e.generateMipmaps),
      (this.premultiplyAlpha = e.premultiplyAlpha),
      (this.flipY = e.flipY),
      (this.unpackAlignment = e.unpackAlignment),
      (this.encoding = e.encoding),
      (this.userData = JSON.parse(JSON.stringify(e.userData))),
      (this.needsUpdate = !0),
      this
    );
  }
  toJSON(e) {
    const t = void 0 === e || 'string' == typeof e;
    if (!t && void 0 !== e.textures[this.uuid]) return e.textures[this.uuid];
    const r = {
      metadata: { version: 4.5, type: 'Texture', generator: 'Texture.toJSON' },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(e).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      encoding: this.encoding,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment,
    };
    return (
      Object.keys(this.userData).length > 0 && (r.userData = this.userData),
      t || (e.textures[this.uuid] = r),
      r
    );
  }
  dispose() {
    this.dispatchEvent({ type: 'dispose' });
  }
  transformUv(e) {
    if (300 !== this.mapping) return e;
    if ((e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1))
      switch (this.wrapS) {
        case 1e3:
          e.x = e.x - Math.floor(e.x);
          break;
        case 1001:
          e.x = e.x < 0 ? 0 : 1;
          break;
        case 1002:
          1 === Math.abs(Math.floor(e.x) % 2)
            ? (e.x = Math.ceil(e.x) - e.x)
            : (e.x = e.x - Math.floor(e.x));
      }
    if (e.y < 0 || e.y > 1)
      switch (this.wrapT) {
        case 1e3:
          e.y = e.y - Math.floor(e.y);
          break;
        case 1001:
          e.y = e.y < 0 ? 0 : 1;
          break;
        case 1002:
          1 === Math.abs(Math.floor(e.y) % 2)
            ? (e.y = Math.ceil(e.y) - e.y)
            : (e.y = e.y - Math.floor(e.y));
      }
    return this.flipY && (e.y = 1 - e.y), e;
  }
  set needsUpdate(e) {
    !0 === e && (this.version++, (this.source.needsUpdate = !0));
  }
}
(Texture.DEFAULT_IMAGE = null), (Texture.DEFAULT_MAPPING = 300), (Texture.DEFAULT_ANISOTROPY = 1);
class Vector4 {
  constructor(e = 0, t = 0, r = 0, n = 1) {
    (Vector4.prototype.isVector4 = !0), (this.x = e), (this.y = t), (this.z = r), (this.w = n);
  }
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  set(e, t, r, n) {
    return (this.x = e), (this.y = t), (this.z = r), (this.w = n), this;
  }
  setScalar(e) {
    return (this.x = e), (this.y = e), (this.z = e), (this.w = e), this;
  }
  setX(e) {
    return (this.x = e), this;
  }
  setY(e) {
    return (this.y = e), this;
  }
  setZ(e) {
    return (this.z = e), this;
  }
  setW(e) {
    return (this.w = e), this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      case 3:
        this.w = t;
        break;
      default:
        throw new Error('index is out of range: ' + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error('index is out of range: ' + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(e) {
    return (
      (this.x = e.x), (this.y = e.y), (this.z = e.z), (this.w = void 0 !== e.w ? e.w : 1), this
    );
  }
  add(e) {
    return (this.x += e.x), (this.y += e.y), (this.z += e.z), (this.w += e.w), this;
  }
  addScalar(e) {
    return (this.x += e), (this.y += e), (this.z += e), (this.w += e), this;
  }
  addVectors(e, t) {
    return (
      (this.x = e.x + t.x), (this.y = e.y + t.y), (this.z = e.z + t.z), (this.w = e.w + t.w), this
    );
  }
  addScaledVector(e, t) {
    return (this.x += e.x * t), (this.y += e.y * t), (this.z += e.z * t), (this.w += e.w * t), this;
  }
  sub(e) {
    return (this.x -= e.x), (this.y -= e.y), (this.z -= e.z), (this.w -= e.w), this;
  }
  subScalar(e) {
    return (this.x -= e), (this.y -= e), (this.z -= e), (this.w -= e), this;
  }
  subVectors(e, t) {
    return (
      (this.x = e.x - t.x), (this.y = e.y - t.y), (this.z = e.z - t.z), (this.w = e.w - t.w), this
    );
  }
  multiply(e) {
    return (this.x *= e.x), (this.y *= e.y), (this.z *= e.z), (this.w *= e.w), this;
  }
  multiplyScalar(e) {
    return (this.x *= e), (this.y *= e), (this.z *= e), (this.w *= e), this;
  }
  applyMatrix4(e) {
    const t = this.x,
      r = this.y,
      n = this.z,
      i = this.w,
      a = e.elements;
    return (
      (this.x = a[0] * t + a[4] * r + a[8] * n + a[12] * i),
      (this.y = a[1] * t + a[5] * r + a[9] * n + a[13] * i),
      (this.z = a[2] * t + a[6] * r + a[10] * n + a[14] * i),
      (this.w = a[3] * t + a[7] * r + a[11] * n + a[15] * i),
      this
    );
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  setAxisAngleFromQuaternion(e) {
    this.w = 2 * Math.acos(e.w);
    const t = Math.sqrt(1 - e.w * e.w);
    return (
      t < 1e-4
        ? ((this.x = 1), (this.y = 0), (this.z = 0))
        : ((this.x = e.x / t), (this.y = e.y / t), (this.z = e.z / t)),
      this
    );
  }
  setAxisAngleFromRotationMatrix(e) {
    let t, r, n, i;
    const a = 0.01,
      s = 0.1,
      o = e.elements,
      l = o[0],
      c = o[4],
      h = o[8],
      u = o[1],
      d = o[5],
      p = o[9],
      m = o[2],
      f = o[6],
      g = o[10];
    if (Math.abs(c - u) < a && Math.abs(h - m) < a && Math.abs(p - f) < a) {
      if (
        Math.abs(c + u) < s &&
        Math.abs(h + m) < s &&
        Math.abs(p + f) < s &&
        Math.abs(l + d + g - 3) < s
      )
        return this.set(1, 0, 0, 0), this;
      t = Math.PI;
      const e = (l + 1) / 2,
        o = (d + 1) / 2,
        _ = (g + 1) / 2,
        v = (c + u) / 4,
        x = (h + m) / 4,
        y = (p + f) / 4;
      return (
        e > o && e > _
          ? e < a
            ? ((r = 0), (n = 0.707106781), (i = 0.707106781))
            : ((r = Math.sqrt(e)), (n = v / r), (i = x / r))
          : o > _
            ? o < a
              ? ((r = 0.707106781), (n = 0), (i = 0.707106781))
              : ((n = Math.sqrt(o)), (r = v / n), (i = y / n))
            : _ < a
              ? ((r = 0.707106781), (n = 0.707106781), (i = 0))
              : ((i = Math.sqrt(_)), (r = x / i), (n = y / i)),
        this.set(r, n, i, t),
        this
      );
    }
    let _ = Math.sqrt((f - p) * (f - p) + (h - m) * (h - m) + (u - c) * (u - c));
    return (
      Math.abs(_) < 0.001 && (_ = 1),
      (this.x = (f - p) / _),
      (this.y = (h - m) / _),
      (this.z = (u - c) / _),
      (this.w = Math.acos((l + d + g - 1) / 2)),
      this
    );
  }
  min(e) {
    return (
      (this.x = Math.min(this.x, e.x)),
      (this.y = Math.min(this.y, e.y)),
      (this.z = Math.min(this.z, e.z)),
      (this.w = Math.min(this.w, e.w)),
      this
    );
  }
  max(e) {
    return (
      (this.x = Math.max(this.x, e.x)),
      (this.y = Math.max(this.y, e.y)),
      (this.z = Math.max(this.z, e.z)),
      (this.w = Math.max(this.w, e.w)),
      this
    );
  }
  clamp(e, t) {
    return (
      (this.x = Math.max(e.x, Math.min(t.x, this.x))),
      (this.y = Math.max(e.y, Math.min(t.y, this.y))),
      (this.z = Math.max(e.z, Math.min(t.z, this.z))),
      (this.w = Math.max(e.w, Math.min(t.w, this.w))),
      this
    );
  }
  clampScalar(e, t) {
    return (
      (this.x = Math.max(e, Math.min(t, this.x))),
      (this.y = Math.max(e, Math.min(t, this.y))),
      (this.z = Math.max(e, Math.min(t, this.z))),
      (this.w = Math.max(e, Math.min(t, this.w))),
      this
    );
  }
  clampLength(e, t) {
    const r = this.length();
    return this.divideScalar(r || 1).multiplyScalar(Math.max(e, Math.min(t, r)));
  }
  floor() {
    return (
      (this.x = Math.floor(this.x)),
      (this.y = Math.floor(this.y)),
      (this.z = Math.floor(this.z)),
      (this.w = Math.floor(this.w)),
      this
    );
  }
  ceil() {
    return (
      (this.x = Math.ceil(this.x)),
      (this.y = Math.ceil(this.y)),
      (this.z = Math.ceil(this.z)),
      (this.w = Math.ceil(this.w)),
      this
    );
  }
  round() {
    return (
      (this.x = Math.round(this.x)),
      (this.y = Math.round(this.y)),
      (this.z = Math.round(this.z)),
      (this.w = Math.round(this.w)),
      this
    );
  }
  roundToZero() {
    return (
      (this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x)),
      (this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y)),
      (this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z)),
      (this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w)),
      this
    );
  }
  negate() {
    return (this.x = -this.x), (this.y = -this.y), (this.z = -this.z), (this.w = -this.w), this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return (
      (this.x += (e.x - this.x) * t),
      (this.y += (e.y - this.y) * t),
      (this.z += (e.z - this.z) * t),
      (this.w += (e.w - this.w) * t),
      this
    );
  }
  lerpVectors(e, t, r) {
    return (
      (this.x = e.x + (t.x - e.x) * r),
      (this.y = e.y + (t.y - e.y) * r),
      (this.z = e.z + (t.z - e.z) * r),
      (this.w = e.w + (t.w - e.w) * r),
      this
    );
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  fromArray(e, t = 0) {
    return (this.x = e[t]), (this.y = e[t + 1]), (this.z = e[t + 2]), (this.w = e[t + 3]), this;
  }
  toArray(e = [], t = 0) {
    return (e[t] = this.x), (e[t + 1] = this.y), (e[t + 2] = this.z), (e[t + 3] = this.w), e;
  }
  fromBufferAttribute(e, t) {
    return (
      (this.x = e.getX(t)), (this.y = e.getY(t)), (this.z = e.getZ(t)), (this.w = e.getW(t)), this
    );
  }
  random() {
    return (
      (this.x = Math.random()),
      (this.y = Math.random()),
      (this.z = Math.random()),
      (this.w = Math.random()),
      this
    );
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
class WebGLRenderTarget extends EventDispatcher {
  constructor(e = 1, t = 1, r = {}) {
    super(),
      (this.isWebGLRenderTarget = !0),
      (this.width = e),
      (this.height = t),
      (this.depth = 1),
      (this.scissor = new Vector4(0, 0, e, t)),
      (this.scissorTest = !1),
      (this.viewport = new Vector4(0, 0, e, t));
    const n = { width: e, height: t, depth: 1 };
    (this.texture = new Texture(
      n,
      r.mapping,
      r.wrapS,
      r.wrapT,
      r.magFilter,
      r.minFilter,
      r.format,
      r.type,
      r.anisotropy,
      r.encoding,
    )),
      (this.texture.isRenderTargetTexture = !0),
      (this.texture.flipY = !1),
      (this.texture.generateMipmaps = void 0 !== r.generateMipmaps && r.generateMipmaps),
      (this.texture.internalFormat = void 0 !== r.internalFormat ? r.internalFormat : null),
      (this.texture.minFilter = void 0 !== r.minFilter ? r.minFilter : 1006),
      (this.depthBuffer = void 0 === r.depthBuffer || r.depthBuffer),
      (this.stencilBuffer = void 0 !== r.stencilBuffer && r.stencilBuffer),
      (this.depthTexture = void 0 !== r.depthTexture ? r.depthTexture : null),
      (this.samples = void 0 !== r.samples ? r.samples : 0);
  }
  setSize(e, t, r = 1) {
    (this.width === e && this.height === t && this.depth === r) ||
      ((this.width = e),
      (this.height = t),
      (this.depth = r),
      (this.texture.image.width = e),
      (this.texture.image.height = t),
      (this.texture.image.depth = r),
      this.dispose()),
      this.viewport.set(0, 0, e, t),
      this.scissor.set(0, 0, e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    (this.width = e.width),
      (this.height = e.height),
      (this.depth = e.depth),
      this.viewport.copy(e.viewport),
      (this.texture = e.texture.clone()),
      (this.texture.isRenderTargetTexture = !0);
    const t = Object.assign({}, e.texture.image);
    return (
      (this.texture.source = new Source(t)),
      (this.depthBuffer = e.depthBuffer),
      (this.stencilBuffer = e.stencilBuffer),
      null !== e.depthTexture && (this.depthTexture = e.depthTexture.clone()),
      (this.samples = e.samples),
      this
    );
  }
  dispose() {
    this.dispatchEvent({ type: 'dispose' });
  }
}
class DataArrayTexture extends Texture {
  constructor(e = null, t = 1, r = 1, n = 1) {
    super(null),
      (this.isDataArrayTexture = !0),
      (this.image = { data: e, width: t, height: r, depth: n }),
      (this.magFilter = 1003),
      (this.minFilter = 1003),
      (this.wrapR = 1001),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1);
  }
}
class WebGLArrayRenderTarget extends WebGLRenderTarget {
  constructor(e = 1, t = 1, r = 1) {
    super(e, t),
      (this.isWebGLArrayRenderTarget = !0),
      (this.depth = r),
      (this.texture = new DataArrayTexture(null, e, t, r)),
      (this.texture.isRenderTargetTexture = !0);
  }
}
class Data3DTexture extends Texture {
  constructor(e = null, t = 1, r = 1, n = 1) {
    super(null),
      (this.isData3DTexture = !0),
      (this.image = { data: e, width: t, height: r, depth: n }),
      (this.magFilter = 1003),
      (this.minFilter = 1003),
      (this.wrapR = 1001),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1);
  }
}
class WebGL3DRenderTarget extends WebGLRenderTarget {
  constructor(e = 1, t = 1, r = 1) {
    super(e, t),
      (this.isWebGL3DRenderTarget = !0),
      (this.depth = r),
      (this.texture = new Data3DTexture(null, e, t, r)),
      (this.texture.isRenderTargetTexture = !0);
  }
}
class WebGLMultipleRenderTargets extends WebGLRenderTarget {
  constructor(e = 1, t = 1, r = 1, n = {}) {
    super(e, t, n), (this.isWebGLMultipleRenderTargets = !0);
    const i = this.texture;
    this.texture = [];
    for (let e = 0; e < r; e++)
      (this.texture[e] = i.clone()), (this.texture[e].isRenderTargetTexture = !0);
  }
  setSize(e, t, r = 1) {
    if (this.width !== e || this.height !== t || this.depth !== r) {
      (this.width = e), (this.height = t), (this.depth = r);
      for (let n = 0, i = this.texture.length; n < i; n++)
        (this.texture[n].image.width = e),
          (this.texture[n].image.height = t),
          (this.texture[n].image.depth = r);
      this.dispose();
    }
    return this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t), this;
  }
  copy(e) {
    this.dispose(),
      (this.width = e.width),
      (this.height = e.height),
      (this.depth = e.depth),
      this.viewport.set(0, 0, this.width, this.height),
      this.scissor.set(0, 0, this.width, this.height),
      (this.depthBuffer = e.depthBuffer),
      (this.stencilBuffer = e.stencilBuffer),
      null !== e.depthTexture && (this.depthTexture = e.depthTexture.clone()),
      (this.texture.length = 0);
    for (let t = 0, r = e.texture.length; t < r; t++)
      (this.texture[t] = e.texture[t].clone()), (this.texture[t].isRenderTargetTexture = !0);
    return this;
  }
}
class Quaternion {
  constructor(e = 0, t = 0, r = 0, n = 1) {
    (this.isQuaternion = !0), (this._x = e), (this._y = t), (this._z = r), (this._w = n);
  }
  static slerpFlat(e, t, r, n, i, a, s) {
    let o = r[n + 0],
      l = r[n + 1],
      c = r[n + 2],
      h = r[n + 3];
    const u = i[a + 0],
      d = i[a + 1],
      p = i[a + 2],
      m = i[a + 3];
    if (0 === s) return (e[t + 0] = o), (e[t + 1] = l), (e[t + 2] = c), void (e[t + 3] = h);
    if (1 === s) return (e[t + 0] = u), (e[t + 1] = d), (e[t + 2] = p), void (e[t + 3] = m);
    if (h !== m || o !== u || l !== d || c !== p) {
      let e = 1 - s;
      const t = o * u + l * d + c * p + h * m,
        r = t >= 0 ? 1 : -1,
        n = 1 - t * t;
      if (n > Number.EPSILON) {
        const i = Math.sqrt(n),
          a = Math.atan2(i, t * r);
        (e = Math.sin(e * a) / i), (s = Math.sin(s * a) / i);
      }
      const i = s * r;
      if (
        ((o = o * e + u * i),
        (l = l * e + d * i),
        (c = c * e + p * i),
        (h = h * e + m * i),
        e === 1 - s)
      ) {
        const e = 1 / Math.sqrt(o * o + l * l + c * c + h * h);
        (o *= e), (l *= e), (c *= e), (h *= e);
      }
    }
    (e[t] = o), (e[t + 1] = l), (e[t + 2] = c), (e[t + 3] = h);
  }
  static multiplyQuaternionsFlat(e, t, r, n, i, a) {
    const s = r[n],
      o = r[n + 1],
      l = r[n + 2],
      c = r[n + 3],
      h = i[a],
      u = i[a + 1],
      d = i[a + 2],
      p = i[a + 3];
    return (
      (e[t] = s * p + c * h + o * d - l * u),
      (e[t + 1] = o * p + c * u + l * h - s * d),
      (e[t + 2] = l * p + c * d + s * u - o * h),
      (e[t + 3] = c * p - s * h - o * u - l * d),
      e
    );
  }
  get x() {
    return this._x;
  }
  set x(e) {
    (this._x = e), this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    (this._y = e), this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    (this._z = e), this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(e) {
    (this._w = e), this._onChangeCallback();
  }
  set(e, t, r, n) {
    return (
      (this._x = e), (this._y = t), (this._z = r), (this._w = n), this._onChangeCallback(), this
    );
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(e) {
    return (
      (this._x = e.x),
      (this._y = e.y),
      (this._z = e.z),
      (this._w = e.w),
      this._onChangeCallback(),
      this
    );
  }
  setFromEuler(e, t) {
    const r = e._x,
      n = e._y,
      i = e._z,
      a = e._order,
      s = Math.cos,
      o = Math.sin,
      l = s(r / 2),
      c = s(n / 2),
      h = s(i / 2),
      u = o(r / 2),
      d = o(n / 2),
      p = o(i / 2);
    switch (a) {
      case 'XYZ':
        (this._x = u * c * h + l * d * p),
          (this._y = l * d * h - u * c * p),
          (this._z = l * c * p + u * d * h),
          (this._w = l * c * h - u * d * p);
        break;
      case 'YXZ':
        (this._x = u * c * h + l * d * p),
          (this._y = l * d * h - u * c * p),
          (this._z = l * c * p - u * d * h),
          (this._w = l * c * h + u * d * p);
        break;
      case 'ZXY':
        (this._x = u * c * h - l * d * p),
          (this._y = l * d * h + u * c * p),
          (this._z = l * c * p + u * d * h),
          (this._w = l * c * h - u * d * p);
        break;
      case 'ZYX':
        (this._x = u * c * h - l * d * p),
          (this._y = l * d * h + u * c * p),
          (this._z = l * c * p - u * d * h),
          (this._w = l * c * h + u * d * p);
        break;
      case 'YZX':
        (this._x = u * c * h + l * d * p),
          (this._y = l * d * h + u * c * p),
          (this._z = l * c * p - u * d * h),
          (this._w = l * c * h - u * d * p);
        break;
      case 'XZY':
        (this._x = u * c * h - l * d * p),
          (this._y = l * d * h - u * c * p),
          (this._z = l * c * p + u * d * h),
          (this._w = l * c * h + u * d * p);
        break;
      default:
        console.warn('THREE.Quaternion: .setFromEuler() encountered an unknown order: ' + a);
    }
    return !1 !== t && this._onChangeCallback(), this;
  }
  setFromAxisAngle(e, t) {
    const r = t / 2,
      n = Math.sin(r);
    return (
      (this._x = e.x * n),
      (this._y = e.y * n),
      (this._z = e.z * n),
      (this._w = Math.cos(r)),
      this._onChangeCallback(),
      this
    );
  }
  setFromRotationMatrix(e) {
    const t = e.elements,
      r = t[0],
      n = t[4],
      i = t[8],
      a = t[1],
      s = t[5],
      o = t[9],
      l = t[2],
      c = t[6],
      h = t[10],
      u = r + s + h;
    if (u > 0) {
      const e = 0.5 / Math.sqrt(u + 1);
      (this._w = 0.25 / e),
        (this._x = (c - o) * e),
        (this._y = (i - l) * e),
        (this._z = (a - n) * e);
    } else if (r > s && r > h) {
      const e = 2 * Math.sqrt(1 + r - s - h);
      (this._w = (c - o) / e),
        (this._x = 0.25 * e),
        (this._y = (n + a) / e),
        (this._z = (i + l) / e);
    } else if (s > h) {
      const e = 2 * Math.sqrt(1 + s - r - h);
      (this._w = (i - l) / e),
        (this._x = (n + a) / e),
        (this._y = 0.25 * e),
        (this._z = (o + c) / e);
    } else {
      const e = 2 * Math.sqrt(1 + h - r - s);
      (this._w = (a - n) / e),
        (this._x = (i + l) / e),
        (this._y = (o + c) / e),
        (this._z = 0.25 * e);
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(e, t) {
    let r = e.dot(t) + 1;
    return (
      r < Number.EPSILON
        ? ((r = 0),
          Math.abs(e.x) > Math.abs(e.z)
            ? ((this._x = -e.y), (this._y = e.x), (this._z = 0), (this._w = r))
            : ((this._x = 0), (this._y = -e.z), (this._z = e.y), (this._w = r)))
        : ((this._x = e.y * t.z - e.z * t.y),
          (this._y = e.z * t.x - e.x * t.z),
          (this._z = e.x * t.y - e.y * t.x),
          (this._w = r)),
      this.normalize()
    );
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(clamp(this.dot(e), -1, 1)));
  }
  rotateTowards(e, t) {
    const r = this.angleTo(e);
    if (0 === r) return this;
    const n = Math.min(1, t / r);
    return this.slerp(e, n), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return (this._x *= -1), (this._y *= -1), (this._z *= -1), this._onChangeCallback(), this;
  }
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let e = this.length();
    return (
      0 === e
        ? ((this._x = 0), (this._y = 0), (this._z = 0), (this._w = 1))
        : ((e = 1 / e),
          (this._x = this._x * e),
          (this._y = this._y * e),
          (this._z = this._z * e),
          (this._w = this._w * e)),
      this._onChangeCallback(),
      this
    );
  }
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  multiplyQuaternions(e, t) {
    const r = e._x,
      n = e._y,
      i = e._z,
      a = e._w,
      s = t._x,
      o = t._y,
      l = t._z,
      c = t._w;
    return (
      (this._x = r * c + a * s + n * l - i * o),
      (this._y = n * c + a * o + i * s - r * l),
      (this._z = i * c + a * l + r * o - n * s),
      (this._w = a * c - r * s - n * o - i * l),
      this._onChangeCallback(),
      this
    );
  }
  slerp(e, t) {
    if (0 === t) return this;
    if (1 === t) return this.copy(e);
    const r = this._x,
      n = this._y,
      i = this._z,
      a = this._w;
    let s = a * e._w + r * e._x + n * e._y + i * e._z;
    if (
      (s < 0
        ? ((this._w = -e._w), (this._x = -e._x), (this._y = -e._y), (this._z = -e._z), (s = -s))
        : this.copy(e),
      s >= 1)
    )
      return (this._w = a), (this._x = r), (this._y = n), (this._z = i), this;
    const o = 1 - s * s;
    if (o <= Number.EPSILON) {
      const e = 1 - t;
      return (
        (this._w = e * a + t * this._w),
        (this._x = e * r + t * this._x),
        (this._y = e * n + t * this._y),
        (this._z = e * i + t * this._z),
        this.normalize(),
        this._onChangeCallback(),
        this
      );
    }
    const l = Math.sqrt(o),
      c = Math.atan2(l, s),
      h = Math.sin((1 - t) * c) / l,
      u = Math.sin(t * c) / l;
    return (
      (this._w = a * h + this._w * u),
      (this._x = r * h + this._x * u),
      (this._y = n * h + this._y * u),
      (this._z = i * h + this._z * u),
      this._onChangeCallback(),
      this
    );
  }
  slerpQuaternions(e, t, r) {
    return this.copy(e).slerp(t, r);
  }
  random() {
    const e = Math.random(),
      t = Math.sqrt(1 - e),
      r = Math.sqrt(e),
      n = 2 * Math.PI * Math.random(),
      i = 2 * Math.PI * Math.random();
    return this.set(t * Math.cos(n), r * Math.sin(i), r * Math.cos(i), t * Math.sin(n));
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  fromArray(e, t = 0) {
    return (
      (this._x = e[t]),
      (this._y = e[t + 1]),
      (this._z = e[t + 2]),
      (this._w = e[t + 3]),
      this._onChangeCallback(),
      this
    );
  }
  toArray(e = [], t = 0) {
    return (e[t] = this._x), (e[t + 1] = this._y), (e[t + 2] = this._z), (e[t + 3] = this._w), e;
  }
  fromBufferAttribute(e, t) {
    return (
      (this._x = e.getX(t)),
      (this._y = e.getY(t)),
      (this._z = e.getZ(t)),
      (this._w = e.getW(t)),
      this
    );
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return (this._onChangeCallback = e), this;
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class Vector3 {
  constructor(e = 0, t = 0, r = 0) {
    (Vector3.prototype.isVector3 = !0), (this.x = e), (this.y = t), (this.z = r);
  }
  set(e, t, r) {
    return void 0 === r && (r = this.z), (this.x = e), (this.y = t), (this.z = r), this;
  }
  setScalar(e) {
    return (this.x = e), (this.y = e), (this.z = e), this;
  }
  setX(e) {
    return (this.x = e), this;
  }
  setY(e) {
    return (this.y = e), this;
  }
  setZ(e) {
    return (this.z = e), this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      default:
        throw new Error('index is out of range: ' + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error('index is out of range: ' + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(e) {
    return (this.x = e.x), (this.y = e.y), (this.z = e.z), this;
  }
  add(e) {
    return (this.x += e.x), (this.y += e.y), (this.z += e.z), this;
  }
  addScalar(e) {
    return (this.x += e), (this.y += e), (this.z += e), this;
  }
  addVectors(e, t) {
    return (this.x = e.x + t.x), (this.y = e.y + t.y), (this.z = e.z + t.z), this;
  }
  addScaledVector(e, t) {
    return (this.x += e.x * t), (this.y += e.y * t), (this.z += e.z * t), this;
  }
  sub(e) {
    return (this.x -= e.x), (this.y -= e.y), (this.z -= e.z), this;
  }
  subScalar(e) {
    return (this.x -= e), (this.y -= e), (this.z -= e), this;
  }
  subVectors(e, t) {
    return (this.x = e.x - t.x), (this.y = e.y - t.y), (this.z = e.z - t.z), this;
  }
  multiply(e) {
    return (this.x *= e.x), (this.y *= e.y), (this.z *= e.z), this;
  }
  multiplyScalar(e) {
    return (this.x *= e), (this.y *= e), (this.z *= e), this;
  }
  multiplyVectors(e, t) {
    return (this.x = e.x * t.x), (this.y = e.y * t.y), (this.z = e.z * t.z), this;
  }
  applyEuler(e) {
    return this.applyQuaternion(_quaternion$4.setFromEuler(e));
  }
  applyAxisAngle(e, t) {
    return this.applyQuaternion(_quaternion$4.setFromAxisAngle(e, t));
  }
  applyMatrix3(e) {
    const t = this.x,
      r = this.y,
      n = this.z,
      i = e.elements;
    return (
      (this.x = i[0] * t + i[3] * r + i[6] * n),
      (this.y = i[1] * t + i[4] * r + i[7] * n),
      (this.z = i[2] * t + i[5] * r + i[8] * n),
      this
    );
  }
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  applyMatrix4(e) {
    const t = this.x,
      r = this.y,
      n = this.z,
      i = e.elements,
      a = 1 / (i[3] * t + i[7] * r + i[11] * n + i[15]);
    return (
      (this.x = (i[0] * t + i[4] * r + i[8] * n + i[12]) * a),
      (this.y = (i[1] * t + i[5] * r + i[9] * n + i[13]) * a),
      (this.z = (i[2] * t + i[6] * r + i[10] * n + i[14]) * a),
      this
    );
  }
  applyQuaternion(e) {
    const t = this.x,
      r = this.y,
      n = this.z,
      i = e.x,
      a = e.y,
      s = e.z,
      o = e.w,
      l = o * t + a * n - s * r,
      c = o * r + s * t - i * n,
      h = o * n + i * r - a * t,
      u = -i * t - a * r - s * n;
    return (
      (this.x = l * o + u * -i + c * -s - h * -a),
      (this.y = c * o + u * -a + h * -i - l * -s),
      (this.z = h * o + u * -s + l * -a - c * -i),
      this
    );
  }
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
  }
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
  }
  transformDirection(e) {
    const t = this.x,
      r = this.y,
      n = this.z,
      i = e.elements;
    return (
      (this.x = i[0] * t + i[4] * r + i[8] * n),
      (this.y = i[1] * t + i[5] * r + i[9] * n),
      (this.z = i[2] * t + i[6] * r + i[10] * n),
      this.normalize()
    );
  }
  divide(e) {
    return (this.x /= e.x), (this.y /= e.y), (this.z /= e.z), this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  min(e) {
    return (
      (this.x = Math.min(this.x, e.x)),
      (this.y = Math.min(this.y, e.y)),
      (this.z = Math.min(this.z, e.z)),
      this
    );
  }
  max(e) {
    return (
      (this.x = Math.max(this.x, e.x)),
      (this.y = Math.max(this.y, e.y)),
      (this.z = Math.max(this.z, e.z)),
      this
    );
  }
  clamp(e, t) {
    return (
      (this.x = Math.max(e.x, Math.min(t.x, this.x))),
      (this.y = Math.max(e.y, Math.min(t.y, this.y))),
      (this.z = Math.max(e.z, Math.min(t.z, this.z))),
      this
    );
  }
  clampScalar(e, t) {
    return (
      (this.x = Math.max(e, Math.min(t, this.x))),
      (this.y = Math.max(e, Math.min(t, this.y))),
      (this.z = Math.max(e, Math.min(t, this.z))),
      this
    );
  }
  clampLength(e, t) {
    const r = this.length();
    return this.divideScalar(r || 1).multiplyScalar(Math.max(e, Math.min(t, r)));
  }
  floor() {
    return (
      (this.x = Math.floor(this.x)),
      (this.y = Math.floor(this.y)),
      (this.z = Math.floor(this.z)),
      this
    );
  }
  ceil() {
    return (
      (this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), (this.z = Math.ceil(this.z)), this
    );
  }
  round() {
    return (
      (this.x = Math.round(this.x)),
      (this.y = Math.round(this.y)),
      (this.z = Math.round(this.z)),
      this
    );
  }
  roundToZero() {
    return (
      (this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x)),
      (this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y)),
      (this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z)),
      this
    );
  }
  negate() {
    return (this.x = -this.x), (this.y = -this.y), (this.z = -this.z), this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return (
      (this.x += (e.x - this.x) * t),
      (this.y += (e.y - this.y) * t),
      (this.z += (e.z - this.z) * t),
      this
    );
  }
  lerpVectors(e, t, r) {
    return (
      (this.x = e.x + (t.x - e.x) * r),
      (this.y = e.y + (t.y - e.y) * r),
      (this.z = e.z + (t.z - e.z) * r),
      this
    );
  }
  cross(e) {
    return this.crossVectors(this, e);
  }
  crossVectors(e, t) {
    const r = e.x,
      n = e.y,
      i = e.z,
      a = t.x,
      s = t.y,
      o = t.z;
    return (this.x = n * o - i * s), (this.y = i * a - r * o), (this.z = r * s - n * a), this;
  }
  projectOnVector(e) {
    const t = e.lengthSq();
    if (0 === t) return this.set(0, 0, 0);
    const r = e.dot(this) / t;
    return this.copy(e).multiplyScalar(r);
  }
  projectOnPlane(e) {
    return _vector$b.copy(this).projectOnVector(e), this.sub(_vector$b);
  }
  reflect(e) {
    return this.sub(_vector$b.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (0 === t) return Math.PI / 2;
    const r = this.dot(e) / t;
    return Math.acos(clamp(r, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x,
      r = this.y - e.y,
      n = this.z - e.z;
    return t * t + r * r + n * n;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
  }
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  setFromSphericalCoords(e, t, r) {
    const n = Math.sin(t) * e;
    return (this.x = n * Math.sin(r)), (this.y = Math.cos(t) * e), (this.z = n * Math.cos(r)), this;
  }
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  setFromCylindricalCoords(e, t, r) {
    return (this.x = e * Math.sin(t)), (this.y = r), (this.z = e * Math.cos(t)), this;
  }
  setFromMatrixPosition(e) {
    const t = e.elements;
    return (this.x = t[12]), (this.y = t[13]), (this.z = t[14]), this;
  }
  setFromMatrixScale(e) {
    const t = this.setFromMatrixColumn(e, 0).length(),
      r = this.setFromMatrixColumn(e, 1).length(),
      n = this.setFromMatrixColumn(e, 2).length();
    return (this.x = t), (this.y = r), (this.z = n), this;
  }
  setFromMatrixColumn(e, t) {
    return this.fromArray(e.elements, 4 * t);
  }
  setFromMatrix3Column(e, t) {
    return this.fromArray(e.elements, 3 * t);
  }
  setFromEuler(e) {
    return (this.x = e._x), (this.y = e._y), (this.z = e._z), this;
  }
  setFromColor(e) {
    return (this.x = e.r), (this.y = e.g), (this.z = e.b), this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  fromArray(e, t = 0) {
    return (this.x = e[t]), (this.y = e[t + 1]), (this.z = e[t + 2]), this;
  }
  toArray(e = [], t = 0) {
    return (e[t] = this.x), (e[t + 1] = this.y), (e[t + 2] = this.z), e;
  }
  fromBufferAttribute(e, t) {
    return (this.x = e.getX(t)), (this.y = e.getY(t)), (this.z = e.getZ(t)), this;
  }
  random() {
    return (this.x = Math.random()), (this.y = Math.random()), (this.z = Math.random()), this;
  }
  randomDirection() {
    const e = 2 * (Math.random() - 0.5),
      t = Math.random() * Math.PI * 2,
      r = Math.sqrt(1 - e ** 2);
    return (this.x = r * Math.cos(t)), (this.y = r * Math.sin(t)), (this.z = e), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const _vector$b = new Vector3(),
  _quaternion$4 = new Quaternion();
class Box3 {
  constructor(e = new Vector3(1 / 0, 1 / 0, 1 / 0), t = new Vector3(-1 / 0, -1 / 0, -1 / 0)) {
    (this.isBox3 = !0), (this.min = e), (this.max = t);
  }
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, r = e.length; t < r; t += 3) this.expandByPoint(_vector$a.fromArray(e, t));
    return this;
  }
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, r = e.count; t < r; t++)
      this.expandByPoint(_vector$a.fromBufferAttribute(e, t));
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, r = e.length; t < r; t++) this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    const r = _vector$a.copy(t).multiplyScalar(0.5);
    return this.min.copy(e).sub(r), this.max.copy(e).add(r), this;
  }
  setFromObject(e, t = !1) {
    return this.makeEmpty(), this.expandByObject(e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  makeEmpty() {
    return (
      (this.min.x = this.min.y = this.min.z = 1 / 0),
      (this.max.x = this.max.y = this.max.z = -1 / 0),
      this
    );
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  expandByObject(e, t = !1) {
    if ((e.updateWorldMatrix(!1, !1), void 0 !== e.boundingBox))
      null === e.boundingBox && e.computeBoundingBox(),
        _box$3.copy(e.boundingBox),
        _box$3.applyMatrix4(e.matrixWorld),
        this.union(_box$3);
    else {
      const r = e.geometry;
      if (void 0 !== r)
        if (t && void 0 !== r.attributes && void 0 !== r.attributes.position) {
          const t = r.attributes.position;
          for (let r = 0, n = t.count; r < n; r++)
            _vector$a.fromBufferAttribute(t, r).applyMatrix4(e.matrixWorld),
              this.expandByPoint(_vector$a);
        } else
          null === r.boundingBox && r.computeBoundingBox(),
            _box$3.copy(r.boundingBox),
            _box$3.applyMatrix4(e.matrixWorld),
            this.union(_box$3);
    }
    const r = e.children;
    for (let e = 0, n = r.length; e < n; e++) this.expandByObject(r[e], t);
    return this;
  }
  containsPoint(e) {
    return !(
      e.x < this.min.x ||
      e.x > this.max.x ||
      e.y < this.min.y ||
      e.y > this.max.y ||
      e.z < this.min.z ||
      e.z > this.max.z
    );
  }
  containsBox(e) {
    return (
      this.min.x <= e.min.x &&
      e.max.x <= this.max.x &&
      this.min.y <= e.min.y &&
      e.max.y <= this.max.y &&
      this.min.z <= e.min.z &&
      e.max.z <= this.max.z
    );
  }
  getParameter(e, t) {
    return t.set(
      (e.x - this.min.x) / (this.max.x - this.min.x),
      (e.y - this.min.y) / (this.max.y - this.min.y),
      (e.z - this.min.z) / (this.max.z - this.min.z),
    );
  }
  intersectsBox(e) {
    return !(
      e.max.x < this.min.x ||
      e.min.x > this.max.x ||
      e.max.y < this.min.y ||
      e.min.y > this.max.y ||
      e.max.z < this.min.z ||
      e.min.z > this.max.z
    );
  }
  intersectsSphere(e) {
    return (
      this.clampPoint(e.center, _vector$a),
      _vector$a.distanceToSquared(e.center) <= e.radius * e.radius
    );
  }
  intersectsPlane(e) {
    let t, r;
    return (
      e.normal.x > 0
        ? ((t = e.normal.x * this.min.x), (r = e.normal.x * this.max.x))
        : ((t = e.normal.x * this.max.x), (r = e.normal.x * this.min.x)),
      e.normal.y > 0
        ? ((t += e.normal.y * this.min.y), (r += e.normal.y * this.max.y))
        : ((t += e.normal.y * this.max.y), (r += e.normal.y * this.min.y)),
      e.normal.z > 0
        ? ((t += e.normal.z * this.min.z), (r += e.normal.z * this.max.z))
        : ((t += e.normal.z * this.max.z), (r += e.normal.z * this.min.z)),
      t <= -e.constant && r >= -e.constant
    );
  }
  intersectsTriangle(e) {
    if (this.isEmpty()) return !1;
    this.getCenter(_center),
      _extents.subVectors(this.max, _center),
      _v0$2.subVectors(e.a, _center),
      _v1$7.subVectors(e.b, _center),
      _v2$4.subVectors(e.c, _center),
      _f0.subVectors(_v1$7, _v0$2),
      _f1.subVectors(_v2$4, _v1$7),
      _f2.subVectors(_v0$2, _v2$4);
    let t = [
      0,
      -_f0.z,
      _f0.y,
      0,
      -_f1.z,
      _f1.y,
      0,
      -_f2.z,
      _f2.y,
      _f0.z,
      0,
      -_f0.x,
      _f1.z,
      0,
      -_f1.x,
      _f2.z,
      0,
      -_f2.x,
      -_f0.y,
      _f0.x,
      0,
      -_f1.y,
      _f1.x,
      0,
      -_f2.y,
      _f2.x,
      0,
    ];
    return (
      !!satForAxes(t, _v0$2, _v1$7, _v2$4, _extents) &&
      ((t = [1, 0, 0, 0, 1, 0, 0, 0, 1]),
      !!satForAxes(t, _v0$2, _v1$7, _v2$4, _extents) &&
        (_triangleNormal.crossVectors(_f0, _f1),
        (t = [_triangleNormal.x, _triangleNormal.y, _triangleNormal.z]),
        satForAxes(t, _v0$2, _v1$7, _v2$4, _extents)))
    );
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, _vector$a).distanceTo(e);
  }
  getBoundingSphere(e) {
    return (
      this.isEmpty()
        ? e.makeEmpty()
        : (this.getCenter(e.center), (e.radius = 0.5 * this.getSize(_vector$a).length())),
      e
    );
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  applyMatrix4(e) {
    return (
      this.isEmpty() ||
        (_points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e),
        _points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e),
        _points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e),
        _points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e),
        _points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e),
        _points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e),
        _points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e),
        _points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e),
        this.setFromPoints(_points)),
      this
    );
  }
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
}
const _points = [
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
  ],
  _vector$a = new Vector3(),
  _box$3 = new Box3(),
  _v0$2 = new Vector3(),
  _v1$7 = new Vector3(),
  _v2$4 = new Vector3(),
  _f0 = new Vector3(),
  _f1 = new Vector3(),
  _f2 = new Vector3(),
  _center = new Vector3(),
  _extents = new Vector3(),
  _triangleNormal = new Vector3(),
  _testAxis = new Vector3();
function satForAxes(e, t, r, n, i) {
  for (let a = 0, s = e.length - 3; a <= s; a += 3) {
    _testAxis.fromArray(e, a);
    const s =
        i.x * Math.abs(_testAxis.x) + i.y * Math.abs(_testAxis.y) + i.z * Math.abs(_testAxis.z),
      o = t.dot(_testAxis),
      l = r.dot(_testAxis),
      c = n.dot(_testAxis);
    if (Math.max(-Math.max(o, l, c), Math.min(o, l, c)) > s) return !1;
  }
  return !0;
}
const _box$2 = new Box3(),
  _v1$6 = new Vector3(),
  _v2$3 = new Vector3();
class Sphere {
  constructor(e = new Vector3(), t = -1) {
    (this.center = e), (this.radius = t);
  }
  set(e, t) {
    return this.center.copy(e), (this.radius = t), this;
  }
  setFromPoints(e, t) {
    const r = this.center;
    void 0 !== t ? r.copy(t) : _box$2.setFromPoints(e).getCenter(r);
    let n = 0;
    for (let t = 0, i = e.length; t < i; t++) n = Math.max(n, r.distanceToSquared(e[t]));
    return (this.radius = Math.sqrt(n)), this;
  }
  copy(e) {
    return this.center.copy(e.center), (this.radius = e.radius), this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), (this.radius = -1), this;
  }
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(e) {
    const t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t;
  }
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(e, t) {
    const r = this.center.distanceToSquared(e);
    return (
      t.copy(e),
      r > this.radius * this.radius &&
        (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)),
      t
    );
  }
  getBoundingBox(e) {
    return this.isEmpty()
      ? (e.makeEmpty(), e)
      : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  applyMatrix4(e) {
    return this.center.applyMatrix4(e), (this.radius = this.radius * e.getMaxScaleOnAxis()), this;
  }
  translate(e) {
    return this.center.add(e), this;
  }
  expandByPoint(e) {
    if (this.isEmpty()) return this.center.copy(e), (this.radius = 0), this;
    _v1$6.subVectors(e, this.center);
    const t = _v1$6.lengthSq();
    if (t > this.radius * this.radius) {
      const e = Math.sqrt(t),
        r = 0.5 * (e - this.radius);
      this.center.addScaledVector(_v1$6, r / e), (this.radius += r);
    }
    return this;
  }
  union(e) {
    return e.isEmpty()
      ? this
      : this.isEmpty()
        ? (this.copy(e), this)
        : (!0 === this.center.equals(e.center)
            ? (this.radius = Math.max(this.radius, e.radius))
            : (_v2$3.subVectors(e.center, this.center).setLength(e.radius),
              this.expandByPoint(_v1$6.copy(e.center).add(_v2$3)),
              this.expandByPoint(_v1$6.copy(e.center).sub(_v2$3))),
          this);
  }
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const _vector$9 = new Vector3(),
  _segCenter = new Vector3(),
  _segDir = new Vector3(),
  _diff = new Vector3(),
  _edge1 = new Vector3(),
  _edge2 = new Vector3(),
  _normal$1 = new Vector3();
class Ray {
  constructor(e = new Vector3(), t = new Vector3(0, 0, -1)) {
    (this.origin = e), (this.direction = t);
  }
  set(e, t) {
    return this.origin.copy(e), this.direction.copy(t), this;
  }
  copy(e) {
    return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
  }
  at(e, t) {
    return t.copy(this.origin).addScaledVector(this.direction, e);
  }
  lookAt(e) {
    return this.direction.copy(e).sub(this.origin).normalize(), this;
  }
  recast(e) {
    return this.origin.copy(this.at(e, _vector$9)), this;
  }
  closestPointToPoint(e, t) {
    t.subVectors(e, this.origin);
    const r = t.dot(this.direction);
    return r < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, r);
  }
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  distanceSqToPoint(e) {
    const t = _vector$9.subVectors(e, this.origin).dot(this.direction);
    return t < 0
      ? this.origin.distanceToSquared(e)
      : (_vector$9.copy(this.origin).addScaledVector(this.direction, t),
        _vector$9.distanceToSquared(e));
  }
  distanceSqToSegment(e, t, r, n) {
    _segCenter.copy(e).add(t).multiplyScalar(0.5),
      _segDir.copy(t).sub(e).normalize(),
      _diff.copy(this.origin).sub(_segCenter);
    const i = 0.5 * e.distanceTo(t),
      a = -this.direction.dot(_segDir),
      s = _diff.dot(this.direction),
      o = -_diff.dot(_segDir),
      l = _diff.lengthSq(),
      c = Math.abs(1 - a * a);
    let h, u, d, p;
    if (c > 0)
      if (((h = a * o - s), (u = a * s - o), (p = i * c), h >= 0))
        if (u >= -p)
          if (u <= p) {
            const e = 1 / c;
            (h *= e), (u *= e), (d = h * (h + a * u + 2 * s) + u * (a * h + u + 2 * o) + l);
          } else (u = i), (h = Math.max(0, -(a * u + s))), (d = -h * h + u * (u + 2 * o) + l);
        else (u = -i), (h = Math.max(0, -(a * u + s))), (d = -h * h + u * (u + 2 * o) + l);
      else
        u <= -p
          ? ((h = Math.max(0, -(-a * i + s))),
            (u = h > 0 ? -i : Math.min(Math.max(-i, -o), i)),
            (d = -h * h + u * (u + 2 * o) + l))
          : u <= p
            ? ((h = 0), (u = Math.min(Math.max(-i, -o), i)), (d = u * (u + 2 * o) + l))
            : ((h = Math.max(0, -(a * i + s))),
              (u = h > 0 ? i : Math.min(Math.max(-i, -o), i)),
              (d = -h * h + u * (u + 2 * o) + l));
    else (u = a > 0 ? -i : i), (h = Math.max(0, -(a * u + s))), (d = -h * h + u * (u + 2 * o) + l);
    return (
      r && r.copy(this.origin).addScaledVector(this.direction, h),
      n && n.copy(_segCenter).addScaledVector(_segDir, u),
      d
    );
  }
  intersectSphere(e, t) {
    _vector$9.subVectors(e.center, this.origin);
    const r = _vector$9.dot(this.direction),
      n = _vector$9.dot(_vector$9) - r * r,
      i = e.radius * e.radius;
    if (n > i) return null;
    const a = Math.sqrt(i - n),
      s = r - a,
      o = r + a;
    return o < 0 ? null : s < 0 ? this.at(o, t) : this.at(s, t);
  }
  intersectsSphere(e) {
    return this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  distanceToPlane(e) {
    const t = e.normal.dot(this.direction);
    if (0 === t) return 0 === e.distanceToPoint(this.origin) ? 0 : null;
    const r = -(this.origin.dot(e.normal) + e.constant) / t;
    return r >= 0 ? r : null;
  }
  intersectPlane(e, t) {
    const r = this.distanceToPlane(e);
    return null === r ? null : this.at(r, t);
  }
  intersectsPlane(e) {
    const t = e.distanceToPoint(this.origin);
    if (0 === t) return !0;
    return e.normal.dot(this.direction) * t < 0;
  }
  intersectBox(e, t) {
    let r, n, i, a, s, o;
    const l = 1 / this.direction.x,
      c = 1 / this.direction.y,
      h = 1 / this.direction.z,
      u = this.origin;
    return (
      l >= 0
        ? ((r = (e.min.x - u.x) * l), (n = (e.max.x - u.x) * l))
        : ((r = (e.max.x - u.x) * l), (n = (e.min.x - u.x) * l)),
      c >= 0
        ? ((i = (e.min.y - u.y) * c), (a = (e.max.y - u.y) * c))
        : ((i = (e.max.y - u.y) * c), (a = (e.min.y - u.y) * c)),
      r > a || i > n
        ? null
        : ((i > r || isNaN(r)) && (r = i),
          (a < n || isNaN(n)) && (n = a),
          h >= 0
            ? ((s = (e.min.z - u.z) * h), (o = (e.max.z - u.z) * h))
            : ((s = (e.max.z - u.z) * h), (o = (e.min.z - u.z) * h)),
          r > o || s > n
            ? null
            : ((s > r || r != r) && (r = s),
              (o < n || n != n) && (n = o),
              n < 0 ? null : this.at(r >= 0 ? r : n, t)))
    );
  }
  intersectsBox(e) {
    return null !== this.intersectBox(e, _vector$9);
  }
  intersectTriangle(e, t, r, n, i) {
    _edge1.subVectors(t, e), _edge2.subVectors(r, e), _normal$1.crossVectors(_edge1, _edge2);
    let a,
      s = this.direction.dot(_normal$1);
    if (s > 0) {
      if (n) return null;
      a = 1;
    } else {
      if (!(s < 0)) return null;
      (a = -1), (s = -s);
    }
    _diff.subVectors(this.origin, e);
    const o = a * this.direction.dot(_edge2.crossVectors(_diff, _edge2));
    if (o < 0) return null;
    const l = a * this.direction.dot(_edge1.cross(_diff));
    if (l < 0) return null;
    if (o + l > s) return null;
    const c = -a * _diff.dot(_normal$1);
    return c < 0 ? null : this.at(c / s, i);
  }
  applyMatrix4(e) {
    return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
  }
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Matrix4 {
  constructor() {
    (Matrix4.prototype.isMatrix4 = !0),
      (this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }
  set(e, t, r, n, i, a, s, o, l, c, h, u, d, p, m, f) {
    const g = this.elements;
    return (
      (g[0] = e),
      (g[4] = t),
      (g[8] = r),
      (g[12] = n),
      (g[1] = i),
      (g[5] = a),
      (g[9] = s),
      (g[13] = o),
      (g[2] = l),
      (g[6] = c),
      (g[10] = h),
      (g[14] = u),
      (g[3] = d),
      (g[7] = p),
      (g[11] = m),
      (g[15] = f),
      this
    );
  }
  identity() {
    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  clone() {
    return new Matrix4().fromArray(this.elements);
  }
  copy(e) {
    const t = this.elements,
      r = e.elements;
    return (
      (t[0] = r[0]),
      (t[1] = r[1]),
      (t[2] = r[2]),
      (t[3] = r[3]),
      (t[4] = r[4]),
      (t[5] = r[5]),
      (t[6] = r[6]),
      (t[7] = r[7]),
      (t[8] = r[8]),
      (t[9] = r[9]),
      (t[10] = r[10]),
      (t[11] = r[11]),
      (t[12] = r[12]),
      (t[13] = r[13]),
      (t[14] = r[14]),
      (t[15] = r[15]),
      this
    );
  }
  copyPosition(e) {
    const t = this.elements,
      r = e.elements;
    return (t[12] = r[12]), (t[13] = r[13]), (t[14] = r[14]), this;
  }
  setFromMatrix3(e) {
    const t = e.elements;
    return (
      this.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1), this
    );
  }
  extractBasis(e, t, r) {
    return (
      e.setFromMatrixColumn(this, 0),
      t.setFromMatrixColumn(this, 1),
      r.setFromMatrixColumn(this, 2),
      this
    );
  }
  makeBasis(e, t, r) {
    return this.set(e.x, t.x, r.x, 0, e.y, t.y, r.y, 0, e.z, t.z, r.z, 0, 0, 0, 0, 1), this;
  }
  extractRotation(e) {
    const t = this.elements,
      r = e.elements,
      n = 1 / _v1$5.setFromMatrixColumn(e, 0).length(),
      i = 1 / _v1$5.setFromMatrixColumn(e, 1).length(),
      a = 1 / _v1$5.setFromMatrixColumn(e, 2).length();
    return (
      (t[0] = r[0] * n),
      (t[1] = r[1] * n),
      (t[2] = r[2] * n),
      (t[3] = 0),
      (t[4] = r[4] * i),
      (t[5] = r[5] * i),
      (t[6] = r[6] * i),
      (t[7] = 0),
      (t[8] = r[8] * a),
      (t[9] = r[9] * a),
      (t[10] = r[10] * a),
      (t[11] = 0),
      (t[12] = 0),
      (t[13] = 0),
      (t[14] = 0),
      (t[15] = 1),
      this
    );
  }
  makeRotationFromEuler(e) {
    const t = this.elements,
      r = e.x,
      n = e.y,
      i = e.z,
      a = Math.cos(r),
      s = Math.sin(r),
      o = Math.cos(n),
      l = Math.sin(n),
      c = Math.cos(i),
      h = Math.sin(i);
    if ('XYZ' === e.order) {
      const e = a * c,
        r = a * h,
        n = s * c,
        i = s * h;
      (t[0] = o * c),
        (t[4] = -o * h),
        (t[8] = l),
        (t[1] = r + n * l),
        (t[5] = e - i * l),
        (t[9] = -s * o),
        (t[2] = i - e * l),
        (t[6] = n + r * l),
        (t[10] = a * o);
    } else if ('YXZ' === e.order) {
      const e = o * c,
        r = o * h,
        n = l * c,
        i = l * h;
      (t[0] = e + i * s),
        (t[4] = n * s - r),
        (t[8] = a * l),
        (t[1] = a * h),
        (t[5] = a * c),
        (t[9] = -s),
        (t[2] = r * s - n),
        (t[6] = i + e * s),
        (t[10] = a * o);
    } else if ('ZXY' === e.order) {
      const e = o * c,
        r = o * h,
        n = l * c,
        i = l * h;
      (t[0] = e - i * s),
        (t[4] = -a * h),
        (t[8] = n + r * s),
        (t[1] = r + n * s),
        (t[5] = a * c),
        (t[9] = i - e * s),
        (t[2] = -a * l),
        (t[6] = s),
        (t[10] = a * o);
    } else if ('ZYX' === e.order) {
      const e = a * c,
        r = a * h,
        n = s * c,
        i = s * h;
      (t[0] = o * c),
        (t[4] = n * l - r),
        (t[8] = e * l + i),
        (t[1] = o * h),
        (t[5] = i * l + e),
        (t[9] = r * l - n),
        (t[2] = -l),
        (t[6] = s * o),
        (t[10] = a * o);
    } else if ('YZX' === e.order) {
      const e = a * o,
        r = a * l,
        n = s * o,
        i = s * l;
      (t[0] = o * c),
        (t[4] = i - e * h),
        (t[8] = n * h + r),
        (t[1] = h),
        (t[5] = a * c),
        (t[9] = -s * c),
        (t[2] = -l * c),
        (t[6] = r * h + n),
        (t[10] = e - i * h);
    } else if ('XZY' === e.order) {
      const e = a * o,
        r = a * l,
        n = s * o,
        i = s * l;
      (t[0] = o * c),
        (t[4] = -h),
        (t[8] = l * c),
        (t[1] = e * h + i),
        (t[5] = a * c),
        (t[9] = r * h - n),
        (t[2] = n * h - r),
        (t[6] = s * c),
        (t[10] = i * h + e);
    }
    return (
      (t[3] = 0), (t[7] = 0), (t[11] = 0), (t[12] = 0), (t[13] = 0), (t[14] = 0), (t[15] = 1), this
    );
  }
  makeRotationFromQuaternion(e) {
    return this.compose(_zero, e, _one);
  }
  lookAt(e, t, r) {
    const n = this.elements;
    return (
      _z.subVectors(e, t),
      0 === _z.lengthSq() && (_z.z = 1),
      _z.normalize(),
      _x.crossVectors(r, _z),
      0 === _x.lengthSq() &&
        (1 === Math.abs(r.z) ? (_z.x += 1e-4) : (_z.z += 1e-4),
        _z.normalize(),
        _x.crossVectors(r, _z)),
      _x.normalize(),
      _y.crossVectors(_z, _x),
      (n[0] = _x.x),
      (n[4] = _y.x),
      (n[8] = _z.x),
      (n[1] = _x.y),
      (n[5] = _y.y),
      (n[9] = _z.y),
      (n[2] = _x.z),
      (n[6] = _y.z),
      (n[10] = _z.z),
      this
    );
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const r = e.elements,
      n = t.elements,
      i = this.elements,
      a = r[0],
      s = r[4],
      o = r[8],
      l = r[12],
      c = r[1],
      h = r[5],
      u = r[9],
      d = r[13],
      p = r[2],
      m = r[6],
      f = r[10],
      g = r[14],
      _ = r[3],
      v = r[7],
      x = r[11],
      y = r[15],
      M = n[0],
      S = n[4],
      b = n[8],
      T = n[12],
      E = n[1],
      A = n[5],
      w = n[9],
      C = n[13],
      R = n[2],
      L = n[6],
      P = n[10],
      I = n[14],
      U = n[3],
      D = n[7],
      B = n[11],
      N = n[15];
    return (
      (i[0] = a * M + s * E + o * R + l * U),
      (i[4] = a * S + s * A + o * L + l * D),
      (i[8] = a * b + s * w + o * P + l * B),
      (i[12] = a * T + s * C + o * I + l * N),
      (i[1] = c * M + h * E + u * R + d * U),
      (i[5] = c * S + h * A + u * L + d * D),
      (i[9] = c * b + h * w + u * P + d * B),
      (i[13] = c * T + h * C + u * I + d * N),
      (i[2] = p * M + m * E + f * R + g * U),
      (i[6] = p * S + m * A + f * L + g * D),
      (i[10] = p * b + m * w + f * P + g * B),
      (i[14] = p * T + m * C + f * I + g * N),
      (i[3] = _ * M + v * E + x * R + y * U),
      (i[7] = _ * S + v * A + x * L + y * D),
      (i[11] = _ * b + v * w + x * P + y * B),
      (i[15] = _ * T + v * C + x * I + y * N),
      this
    );
  }
  multiplyScalar(e) {
    const t = this.elements;
    return (
      (t[0] *= e),
      (t[4] *= e),
      (t[8] *= e),
      (t[12] *= e),
      (t[1] *= e),
      (t[5] *= e),
      (t[9] *= e),
      (t[13] *= e),
      (t[2] *= e),
      (t[6] *= e),
      (t[10] *= e),
      (t[14] *= e),
      (t[3] *= e),
      (t[7] *= e),
      (t[11] *= e),
      (t[15] *= e),
      this
    );
  }
  determinant() {
    const e = this.elements,
      t = e[0],
      r = e[4],
      n = e[8],
      i = e[12],
      a = e[1],
      s = e[5],
      o = e[9],
      l = e[13],
      c = e[2],
      h = e[6],
      u = e[10],
      d = e[14];
    return (
      e[3] * (+i * o * h - n * l * h - i * s * u + r * l * u + n * s * d - r * o * d) +
      e[7] * (+t * o * d - t * l * u + i * a * u - n * a * d + n * l * c - i * o * c) +
      e[11] * (+t * l * h - t * s * d - i * a * h + r * a * d + i * s * c - r * l * c) +
      e[15] * (-n * s * c - t * o * h + t * s * u + n * a * h - r * a * u + r * o * c)
    );
  }
  transpose() {
    const e = this.elements;
    let t;
    return (
      (t = e[1]),
      (e[1] = e[4]),
      (e[4] = t),
      (t = e[2]),
      (e[2] = e[8]),
      (e[8] = t),
      (t = e[6]),
      (e[6] = e[9]),
      (e[9] = t),
      (t = e[3]),
      (e[3] = e[12]),
      (e[12] = t),
      (t = e[7]),
      (e[7] = e[13]),
      (e[13] = t),
      (t = e[11]),
      (e[11] = e[14]),
      (e[14] = t),
      this
    );
  }
  setPosition(e, t, r) {
    const n = this.elements;
    return (
      e.isVector3
        ? ((n[12] = e.x), (n[13] = e.y), (n[14] = e.z))
        : ((n[12] = e), (n[13] = t), (n[14] = r)),
      this
    );
  }
  invert() {
    const e = this.elements,
      t = e[0],
      r = e[1],
      n = e[2],
      i = e[3],
      a = e[4],
      s = e[5],
      o = e[6],
      l = e[7],
      c = e[8],
      h = e[9],
      u = e[10],
      d = e[11],
      p = e[12],
      m = e[13],
      f = e[14],
      g = e[15],
      _ = h * f * l - m * u * l + m * o * d - s * f * d - h * o * g + s * u * g,
      v = p * u * l - c * f * l - p * o * d + a * f * d + c * o * g - a * u * g,
      x = c * m * l - p * h * l + p * s * d - a * m * d - c * s * g + a * h * g,
      y = p * h * o - c * m * o - p * s * u + a * m * u + c * s * f - a * h * f,
      M = t * _ + r * v + n * x + i * y;
    if (0 === M) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const S = 1 / M;
    return (
      (e[0] = _ * S),
      (e[1] = (m * u * i - h * f * i - m * n * d + r * f * d + h * n * g - r * u * g) * S),
      (e[2] = (s * f * i - m * o * i + m * n * l - r * f * l - s * n * g + r * o * g) * S),
      (e[3] = (h * o * i - s * u * i - h * n * l + r * u * l + s * n * d - r * o * d) * S),
      (e[4] = v * S),
      (e[5] = (c * f * i - p * u * i + p * n * d - t * f * d - c * n * g + t * u * g) * S),
      (e[6] = (p * o * i - a * f * i - p * n * l + t * f * l + a * n * g - t * o * g) * S),
      (e[7] = (a * u * i - c * o * i + c * n * l - t * u * l - a * n * d + t * o * d) * S),
      (e[8] = x * S),
      (e[9] = (p * h * i - c * m * i - p * r * d + t * m * d + c * r * g - t * h * g) * S),
      (e[10] = (a * m * i - p * s * i + p * r * l - t * m * l - a * r * g + t * s * g) * S),
      (e[11] = (c * s * i - a * h * i - c * r * l + t * h * l + a * r * d - t * s * d) * S),
      (e[12] = y * S),
      (e[13] = (c * m * n - p * h * n + p * r * u - t * m * u - c * r * f + t * h * f) * S),
      (e[14] = (p * s * n - a * m * n - p * r * o + t * m * o + a * r * f - t * s * f) * S),
      (e[15] = (a * h * n - c * s * n + c * r * o - t * h * o - a * r * u + t * s * u) * S),
      this
    );
  }
  scale(e) {
    const t = this.elements,
      r = e.x,
      n = e.y,
      i = e.z;
    return (
      (t[0] *= r),
      (t[4] *= n),
      (t[8] *= i),
      (t[1] *= r),
      (t[5] *= n),
      (t[9] *= i),
      (t[2] *= r),
      (t[6] *= n),
      (t[10] *= i),
      (t[3] *= r),
      (t[7] *= n),
      (t[11] *= i),
      this
    );
  }
  getMaxScaleOnAxis() {
    const e = this.elements,
      t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2],
      r = e[4] * e[4] + e[5] * e[5] + e[6] * e[6],
      n = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
    return Math.sqrt(Math.max(t, r, n));
  }
  makeTranslation(e, t, r) {
    return this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, r, 0, 0, 0, 1), this;
  }
  makeRotationX(e) {
    const t = Math.cos(e),
      r = Math.sin(e);
    return this.set(1, 0, 0, 0, 0, t, -r, 0, 0, r, t, 0, 0, 0, 0, 1), this;
  }
  makeRotationY(e) {
    const t = Math.cos(e),
      r = Math.sin(e);
    return this.set(t, 0, r, 0, 0, 1, 0, 0, -r, 0, t, 0, 0, 0, 0, 1), this;
  }
  makeRotationZ(e) {
    const t = Math.cos(e),
      r = Math.sin(e);
    return this.set(t, -r, 0, 0, r, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  makeRotationAxis(e, t) {
    const r = Math.cos(t),
      n = Math.sin(t),
      i = 1 - r,
      a = e.x,
      s = e.y,
      o = e.z,
      l = i * a,
      c = i * s;
    return (
      this.set(
        l * a + r,
        l * s - n * o,
        l * o + n * s,
        0,
        l * s + n * o,
        c * s + r,
        c * o - n * a,
        0,
        l * o - n * s,
        c * o + n * a,
        i * o * o + r,
        0,
        0,
        0,
        0,
        1,
      ),
      this
    );
  }
  makeScale(e, t, r) {
    return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, r, 0, 0, 0, 0, 1), this;
  }
  makeShear(e, t, r, n, i, a) {
    return this.set(1, r, i, 0, e, 1, a, 0, t, n, 1, 0, 0, 0, 0, 1), this;
  }
  compose(e, t, r) {
    const n = this.elements,
      i = t._x,
      a = t._y,
      s = t._z,
      o = t._w,
      l = i + i,
      c = a + a,
      h = s + s,
      u = i * l,
      d = i * c,
      p = i * h,
      m = a * c,
      f = a * h,
      g = s * h,
      _ = o * l,
      v = o * c,
      x = o * h,
      y = r.x,
      M = r.y,
      S = r.z;
    return (
      (n[0] = (1 - (m + g)) * y),
      (n[1] = (d + x) * y),
      (n[2] = (p - v) * y),
      (n[3] = 0),
      (n[4] = (d - x) * M),
      (n[5] = (1 - (u + g)) * M),
      (n[6] = (f + _) * M),
      (n[7] = 0),
      (n[8] = (p + v) * S),
      (n[9] = (f - _) * S),
      (n[10] = (1 - (u + m)) * S),
      (n[11] = 0),
      (n[12] = e.x),
      (n[13] = e.y),
      (n[14] = e.z),
      (n[15] = 1),
      this
    );
  }
  decompose(e, t, r) {
    const n = this.elements;
    let i = _v1$5.set(n[0], n[1], n[2]).length();
    const a = _v1$5.set(n[4], n[5], n[6]).length(),
      s = _v1$5.set(n[8], n[9], n[10]).length();
    this.determinant() < 0 && (i = -i),
      (e.x = n[12]),
      (e.y = n[13]),
      (e.z = n[14]),
      _m1$2.copy(this);
    const o = 1 / i,
      l = 1 / a,
      c = 1 / s;
    return (
      (_m1$2.elements[0] *= o),
      (_m1$2.elements[1] *= o),
      (_m1$2.elements[2] *= o),
      (_m1$2.elements[4] *= l),
      (_m1$2.elements[5] *= l),
      (_m1$2.elements[6] *= l),
      (_m1$2.elements[8] *= c),
      (_m1$2.elements[9] *= c),
      (_m1$2.elements[10] *= c),
      t.setFromRotationMatrix(_m1$2),
      (r.x = i),
      (r.y = a),
      (r.z = s),
      this
    );
  }
  makePerspective(e, t, r, n, i, a) {
    const s = this.elements,
      o = (2 * i) / (t - e),
      l = (2 * i) / (r - n),
      c = (t + e) / (t - e),
      h = (r + n) / (r - n),
      u = -(a + i) / (a - i),
      d = (-2 * a * i) / (a - i);
    return (
      (s[0] = o),
      (s[4] = 0),
      (s[8] = c),
      (s[12] = 0),
      (s[1] = 0),
      (s[5] = l),
      (s[9] = h),
      (s[13] = 0),
      (s[2] = 0),
      (s[6] = 0),
      (s[10] = u),
      (s[14] = d),
      (s[3] = 0),
      (s[7] = 0),
      (s[11] = -1),
      (s[15] = 0),
      this
    );
  }
  makeOrthographic(e, t, r, n, i, a) {
    const s = this.elements,
      o = 1 / (t - e),
      l = 1 / (r - n),
      c = 1 / (a - i),
      h = (t + e) * o,
      u = (r + n) * l,
      d = (a + i) * c;
    return (
      (s[0] = 2 * o),
      (s[4] = 0),
      (s[8] = 0),
      (s[12] = -h),
      (s[1] = 0),
      (s[5] = 2 * l),
      (s[9] = 0),
      (s[13] = -u),
      (s[2] = 0),
      (s[6] = 0),
      (s[10] = -2 * c),
      (s[14] = -d),
      (s[3] = 0),
      (s[7] = 0),
      (s[11] = 0),
      (s[15] = 1),
      this
    );
  }
  equals(e) {
    const t = this.elements,
      r = e.elements;
    for (let e = 0; e < 16; e++) if (t[e] !== r[e]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let r = 0; r < 16; r++) this.elements[r] = e[r + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const r = this.elements;
    return (
      (e[t] = r[0]),
      (e[t + 1] = r[1]),
      (e[t + 2] = r[2]),
      (e[t + 3] = r[3]),
      (e[t + 4] = r[4]),
      (e[t + 5] = r[5]),
      (e[t + 6] = r[6]),
      (e[t + 7] = r[7]),
      (e[t + 8] = r[8]),
      (e[t + 9] = r[9]),
      (e[t + 10] = r[10]),
      (e[t + 11] = r[11]),
      (e[t + 12] = r[12]),
      (e[t + 13] = r[13]),
      (e[t + 14] = r[14]),
      (e[t + 15] = r[15]),
      e
    );
  }
}
const _v1$5 = new Vector3(),
  _m1$2 = new Matrix4(),
  _zero = new Vector3(0, 0, 0),
  _one = new Vector3(1, 1, 1),
  _x = new Vector3(),
  _y = new Vector3(),
  _z = new Vector3(),
  _matrix = new Matrix4(),
  _quaternion$3 = new Quaternion();
class Euler {
  constructor(e = 0, t = 0, r = 0, n = Euler.DEFAULT_ORDER) {
    (this.isEuler = !0), (this._x = e), (this._y = t), (this._z = r), (this._order = n);
  }
  get x() {
    return this._x;
  }
  set x(e) {
    (this._x = e), this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    (this._y = e), this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    (this._z = e), this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(e) {
    (this._order = e), this._onChangeCallback();
  }
  set(e, t, r, n = this._order) {
    return (
      (this._x = e), (this._y = t), (this._z = r), (this._order = n), this._onChangeCallback(), this
    );
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(e) {
    return (
      (this._x = e._x),
      (this._y = e._y),
      (this._z = e._z),
      (this._order = e._order),
      this._onChangeCallback(),
      this
    );
  }
  setFromRotationMatrix(e, t = this._order, r = !0) {
    const n = e.elements,
      i = n[0],
      a = n[4],
      s = n[8],
      o = n[1],
      l = n[5],
      c = n[9],
      h = n[2],
      u = n[6],
      d = n[10];
    switch (t) {
      case 'XYZ':
        (this._y = Math.asin(clamp(s, -1, 1))),
          Math.abs(s) < 0.9999999
            ? ((this._x = Math.atan2(-c, d)), (this._z = Math.atan2(-a, i)))
            : ((this._x = Math.atan2(u, l)), (this._z = 0));
        break;
      case 'YXZ':
        (this._x = Math.asin(-clamp(c, -1, 1))),
          Math.abs(c) < 0.9999999
            ? ((this._y = Math.atan2(s, d)), (this._z = Math.atan2(o, l)))
            : ((this._y = Math.atan2(-h, i)), (this._z = 0));
        break;
      case 'ZXY':
        (this._x = Math.asin(clamp(u, -1, 1))),
          Math.abs(u) < 0.9999999
            ? ((this._y = Math.atan2(-h, d)), (this._z = Math.atan2(-a, l)))
            : ((this._y = 0), (this._z = Math.atan2(o, i)));
        break;
      case 'ZYX':
        (this._y = Math.asin(-clamp(h, -1, 1))),
          Math.abs(h) < 0.9999999
            ? ((this._x = Math.atan2(u, d)), (this._z = Math.atan2(o, i)))
            : ((this._x = 0), (this._z = Math.atan2(-a, l)));
        break;
      case 'YZX':
        (this._z = Math.asin(clamp(o, -1, 1))),
          Math.abs(o) < 0.9999999
            ? ((this._x = Math.atan2(-c, l)), (this._y = Math.atan2(-h, i)))
            : ((this._x = 0), (this._y = Math.atan2(s, d)));
        break;
      case 'XZY':
        (this._z = Math.asin(-clamp(a, -1, 1))),
          Math.abs(a) < 0.9999999
            ? ((this._x = Math.atan2(u, l)), (this._y = Math.atan2(s, i)))
            : ((this._x = Math.atan2(-c, d)), (this._y = 0));
        break;
      default:
        console.warn('THREE.Euler: .setFromRotationMatrix() encountered an unknown order: ' + t);
    }
    return (this._order = t), !0 === r && this._onChangeCallback(), this;
  }
  setFromQuaternion(e, t, r) {
    return _matrix.makeRotationFromQuaternion(e), this.setFromRotationMatrix(_matrix, t, r);
  }
  setFromVector3(e, t = this._order) {
    return this.set(e.x, e.y, e.z, t);
  }
  reorder(e) {
    return _quaternion$3.setFromEuler(this), this.setFromQuaternion(_quaternion$3, e);
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
  }
  fromArray(e) {
    return (
      (this._x = e[0]),
      (this._y = e[1]),
      (this._z = e[2]),
      void 0 !== e[3] && (this._order = e[3]),
      this._onChangeCallback(),
      this
    );
  }
  toArray(e = [], t = 0) {
    return (
      (e[t] = this._x), (e[t + 1] = this._y), (e[t + 2] = this._z), (e[t + 3] = this._order), e
    );
  }
  _onChange(e) {
    return (this._onChangeCallback = e), this;
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
Euler.DEFAULT_ORDER = 'XYZ';
class Layers {
  constructor() {
    this.mask = 1;
  }
  set(e) {
    this.mask = ((1 << e) | 0) >>> 0;
  }
  enable(e) {
    this.mask |= (1 << e) | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(e) {
    this.mask ^= (1 << e) | 0;
  }
  disable(e) {
    this.mask &= ~((1 << e) | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(e) {
    return 0 != (this.mask & e.mask);
  }
  isEnabled(e) {
    return 0 != (this.mask & ((1 << e) | 0));
  }
}
let _object3DId = 0;
const _v1$4 = new Vector3(),
  _q1 = new Quaternion(),
  _m1$1 = new Matrix4(),
  _target = new Vector3(),
  _position$3 = new Vector3(),
  _scale$2 = new Vector3(),
  _quaternion$2 = new Quaternion(),
  _xAxis = new Vector3(1, 0, 0),
  _yAxis = new Vector3(0, 1, 0),
  _zAxis = new Vector3(0, 0, 1),
  _addedEvent = { type: 'added' },
  _removedEvent = { type: 'removed' };
class Object3D extends EventDispatcher {
  constructor() {
    super(),
      (this.isObject3D = !0),
      Object.defineProperty(this, 'id', { value: _object3DId++ }),
      (this.uuid = generateUUID()),
      (this.name = ''),
      (this.type = 'Object3D'),
      (this.parent = null),
      (this.children = []),
      (this.up = Object3D.DEFAULT_UP.clone());
    const e = new Vector3(),
      t = new Euler(),
      r = new Quaternion(),
      n = new Vector3(1, 1, 1);
    t._onChange(function () {
      r.setFromEuler(t, !1);
    }),
      r._onChange(function () {
        t.setFromQuaternion(r, void 0, !1);
      }),
      Object.defineProperties(this, {
        position: { configurable: !0, enumerable: !0, value: e },
        rotation: { configurable: !0, enumerable: !0, value: t },
        quaternion: { configurable: !0, enumerable: !0, value: r },
        scale: { configurable: !0, enumerable: !0, value: n },
        modelViewMatrix: { value: new Matrix4() },
        normalMatrix: { value: new Matrix3() },
      }),
      (this.matrix = new Matrix4()),
      (this.matrixWorld = new Matrix4()),
      (this.matrixAutoUpdate = Object3D.DEFAULT_MATRIX_AUTO_UPDATE),
      (this.matrixWorldNeedsUpdate = !1),
      (this.matrixWorldAutoUpdate = Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE),
      (this.layers = new Layers()),
      (this.visible = !0),
      (this.castShadow = !1),
      (this.receiveShadow = !1),
      (this.frustumCulled = !0),
      (this.renderOrder = 0),
      (this.animations = []),
      (this.userData = {});
  }
  onBeforeRender() {}
  onAfterRender() {}
  applyMatrix4(e) {
    this.matrixAutoUpdate && this.updateMatrix(),
      this.matrix.premultiply(e),
      this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(e) {
    return this.quaternion.premultiply(e), this;
  }
  setRotationFromAxisAngle(e, t) {
    this.quaternion.setFromAxisAngle(e, t);
  }
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, !0);
  }
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  rotateOnAxis(e, t) {
    return _q1.setFromAxisAngle(e, t), this.quaternion.multiply(_q1), this;
  }
  rotateOnWorldAxis(e, t) {
    return _q1.setFromAxisAngle(e, t), this.quaternion.premultiply(_q1), this;
  }
  rotateX(e) {
    return this.rotateOnAxis(_xAxis, e);
  }
  rotateY(e) {
    return this.rotateOnAxis(_yAxis, e);
  }
  rotateZ(e) {
    return this.rotateOnAxis(_zAxis, e);
  }
  translateOnAxis(e, t) {
    return (
      _v1$4.copy(e).applyQuaternion(this.quaternion),
      this.position.add(_v1$4.multiplyScalar(t)),
      this
    );
  }
  translateX(e) {
    return this.translateOnAxis(_xAxis, e);
  }
  translateY(e) {
    return this.translateOnAxis(_yAxis, e);
  }
  translateZ(e) {
    return this.translateOnAxis(_zAxis, e);
  }
  localToWorld(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(_m1$1.copy(this.matrixWorld).invert());
  }
  lookAt(e, t, r) {
    e.isVector3 ? _target.copy(e) : _target.set(e, t, r);
    const n = this.parent;
    this.updateWorldMatrix(!0, !1),
      _position$3.setFromMatrixPosition(this.matrixWorld),
      this.isCamera || this.isLight
        ? _m1$1.lookAt(_position$3, _target, this.up)
        : _m1$1.lookAt(_target, _position$3, this.up),
      this.quaternion.setFromRotationMatrix(_m1$1),
      n &&
        (_m1$1.extractRotation(n.matrixWorld),
        _q1.setFromRotationMatrix(_m1$1),
        this.quaternion.premultiply(_q1.invert()));
  }
  add(e) {
    if (arguments.length > 1) {
      for (let e = 0; e < arguments.length; e++) this.add(arguments[e]);
      return this;
    }
    return e === this
      ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this)
      : (e && e.isObject3D
          ? (null !== e.parent && e.parent.remove(e),
            (e.parent = this),
            this.children.push(e),
            e.dispatchEvent(_addedEvent))
          : console.error('THREE.Object3D.add: object not an instance of THREE.Object3D.', e),
        this);
  }
  remove(e) {
    if (arguments.length > 1) {
      for (let e = 0; e < arguments.length; e++) this.remove(arguments[e]);
      return this;
    }
    const t = this.children.indexOf(e);
    return (
      -1 !== t && ((e.parent = null), this.children.splice(t, 1), e.dispatchEvent(_removedEvent)),
      this
    );
  }
  removeFromParent() {
    const e = this.parent;
    return null !== e && e.remove(this), this;
  }
  clear() {
    for (let e = 0; e < this.children.length; e++) {
      const t = this.children[e];
      (t.parent = null), t.dispatchEvent(_removedEvent);
    }
    return (this.children.length = 0), this;
  }
  attach(e) {
    return (
      this.updateWorldMatrix(!0, !1),
      _m1$1.copy(this.matrixWorld).invert(),
      null !== e.parent &&
        (e.parent.updateWorldMatrix(!0, !1), _m1$1.multiply(e.parent.matrixWorld)),
      e.applyMatrix4(_m1$1),
      this.add(e),
      e.updateWorldMatrix(!1, !0),
      this
    );
  }
  getObjectById(e) {
    return this.getObjectByProperty('id', e);
  }
  getObjectByName(e) {
    return this.getObjectByProperty('name', e);
  }
  getObjectByProperty(e, t) {
    if (this[e] === t) return this;
    for (let r = 0, n = this.children.length; r < n; r++) {
      const n = this.children[r].getObjectByProperty(e, t);
      if (void 0 !== n) return n;
    }
  }
  getObjectsByProperty(e, t) {
    let r = [];
    this[e] === t && r.push(this);
    for (let n = 0, i = this.children.length; n < i; n++) {
      const i = this.children[n].getObjectsByProperty(e, t);
      i.length > 0 && (r = r.concat(i));
    }
    return r;
  }
  getWorldPosition(e) {
    return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(_position$3, e, _scale$2), e;
  }
  getWorldScale(e) {
    return (
      this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(_position$3, _quaternion$2, e), e
    );
  }
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    const t = this.matrixWorld.elements;
    return e.set(t[8], t[9], t[10]).normalize();
  }
  raycast() {}
  traverse(e) {
    e(this);
    const t = this.children;
    for (let r = 0, n = t.length; r < n; r++) t[r].traverse(e);
  }
  traverseVisible(e) {
    if (!1 === this.visible) return;
    e(this);
    const t = this.children;
    for (let r = 0, n = t.length; r < n; r++) t[r].traverseVisible(e);
  }
  traverseAncestors(e) {
    const t = this.parent;
    null !== t && (e(t), t.traverseAncestors(e));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale),
      (this.matrixWorldNeedsUpdate = !0);
  }
  updateMatrixWorld(e) {
    this.matrixAutoUpdate && this.updateMatrix(),
      (this.matrixWorldNeedsUpdate || e) &&
        (null === this.parent
          ? this.matrixWorld.copy(this.matrix)
          : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
        (this.matrixWorldNeedsUpdate = !1),
        (e = !0));
    const t = this.children;
    for (let r = 0, n = t.length; r < n; r++) {
      const n = t[r];
      (!0 !== n.matrixWorldAutoUpdate && !0 !== e) || n.updateMatrixWorld(e);
    }
  }
  updateWorldMatrix(e, t) {
    const r = this.parent;
    if (
      (!0 === e && null !== r && !0 === r.matrixWorldAutoUpdate && r.updateWorldMatrix(!0, !1),
      this.matrixAutoUpdate && this.updateMatrix(),
      null === this.parent
        ? this.matrixWorld.copy(this.matrix)
        : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
      !0 === t)
    ) {
      const e = this.children;
      for (let t = 0, r = e.length; t < r; t++) {
        const r = e[t];
        !0 === r.matrixWorldAutoUpdate && r.updateWorldMatrix(!1, !0);
      }
    }
  }
  toJSON(e) {
    const t = void 0 === e || 'string' == typeof e,
      r = {};
    t &&
      ((e = {
        geometries: {},
        materials: {},
        textures: {},
        images: {},
        shapes: {},
        skeletons: {},
        animations: {},
        nodes: {},
      }),
      (r.metadata = { version: 4.5, type: 'Object', generator: 'Object3D.toJSON' }));
    const n = {};
    function i(t, r) {
      return void 0 === t[r.uuid] && (t[r.uuid] = r.toJSON(e)), r.uuid;
    }
    if (
      ((n.uuid = this.uuid),
      (n.type = this.type),
      '' !== this.name && (n.name = this.name),
      !0 === this.castShadow && (n.castShadow = !0),
      !0 === this.receiveShadow && (n.receiveShadow = !0),
      !1 === this.visible && (n.visible = !1),
      !1 === this.frustumCulled && (n.frustumCulled = !1),
      0 !== this.renderOrder && (n.renderOrder = this.renderOrder),
      Object.keys(this.userData).length > 0 && (n.userData = this.userData),
      (n.layers = this.layers.mask),
      (n.matrix = this.matrix.toArray()),
      (n.up = this.up.toArray()),
      !1 === this.matrixAutoUpdate && (n.matrixAutoUpdate = !1),
      this.isInstancedMesh &&
        ((n.type = 'InstancedMesh'),
        (n.count = this.count),
        (n.instanceMatrix = this.instanceMatrix.toJSON()),
        null !== this.instanceColor && (n.instanceColor = this.instanceColor.toJSON())),
      this.isScene)
    )
      this.background &&
        (this.background.isColor
          ? (n.background = this.background.toJSON())
          : this.background.isTexture && (n.background = this.background.toJSON(e).uuid)),
        this.environment &&
          this.environment.isTexture &&
          !0 !== this.environment.isRenderTargetTexture &&
          (n.environment = this.environment.toJSON(e).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      n.geometry = i(e.geometries, this.geometry);
      const t = this.geometry.parameters;
      if (void 0 !== t && void 0 !== t.shapes) {
        const r = t.shapes;
        if (Array.isArray(r))
          for (let t = 0, n = r.length; t < n; t++) {
            const n = r[t];
            i(e.shapes, n);
          }
        else i(e.shapes, r);
      }
    }
    if (
      (this.isSkinnedMesh &&
        ((n.bindMode = this.bindMode),
        (n.bindMatrix = this.bindMatrix.toArray()),
        void 0 !== this.skeleton &&
          (i(e.skeletons, this.skeleton), (n.skeleton = this.skeleton.uuid))),
      void 0 !== this.material)
    )
      if (Array.isArray(this.material)) {
        const t = [];
        for (let r = 0, n = this.material.length; r < n; r++)
          t.push(i(e.materials, this.material[r]));
        n.material = t;
      } else n.material = i(e.materials, this.material);
    if (this.children.length > 0) {
      n.children = [];
      for (let t = 0; t < this.children.length; t++)
        n.children.push(this.children[t].toJSON(e).object);
    }
    if (this.animations.length > 0) {
      n.animations = [];
      for (let t = 0; t < this.animations.length; t++) {
        const r = this.animations[t];
        n.animations.push(i(e.animations, r));
      }
    }
    if (t) {
      const t = a(e.geometries),
        n = a(e.materials),
        i = a(e.textures),
        s = a(e.images),
        o = a(e.shapes),
        l = a(e.skeletons),
        c = a(e.animations),
        h = a(e.nodes);
      t.length > 0 && (r.geometries = t),
        n.length > 0 && (r.materials = n),
        i.length > 0 && (r.textures = i),
        s.length > 0 && (r.images = s),
        o.length > 0 && (r.shapes = o),
        l.length > 0 && (r.skeletons = l),
        c.length > 0 && (r.animations = c),
        h.length > 0 && (r.nodes = h);
    }
    return (r.object = n), r;
    function a(e) {
      const t = [];
      for (const r in e) {
        const n = e[r];
        delete n.metadata, t.push(n);
      }
      return t;
    }
  }
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  copy(e, t = !0) {
    if (
      ((this.name = e.name),
      this.up.copy(e.up),
      this.position.copy(e.position),
      (this.rotation.order = e.rotation.order),
      this.quaternion.copy(e.quaternion),
      this.scale.copy(e.scale),
      this.matrix.copy(e.matrix),
      this.matrixWorld.copy(e.matrixWorld),
      (this.matrixAutoUpdate = e.matrixAutoUpdate),
      (this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate),
      (this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate),
      (this.layers.mask = e.layers.mask),
      (this.visible = e.visible),
      (this.castShadow = e.castShadow),
      (this.receiveShadow = e.receiveShadow),
      (this.frustumCulled = e.frustumCulled),
      (this.renderOrder = e.renderOrder),
      (this.userData = JSON.parse(JSON.stringify(e.userData))),
      !0 === t)
    )
      for (let t = 0; t < e.children.length; t++) {
        const r = e.children[t];
        this.add(r.clone());
      }
    return this;
  }
}
(Object3D.DEFAULT_UP = new Vector3(0, 1, 0)),
  (Object3D.DEFAULT_MATRIX_AUTO_UPDATE = !0),
  (Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0);
const _v0$1 = new Vector3(),
  _v1$3 = new Vector3(),
  _v2$2 = new Vector3(),
  _v3$1 = new Vector3(),
  _vab = new Vector3(),
  _vac = new Vector3(),
  _vbc = new Vector3(),
  _vap = new Vector3(),
  _vbp = new Vector3(),
  _vcp = new Vector3();
let warnedGetUV = !1;
class Triangle {
  constructor(e = new Vector3(), t = new Vector3(), r = new Vector3()) {
    (this.a = e), (this.b = t), (this.c = r);
  }
  static getNormal(e, t, r, n) {
    n.subVectors(r, t), _v0$1.subVectors(e, t), n.cross(_v0$1);
    const i = n.lengthSq();
    return i > 0 ? n.multiplyScalar(1 / Math.sqrt(i)) : n.set(0, 0, 0);
  }
  static getBarycoord(e, t, r, n, i) {
    _v0$1.subVectors(n, t), _v1$3.subVectors(r, t), _v2$2.subVectors(e, t);
    const a = _v0$1.dot(_v0$1),
      s = _v0$1.dot(_v1$3),
      o = _v0$1.dot(_v2$2),
      l = _v1$3.dot(_v1$3),
      c = _v1$3.dot(_v2$2),
      h = a * l - s * s;
    if (0 === h) return i.set(-2, -1, -1);
    const u = 1 / h,
      d = (l * o - s * c) * u,
      p = (a * c - s * o) * u;
    return i.set(1 - d - p, p, d);
  }
  static containsPoint(e, t, r, n) {
    return (
      this.getBarycoord(e, t, r, n, _v3$1), _v3$1.x >= 0 && _v3$1.y >= 0 && _v3$1.x + _v3$1.y <= 1
    );
  }
  static getUV(e, t, r, n, i, a, s, o) {
    return (
      !1 === warnedGetUV &&
        (console.warn(
          'THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation().',
        ),
        (warnedGetUV = !0)),
      this.getInterpolation(e, t, r, n, i, a, s, o)
    );
  }
  static getInterpolation(e, t, r, n, i, a, s, o) {
    return (
      this.getBarycoord(e, t, r, n, _v3$1),
      o.setScalar(0),
      o.addScaledVector(i, _v3$1.x),
      o.addScaledVector(a, _v3$1.y),
      o.addScaledVector(s, _v3$1.z),
      o
    );
  }
  static isFrontFacing(e, t, r, n) {
    return _v0$1.subVectors(r, t), _v1$3.subVectors(e, t), _v0$1.cross(_v1$3).dot(n) < 0;
  }
  set(e, t, r) {
    return this.a.copy(e), this.b.copy(t), this.c.copy(r), this;
  }
  setFromPointsAndIndices(e, t, r, n) {
    return this.a.copy(e[t]), this.b.copy(e[r]), this.c.copy(e[n]), this;
  }
  setFromAttributeAndIndices(e, t, r, n) {
    return (
      this.a.fromBufferAttribute(e, t),
      this.b.fromBufferAttribute(e, r),
      this.c.fromBufferAttribute(e, n),
      this
    );
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
  }
  getArea() {
    return (
      _v0$1.subVectors(this.c, this.b),
      _v1$3.subVectors(this.a, this.b),
      0.5 * _v0$1.cross(_v1$3).length()
    );
  }
  getMidpoint(e) {
    return e
      .addVectors(this.a, this.b)
      .add(this.c)
      .multiplyScalar(1 / 3);
  }
  getNormal(e) {
    return Triangle.getNormal(this.a, this.b, this.c, e);
  }
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(e, t) {
    return Triangle.getBarycoord(e, this.a, this.b, this.c, t);
  }
  getUV(e, t, r, n, i) {
    return (
      !1 === warnedGetUV &&
        (console.warn(
          'THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation().',
        ),
        (warnedGetUV = !0)),
      Triangle.getInterpolation(e, this.a, this.b, this.c, t, r, n, i)
    );
  }
  getInterpolation(e, t, r, n, i) {
    return Triangle.getInterpolation(e, this.a, this.b, this.c, t, r, n, i);
  }
  containsPoint(e) {
    return Triangle.containsPoint(e, this.a, this.b, this.c);
  }
  isFrontFacing(e) {
    return Triangle.isFrontFacing(this.a, this.b, this.c, e);
  }
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  closestPointToPoint(e, t) {
    const r = this.a,
      n = this.b,
      i = this.c;
    let a, s;
    _vab.subVectors(n, r), _vac.subVectors(i, r), _vap.subVectors(e, r);
    const o = _vab.dot(_vap),
      l = _vac.dot(_vap);
    if (o <= 0 && l <= 0) return t.copy(r);
    _vbp.subVectors(e, n);
    const c = _vab.dot(_vbp),
      h = _vac.dot(_vbp);
    if (c >= 0 && h <= c) return t.copy(n);
    const u = o * h - c * l;
    if (u <= 0 && o >= 0 && c <= 0) return (a = o / (o - c)), t.copy(r).addScaledVector(_vab, a);
    _vcp.subVectors(e, i);
    const d = _vab.dot(_vcp),
      p = _vac.dot(_vcp);
    if (p >= 0 && d <= p) return t.copy(i);
    const m = d * l - o * p;
    if (m <= 0 && l >= 0 && p <= 0) return (s = l / (l - p)), t.copy(r).addScaledVector(_vac, s);
    const f = c * p - d * h;
    if (f <= 0 && h - c >= 0 && d - p >= 0)
      return (
        _vbc.subVectors(i, n), (s = (h - c) / (h - c + (d - p))), t.copy(n).addScaledVector(_vbc, s)
      );
    const g = 1 / (f + m + u);
    return (a = m * g), (s = u * g), t.copy(r).addScaledVector(_vab, a).addScaledVector(_vac, s);
  }
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}
let materialId = 0;
class Material extends EventDispatcher {
  constructor() {
    super(),
      (this.isMaterial = !0),
      Object.defineProperty(this, 'id', { value: materialId++ }),
      (this.uuid = generateUUID()),
      (this.name = ''),
      (this.type = 'Material'),
      (this.blending = 1),
      (this.side = 0),
      (this.vertexColors = !1),
      (this.opacity = 1),
      (this.transparent = !1),
      (this.blendSrc = 204),
      (this.blendDst = 205),
      (this.blendEquation = 100),
      (this.blendSrcAlpha = null),
      (this.blendDstAlpha = null),
      (this.blendEquationAlpha = null),
      (this.depthFunc = 3),
      (this.depthTest = !0),
      (this.depthWrite = !0),
      (this.stencilWriteMask = 255),
      (this.stencilFunc = 519),
      (this.stencilRef = 0),
      (this.stencilFuncMask = 255),
      (this.stencilFail = 7680),
      (this.stencilZFail = 7680),
      (this.stencilZPass = 7680),
      (this.stencilWrite = !1),
      (this.clippingPlanes = null),
      (this.clipIntersection = !1),
      (this.clipShadows = !1),
      (this.shadowSide = null),
      (this.colorWrite = !0),
      (this.precision = null),
      (this.polygonOffset = !1),
      (this.polygonOffsetFactor = 0),
      (this.polygonOffsetUnits = 0),
      (this.dithering = !1),
      (this.alphaToCoverage = !1),
      (this.premultipliedAlpha = !1),
      (this.forceSinglePass = !1),
      (this.visible = !0),
      (this.toneMapped = !0),
      (this.userData = {}),
      (this.version = 0),
      (this._alphaTest = 0);
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    this._alphaTest > 0 != e > 0 && this.version++, (this._alphaTest = e);
  }
  onBuild() {}
  onBeforeRender() {}
  onBeforeCompile() {}
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(e) {
    if (void 0 !== e)
      for (const t in e) {
        const r = e[t];
        if (void 0 === r) {
          console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);
          continue;
        }
        const n = this[t];
        void 0 !== n
          ? n && n.isColor
            ? n.set(r)
            : n && n.isVector3 && r && r.isVector3
              ? n.copy(r)
              : (this[t] = r)
          : console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);
      }
  }
  toJSON(e) {
    const t = void 0 === e || 'string' == typeof e;
    t && (e = { textures: {}, images: {} });
    const r = { metadata: { version: 4.5, type: 'Material', generator: 'Material.toJSON' } };
    function n(e) {
      const t = [];
      for (const r in e) {
        const n = e[r];
        delete n.metadata, t.push(n);
      }
      return t;
    }
    if (
      ((r.uuid = this.uuid),
      (r.type = this.type),
      '' !== this.name && (r.name = this.name),
      this.color && this.color.isColor && (r.color = this.color.getHex()),
      void 0 !== this.roughness && (r.roughness = this.roughness),
      void 0 !== this.metalness && (r.metalness = this.metalness),
      void 0 !== this.sheen && (r.sheen = this.sheen),
      this.sheenColor && this.sheenColor.isColor && (r.sheenColor = this.sheenColor.getHex()),
      void 0 !== this.sheenRoughness && (r.sheenRoughness = this.sheenRoughness),
      this.emissive && this.emissive.isColor && (r.emissive = this.emissive.getHex()),
      this.emissiveIntensity &&
        1 !== this.emissiveIntensity &&
        (r.emissiveIntensity = this.emissiveIntensity),
      this.specular && this.specular.isColor && (r.specular = this.specular.getHex()),
      void 0 !== this.specularIntensity && (r.specularIntensity = this.specularIntensity),
      this.specularColor &&
        this.specularColor.isColor &&
        (r.specularColor = this.specularColor.getHex()),
      void 0 !== this.shininess && (r.shininess = this.shininess),
      void 0 !== this.clearcoat && (r.clearcoat = this.clearcoat),
      void 0 !== this.clearcoatRoughness && (r.clearcoatRoughness = this.clearcoatRoughness),
      this.clearcoatMap &&
        this.clearcoatMap.isTexture &&
        (r.clearcoatMap = this.clearcoatMap.toJSON(e).uuid),
      this.clearcoatRoughnessMap &&
        this.clearcoatRoughnessMap.isTexture &&
        (r.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid),
      this.clearcoatNormalMap &&
        this.clearcoatNormalMap.isTexture &&
        ((r.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid),
        (r.clearcoatNormalScale = this.clearcoatNormalScale.toArray())),
      void 0 !== this.iridescence && (r.iridescence = this.iridescence),
      void 0 !== this.iridescenceIOR && (r.iridescenceIOR = this.iridescenceIOR),
      void 0 !== this.iridescenceThicknessRange &&
        (r.iridescenceThicknessRange = this.iridescenceThicknessRange),
      this.iridescenceMap &&
        this.iridescenceMap.isTexture &&
        (r.iridescenceMap = this.iridescenceMap.toJSON(e).uuid),
      this.iridescenceThicknessMap &&
        this.iridescenceThicknessMap.isTexture &&
        (r.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid),
      this.map && this.map.isTexture && (r.map = this.map.toJSON(e).uuid),
      this.matcap && this.matcap.isTexture && (r.matcap = this.matcap.toJSON(e).uuid),
      this.alphaMap && this.alphaMap.isTexture && (r.alphaMap = this.alphaMap.toJSON(e).uuid),
      this.lightMap &&
        this.lightMap.isTexture &&
        ((r.lightMap = this.lightMap.toJSON(e).uuid),
        (r.lightMapIntensity = this.lightMapIntensity)),
      this.aoMap &&
        this.aoMap.isTexture &&
        ((r.aoMap = this.aoMap.toJSON(e).uuid), (r.aoMapIntensity = this.aoMapIntensity)),
      this.bumpMap &&
        this.bumpMap.isTexture &&
        ((r.bumpMap = this.bumpMap.toJSON(e).uuid), (r.bumpScale = this.bumpScale)),
      this.normalMap &&
        this.normalMap.isTexture &&
        ((r.normalMap = this.normalMap.toJSON(e).uuid),
        (r.normalMapType = this.normalMapType),
        (r.normalScale = this.normalScale.toArray())),
      this.displacementMap &&
        this.displacementMap.isTexture &&
        ((r.displacementMap = this.displacementMap.toJSON(e).uuid),
        (r.displacementScale = this.displacementScale),
        (r.displacementBias = this.displacementBias)),
      this.roughnessMap &&
        this.roughnessMap.isTexture &&
        (r.roughnessMap = this.roughnessMap.toJSON(e).uuid),
      this.metalnessMap &&
        this.metalnessMap.isTexture &&
        (r.metalnessMap = this.metalnessMap.toJSON(e).uuid),
      this.emissiveMap &&
        this.emissiveMap.isTexture &&
        (r.emissiveMap = this.emissiveMap.toJSON(e).uuid),
      this.specularMap &&
        this.specularMap.isTexture &&
        (r.specularMap = this.specularMap.toJSON(e).uuid),
      this.specularIntensityMap &&
        this.specularIntensityMap.isTexture &&
        (r.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid),
      this.specularColorMap &&
        this.specularColorMap.isTexture &&
        (r.specularColorMap = this.specularColorMap.toJSON(e).uuid),
      this.envMap &&
        this.envMap.isTexture &&
        ((r.envMap = this.envMap.toJSON(e).uuid),
        void 0 !== this.combine && (r.combine = this.combine)),
      void 0 !== this.envMapIntensity && (r.envMapIntensity = this.envMapIntensity),
      void 0 !== this.reflectivity && (r.reflectivity = this.reflectivity),
      void 0 !== this.refractionRatio && (r.refractionRatio = this.refractionRatio),
      this.gradientMap &&
        this.gradientMap.isTexture &&
        (r.gradientMap = this.gradientMap.toJSON(e).uuid),
      void 0 !== this.transmission && (r.transmission = this.transmission),
      this.transmissionMap &&
        this.transmissionMap.isTexture &&
        (r.transmissionMap = this.transmissionMap.toJSON(e).uuid),
      void 0 !== this.thickness && (r.thickness = this.thickness),
      this.thicknessMap &&
        this.thicknessMap.isTexture &&
        (r.thicknessMap = this.thicknessMap.toJSON(e).uuid),
      void 0 !== this.attenuationDistance &&
        this.attenuationDistance !== 1 / 0 &&
        (r.attenuationDistance = this.attenuationDistance),
      void 0 !== this.attenuationColor && (r.attenuationColor = this.attenuationColor.getHex()),
      void 0 !== this.size && (r.size = this.size),
      null !== this.shadowSide && (r.shadowSide = this.shadowSide),
      void 0 !== this.sizeAttenuation && (r.sizeAttenuation = this.sizeAttenuation),
      1 !== this.blending && (r.blending = this.blending),
      0 !== this.side && (r.side = this.side),
      this.vertexColors && (r.vertexColors = !0),
      this.opacity < 1 && (r.opacity = this.opacity),
      !0 === this.transparent && (r.transparent = this.transparent),
      (r.depthFunc = this.depthFunc),
      (r.depthTest = this.depthTest),
      (r.depthWrite = this.depthWrite),
      (r.colorWrite = this.colorWrite),
      (r.stencilWrite = this.stencilWrite),
      (r.stencilWriteMask = this.stencilWriteMask),
      (r.stencilFunc = this.stencilFunc),
      (r.stencilRef = this.stencilRef),
      (r.stencilFuncMask = this.stencilFuncMask),
      (r.stencilFail = this.stencilFail),
      (r.stencilZFail = this.stencilZFail),
      (r.stencilZPass = this.stencilZPass),
      void 0 !== this.rotation && 0 !== this.rotation && (r.rotation = this.rotation),
      !0 === this.polygonOffset && (r.polygonOffset = !0),
      0 !== this.polygonOffsetFactor && (r.polygonOffsetFactor = this.polygonOffsetFactor),
      0 !== this.polygonOffsetUnits && (r.polygonOffsetUnits = this.polygonOffsetUnits),
      void 0 !== this.linewidth && 1 !== this.linewidth && (r.linewidth = this.linewidth),
      void 0 !== this.dashSize && (r.dashSize = this.dashSize),
      void 0 !== this.gapSize && (r.gapSize = this.gapSize),
      void 0 !== this.scale && (r.scale = this.scale),
      !0 === this.dithering && (r.dithering = !0),
      this.alphaTest > 0 && (r.alphaTest = this.alphaTest),
      !0 === this.alphaToCoverage && (r.alphaToCoverage = this.alphaToCoverage),
      !0 === this.premultipliedAlpha && (r.premultipliedAlpha = this.premultipliedAlpha),
      !0 === this.forceSinglePass && (r.forceSinglePass = this.forceSinglePass),
      !0 === this.wireframe && (r.wireframe = this.wireframe),
      this.wireframeLinewidth > 1 && (r.wireframeLinewidth = this.wireframeLinewidth),
      'round' !== this.wireframeLinecap && (r.wireframeLinecap = this.wireframeLinecap),
      'round' !== this.wireframeLinejoin && (r.wireframeLinejoin = this.wireframeLinejoin),
      !0 === this.flatShading && (r.flatShading = this.flatShading),
      !1 === this.visible && (r.visible = !1),
      !1 === this.toneMapped && (r.toneMapped = !1),
      !1 === this.fog && (r.fog = !1),
      Object.keys(this.userData).length > 0 && (r.userData = this.userData),
      t)
    ) {
      const t = n(e.textures),
        i = n(e.images);
      t.length > 0 && (r.textures = t), i.length > 0 && (r.images = i);
    }
    return r;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    (this.name = e.name),
      (this.blending = e.blending),
      (this.side = e.side),
      (this.vertexColors = e.vertexColors),
      (this.opacity = e.opacity),
      (this.transparent = e.transparent),
      (this.blendSrc = e.blendSrc),
      (this.blendDst = e.blendDst),
      (this.blendEquation = e.blendEquation),
      (this.blendSrcAlpha = e.blendSrcAlpha),
      (this.blendDstAlpha = e.blendDstAlpha),
      (this.blendEquationAlpha = e.blendEquationAlpha),
      (this.depthFunc = e.depthFunc),
      (this.depthTest = e.depthTest),
      (this.depthWrite = e.depthWrite),
      (this.stencilWriteMask = e.stencilWriteMask),
      (this.stencilFunc = e.stencilFunc),
      (this.stencilRef = e.stencilRef),
      (this.stencilFuncMask = e.stencilFuncMask),
      (this.stencilFail = e.stencilFail),
      (this.stencilZFail = e.stencilZFail),
      (this.stencilZPass = e.stencilZPass),
      (this.stencilWrite = e.stencilWrite);
    const t = e.clippingPlanes;
    let r = null;
    if (null !== t) {
      const e = t.length;
      r = new Array(e);
      for (let n = 0; n !== e; ++n) r[n] = t[n].clone();
    }
    return (
      (this.clippingPlanes = r),
      (this.clipIntersection = e.clipIntersection),
      (this.clipShadows = e.clipShadows),
      (this.shadowSide = e.shadowSide),
      (this.colorWrite = e.colorWrite),
      (this.precision = e.precision),
      (this.polygonOffset = e.polygonOffset),
      (this.polygonOffsetFactor = e.polygonOffsetFactor),
      (this.polygonOffsetUnits = e.polygonOffsetUnits),
      (this.dithering = e.dithering),
      (this.alphaTest = e.alphaTest),
      (this.alphaToCoverage = e.alphaToCoverage),
      (this.premultipliedAlpha = e.premultipliedAlpha),
      (this.forceSinglePass = e.forceSinglePass),
      (this.visible = e.visible),
      (this.toneMapped = e.toneMapped),
      (this.userData = JSON.parse(JSON.stringify(e.userData))),
      this
    );
  }
  dispose() {
    this.dispatchEvent({ type: 'dispose' });
  }
  set needsUpdate(e) {
    !0 === e && this.version++;
  }
}
const _colorKeywords = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  },
  _hslA = { h: 0, s: 0, l: 0 },
  _hslB = { h: 0, s: 0, l: 0 };
function hue2rgb(e, t, r) {
  return (
    r < 0 && (r += 1),
    r > 1 && (r -= 1),
    r < 1 / 6 ? e + 6 * (t - e) * r : r < 0.5 ? t : r < 2 / 3 ? e + 6 * (t - e) * (2 / 3 - r) : e
  );
}
class Color {
  constructor(e, t, r) {
    return (
      (this.isColor = !0),
      (this.r = 1),
      (this.g = 1),
      (this.b = 1),
      void 0 === t && void 0 === r ? this.set(e) : this.setRGB(e, t, r)
    );
  }
  set(e) {
    return (
      e && e.isColor
        ? this.copy(e)
        : 'number' == typeof e
          ? this.setHex(e)
          : 'string' == typeof e && this.setStyle(e),
      this
    );
  }
  setScalar(e) {
    return (this.r = e), (this.g = e), (this.b = e), this;
  }
  setHex(e, t = 'srgb') {
    return (
      (e = Math.floor(e)),
      (this.r = ((e >> 16) & 255) / 255),
      (this.g = ((e >> 8) & 255) / 255),
      (this.b = (255 & e) / 255),
      ColorManagement.toWorkingColorSpace(this, t),
      this
    );
  }
  setRGB(e, t, r, n = ColorManagement.workingColorSpace) {
    return (
      (this.r = e), (this.g = t), (this.b = r), ColorManagement.toWorkingColorSpace(this, n), this
    );
  }
  setHSL(e, t, r, n = ColorManagement.workingColorSpace) {
    if (((e = euclideanModulo(e, 1)), (t = clamp(t, 0, 1)), (r = clamp(r, 0, 1)), 0 === t))
      this.r = this.g = this.b = r;
    else {
      const n = r <= 0.5 ? r * (1 + t) : r + t - r * t,
        i = 2 * r - n;
      (this.r = hue2rgb(i, n, e + 1 / 3)),
        (this.g = hue2rgb(i, n, e)),
        (this.b = hue2rgb(i, n, e - 1 / 3));
    }
    return ColorManagement.toWorkingColorSpace(this, n), this;
  }
  setStyle(e, t = 'srgb') {
    function r(t) {
      void 0 !== t &&
        parseFloat(t) < 1 &&
        console.warn('THREE.Color: Alpha component of ' + e + ' will be ignored.');
    }
    let n;
    if ((n = /^(\w+)\(([^\)]*)\)/.exec(e))) {
      let i;
      const a = n[1],
        s = n[2];
      switch (a) {
        case 'rgb':
        case 'rgba':
          if ((i = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s)))
            return (
              (this.r = Math.min(255, parseInt(i[1], 10)) / 255),
              (this.g = Math.min(255, parseInt(i[2], 10)) / 255),
              (this.b = Math.min(255, parseInt(i[3], 10)) / 255),
              ColorManagement.toWorkingColorSpace(this, t),
              r(i[4]),
              this
            );
          if ((i = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s)))
            return (
              (this.r = Math.min(100, parseInt(i[1], 10)) / 100),
              (this.g = Math.min(100, parseInt(i[2], 10)) / 100),
              (this.b = Math.min(100, parseInt(i[3], 10)) / 100),
              ColorManagement.toWorkingColorSpace(this, t),
              r(i[4]),
              this
            );
          break;
        case 'hsl':
        case 'hsla':
          if (
            (i =
              /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                s,
              ))
          ) {
            const e = parseFloat(i[1]) / 360,
              n = parseFloat(i[2]) / 100,
              a = parseFloat(i[3]) / 100;
            return r(i[4]), this.setHSL(e, n, a, t);
          }
          break;
        default:
          console.warn('THREE.Color: Unknown color model ' + e);
      }
    } else if ((n = /^\#([A-Fa-f\d]+)$/.exec(e))) {
      const r = n[1],
        i = r.length;
      if (3 === i)
        return this.setRGB(
          parseInt(r.charAt(0), 16) / 15,
          parseInt(r.charAt(1), 16) / 15,
          parseInt(r.charAt(2), 16) / 15,
          t,
        );
      if (6 === i) return this.setHex(parseInt(r, 16), t);
      console.warn('THREE.Color: Invalid hex color ' + e);
    } else if (e && e.length > 0) return this.setColorName(e, t);
    return this;
  }
  setColorName(e, t = 'srgb') {
    const r = _colorKeywords[e.toLowerCase()];
    return void 0 !== r ? this.setHex(r, t) : console.warn('THREE.Color: Unknown color ' + e), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return (this.r = e.r), (this.g = e.g), (this.b = e.b), this;
  }
  copySRGBToLinear(e) {
    return (
      (this.r = SRGBToLinear(e.r)), (this.g = SRGBToLinear(e.g)), (this.b = SRGBToLinear(e.b)), this
    );
  }
  copyLinearToSRGB(e) {
    return (
      (this.r = LinearToSRGB(e.r)), (this.g = LinearToSRGB(e.g)), (this.b = LinearToSRGB(e.b)), this
    );
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(e = 'srgb') {
    return (
      ColorManagement.fromWorkingColorSpace(_color.copy(this), e),
      (clamp(255 * _color.r, 0, 255) << 16) ^
        (clamp(255 * _color.g, 0, 255) << 8) ^
        (clamp(255 * _color.b, 0, 255) << 0)
    );
  }
  getHexString(e = 'srgb') {
    return ('000000' + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, t = ColorManagement.workingColorSpace) {
    ColorManagement.fromWorkingColorSpace(_color.copy(this), t);
    const r = _color.r,
      n = _color.g,
      i = _color.b,
      a = Math.max(r, n, i),
      s = Math.min(r, n, i);
    let o, l;
    const c = (s + a) / 2;
    if (s === a) (o = 0), (l = 0);
    else {
      const e = a - s;
      switch (((l = c <= 0.5 ? e / (a + s) : e / (2 - a - s)), a)) {
        case r:
          o = (n - i) / e + (n < i ? 6 : 0);
          break;
        case n:
          o = (i - r) / e + 2;
          break;
        case i:
          o = (r - n) / e + 4;
      }
      o /= 6;
    }
    return (e.h = o), (e.s = l), (e.l = c), e;
  }
  getRGB(e, t = ColorManagement.workingColorSpace) {
    return (
      ColorManagement.fromWorkingColorSpace(_color.copy(this), t),
      (e.r = _color.r),
      (e.g = _color.g),
      (e.b = _color.b),
      e
    );
  }
  getStyle(e = 'srgb') {
    ColorManagement.fromWorkingColorSpace(_color.copy(this), e);
    const t = _color.r,
      r = _color.g,
      n = _color.b;
    return 'srgb' !== e
      ? `color(${e} ${t.toFixed(3)} ${r.toFixed(3)} ${n.toFixed(3)})`
      : `rgb(${(255 * t) | 0},${(255 * r) | 0},${(255 * n) | 0})`;
  }
  offsetHSL(e, t, r) {
    return (
      this.getHSL(_hslA),
      (_hslA.h += e),
      (_hslA.s += t),
      (_hslA.l += r),
      this.setHSL(_hslA.h, _hslA.s, _hslA.l),
      this
    );
  }
  add(e) {
    return (this.r += e.r), (this.g += e.g), (this.b += e.b), this;
  }
  addColors(e, t) {
    return (this.r = e.r + t.r), (this.g = e.g + t.g), (this.b = e.b + t.b), this;
  }
  addScalar(e) {
    return (this.r += e), (this.g += e), (this.b += e), this;
  }
  sub(e) {
    return (
      (this.r = Math.max(0, this.r - e.r)),
      (this.g = Math.max(0, this.g - e.g)),
      (this.b = Math.max(0, this.b - e.b)),
      this
    );
  }
  multiply(e) {
    return (this.r *= e.r), (this.g *= e.g), (this.b *= e.b), this;
  }
  multiplyScalar(e) {
    return (this.r *= e), (this.g *= e), (this.b *= e), this;
  }
  lerp(e, t) {
    return (
      (this.r += (e.r - this.r) * t),
      (this.g += (e.g - this.g) * t),
      (this.b += (e.b - this.b) * t),
      this
    );
  }
  lerpColors(e, t, r) {
    return (
      (this.r = e.r + (t.r - e.r) * r),
      (this.g = e.g + (t.g - e.g) * r),
      (this.b = e.b + (t.b - e.b) * r),
      this
    );
  }
  lerpHSL(e, t) {
    this.getHSL(_hslA), e.getHSL(_hslB);
    const r = lerp(_hslA.h, _hslB.h, t),
      n = lerp(_hslA.s, _hslB.s, t),
      i = lerp(_hslA.l, _hslB.l, t);
    return this.setHSL(r, n, i), this;
  }
  setFromVector3(e) {
    return (this.r = e.x), (this.g = e.y), (this.b = e.z), this;
  }
  applyMatrix3(e) {
    const t = this.r,
      r = this.g,
      n = this.b,
      i = e.elements;
    return (
      (this.r = i[0] * t + i[3] * r + i[6] * n),
      (this.g = i[1] * t + i[4] * r + i[7] * n),
      (this.b = i[2] * t + i[5] * r + i[8] * n),
      this
    );
  }
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  fromArray(e, t = 0) {
    return (this.r = e[t]), (this.g = e[t + 1]), (this.b = e[t + 2]), this;
  }
  toArray(e = [], t = 0) {
    return (e[t] = this.r), (e[t + 1] = this.g), (e[t + 2] = this.b), e;
  }
  fromBufferAttribute(e, t) {
    return (this.r = e.getX(t)), (this.g = e.getY(t)), (this.b = e.getZ(t)), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const _color = new Color();
Color.NAMES = _colorKeywords;
class MeshBasicMaterial extends Material {
  constructor(e) {
    super(),
      (this.isMeshBasicMaterial = !0),
      (this.type = 'MeshBasicMaterial'),
      (this.color = new Color(16777215)),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.specularMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.combine = 0),
      (this.reflectivity = 1),
      (this.refractionRatio = 0.98),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = 'round'),
      (this.wireframeLinejoin = 'round'),
      (this.fog = !0),
      this.setValues(e);
  }
  copy(e) {
    return (
      super.copy(e),
      this.color.copy(e.color),
      (this.map = e.map),
      (this.lightMap = e.lightMap),
      (this.lightMapIntensity = e.lightMapIntensity),
      (this.aoMap = e.aoMap),
      (this.aoMapIntensity = e.aoMapIntensity),
      (this.specularMap = e.specularMap),
      (this.alphaMap = e.alphaMap),
      (this.envMap = e.envMap),
      (this.combine = e.combine),
      (this.reflectivity = e.reflectivity),
      (this.refractionRatio = e.refractionRatio),
      (this.wireframe = e.wireframe),
      (this.wireframeLinewidth = e.wireframeLinewidth),
      (this.wireframeLinecap = e.wireframeLinecap),
      (this.wireframeLinejoin = e.wireframeLinejoin),
      (this.fog = e.fog),
      this
    );
  }
}
const _tables = _generateTables();
function _generateTables() {
  const e = new ArrayBuffer(4),
    t = new Float32Array(e),
    r = new Uint32Array(e),
    n = new Uint32Array(512),
    i = new Uint32Array(512);
  for (let e = 0; e < 256; ++e) {
    const t = e - 127;
    t < -27
      ? ((n[e] = 0), (n[256 | e] = 32768), (i[e] = 24), (i[256 | e] = 24))
      : t < -14
        ? ((n[e] = 1024 >> (-t - 14)),
          (n[256 | e] = (1024 >> (-t - 14)) | 32768),
          (i[e] = -t - 1),
          (i[256 | e] = -t - 1))
        : t <= 15
          ? ((n[e] = (t + 15) << 10),
            (n[256 | e] = ((t + 15) << 10) | 32768),
            (i[e] = 13),
            (i[256 | e] = 13))
          : t < 128
            ? ((n[e] = 31744), (n[256 | e] = 64512), (i[e] = 24), (i[256 | e] = 24))
            : ((n[e] = 31744), (n[256 | e] = 64512), (i[e] = 13), (i[256 | e] = 13));
  }
  const a = new Uint32Array(2048),
    s = new Uint32Array(64),
    o = new Uint32Array(64);
  for (let e = 1; e < 1024; ++e) {
    let t = e << 13,
      r = 0;
    for (; 0 == (8388608 & t); ) (t <<= 1), (r -= 8388608);
    (t &= -8388609), (r += 947912704), (a[e] = t | r);
  }
  for (let e = 1024; e < 2048; ++e) a[e] = 939524096 + ((e - 1024) << 13);
  for (let e = 1; e < 31; ++e) s[e] = e << 23;
  (s[31] = 1199570944), (s[32] = 2147483648);
  for (let e = 33; e < 63; ++e) s[e] = 2147483648 + ((e - 32) << 23);
  s[63] = 3347054592;
  for (let e = 1; e < 64; ++e) 32 !== e && (o[e] = 1024);
  return {
    floatView: t,
    uint32View: r,
    baseTable: n,
    shiftTable: i,
    mantissaTable: a,
    exponentTable: s,
    offsetTable: o,
  };
}
function toHalfFloat(e) {
  Math.abs(e) > 65504 && console.warn('THREE.DataUtils.toHalfFloat(): Value out of range.'),
    (e = clamp(e, -65504, 65504)),
    (_tables.floatView[0] = e);
  const t = _tables.uint32View[0],
    r = (t >> 23) & 511;
  return _tables.baseTable[r] + ((8388607 & t) >> _tables.shiftTable[r]);
}
function fromHalfFloat(e) {
  const t = e >> 10;
  return (
    (_tables.uint32View[0] =
      _tables.mantissaTable[_tables.offsetTable[t] + (1023 & e)] + _tables.exponentTable[t]),
    _tables.floatView[0]
  );
}
const DataUtils = { toHalfFloat: toHalfFloat, fromHalfFloat: fromHalfFloat },
  _vector$8 = new Vector3(),
  _vector2$1 = new Vector2();
class BufferAttribute {
  constructor(e, t, r = !1) {
    if (Array.isArray(e))
      throw new TypeError('THREE.BufferAttribute: array should be a Typed Array.');
    (this.isBufferAttribute = !0),
      (this.name = ''),
      (this.array = e),
      (this.itemSize = t),
      (this.count = void 0 !== e ? e.length / t : 0),
      (this.normalized = r),
      (this.usage = 35044),
      (this.updateRange = { offset: 0, count: -1 }),
      (this.version = 0);
  }
  onUploadCallback() {}
  set needsUpdate(e) {
    !0 === e && this.version++;
  }
  setUsage(e) {
    return (this.usage = e), this;
  }
  copy(e) {
    return (
      (this.name = e.name),
      (this.array = new e.array.constructor(e.array)),
      (this.itemSize = e.itemSize),
      (this.count = e.count),
      (this.normalized = e.normalized),
      (this.usage = e.usage),
      this
    );
  }
  copyAt(e, t, r) {
    (e *= this.itemSize), (r *= t.itemSize);
    for (let n = 0, i = this.itemSize; n < i; n++) this.array[e + n] = t.array[r + n];
    return this;
  }
  copyArray(e) {
    return this.array.set(e), this;
  }
  applyMatrix3(e) {
    if (2 === this.itemSize)
      for (let t = 0, r = this.count; t < r; t++)
        _vector2$1.fromBufferAttribute(this, t),
          _vector2$1.applyMatrix3(e),
          this.setXY(t, _vector2$1.x, _vector2$1.y);
    else if (3 === this.itemSize)
      for (let t = 0, r = this.count; t < r; t++)
        _vector$8.fromBufferAttribute(this, t),
          _vector$8.applyMatrix3(e),
          this.setXYZ(t, _vector$8.x, _vector$8.y, _vector$8.z);
    return this;
  }
  applyMatrix4(e) {
    for (let t = 0, r = this.count; t < r; t++)
      _vector$8.fromBufferAttribute(this, t),
        _vector$8.applyMatrix4(e),
        this.setXYZ(t, _vector$8.x, _vector$8.y, _vector$8.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, r = this.count; t < r; t++)
      _vector$8.fromBufferAttribute(this, t),
        _vector$8.applyNormalMatrix(e),
        this.setXYZ(t, _vector$8.x, _vector$8.y, _vector$8.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, r = this.count; t < r; t++)
      _vector$8.fromBufferAttribute(this, t),
        _vector$8.transformDirection(e),
        this.setXYZ(t, _vector$8.x, _vector$8.y, _vector$8.z);
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = denormalize(t, this.array)), t;
  }
  setX(e, t) {
    return (
      this.normalized && (t = normalize(t, this.array)), (this.array[e * this.itemSize] = t), this
    );
  }
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = denormalize(t, this.array)), t;
  }
  setY(e, t) {
    return (
      this.normalized && (t = normalize(t, this.array)),
      (this.array[e * this.itemSize + 1] = t),
      this
    );
  }
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = denormalize(t, this.array)), t;
  }
  setZ(e, t) {
    return (
      this.normalized && (t = normalize(t, this.array)),
      (this.array[e * this.itemSize + 2] = t),
      this
    );
  }
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = denormalize(t, this.array)), t;
  }
  setW(e, t) {
    return (
      this.normalized && (t = normalize(t, this.array)),
      (this.array[e * this.itemSize + 3] = t),
      this
    );
  }
  setXY(e, t, r) {
    return (
      (e *= this.itemSize),
      this.normalized && ((t = normalize(t, this.array)), (r = normalize(r, this.array))),
      (this.array[e + 0] = t),
      (this.array[e + 1] = r),
      this
    );
  }
  setXYZ(e, t, r, n) {
    return (
      (e *= this.itemSize),
      this.normalized &&
        ((t = normalize(t, this.array)),
        (r = normalize(r, this.array)),
        (n = normalize(n, this.array))),
      (this.array[e + 0] = t),
      (this.array[e + 1] = r),
      (this.array[e + 2] = n),
      this
    );
  }
  setXYZW(e, t, r, n, i) {
    return (
      (e *= this.itemSize),
      this.normalized &&
        ((t = normalize(t, this.array)),
        (r = normalize(r, this.array)),
        (n = normalize(n, this.array)),
        (i = normalize(i, this.array))),
      (this.array[e + 0] = t),
      (this.array[e + 1] = r),
      (this.array[e + 2] = n),
      (this.array[e + 3] = i),
      this
    );
  }
  onUpload(e) {
    return (this.onUploadCallback = e), this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized,
    };
    return (
      '' !== this.name && (e.name = this.name),
      35044 !== this.usage && (e.usage = this.usage),
      (0 === this.updateRange.offset && -1 === this.updateRange.count) ||
        (e.updateRange = this.updateRange),
      e
    );
  }
  copyColorsArray() {
    console.error('THREE.BufferAttribute: copyColorsArray() was removed in r144.');
  }
  copyVector2sArray() {
    console.error('THREE.BufferAttribute: copyVector2sArray() was removed in r144.');
  }
  copyVector3sArray() {
    console.error('THREE.BufferAttribute: copyVector3sArray() was removed in r144.');
  }
  copyVector4sArray() {
    console.error('THREE.BufferAttribute: copyVector4sArray() was removed in r144.');
  }
}
class Int8BufferAttribute extends BufferAttribute {
  constructor(e, t, r) {
    super(new Int8Array(e), t, r);
  }
}
class Uint8BufferAttribute extends BufferAttribute {
  constructor(e, t, r) {
    super(new Uint8Array(e), t, r);
  }
}
class Uint8ClampedBufferAttribute extends BufferAttribute {
  constructor(e, t, r) {
    super(new Uint8ClampedArray(e), t, r);
  }
}
class Int16BufferAttribute extends BufferAttribute {
  constructor(e, t, r) {
    super(new Int16Array(e), t, r);
  }
}
class Uint16BufferAttribute extends BufferAttribute {
  constructor(e, t, r) {
    super(new Uint16Array(e), t, r);
  }
}
class Int32BufferAttribute extends BufferAttribute {
  constructor(e, t, r) {
    super(new Int32Array(e), t, r);
  }
}
class Uint32BufferAttribute extends BufferAttribute {
  constructor(e, t, r) {
    super(new Uint32Array(e), t, r);
  }
}
class Float16BufferAttribute extends BufferAttribute {
  constructor(e, t, r) {
    super(new Uint16Array(e), t, r), (this.isFloat16BufferAttribute = !0);
  }
  getX(e) {
    let t = fromHalfFloat(this.array[e * this.itemSize]);
    return this.normalized && (t = denormalize(t, this.array)), t;
  }
  setX(e, t) {
    return (
      this.normalized && (t = normalize(t, this.array)),
      (this.array[e * this.itemSize] = toHalfFloat(t)),
      this
    );
  }
  getY(e) {
    let t = fromHalfFloat(this.array[e * this.itemSize + 1]);
    return this.normalized && (t = denormalize(t, this.array)), t;
  }
  setY(e, t) {
    return (
      this.normalized && (t = normalize(t, this.array)),
      (this.array[e * this.itemSize + 1] = toHalfFloat(t)),
      this
    );
  }
  getZ(e) {
    let t = fromHalfFloat(this.array[e * this.itemSize + 2]);
    return this.normalized && (t = denormalize(t, this.array)), t;
  }
  setZ(e, t) {
    return (
      this.normalized && (t = normalize(t, this.array)),
      (this.array[e * this.itemSize + 2] = toHalfFloat(t)),
      this
    );
  }
  getW(e) {
    let t = fromHalfFloat(this.array[e * this.itemSize + 3]);
    return this.normalized && (t = denormalize(t, this.array)), t;
  }
  setW(e, t) {
    return (
      this.normalized && (t = normalize(t, this.array)),
      (this.array[e * this.itemSize + 3] = toHalfFloat(t)),
      this
    );
  }
  setXY(e, t, r) {
    return (
      (e *= this.itemSize),
      this.normalized && ((t = normalize(t, this.array)), (r = normalize(r, this.array))),
      (this.array[e + 0] = toHalfFloat(t)),
      (this.array[e + 1] = toHalfFloat(r)),
      this
    );
  }
  setXYZ(e, t, r, n) {
    return (
      (e *= this.itemSize),
      this.normalized &&
        ((t = normalize(t, this.array)),
        (r = normalize(r, this.array)),
        (n = normalize(n, this.array))),
      (this.array[e + 0] = toHalfFloat(t)),
      (this.array[e + 1] = toHalfFloat(r)),
      (this.array[e + 2] = toHalfFloat(n)),
      this
    );
  }
  setXYZW(e, t, r, n, i) {
    return (
      (e *= this.itemSize),
      this.normalized &&
        ((t = normalize(t, this.array)),
        (r = normalize(r, this.array)),
        (n = normalize(n, this.array)),
        (i = normalize(i, this.array))),
      (this.array[e + 0] = toHalfFloat(t)),
      (this.array[e + 1] = toHalfFloat(r)),
      (this.array[e + 2] = toHalfFloat(n)),
      (this.array[e + 3] = toHalfFloat(i)),
      this
    );
  }
}
class Float32BufferAttribute extends BufferAttribute {
  constructor(e, t, r) {
    super(new Float32Array(e), t, r);
  }
}
class Float64BufferAttribute extends BufferAttribute {
  constructor(e, t, r) {
    super(new Float64Array(e), t, r);
  }
}
let _id$1 = 0;
const _m1 = new Matrix4(),
  _obj = new Object3D(),
  _offset = new Vector3(),
  _box$1 = new Box3(),
  _boxMorphTargets = new Box3(),
  _vector$7 = new Vector3();
class BufferGeometry extends EventDispatcher {
  constructor() {
    super(),
      (this.isBufferGeometry = !0),
      Object.defineProperty(this, 'id', { value: _id$1++ }),
      (this.uuid = generateUUID()),
      (this.name = ''),
      (this.type = 'BufferGeometry'),
      (this.index = null),
      (this.attributes = {}),
      (this.morphAttributes = {}),
      (this.morphTargetsRelative = !1),
      (this.groups = []),
      (this.boundingBox = null),
      (this.boundingSphere = null),
      (this.drawRange = { start: 0, count: 1 / 0 }),
      (this.userData = {});
  }
  getIndex() {
    return this.index;
  }
  setIndex(e) {
    return (
      Array.isArray(e)
        ? (this.index = new (arrayNeedsUint32(e) ? Uint32BufferAttribute : Uint16BufferAttribute)(
            e,
            1,
          ))
        : (this.index = e),
      this
    );
  }
  getAttribute(e) {
    return this.attributes[e];
  }
  setAttribute(e, t) {
    return (this.attributes[e] = t), this;
  }
  deleteAttribute(e) {
    return delete this.attributes[e], this;
  }
  hasAttribute(e) {
    return void 0 !== this.attributes[e];
  }
  addGroup(e, t, r = 0) {
    this.groups.push({ start: e, count: t, materialIndex: r });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(e, t) {
    (this.drawRange.start = e), (this.drawRange.count = t);
  }
  applyMatrix4(e) {
    const t = this.attributes.position;
    void 0 !== t && (t.applyMatrix4(e), (t.needsUpdate = !0));
    const r = this.attributes.normal;
    if (void 0 !== r) {
      const t = new Matrix3().getNormalMatrix(e);
      r.applyNormalMatrix(t), (r.needsUpdate = !0);
    }
    const n = this.attributes.tangent;
    return (
      void 0 !== n && (n.transformDirection(e), (n.needsUpdate = !0)),
      null !== this.boundingBox && this.computeBoundingBox(),
      null !== this.boundingSphere && this.computeBoundingSphere(),
      this
    );
  }
  applyQuaternion(e) {
    return _m1.makeRotationFromQuaternion(e), this.applyMatrix4(_m1), this;
  }
  rotateX(e) {
    return _m1.makeRotationX(e), this.applyMatrix4(_m1), this;
  }
  rotateY(e) {
    return _m1.makeRotationY(e), this.applyMatrix4(_m1), this;
  }
  rotateZ(e) {
    return _m1.makeRotationZ(e), this.applyMatrix4(_m1), this;
  }
  translate(e, t, r) {
    return _m1.makeTranslation(e, t, r), this.applyMatrix4(_m1), this;
  }
  scale(e, t, r) {
    return _m1.makeScale(e, t, r), this.applyMatrix4(_m1), this;
  }
  lookAt(e) {
    return _obj.lookAt(e), _obj.updateMatrix(), this.applyMatrix4(_obj.matrix), this;
  }
  center() {
    return (
      this.computeBoundingBox(),
      this.boundingBox.getCenter(_offset).negate(),
      this.translate(_offset.x, _offset.y, _offset.z),
      this
    );
  }
  setFromPoints(e) {
    const t = [];
    for (let r = 0, n = e.length; r < n; r++) {
      const n = e[r];
      t.push(n.x, n.y, n.z || 0);
    }
    return this.setAttribute('position', new Float32BufferAttribute(t, 3)), this;
  }
  computeBoundingBox() {
    null === this.boundingBox && (this.boundingBox = new Box3());
    const e = this.attributes.position,
      t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute)
      return (
        console.error(
          'THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',
          this,
        ),
        void this.boundingBox.set(
          new Vector3(-1 / 0, -1 / 0, -1 / 0),
          new Vector3(1 / 0, 1 / 0, 1 / 0),
        )
      );
    if (void 0 !== e) {
      if ((this.boundingBox.setFromBufferAttribute(e), t))
        for (let e = 0, r = t.length; e < r; e++) {
          const r = t[e];
          _box$1.setFromBufferAttribute(r),
            this.morphTargetsRelative
              ? (_vector$7.addVectors(this.boundingBox.min, _box$1.min),
                this.boundingBox.expandByPoint(_vector$7),
                _vector$7.addVectors(this.boundingBox.max, _box$1.max),
                this.boundingBox.expandByPoint(_vector$7))
              : (this.boundingBox.expandByPoint(_box$1.min),
                this.boundingBox.expandByPoint(_box$1.max));
        }
    } else this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) ||
      isNaN(this.boundingBox.min.y) ||
      isNaN(this.boundingBox.min.z)) &&
      console.error(
        'THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',
        this,
      );
  }
  computeBoundingSphere() {
    null === this.boundingSphere && (this.boundingSphere = new Sphere());
    const e = this.attributes.position,
      t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute)
      return (
        console.error(
          'THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',
          this,
        ),
        void this.boundingSphere.set(new Vector3(), 1 / 0)
      );
    if (e) {
      const r = this.boundingSphere.center;
      if ((_box$1.setFromBufferAttribute(e), t))
        for (let e = 0, r = t.length; e < r; e++) {
          const r = t[e];
          _boxMorphTargets.setFromBufferAttribute(r),
            this.morphTargetsRelative
              ? (_vector$7.addVectors(_box$1.min, _boxMorphTargets.min),
                _box$1.expandByPoint(_vector$7),
                _vector$7.addVectors(_box$1.max, _boxMorphTargets.max),
                _box$1.expandByPoint(_vector$7))
              : (_box$1.expandByPoint(_boxMorphTargets.min),
                _box$1.expandByPoint(_boxMorphTargets.max));
        }
      _box$1.getCenter(r);
      let n = 0;
      for (let t = 0, i = e.count; t < i; t++)
        _vector$7.fromBufferAttribute(e, t), (n = Math.max(n, r.distanceToSquared(_vector$7)));
      if (t)
        for (let i = 0, a = t.length; i < a; i++) {
          const a = t[i],
            s = this.morphTargetsRelative;
          for (let t = 0, i = a.count; t < i; t++)
            _vector$7.fromBufferAttribute(a, t),
              s && (_offset.fromBufferAttribute(e, t), _vector$7.add(_offset)),
              (n = Math.max(n, r.distanceToSquared(_vector$7)));
        }
      (this.boundingSphere.radius = Math.sqrt(n)),
        isNaN(this.boundingSphere.radius) &&
          console.error(
            'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',
            this,
          );
    }
  }
  computeTangents() {
    const e = this.index,
      t = this.attributes;
    if (null === e || void 0 === t.position || void 0 === t.normal || void 0 === t.uv)
      return void console.error(
        'THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)',
      );
    const r = e.array,
      n = t.position.array,
      i = t.normal.array,
      a = t.uv.array,
      s = n.length / 3;
    !1 === this.hasAttribute('tangent') &&
      this.setAttribute('tangent', new BufferAttribute(new Float32Array(4 * s), 4));
    const o = this.getAttribute('tangent').array,
      l = [],
      c = [];
    for (let e = 0; e < s; e++) (l[e] = new Vector3()), (c[e] = new Vector3());
    const h = new Vector3(),
      u = new Vector3(),
      d = new Vector3(),
      p = new Vector2(),
      m = new Vector2(),
      f = new Vector2(),
      g = new Vector3(),
      _ = new Vector3();
    function v(e, t, r) {
      h.fromArray(n, 3 * e),
        u.fromArray(n, 3 * t),
        d.fromArray(n, 3 * r),
        p.fromArray(a, 2 * e),
        m.fromArray(a, 2 * t),
        f.fromArray(a, 2 * r),
        u.sub(h),
        d.sub(h),
        m.sub(p),
        f.sub(p);
      const i = 1 / (m.x * f.y - f.x * m.y);
      isFinite(i) &&
        (g.copy(u).multiplyScalar(f.y).addScaledVector(d, -m.y).multiplyScalar(i),
        _.copy(d).multiplyScalar(m.x).addScaledVector(u, -f.x).multiplyScalar(i),
        l[e].add(g),
        l[t].add(g),
        l[r].add(g),
        c[e].add(_),
        c[t].add(_),
        c[r].add(_));
    }
    let x = this.groups;
    0 === x.length && (x = [{ start: 0, count: r.length }]);
    for (let e = 0, t = x.length; e < t; ++e) {
      const t = x[e],
        n = t.start;
      for (let e = n, i = n + t.count; e < i; e += 3) v(r[e + 0], r[e + 1], r[e + 2]);
    }
    const y = new Vector3(),
      M = new Vector3(),
      S = new Vector3(),
      b = new Vector3();
    function T(e) {
      S.fromArray(i, 3 * e), b.copy(S);
      const t = l[e];
      y.copy(t), y.sub(S.multiplyScalar(S.dot(t))).normalize(), M.crossVectors(b, t);
      const r = M.dot(c[e]) < 0 ? -1 : 1;
      (o[4 * e] = y.x), (o[4 * e + 1] = y.y), (o[4 * e + 2] = y.z), (o[4 * e + 3] = r);
    }
    for (let e = 0, t = x.length; e < t; ++e) {
      const t = x[e],
        n = t.start;
      for (let e = n, i = n + t.count; e < i; e += 3) T(r[e + 0]), T(r[e + 1]), T(r[e + 2]);
    }
  }
  computeVertexNormals() {
    const e = this.index,
      t = this.getAttribute('position');
    if (void 0 !== t) {
      let r = this.getAttribute('normal');
      if (void 0 === r)
        (r = new BufferAttribute(new Float32Array(3 * t.count), 3)), this.setAttribute('normal', r);
      else for (let e = 0, t = r.count; e < t; e++) r.setXYZ(e, 0, 0, 0);
      const n = new Vector3(),
        i = new Vector3(),
        a = new Vector3(),
        s = new Vector3(),
        o = new Vector3(),
        l = new Vector3(),
        c = new Vector3(),
        h = new Vector3();
      if (e)
        for (let u = 0, d = e.count; u < d; u += 3) {
          const d = e.getX(u + 0),
            p = e.getX(u + 1),
            m = e.getX(u + 2);
          n.fromBufferAttribute(t, d),
            i.fromBufferAttribute(t, p),
            a.fromBufferAttribute(t, m),
            c.subVectors(a, i),
            h.subVectors(n, i),
            c.cross(h),
            s.fromBufferAttribute(r, d),
            o.fromBufferAttribute(r, p),
            l.fromBufferAttribute(r, m),
            s.add(c),
            o.add(c),
            l.add(c),
            r.setXYZ(d, s.x, s.y, s.z),
            r.setXYZ(p, o.x, o.y, o.z),
            r.setXYZ(m, l.x, l.y, l.z);
        }
      else
        for (let e = 0, s = t.count; e < s; e += 3)
          n.fromBufferAttribute(t, e + 0),
            i.fromBufferAttribute(t, e + 1),
            a.fromBufferAttribute(t, e + 2),
            c.subVectors(a, i),
            h.subVectors(n, i),
            c.cross(h),
            r.setXYZ(e + 0, c.x, c.y, c.z),
            r.setXYZ(e + 1, c.x, c.y, c.z),
            r.setXYZ(e + 2, c.x, c.y, c.z);
      this.normalizeNormals(), (r.needsUpdate = !0);
    }
  }
  merge() {
    return (
      console.error(
        'THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeGeometries() instead.',
      ),
      this
    );
  }
  normalizeNormals() {
    const e = this.attributes.normal;
    for (let t = 0, r = e.count; t < r; t++)
      _vector$7.fromBufferAttribute(e, t),
        _vector$7.normalize(),
        e.setXYZ(t, _vector$7.x, _vector$7.y, _vector$7.z);
  }
  toNonIndexed() {
    function e(e, t) {
      const r = e.array,
        n = e.itemSize,
        i = e.normalized,
        a = new r.constructor(t.length * n);
      let s = 0,
        o = 0;
      for (let i = 0, l = t.length; i < l; i++) {
        s = e.isInterleavedBufferAttribute ? t[i] * e.data.stride + e.offset : t[i] * n;
        for (let e = 0; e < n; e++) a[o++] = r[s++];
      }
      return new BufferAttribute(a, n, i);
    }
    if (null === this.index)
      return (
        console.warn('THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.'),
        this
      );
    const t = new BufferGeometry(),
      r = this.index.array,
      n = this.attributes;
    for (const i in n) {
      const a = e(n[i], r);
      t.setAttribute(i, a);
    }
    const i = this.morphAttributes;
    for (const n in i) {
      const a = [],
        s = i[n];
      for (let t = 0, n = s.length; t < n; t++) {
        const n = e(s[t], r);
        a.push(n);
      }
      t.morphAttributes[n] = a;
    }
    t.morphTargetsRelative = this.morphTargetsRelative;
    const a = this.groups;
    for (let e = 0, r = a.length; e < r; e++) {
      const r = a[e];
      t.addGroup(r.start, r.count, r.materialIndex);
    }
    return t;
  }
  toJSON() {
    const e = {
      metadata: { version: 4.5, type: 'BufferGeometry', generator: 'BufferGeometry.toJSON' },
    };
    if (
      ((e.uuid = this.uuid),
      (e.type = this.type),
      '' !== this.name && (e.name = this.name),
      Object.keys(this.userData).length > 0 && (e.userData = this.userData),
      void 0 !== this.parameters)
    ) {
      const t = this.parameters;
      for (const r in t) void 0 !== t[r] && (e[r] = t[r]);
      return e;
    }
    e.data = { attributes: {} };
    const t = this.index;
    null !== t &&
      (e.data.index = {
        type: t.array.constructor.name,
        array: Array.prototype.slice.call(t.array),
      });
    const r = this.attributes;
    for (const t in r) {
      const n = r[t];
      e.data.attributes[t] = n.toJSON(e.data);
    }
    const n = {};
    let i = !1;
    for (const t in this.morphAttributes) {
      const r = this.morphAttributes[t],
        a = [];
      for (let t = 0, n = r.length; t < n; t++) {
        const n = r[t];
        a.push(n.toJSON(e.data));
      }
      a.length > 0 && ((n[t] = a), (i = !0));
    }
    i && ((e.data.morphAttributes = n), (e.data.morphTargetsRelative = this.morphTargetsRelative));
    const a = this.groups;
    a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a)));
    const s = this.boundingSphere;
    return (
      null !== s && (e.data.boundingSphere = { center: s.center.toArray(), radius: s.radius }), e
    );
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    (this.index = null),
      (this.attributes = {}),
      (this.morphAttributes = {}),
      (this.groups = []),
      (this.boundingBox = null),
      (this.boundingSphere = null);
    const t = {};
    this.name = e.name;
    const r = e.index;
    null !== r && this.setIndex(r.clone(t));
    const n = e.attributes;
    for (const e in n) {
      const r = n[e];
      this.setAttribute(e, r.clone(t));
    }
    const i = e.morphAttributes;
    for (const e in i) {
      const r = [],
        n = i[e];
      for (let e = 0, i = n.length; e < i; e++) r.push(n[e].clone(t));
      this.morphAttributes[e] = r;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    const a = e.groups;
    for (let e = 0, t = a.length; e < t; e++) {
      const t = a[e];
      this.addGroup(t.start, t.count, t.materialIndex);
    }
    const s = e.boundingBox;
    null !== s && (this.boundingBox = s.clone());
    const o = e.boundingSphere;
    return (
      null !== o && (this.boundingSphere = o.clone()),
      (this.drawRange.start = e.drawRange.start),
      (this.drawRange.count = e.drawRange.count),
      (this.userData = e.userData),
      this
    );
  }
  dispose() {
    this.dispatchEvent({ type: 'dispose' });
  }
}
const _inverseMatrix$2 = new Matrix4(),
  _ray$2 = new Ray(),
  _sphere$4 = new Sphere(),
  _sphereHitAt = new Vector3(),
  _vA$1 = new Vector3(),
  _vB$1 = new Vector3(),
  _vC$1 = new Vector3(),
  _tempA = new Vector3(),
  _morphA = new Vector3(),
  _uvA$1 = new Vector2(),
  _uvB$1 = new Vector2(),
  _uvC$1 = new Vector2(),
  _normalA = new Vector3(),
  _normalB = new Vector3(),
  _normalC = new Vector3(),
  _intersectionPoint = new Vector3(),
  _intersectionPointWorld = new Vector3();
class Mesh extends Object3D {
  constructor(e = new BufferGeometry(), t = new MeshBasicMaterial()) {
    super(),
      (this.isMesh = !0),
      (this.type = 'Mesh'),
      (this.geometry = e),
      (this.material = t),
      this.updateMorphTargets();
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      void 0 !== e.morphTargetInfluences &&
        (this.morphTargetInfluences = e.morphTargetInfluences.slice()),
      void 0 !== e.morphTargetDictionary &&
        (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)),
      (this.material = e.material),
      (this.geometry = e.geometry),
      this
    );
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes,
      t = Object.keys(e);
    if (t.length > 0) {
      const r = e[t[0]];
      if (void 0 !== r) {
        (this.morphTargetInfluences = []), (this.morphTargetDictionary = {});
        for (let e = 0, t = r.length; e < t; e++) {
          const t = r[e].name || String(e);
          this.morphTargetInfluences.push(0), (this.morphTargetDictionary[t] = e);
        }
      }
    }
  }
  getVertexPosition(e, t) {
    const r = this.geometry,
      n = r.attributes.position,
      i = r.morphAttributes.position,
      a = r.morphTargetsRelative;
    t.fromBufferAttribute(n, e);
    const s = this.morphTargetInfluences;
    if (i && s) {
      _morphA.set(0, 0, 0);
      for (let r = 0, n = i.length; r < n; r++) {
        const n = s[r],
          o = i[r];
        0 !== n &&
          (_tempA.fromBufferAttribute(o, e),
          a ? _morphA.addScaledVector(_tempA, n) : _morphA.addScaledVector(_tempA.sub(t), n));
      }
      t.add(_morphA);
    }
    return this.isSkinnedMesh && this.applyBoneTransform(e, t), t;
  }
  raycast(e, t) {
    const r = this.geometry,
      n = this.material,
      i = this.matrixWorld;
    if (void 0 === n) return;
    if (
      (null === r.boundingSphere && r.computeBoundingSphere(),
      _sphere$4.copy(r.boundingSphere),
      _sphere$4.applyMatrix4(i),
      _ray$2.copy(e.ray).recast(e.near),
      !1 === _sphere$4.containsPoint(_ray$2.origin))
    ) {
      if (null === _ray$2.intersectSphere(_sphere$4, _sphereHitAt)) return;
      if (_ray$2.origin.distanceToSquared(_sphereHitAt) > (e.far - e.near) ** 2) return;
    }
    if (
      (_inverseMatrix$2.copy(i).invert(),
      _ray$2.copy(e.ray).applyMatrix4(_inverseMatrix$2),
      null !== r.boundingBox && !1 === _ray$2.intersectsBox(r.boundingBox))
    )
      return;
    let a;
    const s = r.index,
      o = r.attributes.position,
      l = r.attributes.uv,
      c = r.attributes.uv2,
      h = r.attributes.normal,
      u = r.groups,
      d = r.drawRange;
    if (null !== s)
      if (Array.isArray(n))
        for (let r = 0, i = u.length; r < i; r++) {
          const i = u[r],
            o = n[i.materialIndex];
          for (
            let r = Math.max(i.start, d.start),
              n = Math.min(s.count, Math.min(i.start + i.count, d.start + d.count));
            r < n;
            r += 3
          ) {
            const n = s.getX(r),
              u = s.getX(r + 1),
              d = s.getX(r + 2);
            (a = checkGeometryIntersection(this, o, e, _ray$2, l, c, h, n, u, d)),
              a &&
                ((a.faceIndex = Math.floor(r / 3)),
                (a.face.materialIndex = i.materialIndex),
                t.push(a));
          }
        }
      else {
        for (
          let r = Math.max(0, d.start), i = Math.min(s.count, d.start + d.count);
          r < i;
          r += 3
        ) {
          const i = s.getX(r),
            o = s.getX(r + 1),
            u = s.getX(r + 2);
          (a = checkGeometryIntersection(this, n, e, _ray$2, l, c, h, i, o, u)),
            a && ((a.faceIndex = Math.floor(r / 3)), t.push(a));
        }
      }
    else if (void 0 !== o)
      if (Array.isArray(n))
        for (let r = 0, i = u.length; r < i; r++) {
          const i = u[r],
            s = n[i.materialIndex];
          for (
            let r = Math.max(i.start, d.start),
              n = Math.min(o.count, Math.min(i.start + i.count, d.start + d.count));
            r < n;
            r += 3
          ) {
            (a = checkGeometryIntersection(this, s, e, _ray$2, l, c, h, r, r + 1, r + 2)),
              a &&
                ((a.faceIndex = Math.floor(r / 3)),
                (a.face.materialIndex = i.materialIndex),
                t.push(a));
          }
        }
      else {
        for (
          let r = Math.max(0, d.start), i = Math.min(o.count, d.start + d.count);
          r < i;
          r += 3
        ) {
          (a = checkGeometryIntersection(this, n, e, _ray$2, l, c, h, r, r + 1, r + 2)),
            a && ((a.faceIndex = Math.floor(r / 3)), t.push(a));
        }
      }
  }
}
function checkIntersection(e, t, r, n, i, a, s, o) {
  let l;
  if (
    ((l =
      1 === t.side
        ? n.intersectTriangle(s, a, i, !0, o)
        : n.intersectTriangle(i, a, s, 0 === t.side, o)),
    null === l)
  )
    return null;
  _intersectionPointWorld.copy(o), _intersectionPointWorld.applyMatrix4(e.matrixWorld);
  const c = r.ray.origin.distanceTo(_intersectionPointWorld);
  return c < r.near || c > r.far
    ? null
    : { distance: c, point: _intersectionPointWorld.clone(), object: e };
}
function checkGeometryIntersection(e, t, r, n, i, a, s, o, l, c) {
  e.getVertexPosition(o, _vA$1), e.getVertexPosition(l, _vB$1), e.getVertexPosition(c, _vC$1);
  const h = checkIntersection(e, t, r, n, _vA$1, _vB$1, _vC$1, _intersectionPoint);
  if (h) {
    i &&
      (_uvA$1.fromBufferAttribute(i, o),
      _uvB$1.fromBufferAttribute(i, l),
      _uvC$1.fromBufferAttribute(i, c),
      (h.uv = Triangle.getInterpolation(
        _intersectionPoint,
        _vA$1,
        _vB$1,
        _vC$1,
        _uvA$1,
        _uvB$1,
        _uvC$1,
        new Vector2(),
      ))),
      a &&
        (_uvA$1.fromBufferAttribute(a, o),
        _uvB$1.fromBufferAttribute(a, l),
        _uvC$1.fromBufferAttribute(a, c),
        (h.uv2 = Triangle.getInterpolation(
          _intersectionPoint,
          _vA$1,
          _vB$1,
          _vC$1,
          _uvA$1,
          _uvB$1,
          _uvC$1,
          new Vector2(),
        ))),
      s &&
        (_normalA.fromBufferAttribute(s, o),
        _normalB.fromBufferAttribute(s, l),
        _normalC.fromBufferAttribute(s, c),
        (h.normal = Triangle.getInterpolation(
          _intersectionPoint,
          _vA$1,
          _vB$1,
          _vC$1,
          _normalA,
          _normalB,
          _normalC,
          new Vector3(),
        )),
        h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1));
    const e = { a: o, b: l, c: c, normal: new Vector3(), materialIndex: 0 };
    Triangle.getNormal(_vA$1, _vB$1, _vC$1, e.normal), (h.face = e);
  }
  return h;
}
class BoxGeometry extends BufferGeometry {
  constructor(e = 1, t = 1, r = 1, n = 1, i = 1, a = 1) {
    super(),
      (this.type = 'BoxGeometry'),
      (this.parameters = {
        width: e,
        height: t,
        depth: r,
        widthSegments: n,
        heightSegments: i,
        depthSegments: a,
      });
    const s = this;
    (n = Math.floor(n)), (i = Math.floor(i)), (a = Math.floor(a));
    const o = [],
      l = [],
      c = [],
      h = [];
    let u = 0,
      d = 0;
    function p(e, t, r, n, i, a, p, m, f, g, _) {
      const v = a / f,
        x = p / g,
        y = a / 2,
        M = p / 2,
        S = m / 2,
        b = f + 1,
        T = g + 1;
      let E = 0,
        A = 0;
      const w = new Vector3();
      for (let a = 0; a < T; a++) {
        const s = a * x - M;
        for (let o = 0; o < b; o++) {
          const u = o * v - y;
          (w[e] = u * n),
            (w[t] = s * i),
            (w[r] = S),
            l.push(w.x, w.y, w.z),
            (w[e] = 0),
            (w[t] = 0),
            (w[r] = m > 0 ? 1 : -1),
            c.push(w.x, w.y, w.z),
            h.push(o / f),
            h.push(1 - a / g),
            (E += 1);
        }
      }
      for (let e = 0; e < g; e++)
        for (let t = 0; t < f; t++) {
          const r = u + t + b * e,
            n = u + t + b * (e + 1),
            i = u + (t + 1) + b * (e + 1),
            a = u + (t + 1) + b * e;
          o.push(r, n, a), o.push(n, i, a), (A += 6);
        }
      s.addGroup(d, A, _), (d += A), (u += E);
    }
    p('z', 'y', 'x', -1, -1, r, t, e, a, i, 0),
      p('z', 'y', 'x', 1, -1, r, t, -e, a, i, 1),
      p('x', 'z', 'y', 1, 1, e, r, t, n, a, 2),
      p('x', 'z', 'y', 1, -1, e, r, -t, n, a, 3),
      p('x', 'y', 'z', 1, -1, e, t, r, n, i, 4),
      p('x', 'y', 'z', -1, -1, e, t, -r, n, i, 5),
      this.setIndex(o),
      this.setAttribute('position', new Float32BufferAttribute(l, 3)),
      this.setAttribute('normal', new Float32BufferAttribute(c, 3)),
      this.setAttribute('uv', new Float32BufferAttribute(h, 2));
  }
  copy(e) {
    return super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this;
  }
  static fromJSON(e) {
    return new BoxGeometry(
      e.width,
      e.height,
      e.depth,
      e.widthSegments,
      e.heightSegments,
      e.depthSegments,
    );
  }
}
function cloneUniforms(e) {
  const t = {};
  for (const r in e) {
    t[r] = {};
    for (const n in e[r]) {
      const i = e[r][n];
      i &&
      (i.isColor ||
        i.isMatrix3 ||
        i.isMatrix4 ||
        i.isVector2 ||
        i.isVector3 ||
        i.isVector4 ||
        i.isTexture ||
        i.isQuaternion)
        ? i.isRenderTargetTexture
          ? (console.warn(
              'UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().',
            ),
            (t[r][n] = null))
          : (t[r][n] = i.clone())
        : Array.isArray(i)
          ? (t[r][n] = i.slice())
          : (t[r][n] = i);
    }
  }
  return t;
}
function mergeUniforms(e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const n = cloneUniforms(e[r]);
    for (const e in n) t[e] = n[e];
  }
  return t;
}
function cloneUniformsGroups(e) {
  const t = [];
  for (let r = 0; r < e.length; r++) t.push(e[r].clone());
  return t;
}
function getUnlitUniformColorSpace(e) {
  return null === e.getRenderTarget() && 3001 === e.outputEncoding ? 'srgb' : 'srgb-linear';
}
const UniformsUtils = { clone: cloneUniforms, merge: mergeUniforms };
var default_vertex =
    'void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}',
  default_fragment = 'void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}';
class ShaderMaterial extends Material {
  constructor(e) {
    super(),
      (this.isShaderMaterial = !0),
      (this.type = 'ShaderMaterial'),
      (this.defines = {}),
      (this.uniforms = {}),
      (this.uniformsGroups = []),
      (this.vertexShader = default_vertex),
      (this.fragmentShader = default_fragment),
      (this.linewidth = 1),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.fog = !1),
      (this.lights = !1),
      (this.clipping = !1),
      (this.forceSinglePass = !0),
      (this.extensions = { derivatives: !1, fragDepth: !1, drawBuffers: !1, shaderTextureLOD: !1 }),
      (this.defaultAttributeValues = { color: [1, 1, 1], uv: [0, 0], uv2: [0, 0] }),
      (this.index0AttributeName = void 0),
      (this.uniformsNeedUpdate = !1),
      (this.glslVersion = null),
      void 0 !== e && this.setValues(e);
  }
  copy(e) {
    return (
      super.copy(e),
      (this.fragmentShader = e.fragmentShader),
      (this.vertexShader = e.vertexShader),
      (this.uniforms = cloneUniforms(e.uniforms)),
      (this.uniformsGroups = cloneUniformsGroups(e.uniformsGroups)),
      (this.defines = Object.assign({}, e.defines)),
      (this.wireframe = e.wireframe),
      (this.wireframeLinewidth = e.wireframeLinewidth),
      (this.fog = e.fog),
      (this.lights = e.lights),
      (this.clipping = e.clipping),
      (this.extensions = Object.assign({}, e.extensions)),
      (this.glslVersion = e.glslVersion),
      this
    );
  }
  toJSON(e) {
    const t = super.toJSON(e);
    (t.glslVersion = this.glslVersion), (t.uniforms = {});
    for (const r in this.uniforms) {
      const n = this.uniforms[r].value;
      n && n.isTexture
        ? (t.uniforms[r] = { type: 't', value: n.toJSON(e).uuid })
        : n && n.isColor
          ? (t.uniforms[r] = { type: 'c', value: n.getHex() })
          : n && n.isVector2
            ? (t.uniforms[r] = { type: 'v2', value: n.toArray() })
            : n && n.isVector3
              ? (t.uniforms[r] = { type: 'v3', value: n.toArray() })
              : n && n.isVector4
                ? (t.uniforms[r] = { type: 'v4', value: n.toArray() })
                : n && n.isMatrix3
                  ? (t.uniforms[r] = { type: 'm3', value: n.toArray() })
                  : n && n.isMatrix4
                    ? (t.uniforms[r] = { type: 'm4', value: n.toArray() })
                    : (t.uniforms[r] = { value: n });
    }
    Object.keys(this.defines).length > 0 && (t.defines = this.defines),
      (t.vertexShader = this.vertexShader),
      (t.fragmentShader = this.fragmentShader);
    const r = {};
    for (const e in this.extensions) !0 === this.extensions[e] && (r[e] = !0);
    return Object.keys(r).length > 0 && (t.extensions = r), t;
  }
}
class Camera extends Object3D {
  constructor() {
    super(),
      (this.isCamera = !0),
      (this.type = 'Camera'),
      (this.matrixWorldInverse = new Matrix4()),
      (this.projectionMatrix = new Matrix4()),
      (this.projectionMatrixInverse = new Matrix4());
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      this.matrixWorldInverse.copy(e.matrixWorldInverse),
      this.projectionMatrix.copy(e.projectionMatrix),
      this.projectionMatrixInverse.copy(e.projectionMatrixInverse),
      this
    );
  }
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    const t = this.matrixWorld.elements;
    return e.set(-t[8], -t[9], -t[10]).normalize();
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(e, t) {
    super.updateWorldMatrix(e, t), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class PerspectiveCamera extends Camera {
  constructor(e = 50, t = 1, r = 0.1, n = 2e3) {
    super(),
      (this.isPerspectiveCamera = !0),
      (this.type = 'PerspectiveCamera'),
      (this.fov = e),
      (this.zoom = 1),
      (this.near = r),
      (this.far = n),
      (this.focus = 10),
      (this.aspect = t),
      (this.view = null),
      (this.filmGauge = 35),
      (this.filmOffset = 0),
      this.updateProjectionMatrix();
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      (this.fov = e.fov),
      (this.zoom = e.zoom),
      (this.near = e.near),
      (this.far = e.far),
      (this.focus = e.focus),
      (this.aspect = e.aspect),
      (this.view = null === e.view ? null : Object.assign({}, e.view)),
      (this.filmGauge = e.filmGauge),
      (this.filmOffset = e.filmOffset),
      this
    );
  }
  setFocalLength(e) {
    const t = (0.5 * this.getFilmHeight()) / e;
    (this.fov = 2 * RAD2DEG * Math.atan(t)), this.updateProjectionMatrix();
  }
  getFocalLength() {
    const e = Math.tan(0.5 * DEG2RAD * this.fov);
    return (0.5 * this.getFilmHeight()) / e;
  }
  getEffectiveFOV() {
    return 2 * RAD2DEG * Math.atan(Math.tan(0.5 * DEG2RAD * this.fov) / this.zoom);
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  setViewOffset(e, t, r, n, i, a) {
    (this.aspect = e / t),
      null === this.view &&
        (this.view = {
          enabled: !0,
          fullWidth: 1,
          fullHeight: 1,
          offsetX: 0,
          offsetY: 0,
          width: 1,
          height: 1,
        }),
      (this.view.enabled = !0),
      (this.view.fullWidth = e),
      (this.view.fullHeight = t),
      (this.view.offsetX = r),
      (this.view.offsetY = n),
      (this.view.width = i),
      (this.view.height = a),
      this.updateProjectionMatrix();
  }
  clearViewOffset() {
    null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = this.near;
    let t = (e * Math.tan(0.5 * DEG2RAD * this.fov)) / this.zoom,
      r = 2 * t,
      n = this.aspect * r,
      i = -0.5 * n;
    const a = this.view;
    if (null !== this.view && this.view.enabled) {
      const e = a.fullWidth,
        s = a.fullHeight;
      (i += (a.offsetX * n) / e),
        (t -= (a.offsetY * r) / s),
        (n *= a.width / e),
        (r *= a.height / s);
    }
    const s = this.filmOffset;
    0 !== s && (i += (e * s) / this.getFilmWidth()),
      this.projectionMatrix.makePerspective(i, i + n, t, t - r, e, this.far),
      this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return (
      (t.object.fov = this.fov),
      (t.object.zoom = this.zoom),
      (t.object.near = this.near),
      (t.object.far = this.far),
      (t.object.focus = this.focus),
      (t.object.aspect = this.aspect),
      null !== this.view && (t.object.view = Object.assign({}, this.view)),
      (t.object.filmGauge = this.filmGauge),
      (t.object.filmOffset = this.filmOffset),
      t
    );
  }
}
const fov = -90,
  aspect = 1;
class CubeCamera extends Object3D {
  constructor(e, t, r) {
    super(), (this.type = 'CubeCamera'), (this.renderTarget = r);
    const n = new PerspectiveCamera(-90, 1, e, t);
    (n.layers = this.layers), n.up.set(0, 1, 0), n.lookAt(1, 0, 0), this.add(n);
    const i = new PerspectiveCamera(-90, 1, e, t);
    (i.layers = this.layers), i.up.set(0, 1, 0), i.lookAt(-1, 0, 0), this.add(i);
    const a = new PerspectiveCamera(-90, 1, e, t);
    (a.layers = this.layers), a.up.set(0, 0, -1), a.lookAt(0, 1, 0), this.add(a);
    const s = new PerspectiveCamera(-90, 1, e, t);
    (s.layers = this.layers), s.up.set(0, 0, 1), s.lookAt(0, -1, 0), this.add(s);
    const o = new PerspectiveCamera(-90, 1, e, t);
    (o.layers = this.layers), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), this.add(o);
    const l = new PerspectiveCamera(-90, 1, e, t);
    (l.layers = this.layers), l.up.set(0, 1, 0), l.lookAt(0, 0, -1), this.add(l);
  }
  update(e, t) {
    null === this.parent && this.updateMatrixWorld();
    const r = this.renderTarget,
      [n, i, a, s, o, l] = this.children,
      c = e.getRenderTarget(),
      h = e.toneMapping,
      u = e.xr.enabled;
    (e.toneMapping = 0), (e.xr.enabled = !1);
    const d = r.texture.generateMipmaps;
    (r.texture.generateMipmaps = !1),
      e.setRenderTarget(r, 0),
      e.render(t, n),
      e.setRenderTarget(r, 1),
      e.render(t, i),
      e.setRenderTarget(r, 2),
      e.render(t, a),
      e.setRenderTarget(r, 3),
      e.render(t, s),
      e.setRenderTarget(r, 4),
      e.render(t, o),
      (r.texture.generateMipmaps = d),
      e.setRenderTarget(r, 5),
      e.render(t, l),
      e.setRenderTarget(c),
      (e.toneMapping = h),
      (e.xr.enabled = u),
      (r.texture.needsPMREMUpdate = !0);
  }
}
class CubeTexture extends Texture {
  constructor(e, t, r, n, i, a, s, o, l, c) {
    super((e = void 0 !== e ? e : []), (t = void 0 !== t ? t : 301), r, n, i, a, s, o, l, c),
      (this.isCubeTexture = !0),
      (this.flipY = !1);
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class WebGLCubeRenderTarget extends WebGLRenderTarget {
  constructor(e = 1, t = {}) {
    super(e, e, t), (this.isWebGLCubeRenderTarget = !0);
    const r = { width: e, height: e, depth: 1 },
      n = [r, r, r, r, r, r];
    (this.texture = new CubeTexture(
      n,
      t.mapping,
      t.wrapS,
      t.wrapT,
      t.magFilter,
      t.minFilter,
      t.format,
      t.type,
      t.anisotropy,
      t.encoding,
    )),
      (this.texture.isRenderTargetTexture = !0),
      (this.texture.generateMipmaps = void 0 !== t.generateMipmaps && t.generateMipmaps),
      (this.texture.minFilter = void 0 !== t.minFilter ? t.minFilter : 1006);
  }
  fromEquirectangularTexture(e, t) {
    (this.texture.type = t.type),
      (this.texture.encoding = t.encoding),
      (this.texture.generateMipmaps = t.generateMipmaps),
      (this.texture.minFilter = t.minFilter),
      (this.texture.magFilter = t.magFilter);
    const r = {
        uniforms: { tEquirect: { value: null } },
        vertexShader:
          '\n\n\t\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t\tvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n\t\t\t\t\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n\t\t\t\t}\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t\t\t\t\t#include <begin_vertex>\n\t\t\t\t\t#include <project_vertex>\n\n\t\t\t\t}\n\t\t\t',
        fragmentShader:
          '\n\n\t\t\t\tuniform sampler2D tEquirect;\n\n\t\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t\t#include <common>\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvec3 direction = normalize( vWorldDirection );\n\n\t\t\t\t\tvec2 sampleUV = equirectUv( direction );\n\n\t\t\t\t\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\n\t\t\t\t}\n\t\t\t',
      },
      n = new BoxGeometry(5, 5, 5),
      i = new ShaderMaterial({
        name: 'CubemapFromEquirect',
        uniforms: cloneUniforms(r.uniforms),
        vertexShader: r.vertexShader,
        fragmentShader: r.fragmentShader,
        side: 1,
        blending: 0,
      });
    i.uniforms.tEquirect.value = t;
    const a = new Mesh(n, i),
      s = t.minFilter;
    1008 === t.minFilter && (t.minFilter = 1006);
    return (
      new CubeCamera(1, 10, this).update(e, a),
      (t.minFilter = s),
      a.geometry.dispose(),
      a.material.dispose(),
      this
    );
  }
  clear(e, t, r, n) {
    const i = e.getRenderTarget();
    for (let i = 0; i < 6; i++) e.setRenderTarget(this, i), e.clear(t, r, n);
    e.setRenderTarget(i);
  }
}
const _vector1 = new Vector3(),
  _vector2 = new Vector3(),
  _normalMatrix = new Matrix3();
class Plane {
  constructor(e = new Vector3(1, 0, 0), t = 0) {
    (this.isPlane = !0), (this.normal = e), (this.constant = t);
  }
  set(e, t) {
    return this.normal.copy(e), (this.constant = t), this;
  }
  setComponents(e, t, r, n) {
    return this.normal.set(e, t, r), (this.constant = n), this;
  }
  setFromNormalAndCoplanarPoint(e, t) {
    return this.normal.copy(e), (this.constant = -t.dot(this.normal)), this;
  }
  setFromCoplanarPoints(e, t, r) {
    const n = _vector1.subVectors(r, t).cross(_vector2.subVectors(e, t)).normalize();
    return this.setFromNormalAndCoplanarPoint(n, e), this;
  }
  copy(e) {
    return this.normal.copy(e.normal), (this.constant = e.constant), this;
  }
  normalize() {
    const e = 1 / this.normal.length();
    return this.normal.multiplyScalar(e), (this.constant *= e), this;
  }
  negate() {
    return (this.constant *= -1), this.normal.negate(), this;
  }
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  projectPoint(e, t) {
    return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  intersectLine(e, t) {
    const r = e.delta(_vector1),
      n = this.normal.dot(r);
    if (0 === n) return 0 === this.distanceToPoint(e.start) ? t.copy(e.start) : null;
    const i = -(e.start.dot(this.normal) + this.constant) / n;
    return i < 0 || i > 1 ? null : t.copy(e.start).addScaledVector(r, i);
  }
  intersectsLine(e) {
    const t = this.distanceToPoint(e.start),
      r = this.distanceToPoint(e.end);
    return (t < 0 && r > 0) || (r < 0 && t > 0);
  }
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(e, t) {
    const r = t || _normalMatrix.getNormalMatrix(e),
      n = this.coplanarPoint(_vector1).applyMatrix4(e),
      i = this.normal.applyMatrix3(r).normalize();
    return (this.constant = -n.dot(i)), this;
  }
  translate(e) {
    return (this.constant -= e.dot(this.normal)), this;
  }
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const _sphere$3 = new Sphere(),
  _vector$6 = new Vector3();
class Frustum {
  constructor(
    e = new Plane(),
    t = new Plane(),
    r = new Plane(),
    n = new Plane(),
    i = new Plane(),
    a = new Plane(),
  ) {
    this.planes = [e, t, r, n, i, a];
  }
  set(e, t, r, n, i, a) {
    const s = this.planes;
    return s[0].copy(e), s[1].copy(t), s[2].copy(r), s[3].copy(n), s[4].copy(i), s[5].copy(a), this;
  }
  copy(e) {
    const t = this.planes;
    for (let r = 0; r < 6; r++) t[r].copy(e.planes[r]);
    return this;
  }
  setFromProjectionMatrix(e) {
    const t = this.planes,
      r = e.elements,
      n = r[0],
      i = r[1],
      a = r[2],
      s = r[3],
      o = r[4],
      l = r[5],
      c = r[6],
      h = r[7],
      u = r[8],
      d = r[9],
      p = r[10],
      m = r[11],
      f = r[12],
      g = r[13],
      _ = r[14],
      v = r[15];
    return (
      t[0].setComponents(s - n, h - o, m - u, v - f).normalize(),
      t[1].setComponents(s + n, h + o, m + u, v + f).normalize(),
      t[2].setComponents(s + i, h + l, m + d, v + g).normalize(),
      t[3].setComponents(s - i, h - l, m - d, v - g).normalize(),
      t[4].setComponents(s - a, h - c, m - p, v - _).normalize(),
      t[5].setComponents(s + a, h + c, m + p, v + _).normalize(),
      this
    );
  }
  intersectsObject(e) {
    if (void 0 !== e.boundingSphere)
      null === e.boundingSphere && e.computeBoundingSphere(),
        _sphere$3.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    else {
      const t = e.geometry;
      null === t.boundingSphere && t.computeBoundingSphere(),
        _sphere$3.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(_sphere$3);
  }
  intersectsSprite(e) {
    return (
      _sphere$3.center.set(0, 0, 0),
      (_sphere$3.radius = 0.7071067811865476),
      _sphere$3.applyMatrix4(e.matrixWorld),
      this.intersectsSphere(_sphere$3)
    );
  }
  intersectsSphere(e) {
    const t = this.planes,
      r = e.center,
      n = -e.radius;
    for (let e = 0; e < 6; e++) {
      if (t[e].distanceToPoint(r) < n) return !1;
    }
    return !0;
  }
  intersectsBox(e) {
    const t = this.planes;
    for (let r = 0; r < 6; r++) {
      const n = t[r];
      if (
        ((_vector$6.x = n.normal.x > 0 ? e.max.x : e.min.x),
        (_vector$6.y = n.normal.y > 0 ? e.max.y : e.min.y),
        (_vector$6.z = n.normal.z > 0 ? e.max.z : e.min.z),
        n.distanceToPoint(_vector$6) < 0)
      )
        return !1;
    }
    return !0;
  }
  containsPoint(e) {
    const t = this.planes;
    for (let r = 0; r < 6; r++) if (t[r].distanceToPoint(e) < 0) return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
function WebGLAnimation() {
  let e = null,
    t = !1,
    r = null,
    n = null;
  function i(t, a) {
    r(t, a), (n = e.requestAnimationFrame(i));
  }
  return {
    start: function () {
      !0 !== t && null !== r && ((n = e.requestAnimationFrame(i)), (t = !0));
    },
    stop: function () {
      e.cancelAnimationFrame(n), (t = !1);
    },
    setAnimationLoop: function (e) {
      r = e;
    },
    setContext: function (t) {
      e = t;
    },
  };
}
function WebGLAttributes(e, t) {
  const r = t.isWebGL2,
    n = new WeakMap();
  return {
    get: function (e) {
      return e.isInterleavedBufferAttribute && (e = e.data), n.get(e);
    },
    remove: function (t) {
      t.isInterleavedBufferAttribute && (t = t.data);
      const r = n.get(t);
      r && (e.deleteBuffer(r.buffer), n.delete(t));
    },
    update: function (t, i) {
      if (t.isGLBufferAttribute) {
        const e = n.get(t);
        return void (
          (!e || e.version < t.version) &&
          n.set(t, {
            buffer: t.buffer,
            type: t.type,
            bytesPerElement: t.elementSize,
            version: t.version,
          })
        );
      }
      t.isInterleavedBufferAttribute && (t = t.data);
      const a = n.get(t);
      void 0 === a
        ? n.set(
            t,
            (function (t, n) {
              const i = t.array,
                a = t.usage,
                s = e.createBuffer();
              let o;
              if (
                (e.bindBuffer(n, s),
                e.bufferData(n, i, a),
                t.onUploadCallback(),
                i instanceof Float32Array)
              )
                o = e.FLOAT;
              else if (i instanceof Uint16Array)
                if (t.isFloat16BufferAttribute) {
                  if (!r)
                    throw new Error(
                      'THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.',
                    );
                  o = e.HALF_FLOAT;
                } else o = e.UNSIGNED_SHORT;
              else if (i instanceof Int16Array) o = e.SHORT;
              else if (i instanceof Uint32Array) o = e.UNSIGNED_INT;
              else if (i instanceof Int32Array) o = e.INT;
              else if (i instanceof Int8Array) o = e.BYTE;
              else if (i instanceof Uint8Array) o = e.UNSIGNED_BYTE;
              else {
                if (!(i instanceof Uint8ClampedArray))
                  throw new Error('THREE.WebGLAttributes: Unsupported buffer data format: ' + i);
                o = e.UNSIGNED_BYTE;
              }
              return {
                buffer: s,
                type: o,
                bytesPerElement: i.BYTES_PER_ELEMENT,
                version: t.version,
              };
            })(t, i),
          )
        : a.version < t.version &&
          (!(function (t, n, i) {
            const a = n.array,
              s = n.updateRange;
            e.bindBuffer(i, t),
              -1 === s.count
                ? e.bufferSubData(i, 0, a)
                : (r
                    ? e.bufferSubData(i, s.offset * a.BYTES_PER_ELEMENT, a, s.offset, s.count)
                    : e.bufferSubData(
                        i,
                        s.offset * a.BYTES_PER_ELEMENT,
                        a.subarray(s.offset, s.offset + s.count),
                      ),
                  (s.count = -1)),
              n.onUploadCallback();
          })(a.buffer, t, i),
          (a.version = t.version));
    },
  };
}
class PlaneGeometry extends BufferGeometry {
  constructor(e = 1, t = 1, r = 1, n = 1) {
    super(),
      (this.type = 'PlaneGeometry'),
      (this.parameters = { width: e, height: t, widthSegments: r, heightSegments: n });
    const i = e / 2,
      a = t / 2,
      s = Math.floor(r),
      o = Math.floor(n),
      l = s + 1,
      c = o + 1,
      h = e / s,
      u = t / o,
      d = [],
      p = [],
      m = [],
      f = [];
    for (let e = 0; e < c; e++) {
      const t = e * u - a;
      for (let r = 0; r < l; r++) {
        const n = r * h - i;
        p.push(n, -t, 0), m.push(0, 0, 1), f.push(r / s), f.push(1 - e / o);
      }
    }
    for (let e = 0; e < o; e++)
      for (let t = 0; t < s; t++) {
        const r = t + l * e,
          n = t + l * (e + 1),
          i = t + 1 + l * (e + 1),
          a = t + 1 + l * e;
        d.push(r, n, a), d.push(n, i, a);
      }
    this.setIndex(d),
      this.setAttribute('position', new Float32BufferAttribute(p, 3)),
      this.setAttribute('normal', new Float32BufferAttribute(m, 3)),
      this.setAttribute('uv', new Float32BufferAttribute(f, 2));
  }
  copy(e) {
    return super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this;
  }
  static fromJSON(e) {
    return new PlaneGeometry(e.width, e.height, e.widthSegments, e.heightSegments);
  }
}
var alphamap_fragment =
    '#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;\n#endif',
  alphamap_pars_fragment = '#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif',
  alphatest_fragment = '#ifdef USE_ALPHATEST\n\tif ( diffuseColor.a < alphaTest ) discard;\n#endif',
  alphatest_pars_fragment = '#ifdef USE_ALPHATEST\n\tuniform float alphaTest;\n#endif',
  aomap_fragment =
    '#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n\t#endif\n#endif',
  aomap_pars_fragment =
    '#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif',
  begin_vertex = 'vec3 transformed = vec3( position );',
  beginnormal_vertex =
    'vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif',
  bsdfs =
    'float G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, 1.0, dotVH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n} // validated',
  iridescence_fragment =
    '#ifdef USE_IRIDESCENCE\n\tconst mat3 XYZ_TO_REC709 = mat3(\n\t\t 3.2404542, -0.9692660,  0.0556434,\n\t\t-1.5371385,  1.8760108, -0.2040259,\n\t\t-0.4985314,  0.0415560,  1.0572252\n\t);\n\tvec3 Fresnel0ToIor( vec3 fresnel0 ) {\n\t\tvec3 sqrtF0 = sqrt( fresnel0 );\n\t\treturn ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );\n\t}\n\tvec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {\n\t\treturn pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );\n\t}\n\tfloat IorToFresnel0( float transmittedIor, float incidentIor ) {\n\t\treturn pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));\n\t}\n\tvec3 evalSensitivity( float OPD, vec3 shift ) {\n\t\tfloat phase = 2.0 * PI * OPD * 1.0e-9;\n\t\tvec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );\n\t\tvec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );\n\t\tvec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );\n\t\tvec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );\n\t\txyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );\n\t\txyz /= 1.0685e-7;\n\t\tvec3 rgb = XYZ_TO_REC709 * xyz;\n\t\treturn rgb;\n\t}\n\tvec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {\n\t\tvec3 I;\n\t\tfloat iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );\n\t\tfloat sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );\n\t\tfloat cosTheta2Sq = 1.0 - sinTheta2Sq;\n\t\tif ( cosTheta2Sq < 0.0 ) {\n\t\t\t return vec3( 1.0 );\n\t\t}\n\t\tfloat cosTheta2 = sqrt( cosTheta2Sq );\n\t\tfloat R0 = IorToFresnel0( iridescenceIOR, outsideIOR );\n\t\tfloat R12 = F_Schlick( R0, 1.0, cosTheta1 );\n\t\tfloat R21 = R12;\n\t\tfloat T121 = 1.0 - R12;\n\t\tfloat phi12 = 0.0;\n\t\tif ( iridescenceIOR < outsideIOR ) phi12 = PI;\n\t\tfloat phi21 = PI - phi12;\n\t\tvec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );\t\tvec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );\n\t\tvec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );\n\t\tvec3 phi23 = vec3( 0.0 );\n\t\tif ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;\n\t\tif ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;\n\t\tif ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;\n\t\tfloat OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;\n\t\tvec3 phi = vec3( phi21 ) + phi23;\n\t\tvec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );\n\t\tvec3 r123 = sqrt( R123 );\n\t\tvec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );\n\t\tvec3 C0 = R12 + Rs;\n\t\tI = C0;\n\t\tvec3 Cm = Rs - T121;\n\t\tfor ( int m = 1; m <= 2; ++ m ) {\n\t\t\tCm *= r123;\n\t\t\tvec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );\n\t\t\tI += Cm * Sm;\n\t\t}\n\t\treturn max( I, vec3( 0.0 ) );\n\t}\n#endif',
  bumpmap_pars_fragment =
    '#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vBumpMapUv );\n\t\tvec2 dSTdy = dFdy( vBumpMapUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n\t\tvec3 vSigmaX = dFdx( surf_pos.xyz );\n\t\tvec3 vSigmaY = dFdy( surf_pos.xyz );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 ) * faceDirection;\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif',
  clipping_planes_fragment =
    '#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#pragma unroll_loop_end\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t\tif ( clipped ) discard;\n\t#endif\n#endif',
  clipping_planes_pars_fragment =
    '#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif',
  clipping_planes_pars_vertex =
    '#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n#endif',
  clipping_planes_vertex =
    '#if NUM_CLIPPING_PLANES > 0\n\tvClipPosition = - mvPosition.xyz;\n#endif',
  color_fragment =
    '#if defined( USE_COLOR_ALPHA )\n\tdiffuseColor *= vColor;\n#elif defined( USE_COLOR )\n\tdiffuseColor.rgb *= vColor;\n#endif',
  color_pars_fragment =
    '#if defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#elif defined( USE_COLOR )\n\tvarying vec3 vColor;\n#endif',
  color_pars_vertex =
    '#if defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvarying vec3 vColor;\n#endif',
  color_vertex =
    '#if defined( USE_COLOR_ALPHA )\n\tvColor = vec4( 1.0 );\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvColor = vec3( 1.0 );\n#endif\n#ifdef USE_COLOR\n\tvColor *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n\tvColor.xyz *= instanceColor.xyz;\n#endif',
  common =
    '#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nvec3 pow2( const in vec3 x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract( sin( sn ) * c );\n}\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n#ifdef USE_CLEARCOAT\n\tvec3 clearcoatNormal;\n#endif\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat luminance( const in vec3 rgb ) {\n\tconst vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );\n\treturn dot( weights, rgb );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n\treturn m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n\tfloat u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n\tfloat v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\treturn vec2( u, v );\n}\nvec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n\tfloat fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n\treturn f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n}\nfloat F_Schlick( const in float f0, const in float f90, const in float dotVH ) {\n\tfloat fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n\treturn f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n} // validated',
  cube_uv_reflection_fragment =
    '#ifdef ENVMAP_TYPE_CUBE_UV\n\t#define cubeUV_minMipLevel 4.0\n\t#define cubeUV_minTileSize 16.0\n\tfloat getFace( vec3 direction ) {\n\t\tvec3 absDirection = abs( direction );\n\t\tfloat face = - 1.0;\n\t\tif ( absDirection.x > absDirection.z ) {\n\t\t\tif ( absDirection.x > absDirection.y )\n\t\t\t\tface = direction.x > 0.0 ? 0.0 : 3.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t} else {\n\t\t\tif ( absDirection.z > absDirection.y )\n\t\t\t\tface = direction.z > 0.0 ? 2.0 : 5.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t}\n\t\treturn face;\n\t}\n\tvec2 getUV( vec3 direction, float face ) {\n\t\tvec2 uv;\n\t\tif ( face == 0.0 ) {\n\t\t\tuv = vec2( direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 1.0 ) {\n\t\t\tuv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n\t\t} else if ( face == 2.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.y ) / abs( direction.z );\n\t\t} else if ( face == 3.0 ) {\n\t\t\tuv = vec2( - direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 4.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.z ) / abs( direction.y );\n\t\t} else {\n\t\t\tuv = vec2( direction.x, direction.y ) / abs( direction.z );\n\t\t}\n\t\treturn 0.5 * ( uv + 1.0 );\n\t}\n\tvec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n\t\tfloat face = getFace( direction );\n\t\tfloat filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n\t\tmipInt = max( mipInt, cubeUV_minMipLevel );\n\t\tfloat faceSize = exp2( mipInt );\n\t\thighp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;\n\t\tif ( face > 2.0 ) {\n\t\t\tuv.y += faceSize;\n\t\t\tface -= 3.0;\n\t\t}\n\t\tuv.x += face * faceSize;\n\t\tuv.x += filterInt * 3.0 * cubeUV_minTileSize;\n\t\tuv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );\n\t\tuv.x *= CUBEUV_TEXEL_WIDTH;\n\t\tuv.y *= CUBEUV_TEXEL_HEIGHT;\n\t\t#ifdef texture2DGradEXT\n\t\t\treturn texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;\n\t\t#else\n\t\t\treturn texture2D( envMap, uv ).rgb;\n\t\t#endif\n\t}\n\t#define cubeUV_r0 1.0\n\t#define cubeUV_v0 0.339\n\t#define cubeUV_m0 - 2.0\n\t#define cubeUV_r1 0.8\n\t#define cubeUV_v1 0.276\n\t#define cubeUV_m1 - 1.0\n\t#define cubeUV_r4 0.4\n\t#define cubeUV_v4 0.046\n\t#define cubeUV_m4 2.0\n\t#define cubeUV_r5 0.305\n\t#define cubeUV_v5 0.016\n\t#define cubeUV_m5 3.0\n\t#define cubeUV_r6 0.21\n\t#define cubeUV_v6 0.0038\n\t#define cubeUV_m6 4.0\n\tfloat roughnessToMip( float roughness ) {\n\t\tfloat mip = 0.0;\n\t\tif ( roughness >= cubeUV_r1 ) {\n\t\t\tmip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;\n\t\t} else if ( roughness >= cubeUV_r4 ) {\n\t\t\tmip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;\n\t\t} else if ( roughness >= cubeUV_r5 ) {\n\t\t\tmip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;\n\t\t} else if ( roughness >= cubeUV_r6 ) {\n\t\t\tmip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;\n\t\t} else {\n\t\t\tmip = - 2.0 * log2( 1.16 * roughness );\t\t}\n\t\treturn mip;\n\t}\n\tvec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n\t\tfloat mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );\n\t\tfloat mipF = fract( mip );\n\t\tfloat mipInt = floor( mip );\n\t\tvec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n\t\tif ( mipF == 0.0 ) {\n\t\t\treturn vec4( color0, 1.0 );\n\t\t} else {\n\t\t\tvec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n\t\t\treturn vec4( mix( color0, color1, mipF ), 1.0 );\n\t\t}\n\t}\n#endif',
  defaultnormal_vertex =
    'vec3 transformedNormal = objectNormal;\n#ifdef USE_INSTANCING\n\tmat3 m = mat3( instanceMatrix );\n\ttransformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );\n\ttransformedNormal = m * transformedNormal;\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n\tvec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#ifdef FLIP_SIDED\n\t\ttransformedTangent = - transformedTangent;\n\t#endif\n#endif',
  displacementmap_pars_vertex =
    '#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif',
  displacementmap_vertex =
    '#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );\n#endif',
  emissivemap_fragment =
    '#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif',
  emissivemap_pars_fragment = '#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif',
  encodings_fragment = 'gl_FragColor = linearToOutputTexel( gl_FragColor );',
  encodings_pars_fragment =
    'vec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}',
  envmap_fragment =
    '#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvec3 cameraToFrag;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif',
  envmap_common_pars_fragment =
    '#ifdef USE_ENVMAP\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\t\n#endif',
  envmap_pars_fragment =
    '#ifdef USE_ENVMAP\n\tuniform float reflectivity;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif',
  envmap_pars_vertex =
    '#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif',
  envmap_vertex =
    '#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif',
  fog_vertex = '#ifdef USE_FOG\n\tvFogDepth = - mvPosition.z;\n#endif',
  fog_pars_vertex = '#ifdef USE_FOG\n\tvarying float vFogDepth;\n#endif',
  fog_fragment =
    '#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif',
  fog_pars_fragment =
    '#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float vFogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif',
  gradientmap_pars_fragment =
    '#ifdef USE_GRADIENTMAP\n\tuniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\tfloat dotNL = dot( normal, lightDirection );\n\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t#ifdef USE_GRADIENTMAP\n\t\treturn vec3( texture2D( gradientMap, coord ).r );\n\t#else\n\t\tvec2 fw = fwidth( coord ) * 0.5;\n\t\treturn mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );\n\t#endif\n}',
  lightmap_fragment =
    '#ifdef USE_LIGHTMAP\n\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\tvec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n\treflectedLight.indirectDiffuse += lightMapIrradiance;\n#endif',
  lightmap_pars_fragment =
    '#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif',
  lights_lambert_fragment =
    'LambertMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularStrength = specularStrength;',
  lights_lambert_pars_fragment =
    'varying vec3 vViewPosition;\nstruct LambertMaterial {\n\tvec3 diffuseColor;\n\tfloat specularStrength;\n};\nvoid RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Lambert\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Lambert',
  lights_pars_begin =
    'uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\nuniform vec3 lightProbe[ 9 ];\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\treturn result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {\n\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\treturn irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\treturn irradiance;\n}\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\t#if defined ( LEGACY_LIGHTS )\n\t\tif ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\t\t\treturn pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t\t}\n\t\treturn 1.0;\n\t#else\n\t\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\t\tif ( cutoffDistance > 0.0 ) {\n\t\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t\t}\n\t\treturn distanceFalloff;\n\t#endif\n}\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n\treturn smoothstep( coneCosine, penumbraCosine, angleCosine );\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {\n\t\tlight.color = directionalLight.color;\n\t\tlight.direction = directionalLight.direction;\n\t\tlight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tlight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tlight.color = pointLight.color;\n\t\tlight.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tlight.direction = normalize( lVector );\n\t\tfloat angleCos = dot( light.direction, spotLight.direction );\n\t\tfloat spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\tif ( spotAttenuation > 0.0 ) {\n\t\t\tfloat lightDistance = length( lVector );\n\t\t\tlight.color = spotLight.color * spotAttenuation;\n\t\t\tlight.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\t\t} else {\n\t\t\tlight.color = vec3( 0.0 );\n\t\t\tlight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {\n\t\tfloat dotNL = dot( normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\treturn irradiance;\n\t}\n#endif',
  envmap_physical_pars_fragment =
    '#if defined( USE_ENVMAP )\n\tvec3 getIBLIrradiance( const in vec3 normal ) {\n\t\t#if defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );\n\t\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t\t#else\n\t\t\treturn vec3( 0.0 );\n\t\t#endif\n\t}\n\tvec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n\t\t#if defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 reflectVec = reflect( - viewDir, normal );\n\t\t\treflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n\t\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );\n\t\t\treturn envMapColor.rgb * envMapIntensity;\n\t\t#else\n\t\t\treturn vec3( 0.0 );\n\t\t#endif\n\t}\n#endif',
  lights_toon_fragment = 'ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;',
  lights_toon_pars_fragment =
    'varying vec3 vViewPosition;\nstruct ToonMaterial {\n\tvec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Toon\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Toon',
  lights_phong_fragment =
    'BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;',
  lights_phong_pars_fragment =
    'varying vec3 vViewPosition;\nstruct BlinnPhongMaterial {\n\tvec3 diffuseColor;\n\tvec3 specularColor;\n\tfloat specularShininess;\n\tfloat specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong',
  lights_physical_fragment =
    'PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nvec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n#ifdef IOR\n\tmaterial.ior = ior;\n\t#ifdef USE_SPECULAR\n\t\tfloat specularIntensityFactor = specularIntensity;\n\t\tvec3 specularColorFactor = specularColor;\n\t\t#ifdef USE_SPECULAR_COLORMAP\n\t\t\tspecularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;\n\t\t#endif\n\t\t#ifdef USE_SPECULAR_INTENSITYMAP\n\t\t\tspecularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;\n\t\t#endif\n\t\tmaterial.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n\t#else\n\t\tfloat specularIntensityFactor = 1.0;\n\t\tvec3 specularColorFactor = vec3( 1.0 );\n\t\tmaterial.specularF90 = 1.0;\n\t#endif\n\tmaterial.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.specularF90 = 1.0;\n#endif\n#ifdef USE_CLEARCOAT\n\tmaterial.clearcoat = clearcoat;\n\tmaterial.clearcoatRoughness = clearcoatRoughness;\n\tmaterial.clearcoatF0 = vec3( 0.04 );\n\tmaterial.clearcoatF90 = 1.0;\n\t#ifdef USE_CLEARCOATMAP\n\t\tmaterial.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;\n\t#endif\n\t#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\t\tmaterial.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;\n\t#endif\n\tmaterial.clearcoat = saturate( material.clearcoat );\tmaterial.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n\tmaterial.clearcoatRoughness += geometryRoughness;\n\tmaterial.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_IRIDESCENCE\n\tmaterial.iridescence = iridescence;\n\tmaterial.iridescenceIOR = iridescenceIOR;\n\t#ifdef USE_IRIDESCENCEMAP\n\t\tmaterial.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;\n\t#endif\n\t#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\t\tmaterial.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;\n\t#else\n\t\tmaterial.iridescenceThickness = iridescenceThicknessMaximum;\n\t#endif\n#endif\n#ifdef USE_SHEEN\n\tmaterial.sheenColor = sheenColor;\n\t#ifdef USE_SHEEN_COLORMAP\n\t\tmaterial.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;\n\t#endif\n\tmaterial.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );\n\t#ifdef USE_SHEEN_ROUGHNESSMAP\n\t\tmaterial.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;\n\t#endif\n#endif',
  lights_physical_pars_fragment =
    'struct PhysicalMaterial {\n\tvec3 diffuseColor;\n\tfloat roughness;\n\tvec3 specularColor;\n\tfloat specularF90;\n\t#ifdef USE_CLEARCOAT\n\t\tfloat clearcoat;\n\t\tfloat clearcoatRoughness;\n\t\tvec3 clearcoatF0;\n\t\tfloat clearcoatF90;\n\t#endif\n\t#ifdef USE_IRIDESCENCE\n\t\tfloat iridescence;\n\t\tfloat iridescenceIOR;\n\t\tfloat iridescenceThickness;\n\t\tvec3 iridescenceFresnel;\n\t\tvec3 iridescenceF0;\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tvec3 sheenColor;\n\t\tfloat sheenRoughness;\n\t#endif\n\t#ifdef IOR\n\t\tfloat ior;\n\t#endif\n\t#ifdef USE_TRANSMISSION\n\t\tfloat transmission;\n\t\tfloat transmissionAlpha;\n\t\tfloat thickness;\n\t\tfloat attenuationDistance;\n\t\tvec3 attenuationColor;\n\t#endif\n};\nvec3 clearcoatSpecular = vec3( 0.0 );\nvec3 sheenSpecular = vec3( 0.0 );\nvec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {\n    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );\n    float x2 = x * x;\n    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );\n    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );\n}\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\n#ifdef USE_CLEARCOAT\n\tvec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {\n\t\tvec3 f0 = material.clearcoatF0;\n\t\tfloat f90 = material.clearcoatF90;\n\t\tfloat roughness = material.clearcoatRoughness;\n\t\tfloat alpha = pow2( roughness );\n\t\tvec3 halfDir = normalize( lightDir + viewDir );\n\t\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\t\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\t\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\t\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\t\tvec3 F = F_Schlick( f0, f90, dotVH );\n\t\tfloat V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\t\tfloat D = D_GGX( alpha, dotNH );\n\t\treturn F * ( V * D );\n\t}\n#endif\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n\tvec3 f0 = material.specularColor;\n\tfloat f90 = material.specularF90;\n\tfloat roughness = material.roughness;\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\tvec3 F = F_Schlick( f0, f90, dotVH );\n\t#ifdef USE_IRIDESCENCE\n\t\tF = mix( F, material.iridescenceFresnel, material.iridescence );\n\t#endif\n\tfloat V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( V * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie( float roughness, float dotNH ) {\n\tfloat alpha = pow2( roughness );\n\tfloat invAlpha = 1.0 / alpha;\n\tfloat cos2h = dotNH * dotNH;\n\tfloat sin2h = max( 1.0 - cos2h, 0.0078125 );\n\treturn ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n}\nfloat V_Neubelt( float dotNV, float dotNL ) {\n\treturn saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n}\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat D = D_Charlie( sheenRoughness, dotNH );\n\tfloat V = V_Neubelt( dotNV, dotNL );\n\treturn sheenColor * ( D * V );\n}\n#endif\nfloat IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat r2 = roughness * roughness;\n\tfloat a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;\n\tfloat b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;\n\tfloat DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );\n\treturn saturate( DG * RECIPROCAL_PI );\n}\nvec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\tvec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;\n\treturn fab;\n}\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n\tvec2 fab = DFGApprox( normal, viewDir, roughness );\n\treturn specularColor * fab.x + specularF90 * fab.y;\n}\n#ifdef USE_IRIDESCENCE\nvoid computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#else\nvoid computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#endif\n\tvec2 fab = DFGApprox( normal, viewDir, roughness );\n\t#ifdef USE_IRIDESCENCE\n\t\tvec3 Fr = mix( specularColor, iridescenceF0, iridescence );\n\t#else\n\t\tvec3 Fr = specularColor;\n\t#endif\n\tvec3 FssEss = Fr * fab.x + specularF90 * fab.y;\n\tfloat Ess = fab.x + fab.y;\n\tfloat Ems = 1.0 - Ess;\n\tvec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.roughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifdef USE_CLEARCOAT\n\t\tfloat dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );\n\t\tvec3 ccIrradiance = dotNLcc * directLight.color;\n\t\tclearcoatSpecular += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material );\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tsheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );\n\t#endif\n\treflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material );\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\t#ifdef USE_CLEARCOAT\n\t\tclearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tsheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );\n\t#endif\n\tvec3 singleScattering = vec3( 0.0 );\n\tvec3 multiScattering = vec3( 0.0 );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\t#ifdef USE_IRIDESCENCE\n\t\tcomputeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );\n\t#else\n\t\tcomputeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );\n\t#endif\n\tvec3 totalScattering = singleScattering + multiScattering;\n\tvec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );\n\treflectedLight.indirectSpecular += radiance * singleScattering;\n\treflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}',
  lights_fragment_begin =
    '\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n#ifdef USE_CLEARCOAT\n\tgeometry.clearcoatNormal = clearcoatNormal;\n#endif\n#ifdef USE_IRIDESCENCE\n\tfloat dotNVi = saturate( dot( normal, geometry.viewDir ) );\n\tif ( material.iridescenceThickness == 0.0 ) {\n\t\tmaterial.iridescence = 0.0;\n\t} else {\n\t\tmaterial.iridescence = saturate( material.iridescence );\n\t}\n\tif ( material.iridescence > 0.0 ) {\n\t\tmaterial.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );\n\t\tmaterial.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );\n\t}\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointLightInfo( pointLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n\t\tpointLightShadow = pointLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\tvec4 spotColor;\n\tvec3 spotLightCoord;\n\tbool inSpotLightMap;\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotLightInfo( spotLight, geometry, directLight );\n\t\t#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n\t\t#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX\n\t\t#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\t#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS\n\t\t#else\n\t\t#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n\t\t#endif\n\t\t#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )\n\t\t\tspotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;\n\t\t\tinSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );\n\t\t\tspotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );\n\t\t\tdirectLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;\n\t\t#endif\n\t\t#undef SPOT_LIGHT_MAP_INDEX\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tspotLightShadow = spotLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalLightInfo( directionalLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectionalLightShadow = directionalLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 iblIrradiance = vec3( 0.0 );\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\tirradiance += getLightProbeIrradiance( lightProbe, geometry.normal );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n#endif',
  lights_fragment_maps =
    '#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\t\tvec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tiblIrradiance += getIBLIrradiance( geometry.normal );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );\n\t#ifdef USE_CLEARCOAT\n\t\tclearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );\n\t#endif\n#endif',
  lights_fragment_end =
    '#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );\n#endif',
  logdepthbuf_fragment =
    '#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif',
  logdepthbuf_pars_fragment =
    '#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif',
  logdepthbuf_pars_vertex =
    '#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t\tvarying float vIsPerspective;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif',
  logdepthbuf_vertex =
    '#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n\t#else\n\t\tif ( isPerspectiveMatrix( projectionMatrix ) ) {\n\t\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\t\tgl_Position.z *= gl_Position.w;\n\t\t}\n\t#endif\n#endif',
  map_fragment =
    '#ifdef USE_MAP\n\tvec4 sampledDiffuseColor = texture2D( map, vMapUv );\n\t#ifdef DECODE_VIDEO_TEXTURE\n\t\tsampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );\n\t#endif\n\tdiffuseColor *= sampledDiffuseColor;\n#endif',
  map_pars_fragment = '#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif',
  map_particle_fragment =
    '#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\t#if defined( USE_POINTS_UV )\n\t\tvec2 uv = vUv;\n\t#else\n\t\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\t#endif\n#endif\n#ifdef USE_MAP\n\tdiffuseColor *= texture2D( map, uv );\n#endif\n#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif',
  map_particle_pars_fragment =
    '#if defined( USE_POINTS_UV )\n\tvarying vec2 vUv;\n#else\n\t#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\t\tuniform mat3 uvTransform;\n\t#endif\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif',
  metalnessmap_fragment =
    'float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif',
  metalnessmap_pars_fragment = '#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif',
  morphcolor_vertex =
    '#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )\n\tvColor *= morphTargetBaseInfluence;\n\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\t#if defined( USE_COLOR_ALPHA )\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];\n\t\t#elif defined( USE_COLOR )\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];\n\t\t#endif\n\t}\n#endif',
  morphnormal_vertex =
    '#ifdef USE_MORPHNORMALS\n\tobjectNormal *= morphTargetBaseInfluence;\n\t#ifdef MORPHTARGETS_TEXTURE\n\t\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];\n\t\t}\n\t#else\n\t\tobjectNormal += morphNormal0 * morphTargetInfluences[ 0 ];\n\t\tobjectNormal += morphNormal1 * morphTargetInfluences[ 1 ];\n\t\tobjectNormal += morphNormal2 * morphTargetInfluences[ 2 ];\n\t\tobjectNormal += morphNormal3 * morphTargetInfluences[ 3 ];\n\t#endif\n#endif',
  morphtarget_pars_vertex =
    '#ifdef USE_MORPHTARGETS\n\tuniform float morphTargetBaseInfluence;\n\t#ifdef MORPHTARGETS_TEXTURE\n\t\tuniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n\t\tuniform sampler2DArray morphTargetsTexture;\n\t\tuniform ivec2 morphTargetsTextureSize;\n\t\tvec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {\n\t\t\tint texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;\n\t\t\tint y = texelIndex / morphTargetsTextureSize.x;\n\t\t\tint x = texelIndex - y * morphTargetsTextureSize.x;\n\t\t\tivec3 morphUV = ivec3( x, y, morphTargetIndex );\n\t\t\treturn texelFetch( morphTargetsTexture, morphUV, 0 );\n\t\t}\n\t#else\n\t\t#ifndef USE_MORPHNORMALS\n\t\t\tuniform float morphTargetInfluences[ 8 ];\n\t\t#else\n\t\t\tuniform float morphTargetInfluences[ 4 ];\n\t\t#endif\n\t#endif\n#endif',
  morphtarget_vertex =
    '#ifdef USE_MORPHTARGETS\n\ttransformed *= morphTargetBaseInfluence;\n\t#ifdef MORPHTARGETS_TEXTURE\n\t\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];\n\t\t}\n\t#else\n\t\ttransformed += morphTarget0 * morphTargetInfluences[ 0 ];\n\t\ttransformed += morphTarget1 * morphTargetInfluences[ 1 ];\n\t\ttransformed += morphTarget2 * morphTargetInfluences[ 2 ];\n\t\ttransformed += morphTarget3 * morphTargetInfluences[ 3 ];\n\t\t#ifndef USE_MORPHNORMALS\n\t\t\ttransformed += morphTarget4 * morphTargetInfluences[ 4 ];\n\t\t\ttransformed += morphTarget5 * morphTargetInfluences[ 5 ];\n\t\t\ttransformed += morphTarget6 * morphTargetInfluences[ 6 ];\n\t\t\ttransformed += morphTarget7 * morphTargetInfluences[ 7 ];\n\t\t#endif\n\t#endif\n#endif',
  normal_fragment_begin =
    'float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n\tvec3 fdx = dFdx( vViewPosition );\n\tvec3 fdy = dFdy( vViewPosition );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal *= faceDirection;\n\t#endif\n#endif\n#ifdef USE_NORMALMAP_TANGENTSPACE\n\t#ifdef USE_TANGENT\n\t\tmat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n\t#else\n\t\tmat3 tbn = getTangentFrame( - vViewPosition, normal, vNormalMapUv );\n\t#endif\n\t#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n\t\ttbn[0] *= faceDirection;\n\t\ttbn[1] *= faceDirection;\n\t#endif\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\t#ifdef USE_TANGENT\n\t\tmat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n\t#else\n\t\tmat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );\n\t#endif\n\t#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n\t\ttbn2[0] *= faceDirection;\n\t\ttbn2[1] *= faceDirection;\n\t#endif\n#endif\nvec3 geometryNormal = normal;',
  normal_fragment_maps =
    '#ifdef USE_NORMALMAP_OBJECTSPACE\n\tnormal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n\t#ifdef FLIP_SIDED\n\t\tnormal = - normal;\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\tnormal = normalize( normalMatrix * normal );\n#elif defined( USE_NORMALMAP_TANGENTSPACE )\n\tvec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n\tmapN.xy *= normalScale;\n\tnormal = normalize( tbn * mapN );\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif',
  normal_pars_fragment =
    '#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif',
  normal_pars_vertex =
    '#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif',
  normal_vertex =
    '#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif',
  normalmap_pars_fragment =
    '#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n#endif\n#ifdef USE_NORMALMAP_OBJECTSPACE\n\tuniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) )\n\tmat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {\n\t\tvec3 q0 = dFdx( eye_pos.xyz );\n\t\tvec3 q1 = dFdy( eye_pos.xyz );\n\t\tvec2 st0 = dFdx( uv.st );\n\t\tvec2 st1 = dFdy( uv.st );\n\t\tvec3 N = surf_norm;\n\t\tvec3 q1perp = cross( q1, N );\n\t\tvec3 q0perp = cross( N, q0 );\n\t\tvec3 T = q1perp * st0.x + q0perp * st1.x;\n\t\tvec3 B = q1perp * st0.y + q0perp * st1.y;\n\t\tfloat det = max( dot( T, T ), dot( B, B ) );\n\t\tfloat scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );\n\t\treturn mat3( T * scale, B * scale, N );\n\t}\n#endif',
  clearcoat_normal_fragment_begin =
    '#ifdef USE_CLEARCOAT\n\tvec3 clearcoatNormal = geometryNormal;\n#endif',
  clearcoat_normal_fragment_maps =
    '#ifdef USE_CLEARCOAT_NORMALMAP\n\tvec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;\n\tclearcoatMapN.xy *= clearcoatNormalScale;\n\tclearcoatNormal = normalize( tbn2 * clearcoatMapN );\n#endif',
  clearcoat_pars_fragment =
    '#ifdef USE_CLEARCOATMAP\n\tuniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform sampler2D clearcoatRoughnessMap;\n#endif',
  iridescence_pars_fragment =
    '#ifdef USE_IRIDESCENCEMAP\n\tuniform sampler2D iridescenceMap;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tuniform sampler2D iridescenceThicknessMap;\n#endif',
  output_fragment =
    '#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= material.transmissionAlpha + 0.1;\n#endif\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );',
  packing =
    'vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nvec2 packDepthToRG( in highp float v ) {\n\treturn packDepthToRGBA( v ).yx;\n}\nfloat unpackRGToDepth( const in highp vec2 v ) {\n\treturn unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );\n}\nvec4 pack2HalfToRGBA( vec2 v ) {\n\tvec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n\treturn vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\nvec2 unpackRGBATo2Half( vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {\n\treturn depth * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * depth - far );\n}',
  premultiplied_alpha_fragment =
    '#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif',
  project_vertex =
    'vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_INSTANCING\n\tmvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;',
  dithering_fragment =
    '#ifdef DITHERING\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif',
  dithering_pars_fragment =
    '#ifdef DITHERING\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif',
  roughnessmap_fragment =
    'float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );\n\troughnessFactor *= texelRoughness.g;\n#endif',
  roughnessmap_pars_fragment = '#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif',
  shadowmap_pars_fragment =
    '#if NUM_SPOT_LIGHT_COORDS > 0\n\tvarying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#if NUM_SPOT_LIGHT_MAPS > 0\n\tuniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];\n#endif\n#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tvec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n\t\treturn unpackRGBATo2Half( texture2D( shadow, uv ) );\n\t}\n\tfloat VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n\t\tfloat occlusion = 1.0;\n\t\tvec2 distribution = texture2DDistribution( shadow, uv );\n\t\tfloat hard_shadow = step( compare , distribution.x );\n\t\tif (hard_shadow != 1.0 ) {\n\t\t\tfloat distance = compare - distribution.x ;\n\t\t\tfloat variance = max( 0.00000, distribution.y * distribution.y );\n\t\t\tfloat softness_probability = variance / (variance + distance * distance );\t\t\tsoftness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );\t\t\tocclusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n\t\t}\n\t\treturn occlusion;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n\t\tbool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tfloat dx2 = dx0 / 2.0;\n\t\t\tfloat dy2 = dy0 / 2.0;\n\t\t\tfloat dx3 = dx1 / 2.0;\n\t\t\tfloat dy3 = dy1 / 2.0;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 17.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx = texelSize.x;\n\t\t\tfloat dy = texelSize.y;\n\t\t\tvec2 uv = shadowCoord.xy;\n\t\t\tvec2 f = fract( uv * shadowMapSize + 0.5 );\n\t\t\tuv -= f * texelSize;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, uv, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t f.y )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_VSM )\n\t\t\tshadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif',
  shadowmap_pars_vertex =
    '#if NUM_SPOT_LIGHT_COORDS > 0\n\tuniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];\n\tvarying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n#endif',
  shadowmap_vertex =
    '#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )\n\tvec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\tvec4 shadowWorldPosition;\n#endif\n#if defined( USE_SHADOWMAP )\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n\t\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n\t\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if NUM_SPOT_LIGHT_COORDS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition;\n\t\t#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\t\tshadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;\n\t\t#endif\n\t\tvSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n#endif',
  shadowmask_pars_fragment =
    'float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tdirectionalLight = directionalLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tspotLight = spotLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tpointLight = pointLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#endif\n\treturn shadow;\n}',
  skinbase_vertex =
    '#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif',
  skinning_pars_vertex =
    '#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\tuniform highp sampler2D boneTexture;\n\tuniform int boneTextureSize;\n\tmat4 getBoneMatrix( const in float i ) {\n\t\tfloat j = i * 4.0;\n\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\ty = dy * ( y + 0.5 );\n\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\treturn bone;\n\t}\n#endif',
  skinning_vertex =
    '#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif',
  skinnormal_vertex =
    '#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\t#ifdef USE_TANGENT\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#endif\n#endif',
  specularmap_fragment =
    'float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif',
  specularmap_pars_fragment = '#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif',
  tonemapping_fragment =
    '#if defined( TONE_MAPPING )\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif',
  tonemapping_pars_fragment =
    '#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n\tvec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n\tvec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n\treturn a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\tconst mat3 ACESInputMat = mat3(\n\t\tvec3( 0.59719, 0.07600, 0.02840 ),\t\tvec3( 0.35458, 0.90834, 0.13383 ),\n\t\tvec3( 0.04823, 0.01566, 0.83777 )\n\t);\n\tconst mat3 ACESOutputMat = mat3(\n\t\tvec3(  1.60475, -0.10208, -0.00327 ),\t\tvec3( -0.53108,  1.10813, -0.07276 ),\n\t\tvec3( -0.07367, -0.00605,  1.07602 )\n\t);\n\tcolor *= toneMappingExposure / 0.6;\n\tcolor = ACESInputMat * color;\n\tcolor = RRTAndODTFit( color );\n\tcolor = ACESOutputMat * color;\n\treturn saturate( color );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }',
  transmission_fragment =
    '#ifdef USE_TRANSMISSION\n\tmaterial.transmission = transmission;\n\tmaterial.transmissionAlpha = 1.0;\n\tmaterial.thickness = thickness;\n\tmaterial.attenuationDistance = attenuationDistance;\n\tmaterial.attenuationColor = attenuationColor;\n\t#ifdef USE_TRANSMISSIONMAP\n\t\tmaterial.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;\n\t#endif\n\t#ifdef USE_THICKNESSMAP\n\t\tmaterial.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;\n\t#endif\n\tvec3 pos = vWorldPosition;\n\tvec3 v = normalize( cameraPosition - pos );\n\tvec3 n = inverseTransformDirection( normal, viewMatrix );\n\tvec4 transmission = getIBLVolumeRefraction(\n\t\tn, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,\n\t\tpos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,\n\t\tmaterial.attenuationColor, material.attenuationDistance );\n\tmaterial.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );\n\ttotalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );\n#endif',
  transmission_pars_fragment =
    '#ifdef USE_TRANSMISSION\n\tuniform float transmission;\n\tuniform float thickness;\n\tuniform float attenuationDistance;\n\tuniform vec3 attenuationColor;\n\t#ifdef USE_TRANSMISSIONMAP\n\t\tuniform sampler2D transmissionMap;\n\t#endif\n\t#ifdef USE_THICKNESSMAP\n\t\tuniform sampler2D thicknessMap;\n\t#endif\n\tuniform vec2 transmissionSamplerSize;\n\tuniform sampler2D transmissionSamplerMap;\n\tuniform mat4 modelMatrix;\n\tuniform mat4 projectionMatrix;\n\tvarying vec3 vWorldPosition;\n\tfloat w0( float a ) {\n\t\treturn ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );\n\t}\n\tfloat w1( float a ) {\n\t\treturn ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );\n\t}\n\tfloat w2( float a ){\n\t\treturn ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );\n\t}\n\tfloat w3( float a ) {\n\t\treturn ( 1.0 / 6.0 ) * ( a * a * a );\n\t}\n\tfloat g0( float a ) {\n\t\treturn w0( a ) + w1( a );\n\t}\n\tfloat g1( float a ) {\n\t\treturn w2( a ) + w3( a );\n\t}\n\tfloat h0( float a ) {\n\t\treturn - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );\n\t}\n\tfloat h1( float a ) {\n\t\treturn 1.0 + w3( a ) / ( w2( a ) + w3( a ) );\n\t}\n\tvec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, vec2 fullSize, float lod ) {\n\t\tuv = uv * texelSize.zw + 0.5;\n\t\tvec2 iuv = floor( uv );\n\t\tvec2 fuv = fract( uv );\n\t\tfloat g0x = g0( fuv.x );\n\t\tfloat g1x = g1( fuv.x );\n\t\tfloat h0x = h0( fuv.x );\n\t\tfloat h1x = h1( fuv.x );\n\t\tfloat h0y = h0( fuv.y );\n\t\tfloat h1y = h1( fuv.y );\n\t\tvec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n\t\t\n\t\tvec2 lodFudge = pow( 1.95, lod ) / fullSize;\n\t\treturn g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +\n\t\t\tg1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );\n\t}\n\tvec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {\n\t\tvec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );\n\t\tvec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );\n\t\tvec2 fLodSizeInv = 1.0 / fLodSize;\n\t\tvec2 cLodSizeInv = 1.0 / cLodSize;\n\t\tvec2 fullSize = vec2( textureSize( sampler, 0 ) );\n\t\tvec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), fullSize, floor( lod ) );\n\t\tvec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), fullSize, ceil( lod ) );\n\t\treturn mix( fSample, cSample, fract( lod ) );\n\t}\n\tvec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {\n\t\tvec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n\t\tvec3 modelScale;\n\t\tmodelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n\t\tmodelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n\t\tmodelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n\t\treturn normalize( refractionVector ) * thickness * modelScale;\n\t}\n\tfloat applyIorToRoughness( const in float roughness, const in float ior ) {\n\t\treturn roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n\t}\n\tvec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {\n\t\tfloat lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n\t\treturn textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );\n\t}\n\tvec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {\n\t\tif ( isinf( attenuationDistance ) ) {\n\t\t\treturn radiance;\n\t\t} else {\n\t\t\tvec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n\t\t\tvec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );\t\t\treturn transmittance * radiance;\n\t\t}\n\t}\n\tvec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,\n\t\tconst in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,\n\t\tconst in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,\n\t\tconst in vec3 attenuationColor, const in float attenuationDistance ) {\n\t\tvec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n\t\tvec3 refractedRayExit = position + transmissionRay;\n\t\tvec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n\t\tvec2 refractionCoords = ndcPos.xy / ndcPos.w;\n\t\trefractionCoords += 1.0;\n\t\trefractionCoords /= 2.0;\n\t\tvec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n\t\tvec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );\n\t\tvec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n\t\treturn vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );\n\t}\n#endif',
  uv_pars_fragment =
    '#ifdef USE_UV\n\tvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\n\tvarying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n\tvarying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n\tvarying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n\tvarying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n\tvarying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n\tvarying vec2 vNormalMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n\tvarying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n\tvarying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n\tvarying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n\tvarying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tvarying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tvarying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\tvarying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tvarying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\tvarying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\tvarying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n\tvarying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\tvarying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\tvarying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\tuniform mat3 transmissionMapTransform;\n\tvarying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n\tuniform mat3 thicknessMapTransform;\n\tvarying vec2 vThicknessMapUv;\n#endif',
  uv_pars_vertex =
    '#ifdef USE_UV\n\tvarying vec2 vUv;\n#endif\n#ifdef USE_UV2\n\tattribute vec2 uv2;\n#endif\n#ifdef USE_MAP\n\tuniform mat3 mapTransform;\n\tvarying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform mat3 alphaMapTransform;\n\tvarying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n\tuniform mat3 lightMapTransform;\n\tvarying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n\tuniform mat3 aoMapTransform;\n\tvarying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n\tuniform mat3 bumpMapTransform;\n\tvarying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n\tuniform mat3 normalMapTransform;\n\tvarying vec2 vNormalMapUv;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n\tuniform mat3 displacementMapTransform;\n\tvarying vec2 vDisplacementMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n\tuniform mat3 emissiveMapTransform;\n\tvarying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n\tuniform mat3 metalnessMapTransform;\n\tvarying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n\tuniform mat3 roughnessMapTransform;\n\tvarying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n\tuniform mat3 clearcoatMapTransform;\n\tvarying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform mat3 clearcoatNormalMapTransform;\n\tvarying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform mat3 clearcoatRoughnessMapTransform;\n\tvarying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\tuniform mat3 sheenColorMapTransform;\n\tvarying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\tuniform mat3 sheenRoughnessMapTransform;\n\tvarying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\tuniform mat3 iridescenceMapTransform;\n\tvarying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tuniform mat3 iridescenceThicknessMapTransform;\n\tvarying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n\tuniform mat3 specularMapTransform;\n\tvarying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\tuniform mat3 specularColorMapTransform;\n\tvarying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\tuniform mat3 specularIntensityMapTransform;\n\tvarying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\tuniform mat3 transmissionMapTransform;\n\tvarying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n\tuniform mat3 thicknessMapTransform;\n\tvarying vec2 vThicknessMapUv;\n#endif',
  uv_vertex =
    '#ifdef USE_UV\n\tvUv = vec3( uv, 1 ).xy;\n#endif\n#ifdef USE_MAP\n\tvMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ALPHAMAP\n\tvAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_LIGHTMAP\n\tvLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_AOMAP\n\tvAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_BUMPMAP\n\tvBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_NORMALMAP\n\tvNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n\tvDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_EMISSIVEMAP\n\tvEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_METALNESSMAP\n\tvMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ROUGHNESSMAP\n\tvRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOATMAP\n\tvClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tvClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tvClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\tvIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tvIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\tvSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\tvSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULARMAP\n\tvSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\tvSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\tvSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\tvTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_THICKNESSMAP\n\tvThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;\n#endif',
  worldpos_vertex =
    '#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMatrix * worldPosition;\n\t#endif\n\tworldPosition = modelMatrix * worldPosition;\n#endif';
const vertex$h =
    'varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n}',
  fragment$h =
    'uniform sampler2D t2D;\nuniform float backgroundIntensity;\nvarying vec2 vUv;\nvoid main() {\n\tvec4 texColor = texture2D( t2D, vUv );\n\t#ifdef DECODE_VIDEO_TEXTURE\n\t\ttexColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );\n\t#endif\n\ttexColor.rgb *= backgroundIntensity;\n\tgl_FragColor = texColor;\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}',
  vertex$g =
    'varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}',
  fragment$g =
    '#ifdef ENVMAP_TYPE_CUBE\n\tuniform samplerCube envMap;\n#elif defined( ENVMAP_TYPE_CUBE_UV )\n\tuniform sampler2D envMap;\n#endif\nuniform float flipEnvMap;\nuniform float backgroundBlurriness;\nuniform float backgroundIntensity;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\tvec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );\n\t#else\n\t\tvec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n\t#endif\n\ttexColor.rgb *= backgroundIntensity;\n\tgl_FragColor = texColor;\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}',
  vertex$f =
    'varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}',
  fragment$f =
    'uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n\tvec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n\tgl_FragColor = texColor;\n\tgl_FragColor.a *= opacity;\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}',
  vertex$e =
    '#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvHighPrecisionZW = gl_Position.zw;\n}',
  fragment$e =
    '#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\t#endif\n}',
  vertex$d =
    '#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}',
  fragment$d =
    '#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}',
  vertex$c =
    'varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}',
  fragment$c =
    'uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV = equirectUv( direction );\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}',
  vertex$b =
    'uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\tvLineDistance = scale * lineDistance;\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}',
  fragment$b =
    'uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}',
  vertex$a =
    '#include <common>\n#include <uv_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinbase_vertex>\n\t\t#include <skinnormal_vertex>\n\t\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}',
  fragment$a =
    'uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\t\treflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}',
  vertex$9 =
    '#define LAMBERT\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}',
  fragment$9 =
    '#define LAMBERT\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_lambert_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_lambert_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}',
  vertex$8 =
    '#define MATCAP\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}',
  fragment$8 =
    '#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\t#ifdef USE_MATCAP\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t#else\n\t\tvec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );\n\t#endif\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}',
  vertex$7 =
    '#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvarying vec3 vViewPosition;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}',
  fragment$7 =
    '#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvarying vec3 vViewPosition;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n\t#ifdef OPAQUE\n\t\tgl_FragColor.a = 1.0;\n\t#endif\n}',
  vertex$6 =
    '#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}',
  fragment$6 =
    '#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}',
  vertex$5 =
    '#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n\tvarying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n\tvWorldPosition = worldPosition.xyz;\n#endif\n}',
  fragment$5 =
    '#define STANDARD\n#ifdef PHYSICAL\n\t#define IOR\n\t#define USE_SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n\tuniform float ior;\n#endif\n#ifdef USE_SPECULAR\n\tuniform float specularIntensity;\n\tuniform vec3 specularColor;\n\t#ifdef USE_SPECULAR_COLORMAP\n\t\tuniform sampler2D specularColorMap;\n\t#endif\n\t#ifdef USE_SPECULAR_INTENSITYMAP\n\t\tuniform sampler2D specularIntensityMap;\n\t#endif\n#endif\n#ifdef USE_CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n#ifdef USE_IRIDESCENCE\n\tuniform float iridescence;\n\tuniform float iridescenceIOR;\n\tuniform float iridescenceThicknessMinimum;\n\tuniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheenColor;\n\tuniform float sheenRoughness;\n\t#ifdef USE_SHEEN_COLORMAP\n\t\tuniform sampler2D sheenColorMap;\n\t#endif\n\t#ifdef USE_SHEEN_ROUGHNESSMAP\n\t\tuniform sampler2D sheenRoughnessMap;\n\t#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <iridescence_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n\tvec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n\t#include <transmission_fragment>\n\tvec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n\t#ifdef USE_SHEEN\n\t\tfloat sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );\n\t\toutgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;\n\t#endif\n\t#ifdef USE_CLEARCOAT\n\t\tfloat dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );\n\t\tvec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n\t\toutgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;\n\t#endif\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}',
  vertex$4 =
    '#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}',
  fragment$4 =
    '#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_toon_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}',
  vertex$3 =
    'uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n#ifdef USE_POINTS_UV\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif\nvoid main() {\n\t#ifdef USE_POINTS_UV\n\t\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\t#endif\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}',
  fragment$3 =
    'uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}',
  vertex$2 =
    '#include <common>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}',
  fragment$2 =
    'uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <logdepthbuf_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\t#include <logdepthbuf_fragment>\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}',
  vertex$1 =
    'uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}',
  fragment$1 =
    'uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}',
  ShaderChunk = {
    alphamap_fragment: alphamap_fragment,
    alphamap_pars_fragment: alphamap_pars_fragment,
    alphatest_fragment: alphatest_fragment,
    alphatest_pars_fragment: alphatest_pars_fragment,
    aomap_fragment: aomap_fragment,
    aomap_pars_fragment: aomap_pars_fragment,
    begin_vertex: begin_vertex,
    beginnormal_vertex: beginnormal_vertex,
    bsdfs: bsdfs,
    iridescence_fragment: iridescence_fragment,
    bumpmap_pars_fragment: bumpmap_pars_fragment,
    clipping_planes_fragment: clipping_planes_fragment,
    clipping_planes_pars_fragment: clipping_planes_pars_fragment,
    clipping_planes_pars_vertex: clipping_planes_pars_vertex,
    clipping_planes_vertex: clipping_planes_vertex,
    color_fragment: color_fragment,
    color_pars_fragment: color_pars_fragment,
    color_pars_vertex: color_pars_vertex,
    color_vertex: color_vertex,
    common: common,
    cube_uv_reflection_fragment: cube_uv_reflection_fragment,
    defaultnormal_vertex: defaultnormal_vertex,
    displacementmap_pars_vertex: displacementmap_pars_vertex,
    displacementmap_vertex: displacementmap_vertex,
    emissivemap_fragment: emissivemap_fragment,
    emissivemap_pars_fragment: emissivemap_pars_fragment,
    encodings_fragment: encodings_fragment,
    encodings_pars_fragment: encodings_pars_fragment,
    envmap_fragment: envmap_fragment,
    envmap_common_pars_fragment: envmap_common_pars_fragment,
    envmap_pars_fragment: envmap_pars_fragment,
    envmap_pars_vertex: envmap_pars_vertex,
    envmap_physical_pars_fragment: envmap_physical_pars_fragment,
    envmap_vertex: envmap_vertex,
    fog_vertex: fog_vertex,
    fog_pars_vertex: fog_pars_vertex,
    fog_fragment: fog_fragment,
    fog_pars_fragment: fog_pars_fragment,
    gradientmap_pars_fragment: gradientmap_pars_fragment,
    lightmap_fragment: lightmap_fragment,
    lightmap_pars_fragment: lightmap_pars_fragment,
    lights_lambert_fragment: lights_lambert_fragment,
    lights_lambert_pars_fragment: lights_lambert_pars_fragment,
    lights_pars_begin: lights_pars_begin,
    lights_toon_fragment: lights_toon_fragment,
    lights_toon_pars_fragment: lights_toon_pars_fragment,
    lights_phong_fragment: lights_phong_fragment,
    lights_phong_pars_fragment: lights_phong_pars_fragment,
    lights_physical_fragment: lights_physical_fragment,
    lights_physical_pars_fragment: lights_physical_pars_fragment,
    lights_fragment_begin: lights_fragment_begin,
    lights_fragment_maps: lights_fragment_maps,
    lights_fragment_end: lights_fragment_end,
    logdepthbuf_fragment: logdepthbuf_fragment,
    logdepthbuf_pars_fragment: logdepthbuf_pars_fragment,
    logdepthbuf_pars_vertex: logdepthbuf_pars_vertex,
    logdepthbuf_vertex: logdepthbuf_vertex,
    map_fragment: map_fragment,
    map_pars_fragment: map_pars_fragment,
    map_particle_fragment: map_particle_fragment,
    map_particle_pars_fragment: map_particle_pars_fragment,
    metalnessmap_fragment: metalnessmap_fragment,
    metalnessmap_pars_fragment: metalnessmap_pars_fragment,
    morphcolor_vertex: morphcolor_vertex,
    morphnormal_vertex: morphnormal_vertex,
    morphtarget_pars_vertex: morphtarget_pars_vertex,
    morphtarget_vertex: morphtarget_vertex,
    normal_fragment_begin: normal_fragment_begin,
    normal_fragment_maps: normal_fragment_maps,
    normal_pars_fragment: normal_pars_fragment,
    normal_pars_vertex: normal_pars_vertex,
    normal_vertex: normal_vertex,
    normalmap_pars_fragment: normalmap_pars_fragment,
    clearcoat_normal_fragment_begin: clearcoat_normal_fragment_begin,
    clearcoat_normal_fragment_maps: clearcoat_normal_fragment_maps,
    clearcoat_pars_fragment: clearcoat_pars_fragment,
    iridescence_pars_fragment: iridescence_pars_fragment,
    output_fragment: output_fragment,
    packing: packing,
    premultiplied_alpha_fragment: premultiplied_alpha_fragment,
    project_vertex: project_vertex,
    dithering_fragment: dithering_fragment,
    dithering_pars_fragment: dithering_pars_fragment,
    roughnessmap_fragment: roughnessmap_fragment,
    roughnessmap_pars_fragment: roughnessmap_pars_fragment,
    shadowmap_pars_fragment: shadowmap_pars_fragment,
    shadowmap_pars_vertex: shadowmap_pars_vertex,
    shadowmap_vertex: shadowmap_vertex,
    shadowmask_pars_fragment: shadowmask_pars_fragment,
    skinbase_vertex: skinbase_vertex,
    skinning_pars_vertex: skinning_pars_vertex,
    skinning_vertex: skinning_vertex,
    skinnormal_vertex: skinnormal_vertex,
    specularmap_fragment: specularmap_fragment,
    specularmap_pars_fragment: specularmap_pars_fragment,
    tonemapping_fragment: tonemapping_fragment,
    tonemapping_pars_fragment: tonemapping_pars_fragment,
    transmission_fragment: transmission_fragment,
    transmission_pars_fragment: transmission_pars_fragment,
    uv_pars_fragment: uv_pars_fragment,
    uv_pars_vertex: uv_pars_vertex,
    uv_vertex: uv_vertex,
    worldpos_vertex: worldpos_vertex,
    background_vert: vertex$h,
    background_frag: fragment$h,
    backgroundCube_vert: vertex$g,
    backgroundCube_frag: fragment$g,
    cube_vert: vertex$f,
    cube_frag: fragment$f,
    depth_vert: vertex$e,
    depth_frag: fragment$e,
    distanceRGBA_vert: vertex$d,
    distanceRGBA_frag: fragment$d,
    equirect_vert: vertex$c,
    equirect_frag: fragment$c,
    linedashed_vert: vertex$b,
    linedashed_frag: fragment$b,
    meshbasic_vert: vertex$a,
    meshbasic_frag: fragment$a,
    meshlambert_vert: vertex$9,
    meshlambert_frag: fragment$9,
    meshmatcap_vert: vertex$8,
    meshmatcap_frag: fragment$8,
    meshnormal_vert: vertex$7,
    meshnormal_frag: fragment$7,
    meshphong_vert: vertex$6,
    meshphong_frag: fragment$6,
    meshphysical_vert: vertex$5,
    meshphysical_frag: fragment$5,
    meshtoon_vert: vertex$4,
    meshtoon_frag: fragment$4,
    points_vert: vertex$3,
    points_frag: fragment$3,
    shadow_vert: vertex$2,
    shadow_frag: fragment$2,
    sprite_vert: vertex$1,
    sprite_frag: fragment$1,
  },
  UniformsLib = {
    common: {
      diffuse: { value: new Color(16777215) },
      opacity: { value: 1 },
      map: { value: null },
      mapTransform: { value: new Matrix3() },
      alphaMap: { value: null },
      alphaMapTransform: { value: new Matrix3() },
      alphaTest: { value: 0 },
    },
    specularmap: { specularMap: { value: null }, specularMapTransform: { value: new Matrix3() } },
    envmap: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      reflectivity: { value: 1 },
      ior: { value: 1.5 },
      refractionRatio: { value: 0.98 },
    },
    aomap: {
      aoMap: { value: null },
      aoMapIntensity: { value: 1 },
      aoMapTransform: { value: new Matrix3() },
    },
    lightmap: {
      lightMap: { value: null },
      lightMapIntensity: { value: 1 },
      lightMapTransform: { value: new Matrix3() },
    },
    bumpmap: {
      bumpMap: { value: null },
      bumpMapTransform: { value: new Matrix3() },
      bumpScale: { value: 1 },
    },
    normalmap: {
      normalMap: { value: null },
      normalMapTransform: { value: new Matrix3() },
      normalScale: { value: new Vector2(1, 1) },
    },
    displacementmap: {
      displacementMap: { value: null },
      displacementMapTransform: { value: new Matrix3() },
      displacementScale: { value: 1 },
      displacementBias: { value: 0 },
    },
    emissivemap: { emissiveMap: { value: null }, emissiveMapTransform: { value: new Matrix3() } },
    metalnessmap: {
      metalnessMap: { value: null },
      metalnessMapTransform: { value: new Matrix3() },
    },
    roughnessmap: {
      roughnessMap: { value: null },
      roughnessMapTransform: { value: new Matrix3() },
    },
    gradientmap: { gradientMap: { value: null } },
    fog: {
      fogDensity: { value: 25e-5 },
      fogNear: { value: 1 },
      fogFar: { value: 2e3 },
      fogColor: { value: new Color(16777215) },
    },
    lights: {
      ambientLightColor: { value: [] },
      lightProbe: { value: [] },
      directionalLights: { value: [], properties: { direction: {}, color: {} } },
      directionalLightShadows: {
        value: [],
        properties: { shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} },
      },
      directionalShadowMap: { value: [] },
      directionalShadowMatrix: { value: [] },
      spotLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          direction: {},
          distance: {},
          coneCos: {},
          penumbraCos: {},
          decay: {},
        },
      },
      spotLightShadows: {
        value: [],
        properties: { shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} },
      },
      spotLightMap: { value: [] },
      spotShadowMap: { value: [] },
      spotLightMatrix: { value: [] },
      pointLights: { value: [], properties: { color: {}, position: {}, decay: {}, distance: {} } },
      pointLightShadows: {
        value: [],
        properties: {
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
          shadowCameraNear: {},
          shadowCameraFar: {},
        },
      },
      pointShadowMap: { value: [] },
      pointShadowMatrix: { value: [] },
      hemisphereLights: { value: [], properties: { direction: {}, skyColor: {}, groundColor: {} } },
      rectAreaLights: { value: [], properties: { color: {}, position: {}, width: {}, height: {} } },
      ltc_1: { value: null },
      ltc_2: { value: null },
    },
    points: {
      diffuse: { value: new Color(16777215) },
      opacity: { value: 1 },
      size: { value: 1 },
      scale: { value: 1 },
      map: { value: null },
      alphaMap: { value: null },
      alphaTest: { value: 0 },
      uvTransform: { value: new Matrix3() },
    },
    sprite: {
      diffuse: { value: new Color(16777215) },
      opacity: { value: 1 },
      center: { value: new Vector2(0.5, 0.5) },
      rotation: { value: 0 },
      map: { value: null },
      mapTransform: { value: new Matrix3() },
      alphaMap: { value: null },
      alphaTest: { value: 0 },
    },
  },
  ShaderLib = {
    basic: {
      uniforms: mergeUniforms([
        UniformsLib.common,
        UniformsLib.specularmap,
        UniformsLib.envmap,
        UniformsLib.aomap,
        UniformsLib.lightmap,
        UniformsLib.fog,
      ]),
      vertexShader: ShaderChunk.meshbasic_vert,
      fragmentShader: ShaderChunk.meshbasic_frag,
    },
    lambert: {
      uniforms: mergeUniforms([
        UniformsLib.common,
        UniformsLib.specularmap,
        UniformsLib.envmap,
        UniformsLib.aomap,
        UniformsLib.lightmap,
        UniformsLib.emissivemap,
        UniformsLib.bumpmap,
        UniformsLib.normalmap,
        UniformsLib.displacementmap,
        UniformsLib.fog,
        UniformsLib.lights,
        { emissive: { value: new Color(0) } },
      ]),
      vertexShader: ShaderChunk.meshlambert_vert,
      fragmentShader: ShaderChunk.meshlambert_frag,
    },
    phong: {
      uniforms: mergeUniforms([
        UniformsLib.common,
        UniformsLib.specularmap,
        UniformsLib.envmap,
        UniformsLib.aomap,
        UniformsLib.lightmap,
        UniformsLib.emissivemap,
        UniformsLib.bumpmap,
        UniformsLib.normalmap,
        UniformsLib.displacementmap,
        UniformsLib.fog,
        UniformsLib.lights,
        {
          emissive: { value: new Color(0) },
          specular: { value: new Color(1118481) },
          shininess: { value: 30 },
        },
      ]),
      vertexShader: ShaderChunk.meshphong_vert,
      fragmentShader: ShaderChunk.meshphong_frag,
    },
    standard: {
      uniforms: mergeUniforms([
        UniformsLib.common,
        UniformsLib.envmap,
        UniformsLib.aomap,
        UniformsLib.lightmap,
        UniformsLib.emissivemap,
        UniformsLib.bumpmap,
        UniformsLib.normalmap,
        UniformsLib.displacementmap,
        UniformsLib.roughnessmap,
        UniformsLib.metalnessmap,
        UniformsLib.fog,
        UniformsLib.lights,
        {
          emissive: { value: new Color(0) },
          roughness: { value: 1 },
          metalness: { value: 0 },
          envMapIntensity: { value: 1 },
        },
      ]),
      vertexShader: ShaderChunk.meshphysical_vert,
      fragmentShader: ShaderChunk.meshphysical_frag,
    },
    toon: {
      uniforms: mergeUniforms([
        UniformsLib.common,
        UniformsLib.aomap,
        UniformsLib.lightmap,
        UniformsLib.emissivemap,
        UniformsLib.bumpmap,
        UniformsLib.normalmap,
        UniformsLib.displacementmap,
        UniformsLib.gradientmap,
        UniformsLib.fog,
        UniformsLib.lights,
        { emissive: { value: new Color(0) } },
      ]),
      vertexShader: ShaderChunk.meshtoon_vert,
      fragmentShader: ShaderChunk.meshtoon_frag,
    },
    matcap: {
      uniforms: mergeUniforms([
        UniformsLib.common,
        UniformsLib.bumpmap,
        UniformsLib.normalmap,
        UniformsLib.displacementmap,
        UniformsLib.fog,
        { matcap: { value: null } },
      ]),
      vertexShader: ShaderChunk.meshmatcap_vert,
      fragmentShader: ShaderChunk.meshmatcap_frag,
    },
    points: {
      uniforms: mergeUniforms([UniformsLib.points, UniformsLib.fog]),
      vertexShader: ShaderChunk.points_vert,
      fragmentShader: ShaderChunk.points_frag,
    },
    dashed: {
      uniforms: mergeUniforms([
        UniformsLib.common,
        UniformsLib.fog,
        { scale: { value: 1 }, dashSize: { value: 1 }, totalSize: { value: 2 } },
      ]),
      vertexShader: ShaderChunk.linedashed_vert,
      fragmentShader: ShaderChunk.linedashed_frag,
    },
    depth: {
      uniforms: mergeUniforms([UniformsLib.common, UniformsLib.displacementmap]),
      vertexShader: ShaderChunk.depth_vert,
      fragmentShader: ShaderChunk.depth_frag,
    },
    normal: {
      uniforms: mergeUniforms([
        UniformsLib.common,
        UniformsLib.bumpmap,
        UniformsLib.normalmap,
        UniformsLib.displacementmap,
        { opacity: { value: 1 } },
      ]),
      vertexShader: ShaderChunk.meshnormal_vert,
      fragmentShader: ShaderChunk.meshnormal_frag,
    },
    sprite: {
      uniforms: mergeUniforms([UniformsLib.sprite, UniformsLib.fog]),
      vertexShader: ShaderChunk.sprite_vert,
      fragmentShader: ShaderChunk.sprite_frag,
    },
    background: {
      uniforms: {
        uvTransform: { value: new Matrix3() },
        t2D: { value: null },
        backgroundIntensity: { value: 1 },
      },
      vertexShader: ShaderChunk.background_vert,
      fragmentShader: ShaderChunk.background_frag,
    },
    backgroundCube: {
      uniforms: {
        envMap: { value: null },
        flipEnvMap: { value: -1 },
        backgroundBlurriness: { value: 0 },
        backgroundIntensity: { value: 1 },
      },
      vertexShader: ShaderChunk.backgroundCube_vert,
      fragmentShader: ShaderChunk.backgroundCube_frag,
    },
    cube: {
      uniforms: { tCube: { value: null }, tFlip: { value: -1 }, opacity: { value: 1 } },
      vertexShader: ShaderChunk.cube_vert,
      fragmentShader: ShaderChunk.cube_frag,
    },
    equirect: {
      uniforms: { tEquirect: { value: null } },
      vertexShader: ShaderChunk.equirect_vert,
      fragmentShader: ShaderChunk.equirect_frag,
    },
    distanceRGBA: {
      uniforms: mergeUniforms([
        UniformsLib.common,
        UniformsLib.displacementmap,
        {
          referencePosition: { value: new Vector3() },
          nearDistance: { value: 1 },
          farDistance: { value: 1e3 },
        },
      ]),
      vertexShader: ShaderChunk.distanceRGBA_vert,
      fragmentShader: ShaderChunk.distanceRGBA_frag,
    },
    shadow: {
      uniforms: mergeUniforms([
        UniformsLib.lights,
        UniformsLib.fog,
        { color: { value: new Color(0) }, opacity: { value: 1 } },
      ]),
      vertexShader: ShaderChunk.shadow_vert,
      fragmentShader: ShaderChunk.shadow_frag,
    },
  };
ShaderLib.physical = {
  uniforms: mergeUniforms([
    ShaderLib.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: new Matrix3() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: new Matrix3() },
      clearcoatNormalScale: { value: new Vector2(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: new Matrix3() },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: new Matrix3() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: new Matrix3() },
      sheen: { value: 0 },
      sheenColor: { value: new Color(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: new Matrix3() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: new Matrix3() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: new Matrix3() },
      transmissionSamplerSize: { value: new Vector2() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: new Matrix3() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: new Color(0) },
      specularColor: { value: new Color(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: new Matrix3() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: new Matrix3() },
    },
  ]),
  vertexShader: ShaderChunk.meshphysical_vert,
  fragmentShader: ShaderChunk.meshphysical_frag,
};
const _rgb = { r: 0, b: 0, g: 0 };
function WebGLBackground(e, t, r, n, i, a, s) {
  const o = new Color(0);
  let l,
    c,
    h = !0 === a ? 0 : 1,
    u = null,
    d = 0,
    p = null;
  function m(t, r) {
    t.getRGB(_rgb, getUnlitUniformColorSpace(e)),
      n.buffers.color.setClear(_rgb.r, _rgb.g, _rgb.b, r, s);
  }
  return {
    getClearColor: function () {
      return o;
    },
    setClearColor: function (e, t = 1) {
      o.set(e), (h = t), m(o, h);
    },
    getClearAlpha: function () {
      return h;
    },
    setClearAlpha: function (e) {
      (h = e), m(o, h);
    },
    render: function (n, a) {
      let s = !1,
        f = !0 === a.isScene ? a.background : null;
      if (f && f.isTexture) {
        f = (a.backgroundBlurriness > 0 ? r : t).get(f);
      }
      const g = e.xr,
        _ = g.getSession && g.getSession();
      _ && 'additive' === _.environmentBlendMode && (f = null),
        null === f ? m(o, h) : f && f.isColor && (m(f, 1), (s = !0)),
        (e.autoClear || s) && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil),
        f && (f.isCubeTexture || 306 === f.mapping)
          ? (void 0 === c &&
              ((c = new Mesh(
                new BoxGeometry(1, 1, 1),
                new ShaderMaterial({
                  name: 'BackgroundCubeMaterial',
                  uniforms: cloneUniforms(ShaderLib.backgroundCube.uniforms),
                  vertexShader: ShaderLib.backgroundCube.vertexShader,
                  fragmentShader: ShaderLib.backgroundCube.fragmentShader,
                  side: 1,
                  depthTest: !1,
                  depthWrite: !1,
                  fog: !1,
                }),
              )),
              c.geometry.deleteAttribute('normal'),
              c.geometry.deleteAttribute('uv'),
              (c.onBeforeRender = function (e, t, r) {
                this.matrixWorld.copyPosition(r.matrixWorld);
              }),
              Object.defineProperty(c.material, 'envMap', {
                get: function () {
                  return this.uniforms.envMap.value;
                },
              }),
              i.update(c)),
            (c.material.uniforms.envMap.value = f),
            (c.material.uniforms.flipEnvMap.value =
              f.isCubeTexture && !1 === f.isRenderTargetTexture ? -1 : 1),
            (c.material.uniforms.backgroundBlurriness.value = a.backgroundBlurriness),
            (c.material.uniforms.backgroundIntensity.value = a.backgroundIntensity),
            (c.material.toneMapped = 3001 !== f.encoding),
            (u === f && d === f.version && p === e.toneMapping) ||
              ((c.material.needsUpdate = !0), (u = f), (d = f.version), (p = e.toneMapping)),
            c.layers.enableAll(),
            n.unshift(c, c.geometry, c.material, 0, 0, null))
          : f &&
            f.isTexture &&
            (void 0 === l &&
              ((l = new Mesh(
                new PlaneGeometry(2, 2),
                new ShaderMaterial({
                  name: 'BackgroundMaterial',
                  uniforms: cloneUniforms(ShaderLib.background.uniforms),
                  vertexShader: ShaderLib.background.vertexShader,
                  fragmentShader: ShaderLib.background.fragmentShader,
                  side: 0,
                  depthTest: !1,
                  depthWrite: !1,
                  fog: !1,
                }),
              )),
              l.geometry.deleteAttribute('normal'),
              Object.defineProperty(l.material, 'map', {
                get: function () {
                  return this.uniforms.t2D.value;
                },
              }),
              i.update(l)),
            (l.material.uniforms.t2D.value = f),
            (l.material.uniforms.backgroundIntensity.value = a.backgroundIntensity),
            (l.material.toneMapped = 3001 !== f.encoding),
            !0 === f.matrixAutoUpdate && f.updateMatrix(),
            l.material.uniforms.uvTransform.value.copy(f.matrix),
            (u === f && d === f.version && p === e.toneMapping) ||
              ((l.material.needsUpdate = !0), (u = f), (d = f.version), (p = e.toneMapping)),
            l.layers.enableAll(),
            n.unshift(l, l.geometry, l.material, 0, 0, null));
    },
  };
}
function WebGLBindingStates(e, t, r, n) {
  const i = e.getParameter(e.MAX_VERTEX_ATTRIBS),
    a = n.isWebGL2 ? null : t.get('OES_vertex_array_object'),
    s = n.isWebGL2 || null !== a,
    o = {},
    l = p(null);
  let c = l,
    h = !1;
  function u(t) {
    return n.isWebGL2 ? e.bindVertexArray(t) : a.bindVertexArrayOES(t);
  }
  function d(t) {
    return n.isWebGL2 ? e.deleteVertexArray(t) : a.deleteVertexArrayOES(t);
  }
  function p(e) {
    const t = [],
      r = [],
      n = [];
    for (let e = 0; e < i; e++) (t[e] = 0), (r[e] = 0), (n[e] = 0);
    return {
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: t,
      enabledAttributes: r,
      attributeDivisors: n,
      object: e,
      attributes: {},
      index: null,
    };
  }
  function m() {
    const e = c.newAttributes;
    for (let t = 0, r = e.length; t < r; t++) e[t] = 0;
  }
  function f(e) {
    g(e, 0);
  }
  function g(r, i) {
    const a = c.newAttributes,
      s = c.enabledAttributes,
      o = c.attributeDivisors;
    if (((a[r] = 1), 0 === s[r] && (e.enableVertexAttribArray(r), (s[r] = 1)), o[r] !== i)) {
      (n.isWebGL2 ? e : t.get('ANGLE_instanced_arrays'))[
        n.isWebGL2 ? 'vertexAttribDivisor' : 'vertexAttribDivisorANGLE'
      ](r, i),
        (o[r] = i);
    }
  }
  function _() {
    const t = c.newAttributes,
      r = c.enabledAttributes;
    for (let n = 0, i = r.length; n < i; n++)
      r[n] !== t[n] && (e.disableVertexAttribArray(n), (r[n] = 0));
  }
  function v(t, r, i, a, s, o) {
    !0 !== n.isWebGL2 || (i !== e.INT && i !== e.UNSIGNED_INT)
      ? e.vertexAttribPointer(t, r, i, a, s, o)
      : e.vertexAttribIPointer(t, r, i, s, o);
  }
  function x() {
    y(), (h = !0), c !== l && ((c = l), u(c.object));
  }
  function y() {
    (l.geometry = null), (l.program = null), (l.wireframe = !1);
  }
  return {
    setup: function (i, l, d, x, y) {
      let M = !1;
      if (s) {
        const t = (function (t, r, i) {
          const s = !0 === i.wireframe;
          let l = o[t.id];
          void 0 === l && ((l = {}), (o[t.id] = l));
          let c = l[r.id];
          void 0 === c && ((c = {}), (l[r.id] = c));
          let h = c[s];
          void 0 === h &&
            ((h = p(n.isWebGL2 ? e.createVertexArray() : a.createVertexArrayOES())), (c[s] = h));
          return h;
        })(x, d, l);
        c !== t && ((c = t), u(c.object)),
          (M = (function (e, t, r, n) {
            const i = c.attributes,
              a = t.attributes;
            let s = 0;
            const o = r.getAttributes();
            for (const t in o) {
              if (o[t].location >= 0) {
                const r = i[t];
                let n = a[t];
                if (
                  (void 0 === n &&
                    ('instanceMatrix' === t && e.instanceMatrix && (n = e.instanceMatrix),
                    'instanceColor' === t && e.instanceColor && (n = e.instanceColor)),
                  void 0 === r)
                )
                  return !0;
                if (r.attribute !== n) return !0;
                if (n && r.data !== n.data) return !0;
                s++;
              }
            }
            return c.attributesNum !== s || c.index !== n;
          })(i, x, d, y)),
          M &&
            (function (e, t, r, n) {
              const i = {},
                a = t.attributes;
              let s = 0;
              const o = r.getAttributes();
              for (const t in o) {
                if (o[t].location >= 0) {
                  let r = a[t];
                  void 0 === r &&
                    ('instanceMatrix' === t && e.instanceMatrix && (r = e.instanceMatrix),
                    'instanceColor' === t && e.instanceColor && (r = e.instanceColor));
                  const n = {};
                  (n.attribute = r), r && r.data && (n.data = r.data), (i[t] = n), s++;
                }
              }
              (c.attributes = i), (c.attributesNum = s), (c.index = n);
            })(i, x, d, y);
      } else {
        const e = !0 === l.wireframe;
        (c.geometry === x.id && c.program === d.id && c.wireframe === e) ||
          ((c.geometry = x.id), (c.program = d.id), (c.wireframe = e), (M = !0));
      }
      null !== y && r.update(y, e.ELEMENT_ARRAY_BUFFER),
        (M || h) &&
          ((h = !1),
          (function (i, a, s, o) {
            if (
              !1 === n.isWebGL2 &&
              (i.isInstancedMesh || o.isInstancedBufferGeometry) &&
              null === t.get('ANGLE_instanced_arrays')
            )
              return;
            m();
            const l = o.attributes,
              c = s.getAttributes(),
              h = a.defaultAttributeValues;
            for (const t in c) {
              const n = c[t];
              if (n.location >= 0) {
                let a = l[t];
                if (
                  (void 0 === a &&
                    ('instanceMatrix' === t && i.instanceMatrix && (a = i.instanceMatrix),
                    'instanceColor' === t && i.instanceColor && (a = i.instanceColor)),
                  void 0 !== a)
                ) {
                  const t = a.normalized,
                    s = a.itemSize,
                    l = r.get(a);
                  if (void 0 === l) continue;
                  const c = l.buffer,
                    h = l.type,
                    u = l.bytesPerElement;
                  if (a.isInterleavedBufferAttribute) {
                    const r = a.data,
                      l = r.stride,
                      d = a.offset;
                    if (r.isInstancedInterleavedBuffer) {
                      for (let e = 0; e < n.locationSize; e++)
                        g(n.location + e, r.meshPerAttribute);
                      !0 !== i.isInstancedMesh &&
                        void 0 === o._maxInstanceCount &&
                        (o._maxInstanceCount = r.meshPerAttribute * r.count);
                    } else for (let e = 0; e < n.locationSize; e++) f(n.location + e);
                    e.bindBuffer(e.ARRAY_BUFFER, c);
                    for (let e = 0; e < n.locationSize; e++)
                      v(
                        n.location + e,
                        s / n.locationSize,
                        h,
                        t,
                        l * u,
                        (d + (s / n.locationSize) * e) * u,
                      );
                  } else {
                    if (a.isInstancedBufferAttribute) {
                      for (let e = 0; e < n.locationSize; e++)
                        g(n.location + e, a.meshPerAttribute);
                      !0 !== i.isInstancedMesh &&
                        void 0 === o._maxInstanceCount &&
                        (o._maxInstanceCount = a.meshPerAttribute * a.count);
                    } else for (let e = 0; e < n.locationSize; e++) f(n.location + e);
                    e.bindBuffer(e.ARRAY_BUFFER, c);
                    for (let e = 0; e < n.locationSize; e++)
                      v(
                        n.location + e,
                        s / n.locationSize,
                        h,
                        t,
                        s * u,
                        (s / n.locationSize) * e * u,
                      );
                  }
                } else if (void 0 !== h) {
                  const r = h[t];
                  if (void 0 !== r)
                    switch (r.length) {
                      case 2:
                        e.vertexAttrib2fv(n.location, r);
                        break;
                      case 3:
                        e.vertexAttrib3fv(n.location, r);
                        break;
                      case 4:
                        e.vertexAttrib4fv(n.location, r);
                        break;
                      default:
                        e.vertexAttrib1fv(n.location, r);
                    }
                }
              }
            }
            _();
          })(i, l, d, x),
          null !== y && e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, r.get(y).buffer));
    },
    reset: x,
    resetDefaultState: y,
    dispose: function () {
      x();
      for (const e in o) {
        const t = o[e];
        for (const e in t) {
          const r = t[e];
          for (const e in r) d(r[e].object), delete r[e];
          delete t[e];
        }
        delete o[e];
      }
    },
    releaseStatesOfGeometry: function (e) {
      if (void 0 === o[e.id]) return;
      const t = o[e.id];
      for (const e in t) {
        const r = t[e];
        for (const e in r) d(r[e].object), delete r[e];
        delete t[e];
      }
      delete o[e.id];
    },
    releaseStatesOfProgram: function (e) {
      for (const t in o) {
        const r = o[t];
        if (void 0 === r[e.id]) continue;
        const n = r[e.id];
        for (const e in n) d(n[e].object), delete n[e];
        delete r[e.id];
      }
    },
    initAttributes: m,
    enableAttribute: f,
    disableUnusedAttributes: _,
  };
}
function WebGLBufferRenderer(e, t, r, n) {
  const i = n.isWebGL2;
  let a;
  (this.setMode = function (e) {
    a = e;
  }),
    (this.render = function (t, n) {
      e.drawArrays(a, t, n), r.update(n, a, 1);
    }),
    (this.renderInstances = function (n, s, o) {
      if (0 === o) return;
      let l, c;
      if (i) (l = e), (c = 'drawArraysInstanced');
      else if (
        ((l = t.get('ANGLE_instanced_arrays')), (c = 'drawArraysInstancedANGLE'), null === l)
      )
        return void console.error(
          'THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.',
        );
      l[c](a, n, s, o), r.update(s, a, o);
    });
}
function WebGLCapabilities(e, t, r) {
  let n;
  function i(t) {
    if ('highp' === t) {
      if (
        e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision > 0 &&
        e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision > 0
      )
        return 'highp';
      t = 'mediump';
    }
    return 'mediump' === t &&
      e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision > 0 &&
      e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision > 0
      ? 'mediump'
      : 'lowp';
  }
  const a =
    'undefined' != typeof WebGL2RenderingContext && 'WebGL2RenderingContext' === e.constructor.name;
  let s = void 0 !== r.precision ? r.precision : 'highp';
  const o = i(s);
  o !== s &&
    (console.warn('THREE.WebGLRenderer:', s, 'not supported, using', o, 'instead.'), (s = o));
  const l = a || t.has('WEBGL_draw_buffers'),
    c = !0 === r.logarithmicDepthBuffer,
    h = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),
    u = e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
    d = e.getParameter(e.MAX_TEXTURE_SIZE),
    p = e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),
    m = e.getParameter(e.MAX_VERTEX_ATTRIBS),
    f = e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),
    g = e.getParameter(e.MAX_VARYING_VECTORS),
    _ = e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),
    v = u > 0,
    x = a || t.has('OES_texture_float');
  return {
    isWebGL2: a,
    drawBuffers: l,
    getMaxAnisotropy: function () {
      if (void 0 !== n) return n;
      if (!0 === t.has('EXT_texture_filter_anisotropic')) {
        const r = t.get('EXT_texture_filter_anisotropic');
        n = e.getParameter(r.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
      } else n = 0;
      return n;
    },
    getMaxPrecision: i,
    precision: s,
    logarithmicDepthBuffer: c,
    maxTextures: h,
    maxVertexTextures: u,
    maxTextureSize: d,
    maxCubemapSize: p,
    maxAttributes: m,
    maxVertexUniforms: f,
    maxVaryings: g,
    maxFragmentUniforms: _,
    vertexTextures: v,
    floatFragmentTextures: x,
    floatVertexTextures: v && x,
    maxSamples: a ? e.getParameter(e.MAX_SAMPLES) : 0,
  };
}
function WebGLClipping(e) {
  const t = this;
  let r = null,
    n = 0,
    i = !1,
    a = !1;
  const s = new Plane(),
    o = new Matrix3(),
    l = { value: null, needsUpdate: !1 };
  function c(e, r, n, i) {
    const a = null !== e ? e.length : 0;
    let c = null;
    if (0 !== a) {
      if (((c = l.value), !0 !== i || null === c)) {
        const t = n + 4 * a,
          i = r.matrixWorldInverse;
        o.getNormalMatrix(i), (null === c || c.length < t) && (c = new Float32Array(t));
        for (let t = 0, r = n; t !== a; ++t, r += 4)
          s.copy(e[t]).applyMatrix4(i, o), s.normal.toArray(c, r), (c[r + 3] = s.constant);
      }
      (l.value = c), (l.needsUpdate = !0);
    }
    return (t.numPlanes = a), (t.numIntersection = 0), c;
  }
  (this.uniform = l),
    (this.numPlanes = 0),
    (this.numIntersection = 0),
    (this.init = function (e, t) {
      const r = 0 !== e.length || t || 0 !== n || i;
      return (i = t), (n = e.length), r;
    }),
    (this.beginShadows = function () {
      (a = !0), c(null);
    }),
    (this.endShadows = function () {
      a = !1;
    }),
    (this.setGlobalState = function (e, t) {
      r = c(e, t, 0);
    }),
    (this.setState = function (s, o, h) {
      const u = s.clippingPlanes,
        d = s.clipIntersection,
        p = s.clipShadows,
        m = e.get(s);
      if (!i || null === u || 0 === u.length || (a && !p))
        a
          ? c(null)
          : (function () {
              l.value !== r && ((l.value = r), (l.needsUpdate = n > 0));
              (t.numPlanes = n), (t.numIntersection = 0);
            })();
      else {
        const e = a ? 0 : n,
          t = 4 * e;
        let i = m.clippingState || null;
        (l.value = i), (i = c(u, o, t, h));
        for (let e = 0; e !== t; ++e) i[e] = r[e];
        (m.clippingState = i),
          (this.numIntersection = d ? this.numPlanes : 0),
          (this.numPlanes += e);
      }
    });
}
function WebGLCubeMaps(e) {
  let t = new WeakMap();
  function r(e, t) {
    return 303 === t ? (e.mapping = 301) : 304 === t && (e.mapping = 302), e;
  }
  function n(e) {
    const r = e.target;
    r.removeEventListener('dispose', n);
    const i = t.get(r);
    void 0 !== i && (t.delete(r), i.dispose());
  }
  return {
    get: function (i) {
      if (i && i.isTexture && !1 === i.isRenderTargetTexture) {
        const a = i.mapping;
        if (303 === a || 304 === a) {
          if (t.has(i)) {
            return r(t.get(i).texture, i.mapping);
          }
          {
            const a = i.image;
            if (a && a.height > 0) {
              const s = new WebGLCubeRenderTarget(a.height / 2);
              return (
                s.fromEquirectangularTexture(e, i),
                t.set(i, s),
                i.addEventListener('dispose', n),
                r(s.texture, i.mapping)
              );
            }
            return null;
          }
        }
      }
      return i;
    },
    dispose: function () {
      t = new WeakMap();
    },
  };
}
class OrthographicCamera extends Camera {
  constructor(e = -1, t = 1, r = 1, n = -1, i = 0.1, a = 2e3) {
    super(),
      (this.isOrthographicCamera = !0),
      (this.type = 'OrthographicCamera'),
      (this.zoom = 1),
      (this.view = null),
      (this.left = e),
      (this.right = t),
      (this.top = r),
      (this.bottom = n),
      (this.near = i),
      (this.far = a),
      this.updateProjectionMatrix();
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      (this.left = e.left),
      (this.right = e.right),
      (this.top = e.top),
      (this.bottom = e.bottom),
      (this.near = e.near),
      (this.far = e.far),
      (this.zoom = e.zoom),
      (this.view = null === e.view ? null : Object.assign({}, e.view)),
      this
    );
  }
  setViewOffset(e, t, r, n, i, a) {
    null === this.view &&
      (this.view = {
        enabled: !0,
        fullWidth: 1,
        fullHeight: 1,
        offsetX: 0,
        offsetY: 0,
        width: 1,
        height: 1,
      }),
      (this.view.enabled = !0),
      (this.view.fullWidth = e),
      (this.view.fullHeight = t),
      (this.view.offsetX = r),
      (this.view.offsetY = n),
      (this.view.width = i),
      (this.view.height = a),
      this.updateProjectionMatrix();
  }
  clearViewOffset() {
    null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom),
      t = (this.top - this.bottom) / (2 * this.zoom),
      r = (this.right + this.left) / 2,
      n = (this.top + this.bottom) / 2;
    let i = r - e,
      a = r + e,
      s = n + t,
      o = n - t;
    if (null !== this.view && this.view.enabled) {
      const e = (this.right - this.left) / this.view.fullWidth / this.zoom,
        t = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      (i += e * this.view.offsetX),
        (a = i + e * this.view.width),
        (s -= t * this.view.offsetY),
        (o = s - t * this.view.height);
    }
    this.projectionMatrix.makeOrthographic(i, a, s, o, this.near, this.far),
      this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return (
      (t.object.zoom = this.zoom),
      (t.object.left = this.left),
      (t.object.right = this.right),
      (t.object.top = this.top),
      (t.object.bottom = this.bottom),
      (t.object.near = this.near),
      (t.object.far = this.far),
      null !== this.view && (t.object.view = Object.assign({}, this.view)),
      t
    );
  }
}
const LOD_MIN = 4,
  EXTRA_LOD_SIGMA = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582],
  MAX_SAMPLES = 20,
  _flatCamera = new OrthographicCamera(),
  _clearColor = new Color();
let _oldTarget = null;
const PHI = (1 + Math.sqrt(5)) / 2,
  INV_PHI = 1 / PHI,
  _axisDirections = [
    new Vector3(1, 1, 1),
    new Vector3(-1, 1, 1),
    new Vector3(1, 1, -1),
    new Vector3(-1, 1, -1),
    new Vector3(0, PHI, INV_PHI),
    new Vector3(0, PHI, -INV_PHI),
    new Vector3(INV_PHI, 0, PHI),
    new Vector3(-INV_PHI, 0, PHI),
    new Vector3(PHI, INV_PHI, 0),
    new Vector3(-PHI, INV_PHI, 0),
  ];
class PMREMGenerator {
  constructor(e) {
    (this._renderer = e),
      (this._pingPongRenderTarget = null),
      (this._lodMax = 0),
      (this._cubeSize = 0),
      (this._lodPlanes = []),
      (this._sizeLods = []),
      (this._sigmas = []),
      (this._blurMaterial = null),
      (this._cubemapMaterial = null),
      (this._equirectMaterial = null),
      this._compileMaterial(this._blurMaterial);
  }
  fromScene(e, t = 0, r = 0.1, n = 100) {
    (_oldTarget = this._renderer.getRenderTarget()), this._setSize(256);
    const i = this._allocateTargets();
    return (
      (i.depthBuffer = !0),
      this._sceneToCubeUV(e, r, n, i),
      t > 0 && this._blur(i, 0, 0, t),
      this._applyPMREM(i),
      this._cleanup(i),
      i
    );
  }
  fromEquirectangular(e, t = null) {
    return this._fromTexture(e, t);
  }
  fromCubemap(e, t = null) {
    return this._fromTexture(e, t);
  }
  compileCubemapShader() {
    null === this._cubemapMaterial &&
      ((this._cubemapMaterial = _getCubemapMaterial()),
      this._compileMaterial(this._cubemapMaterial));
  }
  compileEquirectangularShader() {
    null === this._equirectMaterial &&
      ((this._equirectMaterial = _getEquirectMaterial()),
      this._compileMaterial(this._equirectMaterial));
  }
  dispose() {
    this._dispose(),
      null !== this._cubemapMaterial && this._cubemapMaterial.dispose(),
      null !== this._equirectMaterial && this._equirectMaterial.dispose();
  }
  _setSize(e) {
    (this._lodMax = Math.floor(Math.log2(e))), (this._cubeSize = Math.pow(2, this._lodMax));
  }
  _dispose() {
    null !== this._blurMaterial && this._blurMaterial.dispose(),
      null !== this._pingPongRenderTarget && this._pingPongRenderTarget.dispose();
    for (let e = 0; e < this._lodPlanes.length; e++) this._lodPlanes[e].dispose();
  }
  _cleanup(e) {
    this._renderer.setRenderTarget(_oldTarget),
      (e.scissorTest = !1),
      _setViewport(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    301 === e.mapping || 302 === e.mapping
      ? this._setSize(0 === e.image.length ? 16 : e.image[0].width || e.image[0].image.width)
      : this._setSize(e.image.width / 4),
      (_oldTarget = this._renderer.getRenderTarget());
    const r = t || this._allocateTargets();
    return this._textureToCubeUV(e, r), this._applyPMREM(r), this._cleanup(r), r;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112),
      t = 4 * this._cubeSize,
      r = {
        magFilter: 1006,
        minFilter: 1006,
        generateMipmaps: !1,
        type: 1016,
        format: 1023,
        encoding: 3e3,
        depthBuffer: !1,
      },
      n = _createRenderTarget(e, t, r);
    if (
      null === this._pingPongRenderTarget ||
      this._pingPongRenderTarget.width !== e ||
      this._pingPongRenderTarget.height !== t
    ) {
      null !== this._pingPongRenderTarget && this._dispose(),
        (this._pingPongRenderTarget = _createRenderTarget(e, t, r));
      const { _lodMax: n } = this;
      ({
        sizeLods: this._sizeLods,
        lodPlanes: this._lodPlanes,
        sigmas: this._sigmas,
      } = _createPlanes(n)),
        (this._blurMaterial = _getBlurShader(n, e, t));
    }
    return n;
  }
  _compileMaterial(e) {
    const t = new Mesh(this._lodPlanes[0], e);
    this._renderer.compile(t, _flatCamera);
  }
  _sceneToCubeUV(e, t, r, n) {
    const i = new PerspectiveCamera(90, 1, t, r),
      a = [1, -1, 1, 1, 1, 1],
      s = [1, 1, 1, -1, -1, -1],
      o = this._renderer,
      l = o.autoClear,
      c = o.toneMapping;
    o.getClearColor(_clearColor), (o.toneMapping = 0), (o.autoClear = !1);
    const h = new MeshBasicMaterial({
        name: 'PMREM.Background',
        side: 1,
        depthWrite: !1,
        depthTest: !1,
      }),
      u = new Mesh(new BoxGeometry(), h);
    let d = !1;
    const p = e.background;
    p
      ? p.isColor && (h.color.copy(p), (e.background = null), (d = !0))
      : (h.color.copy(_clearColor), (d = !0));
    for (let t = 0; t < 6; t++) {
      const r = t % 3;
      0 === r
        ? (i.up.set(0, a[t], 0), i.lookAt(s[t], 0, 0))
        : 1 === r
          ? (i.up.set(0, 0, a[t]), i.lookAt(0, s[t], 0))
          : (i.up.set(0, a[t], 0), i.lookAt(0, 0, s[t]));
      const l = this._cubeSize;
      _setViewport(n, r * l, t > 2 ? l : 0, l, l),
        o.setRenderTarget(n),
        d && o.render(u, i),
        o.render(e, i);
    }
    u.geometry.dispose(),
      u.material.dispose(),
      (o.toneMapping = c),
      (o.autoClear = l),
      (e.background = p);
  }
  _textureToCubeUV(e, t) {
    const r = this._renderer,
      n = 301 === e.mapping || 302 === e.mapping;
    n
      ? (null === this._cubemapMaterial && (this._cubemapMaterial = _getCubemapMaterial()),
        (this._cubemapMaterial.uniforms.flipEnvMap.value = !1 === e.isRenderTargetTexture ? -1 : 1))
      : null === this._equirectMaterial && (this._equirectMaterial = _getEquirectMaterial());
    const i = n ? this._cubemapMaterial : this._equirectMaterial,
      a = new Mesh(this._lodPlanes[0], i);
    i.uniforms.envMap.value = e;
    const s = this._cubeSize;
    _setViewport(t, 0, 0, 3 * s, 2 * s), r.setRenderTarget(t), r.render(a, _flatCamera);
  }
  _applyPMREM(e) {
    const t = this._renderer,
      r = t.autoClear;
    t.autoClear = !1;
    for (let t = 1; t < this._lodPlanes.length; t++) {
      const r = Math.sqrt(
          this._sigmas[t] * this._sigmas[t] - this._sigmas[t - 1] * this._sigmas[t - 1],
        ),
        n = _axisDirections[(t - 1) % _axisDirections.length];
      this._blur(e, t - 1, t, r, n);
    }
    t.autoClear = r;
  }
  _blur(e, t, r, n, i) {
    const a = this._pingPongRenderTarget;
    this._halfBlur(e, a, t, r, n, 'latitudinal', i),
      this._halfBlur(a, e, r, r, n, 'longitudinal', i);
  }
  _halfBlur(e, t, r, n, i, a, s) {
    const o = this._renderer,
      l = this._blurMaterial;
    'latitudinal' !== a &&
      'longitudinal' !== a &&
      console.error('blur direction must be either latitudinal or longitudinal!');
    const c = new Mesh(this._lodPlanes[n], l),
      h = l.uniforms,
      u = this._sizeLods[r] - 1,
      d = isFinite(i) ? Math.PI / (2 * u) : (2 * Math.PI) / 39,
      p = i / d,
      m = isFinite(i) ? 1 + Math.floor(3 * p) : 20;
    m > 20 &&
      console.warn(
        `sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to 20`,
      );
    const f = [];
    let g = 0;
    for (let e = 0; e < 20; ++e) {
      const t = e / p,
        r = Math.exp((-t * t) / 2);
      f.push(r), 0 === e ? (g += r) : e < m && (g += 2 * r);
    }
    for (let e = 0; e < f.length; e++) f[e] = f[e] / g;
    (h.envMap.value = e.texture),
      (h.samples.value = m),
      (h.weights.value = f),
      (h.latitudinal.value = 'latitudinal' === a),
      s && (h.poleAxis.value = s);
    const { _lodMax: _ } = this;
    (h.dTheta.value = d), (h.mipInt.value = _ - r);
    const v = this._sizeLods[n];
    _setViewport(t, 3 * v * (n > _ - 4 ? n - _ + 4 : 0), 4 * (this._cubeSize - v), 3 * v, 2 * v),
      o.setRenderTarget(t),
      o.render(c, _flatCamera);
  }
}
function _createPlanes(e) {
  const t = [],
    r = [],
    n = [];
  let i = e;
  const a = e - 4 + 1 + EXTRA_LOD_SIGMA.length;
  for (let s = 0; s < a; s++) {
    const a = Math.pow(2, i);
    r.push(a);
    let o = 1 / a;
    s > e - 4 ? (o = EXTRA_LOD_SIGMA[s - e + 4 - 1]) : 0 === s && (o = 0), n.push(o);
    const l = 1 / (a - 2),
      c = -l,
      h = 1 + l,
      u = [c, c, h, c, h, h, c, c, h, h, c, h],
      d = 6,
      p = 6,
      m = 3,
      f = 2,
      g = 1,
      _ = new Float32Array(m * p * d),
      v = new Float32Array(f * p * d),
      x = new Float32Array(g * p * d);
    for (let e = 0; e < d; e++) {
      const t = ((e % 3) * 2) / 3 - 1,
        r = e > 2 ? 0 : -1,
        n = [
          t,
          r,
          0,
          t + 2 / 3,
          r,
          0,
          t + 2 / 3,
          r + 1,
          0,
          t,
          r,
          0,
          t + 2 / 3,
          r + 1,
          0,
          t,
          r + 1,
          0,
        ];
      _.set(n, m * p * e), v.set(u, f * p * e);
      const i = [e, e, e, e, e, e];
      x.set(i, g * p * e);
    }
    const y = new BufferGeometry();
    y.setAttribute('position', new BufferAttribute(_, m)),
      y.setAttribute('uv', new BufferAttribute(v, f)),
      y.setAttribute('faceIndex', new BufferAttribute(x, g)),
      t.push(y),
      i > 4 && i--;
  }
  return { lodPlanes: t, sizeLods: r, sigmas: n };
}
function _createRenderTarget(e, t, r) {
  const n = new WebGLRenderTarget(e, t, r);
  return (n.texture.mapping = 306), (n.texture.name = 'PMREM.cubeUv'), (n.scissorTest = !0), n;
}
function _setViewport(e, t, r, n, i) {
  e.viewport.set(t, r, n, i), e.scissor.set(t, r, n, i);
}
function _getBlurShader(e, t, r) {
  const n = new Float32Array(20),
    i = new Vector3(0, 1, 0);
  return new ShaderMaterial({
    name: 'SphericalGaussianBlur',
    defines: {
      n: 20,
      CUBEUV_TEXEL_WIDTH: 1 / t,
      CUBEUV_TEXEL_HEIGHT: 1 / r,
      CUBEUV_MAX_MIP: `${e}.0`,
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: n },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: i },
    },
    vertexShader: _getCommonVertexShader(),
    fragmentShader:
      "\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform sampler2D envMap;\n\t\t\tuniform int samples;\n\t\t\tuniform float weights[ n ];\n\t\t\tuniform bool latitudinal;\n\t\t\tuniform float dTheta;\n\t\t\tuniform float mipInt;\n\t\t\tuniform vec3 poleAxis;\n\n\t\t\t#define ENVMAP_TYPE_CUBE_UV\n\t\t\t#include <cube_uv_reflection_fragment>\n\n\t\t\tvec3 getSample( float theta, vec3 axis ) {\n\n\t\t\t\tfloat cosTheta = cos( theta );\n\t\t\t\t// Rodrigues' axis-angle rotation\n\t\t\t\tvec3 sampleDirection = vOutputDirection * cosTheta\n\t\t\t\t\t+ cross( axis, vOutputDirection ) * sin( theta )\n\t\t\t\t\t+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );\n\n\t\t\t\treturn bilinearCubeUV( envMap, sampleDirection, mipInt );\n\n\t\t\t}\n\n\t\t\tvoid main() {\n\n\t\t\t\tvec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );\n\n\t\t\t\tif ( all( equal( axis, vec3( 0.0 ) ) ) ) {\n\n\t\t\t\t\taxis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );\n\n\t\t\t\t}\n\n\t\t\t\taxis = normalize( axis );\n\n\t\t\t\tgl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n\t\t\t\tgl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );\n\n\t\t\t\tfor ( int i = 1; i < n; i++ ) {\n\n\t\t\t\t\tif ( i >= samples ) {\n\n\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t}\n\n\t\t\t\t\tfloat theta = dTheta * float( i );\n\t\t\t\t\tgl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );\n\t\t\t\t\tgl_FragColor.rgb += weights[ i ] * getSample( theta, axis );\n\n\t\t\t\t}\n\n\t\t\t}\n\t\t",
    blending: 0,
    depthTest: !1,
    depthWrite: !1,
  });
}
function _getEquirectMaterial() {
  return new ShaderMaterial({
    name: 'EquirectangularToCubeUV',
    uniforms: { envMap: { value: null } },
    vertexShader: _getCommonVertexShader(),
    fragmentShader:
      '\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform sampler2D envMap;\n\n\t\t\t#include <common>\n\n\t\t\tvoid main() {\n\n\t\t\t\tvec3 outputDirection = normalize( vOutputDirection );\n\t\t\t\tvec2 uv = equirectUv( outputDirection );\n\n\t\t\t\tgl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );\n\n\t\t\t}\n\t\t',
    blending: 0,
    depthTest: !1,
    depthWrite: !1,
  });
}
function _getCubemapMaterial() {
  return new ShaderMaterial({
    name: 'CubemapToCubeUV',
    uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 } },
    vertexShader: _getCommonVertexShader(),
    fragmentShader:
      '\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tuniform float flipEnvMap;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform samplerCube envMap;\n\n\t\t\tvoid main() {\n\n\t\t\t\tgl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );\n\n\t\t\t}\n\t\t',
    blending: 0,
    depthTest: !1,
    depthWrite: !1,
  });
}
function _getCommonVertexShader() {
  return '\n\n\t\tprecision mediump float;\n\t\tprecision mediump int;\n\n\t\tattribute float faceIndex;\n\n\t\tvarying vec3 vOutputDirection;\n\n\t\t// RH coordinate system; PMREM face-indexing convention\n\t\tvec3 getDirection( vec2 uv, float face ) {\n\n\t\t\tuv = 2.0 * uv - 1.0;\n\n\t\t\tvec3 direction = vec3( uv, 1.0 );\n\n\t\t\tif ( face == 0.0 ) {\n\n\t\t\t\tdirection = direction.zyx; // ( 1, v, u ) pos x\n\n\t\t\t} else if ( face == 1.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xz *= -1.0; // ( -u, 1, -v ) pos y\n\n\t\t\t} else if ( face == 2.0 ) {\n\n\t\t\t\tdirection.x *= -1.0; // ( -u, v, 1 ) pos z\n\n\t\t\t} else if ( face == 3.0 ) {\n\n\t\t\t\tdirection = direction.zyx;\n\t\t\t\tdirection.xz *= -1.0; // ( -1, v, -u ) neg x\n\n\t\t\t} else if ( face == 4.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xy *= -1.0; // ( -u, -1, v ) neg y\n\n\t\t\t} else if ( face == 5.0 ) {\n\n\t\t\t\tdirection.z *= -1.0; // ( u, v, -1 ) neg z\n\n\t\t\t}\n\n\t\t\treturn direction;\n\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\tvOutputDirection = getDirection( uv, faceIndex );\n\t\t\tgl_Position = vec4( position, 1.0 );\n\n\t\t}\n\t';
}
function WebGLCubeUVMaps(e) {
  let t = new WeakMap(),
    r = null;
  function n(e) {
    const r = e.target;
    r.removeEventListener('dispose', n);
    const i = t.get(r);
    void 0 !== i && (t.delete(r), i.dispose());
  }
  return {
    get: function (i) {
      if (i && i.isTexture) {
        const a = i.mapping,
          s = 303 === a || 304 === a,
          o = 301 === a || 302 === a;
        if (s || o) {
          if (i.isRenderTargetTexture && !0 === i.needsPMREMUpdate) {
            i.needsPMREMUpdate = !1;
            let n = t.get(i);
            return (
              null === r && (r = new PMREMGenerator(e)),
              (n = s ? r.fromEquirectangular(i, n) : r.fromCubemap(i, n)),
              t.set(i, n),
              n.texture
            );
          }
          if (t.has(i)) return t.get(i).texture;
          {
            const a = i.image;
            if (
              (s && a && a.height > 0) ||
              (o &&
                a &&
                (function (e) {
                  let t = 0;
                  const r = 6;
                  for (let n = 0; n < r; n++) void 0 !== e[n] && t++;
                  return t === r;
                })(a))
            ) {
              null === r && (r = new PMREMGenerator(e));
              const a = s ? r.fromEquirectangular(i) : r.fromCubemap(i);
              return t.set(i, a), i.addEventListener('dispose', n), a.texture;
            }
            return null;
          }
        }
      }
      return i;
    },
    dispose: function () {
      (t = new WeakMap()), null !== r && (r.dispose(), (r = null));
    },
  };
}
function WebGLExtensions(e) {
  const t = {};
  function r(r) {
    if (void 0 !== t[r]) return t[r];
    let n;
    switch (r) {
      case 'WEBGL_depth_texture':
        n =
          e.getExtension('WEBGL_depth_texture') ||
          e.getExtension('MOZ_WEBGL_depth_texture') ||
          e.getExtension('WEBKIT_WEBGL_depth_texture');
        break;
      case 'EXT_texture_filter_anisotropic':
        n =
          e.getExtension('EXT_texture_filter_anisotropic') ||
          e.getExtension('MOZ_EXT_texture_filter_anisotropic') ||
          e.getExtension('WEBKIT_EXT_texture_filter_anisotropic');
        break;
      case 'WEBGL_compressed_texture_s3tc':
        n =
          e.getExtension('WEBGL_compressed_texture_s3tc') ||
          e.getExtension('MOZ_WEBGL_compressed_texture_s3tc') ||
          e.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc');
        break;
      case 'WEBGL_compressed_texture_pvrtc':
        n =
          e.getExtension('WEBGL_compressed_texture_pvrtc') ||
          e.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc');
        break;
      default:
        n = e.getExtension(r);
    }
    return (t[r] = n), n;
  }
  return {
    has: function (e) {
      return null !== r(e);
    },
    init: function (e) {
      e.isWebGL2
        ? r('EXT_color_buffer_float')
        : (r('WEBGL_depth_texture'),
          r('OES_texture_float'),
          r('OES_texture_half_float'),
          r('OES_texture_half_float_linear'),
          r('OES_standard_derivatives'),
          r('OES_element_index_uint'),
          r('OES_vertex_array_object'),
          r('ANGLE_instanced_arrays')),
        r('OES_texture_float_linear'),
        r('EXT_color_buffer_half_float'),
        r('WEBGL_multisampled_render_to_texture');
    },
    get: function (e) {
      const t = r(e);
      return (
        null === t && console.warn('THREE.WebGLRenderer: ' + e + ' extension not supported.'), t
      );
    },
  };
}
function WebGLGeometries(e, t, r, n) {
  const i = {},
    a = new WeakMap();
  function s(e) {
    const o = e.target;
    null !== o.index && t.remove(o.index);
    for (const e in o.attributes) t.remove(o.attributes[e]);
    o.removeEventListener('dispose', s), delete i[o.id];
    const l = a.get(o);
    l && (t.remove(l), a.delete(o)),
      n.releaseStatesOfGeometry(o),
      !0 === o.isInstancedBufferGeometry && delete o._maxInstanceCount,
      r.memory.geometries--;
  }
  function o(e) {
    const r = [],
      n = e.index,
      i = e.attributes.position;
    let s = 0;
    if (null !== n) {
      const e = n.array;
      s = n.version;
      for (let t = 0, n = e.length; t < n; t += 3) {
        const n = e[t + 0],
          i = e[t + 1],
          a = e[t + 2];
        r.push(n, i, i, a, a, n);
      }
    } else {
      const e = i.array;
      s = i.version;
      for (let t = 0, n = e.length / 3 - 1; t < n; t += 3) {
        const e = t + 0,
          n = t + 1,
          i = t + 2;
        r.push(e, n, n, i, i, e);
      }
    }
    const o = new (arrayNeedsUint32(r) ? Uint32BufferAttribute : Uint16BufferAttribute)(r, 1);
    o.version = s;
    const l = a.get(e);
    l && t.remove(l), a.set(e, o);
  }
  return {
    get: function (e, t) {
      return (
        !0 === i[t.id] || (t.addEventListener('dispose', s), (i[t.id] = !0), r.memory.geometries++),
        t
      );
    },
    update: function (r) {
      const n = r.attributes;
      for (const r in n) t.update(n[r], e.ARRAY_BUFFER);
      const i = r.morphAttributes;
      for (const r in i) {
        const n = i[r];
        for (let r = 0, i = n.length; r < i; r++) t.update(n[r], e.ARRAY_BUFFER);
      }
    },
    getWireframeAttribute: function (e) {
      const t = a.get(e);
      if (t) {
        const r = e.index;
        null !== r && t.version < r.version && o(e);
      } else o(e);
      return a.get(e);
    },
  };
}
function WebGLIndexedBufferRenderer(e, t, r, n) {
  const i = n.isWebGL2;
  let a, s, o;
  (this.setMode = function (e) {
    a = e;
  }),
    (this.setIndex = function (e) {
      (s = e.type), (o = e.bytesPerElement);
    }),
    (this.render = function (t, n) {
      e.drawElements(a, n, s, t * o), r.update(n, a, 1);
    }),
    (this.renderInstances = function (n, l, c) {
      if (0 === c) return;
      let h, u;
      if (i) (h = e), (u = 'drawElementsInstanced');
      else if (
        ((h = t.get('ANGLE_instanced_arrays')), (u = 'drawElementsInstancedANGLE'), null === h)
      )
        return void console.error(
          'THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.',
        );
      h[u](a, l, s, n * o, c), r.update(l, a, c);
    });
}
function WebGLInfo(e) {
  const t = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 };
  return {
    memory: { geometries: 0, textures: 0 },
    render: t,
    programs: null,
    autoReset: !0,
    reset: function () {
      t.frame++, (t.calls = 0), (t.triangles = 0), (t.points = 0), (t.lines = 0);
    },
    update: function (r, n, i) {
      switch ((t.calls++, n)) {
        case e.TRIANGLES:
          t.triangles += i * (r / 3);
          break;
        case e.LINES:
          t.lines += i * (r / 2);
          break;
        case e.LINE_STRIP:
          t.lines += i * (r - 1);
          break;
        case e.LINE_LOOP:
          t.lines += i * r;
          break;
        case e.POINTS:
          t.points += i * r;
          break;
        default:
          console.error('THREE.WebGLInfo: Unknown draw mode:', n);
      }
    },
  };
}
function numericalSort(e, t) {
  return e[0] - t[0];
}
function absNumericalSort(e, t) {
  return Math.abs(t[1]) - Math.abs(e[1]);
}
function WebGLMorphtargets(e, t, r) {
  const n = {},
    i = new Float32Array(8),
    a = new WeakMap(),
    s = new Vector4(),
    o = [];
  for (let e = 0; e < 8; e++) o[e] = [e, 0];
  return {
    update: function (l, c, h) {
      const u = l.morphTargetInfluences;
      if (!0 === t.isWebGL2) {
        const n = c.morphAttributes.position || c.morphAttributes.normal || c.morphAttributes.color,
          i = void 0 !== n ? n.length : 0;
        let o = a.get(c);
        if (void 0 === o || o.count !== i) {
          void 0 !== o && o.texture.dispose();
          const e = void 0 !== c.morphAttributes.position,
            r = void 0 !== c.morphAttributes.normal,
            n = void 0 !== c.morphAttributes.color,
            l = c.morphAttributes.position || [],
            h = c.morphAttributes.normal || [],
            u = c.morphAttributes.color || [];
          let d = 0;
          !0 === e && (d = 1), !0 === r && (d = 2), !0 === n && (d = 3);
          let p = c.attributes.position.count * d,
            m = 1;
          p > t.maxTextureSize && ((m = Math.ceil(p / t.maxTextureSize)), (p = t.maxTextureSize));
          const f = new Float32Array(p * m * 4 * i),
            g = new DataArrayTexture(f, p, m, i);
          (g.type = 1015), (g.needsUpdate = !0);
          const _ = 4 * d;
          for (let t = 0; t < i; t++) {
            const i = l[t],
              a = h[t],
              o = u[t],
              c = p * m * 4 * t;
            for (let t = 0; t < i.count; t++) {
              const l = t * _;
              !0 === e &&
                (s.fromBufferAttribute(i, t),
                (f[c + l + 0] = s.x),
                (f[c + l + 1] = s.y),
                (f[c + l + 2] = s.z),
                (f[c + l + 3] = 0)),
                !0 === r &&
                  (s.fromBufferAttribute(a, t),
                  (f[c + l + 4] = s.x),
                  (f[c + l + 5] = s.y),
                  (f[c + l + 6] = s.z),
                  (f[c + l + 7] = 0)),
                !0 === n &&
                  (s.fromBufferAttribute(o, t),
                  (f[c + l + 8] = s.x),
                  (f[c + l + 9] = s.y),
                  (f[c + l + 10] = s.z),
                  (f[c + l + 11] = 4 === o.itemSize ? s.w : 1));
            }
          }
          (o = { count: i, texture: g, size: new Vector2(p, m) }),
            a.set(c, o),
            c.addEventListener('dispose', function e() {
              g.dispose(), a.delete(c), c.removeEventListener('dispose', e);
            });
        }
        let l = 0;
        for (let e = 0; e < u.length; e++) l += u[e];
        const d = c.morphTargetsRelative ? 1 : 1 - l;
        h.getUniforms().setValue(e, 'morphTargetBaseInfluence', d),
          h.getUniforms().setValue(e, 'morphTargetInfluences', u),
          h.getUniforms().setValue(e, 'morphTargetsTexture', o.texture, r),
          h.getUniforms().setValue(e, 'morphTargetsTextureSize', o.size);
      } else {
        const t = void 0 === u ? 0 : u.length;
        let r = n[c.id];
        if (void 0 === r || r.length !== t) {
          r = [];
          for (let e = 0; e < t; e++) r[e] = [e, 0];
          n[c.id] = r;
        }
        for (let e = 0; e < t; e++) {
          const t = r[e];
          (t[0] = e), (t[1] = u[e]);
        }
        r.sort(absNumericalSort);
        for (let e = 0; e < 8; e++)
          e < t && r[e][1]
            ? ((o[e][0] = r[e][0]), (o[e][1] = r[e][1]))
            : ((o[e][0] = Number.MAX_SAFE_INTEGER), (o[e][1] = 0));
        o.sort(numericalSort);
        const a = c.morphAttributes.position,
          s = c.morphAttributes.normal;
        let l = 0;
        for (let e = 0; e < 8; e++) {
          const t = o[e],
            r = t[0],
            n = t[1];
          r !== Number.MAX_SAFE_INTEGER && n
            ? (a &&
                c.getAttribute('morphTarget' + e) !== a[r] &&
                c.setAttribute('morphTarget' + e, a[r]),
              s &&
                c.getAttribute('morphNormal' + e) !== s[r] &&
                c.setAttribute('morphNormal' + e, s[r]),
              (i[e] = n),
              (l += n))
            : (a &&
                !0 === c.hasAttribute('morphTarget' + e) &&
                c.deleteAttribute('morphTarget' + e),
              s && !0 === c.hasAttribute('morphNormal' + e) && c.deleteAttribute('morphNormal' + e),
              (i[e] = 0));
        }
        const d = c.morphTargetsRelative ? 1 : 1 - l;
        h.getUniforms().setValue(e, 'morphTargetBaseInfluence', d),
          h.getUniforms().setValue(e, 'morphTargetInfluences', i);
      }
    },
  };
}
function WebGLObjects(e, t, r, n) {
  let i = new WeakMap();
  function a(e) {
    const t = e.target;
    t.removeEventListener('dispose', a),
      r.remove(t.instanceMatrix),
      null !== t.instanceColor && r.remove(t.instanceColor);
  }
  return {
    update: function (s) {
      const o = n.render.frame,
        l = s.geometry,
        c = t.get(s, l);
      return (
        i.get(c) !== o && (t.update(c), i.set(c, o)),
        s.isInstancedMesh &&
          (!1 === s.hasEventListener('dispose', a) && s.addEventListener('dispose', a),
          r.update(s.instanceMatrix, e.ARRAY_BUFFER),
          null !== s.instanceColor && r.update(s.instanceColor, e.ARRAY_BUFFER)),
        c
      );
    },
    dispose: function () {
      i = new WeakMap();
    },
  };
}
const emptyTexture = new Texture(),
  emptyArrayTexture = new DataArrayTexture(),
  empty3dTexture = new Data3DTexture(),
  emptyCubeTexture = new CubeTexture(),
  arrayCacheF32 = [],
  arrayCacheI32 = [],
  mat4array = new Float32Array(16),
  mat3array = new Float32Array(9),
  mat2array = new Float32Array(4);
function flatten(e, t, r) {
  const n = e[0];
  if (n <= 0 || n > 0) return e;
  const i = t * r;
  let a = arrayCacheF32[i];
  if ((void 0 === a && ((a = new Float32Array(i)), (arrayCacheF32[i] = a)), 0 !== t)) {
    n.toArray(a, 0);
    for (let n = 1, i = 0; n !== t; ++n) (i += r), e[n].toArray(a, i);
  }
  return a;
}
function arraysEqual(e, t) {
  if (e.length !== t.length) return !1;
  for (let r = 0, n = e.length; r < n; r++) if (e[r] !== t[r]) return !1;
  return !0;
}
function copyArray(e, t) {
  for (let r = 0, n = t.length; r < n; r++) e[r] = t[r];
}
function allocTexUnits(e, t) {
  let r = arrayCacheI32[t];
  void 0 === r && ((r = new Int32Array(t)), (arrayCacheI32[t] = r));
  for (let n = 0; n !== t; ++n) r[n] = e.allocateTextureUnit();
  return r;
}
function setValueV1f(e, t) {
  const r = this.cache;
  r[0] !== t && (e.uniform1f(this.addr, t), (r[0] = t));
}
function setValueV2f(e, t) {
  const r = this.cache;
  if (void 0 !== t.x)
    (r[0] === t.x && r[1] === t.y) ||
      (e.uniform2f(this.addr, t.x, t.y), (r[0] = t.x), (r[1] = t.y));
  else {
    if (arraysEqual(r, t)) return;
    e.uniform2fv(this.addr, t), copyArray(r, t);
  }
}
function setValueV3f(e, t) {
  const r = this.cache;
  if (void 0 !== t.x)
    (r[0] === t.x && r[1] === t.y && r[2] === t.z) ||
      (e.uniform3f(this.addr, t.x, t.y, t.z), (r[0] = t.x), (r[1] = t.y), (r[2] = t.z));
  else if (void 0 !== t.r)
    (r[0] === t.r && r[1] === t.g && r[2] === t.b) ||
      (e.uniform3f(this.addr, t.r, t.g, t.b), (r[0] = t.r), (r[1] = t.g), (r[2] = t.b));
  else {
    if (arraysEqual(r, t)) return;
    e.uniform3fv(this.addr, t), copyArray(r, t);
  }
}
function setValueV4f(e, t) {
  const r = this.cache;
  if (void 0 !== t.x)
    (r[0] === t.x && r[1] === t.y && r[2] === t.z && r[3] === t.w) ||
      (e.uniform4f(this.addr, t.x, t.y, t.z, t.w),
      (r[0] = t.x),
      (r[1] = t.y),
      (r[2] = t.z),
      (r[3] = t.w));
  else {
    if (arraysEqual(r, t)) return;
    e.uniform4fv(this.addr, t), copyArray(r, t);
  }
}
function setValueM2(e, t) {
  const r = this.cache,
    n = t.elements;
  if (void 0 === n) {
    if (arraysEqual(r, t)) return;
    e.uniformMatrix2fv(this.addr, !1, t), copyArray(r, t);
  } else {
    if (arraysEqual(r, n)) return;
    mat2array.set(n), e.uniformMatrix2fv(this.addr, !1, mat2array), copyArray(r, n);
  }
}
function setValueM3(e, t) {
  const r = this.cache,
    n = t.elements;
  if (void 0 === n) {
    if (arraysEqual(r, t)) return;
    e.uniformMatrix3fv(this.addr, !1, t), copyArray(r, t);
  } else {
    if (arraysEqual(r, n)) return;
    mat3array.set(n), e.uniformMatrix3fv(this.addr, !1, mat3array), copyArray(r, n);
  }
}
function setValueM4(e, t) {
  const r = this.cache,
    n = t.elements;
  if (void 0 === n) {
    if (arraysEqual(r, t)) return;
    e.uniformMatrix4fv(this.addr, !1, t), copyArray(r, t);
  } else {
    if (arraysEqual(r, n)) return;
    mat4array.set(n), e.uniformMatrix4fv(this.addr, !1, mat4array), copyArray(r, n);
  }
}
function setValueV1i(e, t) {
  const r = this.cache;
  r[0] !== t && (e.uniform1i(this.addr, t), (r[0] = t));
}
function setValueV2i(e, t) {
  const r = this.cache;
  if (void 0 !== t.x)
    (r[0] === t.x && r[1] === t.y) ||
      (e.uniform2i(this.addr, t.x, t.y), (r[0] = t.x), (r[1] = t.y));
  else {
    if (arraysEqual(r, t)) return;
    e.uniform2iv(this.addr, t), copyArray(r, t);
  }
}
function setValueV3i(e, t) {
  const r = this.cache;
  if (void 0 !== t.x)
    (r[0] === t.x && r[1] === t.y && r[2] === t.z) ||
      (e.uniform3i(this.addr, t.x, t.y, t.z), (r[0] = t.x), (r[1] = t.y), (r[2] = t.z));
  else {
    if (arraysEqual(r, t)) return;
    e.uniform3iv(this.addr, t), copyArray(r, t);
  }
}
function setValueV4i(e, t) {
  const r = this.cache;
  if (void 0 !== t.x)
    (r[0] === t.x && r[1] === t.y && r[2] === t.z && r[3] === t.w) ||
      (e.uniform4i(this.addr, t.x, t.y, t.z, t.w),
      (r[0] = t.x),
      (r[1] = t.y),
      (r[2] = t.z),
      (r[3] = t.w));
  else {
    if (arraysEqual(r, t)) return;
    e.uniform4iv(this.addr, t), copyArray(r, t);
  }
}
function setValueV1ui(e, t) {
  const r = this.cache;
  r[0] !== t && (e.uniform1ui(this.addr, t), (r[0] = t));
}
function setValueV2ui(e, t) {
  const r = this.cache;
  if (void 0 !== t.x)
    (r[0] === t.x && r[1] === t.y) ||
      (e.uniform2ui(this.addr, t.x, t.y), (r[0] = t.x), (r[1] = t.y));
  else {
    if (arraysEqual(r, t)) return;
    e.uniform2uiv(this.addr, t), copyArray(r, t);
  }
}
function setValueV3ui(e, t) {
  const r = this.cache;
  if (void 0 !== t.x)
    (r[0] === t.x && r[1] === t.y && r[2] === t.z) ||
      (e.uniform3ui(this.addr, t.x, t.y, t.z), (r[0] = t.x), (r[1] = t.y), (r[2] = t.z));
  else {
    if (arraysEqual(r, t)) return;
    e.uniform3uiv(this.addr, t), copyArray(r, t);
  }
}
function setValueV4ui(e, t) {
  const r = this.cache;
  if (void 0 !== t.x)
    (r[0] === t.x && r[1] === t.y && r[2] === t.z && r[3] === t.w) ||
      (e.uniform4ui(this.addr, t.x, t.y, t.z, t.w),
      (r[0] = t.x),
      (r[1] = t.y),
      (r[2] = t.z),
      (r[3] = t.w));
  else {
    if (arraysEqual(r, t)) return;
    e.uniform4uiv(this.addr, t), copyArray(r, t);
  }
}
function setValueT1(e, t, r) {
  const n = this.cache,
    i = r.allocateTextureUnit();
  n[0] !== i && (e.uniform1i(this.addr, i), (n[0] = i)), r.setTexture2D(t || emptyTexture, i);
}
function setValueT3D1(e, t, r) {
  const n = this.cache,
    i = r.allocateTextureUnit();
  n[0] !== i && (e.uniform1i(this.addr, i), (n[0] = i)), r.setTexture3D(t || empty3dTexture, i);
}
function setValueT6(e, t, r) {
  const n = this.cache,
    i = r.allocateTextureUnit();
  n[0] !== i && (e.uniform1i(this.addr, i), (n[0] = i)), r.setTextureCube(t || emptyCubeTexture, i);
}
function setValueT2DArray1(e, t, r) {
  const n = this.cache,
    i = r.allocateTextureUnit();
  n[0] !== i && (e.uniform1i(this.addr, i), (n[0] = i)),
    r.setTexture2DArray(t || emptyArrayTexture, i);
}
function getSingularSetter(e) {
  switch (e) {
    case 5126:
      return setValueV1f;
    case 35664:
      return setValueV2f;
    case 35665:
      return setValueV3f;
    case 35666:
      return setValueV4f;
    case 35674:
      return setValueM2;
    case 35675:
      return setValueM3;
    case 35676:
      return setValueM4;
    case 5124:
    case 35670:
      return setValueV1i;
    case 35667:
    case 35671:
      return setValueV2i;
    case 35668:
    case 35672:
      return setValueV3i;
    case 35669:
    case 35673:
      return setValueV4i;
    case 5125:
      return setValueV1ui;
    case 36294:
      return setValueV2ui;
    case 36295:
      return setValueV3ui;
    case 36296:
      return setValueV4ui;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return setValueT1;
    case 35679:
    case 36299:
    case 36307:
      return setValueT3D1;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return setValueT6;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return setValueT2DArray1;
  }
}
function setValueV1fArray(e, t) {
  e.uniform1fv(this.addr, t);
}
function setValueV2fArray(e, t) {
  const r = flatten(t, this.size, 2);
  e.uniform2fv(this.addr, r);
}
function setValueV3fArray(e, t) {
  const r = flatten(t, this.size, 3);
  e.uniform3fv(this.addr, r);
}
function setValueV4fArray(e, t) {
  const r = flatten(t, this.size, 4);
  e.uniform4fv(this.addr, r);
}
function setValueM2Array(e, t) {
  const r = flatten(t, this.size, 4);
  e.uniformMatrix2fv(this.addr, !1, r);
}
function setValueM3Array(e, t) {
  const r = flatten(t, this.size, 9);
  e.uniformMatrix3fv(this.addr, !1, r);
}
function setValueM4Array(e, t) {
  const r = flatten(t, this.size, 16);
  e.uniformMatrix4fv(this.addr, !1, r);
}
function setValueV1iArray(e, t) {
  e.uniform1iv(this.addr, t);
}
function setValueV2iArray(e, t) {
  e.uniform2iv(this.addr, t);
}
function setValueV3iArray(e, t) {
  e.uniform3iv(this.addr, t);
}
function setValueV4iArray(e, t) {
  e.uniform4iv(this.addr, t);
}
function setValueV1uiArray(e, t) {
  e.uniform1uiv(this.addr, t);
}
function setValueV2uiArray(e, t) {
  e.uniform2uiv(this.addr, t);
}
function setValueV3uiArray(e, t) {
  e.uniform3uiv(this.addr, t);
}
function setValueV4uiArray(e, t) {
  e.uniform4uiv(this.addr, t);
}
function setValueT1Array(e, t, r) {
  const n = this.cache,
    i = t.length,
    a = allocTexUnits(r, i);
  arraysEqual(n, a) || (e.uniform1iv(this.addr, a), copyArray(n, a));
  for (let e = 0; e !== i; ++e) r.setTexture2D(t[e] || emptyTexture, a[e]);
}
function setValueT3DArray(e, t, r) {
  const n = this.cache,
    i = t.length,
    a = allocTexUnits(r, i);
  arraysEqual(n, a) || (e.uniform1iv(this.addr, a), copyArray(n, a));
  for (let e = 0; e !== i; ++e) r.setTexture3D(t[e] || empty3dTexture, a[e]);
}
function setValueT6Array(e, t, r) {
  const n = this.cache,
    i = t.length,
    a = allocTexUnits(r, i);
  arraysEqual(n, a) || (e.uniform1iv(this.addr, a), copyArray(n, a));
  for (let e = 0; e !== i; ++e) r.setTextureCube(t[e] || emptyCubeTexture, a[e]);
}
function setValueT2DArrayArray(e, t, r) {
  const n = this.cache,
    i = t.length,
    a = allocTexUnits(r, i);
  arraysEqual(n, a) || (e.uniform1iv(this.addr, a), copyArray(n, a));
  for (let e = 0; e !== i; ++e) r.setTexture2DArray(t[e] || emptyArrayTexture, a[e]);
}
function getPureArraySetter(e) {
  switch (e) {
    case 5126:
      return setValueV1fArray;
    case 35664:
      return setValueV2fArray;
    case 35665:
      return setValueV3fArray;
    case 35666:
      return setValueV4fArray;
    case 35674:
      return setValueM2Array;
    case 35675:
      return setValueM3Array;
    case 35676:
      return setValueM4Array;
    case 5124:
    case 35670:
      return setValueV1iArray;
    case 35667:
    case 35671:
      return setValueV2iArray;
    case 35668:
    case 35672:
      return setValueV3iArray;
    case 35669:
    case 35673:
      return setValueV4iArray;
    case 5125:
      return setValueV1uiArray;
    case 36294:
      return setValueV2uiArray;
    case 36295:
      return setValueV3uiArray;
    case 36296:
      return setValueV4uiArray;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return setValueT1Array;
    case 35679:
    case 36299:
    case 36307:
      return setValueT3DArray;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return setValueT6Array;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return setValueT2DArrayArray;
  }
}
class SingleUniform {
  constructor(e, t, r) {
    (this.id = e), (this.addr = r), (this.cache = []), (this.setValue = getSingularSetter(t.type));
  }
}
class PureArrayUniform {
  constructor(e, t, r) {
    (this.id = e),
      (this.addr = r),
      (this.cache = []),
      (this.size = t.size),
      (this.setValue = getPureArraySetter(t.type));
  }
}
class StructuredUniform {
  constructor(e) {
    (this.id = e), (this.seq = []), (this.map = {});
  }
  setValue(e, t, r) {
    const n = this.seq;
    for (let i = 0, a = n.length; i !== a; ++i) {
      const a = n[i];
      a.setValue(e, t[a.id], r);
    }
  }
}
const RePathPart = /(\w+)(\])?(\[|\.)?/g;
function addUniform(e, t) {
  e.seq.push(t), (e.map[t.id] = t);
}
function parseUniform(e, t, r) {
  const n = e.name,
    i = n.length;
  for (RePathPart.lastIndex = 0; ; ) {
    const a = RePathPart.exec(n),
      s = RePathPart.lastIndex;
    let o = a[1];
    const l = ']' === a[2],
      c = a[3];
    if ((l && (o |= 0), void 0 === c || ('[' === c && s + 2 === i))) {
      addUniform(r, void 0 === c ? new SingleUniform(o, e, t) : new PureArrayUniform(o, e, t));
      break;
    }
    {
      let e = r.map[o];
      void 0 === e && ((e = new StructuredUniform(o)), addUniform(r, e)), (r = e);
    }
  }
}
class WebGLUniforms {
  constructor(e, t) {
    (this.seq = []), (this.map = {});
    const r = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let n = 0; n < r; ++n) {
      const r = e.getActiveUniform(t, n);
      parseUniform(r, e.getUniformLocation(t, r.name), this);
    }
  }
  setValue(e, t, r, n) {
    const i = this.map[t];
    void 0 !== i && i.setValue(e, r, n);
  }
  setOptional(e, t, r) {
    const n = t[r];
    void 0 !== n && this.setValue(e, r, n);
  }
  static upload(e, t, r, n) {
    for (let i = 0, a = t.length; i !== a; ++i) {
      const a = t[i],
        s = r[a.id];
      !1 !== s.needsUpdate && a.setValue(e, s.value, n);
    }
  }
  static seqWithValue(e, t) {
    const r = [];
    for (let n = 0, i = e.length; n !== i; ++n) {
      const i = e[n];
      i.id in t && r.push(i);
    }
    return r;
  }
}
function WebGLShader(e, t, r) {
  const n = e.createShader(t);
  return e.shaderSource(n, r), e.compileShader(n), n;
}
let programIdCount = 0;
function handleSource(e, t) {
  const r = e.split('\n'),
    n = [],
    i = Math.max(t - 6, 0),
    a = Math.min(t + 6, r.length);
  for (let e = i; e < a; e++) {
    const i = e + 1;
    n.push(`${i === t ? '>' : ' '} ${i}: ${r[e]}`);
  }
  return n.join('\n');
}
function getEncodingComponents(e) {
  switch (e) {
    case 3e3:
      return ['Linear', '( value )'];
    case 3001:
      return ['sRGB', '( value )'];
    default:
      return console.warn('THREE.WebGLProgram: Unsupported encoding:', e), ['Linear', '( value )'];
  }
}
function getShaderErrors(e, t, r) {
  const n = e.getShaderParameter(t, e.COMPILE_STATUS),
    i = e.getShaderInfoLog(t).trim();
  if (n && '' === i) return '';
  const a = /ERROR: 0:(\d+)/.exec(i);
  if (a) {
    const n = parseInt(a[1]);
    return r.toUpperCase() + '\n\n' + i + '\n\n' + handleSource(e.getShaderSource(t), n);
  }
  return i;
}
function getTexelEncodingFunction(e, t) {
  const r = getEncodingComponents(t);
  return 'vec4 ' + e + '( vec4 value ) { return LinearTo' + r[0] + r[1] + '; }';
}
function getToneMappingFunction(e, t) {
  let r;
  switch (t) {
    case 1:
      r = 'Linear';
      break;
    case 2:
      r = 'Reinhard';
      break;
    case 3:
      r = 'OptimizedCineon';
      break;
    case 4:
      r = 'ACESFilmic';
      break;
    case 5:
      r = 'Custom';
      break;
    default:
      console.warn('THREE.WebGLProgram: Unsupported toneMapping:', t), (r = 'Linear');
  }
  return 'vec3 ' + e + '( vec3 color ) { return ' + r + 'ToneMapping( color ); }';
}
function generateExtensions(e) {
  return [
    e.extensionDerivatives ||
    e.envMapCubeUVHeight ||
    e.bumpMap ||
    e.normalMapTangentSpace ||
    e.clearcoatNormalMap ||
    e.flatShading ||
    'physical' === e.shaderID
      ? '#extension GL_OES_standard_derivatives : enable'
      : '',
    (e.extensionFragDepth || e.logarithmicDepthBuffer) && e.rendererExtensionFragDepth
      ? '#extension GL_EXT_frag_depth : enable'
      : '',
    e.extensionDrawBuffers && e.rendererExtensionDrawBuffers
      ? '#extension GL_EXT_draw_buffers : require'
      : '',
    (e.extensionShaderTextureLOD || e.envMap || e.transmission) &&
    e.rendererExtensionShaderTextureLod
      ? '#extension GL_EXT_shader_texture_lod : enable'
      : '',
  ]
    .filter(filterEmptyLine)
    .join('\n');
}
function generateDefines(e) {
  const t = [];
  for (const r in e) {
    const n = e[r];
    !1 !== n && t.push('#define ' + r + ' ' + n);
  }
  return t.join('\n');
}
function fetchAttributeLocations(e, t) {
  const r = {},
    n = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES);
  for (let i = 0; i < n; i++) {
    const n = e.getActiveAttrib(t, i),
      a = n.name;
    let s = 1;
    n.type === e.FLOAT_MAT2 && (s = 2),
      n.type === e.FLOAT_MAT3 && (s = 3),
      n.type === e.FLOAT_MAT4 && (s = 4),
      (r[a] = { type: n.type, location: e.getAttribLocation(t, a), locationSize: s });
  }
  return r;
}
function filterEmptyLine(e) {
  return '' !== e;
}
function replaceLightNums(e, t) {
  const r = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
  return e
    .replace(/NUM_DIR_LIGHTS/g, t.numDirLights)
    .replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights)
    .replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps)
    .replace(/NUM_SPOT_LIGHT_COORDS/g, r)
    .replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights)
    .replace(/NUM_POINT_LIGHTS/g, t.numPointLights)
    .replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights)
    .replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows)
    .replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps)
    .replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows)
    .replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
function replaceClippingPlaneNums(e, t) {
  return e
    .replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes)
    .replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
const includePattern = /^[ \t]*#include +<([\w\d./]+)>/gm;
function resolveIncludes(e) {
  return e.replace(includePattern, includeReplacer);
}
function includeReplacer(e, t) {
  const r = ShaderChunk[t];
  if (void 0 === r) throw new Error('Can not resolve #include <' + t + '>');
  return resolveIncludes(r);
}
const unrollLoopPattern =
  /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function unrollLoops(e) {
  return e.replace(unrollLoopPattern, loopReplacer);
}
function loopReplacer(e, t, r, n) {
  let i = '';
  for (let e = parseInt(t); e < parseInt(r); e++)
    i += n.replace(/\[\s*i\s*\]/g, '[ ' + e + ' ]').replace(/UNROLLED_LOOP_INDEX/g, e);
  return i;
}
function generatePrecision(e) {
  let t = 'precision ' + e.precision + ' float;\nprecision ' + e.precision + ' int;';
  return (
    'highp' === e.precision
      ? (t += '\n#define HIGH_PRECISION')
      : 'mediump' === e.precision
        ? (t += '\n#define MEDIUM_PRECISION')
        : 'lowp' === e.precision && (t += '\n#define LOW_PRECISION'),
    t
  );
}
function generateShadowMapTypeDefine(e) {
  let t = 'SHADOWMAP_TYPE_BASIC';
  return (
    1 === e.shadowMapType
      ? (t = 'SHADOWMAP_TYPE_PCF')
      : 2 === e.shadowMapType
        ? (t = 'SHADOWMAP_TYPE_PCF_SOFT')
        : 3 === e.shadowMapType && (t = 'SHADOWMAP_TYPE_VSM'),
    t
  );
}
function generateEnvMapTypeDefine(e) {
  let t = 'ENVMAP_TYPE_CUBE';
  if (e.envMap)
    switch (e.envMapMode) {
      case 301:
      case 302:
        t = 'ENVMAP_TYPE_CUBE';
        break;
      case 306:
        t = 'ENVMAP_TYPE_CUBE_UV';
    }
  return t;
}
function generateEnvMapModeDefine(e) {
  let t = 'ENVMAP_MODE_REFLECTION';
  if (e.envMap)
    switch (e.envMapMode) {
      case 302:
        t = 'ENVMAP_MODE_REFRACTION';
    }
  return t;
}
function generateEnvMapBlendingDefine(e) {
  let t = 'ENVMAP_BLENDING_NONE';
  if (e.envMap)
    switch (e.combine) {
      case 0:
        t = 'ENVMAP_BLENDING_MULTIPLY';
        break;
      case 1:
        t = 'ENVMAP_BLENDING_MIX';
        break;
      case 2:
        t = 'ENVMAP_BLENDING_ADD';
    }
  return t;
}
function generateCubeUVSize(e) {
  const t = e.envMapCubeUVHeight;
  if (null === t) return null;
  const r = Math.log2(t) - 2,
    n = 1 / t;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, r), 112)), texelHeight: n, maxMip: r };
}
function WebGLProgram(e, t, r, n) {
  const i = e.getContext(),
    a = r.defines;
  let s = r.vertexShader,
    o = r.fragmentShader;
  const l = generateShadowMapTypeDefine(r),
    c = generateEnvMapTypeDefine(r),
    h = generateEnvMapModeDefine(r),
    u = generateEnvMapBlendingDefine(r),
    d = generateCubeUVSize(r),
    p = r.isWebGL2 ? '' : generateExtensions(r),
    m = generateDefines(a),
    f = i.createProgram();
  let g,
    _,
    v = r.glslVersion ? '#version ' + r.glslVersion + '\n' : '';
  r.isRawShaderMaterial
    ? ((g = [m].filter(filterEmptyLine).join('\n')),
      g.length > 0 && (g += '\n'),
      (_ = [p, m].filter(filterEmptyLine).join('\n')),
      _.length > 0 && (_ += '\n'))
    : ((g = [
        generatePrecision(r),
        '#define SHADER_NAME ' + r.shaderName,
        m,
        r.instancing ? '#define USE_INSTANCING' : '',
        r.instancingColor ? '#define USE_INSTANCING_COLOR' : '',
        r.useFog && r.fog ? '#define USE_FOG' : '',
        r.useFog && r.fogExp2 ? '#define FOG_EXP2' : '',
        r.map ? '#define USE_MAP' : '',
        r.envMap ? '#define USE_ENVMAP' : '',
        r.envMap ? '#define ' + h : '',
        r.lightMap ? '#define USE_LIGHTMAP' : '',
        r.aoMap ? '#define USE_AOMAP' : '',
        r.bumpMap ? '#define USE_BUMPMAP' : '',
        r.normalMap ? '#define USE_NORMALMAP' : '',
        r.normalMapObjectSpace ? '#define USE_NORMALMAP_OBJECTSPACE' : '',
        r.normalMapTangentSpace ? '#define USE_NORMALMAP_TANGENTSPACE' : '',
        r.displacementMap ? '#define USE_DISPLACEMENTMAP' : '',
        r.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
        r.clearcoatMap ? '#define USE_CLEARCOATMAP' : '',
        r.clearcoatRoughnessMap ? '#define USE_CLEARCOAT_ROUGHNESSMAP' : '',
        r.clearcoatNormalMap ? '#define USE_CLEARCOAT_NORMALMAP' : '',
        r.iridescenceMap ? '#define USE_IRIDESCENCEMAP' : '',
        r.iridescenceThicknessMap ? '#define USE_IRIDESCENCE_THICKNESSMAP' : '',
        r.specularMap ? '#define USE_SPECULARMAP' : '',
        r.specularColorMap ? '#define USE_SPECULAR_COLORMAP' : '',
        r.specularIntensityMap ? '#define USE_SPECULAR_INTENSITYMAP' : '',
        r.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
        r.metalnessMap ? '#define USE_METALNESSMAP' : '',
        r.alphaMap ? '#define USE_ALPHAMAP' : '',
        r.transmission ? '#define USE_TRANSMISSION' : '',
        r.transmissionMap ? '#define USE_TRANSMISSIONMAP' : '',
        r.thicknessMap ? '#define USE_THICKNESSMAP' : '',
        r.sheenColorMap ? '#define USE_SHEEN_COLORMAP' : '',
        r.sheenRoughnessMap ? '#define USE_SHEEN_ROUGHNESSMAP' : '',
        r.mapUv ? '#define MAP_UV ' + r.mapUv : '',
        r.alphaMapUv ? '#define ALPHAMAP_UV ' + r.alphaMapUv : '',
        r.lightMapUv ? '#define LIGHTMAP_UV ' + r.lightMapUv : '',
        r.aoMapUv ? '#define AOMAP_UV ' + r.aoMapUv : '',
        r.emissiveMapUv ? '#define EMISSIVEMAP_UV ' + r.emissiveMapUv : '',
        r.bumpMapUv ? '#define BUMPMAP_UV ' + r.bumpMapUv : '',
        r.normalMapUv ? '#define NORMALMAP_UV ' + r.normalMapUv : '',
        r.displacementMapUv ? '#define DISPLACEMENTMAP_UV ' + r.displacementMapUv : '',
        r.metalnessMapUv ? '#define METALNESSMAP_UV ' + r.metalnessMapUv : '',
        r.roughnessMapUv ? '#define ROUGHNESSMAP_UV ' + r.roughnessMapUv : '',
        r.clearcoatMapUv ? '#define CLEARCOATMAP_UV ' + r.clearcoatMapUv : '',
        r.clearcoatNormalMapUv ? '#define CLEARCOAT_NORMALMAP_UV ' + r.clearcoatNormalMapUv : '',
        r.clearcoatRoughnessMapUv
          ? '#define CLEARCOAT_ROUGHNESSMAP_UV ' + r.clearcoatRoughnessMapUv
          : '',
        r.iridescenceMapUv ? '#define IRIDESCENCEMAP_UV ' + r.iridescenceMapUv : '',
        r.iridescenceThicknessMapUv
          ? '#define IRIDESCENCE_THICKNESSMAP_UV ' + r.iridescenceThicknessMapUv
          : '',
        r.sheenColorMapUv ? '#define SHEEN_COLORMAP_UV ' + r.sheenColorMapUv : '',
        r.sheenRoughnessMapUv ? '#define SHEEN_ROUGHNESSMAP_UV ' + r.sheenRoughnessMapUv : '',
        r.specularMapUv ? '#define SPECULARMAP_UV ' + r.specularMapUv : '',
        r.specularColorMapUv ? '#define SPECULAR_COLORMAP_UV ' + r.specularColorMapUv : '',
        r.specularIntensityMapUv
          ? '#define SPECULAR_INTENSITYMAP_UV ' + r.specularIntensityMapUv
          : '',
        r.transmissionMapUv ? '#define TRANSMISSIONMAP_UV ' + r.transmissionMapUv : '',
        r.thicknessMapUv ? '#define THICKNESSMAP_UV ' + r.thicknessMapUv : '',
        r.vertexTangents ? '#define USE_TANGENT' : '',
        r.vertexColors ? '#define USE_COLOR' : '',
        r.vertexAlphas ? '#define USE_COLOR_ALPHA' : '',
        r.vertexUvs2 ? '#define USE_UV2' : '',
        r.pointsUvs ? '#define USE_POINTS_UV' : '',
        r.flatShading ? '#define FLAT_SHADED' : '',
        r.skinning ? '#define USE_SKINNING' : '',
        r.morphTargets ? '#define USE_MORPHTARGETS' : '',
        r.morphNormals && !1 === r.flatShading ? '#define USE_MORPHNORMALS' : '',
        r.morphColors && r.isWebGL2 ? '#define USE_MORPHCOLORS' : '',
        r.morphTargetsCount > 0 && r.isWebGL2 ? '#define MORPHTARGETS_TEXTURE' : '',
        r.morphTargetsCount > 0 && r.isWebGL2
          ? '#define MORPHTARGETS_TEXTURE_STRIDE ' + r.morphTextureStride
          : '',
        r.morphTargetsCount > 0 && r.isWebGL2
          ? '#define MORPHTARGETS_COUNT ' + r.morphTargetsCount
          : '',
        r.doubleSided ? '#define DOUBLE_SIDED' : '',
        r.flipSided ? '#define FLIP_SIDED' : '',
        r.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
        r.shadowMapEnabled ? '#define ' + l : '',
        r.sizeAttenuation ? '#define USE_SIZEATTENUATION' : '',
        r.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
        r.logarithmicDepthBuffer && r.rendererExtensionFragDepth
          ? '#define USE_LOGDEPTHBUF_EXT'
          : '',
        'uniform mat4 modelMatrix;',
        'uniform mat4 modelViewMatrix;',
        'uniform mat4 projectionMatrix;',
        'uniform mat4 viewMatrix;',
        'uniform mat3 normalMatrix;',
        'uniform vec3 cameraPosition;',
        'uniform bool isOrthographic;',
        '#ifdef USE_INSTANCING',
        '\tattribute mat4 instanceMatrix;',
        '#endif',
        '#ifdef USE_INSTANCING_COLOR',
        '\tattribute vec3 instanceColor;',
        '#endif',
        'attribute vec3 position;',
        'attribute vec3 normal;',
        'attribute vec2 uv;',
        '#ifdef USE_TANGENT',
        '\tattribute vec4 tangent;',
        '#endif',
        '#if defined( USE_COLOR_ALPHA )',
        '\tattribute vec4 color;',
        '#elif defined( USE_COLOR )',
        '\tattribute vec3 color;',
        '#endif',
        '#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )',
        '\tattribute vec3 morphTarget0;',
        '\tattribute vec3 morphTarget1;',
        '\tattribute vec3 morphTarget2;',
        '\tattribute vec3 morphTarget3;',
        '\t#ifdef USE_MORPHNORMALS',
        '\t\tattribute vec3 morphNormal0;',
        '\t\tattribute vec3 morphNormal1;',
        '\t\tattribute vec3 morphNormal2;',
        '\t\tattribute vec3 morphNormal3;',
        '\t#else',
        '\t\tattribute vec3 morphTarget4;',
        '\t\tattribute vec3 morphTarget5;',
        '\t\tattribute vec3 morphTarget6;',
        '\t\tattribute vec3 morphTarget7;',
        '\t#endif',
        '#endif',
        '#ifdef USE_SKINNING',
        '\tattribute vec4 skinIndex;',
        '\tattribute vec4 skinWeight;',
        '#endif',
        '\n',
      ]
        .filter(filterEmptyLine)
        .join('\n')),
      (_ = [
        p,
        generatePrecision(r),
        '#define SHADER_NAME ' + r.shaderName,
        m,
        r.useFog && r.fog ? '#define USE_FOG' : '',
        r.useFog && r.fogExp2 ? '#define FOG_EXP2' : '',
        r.map ? '#define USE_MAP' : '',
        r.matcap ? '#define USE_MATCAP' : '',
        r.envMap ? '#define USE_ENVMAP' : '',
        r.envMap ? '#define ' + c : '',
        r.envMap ? '#define ' + h : '',
        r.envMap ? '#define ' + u : '',
        d ? '#define CUBEUV_TEXEL_WIDTH ' + d.texelWidth : '',
        d ? '#define CUBEUV_TEXEL_HEIGHT ' + d.texelHeight : '',
        d ? '#define CUBEUV_MAX_MIP ' + d.maxMip + '.0' : '',
        r.lightMap ? '#define USE_LIGHTMAP' : '',
        r.aoMap ? '#define USE_AOMAP' : '',
        r.bumpMap ? '#define USE_BUMPMAP' : '',
        r.normalMap ? '#define USE_NORMALMAP' : '',
        r.normalMapObjectSpace ? '#define USE_NORMALMAP_OBJECTSPACE' : '',
        r.normalMapTangentSpace ? '#define USE_NORMALMAP_TANGENTSPACE' : '',
        r.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
        r.clearcoat ? '#define USE_CLEARCOAT' : '',
        r.clearcoatMap ? '#define USE_CLEARCOATMAP' : '',
        r.clearcoatRoughnessMap ? '#define USE_CLEARCOAT_ROUGHNESSMAP' : '',
        r.clearcoatNormalMap ? '#define USE_CLEARCOAT_NORMALMAP' : '',
        r.iridescence ? '#define USE_IRIDESCENCE' : '',
        r.iridescenceMap ? '#define USE_IRIDESCENCEMAP' : '',
        r.iridescenceThicknessMap ? '#define USE_IRIDESCENCE_THICKNESSMAP' : '',
        r.specularMap ? '#define USE_SPECULARMAP' : '',
        r.specularColorMap ? '#define USE_SPECULAR_COLORMAP' : '',
        r.specularIntensityMap ? '#define USE_SPECULAR_INTENSITYMAP' : '',
        r.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
        r.metalnessMap ? '#define USE_METALNESSMAP' : '',
        r.alphaMap ? '#define USE_ALPHAMAP' : '',
        r.alphaTest ? '#define USE_ALPHATEST' : '',
        r.sheen ? '#define USE_SHEEN' : '',
        r.sheenColorMap ? '#define USE_SHEEN_COLORMAP' : '',
        r.sheenRoughnessMap ? '#define USE_SHEEN_ROUGHNESSMAP' : '',
        r.transmission ? '#define USE_TRANSMISSION' : '',
        r.transmissionMap ? '#define USE_TRANSMISSIONMAP' : '',
        r.thicknessMap ? '#define USE_THICKNESSMAP' : '',
        r.decodeVideoTexture ? '#define DECODE_VIDEO_TEXTURE' : '',
        r.vertexTangents ? '#define USE_TANGENT' : '',
        r.vertexColors || r.instancingColor ? '#define USE_COLOR' : '',
        r.vertexAlphas ? '#define USE_COLOR_ALPHA' : '',
        r.vertexUvs2 ? '#define USE_UV2' : '',
        r.pointsUvs ? '#define USE_POINTS_UV' : '',
        r.gradientMap ? '#define USE_GRADIENTMAP' : '',
        r.flatShading ? '#define FLAT_SHADED' : '',
        r.doubleSided ? '#define DOUBLE_SIDED' : '',
        r.flipSided ? '#define FLIP_SIDED' : '',
        r.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
        r.shadowMapEnabled ? '#define ' + l : '',
        r.premultipliedAlpha ? '#define PREMULTIPLIED_ALPHA' : '',
        r.useLegacyLights ? '#define LEGACY_LIGHTS' : '',
        r.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
        r.logarithmicDepthBuffer && r.rendererExtensionFragDepth
          ? '#define USE_LOGDEPTHBUF_EXT'
          : '',
        'uniform mat4 viewMatrix;',
        'uniform vec3 cameraPosition;',
        'uniform bool isOrthographic;',
        0 !== r.toneMapping ? '#define TONE_MAPPING' : '',
        0 !== r.toneMapping ? ShaderChunk.tonemapping_pars_fragment : '',
        0 !== r.toneMapping ? getToneMappingFunction('toneMapping', r.toneMapping) : '',
        r.dithering ? '#define DITHERING' : '',
        r.opaque ? '#define OPAQUE' : '',
        ShaderChunk.encodings_pars_fragment,
        getTexelEncodingFunction('linearToOutputTexel', r.outputEncoding),
        r.useDepthPacking ? '#define DEPTH_PACKING ' + r.depthPacking : '',
        '\n',
      ]
        .filter(filterEmptyLine)
        .join('\n'))),
    (s = resolveIncludes(s)),
    (s = replaceLightNums(s, r)),
    (s = replaceClippingPlaneNums(s, r)),
    (o = resolveIncludes(o)),
    (o = replaceLightNums(o, r)),
    (o = replaceClippingPlaneNums(o, r)),
    (s = unrollLoops(s)),
    (o = unrollLoops(o)),
    r.isWebGL2 &&
      !0 !== r.isRawShaderMaterial &&
      ((v = '#version 300 es\n'),
      (g =
        [
          'precision mediump sampler2DArray;',
          '#define attribute in',
          '#define varying out',
          '#define texture2D texture',
        ].join('\n') +
        '\n' +
        g),
      (_ =
        [
          '#define varying in',
          r.glslVersion === GLSL3 ? '' : 'layout(location = 0) out highp vec4 pc_fragColor;',
          r.glslVersion === GLSL3 ? '' : '#define gl_FragColor pc_fragColor',
          '#define gl_FragDepthEXT gl_FragDepth',
          '#define texture2D texture',
          '#define textureCube texture',
          '#define texture2DProj textureProj',
          '#define texture2DLodEXT textureLod',
          '#define texture2DProjLodEXT textureProjLod',
          '#define textureCubeLodEXT textureLod',
          '#define texture2DGradEXT textureGrad',
          '#define texture2DProjGradEXT textureProjGrad',
          '#define textureCubeGradEXT textureGrad',
        ].join('\n') +
        '\n' +
        _));
  const x = v + g + s,
    y = v + _ + o,
    M = WebGLShader(i, i.VERTEX_SHADER, x),
    S = WebGLShader(i, i.FRAGMENT_SHADER, y);
  if (
    (i.attachShader(f, M),
    i.attachShader(f, S),
    void 0 !== r.index0AttributeName
      ? i.bindAttribLocation(f, 0, r.index0AttributeName)
      : !0 === r.morphTargets && i.bindAttribLocation(f, 0, 'position'),
    i.linkProgram(f),
    e.debug.checkShaderErrors)
  ) {
    const t = i.getProgramInfoLog(f).trim(),
      r = i.getShaderInfoLog(M).trim(),
      n = i.getShaderInfoLog(S).trim();
    let a = !0,
      s = !0;
    if (!1 === i.getProgramParameter(f, i.LINK_STATUS))
      if (((a = !1), 'function' == typeof e.debug.onShaderError)) e.debug.onShaderError(i, f, M, S);
      else {
        const e = getShaderErrors(i, M, 'vertex'),
          r = getShaderErrors(i, S, 'fragment');
        console.error(
          'THREE.WebGLProgram: Shader Error ' +
            i.getError() +
            ' - VALIDATE_STATUS ' +
            i.getProgramParameter(f, i.VALIDATE_STATUS) +
            '\n\nProgram Info Log: ' +
            t +
            '\n' +
            e +
            '\n' +
            r,
        );
      }
    else
      '' !== t
        ? console.warn('THREE.WebGLProgram: Program Info Log:', t)
        : ('' !== r && '' !== n) || (s = !1);
    s &&
      (this.diagnostics = {
        runnable: a,
        programLog: t,
        vertexShader: { log: r, prefix: g },
        fragmentShader: { log: n, prefix: _ },
      });
  }
  let b, T;
  return (
    i.deleteShader(M),
    i.deleteShader(S),
    (this.getUniforms = function () {
      return void 0 === b && (b = new WebGLUniforms(i, f)), b;
    }),
    (this.getAttributes = function () {
      return void 0 === T && (T = fetchAttributeLocations(i, f)), T;
    }),
    (this.destroy = function () {
      n.releaseStatesOfProgram(this), i.deleteProgram(f), (this.program = void 0);
    }),
    (this.name = r.shaderName),
    (this.id = programIdCount++),
    (this.cacheKey = t),
    (this.usedTimes = 1),
    (this.program = f),
    (this.vertexShader = M),
    (this.fragmentShader = S),
    this
  );
}
let _id = 0;
class WebGLShaderCache {
  constructor() {
    (this.shaderCache = new Map()), (this.materialCache = new Map());
  }
  update(e) {
    const t = e.vertexShader,
      r = e.fragmentShader,
      n = this._getShaderStage(t),
      i = this._getShaderStage(r),
      a = this._getShaderCacheForMaterial(e);
    return (
      !1 === a.has(n) && (a.add(n), n.usedTimes++),
      !1 === a.has(i) && (a.add(i), i.usedTimes++),
      this
    );
  }
  remove(e) {
    const t = this.materialCache.get(e);
    for (const e of t) e.usedTimes--, 0 === e.usedTimes && this.shaderCache.delete(e.code);
    return this.materialCache.delete(e), this;
  }
  getVertexShaderID(e) {
    return this._getShaderStage(e.vertexShader).id;
  }
  getFragmentShaderID(e) {
    return this._getShaderStage(e.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(e) {
    const t = this.materialCache;
    let r = t.get(e);
    return void 0 === r && ((r = new Set()), t.set(e, r)), r;
  }
  _getShaderStage(e) {
    const t = this.shaderCache;
    let r = t.get(e);
    return void 0 === r && ((r = new WebGLShaderStage(e)), t.set(e, r)), r;
  }
}
class WebGLShaderStage {
  constructor(e) {
    (this.id = _id++), (this.code = e), (this.usedTimes = 0);
  }
}
function WebGLPrograms(e, t, r, n, i, a, s) {
  const o = new Layers(),
    l = new WebGLShaderCache(),
    c = [],
    h = i.isWebGL2,
    u = i.logarithmicDepthBuffer,
    d = i.vertexTextures;
  let p = i.precision;
  const m = {
    MeshDepthMaterial: 'depth',
    MeshDistanceMaterial: 'distanceRGBA',
    MeshNormalMaterial: 'normal',
    MeshBasicMaterial: 'basic',
    MeshLambertMaterial: 'lambert',
    MeshPhongMaterial: 'phong',
    MeshToonMaterial: 'toon',
    MeshStandardMaterial: 'physical',
    MeshPhysicalMaterial: 'physical',
    MeshMatcapMaterial: 'matcap',
    LineBasicMaterial: 'basic',
    LineDashedMaterial: 'dashed',
    PointsMaterial: 'points',
    ShadowMaterial: 'shadow',
    SpriteMaterial: 'sprite',
  };
  function f(e) {
    return 1 === e ? 'uv2' : 'uv';
  }
  return {
    getParameters: function (a, o, c, g, _) {
      const v = g.fog,
        x = _.geometry,
        y = a.isMeshStandardMaterial ? g.environment : null,
        M = (a.isMeshStandardMaterial ? r : t).get(a.envMap || y),
        S = M && 306 === M.mapping ? M.image.height : null,
        b = m[a.type];
      null !== a.precision &&
        ((p = i.getMaxPrecision(a.precision)),
        p !== a.precision &&
          console.warn(
            'THREE.WebGLProgram.getParameters:',
            a.precision,
            'not supported, using',
            p,
            'instead.',
          ));
      const T = x.morphAttributes.position || x.morphAttributes.normal || x.morphAttributes.color,
        E = void 0 !== T ? T.length : 0;
      let A,
        w,
        C,
        R,
        L = 0;
      if (
        (void 0 !== x.morphAttributes.position && (L = 1),
        void 0 !== x.morphAttributes.normal && (L = 2),
        void 0 !== x.morphAttributes.color && (L = 3),
        b)
      ) {
        const e = ShaderLib[b];
        (A = e.vertexShader), (w = e.fragmentShader);
      } else
        (A = a.vertexShader),
          (w = a.fragmentShader),
          l.update(a),
          (C = l.getVertexShaderID(a)),
          (R = l.getFragmentShaderID(a));
      const P = e.getRenderTarget(),
        I = !0 === _.isInstancedMesh,
        U = !!a.map,
        D = !!a.matcap,
        B = !!M,
        N = !!a.aoMap,
        O = !!a.lightMap,
        F = !!a.bumpMap,
        V = !!a.normalMap,
        G = !!a.displacementMap,
        z = !!a.emissiveMap,
        k = !!a.metalnessMap,
        H = !!a.roughnessMap,
        W = a.clearcoat > 0,
        X = a.iridescence > 0,
        $ = a.sheen > 0,
        j = a.transmission > 0,
        q = W && !!a.clearcoatMap,
        Y = W && !!a.clearcoatNormalMap,
        Z = W && !!a.clearcoatRoughnessMap,
        K = X && !!a.iridescenceMap,
        J = X && !!a.iridescenceThicknessMap,
        Q = $ && !!a.sheenColorMap,
        ee = $ && !!a.sheenRoughnessMap,
        te = !!a.specularMap,
        re = !!a.specularColorMap,
        ne = !!a.specularIntensityMap,
        ie = j && !!a.transmissionMap,
        ae = j && !!a.thicknessMap,
        se = !!a.gradientMap,
        oe = !!a.alphaMap,
        le = a.alphaTest > 0,
        ce = !!a.extensions,
        he = !!x.attributes.uv2;
      return {
        isWebGL2: h,
        shaderID: b,
        shaderName: a.type,
        vertexShader: A,
        fragmentShader: w,
        defines: a.defines,
        customVertexShaderID: C,
        customFragmentShaderID: R,
        isRawShaderMaterial: !0 === a.isRawShaderMaterial,
        glslVersion: a.glslVersion,
        precision: p,
        instancing: I,
        instancingColor: I && null !== _.instanceColor,
        supportsVertexTextures: d,
        outputEncoding:
          null === P ? e.outputEncoding : !0 === P.isXRRenderTarget ? P.texture.encoding : 3e3,
        map: U,
        matcap: D,
        envMap: B,
        envMapMode: B && M.mapping,
        envMapCubeUVHeight: S,
        aoMap: N,
        lightMap: O,
        bumpMap: F,
        normalMap: V,
        displacementMap: d && G,
        emissiveMap: z,
        normalMapObjectSpace: V && 1 === a.normalMapType,
        normalMapTangentSpace: V && 0 === a.normalMapType,
        decodeVideoTexture: U && !0 === a.map.isVideoTexture && 3001 === a.map.encoding,
        metalnessMap: k,
        roughnessMap: H,
        clearcoat: W,
        clearcoatMap: q,
        clearcoatNormalMap: Y,
        clearcoatRoughnessMap: Z,
        iridescence: X,
        iridescenceMap: K,
        iridescenceThicknessMap: J,
        sheen: $,
        sheenColorMap: Q,
        sheenRoughnessMap: ee,
        specularMap: te,
        specularColorMap: re,
        specularIntensityMap: ne,
        transmission: j,
        transmissionMap: ie,
        thicknessMap: ae,
        gradientMap: se,
        opaque: !1 === a.transparent && 1 === a.blending,
        alphaMap: oe,
        alphaTest: le,
        combine: a.combine,
        mapUv: U && f(a.map.channel),
        aoMapUv: N && f(a.aoMap.channel),
        lightMapUv: O && f(a.lightMap.channel),
        bumpMapUv: F && f(a.bumpMap.channel),
        normalMapUv: V && f(a.normalMap.channel),
        displacementMapUv: G && f(a.displacementMap.channel),
        emissiveMapUv: z && f(a.emissiveMap.channel),
        metalnessMapUv: k && f(a.metalnessMap.channel),
        roughnessMapUv: H && f(a.roughnessMap.channel),
        clearcoatMapUv: q && f(a.clearcoatMap.channel),
        clearcoatNormalMapUv: Y && f(a.clearcoatNormalMap.channel),
        clearcoatRoughnessMapUv: Z && f(a.clearcoatRoughnessMap.channel),
        iridescenceMapUv: K && f(a.iridescenceMap.channel),
        iridescenceThicknessMapUv: J && f(a.iridescenceThicknessMap.channel),
        sheenColorMapUv: Q && f(a.sheenColorMap.channel),
        sheenRoughnessMapUv: ee && f(a.sheenRoughnessMap.channel),
        specularMapUv: te && f(a.specularMap.channel),
        specularColorMapUv: re && f(a.specularColorMap.channel),
        specularIntensityMapUv: ne && f(a.specularIntensityMap.channel),
        transmissionMapUv: ie && f(a.transmissionMap.channel),
        thicknessMapUv: ae && f(a.thicknessMap.channel),
        alphaMapUv: oe && f(a.alphaMap.channel),
        vertexTangents: V && !!x.attributes.tangent,
        vertexColors: a.vertexColors,
        vertexAlphas:
          !0 === a.vertexColors && !!x.attributes.color && 4 === x.attributes.color.itemSize,
        vertexUvs2: he,
        pointsUvs: !0 === _.isPoints && !!x.attributes.uv && (U || oe),
        fog: !!v,
        useFog: !0 === a.fog,
        fogExp2: v && v.isFogExp2,
        flatShading: !0 === a.flatShading,
        sizeAttenuation: !0 === a.sizeAttenuation,
        logarithmicDepthBuffer: u,
        skinning: !0 === _.isSkinnedMesh,
        morphTargets: void 0 !== x.morphAttributes.position,
        morphNormals: void 0 !== x.morphAttributes.normal,
        morphColors: void 0 !== x.morphAttributes.color,
        morphTargetsCount: E,
        morphTextureStride: L,
        numDirLights: o.directional.length,
        numPointLights: o.point.length,
        numSpotLights: o.spot.length,
        numSpotLightMaps: o.spotLightMap.length,
        numRectAreaLights: o.rectArea.length,
        numHemiLights: o.hemi.length,
        numDirLightShadows: o.directionalShadowMap.length,
        numPointLightShadows: o.pointShadowMap.length,
        numSpotLightShadows: o.spotShadowMap.length,
        numSpotLightShadowsWithMaps: o.numSpotLightShadowsWithMaps,
        numClippingPlanes: s.numPlanes,
        numClipIntersection: s.numIntersection,
        dithering: a.dithering,
        shadowMapEnabled: e.shadowMap.enabled && c.length > 0,
        shadowMapType: e.shadowMap.type,
        toneMapping: a.toneMapped ? e.toneMapping : 0,
        useLegacyLights: e.useLegacyLights,
        premultipliedAlpha: a.premultipliedAlpha,
        doubleSided: 2 === a.side,
        flipSided: 1 === a.side,
        useDepthPacking: a.depthPacking >= 0,
        depthPacking: a.depthPacking || 0,
        index0AttributeName: a.index0AttributeName,
        extensionDerivatives: ce && !0 === a.extensions.derivatives,
        extensionFragDepth: ce && !0 === a.extensions.fragDepth,
        extensionDrawBuffers: ce && !0 === a.extensions.drawBuffers,
        extensionShaderTextureLOD: ce && !0 === a.extensions.shaderTextureLOD,
        rendererExtensionFragDepth: h || n.has('EXT_frag_depth'),
        rendererExtensionDrawBuffers: h || n.has('WEBGL_draw_buffers'),
        rendererExtensionShaderTextureLod: h || n.has('EXT_shader_texture_lod'),
        customProgramCacheKey: a.customProgramCacheKey(),
      };
    },
    getProgramCacheKey: function (t) {
      const r = [];
      if (
        (t.shaderID
          ? r.push(t.shaderID)
          : (r.push(t.customVertexShaderID), r.push(t.customFragmentShaderID)),
        void 0 !== t.defines)
      )
        for (const e in t.defines) r.push(e), r.push(t.defines[e]);
      return (
        !1 === t.isRawShaderMaterial &&
          (!(function (e, t) {
            e.push(t.precision),
              e.push(t.outputEncoding),
              e.push(t.envMapMode),
              e.push(t.envMapCubeUVHeight),
              e.push(t.mapUv),
              e.push(t.alphaMapUv),
              e.push(t.lightMapUv),
              e.push(t.aoMapUv),
              e.push(t.bumpMapUv),
              e.push(t.normalMapUv),
              e.push(t.displacementMapUv),
              e.push(t.emissiveMapUv),
              e.push(t.metalnessMapUv),
              e.push(t.roughnessMapUv),
              e.push(t.clearcoatMapUv),
              e.push(t.clearcoatNormalMapUv),
              e.push(t.clearcoatRoughnessMapUv),
              e.push(t.iridescenceMapUv),
              e.push(t.iridescenceThicknessMapUv),
              e.push(t.sheenColorMapUv),
              e.push(t.sheenRoughnessMapUv),
              e.push(t.specularMapUv),
              e.push(t.specularColorMapUv),
              e.push(t.specularIntensityMapUv),
              e.push(t.transmissionMapUv),
              e.push(t.thicknessMapUv),
              e.push(t.combine),
              e.push(t.fogExp2),
              e.push(t.sizeAttenuation),
              e.push(t.morphTargetsCount),
              e.push(t.morphAttributeCount),
              e.push(t.numDirLights),
              e.push(t.numPointLights),
              e.push(t.numSpotLights),
              e.push(t.numSpotLightMaps),
              e.push(t.numHemiLights),
              e.push(t.numRectAreaLights),
              e.push(t.numDirLightShadows),
              e.push(t.numPointLightShadows),
              e.push(t.numSpotLightShadows),
              e.push(t.numSpotLightShadowsWithMaps),
              e.push(t.shadowMapType),
              e.push(t.toneMapping),
              e.push(t.numClippingPlanes),
              e.push(t.numClipIntersection),
              e.push(t.depthPacking);
          })(r, t),
          (function (e, t) {
            o.disableAll(), t.isWebGL2 && o.enable(0);
            t.supportsVertexTextures && o.enable(1);
            t.instancing && o.enable(2);
            t.instancingColor && o.enable(3);
            t.matcap && o.enable(4);
            t.envMap && o.enable(5);
            t.normalMapObjectSpace && o.enable(6);
            t.normalMapTangentSpace && o.enable(7);
            t.clearcoat && o.enable(8);
            t.iridescence && o.enable(9);
            t.alphaTest && o.enable(10);
            t.vertexColors && o.enable(11);
            t.vertexAlphas && o.enable(12);
            t.vertexUvs2 && o.enable(13);
            t.vertexTangents && o.enable(14);
            e.push(o.mask), o.disableAll(), t.fog && o.enable(0);
            t.useFog && o.enable(1);
            t.flatShading && o.enable(2);
            t.logarithmicDepthBuffer && o.enable(3);
            t.skinning && o.enable(4);
            t.morphTargets && o.enable(5);
            t.morphNormals && o.enable(6);
            t.morphColors && o.enable(7);
            t.premultipliedAlpha && o.enable(8);
            t.shadowMapEnabled && o.enable(9);
            t.useLegacyLights && o.enable(10);
            t.doubleSided && o.enable(11);
            t.flipSided && o.enable(12);
            t.useDepthPacking && o.enable(13);
            t.dithering && o.enable(14);
            t.transmission && o.enable(15);
            t.sheen && o.enable(16);
            t.decodeVideoTexture && o.enable(17);
            t.opaque && o.enable(18);
            t.pointsUvs && o.enable(19);
            e.push(o.mask);
          })(r, t),
          r.push(e.outputEncoding)),
        r.push(t.customProgramCacheKey),
        r.join()
      );
    },
    getUniforms: function (e) {
      const t = m[e.type];
      let r;
      if (t) {
        const e = ShaderLib[t];
        r = UniformsUtils.clone(e.uniforms);
      } else r = e.uniforms;
      return r;
    },
    acquireProgram: function (t, r) {
      let n;
      for (let e = 0, t = c.length; e < t; e++) {
        const t = c[e];
        if (t.cacheKey === r) {
          (n = t), ++n.usedTimes;
          break;
        }
      }
      return void 0 === n && ((n = new WebGLProgram(e, r, t, a)), c.push(n)), n;
    },
    releaseProgram: function (e) {
      if (0 == --e.usedTimes) {
        const t = c.indexOf(e);
        (c[t] = c[c.length - 1]), c.pop(), e.destroy();
      }
    },
    releaseShaderCache: function (e) {
      l.remove(e);
    },
    programs: c,
    dispose: function () {
      l.dispose();
    },
  };
}
function WebGLProperties() {
  let e = new WeakMap();
  return {
    get: function (t) {
      let r = e.get(t);
      return void 0 === r && ((r = {}), e.set(t, r)), r;
    },
    remove: function (t) {
      e.delete(t);
    },
    update: function (t, r, n) {
      e.get(t)[r] = n;
    },
    dispose: function () {
      e = new WeakMap();
    },
  };
}
function painterSortStable(e, t) {
  return e.groupOrder !== t.groupOrder
    ? e.groupOrder - t.groupOrder
    : e.renderOrder !== t.renderOrder
      ? e.renderOrder - t.renderOrder
      : e.material.id !== t.material.id
        ? e.material.id - t.material.id
        : e.z !== t.z
          ? e.z - t.z
          : e.id - t.id;
}
function reversePainterSortStable(e, t) {
  return e.groupOrder !== t.groupOrder
    ? e.groupOrder - t.groupOrder
    : e.renderOrder !== t.renderOrder
      ? e.renderOrder - t.renderOrder
      : e.z !== t.z
        ? t.z - e.z
        : e.id - t.id;
}
function WebGLRenderList() {
  const e = [];
  let t = 0;
  const r = [],
    n = [],
    i = [];
  function a(r, n, i, a, s, o) {
    let l = e[t];
    return (
      void 0 === l
        ? ((l = {
            id: r.id,
            object: r,
            geometry: n,
            material: i,
            groupOrder: a,
            renderOrder: r.renderOrder,
            z: s,
            group: o,
          }),
          (e[t] = l))
        : ((l.id = r.id),
          (l.object = r),
          (l.geometry = n),
          (l.material = i),
          (l.groupOrder = a),
          (l.renderOrder = r.renderOrder),
          (l.z = s),
          (l.group = o)),
      t++,
      l
    );
  }
  return {
    opaque: r,
    transmissive: n,
    transparent: i,
    init: function () {
      (t = 0), (r.length = 0), (n.length = 0), (i.length = 0);
    },
    push: function (e, t, s, o, l, c) {
      const h = a(e, t, s, o, l, c);
      s.transmission > 0 ? n.push(h) : !0 === s.transparent ? i.push(h) : r.push(h);
    },
    unshift: function (e, t, s, o, l, c) {
      const h = a(e, t, s, o, l, c);
      s.transmission > 0 ? n.unshift(h) : !0 === s.transparent ? i.unshift(h) : r.unshift(h);
    },
    finish: function () {
      for (let r = t, n = e.length; r < n; r++) {
        const t = e[r];
        if (null === t.id) break;
        (t.id = null),
          (t.object = null),
          (t.geometry = null),
          (t.material = null),
          (t.group = null);
      }
    },
    sort: function (e, t) {
      r.length > 1 && r.sort(e || painterSortStable),
        n.length > 1 && n.sort(t || reversePainterSortStable),
        i.length > 1 && i.sort(t || reversePainterSortStable);
    },
  };
}
function WebGLRenderLists() {
  let e = new WeakMap();
  return {
    get: function (t, r) {
      const n = e.get(t);
      let i;
      return (
        void 0 === n
          ? ((i = new WebGLRenderList()), e.set(t, [i]))
          : r >= n.length
            ? ((i = new WebGLRenderList()), n.push(i))
            : (i = n[r]),
        i
      );
    },
    dispose: function () {
      e = new WeakMap();
    },
  };
}
function UniformsCache() {
  const e = {};
  return {
    get: function (t) {
      if (void 0 !== e[t.id]) return e[t.id];
      let r;
      switch (t.type) {
        case 'DirectionalLight':
          r = { direction: new Vector3(), color: new Color() };
          break;
        case 'SpotLight':
          r = {
            position: new Vector3(),
            direction: new Vector3(),
            color: new Color(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0,
          };
          break;
        case 'PointLight':
          r = { position: new Vector3(), color: new Color(), distance: 0, decay: 0 };
          break;
        case 'HemisphereLight':
          r = { direction: new Vector3(), skyColor: new Color(), groundColor: new Color() };
          break;
        case 'RectAreaLight':
          r = {
            color: new Color(),
            position: new Vector3(),
            halfWidth: new Vector3(),
            halfHeight: new Vector3(),
          };
      }
      return (e[t.id] = r), r;
    },
  };
}
function ShadowUniformsCache() {
  const e = {};
  return {
    get: function (t) {
      if (void 0 !== e[t.id]) return e[t.id];
      let r;
      switch (t.type) {
        case 'DirectionalLight':
        case 'SpotLight':
          r = { shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new Vector2() };
          break;
        case 'PointLight':
          r = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Vector2(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3,
          };
      }
      return (e[t.id] = r), r;
    },
  };
}
let nextVersion = 0;
function shadowCastingAndTexturingLightsFirst(e, t) {
  return (t.castShadow ? 2 : 0) - (e.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (e.map ? 1 : 0);
}
function WebGLLights(e, t) {
  const r = new UniformsCache(),
    n = ShadowUniformsCache(),
    i = {
      version: 0,
      hash: {
        directionalLength: -1,
        pointLength: -1,
        spotLength: -1,
        rectAreaLength: -1,
        hemiLength: -1,
        numDirectionalShadows: -1,
        numPointShadows: -1,
        numSpotShadows: -1,
        numSpotMaps: -1,
      },
      ambient: [0, 0, 0],
      probe: [],
      directional: [],
      directionalShadow: [],
      directionalShadowMap: [],
      directionalShadowMatrix: [],
      spot: [],
      spotLightMap: [],
      spotShadow: [],
      spotShadowMap: [],
      spotLightMatrix: [],
      rectArea: [],
      rectAreaLTC1: null,
      rectAreaLTC2: null,
      point: [],
      pointShadow: [],
      pointShadowMap: [],
      pointShadowMatrix: [],
      hemi: [],
      numSpotLightShadowsWithMaps: 0,
    };
  for (let e = 0; e < 9; e++) i.probe.push(new Vector3());
  const a = new Vector3(),
    s = new Matrix4(),
    o = new Matrix4();
  return {
    setup: function (a, s) {
      let o = 0,
        l = 0,
        c = 0;
      for (let e = 0; e < 9; e++) i.probe[e].set(0, 0, 0);
      let h = 0,
        u = 0,
        d = 0,
        p = 0,
        m = 0,
        f = 0,
        g = 0,
        _ = 0,
        v = 0,
        x = 0;
      a.sort(shadowCastingAndTexturingLightsFirst);
      const y = !0 === s ? Math.PI : 1;
      for (let e = 0, t = a.length; e < t; e++) {
        const t = a[e],
          s = t.color,
          M = t.intensity,
          S = t.distance,
          b = t.shadow && t.shadow.map ? t.shadow.map.texture : null;
        if (t.isAmbientLight) (o += s.r * M * y), (l += s.g * M * y), (c += s.b * M * y);
        else if (t.isLightProbe)
          for (let e = 0; e < 9; e++) i.probe[e].addScaledVector(t.sh.coefficients[e], M);
        else if (t.isDirectionalLight) {
          const e = r.get(t);
          if ((e.color.copy(t.color).multiplyScalar(t.intensity * y), t.castShadow)) {
            const e = t.shadow,
              r = n.get(t);
            (r.shadowBias = e.bias),
              (r.shadowNormalBias = e.normalBias),
              (r.shadowRadius = e.radius),
              (r.shadowMapSize = e.mapSize),
              (i.directionalShadow[h] = r),
              (i.directionalShadowMap[h] = b),
              (i.directionalShadowMatrix[h] = t.shadow.matrix),
              f++;
          }
          (i.directional[h] = e), h++;
        } else if (t.isSpotLight) {
          const e = r.get(t);
          e.position.setFromMatrixPosition(t.matrixWorld),
            e.color.copy(s).multiplyScalar(M * y),
            (e.distance = S),
            (e.coneCos = Math.cos(t.angle)),
            (e.penumbraCos = Math.cos(t.angle * (1 - t.penumbra))),
            (e.decay = t.decay),
            (i.spot[d] = e);
          const a = t.shadow;
          if (
            (t.map && ((i.spotLightMap[v] = t.map), v++, a.updateMatrices(t), t.castShadow && x++),
            (i.spotLightMatrix[d] = a.matrix),
            t.castShadow)
          ) {
            const e = n.get(t);
            (e.shadowBias = a.bias),
              (e.shadowNormalBias = a.normalBias),
              (e.shadowRadius = a.radius),
              (e.shadowMapSize = a.mapSize),
              (i.spotShadow[d] = e),
              (i.spotShadowMap[d] = b),
              _++;
          }
          d++;
        } else if (t.isRectAreaLight) {
          const e = r.get(t);
          e.color.copy(s).multiplyScalar(M),
            e.halfWidth.set(0.5 * t.width, 0, 0),
            e.halfHeight.set(0, 0.5 * t.height, 0),
            (i.rectArea[p] = e),
            p++;
        } else if (t.isPointLight) {
          const e = r.get(t);
          if (
            (e.color.copy(t.color).multiplyScalar(t.intensity * y),
            (e.distance = t.distance),
            (e.decay = t.decay),
            t.castShadow)
          ) {
            const e = t.shadow,
              r = n.get(t);
            (r.shadowBias = e.bias),
              (r.shadowNormalBias = e.normalBias),
              (r.shadowRadius = e.radius),
              (r.shadowMapSize = e.mapSize),
              (r.shadowCameraNear = e.camera.near),
              (r.shadowCameraFar = e.camera.far),
              (i.pointShadow[u] = r),
              (i.pointShadowMap[u] = b),
              (i.pointShadowMatrix[u] = t.shadow.matrix),
              g++;
          }
          (i.point[u] = e), u++;
        } else if (t.isHemisphereLight) {
          const e = r.get(t);
          e.skyColor.copy(t.color).multiplyScalar(M * y),
            e.groundColor.copy(t.groundColor).multiplyScalar(M * y),
            (i.hemi[m] = e),
            m++;
        }
      }
      p > 0 &&
        (t.isWebGL2 || !0 === e.has('OES_texture_float_linear')
          ? ((i.rectAreaLTC1 = UniformsLib.LTC_FLOAT_1), (i.rectAreaLTC2 = UniformsLib.LTC_FLOAT_2))
          : !0 === e.has('OES_texture_half_float_linear')
            ? ((i.rectAreaLTC1 = UniformsLib.LTC_HALF_1), (i.rectAreaLTC2 = UniformsLib.LTC_HALF_2))
            : console.error(
                'THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.',
              )),
        (i.ambient[0] = o),
        (i.ambient[1] = l),
        (i.ambient[2] = c);
      const M = i.hash;
      (M.directionalLength === h &&
        M.pointLength === u &&
        M.spotLength === d &&
        M.rectAreaLength === p &&
        M.hemiLength === m &&
        M.numDirectionalShadows === f &&
        M.numPointShadows === g &&
        M.numSpotShadows === _ &&
        M.numSpotMaps === v) ||
        ((i.directional.length = h),
        (i.spot.length = d),
        (i.rectArea.length = p),
        (i.point.length = u),
        (i.hemi.length = m),
        (i.directionalShadow.length = f),
        (i.directionalShadowMap.length = f),
        (i.pointShadow.length = g),
        (i.pointShadowMap.length = g),
        (i.spotShadow.length = _),
        (i.spotShadowMap.length = _),
        (i.directionalShadowMatrix.length = f),
        (i.pointShadowMatrix.length = g),
        (i.spotLightMatrix.length = _ + v - x),
        (i.spotLightMap.length = v),
        (i.numSpotLightShadowsWithMaps = x),
        (M.directionalLength = h),
        (M.pointLength = u),
        (M.spotLength = d),
        (M.rectAreaLength = p),
        (M.hemiLength = m),
        (M.numDirectionalShadows = f),
        (M.numPointShadows = g),
        (M.numSpotShadows = _),
        (M.numSpotMaps = v),
        (i.version = nextVersion++));
    },
    setupView: function (e, t) {
      let r = 0,
        n = 0,
        l = 0,
        c = 0,
        h = 0;
      const u = t.matrixWorldInverse;
      for (let t = 0, d = e.length; t < d; t++) {
        const d = e[t];
        if (d.isDirectionalLight) {
          const e = i.directional[r];
          e.direction.setFromMatrixPosition(d.matrixWorld),
            a.setFromMatrixPosition(d.target.matrixWorld),
            e.direction.sub(a),
            e.direction.transformDirection(u),
            r++;
        } else if (d.isSpotLight) {
          const e = i.spot[l];
          e.position.setFromMatrixPosition(d.matrixWorld),
            e.position.applyMatrix4(u),
            e.direction.setFromMatrixPosition(d.matrixWorld),
            a.setFromMatrixPosition(d.target.matrixWorld),
            e.direction.sub(a),
            e.direction.transformDirection(u),
            l++;
        } else if (d.isRectAreaLight) {
          const e = i.rectArea[c];
          e.position.setFromMatrixPosition(d.matrixWorld),
            e.position.applyMatrix4(u),
            o.identity(),
            s.copy(d.matrixWorld),
            s.premultiply(u),
            o.extractRotation(s),
            e.halfWidth.set(0.5 * d.width, 0, 0),
            e.halfHeight.set(0, 0.5 * d.height, 0),
            e.halfWidth.applyMatrix4(o),
            e.halfHeight.applyMatrix4(o),
            c++;
        } else if (d.isPointLight) {
          const e = i.point[n];
          e.position.setFromMatrixPosition(d.matrixWorld), e.position.applyMatrix4(u), n++;
        } else if (d.isHemisphereLight) {
          const e = i.hemi[h];
          e.direction.setFromMatrixPosition(d.matrixWorld), e.direction.transformDirection(u), h++;
        }
      }
    },
    state: i,
  };
}
function WebGLRenderState(e, t) {
  const r = new WebGLLights(e, t),
    n = [],
    i = [];
  return {
    init: function () {
      (n.length = 0), (i.length = 0);
    },
    state: { lightsArray: n, shadowsArray: i, lights: r },
    setupLights: function (e) {
      r.setup(n, e);
    },
    setupLightsView: function (e) {
      r.setupView(n, e);
    },
    pushLight: function (e) {
      n.push(e);
    },
    pushShadow: function (e) {
      i.push(e);
    },
  };
}
function WebGLRenderStates(e, t) {
  let r = new WeakMap();
  return {
    get: function (n, i = 0) {
      const a = r.get(n);
      let s;
      return (
        void 0 === a
          ? ((s = new WebGLRenderState(e, t)), r.set(n, [s]))
          : i >= a.length
            ? ((s = new WebGLRenderState(e, t)), a.push(s))
            : (s = a[i]),
        s
      );
    },
    dispose: function () {
      r = new WeakMap();
    },
  };
}
class MeshDepthMaterial extends Material {
  constructor(e) {
    super(),
      (this.isMeshDepthMaterial = !0),
      (this.type = 'MeshDepthMaterial'),
      (this.depthPacking = 3200),
      (this.map = null),
      (this.alphaMap = null),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      this.setValues(e);
  }
  copy(e) {
    return (
      super.copy(e),
      (this.depthPacking = e.depthPacking),
      (this.map = e.map),
      (this.alphaMap = e.alphaMap),
      (this.displacementMap = e.displacementMap),
      (this.displacementScale = e.displacementScale),
      (this.displacementBias = e.displacementBias),
      (this.wireframe = e.wireframe),
      (this.wireframeLinewidth = e.wireframeLinewidth),
      this
    );
  }
}
class MeshDistanceMaterial extends Material {
  constructor(e) {
    super(),
      (this.isMeshDistanceMaterial = !0),
      (this.type = 'MeshDistanceMaterial'),
      (this.map = null),
      (this.alphaMap = null),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      this.setValues(e);
  }
  copy(e) {
    return (
      super.copy(e),
      (this.map = e.map),
      (this.alphaMap = e.alphaMap),
      (this.displacementMap = e.displacementMap),
      (this.displacementScale = e.displacementScale),
      (this.displacementBias = e.displacementBias),
      this
    );
  }
}
const vertex = 'void main() {\n\tgl_Position = vec4( position, 1.0 );\n}',
  fragment =
    'uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\n#include <packing>\nvoid main() {\n\tconst float samples = float( VSM_SAMPLES );\n\tfloat mean = 0.0;\n\tfloat squared_mean = 0.0;\n\tfloat uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );\n\tfloat uvStart = samples <= 1.0 ? 0.0 : - 1.0;\n\tfor ( float i = 0.0; i < samples; i ++ ) {\n\t\tfloat uvOffset = uvStart + i * uvStride;\n\t\t#ifdef HORIZONTAL_PASS\n\t\t\tvec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );\n\t\t\tmean += distribution.x;\n\t\t\tsquared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n\t\t#else\n\t\t\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );\n\t\t\tmean += depth;\n\t\t\tsquared_mean += depth * depth;\n\t\t#endif\n\t}\n\tmean = mean / samples;\n\tsquared_mean = squared_mean / samples;\n\tfloat std_dev = sqrt( squared_mean - mean * mean );\n\tgl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );\n}';
function WebGLShadowMap(e, t, r) {
  let n = new Frustum();
  const i = new Vector2(),
    a = new Vector2(),
    s = new Vector4(),
    o = new MeshDepthMaterial({ depthPacking: 3201 }),
    l = new MeshDistanceMaterial(),
    c = {},
    h = r.maxTextureSize,
    u = { 0: 1, 1: 0, 2: 2 },
    d = new ShaderMaterial({
      defines: { VSM_SAMPLES: 8 },
      uniforms: {
        shadow_pass: { value: null },
        resolution: { value: new Vector2() },
        radius: { value: 4 },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    }),
    p = d.clone();
  p.defines.HORIZONTAL_PASS = 1;
  const m = new BufferGeometry();
  m.setAttribute(
    'position',
    new BufferAttribute(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3),
  );
  const f = new Mesh(m, d),
    g = this;
  function _(r, n) {
    const a = t.update(f);
    d.defines.VSM_SAMPLES !== r.blurSamples &&
      ((d.defines.VSM_SAMPLES = r.blurSamples),
      (p.defines.VSM_SAMPLES = r.blurSamples),
      (d.needsUpdate = !0),
      (p.needsUpdate = !0)),
      null === r.mapPass && (r.mapPass = new WebGLRenderTarget(i.x, i.y)),
      (d.uniforms.shadow_pass.value = r.map.texture),
      (d.uniforms.resolution.value = r.mapSize),
      (d.uniforms.radius.value = r.radius),
      e.setRenderTarget(r.mapPass),
      e.clear(),
      e.renderBufferDirect(n, null, a, d, f, null),
      (p.uniforms.shadow_pass.value = r.mapPass.texture),
      (p.uniforms.resolution.value = r.mapSize),
      (p.uniforms.radius.value = r.radius),
      e.setRenderTarget(r.map),
      e.clear(),
      e.renderBufferDirect(n, null, a, p, f, null);
  }
  function v(t, r, n, i) {
    let a = null;
    const s = !0 === n.isPointLight ? t.customDistanceMaterial : t.customDepthMaterial;
    if (void 0 !== s) a = s;
    else if (
      ((a = !0 === n.isPointLight ? l : o),
      (e.localClippingEnabled &&
        !0 === r.clipShadows &&
        Array.isArray(r.clippingPlanes) &&
        0 !== r.clippingPlanes.length) ||
        (r.displacementMap && 0 !== r.displacementScale) ||
        (r.alphaMap && r.alphaTest > 0) ||
        (r.map && r.alphaTest > 0))
    ) {
      const e = a.uuid,
        t = r.uuid;
      let n = c[e];
      void 0 === n && ((n = {}), (c[e] = n));
      let i = n[t];
      void 0 === i && ((i = a.clone()), (n[t] = i)), (a = i);
    }
    if (
      ((a.visible = r.visible),
      (a.wireframe = r.wireframe),
      (a.side =
        3 === i
          ? null !== r.shadowSide
            ? r.shadowSide
            : r.side
          : null !== r.shadowSide
            ? r.shadowSide
            : u[r.side]),
      (a.alphaMap = r.alphaMap),
      (a.alphaTest = r.alphaTest),
      (a.map = r.map),
      (a.clipShadows = r.clipShadows),
      (a.clippingPlanes = r.clippingPlanes),
      (a.clipIntersection = r.clipIntersection),
      (a.displacementMap = r.displacementMap),
      (a.displacementScale = r.displacementScale),
      (a.displacementBias = r.displacementBias),
      (a.wireframeLinewidth = r.wireframeLinewidth),
      (a.linewidth = r.linewidth),
      !0 === n.isPointLight && !0 === a.isMeshDistanceMaterial)
    ) {
      e.properties.get(a).light = n;
    }
    return a;
  }
  function x(r, i, a, s, o) {
    if (!1 === r.visible) return;
    if (
      r.layers.test(i.layers) &&
      (r.isMesh || r.isLine || r.isPoints) &&
      (r.castShadow || (r.receiveShadow && 3 === o)) &&
      (!r.frustumCulled || n.intersectsObject(r))
    ) {
      r.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse, r.matrixWorld);
      const n = t.update(r),
        i = r.material;
      if (Array.isArray(i)) {
        const t = n.groups;
        for (let l = 0, c = t.length; l < c; l++) {
          const c = t[l],
            h = i[c.materialIndex];
          if (h && h.visible) {
            const t = v(r, h, s, o);
            e.renderBufferDirect(a, null, n, t, r, c);
          }
        }
      } else if (i.visible) {
        const t = v(r, i, s, o);
        e.renderBufferDirect(a, null, n, t, r, null);
      }
    }
    const l = r.children;
    for (let e = 0, t = l.length; e < t; e++) x(l[e], i, a, s, o);
  }
  (this.enabled = !1),
    (this.autoUpdate = !0),
    (this.needsUpdate = !1),
    (this.type = 1),
    (this.render = function (t, r, o) {
      if (!1 === g.enabled) return;
      if (!1 === g.autoUpdate && !1 === g.needsUpdate) return;
      if (0 === t.length) return;
      const l = e.getRenderTarget(),
        c = e.getActiveCubeFace(),
        u = e.getActiveMipmapLevel(),
        d = e.state;
      d.setBlending(0),
        d.buffers.color.setClear(1, 1, 1, 1),
        d.buffers.depth.setTest(!0),
        d.setScissorTest(!1);
      for (let l = 0, c = t.length; l < c; l++) {
        const c = t[l],
          u = c.shadow;
        if (void 0 === u) {
          console.warn('THREE.WebGLShadowMap:', c, 'has no shadow.');
          continue;
        }
        if (!1 === u.autoUpdate && !1 === u.needsUpdate) continue;
        i.copy(u.mapSize);
        const p = u.getFrameExtents();
        if (
          (i.multiply(p),
          a.copy(u.mapSize),
          (i.x > h || i.y > h) &&
            (i.x > h && ((a.x = Math.floor(h / p.x)), (i.x = a.x * p.x), (u.mapSize.x = a.x)),
            i.y > h && ((a.y = Math.floor(h / p.y)), (i.y = a.y * p.y), (u.mapSize.y = a.y))),
          null === u.map)
        ) {
          const e = 3 !== this.type ? { minFilter: 1003, magFilter: 1003 } : {};
          (u.map = new WebGLRenderTarget(i.x, i.y, e)),
            (u.map.texture.name = c.name + '.shadowMap'),
            u.camera.updateProjectionMatrix();
        }
        e.setRenderTarget(u.map), e.clear();
        const m = u.getViewportCount();
        for (let e = 0; e < m; e++) {
          const t = u.getViewport(e);
          s.set(a.x * t.x, a.y * t.y, a.x * t.z, a.y * t.w),
            d.viewport(s),
            u.updateMatrices(c, e),
            (n = u.getFrustum()),
            x(r, o, u.camera, c, this.type);
        }
        !0 !== u.isPointLightShadow && 3 === this.type && _(u, o), (u.needsUpdate = !1);
      }
      (g.needsUpdate = !1), e.setRenderTarget(l, c, u);
    });
}
function WebGLState(e, t, r) {
  const n = r.isWebGL2;
  const i = new (function () {
      let t = !1;
      const r = new Vector4();
      let n = null;
      const i = new Vector4(0, 0, 0, 0);
      return {
        setMask: function (r) {
          n === r || t || (e.colorMask(r, r, r, r), (n = r));
        },
        setLocked: function (e) {
          t = e;
        },
        setClear: function (t, n, a, s, o) {
          !0 === o && ((t *= s), (n *= s), (a *= s)),
            r.set(t, n, a, s),
            !1 === i.equals(r) && (e.clearColor(t, n, a, s), i.copy(r));
        },
        reset: function () {
          (t = !1), (n = null), i.set(-1, 0, 0, 0);
        },
      };
    })(),
    a = new (function () {
      let t = !1,
        r = null,
        n = null,
        i = null;
      return {
        setTest: function (t) {
          t ? G(e.DEPTH_TEST) : z(e.DEPTH_TEST);
        },
        setMask: function (n) {
          r === n || t || (e.depthMask(n), (r = n));
        },
        setFunc: function (t) {
          if (n !== t) {
            switch (t) {
              case 0:
                e.depthFunc(e.NEVER);
                break;
              case 1:
                e.depthFunc(e.ALWAYS);
                break;
              case 2:
                e.depthFunc(e.LESS);
                break;
              case 3:
                e.depthFunc(e.LEQUAL);
                break;
              case 4:
                e.depthFunc(e.EQUAL);
                break;
              case 5:
                e.depthFunc(e.GEQUAL);
                break;
              case 6:
                e.depthFunc(e.GREATER);
                break;
              case 7:
                e.depthFunc(e.NOTEQUAL);
                break;
              default:
                e.depthFunc(e.LEQUAL);
            }
            n = t;
          }
        },
        setLocked: function (e) {
          t = e;
        },
        setClear: function (t) {
          i !== t && (e.clearDepth(t), (i = t));
        },
        reset: function () {
          (t = !1), (r = null), (n = null), (i = null);
        },
      };
    })(),
    s = new (function () {
      let t = !1,
        r = null,
        n = null,
        i = null,
        a = null,
        s = null,
        o = null,
        l = null,
        c = null;
      return {
        setTest: function (r) {
          t || (r ? G(e.STENCIL_TEST) : z(e.STENCIL_TEST));
        },
        setMask: function (n) {
          r === n || t || (e.stencilMask(n), (r = n));
        },
        setFunc: function (t, r, s) {
          (n === t && i === r && a === s) || (e.stencilFunc(t, r, s), (n = t), (i = r), (a = s));
        },
        setOp: function (t, r, n) {
          (s === t && o === r && l === n) || (e.stencilOp(t, r, n), (s = t), (o = r), (l = n));
        },
        setLocked: function (e) {
          t = e;
        },
        setClear: function (t) {
          c !== t && (e.clearStencil(t), (c = t));
        },
        reset: function () {
          (t = !1),
            (r = null),
            (n = null),
            (i = null),
            (a = null),
            (s = null),
            (o = null),
            (l = null),
            (c = null);
        },
      };
    })(),
    o = new WeakMap(),
    l = new WeakMap();
  let c = {},
    h = {},
    u = new WeakMap(),
    d = [],
    p = null,
    m = !1,
    f = null,
    g = null,
    _ = null,
    v = null,
    x = null,
    y = null,
    M = null,
    S = !1,
    b = null,
    T = null,
    E = null,
    A = null,
    w = null;
  const C = e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let R = !1,
    L = 0;
  const P = e.getParameter(e.VERSION);
  -1 !== P.indexOf('WebGL')
    ? ((L = parseFloat(/^WebGL (\d)/.exec(P)[1])), (R = L >= 1))
    : -1 !== P.indexOf('OpenGL ES') &&
      ((L = parseFloat(/^OpenGL ES (\d)/.exec(P)[1])), (R = L >= 2));
  let I = null,
    U = {};
  const D = e.getParameter(e.SCISSOR_BOX),
    B = e.getParameter(e.VIEWPORT),
    N = new Vector4().fromArray(D),
    O = new Vector4().fromArray(B);
  function F(t, r, n) {
    const i = new Uint8Array(4),
      a = e.createTexture();
    e.bindTexture(t, a),
      e.texParameteri(t, e.TEXTURE_MIN_FILTER, e.NEAREST),
      e.texParameteri(t, e.TEXTURE_MAG_FILTER, e.NEAREST);
    for (let t = 0; t < n; t++) e.texImage2D(r + t, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, i);
    return a;
  }
  const V = {};
  function G(t) {
    !0 !== c[t] && (e.enable(t), (c[t] = !0));
  }
  function z(t) {
    !1 !== c[t] && (e.disable(t), (c[t] = !1));
  }
  (V[e.TEXTURE_2D] = F(e.TEXTURE_2D, e.TEXTURE_2D, 1)),
    (V[e.TEXTURE_CUBE_MAP] = F(e.TEXTURE_CUBE_MAP, e.TEXTURE_CUBE_MAP_POSITIVE_X, 6)),
    i.setClear(0, 0, 0, 1),
    a.setClear(1),
    s.setClear(0),
    G(e.DEPTH_TEST),
    a.setFunc(3),
    X(!1),
    $(1),
    G(e.CULL_FACE),
    W(0);
  const k = { 100: e.FUNC_ADD, 101: e.FUNC_SUBTRACT, 102: e.FUNC_REVERSE_SUBTRACT };
  if (n) (k[103] = e.MIN), (k[104] = e.MAX);
  else {
    const e = t.get('EXT_blend_minmax');
    null !== e && ((k[103] = e.MIN_EXT), (k[104] = e.MAX_EXT));
  }
  const H = {
    200: e.ZERO,
    201: e.ONE,
    202: e.SRC_COLOR,
    204: e.SRC_ALPHA,
    210: e.SRC_ALPHA_SATURATE,
    208: e.DST_COLOR,
    206: e.DST_ALPHA,
    203: e.ONE_MINUS_SRC_COLOR,
    205: e.ONE_MINUS_SRC_ALPHA,
    209: e.ONE_MINUS_DST_COLOR,
    207: e.ONE_MINUS_DST_ALPHA,
  };
  function W(t, r, n, i, a, s, o, l) {
    if (0 !== t) {
      if ((!1 === m && (G(e.BLEND), (m = !0)), 5 === t))
        (a = a || r),
          (s = s || n),
          (o = o || i),
          (r === g && a === x) || (e.blendEquationSeparate(k[r], k[a]), (g = r), (x = a)),
          (n === _ && i === v && s === y && o === M) ||
            (e.blendFuncSeparate(H[n], H[i], H[s], H[o]), (_ = n), (v = i), (y = s), (M = o)),
          (f = t),
          (S = !1);
      else if (t !== f || l !== S) {
        if (((100 === g && 100 === x) || (e.blendEquation(e.FUNC_ADD), (g = 100), (x = 100)), l))
          switch (t) {
            case 1:
              e.blendFuncSeparate(e.ONE, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
              break;
            case 2:
              e.blendFunc(e.ONE, e.ONE);
              break;
            case 3:
              e.blendFuncSeparate(e.ZERO, e.ONE_MINUS_SRC_COLOR, e.ZERO, e.ONE);
              break;
            case 4:
              e.blendFuncSeparate(e.ZERO, e.SRC_COLOR, e.ZERO, e.SRC_ALPHA);
              break;
            default:
              console.error('THREE.WebGLState: Invalid blending: ', t);
          }
        else
          switch (t) {
            case 1:
              e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
              break;
            case 2:
              e.blendFunc(e.SRC_ALPHA, e.ONE);
              break;
            case 3:
              e.blendFuncSeparate(e.ZERO, e.ONE_MINUS_SRC_COLOR, e.ZERO, e.ONE);
              break;
            case 4:
              e.blendFunc(e.ZERO, e.SRC_COLOR);
              break;
            default:
              console.error('THREE.WebGLState: Invalid blending: ', t);
          }
        (_ = null), (v = null), (y = null), (M = null), (f = t), (S = l);
      }
    } else !0 === m && (z(e.BLEND), (m = !1));
  }
  function X(t) {
    b !== t && (t ? e.frontFace(e.CW) : e.frontFace(e.CCW), (b = t));
  }
  function $(t) {
    0 !== t
      ? (G(e.CULL_FACE),
        t !== T &&
          (1 === t
            ? e.cullFace(e.BACK)
            : 2 === t
              ? e.cullFace(e.FRONT)
              : e.cullFace(e.FRONT_AND_BACK)))
      : z(e.CULL_FACE),
      (T = t);
  }
  function j(t, r, n) {
    t
      ? (G(e.POLYGON_OFFSET_FILL),
        (A === r && w === n) || (e.polygonOffset(r, n), (A = r), (w = n)))
      : z(e.POLYGON_OFFSET_FILL);
  }
  return {
    buffers: { color: i, depth: a, stencil: s },
    enable: G,
    disable: z,
    bindFramebuffer: function (t, r) {
      return (
        h[t] !== r &&
        (e.bindFramebuffer(t, r),
        (h[t] = r),
        n &&
          (t === e.DRAW_FRAMEBUFFER && (h[e.FRAMEBUFFER] = r),
          t === e.FRAMEBUFFER && (h[e.DRAW_FRAMEBUFFER] = r)),
        !0)
      );
    },
    drawBuffers: function (n, i) {
      let a = d,
        s = !1;
      if (n)
        if (
          ((a = u.get(i)), void 0 === a && ((a = []), u.set(i, a)), n.isWebGLMultipleRenderTargets)
        ) {
          const t = n.texture;
          if (a.length !== t.length || a[0] !== e.COLOR_ATTACHMENT0) {
            for (let r = 0, n = t.length; r < n; r++) a[r] = e.COLOR_ATTACHMENT0 + r;
            (a.length = t.length), (s = !0);
          }
        } else a[0] !== e.COLOR_ATTACHMENT0 && ((a[0] = e.COLOR_ATTACHMENT0), (s = !0));
      else a[0] !== e.BACK && ((a[0] = e.BACK), (s = !0));
      s && (r.isWebGL2 ? e.drawBuffers(a) : t.get('WEBGL_draw_buffers').drawBuffersWEBGL(a));
    },
    useProgram: function (t) {
      return p !== t && (e.useProgram(t), (p = t), !0);
    },
    setBlending: W,
    setMaterial: function (t, r) {
      2 === t.side ? z(e.CULL_FACE) : G(e.CULL_FACE);
      let n = 1 === t.side;
      r && (n = !n),
        X(n),
        1 === t.blending && !1 === t.transparent
          ? W(0)
          : W(
              t.blending,
              t.blendEquation,
              t.blendSrc,
              t.blendDst,
              t.blendEquationAlpha,
              t.blendSrcAlpha,
              t.blendDstAlpha,
              t.premultipliedAlpha,
            ),
        a.setFunc(t.depthFunc),
        a.setTest(t.depthTest),
        a.setMask(t.depthWrite),
        i.setMask(t.colorWrite);
      const o = t.stencilWrite;
      s.setTest(o),
        o &&
          (s.setMask(t.stencilWriteMask),
          s.setFunc(t.stencilFunc, t.stencilRef, t.stencilFuncMask),
          s.setOp(t.stencilFail, t.stencilZFail, t.stencilZPass)),
        j(t.polygonOffset, t.polygonOffsetFactor, t.polygonOffsetUnits),
        !0 === t.alphaToCoverage ? G(e.SAMPLE_ALPHA_TO_COVERAGE) : z(e.SAMPLE_ALPHA_TO_COVERAGE);
    },
    setFlipSided: X,
    setCullFace: $,
    setLineWidth: function (t) {
      t !== E && (R && e.lineWidth(t), (E = t));
    },
    setPolygonOffset: j,
    setScissorTest: function (t) {
      t ? G(e.SCISSOR_TEST) : z(e.SCISSOR_TEST);
    },
    activeTexture: function (t) {
      void 0 === t && (t = e.TEXTURE0 + C - 1), I !== t && (e.activeTexture(t), (I = t));
    },
    bindTexture: function (t, r, n) {
      void 0 === n && (n = null === I ? e.TEXTURE0 + C - 1 : I);
      let i = U[n];
      void 0 === i && ((i = { type: void 0, texture: void 0 }), (U[n] = i)),
        (i.type === t && i.texture === r) ||
          (I !== n && (e.activeTexture(n), (I = n)),
          e.bindTexture(t, r || V[t]),
          (i.type = t),
          (i.texture = r));
    },
    unbindTexture: function () {
      const t = U[I];
      void 0 !== t &&
        void 0 !== t.type &&
        (e.bindTexture(t.type, null), (t.type = void 0), (t.texture = void 0));
    },
    compressedTexImage2D: function () {
      try {
        e.compressedTexImage2D.apply(e, arguments);
      } catch (e) {
        console.error('THREE.WebGLState:', e);
      }
    },
    compressedTexImage3D: function () {
      try {
        e.compressedTexImage3D.apply(e, arguments);
      } catch (e) {
        console.error('THREE.WebGLState:', e);
      }
    },
    texImage2D: function () {
      try {
        e.texImage2D.apply(e, arguments);
      } catch (e) {
        console.error('THREE.WebGLState:', e);
      }
    },
    texImage3D: function () {
      try {
        e.texImage3D.apply(e, arguments);
      } catch (e) {
        console.error('THREE.WebGLState:', e);
      }
    },
    updateUBOMapping: function (t, r) {
      let n = l.get(r);
      void 0 === n && ((n = new WeakMap()), l.set(r, n));
      let i = n.get(t);
      void 0 === i && ((i = e.getUniformBlockIndex(r, t.name)), n.set(t, i));
    },
    uniformBlockBinding: function (t, r) {
      const n = l.get(r).get(t);
      o.get(r) !== n && (e.uniformBlockBinding(r, n, t.__bindingPointIndex), o.set(r, n));
    },
    texStorage2D: function () {
      try {
        e.texStorage2D.apply(e, arguments);
      } catch (e) {
        console.error('THREE.WebGLState:', e);
      }
    },
    texStorage3D: function () {
      try {
        e.texStorage3D.apply(e, arguments);
      } catch (e) {
        console.error('THREE.WebGLState:', e);
      }
    },
    texSubImage2D: function () {
      try {
        e.texSubImage2D.apply(e, arguments);
      } catch (e) {
        console.error('THREE.WebGLState:', e);
      }
    },
    texSubImage3D: function () {
      try {
        e.texSubImage3D.apply(e, arguments);
      } catch (e) {
        console.error('THREE.WebGLState:', e);
      }
    },
    compressedTexSubImage2D: function () {
      try {
        e.compressedTexSubImage2D.apply(e, arguments);
      } catch (e) {
        console.error('THREE.WebGLState:', e);
      }
    },
    compressedTexSubImage3D: function () {
      try {
        e.compressedTexSubImage3D.apply(e, arguments);
      } catch (e) {
        console.error('THREE.WebGLState:', e);
      }
    },
    scissor: function (t) {
      !1 === N.equals(t) && (e.scissor(t.x, t.y, t.z, t.w), N.copy(t));
    },
    viewport: function (t) {
      !1 === O.equals(t) && (e.viewport(t.x, t.y, t.z, t.w), O.copy(t));
    },
    reset: function () {
      e.disable(e.BLEND),
        e.disable(e.CULL_FACE),
        e.disable(e.DEPTH_TEST),
        e.disable(e.POLYGON_OFFSET_FILL),
        e.disable(e.SCISSOR_TEST),
        e.disable(e.STENCIL_TEST),
        e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),
        e.blendEquation(e.FUNC_ADD),
        e.blendFunc(e.ONE, e.ZERO),
        e.blendFuncSeparate(e.ONE, e.ZERO, e.ONE, e.ZERO),
        e.colorMask(!0, !0, !0, !0),
        e.clearColor(0, 0, 0, 0),
        e.depthMask(!0),
        e.depthFunc(e.LESS),
        e.clearDepth(1),
        e.stencilMask(4294967295),
        e.stencilFunc(e.ALWAYS, 0, 4294967295),
        e.stencilOp(e.KEEP, e.KEEP, e.KEEP),
        e.clearStencil(0),
        e.cullFace(e.BACK),
        e.frontFace(e.CCW),
        e.polygonOffset(0, 0),
        e.activeTexture(e.TEXTURE0),
        e.bindFramebuffer(e.FRAMEBUFFER, null),
        !0 === n &&
          (e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null),
          e.bindFramebuffer(e.READ_FRAMEBUFFER, null)),
        e.useProgram(null),
        e.lineWidth(1),
        e.scissor(0, 0, e.canvas.width, e.canvas.height),
        e.viewport(0, 0, e.canvas.width, e.canvas.height),
        (c = {}),
        (I = null),
        (U = {}),
        (h = {}),
        (u = new WeakMap()),
        (d = []),
        (p = null),
        (m = !1),
        (f = null),
        (g = null),
        (_ = null),
        (v = null),
        (x = null),
        (y = null),
        (M = null),
        (S = !1),
        (b = null),
        (T = null),
        (E = null),
        (A = null),
        (w = null),
        N.set(0, 0, e.canvas.width, e.canvas.height),
        O.set(0, 0, e.canvas.width, e.canvas.height),
        i.reset(),
        a.reset(),
        s.reset();
    },
  };
}
function WebGLTextures(e, t, r, n, i, a, s) {
  const o = i.isWebGL2,
    l = i.maxTextures,
    c = i.maxCubemapSize,
    h = i.maxTextureSize,
    u = i.maxSamples,
    d = t.has('WEBGL_multisampled_render_to_texture')
      ? t.get('WEBGL_multisampled_render_to_texture')
      : null,
    p = 'undefined' != typeof navigator && /OculusBrowser/g.test(navigator.userAgent),
    m = new WeakMap();
  let f;
  const g = new WeakMap();
  let _ = !1;
  try {
    _ =
      'undefined' != typeof OffscreenCanvas && null !== new OffscreenCanvas(1, 1).getContext('2d');
  } catch (e) {}
  function v(e, t) {
    return _ ? new OffscreenCanvas(e, t) : createElementNS('canvas');
  }
  function x(e, t, r, n) {
    let i = 1;
    if (
      ((e.width > n || e.height > n) && (i = n / Math.max(e.width, e.height)), i < 1 || !0 === t)
    ) {
      if (
        ('undefined' != typeof HTMLImageElement && e instanceof HTMLImageElement) ||
        ('undefined' != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement) ||
        ('undefined' != typeof ImageBitmap && e instanceof ImageBitmap)
      ) {
        const n = t ? floorPowerOfTwo : Math.floor,
          a = n(i * e.width),
          s = n(i * e.height);
        void 0 === f && (f = v(a, s));
        const o = r ? v(a, s) : f;
        (o.width = a), (o.height = s);
        return (
          o.getContext('2d').drawImage(e, 0, 0, a, s),
          console.warn(
            'THREE.WebGLRenderer: Texture has been resized from (' +
              e.width +
              'x' +
              e.height +
              ') to (' +
              a +
              'x' +
              s +
              ').',
          ),
          o
        );
      }
      return (
        'data' in e &&
          console.warn(
            'THREE.WebGLRenderer: Image in DataTexture is too big (' +
              e.width +
              'x' +
              e.height +
              ').',
          ),
        e
      );
    }
    return e;
  }
  function y(e) {
    return isPowerOfTwo(e.width) && isPowerOfTwo(e.height);
  }
  function M(e, t) {
    return e.generateMipmaps && t && 1003 !== e.minFilter && 1006 !== e.minFilter;
  }
  function S(t) {
    e.generateMipmap(t);
  }
  function b(r, n, i, a, s = !1) {
    if (!1 === o) return n;
    if (null !== r) {
      if (void 0 !== e[r]) return e[r];
      console.warn(
        "THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + r + "'",
      );
    }
    let l = n;
    return (
      n === e.RED &&
        (i === e.FLOAT && (l = e.R32F),
        i === e.HALF_FLOAT && (l = e.R16F),
        i === e.UNSIGNED_BYTE && (l = e.R8)),
      n === e.RG &&
        (i === e.FLOAT && (l = e.RG32F),
        i === e.HALF_FLOAT && (l = e.RG16F),
        i === e.UNSIGNED_BYTE && (l = e.RG8)),
      n === e.RGBA &&
        (i === e.FLOAT && (l = e.RGBA32F),
        i === e.HALF_FLOAT && (l = e.RGBA16F),
        i === e.UNSIGNED_BYTE && (l = 3001 === a && !1 === s ? e.SRGB8_ALPHA8 : e.RGBA8),
        i === e.UNSIGNED_SHORT_4_4_4_4 && (l = e.RGBA4),
        i === e.UNSIGNED_SHORT_5_5_5_1 && (l = e.RGB5_A1)),
      (l !== e.R16F &&
        l !== e.R32F &&
        l !== e.RG16F &&
        l !== e.RG32F &&
        l !== e.RGBA16F &&
        l !== e.RGBA32F) ||
        t.get('EXT_color_buffer_float'),
      l
    );
  }
  function T(e, t, r) {
    return !0 === M(e, r) ||
      (e.isFramebufferTexture && 1003 !== e.minFilter && 1006 !== e.minFilter)
      ? Math.log2(Math.max(t.width, t.height)) + 1
      : void 0 !== e.mipmaps && e.mipmaps.length > 0
        ? e.mipmaps.length
        : e.isCompressedTexture && Array.isArray(e.image)
          ? t.mipmaps.length
          : 1;
  }
  function E(t) {
    return 1003 === t || 1004 === t || 1005 === t ? e.NEAREST : e.LINEAR;
  }
  function A(e) {
    const t = e.target;
    t.removeEventListener('dispose', A),
      (function (e) {
        const t = n.get(e);
        if (void 0 === t.__webglInit) return;
        const r = e.source,
          i = g.get(r);
        if (i) {
          const n = i[t.__cacheKey];
          n.usedTimes--, 0 === n.usedTimes && C(e), 0 === Object.keys(i).length && g.delete(r);
        }
        n.remove(e);
      })(t),
      t.isVideoTexture && m.delete(t);
  }
  function w(t) {
    const r = t.target;
    r.removeEventListener('dispose', w),
      (function (t) {
        const r = t.texture,
          i = n.get(t),
          a = n.get(r);
        void 0 !== a.__webglTexture && (e.deleteTexture(a.__webglTexture), s.memory.textures--);
        t.depthTexture && t.depthTexture.dispose();
        if (t.isWebGLCubeRenderTarget)
          for (let t = 0; t < 6; t++)
            e.deleteFramebuffer(i.__webglFramebuffer[t]),
              i.__webglDepthbuffer && e.deleteRenderbuffer(i.__webglDepthbuffer[t]);
        else {
          if (
            (e.deleteFramebuffer(i.__webglFramebuffer),
            i.__webglDepthbuffer && e.deleteRenderbuffer(i.__webglDepthbuffer),
            i.__webglMultisampledFramebuffer &&
              e.deleteFramebuffer(i.__webglMultisampledFramebuffer),
            i.__webglColorRenderbuffer)
          )
            for (let t = 0; t < i.__webglColorRenderbuffer.length; t++)
              i.__webglColorRenderbuffer[t] && e.deleteRenderbuffer(i.__webglColorRenderbuffer[t]);
          i.__webglDepthRenderbuffer && e.deleteRenderbuffer(i.__webglDepthRenderbuffer);
        }
        if (t.isWebGLMultipleRenderTargets)
          for (let t = 0, i = r.length; t < i; t++) {
            const i = n.get(r[t]);
            i.__webglTexture && (e.deleteTexture(i.__webglTexture), s.memory.textures--),
              n.remove(r[t]);
          }
        n.remove(r), n.remove(t);
      })(r);
  }
  function C(t) {
    const r = n.get(t);
    e.deleteTexture(r.__webglTexture);
    const i = t.source;
    delete g.get(i)[r.__cacheKey], s.memory.textures--;
  }
  let R = 0;
  function L(t, i) {
    const a = n.get(t);
    if (
      (t.isVideoTexture &&
        (function (e) {
          const t = s.render.frame;
          m.get(e) !== t && (m.set(e, t), e.update());
        })(t),
      !1 === t.isRenderTargetTexture && t.version > 0 && a.__version !== t.version)
    ) {
      const e = t.image;
      if (null === e)
        console.warn('THREE.WebGLRenderer: Texture marked for update but no image data found.');
      else {
        if (!1 !== e.complete) return void B(a, t, i);
        console.warn('THREE.WebGLRenderer: Texture marked for update but image is incomplete');
      }
    }
    r.bindTexture(e.TEXTURE_2D, a.__webglTexture, e.TEXTURE0 + i);
  }
  const P = { 1e3: e.REPEAT, 1001: e.CLAMP_TO_EDGE, 1002: e.MIRRORED_REPEAT },
    I = {
      1003: e.NEAREST,
      1004: e.NEAREST_MIPMAP_NEAREST,
      1005: e.NEAREST_MIPMAP_LINEAR,
      1006: e.LINEAR,
      1007: e.LINEAR_MIPMAP_NEAREST,
      1008: e.LINEAR_MIPMAP_LINEAR,
    };
  function U(r, a, s) {
    if (
      (s
        ? (e.texParameteri(r, e.TEXTURE_WRAP_S, P[a.wrapS]),
          e.texParameteri(r, e.TEXTURE_WRAP_T, P[a.wrapT]),
          (r !== e.TEXTURE_3D && r !== e.TEXTURE_2D_ARRAY) ||
            e.texParameteri(r, e.TEXTURE_WRAP_R, P[a.wrapR]),
          e.texParameteri(r, e.TEXTURE_MAG_FILTER, I[a.magFilter]),
          e.texParameteri(r, e.TEXTURE_MIN_FILTER, I[a.minFilter]))
        : (e.texParameteri(r, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
          e.texParameteri(r, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
          (r !== e.TEXTURE_3D && r !== e.TEXTURE_2D_ARRAY) ||
            e.texParameteri(r, e.TEXTURE_WRAP_R, e.CLAMP_TO_EDGE),
          (1001 === a.wrapS && 1001 === a.wrapT) ||
            console.warn(
              'THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.',
            ),
          e.texParameteri(r, e.TEXTURE_MAG_FILTER, E(a.magFilter)),
          e.texParameteri(r, e.TEXTURE_MIN_FILTER, E(a.minFilter)),
          1003 !== a.minFilter &&
            1006 !== a.minFilter &&
            console.warn(
              'THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.',
            )),
      !0 === t.has('EXT_texture_filter_anisotropic'))
    ) {
      const s = t.get('EXT_texture_filter_anisotropic');
      if (1003 === a.magFilter) return;
      if (1005 !== a.minFilter && 1008 !== a.minFilter) return;
      if (1015 === a.type && !1 === t.has('OES_texture_float_linear')) return;
      if (!1 === o && 1016 === a.type && !1 === t.has('OES_texture_half_float_linear')) return;
      (a.anisotropy > 1 || n.get(a).__currentAnisotropy) &&
        (e.texParameterf(
          r,
          s.TEXTURE_MAX_ANISOTROPY_EXT,
          Math.min(a.anisotropy, i.getMaxAnisotropy()),
        ),
        (n.get(a).__currentAnisotropy = a.anisotropy));
    }
  }
  function D(t, r) {
    let n = !1;
    void 0 === t.__webglInit && ((t.__webglInit = !0), r.addEventListener('dispose', A));
    const i = r.source;
    let a = g.get(i);
    void 0 === a && ((a = {}), g.set(i, a));
    const o = (function (e) {
      const t = [];
      return (
        t.push(e.wrapS),
        t.push(e.wrapT),
        t.push(e.wrapR || 0),
        t.push(e.magFilter),
        t.push(e.minFilter),
        t.push(e.anisotropy),
        t.push(e.internalFormat),
        t.push(e.format),
        t.push(e.type),
        t.push(e.generateMipmaps),
        t.push(e.premultiplyAlpha),
        t.push(e.flipY),
        t.push(e.unpackAlignment),
        t.push(e.encoding),
        t.join()
      );
    })(r);
    if (o !== t.__cacheKey) {
      void 0 === a[o] &&
        ((a[o] = { texture: e.createTexture(), usedTimes: 0 }), s.memory.textures++, (n = !0)),
        a[o].usedTimes++;
      const i = a[t.__cacheKey];
      void 0 !== i && (a[t.__cacheKey].usedTimes--, 0 === i.usedTimes && C(r)),
        (t.__cacheKey = o),
        (t.__webglTexture = a[o].texture);
    }
    return n;
  }
  function B(t, i, s) {
    let l = e.TEXTURE_2D;
    (i.isDataArrayTexture || i.isCompressedArrayTexture) && (l = e.TEXTURE_2D_ARRAY),
      i.isData3DTexture && (l = e.TEXTURE_3D);
    const c = D(t, i),
      u = i.source;
    r.bindTexture(l, t.__webglTexture, e.TEXTURE0 + s);
    const d = n.get(u);
    if (u.version !== d.__version || !0 === c) {
      r.activeTexture(e.TEXTURE0 + s),
        e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, i.flipY),
        e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, i.premultiplyAlpha),
        e.pixelStorei(e.UNPACK_ALIGNMENT, i.unpackAlignment),
        e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, e.NONE);
      const t =
        (function (e) {
          return (
            !o &&
            (1001 !== e.wrapS || 1001 !== e.wrapT || (1003 !== e.minFilter && 1006 !== e.minFilter))
          );
        })(i) && !1 === y(i.image);
      let n = x(i.image, t, !1, h);
      n = z(i, n);
      const p = y(n) || o,
        m = a.convert(i.format, i.encoding);
      let f,
        g = a.convert(i.type),
        _ = b(i.internalFormat, m, g, i.encoding, i.isVideoTexture);
      U(l, i, p);
      const v = i.mipmaps,
        E = o && !0 !== i.isVideoTexture,
        A = void 0 === d.__version || !0 === c,
        w = T(i, n, p);
      if (i.isDepthTexture)
        (_ = e.DEPTH_COMPONENT),
          o
            ? (_ =
                1015 === i.type
                  ? e.DEPTH_COMPONENT32F
                  : 1014 === i.type
                    ? e.DEPTH_COMPONENT24
                    : 1020 === i.type
                      ? e.DEPTH24_STENCIL8
                      : e.DEPTH_COMPONENT16)
            : 1015 === i.type &&
              console.error('WebGLRenderer: Floating point depth texture requires WebGL2.'),
          1026 === i.format &&
            _ === e.DEPTH_COMPONENT &&
            1012 !== i.type &&
            1014 !== i.type &&
            (console.warn(
              'THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture.',
            ),
            (i.type = 1014),
            (g = a.convert(i.type))),
          1027 === i.format &&
            _ === e.DEPTH_COMPONENT &&
            ((_ = e.DEPTH_STENCIL),
            1020 !== i.type &&
              (console.warn(
                'THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture.',
              ),
              (i.type = 1020),
              (g = a.convert(i.type)))),
          A &&
            (E
              ? r.texStorage2D(e.TEXTURE_2D, 1, _, n.width, n.height)
              : r.texImage2D(e.TEXTURE_2D, 0, _, n.width, n.height, 0, m, g, null));
      else if (i.isDataTexture)
        if (v.length > 0 && p) {
          E && A && r.texStorage2D(e.TEXTURE_2D, w, _, v[0].width, v[0].height);
          for (let t = 0, n = v.length; t < n; t++)
            (f = v[t]),
              E
                ? r.texSubImage2D(e.TEXTURE_2D, t, 0, 0, f.width, f.height, m, g, f.data)
                : r.texImage2D(e.TEXTURE_2D, t, _, f.width, f.height, 0, m, g, f.data);
          i.generateMipmaps = !1;
        } else
          E
            ? (A && r.texStorage2D(e.TEXTURE_2D, w, _, n.width, n.height),
              r.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, n.width, n.height, m, g, n.data))
            : r.texImage2D(e.TEXTURE_2D, 0, _, n.width, n.height, 0, m, g, n.data);
      else if (i.isCompressedTexture)
        if (i.isCompressedArrayTexture) {
          E && A && r.texStorage3D(e.TEXTURE_2D_ARRAY, w, _, v[0].width, v[0].height, n.depth);
          for (let t = 0, a = v.length; t < a; t++)
            (f = v[t]),
              1023 !== i.format
                ? null !== m
                  ? E
                    ? r.compressedTexSubImage3D(
                        e.TEXTURE_2D_ARRAY,
                        t,
                        0,
                        0,
                        0,
                        f.width,
                        f.height,
                        n.depth,
                        m,
                        f.data,
                        0,
                        0,
                      )
                    : r.compressedTexImage3D(
                        e.TEXTURE_2D_ARRAY,
                        t,
                        _,
                        f.width,
                        f.height,
                        n.depth,
                        0,
                        f.data,
                        0,
                        0,
                      )
                  : console.warn(
                      'THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()',
                    )
                : E
                  ? r.texSubImage3D(
                      e.TEXTURE_2D_ARRAY,
                      t,
                      0,
                      0,
                      0,
                      f.width,
                      f.height,
                      n.depth,
                      m,
                      g,
                      f.data,
                    )
                  : r.texImage3D(
                      e.TEXTURE_2D_ARRAY,
                      t,
                      _,
                      f.width,
                      f.height,
                      n.depth,
                      0,
                      m,
                      g,
                      f.data,
                    );
        } else {
          E && A && r.texStorage2D(e.TEXTURE_2D, w, _, v[0].width, v[0].height);
          for (let t = 0, n = v.length; t < n; t++)
            (f = v[t]),
              1023 !== i.format
                ? null !== m
                  ? E
                    ? r.compressedTexSubImage2D(e.TEXTURE_2D, t, 0, 0, f.width, f.height, m, f.data)
                    : r.compressedTexImage2D(e.TEXTURE_2D, t, _, f.width, f.height, 0, f.data)
                  : console.warn(
                      'THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()',
                    )
                : E
                  ? r.texSubImage2D(e.TEXTURE_2D, t, 0, 0, f.width, f.height, m, g, f.data)
                  : r.texImage2D(e.TEXTURE_2D, t, _, f.width, f.height, 0, m, g, f.data);
        }
      else if (i.isDataArrayTexture)
        E
          ? (A && r.texStorage3D(e.TEXTURE_2D_ARRAY, w, _, n.width, n.height, n.depth),
            r.texSubImage3D(
              e.TEXTURE_2D_ARRAY,
              0,
              0,
              0,
              0,
              n.width,
              n.height,
              n.depth,
              m,
              g,
              n.data,
            ))
          : r.texImage3D(e.TEXTURE_2D_ARRAY, 0, _, n.width, n.height, n.depth, 0, m, g, n.data);
      else if (i.isData3DTexture)
        E
          ? (A && r.texStorage3D(e.TEXTURE_3D, w, _, n.width, n.height, n.depth),
            r.texSubImage3D(e.TEXTURE_3D, 0, 0, 0, 0, n.width, n.height, n.depth, m, g, n.data))
          : r.texImage3D(e.TEXTURE_3D, 0, _, n.width, n.height, n.depth, 0, m, g, n.data);
      else if (i.isFramebufferTexture) {
        if (A)
          if (E) r.texStorage2D(e.TEXTURE_2D, w, _, n.width, n.height);
          else {
            let t = n.width,
              i = n.height;
            for (let n = 0; n < w; n++)
              r.texImage2D(e.TEXTURE_2D, n, _, t, i, 0, m, g, null), (t >>= 1), (i >>= 1);
          }
      } else if (v.length > 0 && p) {
        E && A && r.texStorage2D(e.TEXTURE_2D, w, _, v[0].width, v[0].height);
        for (let t = 0, n = v.length; t < n; t++)
          (f = v[t]),
            E
              ? r.texSubImage2D(e.TEXTURE_2D, t, 0, 0, m, g, f)
              : r.texImage2D(e.TEXTURE_2D, t, _, m, g, f);
        i.generateMipmaps = !1;
      } else
        E
          ? (A && r.texStorage2D(e.TEXTURE_2D, w, _, n.width, n.height),
            r.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, m, g, n))
          : r.texImage2D(e.TEXTURE_2D, 0, _, m, g, n);
      M(i, p) && S(l), (d.__version = u.version), i.onUpdate && i.onUpdate(i);
    }
    t.__version = i.version;
  }
  function N(t, i, s, o, l) {
    const c = a.convert(s.format, s.encoding),
      h = a.convert(s.type),
      u = b(s.internalFormat, c, h, s.encoding);
    n.get(i).__hasExternalTextures ||
      (l === e.TEXTURE_3D || l === e.TEXTURE_2D_ARRAY
        ? r.texImage3D(l, 0, u, i.width, i.height, i.depth, 0, c, h, null)
        : r.texImage2D(l, 0, u, i.width, i.height, 0, c, h, null)),
      r.bindFramebuffer(e.FRAMEBUFFER, t),
      G(i)
        ? d.framebufferTexture2DMultisampleEXT(
            e.FRAMEBUFFER,
            o,
            l,
            n.get(s).__webglTexture,
            0,
            V(i),
          )
        : (l === e.TEXTURE_2D ||
            (l >= e.TEXTURE_CUBE_MAP_POSITIVE_X && l <= e.TEXTURE_CUBE_MAP_NEGATIVE_Z)) &&
          e.framebufferTexture2D(e.FRAMEBUFFER, o, l, n.get(s).__webglTexture, 0),
      r.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  function O(t, r, n) {
    if ((e.bindRenderbuffer(e.RENDERBUFFER, t), r.depthBuffer && !r.stencilBuffer)) {
      let i = e.DEPTH_COMPONENT16;
      if (n || G(r)) {
        const t = r.depthTexture;
        t &&
          t.isDepthTexture &&
          (1015 === t.type
            ? (i = e.DEPTH_COMPONENT32F)
            : 1014 === t.type && (i = e.DEPTH_COMPONENT24));
        const n = V(r);
        G(r)
          ? d.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, n, i, r.width, r.height)
          : e.renderbufferStorageMultisample(e.RENDERBUFFER, n, i, r.width, r.height);
      } else e.renderbufferStorage(e.RENDERBUFFER, i, r.width, r.height);
      e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.RENDERBUFFER, t);
    } else if (r.depthBuffer && r.stencilBuffer) {
      const i = V(r);
      n && !1 === G(r)
        ? e.renderbufferStorageMultisample(e.RENDERBUFFER, i, e.DEPTH24_STENCIL8, r.width, r.height)
        : G(r)
          ? d.renderbufferStorageMultisampleEXT(
              e.RENDERBUFFER,
              i,
              e.DEPTH24_STENCIL8,
              r.width,
              r.height,
            )
          : e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_STENCIL, r.width, r.height),
        e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_STENCIL_ATTACHMENT, e.RENDERBUFFER, t);
    } else {
      const t = !0 === r.isWebGLMultipleRenderTargets ? r.texture : [r.texture];
      for (let i = 0; i < t.length; i++) {
        const s = t[i],
          o = a.convert(s.format, s.encoding),
          l = a.convert(s.type),
          c = b(s.internalFormat, o, l, s.encoding),
          h = V(r);
        n && !1 === G(r)
          ? e.renderbufferStorageMultisample(e.RENDERBUFFER, h, c, r.width, r.height)
          : G(r)
            ? d.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, h, c, r.width, r.height)
            : e.renderbufferStorage(e.RENDERBUFFER, c, r.width, r.height);
      }
    }
    e.bindRenderbuffer(e.RENDERBUFFER, null);
  }
  function F(t) {
    const i = n.get(t),
      a = !0 === t.isWebGLCubeRenderTarget;
    if (t.depthTexture && !i.__autoAllocateDepthBuffer) {
      if (a) throw new Error('target.depthTexture not supported in Cube render targets');
      !(function (t, i) {
        if (i && i.isWebGLCubeRenderTarget)
          throw new Error('Depth Texture with cube render targets is not supported');
        if (
          (r.bindFramebuffer(e.FRAMEBUFFER, t), !i.depthTexture || !i.depthTexture.isDepthTexture)
        )
          throw new Error('renderTarget.depthTexture must be an instance of THREE.DepthTexture');
        (n.get(i.depthTexture).__webglTexture &&
          i.depthTexture.image.width === i.width &&
          i.depthTexture.image.height === i.height) ||
          ((i.depthTexture.image.width = i.width),
          (i.depthTexture.image.height = i.height),
          (i.depthTexture.needsUpdate = !0)),
          L(i.depthTexture, 0);
        const a = n.get(i.depthTexture).__webglTexture,
          s = V(i);
        if (1026 === i.depthTexture.format)
          G(i)
            ? d.framebufferTexture2DMultisampleEXT(
                e.FRAMEBUFFER,
                e.DEPTH_ATTACHMENT,
                e.TEXTURE_2D,
                a,
                0,
                s,
              )
            : e.framebufferTexture2D(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.TEXTURE_2D, a, 0);
        else {
          if (1027 !== i.depthTexture.format) throw new Error('Unknown depthTexture format');
          G(i)
            ? d.framebufferTexture2DMultisampleEXT(
                e.FRAMEBUFFER,
                e.DEPTH_STENCIL_ATTACHMENT,
                e.TEXTURE_2D,
                a,
                0,
                s,
              )
            : e.framebufferTexture2D(e.FRAMEBUFFER, e.DEPTH_STENCIL_ATTACHMENT, e.TEXTURE_2D, a, 0);
        }
      })(i.__webglFramebuffer, t);
    } else if (a) {
      i.__webglDepthbuffer = [];
      for (let n = 0; n < 6; n++)
        r.bindFramebuffer(e.FRAMEBUFFER, i.__webglFramebuffer[n]),
          (i.__webglDepthbuffer[n] = e.createRenderbuffer()),
          O(i.__webglDepthbuffer[n], t, !1);
    } else
      r.bindFramebuffer(e.FRAMEBUFFER, i.__webglFramebuffer),
        (i.__webglDepthbuffer = e.createRenderbuffer()),
        O(i.__webglDepthbuffer, t, !1);
    r.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  function V(e) {
    return Math.min(u, e.samples);
  }
  function G(e) {
    const r = n.get(e);
    return (
      o &&
      e.samples > 0 &&
      !0 === t.has('WEBGL_multisampled_render_to_texture') &&
      !1 !== r.__useRenderToTexture
    );
  }
  function z(e, r) {
    const n = e.encoding,
      i = e.format,
      a = e.type;
    return (
      !0 === e.isCompressedTexture ||
        !0 === e.isVideoTexture ||
        1035 === e.format ||
        (3e3 !== n &&
          (3001 === n
            ? !1 === o
              ? !0 === t.has('EXT_sRGB') && 1023 === i
                ? ((e.format = 1035), (e.minFilter = 1006), (e.generateMipmaps = !1))
                : (r = ImageUtils.sRGBToLinear(r))
              : (1023 === i && 1009 === a) ||
                console.warn(
                  'THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.',
                )
            : console.error('THREE.WebGLTextures: Unsupported texture encoding:', n))),
      r
    );
  }
  (this.allocateTextureUnit = function () {
    const e = R;
    return (
      e >= l &&
        console.warn(
          'THREE.WebGLTextures: Trying to use ' +
            e +
            ' texture units while this GPU supports only ' +
            l,
        ),
      (R += 1),
      e
    );
  }),
    (this.resetTextureUnits = function () {
      R = 0;
    }),
    (this.setTexture2D = L),
    (this.setTexture2DArray = function (t, i) {
      const a = n.get(t);
      t.version > 0 && a.__version !== t.version
        ? B(a, t, i)
        : r.bindTexture(e.TEXTURE_2D_ARRAY, a.__webglTexture, e.TEXTURE0 + i);
    }),
    (this.setTexture3D = function (t, i) {
      const a = n.get(t);
      t.version > 0 && a.__version !== t.version
        ? B(a, t, i)
        : r.bindTexture(e.TEXTURE_3D, a.__webglTexture, e.TEXTURE0 + i);
    }),
    (this.setTextureCube = function (t, i) {
      const s = n.get(t);
      t.version > 0 && s.__version !== t.version
        ? (function (t, i, s) {
            if (6 !== i.image.length) return;
            const l = D(t, i),
              h = i.source;
            r.bindTexture(e.TEXTURE_CUBE_MAP, t.__webglTexture, e.TEXTURE0 + s);
            const u = n.get(h);
            if (h.version !== u.__version || !0 === l) {
              r.activeTexture(e.TEXTURE0 + s),
                e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, i.flipY),
                e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, i.premultiplyAlpha),
                e.pixelStorei(e.UNPACK_ALIGNMENT, i.unpackAlignment),
                e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, e.NONE);
              const t = i.isCompressedTexture || i.image[0].isCompressedTexture,
                n = i.image[0] && i.image[0].isDataTexture,
                d = [];
              for (let e = 0; e < 6; e++)
                (d[e] = t || n ? (n ? i.image[e].image : i.image[e]) : x(i.image[e], !1, !0, c)),
                  (d[e] = z(i, d[e]));
              const p = d[0],
                m = y(p) || o,
                f = a.convert(i.format, i.encoding),
                g = a.convert(i.type),
                _ = b(i.internalFormat, f, g, i.encoding),
                v = o && !0 !== i.isVideoTexture,
                E = void 0 === u.__version || !0 === l;
              let A,
                w = T(i, p, m);
              if ((U(e.TEXTURE_CUBE_MAP, i, m), t)) {
                v && E && r.texStorage2D(e.TEXTURE_CUBE_MAP, w, _, p.width, p.height);
                for (let t = 0; t < 6; t++) {
                  A = d[t].mipmaps;
                  for (let n = 0; n < A.length; n++) {
                    const a = A[n];
                    1023 !== i.format
                      ? null !== f
                        ? v
                          ? r.compressedTexSubImage2D(
                              e.TEXTURE_CUBE_MAP_POSITIVE_X + t,
                              n,
                              0,
                              0,
                              a.width,
                              a.height,
                              f,
                              a.data,
                            )
                          : r.compressedTexImage2D(
                              e.TEXTURE_CUBE_MAP_POSITIVE_X + t,
                              n,
                              _,
                              a.width,
                              a.height,
                              0,
                              a.data,
                            )
                        : console.warn(
                            'THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()',
                          )
                      : v
                        ? r.texSubImage2D(
                            e.TEXTURE_CUBE_MAP_POSITIVE_X + t,
                            n,
                            0,
                            0,
                            a.width,
                            a.height,
                            f,
                            g,
                            a.data,
                          )
                        : r.texImage2D(
                            e.TEXTURE_CUBE_MAP_POSITIVE_X + t,
                            n,
                            _,
                            a.width,
                            a.height,
                            0,
                            f,
                            g,
                            a.data,
                          );
                  }
                }
              } else {
                (A = i.mipmaps),
                  v &&
                    E &&
                    (A.length > 0 && w++,
                    r.texStorage2D(e.TEXTURE_CUBE_MAP, w, _, d[0].width, d[0].height));
                for (let t = 0; t < 6; t++)
                  if (n) {
                    v
                      ? r.texSubImage2D(
                          e.TEXTURE_CUBE_MAP_POSITIVE_X + t,
                          0,
                          0,
                          0,
                          d[t].width,
                          d[t].height,
                          f,
                          g,
                          d[t].data,
                        )
                      : r.texImage2D(
                          e.TEXTURE_CUBE_MAP_POSITIVE_X + t,
                          0,
                          _,
                          d[t].width,
                          d[t].height,
                          0,
                          f,
                          g,
                          d[t].data,
                        );
                    for (let n = 0; n < A.length; n++) {
                      const i = A[n].image[t].image;
                      v
                        ? r.texSubImage2D(
                            e.TEXTURE_CUBE_MAP_POSITIVE_X + t,
                            n + 1,
                            0,
                            0,
                            i.width,
                            i.height,
                            f,
                            g,
                            i.data,
                          )
                        : r.texImage2D(
                            e.TEXTURE_CUBE_MAP_POSITIVE_X + t,
                            n + 1,
                            _,
                            i.width,
                            i.height,
                            0,
                            f,
                            g,
                            i.data,
                          );
                    }
                  } else {
                    v
                      ? r.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, 0, 0, f, g, d[t])
                      : r.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, _, f, g, d[t]);
                    for (let n = 0; n < A.length; n++) {
                      const i = A[n];
                      v
                        ? r.texSubImage2D(
                            e.TEXTURE_CUBE_MAP_POSITIVE_X + t,
                            n + 1,
                            0,
                            0,
                            f,
                            g,
                            i.image[t],
                          )
                        : r.texImage2D(
                            e.TEXTURE_CUBE_MAP_POSITIVE_X + t,
                            n + 1,
                            _,
                            f,
                            g,
                            i.image[t],
                          );
                    }
                  }
              }
              M(i, m) && S(e.TEXTURE_CUBE_MAP),
                (u.__version = h.version),
                i.onUpdate && i.onUpdate(i);
            }
            t.__version = i.version;
          })(s, t, i)
        : r.bindTexture(e.TEXTURE_CUBE_MAP, s.__webglTexture, e.TEXTURE0 + i);
    }),
    (this.rebindTextures = function (t, r, i) {
      const a = n.get(t);
      void 0 !== r && N(a.__webglFramebuffer, t, t.texture, e.COLOR_ATTACHMENT0, e.TEXTURE_2D),
        void 0 !== i && F(t);
    }),
    (this.setupRenderTarget = function (t) {
      const l = t.texture,
        c = n.get(t),
        h = n.get(l);
      t.addEventListener('dispose', w),
        !0 !== t.isWebGLMultipleRenderTargets &&
          (void 0 === h.__webglTexture && (h.__webglTexture = e.createTexture()),
          (h.__version = l.version),
          s.memory.textures++);
      const u = !0 === t.isWebGLCubeRenderTarget,
        d = !0 === t.isWebGLMultipleRenderTargets,
        p = y(t) || o;
      if (u) {
        c.__webglFramebuffer = [];
        for (let t = 0; t < 6; t++) c.__webglFramebuffer[t] = e.createFramebuffer();
      } else {
        if (((c.__webglFramebuffer = e.createFramebuffer()), d))
          if (i.drawBuffers) {
            const r = t.texture;
            for (let t = 0, i = r.length; t < i; t++) {
              const i = n.get(r[t]);
              void 0 === i.__webglTexture &&
                ((i.__webglTexture = e.createTexture()), s.memory.textures++);
            }
          } else
            console.warn(
              'THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.',
            );
        if (o && t.samples > 0 && !1 === G(t)) {
          const n = d ? l : [l];
          (c.__webglMultisampledFramebuffer = e.createFramebuffer()),
            (c.__webglColorRenderbuffer = []),
            r.bindFramebuffer(e.FRAMEBUFFER, c.__webglMultisampledFramebuffer);
          for (let r = 0; r < n.length; r++) {
            const i = n[r];
            (c.__webglColorRenderbuffer[r] = e.createRenderbuffer()),
              e.bindRenderbuffer(e.RENDERBUFFER, c.__webglColorRenderbuffer[r]);
            const s = a.convert(i.format, i.encoding),
              o = a.convert(i.type),
              l = b(i.internalFormat, s, o, i.encoding, !0 === t.isXRRenderTarget),
              h = V(t);
            e.renderbufferStorageMultisample(e.RENDERBUFFER, h, l, t.width, t.height),
              e.framebufferRenderbuffer(
                e.FRAMEBUFFER,
                e.COLOR_ATTACHMENT0 + r,
                e.RENDERBUFFER,
                c.__webglColorRenderbuffer[r],
              );
          }
          e.bindRenderbuffer(e.RENDERBUFFER, null),
            t.depthBuffer &&
              ((c.__webglDepthRenderbuffer = e.createRenderbuffer()),
              O(c.__webglDepthRenderbuffer, t, !0)),
            r.bindFramebuffer(e.FRAMEBUFFER, null);
        }
      }
      if (u) {
        r.bindTexture(e.TEXTURE_CUBE_MAP, h.__webglTexture), U(e.TEXTURE_CUBE_MAP, l, p);
        for (let r = 0; r < 6; r++)
          N(c.__webglFramebuffer[r], t, l, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + r);
        M(l, p) && S(e.TEXTURE_CUBE_MAP), r.unbindTexture();
      } else if (d) {
        const i = t.texture;
        for (let a = 0, s = i.length; a < s; a++) {
          const s = i[a],
            o = n.get(s);
          r.bindTexture(e.TEXTURE_2D, o.__webglTexture),
            U(e.TEXTURE_2D, s, p),
            N(c.__webglFramebuffer, t, s, e.COLOR_ATTACHMENT0 + a, e.TEXTURE_2D),
            M(s, p) && S(e.TEXTURE_2D);
        }
        r.unbindTexture();
      } else {
        let n = e.TEXTURE_2D;
        (t.isWebGL3DRenderTarget || t.isWebGLArrayRenderTarget) &&
          (o
            ? (n = t.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY)
            : console.error(
                'THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.',
              )),
          r.bindTexture(n, h.__webglTexture),
          U(n, l, p),
          N(c.__webglFramebuffer, t, l, e.COLOR_ATTACHMENT0, n),
          M(l, p) && S(n),
          r.unbindTexture();
      }
      t.depthBuffer && F(t);
    }),
    (this.updateRenderTargetMipmap = function (t) {
      const i = y(t) || o,
        a = !0 === t.isWebGLMultipleRenderTargets ? t.texture : [t.texture];
      for (let s = 0, o = a.length; s < o; s++) {
        const o = a[s];
        if (M(o, i)) {
          const i = t.isWebGLCubeRenderTarget ? e.TEXTURE_CUBE_MAP : e.TEXTURE_2D,
            a = n.get(o).__webglTexture;
          r.bindTexture(i, a), S(i), r.unbindTexture();
        }
      }
    }),
    (this.updateMultisampleRenderTarget = function (t) {
      if (o && t.samples > 0 && !1 === G(t)) {
        const i = t.isWebGLMultipleRenderTargets ? t.texture : [t.texture],
          a = t.width,
          s = t.height;
        let o = e.COLOR_BUFFER_BIT;
        const l = [],
          c = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT,
          h = n.get(t),
          u = !0 === t.isWebGLMultipleRenderTargets;
        if (u)
          for (let t = 0; t < i.length; t++)
            r.bindFramebuffer(e.FRAMEBUFFER, h.__webglMultisampledFramebuffer),
              e.framebufferRenderbuffer(
                e.FRAMEBUFFER,
                e.COLOR_ATTACHMENT0 + t,
                e.RENDERBUFFER,
                null,
              ),
              r.bindFramebuffer(e.FRAMEBUFFER, h.__webglFramebuffer),
              e.framebufferTexture2D(
                e.DRAW_FRAMEBUFFER,
                e.COLOR_ATTACHMENT0 + t,
                e.TEXTURE_2D,
                null,
                0,
              );
        r.bindFramebuffer(e.READ_FRAMEBUFFER, h.__webglMultisampledFramebuffer),
          r.bindFramebuffer(e.DRAW_FRAMEBUFFER, h.__webglFramebuffer);
        for (let r = 0; r < i.length; r++) {
          l.push(e.COLOR_ATTACHMENT0 + r), t.depthBuffer && l.push(c);
          const d = void 0 !== h.__ignoreDepthValues && h.__ignoreDepthValues;
          if (
            (!1 === d &&
              (t.depthBuffer && (o |= e.DEPTH_BUFFER_BIT),
              t.stencilBuffer && (o |= e.STENCIL_BUFFER_BIT)),
            u &&
              e.framebufferRenderbuffer(
                e.READ_FRAMEBUFFER,
                e.COLOR_ATTACHMENT0,
                e.RENDERBUFFER,
                h.__webglColorRenderbuffer[r],
              ),
            !0 === d &&
              (e.invalidateFramebuffer(e.READ_FRAMEBUFFER, [c]),
              e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, [c])),
            u)
          ) {
            const t = n.get(i[r]).__webglTexture;
            e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t, 0);
          }
          e.blitFramebuffer(0, 0, a, s, 0, 0, a, s, o, e.NEAREST),
            p && e.invalidateFramebuffer(e.READ_FRAMEBUFFER, l);
        }
        if (
          (r.bindFramebuffer(e.READ_FRAMEBUFFER, null),
          r.bindFramebuffer(e.DRAW_FRAMEBUFFER, null),
          u)
        )
          for (let t = 0; t < i.length; t++) {
            r.bindFramebuffer(e.FRAMEBUFFER, h.__webglMultisampledFramebuffer),
              e.framebufferRenderbuffer(
                e.FRAMEBUFFER,
                e.COLOR_ATTACHMENT0 + t,
                e.RENDERBUFFER,
                h.__webglColorRenderbuffer[t],
              );
            const a = n.get(i[t]).__webglTexture;
            r.bindFramebuffer(e.FRAMEBUFFER, h.__webglFramebuffer),
              e.framebufferTexture2D(
                e.DRAW_FRAMEBUFFER,
                e.COLOR_ATTACHMENT0 + t,
                e.TEXTURE_2D,
                a,
                0,
              );
          }
        r.bindFramebuffer(e.DRAW_FRAMEBUFFER, h.__webglMultisampledFramebuffer);
      }
    }),
    (this.setupDepthRenderbuffer = F),
    (this.setupFrameBufferTexture = N),
    (this.useMultisampledRTT = G);
}
function WebGLUtils(e, t, r) {
  const n = r.isWebGL2;
  return {
    convert: function (r, i = null) {
      let a;
      if (1009 === r) return e.UNSIGNED_BYTE;
      if (1017 === r) return e.UNSIGNED_SHORT_4_4_4_4;
      if (1018 === r) return e.UNSIGNED_SHORT_5_5_5_1;
      if (1010 === r) return e.BYTE;
      if (1011 === r) return e.SHORT;
      if (1012 === r) return e.UNSIGNED_SHORT;
      if (1013 === r) return e.INT;
      if (1014 === r) return e.UNSIGNED_INT;
      if (1015 === r) return e.FLOAT;
      if (1016 === r)
        return n
          ? e.HALF_FLOAT
          : ((a = t.get('OES_texture_half_float')), null !== a ? a.HALF_FLOAT_OES : null);
      if (1021 === r) return e.ALPHA;
      if (1023 === r) return e.RGBA;
      if (1024 === r) return e.LUMINANCE;
      if (1025 === r) return e.LUMINANCE_ALPHA;
      if (1026 === r) return e.DEPTH_COMPONENT;
      if (1027 === r) return e.DEPTH_STENCIL;
      if (1035 === r) return (a = t.get('EXT_sRGB')), null !== a ? a.SRGB_ALPHA_EXT : null;
      if (1028 === r) return e.RED;
      if (1029 === r) return e.RED_INTEGER;
      if (1030 === r) return e.RG;
      if (1031 === r) return e.RG_INTEGER;
      if (1033 === r) return e.RGBA_INTEGER;
      if (33776 === r || 33777 === r || 33778 === r || 33779 === r)
        if (3001 === i) {
          if (((a = t.get('WEBGL_compressed_texture_s3tc_srgb')), null === a)) return null;
          if (33776 === r) return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (33777 === r) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (33778 === r) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (33779 === r) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else {
          if (((a = t.get('WEBGL_compressed_texture_s3tc')), null === a)) return null;
          if (33776 === r) return a.COMPRESSED_RGB_S3TC_DXT1_EXT;
          if (33777 === r) return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;
          if (33778 === r) return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;
          if (33779 === r) return a.COMPRESSED_RGBA_S3TC_DXT5_EXT;
        }
      if (35840 === r || 35841 === r || 35842 === r || 35843 === r) {
        if (((a = t.get('WEBGL_compressed_texture_pvrtc')), null === a)) return null;
        if (35840 === r) return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (35841 === r) return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (35842 === r) return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (35843 === r) return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      }
      if (36196 === r)
        return (
          (a = t.get('WEBGL_compressed_texture_etc1')),
          null !== a ? a.COMPRESSED_RGB_ETC1_WEBGL : null
        );
      if (37492 === r || 37496 === r) {
        if (((a = t.get('WEBGL_compressed_texture_etc')), null === a)) return null;
        if (37492 === r) return 3001 === i ? a.COMPRESSED_SRGB8_ETC2 : a.COMPRESSED_RGB8_ETC2;
        if (37496 === r)
          return 3001 === i ? a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : a.COMPRESSED_RGBA8_ETC2_EAC;
      }
      if (
        37808 === r ||
        37809 === r ||
        37810 === r ||
        37811 === r ||
        37812 === r ||
        37813 === r ||
        37814 === r ||
        37815 === r ||
        37816 === r ||
        37817 === r ||
        37818 === r ||
        37819 === r ||
        37820 === r ||
        37821 === r
      ) {
        if (((a = t.get('WEBGL_compressed_texture_astc')), null === a)) return null;
        if (37808 === r)
          return 3001 === i
            ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR
            : a.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (37809 === r)
          return 3001 === i
            ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR
            : a.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (37810 === r)
          return 3001 === i
            ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR
            : a.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (37811 === r)
          return 3001 === i
            ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR
            : a.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (37812 === r)
          return 3001 === i
            ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR
            : a.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (37813 === r)
          return 3001 === i
            ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR
            : a.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (37814 === r)
          return 3001 === i
            ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR
            : a.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (37815 === r)
          return 3001 === i
            ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR
            : a.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (37816 === r)
          return 3001 === i
            ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR
            : a.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (37817 === r)
          return 3001 === i
            ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR
            : a.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (37818 === r)
          return 3001 === i
            ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR
            : a.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (37819 === r)
          return 3001 === i
            ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR
            : a.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (37820 === r)
          return 3001 === i
            ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR
            : a.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (37821 === r)
          return 3001 === i
            ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR
            : a.COMPRESSED_RGBA_ASTC_12x12_KHR;
      }
      if (36492 === r) {
        if (((a = t.get('EXT_texture_compression_bptc')), null === a)) return null;
        if (36492 === r)
          return 3001 === i
            ? a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT
            : a.COMPRESSED_RGBA_BPTC_UNORM_EXT;
      }
      if (36283 === r || 36284 === r || 36285 === r || 36286 === r) {
        if (((a = t.get('EXT_texture_compression_rgtc')), null === a)) return null;
        if (36492 === r) return a.COMPRESSED_RED_RGTC1_EXT;
        if (36284 === r) return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (36285 === r) return a.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (36286 === r) return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      }
      return 1020 === r
        ? n
          ? e.UNSIGNED_INT_24_8
          : ((a = t.get('WEBGL_depth_texture')), null !== a ? a.UNSIGNED_INT_24_8_WEBGL : null)
        : void 0 !== e[r]
          ? e[r]
          : null;
    },
  };
}
class ArrayCamera extends PerspectiveCamera {
  constructor(e = []) {
    super(), (this.isArrayCamera = !0), (this.cameras = e);
  }
}
class Group extends Object3D {
  constructor() {
    super(), (this.isGroup = !0), (this.type = 'Group');
  }
}
const _moveEvent = { type: 'move' };
class WebXRController {
  constructor() {
    (this._targetRay = null), (this._grip = null), (this._hand = null);
  }
  getHandSpace() {
    return (
      null === this._hand &&
        ((this._hand = new Group()),
        (this._hand.matrixAutoUpdate = !1),
        (this._hand.visible = !1),
        (this._hand.joints = {}),
        (this._hand.inputState = { pinching: !1 })),
      this._hand
    );
  }
  getTargetRaySpace() {
    return (
      null === this._targetRay &&
        ((this._targetRay = new Group()),
        (this._targetRay.matrixAutoUpdate = !1),
        (this._targetRay.visible = !1),
        (this._targetRay.hasLinearVelocity = !1),
        (this._targetRay.linearVelocity = new Vector3()),
        (this._targetRay.hasAngularVelocity = !1),
        (this._targetRay.angularVelocity = new Vector3())),
      this._targetRay
    );
  }
  getGripSpace() {
    return (
      null === this._grip &&
        ((this._grip = new Group()),
        (this._grip.matrixAutoUpdate = !1),
        (this._grip.visible = !1),
        (this._grip.hasLinearVelocity = !1),
        (this._grip.linearVelocity = new Vector3()),
        (this._grip.hasAngularVelocity = !1),
        (this._grip.angularVelocity = new Vector3())),
      this._grip
    );
  }
  dispatchEvent(e) {
    return (
      null !== this._targetRay && this._targetRay.dispatchEvent(e),
      null !== this._grip && this._grip.dispatchEvent(e),
      null !== this._hand && this._hand.dispatchEvent(e),
      this
    );
  }
  connect(e) {
    if (e && e.hand) {
      const t = this._hand;
      if (t) for (const r of e.hand.values()) this._getHandJoint(t, r);
    }
    return this.dispatchEvent({ type: 'connected', data: e }), this;
  }
  disconnect(e) {
    return (
      this.dispatchEvent({ type: 'disconnected', data: e }),
      null !== this._targetRay && (this._targetRay.visible = !1),
      null !== this._grip && (this._grip.visible = !1),
      null !== this._hand && (this._hand.visible = !1),
      this
    );
  }
  update(e, t, r) {
    let n = null,
      i = null,
      a = null;
    const s = this._targetRay,
      o = this._grip,
      l = this._hand;
    if (e && 'visible-blurred' !== t.session.visibilityState) {
      if (l && e.hand) {
        a = !0;
        for (const n of e.hand.values()) {
          const e = t.getJointPose(n, r),
            i = this._getHandJoint(l, n);
          null !== e &&
            (i.matrix.fromArray(e.transform.matrix),
            i.matrix.decompose(i.position, i.rotation, i.scale),
            (i.jointRadius = e.radius)),
            (i.visible = null !== e);
        }
        const n = l.joints['index-finger-tip'],
          i = l.joints['thumb-tip'],
          s = n.position.distanceTo(i.position),
          o = 0.02,
          c = 0.005;
        l.inputState.pinching && s > o + c
          ? ((l.inputState.pinching = !1),
            this.dispatchEvent({ type: 'pinchend', handedness: e.handedness, target: this }))
          : !l.inputState.pinching &&
            s <= o - c &&
            ((l.inputState.pinching = !0),
            this.dispatchEvent({ type: 'pinchstart', handedness: e.handedness, target: this }));
      } else
        null !== o &&
          e.gripSpace &&
          ((i = t.getPose(e.gripSpace, r)),
          null !== i &&
            (o.matrix.fromArray(i.transform.matrix),
            o.matrix.decompose(o.position, o.rotation, o.scale),
            i.linearVelocity
              ? ((o.hasLinearVelocity = !0), o.linearVelocity.copy(i.linearVelocity))
              : (o.hasLinearVelocity = !1),
            i.angularVelocity
              ? ((o.hasAngularVelocity = !0), o.angularVelocity.copy(i.angularVelocity))
              : (o.hasAngularVelocity = !1)));
      null !== s &&
        ((n = t.getPose(e.targetRaySpace, r)),
        null === n && null !== i && (n = i),
        null !== n &&
          (s.matrix.fromArray(n.transform.matrix),
          s.matrix.decompose(s.position, s.rotation, s.scale),
          n.linearVelocity
            ? ((s.hasLinearVelocity = !0), s.linearVelocity.copy(n.linearVelocity))
            : (s.hasLinearVelocity = !1),
          n.angularVelocity
            ? ((s.hasAngularVelocity = !0), s.angularVelocity.copy(n.angularVelocity))
            : (s.hasAngularVelocity = !1),
          this.dispatchEvent(_moveEvent)));
    }
    return (
      null !== s && (s.visible = null !== n),
      null !== o && (o.visible = null !== i),
      null !== l && (l.visible = null !== a),
      this
    );
  }
  _getHandJoint(e, t) {
    if (void 0 === e.joints[t.jointName]) {
      const r = new Group();
      (r.matrixAutoUpdate = !1), (r.visible = !1), (e.joints[t.jointName] = r), e.add(r);
    }
    return e.joints[t.jointName];
  }
}
class DepthTexture extends Texture {
  constructor(e, t, r, n, i, a, s, o, l, c) {
    if (1026 !== (c = void 0 !== c ? c : 1026) && 1027 !== c)
      throw new Error(
        'DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat',
      );
    void 0 === r && 1026 === c && (r = 1014),
      void 0 === r && 1027 === c && (r = 1020),
      super(null, n, i, a, s, o, c, r, l),
      (this.isDepthTexture = !0),
      (this.image = { width: e, height: t }),
      (this.magFilter = void 0 !== s ? s : 1003),
      (this.minFilter = void 0 !== o ? o : 1003),
      (this.flipY = !1),
      (this.generateMipmaps = !1);
  }
}
class WebXRManager extends EventDispatcher {
  constructor(e, t) {
    super();
    const r = this;
    let n = null,
      i = 1,
      a = null,
      s = 'local-floor',
      o = 1,
      l = null,
      c = null,
      h = null,
      u = null,
      d = null,
      p = null;
    const m = t.getContextAttributes();
    let f = null,
      g = null;
    const _ = [],
      v = [],
      x = new Set(),
      y = new Map(),
      M = new PerspectiveCamera();
    M.layers.enable(1), (M.viewport = new Vector4());
    const S = new PerspectiveCamera();
    S.layers.enable(2), (S.viewport = new Vector4());
    const b = [M, S],
      T = new ArrayCamera();
    T.layers.enable(1), T.layers.enable(2);
    let E = null,
      A = null;
    function w(e) {
      const t = v.indexOf(e.inputSource);
      if (-1 === t) return;
      const r = _[t];
      void 0 !== r && r.dispatchEvent({ type: e.type, data: e.inputSource });
    }
    function C() {
      n.removeEventListener('select', w),
        n.removeEventListener('selectstart', w),
        n.removeEventListener('selectend', w),
        n.removeEventListener('squeeze', w),
        n.removeEventListener('squeezestart', w),
        n.removeEventListener('squeezeend', w),
        n.removeEventListener('end', C),
        n.removeEventListener('inputsourceschange', R);
      for (let e = 0; e < _.length; e++) {
        const t = v[e];
        null !== t && ((v[e] = null), _[e].disconnect(t));
      }
      (E = null),
        (A = null),
        e.setRenderTarget(f),
        (d = null),
        (u = null),
        (h = null),
        (n = null),
        (g = null),
        D.stop(),
        (r.isPresenting = !1),
        r.dispatchEvent({ type: 'sessionend' });
    }
    function R(e) {
      for (let t = 0; t < e.removed.length; t++) {
        const r = e.removed[t],
          n = v.indexOf(r);
        n >= 0 && ((v[n] = null), _[n].disconnect(r));
      }
      for (let t = 0; t < e.added.length; t++) {
        const r = e.added[t];
        let n = v.indexOf(r);
        if (-1 === n) {
          for (let e = 0; e < _.length; e++) {
            if (e >= v.length) {
              v.push(r), (n = e);
              break;
            }
            if (null === v[e]) {
              (v[e] = r), (n = e);
              break;
            }
          }
          if (-1 === n) break;
        }
        const i = _[n];
        i && i.connect(r);
      }
    }
    (this.cameraAutoUpdate = !0),
      (this.enabled = !1),
      (this.isPresenting = !1),
      (this.getController = function (e) {
        let t = _[e];
        return void 0 === t && ((t = new WebXRController()), (_[e] = t)), t.getTargetRaySpace();
      }),
      (this.getControllerGrip = function (e) {
        let t = _[e];
        return void 0 === t && ((t = new WebXRController()), (_[e] = t)), t.getGripSpace();
      }),
      (this.getHand = function (e) {
        let t = _[e];
        return void 0 === t && ((t = new WebXRController()), (_[e] = t)), t.getHandSpace();
      }),
      (this.setFramebufferScaleFactor = function (e) {
        (i = e),
          !0 === r.isPresenting &&
            console.warn('THREE.WebXRManager: Cannot change framebuffer scale while presenting.');
      }),
      (this.setReferenceSpaceType = function (e) {
        (s = e),
          !0 === r.isPresenting &&
            console.warn(
              'THREE.WebXRManager: Cannot change reference space type while presenting.',
            );
      }),
      (this.getReferenceSpace = function () {
        return l || a;
      }),
      (this.setReferenceSpace = function (e) {
        l = e;
      }),
      (this.getBaseLayer = function () {
        return null !== u ? u : d;
      }),
      (this.getBinding = function () {
        return h;
      }),
      (this.getFrame = function () {
        return p;
      }),
      (this.getSession = function () {
        return n;
      }),
      (this.setSession = async function (c) {
        if (((n = c), null !== n)) {
          if (
            ((f = e.getRenderTarget()),
            n.addEventListener('select', w),
            n.addEventListener('selectstart', w),
            n.addEventListener('selectend', w),
            n.addEventListener('squeeze', w),
            n.addEventListener('squeezestart', w),
            n.addEventListener('squeezeend', w),
            n.addEventListener('end', C),
            n.addEventListener('inputsourceschange', R),
            !0 !== m.xrCompatible && (await t.makeXRCompatible()),
            void 0 === n.renderState.layers || !1 === e.capabilities.isWebGL2)
          ) {
            const r = {
              antialias: void 0 !== n.renderState.layers || m.antialias,
              alpha: m.alpha,
              depth: m.depth,
              stencil: m.stencil,
              framebufferScaleFactor: i,
            };
            (d = new XRWebGLLayer(n, t, r)),
              n.updateRenderState({ baseLayer: d }),
              (g = new WebGLRenderTarget(d.framebufferWidth, d.framebufferHeight, {
                format: 1023,
                type: 1009,
                encoding: e.outputEncoding,
                stencilBuffer: m.stencil,
              }));
          } else {
            let r = null,
              a = null,
              s = null;
            m.depth &&
              ((s = m.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24),
              (r = m.stencil ? 1027 : 1026),
              (a = m.stencil ? 1020 : 1014));
            const o = { colorFormat: t.RGBA8, depthFormat: s, scaleFactor: i };
            (h = new XRWebGLBinding(n, t)),
              (u = h.createProjectionLayer(o)),
              n.updateRenderState({ layers: [u] }),
              (g = new WebGLRenderTarget(u.textureWidth, u.textureHeight, {
                format: 1023,
                type: 1009,
                depthTexture: new DepthTexture(
                  u.textureWidth,
                  u.textureHeight,
                  a,
                  void 0,
                  void 0,
                  void 0,
                  void 0,
                  void 0,
                  void 0,
                  r,
                ),
                stencilBuffer: m.stencil,
                encoding: e.outputEncoding,
                samples: m.antialias ? 4 : 0,
              }));
            e.properties.get(g).__ignoreDepthValues = u.ignoreDepthValues;
          }
          (g.isXRRenderTarget = !0),
            this.setFoveation(o),
            (l = null),
            (a = await n.requestReferenceSpace(s)),
            D.setContext(n),
            D.start(),
            (r.isPresenting = !0),
            r.dispatchEvent({ type: 'sessionstart' });
        }
      });
    const L = new Vector3(),
      P = new Vector3();
    function I(e, t) {
      null === t
        ? e.matrixWorld.copy(e.matrix)
        : e.matrixWorld.multiplyMatrices(t.matrixWorld, e.matrix),
        e.matrixWorldInverse.copy(e.matrixWorld).invert();
    }
    (this.updateCamera = function (e) {
      if (null === n) return;
      (T.near = S.near = M.near = e.near),
        (T.far = S.far = M.far = e.far),
        (E === T.near && A === T.far) ||
          (n.updateRenderState({ depthNear: T.near, depthFar: T.far }), (E = T.near), (A = T.far));
      const t = e.parent,
        r = T.cameras;
      I(T, t);
      for (let e = 0; e < r.length; e++) I(r[e], t);
      2 === r.length
        ? (function (e, t, r) {
            L.setFromMatrixPosition(t.matrixWorld), P.setFromMatrixPosition(r.matrixWorld);
            const n = L.distanceTo(P),
              i = t.projectionMatrix.elements,
              a = r.projectionMatrix.elements,
              s = i[14] / (i[10] - 1),
              o = i[14] / (i[10] + 1),
              l = (i[9] + 1) / i[5],
              c = (i[9] - 1) / i[5],
              h = (i[8] - 1) / i[0],
              u = (a[8] + 1) / a[0],
              d = s * h,
              p = s * u,
              m = n / (-h + u),
              f = m * -h;
            t.matrixWorld.decompose(e.position, e.quaternion, e.scale),
              e.translateX(f),
              e.translateZ(m),
              e.matrixWorld.compose(e.position, e.quaternion, e.scale),
              e.matrixWorldInverse.copy(e.matrixWorld).invert();
            const g = s + m,
              _ = o + m,
              v = d - f,
              x = p + (n - f),
              y = ((l * o) / _) * g,
              M = ((c * o) / _) * g;
            e.projectionMatrix.makePerspective(v, x, y, M, g, _),
              e.projectionMatrixInverse.copy(e.projectionMatrix).invert();
          })(T, M, S)
        : T.projectionMatrix.copy(M.projectionMatrix),
        (function (e, t, r) {
          null === r
            ? e.matrix.copy(t.matrixWorld)
            : (e.matrix.copy(r.matrixWorld), e.matrix.invert(), e.matrix.multiply(t.matrixWorld));
          e.matrix.decompose(e.position, e.quaternion, e.scale), e.updateMatrixWorld(!0);
          const n = e.children;
          for (let e = 0, t = n.length; e < t; e++) n[e].updateMatrixWorld(!0);
          e.projectionMatrix.copy(t.projectionMatrix),
            e.projectionMatrixInverse.copy(t.projectionMatrixInverse),
            e.isPerspectiveCamera &&
              ((e.fov = 2 * RAD2DEG * Math.atan(1 / e.projectionMatrix.elements[5])), (e.zoom = 1));
        })(e, T, t);
    }),
      (this.getCamera = function () {
        return T;
      }),
      (this.getFoveation = function () {
        if (null !== u || null !== d) return o;
      }),
      (this.setFoveation = function (e) {
        (o = e),
          null !== u && (u.fixedFoveation = e),
          null !== d && void 0 !== d.fixedFoveation && (d.fixedFoveation = e);
      }),
      (this.getPlanes = function () {
        return x;
      });
    let U = null;
    const D = new WebGLAnimation();
    D.setAnimationLoop(function (t, n) {
      if (((c = n.getViewerPose(l || a)), (p = n), null !== c)) {
        const t = c.views;
        null !== d && (e.setRenderTargetFramebuffer(g, d.framebuffer), e.setRenderTarget(g));
        let r = !1;
        t.length !== T.cameras.length && ((T.cameras.length = 0), (r = !0));
        for (let n = 0; n < t.length; n++) {
          const i = t[n];
          let a = null;
          if (null !== d) a = d.getViewport(i);
          else {
            const t = h.getViewSubImage(u, i);
            (a = t.viewport),
              0 === n &&
                (e.setRenderTargetTextures(
                  g,
                  t.colorTexture,
                  u.ignoreDepthValues ? void 0 : t.depthStencilTexture,
                ),
                e.setRenderTarget(g));
          }
          let s = b[n];
          void 0 === s &&
            ((s = new PerspectiveCamera()),
            s.layers.enable(n),
            (s.viewport = new Vector4()),
            (b[n] = s)),
            s.matrix.fromArray(i.transform.matrix),
            s.matrix.decompose(s.position, s.quaternion, s.scale),
            s.projectionMatrix.fromArray(i.projectionMatrix),
            s.projectionMatrixInverse.copy(s.projectionMatrix).invert(),
            s.viewport.set(a.x, a.y, a.width, a.height),
            0 === n &&
              (T.matrix.copy(s.matrix), T.matrix.decompose(T.position, T.quaternion, T.scale)),
            !0 === r && T.cameras.push(s);
        }
      }
      for (let e = 0; e < _.length; e++) {
        const t = v[e],
          r = _[e];
        null !== t && void 0 !== r && r.update(t, n, l || a);
      }
      if ((U && U(t, n), n.detectedPlanes)) {
        r.dispatchEvent({ type: 'planesdetected', data: n.detectedPlanes });
        let e = null;
        for (const t of x) n.detectedPlanes.has(t) || (null === e && (e = []), e.push(t));
        if (null !== e)
          for (const t of e)
            x.delete(t), y.delete(t), r.dispatchEvent({ type: 'planeremoved', data: t });
        for (const e of n.detectedPlanes)
          if (x.has(e)) {
            const t = y.get(e);
            e.lastChangedTime > t &&
              (y.set(e, e.lastChangedTime), r.dispatchEvent({ type: 'planechanged', data: e }));
          } else
            x.add(e), y.set(e, n.lastChangedTime), r.dispatchEvent({ type: 'planeadded', data: e });
      }
      p = null;
    }),
      (this.setAnimationLoop = function (e) {
        U = e;
      }),
      (this.dispose = function () {});
  }
}
function WebGLMaterials(e, t) {
  function r(e, t) {
    !0 === e.matrixAutoUpdate && e.updateMatrix(), t.value.copy(e.matrix);
  }
  function n(n, i) {
    (n.opacity.value = i.opacity),
      i.color && n.diffuse.value.copy(i.color),
      i.emissive && n.emissive.value.copy(i.emissive).multiplyScalar(i.emissiveIntensity),
      i.map && ((n.map.value = i.map), r(i.map, n.mapTransform)),
      i.alphaMap && ((n.alphaMap.value = i.alphaMap), r(i.alphaMap, n.alphaMapTransform)),
      i.bumpMap &&
        ((n.bumpMap.value = i.bumpMap),
        r(i.bumpMap, n.bumpMapTransform),
        (n.bumpScale.value = i.bumpScale),
        1 === i.side && (n.bumpScale.value *= -1)),
      i.normalMap &&
        ((n.normalMap.value = i.normalMap),
        r(i.normalMap, n.normalMapTransform),
        n.normalScale.value.copy(i.normalScale),
        1 === i.side && n.normalScale.value.negate()),
      i.displacementMap &&
        ((n.displacementMap.value = i.displacementMap),
        r(i.displacementMap, n.displacementMapTransform),
        (n.displacementScale.value = i.displacementScale),
        (n.displacementBias.value = i.displacementBias)),
      i.emissiveMap &&
        ((n.emissiveMap.value = i.emissiveMap), r(i.emissiveMap, n.emissiveMapTransform)),
      i.specularMap &&
        ((n.specularMap.value = i.specularMap), r(i.specularMap, n.specularMapTransform)),
      i.alphaTest > 0 && (n.alphaTest.value = i.alphaTest);
    const a = t.get(i).envMap;
    if (
      (a &&
        ((n.envMap.value = a),
        (n.flipEnvMap.value = a.isCubeTexture && !1 === a.isRenderTargetTexture ? -1 : 1),
        (n.reflectivity.value = i.reflectivity),
        (n.ior.value = i.ior),
        (n.refractionRatio.value = i.refractionRatio)),
      i.lightMap)
    ) {
      n.lightMap.value = i.lightMap;
      const t = !0 === e.useLegacyLights ? Math.PI : 1;
      (n.lightMapIntensity.value = i.lightMapIntensity * t), r(i.lightMap, n.lightMapTransform);
    }
    i.aoMap &&
      ((n.aoMap.value = i.aoMap),
      (n.aoMapIntensity.value = i.aoMapIntensity),
      r(i.aoMap, n.aoMapTransform));
  }
  return {
    refreshFogUniforms: function (t, r) {
      r.color.getRGB(t.fogColor.value, getUnlitUniformColorSpace(e)),
        r.isFog
          ? ((t.fogNear.value = r.near), (t.fogFar.value = r.far))
          : r.isFogExp2 && (t.fogDensity.value = r.density);
    },
    refreshMaterialUniforms: function (e, i, a, s, o) {
      i.isMeshBasicMaterial || i.isMeshLambertMaterial
        ? n(e, i)
        : i.isMeshToonMaterial
          ? (n(e, i),
            (function (e, t) {
              t.gradientMap && (e.gradientMap.value = t.gradientMap);
            })(e, i))
          : i.isMeshPhongMaterial
            ? (n(e, i),
              (function (e, t) {
                e.specular.value.copy(t.specular),
                  (e.shininess.value = Math.max(t.shininess, 1e-4));
              })(e, i))
            : i.isMeshStandardMaterial
              ? (n(e, i),
                (function (e, n) {
                  (e.metalness.value = n.metalness),
                    n.metalnessMap &&
                      ((e.metalnessMap.value = n.metalnessMap),
                      r(n.metalnessMap, e.metalnessMapTransform));
                  (e.roughness.value = n.roughness),
                    n.roughnessMap &&
                      ((e.roughnessMap.value = n.roughnessMap),
                      r(n.roughnessMap, e.roughnessMapTransform));
                  t.get(n).envMap && (e.envMapIntensity.value = n.envMapIntensity);
                })(e, i),
                i.isMeshPhysicalMaterial &&
                  (function (e, t, n) {
                    (e.ior.value = t.ior),
                      t.sheen > 0 &&
                        (e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),
                        (e.sheenRoughness.value = t.sheenRoughness),
                        t.sheenColorMap &&
                          ((e.sheenColorMap.value = t.sheenColorMap),
                          r(t.sheenColorMap, e.sheenColorMapTransform)),
                        t.sheenRoughnessMap &&
                          ((e.sheenRoughnessMap.value = t.sheenRoughnessMap),
                          r(t.sheenRoughnessMap, e.sheenRoughnessMapTransform)));
                    t.clearcoat > 0 &&
                      ((e.clearcoat.value = t.clearcoat),
                      (e.clearcoatRoughness.value = t.clearcoatRoughness),
                      t.clearcoatMap &&
                        ((e.clearcoatMap.value = t.clearcoatMap),
                        r(t.clearcoatMap, e.clearcoatMapTransform)),
                      t.clearcoatRoughnessMap &&
                        ((e.clearcoatRoughnessMap.value = t.clearcoatRoughnessMap),
                        r(t.clearcoatRoughnessMap, e.clearcoatRoughnessMapTransform)),
                      t.clearcoatNormalMap &&
                        ((e.clearcoatNormalMap.value = t.clearcoatNormalMap),
                        r(t.clearcoatNormalMap, e.clearcoatNormalMapTransform),
                        e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),
                        1 === t.side && e.clearcoatNormalScale.value.negate()));
                    t.iridescence > 0 &&
                      ((e.iridescence.value = t.iridescence),
                      (e.iridescenceIOR.value = t.iridescenceIOR),
                      (e.iridescenceThicknessMinimum.value = t.iridescenceThicknessRange[0]),
                      (e.iridescenceThicknessMaximum.value = t.iridescenceThicknessRange[1]),
                      t.iridescenceMap &&
                        ((e.iridescenceMap.value = t.iridescenceMap),
                        r(t.iridescenceMap, e.iridescenceMapTransform)),
                      t.iridescenceThicknessMap &&
                        ((e.iridescenceThicknessMap.value = t.iridescenceThicknessMap),
                        r(t.iridescenceThicknessMap, e.iridescenceThicknessMapTransform)));
                    t.transmission > 0 &&
                      ((e.transmission.value = t.transmission),
                      (e.transmissionSamplerMap.value = n.texture),
                      e.transmissionSamplerSize.value.set(n.width, n.height),
                      t.transmissionMap &&
                        ((e.transmissionMap.value = t.transmissionMap),
                        r(t.transmissionMap, e.transmissionMapTransform)),
                      (e.thickness.value = t.thickness),
                      t.thicknessMap &&
                        ((e.thicknessMap.value = t.thicknessMap),
                        r(t.thicknessMap, e.thicknessMapTransform)),
                      (e.attenuationDistance.value = t.attenuationDistance),
                      e.attenuationColor.value.copy(t.attenuationColor));
                    (e.specularIntensity.value = t.specularIntensity),
                      e.specularColor.value.copy(t.specularColor),
                      t.specularColorMap &&
                        ((e.specularColorMap.value = t.specularColorMap),
                        r(t.specularColorMap, e.specularColorMapTransform));
                    t.specularIntensityMap &&
                      ((e.specularIntensityMap.value = t.specularIntensityMap),
                      r(t.specularIntensityMap, e.specularIntensityMapTransform));
                  })(e, i, o))
              : i.isMeshMatcapMaterial
                ? (n(e, i),
                  (function (e, t) {
                    t.matcap && (e.matcap.value = t.matcap);
                  })(e, i))
                : i.isMeshDepthMaterial
                  ? n(e, i)
                  : i.isMeshDistanceMaterial
                    ? (n(e, i),
                      (function (e, r) {
                        const n = t.get(r).light;
                        e.referencePosition.value.setFromMatrixPosition(n.matrixWorld),
                          (e.nearDistance.value = n.shadow.camera.near),
                          (e.farDistance.value = n.shadow.camera.far);
                      })(e, i))
                    : i.isMeshNormalMaterial
                      ? n(e, i)
                      : i.isLineBasicMaterial
                        ? ((function (e, t) {
                            e.diffuse.value.copy(t.color),
                              (e.opacity.value = t.opacity),
                              t.map && ((e.map.value = t.map), r(t.map, e.mapTransform));
                          })(e, i),
                          i.isLineDashedMaterial &&
                            (function (e, t) {
                              (e.dashSize.value = t.dashSize),
                                (e.totalSize.value = t.dashSize + t.gapSize),
                                (e.scale.value = t.scale);
                            })(e, i))
                        : i.isPointsMaterial
                          ? (function (e, t, n, i) {
                              e.diffuse.value.copy(t.color),
                                (e.opacity.value = t.opacity),
                                (e.size.value = t.size * n),
                                (e.scale.value = 0.5 * i),
                                t.map && ((e.map.value = t.map), r(t.map, e.uvTransform));
                              t.alphaMap && (e.alphaMap.value = t.alphaMap);
                              t.alphaTest > 0 && (e.alphaTest.value = t.alphaTest);
                            })(e, i, a, s)
                          : i.isSpriteMaterial
                            ? (function (e, t) {
                                e.diffuse.value.copy(t.color),
                                  (e.opacity.value = t.opacity),
                                  (e.rotation.value = t.rotation),
                                  t.map && ((e.map.value = t.map), r(t.map, e.mapTransform));
                                t.alphaMap && (e.alphaMap.value = t.alphaMap);
                                t.alphaTest > 0 && (e.alphaTest.value = t.alphaTest);
                              })(e, i)
                            : i.isShadowMaterial
                              ? (e.color.value.copy(i.color), (e.opacity.value = i.opacity))
                              : i.isShaderMaterial && (i.uniformsNeedUpdate = !1);
    },
  };
}
function WebGLUniformsGroups(e, t, r, n) {
  let i = {},
    a = {},
    s = [];
  const o = r.isWebGL2 ? e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS) : 0;
  function l(e, t, r) {
    const n = e.value;
    if (void 0 === r[t]) {
      if ('number' == typeof n) r[t] = n;
      else {
        const e = Array.isArray(n) ? n : [n],
          i = [];
        for (let t = 0; t < e.length; t++) i.push(e[t].clone());
        r[t] = i;
      }
      return !0;
    }
    if ('number' == typeof n) {
      if (r[t] !== n) return (r[t] = n), !0;
    } else {
      const e = Array.isArray(r[t]) ? r[t] : [r[t]],
        i = Array.isArray(n) ? n : [n];
      for (let t = 0; t < e.length; t++) {
        const r = e[t];
        if (!1 === r.equals(i[t])) return r.copy(i[t]), !0;
      }
    }
    return !1;
  }
  function c(e) {
    const t = { boundary: 0, storage: 0 };
    return (
      'number' == typeof e
        ? ((t.boundary = 4), (t.storage = 4))
        : e.isVector2
          ? ((t.boundary = 8), (t.storage = 8))
          : e.isVector3 || e.isColor
            ? ((t.boundary = 16), (t.storage = 12))
            : e.isVector4
              ? ((t.boundary = 16), (t.storage = 16))
              : e.isMatrix3
                ? ((t.boundary = 48), (t.storage = 48))
                : e.isMatrix4
                  ? ((t.boundary = 64), (t.storage = 64))
                  : e.isTexture
                    ? console.warn(
                        'THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.',
                      )
                    : console.warn('THREE.WebGLRenderer: Unsupported uniform value type.', e),
      t
    );
  }
  function h(t) {
    const r = t.target;
    r.removeEventListener('dispose', h);
    const n = s.indexOf(r.__bindingPointIndex);
    s.splice(n, 1), e.deleteBuffer(i[r.id]), delete i[r.id], delete a[r.id];
  }
  return {
    bind: function (e, t) {
      const r = t.program;
      n.uniformBlockBinding(e, r);
    },
    update: function (r, u) {
      let d = i[r.id];
      void 0 === d &&
        (!(function (e) {
          const t = e.uniforms;
          let r = 0;
          const n = 16;
          let i = 0;
          for (let e = 0, a = t.length; e < a; e++) {
            const a = t[e],
              s = { boundary: 0, storage: 0 },
              o = Array.isArray(a.value) ? a.value : [a.value];
            for (let e = 0, t = o.length; e < t; e++) {
              const t = c(o[e]);
              (s.boundary += t.boundary), (s.storage += t.storage);
            }
            if (
              ((a.__data = new Float32Array(s.storage / Float32Array.BYTES_PER_ELEMENT)),
              (a.__offset = r),
              e > 0)
            ) {
              i = r % n;
              const e = n - i;
              0 !== i && e - s.boundary < 0 && ((r += n - i), (a.__offset = r));
            }
            r += s.storage;
          }
          (i = r % n), i > 0 && (r += n - i);
          (e.__size = r), (e.__cache = {});
        })(r),
        (d = (function (t) {
          const r = (function () {
            for (let e = 0; e < o; e++) if (-1 === s.indexOf(e)) return s.push(e), e;
            return (
              console.error(
                'THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.',
              ),
              0
            );
          })();
          t.__bindingPointIndex = r;
          const n = e.createBuffer(),
            i = t.__size,
            a = t.usage;
          return (
            e.bindBuffer(e.UNIFORM_BUFFER, n),
            e.bufferData(e.UNIFORM_BUFFER, i, a),
            e.bindBuffer(e.UNIFORM_BUFFER, null),
            e.bindBufferBase(e.UNIFORM_BUFFER, r, n),
            n
          );
        })(r)),
        (i[r.id] = d),
        r.addEventListener('dispose', h));
      const p = u.program;
      n.updateUBOMapping(r, p);
      const m = t.render.frame;
      a[r.id] !== m &&
        (!(function (t) {
          const r = i[t.id],
            n = t.uniforms,
            a = t.__cache;
          e.bindBuffer(e.UNIFORM_BUFFER, r);
          for (let t = 0, r = n.length; t < r; t++) {
            const r = n[t];
            if (!0 === l(r, t, a)) {
              const t = r.__offset,
                n = Array.isArray(r.value) ? r.value : [r.value];
              let i = 0;
              for (let a = 0; a < n.length; a++) {
                const s = n[a],
                  o = c(s);
                'number' == typeof s
                  ? ((r.__data[0] = s), e.bufferSubData(e.UNIFORM_BUFFER, t + i, r.__data))
                  : s.isMatrix3
                    ? ((r.__data[0] = s.elements[0]),
                      (r.__data[1] = s.elements[1]),
                      (r.__data[2] = s.elements[2]),
                      (r.__data[3] = s.elements[0]),
                      (r.__data[4] = s.elements[3]),
                      (r.__data[5] = s.elements[4]),
                      (r.__data[6] = s.elements[5]),
                      (r.__data[7] = s.elements[0]),
                      (r.__data[8] = s.elements[6]),
                      (r.__data[9] = s.elements[7]),
                      (r.__data[10] = s.elements[8]),
                      (r.__data[11] = s.elements[0]))
                    : (s.toArray(r.__data, i), (i += o.storage / Float32Array.BYTES_PER_ELEMENT));
              }
              e.bufferSubData(e.UNIFORM_BUFFER, t, r.__data);
            }
          }
          e.bindBuffer(e.UNIFORM_BUFFER, null);
        })(r),
        (a[r.id] = m));
    },
    dispose: function () {
      for (const t in i) e.deleteBuffer(i[t]);
      (s = []), (i = {}), (a = {});
    },
  };
}
function createCanvasElement() {
  const e = createElementNS('canvas');
  return (e.style.display = 'block'), e;
}
class WebGLRenderer {
  constructor(e = {}) {
    const {
      canvas: t = createCanvasElement(),
      context: r = null,
      depth: n = !0,
      stencil: i = !0,
      alpha: a = !1,
      antialias: s = !1,
      premultipliedAlpha: o = !0,
      preserveDrawingBuffer: l = !1,
      powerPreference: c = 'default',
      failIfMajorPerformanceCaveat: h = !1,
    } = e;
    let u;
    (this.isWebGLRenderer = !0), (u = null !== r ? r.getContextAttributes().alpha : a);
    let d = null,
      p = null;
    const m = [],
      f = [];
    (this.domElement = t),
      (this.debug = { checkShaderErrors: !0, onShaderError: null }),
      (this.autoClear = !0),
      (this.autoClearColor = !0),
      (this.autoClearDepth = !0),
      (this.autoClearStencil = !0),
      (this.sortObjects = !0),
      (this.clippingPlanes = []),
      (this.localClippingEnabled = !1),
      (this.outputEncoding = 3e3),
      (this.useLegacyLights = !0),
      (this.toneMapping = 0),
      (this.toneMappingExposure = 1);
    const g = this;
    let _ = !1,
      v = 0,
      x = 0,
      y = null,
      M = -1,
      S = null;
    const b = new Vector4(),
      T = new Vector4();
    let E = null,
      A = t.width,
      w = t.height,
      C = 1,
      R = null,
      L = null;
    const P = new Vector4(0, 0, A, w),
      I = new Vector4(0, 0, A, w);
    let U = !1;
    const D = new Frustum();
    let B = !1,
      N = !1,
      O = null;
    const F = new Matrix4(),
      V = new Vector3(),
      G = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    function z() {
      return null === y ? C : 1;
    }
    let k,
      H,
      W,
      X,
      $,
      j,
      q,
      Y,
      Z,
      K,
      J,
      Q,
      ee,
      te,
      re,
      ne,
      ie,
      ae,
      se,
      oe,
      le,
      ce,
      he,
      ue,
      de = r;
    function pe(e, r) {
      for (let n = 0; n < e.length; n++) {
        const i = e[n],
          a = t.getContext(i, r);
        if (null !== a) return a;
      }
      return null;
    }
    try {
      const e = {
        alpha: !0,
        depth: n,
        stencil: i,
        antialias: s,
        premultipliedAlpha: o,
        preserveDrawingBuffer: l,
        powerPreference: c,
        failIfMajorPerformanceCaveat: h,
      };
      if (
        ('setAttribute' in t && t.setAttribute('data-engine', 'three.js r151'),
        t.addEventListener('webglcontextlost', ge, !1),
        t.addEventListener('webglcontextrestored', _e, !1),
        t.addEventListener('webglcontextcreationerror', ve, !1),
        null === de)
      ) {
        const t = ['webgl2', 'webgl', 'experimental-webgl'];
        if ((!0 === g.isWebGL1Renderer && t.shift(), (de = pe(t, e)), null === de))
          throw pe(t)
            ? new Error('Error creating WebGL context with your selected attributes.')
            : new Error('Error creating WebGL context.');
      }
      void 0 === de.getShaderPrecisionFormat &&
        (de.getShaderPrecisionFormat = function () {
          return { rangeMin: 1, rangeMax: 1, precision: 1 };
        });
    } catch (e) {
      throw (console.error('THREE.WebGLRenderer: ' + e.message), e);
    }
    function me() {
      (k = new WebGLExtensions(de)),
        (H = new WebGLCapabilities(de, k, e)),
        k.init(H),
        (ce = new WebGLUtils(de, k, H)),
        (W = new WebGLState(de, k, H)),
        (X = new WebGLInfo(de)),
        ($ = new WebGLProperties()),
        (j = new WebGLTextures(de, k, W, $, H, ce, X)),
        (q = new WebGLCubeMaps(g)),
        (Y = new WebGLCubeUVMaps(g)),
        (Z = new WebGLAttributes(de, H)),
        (he = new WebGLBindingStates(de, k, Z, H)),
        (K = new WebGLGeometries(de, Z, X, he)),
        (J = new WebGLObjects(de, K, Z, X)),
        (se = new WebGLMorphtargets(de, H, j)),
        (ne = new WebGLClipping($)),
        (Q = new WebGLPrograms(g, q, Y, k, H, he, ne)),
        (ee = new WebGLMaterials(g, $)),
        (te = new WebGLRenderLists()),
        (re = new WebGLRenderStates(k, H)),
        (ae = new WebGLBackground(g, q, Y, W, J, u, o)),
        (ie = new WebGLShadowMap(g, J, H)),
        (ue = new WebGLUniformsGroups(de, X, H, W)),
        (oe = new WebGLBufferRenderer(de, k, X, H)),
        (le = new WebGLIndexedBufferRenderer(de, k, X, H)),
        (X.programs = Q.programs),
        (g.capabilities = H),
        (g.extensions = k),
        (g.properties = $),
        (g.renderLists = te),
        (g.shadowMap = ie),
        (g.state = W),
        (g.info = X);
    }
    me();
    const fe = new WebXRManager(g, de);
    function ge(e) {
      e.preventDefault(), console.log('THREE.WebGLRenderer: Context Lost.'), (_ = !0);
    }
    function _e() {
      console.log('THREE.WebGLRenderer: Context Restored.'), (_ = !1);
      const e = X.autoReset,
        t = ie.enabled,
        r = ie.autoUpdate,
        n = ie.needsUpdate,
        i = ie.type;
      me(),
        (X.autoReset = e),
        (ie.enabled = t),
        (ie.autoUpdate = r),
        (ie.needsUpdate = n),
        (ie.type = i);
    }
    function ve(e) {
      console.error(
        'THREE.WebGLRenderer: A WebGL context could not be created. Reason: ',
        e.statusMessage,
      );
    }
    function xe(e) {
      const t = e.target;
      t.removeEventListener('dispose', xe),
        (function (e) {
          (function (e) {
            const t = $.get(e).programs;
            void 0 !== t &&
              (t.forEach(function (e) {
                Q.releaseProgram(e);
              }),
              e.isShaderMaterial && Q.releaseShaderCache(e));
          })(e),
            $.remove(e);
        })(t);
    }
    (this.xr = fe),
      (this.getContext = function () {
        return de;
      }),
      (this.getContextAttributes = function () {
        return de.getContextAttributes();
      }),
      (this.forceContextLoss = function () {
        const e = k.get('WEBGL_lose_context');
        e && e.loseContext();
      }),
      (this.forceContextRestore = function () {
        const e = k.get('WEBGL_lose_context');
        e && e.restoreContext();
      }),
      (this.getPixelRatio = function () {
        return C;
      }),
      (this.setPixelRatio = function (e) {
        void 0 !== e && ((C = e), this.setSize(A, w, !1));
      }),
      (this.getSize = function (e) {
        return e.set(A, w);
      }),
      (this.setSize = function (e, r, n = !0) {
        fe.isPresenting
          ? console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.")
          : ((A = e),
            (w = r),
            (t.width = Math.floor(e * C)),
            (t.height = Math.floor(r * C)),
            !0 === n && ((t.style.width = e + 'px'), (t.style.height = r + 'px')),
            this.setViewport(0, 0, e, r));
      }),
      (this.getDrawingBufferSize = function (e) {
        return e.set(A * C, w * C).floor();
      }),
      (this.setDrawingBufferSize = function (e, r, n) {
        (A = e),
          (w = r),
          (C = n),
          (t.width = Math.floor(e * n)),
          (t.height = Math.floor(r * n)),
          this.setViewport(0, 0, e, r);
      }),
      (this.getCurrentViewport = function (e) {
        return e.copy(b);
      }),
      (this.getViewport = function (e) {
        return e.copy(P);
      }),
      (this.setViewport = function (e, t, r, n) {
        e.isVector4 ? P.set(e.x, e.y, e.z, e.w) : P.set(e, t, r, n),
          W.viewport(b.copy(P).multiplyScalar(C).floor());
      }),
      (this.getScissor = function (e) {
        return e.copy(I);
      }),
      (this.setScissor = function (e, t, r, n) {
        e.isVector4 ? I.set(e.x, e.y, e.z, e.w) : I.set(e, t, r, n),
          W.scissor(T.copy(I).multiplyScalar(C).floor());
      }),
      (this.getScissorTest = function () {
        return U;
      }),
      (this.setScissorTest = function (e) {
        W.setScissorTest((U = e));
      }),
      (this.setOpaqueSort = function (e) {
        R = e;
      }),
      (this.setTransparentSort = function (e) {
        L = e;
      }),
      (this.getClearColor = function (e) {
        return e.copy(ae.getClearColor());
      }),
      (this.setClearColor = function () {
        ae.setClearColor.apply(ae, arguments);
      }),
      (this.getClearAlpha = function () {
        return ae.getClearAlpha();
      }),
      (this.setClearAlpha = function () {
        ae.setClearAlpha.apply(ae, arguments);
      }),
      (this.clear = function (e = !0, t = !0, r = !0) {
        let n = 0;
        e && (n |= de.COLOR_BUFFER_BIT),
          t && (n |= de.DEPTH_BUFFER_BIT),
          r && (n |= de.STENCIL_BUFFER_BIT),
          de.clear(n);
      }),
      (this.clearColor = function () {
        this.clear(!0, !1, !1);
      }),
      (this.clearDepth = function () {
        this.clear(!1, !0, !1);
      }),
      (this.clearStencil = function () {
        this.clear(!1, !1, !0);
      }),
      (this.dispose = function () {
        t.removeEventListener('webglcontextlost', ge, !1),
          t.removeEventListener('webglcontextrestored', _e, !1),
          t.removeEventListener('webglcontextcreationerror', ve, !1),
          te.dispose(),
          re.dispose(),
          $.dispose(),
          q.dispose(),
          Y.dispose(),
          J.dispose(),
          he.dispose(),
          ue.dispose(),
          Q.dispose(),
          fe.dispose(),
          fe.removeEventListener('sessionstart', Me),
          fe.removeEventListener('sessionend', Se),
          O && (O.dispose(), (O = null)),
          be.stop();
      }),
      (this.renderBufferDirect = function (e, t, r, n, i, a) {
        null === t && (t = G);
        const s = i.isMesh && i.matrixWorld.determinant() < 0,
          o = (function (e, t, r, n, i) {
            !0 !== t.isScene && (t = G);
            j.resetTextureUnits();
            const a = t.fog,
              s = n.isMeshStandardMaterial ? t.environment : null,
              o =
                null === y
                  ? g.outputEncoding
                  : !0 === y.isXRRenderTarget
                    ? y.texture.encoding
                    : 3e3,
              l = (n.isMeshStandardMaterial ? Y : q).get(n.envMap || s),
              c =
                !0 === n.vertexColors && !!r.attributes.color && 4 === r.attributes.color.itemSize,
              h = !!n.normalMap && !!r.attributes.tangent,
              u = !!r.morphAttributes.position,
              d = !!r.morphAttributes.normal,
              m = !!r.morphAttributes.color,
              f = n.toneMapped ? g.toneMapping : 0,
              _ = r.morphAttributes.position || r.morphAttributes.normal || r.morphAttributes.color,
              v = void 0 !== _ ? _.length : 0,
              x = $.get(n),
              b = p.state.lights;
            if (!0 === B && (!0 === N || e !== S)) {
              const t = e === S && n.id === M;
              ne.setState(n, e, t);
            }
            let T = !1;
            n.version === x.__version
              ? (x.needsLights && x.lightsStateVersion !== b.state.version) ||
                x.outputEncoding !== o ||
                (i.isInstancedMesh && !1 === x.instancing)
                ? (T = !0)
                : i.isInstancedMesh || !0 !== x.instancing
                  ? i.isSkinnedMesh && !1 === x.skinning
                    ? (T = !0)
                    : i.isSkinnedMesh || !0 !== x.skinning
                      ? x.envMap !== l || (!0 === n.fog && x.fog !== a)
                        ? (T = !0)
                        : void 0 === x.numClippingPlanes ||
                            (x.numClippingPlanes === ne.numPlanes &&
                              x.numIntersection === ne.numIntersection)
                          ? (x.vertexAlphas !== c ||
                              x.vertexTangents !== h ||
                              x.morphTargets !== u ||
                              x.morphNormals !== d ||
                              x.morphColors !== m ||
                              x.toneMapping !== f ||
                              (!0 === H.isWebGL2 && x.morphTargetsCount !== v)) &&
                            (T = !0)
                          : (T = !0)
                      : (T = !0)
                  : (T = !0)
              : ((T = !0), (x.__version = n.version));
            let E = x.currentProgram;
            !0 === T && (E = Ce(n, t, i));
            let A = !1,
              R = !1,
              L = !1;
            const P = E.getUniforms(),
              I = x.uniforms;
            W.useProgram(E.program) && ((A = !0), (R = !0), (L = !0));
            n.id !== M && ((M = n.id), (R = !0));
            if (A || S !== e) {
              if (
                (P.setValue(de, 'projectionMatrix', e.projectionMatrix),
                H.logarithmicDepthBuffer &&
                  P.setValue(de, 'logDepthBufFC', 2 / (Math.log(e.far + 1) / Math.LN2)),
                S !== e && ((S = e), (R = !0), (L = !0)),
                n.isShaderMaterial ||
                  n.isMeshPhongMaterial ||
                  n.isMeshToonMaterial ||
                  n.isMeshStandardMaterial ||
                  n.envMap)
              ) {
                const t = P.map.cameraPosition;
                void 0 !== t && t.setValue(de, V.setFromMatrixPosition(e.matrixWorld));
              }
              (n.isMeshPhongMaterial ||
                n.isMeshToonMaterial ||
                n.isMeshLambertMaterial ||
                n.isMeshBasicMaterial ||
                n.isMeshStandardMaterial ||
                n.isShaderMaterial) &&
                P.setValue(de, 'isOrthographic', !0 === e.isOrthographicCamera),
                (n.isMeshPhongMaterial ||
                  n.isMeshToonMaterial ||
                  n.isMeshLambertMaterial ||
                  n.isMeshBasicMaterial ||
                  n.isMeshStandardMaterial ||
                  n.isShaderMaterial ||
                  n.isShadowMaterial ||
                  i.isSkinnedMesh) &&
                  P.setValue(de, 'viewMatrix', e.matrixWorldInverse);
            }
            if (i.isSkinnedMesh) {
              P.setOptional(de, i, 'bindMatrix'), P.setOptional(de, i, 'bindMatrixInverse');
              const e = i.skeleton;
              e &&
                (H.floatVertexTextures
                  ? (null === e.boneTexture && e.computeBoneTexture(),
                    P.setValue(de, 'boneTexture', e.boneTexture, j),
                    P.setValue(de, 'boneTextureSize', e.boneTextureSize))
                  : console.warn(
                      'THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required.',
                    ));
            }
            const U = r.morphAttributes;
            (void 0 !== U.position ||
              void 0 !== U.normal ||
              (void 0 !== U.color && !0 === H.isWebGL2)) &&
              se.update(i, r, E);
            (R || x.receiveShadow !== i.receiveShadow) &&
              ((x.receiveShadow = i.receiveShadow),
              P.setValue(de, 'receiveShadow', i.receiveShadow));
            n.isMeshGouraudMaterial &&
              null !== n.envMap &&
              ((I.envMap.value = l),
              (I.flipEnvMap.value = l.isCubeTexture && !1 === l.isRenderTargetTexture ? -1 : 1));
            R &&
              (P.setValue(de, 'toneMappingExposure', g.toneMappingExposure),
              x.needsLights &&
                ((F = L),
                ((D = I).ambientLightColor.needsUpdate = F),
                (D.lightProbe.needsUpdate = F),
                (D.directionalLights.needsUpdate = F),
                (D.directionalLightShadows.needsUpdate = F),
                (D.pointLights.needsUpdate = F),
                (D.pointLightShadows.needsUpdate = F),
                (D.spotLights.needsUpdate = F),
                (D.spotLightShadows.needsUpdate = F),
                (D.rectAreaLights.needsUpdate = F),
                (D.hemisphereLights.needsUpdate = F)),
              a && !0 === n.fog && ee.refreshFogUniforms(I, a),
              ee.refreshMaterialUniforms(I, n, C, w, O),
              WebGLUniforms.upload(de, x.uniformsList, I, j));
            var D, F;
            n.isShaderMaterial &&
              !0 === n.uniformsNeedUpdate &&
              (WebGLUniforms.upload(de, x.uniformsList, I, j), (n.uniformsNeedUpdate = !1));
            n.isSpriteMaterial && P.setValue(de, 'center', i.center);
            if (
              (P.setValue(de, 'modelViewMatrix', i.modelViewMatrix),
              P.setValue(de, 'normalMatrix', i.normalMatrix),
              P.setValue(de, 'modelMatrix', i.matrixWorld),
              n.isShaderMaterial || n.isRawShaderMaterial)
            ) {
              const e = n.uniformsGroups;
              for (let t = 0, r = e.length; t < r; t++)
                if (H.isWebGL2) {
                  const r = e[t];
                  ue.update(r, E), ue.bind(r, E);
                } else
                  console.warn(
                    'THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.',
                  );
            }
            return E;
          })(e, t, r, n, i);
        W.setMaterial(n, s);
        let l = r.index,
          c = 1;
        !0 === n.wireframe && ((l = K.getWireframeAttribute(r)), (c = 2));
        const h = r.drawRange,
          u = r.attributes.position;
        let d = h.start * c,
          m = (h.start + h.count) * c;
        null !== a && ((d = Math.max(d, a.start * c)), (m = Math.min(m, (a.start + a.count) * c))),
          null !== l
            ? ((d = Math.max(d, 0)), (m = Math.min(m, l.count)))
            : null != u && ((d = Math.max(d, 0)), (m = Math.min(m, u.count)));
        const f = m - d;
        if (f < 0 || f === 1 / 0) return;
        let _;
        he.setup(i, n, o, r, l);
        let v = oe;
        if ((null !== l && ((_ = Z.get(l)), (v = le), v.setIndex(_)), i.isMesh))
          !0 === n.wireframe
            ? (W.setLineWidth(n.wireframeLinewidth * z()), v.setMode(de.LINES))
            : v.setMode(de.TRIANGLES);
        else if (i.isLine) {
          let e = n.linewidth;
          void 0 === e && (e = 1),
            W.setLineWidth(e * z()),
            i.isLineSegments
              ? v.setMode(de.LINES)
              : i.isLineLoop
                ? v.setMode(de.LINE_LOOP)
                : v.setMode(de.LINE_STRIP);
        } else i.isPoints ? v.setMode(de.POINTS) : i.isSprite && v.setMode(de.TRIANGLES);
        if (i.isInstancedMesh) v.renderInstances(d, f, i.count);
        else if (r.isInstancedBufferGeometry) {
          const e = void 0 !== r._maxInstanceCount ? r._maxInstanceCount : 1 / 0,
            t = Math.min(r.instanceCount, e);
          v.renderInstances(d, f, t);
        } else v.render(d, f);
      }),
      (this.compile = function (e, t) {
        function r(e, t, r) {
          !0 === e.transparent && 2 === e.side && !1 === e.forceSinglePass
            ? ((e.side = 1),
              (e.needsUpdate = !0),
              Ce(e, t, r),
              (e.side = 0),
              (e.needsUpdate = !0),
              Ce(e, t, r),
              (e.side = 2))
            : Ce(e, t, r);
        }
        (p = re.get(e)),
          p.init(),
          f.push(p),
          e.traverseVisible(function (e) {
            e.isLight &&
              e.layers.test(t.layers) &&
              (p.pushLight(e), e.castShadow && p.pushShadow(e));
          }),
          p.setupLights(g.useLegacyLights),
          e.traverse(function (t) {
            const n = t.material;
            if (n)
              if (Array.isArray(n))
                for (let i = 0; i < n.length; i++) {
                  r(n[i], e, t);
                }
              else r(n, e, t);
          }),
          f.pop(),
          (p = null);
      });
    let ye = null;
    function Me() {
      be.stop();
    }
    function Se() {
      be.start();
    }
    const be = new WebGLAnimation();
    function Te(e, t, r, n) {
      if (!1 === e.visible) return;
      if (e.layers.test(t.layers))
        if (e.isGroup) r = e.renderOrder;
        else if (e.isLOD) !0 === e.autoUpdate && e.update(t);
        else if (e.isLight) p.pushLight(e), e.castShadow && p.pushShadow(e);
        else if (e.isSprite) {
          if (!e.frustumCulled || D.intersectsSprite(e)) {
            n && V.setFromMatrixPosition(e.matrixWorld).applyMatrix4(F);
            const t = J.update(e),
              i = e.material;
            i.visible && d.push(e, t, i, r, V.z, null);
          }
        } else if (
          (e.isMesh || e.isLine || e.isPoints) &&
          (e.isSkinnedMesh &&
            e.skeleton.frame !== X.render.frame &&
            (e.skeleton.update(), (e.skeleton.frame = X.render.frame)),
          !e.frustumCulled || D.intersectsObject(e))
        ) {
          n && V.setFromMatrixPosition(e.matrixWorld).applyMatrix4(F);
          const t = J.update(e),
            i = e.material;
          if (Array.isArray(i)) {
            const n = t.groups;
            for (let a = 0, s = n.length; a < s; a++) {
              const s = n[a],
                o = i[s.materialIndex];
              o && o.visible && d.push(e, t, o, r, V.z, s);
            }
          } else i.visible && d.push(e, t, i, r, V.z, null);
        }
      const i = e.children;
      for (let e = 0, a = i.length; e < a; e++) Te(i[e], t, r, n);
    }
    function Ee(e, t, r, n) {
      const i = e.opaque,
        a = e.transmissive,
        o = e.transparent;
      p.setupLightsView(r),
        !0 === B && ne.setGlobalState(g.clippingPlanes, r),
        a.length > 0 &&
          (function (e, t, r, n) {
            if (null === O) {
              const e = H.isWebGL2;
              O = new WebGLRenderTarget(1024, 1024, {
                generateMipmaps: !0,
                type: k.has('EXT_color_buffer_half_float') ? 1016 : 1009,
                minFilter: 1008,
                samples: e && !0 === s ? 4 : 0,
              });
            }
            const i = g.getRenderTarget();
            g.setRenderTarget(O), g.clear();
            const a = g.toneMapping;
            (g.toneMapping = 0),
              Ae(e, r, n),
              j.updateMultisampleRenderTarget(O),
              j.updateRenderTargetMipmap(O);
            let o = !1;
            for (let e = 0, i = t.length; e < i; e++) {
              const i = t[e],
                a = i.object,
                s = i.geometry,
                l = i.material,
                c = i.group;
              if (2 === l.side && a.layers.test(n.layers)) {
                const e = l.side;
                (l.side = 1),
                  (l.needsUpdate = !0),
                  we(a, r, n, s, l, c),
                  (l.side = e),
                  (l.needsUpdate = !0),
                  (o = !0);
              }
            }
            !0 === o && (j.updateMultisampleRenderTarget(O), j.updateRenderTargetMipmap(O));
            g.setRenderTarget(i), (g.toneMapping = a);
          })(i, a, t, r),
        n && W.viewport(b.copy(n)),
        i.length > 0 && Ae(i, t, r),
        a.length > 0 && Ae(a, t, r),
        o.length > 0 && Ae(o, t, r),
        W.buffers.depth.setTest(!0),
        W.buffers.depth.setMask(!0),
        W.buffers.color.setMask(!0),
        W.setPolygonOffset(!1);
    }
    function Ae(e, t, r) {
      const n = !0 === t.isScene ? t.overrideMaterial : null;
      for (let i = 0, a = e.length; i < a; i++) {
        const a = e[i],
          s = a.object,
          o = a.geometry,
          l = null === n ? a.material : n,
          c = a.group;
        s.layers.test(r.layers) && we(s, t, r, o, l, c);
      }
    }
    function we(e, t, r, n, i, a) {
      e.onBeforeRender(g, t, r, n, i, a),
        e.modelViewMatrix.multiplyMatrices(r.matrixWorldInverse, e.matrixWorld),
        e.normalMatrix.getNormalMatrix(e.modelViewMatrix),
        i.onBeforeRender(g, t, r, n, e, a),
        !0 === i.transparent && 2 === i.side && !1 === i.forceSinglePass
          ? ((i.side = 1),
            (i.needsUpdate = !0),
            g.renderBufferDirect(r, t, n, i, e, a),
            (i.side = 0),
            (i.needsUpdate = !0),
            g.renderBufferDirect(r, t, n, i, e, a),
            (i.side = 2))
          : g.renderBufferDirect(r, t, n, i, e, a),
        e.onAfterRender(g, t, r, n, i, a);
    }
    function Ce(e, t, r) {
      !0 !== t.isScene && (t = G);
      const n = $.get(e),
        i = p.state.lights,
        a = p.state.shadowsArray,
        s = i.state.version,
        o = Q.getParameters(e, i.state, a, t, r),
        l = Q.getProgramCacheKey(o);
      let c = n.programs;
      (n.environment = e.isMeshStandardMaterial ? t.environment : null),
        (n.fog = t.fog),
        (n.envMap = (e.isMeshStandardMaterial ? Y : q).get(e.envMap || n.environment)),
        void 0 === c && (e.addEventListener('dispose', xe), (c = new Map()), (n.programs = c));
      let h = c.get(l);
      if (void 0 !== h) {
        if (n.currentProgram === h && n.lightsStateVersion === s) return Re(e, o), h;
      } else
        (o.uniforms = Q.getUniforms(e)),
          e.onBuild(r, o, g),
          e.onBeforeCompile(o, g),
          (h = Q.acquireProgram(o, l)),
          c.set(l, h),
          (n.uniforms = o.uniforms);
      const u = n.uniforms;
      ((e.isShaderMaterial || e.isRawShaderMaterial) && !0 !== e.clipping) ||
        (u.clippingPlanes = ne.uniform),
        Re(e, o),
        (n.needsLights = (function (e) {
          return (
            e.isMeshLambertMaterial ||
            e.isMeshToonMaterial ||
            e.isMeshPhongMaterial ||
            e.isMeshStandardMaterial ||
            e.isShadowMaterial ||
            (e.isShaderMaterial && !0 === e.lights)
          );
        })(e)),
        (n.lightsStateVersion = s),
        n.needsLights &&
          ((u.ambientLightColor.value = i.state.ambient),
          (u.lightProbe.value = i.state.probe),
          (u.directionalLights.value = i.state.directional),
          (u.directionalLightShadows.value = i.state.directionalShadow),
          (u.spotLights.value = i.state.spot),
          (u.spotLightShadows.value = i.state.spotShadow),
          (u.rectAreaLights.value = i.state.rectArea),
          (u.ltc_1.value = i.state.rectAreaLTC1),
          (u.ltc_2.value = i.state.rectAreaLTC2),
          (u.pointLights.value = i.state.point),
          (u.pointLightShadows.value = i.state.pointShadow),
          (u.hemisphereLights.value = i.state.hemi),
          (u.directionalShadowMap.value = i.state.directionalShadowMap),
          (u.directionalShadowMatrix.value = i.state.directionalShadowMatrix),
          (u.spotShadowMap.value = i.state.spotShadowMap),
          (u.spotLightMatrix.value = i.state.spotLightMatrix),
          (u.spotLightMap.value = i.state.spotLightMap),
          (u.pointShadowMap.value = i.state.pointShadowMap),
          (u.pointShadowMatrix.value = i.state.pointShadowMatrix));
      const d = h.getUniforms(),
        m = WebGLUniforms.seqWithValue(d.seq, u);
      return (n.currentProgram = h), (n.uniformsList = m), h;
    }
    function Re(e, t) {
      const r = $.get(e);
      (r.outputEncoding = t.outputEncoding),
        (r.instancing = t.instancing),
        (r.skinning = t.skinning),
        (r.morphTargets = t.morphTargets),
        (r.morphNormals = t.morphNormals),
        (r.morphColors = t.morphColors),
        (r.morphTargetsCount = t.morphTargetsCount),
        (r.numClippingPlanes = t.numClippingPlanes),
        (r.numIntersection = t.numClipIntersection),
        (r.vertexAlphas = t.vertexAlphas),
        (r.vertexTangents = t.vertexTangents),
        (r.toneMapping = t.toneMapping);
    }
    be.setAnimationLoop(function (e) {
      ye && ye(e);
    }),
      'undefined' != typeof self && be.setContext(self),
      (this.setAnimationLoop = function (e) {
        (ye = e), fe.setAnimationLoop(e), null === e ? be.stop() : be.start();
      }),
      fe.addEventListener('sessionstart', Me),
      fe.addEventListener('sessionend', Se),
      (this.render = function (e, t) {
        if (void 0 !== t && !0 !== t.isCamera)
          return void console.error(
            'THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.',
          );
        if (!0 === _) return;
        !0 === e.matrixWorldAutoUpdate && e.updateMatrixWorld(),
          null === t.parent && !0 === t.matrixWorldAutoUpdate && t.updateMatrixWorld(),
          !0 === fe.enabled &&
            !0 === fe.isPresenting &&
            (!0 === fe.cameraAutoUpdate && fe.updateCamera(t), (t = fe.getCamera())),
          !0 === e.isScene && e.onBeforeRender(g, e, t, y),
          (p = re.get(e, f.length)),
          p.init(),
          f.push(p),
          F.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse),
          D.setFromProjectionMatrix(F),
          (N = this.localClippingEnabled),
          (B = ne.init(this.clippingPlanes, N)),
          (d = te.get(e, m.length)),
          d.init(),
          m.push(d),
          Te(e, t, 0, g.sortObjects),
          d.finish(),
          !0 === g.sortObjects && d.sort(R, L),
          !0 === B && ne.beginShadows();
        const r = p.state.shadowsArray;
        if (
          (ie.render(r, e, t),
          !0 === B && ne.endShadows(),
          !0 === this.info.autoReset && this.info.reset(),
          ae.render(d, e),
          p.setupLights(g.useLegacyLights),
          t.isArrayCamera)
        ) {
          const r = t.cameras;
          for (let t = 0, n = r.length; t < n; t++) {
            const n = r[t];
            Ee(d, e, n, n.viewport);
          }
        } else Ee(d, e, t);
        null !== y && (j.updateMultisampleRenderTarget(y), j.updateRenderTargetMipmap(y)),
          !0 === e.isScene && e.onAfterRender(g, e, t),
          he.resetDefaultState(),
          (M = -1),
          (S = null),
          f.pop(),
          (p = f.length > 0 ? f[f.length - 1] : null),
          m.pop(),
          (d = m.length > 0 ? m[m.length - 1] : null);
      }),
      (this.getActiveCubeFace = function () {
        return v;
      }),
      (this.getActiveMipmapLevel = function () {
        return x;
      }),
      (this.getRenderTarget = function () {
        return y;
      }),
      (this.setRenderTargetTextures = function (e, t, r) {
        ($.get(e.texture).__webglTexture = t), ($.get(e.depthTexture).__webglTexture = r);
        const n = $.get(e);
        (n.__hasExternalTextures = !0),
          n.__hasExternalTextures &&
            ((n.__autoAllocateDepthBuffer = void 0 === r),
            n.__autoAllocateDepthBuffer ||
              (!0 === k.has('WEBGL_multisampled_render_to_texture') &&
                (console.warn(
                  'THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided',
                ),
                (n.__useRenderToTexture = !1))));
      }),
      (this.setRenderTargetFramebuffer = function (e, t) {
        const r = $.get(e);
        (r.__webglFramebuffer = t), (r.__useDefaultFramebuffer = void 0 === t);
      }),
      (this.setRenderTarget = function (e, t = 0, r = 0) {
        (y = e), (v = t), (x = r);
        let n = !0,
          i = null,
          a = !1,
          s = !1;
        if (e) {
          const r = $.get(e);
          void 0 !== r.__useDefaultFramebuffer
            ? (W.bindFramebuffer(de.FRAMEBUFFER, null), (n = !1))
            : void 0 === r.__webglFramebuffer
              ? j.setupRenderTarget(e)
              : r.__hasExternalTextures &&
                j.rebindTextures(
                  e,
                  $.get(e.texture).__webglTexture,
                  $.get(e.depthTexture).__webglTexture,
                );
          const o = e.texture;
          (o.isData3DTexture || o.isDataArrayTexture || o.isCompressedArrayTexture) && (s = !0);
          const l = $.get(e).__webglFramebuffer;
          e.isWebGLCubeRenderTarget
            ? ((i = l[t]), (a = !0))
            : (i =
                H.isWebGL2 && e.samples > 0 && !1 === j.useMultisampledRTT(e)
                  ? $.get(e).__webglMultisampledFramebuffer
                  : l),
            b.copy(e.viewport),
            T.copy(e.scissor),
            (E = e.scissorTest);
        } else b.copy(P).multiplyScalar(C).floor(), T.copy(I).multiplyScalar(C).floor(), (E = U);
        if (
          (W.bindFramebuffer(de.FRAMEBUFFER, i) && H.drawBuffers && n && W.drawBuffers(e, i),
          W.viewport(b),
          W.scissor(T),
          W.setScissorTest(E),
          a)
        ) {
          const n = $.get(e.texture);
          de.framebufferTexture2D(
            de.FRAMEBUFFER,
            de.COLOR_ATTACHMENT0,
            de.TEXTURE_CUBE_MAP_POSITIVE_X + t,
            n.__webglTexture,
            r,
          );
        } else if (s) {
          const n = $.get(e.texture),
            i = t || 0;
          de.framebufferTextureLayer(
            de.FRAMEBUFFER,
            de.COLOR_ATTACHMENT0,
            n.__webglTexture,
            r || 0,
            i,
          );
        }
        M = -1;
      }),
      (this.readRenderTargetPixels = function (e, t, r, n, i, a, s) {
        if (!e || !e.isWebGLRenderTarget)
          return void console.error(
            'THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.',
          );
        let o = $.get(e).__webglFramebuffer;
        if ((e.isWebGLCubeRenderTarget && void 0 !== s && (o = o[s]), o)) {
          W.bindFramebuffer(de.FRAMEBUFFER, o);
          try {
            const s = e.texture,
              o = s.format,
              l = s.type;
            if (
              1023 !== o &&
              ce.convert(o) !== de.getParameter(de.IMPLEMENTATION_COLOR_READ_FORMAT)
            )
              return void console.error(
                'THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.',
              );
            const c =
              1016 === l &&
              (k.has('EXT_color_buffer_half_float') ||
                (H.isWebGL2 && k.has('EXT_color_buffer_float')));
            if (
              !(
                1009 === l ||
                ce.convert(l) === de.getParameter(de.IMPLEMENTATION_COLOR_READ_TYPE) ||
                (1015 === l &&
                  (H.isWebGL2 ||
                    k.has('OES_texture_float') ||
                    k.has('WEBGL_color_buffer_float'))) ||
                c
              )
            )
              return void console.error(
                'THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.',
              );
            t >= 0 &&
              t <= e.width - n &&
              r >= 0 &&
              r <= e.height - i &&
              de.readPixels(t, r, n, i, ce.convert(o), ce.convert(l), a);
          } finally {
            const e = null !== y ? $.get(y).__webglFramebuffer : null;
            W.bindFramebuffer(de.FRAMEBUFFER, e);
          }
        }
      }),
      (this.copyFramebufferToTexture = function (e, t, r = 0) {
        const n = Math.pow(2, -r),
          i = Math.floor(t.image.width * n),
          a = Math.floor(t.image.height * n);
        j.setTexture2D(t, 0),
          de.copyTexSubImage2D(de.TEXTURE_2D, r, 0, 0, e.x, e.y, i, a),
          W.unbindTexture();
      }),
      (this.copyTextureToTexture = function (e, t, r, n = 0) {
        const i = t.image.width,
          a = t.image.height,
          s = ce.convert(r.format),
          o = ce.convert(r.type);
        j.setTexture2D(r, 0),
          de.pixelStorei(de.UNPACK_FLIP_Y_WEBGL, r.flipY),
          de.pixelStorei(de.UNPACK_PREMULTIPLY_ALPHA_WEBGL, r.premultiplyAlpha),
          de.pixelStorei(de.UNPACK_ALIGNMENT, r.unpackAlignment),
          t.isDataTexture
            ? de.texSubImage2D(de.TEXTURE_2D, n, e.x, e.y, i, a, s, o, t.image.data)
            : t.isCompressedTexture
              ? de.compressedTexSubImage2D(
                  de.TEXTURE_2D,
                  n,
                  e.x,
                  e.y,
                  t.mipmaps[0].width,
                  t.mipmaps[0].height,
                  s,
                  t.mipmaps[0].data,
                )
              : de.texSubImage2D(de.TEXTURE_2D, n, e.x, e.y, s, o, t.image),
          0 === n && r.generateMipmaps && de.generateMipmap(de.TEXTURE_2D),
          W.unbindTexture();
      }),
      (this.copyTextureToTexture3D = function (e, t, r, n, i = 0) {
        if (g.isWebGL1Renderer)
          return void console.warn(
            'THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.',
          );
        const a = e.max.x - e.min.x + 1,
          s = e.max.y - e.min.y + 1,
          o = e.max.z - e.min.z + 1,
          l = ce.convert(n.format),
          c = ce.convert(n.type);
        let h;
        if (n.isData3DTexture) j.setTexture3D(n, 0), (h = de.TEXTURE_3D);
        else {
          if (!n.isDataArrayTexture)
            return void console.warn(
              'THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.',
            );
          j.setTexture2DArray(n, 0), (h = de.TEXTURE_2D_ARRAY);
        }
        de.pixelStorei(de.UNPACK_FLIP_Y_WEBGL, n.flipY),
          de.pixelStorei(de.UNPACK_PREMULTIPLY_ALPHA_WEBGL, n.premultiplyAlpha),
          de.pixelStorei(de.UNPACK_ALIGNMENT, n.unpackAlignment);
        const u = de.getParameter(de.UNPACK_ROW_LENGTH),
          d = de.getParameter(de.UNPACK_IMAGE_HEIGHT),
          p = de.getParameter(de.UNPACK_SKIP_PIXELS),
          m = de.getParameter(de.UNPACK_SKIP_ROWS),
          f = de.getParameter(de.UNPACK_SKIP_IMAGES),
          _ = r.isCompressedTexture ? r.mipmaps[0] : r.image;
        de.pixelStorei(de.UNPACK_ROW_LENGTH, _.width),
          de.pixelStorei(de.UNPACK_IMAGE_HEIGHT, _.height),
          de.pixelStorei(de.UNPACK_SKIP_PIXELS, e.min.x),
          de.pixelStorei(de.UNPACK_SKIP_ROWS, e.min.y),
          de.pixelStorei(de.UNPACK_SKIP_IMAGES, e.min.z),
          r.isDataTexture || r.isData3DTexture
            ? de.texSubImage3D(h, i, t.x, t.y, t.z, a, s, o, l, c, _.data)
            : r.isCompressedArrayTexture
              ? (console.warn(
                  'THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture.',
                ),
                de.compressedTexSubImage3D(h, i, t.x, t.y, t.z, a, s, o, l, _.data))
              : de.texSubImage3D(h, i, t.x, t.y, t.z, a, s, o, l, c, _),
          de.pixelStorei(de.UNPACK_ROW_LENGTH, u),
          de.pixelStorei(de.UNPACK_IMAGE_HEIGHT, d),
          de.pixelStorei(de.UNPACK_SKIP_PIXELS, p),
          de.pixelStorei(de.UNPACK_SKIP_ROWS, m),
          de.pixelStorei(de.UNPACK_SKIP_IMAGES, f),
          0 === i && n.generateMipmaps && de.generateMipmap(h),
          W.unbindTexture();
      }),
      (this.initTexture = function (e) {
        e.isCubeTexture
          ? j.setTextureCube(e, 0)
          : e.isData3DTexture
            ? j.setTexture3D(e, 0)
            : e.isDataArrayTexture || e.isCompressedArrayTexture
              ? j.setTexture2DArray(e, 0)
              : j.setTexture2D(e, 0),
          W.unbindTexture();
      }),
      (this.resetState = function () {
        (v = 0), (x = 0), (y = null), W.reset(), he.reset();
      }),
      'undefined' != typeof __THREE_DEVTOOLS__ &&
        __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('observe', { detail: this }));
  }
  get physicallyCorrectLights() {
    return (
      console.warn(
        'THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead.',
      ),
      !this.useLegacyLights
    );
  }
  set physicallyCorrectLights(e) {
    console.warn(
      'THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead.',
    ),
      (this.useLegacyLights = !e);
  }
}
class WebGL1Renderer extends WebGLRenderer {}
WebGL1Renderer.prototype.isWebGL1Renderer = !0;
class FogExp2 {
  constructor(e, t = 25e-5) {
    (this.isFogExp2 = !0), (this.name = ''), (this.color = new Color(e)), (this.density = t);
  }
  clone() {
    return new FogExp2(this.color, this.density);
  }
  toJSON() {
    return { type: 'FogExp2', color: this.color.getHex(), density: this.density };
  }
}
class Fog {
  constructor(e, t = 1, r = 1e3) {
    (this.isFog = !0),
      (this.name = ''),
      (this.color = new Color(e)),
      (this.near = t),
      (this.far = r);
  }
  clone() {
    return new Fog(this.color, this.near, this.far);
  }
  toJSON() {
    return { type: 'Fog', color: this.color.getHex(), near: this.near, far: this.far };
  }
}
class Scene extends Object3D {
  constructor() {
    super(),
      (this.isScene = !0),
      (this.type = 'Scene'),
      (this.background = null),
      (this.environment = null),
      (this.fog = null),
      (this.backgroundBlurriness = 0),
      (this.backgroundIntensity = 1),
      (this.overrideMaterial = null),
      'undefined' != typeof __THREE_DEVTOOLS__ &&
        __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('observe', { detail: this }));
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      null !== e.background && (this.background = e.background.clone()),
      null !== e.environment && (this.environment = e.environment.clone()),
      null !== e.fog && (this.fog = e.fog.clone()),
      (this.backgroundBlurriness = e.backgroundBlurriness),
      (this.backgroundIntensity = e.backgroundIntensity),
      null !== e.overrideMaterial && (this.overrideMaterial = e.overrideMaterial.clone()),
      (this.matrixAutoUpdate = e.matrixAutoUpdate),
      this
    );
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return (
      null !== this.fog && (t.object.fog = this.fog.toJSON()),
      this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness),
      1 !== this.backgroundIntensity && (t.object.backgroundIntensity = this.backgroundIntensity),
      t
    );
  }
  get autoUpdate() {
    return (
      console.warn('THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144.'),
      this.matrixWorldAutoUpdate
    );
  }
  set autoUpdate(e) {
    console.warn('THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144.'),
      (this.matrixWorldAutoUpdate = e);
  }
}
class InterleavedBuffer {
  constructor(e, t) {
    (this.isInterleavedBuffer = !0),
      (this.array = e),
      (this.stride = t),
      (this.count = void 0 !== e ? e.length / t : 0),
      (this.usage = 35044),
      (this.updateRange = { offset: 0, count: -1 }),
      (this.version = 0),
      (this.uuid = generateUUID());
  }
  onUploadCallback() {}
  set needsUpdate(e) {
    !0 === e && this.version++;
  }
  setUsage(e) {
    return (this.usage = e), this;
  }
  copy(e) {
    return (
      (this.array = new e.array.constructor(e.array)),
      (this.count = e.count),
      (this.stride = e.stride),
      (this.usage = e.usage),
      this
    );
  }
  copyAt(e, t, r) {
    (e *= this.stride), (r *= t.stride);
    for (let n = 0, i = this.stride; n < i; n++) this.array[e + n] = t.array[r + n];
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  clone(e) {
    void 0 === e.arrayBuffers && (e.arrayBuffers = {}),
      void 0 === this.array.buffer._uuid && (this.array.buffer._uuid = generateUUID()),
      void 0 === e.arrayBuffers[this.array.buffer._uuid] &&
        (e.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer);
    const t = new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),
      r = new this.constructor(t, this.stride);
    return r.setUsage(this.usage), r;
  }
  onUpload(e) {
    return (this.onUploadCallback = e), this;
  }
  toJSON(e) {
    return (
      void 0 === e.arrayBuffers && (e.arrayBuffers = {}),
      void 0 === this.array.buffer._uuid && (this.array.buffer._uuid = generateUUID()),
      void 0 === e.arrayBuffers[this.array.buffer._uuid] &&
        (e.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer))),
      {
        uuid: this.uuid,
        buffer: this.array.buffer._uuid,
        type: this.array.constructor.name,
        stride: this.stride,
      }
    );
  }
}
const _vector$5 = new Vector3();
class InterleavedBufferAttribute {
  constructor(e, t, r, n = !1) {
    (this.isInterleavedBufferAttribute = !0),
      (this.name = ''),
      (this.data = e),
      (this.itemSize = t),
      (this.offset = r),
      (this.normalized = n);
  }
  get count() {
    return this.data.count;
  }
  get array() {
    return this.data.array;
  }
  set needsUpdate(e) {
    this.data.needsUpdate = e;
  }
  applyMatrix4(e) {
    for (let t = 0, r = this.data.count; t < r; t++)
      _vector$5.fromBufferAttribute(this, t),
        _vector$5.applyMatrix4(e),
        this.setXYZ(t, _vector$5.x, _vector$5.y, _vector$5.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, r = this.count; t < r; t++)
      _vector$5.fromBufferAttribute(this, t),
        _vector$5.applyNormalMatrix(e),
        this.setXYZ(t, _vector$5.x, _vector$5.y, _vector$5.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, r = this.count; t < r; t++)
      _vector$5.fromBufferAttribute(this, t),
        _vector$5.transformDirection(e),
        this.setXYZ(t, _vector$5.x, _vector$5.y, _vector$5.z);
    return this;
  }
  setX(e, t) {
    return (
      this.normalized && (t = normalize(t, this.array)),
      (this.data.array[e * this.data.stride + this.offset] = t),
      this
    );
  }
  setY(e, t) {
    return (
      this.normalized && (t = normalize(t, this.array)),
      (this.data.array[e * this.data.stride + this.offset + 1] = t),
      this
    );
  }
  setZ(e, t) {
    return (
      this.normalized && (t = normalize(t, this.array)),
      (this.data.array[e * this.data.stride + this.offset + 2] = t),
      this
    );
  }
  setW(e, t) {
    return (
      this.normalized && (t = normalize(t, this.array)),
      (this.data.array[e * this.data.stride + this.offset + 3] = t),
      this
    );
  }
  getX(e) {
    let t = this.data.array[e * this.data.stride + this.offset];
    return this.normalized && (t = denormalize(t, this.array)), t;
  }
  getY(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 1];
    return this.normalized && (t = denormalize(t, this.array)), t;
  }
  getZ(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 2];
    return this.normalized && (t = denormalize(t, this.array)), t;
  }
  getW(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 3];
    return this.normalized && (t = denormalize(t, this.array)), t;
  }
  setXY(e, t, r) {
    return (
      (e = e * this.data.stride + this.offset),
      this.normalized && ((t = normalize(t, this.array)), (r = normalize(r, this.array))),
      (this.data.array[e + 0] = t),
      (this.data.array[e + 1] = r),
      this
    );
  }
  setXYZ(e, t, r, n) {
    return (
      (e = e * this.data.stride + this.offset),
      this.normalized &&
        ((t = normalize(t, this.array)),
        (r = normalize(r, this.array)),
        (n = normalize(n, this.array))),
      (this.data.array[e + 0] = t),
      (this.data.array[e + 1] = r),
      (this.data.array[e + 2] = n),
      this
    );
  }
  setXYZW(e, t, r, n, i) {
    return (
      (e = e * this.data.stride + this.offset),
      this.normalized &&
        ((t = normalize(t, this.array)),
        (r = normalize(r, this.array)),
        (n = normalize(n, this.array)),
        (i = normalize(i, this.array))),
      (this.data.array[e + 0] = t),
      (this.data.array[e + 1] = r),
      (this.data.array[e + 2] = n),
      (this.data.array[e + 3] = i),
      this
    );
  }
  clone(e) {
    if (void 0 === e) {
      console.log(
        'THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.',
      );
      const e = [];
      for (let t = 0; t < this.count; t++) {
        const r = t * this.data.stride + this.offset;
        for (let t = 0; t < this.itemSize; t++) e.push(this.data.array[r + t]);
      }
      return new BufferAttribute(new this.array.constructor(e), this.itemSize, this.normalized);
    }
    return (
      void 0 === e.interleavedBuffers && (e.interleavedBuffers = {}),
      void 0 === e.interleavedBuffers[this.data.uuid] &&
        (e.interleavedBuffers[this.data.uuid] = this.data.clone(e)),
      new InterleavedBufferAttribute(
        e.interleavedBuffers[this.data.uuid],
        this.itemSize,
        this.offset,
        this.normalized,
      )
    );
  }
  toJSON(e) {
    if (void 0 === e) {
      console.log(
        'THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.',
      );
      const e = [];
      for (let t = 0; t < this.count; t++) {
        const r = t * this.data.stride + this.offset;
        for (let t = 0; t < this.itemSize; t++) e.push(this.data.array[r + t]);
      }
      return {
        itemSize: this.itemSize,
        type: this.array.constructor.name,
        array: e,
        normalized: this.normalized,
      };
    }
    return (
      void 0 === e.interleavedBuffers && (e.interleavedBuffers = {}),
      void 0 === e.interleavedBuffers[this.data.uuid] &&
        (e.interleavedBuffers[this.data.uuid] = this.data.toJSON(e)),
      {
        isInterleavedBufferAttribute: !0,
        itemSize: this.itemSize,
        data: this.data.uuid,
        offset: this.offset,
        normalized: this.normalized,
      }
    );
  }
}
class SpriteMaterial extends Material {
  constructor(e) {
    super(),
      (this.isSpriteMaterial = !0),
      (this.type = 'SpriteMaterial'),
      (this.color = new Color(16777215)),
      (this.map = null),
      (this.alphaMap = null),
      (this.rotation = 0),
      (this.sizeAttenuation = !0),
      (this.transparent = !0),
      (this.fog = !0),
      this.setValues(e);
  }
  copy(e) {
    return (
      super.copy(e),
      this.color.copy(e.color),
      (this.map = e.map),
      (this.alphaMap = e.alphaMap),
      (this.rotation = e.rotation),
      (this.sizeAttenuation = e.sizeAttenuation),
      (this.fog = e.fog),
      this
    );
  }
}
let _geometry;
const _intersectPoint = new Vector3(),
  _worldScale = new Vector3(),
  _mvPosition = new Vector3(),
  _alignedPosition = new Vector2(),
  _rotatedPosition = new Vector2(),
  _viewWorldMatrix = new Matrix4(),
  _vA = new Vector3(),
  _vB = new Vector3(),
  _vC = new Vector3(),
  _uvA = new Vector2(),
  _uvB = new Vector2(),
  _uvC = new Vector2();
class Sprite extends Object3D {
  constructor(e) {
    if ((super(), (this.isSprite = !0), (this.type = 'Sprite'), void 0 === _geometry)) {
      _geometry = new BufferGeometry();
      const e = new Float32Array([
          -0.5, -0.5, 0, 0, 0, 0.5, -0.5, 0, 1, 0, 0.5, 0.5, 0, 1, 1, -0.5, 0.5, 0, 0, 1,
        ]),
        t = new InterleavedBuffer(e, 5);
      _geometry.setIndex([0, 1, 2, 0, 2, 3]),
        _geometry.setAttribute('position', new InterleavedBufferAttribute(t, 3, 0, !1)),
        _geometry.setAttribute('uv', new InterleavedBufferAttribute(t, 2, 3, !1));
    }
    (this.geometry = _geometry),
      (this.material = void 0 !== e ? e : new SpriteMaterial()),
      (this.center = new Vector2(0.5, 0.5));
  }
  raycast(e, t) {
    null === e.camera &&
      console.error(
        'THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.',
      ),
      _worldScale.setFromMatrixScale(this.matrixWorld),
      _viewWorldMatrix.copy(e.camera.matrixWorld),
      this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse, this.matrixWorld),
      _mvPosition.setFromMatrixPosition(this.modelViewMatrix),
      e.camera.isPerspectiveCamera &&
        !1 === this.material.sizeAttenuation &&
        _worldScale.multiplyScalar(-_mvPosition.z);
    const r = this.material.rotation;
    let n, i;
    0 !== r && ((i = Math.cos(r)), (n = Math.sin(r)));
    const a = this.center;
    transformVertex(_vA.set(-0.5, -0.5, 0), _mvPosition, a, _worldScale, n, i),
      transformVertex(_vB.set(0.5, -0.5, 0), _mvPosition, a, _worldScale, n, i),
      transformVertex(_vC.set(0.5, 0.5, 0), _mvPosition, a, _worldScale, n, i),
      _uvA.set(0, 0),
      _uvB.set(1, 0),
      _uvC.set(1, 1);
    let s = e.ray.intersectTriangle(_vA, _vB, _vC, !1, _intersectPoint);
    if (
      null === s &&
      (transformVertex(_vB.set(-0.5, 0.5, 0), _mvPosition, a, _worldScale, n, i),
      _uvB.set(0, 1),
      (s = e.ray.intersectTriangle(_vA, _vC, _vB, !1, _intersectPoint)),
      null === s)
    )
      return;
    const o = e.ray.origin.distanceTo(_intersectPoint);
    o < e.near ||
      o > e.far ||
      t.push({
        distance: o,
        point: _intersectPoint.clone(),
        uv: Triangle.getInterpolation(
          _intersectPoint,
          _vA,
          _vB,
          _vC,
          _uvA,
          _uvB,
          _uvC,
          new Vector2(),
        ),
        face: null,
        object: this,
      });
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      void 0 !== e.center && this.center.copy(e.center),
      (this.material = e.material),
      this
    );
  }
}
function transformVertex(e, t, r, n, i, a) {
  _alignedPosition.subVectors(e, r).addScalar(0.5).multiply(n),
    void 0 !== i
      ? ((_rotatedPosition.x = a * _alignedPosition.x - i * _alignedPosition.y),
        (_rotatedPosition.y = i * _alignedPosition.x + a * _alignedPosition.y))
      : _rotatedPosition.copy(_alignedPosition),
    e.copy(t),
    (e.x += _rotatedPosition.x),
    (e.y += _rotatedPosition.y),
    e.applyMatrix4(_viewWorldMatrix);
}
const _v1$2 = new Vector3(),
  _v2$1 = new Vector3();
class LOD extends Object3D {
  constructor() {
    super(),
      (this._currentLevel = 0),
      (this.type = 'LOD'),
      Object.defineProperties(this, {
        levels: { enumerable: !0, value: [] },
        isLOD: { value: !0 },
      }),
      (this.autoUpdate = !0);
  }
  copy(e) {
    super.copy(e, !1);
    const t = e.levels;
    for (let e = 0, r = t.length; e < r; e++) {
      const r = t[e];
      this.addLevel(r.object.clone(), r.distance, r.hysteresis);
    }
    return (this.autoUpdate = e.autoUpdate), this;
  }
  addLevel(e, t = 0, r = 0) {
    t = Math.abs(t);
    const n = this.levels;
    let i;
    for (i = 0; i < n.length && !(t < n[i].distance); i++);
    return n.splice(i, 0, { distance: t, hysteresis: r, object: e }), this.add(e), this;
  }
  getCurrentLevel() {
    return this._currentLevel;
  }
  getObjectForDistance(e) {
    const t = this.levels;
    if (t.length > 0) {
      let r, n;
      for (r = 1, n = t.length; r < n; r++) {
        let n = t[r].distance;
        if ((t[r].object.visible && (n -= n * t[r].hysteresis), e < n)) break;
      }
      return t[r - 1].object;
    }
    return null;
  }
  raycast(e, t) {
    if (this.levels.length > 0) {
      _v1$2.setFromMatrixPosition(this.matrixWorld);
      const r = e.ray.origin.distanceTo(_v1$2);
      this.getObjectForDistance(r).raycast(e, t);
    }
  }
  update(e) {
    const t = this.levels;
    if (t.length > 1) {
      _v1$2.setFromMatrixPosition(e.matrixWorld), _v2$1.setFromMatrixPosition(this.matrixWorld);
      const r = _v1$2.distanceTo(_v2$1) / e.zoom;
      let n, i;
      for (t[0].object.visible = !0, n = 1, i = t.length; n < i; n++) {
        let e = t[n].distance;
        if ((t[n].object.visible && (e -= e * t[n].hysteresis), !(r >= e))) break;
        (t[n - 1].object.visible = !1), (t[n].object.visible = !0);
      }
      for (this._currentLevel = n - 1; n < i; n++) t[n].object.visible = !1;
    }
  }
  toJSON(e) {
    const t = super.toJSON(e);
    !1 === this.autoUpdate && (t.object.autoUpdate = !1), (t.object.levels = []);
    const r = this.levels;
    for (let e = 0, n = r.length; e < n; e++) {
      const n = r[e];
      t.object.levels.push({
        object: n.object.uuid,
        distance: n.distance,
        hysteresis: n.hysteresis,
      });
    }
    return t;
  }
}
const _basePosition = new Vector3(),
  _skinIndex = new Vector4(),
  _skinWeight = new Vector4(),
  _vector3 = new Vector3(),
  _matrix4 = new Matrix4(),
  _vertex = new Vector3();
class SkinnedMesh extends Mesh {
  constructor(e, t) {
    super(e, t),
      (this.isSkinnedMesh = !0),
      (this.type = 'SkinnedMesh'),
      (this.bindMode = 'attached'),
      (this.bindMatrix = new Matrix4()),
      (this.bindMatrixInverse = new Matrix4()),
      (this.boundingBox = null),
      (this.boundingSphere = null);
  }
  computeBoundingBox() {
    const e = this.geometry;
    null === this.boundingBox && (this.boundingBox = new Box3()), this.boundingBox.makeEmpty();
    const t = e.getAttribute('position');
    for (let e = 0; e < t.count; e++)
      _vertex.fromBufferAttribute(t, e),
        this.applyBoneTransform(e, _vertex),
        this.boundingBox.expandByPoint(_vertex);
  }
  computeBoundingSphere() {
    const e = this.geometry;
    null === this.boundingSphere && (this.boundingSphere = new Sphere()),
      this.boundingSphere.makeEmpty();
    const t = e.getAttribute('position');
    for (let e = 0; e < t.count; e++)
      _vertex.fromBufferAttribute(t, e),
        this.applyBoneTransform(e, _vertex),
        this.boundingSphere.expandByPoint(_vertex);
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      (this.bindMode = e.bindMode),
      this.bindMatrix.copy(e.bindMatrix),
      this.bindMatrixInverse.copy(e.bindMatrixInverse),
      (this.skeleton = e.skeleton),
      this
    );
  }
  bind(e, t) {
    (this.skeleton = e),
      void 0 === t &&
        (this.updateMatrixWorld(!0), this.skeleton.calculateInverses(), (t = this.matrixWorld)),
      this.bindMatrix.copy(t),
      this.bindMatrixInverse.copy(t).invert();
  }
  pose() {
    this.skeleton.pose();
  }
  normalizeSkinWeights() {
    const e = new Vector4(),
      t = this.geometry.attributes.skinWeight;
    for (let r = 0, n = t.count; r < n; r++) {
      e.fromBufferAttribute(t, r);
      const n = 1 / e.manhattanLength();
      n !== 1 / 0 ? e.multiplyScalar(n) : e.set(1, 0, 0, 0), t.setXYZW(r, e.x, e.y, e.z, e.w);
    }
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e),
      'attached' === this.bindMode
        ? this.bindMatrixInverse.copy(this.matrixWorld).invert()
        : 'detached' === this.bindMode
          ? this.bindMatrixInverse.copy(this.bindMatrix).invert()
          : console.warn('THREE.SkinnedMesh: Unrecognized bindMode: ' + this.bindMode);
  }
  applyBoneTransform(e, t) {
    const r = this.skeleton,
      n = this.geometry;
    _skinIndex.fromBufferAttribute(n.attributes.skinIndex, e),
      _skinWeight.fromBufferAttribute(n.attributes.skinWeight, e),
      _basePosition.copy(t).applyMatrix4(this.bindMatrix),
      t.set(0, 0, 0);
    for (let e = 0; e < 4; e++) {
      const n = _skinWeight.getComponent(e);
      if (0 !== n) {
        const i = _skinIndex.getComponent(e);
        _matrix4.multiplyMatrices(r.bones[i].matrixWorld, r.boneInverses[i]),
          t.addScaledVector(_vector3.copy(_basePosition).applyMatrix4(_matrix4), n);
      }
    }
    return t.applyMatrix4(this.bindMatrixInverse);
  }
  boneTransform(e, t) {
    return (
      console.warn(
        'THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151.',
      ),
      this.applyBoneTransform(e, t)
    );
  }
}
class Bone extends Object3D {
  constructor() {
    super(), (this.isBone = !0), (this.type = 'Bone');
  }
}
class DataTexture extends Texture {
  constructor(e = null, t = 1, r = 1, n, i, a, s, o, l = 1003, c = 1003, h, u) {
    super(null, a, s, o, l, c, n, i, h, u),
      (this.isDataTexture = !0),
      (this.image = { data: e, width: t, height: r }),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1);
  }
}
const _offsetMatrix = new Matrix4(),
  _identityMatrix = new Matrix4();
class Skeleton {
  constructor(e = [], t = []) {
    (this.uuid = generateUUID()),
      (this.bones = e.slice(0)),
      (this.boneInverses = t),
      (this.boneMatrices = null),
      (this.boneTexture = null),
      (this.boneTextureSize = 0),
      (this.frame = -1),
      this.init();
  }
  init() {
    const e = this.bones,
      t = this.boneInverses;
    if (((this.boneMatrices = new Float32Array(16 * e.length)), 0 === t.length))
      this.calculateInverses();
    else if (e.length !== t.length) {
      console.warn(
        'THREE.Skeleton: Number of inverse bone matrices does not match amount of bones.',
      ),
        (this.boneInverses = []);
      for (let e = 0, t = this.bones.length; e < t; e++) this.boneInverses.push(new Matrix4());
    }
  }
  calculateInverses() {
    this.boneInverses.length = 0;
    for (let e = 0, t = this.bones.length; e < t; e++) {
      const t = new Matrix4();
      this.bones[e] && t.copy(this.bones[e].matrixWorld).invert(), this.boneInverses.push(t);
    }
  }
  pose() {
    for (let e = 0, t = this.bones.length; e < t; e++) {
      const t = this.bones[e];
      t && t.matrixWorld.copy(this.boneInverses[e]).invert();
    }
    for (let e = 0, t = this.bones.length; e < t; e++) {
      const t = this.bones[e];
      t &&
        (t.parent && t.parent.isBone
          ? (t.matrix.copy(t.parent.matrixWorld).invert(), t.matrix.multiply(t.matrixWorld))
          : t.matrix.copy(t.matrixWorld),
        t.matrix.decompose(t.position, t.quaternion, t.scale));
    }
  }
  update() {
    const e = this.bones,
      t = this.boneInverses,
      r = this.boneMatrices,
      n = this.boneTexture;
    for (let n = 0, i = e.length; n < i; n++) {
      const i = e[n] ? e[n].matrixWorld : _identityMatrix;
      _offsetMatrix.multiplyMatrices(i, t[n]), _offsetMatrix.toArray(r, 16 * n);
    }
    null !== n && (n.needsUpdate = !0);
  }
  clone() {
    return new Skeleton(this.bones, this.boneInverses);
  }
  computeBoneTexture() {
    let e = Math.sqrt(4 * this.bones.length);
    (e = ceilPowerOfTwo(e)), (e = Math.max(e, 4));
    const t = new Float32Array(e * e * 4);
    t.set(this.boneMatrices);
    const r = new DataTexture(t, e, e, 1023, 1015);
    return (
      (r.needsUpdate = !0),
      (this.boneMatrices = t),
      (this.boneTexture = r),
      (this.boneTextureSize = e),
      this
    );
  }
  getBoneByName(e) {
    for (let t = 0, r = this.bones.length; t < r; t++) {
      const r = this.bones[t];
      if (r.name === e) return r;
    }
  }
  dispose() {
    null !== this.boneTexture && (this.boneTexture.dispose(), (this.boneTexture = null));
  }
  fromJSON(e, t) {
    this.uuid = e.uuid;
    for (let r = 0, n = e.bones.length; r < n; r++) {
      const n = e.bones[r];
      let i = t[n];
      void 0 === i &&
        (console.warn('THREE.Skeleton: No bone found with UUID:', n), (i = new Bone())),
        this.bones.push(i),
        this.boneInverses.push(new Matrix4().fromArray(e.boneInverses[r]));
    }
    return this.init(), this;
  }
  toJSON() {
    const e = {
      metadata: { version: 4.5, type: 'Skeleton', generator: 'Skeleton.toJSON' },
      bones: [],
      boneInverses: [],
    };
    e.uuid = this.uuid;
    const t = this.bones,
      r = this.boneInverses;
    for (let n = 0, i = t.length; n < i; n++) {
      const i = t[n];
      e.bones.push(i.uuid);
      const a = r[n];
      e.boneInverses.push(a.toArray());
    }
    return e;
  }
}
class InstancedBufferAttribute extends BufferAttribute {
  constructor(e, t, r, n = 1) {
    super(e, t, r), (this.isInstancedBufferAttribute = !0), (this.meshPerAttribute = n);
  }
  copy(e) {
    return super.copy(e), (this.meshPerAttribute = e.meshPerAttribute), this;
  }
  toJSON() {
    const e = super.toJSON();
    return (e.meshPerAttribute = this.meshPerAttribute), (e.isInstancedBufferAttribute = !0), e;
  }
}
const _instanceLocalMatrix = new Matrix4(),
  _instanceWorldMatrix = new Matrix4(),
  _instanceIntersects = [],
  _box3 = new Box3(),
  _identity = new Matrix4(),
  _mesh = new Mesh(),
  _sphere$2 = new Sphere();
class InstancedMesh extends Mesh {
  constructor(e, t, r) {
    super(e, t),
      (this.isInstancedMesh = !0),
      (this.instanceMatrix = new InstancedBufferAttribute(new Float32Array(16 * r), 16)),
      (this.instanceColor = null),
      (this.count = r),
      (this.boundingBox = null),
      (this.boundingSphere = null);
    for (let e = 0; e < r; e++) this.setMatrixAt(e, _identity);
  }
  computeBoundingBox() {
    const e = this.geometry,
      t = this.count;
    null === this.boundingBox && (this.boundingBox = new Box3()),
      null === e.boundingBox && e.computeBoundingBox(),
      this.boundingBox.makeEmpty();
    for (let r = 0; r < t; r++)
      this.getMatrixAt(r, _instanceLocalMatrix),
        _box3.copy(e.boundingBox).applyMatrix4(_instanceLocalMatrix),
        this.boundingBox.union(_box3);
  }
  computeBoundingSphere() {
    const e = this.geometry,
      t = this.count;
    null === this.boundingSphere && (this.boundingSphere = new Sphere()),
      null === e.boundingSphere && e.computeBoundingSphere(),
      this.boundingSphere.makeEmpty();
    for (let r = 0; r < t; r++)
      this.getMatrixAt(r, _instanceLocalMatrix),
        _sphere$2.copy(e.boundingSphere).applyMatrix4(_instanceLocalMatrix),
        this.boundingSphere.union(_sphere$2);
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      this.instanceMatrix.copy(e.instanceMatrix),
      null !== e.instanceColor && (this.instanceColor = e.instanceColor.clone()),
      (this.count = e.count),
      this
    );
  }
  getColorAt(e, t) {
    t.fromArray(this.instanceColor.array, 3 * e);
  }
  getMatrixAt(e, t) {
    t.fromArray(this.instanceMatrix.array, 16 * e);
  }
  raycast(e, t) {
    const r = this.matrixWorld,
      n = this.count;
    if (
      ((_mesh.geometry = this.geometry),
      (_mesh.material = this.material),
      void 0 !== _mesh.material &&
        (null === this.boundingSphere && this.computeBoundingSphere(),
        _sphere$2.copy(this.boundingSphere),
        _sphere$2.applyMatrix4(r),
        !1 !== e.ray.intersectsSphere(_sphere$2)))
    )
      for (let i = 0; i < n; i++) {
        this.getMatrixAt(i, _instanceLocalMatrix),
          _instanceWorldMatrix.multiplyMatrices(r, _instanceLocalMatrix),
          (_mesh.matrixWorld = _instanceWorldMatrix),
          _mesh.raycast(e, _instanceIntersects);
        for (let e = 0, r = _instanceIntersects.length; e < r; e++) {
          const r = _instanceIntersects[e];
          (r.instanceId = i), (r.object = this), t.push(r);
        }
        _instanceIntersects.length = 0;
      }
  }
  setColorAt(e, t) {
    null === this.instanceColor &&
      (this.instanceColor = new InstancedBufferAttribute(
        new Float32Array(3 * this.instanceMatrix.count),
        3,
      )),
      t.toArray(this.instanceColor.array, 3 * e);
  }
  setMatrixAt(e, t) {
    t.toArray(this.instanceMatrix.array, 16 * e);
  }
  updateMorphTargets() {}
  dispose() {
    this.dispatchEvent({ type: 'dispose' });
  }
}
class LineBasicMaterial extends Material {
  constructor(e) {
    super(),
      (this.isLineBasicMaterial = !0),
      (this.type = 'LineBasicMaterial'),
      (this.color = new Color(16777215)),
      (this.map = null),
      (this.linewidth = 1),
      (this.linecap = 'round'),
      (this.linejoin = 'round'),
      (this.fog = !0),
      this.setValues(e);
  }
  copy(e) {
    return (
      super.copy(e),
      this.color.copy(e.color),
      (this.map = e.map),
      (this.linewidth = e.linewidth),
      (this.linecap = e.linecap),
      (this.linejoin = e.linejoin),
      (this.fog = e.fog),
      this
    );
  }
}
const _start$1 = new Vector3(),
  _end$1 = new Vector3(),
  _inverseMatrix$1 = new Matrix4(),
  _ray$1 = new Ray(),
  _sphere$1 = new Sphere();
class Line extends Object3D {
  constructor(e = new BufferGeometry(), t = new LineBasicMaterial()) {
    super(),
      (this.isLine = !0),
      (this.type = 'Line'),
      (this.geometry = e),
      (this.material = t),
      this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), (this.material = e.material), (this.geometry = e.geometry), this;
  }
  computeLineDistances() {
    const e = this.geometry;
    if (null === e.index) {
      const t = e.attributes.position,
        r = [0];
      for (let e = 1, n = t.count; e < n; e++)
        _start$1.fromBufferAttribute(t, e - 1),
          _end$1.fromBufferAttribute(t, e),
          (r[e] = r[e - 1]),
          (r[e] += _start$1.distanceTo(_end$1));
      e.setAttribute('lineDistance', new Float32BufferAttribute(r, 1));
    } else
      console.warn(
        'THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.',
      );
    return this;
  }
  raycast(e, t) {
    const r = this.geometry,
      n = this.matrixWorld,
      i = e.params.Line.threshold,
      a = r.drawRange;
    if (
      (null === r.boundingSphere && r.computeBoundingSphere(),
      _sphere$1.copy(r.boundingSphere),
      _sphere$1.applyMatrix4(n),
      (_sphere$1.radius += i),
      !1 === e.ray.intersectsSphere(_sphere$1))
    )
      return;
    _inverseMatrix$1.copy(n).invert(), _ray$1.copy(e.ray).applyMatrix4(_inverseMatrix$1);
    const s = i / ((this.scale.x + this.scale.y + this.scale.z) / 3),
      o = s * s,
      l = new Vector3(),
      c = new Vector3(),
      h = new Vector3(),
      u = new Vector3(),
      d = this.isLineSegments ? 2 : 1,
      p = r.index,
      m = r.attributes.position;
    if (null !== p) {
      for (
        let r = Math.max(0, a.start), n = Math.min(p.count, a.start + a.count) - 1;
        r < n;
        r += d
      ) {
        const n = p.getX(r),
          i = p.getX(r + 1);
        l.fromBufferAttribute(m, n), c.fromBufferAttribute(m, i);
        if (_ray$1.distanceSqToSegment(l, c, u, h) > o) continue;
        u.applyMatrix4(this.matrixWorld);
        const a = e.ray.origin.distanceTo(u);
        a < e.near ||
          a > e.far ||
          t.push({
            distance: a,
            point: h.clone().applyMatrix4(this.matrixWorld),
            index: r,
            face: null,
            faceIndex: null,
            object: this,
          });
      }
    } else {
      for (
        let r = Math.max(0, a.start), n = Math.min(m.count, a.start + a.count) - 1;
        r < n;
        r += d
      ) {
        l.fromBufferAttribute(m, r), c.fromBufferAttribute(m, r + 1);
        if (_ray$1.distanceSqToSegment(l, c, u, h) > o) continue;
        u.applyMatrix4(this.matrixWorld);
        const n = e.ray.origin.distanceTo(u);
        n < e.near ||
          n > e.far ||
          t.push({
            distance: n,
            point: h.clone().applyMatrix4(this.matrixWorld),
            index: r,
            face: null,
            faceIndex: null,
            object: this,
          });
      }
    }
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes,
      t = Object.keys(e);
    if (t.length > 0) {
      const r = e[t[0]];
      if (void 0 !== r) {
        (this.morphTargetInfluences = []), (this.morphTargetDictionary = {});
        for (let e = 0, t = r.length; e < t; e++) {
          const t = r[e].name || String(e);
          this.morphTargetInfluences.push(0), (this.morphTargetDictionary[t] = e);
        }
      }
    }
  }
}
const _start = new Vector3(),
  _end = new Vector3();
class LineSegments extends Line {
  constructor(e, t) {
    super(e, t), (this.isLineSegments = !0), (this.type = 'LineSegments');
  }
  computeLineDistances() {
    const e = this.geometry;
    if (null === e.index) {
      const t = e.attributes.position,
        r = [];
      for (let e = 0, n = t.count; e < n; e += 2)
        _start.fromBufferAttribute(t, e),
          _end.fromBufferAttribute(t, e + 1),
          (r[e] = 0 === e ? 0 : r[e - 1]),
          (r[e + 1] = r[e] + _start.distanceTo(_end));
      e.setAttribute('lineDistance', new Float32BufferAttribute(r, 1));
    } else
      console.warn(
        'THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.',
      );
    return this;
  }
}
class LineLoop extends Line {
  constructor(e, t) {
    super(e, t), (this.isLineLoop = !0), (this.type = 'LineLoop');
  }
}
class PointsMaterial extends Material {
  constructor(e) {
    super(),
      (this.isPointsMaterial = !0),
      (this.type = 'PointsMaterial'),
      (this.color = new Color(16777215)),
      (this.map = null),
      (this.alphaMap = null),
      (this.size = 1),
      (this.sizeAttenuation = !0),
      (this.fog = !0),
      this.setValues(e);
  }
  copy(e) {
    return (
      super.copy(e),
      this.color.copy(e.color),
      (this.map = e.map),
      (this.alphaMap = e.alphaMap),
      (this.size = e.size),
      (this.sizeAttenuation = e.sizeAttenuation),
      (this.fog = e.fog),
      this
    );
  }
}
const _inverseMatrix = new Matrix4(),
  _ray = new Ray(),
  _sphere = new Sphere(),
  _position$2 = new Vector3();
class Points extends Object3D {
  constructor(e = new BufferGeometry(), t = new PointsMaterial()) {
    super(),
      (this.isPoints = !0),
      (this.type = 'Points'),
      (this.geometry = e),
      (this.material = t),
      this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), (this.material = e.material), (this.geometry = e.geometry), this;
  }
  raycast(e, t) {
    const r = this.geometry,
      n = this.matrixWorld,
      i = e.params.Points.threshold,
      a = r.drawRange;
    if (
      (null === r.boundingSphere && r.computeBoundingSphere(),
      _sphere.copy(r.boundingSphere),
      _sphere.applyMatrix4(n),
      (_sphere.radius += i),
      !1 === e.ray.intersectsSphere(_sphere))
    )
      return;
    _inverseMatrix.copy(n).invert(), _ray.copy(e.ray).applyMatrix4(_inverseMatrix);
    const s = i / ((this.scale.x + this.scale.y + this.scale.z) / 3),
      o = s * s,
      l = r.index,
      c = r.attributes.position;
    if (null !== l) {
      for (let r = Math.max(0, a.start), i = Math.min(l.count, a.start + a.count); r < i; r++) {
        const i = l.getX(r);
        _position$2.fromBufferAttribute(c, i), testPoint(_position$2, i, o, n, e, t, this);
      }
    } else {
      for (let r = Math.max(0, a.start), i = Math.min(c.count, a.start + a.count); r < i; r++)
        _position$2.fromBufferAttribute(c, r), testPoint(_position$2, r, o, n, e, t, this);
    }
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes,
      t = Object.keys(e);
    if (t.length > 0) {
      const r = e[t[0]];
      if (void 0 !== r) {
        (this.morphTargetInfluences = []), (this.morphTargetDictionary = {});
        for (let e = 0, t = r.length; e < t; e++) {
          const t = r[e].name || String(e);
          this.morphTargetInfluences.push(0), (this.morphTargetDictionary[t] = e);
        }
      }
    }
  }
}
function testPoint(e, t, r, n, i, a, s) {
  const o = _ray.distanceSqToPoint(e);
  if (o < r) {
    const r = new Vector3();
    _ray.closestPointToPoint(e, r), r.applyMatrix4(n);
    const l = i.ray.origin.distanceTo(r);
    if (l < i.near || l > i.far) return;
    a.push({ distance: l, distanceToRay: Math.sqrt(o), point: r, index: t, face: null, object: s });
  }
}
class VideoTexture extends Texture {
  constructor(e, t, r, n, i, a, s, o, l) {
    super(e, t, r, n, i, a, s, o, l),
      (this.isVideoTexture = !0),
      (this.minFilter = void 0 !== a ? a : 1006),
      (this.magFilter = void 0 !== i ? i : 1006),
      (this.generateMipmaps = !1);
    const c = this;
    'requestVideoFrameCallback' in e &&
      e.requestVideoFrameCallback(function t() {
        (c.needsUpdate = !0), e.requestVideoFrameCallback(t);
      });
  }
  clone() {
    return new this.constructor(this.image).copy(this);
  }
  update() {
    const e = this.image;
    !1 === 'requestVideoFrameCallback' in e &&
      e.readyState >= e.HAVE_CURRENT_DATA &&
      (this.needsUpdate = !0);
  }
}
class FramebufferTexture extends Texture {
  constructor(e, t, r) {
    super({ width: e, height: t }),
      (this.isFramebufferTexture = !0),
      (this.format = r),
      (this.magFilter = 1003),
      (this.minFilter = 1003),
      (this.generateMipmaps = !1),
      (this.needsUpdate = !0);
  }
}
class CompressedTexture extends Texture {
  constructor(e, t, r, n, i, a, s, o, l, c, h, u) {
    super(null, a, s, o, l, c, n, i, h, u),
      (this.isCompressedTexture = !0),
      (this.image = { width: t, height: r }),
      (this.mipmaps = e),
      (this.flipY = !1),
      (this.generateMipmaps = !1);
  }
}
class CompressedArrayTexture extends CompressedTexture {
  constructor(e, t, r, n, i, a) {
    super(e, t, r, i, a),
      (this.isCompressedArrayTexture = !0),
      (this.image.depth = n),
      (this.wrapR = 1001);
  }
}
class CanvasTexture extends Texture {
  constructor(e, t, r, n, i, a, s, o, l) {
    super(e, t, r, n, i, a, s, o, l), (this.isCanvasTexture = !0), (this.needsUpdate = !0);
  }
}
class Curve {
  constructor() {
    (this.type = 'Curve'), (this.arcLengthDivisions = 200);
  }
  getPoint() {
    return console.warn('THREE.Curve: .getPoint() not implemented.'), null;
  }
  getPointAt(e, t) {
    const r = this.getUtoTmapping(e);
    return this.getPoint(r, t);
  }
  getPoints(e = 5) {
    const t = [];
    for (let r = 0; r <= e; r++) t.push(this.getPoint(r / e));
    return t;
  }
  getSpacedPoints(e = 5) {
    const t = [];
    for (let r = 0; r <= e; r++) t.push(this.getPointAt(r / e));
    return t;
  }
  getLength() {
    const e = this.getLengths();
    return e[e.length - 1];
  }
  getLengths(e = this.arcLengthDivisions) {
    if (this.cacheArcLengths && this.cacheArcLengths.length === e + 1 && !this.needsUpdate)
      return this.cacheArcLengths;
    this.needsUpdate = !1;
    const t = [];
    let r,
      n = this.getPoint(0),
      i = 0;
    t.push(0);
    for (let a = 1; a <= e; a++)
      (r = this.getPoint(a / e)), (i += r.distanceTo(n)), t.push(i), (n = r);
    return (this.cacheArcLengths = t), t;
  }
  updateArcLengths() {
    (this.needsUpdate = !0), this.getLengths();
  }
  getUtoTmapping(e, t) {
    const r = this.getLengths();
    let n = 0;
    const i = r.length;
    let a;
    a = t || e * r[i - 1];
    let s,
      o = 0,
      l = i - 1;
    for (; o <= l; )
      if (((n = Math.floor(o + (l - o) / 2)), (s = r[n] - a), s < 0)) o = n + 1;
      else {
        if (!(s > 0)) {
          l = n;
          break;
        }
        l = n - 1;
      }
    if (((n = l), r[n] === a)) return n / (i - 1);
    const c = r[n];
    return (n + (a - c) / (r[n + 1] - c)) / (i - 1);
  }
  getTangent(e, t) {
    const r = 1e-4;
    let n = e - r,
      i = e + r;
    n < 0 && (n = 0), i > 1 && (i = 1);
    const a = this.getPoint(n),
      s = this.getPoint(i),
      o = t || (a.isVector2 ? new Vector2() : new Vector3());
    return o.copy(s).sub(a).normalize(), o;
  }
  getTangentAt(e, t) {
    const r = this.getUtoTmapping(e);
    return this.getTangent(r, t);
  }
  computeFrenetFrames(e, t) {
    const r = new Vector3(),
      n = [],
      i = [],
      a = [],
      s = new Vector3(),
      o = new Matrix4();
    for (let t = 0; t <= e; t++) {
      const r = t / e;
      n[t] = this.getTangentAt(r, new Vector3());
    }
    (i[0] = new Vector3()), (a[0] = new Vector3());
    let l = Number.MAX_VALUE;
    const c = Math.abs(n[0].x),
      h = Math.abs(n[0].y),
      u = Math.abs(n[0].z);
    c <= l && ((l = c), r.set(1, 0, 0)),
      h <= l && ((l = h), r.set(0, 1, 0)),
      u <= l && r.set(0, 0, 1),
      s.crossVectors(n[0], r).normalize(),
      i[0].crossVectors(n[0], s),
      a[0].crossVectors(n[0], i[0]);
    for (let t = 1; t <= e; t++) {
      if (
        ((i[t] = i[t - 1].clone()),
        (a[t] = a[t - 1].clone()),
        s.crossVectors(n[t - 1], n[t]),
        s.length() > Number.EPSILON)
      ) {
        s.normalize();
        const e = Math.acos(clamp(n[t - 1].dot(n[t]), -1, 1));
        i[t].applyMatrix4(o.makeRotationAxis(s, e));
      }
      a[t].crossVectors(n[t], i[t]);
    }
    if (!0 === t) {
      let t = Math.acos(clamp(i[0].dot(i[e]), -1, 1));
      (t /= e), n[0].dot(s.crossVectors(i[0], i[e])) > 0 && (t = -t);
      for (let r = 1; r <= e; r++)
        i[r].applyMatrix4(o.makeRotationAxis(n[r], t * r)), a[r].crossVectors(n[r], i[r]);
    }
    return { tangents: n, normals: i, binormals: a };
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return (this.arcLengthDivisions = e.arcLengthDivisions), this;
  }
  toJSON() {
    const e = { metadata: { version: 4.5, type: 'Curve', generator: 'Curve.toJSON' } };
    return (e.arcLengthDivisions = this.arcLengthDivisions), (e.type = this.type), e;
  }
  fromJSON(e) {
    return (this.arcLengthDivisions = e.arcLengthDivisions), this;
  }
}
class EllipseCurve extends Curve {
  constructor(e = 0, t = 0, r = 1, n = 1, i = 0, a = 2 * Math.PI, s = !1, o = 0) {
    super(),
      (this.isEllipseCurve = !0),
      (this.type = 'EllipseCurve'),
      (this.aX = e),
      (this.aY = t),
      (this.xRadius = r),
      (this.yRadius = n),
      (this.aStartAngle = i),
      (this.aEndAngle = a),
      (this.aClockwise = s),
      (this.aRotation = o);
  }
  getPoint(e, t) {
    const r = t || new Vector2(),
      n = 2 * Math.PI;
    let i = this.aEndAngle - this.aStartAngle;
    const a = Math.abs(i) < Number.EPSILON;
    for (; i < 0; ) i += n;
    for (; i > n; ) i -= n;
    i < Number.EPSILON && (i = a ? 0 : n),
      !0 !== this.aClockwise || a || (i === n ? (i = -n) : (i -= n));
    const s = this.aStartAngle + e * i;
    let o = this.aX + this.xRadius * Math.cos(s),
      l = this.aY + this.yRadius * Math.sin(s);
    if (0 !== this.aRotation) {
      const e = Math.cos(this.aRotation),
        t = Math.sin(this.aRotation),
        r = o - this.aX,
        n = l - this.aY;
      (o = r * e - n * t + this.aX), (l = r * t + n * e + this.aY);
    }
    return r.set(o, l);
  }
  copy(e) {
    return (
      super.copy(e),
      (this.aX = e.aX),
      (this.aY = e.aY),
      (this.xRadius = e.xRadius),
      (this.yRadius = e.yRadius),
      (this.aStartAngle = e.aStartAngle),
      (this.aEndAngle = e.aEndAngle),
      (this.aClockwise = e.aClockwise),
      (this.aRotation = e.aRotation),
      this
    );
  }
  toJSON() {
    const e = super.toJSON();
    return (
      (e.aX = this.aX),
      (e.aY = this.aY),
      (e.xRadius = this.xRadius),
      (e.yRadius = this.yRadius),
      (e.aStartAngle = this.aStartAngle),
      (e.aEndAngle = this.aEndAngle),
      (e.aClockwise = this.aClockwise),
      (e.aRotation = this.aRotation),
      e
    );
  }
  fromJSON(e) {
    return (
      super.fromJSON(e),
      (this.aX = e.aX),
      (this.aY = e.aY),
      (this.xRadius = e.xRadius),
      (this.yRadius = e.yRadius),
      (this.aStartAngle = e.aStartAngle),
      (this.aEndAngle = e.aEndAngle),
      (this.aClockwise = e.aClockwise),
      (this.aRotation = e.aRotation),
      this
    );
  }
}
class ArcCurve extends EllipseCurve {
  constructor(e, t, r, n, i, a) {
    super(e, t, r, r, n, i, a), (this.isArcCurve = !0), (this.type = 'ArcCurve');
  }
}
function CubicPoly() {
  let e = 0,
    t = 0,
    r = 0,
    n = 0;
  function i(i, a, s, o) {
    (e = i), (t = s), (r = -3 * i + 3 * a - 2 * s - o), (n = 2 * i - 2 * a + s + o);
  }
  return {
    initCatmullRom: function (e, t, r, n, a) {
      i(t, r, a * (r - e), a * (n - t));
    },
    initNonuniformCatmullRom: function (e, t, r, n, a, s, o) {
      let l = (t - e) / a - (r - e) / (a + s) + (r - t) / s,
        c = (r - t) / s - (n - t) / (s + o) + (n - r) / o;
      (l *= s), (c *= s), i(t, r, l, c);
    },
    calc: function (i) {
      const a = i * i;
      return e + t * i + r * a + n * (a * i);
    },
  };
}
const tmp = new Vector3(),
  px = new CubicPoly(),
  py = new CubicPoly(),
  pz = new CubicPoly();
class CatmullRomCurve3 extends Curve {
  constructor(e = [], t = !1, r = 'centripetal', n = 0.5) {
    super(),
      (this.isCatmullRomCurve3 = !0),
      (this.type = 'CatmullRomCurve3'),
      (this.points = e),
      (this.closed = t),
      (this.curveType = r),
      (this.tension = n);
  }
  getPoint(e, t = new Vector3()) {
    const r = t,
      n = this.points,
      i = n.length,
      a = (i - (this.closed ? 0 : 1)) * e;
    let s,
      o,
      l = Math.floor(a),
      c = a - l;
    this.closed
      ? (l += l > 0 ? 0 : (Math.floor(Math.abs(l) / i) + 1) * i)
      : 0 === c && l === i - 1 && ((l = i - 2), (c = 1)),
      this.closed || l > 0
        ? (s = n[(l - 1) % i])
        : (tmp.subVectors(n[0], n[1]).add(n[0]), (s = tmp));
    const h = n[l % i],
      u = n[(l + 1) % i];
    if (
      (this.closed || l + 2 < i
        ? (o = n[(l + 2) % i])
        : (tmp.subVectors(n[i - 1], n[i - 2]).add(n[i - 1]), (o = tmp)),
      'centripetal' === this.curveType || 'chordal' === this.curveType)
    ) {
      const e = 'chordal' === this.curveType ? 0.5 : 0.25;
      let t = Math.pow(s.distanceToSquared(h), e),
        r = Math.pow(h.distanceToSquared(u), e),
        n = Math.pow(u.distanceToSquared(o), e);
      r < 1e-4 && (r = 1),
        t < 1e-4 && (t = r),
        n < 1e-4 && (n = r),
        px.initNonuniformCatmullRom(s.x, h.x, u.x, o.x, t, r, n),
        py.initNonuniformCatmullRom(s.y, h.y, u.y, o.y, t, r, n),
        pz.initNonuniformCatmullRom(s.z, h.z, u.z, o.z, t, r, n);
    } else
      'catmullrom' === this.curveType &&
        (px.initCatmullRom(s.x, h.x, u.x, o.x, this.tension),
        py.initCatmullRom(s.y, h.y, u.y, o.y, this.tension),
        pz.initCatmullRom(s.z, h.z, u.z, o.z, this.tension));
    return r.set(px.calc(c), py.calc(c), pz.calc(c)), r;
  }
  copy(e) {
    super.copy(e), (this.points = []);
    for (let t = 0, r = e.points.length; t < r; t++) {
      const r = e.points[t];
      this.points.push(r.clone());
    }
    return (
      (this.closed = e.closed), (this.curveType = e.curveType), (this.tension = e.tension), this
    );
  }
  toJSON() {
    const e = super.toJSON();
    e.points = [];
    for (let t = 0, r = this.points.length; t < r; t++) {
      const r = this.points[t];
      e.points.push(r.toArray());
    }
    return (e.closed = this.closed), (e.curveType = this.curveType), (e.tension = this.tension), e;
  }
  fromJSON(e) {
    super.fromJSON(e), (this.points = []);
    for (let t = 0, r = e.points.length; t < r; t++) {
      const r = e.points[t];
      this.points.push(new Vector3().fromArray(r));
    }
    return (
      (this.closed = e.closed), (this.curveType = e.curveType), (this.tension = e.tension), this
    );
  }
}
function CatmullRom(e, t, r, n, i) {
  const a = 0.5 * (n - t),
    s = 0.5 * (i - r),
    o = e * e;
  return (2 * r - 2 * n + a + s) * (e * o) + (-3 * r + 3 * n - 2 * a - s) * o + a * e + r;
}
function QuadraticBezierP0(e, t) {
  const r = 1 - e;
  return r * r * t;
}
function QuadraticBezierP1(e, t) {
  return 2 * (1 - e) * e * t;
}
function QuadraticBezierP2(e, t) {
  return e * e * t;
}
function QuadraticBezier(e, t, r, n) {
  return QuadraticBezierP0(e, t) + QuadraticBezierP1(e, r) + QuadraticBezierP2(e, n);
}
function CubicBezierP0(e, t) {
  const r = 1 - e;
  return r * r * r * t;
}
function CubicBezierP1(e, t) {
  const r = 1 - e;
  return 3 * r * r * e * t;
}
function CubicBezierP2(e, t) {
  return 3 * (1 - e) * e * e * t;
}
function CubicBezierP3(e, t) {
  return e * e * e * t;
}
function CubicBezier(e, t, r, n, i) {
  return CubicBezierP0(e, t) + CubicBezierP1(e, r) + CubicBezierP2(e, n) + CubicBezierP3(e, i);
}
class CubicBezierCurve extends Curve {
  constructor(e = new Vector2(), t = new Vector2(), r = new Vector2(), n = new Vector2()) {
    super(),
      (this.isCubicBezierCurve = !0),
      (this.type = 'CubicBezierCurve'),
      (this.v0 = e),
      (this.v1 = t),
      (this.v2 = r),
      (this.v3 = n);
  }
  getPoint(e, t = new Vector2()) {
    const r = t,
      n = this.v0,
      i = this.v1,
      a = this.v2,
      s = this.v3;
    return r.set(CubicBezier(e, n.x, i.x, a.x, s.x), CubicBezier(e, n.y, i.y, a.y, s.y)), r;
  }
  copy(e) {
    return (
      super.copy(e),
      this.v0.copy(e.v0),
      this.v1.copy(e.v1),
      this.v2.copy(e.v2),
      this.v3.copy(e.v3),
      this
    );
  }
  toJSON() {
    const e = super.toJSON();
    return (
      (e.v0 = this.v0.toArray()),
      (e.v1 = this.v1.toArray()),
      (e.v2 = this.v2.toArray()),
      (e.v3 = this.v3.toArray()),
      e
    );
  }
  fromJSON(e) {
    return (
      super.fromJSON(e),
      this.v0.fromArray(e.v0),
      this.v1.fromArray(e.v1),
      this.v2.fromArray(e.v2),
      this.v3.fromArray(e.v3),
      this
    );
  }
}
class CubicBezierCurve3 extends Curve {
  constructor(e = new Vector3(), t = new Vector3(), r = new Vector3(), n = new Vector3()) {
    super(),
      (this.isCubicBezierCurve3 = !0),
      (this.type = 'CubicBezierCurve3'),
      (this.v0 = e),
      (this.v1 = t),
      (this.v2 = r),
      (this.v3 = n);
  }
  getPoint(e, t = new Vector3()) {
    const r = t,
      n = this.v0,
      i = this.v1,
      a = this.v2,
      s = this.v3;
    return (
      r.set(
        CubicBezier(e, n.x, i.x, a.x, s.x),
        CubicBezier(e, n.y, i.y, a.y, s.y),
        CubicBezier(e, n.z, i.z, a.z, s.z),
      ),
      r
    );
  }
  copy(e) {
    return (
      super.copy(e),
      this.v0.copy(e.v0),
      this.v1.copy(e.v1),
      this.v2.copy(e.v2),
      this.v3.copy(e.v3),
      this
    );
  }
  toJSON() {
    const e = super.toJSON();
    return (
      (e.v0 = this.v0.toArray()),
      (e.v1 = this.v1.toArray()),
      (e.v2 = this.v2.toArray()),
      (e.v3 = this.v3.toArray()),
      e
    );
  }
  fromJSON(e) {
    return (
      super.fromJSON(e),
      this.v0.fromArray(e.v0),
      this.v1.fromArray(e.v1),
      this.v2.fromArray(e.v2),
      this.v3.fromArray(e.v3),
      this
    );
  }
}
class LineCurve extends Curve {
  constructor(e = new Vector2(), t = new Vector2()) {
    super(), (this.isLineCurve = !0), (this.type = 'LineCurve'), (this.v1 = e), (this.v2 = t);
  }
  getPoint(e, t = new Vector2()) {
    const r = t;
    return (
      1 === e ? r.copy(this.v2) : (r.copy(this.v2).sub(this.v1), r.multiplyScalar(e).add(this.v1)),
      r
    );
  }
  getPointAt(e, t) {
    return this.getPoint(e, t);
  }
  getTangent(e, t = new Vector2()) {
    return t.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(e, t) {
    return this.getTangent(e, t);
  }
  copy(e) {
    return super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return (e.v1 = this.v1.toArray()), (e.v2 = this.v2.toArray()), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
  }
}
class LineCurve3 extends Curve {
  constructor(e = new Vector3(), t = new Vector3()) {
    super(), (this.isLineCurve3 = !0), (this.type = 'LineCurve3'), (this.v1 = e), (this.v2 = t);
  }
  getPoint(e, t = new Vector3()) {
    const r = t;
    return (
      1 === e ? r.copy(this.v2) : (r.copy(this.v2).sub(this.v1), r.multiplyScalar(e).add(this.v1)),
      r
    );
  }
  getPointAt(e, t) {
    return this.getPoint(e, t);
  }
  getTangent(e, t = new Vector3()) {
    return t.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(e, t) {
    return this.getTangent(e, t);
  }
  copy(e) {
    return super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return (e.v1 = this.v1.toArray()), (e.v2 = this.v2.toArray()), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
  }
}
class QuadraticBezierCurve extends Curve {
  constructor(e = new Vector2(), t = new Vector2(), r = new Vector2()) {
    super(),
      (this.isQuadraticBezierCurve = !0),
      (this.type = 'QuadraticBezierCurve'),
      (this.v0 = e),
      (this.v1 = t),
      (this.v2 = r);
  }
  getPoint(e, t = new Vector2()) {
    const r = t,
      n = this.v0,
      i = this.v1,
      a = this.v2;
    return r.set(QuadraticBezier(e, n.x, i.x, a.x), QuadraticBezier(e, n.y, i.y, a.y)), r;
  }
  copy(e) {
    return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return (e.v0 = this.v0.toArray()), (e.v1 = this.v1.toArray()), (e.v2 = this.v2.toArray()), e;
  }
  fromJSON(e) {
    return (
      super.fromJSON(e),
      this.v0.fromArray(e.v0),
      this.v1.fromArray(e.v1),
      this.v2.fromArray(e.v2),
      this
    );
  }
}
class QuadraticBezierCurve3 extends Curve {
  constructor(e = new Vector3(), t = new Vector3(), r = new Vector3()) {
    super(),
      (this.isQuadraticBezierCurve3 = !0),
      (this.type = 'QuadraticBezierCurve3'),
      (this.v0 = e),
      (this.v1 = t),
      (this.v2 = r);
  }
  getPoint(e, t = new Vector3()) {
    const r = t,
      n = this.v0,
      i = this.v1,
      a = this.v2;
    return (
      r.set(
        QuadraticBezier(e, n.x, i.x, a.x),
        QuadraticBezier(e, n.y, i.y, a.y),
        QuadraticBezier(e, n.z, i.z, a.z),
      ),
      r
    );
  }
  copy(e) {
    return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return (e.v0 = this.v0.toArray()), (e.v1 = this.v1.toArray()), (e.v2 = this.v2.toArray()), e;
  }
  fromJSON(e) {
    return (
      super.fromJSON(e),
      this.v0.fromArray(e.v0),
      this.v1.fromArray(e.v1),
      this.v2.fromArray(e.v2),
      this
    );
  }
}
class SplineCurve extends Curve {
  constructor(e = []) {
    super(), (this.isSplineCurve = !0), (this.type = 'SplineCurve'), (this.points = e);
  }
  getPoint(e, t = new Vector2()) {
    const r = t,
      n = this.points,
      i = (n.length - 1) * e,
      a = Math.floor(i),
      s = i - a,
      o = n[0 === a ? a : a - 1],
      l = n[a],
      c = n[a > n.length - 2 ? n.length - 1 : a + 1],
      h = n[a > n.length - 3 ? n.length - 1 : a + 2];
    return r.set(CatmullRom(s, o.x, l.x, c.x, h.x), CatmullRom(s, o.y, l.y, c.y, h.y)), r;
  }
  copy(e) {
    super.copy(e), (this.points = []);
    for (let t = 0, r = e.points.length; t < r; t++) {
      const r = e.points[t];
      this.points.push(r.clone());
    }
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.points = [];
    for (let t = 0, r = this.points.length; t < r; t++) {
      const r = this.points[t];
      e.points.push(r.toArray());
    }
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e), (this.points = []);
    for (let t = 0, r = e.points.length; t < r; t++) {
      const r = e.points[t];
      this.points.push(new Vector2().fromArray(r));
    }
    return this;
  }
}
var Curves = Object.freeze({
  __proto__: null,
  ArcCurve: ArcCurve,
  CatmullRomCurve3: CatmullRomCurve3,
  CubicBezierCurve: CubicBezierCurve,
  CubicBezierCurve3: CubicBezierCurve3,
  EllipseCurve: EllipseCurve,
  LineCurve: LineCurve,
  LineCurve3: LineCurve3,
  QuadraticBezierCurve: QuadraticBezierCurve,
  QuadraticBezierCurve3: QuadraticBezierCurve3,
  SplineCurve: SplineCurve,
});
class CurvePath extends Curve {
  constructor() {
    super(), (this.type = 'CurvePath'), (this.curves = []), (this.autoClose = !1);
  }
  add(e) {
    this.curves.push(e);
  }
  closePath() {
    const e = this.curves[0].getPoint(0),
      t = this.curves[this.curves.length - 1].getPoint(1);
    e.equals(t) || this.curves.push(new LineCurve(t, e));
  }
  getPoint(e, t) {
    const r = e * this.getLength(),
      n = this.getCurveLengths();
    let i = 0;
    for (; i < n.length; ) {
      if (n[i] >= r) {
        const e = n[i] - r,
          a = this.curves[i],
          s = a.getLength(),
          o = 0 === s ? 0 : 1 - e / s;
        return a.getPointAt(o, t);
      }
      i++;
    }
    return null;
  }
  getLength() {
    const e = this.getCurveLengths();
    return e[e.length - 1];
  }
  updateArcLengths() {
    (this.needsUpdate = !0), (this.cacheLengths = null), this.getCurveLengths();
  }
  getCurveLengths() {
    if (this.cacheLengths && this.cacheLengths.length === this.curves.length)
      return this.cacheLengths;
    const e = [];
    let t = 0;
    for (let r = 0, n = this.curves.length; r < n; r++)
      (t += this.curves[r].getLength()), e.push(t);
    return (this.cacheLengths = e), e;
  }
  getSpacedPoints(e = 40) {
    const t = [];
    for (let r = 0; r <= e; r++) t.push(this.getPoint(r / e));
    return this.autoClose && t.push(t[0]), t;
  }
  getPoints(e = 12) {
    const t = [];
    let r;
    for (let n = 0, i = this.curves; n < i.length; n++) {
      const a = i[n],
        s = a.isEllipseCurve
          ? 2 * e
          : a.isLineCurve || a.isLineCurve3
            ? 1
            : a.isSplineCurve
              ? e * a.points.length
              : e,
        o = a.getPoints(s);
      for (let e = 0; e < o.length; e++) {
        const n = o[e];
        (r && r.equals(n)) || (t.push(n), (r = n));
      }
    }
    return this.autoClose && t.length > 1 && !t[t.length - 1].equals(t[0]) && t.push(t[0]), t;
  }
  copy(e) {
    super.copy(e), (this.curves = []);
    for (let t = 0, r = e.curves.length; t < r; t++) {
      const r = e.curves[t];
      this.curves.push(r.clone());
    }
    return (this.autoClose = e.autoClose), this;
  }
  toJSON() {
    const e = super.toJSON();
    (e.autoClose = this.autoClose), (e.curves = []);
    for (let t = 0, r = this.curves.length; t < r; t++) {
      const r = this.curves[t];
      e.curves.push(r.toJSON());
    }
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e), (this.autoClose = e.autoClose), (this.curves = []);
    for (let t = 0, r = e.curves.length; t < r; t++) {
      const r = e.curves[t];
      this.curves.push(new Curves[r.type]().fromJSON(r));
    }
    return this;
  }
}
class Path extends CurvePath {
  constructor(e) {
    super(), (this.type = 'Path'), (this.currentPoint = new Vector2()), e && this.setFromPoints(e);
  }
  setFromPoints(e) {
    this.moveTo(e[0].x, e[0].y);
    for (let t = 1, r = e.length; t < r; t++) this.lineTo(e[t].x, e[t].y);
    return this;
  }
  moveTo(e, t) {
    return this.currentPoint.set(e, t), this;
  }
  lineTo(e, t) {
    const r = new LineCurve(this.currentPoint.clone(), new Vector2(e, t));
    return this.curves.push(r), this.currentPoint.set(e, t), this;
  }
  quadraticCurveTo(e, t, r, n) {
    const i = new QuadraticBezierCurve(
      this.currentPoint.clone(),
      new Vector2(e, t),
      new Vector2(r, n),
    );
    return this.curves.push(i), this.currentPoint.set(r, n), this;
  }
  bezierCurveTo(e, t, r, n, i, a) {
    const s = new CubicBezierCurve(
      this.currentPoint.clone(),
      new Vector2(e, t),
      new Vector2(r, n),
      new Vector2(i, a),
    );
    return this.curves.push(s), this.currentPoint.set(i, a), this;
  }
  splineThru(e) {
    const t = [this.currentPoint.clone()].concat(e),
      r = new SplineCurve(t);
    return this.curves.push(r), this.currentPoint.copy(e[e.length - 1]), this;
  }
  arc(e, t, r, n, i, a) {
    const s = this.currentPoint.x,
      o = this.currentPoint.y;
    return this.absarc(e + s, t + o, r, n, i, a), this;
  }
  absarc(e, t, r, n, i, a) {
    return this.absellipse(e, t, r, r, n, i, a), this;
  }
  ellipse(e, t, r, n, i, a, s, o) {
    const l = this.currentPoint.x,
      c = this.currentPoint.y;
    return this.absellipse(e + l, t + c, r, n, i, a, s, o), this;
  }
  absellipse(e, t, r, n, i, a, s, o) {
    const l = new EllipseCurve(e, t, r, n, i, a, s, o);
    if (this.curves.length > 0) {
      const e = l.getPoint(0);
      e.equals(this.currentPoint) || this.lineTo(e.x, e.y);
    }
    this.curves.push(l);
    const c = l.getPoint(1);
    return this.currentPoint.copy(c), this;
  }
  copy(e) {
    return super.copy(e), this.currentPoint.copy(e.currentPoint), this;
  }
  toJSON() {
    const e = super.toJSON();
    return (e.currentPoint = this.currentPoint.toArray()), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.currentPoint.fromArray(e.currentPoint), this;
  }
}
class LatheGeometry extends BufferGeometry {
  constructor(
    e = [new Vector2(0, -0.5), new Vector2(0.5, 0), new Vector2(0, 0.5)],
    t = 12,
    r = 0,
    n = 2 * Math.PI,
  ) {
    super(),
      (this.type = 'LatheGeometry'),
      (this.parameters = { points: e, segments: t, phiStart: r, phiLength: n }),
      (t = Math.floor(t)),
      (n = clamp(n, 0, 2 * Math.PI));
    const i = [],
      a = [],
      s = [],
      o = [],
      l = [],
      c = 1 / t,
      h = new Vector3(),
      u = new Vector2(),
      d = new Vector3(),
      p = new Vector3(),
      m = new Vector3();
    let f = 0,
      g = 0;
    for (let t = 0; t <= e.length - 1; t++)
      switch (t) {
        case 0:
          (f = e[t + 1].x - e[t].x),
            (g = e[t + 1].y - e[t].y),
            (d.x = 1 * g),
            (d.y = -f),
            (d.z = 0 * g),
            m.copy(d),
            d.normalize(),
            o.push(d.x, d.y, d.z);
          break;
        case e.length - 1:
          o.push(m.x, m.y, m.z);
          break;
        default:
          (f = e[t + 1].x - e[t].x),
            (g = e[t + 1].y - e[t].y),
            (d.x = 1 * g),
            (d.y = -f),
            (d.z = 0 * g),
            p.copy(d),
            (d.x += m.x),
            (d.y += m.y),
            (d.z += m.z),
            d.normalize(),
            o.push(d.x, d.y, d.z),
            m.copy(p);
      }
    for (let i = 0; i <= t; i++) {
      const d = r + i * c * n,
        p = Math.sin(d),
        m = Math.cos(d);
      for (let r = 0; r <= e.length - 1; r++) {
        (h.x = e[r].x * p),
          (h.y = e[r].y),
          (h.z = e[r].x * m),
          a.push(h.x, h.y, h.z),
          (u.x = i / t),
          (u.y = r / (e.length - 1)),
          s.push(u.x, u.y);
        const n = o[3 * r + 0] * p,
          c = o[3 * r + 1],
          d = o[3 * r + 0] * m;
        l.push(n, c, d);
      }
    }
    for (let r = 0; r < t; r++)
      for (let t = 0; t < e.length - 1; t++) {
        const n = t + r * e.length,
          a = n,
          s = n + e.length,
          o = n + e.length + 1,
          l = n + 1;
        i.push(a, s, l), i.push(o, l, s);
      }
    this.setIndex(i),
      this.setAttribute('position', new Float32BufferAttribute(a, 3)),
      this.setAttribute('uv', new Float32BufferAttribute(s, 2)),
      this.setAttribute('normal', new Float32BufferAttribute(l, 3));
  }
  copy(e) {
    return super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this;
  }
  static fromJSON(e) {
    return new LatheGeometry(e.points, e.segments, e.phiStart, e.phiLength);
  }
}
class CapsuleGeometry extends LatheGeometry {
  constructor(e = 1, t = 1, r = 4, n = 8) {
    const i = new Path();
    i.absarc(0, -t / 2, e, 1.5 * Math.PI, 0),
      i.absarc(0, t / 2, e, 0, 0.5 * Math.PI),
      super(i.getPoints(r), n),
      (this.type = 'CapsuleGeometry'),
      (this.parameters = { radius: e, height: t, capSegments: r, radialSegments: n });
  }
  static fromJSON(e) {
    return new CapsuleGeometry(e.radius, e.length, e.capSegments, e.radialSegments);
  }
}
class CircleGeometry extends BufferGeometry {
  constructor(e = 1, t = 32, r = 0, n = 2 * Math.PI) {
    super(),
      (this.type = 'CircleGeometry'),
      (this.parameters = { radius: e, segments: t, thetaStart: r, thetaLength: n }),
      (t = Math.max(3, t));
    const i = [],
      a = [],
      s = [],
      o = [],
      l = new Vector3(),
      c = new Vector2();
    a.push(0, 0, 0), s.push(0, 0, 1), o.push(0.5, 0.5);
    for (let i = 0, h = 3; i <= t; i++, h += 3) {
      const u = r + (i / t) * n;
      (l.x = e * Math.cos(u)),
        (l.y = e * Math.sin(u)),
        a.push(l.x, l.y, l.z),
        s.push(0, 0, 1),
        (c.x = (a[h] / e + 1) / 2),
        (c.y = (a[h + 1] / e + 1) / 2),
        o.push(c.x, c.y);
    }
    for (let e = 1; e <= t; e++) i.push(e, e + 1, 0);
    this.setIndex(i),
      this.setAttribute('position', new Float32BufferAttribute(a, 3)),
      this.setAttribute('normal', new Float32BufferAttribute(s, 3)),
      this.setAttribute('uv', new Float32BufferAttribute(o, 2));
  }
  copy(e) {
    return super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this;
  }
  static fromJSON(e) {
    return new CircleGeometry(e.radius, e.segments, e.thetaStart, e.thetaLength);
  }
}
class CylinderGeometry extends BufferGeometry {
  constructor(e = 1, t = 1, r = 1, n = 32, i = 1, a = !1, s = 0, o = 2 * Math.PI) {
    super(),
      (this.type = 'CylinderGeometry'),
      (this.parameters = {
        radiusTop: e,
        radiusBottom: t,
        height: r,
        radialSegments: n,
        heightSegments: i,
        openEnded: a,
        thetaStart: s,
        thetaLength: o,
      });
    const l = this;
    (n = Math.floor(n)), (i = Math.floor(i));
    const c = [],
      h = [],
      u = [],
      d = [];
    let p = 0;
    const m = [],
      f = r / 2;
    let g = 0;
    function _(r) {
      const i = p,
        a = new Vector2(),
        m = new Vector3();
      let _ = 0;
      const v = !0 === r ? e : t,
        x = !0 === r ? 1 : -1;
      for (let e = 1; e <= n; e++) h.push(0, f * x, 0), u.push(0, x, 0), d.push(0.5, 0.5), p++;
      const y = p;
      for (let e = 0; e <= n; e++) {
        const t = (e / n) * o + s,
          r = Math.cos(t),
          i = Math.sin(t);
        (m.x = v * i),
          (m.y = f * x),
          (m.z = v * r),
          h.push(m.x, m.y, m.z),
          u.push(0, x, 0),
          (a.x = 0.5 * r + 0.5),
          (a.y = 0.5 * i * x + 0.5),
          d.push(a.x, a.y),
          p++;
      }
      for (let e = 0; e < n; e++) {
        const t = i + e,
          n = y + e;
        !0 === r ? c.push(n, n + 1, t) : c.push(n + 1, n, t), (_ += 3);
      }
      l.addGroup(g, _, !0 === r ? 1 : 2), (g += _);
    }
    !(function () {
      const a = new Vector3(),
        _ = new Vector3();
      let v = 0;
      const x = (t - e) / r;
      for (let l = 0; l <= i; l++) {
        const c = [],
          g = l / i,
          v = g * (t - e) + e;
        for (let e = 0; e <= n; e++) {
          const t = e / n,
            i = t * o + s,
            l = Math.sin(i),
            m = Math.cos(i);
          (_.x = v * l),
            (_.y = -g * r + f),
            (_.z = v * m),
            h.push(_.x, _.y, _.z),
            a.set(l, x, m).normalize(),
            u.push(a.x, a.y, a.z),
            d.push(t, 1 - g),
            c.push(p++);
        }
        m.push(c);
      }
      for (let e = 0; e < n; e++)
        for (let t = 0; t < i; t++) {
          const r = m[t][e],
            n = m[t + 1][e],
            i = m[t + 1][e + 1],
            a = m[t][e + 1];
          c.push(r, n, a), c.push(n, i, a), (v += 6);
        }
      l.addGroup(g, v, 0), (g += v);
    })(),
      !1 === a && (e > 0 && _(!0), t > 0 && _(!1)),
      this.setIndex(c),
      this.setAttribute('position', new Float32BufferAttribute(h, 3)),
      this.setAttribute('normal', new Float32BufferAttribute(u, 3)),
      this.setAttribute('uv', new Float32BufferAttribute(d, 2));
  }
  copy(e) {
    return super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this;
  }
  static fromJSON(e) {
    return new CylinderGeometry(
      e.radiusTop,
      e.radiusBottom,
      e.height,
      e.radialSegments,
      e.heightSegments,
      e.openEnded,
      e.thetaStart,
      e.thetaLength,
    );
  }
}
class ConeGeometry extends CylinderGeometry {
  constructor(e = 1, t = 1, r = 32, n = 1, i = !1, a = 0, s = 2 * Math.PI) {
    super(0, e, t, r, n, i, a, s),
      (this.type = 'ConeGeometry'),
      (this.parameters = {
        radius: e,
        height: t,
        radialSegments: r,
        heightSegments: n,
        openEnded: i,
        thetaStart: a,
        thetaLength: s,
      });
  }
  static fromJSON(e) {
    return new ConeGeometry(
      e.radius,
      e.height,
      e.radialSegments,
      e.heightSegments,
      e.openEnded,
      e.thetaStart,
      e.thetaLength,
    );
  }
}
class PolyhedronGeometry extends BufferGeometry {
  constructor(e = [], t = [], r = 1, n = 0) {
    super(),
      (this.type = 'PolyhedronGeometry'),
      (this.parameters = { vertices: e, indices: t, radius: r, detail: n });
    const i = [],
      a = [];
    function s(e, t, r, n) {
      const i = n + 1,
        a = [];
      for (let n = 0; n <= i; n++) {
        a[n] = [];
        const s = e.clone().lerp(r, n / i),
          o = t.clone().lerp(r, n / i),
          l = i - n;
        for (let e = 0; e <= l; e++) a[n][e] = 0 === e && n === i ? s : s.clone().lerp(o, e / l);
      }
      for (let e = 0; e < i; e++)
        for (let t = 0; t < 2 * (i - e) - 1; t++) {
          const r = Math.floor(t / 2);
          t % 2 == 0
            ? (o(a[e][r + 1]), o(a[e + 1][r]), o(a[e][r]))
            : (o(a[e][r + 1]), o(a[e + 1][r + 1]), o(a[e + 1][r]));
        }
    }
    function o(e) {
      i.push(e.x, e.y, e.z);
    }
    function l(t, r) {
      const n = 3 * t;
      (r.x = e[n + 0]), (r.y = e[n + 1]), (r.z = e[n + 2]);
    }
    function c(e, t, r, n) {
      n < 0 && 1 === e.x && (a[t] = e.x - 1),
        0 === r.x && 0 === r.z && (a[t] = n / 2 / Math.PI + 0.5);
    }
    function h(e) {
      return Math.atan2(e.z, -e.x);
    }
    !(function (e) {
      const r = new Vector3(),
        n = new Vector3(),
        i = new Vector3();
      for (let a = 0; a < t.length; a += 3)
        l(t[a + 0], r), l(t[a + 1], n), l(t[a + 2], i), s(r, n, i, e);
    })(n),
      (function (e) {
        const t = new Vector3();
        for (let r = 0; r < i.length; r += 3)
          (t.x = i[r + 0]),
            (t.y = i[r + 1]),
            (t.z = i[r + 2]),
            t.normalize().multiplyScalar(e),
            (i[r + 0] = t.x),
            (i[r + 1] = t.y),
            (i[r + 2] = t.z);
      })(r),
      (function () {
        const e = new Vector3();
        for (let r = 0; r < i.length; r += 3) {
          (e.x = i[r + 0]), (e.y = i[r + 1]), (e.z = i[r + 2]);
          const n = h(e) / 2 / Math.PI + 0.5,
            s = ((t = e), Math.atan2(-t.y, Math.sqrt(t.x * t.x + t.z * t.z)) / Math.PI + 0.5);
          a.push(n, 1 - s);
        }
        var t;
        (function () {
          const e = new Vector3(),
            t = new Vector3(),
            r = new Vector3(),
            n = new Vector3(),
            s = new Vector2(),
            o = new Vector2(),
            l = new Vector2();
          for (let u = 0, d = 0; u < i.length; u += 9, d += 6) {
            e.set(i[u + 0], i[u + 1], i[u + 2]),
              t.set(i[u + 3], i[u + 4], i[u + 5]),
              r.set(i[u + 6], i[u + 7], i[u + 8]),
              s.set(a[d + 0], a[d + 1]),
              o.set(a[d + 2], a[d + 3]),
              l.set(a[d + 4], a[d + 5]),
              n.copy(e).add(t).add(r).divideScalar(3);
            const p = h(n);
            c(s, d + 0, e, p), c(o, d + 2, t, p), c(l, d + 4, r, p);
          }
        })(),
          (function () {
            for (let e = 0; e < a.length; e += 6) {
              const t = a[e + 0],
                r = a[e + 2],
                n = a[e + 4],
                i = Math.max(t, r, n),
                s = Math.min(t, r, n);
              i > 0.9 &&
                s < 0.1 &&
                (t < 0.2 && (a[e + 0] += 1),
                r < 0.2 && (a[e + 2] += 1),
                n < 0.2 && (a[e + 4] += 1));
            }
          })();
      })(),
      this.setAttribute('position', new Float32BufferAttribute(i, 3)),
      this.setAttribute('normal', new Float32BufferAttribute(i.slice(), 3)),
      this.setAttribute('uv', new Float32BufferAttribute(a, 2)),
      0 === n ? this.computeVertexNormals() : this.normalizeNormals();
  }
  copy(e) {
    return super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this;
  }
  static fromJSON(e) {
    return new PolyhedronGeometry(e.vertices, e.indices, e.radius, e.details);
  }
}
class DodecahedronGeometry extends PolyhedronGeometry {
  constructor(e = 1, t = 0) {
    const r = (1 + Math.sqrt(5)) / 2,
      n = 1 / r;
    super(
      [
        -1,
        -1,
        -1,
        -1,
        -1,
        1,
        -1,
        1,
        -1,
        -1,
        1,
        1,
        1,
        -1,
        -1,
        1,
        -1,
        1,
        1,
        1,
        -1,
        1,
        1,
        1,
        0,
        -n,
        -r,
        0,
        -n,
        r,
        0,
        n,
        -r,
        0,
        n,
        r,
        -n,
        -r,
        0,
        -n,
        r,
        0,
        n,
        -r,
        0,
        n,
        r,
        0,
        -r,
        0,
        -n,
        r,
        0,
        -n,
        -r,
        0,
        n,
        r,
        0,
        n,
      ],
      [
        3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10,
        6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13,
        15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4,
        0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5,
        1, 5, 9,
      ],
      e,
      t,
    ),
      (this.type = 'DodecahedronGeometry'),
      (this.parameters = { radius: e, detail: t });
  }
  static fromJSON(e) {
    return new DodecahedronGeometry(e.radius, e.detail);
  }
}
const _v0 = new Vector3(),
  _v1$1 = new Vector3(),
  _normal = new Vector3(),
  _triangle = new Triangle();
class EdgesGeometry extends BufferGeometry {
  constructor(e = null, t = 1) {
    if (
      (super(),
      (this.type = 'EdgesGeometry'),
      (this.parameters = { geometry: e, thresholdAngle: t }),
      null !== e)
    ) {
      const r = 4,
        n = Math.pow(10, r),
        i = Math.cos(DEG2RAD * t),
        a = e.getIndex(),
        s = e.getAttribute('position'),
        o = a ? a.count : s.count,
        l = [0, 0, 0],
        c = ['a', 'b', 'c'],
        h = new Array(3),
        u = {},
        d = [];
      for (let e = 0; e < o; e += 3) {
        a
          ? ((l[0] = a.getX(e)), (l[1] = a.getX(e + 1)), (l[2] = a.getX(e + 2)))
          : ((l[0] = e), (l[1] = e + 1), (l[2] = e + 2));
        const { a: t, b: r, c: o } = _triangle;
        if (
          (t.fromBufferAttribute(s, l[0]),
          r.fromBufferAttribute(s, l[1]),
          o.fromBufferAttribute(s, l[2]),
          _triangle.getNormal(_normal),
          (h[0] = `${Math.round(t.x * n)},${Math.round(t.y * n)},${Math.round(t.z * n)}`),
          (h[1] = `${Math.round(r.x * n)},${Math.round(r.y * n)},${Math.round(r.z * n)}`),
          (h[2] = `${Math.round(o.x * n)},${Math.round(o.y * n)},${Math.round(o.z * n)}`),
          h[0] !== h[1] && h[1] !== h[2] && h[2] !== h[0])
        )
          for (let e = 0; e < 3; e++) {
            const t = (e + 1) % 3,
              r = h[e],
              n = h[t],
              a = _triangle[c[e]],
              s = _triangle[c[t]],
              o = `${r}_${n}`,
              p = `${n}_${r}`;
            p in u && u[p]
              ? (_normal.dot(u[p].normal) <= i && (d.push(a.x, a.y, a.z), d.push(s.x, s.y, s.z)),
                (u[p] = null))
              : o in u || (u[o] = { index0: l[e], index1: l[t], normal: _normal.clone() });
          }
      }
      for (const e in u)
        if (u[e]) {
          const { index0: t, index1: r } = u[e];
          _v0.fromBufferAttribute(s, t),
            _v1$1.fromBufferAttribute(s, r),
            d.push(_v0.x, _v0.y, _v0.z),
            d.push(_v1$1.x, _v1$1.y, _v1$1.z);
        }
      this.setAttribute('position', new Float32BufferAttribute(d, 3));
    }
  }
  copy(e) {
    return super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this;
  }
}
class Shape extends Path {
  constructor(e) {
    super(e), (this.uuid = generateUUID()), (this.type = 'Shape'), (this.holes = []);
  }
  getPointsHoles(e) {
    const t = [];
    for (let r = 0, n = this.holes.length; r < n; r++) t[r] = this.holes[r].getPoints(e);
    return t;
  }
  extractPoints(e) {
    return { shape: this.getPoints(e), holes: this.getPointsHoles(e) };
  }
  copy(e) {
    super.copy(e), (this.holes = []);
    for (let t = 0, r = e.holes.length; t < r; t++) {
      const r = e.holes[t];
      this.holes.push(r.clone());
    }
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    (e.uuid = this.uuid), (e.holes = []);
    for (let t = 0, r = this.holes.length; t < r; t++) {
      const r = this.holes[t];
      e.holes.push(r.toJSON());
    }
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e), (this.uuid = e.uuid), (this.holes = []);
    for (let t = 0, r = e.holes.length; t < r; t++) {
      const r = e.holes[t];
      this.holes.push(new Path().fromJSON(r));
    }
    return this;
  }
}
const Earcut = {
  triangulate: function (e, t, r = 2) {
    const n = t && t.length,
      i = n ? t[0] * r : e.length;
    let a = linkedList(e, 0, i, r, !0);
    const s = [];
    if (!a || a.next === a.prev) return s;
    let o, l, c, h, u, d, p;
    if ((n && (a = eliminateHoles(e, t, a, r)), e.length > 80 * r)) {
      (o = c = e[0]), (l = h = e[1]);
      for (let t = r; t < i; t += r)
        (u = e[t]),
          (d = e[t + 1]),
          u < o && (o = u),
          d < l && (l = d),
          u > c && (c = u),
          d > h && (h = d);
      (p = Math.max(c - o, h - l)), (p = 0 !== p ? 32767 / p : 0);
    }
    return earcutLinked(a, s, r, o, l, p, 0), s;
  },
};
function linkedList(e, t, r, n, i) {
  let a, s;
  if (i === signedArea(e, t, r, n) > 0)
    for (a = t; a < r; a += n) s = insertNode(a, e[a], e[a + 1], s);
  else for (a = r - n; a >= t; a -= n) s = insertNode(a, e[a], e[a + 1], s);
  return s && equals(s, s.next) && (removeNode(s), (s = s.next)), s;
}
function filterPoints(e, t) {
  if (!e) return e;
  t || (t = e);
  let r,
    n = e;
  do {
    if (((r = !1), n.steiner || (!equals(n, n.next) && 0 !== area(n.prev, n, n.next)))) n = n.next;
    else {
      if ((removeNode(n), (n = t = n.prev), n === n.next)) break;
      r = !0;
    }
  } while (r || n !== t);
  return t;
}
function earcutLinked(e, t, r, n, i, a, s) {
  if (!e) return;
  !s && a && indexCurve(e, n, i, a);
  let o,
    l,
    c = e;
  for (; e.prev !== e.next; )
    if (((o = e.prev), (l = e.next), a ? isEarHashed(e, n, i, a) : isEar(e)))
      t.push((o.i / r) | 0),
        t.push((e.i / r) | 0),
        t.push((l.i / r) | 0),
        removeNode(e),
        (e = l.next),
        (c = l.next);
    else if ((e = l) === c) {
      s
        ? 1 === s
          ? earcutLinked((e = cureLocalIntersections(filterPoints(e), t, r)), t, r, n, i, a, 2)
          : 2 === s && splitEarcut(e, t, r, n, i, a)
        : earcutLinked(filterPoints(e), t, r, n, i, a, 1);
      break;
    }
}
function isEar(e) {
  const t = e.prev,
    r = e,
    n = e.next;
  if (area(t, r, n) >= 0) return !1;
  const i = t.x,
    a = r.x,
    s = n.x,
    o = t.y,
    l = r.y,
    c = n.y,
    h = i < a ? (i < s ? i : s) : a < s ? a : s,
    u = o < l ? (o < c ? o : c) : l < c ? l : c,
    d = i > a ? (i > s ? i : s) : a > s ? a : s,
    p = o > l ? (o > c ? o : c) : l > c ? l : c;
  let m = n.next;
  for (; m !== t; ) {
    if (
      m.x >= h &&
      m.x <= d &&
      m.y >= u &&
      m.y <= p &&
      pointInTriangle(i, o, a, l, s, c, m.x, m.y) &&
      area(m.prev, m, m.next) >= 0
    )
      return !1;
    m = m.next;
  }
  return !0;
}
function isEarHashed(e, t, r, n) {
  const i = e.prev,
    a = e,
    s = e.next;
  if (area(i, a, s) >= 0) return !1;
  const o = i.x,
    l = a.x,
    c = s.x,
    h = i.y,
    u = a.y,
    d = s.y,
    p = o < l ? (o < c ? o : c) : l < c ? l : c,
    m = h < u ? (h < d ? h : d) : u < d ? u : d,
    f = o > l ? (o > c ? o : c) : l > c ? l : c,
    g = h > u ? (h > d ? h : d) : u > d ? u : d,
    _ = zOrder(p, m, t, r, n),
    v = zOrder(f, g, t, r, n);
  let x = e.prevZ,
    y = e.nextZ;
  for (; x && x.z >= _ && y && y.z <= v; ) {
    if (
      x.x >= p &&
      x.x <= f &&
      x.y >= m &&
      x.y <= g &&
      x !== i &&
      x !== s &&
      pointInTriangle(o, h, l, u, c, d, x.x, x.y) &&
      area(x.prev, x, x.next) >= 0
    )
      return !1;
    if (
      ((x = x.prevZ),
      y.x >= p &&
        y.x <= f &&
        y.y >= m &&
        y.y <= g &&
        y !== i &&
        y !== s &&
        pointInTriangle(o, h, l, u, c, d, y.x, y.y) &&
        area(y.prev, y, y.next) >= 0)
    )
      return !1;
    y = y.nextZ;
  }
  for (; x && x.z >= _; ) {
    if (
      x.x >= p &&
      x.x <= f &&
      x.y >= m &&
      x.y <= g &&
      x !== i &&
      x !== s &&
      pointInTriangle(o, h, l, u, c, d, x.x, x.y) &&
      area(x.prev, x, x.next) >= 0
    )
      return !1;
    x = x.prevZ;
  }
  for (; y && y.z <= v; ) {
    if (
      y.x >= p &&
      y.x <= f &&
      y.y >= m &&
      y.y <= g &&
      y !== i &&
      y !== s &&
      pointInTriangle(o, h, l, u, c, d, y.x, y.y) &&
      area(y.prev, y, y.next) >= 0
    )
      return !1;
    y = y.nextZ;
  }
  return !0;
}
function cureLocalIntersections(e, t, r) {
  let n = e;
  do {
    const i = n.prev,
      a = n.next.next;
    !equals(i, a) &&
      intersects(i, n, n.next, a) &&
      locallyInside(i, a) &&
      locallyInside(a, i) &&
      (t.push((i.i / r) | 0),
      t.push((n.i / r) | 0),
      t.push((a.i / r) | 0),
      removeNode(n),
      removeNode(n.next),
      (n = e = a)),
      (n = n.next);
  } while (n !== e);
  return filterPoints(n);
}
function splitEarcut(e, t, r, n, i, a) {
  let s = e;
  do {
    let e = s.next.next;
    for (; e !== s.prev; ) {
      if (s.i !== e.i && isValidDiagonal(s, e)) {
        let o = splitPolygon(s, e);
        return (
          (s = filterPoints(s, s.next)),
          (o = filterPoints(o, o.next)),
          earcutLinked(s, t, r, n, i, a, 0),
          void earcutLinked(o, t, r, n, i, a, 0)
        );
      }
      e = e.next;
    }
    s = s.next;
  } while (s !== e);
}
function eliminateHoles(e, t, r, n) {
  const i = [];
  let a, s, o, l, c;
  for (a = 0, s = t.length; a < s; a++)
    (o = t[a] * n),
      (l = a < s - 1 ? t[a + 1] * n : e.length),
      (c = linkedList(e, o, l, n, !1)),
      c === c.next && (c.steiner = !0),
      i.push(getLeftmost(c));
  for (i.sort(compareX), a = 0; a < i.length; a++) r = eliminateHole(i[a], r);
  return r;
}
function compareX(e, t) {
  return e.x - t.x;
}
function eliminateHole(e, t) {
  const r = findHoleBridge(e, t);
  if (!r) return t;
  const n = splitPolygon(r, e);
  return filterPoints(n, n.next), filterPoints(r, r.next);
}
function findHoleBridge(e, t) {
  let r,
    n = t,
    i = -1 / 0;
  const a = e.x,
    s = e.y;
  do {
    if (s <= n.y && s >= n.next.y && n.next.y !== n.y) {
      const e = n.x + ((s - n.y) * (n.next.x - n.x)) / (n.next.y - n.y);
      if (e <= a && e > i && ((i = e), (r = n.x < n.next.x ? n : n.next), e === a)) return r;
    }
    n = n.next;
  } while (n !== t);
  if (!r) return null;
  const o = r,
    l = r.x,
    c = r.y;
  let h,
    u = 1 / 0;
  n = r;
  do {
    a >= n.x &&
      n.x >= l &&
      a !== n.x &&
      pointInTriangle(s < c ? a : i, s, l, c, s < c ? i : a, s, n.x, n.y) &&
      ((h = Math.abs(s - n.y) / (a - n.x)),
      locallyInside(n, e) &&
        (h < u || (h === u && (n.x > r.x || (n.x === r.x && sectorContainsSector(r, n))))) &&
        ((r = n), (u = h))),
      (n = n.next);
  } while (n !== o);
  return r;
}
function sectorContainsSector(e, t) {
  return area(e.prev, e, t.prev) < 0 && area(t.next, e, e.next) < 0;
}
function indexCurve(e, t, r, n) {
  let i = e;
  do {
    0 === i.z && (i.z = zOrder(i.x, i.y, t, r, n)),
      (i.prevZ = i.prev),
      (i.nextZ = i.next),
      (i = i.next);
  } while (i !== e);
  (i.prevZ.nextZ = null), (i.prevZ = null), sortLinked(i);
}
function sortLinked(e) {
  let t,
    r,
    n,
    i,
    a,
    s,
    o,
    l,
    c = 1;
  do {
    for (r = e, e = null, a = null, s = 0; r; ) {
      for (s++, n = r, o = 0, t = 0; t < c && (o++, (n = n.nextZ), n); t++);
      for (l = c; o > 0 || (l > 0 && n); )
        0 !== o && (0 === l || !n || r.z <= n.z)
          ? ((i = r), (r = r.nextZ), o--)
          : ((i = n), (n = n.nextZ), l--),
          a ? (a.nextZ = i) : (e = i),
          (i.prevZ = a),
          (a = i);
      r = n;
    }
    (a.nextZ = null), (c *= 2);
  } while (s > 1);
  return e;
}
function zOrder(e, t, r, n, i) {
  return (
    (e =
      1431655765 &
      ((e =
        858993459 &
        ((e = 252645135 & ((e = 16711935 & ((e = ((e - r) * i) | 0) | (e << 8))) | (e << 4))) |
          (e << 2))) |
        (e << 1))) |
    ((t =
      1431655765 &
      ((t =
        858993459 &
        ((t = 252645135 & ((t = 16711935 & ((t = ((t - n) * i) | 0) | (t << 8))) | (t << 4))) |
          (t << 2))) |
        (t << 1))) <<
      1)
  );
}
function getLeftmost(e) {
  let t = e,
    r = e;
  do {
    (t.x < r.x || (t.x === r.x && t.y < r.y)) && (r = t), (t = t.next);
  } while (t !== e);
  return r;
}
function pointInTriangle(e, t, r, n, i, a, s, o) {
  return (
    (i - s) * (t - o) >= (e - s) * (a - o) &&
    (e - s) * (n - o) >= (r - s) * (t - o) &&
    (r - s) * (a - o) >= (i - s) * (n - o)
  );
}
function isValidDiagonal(e, t) {
  return (
    e.next.i !== t.i &&
    e.prev.i !== t.i &&
    !intersectsPolygon(e, t) &&
    ((locallyInside(e, t) &&
      locallyInside(t, e) &&
      middleInside(e, t) &&
      (area(e.prev, e, t.prev) || area(e, t.prev, t))) ||
      (equals(e, t) && area(e.prev, e, e.next) > 0 && area(t.prev, t, t.next) > 0))
  );
}
function area(e, t, r) {
  return (t.y - e.y) * (r.x - t.x) - (t.x - e.x) * (r.y - t.y);
}
function equals(e, t) {
  return e.x === t.x && e.y === t.y;
}
function intersects(e, t, r, n) {
  const i = sign(area(e, t, r)),
    a = sign(area(e, t, n)),
    s = sign(area(r, n, e)),
    o = sign(area(r, n, t));
  return (
    (i !== a && s !== o) ||
    !(0 !== i || !onSegment(e, r, t)) ||
    !(0 !== a || !onSegment(e, n, t)) ||
    !(0 !== s || !onSegment(r, e, n)) ||
    !(0 !== o || !onSegment(r, t, n))
  );
}
function onSegment(e, t, r) {
  return (
    t.x <= Math.max(e.x, r.x) &&
    t.x >= Math.min(e.x, r.x) &&
    t.y <= Math.max(e.y, r.y) &&
    t.y >= Math.min(e.y, r.y)
  );
}
function sign(e) {
  return e > 0 ? 1 : e < 0 ? -1 : 0;
}
function intersectsPolygon(e, t) {
  let r = e;
  do {
    if (
      r.i !== e.i &&
      r.next.i !== e.i &&
      r.i !== t.i &&
      r.next.i !== t.i &&
      intersects(r, r.next, e, t)
    )
      return !0;
    r = r.next;
  } while (r !== e);
  return !1;
}
function locallyInside(e, t) {
  return area(e.prev, e, e.next) < 0
    ? area(e, t, e.next) >= 0 && area(e, e.prev, t) >= 0
    : area(e, t, e.prev) < 0 || area(e, e.next, t) < 0;
}
function middleInside(e, t) {
  let r = e,
    n = !1;
  const i = (e.x + t.x) / 2,
    a = (e.y + t.y) / 2;
  do {
    r.y > a != r.next.y > a &&
      r.next.y !== r.y &&
      i < ((r.next.x - r.x) * (a - r.y)) / (r.next.y - r.y) + r.x &&
      (n = !n),
      (r = r.next);
  } while (r !== e);
  return n;
}
function splitPolygon(e, t) {
  const r = new Node(e.i, e.x, e.y),
    n = new Node(t.i, t.x, t.y),
    i = e.next,
    a = t.prev;
  return (
    (e.next = t),
    (t.prev = e),
    (r.next = i),
    (i.prev = r),
    (n.next = r),
    (r.prev = n),
    (a.next = n),
    (n.prev = a),
    n
  );
}
function insertNode(e, t, r, n) {
  const i = new Node(e, t, r);
  return (
    n
      ? ((i.next = n.next), (i.prev = n), (n.next.prev = i), (n.next = i))
      : ((i.prev = i), (i.next = i)),
    i
  );
}
function removeNode(e) {
  (e.next.prev = e.prev),
    (e.prev.next = e.next),
    e.prevZ && (e.prevZ.nextZ = e.nextZ),
    e.nextZ && (e.nextZ.prevZ = e.prevZ);
}
function Node(e, t, r) {
  (this.i = e),
    (this.x = t),
    (this.y = r),
    (this.prev = null),
    (this.next = null),
    (this.z = 0),
    (this.prevZ = null),
    (this.nextZ = null),
    (this.steiner = !1);
}
function signedArea(e, t, r, n) {
  let i = 0;
  for (let a = t, s = r - n; a < r; a += n) (i += (e[s] - e[a]) * (e[a + 1] + e[s + 1])), (s = a);
  return i;
}
class ShapeUtils {
  static area(e) {
    const t = e.length;
    let r = 0;
    for (let n = t - 1, i = 0; i < t; n = i++) r += e[n].x * e[i].y - e[i].x * e[n].y;
    return 0.5 * r;
  }
  static isClockWise(e) {
    return ShapeUtils.area(e) < 0;
  }
  static triangulateShape(e, t) {
    const r = [],
      n = [],
      i = [];
    removeDupEndPts(e), addContour(r, e);
    let a = e.length;
    t.forEach(removeDupEndPts);
    for (let e = 0; e < t.length; e++) n.push(a), (a += t[e].length), addContour(r, t[e]);
    const s = Earcut.triangulate(r, n);
    for (let e = 0; e < s.length; e += 3) i.push(s.slice(e, e + 3));
    return i;
  }
}
function removeDupEndPts(e) {
  const t = e.length;
  t > 2 && e[t - 1].equals(e[0]) && e.pop();
}
function addContour(e, t) {
  for (let r = 0; r < t.length; r++) e.push(t[r].x), e.push(t[r].y);
}
class ExtrudeGeometry extends BufferGeometry {
  constructor(
    e = new Shape([
      new Vector2(0.5, 0.5),
      new Vector2(-0.5, 0.5),
      new Vector2(-0.5, -0.5),
      new Vector2(0.5, -0.5),
    ]),
    t = {},
  ) {
    super(),
      (this.type = 'ExtrudeGeometry'),
      (this.parameters = { shapes: e, options: t }),
      (e = Array.isArray(e) ? e : [e]);
    const r = this,
      n = [],
      i = [];
    for (let t = 0, r = e.length; t < r; t++) {
      a(e[t]);
    }
    function a(e) {
      const a = [],
        s = void 0 !== t.curveSegments ? t.curveSegments : 12,
        o = void 0 !== t.steps ? t.steps : 1,
        l = void 0 !== t.depth ? t.depth : 1;
      let c = void 0 === t.bevelEnabled || t.bevelEnabled,
        h = void 0 !== t.bevelThickness ? t.bevelThickness : 0.2,
        u = void 0 !== t.bevelSize ? t.bevelSize : h - 0.1,
        d = void 0 !== t.bevelOffset ? t.bevelOffset : 0,
        p = void 0 !== t.bevelSegments ? t.bevelSegments : 3;
      const m = t.extrudePath,
        f = void 0 !== t.UVGenerator ? t.UVGenerator : WorldUVGenerator;
      let g,
        _,
        v,
        x,
        y,
        M = !1;
      m &&
        ((g = m.getSpacedPoints(o)),
        (M = !0),
        (c = !1),
        (_ = m.computeFrenetFrames(o, !1)),
        (v = new Vector3()),
        (x = new Vector3()),
        (y = new Vector3())),
        c || ((p = 0), (h = 0), (u = 0), (d = 0));
      const S = e.extractPoints(s);
      let b = S.shape;
      const T = S.holes;
      if (!ShapeUtils.isClockWise(b)) {
        b = b.reverse();
        for (let e = 0, t = T.length; e < t; e++) {
          const t = T[e];
          ShapeUtils.isClockWise(t) && (T[e] = t.reverse());
        }
      }
      const E = ShapeUtils.triangulateShape(b, T),
        A = b;
      for (let e = 0, t = T.length; e < t; e++) {
        const t = T[e];
        b = b.concat(t);
      }
      function w(e, t, r) {
        return (
          t || console.error('THREE.ExtrudeGeometry: vec does not exist'),
          e.clone().addScaledVector(t, r)
        );
      }
      const C = b.length,
        R = E.length;
      function L(e, t, r) {
        let n, i, a;
        const s = e.x - t.x,
          o = e.y - t.y,
          l = r.x - e.x,
          c = r.y - e.y,
          h = s * s + o * o,
          u = s * c - o * l;
        if (Math.abs(u) > Number.EPSILON) {
          const u = Math.sqrt(h),
            d = Math.sqrt(l * l + c * c),
            p = t.x - o / u,
            m = t.y + s / u,
            f = ((r.x - c / d - p) * c - (r.y + l / d - m) * l) / (s * c - o * l);
          (n = p + s * f - e.x), (i = m + o * f - e.y);
          const g = n * n + i * i;
          if (g <= 2) return new Vector2(n, i);
          a = Math.sqrt(g / 2);
        } else {
          let e = !1;
          s > Number.EPSILON
            ? l > Number.EPSILON && (e = !0)
            : s < -Number.EPSILON
              ? l < -Number.EPSILON && (e = !0)
              : Math.sign(o) === Math.sign(c) && (e = !0),
            e
              ? ((n = -o), (i = s), (a = Math.sqrt(h)))
              : ((n = s), (i = o), (a = Math.sqrt(h / 2)));
        }
        return new Vector2(n / a, i / a);
      }
      const P = [];
      for (let e = 0, t = A.length, r = t - 1, n = e + 1; e < t; e++, r++, n++)
        r === t && (r = 0), n === t && (n = 0), (P[e] = L(A[e], A[r], A[n]));
      const I = [];
      let U,
        D = P.concat();
      for (let e = 0, t = T.length; e < t; e++) {
        const t = T[e];
        U = [];
        for (let e = 0, r = t.length, n = r - 1, i = e + 1; e < r; e++, n++, i++)
          n === r && (n = 0), i === r && (i = 0), (U[e] = L(t[e], t[n], t[i]));
        I.push(U), (D = D.concat(U));
      }
      for (let e = 0; e < p; e++) {
        const t = e / p,
          r = h * Math.cos((t * Math.PI) / 2),
          n = u * Math.sin((t * Math.PI) / 2) + d;
        for (let e = 0, t = A.length; e < t; e++) {
          const t = w(A[e], P[e], n);
          O(t.x, t.y, -r);
        }
        for (let e = 0, t = T.length; e < t; e++) {
          const t = T[e];
          U = I[e];
          for (let e = 0, i = t.length; e < i; e++) {
            const i = w(t[e], U[e], n);
            O(i.x, i.y, -r);
          }
        }
      }
      const B = u + d;
      for (let e = 0; e < C; e++) {
        const t = c ? w(b[e], D[e], B) : b[e];
        M
          ? (x.copy(_.normals[0]).multiplyScalar(t.x),
            v.copy(_.binormals[0]).multiplyScalar(t.y),
            y.copy(g[0]).add(x).add(v),
            O(y.x, y.y, y.z))
          : O(t.x, t.y, 0);
      }
      for (let e = 1; e <= o; e++)
        for (let t = 0; t < C; t++) {
          const r = c ? w(b[t], D[t], B) : b[t];
          M
            ? (x.copy(_.normals[e]).multiplyScalar(r.x),
              v.copy(_.binormals[e]).multiplyScalar(r.y),
              y.copy(g[e]).add(x).add(v),
              O(y.x, y.y, y.z))
            : O(r.x, r.y, (l / o) * e);
        }
      for (let e = p - 1; e >= 0; e--) {
        const t = e / p,
          r = h * Math.cos((t * Math.PI) / 2),
          n = u * Math.sin((t * Math.PI) / 2) + d;
        for (let e = 0, t = A.length; e < t; e++) {
          const t = w(A[e], P[e], n);
          O(t.x, t.y, l + r);
        }
        for (let e = 0, t = T.length; e < t; e++) {
          const t = T[e];
          U = I[e];
          for (let e = 0, i = t.length; e < i; e++) {
            const i = w(t[e], U[e], n);
            M ? O(i.x, i.y + g[o - 1].y, g[o - 1].x + r) : O(i.x, i.y, l + r);
          }
        }
      }
      function N(e, t) {
        let r = e.length;
        for (; --r >= 0; ) {
          const n = r;
          let i = r - 1;
          i < 0 && (i = e.length - 1);
          for (let e = 0, r = o + 2 * p; e < r; e++) {
            const r = C * e,
              a = C * (e + 1);
            V(t + n + r, t + i + r, t + i + a, t + n + a);
          }
        }
      }
      function O(e, t, r) {
        a.push(e), a.push(t), a.push(r);
      }
      function F(e, t, i) {
        G(e), G(t), G(i);
        const a = n.length / 3,
          s = f.generateTopUV(r, n, a - 3, a - 2, a - 1);
        z(s[0]), z(s[1]), z(s[2]);
      }
      function V(e, t, i, a) {
        G(e), G(t), G(a), G(t), G(i), G(a);
        const s = n.length / 3,
          o = f.generateSideWallUV(r, n, s - 6, s - 3, s - 2, s - 1);
        z(o[0]), z(o[1]), z(o[3]), z(o[1]), z(o[2]), z(o[3]);
      }
      function G(e) {
        n.push(a[3 * e + 0]), n.push(a[3 * e + 1]), n.push(a[3 * e + 2]);
      }
      function z(e) {
        i.push(e.x), i.push(e.y);
      }
      !(function () {
        const e = n.length / 3;
        if (c) {
          let e = 0,
            t = C * e;
          for (let e = 0; e < R; e++) {
            const r = E[e];
            F(r[2] + t, r[1] + t, r[0] + t);
          }
          (e = o + 2 * p), (t = C * e);
          for (let e = 0; e < R; e++) {
            const r = E[e];
            F(r[0] + t, r[1] + t, r[2] + t);
          }
        } else {
          for (let e = 0; e < R; e++) {
            const t = E[e];
            F(t[2], t[1], t[0]);
          }
          for (let e = 0; e < R; e++) {
            const t = E[e];
            F(t[0] + C * o, t[1] + C * o, t[2] + C * o);
          }
        }
        r.addGroup(e, n.length / 3 - e, 0);
      })(),
        (function () {
          const e = n.length / 3;
          let t = 0;
          N(A, t), (t += A.length);
          for (let e = 0, r = T.length; e < r; e++) {
            const r = T[e];
            N(r, t), (t += r.length);
          }
          r.addGroup(e, n.length / 3 - e, 1);
        })();
    }
    this.setAttribute('position', new Float32BufferAttribute(n, 3)),
      this.setAttribute('uv', new Float32BufferAttribute(i, 2)),
      this.computeVertexNormals();
  }
  copy(e) {
    return super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this;
  }
  toJSON() {
    const e = super.toJSON();
    return toJSON$1(this.parameters.shapes, this.parameters.options, e);
  }
  static fromJSON(e, t) {
    const r = [];
    for (let n = 0, i = e.shapes.length; n < i; n++) {
      const i = t[e.shapes[n]];
      r.push(i);
    }
    const n = e.options.extrudePath;
    return (
      void 0 !== n && (e.options.extrudePath = new Curves[n.type]().fromJSON(n)),
      new ExtrudeGeometry(r, e.options)
    );
  }
}
const WorldUVGenerator = {
  generateTopUV: function (e, t, r, n, i) {
    const a = t[3 * r],
      s = t[3 * r + 1],
      o = t[3 * n],
      l = t[3 * n + 1],
      c = t[3 * i],
      h = t[3 * i + 1];
    return [new Vector2(a, s), new Vector2(o, l), new Vector2(c, h)];
  },
  generateSideWallUV: function (e, t, r, n, i, a) {
    const s = t[3 * r],
      o = t[3 * r + 1],
      l = t[3 * r + 2],
      c = t[3 * n],
      h = t[3 * n + 1],
      u = t[3 * n + 2],
      d = t[3 * i],
      p = t[3 * i + 1],
      m = t[3 * i + 2],
      f = t[3 * a],
      g = t[3 * a + 1],
      _ = t[3 * a + 2];
    return Math.abs(o - h) < Math.abs(s - c)
      ? [new Vector2(s, 1 - l), new Vector2(c, 1 - u), new Vector2(d, 1 - m), new Vector2(f, 1 - _)]
      : [
          new Vector2(o, 1 - l),
          new Vector2(h, 1 - u),
          new Vector2(p, 1 - m),
          new Vector2(g, 1 - _),
        ];
  },
};
function toJSON$1(e, t, r) {
  if (((r.shapes = []), Array.isArray(e)))
    for (let t = 0, n = e.length; t < n; t++) {
      const n = e[t];
      r.shapes.push(n.uuid);
    }
  else r.shapes.push(e.uuid);
  return (
    (r.options = Object.assign({}, t)),
    void 0 !== t.extrudePath && (r.options.extrudePath = t.extrudePath.toJSON()),
    r
  );
}
class IcosahedronGeometry extends PolyhedronGeometry {
  constructor(e = 1, t = 0) {
    const r = (1 + Math.sqrt(5)) / 2;
    super(
      [
        -1,
        r,
        0,
        1,
        r,
        0,
        -1,
        -r,
        0,
        1,
        -r,
        0,
        0,
        -1,
        r,
        0,
        1,
        r,
        0,
        -1,
        -r,
        0,
        1,
        -r,
        r,
        0,
        -1,
        r,
        0,
        1,
        -r,
        0,
        -1,
        -r,
        0,
        1,
      ],
      [
        0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7,
        1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9,
        8, 1,
      ],
      e,
      t,
    ),
      (this.type = 'IcosahedronGeometry'),
      (this.parameters = { radius: e, detail: t });
  }
  static fromJSON(e) {
    return new IcosahedronGeometry(e.radius, e.detail);
  }
}
class OctahedronGeometry extends PolyhedronGeometry {
  constructor(e = 1, t = 0) {
    super(
      [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1],
      [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2],
      e,
      t,
    ),
      (this.type = 'OctahedronGeometry'),
      (this.parameters = { radius: e, detail: t });
  }
  static fromJSON(e) {
    return new OctahedronGeometry(e.radius, e.detail);
  }
}
class RingGeometry extends BufferGeometry {
  constructor(e = 0.5, t = 1, r = 32, n = 1, i = 0, a = 2 * Math.PI) {
    super(),
      (this.type = 'RingGeometry'),
      (this.parameters = {
        innerRadius: e,
        outerRadius: t,
        thetaSegments: r,
        phiSegments: n,
        thetaStart: i,
        thetaLength: a,
      }),
      (r = Math.max(3, r));
    const s = [],
      o = [],
      l = [],
      c = [];
    let h = e;
    const u = (t - e) / (n = Math.max(1, n)),
      d = new Vector3(),
      p = new Vector2();
    for (let e = 0; e <= n; e++) {
      for (let e = 0; e <= r; e++) {
        const n = i + (e / r) * a;
        (d.x = h * Math.cos(n)),
          (d.y = h * Math.sin(n)),
          o.push(d.x, d.y, d.z),
          l.push(0, 0, 1),
          (p.x = (d.x / t + 1) / 2),
          (p.y = (d.y / t + 1) / 2),
          c.push(p.x, p.y);
      }
      h += u;
    }
    for (let e = 0; e < n; e++) {
      const t = e * (r + 1);
      for (let e = 0; e < r; e++) {
        const n = e + t,
          i = n,
          a = n + r + 1,
          o = n + r + 2,
          l = n + 1;
        s.push(i, a, l), s.push(a, o, l);
      }
    }
    this.setIndex(s),
      this.setAttribute('position', new Float32BufferAttribute(o, 3)),
      this.setAttribute('normal', new Float32BufferAttribute(l, 3)),
      this.setAttribute('uv', new Float32BufferAttribute(c, 2));
  }
  copy(e) {
    return super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this;
  }
  static fromJSON(e) {
    return new RingGeometry(
      e.innerRadius,
      e.outerRadius,
      e.thetaSegments,
      e.phiSegments,
      e.thetaStart,
      e.thetaLength,
    );
  }
}
class ShapeGeometry extends BufferGeometry {
  constructor(
    e = new Shape([new Vector2(0, 0.5), new Vector2(-0.5, -0.5), new Vector2(0.5, -0.5)]),
    t = 12,
  ) {
    super(), (this.type = 'ShapeGeometry'), (this.parameters = { shapes: e, curveSegments: t });
    const r = [],
      n = [],
      i = [],
      a = [];
    let s = 0,
      o = 0;
    if (!1 === Array.isArray(e)) l(e);
    else for (let t = 0; t < e.length; t++) l(e[t]), this.addGroup(s, o, t), (s += o), (o = 0);
    function l(e) {
      const s = n.length / 3,
        l = e.extractPoints(t);
      let c = l.shape;
      const h = l.holes;
      !1 === ShapeUtils.isClockWise(c) && (c = c.reverse());
      for (let e = 0, t = h.length; e < t; e++) {
        const t = h[e];
        !0 === ShapeUtils.isClockWise(t) && (h[e] = t.reverse());
      }
      const u = ShapeUtils.triangulateShape(c, h);
      for (let e = 0, t = h.length; e < t; e++) {
        const t = h[e];
        c = c.concat(t);
      }
      for (let e = 0, t = c.length; e < t; e++) {
        const t = c[e];
        n.push(t.x, t.y, 0), i.push(0, 0, 1), a.push(t.x, t.y);
      }
      for (let e = 0, t = u.length; e < t; e++) {
        const t = u[e],
          n = t[0] + s,
          i = t[1] + s,
          a = t[2] + s;
        r.push(n, i, a), (o += 3);
      }
    }
    this.setIndex(r),
      this.setAttribute('position', new Float32BufferAttribute(n, 3)),
      this.setAttribute('normal', new Float32BufferAttribute(i, 3)),
      this.setAttribute('uv', new Float32BufferAttribute(a, 2));
  }
  copy(e) {
    return super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this;
  }
  toJSON() {
    const e = super.toJSON();
    return toJSON(this.parameters.shapes, e);
  }
  static fromJSON(e, t) {
    const r = [];
    for (let n = 0, i = e.shapes.length; n < i; n++) {
      const i = t[e.shapes[n]];
      r.push(i);
    }
    return new ShapeGeometry(r, e.curveSegments);
  }
}
function toJSON(e, t) {
  if (((t.shapes = []), Array.isArray(e)))
    for (let r = 0, n = e.length; r < n; r++) {
      const n = e[r];
      t.shapes.push(n.uuid);
    }
  else t.shapes.push(e.uuid);
  return t;
}
class SphereGeometry extends BufferGeometry {
  constructor(e = 1, t = 32, r = 16, n = 0, i = 2 * Math.PI, a = 0, s = Math.PI) {
    super(),
      (this.type = 'SphereGeometry'),
      (this.parameters = {
        radius: e,
        widthSegments: t,
        heightSegments: r,
        phiStart: n,
        phiLength: i,
        thetaStart: a,
        thetaLength: s,
      }),
      (t = Math.max(3, Math.floor(t))),
      (r = Math.max(2, Math.floor(r)));
    const o = Math.min(a + s, Math.PI);
    let l = 0;
    const c = [],
      h = new Vector3(),
      u = new Vector3(),
      d = [],
      p = [],
      m = [],
      f = [];
    for (let d = 0; d <= r; d++) {
      const g = [],
        _ = d / r;
      let v = 0;
      0 === d && 0 === a ? (v = 0.5 / t) : d === r && o === Math.PI && (v = -0.5 / t);
      for (let r = 0; r <= t; r++) {
        const o = r / t;
        (h.x = -e * Math.cos(n + o * i) * Math.sin(a + _ * s)),
          (h.y = e * Math.cos(a + _ * s)),
          (h.z = e * Math.sin(n + o * i) * Math.sin(a + _ * s)),
          p.push(h.x, h.y, h.z),
          u.copy(h).normalize(),
          m.push(u.x, u.y, u.z),
          f.push(o + v, 1 - _),
          g.push(l++);
      }
      c.push(g);
    }
    for (let e = 0; e < r; e++)
      for (let n = 0; n < t; n++) {
        const t = c[e][n + 1],
          i = c[e][n],
          s = c[e + 1][n],
          l = c[e + 1][n + 1];
        (0 !== e || a > 0) && d.push(t, i, l), (e !== r - 1 || o < Math.PI) && d.push(i, s, l);
      }
    this.setIndex(d),
      this.setAttribute('position', new Float32BufferAttribute(p, 3)),
      this.setAttribute('normal', new Float32BufferAttribute(m, 3)),
      this.setAttribute('uv', new Float32BufferAttribute(f, 2));
  }
  copy(e) {
    return super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this;
  }
  static fromJSON(e) {
    return new SphereGeometry(
      e.radius,
      e.widthSegments,
      e.heightSegments,
      e.phiStart,
      e.phiLength,
      e.thetaStart,
      e.thetaLength,
    );
  }
}
class TetrahedronGeometry extends PolyhedronGeometry {
  constructor(e = 1, t = 0) {
    super([1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1], [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1], e, t),
      (this.type = 'TetrahedronGeometry'),
      (this.parameters = { radius: e, detail: t });
  }
  static fromJSON(e) {
    return new TetrahedronGeometry(e.radius, e.detail);
  }
}
class TorusGeometry extends BufferGeometry {
  constructor(e = 1, t = 0.4, r = 12, n = 48, i = 2 * Math.PI) {
    super(),
      (this.type = 'TorusGeometry'),
      (this.parameters = { radius: e, tube: t, radialSegments: r, tubularSegments: n, arc: i }),
      (r = Math.floor(r)),
      (n = Math.floor(n));
    const a = [],
      s = [],
      o = [],
      l = [],
      c = new Vector3(),
      h = new Vector3(),
      u = new Vector3();
    for (let a = 0; a <= r; a++)
      for (let d = 0; d <= n; d++) {
        const p = (d / n) * i,
          m = (a / r) * Math.PI * 2;
        (h.x = (e + t * Math.cos(m)) * Math.cos(p)),
          (h.y = (e + t * Math.cos(m)) * Math.sin(p)),
          (h.z = t * Math.sin(m)),
          s.push(h.x, h.y, h.z),
          (c.x = e * Math.cos(p)),
          (c.y = e * Math.sin(p)),
          u.subVectors(h, c).normalize(),
          o.push(u.x, u.y, u.z),
          l.push(d / n),
          l.push(a / r);
      }
    for (let e = 1; e <= r; e++)
      for (let t = 1; t <= n; t++) {
        const r = (n + 1) * e + t - 1,
          i = (n + 1) * (e - 1) + t - 1,
          s = (n + 1) * (e - 1) + t,
          o = (n + 1) * e + t;
        a.push(r, i, o), a.push(i, s, o);
      }
    this.setIndex(a),
      this.setAttribute('position', new Float32BufferAttribute(s, 3)),
      this.setAttribute('normal', new Float32BufferAttribute(o, 3)),
      this.setAttribute('uv', new Float32BufferAttribute(l, 2));
  }
  copy(e) {
    return super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this;
  }
  static fromJSON(e) {
    return new TorusGeometry(e.radius, e.tube, e.radialSegments, e.tubularSegments, e.arc);
  }
}
class TorusKnotGeometry extends BufferGeometry {
  constructor(e = 1, t = 0.4, r = 64, n = 8, i = 2, a = 3) {
    super(),
      (this.type = 'TorusKnotGeometry'),
      (this.parameters = { radius: e, tube: t, tubularSegments: r, radialSegments: n, p: i, q: a }),
      (r = Math.floor(r)),
      (n = Math.floor(n));
    const s = [],
      o = [],
      l = [],
      c = [],
      h = new Vector3(),
      u = new Vector3(),
      d = new Vector3(),
      p = new Vector3(),
      m = new Vector3(),
      f = new Vector3(),
      g = new Vector3();
    for (let s = 0; s <= r; ++s) {
      const v = (s / r) * i * Math.PI * 2;
      _(v, i, a, e, d),
        _(v + 0.01, i, a, e, p),
        f.subVectors(p, d),
        g.addVectors(p, d),
        m.crossVectors(f, g),
        g.crossVectors(m, f),
        m.normalize(),
        g.normalize();
      for (let e = 0; e <= n; ++e) {
        const i = (e / n) * Math.PI * 2,
          a = -t * Math.cos(i),
          p = t * Math.sin(i);
        (h.x = d.x + (a * g.x + p * m.x)),
          (h.y = d.y + (a * g.y + p * m.y)),
          (h.z = d.z + (a * g.z + p * m.z)),
          o.push(h.x, h.y, h.z),
          u.subVectors(h, d).normalize(),
          l.push(u.x, u.y, u.z),
          c.push(s / r),
          c.push(e / n);
      }
    }
    for (let e = 1; e <= r; e++)
      for (let t = 1; t <= n; t++) {
        const r = (n + 1) * (e - 1) + (t - 1),
          i = (n + 1) * e + (t - 1),
          a = (n + 1) * e + t,
          o = (n + 1) * (e - 1) + t;
        s.push(r, i, o), s.push(i, a, o);
      }
    function _(e, t, r, n, i) {
      const a = Math.cos(e),
        s = Math.sin(e),
        o = (r / t) * e,
        l = Math.cos(o);
      (i.x = n * (2 + l) * 0.5 * a), (i.y = n * (2 + l) * s * 0.5), (i.z = n * Math.sin(o) * 0.5);
    }
    this.setIndex(s),
      this.setAttribute('position', new Float32BufferAttribute(o, 3)),
      this.setAttribute('normal', new Float32BufferAttribute(l, 3)),
      this.setAttribute('uv', new Float32BufferAttribute(c, 2));
  }
  copy(e) {
    return super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this;
  }
  static fromJSON(e) {
    return new TorusKnotGeometry(e.radius, e.tube, e.tubularSegments, e.radialSegments, e.p, e.q);
  }
}
class TubeGeometry extends BufferGeometry {
  constructor(
    e = new QuadraticBezierCurve3(
      new Vector3(-1, -1, 0),
      new Vector3(-1, 1, 0),
      new Vector3(1, 1, 0),
    ),
    t = 64,
    r = 1,
    n = 8,
    i = !1,
  ) {
    super(),
      (this.type = 'TubeGeometry'),
      (this.parameters = { path: e, tubularSegments: t, radius: r, radialSegments: n, closed: i });
    const a = e.computeFrenetFrames(t, i);
    (this.tangents = a.tangents), (this.normals = a.normals), (this.binormals = a.binormals);
    const s = new Vector3(),
      o = new Vector3(),
      l = new Vector2();
    let c = new Vector3();
    const h = [],
      u = [],
      d = [],
      p = [];
    function m(i) {
      c = e.getPointAt(i / t, c);
      const l = a.normals[i],
        d = a.binormals[i];
      for (let e = 0; e <= n; e++) {
        const t = (e / n) * Math.PI * 2,
          i = Math.sin(t),
          a = -Math.cos(t);
        (o.x = a * l.x + i * d.x),
          (o.y = a * l.y + i * d.y),
          (o.z = a * l.z + i * d.z),
          o.normalize(),
          u.push(o.x, o.y, o.z),
          (s.x = c.x + r * o.x),
          (s.y = c.y + r * o.y),
          (s.z = c.z + r * o.z),
          h.push(s.x, s.y, s.z);
      }
    }
    !(function () {
      for (let e = 0; e < t; e++) m(e);
      m(!1 === i ? t : 0),
        (function () {
          for (let e = 0; e <= t; e++)
            for (let r = 0; r <= n; r++) (l.x = e / t), (l.y = r / n), d.push(l.x, l.y);
        })(),
        (function () {
          for (let e = 1; e <= t; e++)
            for (let t = 1; t <= n; t++) {
              const r = (n + 1) * (e - 1) + (t - 1),
                i = (n + 1) * e + (t - 1),
                a = (n + 1) * e + t,
                s = (n + 1) * (e - 1) + t;
              p.push(r, i, s), p.push(i, a, s);
            }
        })();
    })(),
      this.setIndex(p),
      this.setAttribute('position', new Float32BufferAttribute(h, 3)),
      this.setAttribute('normal', new Float32BufferAttribute(u, 3)),
      this.setAttribute('uv', new Float32BufferAttribute(d, 2));
  }
  copy(e) {
    return super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this;
  }
  toJSON() {
    const e = super.toJSON();
    return (e.path = this.parameters.path.toJSON()), e;
  }
  static fromJSON(e) {
    return new TubeGeometry(
      new Curves[e.path.type]().fromJSON(e.path),
      e.tubularSegments,
      e.radius,
      e.radialSegments,
      e.closed,
    );
  }
}
class WireframeGeometry extends BufferGeometry {
  constructor(e = null) {
    if (
      (super(), (this.type = 'WireframeGeometry'), (this.parameters = { geometry: e }), null !== e)
    ) {
      const t = [],
        r = new Set(),
        n = new Vector3(),
        i = new Vector3();
      if (null !== e.index) {
        const a = e.attributes.position,
          s = e.index;
        let o = e.groups;
        0 === o.length && (o = [{ start: 0, count: s.count, materialIndex: 0 }]);
        for (let e = 0, l = o.length; e < l; ++e) {
          const l = o[e],
            c = l.start;
          for (let e = c, o = c + l.count; e < o; e += 3)
            for (let o = 0; o < 3; o++) {
              const l = s.getX(e + o),
                c = s.getX(e + ((o + 1) % 3));
              n.fromBufferAttribute(a, l),
                i.fromBufferAttribute(a, c),
                !0 === isUniqueEdge(n, i, r) && (t.push(n.x, n.y, n.z), t.push(i.x, i.y, i.z));
            }
        }
      } else {
        const a = e.attributes.position;
        for (let e = 0, s = a.count / 3; e < s; e++)
          for (let s = 0; s < 3; s++) {
            const o = 3 * e + s,
              l = 3 * e + ((s + 1) % 3);
            n.fromBufferAttribute(a, o),
              i.fromBufferAttribute(a, l),
              !0 === isUniqueEdge(n, i, r) && (t.push(n.x, n.y, n.z), t.push(i.x, i.y, i.z));
          }
      }
      this.setAttribute('position', new Float32BufferAttribute(t, 3));
    }
  }
  copy(e) {
    return super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this;
  }
}
function isUniqueEdge(e, t, r) {
  const n = `${e.x},${e.y},${e.z}-${t.x},${t.y},${t.z}`,
    i = `${t.x},${t.y},${t.z}-${e.x},${e.y},${e.z}`;
  return !0 !== r.has(n) && !0 !== r.has(i) && (r.add(n), r.add(i), !0);
}
var Geometries = Object.freeze({
  __proto__: null,
  BoxGeometry: BoxGeometry,
  CapsuleGeometry: CapsuleGeometry,
  CircleGeometry: CircleGeometry,
  ConeGeometry: ConeGeometry,
  CylinderGeometry: CylinderGeometry,
  DodecahedronGeometry: DodecahedronGeometry,
  EdgesGeometry: EdgesGeometry,
  ExtrudeGeometry: ExtrudeGeometry,
  IcosahedronGeometry: IcosahedronGeometry,
  LatheGeometry: LatheGeometry,
  OctahedronGeometry: OctahedronGeometry,
  PlaneGeometry: PlaneGeometry,
  PolyhedronGeometry: PolyhedronGeometry,
  RingGeometry: RingGeometry,
  ShapeGeometry: ShapeGeometry,
  SphereGeometry: SphereGeometry,
  TetrahedronGeometry: TetrahedronGeometry,
  TorusGeometry: TorusGeometry,
  TorusKnotGeometry: TorusKnotGeometry,
  TubeGeometry: TubeGeometry,
  WireframeGeometry: WireframeGeometry,
});
class ShadowMaterial extends Material {
  constructor(e) {
    super(),
      (this.isShadowMaterial = !0),
      (this.type = 'ShadowMaterial'),
      (this.color = new Color(0)),
      (this.transparent = !0),
      (this.fog = !0),
      this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), (this.fog = e.fog), this;
  }
}
class RawShaderMaterial extends ShaderMaterial {
  constructor(e) {
    super(e), (this.isRawShaderMaterial = !0), (this.type = 'RawShaderMaterial');
  }
}
class MeshStandardMaterial extends Material {
  constructor(e) {
    super(),
      (this.isMeshStandardMaterial = !0),
      (this.defines = { STANDARD: '' }),
      (this.type = 'MeshStandardMaterial'),
      (this.color = new Color(16777215)),
      (this.roughness = 1),
      (this.metalness = 0),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.emissive = new Color(0)),
      (this.emissiveIntensity = 1),
      (this.emissiveMap = null),
      (this.bumpMap = null),
      (this.bumpScale = 1),
      (this.normalMap = null),
      (this.normalMapType = 0),
      (this.normalScale = new Vector2(1, 1)),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.roughnessMap = null),
      (this.metalnessMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.envMapIntensity = 1),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = 'round'),
      (this.wireframeLinejoin = 'round'),
      (this.flatShading = !1),
      (this.fog = !0),
      this.setValues(e);
  }
  copy(e) {
    return (
      super.copy(e),
      (this.defines = { STANDARD: '' }),
      this.color.copy(e.color),
      (this.roughness = e.roughness),
      (this.metalness = e.metalness),
      (this.map = e.map),
      (this.lightMap = e.lightMap),
      (this.lightMapIntensity = e.lightMapIntensity),
      (this.aoMap = e.aoMap),
      (this.aoMapIntensity = e.aoMapIntensity),
      this.emissive.copy(e.emissive),
      (this.emissiveMap = e.emissiveMap),
      (this.emissiveIntensity = e.emissiveIntensity),
      (this.bumpMap = e.bumpMap),
      (this.bumpScale = e.bumpScale),
      (this.normalMap = e.normalMap),
      (this.normalMapType = e.normalMapType),
      this.normalScale.copy(e.normalScale),
      (this.displacementMap = e.displacementMap),
      (this.displacementScale = e.displacementScale),
      (this.displacementBias = e.displacementBias),
      (this.roughnessMap = e.roughnessMap),
      (this.metalnessMap = e.metalnessMap),
      (this.alphaMap = e.alphaMap),
      (this.envMap = e.envMap),
      (this.envMapIntensity = e.envMapIntensity),
      (this.wireframe = e.wireframe),
      (this.wireframeLinewidth = e.wireframeLinewidth),
      (this.wireframeLinecap = e.wireframeLinecap),
      (this.wireframeLinejoin = e.wireframeLinejoin),
      (this.flatShading = e.flatShading),
      (this.fog = e.fog),
      this
    );
  }
}
class MeshPhysicalMaterial extends MeshStandardMaterial {
  constructor(e) {
    super(),
      (this.isMeshPhysicalMaterial = !0),
      (this.defines = { STANDARD: '', PHYSICAL: '' }),
      (this.type = 'MeshPhysicalMaterial'),
      (this.clearcoatMap = null),
      (this.clearcoatRoughness = 0),
      (this.clearcoatRoughnessMap = null),
      (this.clearcoatNormalScale = new Vector2(1, 1)),
      (this.clearcoatNormalMap = null),
      (this.ior = 1.5),
      Object.defineProperty(this, 'reflectivity', {
        get: function () {
          return clamp((2.5 * (this.ior - 1)) / (this.ior + 1), 0, 1);
        },
        set: function (e) {
          this.ior = (1 + 0.4 * e) / (1 - 0.4 * e);
        },
      }),
      (this.iridescenceMap = null),
      (this.iridescenceIOR = 1.3),
      (this.iridescenceThicknessRange = [100, 400]),
      (this.iridescenceThicknessMap = null),
      (this.sheenColor = new Color(0)),
      (this.sheenColorMap = null),
      (this.sheenRoughness = 1),
      (this.sheenRoughnessMap = null),
      (this.transmissionMap = null),
      (this.thickness = 0),
      (this.thicknessMap = null),
      (this.attenuationDistance = 1 / 0),
      (this.attenuationColor = new Color(1, 1, 1)),
      (this.specularIntensity = 1),
      (this.specularIntensityMap = null),
      (this.specularColor = new Color(1, 1, 1)),
      (this.specularColorMap = null),
      (this._sheen = 0),
      (this._clearcoat = 0),
      (this._iridescence = 0),
      (this._transmission = 0),
      this.setValues(e);
  }
  get sheen() {
    return this._sheen;
  }
  set sheen(e) {
    this._sheen > 0 != e > 0 && this.version++, (this._sheen = e);
  }
  get clearcoat() {
    return this._clearcoat;
  }
  set clearcoat(e) {
    this._clearcoat > 0 != e > 0 && this.version++, (this._clearcoat = e);
  }
  get iridescence() {
    return this._iridescence;
  }
  set iridescence(e) {
    this._iridescence > 0 != e > 0 && this.version++, (this._iridescence = e);
  }
  get transmission() {
    return this._transmission;
  }
  set transmission(e) {
    this._transmission > 0 != e > 0 && this.version++, (this._transmission = e);
  }
  copy(e) {
    return (
      super.copy(e),
      (this.defines = { STANDARD: '', PHYSICAL: '' }),
      (this.clearcoat = e.clearcoat),
      (this.clearcoatMap = e.clearcoatMap),
      (this.clearcoatRoughness = e.clearcoatRoughness),
      (this.clearcoatRoughnessMap = e.clearcoatRoughnessMap),
      (this.clearcoatNormalMap = e.clearcoatNormalMap),
      this.clearcoatNormalScale.copy(e.clearcoatNormalScale),
      (this.ior = e.ior),
      (this.iridescence = e.iridescence),
      (this.iridescenceMap = e.iridescenceMap),
      (this.iridescenceIOR = e.iridescenceIOR),
      (this.iridescenceThicknessRange = [...e.iridescenceThicknessRange]),
      (this.iridescenceThicknessMap = e.iridescenceThicknessMap),
      (this.sheen = e.sheen),
      this.sheenColor.copy(e.sheenColor),
      (this.sheenColorMap = e.sheenColorMap),
      (this.sheenRoughness = e.sheenRoughness),
      (this.sheenRoughnessMap = e.sheenRoughnessMap),
      (this.transmission = e.transmission),
      (this.transmissionMap = e.transmissionMap),
      (this.thickness = e.thickness),
      (this.thicknessMap = e.thicknessMap),
      (this.attenuationDistance = e.attenuationDistance),
      this.attenuationColor.copy(e.attenuationColor),
      (this.specularIntensity = e.specularIntensity),
      (this.specularIntensityMap = e.specularIntensityMap),
      this.specularColor.copy(e.specularColor),
      (this.specularColorMap = e.specularColorMap),
      this
    );
  }
}
class MeshPhongMaterial extends Material {
  constructor(e) {
    super(),
      (this.isMeshPhongMaterial = !0),
      (this.type = 'MeshPhongMaterial'),
      (this.color = new Color(16777215)),
      (this.specular = new Color(1118481)),
      (this.shininess = 30),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.emissive = new Color(0)),
      (this.emissiveIntensity = 1),
      (this.emissiveMap = null),
      (this.bumpMap = null),
      (this.bumpScale = 1),
      (this.normalMap = null),
      (this.normalMapType = 0),
      (this.normalScale = new Vector2(1, 1)),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.specularMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.combine = 0),
      (this.reflectivity = 1),
      (this.refractionRatio = 0.98),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = 'round'),
      (this.wireframeLinejoin = 'round'),
      (this.flatShading = !1),
      (this.fog = !0),
      this.setValues(e);
  }
  copy(e) {
    return (
      super.copy(e),
      this.color.copy(e.color),
      this.specular.copy(e.specular),
      (this.shininess = e.shininess),
      (this.map = e.map),
      (this.lightMap = e.lightMap),
      (this.lightMapIntensity = e.lightMapIntensity),
      (this.aoMap = e.aoMap),
      (this.aoMapIntensity = e.aoMapIntensity),
      this.emissive.copy(e.emissive),
      (this.emissiveMap = e.emissiveMap),
      (this.emissiveIntensity = e.emissiveIntensity),
      (this.bumpMap = e.bumpMap),
      (this.bumpScale = e.bumpScale),
      (this.normalMap = e.normalMap),
      (this.normalMapType = e.normalMapType),
      this.normalScale.copy(e.normalScale),
      (this.displacementMap = e.displacementMap),
      (this.displacementScale = e.displacementScale),
      (this.displacementBias = e.displacementBias),
      (this.specularMap = e.specularMap),
      (this.alphaMap = e.alphaMap),
      (this.envMap = e.envMap),
      (this.combine = e.combine),
      (this.reflectivity = e.reflectivity),
      (this.refractionRatio = e.refractionRatio),
      (this.wireframe = e.wireframe),
      (this.wireframeLinewidth = e.wireframeLinewidth),
      (this.wireframeLinecap = e.wireframeLinecap),
      (this.wireframeLinejoin = e.wireframeLinejoin),
      (this.flatShading = e.flatShading),
      (this.fog = e.fog),
      this
    );
  }
}
class MeshToonMaterial extends Material {
  constructor(e) {
    super(),
      (this.isMeshToonMaterial = !0),
      (this.defines = { TOON: '' }),
      (this.type = 'MeshToonMaterial'),
      (this.color = new Color(16777215)),
      (this.map = null),
      (this.gradientMap = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.emissive = new Color(0)),
      (this.emissiveIntensity = 1),
      (this.emissiveMap = null),
      (this.bumpMap = null),
      (this.bumpScale = 1),
      (this.normalMap = null),
      (this.normalMapType = 0),
      (this.normalScale = new Vector2(1, 1)),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.alphaMap = null),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = 'round'),
      (this.wireframeLinejoin = 'round'),
      (this.fog = !0),
      this.setValues(e);
  }
  copy(e) {
    return (
      super.copy(e),
      this.color.copy(e.color),
      (this.map = e.map),
      (this.gradientMap = e.gradientMap),
      (this.lightMap = e.lightMap),
      (this.lightMapIntensity = e.lightMapIntensity),
      (this.aoMap = e.aoMap),
      (this.aoMapIntensity = e.aoMapIntensity),
      this.emissive.copy(e.emissive),
      (this.emissiveMap = e.emissiveMap),
      (this.emissiveIntensity = e.emissiveIntensity),
      (this.bumpMap = e.bumpMap),
      (this.bumpScale = e.bumpScale),
      (this.normalMap = e.normalMap),
      (this.normalMapType = e.normalMapType),
      this.normalScale.copy(e.normalScale),
      (this.displacementMap = e.displacementMap),
      (this.displacementScale = e.displacementScale),
      (this.displacementBias = e.displacementBias),
      (this.alphaMap = e.alphaMap),
      (this.wireframe = e.wireframe),
      (this.wireframeLinewidth = e.wireframeLinewidth),
      (this.wireframeLinecap = e.wireframeLinecap),
      (this.wireframeLinejoin = e.wireframeLinejoin),
      (this.fog = e.fog),
      this
    );
  }
}
class MeshNormalMaterial extends Material {
  constructor(e) {
    super(),
      (this.isMeshNormalMaterial = !0),
      (this.type = 'MeshNormalMaterial'),
      (this.bumpMap = null),
      (this.bumpScale = 1),
      (this.normalMap = null),
      (this.normalMapType = 0),
      (this.normalScale = new Vector2(1, 1)),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.flatShading = !1),
      this.setValues(e);
  }
  copy(e) {
    return (
      super.copy(e),
      (this.bumpMap = e.bumpMap),
      (this.bumpScale = e.bumpScale),
      (this.normalMap = e.normalMap),
      (this.normalMapType = e.normalMapType),
      this.normalScale.copy(e.normalScale),
      (this.displacementMap = e.displacementMap),
      (this.displacementScale = e.displacementScale),
      (this.displacementBias = e.displacementBias),
      (this.wireframe = e.wireframe),
      (this.wireframeLinewidth = e.wireframeLinewidth),
      (this.flatShading = e.flatShading),
      this
    );
  }
}
class MeshLambertMaterial extends Material {
  constructor(e) {
    super(),
      (this.isMeshLambertMaterial = !0),
      (this.type = 'MeshLambertMaterial'),
      (this.color = new Color(16777215)),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.emissive = new Color(0)),
      (this.emissiveIntensity = 1),
      (this.emissiveMap = null),
      (this.bumpMap = null),
      (this.bumpScale = 1),
      (this.normalMap = null),
      (this.normalMapType = 0),
      (this.normalScale = new Vector2(1, 1)),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.specularMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.combine = 0),
      (this.reflectivity = 1),
      (this.refractionRatio = 0.98),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = 'round'),
      (this.wireframeLinejoin = 'round'),
      (this.flatShading = !1),
      (this.fog = !0),
      this.setValues(e);
  }
  copy(e) {
    return (
      super.copy(e),
      this.color.copy(e.color),
      (this.map = e.map),
      (this.lightMap = e.lightMap),
      (this.lightMapIntensity = e.lightMapIntensity),
      (this.aoMap = e.aoMap),
      (this.aoMapIntensity = e.aoMapIntensity),
      this.emissive.copy(e.emissive),
      (this.emissiveMap = e.emissiveMap),
      (this.emissiveIntensity = e.emissiveIntensity),
      (this.bumpMap = e.bumpMap),
      (this.bumpScale = e.bumpScale),
      (this.normalMap = e.normalMap),
      (this.normalMapType = e.normalMapType),
      this.normalScale.copy(e.normalScale),
      (this.displacementMap = e.displacementMap),
      (this.displacementScale = e.displacementScale),
      (this.displacementBias = e.displacementBias),
      (this.specularMap = e.specularMap),
      (this.alphaMap = e.alphaMap),
      (this.envMap = e.envMap),
      (this.combine = e.combine),
      (this.reflectivity = e.reflectivity),
      (this.refractionRatio = e.refractionRatio),
      (this.wireframe = e.wireframe),
      (this.wireframeLinewidth = e.wireframeLinewidth),
      (this.wireframeLinecap = e.wireframeLinecap),
      (this.wireframeLinejoin = e.wireframeLinejoin),
      (this.flatShading = e.flatShading),
      (this.fog = e.fog),
      this
    );
  }
}
class MeshMatcapMaterial extends Material {
  constructor(e) {
    super(),
      (this.isMeshMatcapMaterial = !0),
      (this.defines = { MATCAP: '' }),
      (this.type = 'MeshMatcapMaterial'),
      (this.color = new Color(16777215)),
      (this.matcap = null),
      (this.map = null),
      (this.bumpMap = null),
      (this.bumpScale = 1),
      (this.normalMap = null),
      (this.normalMapType = 0),
      (this.normalScale = new Vector2(1, 1)),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.alphaMap = null),
      (this.flatShading = !1),
      (this.fog = !0),
      this.setValues(e);
  }
  copy(e) {
    return (
      super.copy(e),
      (this.defines = { MATCAP: '' }),
      this.color.copy(e.color),
      (this.matcap = e.matcap),
      (this.map = e.map),
      (this.bumpMap = e.bumpMap),
      (this.bumpScale = e.bumpScale),
      (this.normalMap = e.normalMap),
      (this.normalMapType = e.normalMapType),
      this.normalScale.copy(e.normalScale),
      (this.displacementMap = e.displacementMap),
      (this.displacementScale = e.displacementScale),
      (this.displacementBias = e.displacementBias),
      (this.alphaMap = e.alphaMap),
      (this.flatShading = e.flatShading),
      (this.fog = e.fog),
      this
    );
  }
}
class LineDashedMaterial extends LineBasicMaterial {
  constructor(e) {
    super(),
      (this.isLineDashedMaterial = !0),
      (this.type = 'LineDashedMaterial'),
      (this.scale = 1),
      (this.dashSize = 3),
      (this.gapSize = 1),
      this.setValues(e);
  }
  copy(e) {
    return (
      super.copy(e),
      (this.scale = e.scale),
      (this.dashSize = e.dashSize),
      (this.gapSize = e.gapSize),
      this
    );
  }
}
function arraySlice(e, t, r) {
  return isTypedArray(e)
    ? new e.constructor(e.subarray(t, void 0 !== r ? r : e.length))
    : e.slice(t, r);
}
function convertArray(e, t, r) {
  return !e || (!r && e.constructor === t)
    ? e
    : 'number' == typeof t.BYTES_PER_ELEMENT
      ? new t(e)
      : Array.prototype.slice.call(e);
}
function isTypedArray(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function getKeyframeOrder(e) {
  const t = e.length,
    r = new Array(t);
  for (let e = 0; e !== t; ++e) r[e] = e;
  return (
    r.sort(function (t, r) {
      return e[t] - e[r];
    }),
    r
  );
}
function sortedArray(e, t, r) {
  const n = e.length,
    i = new e.constructor(n);
  for (let a = 0, s = 0; s !== n; ++a) {
    const n = r[a] * t;
    for (let r = 0; r !== t; ++r) i[s++] = e[n + r];
  }
  return i;
}
function flattenJSON(e, t, r, n) {
  let i = 1,
    a = e[0];
  for (; void 0 !== a && void 0 === a[n]; ) a = e[i++];
  if (void 0 === a) return;
  let s = a[n];
  if (void 0 !== s)
    if (Array.isArray(s))
      do {
        (s = a[n]), void 0 !== s && (t.push(a.time), r.push.apply(r, s)), (a = e[i++]);
      } while (void 0 !== a);
    else if (void 0 !== s.toArray)
      do {
        (s = a[n]), void 0 !== s && (t.push(a.time), s.toArray(r, r.length)), (a = e[i++]);
      } while (void 0 !== a);
    else
      do {
        (s = a[n]), void 0 !== s && (t.push(a.time), r.push(s)), (a = e[i++]);
      } while (void 0 !== a);
}
function subclip(e, t, r, n, i = 30) {
  const a = e.clone();
  a.name = t;
  const s = [];
  for (let e = 0; e < a.tracks.length; ++e) {
    const t = a.tracks[e],
      o = t.getValueSize(),
      l = [],
      c = [];
    for (let e = 0; e < t.times.length; ++e) {
      const a = t.times[e] * i;
      if (!(a < r || a >= n)) {
        l.push(t.times[e]);
        for (let r = 0; r < o; ++r) c.push(t.values[e * o + r]);
      }
    }
    0 !== l.length &&
      ((t.times = convertArray(l, t.times.constructor)),
      (t.values = convertArray(c, t.values.constructor)),
      s.push(t));
  }
  a.tracks = s;
  let o = 1 / 0;
  for (let e = 0; e < a.tracks.length; ++e) o > a.tracks[e].times[0] && (o = a.tracks[e].times[0]);
  for (let e = 0; e < a.tracks.length; ++e) a.tracks[e].shift(-1 * o);
  return a.resetDuration(), a;
}
function makeClipAdditive(e, t = 0, r = e, n = 30) {
  n <= 0 && (n = 30);
  const i = r.tracks.length,
    a = t / n;
  for (let t = 0; t < i; ++t) {
    const n = r.tracks[t],
      i = n.ValueTypeName;
    if ('bool' === i || 'string' === i) continue;
    const s = e.tracks.find(function (e) {
      return e.name === n.name && e.ValueTypeName === i;
    });
    if (void 0 === s) continue;
    let o = 0;
    const l = n.getValueSize();
    n.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline && (o = l / 3);
    let c = 0;
    const h = s.getValueSize();
    s.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline && (c = h / 3);
    const u = n.times.length - 1;
    let d;
    if (a <= n.times[0]) {
      const e = o,
        t = l - o;
      d = arraySlice(n.values, e, t);
    } else if (a >= n.times[u]) {
      const e = u * l + o,
        t = e + l - o;
      d = arraySlice(n.values, e, t);
    } else {
      const e = n.createInterpolant(),
        t = o,
        r = l - o;
      e.evaluate(a), (d = arraySlice(e.resultBuffer, t, r));
    }
    if ('quaternion' === i) {
      new Quaternion().fromArray(d).normalize().conjugate().toArray(d);
    }
    const p = s.times.length;
    for (let e = 0; e < p; ++e) {
      const t = e * h + c;
      if ('quaternion' === i) Quaternion.multiplyQuaternionsFlat(s.values, t, d, 0, s.values, t);
      else {
        const e = h - 2 * c;
        for (let r = 0; r < e; ++r) s.values[t + r] -= d[r];
      }
    }
  }
  return (e.blendMode = 2501), e;
}
const AnimationUtils = {
  arraySlice: arraySlice,
  convertArray: convertArray,
  isTypedArray: isTypedArray,
  getKeyframeOrder: getKeyframeOrder,
  sortedArray: sortedArray,
  flattenJSON: flattenJSON,
  subclip: subclip,
  makeClipAdditive: makeClipAdditive,
};
class Interpolant {
  constructor(e, t, r, n) {
    (this.parameterPositions = e),
      (this._cachedIndex = 0),
      (this.resultBuffer = void 0 !== n ? n : new t.constructor(r)),
      (this.sampleValues = t),
      (this.valueSize = r),
      (this.settings = null),
      (this.DefaultSettings_ = {});
  }
  evaluate(e) {
    const t = this.parameterPositions;
    let r = this._cachedIndex,
      n = t[r],
      i = t[r - 1];
    e: {
      t: {
        let a;
        r: {
          n: if (!(e < n)) {
            for (let a = r + 2; ; ) {
              if (void 0 === n) {
                if (e < i) break n;
                return (r = t.length), (this._cachedIndex = r), this.copySampleValue_(r - 1);
              }
              if (r === a) break;
              if (((i = n), (n = t[++r]), e < n)) break t;
            }
            a = t.length;
            break r;
          }
          if (e >= i) break e;
          {
            const s = t[1];
            e < s && ((r = 2), (i = s));
            for (let a = r - 2; ; ) {
              if (void 0 === i) return (this._cachedIndex = 0), this.copySampleValue_(0);
              if (r === a) break;
              if (((n = i), (i = t[--r - 1]), e >= i)) break t;
            }
            (a = r), (r = 0);
          }
        }
        for (; r < a; ) {
          const n = (r + a) >>> 1;
          e < t[n] ? (a = n) : (r = n + 1);
        }
        if (((n = t[r]), (i = t[r - 1]), void 0 === i))
          return (this._cachedIndex = 0), this.copySampleValue_(0);
        if (void 0 === n)
          return (r = t.length), (this._cachedIndex = r), this.copySampleValue_(r - 1);
      }
      (this._cachedIndex = r), this.intervalChanged_(r, i, n);
    }
    return this.interpolate_(r, i, e, n);
  }
  getSettings_() {
    return this.settings || this.DefaultSettings_;
  }
  copySampleValue_(e) {
    const t = this.resultBuffer,
      r = this.sampleValues,
      n = this.valueSize,
      i = e * n;
    for (let e = 0; e !== n; ++e) t[e] = r[i + e];
    return t;
  }
  interpolate_() {
    throw new Error('call to abstract method');
  }
  intervalChanged_() {}
}
class CubicInterpolant extends Interpolant {
  constructor(e, t, r, n) {
    super(e, t, r, n),
      (this._weightPrev = -0),
      (this._offsetPrev = -0),
      (this._weightNext = -0),
      (this._offsetNext = -0),
      (this.DefaultSettings_ = { endingStart: 2400, endingEnd: 2400 });
  }
  intervalChanged_(e, t, r) {
    const n = this.parameterPositions;
    let i = e - 2,
      a = e + 1,
      s = n[i],
      o = n[a];
    if (void 0 === s)
      switch (this.getSettings_().endingStart) {
        case 2401:
          (i = e), (s = 2 * t - r);
          break;
        case 2402:
          (i = n.length - 2), (s = t + n[i] - n[i + 1]);
          break;
        default:
          (i = e), (s = r);
      }
    if (void 0 === o)
      switch (this.getSettings_().endingEnd) {
        case 2401:
          (a = e), (o = 2 * r - t);
          break;
        case 2402:
          (a = 1), (o = r + n[1] - n[0]);
          break;
        default:
          (a = e - 1), (o = t);
      }
    const l = 0.5 * (r - t),
      c = this.valueSize;
    (this._weightPrev = l / (t - s)),
      (this._weightNext = l / (o - r)),
      (this._offsetPrev = i * c),
      (this._offsetNext = a * c);
  }
  interpolate_(e, t, r, n) {
    const i = this.resultBuffer,
      a = this.sampleValues,
      s = this.valueSize,
      o = e * s,
      l = o - s,
      c = this._offsetPrev,
      h = this._offsetNext,
      u = this._weightPrev,
      d = this._weightNext,
      p = (r - t) / (n - t),
      m = p * p,
      f = m * p,
      g = -u * f + 2 * u * m - u * p,
      _ = (1 + u) * f + (-1.5 - 2 * u) * m + (-0.5 + u) * p + 1,
      v = (-1 - d) * f + (1.5 + d) * m + 0.5 * p,
      x = d * f - d * m;
    for (let e = 0; e !== s; ++e) i[e] = g * a[c + e] + _ * a[l + e] + v * a[o + e] + x * a[h + e];
    return i;
  }
}
class LinearInterpolant extends Interpolant {
  constructor(e, t, r, n) {
    super(e, t, r, n);
  }
  interpolate_(e, t, r, n) {
    const i = this.resultBuffer,
      a = this.sampleValues,
      s = this.valueSize,
      o = e * s,
      l = o - s,
      c = (r - t) / (n - t),
      h = 1 - c;
    for (let e = 0; e !== s; ++e) i[e] = a[l + e] * h + a[o + e] * c;
    return i;
  }
}
class DiscreteInterpolant extends Interpolant {
  constructor(e, t, r, n) {
    super(e, t, r, n);
  }
  interpolate_(e) {
    return this.copySampleValue_(e - 1);
  }
}
class KeyframeTrack {
  constructor(e, t, r, n) {
    if (void 0 === e) throw new Error('THREE.KeyframeTrack: track name is undefined');
    if (void 0 === t || 0 === t.length)
      throw new Error('THREE.KeyframeTrack: no keyframes in track named ' + e);
    (this.name = e),
      (this.times = convertArray(t, this.TimeBufferType)),
      (this.values = convertArray(r, this.ValueBufferType)),
      this.setInterpolation(n || this.DefaultInterpolation);
  }
  static toJSON(e) {
    const t = e.constructor;
    let r;
    if (t.toJSON !== this.toJSON) r = t.toJSON(e);
    else {
      r = {
        name: e.name,
        times: convertArray(e.times, Array),
        values: convertArray(e.values, Array),
      };
      const t = e.getInterpolation();
      t !== e.DefaultInterpolation && (r.interpolation = t);
    }
    return (r.type = e.ValueTypeName), r;
  }
  InterpolantFactoryMethodDiscrete(e) {
    return new DiscreteInterpolant(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodLinear(e) {
    return new LinearInterpolant(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodSmooth(e) {
    return new CubicInterpolant(this.times, this.values, this.getValueSize(), e);
  }
  setInterpolation(e) {
    let t;
    switch (e) {
      case 2300:
        t = this.InterpolantFactoryMethodDiscrete;
        break;
      case 2301:
        t = this.InterpolantFactoryMethodLinear;
        break;
      case 2302:
        t = this.InterpolantFactoryMethodSmooth;
    }
    if (void 0 === t) {
      const t =
        'unsupported interpolation for ' +
        this.ValueTypeName +
        ' keyframe track named ' +
        this.name;
      if (void 0 === this.createInterpolant) {
        if (e === this.DefaultInterpolation) throw new Error(t);
        this.setInterpolation(this.DefaultInterpolation);
      }
      return console.warn('THREE.KeyframeTrack:', t), this;
    }
    return (this.createInterpolant = t), this;
  }
  getInterpolation() {
    switch (this.createInterpolant) {
      case this.InterpolantFactoryMethodDiscrete:
        return 2300;
      case this.InterpolantFactoryMethodLinear:
        return 2301;
      case this.InterpolantFactoryMethodSmooth:
        return 2302;
    }
  }
  getValueSize() {
    return this.values.length / this.times.length;
  }
  shift(e) {
    if (0 !== e) {
      const t = this.times;
      for (let r = 0, n = t.length; r !== n; ++r) t[r] += e;
    }
    return this;
  }
  scale(e) {
    if (1 !== e) {
      const t = this.times;
      for (let r = 0, n = t.length; r !== n; ++r) t[r] *= e;
    }
    return this;
  }
  trim(e, t) {
    const r = this.times,
      n = r.length;
    let i = 0,
      a = n - 1;
    for (; i !== n && r[i] < e; ) ++i;
    for (; -1 !== a && r[a] > t; ) --a;
    if ((++a, 0 !== i || a !== n)) {
      i >= a && ((a = Math.max(a, 1)), (i = a - 1));
      const e = this.getValueSize();
      (this.times = arraySlice(r, i, a)), (this.values = arraySlice(this.values, i * e, a * e));
    }
    return this;
  }
  validate() {
    let e = !0;
    const t = this.getValueSize();
    t - Math.floor(t) != 0 &&
      (console.error('THREE.KeyframeTrack: Invalid value size in track.', this), (e = !1));
    const r = this.times,
      n = this.values,
      i = r.length;
    0 === i && (console.error('THREE.KeyframeTrack: Track is empty.', this), (e = !1));
    let a = null;
    for (let t = 0; t !== i; t++) {
      const n = r[t];
      if ('number' == typeof n && isNaN(n)) {
        console.error('THREE.KeyframeTrack: Time is not a valid number.', this, t, n), (e = !1);
        break;
      }
      if (null !== a && a > n) {
        console.error('THREE.KeyframeTrack: Out of order keys.', this, t, n, a), (e = !1);
        break;
      }
      a = n;
    }
    if (void 0 !== n && isTypedArray(n))
      for (let t = 0, r = n.length; t !== r; ++t) {
        const r = n[t];
        if (isNaN(r)) {
          console.error('THREE.KeyframeTrack: Value is not a valid number.', this, t, r), (e = !1);
          break;
        }
      }
    return e;
  }
  optimize() {
    const e = arraySlice(this.times),
      t = arraySlice(this.values),
      r = this.getValueSize(),
      n = 2302 === this.getInterpolation(),
      i = e.length - 1;
    let a = 1;
    for (let s = 1; s < i; ++s) {
      let i = !1;
      const o = e[s];
      if (o !== e[s + 1] && (1 !== s || o !== e[0]))
        if (n) i = !0;
        else {
          const e = s * r,
            n = e - r,
            a = e + r;
          for (let s = 0; s !== r; ++s) {
            const r = t[e + s];
            if (r !== t[n + s] || r !== t[a + s]) {
              i = !0;
              break;
            }
          }
        }
      if (i) {
        if (s !== a) {
          e[a] = e[s];
          const n = s * r,
            i = a * r;
          for (let e = 0; e !== r; ++e) t[i + e] = t[n + e];
        }
        ++a;
      }
    }
    if (i > 0) {
      e[a] = e[i];
      for (let e = i * r, n = a * r, s = 0; s !== r; ++s) t[n + s] = t[e + s];
      ++a;
    }
    return (
      a !== e.length
        ? ((this.times = arraySlice(e, 0, a)), (this.values = arraySlice(t, 0, a * r)))
        : ((this.times = e), (this.values = t)),
      this
    );
  }
  clone() {
    const e = arraySlice(this.times, 0),
      t = arraySlice(this.values, 0),
      r = new (0, this.constructor)(this.name, e, t);
    return (r.createInterpolant = this.createInterpolant), r;
  }
}
(KeyframeTrack.prototype.TimeBufferType = Float32Array),
  (KeyframeTrack.prototype.ValueBufferType = Float32Array),
  (KeyframeTrack.prototype.DefaultInterpolation = 2301);
class BooleanKeyframeTrack extends KeyframeTrack {}
(BooleanKeyframeTrack.prototype.ValueTypeName = 'bool'),
  (BooleanKeyframeTrack.prototype.ValueBufferType = Array),
  (BooleanKeyframeTrack.prototype.DefaultInterpolation = 2300),
  (BooleanKeyframeTrack.prototype.InterpolantFactoryMethodLinear = void 0),
  (BooleanKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0);
class ColorKeyframeTrack extends KeyframeTrack {}
ColorKeyframeTrack.prototype.ValueTypeName = 'color';
class NumberKeyframeTrack extends KeyframeTrack {}
NumberKeyframeTrack.prototype.ValueTypeName = 'number';
class QuaternionLinearInterpolant extends Interpolant {
  constructor(e, t, r, n) {
    super(e, t, r, n);
  }
  interpolate_(e, t, r, n) {
    const i = this.resultBuffer,
      a = this.sampleValues,
      s = this.valueSize,
      o = (r - t) / (n - t);
    let l = e * s;
    for (let e = l + s; l !== e; l += 4) Quaternion.slerpFlat(i, 0, a, l - s, a, l, o);
    return i;
  }
}
class QuaternionKeyframeTrack extends KeyframeTrack {
  InterpolantFactoryMethodLinear(e) {
    return new QuaternionLinearInterpolant(this.times, this.values, this.getValueSize(), e);
  }
}
(QuaternionKeyframeTrack.prototype.ValueTypeName = 'quaternion'),
  (QuaternionKeyframeTrack.prototype.DefaultInterpolation = 2301),
  (QuaternionKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0);
class StringKeyframeTrack extends KeyframeTrack {}
(StringKeyframeTrack.prototype.ValueTypeName = 'string'),
  (StringKeyframeTrack.prototype.ValueBufferType = Array),
  (StringKeyframeTrack.prototype.DefaultInterpolation = 2300),
  (StringKeyframeTrack.prototype.InterpolantFactoryMethodLinear = void 0),
  (StringKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0);
class VectorKeyframeTrack extends KeyframeTrack {}
VectorKeyframeTrack.prototype.ValueTypeName = 'vector';
class AnimationClip {
  constructor(e, t = -1, r, n = 2500) {
    (this.name = e),
      (this.tracks = r),
      (this.duration = t),
      (this.blendMode = n),
      (this.uuid = generateUUID()),
      this.duration < 0 && this.resetDuration();
  }
  static parse(e) {
    const t = [],
      r = e.tracks,
      n = 1 / (e.fps || 1);
    for (let e = 0, i = r.length; e !== i; ++e) t.push(parseKeyframeTrack(r[e]).scale(n));
    const i = new this(e.name, e.duration, t, e.blendMode);
    return (i.uuid = e.uuid), i;
  }
  static toJSON(e) {
    const t = [],
      r = e.tracks,
      n = { name: e.name, duration: e.duration, tracks: t, uuid: e.uuid, blendMode: e.blendMode };
    for (let e = 0, n = r.length; e !== n; ++e) t.push(KeyframeTrack.toJSON(r[e]));
    return n;
  }
  static CreateFromMorphTargetSequence(e, t, r, n) {
    const i = t.length,
      a = [];
    for (let e = 0; e < i; e++) {
      let s = [],
        o = [];
      s.push((e + i - 1) % i, e, (e + 1) % i), o.push(0, 1, 0);
      const l = getKeyframeOrder(s);
      (s = sortedArray(s, 1, l)),
        (o = sortedArray(o, 1, l)),
        n || 0 !== s[0] || (s.push(i), o.push(o[0])),
        a.push(
          new NumberKeyframeTrack('.morphTargetInfluences[' + t[e].name + ']', s, o).scale(1 / r),
        );
    }
    return new this(e, -1, a);
  }
  static findByName(e, t) {
    let r = e;
    if (!Array.isArray(e)) {
      const t = e;
      r = (t.geometry && t.geometry.animations) || t.animations;
    }
    for (let e = 0; e < r.length; e++) if (r[e].name === t) return r[e];
    return null;
  }
  static CreateClipsFromMorphTargetSequences(e, t, r) {
    const n = {},
      i = /^([\w-]*?)([\d]+)$/;
    for (let t = 0, r = e.length; t < r; t++) {
      const r = e[t],
        a = r.name.match(i);
      if (a && a.length > 1) {
        const e = a[1];
        let t = n[e];
        t || (n[e] = t = []), t.push(r);
      }
    }
    const a = [];
    for (const e in n) a.push(this.CreateFromMorphTargetSequence(e, n[e], t, r));
    return a;
  }
  static parseAnimation(e, t) {
    if (!e) return console.error('THREE.AnimationClip: No animation in JSONLoader data.'), null;
    const r = function (e, t, r, n, i) {
        if (0 !== r.length) {
          const a = [],
            s = [];
          flattenJSON(r, a, s, n), 0 !== a.length && i.push(new e(t, a, s));
        }
      },
      n = [],
      i = e.name || 'default',
      a = e.fps || 30,
      s = e.blendMode;
    let o = e.length || -1;
    const l = e.hierarchy || [];
    for (let e = 0; e < l.length; e++) {
      const i = l[e].keys;
      if (i && 0 !== i.length)
        if (i[0].morphTargets) {
          const e = {};
          let t;
          for (t = 0; t < i.length; t++)
            if (i[t].morphTargets)
              for (let r = 0; r < i[t].morphTargets.length; r++) e[i[t].morphTargets[r]] = -1;
          for (const r in e) {
            const e = [],
              a = [];
            for (let n = 0; n !== i[t].morphTargets.length; ++n) {
              const n = i[t];
              e.push(n.time), a.push(n.morphTarget === r ? 1 : 0);
            }
            n.push(new NumberKeyframeTrack('.morphTargetInfluence[' + r + ']', e, a));
          }
          o = e.length * a;
        } else {
          const a = '.bones[' + t[e].name + ']';
          r(VectorKeyframeTrack, a + '.position', i, 'pos', n),
            r(QuaternionKeyframeTrack, a + '.quaternion', i, 'rot', n),
            r(VectorKeyframeTrack, a + '.scale', i, 'scl', n);
        }
    }
    if (0 === n.length) return null;
    return new this(i, o, n, s);
  }
  resetDuration() {
    let e = 0;
    for (let t = 0, r = this.tracks.length; t !== r; ++t) {
      const r = this.tracks[t];
      e = Math.max(e, r.times[r.times.length - 1]);
    }
    return (this.duration = e), this;
  }
  trim() {
    for (let e = 0; e < this.tracks.length; e++) this.tracks[e].trim(0, this.duration);
    return this;
  }
  validate() {
    let e = !0;
    for (let t = 0; t < this.tracks.length; t++) e = e && this.tracks[t].validate();
    return e;
  }
  optimize() {
    for (let e = 0; e < this.tracks.length; e++) this.tracks[e].optimize();
    return this;
  }
  clone() {
    const e = [];
    for (let t = 0; t < this.tracks.length; t++) e.push(this.tracks[t].clone());
    return new this.constructor(this.name, this.duration, e, this.blendMode);
  }
  toJSON() {
    return this.constructor.toJSON(this);
  }
}
function getTrackTypeForValueTypeName(e) {
  switch (e.toLowerCase()) {
    case 'scalar':
    case 'double':
    case 'float':
    case 'number':
    case 'integer':
      return NumberKeyframeTrack;
    case 'vector':
    case 'vector2':
    case 'vector3':
    case 'vector4':
      return VectorKeyframeTrack;
    case 'color':
      return ColorKeyframeTrack;
    case 'quaternion':
      return QuaternionKeyframeTrack;
    case 'bool':
    case 'boolean':
      return BooleanKeyframeTrack;
    case 'string':
      return StringKeyframeTrack;
  }
  throw new Error('THREE.KeyframeTrack: Unsupported typeName: ' + e);
}
function parseKeyframeTrack(e) {
  if (void 0 === e.type)
    throw new Error('THREE.KeyframeTrack: track type undefined, can not parse');
  const t = getTrackTypeForValueTypeName(e.type);
  if (void 0 === e.times) {
    const t = [],
      r = [];
    flattenJSON(e.keys, t, r, 'value'), (e.times = t), (e.values = r);
  }
  return void 0 !== t.parse ? t.parse(e) : new t(e.name, e.times, e.values, e.interpolation);
}
const Cache = {
  enabled: !1,
  files: {},
  add: function (e, t) {
    !1 !== this.enabled && (this.files[e] = t);
  },
  get: function (e) {
    if (!1 !== this.enabled) return this.files[e];
  },
  remove: function (e) {
    delete this.files[e];
  },
  clear: function () {
    this.files = {};
  },
};
class LoadingManager {
  constructor(e, t, r) {
    const n = this;
    let i,
      a = !1,
      s = 0,
      o = 0;
    const l = [];
    (this.onStart = void 0),
      (this.onLoad = e),
      (this.onProgress = t),
      (this.onError = r),
      (this.itemStart = function (e) {
        o++, !1 === a && void 0 !== n.onStart && n.onStart(e, s, o), (a = !0);
      }),
      (this.itemEnd = function (e) {
        s++,
          void 0 !== n.onProgress && n.onProgress(e, s, o),
          s === o && ((a = !1), void 0 !== n.onLoad && n.onLoad());
      }),
      (this.itemError = function (e) {
        void 0 !== n.onError && n.onError(e);
      }),
      (this.resolveURL = function (e) {
        return i ? i(e) : e;
      }),
      (this.setURLModifier = function (e) {
        return (i = e), this;
      }),
      (this.addHandler = function (e, t) {
        return l.push(e, t), this;
      }),
      (this.removeHandler = function (e) {
        const t = l.indexOf(e);
        return -1 !== t && l.splice(t, 2), this;
      }),
      (this.getHandler = function (e) {
        for (let t = 0, r = l.length; t < r; t += 2) {
          const r = l[t],
            n = l[t + 1];
          if ((r.global && (r.lastIndex = 0), r.test(e))) return n;
        }
        return null;
      });
  }
}
const DefaultLoadingManager = new LoadingManager();
class Loader {
  constructor(e) {
    (this.manager = void 0 !== e ? e : DefaultLoadingManager),
      (this.crossOrigin = 'anonymous'),
      (this.withCredentials = !1),
      (this.path = ''),
      (this.resourcePath = ''),
      (this.requestHeader = {});
  }
  load() {}
  loadAsync(e, t) {
    const r = this;
    return new Promise(function (n, i) {
      r.load(e, n, t, i);
    });
  }
  parse() {}
  setCrossOrigin(e) {
    return (this.crossOrigin = e), this;
  }
  setWithCredentials(e) {
    return (this.withCredentials = e), this;
  }
  setPath(e) {
    return (this.path = e), this;
  }
  setResourcePath(e) {
    return (this.resourcePath = e), this;
  }
  setRequestHeader(e) {
    return (this.requestHeader = e), this;
  }
}
const loading = {};
class HttpError extends Error {
  constructor(e, t) {
    super(e), (this.response = t);
  }
}
class FileLoader extends Loader {
  constructor(e) {
    super(e);
  }
  load(e, t, r, n) {
    void 0 === e && (e = ''),
      void 0 !== this.path && (e = this.path + e),
      (e = this.manager.resolveURL(e));
    const i = Cache.get(e);
    if (void 0 !== i)
      return (
        this.manager.itemStart(e),
        setTimeout(() => {
          t && t(i), this.manager.itemEnd(e);
        }, 0),
        i
      );
    if (void 0 !== loading[e])
      return void loading[e].push({ onLoad: t, onProgress: r, onError: n });
    (loading[e] = []), loading[e].push({ onLoad: t, onProgress: r, onError: n });
    const a = new Request(e, {
        headers: new Headers(this.requestHeader),
        credentials: this.withCredentials ? 'include' : 'same-origin',
      }),
      s = this.mimeType,
      o = this.responseType;
    fetch(a)
      .then((t) => {
        if (200 === t.status || 0 === t.status) {
          if (
            (0 === t.status && console.warn('THREE.FileLoader: HTTP Status 0 received.'),
            'undefined' == typeof ReadableStream ||
              void 0 === t.body ||
              void 0 === t.body.getReader)
          )
            return t;
          const r = loading[e],
            n = t.body.getReader(),
            i = t.headers.get('Content-Length') || t.headers.get('X-File-Size'),
            a = i ? parseInt(i) : 0,
            s = 0 !== a;
          let o = 0;
          const l = new ReadableStream({
            start(e) {
              !(function t() {
                n.read().then(({ done: n, value: i }) => {
                  if (n) e.close();
                  else {
                    o += i.byteLength;
                    const n = new ProgressEvent('progress', {
                      lengthComputable: s,
                      loaded: o,
                      total: a,
                    });
                    for (let e = 0, t = r.length; e < t; e++) {
                      const t = r[e];
                      t.onProgress && t.onProgress(n);
                    }
                    e.enqueue(i), t();
                  }
                });
              })();
            },
          });
          return new Response(l);
        }
        throw new HttpError(`fetch for "${t.url}" responded with ${t.status}: ${t.statusText}`, t);
      })
      .then((e) => {
        switch (o) {
          case 'arraybuffer':
            return e.arrayBuffer();
          case 'blob':
            return e.blob();
          case 'document':
            return e.text().then((e) => new DOMParser().parseFromString(e, s));
          case 'json':
            return e.json();
          default:
            if (void 0 === s) return e.text();
            {
              const t = /charset="?([^;"\s]*)"?/i.exec(s),
                r = t && t[1] ? t[1].toLowerCase() : void 0,
                n = new TextDecoder(r);
              return e.arrayBuffer().then((e) => n.decode(e));
            }
        }
      })
      .then((t) => {
        Cache.add(e, t);
        const r = loading[e];
        delete loading[e];
        for (let e = 0, n = r.length; e < n; e++) {
          const n = r[e];
          n.onLoad && n.onLoad(t);
        }
      })
      .catch((t) => {
        const r = loading[e];
        if (void 0 === r) throw (this.manager.itemError(e), t);
        delete loading[e];
        for (let e = 0, n = r.length; e < n; e++) {
          const n = r[e];
          n.onError && n.onError(t);
        }
        this.manager.itemError(e);
      })
      .finally(() => {
        this.manager.itemEnd(e);
      }),
      this.manager.itemStart(e);
  }
  setResponseType(e) {
    return (this.responseType = e), this;
  }
  setMimeType(e) {
    return (this.mimeType = e), this;
  }
}
class AnimationLoader extends Loader {
  constructor(e) {
    super(e);
  }
  load(e, t, r, n) {
    const i = this,
      a = new FileLoader(this.manager);
    a.setPath(this.path),
      a.setRequestHeader(this.requestHeader),
      a.setWithCredentials(this.withCredentials),
      a.load(
        e,
        function (r) {
          try {
            t(i.parse(JSON.parse(r)));
          } catch (t) {
            n ? n(t) : console.error(t), i.manager.itemError(e);
          }
        },
        r,
        n,
      );
  }
  parse(e) {
    const t = [];
    for (let r = 0; r < e.length; r++) {
      const n = AnimationClip.parse(e[r]);
      t.push(n);
    }
    return t;
  }
}
class CompressedTextureLoader extends Loader {
  constructor(e) {
    super(e);
  }
  load(e, t, r, n) {
    const i = this,
      a = [],
      s = new CompressedTexture(),
      o = new FileLoader(this.manager);
    o.setPath(this.path),
      o.setResponseType('arraybuffer'),
      o.setRequestHeader(this.requestHeader),
      o.setWithCredentials(i.withCredentials);
    let l = 0;
    function c(c) {
      o.load(
        e[c],
        function (e) {
          const r = i.parse(e, !0);
          (a[c] = { width: r.width, height: r.height, format: r.format, mipmaps: r.mipmaps }),
            (l += 1),
            6 === l &&
              (1 === r.mipmapCount && (s.minFilter = 1006),
              (s.image = a),
              (s.format = r.format),
              (s.needsUpdate = !0),
              t && t(s));
        },
        r,
        n,
      );
    }
    if (Array.isArray(e)) for (let t = 0, r = e.length; t < r; ++t) c(t);
    else
      o.load(
        e,
        function (e) {
          const r = i.parse(e, !0);
          if (r.isCubemap) {
            const e = r.mipmaps.length / r.mipmapCount;
            for (let t = 0; t < e; t++) {
              a[t] = { mipmaps: [] };
              for (let e = 0; e < r.mipmapCount; e++)
                a[t].mipmaps.push(r.mipmaps[t * r.mipmapCount + e]),
                  (a[t].format = r.format),
                  (a[t].width = r.width),
                  (a[t].height = r.height);
            }
            s.image = a;
          } else (s.image.width = r.width), (s.image.height = r.height), (s.mipmaps = r.mipmaps);
          1 === r.mipmapCount && (s.minFilter = 1006),
            (s.format = r.format),
            (s.needsUpdate = !0),
            t && t(s);
        },
        r,
        n,
      );
    return s;
  }
}
class ImageLoader extends Loader {
  constructor(e) {
    super(e);
  }
  load(e, t, r, n) {
    void 0 !== this.path && (e = this.path + e), (e = this.manager.resolveURL(e));
    const i = this,
      a = Cache.get(e);
    if (void 0 !== a)
      return (
        i.manager.itemStart(e),
        setTimeout(function () {
          t && t(a), i.manager.itemEnd(e);
        }, 0),
        a
      );
    const s = createElementNS('img');
    function o() {
      c(), Cache.add(e, this), t && t(this), i.manager.itemEnd(e);
    }
    function l(t) {
      c(), n && n(t), i.manager.itemError(e), i.manager.itemEnd(e);
    }
    function c() {
      s.removeEventListener('load', o, !1), s.removeEventListener('error', l, !1);
    }
    return (
      s.addEventListener('load', o, !1),
      s.addEventListener('error', l, !1),
      'data:' !== e.slice(0, 5) &&
        void 0 !== this.crossOrigin &&
        (s.crossOrigin = this.crossOrigin),
      i.manager.itemStart(e),
      (s.src = e),
      s
    );
  }
}
class CubeTextureLoader extends Loader {
  constructor(e) {
    super(e);
  }
  load(e, t, r, n) {
    const i = new CubeTexture(),
      a = new ImageLoader(this.manager);
    a.setCrossOrigin(this.crossOrigin), a.setPath(this.path);
    let s = 0;
    function o(r) {
      a.load(
        e[r],
        function (e) {
          (i.images[r] = e), s++, 6 === s && ((i.needsUpdate = !0), t && t(i));
        },
        void 0,
        n,
      );
    }
    for (let t = 0; t < e.length; ++t) o(t);
    return i;
  }
}
class DataTextureLoader extends Loader {
  constructor(e) {
    super(e);
  }
  load(e, t, r, n) {
    const i = this,
      a = new DataTexture(),
      s = new FileLoader(this.manager);
    return (
      s.setResponseType('arraybuffer'),
      s.setRequestHeader(this.requestHeader),
      s.setPath(this.path),
      s.setWithCredentials(i.withCredentials),
      s.load(
        e,
        function (e) {
          const r = i.parse(e);
          r &&
            (void 0 !== r.image
              ? (a.image = r.image)
              : void 0 !== r.data &&
                ((a.image.width = r.width), (a.image.height = r.height), (a.image.data = r.data)),
            (a.wrapS = void 0 !== r.wrapS ? r.wrapS : 1001),
            (a.wrapT = void 0 !== r.wrapT ? r.wrapT : 1001),
            (a.magFilter = void 0 !== r.magFilter ? r.magFilter : 1006),
            (a.minFilter = void 0 !== r.minFilter ? r.minFilter : 1006),
            (a.anisotropy = void 0 !== r.anisotropy ? r.anisotropy : 1),
            void 0 !== r.encoding && (a.encoding = r.encoding),
            void 0 !== r.flipY && (a.flipY = r.flipY),
            void 0 !== r.format && (a.format = r.format),
            void 0 !== r.type && (a.type = r.type),
            void 0 !== r.mipmaps && ((a.mipmaps = r.mipmaps), (a.minFilter = 1008)),
            1 === r.mipmapCount && (a.minFilter = 1006),
            void 0 !== r.generateMipmaps && (a.generateMipmaps = r.generateMipmaps),
            (a.needsUpdate = !0),
            t && t(a, r));
        },
        r,
        n,
      ),
      a
    );
  }
}
class TextureLoader extends Loader {
  constructor(e) {
    super(e);
  }
  load(e, t, r, n) {
    const i = new Texture(),
      a = new ImageLoader(this.manager);
    return (
      a.setCrossOrigin(this.crossOrigin),
      a.setPath(this.path),
      a.load(
        e,
        function (e) {
          (i.image = e), (i.needsUpdate = !0), void 0 !== t && t(i);
        },
        r,
        n,
      ),
      i
    );
  }
}
class Light extends Object3D {
  constructor(e, t = 1) {
    super(),
      (this.isLight = !0),
      (this.type = 'Light'),
      (this.color = new Color(e)),
      (this.intensity = t);
  }
  dispose() {}
  copy(e, t) {
    return super.copy(e, t), this.color.copy(e.color), (this.intensity = e.intensity), this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return (
      (t.object.color = this.color.getHex()),
      (t.object.intensity = this.intensity),
      void 0 !== this.groundColor && (t.object.groundColor = this.groundColor.getHex()),
      void 0 !== this.distance && (t.object.distance = this.distance),
      void 0 !== this.angle && (t.object.angle = this.angle),
      void 0 !== this.decay && (t.object.decay = this.decay),
      void 0 !== this.penumbra && (t.object.penumbra = this.penumbra),
      void 0 !== this.shadow && (t.object.shadow = this.shadow.toJSON()),
      t
    );
  }
}
class HemisphereLight extends Light {
  constructor(e, t, r) {
    super(e, r),
      (this.isHemisphereLight = !0),
      (this.type = 'HemisphereLight'),
      this.position.copy(Object3D.DEFAULT_UP),
      this.updateMatrix(),
      (this.groundColor = new Color(t));
  }
  copy(e, t) {
    return super.copy(e, t), this.groundColor.copy(e.groundColor), this;
  }
}
const _projScreenMatrix$1 = new Matrix4(),
  _lightPositionWorld$1 = new Vector3(),
  _lookTarget$1 = new Vector3();
class LightShadow {
  constructor(e) {
    (this.camera = e),
      (this.bias = 0),
      (this.normalBias = 0),
      (this.radius = 1),
      (this.blurSamples = 8),
      (this.mapSize = new Vector2(512, 512)),
      (this.map = null),
      (this.mapPass = null),
      (this.matrix = new Matrix4()),
      (this.autoUpdate = !0),
      (this.needsUpdate = !1),
      (this._frustum = new Frustum()),
      (this._frameExtents = new Vector2(1, 1)),
      (this._viewportCount = 1),
      (this._viewports = [new Vector4(0, 0, 1, 1)]);
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(e) {
    const t = this.camera,
      r = this.matrix;
    _lightPositionWorld$1.setFromMatrixPosition(e.matrixWorld),
      t.position.copy(_lightPositionWorld$1),
      _lookTarget$1.setFromMatrixPosition(e.target.matrixWorld),
      t.lookAt(_lookTarget$1),
      t.updateMatrixWorld(),
      _projScreenMatrix$1.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse),
      this._frustum.setFromProjectionMatrix(_projScreenMatrix$1),
      r.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1),
      r.multiply(_projScreenMatrix$1);
  }
  getViewport(e) {
    return this._viewports[e];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  copy(e) {
    return (
      (this.camera = e.camera.clone()),
      (this.bias = e.bias),
      (this.radius = e.radius),
      this.mapSize.copy(e.mapSize),
      this
    );
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const e = {};
    return (
      0 !== this.bias && (e.bias = this.bias),
      0 !== this.normalBias && (e.normalBias = this.normalBias),
      1 !== this.radius && (e.radius = this.radius),
      (512 === this.mapSize.x && 512 === this.mapSize.y) || (e.mapSize = this.mapSize.toArray()),
      (e.camera = this.camera.toJSON(!1).object),
      delete e.camera.matrix,
      e
    );
  }
}
class SpotLightShadow extends LightShadow {
  constructor() {
    super(new PerspectiveCamera(50, 1, 0.5, 500)), (this.isSpotLightShadow = !0), (this.focus = 1);
  }
  updateMatrices(e) {
    const t = this.camera,
      r = 2 * RAD2DEG * e.angle * this.focus,
      n = this.mapSize.width / this.mapSize.height,
      i = e.distance || t.far;
    (r === t.fov && n === t.aspect && i === t.far) ||
      ((t.fov = r), (t.aspect = n), (t.far = i), t.updateProjectionMatrix()),
      super.updateMatrices(e);
  }
  copy(e) {
    return super.copy(e), (this.focus = e.focus), this;
  }
}
class SpotLight extends Light {
  constructor(e, t, r = 0, n = Math.PI / 3, i = 0, a = 2) {
    super(e, t),
      (this.isSpotLight = !0),
      (this.type = 'SpotLight'),
      this.position.copy(Object3D.DEFAULT_UP),
      this.updateMatrix(),
      (this.target = new Object3D()),
      (this.distance = r),
      (this.angle = n),
      (this.penumbra = i),
      (this.decay = a),
      (this.map = null),
      (this.shadow = new SpotLightShadow());
  }
  get power() {
    return this.intensity * Math.PI;
  }
  set power(e) {
    this.intensity = e / Math.PI;
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      (this.distance = e.distance),
      (this.angle = e.angle),
      (this.penumbra = e.penumbra),
      (this.decay = e.decay),
      (this.target = e.target.clone()),
      (this.shadow = e.shadow.clone()),
      this
    );
  }
}
const _projScreenMatrix = new Matrix4(),
  _lightPositionWorld = new Vector3(),
  _lookTarget = new Vector3();
class PointLightShadow extends LightShadow {
  constructor() {
    super(new PerspectiveCamera(90, 1, 0.5, 500)),
      (this.isPointLightShadow = !0),
      (this._frameExtents = new Vector2(4, 2)),
      (this._viewportCount = 6),
      (this._viewports = [
        new Vector4(2, 1, 1, 1),
        new Vector4(0, 1, 1, 1),
        new Vector4(3, 1, 1, 1),
        new Vector4(1, 1, 1, 1),
        new Vector4(3, 0, 1, 1),
        new Vector4(1, 0, 1, 1),
      ]),
      (this._cubeDirections = [
        new Vector3(1, 0, 0),
        new Vector3(-1, 0, 0),
        new Vector3(0, 0, 1),
        new Vector3(0, 0, -1),
        new Vector3(0, 1, 0),
        new Vector3(0, -1, 0),
      ]),
      (this._cubeUps = [
        new Vector3(0, 1, 0),
        new Vector3(0, 1, 0),
        new Vector3(0, 1, 0),
        new Vector3(0, 1, 0),
        new Vector3(0, 0, 1),
        new Vector3(0, 0, -1),
      ]);
  }
  updateMatrices(e, t = 0) {
    const r = this.camera,
      n = this.matrix,
      i = e.distance || r.far;
    i !== r.far && ((r.far = i), r.updateProjectionMatrix()),
      _lightPositionWorld.setFromMatrixPosition(e.matrixWorld),
      r.position.copy(_lightPositionWorld),
      _lookTarget.copy(r.position),
      _lookTarget.add(this._cubeDirections[t]),
      r.up.copy(this._cubeUps[t]),
      r.lookAt(_lookTarget),
      r.updateMatrixWorld(),
      n.makeTranslation(-_lightPositionWorld.x, -_lightPositionWorld.y, -_lightPositionWorld.z),
      _projScreenMatrix.multiplyMatrices(r.projectionMatrix, r.matrixWorldInverse),
      this._frustum.setFromProjectionMatrix(_projScreenMatrix);
  }
}
class PointLight extends Light {
  constructor(e, t, r = 0, n = 2) {
    super(e, t),
      (this.isPointLight = !0),
      (this.type = 'PointLight'),
      (this.distance = r),
      (this.decay = n),
      (this.shadow = new PointLightShadow());
  }
  get power() {
    return 4 * this.intensity * Math.PI;
  }
  set power(e) {
    this.intensity = e / (4 * Math.PI);
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      (this.distance = e.distance),
      (this.decay = e.decay),
      (this.shadow = e.shadow.clone()),
      this
    );
  }
}
class DirectionalLightShadow extends LightShadow {
  constructor() {
    super(new OrthographicCamera(-5, 5, 5, -5, 0.5, 500)), (this.isDirectionalLightShadow = !0);
  }
}
class DirectionalLight extends Light {
  constructor(e, t) {
    super(e, t),
      (this.isDirectionalLight = !0),
      (this.type = 'DirectionalLight'),
      this.position.copy(Object3D.DEFAULT_UP),
      this.updateMatrix(),
      (this.target = new Object3D()),
      (this.shadow = new DirectionalLightShadow());
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(e) {
    return super.copy(e), (this.target = e.target.clone()), (this.shadow = e.shadow.clone()), this;
  }
}
class AmbientLight extends Light {
  constructor(e, t) {
    super(e, t), (this.isAmbientLight = !0), (this.type = 'AmbientLight');
  }
}
class RectAreaLight extends Light {
  constructor(e, t, r = 10, n = 10) {
    super(e, t),
      (this.isRectAreaLight = !0),
      (this.type = 'RectAreaLight'),
      (this.width = r),
      (this.height = n);
  }
  get power() {
    return this.intensity * this.width * this.height * Math.PI;
  }
  set power(e) {
    this.intensity = e / (this.width * this.height * Math.PI);
  }
  copy(e) {
    return super.copy(e), (this.width = e.width), (this.height = e.height), this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return (t.object.width = this.width), (t.object.height = this.height), t;
  }
}
class SphericalHarmonics3 {
  constructor() {
    (this.isSphericalHarmonics3 = !0), (this.coefficients = []);
    for (let e = 0; e < 9; e++) this.coefficients.push(new Vector3());
  }
  set(e) {
    for (let t = 0; t < 9; t++) this.coefficients[t].copy(e[t]);
    return this;
  }
  zero() {
    for (let e = 0; e < 9; e++) this.coefficients[e].set(0, 0, 0);
    return this;
  }
  getAt(e, t) {
    const r = e.x,
      n = e.y,
      i = e.z,
      a = this.coefficients;
    return (
      t.copy(a[0]).multiplyScalar(0.282095),
      t.addScaledVector(a[1], 0.488603 * n),
      t.addScaledVector(a[2], 0.488603 * i),
      t.addScaledVector(a[3], 0.488603 * r),
      t.addScaledVector(a[4], r * n * 1.092548),
      t.addScaledVector(a[5], n * i * 1.092548),
      t.addScaledVector(a[6], 0.315392 * (3 * i * i - 1)),
      t.addScaledVector(a[7], r * i * 1.092548),
      t.addScaledVector(a[8], 0.546274 * (r * r - n * n)),
      t
    );
  }
  getIrradianceAt(e, t) {
    const r = e.x,
      n = e.y,
      i = e.z,
      a = this.coefficients;
    return (
      t.copy(a[0]).multiplyScalar(0.886227),
      t.addScaledVector(a[1], 1.023328 * n),
      t.addScaledVector(a[2], 1.023328 * i),
      t.addScaledVector(a[3], 1.023328 * r),
      t.addScaledVector(a[4], 0.858086 * r * n),
      t.addScaledVector(a[5], 0.858086 * n * i),
      t.addScaledVector(a[6], 0.743125 * i * i - 0.247708),
      t.addScaledVector(a[7], 0.858086 * r * i),
      t.addScaledVector(a[8], 0.429043 * (r * r - n * n)),
      t
    );
  }
  add(e) {
    for (let t = 0; t < 9; t++) this.coefficients[t].add(e.coefficients[t]);
    return this;
  }
  addScaledSH(e, t) {
    for (let r = 0; r < 9; r++) this.coefficients[r].addScaledVector(e.coefficients[r], t);
    return this;
  }
  scale(e) {
    for (let t = 0; t < 9; t++) this.coefficients[t].multiplyScalar(e);
    return this;
  }
  lerp(e, t) {
    for (let r = 0; r < 9; r++) this.coefficients[r].lerp(e.coefficients[r], t);
    return this;
  }
  equals(e) {
    for (let t = 0; t < 9; t++) if (!this.coefficients[t].equals(e.coefficients[t])) return !1;
    return !0;
  }
  copy(e) {
    return this.set(e.coefficients);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  fromArray(e, t = 0) {
    const r = this.coefficients;
    for (let n = 0; n < 9; n++) r[n].fromArray(e, t + 3 * n);
    return this;
  }
  toArray(e = [], t = 0) {
    const r = this.coefficients;
    for (let n = 0; n < 9; n++) r[n].toArray(e, t + 3 * n);
    return e;
  }
  static getBasisAt(e, t) {
    const r = e.x,
      n = e.y,
      i = e.z;
    (t[0] = 0.282095),
      (t[1] = 0.488603 * n),
      (t[2] = 0.488603 * i),
      (t[3] = 0.488603 * r),
      (t[4] = 1.092548 * r * n),
      (t[5] = 1.092548 * n * i),
      (t[6] = 0.315392 * (3 * i * i - 1)),
      (t[7] = 1.092548 * r * i),
      (t[8] = 0.546274 * (r * r - n * n));
  }
}
class LightProbe extends Light {
  constructor(e = new SphericalHarmonics3(), t = 1) {
    super(void 0, t), (this.isLightProbe = !0), (this.sh = e);
  }
  copy(e) {
    return super.copy(e), this.sh.copy(e.sh), this;
  }
  fromJSON(e) {
    return (this.intensity = e.intensity), this.sh.fromArray(e.sh), this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return (t.object.sh = this.sh.toArray()), t;
  }
}
class MaterialLoader extends Loader {
  constructor(e) {
    super(e), (this.textures = {});
  }
  load(e, t, r, n) {
    const i = this,
      a = new FileLoader(i.manager);
    a.setPath(i.path),
      a.setRequestHeader(i.requestHeader),
      a.setWithCredentials(i.withCredentials),
      a.load(
        e,
        function (r) {
          try {
            t(i.parse(JSON.parse(r)));
          } catch (t) {
            n ? n(t) : console.error(t), i.manager.itemError(e);
          }
        },
        r,
        n,
      );
  }
  parse(e) {
    const t = this.textures;
    function r(e) {
      return void 0 === t[e] && console.warn('THREE.MaterialLoader: Undefined texture', e), t[e];
    }
    const n = MaterialLoader.createMaterialFromType(e.type);
    if (
      (void 0 !== e.uuid && (n.uuid = e.uuid),
      void 0 !== e.name && (n.name = e.name),
      void 0 !== e.color && void 0 !== n.color && n.color.setHex(e.color),
      void 0 !== e.roughness && (n.roughness = e.roughness),
      void 0 !== e.metalness && (n.metalness = e.metalness),
      void 0 !== e.sheen && (n.sheen = e.sheen),
      void 0 !== e.sheenColor && (n.sheenColor = new Color().setHex(e.sheenColor)),
      void 0 !== e.sheenRoughness && (n.sheenRoughness = e.sheenRoughness),
      void 0 !== e.emissive && void 0 !== n.emissive && n.emissive.setHex(e.emissive),
      void 0 !== e.specular && void 0 !== n.specular && n.specular.setHex(e.specular),
      void 0 !== e.specularIntensity && (n.specularIntensity = e.specularIntensity),
      void 0 !== e.specularColor &&
        void 0 !== n.specularColor &&
        n.specularColor.setHex(e.specularColor),
      void 0 !== e.shininess && (n.shininess = e.shininess),
      void 0 !== e.clearcoat && (n.clearcoat = e.clearcoat),
      void 0 !== e.clearcoatRoughness && (n.clearcoatRoughness = e.clearcoatRoughness),
      void 0 !== e.iridescence && (n.iridescence = e.iridescence),
      void 0 !== e.iridescenceIOR && (n.iridescenceIOR = e.iridescenceIOR),
      void 0 !== e.iridescenceThicknessRange &&
        (n.iridescenceThicknessRange = e.iridescenceThicknessRange),
      void 0 !== e.transmission && (n.transmission = e.transmission),
      void 0 !== e.thickness && (n.thickness = e.thickness),
      void 0 !== e.attenuationDistance && (n.attenuationDistance = e.attenuationDistance),
      void 0 !== e.attenuationColor &&
        void 0 !== n.attenuationColor &&
        n.attenuationColor.setHex(e.attenuationColor),
      void 0 !== e.fog && (n.fog = e.fog),
      void 0 !== e.flatShading && (n.flatShading = e.flatShading),
      void 0 !== e.blending && (n.blending = e.blending),
      void 0 !== e.combine && (n.combine = e.combine),
      void 0 !== e.side && (n.side = e.side),
      void 0 !== e.shadowSide && (n.shadowSide = e.shadowSide),
      void 0 !== e.opacity && (n.opacity = e.opacity),
      void 0 !== e.transparent && (n.transparent = e.transparent),
      void 0 !== e.alphaTest && (n.alphaTest = e.alphaTest),
      void 0 !== e.depthTest && (n.depthTest = e.depthTest),
      void 0 !== e.depthWrite && (n.depthWrite = e.depthWrite),
      void 0 !== e.colorWrite && (n.colorWrite = e.colorWrite),
      void 0 !== e.stencilWrite && (n.stencilWrite = e.stencilWrite),
      void 0 !== e.stencilWriteMask && (n.stencilWriteMask = e.stencilWriteMask),
      void 0 !== e.stencilFunc && (n.stencilFunc = e.stencilFunc),
      void 0 !== e.stencilRef && (n.stencilRef = e.stencilRef),
      void 0 !== e.stencilFuncMask && (n.stencilFuncMask = e.stencilFuncMask),
      void 0 !== e.stencilFail && (n.stencilFail = e.stencilFail),
      void 0 !== e.stencilZFail && (n.stencilZFail = e.stencilZFail),
      void 0 !== e.stencilZPass && (n.stencilZPass = e.stencilZPass),
      void 0 !== e.wireframe && (n.wireframe = e.wireframe),
      void 0 !== e.wireframeLinewidth && (n.wireframeLinewidth = e.wireframeLinewidth),
      void 0 !== e.wireframeLinecap && (n.wireframeLinecap = e.wireframeLinecap),
      void 0 !== e.wireframeLinejoin && (n.wireframeLinejoin = e.wireframeLinejoin),
      void 0 !== e.rotation && (n.rotation = e.rotation),
      1 !== e.linewidth && (n.linewidth = e.linewidth),
      void 0 !== e.dashSize && (n.dashSize = e.dashSize),
      void 0 !== e.gapSize && (n.gapSize = e.gapSize),
      void 0 !== e.scale && (n.scale = e.scale),
      void 0 !== e.polygonOffset && (n.polygonOffset = e.polygonOffset),
      void 0 !== e.polygonOffsetFactor && (n.polygonOffsetFactor = e.polygonOffsetFactor),
      void 0 !== e.polygonOffsetUnits && (n.polygonOffsetUnits = e.polygonOffsetUnits),
      void 0 !== e.dithering && (n.dithering = e.dithering),
      void 0 !== e.alphaToCoverage && (n.alphaToCoverage = e.alphaToCoverage),
      void 0 !== e.premultipliedAlpha && (n.premultipliedAlpha = e.premultipliedAlpha),
      void 0 !== e.forceSinglePass && (n.forceSinglePass = e.forceSinglePass),
      void 0 !== e.visible && (n.visible = e.visible),
      void 0 !== e.toneMapped && (n.toneMapped = e.toneMapped),
      void 0 !== e.userData && (n.userData = e.userData),
      void 0 !== e.vertexColors &&
        ('number' == typeof e.vertexColors
          ? (n.vertexColors = e.vertexColors > 0)
          : (n.vertexColors = e.vertexColors)),
      void 0 !== e.uniforms)
    )
      for (const t in e.uniforms) {
        const i = e.uniforms[t];
        switch (((n.uniforms[t] = {}), i.type)) {
          case 't':
            n.uniforms[t].value = r(i.value);
            break;
          case 'c':
            n.uniforms[t].value = new Color().setHex(i.value);
            break;
          case 'v2':
            n.uniforms[t].value = new Vector2().fromArray(i.value);
            break;
          case 'v3':
            n.uniforms[t].value = new Vector3().fromArray(i.value);
            break;
          case 'v4':
            n.uniforms[t].value = new Vector4().fromArray(i.value);
            break;
          case 'm3':
            n.uniforms[t].value = new Matrix3().fromArray(i.value);
            break;
          case 'm4':
            n.uniforms[t].value = new Matrix4().fromArray(i.value);
            break;
          default:
            n.uniforms[t].value = i.value;
        }
      }
    if (
      (void 0 !== e.defines && (n.defines = e.defines),
      void 0 !== e.vertexShader && (n.vertexShader = e.vertexShader),
      void 0 !== e.fragmentShader && (n.fragmentShader = e.fragmentShader),
      void 0 !== e.glslVersion && (n.glslVersion = e.glslVersion),
      void 0 !== e.extensions)
    )
      for (const t in e.extensions) n.extensions[t] = e.extensions[t];
    if (
      (void 0 !== e.size && (n.size = e.size),
      void 0 !== e.sizeAttenuation && (n.sizeAttenuation = e.sizeAttenuation),
      void 0 !== e.map && (n.map = r(e.map)),
      void 0 !== e.matcap && (n.matcap = r(e.matcap)),
      void 0 !== e.alphaMap && (n.alphaMap = r(e.alphaMap)),
      void 0 !== e.bumpMap && (n.bumpMap = r(e.bumpMap)),
      void 0 !== e.bumpScale && (n.bumpScale = e.bumpScale),
      void 0 !== e.normalMap && (n.normalMap = r(e.normalMap)),
      void 0 !== e.normalMapType && (n.normalMapType = e.normalMapType),
      void 0 !== e.normalScale)
    ) {
      let t = e.normalScale;
      !1 === Array.isArray(t) && (t = [t, t]), (n.normalScale = new Vector2().fromArray(t));
    }
    return (
      void 0 !== e.displacementMap && (n.displacementMap = r(e.displacementMap)),
      void 0 !== e.displacementScale && (n.displacementScale = e.displacementScale),
      void 0 !== e.displacementBias && (n.displacementBias = e.displacementBias),
      void 0 !== e.roughnessMap && (n.roughnessMap = r(e.roughnessMap)),
      void 0 !== e.metalnessMap && (n.metalnessMap = r(e.metalnessMap)),
      void 0 !== e.emissiveMap && (n.emissiveMap = r(e.emissiveMap)),
      void 0 !== e.emissiveIntensity && (n.emissiveIntensity = e.emissiveIntensity),
      void 0 !== e.specularMap && (n.specularMap = r(e.specularMap)),
      void 0 !== e.specularIntensityMap && (n.specularIntensityMap = r(e.specularIntensityMap)),
      void 0 !== e.specularColorMap && (n.specularColorMap = r(e.specularColorMap)),
      void 0 !== e.envMap && (n.envMap = r(e.envMap)),
      void 0 !== e.envMapIntensity && (n.envMapIntensity = e.envMapIntensity),
      void 0 !== e.reflectivity && (n.reflectivity = e.reflectivity),
      void 0 !== e.refractionRatio && (n.refractionRatio = e.refractionRatio),
      void 0 !== e.lightMap && (n.lightMap = r(e.lightMap)),
      void 0 !== e.lightMapIntensity && (n.lightMapIntensity = e.lightMapIntensity),
      void 0 !== e.aoMap && (n.aoMap = r(e.aoMap)),
      void 0 !== e.aoMapIntensity && (n.aoMapIntensity = e.aoMapIntensity),
      void 0 !== e.gradientMap && (n.gradientMap = r(e.gradientMap)),
      void 0 !== e.clearcoatMap && (n.clearcoatMap = r(e.clearcoatMap)),
      void 0 !== e.clearcoatRoughnessMap && (n.clearcoatRoughnessMap = r(e.clearcoatRoughnessMap)),
      void 0 !== e.clearcoatNormalMap && (n.clearcoatNormalMap = r(e.clearcoatNormalMap)),
      void 0 !== e.clearcoatNormalScale &&
        (n.clearcoatNormalScale = new Vector2().fromArray(e.clearcoatNormalScale)),
      void 0 !== e.iridescenceMap && (n.iridescenceMap = r(e.iridescenceMap)),
      void 0 !== e.iridescenceThicknessMap &&
        (n.iridescenceThicknessMap = r(e.iridescenceThicknessMap)),
      void 0 !== e.transmissionMap && (n.transmissionMap = r(e.transmissionMap)),
      void 0 !== e.thicknessMap && (n.thicknessMap = r(e.thicknessMap)),
      void 0 !== e.sheenColorMap && (n.sheenColorMap = r(e.sheenColorMap)),
      void 0 !== e.sheenRoughnessMap && (n.sheenRoughnessMap = r(e.sheenRoughnessMap)),
      n
    );
  }
  setTextures(e) {
    return (this.textures = e), this;
  }
  static createMaterialFromType(e) {
    return new {
      ShadowMaterial: ShadowMaterial,
      SpriteMaterial: SpriteMaterial,
      RawShaderMaterial: RawShaderMaterial,
      ShaderMaterial: ShaderMaterial,
      PointsMaterial: PointsMaterial,
      MeshPhysicalMaterial: MeshPhysicalMaterial,
      MeshStandardMaterial: MeshStandardMaterial,
      MeshPhongMaterial: MeshPhongMaterial,
      MeshToonMaterial: MeshToonMaterial,
      MeshNormalMaterial: MeshNormalMaterial,
      MeshLambertMaterial: MeshLambertMaterial,
      MeshDepthMaterial: MeshDepthMaterial,
      MeshDistanceMaterial: MeshDistanceMaterial,
      MeshBasicMaterial: MeshBasicMaterial,
      MeshMatcapMaterial: MeshMatcapMaterial,
      LineDashedMaterial: LineDashedMaterial,
      LineBasicMaterial: LineBasicMaterial,
      Material: Material,
    }[e]();
  }
}
class LoaderUtils {
  static decodeText(e) {
    if ('undefined' != typeof TextDecoder) return new TextDecoder().decode(e);
    let t = '';
    for (let r = 0, n = e.length; r < n; r++) t += String.fromCharCode(e[r]);
    try {
      return decodeURIComponent(escape(t));
    } catch (e) {
      return t;
    }
  }
  static extractUrlBase(e) {
    const t = e.lastIndexOf('/');
    return -1 === t ? './' : e.slice(0, t + 1);
  }
  static resolveURL(e, t) {
    return 'string' != typeof e || '' === e
      ? ''
      : (/^https?:\/\//i.test(t) &&
          /^\//.test(e) &&
          (t = t.replace(/(^https?:\/\/[^\/]+).*/i, '$1')),
        /^(https?:)?\/\//i.test(e) || /^data:.*,.*$/i.test(e) || /^blob:.*$/i.test(e) ? e : t + e);
  }
}
class InstancedBufferGeometry extends BufferGeometry {
  constructor() {
    super(),
      (this.isInstancedBufferGeometry = !0),
      (this.type = 'InstancedBufferGeometry'),
      (this.instanceCount = 1 / 0);
  }
  copy(e) {
    return super.copy(e), (this.instanceCount = e.instanceCount), this;
  }
  toJSON() {
    const e = super.toJSON();
    return (e.instanceCount = this.instanceCount), (e.isInstancedBufferGeometry = !0), e;
  }
}
class BufferGeometryLoader extends Loader {
  constructor(e) {
    super(e);
  }
  load(e, t, r, n) {
    const i = this,
      a = new FileLoader(i.manager);
    a.setPath(i.path),
      a.setRequestHeader(i.requestHeader),
      a.setWithCredentials(i.withCredentials),
      a.load(
        e,
        function (r) {
          try {
            t(i.parse(JSON.parse(r)));
          } catch (t) {
            n ? n(t) : console.error(t), i.manager.itemError(e);
          }
        },
        r,
        n,
      );
  }
  parse(e) {
    const t = {},
      r = {};
    function n(e, n) {
      if (void 0 !== t[n]) return t[n];
      const i = e.interleavedBuffers[n],
        a = (function (e, t) {
          if (void 0 !== r[t]) return r[t];
          const n = e.arrayBuffers[t],
            i = new Uint32Array(n).buffer;
          return (r[t] = i), i;
        })(e, i.buffer),
        s = getTypedArray(i.type, a),
        o = new InterleavedBuffer(s, i.stride);
      return (o.uuid = i.uuid), (t[n] = o), o;
    }
    const i = e.isInstancedBufferGeometry ? new InstancedBufferGeometry() : new BufferGeometry(),
      a = e.data.index;
    if (void 0 !== a) {
      const e = getTypedArray(a.type, a.array);
      i.setIndex(new BufferAttribute(e, 1));
    }
    const s = e.data.attributes;
    for (const t in s) {
      const r = s[t];
      let a;
      if (r.isInterleavedBufferAttribute) {
        const t = n(e.data, r.data);
        a = new InterleavedBufferAttribute(t, r.itemSize, r.offset, r.normalized);
      } else {
        const e = getTypedArray(r.type, r.array);
        a = new (r.isInstancedBufferAttribute ? InstancedBufferAttribute : BufferAttribute)(
          e,
          r.itemSize,
          r.normalized,
        );
      }
      void 0 !== r.name && (a.name = r.name),
        void 0 !== r.usage && a.setUsage(r.usage),
        void 0 !== r.updateRange &&
          ((a.updateRange.offset = r.updateRange.offset),
          (a.updateRange.count = r.updateRange.count)),
        i.setAttribute(t, a);
    }
    const o = e.data.morphAttributes;
    if (o)
      for (const t in o) {
        const r = o[t],
          a = [];
        for (let t = 0, i = r.length; t < i; t++) {
          const i = r[t];
          let s;
          if (i.isInterleavedBufferAttribute) {
            const t = n(e.data, i.data);
            s = new InterleavedBufferAttribute(t, i.itemSize, i.offset, i.normalized);
          } else {
            const e = getTypedArray(i.type, i.array);
            s = new BufferAttribute(e, i.itemSize, i.normalized);
          }
          void 0 !== i.name && (s.name = i.name), a.push(s);
        }
        i.morphAttributes[t] = a;
      }
    e.data.morphTargetsRelative && (i.morphTargetsRelative = !0);
    const l = e.data.groups || e.data.drawcalls || e.data.offsets;
    if (void 0 !== l)
      for (let e = 0, t = l.length; e !== t; ++e) {
        const t = l[e];
        i.addGroup(t.start, t.count, t.materialIndex);
      }
    const c = e.data.boundingSphere;
    if (void 0 !== c) {
      const e = new Vector3();
      void 0 !== c.center && e.fromArray(c.center), (i.boundingSphere = new Sphere(e, c.radius));
    }
    return e.name && (i.name = e.name), e.userData && (i.userData = e.userData), i;
  }
}
class ObjectLoader extends Loader {
  constructor(e) {
    super(e);
  }
  load(e, t, r, n) {
    const i = this,
      a = '' === this.path ? LoaderUtils.extractUrlBase(e) : this.path;
    this.resourcePath = this.resourcePath || a;
    const s = new FileLoader(this.manager);
    s.setPath(this.path),
      s.setRequestHeader(this.requestHeader),
      s.setWithCredentials(this.withCredentials),
      s.load(
        e,
        function (r) {
          let a = null;
          try {
            a = JSON.parse(r);
          } catch (t) {
            return (
              void 0 !== n && n(t),
              void console.error("THREE:ObjectLoader: Can't parse " + e + '.', t.message)
            );
          }
          const s = a.metadata;
          if (void 0 === s || void 0 === s.type || 'geometry' === s.type.toLowerCase())
            return (
              void 0 !== n && n(new Error("THREE.ObjectLoader: Can't load " + e)),
              void console.error("THREE.ObjectLoader: Can't load " + e)
            );
          i.parse(a, t);
        },
        r,
        n,
      );
  }
  async loadAsync(e, t) {
    const r = '' === this.path ? LoaderUtils.extractUrlBase(e) : this.path;
    this.resourcePath = this.resourcePath || r;
    const n = new FileLoader(this.manager);
    n.setPath(this.path),
      n.setRequestHeader(this.requestHeader),
      n.setWithCredentials(this.withCredentials);
    const i = await n.loadAsync(e, t),
      a = JSON.parse(i),
      s = a.metadata;
    if (void 0 === s || void 0 === s.type || 'geometry' === s.type.toLowerCase())
      throw new Error("THREE.ObjectLoader: Can't load " + e);
    return await this.parseAsync(a);
  }
  parse(e, t) {
    const r = this.parseAnimations(e.animations),
      n = this.parseShapes(e.shapes),
      i = this.parseGeometries(e.geometries, n),
      a = this.parseImages(e.images, function () {
        void 0 !== t && t(l);
      }),
      s = this.parseTextures(e.textures, a),
      o = this.parseMaterials(e.materials, s),
      l = this.parseObject(e.object, i, o, s, r),
      c = this.parseSkeletons(e.skeletons, l);
    if ((this.bindSkeletons(l, c), void 0 !== t)) {
      let e = !1;
      for (const t in a)
        if (a[t].data instanceof HTMLImageElement) {
          e = !0;
          break;
        }
      !1 === e && t(l);
    }
    return l;
  }
  async parseAsync(e) {
    const t = this.parseAnimations(e.animations),
      r = this.parseShapes(e.shapes),
      n = this.parseGeometries(e.geometries, r),
      i = await this.parseImagesAsync(e.images),
      a = this.parseTextures(e.textures, i),
      s = this.parseMaterials(e.materials, a),
      o = this.parseObject(e.object, n, s, a, t),
      l = this.parseSkeletons(e.skeletons, o);
    return this.bindSkeletons(o, l), o;
  }
  parseShapes(e) {
    const t = {};
    if (void 0 !== e)
      for (let r = 0, n = e.length; r < n; r++) {
        const n = new Shape().fromJSON(e[r]);
        t[n.uuid] = n;
      }
    return t;
  }
  parseSkeletons(e, t) {
    const r = {},
      n = {};
    if (
      (t.traverse(function (e) {
        e.isBone && (n[e.uuid] = e);
      }),
      void 0 !== e)
    )
      for (let t = 0, i = e.length; t < i; t++) {
        const i = new Skeleton().fromJSON(e[t], n);
        r[i.uuid] = i;
      }
    return r;
  }
  parseGeometries(e, t) {
    const r = {};
    if (void 0 !== e) {
      const n = new BufferGeometryLoader();
      for (let i = 0, a = e.length; i < a; i++) {
        let a;
        const s = e[i];
        switch (s.type) {
          case 'BufferGeometry':
          case 'InstancedBufferGeometry':
            a = n.parse(s);
            break;
          default:
            s.type in Geometries
              ? (a = Geometries[s.type].fromJSON(s, t))
              : console.warn(`THREE.ObjectLoader: Unsupported geometry type "${s.type}"`);
        }
        (a.uuid = s.uuid),
          void 0 !== s.name && (a.name = s.name),
          void 0 !== s.userData && (a.userData = s.userData),
          (r[s.uuid] = a);
      }
    }
    return r;
  }
  parseMaterials(e, t) {
    const r = {},
      n = {};
    if (void 0 !== e) {
      const i = new MaterialLoader();
      i.setTextures(t);
      for (let t = 0, a = e.length; t < a; t++) {
        const a = e[t];
        void 0 === r[a.uuid] && (r[a.uuid] = i.parse(a)), (n[a.uuid] = r[a.uuid]);
      }
    }
    return n;
  }
  parseAnimations(e) {
    const t = {};
    if (void 0 !== e)
      for (let r = 0; r < e.length; r++) {
        const n = e[r],
          i = AnimationClip.parse(n);
        t[i.uuid] = i;
      }
    return t;
  }
  parseImages(e, t) {
    const r = this,
      n = {};
    let i;
    function a(e) {
      if ('string' == typeof e) {
        const t = e;
        return (function (e) {
          return (
            r.manager.itemStart(e),
            i.load(
              e,
              function () {
                r.manager.itemEnd(e);
              },
              void 0,
              function () {
                r.manager.itemError(e), r.manager.itemEnd(e);
              },
            )
          );
        })(/^(\/\/)|([a-z]+:(\/\/)?)/i.test(t) ? t : r.resourcePath + t);
      }
      return e.data
        ? { data: getTypedArray(e.type, e.data), width: e.width, height: e.height }
        : null;
    }
    if (void 0 !== e && e.length > 0) {
      const r = new LoadingManager(t);
      (i = new ImageLoader(r)), i.setCrossOrigin(this.crossOrigin);
      for (let t = 0, r = e.length; t < r; t++) {
        const r = e[t],
          i = r.url;
        if (Array.isArray(i)) {
          const e = [];
          for (let t = 0, r = i.length; t < r; t++) {
            const r = a(i[t]);
            null !== r &&
              (r instanceof HTMLImageElement
                ? e.push(r)
                : e.push(new DataTexture(r.data, r.width, r.height)));
          }
          n[r.uuid] = new Source(e);
        } else {
          const e = a(r.url);
          n[r.uuid] = new Source(e);
        }
      }
    }
    return n;
  }
  async parseImagesAsync(e) {
    const t = this,
      r = {};
    let n;
    async function i(e) {
      if ('string' == typeof e) {
        const r = e,
          i = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(r) ? r : t.resourcePath + r;
        return await n.loadAsync(i);
      }
      return e.data
        ? { data: getTypedArray(e.type, e.data), width: e.width, height: e.height }
        : null;
    }
    if (void 0 !== e && e.length > 0) {
      (n = new ImageLoader(this.manager)), n.setCrossOrigin(this.crossOrigin);
      for (let t = 0, n = e.length; t < n; t++) {
        const n = e[t],
          a = n.url;
        if (Array.isArray(a)) {
          const e = [];
          for (let t = 0, r = a.length; t < r; t++) {
            const r = a[t],
              n = await i(r);
            null !== n &&
              (n instanceof HTMLImageElement
                ? e.push(n)
                : e.push(new DataTexture(n.data, n.width, n.height)));
          }
          r[n.uuid] = new Source(e);
        } else {
          const e = await i(n.url);
          r[n.uuid] = new Source(e);
        }
      }
    }
    return r;
  }
  parseTextures(e, t) {
    function r(e, t) {
      return 'number' == typeof e
        ? e
        : (console.warn('THREE.ObjectLoader.parseTexture: Constant should be in numeric form.', e),
          t[e]);
    }
    const n = {};
    if (void 0 !== e)
      for (let i = 0, a = e.length; i < a; i++) {
        const a = e[i];
        void 0 === a.image && console.warn('THREE.ObjectLoader: No "image" specified for', a.uuid),
          void 0 === t[a.image] && console.warn('THREE.ObjectLoader: Undefined image', a.image);
        const s = t[a.image],
          o = s.data;
        let l;
        Array.isArray(o)
          ? ((l = new CubeTexture()), 6 === o.length && (l.needsUpdate = !0))
          : ((l = o && o.data ? new DataTexture() : new Texture()), o && (l.needsUpdate = !0)),
          (l.source = s),
          (l.uuid = a.uuid),
          void 0 !== a.name && (l.name = a.name),
          void 0 !== a.mapping && (l.mapping = r(a.mapping, TEXTURE_MAPPING)),
          void 0 !== a.channel && (l.channel = a.channel),
          void 0 !== a.offset && l.offset.fromArray(a.offset),
          void 0 !== a.repeat && l.repeat.fromArray(a.repeat),
          void 0 !== a.center && l.center.fromArray(a.center),
          void 0 !== a.rotation && (l.rotation = a.rotation),
          void 0 !== a.wrap &&
            ((l.wrapS = r(a.wrap[0], TEXTURE_WRAPPING)),
            (l.wrapT = r(a.wrap[1], TEXTURE_WRAPPING))),
          void 0 !== a.format && (l.format = a.format),
          void 0 !== a.internalFormat && (l.internalFormat = a.internalFormat),
          void 0 !== a.type && (l.type = a.type),
          void 0 !== a.encoding && (l.encoding = a.encoding),
          void 0 !== a.minFilter && (l.minFilter = r(a.minFilter, TEXTURE_FILTER)),
          void 0 !== a.magFilter && (l.magFilter = r(a.magFilter, TEXTURE_FILTER)),
          void 0 !== a.anisotropy && (l.anisotropy = a.anisotropy),
          void 0 !== a.flipY && (l.flipY = a.flipY),
          void 0 !== a.generateMipmaps && (l.generateMipmaps = a.generateMipmaps),
          void 0 !== a.premultiplyAlpha && (l.premultiplyAlpha = a.premultiplyAlpha),
          void 0 !== a.unpackAlignment && (l.unpackAlignment = a.unpackAlignment),
          void 0 !== a.userData && (l.userData = a.userData),
          (n[a.uuid] = l);
      }
    return n;
  }
  parseObject(e, t, r, n, i) {
    let a, s, o;
    function l(e) {
      return void 0 === t[e] && console.warn('THREE.ObjectLoader: Undefined geometry', e), t[e];
    }
    function c(e) {
      if (void 0 !== e) {
        if (Array.isArray(e)) {
          const t = [];
          for (let n = 0, i = e.length; n < i; n++) {
            const i = e[n];
            void 0 === r[i] && console.warn('THREE.ObjectLoader: Undefined material', i),
              t.push(r[i]);
          }
          return t;
        }
        return void 0 === r[e] && console.warn('THREE.ObjectLoader: Undefined material', e), r[e];
      }
    }
    function h(e) {
      return void 0 === n[e] && console.warn('THREE.ObjectLoader: Undefined texture', e), n[e];
    }
    switch (e.type) {
      case 'Scene':
        (a = new Scene()),
          void 0 !== e.background &&
            (Number.isInteger(e.background)
              ? (a.background = new Color(e.background))
              : (a.background = h(e.background))),
          void 0 !== e.environment && (a.environment = h(e.environment)),
          void 0 !== e.fog &&
            ('Fog' === e.fog.type
              ? (a.fog = new Fog(e.fog.color, e.fog.near, e.fog.far))
              : 'FogExp2' === e.fog.type && (a.fog = new FogExp2(e.fog.color, e.fog.density))),
          void 0 !== e.backgroundBlurriness && (a.backgroundBlurriness = e.backgroundBlurriness),
          void 0 !== e.backgroundIntensity && (a.backgroundIntensity = e.backgroundIntensity);
        break;
      case 'PerspectiveCamera':
        (a = new PerspectiveCamera(e.fov, e.aspect, e.near, e.far)),
          void 0 !== e.focus && (a.focus = e.focus),
          void 0 !== e.zoom && (a.zoom = e.zoom),
          void 0 !== e.filmGauge && (a.filmGauge = e.filmGauge),
          void 0 !== e.filmOffset && (a.filmOffset = e.filmOffset),
          void 0 !== e.view && (a.view = Object.assign({}, e.view));
        break;
      case 'OrthographicCamera':
        (a = new OrthographicCamera(e.left, e.right, e.top, e.bottom, e.near, e.far)),
          void 0 !== e.zoom && (a.zoom = e.zoom),
          void 0 !== e.view && (a.view = Object.assign({}, e.view));
        break;
      case 'AmbientLight':
        a = new AmbientLight(e.color, e.intensity);
        break;
      case 'DirectionalLight':
        a = new DirectionalLight(e.color, e.intensity);
        break;
      case 'PointLight':
        a = new PointLight(e.color, e.intensity, e.distance, e.decay);
        break;
      case 'RectAreaLight':
        a = new RectAreaLight(e.color, e.intensity, e.width, e.height);
        break;
      case 'SpotLight':
        a = new SpotLight(e.color, e.intensity, e.distance, e.angle, e.penumbra, e.decay);
        break;
      case 'HemisphereLight':
        a = new HemisphereLight(e.color, e.groundColor, e.intensity);
        break;
      case 'LightProbe':
        a = new LightProbe().fromJSON(e);
        break;
      case 'SkinnedMesh':
        (s = l(e.geometry)),
          (o = c(e.material)),
          (a = new SkinnedMesh(s, o)),
          void 0 !== e.bindMode && (a.bindMode = e.bindMode),
          void 0 !== e.bindMatrix && a.bindMatrix.fromArray(e.bindMatrix),
          void 0 !== e.skeleton && (a.skeleton = e.skeleton);
        break;
      case 'Mesh':
        (s = l(e.geometry)), (o = c(e.material)), (a = new Mesh(s, o));
        break;
      case 'InstancedMesh':
        (s = l(e.geometry)), (o = c(e.material));
        const t = e.count,
          r = e.instanceMatrix,
          n = e.instanceColor;
        (a = new InstancedMesh(s, o, t)),
          (a.instanceMatrix = new InstancedBufferAttribute(new Float32Array(r.array), 16)),
          void 0 !== n &&
            (a.instanceColor = new InstancedBufferAttribute(new Float32Array(n.array), n.itemSize));
        break;
      case 'LOD':
        a = new LOD();
        break;
      case 'Line':
        a = new Line(l(e.geometry), c(e.material));
        break;
      case 'LineLoop':
        a = new LineLoop(l(e.geometry), c(e.material));
        break;
      case 'LineSegments':
        a = new LineSegments(l(e.geometry), c(e.material));
        break;
      case 'PointCloud':
      case 'Points':
        a = new Points(l(e.geometry), c(e.material));
        break;
      case 'Sprite':
        a = new Sprite(c(e.material));
        break;
      case 'Group':
        a = new Group();
        break;
      case 'Bone':
        a = new Bone();
        break;
      default:
        a = new Object3D();
    }
    if (
      ((a.uuid = e.uuid),
      void 0 !== e.name && (a.name = e.name),
      void 0 !== e.matrix
        ? (a.matrix.fromArray(e.matrix),
          void 0 !== e.matrixAutoUpdate && (a.matrixAutoUpdate = e.matrixAutoUpdate),
          a.matrixAutoUpdate && a.matrix.decompose(a.position, a.quaternion, a.scale))
        : (void 0 !== e.position && a.position.fromArray(e.position),
          void 0 !== e.rotation && a.rotation.fromArray(e.rotation),
          void 0 !== e.quaternion && a.quaternion.fromArray(e.quaternion),
          void 0 !== e.scale && a.scale.fromArray(e.scale)),
      void 0 !== e.up && a.up.fromArray(e.up),
      void 0 !== e.castShadow && (a.castShadow = e.castShadow),
      void 0 !== e.receiveShadow && (a.receiveShadow = e.receiveShadow),
      e.shadow &&
        (void 0 !== e.shadow.bias && (a.shadow.bias = e.shadow.bias),
        void 0 !== e.shadow.normalBias && (a.shadow.normalBias = e.shadow.normalBias),
        void 0 !== e.shadow.radius && (a.shadow.radius = e.shadow.radius),
        void 0 !== e.shadow.mapSize && a.shadow.mapSize.fromArray(e.shadow.mapSize),
        void 0 !== e.shadow.camera && (a.shadow.camera = this.parseObject(e.shadow.camera))),
      void 0 !== e.visible && (a.visible = e.visible),
      void 0 !== e.frustumCulled && (a.frustumCulled = e.frustumCulled),
      void 0 !== e.renderOrder && (a.renderOrder = e.renderOrder),
      void 0 !== e.userData && (a.userData = e.userData),
      void 0 !== e.layers && (a.layers.mask = e.layers),
      void 0 !== e.children)
    ) {
      const s = e.children;
      for (let e = 0; e < s.length; e++) a.add(this.parseObject(s[e], t, r, n, i));
    }
    if (void 0 !== e.animations) {
      const t = e.animations;
      for (let e = 0; e < t.length; e++) {
        const r = t[e];
        a.animations.push(i[r]);
      }
    }
    if ('LOD' === e.type) {
      void 0 !== e.autoUpdate && (a.autoUpdate = e.autoUpdate);
      const t = e.levels;
      for (let e = 0; e < t.length; e++) {
        const r = t[e],
          n = a.getObjectByProperty('uuid', r.object);
        void 0 !== n && a.addLevel(n, r.distance, r.hysteresis);
      }
    }
    return a;
  }
  bindSkeletons(e, t) {
    0 !== Object.keys(t).length &&
      e.traverse(function (e) {
        if (!0 === e.isSkinnedMesh && void 0 !== e.skeleton) {
          const r = t[e.skeleton];
          void 0 === r
            ? console.warn('THREE.ObjectLoader: No skeleton found with UUID:', e.skeleton)
            : e.bind(r, e.bindMatrix);
        }
      });
  }
}
const TEXTURE_MAPPING = {
    UVMapping: 300,
    CubeReflectionMapping: 301,
    CubeRefractionMapping: 302,
    EquirectangularReflectionMapping: 303,
    EquirectangularRefractionMapping: 304,
    CubeUVReflectionMapping: 306,
  },
  TEXTURE_WRAPPING = {
    RepeatWrapping: 1e3,
    ClampToEdgeWrapping: 1001,
    MirroredRepeatWrapping: 1002,
  },
  TEXTURE_FILTER = {
    NearestFilter: 1003,
    NearestMipmapNearestFilter: 1004,
    NearestMipmapLinearFilter: 1005,
    LinearFilter: 1006,
    LinearMipmapNearestFilter: 1007,
    LinearMipmapLinearFilter: 1008,
  };
class ImageBitmapLoader extends Loader {
  constructor(e) {
    super(e),
      (this.isImageBitmapLoader = !0),
      'undefined' == typeof createImageBitmap &&
        console.warn('THREE.ImageBitmapLoader: createImageBitmap() not supported.'),
      'undefined' == typeof fetch &&
        console.warn('THREE.ImageBitmapLoader: fetch() not supported.'),
      (this.options = { premultiplyAlpha: 'none' });
  }
  setOptions(e) {
    return (this.options = e), this;
  }
  load(e, t, r, n) {
    void 0 === e && (e = ''),
      void 0 !== this.path && (e = this.path + e),
      (e = this.manager.resolveURL(e));
    const i = this,
      a = Cache.get(e);
    if (void 0 !== a)
      return (
        i.manager.itemStart(e),
        setTimeout(function () {
          t && t(a), i.manager.itemEnd(e);
        }, 0),
        a
      );
    const s = {};
    (s.credentials = 'anonymous' === this.crossOrigin ? 'same-origin' : 'include'),
      (s.headers = this.requestHeader),
      fetch(e, s)
        .then(function (e) {
          return e.blob();
        })
        .then(function (e) {
          return createImageBitmap(e, Object.assign(i.options, { colorSpaceConversion: 'none' }));
        })
        .then(function (r) {
          Cache.add(e, r), t && t(r), i.manager.itemEnd(e);
        })
        .catch(function (t) {
          n && n(t), i.manager.itemError(e), i.manager.itemEnd(e);
        }),
      i.manager.itemStart(e);
  }
}
let _context;
class AudioContext {
  static getContext() {
    return (
      void 0 === _context && (_context = new (window.AudioContext || window.webkitAudioContext)()),
      _context
    );
  }
  static setContext(e) {
    _context = e;
  }
}
class AudioLoader extends Loader {
  constructor(e) {
    super(e);
  }
  load(e, t, r, n) {
    const i = this,
      a = new FileLoader(this.manager);
    a.setResponseType('arraybuffer'),
      a.setPath(this.path),
      a.setRequestHeader(this.requestHeader),
      a.setWithCredentials(this.withCredentials),
      a.load(
        e,
        function (r) {
          try {
            const e = r.slice(0);
            AudioContext.getContext().decodeAudioData(e, function (e) {
              t(e);
            });
          } catch (t) {
            n ? n(t) : console.error(t), i.manager.itemError(e);
          }
        },
        r,
        n,
      );
  }
}
class HemisphereLightProbe extends LightProbe {
  constructor(e, t, r = 1) {
    super(void 0, r), (this.isHemisphereLightProbe = !0);
    const n = new Color().set(e),
      i = new Color().set(t),
      a = new Vector3(n.r, n.g, n.b),
      s = new Vector3(i.r, i.g, i.b),
      o = Math.sqrt(Math.PI),
      l = o * Math.sqrt(0.75);
    this.sh.coefficients[0].copy(a).add(s).multiplyScalar(o),
      this.sh.coefficients[1].copy(a).sub(s).multiplyScalar(l);
  }
}
class AmbientLightProbe extends LightProbe {
  constructor(e, t = 1) {
    super(void 0, t), (this.isAmbientLightProbe = !0);
    const r = new Color().set(e);
    this.sh.coefficients[0].set(r.r, r.g, r.b).multiplyScalar(2 * Math.sqrt(Math.PI));
  }
}
const _eyeRight = new Matrix4(),
  _eyeLeft = new Matrix4(),
  _projectionMatrix = new Matrix4();
class StereoCamera {
  constructor() {
    (this.type = 'StereoCamera'),
      (this.aspect = 1),
      (this.eyeSep = 0.064),
      (this.cameraL = new PerspectiveCamera()),
      this.cameraL.layers.enable(1),
      (this.cameraL.matrixAutoUpdate = !1),
      (this.cameraR = new PerspectiveCamera()),
      this.cameraR.layers.enable(2),
      (this.cameraR.matrixAutoUpdate = !1),
      (this._cache = {
        focus: null,
        fov: null,
        aspect: null,
        near: null,
        far: null,
        zoom: null,
        eyeSep: null,
      });
  }
  update(e) {
    const t = this._cache;
    if (
      t.focus !== e.focus ||
      t.fov !== e.fov ||
      t.aspect !== e.aspect * this.aspect ||
      t.near !== e.near ||
      t.far !== e.far ||
      t.zoom !== e.zoom ||
      t.eyeSep !== this.eyeSep
    ) {
      (t.focus = e.focus),
        (t.fov = e.fov),
        (t.aspect = e.aspect * this.aspect),
        (t.near = e.near),
        (t.far = e.far),
        (t.zoom = e.zoom),
        (t.eyeSep = this.eyeSep),
        _projectionMatrix.copy(e.projectionMatrix);
      const r = t.eyeSep / 2,
        n = (r * t.near) / t.focus,
        i = (t.near * Math.tan(DEG2RAD * t.fov * 0.5)) / t.zoom;
      let a, s;
      (_eyeLeft.elements[12] = -r),
        (_eyeRight.elements[12] = r),
        (a = -i * t.aspect + n),
        (s = i * t.aspect + n),
        (_projectionMatrix.elements[0] = (2 * t.near) / (s - a)),
        (_projectionMatrix.elements[8] = (s + a) / (s - a)),
        this.cameraL.projectionMatrix.copy(_projectionMatrix),
        (a = -i * t.aspect - n),
        (s = i * t.aspect - n),
        (_projectionMatrix.elements[0] = (2 * t.near) / (s - a)),
        (_projectionMatrix.elements[8] = (s + a) / (s - a)),
        this.cameraR.projectionMatrix.copy(_projectionMatrix);
    }
    this.cameraL.matrixWorld.copy(e.matrixWorld).multiply(_eyeLeft),
      this.cameraR.matrixWorld.copy(e.matrixWorld).multiply(_eyeRight);
  }
}
class Clock {
  constructor(e = !0) {
    (this.autoStart = e),
      (this.startTime = 0),
      (this.oldTime = 0),
      (this.elapsedTime = 0),
      (this.running = !1);
  }
  start() {
    (this.startTime = now()),
      (this.oldTime = this.startTime),
      (this.elapsedTime = 0),
      (this.running = !0);
  }
  stop() {
    this.getElapsedTime(), (this.running = !1), (this.autoStart = !1);
  }
  getElapsedTime() {
    return this.getDelta(), this.elapsedTime;
  }
  getDelta() {
    let e = 0;
    if (this.autoStart && !this.running) return this.start(), 0;
    if (this.running) {
      const t = now();
      (e = (t - this.oldTime) / 1e3), (this.oldTime = t), (this.elapsedTime += e);
    }
    return e;
  }
}
function now() {
  return ('undefined' == typeof performance ? Date : performance).now();
}
const _position$1 = new Vector3(),
  _quaternion$1 = new Quaternion(),
  _scale$1 = new Vector3(),
  _orientation$1 = new Vector3();
class AudioListener extends Object3D {
  constructor() {
    super(),
      (this.type = 'AudioListener'),
      (this.context = AudioContext.getContext()),
      (this.gain = this.context.createGain()),
      this.gain.connect(this.context.destination),
      (this.filter = null),
      (this.timeDelta = 0),
      (this._clock = new Clock());
  }
  getInput() {
    return this.gain;
  }
  removeFilter() {
    return (
      null !== this.filter &&
        (this.gain.disconnect(this.filter),
        this.filter.disconnect(this.context.destination),
        this.gain.connect(this.context.destination),
        (this.filter = null)),
      this
    );
  }
  getFilter() {
    return this.filter;
  }
  setFilter(e) {
    return (
      null !== this.filter
        ? (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination))
        : this.gain.disconnect(this.context.destination),
      (this.filter = e),
      this.gain.connect(this.filter),
      this.filter.connect(this.context.destination),
      this
    );
  }
  getMasterVolume() {
    return this.gain.gain.value;
  }
  setMasterVolume(e) {
    return this.gain.gain.setTargetAtTime(e, this.context.currentTime, 0.01), this;
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e);
    const t = this.context.listener,
      r = this.up;
    if (
      ((this.timeDelta = this._clock.getDelta()),
      this.matrixWorld.decompose(_position$1, _quaternion$1, _scale$1),
      _orientation$1.set(0, 0, -1).applyQuaternion(_quaternion$1),
      t.positionX)
    ) {
      const e = this.context.currentTime + this.timeDelta;
      t.positionX.linearRampToValueAtTime(_position$1.x, e),
        t.positionY.linearRampToValueAtTime(_position$1.y, e),
        t.positionZ.linearRampToValueAtTime(_position$1.z, e),
        t.forwardX.linearRampToValueAtTime(_orientation$1.x, e),
        t.forwardY.linearRampToValueAtTime(_orientation$1.y, e),
        t.forwardZ.linearRampToValueAtTime(_orientation$1.z, e),
        t.upX.linearRampToValueAtTime(r.x, e),
        t.upY.linearRampToValueAtTime(r.y, e),
        t.upZ.linearRampToValueAtTime(r.z, e);
    } else
      t.setPosition(_position$1.x, _position$1.y, _position$1.z),
        t.setOrientation(_orientation$1.x, _orientation$1.y, _orientation$1.z, r.x, r.y, r.z);
  }
}
class Audio extends Object3D {
  constructor(e) {
    super(),
      (this.type = 'Audio'),
      (this.listener = e),
      (this.context = e.context),
      (this.gain = this.context.createGain()),
      this.gain.connect(e.getInput()),
      (this.autoplay = !1),
      (this.buffer = null),
      (this.detune = 0),
      (this.loop = !1),
      (this.loopStart = 0),
      (this.loopEnd = 0),
      (this.offset = 0),
      (this.duration = void 0),
      (this.playbackRate = 1),
      (this.isPlaying = !1),
      (this.hasPlaybackControl = !0),
      (this.source = null),
      (this.sourceType = 'empty'),
      (this._startedAt = 0),
      (this._progress = 0),
      (this._connected = !1),
      (this.filters = []);
  }
  getOutput() {
    return this.gain;
  }
  setNodeSource(e) {
    return (
      (this.hasPlaybackControl = !1),
      (this.sourceType = 'audioNode'),
      (this.source = e),
      this.connect(),
      this
    );
  }
  setMediaElementSource(e) {
    return (
      (this.hasPlaybackControl = !1),
      (this.sourceType = 'mediaNode'),
      (this.source = this.context.createMediaElementSource(e)),
      this.connect(),
      this
    );
  }
  setMediaStreamSource(e) {
    return (
      (this.hasPlaybackControl = !1),
      (this.sourceType = 'mediaStreamNode'),
      (this.source = this.context.createMediaStreamSource(e)),
      this.connect(),
      this
    );
  }
  setBuffer(e) {
    return (this.buffer = e), (this.sourceType = 'buffer'), this.autoplay && this.play(), this;
  }
  play(e = 0) {
    if (!0 === this.isPlaying) return void console.warn('THREE.Audio: Audio is already playing.');
    if (!1 === this.hasPlaybackControl)
      return void console.warn('THREE.Audio: this Audio has no playback control.');
    this._startedAt = this.context.currentTime + e;
    const t = this.context.createBufferSource();
    return (
      (t.buffer = this.buffer),
      (t.loop = this.loop),
      (t.loopStart = this.loopStart),
      (t.loopEnd = this.loopEnd),
      (t.onended = this.onEnded.bind(this)),
      t.start(this._startedAt, this._progress + this.offset, this.duration),
      (this.isPlaying = !0),
      (this.source = t),
      this.setDetune(this.detune),
      this.setPlaybackRate(this.playbackRate),
      this.connect()
    );
  }
  pause() {
    if (!1 !== this.hasPlaybackControl)
      return (
        !0 === this.isPlaying &&
          ((this._progress +=
            Math.max(this.context.currentTime - this._startedAt, 0) * this.playbackRate),
          !0 === this.loop &&
            (this._progress = this._progress % (this.duration || this.buffer.duration)),
          this.source.stop(),
          (this.source.onended = null),
          (this.isPlaying = !1)),
        this
      );
    console.warn('THREE.Audio: this Audio has no playback control.');
  }
  stop() {
    if (!1 !== this.hasPlaybackControl)
      return (
        (this._progress = 0),
        null !== this.source && (this.source.stop(), (this.source.onended = null)),
        (this.isPlaying = !1),
        this
      );
    console.warn('THREE.Audio: this Audio has no playback control.');
  }
  connect() {
    if (this.filters.length > 0) {
      this.source.connect(this.filters[0]);
      for (let e = 1, t = this.filters.length; e < t; e++)
        this.filters[e - 1].connect(this.filters[e]);
      this.filters[this.filters.length - 1].connect(this.getOutput());
    } else this.source.connect(this.getOutput());
    return (this._connected = !0), this;
  }
  disconnect() {
    if (this.filters.length > 0) {
      this.source.disconnect(this.filters[0]);
      for (let e = 1, t = this.filters.length; e < t; e++)
        this.filters[e - 1].disconnect(this.filters[e]);
      this.filters[this.filters.length - 1].disconnect(this.getOutput());
    } else this.source.disconnect(this.getOutput());
    return (this._connected = !1), this;
  }
  getFilters() {
    return this.filters;
  }
  setFilters(e) {
    return (
      e || (e = []),
      !0 === this._connected
        ? (this.disconnect(), (this.filters = e.slice()), this.connect())
        : (this.filters = e.slice()),
      this
    );
  }
  setDetune(e) {
    if (((this.detune = e), void 0 !== this.source.detune))
      return (
        !0 === this.isPlaying &&
          this.source.detune.setTargetAtTime(this.detune, this.context.currentTime, 0.01),
        this
      );
  }
  getDetune() {
    return this.detune;
  }
  getFilter() {
    return this.getFilters()[0];
  }
  setFilter(e) {
    return this.setFilters(e ? [e] : []);
  }
  setPlaybackRate(e) {
    if (!1 !== this.hasPlaybackControl)
      return (
        (this.playbackRate = e),
        !0 === this.isPlaying &&
          this.source.playbackRate.setTargetAtTime(
            this.playbackRate,
            this.context.currentTime,
            0.01,
          ),
        this
      );
    console.warn('THREE.Audio: this Audio has no playback control.');
  }
  getPlaybackRate() {
    return this.playbackRate;
  }
  onEnded() {
    this.isPlaying = !1;
  }
  getLoop() {
    return !1 === this.hasPlaybackControl
      ? (console.warn('THREE.Audio: this Audio has no playback control.'), !1)
      : this.loop;
  }
  setLoop(e) {
    if (!1 !== this.hasPlaybackControl)
      return (this.loop = e), !0 === this.isPlaying && (this.source.loop = this.loop), this;
    console.warn('THREE.Audio: this Audio has no playback control.');
  }
  setLoopStart(e) {
    return (this.loopStart = e), this;
  }
  setLoopEnd(e) {
    return (this.loopEnd = e), this;
  }
  getVolume() {
    return this.gain.gain.value;
  }
  setVolume(e) {
    return this.gain.gain.setTargetAtTime(e, this.context.currentTime, 0.01), this;
  }
}
const _position = new Vector3(),
  _quaternion = new Quaternion(),
  _scale = new Vector3(),
  _orientation = new Vector3();
class PositionalAudio extends Audio {
  constructor(e) {
    super(e),
      (this.panner = this.context.createPanner()),
      (this.panner.panningModel = 'HRTF'),
      this.panner.connect(this.gain);
  }
  disconnect() {
    super.disconnect(), this.panner.disconnect(this.gain);
  }
  getOutput() {
    return this.panner;
  }
  getRefDistance() {
    return this.panner.refDistance;
  }
  setRefDistance(e) {
    return (this.panner.refDistance = e), this;
  }
  getRolloffFactor() {
    return this.panner.rolloffFactor;
  }
  setRolloffFactor(e) {
    return (this.panner.rolloffFactor = e), this;
  }
  getDistanceModel() {
    return this.panner.distanceModel;
  }
  setDistanceModel(e) {
    return (this.panner.distanceModel = e), this;
  }
  getMaxDistance() {
    return this.panner.maxDistance;
  }
  setMaxDistance(e) {
    return (this.panner.maxDistance = e), this;
  }
  setDirectionalCone(e, t, r) {
    return (
      (this.panner.coneInnerAngle = e),
      (this.panner.coneOuterAngle = t),
      (this.panner.coneOuterGain = r),
      this
    );
  }
  updateMatrixWorld(e) {
    if ((super.updateMatrixWorld(e), !0 === this.hasPlaybackControl && !1 === this.isPlaying))
      return;
    this.matrixWorld.decompose(_position, _quaternion, _scale),
      _orientation.set(0, 0, 1).applyQuaternion(_quaternion);
    const t = this.panner;
    if (t.positionX) {
      const e = this.context.currentTime + this.listener.timeDelta;
      t.positionX.linearRampToValueAtTime(_position.x, e),
        t.positionY.linearRampToValueAtTime(_position.y, e),
        t.positionZ.linearRampToValueAtTime(_position.z, e),
        t.orientationX.linearRampToValueAtTime(_orientation.x, e),
        t.orientationY.linearRampToValueAtTime(_orientation.y, e),
        t.orientationZ.linearRampToValueAtTime(_orientation.z, e);
    } else
      t.setPosition(_position.x, _position.y, _position.z),
        t.setOrientation(_orientation.x, _orientation.y, _orientation.z);
  }
}
class AudioAnalyser {
  constructor(e, t = 2048) {
    (this.analyser = e.context.createAnalyser()),
      (this.analyser.fftSize = t),
      (this.data = new Uint8Array(this.analyser.frequencyBinCount)),
      e.getOutput().connect(this.analyser);
  }
  getFrequencyData() {
    return this.analyser.getByteFrequencyData(this.data), this.data;
  }
  getAverageFrequency() {
    let e = 0;
    const t = this.getFrequencyData();
    for (let r = 0; r < t.length; r++) e += t[r];
    return e / t.length;
  }
}
class PropertyMixer {
  constructor(e, t, r) {
    let n, i, a;
    switch (((this.binding = e), (this.valueSize = r), t)) {
      case 'quaternion':
        (n = this._slerp),
          (i = this._slerpAdditive),
          (a = this._setAdditiveIdentityQuaternion),
          (this.buffer = new Float64Array(6 * r)),
          (this._workIndex = 5);
        break;
      case 'string':
      case 'bool':
        (n = this._select),
          (i = this._select),
          (a = this._setAdditiveIdentityOther),
          (this.buffer = new Array(5 * r));
        break;
      default:
        (n = this._lerp),
          (i = this._lerpAdditive),
          (a = this._setAdditiveIdentityNumeric),
          (this.buffer = new Float64Array(5 * r));
    }
    (this._mixBufferRegion = n),
      (this._mixBufferRegionAdditive = i),
      (this._setIdentity = a),
      (this._origIndex = 3),
      (this._addIndex = 4),
      (this.cumulativeWeight = 0),
      (this.cumulativeWeightAdditive = 0),
      (this.useCount = 0),
      (this.referenceCount = 0);
  }
  accumulate(e, t) {
    const r = this.buffer,
      n = this.valueSize,
      i = e * n + n;
    let a = this.cumulativeWeight;
    if (0 === a) {
      for (let e = 0; e !== n; ++e) r[i + e] = r[e];
      a = t;
    } else {
      a += t;
      const e = t / a;
      this._mixBufferRegion(r, i, 0, e, n);
    }
    this.cumulativeWeight = a;
  }
  accumulateAdditive(e) {
    const t = this.buffer,
      r = this.valueSize,
      n = r * this._addIndex;
    0 === this.cumulativeWeightAdditive && this._setIdentity(),
      this._mixBufferRegionAdditive(t, n, 0, e, r),
      (this.cumulativeWeightAdditive += e);
  }
  apply(e) {
    const t = this.valueSize,
      r = this.buffer,
      n = e * t + t,
      i = this.cumulativeWeight,
      a = this.cumulativeWeightAdditive,
      s = this.binding;
    if (((this.cumulativeWeight = 0), (this.cumulativeWeightAdditive = 0), i < 1)) {
      const e = t * this._origIndex;
      this._mixBufferRegion(r, n, e, 1 - i, t);
    }
    a > 0 && this._mixBufferRegionAdditive(r, n, this._addIndex * t, 1, t);
    for (let e = t, i = t + t; e !== i; ++e)
      if (r[e] !== r[e + t]) {
        s.setValue(r, n);
        break;
      }
  }
  saveOriginalState() {
    const e = this.binding,
      t = this.buffer,
      r = this.valueSize,
      n = r * this._origIndex;
    e.getValue(t, n);
    for (let e = r, i = n; e !== i; ++e) t[e] = t[n + (e % r)];
    this._setIdentity(), (this.cumulativeWeight = 0), (this.cumulativeWeightAdditive = 0);
  }
  restoreOriginalState() {
    const e = 3 * this.valueSize;
    this.binding.setValue(this.buffer, e);
  }
  _setAdditiveIdentityNumeric() {
    const e = this._addIndex * this.valueSize,
      t = e + this.valueSize;
    for (let r = e; r < t; r++) this.buffer[r] = 0;
  }
  _setAdditiveIdentityQuaternion() {
    this._setAdditiveIdentityNumeric(), (this.buffer[this._addIndex * this.valueSize + 3] = 1);
  }
  _setAdditiveIdentityOther() {
    const e = this._origIndex * this.valueSize,
      t = this._addIndex * this.valueSize;
    for (let r = 0; r < this.valueSize; r++) this.buffer[t + r] = this.buffer[e + r];
  }
  _select(e, t, r, n, i) {
    if (n >= 0.5) for (let n = 0; n !== i; ++n) e[t + n] = e[r + n];
  }
  _slerp(e, t, r, n) {
    Quaternion.slerpFlat(e, t, e, t, e, r, n);
  }
  _slerpAdditive(e, t, r, n, i) {
    const a = this._workIndex * i;
    Quaternion.multiplyQuaternionsFlat(e, a, e, t, e, r), Quaternion.slerpFlat(e, t, e, t, e, a, n);
  }
  _lerp(e, t, r, n, i) {
    const a = 1 - n;
    for (let s = 0; s !== i; ++s) {
      const i = t + s;
      e[i] = e[i] * a + e[r + s] * n;
    }
  }
  _lerpAdditive(e, t, r, n, i) {
    for (let a = 0; a !== i; ++a) {
      const i = t + a;
      e[i] = e[i] + e[r + a] * n;
    }
  }
}
const _RESERVED_CHARS_RE = '\\[\\]\\.:\\/',
  _reservedRe = new RegExp('[\\[\\]\\.:\\/]', 'g'),
  _wordChar = '[^\\[\\]\\.:\\/]',
  _wordCharOrDot = '[^' + '\\[\\]\\.:\\/'.replace('\\.', '') + ']',
  _directoryRe = /((?:WC+[\/:])*)/.source.replace('WC', _wordChar),
  _nodeRe = /(WCOD+)?/.source.replace('WCOD', _wordCharOrDot),
  _objectRe = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace('WC', _wordChar),
  _propertyRe = /\.(WC+)(?:\[(.+)\])?/.source.replace('WC', _wordChar),
  _trackRe = new RegExp('^' + _directoryRe + _nodeRe + _objectRe + _propertyRe + '$'),
  _supportedObjectNames = ['material', 'materials', 'bones', 'map'];
class Composite {
  constructor(e, t, r) {
    const n = r || PropertyBinding.parseTrackName(t);
    (this._targetGroup = e), (this._bindings = e.subscribe_(t, n));
  }
  getValue(e, t) {
    this.bind();
    const r = this._targetGroup.nCachedObjects_,
      n = this._bindings[r];
    void 0 !== n && n.getValue(e, t);
  }
  setValue(e, t) {
    const r = this._bindings;
    for (let n = this._targetGroup.nCachedObjects_, i = r.length; n !== i; ++n) r[n].setValue(e, t);
  }
  bind() {
    const e = this._bindings;
    for (let t = this._targetGroup.nCachedObjects_, r = e.length; t !== r; ++t) e[t].bind();
  }
  unbind() {
    const e = this._bindings;
    for (let t = this._targetGroup.nCachedObjects_, r = e.length; t !== r; ++t) e[t].unbind();
  }
}
class PropertyBinding {
  constructor(e, t, r) {
    (this.path = t),
      (this.parsedPath = r || PropertyBinding.parseTrackName(t)),
      (this.node = PropertyBinding.findNode(e, this.parsedPath.nodeName)),
      (this.rootNode = e),
      (this.getValue = this._getValue_unbound),
      (this.setValue = this._setValue_unbound);
  }
  static create(e, t, r) {
    return e && e.isAnimationObjectGroup
      ? new PropertyBinding.Composite(e, t, r)
      : new PropertyBinding(e, t, r);
  }
  static sanitizeNodeName(e) {
    return e.replace(/\s/g, '_').replace(_reservedRe, '');
  }
  static parseTrackName(e) {
    const t = _trackRe.exec(e);
    if (null === t) throw new Error('PropertyBinding: Cannot parse trackName: ' + e);
    const r = {
        nodeName: t[2],
        objectName: t[3],
        objectIndex: t[4],
        propertyName: t[5],
        propertyIndex: t[6],
      },
      n = r.nodeName && r.nodeName.lastIndexOf('.');
    if (void 0 !== n && -1 !== n) {
      const e = r.nodeName.substring(n + 1);
      -1 !== _supportedObjectNames.indexOf(e) &&
        ((r.nodeName = r.nodeName.substring(0, n)), (r.objectName = e));
    }
    if (null === r.propertyName || 0 === r.propertyName.length)
      throw new Error('PropertyBinding: can not parse propertyName from trackName: ' + e);
    return r;
  }
  static findNode(e, t) {
    if (void 0 === t || '' === t || '.' === t || -1 === t || t === e.name || t === e.uuid) return e;
    if (e.skeleton) {
      const r = e.skeleton.getBoneByName(t);
      if (void 0 !== r) return r;
    }
    if (e.children) {
      const r = function (e) {
          for (let n = 0; n < e.length; n++) {
            const i = e[n];
            if (i.name === t || i.uuid === t) return i;
            const a = r(i.children);
            if (a) return a;
          }
          return null;
        },
        n = r(e.children);
      if (n) return n;
    }
    return null;
  }
  _getValue_unavailable() {}
  _setValue_unavailable() {}
  _getValue_direct(e, t) {
    e[t] = this.targetObject[this.propertyName];
  }
  _getValue_array(e, t) {
    const r = this.resolvedProperty;
    for (let n = 0, i = r.length; n !== i; ++n) e[t++] = r[n];
  }
  _getValue_arrayElement(e, t) {
    e[t] = this.resolvedProperty[this.propertyIndex];
  }
  _getValue_toArray(e, t) {
    this.resolvedProperty.toArray(e, t);
  }
  _setValue_direct(e, t) {
    this.targetObject[this.propertyName] = e[t];
  }
  _setValue_direct_setNeedsUpdate(e, t) {
    (this.targetObject[this.propertyName] = e[t]), (this.targetObject.needsUpdate = !0);
  }
  _setValue_direct_setMatrixWorldNeedsUpdate(e, t) {
    (this.targetObject[this.propertyName] = e[t]), (this.targetObject.matrixWorldNeedsUpdate = !0);
  }
  _setValue_array(e, t) {
    const r = this.resolvedProperty;
    for (let n = 0, i = r.length; n !== i; ++n) r[n] = e[t++];
  }
  _setValue_array_setNeedsUpdate(e, t) {
    const r = this.resolvedProperty;
    for (let n = 0, i = r.length; n !== i; ++n) r[n] = e[t++];
    this.targetObject.needsUpdate = !0;
  }
  _setValue_array_setMatrixWorldNeedsUpdate(e, t) {
    const r = this.resolvedProperty;
    for (let n = 0, i = r.length; n !== i; ++n) r[n] = e[t++];
    this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_arrayElement(e, t) {
    this.resolvedProperty[this.propertyIndex] = e[t];
  }
  _setValue_arrayElement_setNeedsUpdate(e, t) {
    (this.resolvedProperty[this.propertyIndex] = e[t]), (this.targetObject.needsUpdate = !0);
  }
  _setValue_arrayElement_setMatrixWorldNeedsUpdate(e, t) {
    (this.resolvedProperty[this.propertyIndex] = e[t]),
      (this.targetObject.matrixWorldNeedsUpdate = !0);
  }
  _setValue_fromArray(e, t) {
    this.resolvedProperty.fromArray(e, t);
  }
  _setValue_fromArray_setNeedsUpdate(e, t) {
    this.resolvedProperty.fromArray(e, t), (this.targetObject.needsUpdate = !0);
  }
  _setValue_fromArray_setMatrixWorldNeedsUpdate(e, t) {
    this.resolvedProperty.fromArray(e, t), (this.targetObject.matrixWorldNeedsUpdate = !0);
  }
  _getValue_unbound(e, t) {
    this.bind(), this.getValue(e, t);
  }
  _setValue_unbound(e, t) {
    this.bind(), this.setValue(e, t);
  }
  bind() {
    let e = this.node;
    const t = this.parsedPath,
      r = t.objectName,
      n = t.propertyName;
    let i = t.propertyIndex;
    if (
      (e || ((e = PropertyBinding.findNode(this.rootNode, t.nodeName)), (this.node = e)),
      (this.getValue = this._getValue_unavailable),
      (this.setValue = this._setValue_unavailable),
      !e)
    )
      return void console.error(
        'THREE.PropertyBinding: Trying to update node for track: ' +
          this.path +
          " but it wasn't found.",
      );
    if (r) {
      let n = t.objectIndex;
      switch (r) {
        case 'materials':
          if (!e.material)
            return void console.error(
              'THREE.PropertyBinding: Can not bind to material as node does not have a material.',
              this,
            );
          if (!e.material.materials)
            return void console.error(
              'THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.',
              this,
            );
          e = e.material.materials;
          break;
        case 'bones':
          if (!e.skeleton)
            return void console.error(
              'THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.',
              this,
            );
          e = e.skeleton.bones;
          for (let t = 0; t < e.length; t++)
            if (e[t].name === n) {
              n = t;
              break;
            }
          break;
        case 'map':
          if ('map' in e) {
            e = e.map;
            break;
          }
          if (!e.material)
            return void console.error(
              'THREE.PropertyBinding: Can not bind to material as node does not have a material.',
              this,
            );
          if (!e.material.map)
            return void console.error(
              'THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.',
              this,
            );
          e = e.material.map;
          break;
        default:
          if (void 0 === e[r])
            return void console.error(
              'THREE.PropertyBinding: Can not bind to objectName of node undefined.',
              this,
            );
          e = e[r];
      }
      if (void 0 !== n) {
        if (void 0 === e[n])
          return void console.error(
            'THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.',
            this,
            e,
          );
        e = e[n];
      }
    }
    const a = e[n];
    if (void 0 === a) {
      const r = t.nodeName;
      return void console.error(
        'THREE.PropertyBinding: Trying to update property for track: ' +
          r +
          '.' +
          n +
          " but it wasn't found.",
        e,
      );
    }
    let s = this.Versioning.None;
    (this.targetObject = e),
      void 0 !== e.needsUpdate
        ? (s = this.Versioning.NeedsUpdate)
        : void 0 !== e.matrixWorldNeedsUpdate && (s = this.Versioning.MatrixWorldNeedsUpdate);
    let o = this.BindingType.Direct;
    if (void 0 !== i) {
      if ('morphTargetInfluences' === n) {
        if (!e.geometry)
          return void console.error(
            'THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.',
            this,
          );
        if (!e.geometry.morphAttributes)
          return void console.error(
            'THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.',
            this,
          );
        void 0 !== e.morphTargetDictionary[i] && (i = e.morphTargetDictionary[i]);
      }
      (o = this.BindingType.ArrayElement), (this.resolvedProperty = a), (this.propertyIndex = i);
    } else
      void 0 !== a.fromArray && void 0 !== a.toArray
        ? ((o = this.BindingType.HasFromToArray), (this.resolvedProperty = a))
        : Array.isArray(a)
          ? ((o = this.BindingType.EntireArray), (this.resolvedProperty = a))
          : (this.propertyName = n);
    (this.getValue = this.GetterByBindingType[o]),
      (this.setValue = this.SetterByBindingTypeAndVersioning[o][s]);
  }
  unbind() {
    (this.node = null),
      (this.getValue = this._getValue_unbound),
      (this.setValue = this._setValue_unbound);
  }
}
(PropertyBinding.Composite = Composite),
  (PropertyBinding.prototype.BindingType = {
    Direct: 0,
    EntireArray: 1,
    ArrayElement: 2,
    HasFromToArray: 3,
  }),
  (PropertyBinding.prototype.Versioning = { None: 0, NeedsUpdate: 1, MatrixWorldNeedsUpdate: 2 }),
  (PropertyBinding.prototype.GetterByBindingType = [
    PropertyBinding.prototype._getValue_direct,
    PropertyBinding.prototype._getValue_array,
    PropertyBinding.prototype._getValue_arrayElement,
    PropertyBinding.prototype._getValue_toArray,
  ]),
  (PropertyBinding.prototype.SetterByBindingTypeAndVersioning = [
    [
      PropertyBinding.prototype._setValue_direct,
      PropertyBinding.prototype._setValue_direct_setNeedsUpdate,
      PropertyBinding.prototype._setValue_direct_setMatrixWorldNeedsUpdate,
    ],
    [
      PropertyBinding.prototype._setValue_array,
      PropertyBinding.prototype._setValue_array_setNeedsUpdate,
      PropertyBinding.prototype._setValue_array_setMatrixWorldNeedsUpdate,
    ],
    [
      PropertyBinding.prototype._setValue_arrayElement,
      PropertyBinding.prototype._setValue_arrayElement_setNeedsUpdate,
      PropertyBinding.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate,
    ],
    [
      PropertyBinding.prototype._setValue_fromArray,
      PropertyBinding.prototype._setValue_fromArray_setNeedsUpdate,
      PropertyBinding.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate,
    ],
  ]);
class AnimationObjectGroup {
  constructor() {
    (this.isAnimationObjectGroup = !0),
      (this.uuid = generateUUID()),
      (this._objects = Array.prototype.slice.call(arguments)),
      (this.nCachedObjects_ = 0);
    const e = {};
    this._indicesByUUID = e;
    for (let t = 0, r = arguments.length; t !== r; ++t) e[arguments[t].uuid] = t;
    (this._paths = []),
      (this._parsedPaths = []),
      (this._bindings = []),
      (this._bindingsIndicesByPath = {});
    const t = this;
    this.stats = {
      objects: {
        get total() {
          return t._objects.length;
        },
        get inUse() {
          return this.total - t.nCachedObjects_;
        },
      },
      get bindingsPerObject() {
        return t._bindings.length;
      },
    };
  }
  add() {
    const e = this._objects,
      t = this._indicesByUUID,
      r = this._paths,
      n = this._parsedPaths,
      i = this._bindings,
      a = i.length;
    let s,
      o = e.length,
      l = this.nCachedObjects_;
    for (let c = 0, h = arguments.length; c !== h; ++c) {
      const h = arguments[c],
        u = h.uuid;
      let d = t[u];
      if (void 0 === d) {
        (d = o++), (t[u] = d), e.push(h);
        for (let e = 0, t = a; e !== t; ++e) i[e].push(new PropertyBinding(h, r[e], n[e]));
      } else if (d < l) {
        s = e[d];
        const o = --l,
          c = e[o];
        (t[c.uuid] = d), (e[d] = c), (t[u] = o), (e[o] = h);
        for (let e = 0, t = a; e !== t; ++e) {
          const t = i[e],
            a = t[o];
          let s = t[d];
          (t[d] = a), void 0 === s && (s = new PropertyBinding(h, r[e], n[e])), (t[o] = s);
        }
      } else
        e[d] !== s &&
          console.error(
            'THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.',
          );
    }
    this.nCachedObjects_ = l;
  }
  remove() {
    const e = this._objects,
      t = this._indicesByUUID,
      r = this._bindings,
      n = r.length;
    let i = this.nCachedObjects_;
    for (let a = 0, s = arguments.length; a !== s; ++a) {
      const s = arguments[a],
        o = s.uuid,
        l = t[o];
      if (void 0 !== l && l >= i) {
        const a = i++,
          c = e[a];
        (t[c.uuid] = l), (e[l] = c), (t[o] = a), (e[a] = s);
        for (let e = 0, t = n; e !== t; ++e) {
          const t = r[e],
            n = t[a],
            i = t[l];
          (t[l] = n), (t[a] = i);
        }
      }
    }
    this.nCachedObjects_ = i;
  }
  uncache() {
    const e = this._objects,
      t = this._indicesByUUID,
      r = this._bindings,
      n = r.length;
    let i = this.nCachedObjects_,
      a = e.length;
    for (let s = 0, o = arguments.length; s !== o; ++s) {
      const o = arguments[s].uuid,
        l = t[o];
      if (void 0 !== l)
        if ((delete t[o], l < i)) {
          const s = --i,
            o = e[s],
            c = --a,
            h = e[c];
          (t[o.uuid] = l), (e[l] = o), (t[h.uuid] = s), (e[s] = h), e.pop();
          for (let e = 0, t = n; e !== t; ++e) {
            const t = r[e],
              n = t[s],
              i = t[c];
            (t[l] = n), (t[s] = i), t.pop();
          }
        } else {
          const i = --a,
            s = e[i];
          i > 0 && (t[s.uuid] = l), (e[l] = s), e.pop();
          for (let e = 0, t = n; e !== t; ++e) {
            const t = r[e];
            (t[l] = t[i]), t.pop();
          }
        }
    }
    this.nCachedObjects_ = i;
  }
  subscribe_(e, t) {
    const r = this._bindingsIndicesByPath;
    let n = r[e];
    const i = this._bindings;
    if (void 0 !== n) return i[n];
    const a = this._paths,
      s = this._parsedPaths,
      o = this._objects,
      l = o.length,
      c = this.nCachedObjects_,
      h = new Array(l);
    (n = i.length), (r[e] = n), a.push(e), s.push(t), i.push(h);
    for (let r = c, n = o.length; r !== n; ++r) {
      const n = o[r];
      h[r] = new PropertyBinding(n, e, t);
    }
    return h;
  }
  unsubscribe_(e) {
    const t = this._bindingsIndicesByPath,
      r = t[e];
    if (void 0 !== r) {
      const n = this._paths,
        i = this._parsedPaths,
        a = this._bindings,
        s = a.length - 1,
        o = a[s];
      (t[e[s]] = r), (a[r] = o), a.pop(), (i[r] = i[s]), i.pop(), (n[r] = n[s]), n.pop();
    }
  }
}
class AnimationAction {
  constructor(e, t, r = null, n = t.blendMode) {
    (this._mixer = e), (this._clip = t), (this._localRoot = r), (this.blendMode = n);
    const i = t.tracks,
      a = i.length,
      s = new Array(a),
      o = { endingStart: 2400, endingEnd: 2400 };
    for (let e = 0; e !== a; ++e) {
      const t = i[e].createInterpolant(null);
      (s[e] = t), (t.settings = o);
    }
    (this._interpolantSettings = o),
      (this._interpolants = s),
      (this._propertyBindings = new Array(a)),
      (this._cacheIndex = null),
      (this._byClipCacheIndex = null),
      (this._timeScaleInterpolant = null),
      (this._weightInterpolant = null),
      (this.loop = 2201),
      (this._loopCount = -1),
      (this._startTime = null),
      (this.time = 0),
      (this.timeScale = 1),
      (this._effectiveTimeScale = 1),
      (this.weight = 1),
      (this._effectiveWeight = 1),
      (this.repetitions = 1 / 0),
      (this.paused = !1),
      (this.enabled = !0),
      (this.clampWhenFinished = !1),
      (this.zeroSlopeAtStart = !0),
      (this.zeroSlopeAtEnd = !0);
  }
  play() {
    return this._mixer._activateAction(this), this;
  }
  stop() {
    return this._mixer._deactivateAction(this), this.reset();
  }
  reset() {
    return (
      (this.paused = !1),
      (this.enabled = !0),
      (this.time = 0),
      (this._loopCount = -1),
      (this._startTime = null),
      this.stopFading().stopWarping()
    );
  }
  isRunning() {
    return (
      this.enabled &&
      !this.paused &&
      0 !== this.timeScale &&
      null === this._startTime &&
      this._mixer._isActiveAction(this)
    );
  }
  isScheduled() {
    return this._mixer._isActiveAction(this);
  }
  startAt(e) {
    return (this._startTime = e), this;
  }
  setLoop(e, t) {
    return (this.loop = e), (this.repetitions = t), this;
  }
  setEffectiveWeight(e) {
    return (this.weight = e), (this._effectiveWeight = this.enabled ? e : 0), this.stopFading();
  }
  getEffectiveWeight() {
    return this._effectiveWeight;
  }
  fadeIn(e) {
    return this._scheduleFading(e, 0, 1);
  }
  fadeOut(e) {
    return this._scheduleFading(e, 1, 0);
  }
  crossFadeFrom(e, t, r) {
    if ((e.fadeOut(t), this.fadeIn(t), r)) {
      const r = this._clip.duration,
        n = e._clip.duration,
        i = n / r,
        a = r / n;
      e.warp(1, i, t), this.warp(a, 1, t);
    }
    return this;
  }
  crossFadeTo(e, t, r) {
    return e.crossFadeFrom(this, t, r);
  }
  stopFading() {
    const e = this._weightInterpolant;
    return (
      null !== e && ((this._weightInterpolant = null), this._mixer._takeBackControlInterpolant(e)),
      this
    );
  }
  setEffectiveTimeScale(e) {
    return (
      (this.timeScale = e), (this._effectiveTimeScale = this.paused ? 0 : e), this.stopWarping()
    );
  }
  getEffectiveTimeScale() {
    return this._effectiveTimeScale;
  }
  setDuration(e) {
    return (this.timeScale = this._clip.duration / e), this.stopWarping();
  }
  syncWith(e) {
    return (this.time = e.time), (this.timeScale = e.timeScale), this.stopWarping();
  }
  halt(e) {
    return this.warp(this._effectiveTimeScale, 0, e);
  }
  warp(e, t, r) {
    const n = this._mixer,
      i = n.time,
      a = this.timeScale;
    let s = this._timeScaleInterpolant;
    null === s && ((s = n._lendControlInterpolant()), (this._timeScaleInterpolant = s));
    const o = s.parameterPositions,
      l = s.sampleValues;
    return (o[0] = i), (o[1] = i + r), (l[0] = e / a), (l[1] = t / a), this;
  }
  stopWarping() {
    const e = this._timeScaleInterpolant;
    return (
      null !== e &&
        ((this._timeScaleInterpolant = null), this._mixer._takeBackControlInterpolant(e)),
      this
    );
  }
  getMixer() {
    return this._mixer;
  }
  getClip() {
    return this._clip;
  }
  getRoot() {
    return this._localRoot || this._mixer._root;
  }
  _update(e, t, r, n) {
    if (!this.enabled) return void this._updateWeight(e);
    const i = this._startTime;
    if (null !== i) {
      const n = (e - i) * r;
      n < 0 || 0 === r ? (t = 0) : ((this._startTime = null), (t = r * n));
    }
    t *= this._updateTimeScale(e);
    const a = this._updateTime(t),
      s = this._updateWeight(e);
    if (s > 0) {
      const e = this._interpolants,
        t = this._propertyBindings;
      switch (this.blendMode) {
        case 2501:
          for (let r = 0, n = e.length; r !== n; ++r) e[r].evaluate(a), t[r].accumulateAdditive(s);
          break;
        case 2500:
        default:
          for (let r = 0, i = e.length; r !== i; ++r) e[r].evaluate(a), t[r].accumulate(n, s);
      }
    }
  }
  _updateWeight(e) {
    let t = 0;
    if (this.enabled) {
      t = this.weight;
      const r = this._weightInterpolant;
      if (null !== r) {
        const n = r.evaluate(e)[0];
        (t *= n),
          e > r.parameterPositions[1] && (this.stopFading(), 0 === n && (this.enabled = !1));
      }
    }
    return (this._effectiveWeight = t), t;
  }
  _updateTimeScale(e) {
    let t = 0;
    if (!this.paused) {
      t = this.timeScale;
      const r = this._timeScaleInterpolant;
      if (null !== r) {
        (t *= r.evaluate(e)[0]),
          e > r.parameterPositions[1] &&
            (this.stopWarping(), 0 === t ? (this.paused = !0) : (this.timeScale = t));
      }
    }
    return (this._effectiveTimeScale = t), t;
  }
  _updateTime(e) {
    const t = this._clip.duration,
      r = this.loop;
    let n = this.time + e,
      i = this._loopCount;
    const a = 2202 === r;
    if (0 === e) return -1 === i ? n : a && 1 == (1 & i) ? t - n : n;
    if (2200 === r) {
      -1 === i && ((this._loopCount = 0), this._setEndings(!0, !0, !1));
      e: {
        if (n >= t) n = t;
        else {
          if (!(n < 0)) {
            this.time = n;
            break e;
          }
          n = 0;
        }
        this.clampWhenFinished ? (this.paused = !0) : (this.enabled = !1),
          (this.time = n),
          this._mixer.dispatchEvent({ type: 'finished', action: this, direction: e < 0 ? -1 : 1 });
      }
    } else {
      if (
        (-1 === i &&
          (e >= 0
            ? ((i = 0), this._setEndings(!0, 0 === this.repetitions, a))
            : this._setEndings(0 === this.repetitions, !0, a)),
        n >= t || n < 0)
      ) {
        const r = Math.floor(n / t);
        (n -= t * r), (i += Math.abs(r));
        const s = this.repetitions - i;
        if (s <= 0)
          this.clampWhenFinished ? (this.paused = !0) : (this.enabled = !1),
            (n = e > 0 ? t : 0),
            (this.time = n),
            this._mixer.dispatchEvent({
              type: 'finished',
              action: this,
              direction: e > 0 ? 1 : -1,
            });
        else {
          if (1 === s) {
            const t = e < 0;
            this._setEndings(t, !t, a);
          } else this._setEndings(!1, !1, a);
          (this._loopCount = i),
            (this.time = n),
            this._mixer.dispatchEvent({ type: 'loop', action: this, loopDelta: r });
        }
      } else this.time = n;
      if (a && 1 == (1 & i)) return t - n;
    }
    return n;
  }
  _setEndings(e, t, r) {
    const n = this._interpolantSettings;
    r
      ? ((n.endingStart = 2401), (n.endingEnd = 2401))
      : ((n.endingStart = e ? (this.zeroSlopeAtStart ? 2401 : 2400) : 2402),
        (n.endingEnd = t ? (this.zeroSlopeAtEnd ? 2401 : 2400) : 2402));
  }
  _scheduleFading(e, t, r) {
    const n = this._mixer,
      i = n.time;
    let a = this._weightInterpolant;
    null === a && ((a = n._lendControlInterpolant()), (this._weightInterpolant = a));
    const s = a.parameterPositions,
      o = a.sampleValues;
    return (s[0] = i), (o[0] = t), (s[1] = i + e), (o[1] = r), this;
  }
}
const _controlInterpolantsResultBuffer = new Float32Array(1);
class AnimationMixer extends EventDispatcher {
  constructor(e) {
    super(),
      (this._root = e),
      this._initMemoryManager(),
      (this._accuIndex = 0),
      (this.time = 0),
      (this.timeScale = 1);
  }
  _bindAction(e, t) {
    const r = e._localRoot || this._root,
      n = e._clip.tracks,
      i = n.length,
      a = e._propertyBindings,
      s = e._interpolants,
      o = r.uuid,
      l = this._bindingsByRootAndName;
    let c = l[o];
    void 0 === c && ((c = {}), (l[o] = c));
    for (let e = 0; e !== i; ++e) {
      const i = n[e],
        l = i.name;
      let h = c[l];
      if (void 0 !== h) ++h.referenceCount, (a[e] = h);
      else {
        if (((h = a[e]), void 0 !== h)) {
          null === h._cacheIndex && (++h.referenceCount, this._addInactiveBinding(h, o, l));
          continue;
        }
        const n = t && t._propertyBindings[e].binding.parsedPath;
        (h = new PropertyMixer(PropertyBinding.create(r, l, n), i.ValueTypeName, i.getValueSize())),
          ++h.referenceCount,
          this._addInactiveBinding(h, o, l),
          (a[e] = h);
      }
      s[e].resultBuffer = h.buffer;
    }
  }
  _activateAction(e) {
    if (!this._isActiveAction(e)) {
      if (null === e._cacheIndex) {
        const t = (e._localRoot || this._root).uuid,
          r = e._clip.uuid,
          n = this._actionsByClip[r];
        this._bindAction(e, n && n.knownActions[0]), this._addInactiveAction(e, r, t);
      }
      const t = e._propertyBindings;
      for (let e = 0, r = t.length; e !== r; ++e) {
        const r = t[e];
        0 == r.useCount++ && (this._lendBinding(r), r.saveOriginalState());
      }
      this._lendAction(e);
    }
  }
  _deactivateAction(e) {
    if (this._isActiveAction(e)) {
      const t = e._propertyBindings;
      for (let e = 0, r = t.length; e !== r; ++e) {
        const r = t[e];
        0 == --r.useCount && (r.restoreOriginalState(), this._takeBackBinding(r));
      }
      this._takeBackAction(e);
    }
  }
  _initMemoryManager() {
    (this._actions = []),
      (this._nActiveActions = 0),
      (this._actionsByClip = {}),
      (this._bindings = []),
      (this._nActiveBindings = 0),
      (this._bindingsByRootAndName = {}),
      (this._controlInterpolants = []),
      (this._nActiveControlInterpolants = 0);
    const e = this;
    this.stats = {
      actions: {
        get total() {
          return e._actions.length;
        },
        get inUse() {
          return e._nActiveActions;
        },
      },
      bindings: {
        get total() {
          return e._bindings.length;
        },
        get inUse() {
          return e._nActiveBindings;
        },
      },
      controlInterpolants: {
        get total() {
          return e._controlInterpolants.length;
        },
        get inUse() {
          return e._nActiveControlInterpolants;
        },
      },
    };
  }
  _isActiveAction(e) {
    const t = e._cacheIndex;
    return null !== t && t < this._nActiveActions;
  }
  _addInactiveAction(e, t, r) {
    const n = this._actions,
      i = this._actionsByClip;
    let a = i[t];
    if (void 0 === a)
      (a = { knownActions: [e], actionByRoot: {} }), (e._byClipCacheIndex = 0), (i[t] = a);
    else {
      const t = a.knownActions;
      (e._byClipCacheIndex = t.length), t.push(e);
    }
    (e._cacheIndex = n.length), n.push(e), (a.actionByRoot[r] = e);
  }
  _removeInactiveAction(e) {
    const t = this._actions,
      r = t[t.length - 1],
      n = e._cacheIndex;
    (r._cacheIndex = n), (t[n] = r), t.pop(), (e._cacheIndex = null);
    const i = e._clip.uuid,
      a = this._actionsByClip,
      s = a[i],
      o = s.knownActions,
      l = o[o.length - 1],
      c = e._byClipCacheIndex;
    (l._byClipCacheIndex = c), (o[c] = l), o.pop(), (e._byClipCacheIndex = null);
    delete s.actionByRoot[(e._localRoot || this._root).uuid],
      0 === o.length && delete a[i],
      this._removeInactiveBindingsForAction(e);
  }
  _removeInactiveBindingsForAction(e) {
    const t = e._propertyBindings;
    for (let e = 0, r = t.length; e !== r; ++e) {
      const r = t[e];
      0 == --r.referenceCount && this._removeInactiveBinding(r);
    }
  }
  _lendAction(e) {
    const t = this._actions,
      r = e._cacheIndex,
      n = this._nActiveActions++,
      i = t[n];
    (e._cacheIndex = n), (t[n] = e), (i._cacheIndex = r), (t[r] = i);
  }
  _takeBackAction(e) {
    const t = this._actions,
      r = e._cacheIndex,
      n = --this._nActiveActions,
      i = t[n];
    (e._cacheIndex = n), (t[n] = e), (i._cacheIndex = r), (t[r] = i);
  }
  _addInactiveBinding(e, t, r) {
    const n = this._bindingsByRootAndName,
      i = this._bindings;
    let a = n[t];
    void 0 === a && ((a = {}), (n[t] = a)), (a[r] = e), (e._cacheIndex = i.length), i.push(e);
  }
  _removeInactiveBinding(e) {
    const t = this._bindings,
      r = e.binding,
      n = r.rootNode.uuid,
      i = r.path,
      a = this._bindingsByRootAndName,
      s = a[n],
      o = t[t.length - 1],
      l = e._cacheIndex;
    (o._cacheIndex = l),
      (t[l] = o),
      t.pop(),
      delete s[i],
      0 === Object.keys(s).length && delete a[n];
  }
  _lendBinding(e) {
    const t = this._bindings,
      r = e._cacheIndex,
      n = this._nActiveBindings++,
      i = t[n];
    (e._cacheIndex = n), (t[n] = e), (i._cacheIndex = r), (t[r] = i);
  }
  _takeBackBinding(e) {
    const t = this._bindings,
      r = e._cacheIndex,
      n = --this._nActiveBindings,
      i = t[n];
    (e._cacheIndex = n), (t[n] = e), (i._cacheIndex = r), (t[r] = i);
  }
  _lendControlInterpolant() {
    const e = this._controlInterpolants,
      t = this._nActiveControlInterpolants++;
    let r = e[t];
    return (
      void 0 === r &&
        ((r = new LinearInterpolant(
          new Float32Array(2),
          new Float32Array(2),
          1,
          _controlInterpolantsResultBuffer,
        )),
        (r.__cacheIndex = t),
        (e[t] = r)),
      r
    );
  }
  _takeBackControlInterpolant(e) {
    const t = this._controlInterpolants,
      r = e.__cacheIndex,
      n = --this._nActiveControlInterpolants,
      i = t[n];
    (e.__cacheIndex = n), (t[n] = e), (i.__cacheIndex = r), (t[r] = i);
  }
  clipAction(e, t, r) {
    const n = t || this._root,
      i = n.uuid;
    let a = 'string' == typeof e ? AnimationClip.findByName(n, e) : e;
    const s = null !== a ? a.uuid : e,
      o = this._actionsByClip[s];
    let l = null;
    if ((void 0 === r && (r = null !== a ? a.blendMode : 2500), void 0 !== o)) {
      const e = o.actionByRoot[i];
      if (void 0 !== e && e.blendMode === r) return e;
      (l = o.knownActions[0]), null === a && (a = l._clip);
    }
    if (null === a) return null;
    const c = new AnimationAction(this, a, t, r);
    return this._bindAction(c, l), this._addInactiveAction(c, s, i), c;
  }
  existingAction(e, t) {
    const r = t || this._root,
      n = r.uuid,
      i = 'string' == typeof e ? AnimationClip.findByName(r, e) : e,
      a = i ? i.uuid : e,
      s = this._actionsByClip[a];
    return (void 0 !== s && s.actionByRoot[n]) || null;
  }
  stopAllAction() {
    const e = this._actions;
    for (let t = this._nActiveActions - 1; t >= 0; --t) e[t].stop();
    return this;
  }
  update(e) {
    e *= this.timeScale;
    const t = this._actions,
      r = this._nActiveActions,
      n = (this.time += e),
      i = Math.sign(e),
      a = (this._accuIndex ^= 1);
    for (let s = 0; s !== r; ++s) {
      t[s]._update(n, e, i, a);
    }
    const s = this._bindings,
      o = this._nActiveBindings;
    for (let e = 0; e !== o; ++e) s[e].apply(a);
    return this;
  }
  setTime(e) {
    this.time = 0;
    for (let e = 0; e < this._actions.length; e++) this._actions[e].time = 0;
    return this.update(e);
  }
  getRoot() {
    return this._root;
  }
  uncacheClip(e) {
    const t = this._actions,
      r = e.uuid,
      n = this._actionsByClip,
      i = n[r];
    if (void 0 !== i) {
      const e = i.knownActions;
      for (let r = 0, n = e.length; r !== n; ++r) {
        const n = e[r];
        this._deactivateAction(n);
        const i = n._cacheIndex,
          a = t[t.length - 1];
        (n._cacheIndex = null),
          (n._byClipCacheIndex = null),
          (a._cacheIndex = i),
          (t[i] = a),
          t.pop(),
          this._removeInactiveBindingsForAction(n);
      }
      delete n[r];
    }
  }
  uncacheRoot(e) {
    const t = e.uuid,
      r = this._actionsByClip;
    for (const e in r) {
      const n = r[e].actionByRoot[t];
      void 0 !== n && (this._deactivateAction(n), this._removeInactiveAction(n));
    }
    const n = this._bindingsByRootAndName[t];
    if (void 0 !== n)
      for (const e in n) {
        const t = n[e];
        t.restoreOriginalState(), this._removeInactiveBinding(t);
      }
  }
  uncacheAction(e, t) {
    const r = this.existingAction(e, t);
    null !== r && (this._deactivateAction(r), this._removeInactiveAction(r));
  }
}
class Uniform {
  constructor(e) {
    this.value = e;
  }
  clone() {
    return new Uniform(void 0 === this.value.clone ? this.value : this.value.clone());
  }
}
let id = 0;
class UniformsGroup extends EventDispatcher {
  constructor() {
    super(),
      (this.isUniformsGroup = !0),
      Object.defineProperty(this, 'id', { value: id++ }),
      (this.name = ''),
      (this.usage = 35044),
      (this.uniforms = []);
  }
  add(e) {
    return this.uniforms.push(e), this;
  }
  remove(e) {
    const t = this.uniforms.indexOf(e);
    return -1 !== t && this.uniforms.splice(t, 1), this;
  }
  setName(e) {
    return (this.name = e), this;
  }
  setUsage(e) {
    return (this.usage = e), this;
  }
  dispose() {
    return this.dispatchEvent({ type: 'dispose' }), this;
  }
  copy(e) {
    (this.name = e.name), (this.usage = e.usage);
    const t = e.uniforms;
    this.uniforms.length = 0;
    for (let e = 0, r = t.length; e < r; e++) this.uniforms.push(t[e].clone());
    return this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class InstancedInterleavedBuffer extends InterleavedBuffer {
  constructor(e, t, r = 1) {
    super(e, t), (this.isInstancedInterleavedBuffer = !0), (this.meshPerAttribute = r);
  }
  copy(e) {
    return super.copy(e), (this.meshPerAttribute = e.meshPerAttribute), this;
  }
  clone(e) {
    const t = super.clone(e);
    return (t.meshPerAttribute = this.meshPerAttribute), t;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return (t.isInstancedInterleavedBuffer = !0), (t.meshPerAttribute = this.meshPerAttribute), t;
  }
}
class GLBufferAttribute {
  constructor(e, t, r, n, i) {
    (this.isGLBufferAttribute = !0),
      (this.name = ''),
      (this.buffer = e),
      (this.type = t),
      (this.itemSize = r),
      (this.elementSize = n),
      (this.count = i),
      (this.version = 0);
  }
  set needsUpdate(e) {
    !0 === e && this.version++;
  }
  setBuffer(e) {
    return (this.buffer = e), this;
  }
  setType(e, t) {
    return (this.type = e), (this.elementSize = t), this;
  }
  setItemSize(e) {
    return (this.itemSize = e), this;
  }
  setCount(e) {
    return (this.count = e), this;
  }
}
class Raycaster {
  constructor(e, t, r = 0, n = 1 / 0) {
    (this.ray = new Ray(e, t)),
      (this.near = r),
      (this.far = n),
      (this.camera = null),
      (this.layers = new Layers()),
      (this.params = {
        Mesh: {},
        Line: { threshold: 1 },
        LOD: {},
        Points: { threshold: 1 },
        Sprite: {},
      });
  }
  set(e, t) {
    this.ray.set(e, t);
  }
  setFromCamera(e, t) {
    t.isPerspectiveCamera
      ? (this.ray.origin.setFromMatrixPosition(t.matrixWorld),
        this.ray.direction.set(e.x, e.y, 0.5).unproject(t).sub(this.ray.origin).normalize(),
        (this.camera = t))
      : t.isOrthographicCamera
        ? (this.ray.origin.set(e.x, e.y, (t.near + t.far) / (t.near - t.far)).unproject(t),
          this.ray.direction.set(0, 0, -1).transformDirection(t.matrixWorld),
          (this.camera = t))
        : console.error('THREE.Raycaster: Unsupported camera type: ' + t.type);
  }
  intersectObject(e, t = !0, r = []) {
    return intersectObject(e, this, r, t), r.sort(ascSort), r;
  }
  intersectObjects(e, t = !0, r = []) {
    for (let n = 0, i = e.length; n < i; n++) intersectObject(e[n], this, r, t);
    return r.sort(ascSort), r;
  }
}
function ascSort(e, t) {
  return e.distance - t.distance;
}
function intersectObject(e, t, r, n) {
  if ((e.layers.test(t.layers) && e.raycast(t, r), !0 === n)) {
    const n = e.children;
    for (let e = 0, i = n.length; e < i; e++) intersectObject(n[e], t, r, !0);
  }
}
class Spherical {
  constructor(e = 1, t = 0, r = 0) {
    return (this.radius = e), (this.phi = t), (this.theta = r), this;
  }
  set(e, t, r) {
    return (this.radius = e), (this.phi = t), (this.theta = r), this;
  }
  copy(e) {
    return (this.radius = e.radius), (this.phi = e.phi), (this.theta = e.theta), this;
  }
  makeSafe() {
    const e = 1e-6;
    return (this.phi = Math.max(e, Math.min(Math.PI - e, this.phi))), this;
  }
  setFromVector3(e) {
    return this.setFromCartesianCoords(e.x, e.y, e.z);
  }
  setFromCartesianCoords(e, t, r) {
    return (
      (this.radius = Math.sqrt(e * e + t * t + r * r)),
      0 === this.radius
        ? ((this.theta = 0), (this.phi = 0))
        : ((this.theta = Math.atan2(e, r)), (this.phi = Math.acos(clamp(t / this.radius, -1, 1)))),
      this
    );
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Cylindrical {
  constructor(e = 1, t = 0, r = 0) {
    return (this.radius = e), (this.theta = t), (this.y = r), this;
  }
  set(e, t, r) {
    return (this.radius = e), (this.theta = t), (this.y = r), this;
  }
  copy(e) {
    return (this.radius = e.radius), (this.theta = e.theta), (this.y = e.y), this;
  }
  setFromVector3(e) {
    return this.setFromCartesianCoords(e.x, e.y, e.z);
  }
  setFromCartesianCoords(e, t, r) {
    return (
      (this.radius = Math.sqrt(e * e + r * r)), (this.theta = Math.atan2(e, r)), (this.y = t), this
    );
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const _vector$4 = new Vector2();
class Box2 {
  constructor(e = new Vector2(1 / 0, 1 / 0), t = new Vector2(-1 / 0, -1 / 0)) {
    (this.isBox2 = !0), (this.min = e), (this.max = t);
  }
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, r = e.length; t < r; t++) this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    const r = _vector$4.copy(t).multiplyScalar(0.5);
    return this.min.copy(e).sub(r), this.max.copy(e).add(r), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  makeEmpty() {
    return (this.min.x = this.min.y = 1 / 0), (this.max.x = this.max.y = -1 / 0), this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y;
  }
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0) : e.subVectors(this.max, this.min);
  }
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  containsPoint(e) {
    return !(e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y);
  }
  containsBox(e) {
    return (
      this.min.x <= e.min.x &&
      e.max.x <= this.max.x &&
      this.min.y <= e.min.y &&
      e.max.y <= this.max.y
    );
  }
  getParameter(e, t) {
    return t.set(
      (e.x - this.min.x) / (this.max.x - this.min.x),
      (e.y - this.min.y) / (this.max.y - this.min.y),
    );
  }
  intersectsBox(e) {
    return !(
      e.max.x < this.min.x ||
      e.min.x > this.max.x ||
      e.max.y < this.min.y ||
      e.min.y > this.max.y
    );
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, _vector$4).distanceTo(e);
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
}
const _startP = new Vector3(),
  _startEnd = new Vector3();
class Line3 {
  constructor(e = new Vector3(), t = new Vector3()) {
    (this.start = e), (this.end = t);
  }
  set(e, t) {
    return this.start.copy(e), this.end.copy(t), this;
  }
  copy(e) {
    return this.start.copy(e.start), this.end.copy(e.end), this;
  }
  getCenter(e) {
    return e.addVectors(this.start, this.end).multiplyScalar(0.5);
  }
  delta(e) {
    return e.subVectors(this.end, this.start);
  }
  distanceSq() {
    return this.start.distanceToSquared(this.end);
  }
  distance() {
    return this.start.distanceTo(this.end);
  }
  at(e, t) {
    return this.delta(t).multiplyScalar(e).add(this.start);
  }
  closestPointToPointParameter(e, t) {
    _startP.subVectors(e, this.start), _startEnd.subVectors(this.end, this.start);
    const r = _startEnd.dot(_startEnd);
    let n = _startEnd.dot(_startP) / r;
    return t && (n = clamp(n, 0, 1)), n;
  }
  closestPointToPoint(e, t, r) {
    const n = this.closestPointToPointParameter(e, t);
    return this.delta(r).multiplyScalar(n).add(this.start);
  }
  applyMatrix4(e) {
    return this.start.applyMatrix4(e), this.end.applyMatrix4(e), this;
  }
  equals(e) {
    return e.start.equals(this.start) && e.end.equals(this.end);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const _vector$3 = new Vector3();
class SpotLightHelper extends Object3D {
  constructor(e, t) {
    super(),
      (this.light = e),
      (this.matrix = e.matrixWorld),
      (this.matrixAutoUpdate = !1),
      (this.color = t),
      (this.type = 'SpotLightHelper');
    const r = new BufferGeometry(),
      n = [
        0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, -1, 1,
      ];
    for (let e = 0, t = 1, r = 32; e < r; e++, t++) {
      const i = (e / r) * Math.PI * 2,
        a = (t / r) * Math.PI * 2;
      n.push(Math.cos(i), Math.sin(i), 1, Math.cos(a), Math.sin(a), 1);
    }
    r.setAttribute('position', new Float32BufferAttribute(n, 3));
    const i = new LineBasicMaterial({ fog: !1, toneMapped: !1 });
    (this.cone = new LineSegments(r, i)), this.add(this.cone), this.update();
  }
  dispose() {
    this.cone.geometry.dispose(), this.cone.material.dispose();
  }
  update() {
    this.light.updateWorldMatrix(!0, !1), this.light.target.updateWorldMatrix(!0, !1);
    const e = this.light.distance ? this.light.distance : 1e3,
      t = e * Math.tan(this.light.angle);
    this.cone.scale.set(t, t, e),
      _vector$3.setFromMatrixPosition(this.light.target.matrixWorld),
      this.cone.lookAt(_vector$3),
      void 0 !== this.color
        ? this.cone.material.color.set(this.color)
        : this.cone.material.color.copy(this.light.color);
  }
}
const _vector$2 = new Vector3(),
  _boneMatrix = new Matrix4(),
  _matrixWorldInv = new Matrix4();
class SkeletonHelper extends LineSegments {
  constructor(e) {
    const t = getBoneList(e),
      r = new BufferGeometry(),
      n = [],
      i = [],
      a = new Color(0, 0, 1),
      s = new Color(0, 1, 0);
    for (let e = 0; e < t.length; e++) {
      const r = t[e];
      r.parent &&
        r.parent.isBone &&
        (n.push(0, 0, 0), n.push(0, 0, 0), i.push(a.r, a.g, a.b), i.push(s.r, s.g, s.b));
    }
    r.setAttribute('position', new Float32BufferAttribute(n, 3)),
      r.setAttribute('color', new Float32BufferAttribute(i, 3));
    super(
      r,
      new LineBasicMaterial({
        vertexColors: !0,
        depthTest: !1,
        depthWrite: !1,
        toneMapped: !1,
        transparent: !0,
      }),
    ),
      (this.isSkeletonHelper = !0),
      (this.type = 'SkeletonHelper'),
      (this.root = e),
      (this.bones = t),
      (this.matrix = e.matrixWorld),
      (this.matrixAutoUpdate = !1);
  }
  updateMatrixWorld(e) {
    const t = this.bones,
      r = this.geometry,
      n = r.getAttribute('position');
    _matrixWorldInv.copy(this.root.matrixWorld).invert();
    for (let e = 0, r = 0; e < t.length; e++) {
      const i = t[e];
      i.parent &&
        i.parent.isBone &&
        (_boneMatrix.multiplyMatrices(_matrixWorldInv, i.matrixWorld),
        _vector$2.setFromMatrixPosition(_boneMatrix),
        n.setXYZ(r, _vector$2.x, _vector$2.y, _vector$2.z),
        _boneMatrix.multiplyMatrices(_matrixWorldInv, i.parent.matrixWorld),
        _vector$2.setFromMatrixPosition(_boneMatrix),
        n.setXYZ(r + 1, _vector$2.x, _vector$2.y, _vector$2.z),
        (r += 2));
    }
    (r.getAttribute('position').needsUpdate = !0), super.updateMatrixWorld(e);
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
function getBoneList(e) {
  const t = [];
  !0 === e.isBone && t.push(e);
  for (let r = 0; r < e.children.length; r++) t.push.apply(t, getBoneList(e.children[r]));
  return t;
}
class PointLightHelper extends Mesh {
  constructor(e, t, r) {
    super(
      new SphereGeometry(t, 4, 2),
      new MeshBasicMaterial({ wireframe: !0, fog: !1, toneMapped: !1 }),
    ),
      (this.light = e),
      (this.color = r),
      (this.type = 'PointLightHelper'),
      (this.matrix = this.light.matrixWorld),
      (this.matrixAutoUpdate = !1),
      this.update();
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
  update() {
    this.light.updateWorldMatrix(!0, !1),
      void 0 !== this.color
        ? this.material.color.set(this.color)
        : this.material.color.copy(this.light.color);
  }
}
const _vector$1 = new Vector3(),
  _color1 = new Color(),
  _color2 = new Color();
class HemisphereLightHelper extends Object3D {
  constructor(e, t, r) {
    super(),
      (this.light = e),
      (this.matrix = e.matrixWorld),
      (this.matrixAutoUpdate = !1),
      (this.color = r),
      (this.type = 'HemisphereLightHelper');
    const n = new OctahedronGeometry(t);
    n.rotateY(0.5 * Math.PI),
      (this.material = new MeshBasicMaterial({ wireframe: !0, fog: !1, toneMapped: !1 })),
      void 0 === this.color && (this.material.vertexColors = !0);
    const i = n.getAttribute('position'),
      a = new Float32Array(3 * i.count);
    n.setAttribute('color', new BufferAttribute(a, 3)),
      this.add(new Mesh(n, this.material)),
      this.update();
  }
  dispose() {
    this.children[0].geometry.dispose(), this.children[0].material.dispose();
  }
  update() {
    const e = this.children[0];
    if (void 0 !== this.color) this.material.color.set(this.color);
    else {
      const t = e.geometry.getAttribute('color');
      _color1.copy(this.light.color), _color2.copy(this.light.groundColor);
      for (let e = 0, r = t.count; e < r; e++) {
        const n = e < r / 2 ? _color1 : _color2;
        t.setXYZ(e, n.r, n.g, n.b);
      }
      t.needsUpdate = !0;
    }
    this.light.updateWorldMatrix(!0, !1),
      e.lookAt(_vector$1.setFromMatrixPosition(this.light.matrixWorld).negate());
  }
}
class GridHelper extends LineSegments {
  constructor(e = 10, t = 10, r = 4473924, n = 8947848) {
    (r = new Color(r)), (n = new Color(n));
    const i = t / 2,
      a = e / t,
      s = e / 2,
      o = [],
      l = [];
    for (let e = 0, c = 0, h = -s; e <= t; e++, h += a) {
      o.push(-s, 0, h, s, 0, h), o.push(h, 0, -s, h, 0, s);
      const t = e === i ? r : n;
      t.toArray(l, c),
        (c += 3),
        t.toArray(l, c),
        (c += 3),
        t.toArray(l, c),
        (c += 3),
        t.toArray(l, c),
        (c += 3);
    }
    const c = new BufferGeometry();
    c.setAttribute('position', new Float32BufferAttribute(o, 3)),
      c.setAttribute('color', new Float32BufferAttribute(l, 3));
    super(c, new LineBasicMaterial({ vertexColors: !0, toneMapped: !1 })),
      (this.type = 'GridHelper');
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
class PolarGridHelper extends LineSegments {
  constructor(e = 10, t = 16, r = 8, n = 64, i = 4473924, a = 8947848) {
    (i = new Color(i)), (a = new Color(a));
    const s = [],
      o = [];
    if (t > 1)
      for (let r = 0; r < t; r++) {
        const n = (r / t) * (2 * Math.PI),
          l = Math.sin(n) * e,
          c = Math.cos(n) * e;
        s.push(0, 0, 0), s.push(l, 0, c);
        const h = 1 & r ? i : a;
        o.push(h.r, h.g, h.b), o.push(h.r, h.g, h.b);
      }
    for (let t = 0; t < r; t++) {
      const l = 1 & t ? i : a,
        c = e - (e / r) * t;
      for (let e = 0; e < n; e++) {
        let t = (e / n) * (2 * Math.PI),
          r = Math.sin(t) * c,
          i = Math.cos(t) * c;
        s.push(r, 0, i),
          o.push(l.r, l.g, l.b),
          (t = ((e + 1) / n) * (2 * Math.PI)),
          (r = Math.sin(t) * c),
          (i = Math.cos(t) * c),
          s.push(r, 0, i),
          o.push(l.r, l.g, l.b);
      }
    }
    const l = new BufferGeometry();
    l.setAttribute('position', new Float32BufferAttribute(s, 3)),
      l.setAttribute('color', new Float32BufferAttribute(o, 3));
    super(l, new LineBasicMaterial({ vertexColors: !0, toneMapped: !1 })),
      (this.type = 'PolarGridHelper');
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
const _v1 = new Vector3(),
  _v2 = new Vector3(),
  _v3 = new Vector3();
class DirectionalLightHelper extends Object3D {
  constructor(e, t, r) {
    super(),
      (this.light = e),
      (this.matrix = e.matrixWorld),
      (this.matrixAutoUpdate = !1),
      (this.color = r),
      (this.type = 'DirectionalLightHelper'),
      void 0 === t && (t = 1);
    let n = new BufferGeometry();
    n.setAttribute(
      'position',
      new Float32BufferAttribute([-t, t, 0, t, t, 0, t, -t, 0, -t, -t, 0, -t, t, 0], 3),
    );
    const i = new LineBasicMaterial({ fog: !1, toneMapped: !1 });
    (this.lightPlane = new Line(n, i)),
      this.add(this.lightPlane),
      (n = new BufferGeometry()),
      n.setAttribute('position', new Float32BufferAttribute([0, 0, 0, 0, 0, 1], 3)),
      (this.targetLine = new Line(n, i)),
      this.add(this.targetLine),
      this.update();
  }
  dispose() {
    this.lightPlane.geometry.dispose(),
      this.lightPlane.material.dispose(),
      this.targetLine.geometry.dispose(),
      this.targetLine.material.dispose();
  }
  update() {
    this.light.updateWorldMatrix(!0, !1),
      this.light.target.updateWorldMatrix(!0, !1),
      _v1.setFromMatrixPosition(this.light.matrixWorld),
      _v2.setFromMatrixPosition(this.light.target.matrixWorld),
      _v3.subVectors(_v2, _v1),
      this.lightPlane.lookAt(_v2),
      void 0 !== this.color
        ? (this.lightPlane.material.color.set(this.color),
          this.targetLine.material.color.set(this.color))
        : (this.lightPlane.material.color.copy(this.light.color),
          this.targetLine.material.color.copy(this.light.color)),
      this.targetLine.lookAt(_v2),
      (this.targetLine.scale.z = _v3.length());
  }
}
const _vector = new Vector3(),
  _camera = new Camera();
class CameraHelper extends LineSegments {
  constructor(e) {
    const t = new BufferGeometry(),
      r = new LineBasicMaterial({ color: 16777215, vertexColors: !0, toneMapped: !1 }),
      n = [],
      i = [],
      a = {};
    function s(e, t) {
      o(e), o(t);
    }
    function o(e) {
      n.push(0, 0, 0), i.push(0, 0, 0), void 0 === a[e] && (a[e] = []), a[e].push(n.length / 3 - 1);
    }
    s('n1', 'n2'),
      s('n2', 'n4'),
      s('n4', 'n3'),
      s('n3', 'n1'),
      s('f1', 'f2'),
      s('f2', 'f4'),
      s('f4', 'f3'),
      s('f3', 'f1'),
      s('n1', 'f1'),
      s('n2', 'f2'),
      s('n3', 'f3'),
      s('n4', 'f4'),
      s('p', 'n1'),
      s('p', 'n2'),
      s('p', 'n3'),
      s('p', 'n4'),
      s('u1', 'u2'),
      s('u2', 'u3'),
      s('u3', 'u1'),
      s('c', 't'),
      s('p', 'c'),
      s('cn1', 'cn2'),
      s('cn3', 'cn4'),
      s('cf1', 'cf2'),
      s('cf3', 'cf4'),
      t.setAttribute('position', new Float32BufferAttribute(n, 3)),
      t.setAttribute('color', new Float32BufferAttribute(i, 3)),
      super(t, r),
      (this.type = 'CameraHelper'),
      (this.camera = e),
      this.camera.updateProjectionMatrix && this.camera.updateProjectionMatrix(),
      (this.matrix = e.matrixWorld),
      (this.matrixAutoUpdate = !1),
      (this.pointMap = a),
      this.update();
    const l = new Color(16755200),
      c = new Color(16711680),
      h = new Color(43775),
      u = new Color(16777215),
      d = new Color(3355443);
    this.setColors(l, c, h, u, d);
  }
  setColors(e, t, r, n, i) {
    const a = this.geometry.getAttribute('color');
    a.setXYZ(0, e.r, e.g, e.b),
      a.setXYZ(1, e.r, e.g, e.b),
      a.setXYZ(2, e.r, e.g, e.b),
      a.setXYZ(3, e.r, e.g, e.b),
      a.setXYZ(4, e.r, e.g, e.b),
      a.setXYZ(5, e.r, e.g, e.b),
      a.setXYZ(6, e.r, e.g, e.b),
      a.setXYZ(7, e.r, e.g, e.b),
      a.setXYZ(8, e.r, e.g, e.b),
      a.setXYZ(9, e.r, e.g, e.b),
      a.setXYZ(10, e.r, e.g, e.b),
      a.setXYZ(11, e.r, e.g, e.b),
      a.setXYZ(12, e.r, e.g, e.b),
      a.setXYZ(13, e.r, e.g, e.b),
      a.setXYZ(14, e.r, e.g, e.b),
      a.setXYZ(15, e.r, e.g, e.b),
      a.setXYZ(16, e.r, e.g, e.b),
      a.setXYZ(17, e.r, e.g, e.b),
      a.setXYZ(18, e.r, e.g, e.b),
      a.setXYZ(19, e.r, e.g, e.b),
      a.setXYZ(20, e.r, e.g, e.b),
      a.setXYZ(21, e.r, e.g, e.b),
      a.setXYZ(22, e.r, e.g, e.b),
      a.setXYZ(23, e.r, e.g, e.b),
      a.setXYZ(24, t.r, t.g, t.b),
      a.setXYZ(25, t.r, t.g, t.b),
      a.setXYZ(26, t.r, t.g, t.b),
      a.setXYZ(27, t.r, t.g, t.b),
      a.setXYZ(28, t.r, t.g, t.b),
      a.setXYZ(29, t.r, t.g, t.b),
      a.setXYZ(30, t.r, t.g, t.b),
      a.setXYZ(31, t.r, t.g, t.b),
      a.setXYZ(32, r.r, r.g, r.b),
      a.setXYZ(33, r.r, r.g, r.b),
      a.setXYZ(34, r.r, r.g, r.b),
      a.setXYZ(35, r.r, r.g, r.b),
      a.setXYZ(36, r.r, r.g, r.b),
      a.setXYZ(37, r.r, r.g, r.b),
      a.setXYZ(38, n.r, n.g, n.b),
      a.setXYZ(39, n.r, n.g, n.b),
      a.setXYZ(40, i.r, i.g, i.b),
      a.setXYZ(41, i.r, i.g, i.b),
      a.setXYZ(42, i.r, i.g, i.b),
      a.setXYZ(43, i.r, i.g, i.b),
      a.setXYZ(44, i.r, i.g, i.b),
      a.setXYZ(45, i.r, i.g, i.b),
      a.setXYZ(46, i.r, i.g, i.b),
      a.setXYZ(47, i.r, i.g, i.b),
      a.setXYZ(48, i.r, i.g, i.b),
      a.setXYZ(49, i.r, i.g, i.b),
      (a.needsUpdate = !0);
  }
  update() {
    const e = this.geometry,
      t = this.pointMap;
    _camera.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),
      setPoint('c', t, e, _camera, 0, 0, -1),
      setPoint('t', t, e, _camera, 0, 0, 1),
      setPoint('n1', t, e, _camera, -1, -1, -1),
      setPoint('n2', t, e, _camera, 1, -1, -1),
      setPoint('n3', t, e, _camera, -1, 1, -1),
      setPoint('n4', t, e, _camera, 1, 1, -1),
      setPoint('f1', t, e, _camera, -1, -1, 1),
      setPoint('f2', t, e, _camera, 1, -1, 1),
      setPoint('f3', t, e, _camera, -1, 1, 1),
      setPoint('f4', t, e, _camera, 1, 1, 1),
      setPoint('u1', t, e, _camera, 0.7, 1.1, -1),
      setPoint('u2', t, e, _camera, -0.7, 1.1, -1),
      setPoint('u3', t, e, _camera, 0, 2, -1),
      setPoint('cf1', t, e, _camera, -1, 0, 1),
      setPoint('cf2', t, e, _camera, 1, 0, 1),
      setPoint('cf3', t, e, _camera, 0, -1, 1),
      setPoint('cf4', t, e, _camera, 0, 1, 1),
      setPoint('cn1', t, e, _camera, -1, 0, -1),
      setPoint('cn2', t, e, _camera, 1, 0, -1),
      setPoint('cn3', t, e, _camera, 0, -1, -1),
      setPoint('cn4', t, e, _camera, 0, 1, -1),
      (e.getAttribute('position').needsUpdate = !0);
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
function setPoint(e, t, r, n, i, a, s) {
  _vector.set(i, a, s).unproject(n);
  const o = t[e];
  if (void 0 !== o) {
    const e = r.getAttribute('position');
    for (let t = 0, r = o.length; t < r; t++) e.setXYZ(o[t], _vector.x, _vector.y, _vector.z);
  }
}
const _box = new Box3();
class BoxHelper extends LineSegments {
  constructor(e, t = 16776960) {
    const r = new Uint16Array([
        0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7,
      ]),
      n = new Float32Array(24),
      i = new BufferGeometry();
    i.setIndex(new BufferAttribute(r, 1)),
      i.setAttribute('position', new BufferAttribute(n, 3)),
      super(i, new LineBasicMaterial({ color: t, toneMapped: !1 })),
      (this.object = e),
      (this.type = 'BoxHelper'),
      (this.matrixAutoUpdate = !1),
      this.update();
  }
  update(e) {
    if (
      (void 0 !== e && console.warn('THREE.BoxHelper: .update() has no longer arguments.'),
      void 0 !== this.object && _box.setFromObject(this.object),
      _box.isEmpty())
    )
      return;
    const t = _box.min,
      r = _box.max,
      n = this.geometry.attributes.position,
      i = n.array;
    (i[0] = r.x),
      (i[1] = r.y),
      (i[2] = r.z),
      (i[3] = t.x),
      (i[4] = r.y),
      (i[5] = r.z),
      (i[6] = t.x),
      (i[7] = t.y),
      (i[8] = r.z),
      (i[9] = r.x),
      (i[10] = t.y),
      (i[11] = r.z),
      (i[12] = r.x),
      (i[13] = r.y),
      (i[14] = t.z),
      (i[15] = t.x),
      (i[16] = r.y),
      (i[17] = t.z),
      (i[18] = t.x),
      (i[19] = t.y),
      (i[20] = t.z),
      (i[21] = r.x),
      (i[22] = t.y),
      (i[23] = t.z),
      (n.needsUpdate = !0),
      this.geometry.computeBoundingSphere();
  }
  setFromObject(e) {
    return (this.object = e), this.update(), this;
  }
  copy(e, t) {
    return super.copy(e, t), (this.object = e.object), this;
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
class Box3Helper extends LineSegments {
  constructor(e, t = 16776960) {
    const r = new Uint16Array([
        0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7,
      ]),
      n = new BufferGeometry();
    n.setIndex(new BufferAttribute(r, 1)),
      n.setAttribute(
        'position',
        new Float32BufferAttribute(
          [1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1],
          3,
        ),
      ),
      super(n, new LineBasicMaterial({ color: t, toneMapped: !1 })),
      (this.box = e),
      (this.type = 'Box3Helper'),
      this.geometry.computeBoundingSphere();
  }
  updateMatrixWorld(e) {
    const t = this.box;
    t.isEmpty() ||
      (t.getCenter(this.position),
      t.getSize(this.scale),
      this.scale.multiplyScalar(0.5),
      super.updateMatrixWorld(e));
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
class PlaneHelper extends Line {
  constructor(e, t = 1, r = 16776960) {
    const n = r,
      i = new BufferGeometry();
    i.setAttribute(
      'position',
      new Float32BufferAttribute(
        [1, -1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0],
        3,
      ),
    ),
      i.computeBoundingSphere(),
      super(i, new LineBasicMaterial({ color: n, toneMapped: !1 })),
      (this.type = 'PlaneHelper'),
      (this.plane = e),
      (this.size = t);
    const a = new BufferGeometry();
    a.setAttribute(
      'position',
      new Float32BufferAttribute([1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], 3),
    ),
      a.computeBoundingSphere(),
      this.add(
        new Mesh(
          a,
          new MeshBasicMaterial({
            color: n,
            opacity: 0.2,
            transparent: !0,
            depthWrite: !1,
            toneMapped: !1,
          }),
        ),
      );
  }
  updateMatrixWorld(e) {
    this.position.set(0, 0, 0),
      this.scale.set(0.5 * this.size, 0.5 * this.size, 1),
      this.lookAt(this.plane.normal),
      this.translateZ(-this.plane.constant),
      super.updateMatrixWorld(e);
  }
  dispose() {
    this.geometry.dispose(),
      this.material.dispose(),
      this.children[0].geometry.dispose(),
      this.children[0].material.dispose();
  }
}
const _axis = new Vector3();
let _lineGeometry, _coneGeometry;
class ArrowHelper extends Object3D {
  constructor(
    e = new Vector3(0, 0, 1),
    t = new Vector3(0, 0, 0),
    r = 1,
    n = 16776960,
    i = 0.2 * r,
    a = 0.2 * i,
  ) {
    super(),
      (this.type = 'ArrowHelper'),
      void 0 === _lineGeometry &&
        ((_lineGeometry = new BufferGeometry()),
        _lineGeometry.setAttribute('position', new Float32BufferAttribute([0, 0, 0, 0, 1, 0], 3)),
        (_coneGeometry = new CylinderGeometry(0, 0.5, 1, 5, 1)),
        _coneGeometry.translate(0, -0.5, 0)),
      this.position.copy(t),
      (this.line = new Line(_lineGeometry, new LineBasicMaterial({ color: n, toneMapped: !1 }))),
      (this.line.matrixAutoUpdate = !1),
      this.add(this.line),
      (this.cone = new Mesh(_coneGeometry, new MeshBasicMaterial({ color: n, toneMapped: !1 }))),
      (this.cone.matrixAutoUpdate = !1),
      this.add(this.cone),
      this.setDirection(e),
      this.setLength(r, i, a);
  }
  setDirection(e) {
    if (e.y > 0.99999) this.quaternion.set(0, 0, 0, 1);
    else if (e.y < -0.99999) this.quaternion.set(1, 0, 0, 0);
    else {
      _axis.set(e.z, 0, -e.x).normalize();
      const t = Math.acos(e.y);
      this.quaternion.setFromAxisAngle(_axis, t);
    }
  }
  setLength(e, t = 0.2 * e, r = 0.2 * t) {
    this.line.scale.set(1, Math.max(1e-4, e - t), 1),
      this.line.updateMatrix(),
      this.cone.scale.set(r, t, r),
      (this.cone.position.y = e),
      this.cone.updateMatrix();
  }
  setColor(e) {
    this.line.material.color.set(e), this.cone.material.color.set(e);
  }
  copy(e) {
    return super.copy(e, !1), this.line.copy(e.line), this.cone.copy(e.cone), this;
  }
  dispose() {
    this.line.geometry.dispose(),
      this.line.material.dispose(),
      this.cone.geometry.dispose(),
      this.cone.material.dispose();
  }
}
class AxesHelper extends LineSegments {
  constructor(e = 1) {
    const t = [0, 0, 0, e, 0, 0, 0, 0, 0, 0, e, 0, 0, 0, 0, 0, 0, e],
      r = new BufferGeometry();
    r.setAttribute('position', new Float32BufferAttribute(t, 3)),
      r.setAttribute(
        'color',
        new Float32BufferAttribute([1, 0, 0, 1, 0.6, 0, 0, 1, 0, 0.6, 1, 0, 0, 0, 1, 0, 0.6, 1], 3),
      );
    super(r, new LineBasicMaterial({ vertexColors: !0, toneMapped: !1 })),
      (this.type = 'AxesHelper');
  }
  setColors(e, t, r) {
    const n = new Color(),
      i = this.geometry.attributes.color.array;
    return (
      n.set(e),
      n.toArray(i, 0),
      n.toArray(i, 3),
      n.set(t),
      n.toArray(i, 6),
      n.toArray(i, 9),
      n.set(r),
      n.toArray(i, 12),
      n.toArray(i, 15),
      (this.geometry.attributes.color.needsUpdate = !0),
      this
    );
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
class ShapePath {
  constructor() {
    (this.type = 'ShapePath'),
      (this.color = new Color()),
      (this.subPaths = []),
      (this.currentPath = null);
  }
  moveTo(e, t) {
    return (
      (this.currentPath = new Path()),
      this.subPaths.push(this.currentPath),
      this.currentPath.moveTo(e, t),
      this
    );
  }
  lineTo(e, t) {
    return this.currentPath.lineTo(e, t), this;
  }
  quadraticCurveTo(e, t, r, n) {
    return this.currentPath.quadraticCurveTo(e, t, r, n), this;
  }
  bezierCurveTo(e, t, r, n, i, a) {
    return this.currentPath.bezierCurveTo(e, t, r, n, i, a), this;
  }
  splineThru(e) {
    return this.currentPath.splineThru(e), this;
  }
  toShapes(e) {
    function t(e, t) {
      const r = t.length;
      let n = !1;
      for (let i = r - 1, a = 0; a < r; i = a++) {
        let r = t[i],
          s = t[a],
          o = s.x - r.x,
          l = s.y - r.y;
        if (Math.abs(l) > Number.EPSILON) {
          if ((l < 0 && ((r = t[a]), (o = -o), (s = t[i]), (l = -l)), e.y < r.y || e.y > s.y))
            continue;
          if (e.y === r.y) {
            if (e.x === r.x) return !0;
          } else {
            const t = l * (e.x - r.x) - o * (e.y - r.y);
            if (0 === t) return !0;
            if (t < 0) continue;
            n = !n;
          }
        } else {
          if (e.y !== r.y) continue;
          if ((s.x <= e.x && e.x <= r.x) || (r.x <= e.x && e.x <= s.x)) return !0;
        }
      }
      return n;
    }
    const r = ShapeUtils.isClockWise,
      n = this.subPaths;
    if (0 === n.length) return [];
    let i, a, s;
    const o = [];
    if (1 === n.length) return (a = n[0]), (s = new Shape()), (s.curves = a.curves), o.push(s), o;
    let l = !r(n[0].getPoints());
    l = e ? !l : l;
    const c = [],
      h = [];
    let u,
      d,
      p = [],
      m = 0;
    (h[m] = void 0), (p[m] = []);
    for (let t = 0, s = n.length; t < s; t++)
      (a = n[t]),
        (u = a.getPoints()),
        (i = r(u)),
        (i = e ? !i : i),
        i
          ? (!l && h[m] && m++,
            (h[m] = { s: new Shape(), p: u }),
            (h[m].s.curves = a.curves),
            l && m++,
            (p[m] = []))
          : p[m].push({ h: a, p: u[0] });
    if (!h[0])
      return (function (e) {
        const t = [];
        for (let r = 0, n = e.length; r < n; r++) {
          const n = e[r],
            i = new Shape();
          (i.curves = n.curves), t.push(i);
        }
        return t;
      })(n);
    if (h.length > 1) {
      let e = !1,
        r = 0;
      for (let e = 0, t = h.length; e < t; e++) c[e] = [];
      for (let n = 0, i = h.length; n < i; n++) {
        const i = p[n];
        for (let a = 0; a < i.length; a++) {
          const s = i[a];
          let o = !0;
          for (let i = 0; i < h.length; i++)
            t(s.p, h[i].p) && (n !== i && r++, o ? ((o = !1), c[i].push(s)) : (e = !0));
          o && c[n].push(s);
        }
      }
      r > 0 && !1 === e && (p = c);
    }
    for (let e = 0, t = h.length; e < t; e++) {
      (s = h[e].s), o.push(s), (d = p[e]);
      for (let e = 0, t = d.length; e < t; e++) s.holes.push(d[e].h);
    }
    return o;
  }
}
class BoxBufferGeometry extends BoxGeometry {
  constructor(e, t, r, n, i, a) {
    console.warn('THREE.BoxBufferGeometry has been renamed to THREE.BoxGeometry.'),
      super(e, t, r, n, i, a);
  }
}
class CapsuleBufferGeometry extends CapsuleGeometry {
  constructor(e, t, r, n) {
    console.warn('THREE.CapsuleBufferGeometry has been renamed to THREE.CapsuleGeometry.'),
      super(e, t, r, n);
  }
}
class CircleBufferGeometry extends CircleGeometry {
  constructor(e, t, r, n) {
    console.warn('THREE.CircleBufferGeometry has been renamed to THREE.CircleGeometry.'),
      super(e, t, r, n);
  }
}
class ConeBufferGeometry extends ConeGeometry {
  constructor(e, t, r, n, i, a, s) {
    console.warn('THREE.ConeBufferGeometry has been renamed to THREE.ConeGeometry.'),
      super(e, t, r, n, i, a, s);
  }
}
class CylinderBufferGeometry extends CylinderGeometry {
  constructor(e, t, r, n, i, a, s, o) {
    console.warn('THREE.CylinderBufferGeometry has been renamed to THREE.CylinderGeometry.'),
      super(e, t, r, n, i, a, s, o);
  }
}
class DodecahedronBufferGeometry extends DodecahedronGeometry {
  constructor(e, t) {
    console.warn(
      'THREE.DodecahedronBufferGeometry has been renamed to THREE.DodecahedronGeometry.',
    ),
      super(e, t);
  }
}
class ExtrudeBufferGeometry extends ExtrudeGeometry {
  constructor(e, t) {
    console.warn('THREE.ExtrudeBufferGeometry has been renamed to THREE.ExtrudeGeometry.'),
      super(e, t);
  }
}
class IcosahedronBufferGeometry extends IcosahedronGeometry {
  constructor(e, t) {
    console.warn('THREE.IcosahedronBufferGeometry has been renamed to THREE.IcosahedronGeometry.'),
      super(e, t);
  }
}
class LatheBufferGeometry extends LatheGeometry {
  constructor(e, t, r, n) {
    console.warn('THREE.LatheBufferGeometry has been renamed to THREE.LatheGeometry.'),
      super(e, t, r, n);
  }
}
class OctahedronBufferGeometry extends OctahedronGeometry {
  constructor(e, t) {
    console.warn('THREE.OctahedronBufferGeometry has been renamed to THREE.OctahedronGeometry.'),
      super(e, t);
  }
}
class PlaneBufferGeometry extends PlaneGeometry {
  constructor(e, t, r, n) {
    console.warn('THREE.PlaneBufferGeometry has been renamed to THREE.PlaneGeometry.'),
      super(e, t, r, n);
  }
}
class PolyhedronBufferGeometry extends PolyhedronGeometry {
  constructor(e, t, r, n) {
    console.warn('THREE.PolyhedronBufferGeometry has been renamed to THREE.PolyhedronGeometry.'),
      super(e, t, r, n);
  }
}
class RingBufferGeometry extends RingGeometry {
  constructor(e, t, r, n, i, a) {
    console.warn('THREE.RingBufferGeometry has been renamed to THREE.RingGeometry.'),
      super(e, t, r, n, i, a);
  }
}
class ShapeBufferGeometry extends ShapeGeometry {
  constructor(e, t) {
    console.warn('THREE.ShapeBufferGeometry has been renamed to THREE.ShapeGeometry.'), super(e, t);
  }
}
class SphereBufferGeometry extends SphereGeometry {
  constructor(e, t, r, n, i, a, s) {
    console.warn('THREE.SphereBufferGeometry has been renamed to THREE.SphereGeometry.'),
      super(e, t, r, n, i, a, s);
  }
}
class TetrahedronBufferGeometry extends TetrahedronGeometry {
  constructor(e, t) {
    console.warn('THREE.TetrahedronBufferGeometry has been renamed to THREE.TetrahedronGeometry.'),
      super(e, t);
  }
}
class TorusBufferGeometry extends TorusGeometry {
  constructor(e, t, r, n, i) {
    console.warn('THREE.TorusBufferGeometry has been renamed to THREE.TorusGeometry.'),
      super(e, t, r, n, i);
  }
}
class TorusKnotBufferGeometry extends TorusKnotGeometry {
  constructor(e, t, r, n, i, a) {
    console.warn('THREE.TorusKnotBufferGeometry has been renamed to THREE.TorusKnotGeometry.'),
      super(e, t, r, n, i, a);
  }
}
class TubeBufferGeometry extends TubeGeometry {
  constructor(e, t, r, n, i) {
    console.warn('THREE.TubeBufferGeometry has been renamed to THREE.TubeGeometry.'),
      super(e, t, r, n, i);
  }
}
'undefined' != typeof __THREE_DEVTOOLS__ &&
  __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('register', { detail: { revision: '151' } })),
  'undefined' != typeof window &&
    (window.__THREE__
      ? console.warn('WARNING: Multiple instances of Three.js being imported.')
      : (window.__THREE__ = '151')),
  (exports.ACESFilmicToneMapping = 4),
  (exports.AddEquation = 100),
  (exports.AddOperation = 2),
  (exports.AdditiveAnimationBlendMode = 2501),
  (exports.AdditiveBlending = 2),
  (exports.AlphaFormat = 1021),
  (exports.AlwaysDepth = 1),
  (exports.AlwaysStencilFunc = 519),
  (exports.AmbientLight = AmbientLight),
  (exports.AmbientLightProbe = AmbientLightProbe),
  (exports.AnimationAction = AnimationAction),
  (exports.AnimationClip = AnimationClip),
  (exports.AnimationLoader = AnimationLoader),
  (exports.AnimationMixer = AnimationMixer),
  (exports.AnimationObjectGroup = AnimationObjectGroup),
  (exports.AnimationUtils = AnimationUtils),
  (exports.ArcCurve = ArcCurve),
  (exports.ArrayCamera = ArrayCamera),
  (exports.ArrowHelper = ArrowHelper),
  (exports.Audio = Audio),
  (exports.AudioAnalyser = AudioAnalyser),
  (exports.AudioContext = AudioContext),
  (exports.AudioListener = AudioListener),
  (exports.AudioLoader = AudioLoader),
  (exports.AxesHelper = AxesHelper),
  (exports.BackSide = 1),
  (exports.BasicDepthPacking = 3200),
  (exports.BasicShadowMap = 0),
  (exports.Bone = Bone),
  (exports.BooleanKeyframeTrack = BooleanKeyframeTrack),
  (exports.Box2 = Box2),
  (exports.Box3 = Box3),
  (exports.Box3Helper = Box3Helper),
  (exports.BoxBufferGeometry = BoxBufferGeometry),
  (exports.BoxGeometry = BoxGeometry),
  (exports.BoxHelper = BoxHelper),
  (exports.BufferAttribute = BufferAttribute),
  (exports.BufferGeometry = BufferGeometry),
  (exports.BufferGeometryLoader = BufferGeometryLoader),
  (exports.ByteType = 1010),
  (exports.Cache = Cache),
  (exports.Camera = Camera),
  (exports.CameraHelper = CameraHelper),
  (exports.CanvasTexture = CanvasTexture),
  (exports.CapsuleBufferGeometry = CapsuleBufferGeometry),
  (exports.CapsuleGeometry = CapsuleGeometry),
  (exports.CatmullRomCurve3 = CatmullRomCurve3),
  (exports.CineonToneMapping = 3),
  (exports.CircleBufferGeometry = CircleBufferGeometry),
  (exports.CircleGeometry = CircleGeometry),
  (exports.ClampToEdgeWrapping = 1001),
  (exports.Clock = Clock),
  (exports.Color = Color),
  (exports.ColorKeyframeTrack = ColorKeyframeTrack),
  (exports.ColorManagement = ColorManagement),
  (exports.CompressedArrayTexture = CompressedArrayTexture),
  (exports.CompressedTexture = CompressedTexture),
  (exports.CompressedTextureLoader = CompressedTextureLoader),
  (exports.ConeBufferGeometry = ConeBufferGeometry),
  (exports.ConeGeometry = ConeGeometry),
  (exports.CubeCamera = CubeCamera),
  (exports.CubeReflectionMapping = 301),
  (exports.CubeRefractionMapping = 302),
  (exports.CubeTexture = CubeTexture),
  (exports.CubeTextureLoader = CubeTextureLoader),
  (exports.CubeUVReflectionMapping = 306),
  (exports.CubicBezierCurve = CubicBezierCurve),
  (exports.CubicBezierCurve3 = CubicBezierCurve3),
  (exports.CubicInterpolant = CubicInterpolant),
  (exports.CullFaceBack = 1),
  (exports.CullFaceFront = 2),
  (exports.CullFaceFrontBack = 3),
  (exports.CullFaceNone = 0),
  (exports.Curve = Curve),
  (exports.CurvePath = CurvePath),
  (exports.CustomBlending = 5),
  (exports.CustomToneMapping = 5),
  (exports.CylinderBufferGeometry = CylinderBufferGeometry),
  (exports.CylinderGeometry = CylinderGeometry),
  (exports.Cylindrical = Cylindrical),
  (exports.Data3DTexture = Data3DTexture),
  (exports.DataArrayTexture = DataArrayTexture),
  (exports.DataTexture = DataTexture),
  (exports.DataTextureLoader = DataTextureLoader),
  (exports.DataUtils = DataUtils),
  (exports.DecrementStencilOp = 7683),
  (exports.DecrementWrapStencilOp = 34056),
  (exports.DefaultLoadingManager = DefaultLoadingManager),
  (exports.DepthFormat = 1026),
  (exports.DepthStencilFormat = 1027),
  (exports.DepthTexture = DepthTexture),
  (exports.DirectionalLight = DirectionalLight),
  (exports.DirectionalLightHelper = DirectionalLightHelper),
  (exports.DiscreteInterpolant = DiscreteInterpolant),
  (exports.DisplayP3ColorSpace = 'display-p3'),
  (exports.DodecahedronBufferGeometry = DodecahedronBufferGeometry),
  (exports.DodecahedronGeometry = DodecahedronGeometry),
  (exports.DoubleSide = 2),
  (exports.DstAlphaFactor = 206),
  (exports.DstColorFactor = 208),
  (exports.DynamicCopyUsage = 35050),
  (exports.DynamicDrawUsage = 35048),
  (exports.DynamicReadUsage = 35049),
  (exports.EdgesGeometry = EdgesGeometry),
  (exports.EllipseCurve = EllipseCurve),
  (exports.EqualDepth = 4),
  (exports.EqualStencilFunc = 514),
  (exports.EquirectangularReflectionMapping = 303),
  (exports.EquirectangularRefractionMapping = 304),
  (exports.Euler = Euler),
  (exports.EventDispatcher = EventDispatcher),
  (exports.ExtrudeBufferGeometry = ExtrudeBufferGeometry),
  (exports.ExtrudeGeometry = ExtrudeGeometry),
  (exports.FileLoader = FileLoader),
  (exports.Float16BufferAttribute = Float16BufferAttribute),
  (exports.Float32BufferAttribute = Float32BufferAttribute),
  (exports.Float64BufferAttribute = Float64BufferAttribute),
  (exports.FloatType = 1015),
  (exports.Fog = Fog),
  (exports.FogExp2 = FogExp2),
  (exports.FramebufferTexture = FramebufferTexture),
  (exports.FrontSide = 0),
  (exports.Frustum = Frustum),
  (exports.GLBufferAttribute = GLBufferAttribute),
  (exports.GLSL1 = '100'),
  (exports.GLSL3 = GLSL3),
  (exports.GreaterDepth = 6),
  (exports.GreaterEqualDepth = 5),
  (exports.GreaterEqualStencilFunc = 518),
  (exports.GreaterStencilFunc = 516),
  (exports.GridHelper = GridHelper),
  (exports.Group = Group),
  (exports.HalfFloatType = 1016),
  (exports.HemisphereLight = HemisphereLight),
  (exports.HemisphereLightHelper = HemisphereLightHelper),
  (exports.HemisphereLightProbe = HemisphereLightProbe),
  (exports.IcosahedronBufferGeometry = IcosahedronBufferGeometry),
  (exports.IcosahedronGeometry = IcosahedronGeometry),
  (exports.ImageBitmapLoader = ImageBitmapLoader),
  (exports.ImageLoader = ImageLoader),
  (exports.ImageUtils = ImageUtils),
  (exports.IncrementStencilOp = 7682),
  (exports.IncrementWrapStencilOp = 34055),
  (exports.InstancedBufferAttribute = InstancedBufferAttribute),
  (exports.InstancedBufferGeometry = InstancedBufferGeometry),
  (exports.InstancedInterleavedBuffer = InstancedInterleavedBuffer),
  (exports.InstancedMesh = InstancedMesh),
  (exports.Int16BufferAttribute = Int16BufferAttribute),
  (exports.Int32BufferAttribute = Int32BufferAttribute),
  (exports.Int8BufferAttribute = Int8BufferAttribute),
  (exports.IntType = 1013),
  (exports.InterleavedBuffer = InterleavedBuffer),
  (exports.InterleavedBufferAttribute = InterleavedBufferAttribute),
  (exports.Interpolant = Interpolant),
  (exports.InterpolateDiscrete = 2300),
  (exports.InterpolateLinear = 2301),
  (exports.InterpolateSmooth = 2302),
  (exports.InvertStencilOp = 5386),
  (exports.KeepStencilOp = 7680),
  (exports.KeyframeTrack = KeyframeTrack),
  (exports.LOD = LOD),
  (exports.LatheBufferGeometry = LatheBufferGeometry),
  (exports.LatheGeometry = LatheGeometry),
  (exports.Layers = Layers),
  (exports.LessDepth = 2),
  (exports.LessEqualDepth = 3),
  (exports.LessEqualStencilFunc = 515),
  (exports.LessStencilFunc = 513),
  (exports.Light = Light),
  (exports.LightProbe = LightProbe),
  (exports.Line = Line),
  (exports.Line3 = Line3),
  (exports.LineBasicMaterial = LineBasicMaterial),
  (exports.LineCurve = LineCurve),
  (exports.LineCurve3 = LineCurve3),
  (exports.LineDashedMaterial = LineDashedMaterial),
  (exports.LineLoop = LineLoop),
  (exports.LineSegments = LineSegments),
  (exports.LinearEncoding = 3e3),
  (exports.LinearFilter = 1006),
  (exports.LinearInterpolant = LinearInterpolant),
  (exports.LinearMipMapLinearFilter = 1008),
  (exports.LinearMipMapNearestFilter = 1007),
  (exports.LinearMipmapLinearFilter = 1008),
  (exports.LinearMipmapNearestFilter = 1007),
  (exports.LinearSRGBColorSpace = 'srgb-linear'),
  (exports.LinearToneMapping = 1),
  (exports.Loader = Loader),
  (exports.LoaderUtils = LoaderUtils),
  (exports.LoadingManager = LoadingManager),
  (exports.LoopOnce = 2200),
  (exports.LoopPingPong = 2202),
  (exports.LoopRepeat = 2201),
  (exports.LuminanceAlphaFormat = 1025),
  (exports.LuminanceFormat = 1024),
  (exports.MOUSE = MOUSE),
  (exports.Material = Material),
  (exports.MaterialLoader = MaterialLoader),
  (exports.MathUtils = MathUtils),
  (exports.Matrix3 = Matrix3),
  (exports.Matrix4 = Matrix4),
  (exports.MaxEquation = 104),
  (exports.Mesh = Mesh),
  (exports.MeshBasicMaterial = MeshBasicMaterial),
  (exports.MeshDepthMaterial = MeshDepthMaterial),
  (exports.MeshDistanceMaterial = MeshDistanceMaterial),
  (exports.MeshLambertMaterial = MeshLambertMaterial),
  (exports.MeshMatcapMaterial = MeshMatcapMaterial),
  (exports.MeshNormalMaterial = MeshNormalMaterial),
  (exports.MeshPhongMaterial = MeshPhongMaterial),
  (exports.MeshPhysicalMaterial = MeshPhysicalMaterial),
  (exports.MeshStandardMaterial = MeshStandardMaterial),
  (exports.MeshToonMaterial = MeshToonMaterial),
  (exports.MinEquation = 103),
  (exports.MirroredRepeatWrapping = 1002),
  (exports.MixOperation = 1),
  (exports.MultiplyBlending = 4),
  (exports.MultiplyOperation = 0),
  (exports.NearestFilter = 1003),
  (exports.NearestMipMapLinearFilter = 1005),
  (exports.NearestMipMapNearestFilter = 1004),
  (exports.NearestMipmapLinearFilter = 1005),
  (exports.NearestMipmapNearestFilter = 1004),
  (exports.NeverDepth = 0),
  (exports.NeverStencilFunc = 512),
  (exports.NoBlending = 0),
  (exports.NoColorSpace = ''),
  (exports.NoToneMapping = 0),
  (exports.NormalAnimationBlendMode = 2500),
  (exports.NormalBlending = 1),
  (exports.NotEqualDepth = 7),
  (exports.NotEqualStencilFunc = 517),
  (exports.NumberKeyframeTrack = NumberKeyframeTrack),
  (exports.Object3D = Object3D),
  (exports.ObjectLoader = ObjectLoader),
  (exports.ObjectSpaceNormalMap = 1),
  (exports.OctahedronBufferGeometry = OctahedronBufferGeometry),
  (exports.OctahedronGeometry = OctahedronGeometry),
  (exports.OneFactor = 201),
  (exports.OneMinusDstAlphaFactor = 207),
  (exports.OneMinusDstColorFactor = 209),
  (exports.OneMinusSrcAlphaFactor = 205),
  (exports.OneMinusSrcColorFactor = 203),
  (exports.OrthographicCamera = OrthographicCamera),
  (exports.PCFShadowMap = 1),
  (exports.PCFSoftShadowMap = 2),
  (exports.PMREMGenerator = PMREMGenerator),
  (exports.Path = Path),
  (exports.PerspectiveCamera = PerspectiveCamera),
  (exports.Plane = Plane),
  (exports.PlaneBufferGeometry = PlaneBufferGeometry),
  (exports.PlaneGeometry = PlaneGeometry),
  (exports.PlaneHelper = PlaneHelper),
  (exports.PointLight = PointLight),
  (exports.PointLightHelper = PointLightHelper),
  (exports.Points = Points),
  (exports.PointsMaterial = PointsMaterial),
  (exports.PolarGridHelper = PolarGridHelper),
  (exports.PolyhedronBufferGeometry = PolyhedronBufferGeometry),
  (exports.PolyhedronGeometry = PolyhedronGeometry),
  (exports.PositionalAudio = PositionalAudio),
  (exports.PropertyBinding = PropertyBinding),
  (exports.PropertyMixer = PropertyMixer),
  (exports.QuadraticBezierCurve = QuadraticBezierCurve),
  (exports.QuadraticBezierCurve3 = QuadraticBezierCurve3),
  (exports.Quaternion = Quaternion),
  (exports.QuaternionKeyframeTrack = QuaternionKeyframeTrack),
  (exports.QuaternionLinearInterpolant = QuaternionLinearInterpolant),
  (exports.RED_GREEN_RGTC2_Format = 36285),
  (exports.RED_RGTC1_Format = 36283),
  (exports.REVISION = '151'),
  (exports.RGBADepthPacking = 3201),
  (exports.RGBAFormat = 1023),
  (exports.RGBAIntegerFormat = 1033),
  (exports.RGBA_ASTC_10x10_Format = 37819),
  (exports.RGBA_ASTC_10x5_Format = 37816),
  (exports.RGBA_ASTC_10x6_Format = 37817),
  (exports.RGBA_ASTC_10x8_Format = 37818),
  (exports.RGBA_ASTC_12x10_Format = 37820),
  (exports.RGBA_ASTC_12x12_Format = 37821),
  (exports.RGBA_ASTC_4x4_Format = 37808),
  (exports.RGBA_ASTC_5x4_Format = 37809),
  (exports.RGBA_ASTC_5x5_Format = 37810),
  (exports.RGBA_ASTC_6x5_Format = 37811),
  (exports.RGBA_ASTC_6x6_Format = 37812),
  (exports.RGBA_ASTC_8x5_Format = 37813),
  (exports.RGBA_ASTC_8x6_Format = 37814),
  (exports.RGBA_ASTC_8x8_Format = 37815),
  (exports.RGBA_BPTC_Format = 36492),
  (exports.RGBA_ETC2_EAC_Format = 37496),
  (exports.RGBA_PVRTC_2BPPV1_Format = 35843),
  (exports.RGBA_PVRTC_4BPPV1_Format = 35842),
  (exports.RGBA_S3TC_DXT1_Format = 33777),
  (exports.RGBA_S3TC_DXT3_Format = 33778),
  (exports.RGBA_S3TC_DXT5_Format = 33779),
  (exports.RGB_ETC1_Format = 36196),
  (exports.RGB_ETC2_Format = 37492),
  (exports.RGB_PVRTC_2BPPV1_Format = 35841),
  (exports.RGB_PVRTC_4BPPV1_Format = 35840),
  (exports.RGB_S3TC_DXT1_Format = 33776),
  (exports.RGFormat = 1030),
  (exports.RGIntegerFormat = 1031),
  (exports.RawShaderMaterial = RawShaderMaterial),
  (exports.Ray = Ray),
  (exports.Raycaster = Raycaster),
  (exports.RectAreaLight = RectAreaLight),
  (exports.RedFormat = 1028),
  (exports.RedIntegerFormat = 1029),
  (exports.ReinhardToneMapping = 2),
  (exports.RepeatWrapping = 1e3),
  (exports.ReplaceStencilOp = 7681),
  (exports.ReverseSubtractEquation = 102),
  (exports.RingBufferGeometry = RingBufferGeometry),
  (exports.RingGeometry = RingGeometry),
  (exports.SIGNED_RED_GREEN_RGTC2_Format = 36286),
  (exports.SIGNED_RED_RGTC1_Format = 36284),
  (exports.SRGBColorSpace = 'srgb'),
  (exports.Scene = Scene),
  (exports.ShaderChunk = ShaderChunk),
  (exports.ShaderLib = ShaderLib),
  (exports.ShaderMaterial = ShaderMaterial),
  (exports.ShadowMaterial = ShadowMaterial),
  (exports.Shape = Shape),
  (exports.ShapeBufferGeometry = ShapeBufferGeometry),
  (exports.ShapeGeometry = ShapeGeometry),
  (exports.ShapePath = ShapePath),
  (exports.ShapeUtils = ShapeUtils),
  (exports.ShortType = 1011),
  (exports.Skeleton = Skeleton),
  (exports.SkeletonHelper = SkeletonHelper),
  (exports.SkinnedMesh = SkinnedMesh),
  (exports.Source = Source),
  (exports.Sphere = Sphere),
  (exports.SphereBufferGeometry = SphereBufferGeometry),
  (exports.SphereGeometry = SphereGeometry),
  (exports.Spherical = Spherical),
  (exports.SphericalHarmonics3 = SphericalHarmonics3),
  (exports.SplineCurve = SplineCurve),
  (exports.SpotLight = SpotLight),
  (exports.SpotLightHelper = SpotLightHelper),
  (exports.Sprite = Sprite),
  (exports.SpriteMaterial = SpriteMaterial),
  (exports.SrcAlphaFactor = 204),
  (exports.SrcAlphaSaturateFactor = 210),
  (exports.SrcColorFactor = 202),
  (exports.StaticCopyUsage = 35046),
  (exports.StaticDrawUsage = 35044),
  (exports.StaticReadUsage = 35045),
  (exports.StereoCamera = StereoCamera),
  (exports.StreamCopyUsage = 35042),
  (exports.StreamDrawUsage = 35040),
  (exports.StreamReadUsage = 35041),
  (exports.StringKeyframeTrack = StringKeyframeTrack),
  (exports.SubtractEquation = 101),
  (exports.SubtractiveBlending = 3),
  (exports.TOUCH = TOUCH),
  (exports.TangentSpaceNormalMap = 0),
  (exports.TetrahedronBufferGeometry = TetrahedronBufferGeometry),
  (exports.TetrahedronGeometry = TetrahedronGeometry),
  (exports.Texture = Texture),
  (exports.TextureLoader = TextureLoader),
  (exports.TorusBufferGeometry = TorusBufferGeometry),
  (exports.TorusGeometry = TorusGeometry),
  (exports.TorusKnotBufferGeometry = TorusKnotBufferGeometry),
  (exports.TorusKnotGeometry = TorusKnotGeometry),
  (exports.Triangle = Triangle),
  (exports.TriangleFanDrawMode = 2),
  (exports.TriangleStripDrawMode = 1),
  (exports.TrianglesDrawMode = 0),
  (exports.TubeBufferGeometry = TubeBufferGeometry),
  (exports.TubeGeometry = TubeGeometry),
  (exports.TwoPassDoubleSide = 2),
  (exports.UVMapping = 300),
  (exports.Uint16BufferAttribute = Uint16BufferAttribute),
  (exports.Uint32BufferAttribute = Uint32BufferAttribute),
  (exports.Uint8BufferAttribute = Uint8BufferAttribute),
  (exports.Uint8ClampedBufferAttribute = Uint8ClampedBufferAttribute),
  (exports.Uniform = Uniform),
  (exports.UniformsGroup = UniformsGroup),
  (exports.UniformsLib = UniformsLib),
  (exports.UniformsUtils = UniformsUtils),
  (exports.UnsignedByteType = 1009),
  (exports.UnsignedInt248Type = 1020),
  (exports.UnsignedIntType = 1014),
  (exports.UnsignedShort4444Type = 1017),
  (exports.UnsignedShort5551Type = 1018),
  (exports.UnsignedShortType = 1012),
  (exports.VSMShadowMap = 3),
  (exports.Vector2 = Vector2),
  (exports.Vector3 = Vector3),
  (exports.Vector4 = Vector4),
  (exports.VectorKeyframeTrack = VectorKeyframeTrack),
  (exports.VideoTexture = VideoTexture),
  (exports.WebGL1Renderer = WebGL1Renderer),
  (exports.WebGL3DRenderTarget = WebGL3DRenderTarget),
  (exports.WebGLArrayRenderTarget = WebGLArrayRenderTarget),
  (exports.WebGLCubeRenderTarget = WebGLCubeRenderTarget),
  (exports.WebGLMultipleRenderTargets = WebGLMultipleRenderTargets),
  (exports.WebGLRenderTarget = WebGLRenderTarget),
  (exports.WebGLRenderer = WebGLRenderer),
  (exports.WebGLUtils = WebGLUtils),
  (exports.WireframeGeometry = WireframeGeometry),
  (exports.WrapAroundEnding = 2402),
  (exports.ZeroCurvatureEnding = 2400),
  (exports.ZeroFactor = 200),
  (exports.ZeroSlopeEnding = 2401),
  (exports.ZeroStencilOp = 0),
  (exports._SRGBAFormat = 1035),
  (exports.sRGBEncoding = 3001);
