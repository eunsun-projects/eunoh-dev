/*! SDK Interface v24.11.1_webgl-598-gae59c48b5b */ var e = {
    635: (e) => {
      var t = {
        kind: 'Document',
        definitions: [
          {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'Floorplans' },
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
                        name: { kind: 'Name', value: 'id' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'assets' },
                        arguments: [],
                        directives: [],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'floorplans' },
                              arguments: [
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'provider' },
                                  value: { kind: 'StringValue', value: 'Matterport', block: !1 },
                                },
                              ],
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
                                    name: { kind: 'Name', value: 'status' },
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
                                    name: { kind: 'Name', value: 'filename' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'format' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'height' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'width' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'resolution' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'origin' },
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
                                    name: { kind: 'Name', value: 'flags' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'provider' },
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
                  },
                },
              ],
            },
          },
        ],
        loc: { start: 0, end: 402 },
      };
      t.loc.source = {
        body: 'query Floorplans($modelId: ID!) {\n  model(id: $modelId) {\n    id\n    assets {\n      floorplans(provider: "Matterport") {\n        id\n        status\n        url\n        validUntil\n        filename\n        format\n        height\n        width,\n        resolution,\n        origin {\n          x,\n          y\n        }\n        floor {\n          id\n        }\n        flags\n        provider\n      }\n    }\n  }\n}\n',
        name: 'GraphQL request',
        locationOffset: { line: 1, column: 1 },
      };
      function n(e, t) {
        if ('FragmentSpread' === e.kind) t.add(e.name.value);
        else if ('VariableDefinition' === e.kind) {
          var a = e.type;
          'NamedType' === a.kind && t.add(a.name.value);
        }
        e.selectionSet &&
          e.selectionSet.selections.forEach(function (e) {
            n(e, t);
          }),
          e.variableDefinitions &&
            e.variableDefinitions.forEach(function (e) {
              n(e, t);
            }),
          e.definitions &&
            e.definitions.forEach(function (e) {
              n(e, t);
            });
      }
      var a = {};
      function o(e, t) {
        for (var n = 0; n < e.definitions.length; n++) {
          var a = e.definitions[n];
          if (a.name && a.name.value == t) return a;
        }
      }
      t.definitions.forEach(function (e) {
        if (e.name) {
          var t = new Set();
          n(e, t), (a[e.name.value] = t);
        }
      }),
        (e.exports = t),
        (e.exports.Floorplans = (function (e, t) {
          var n = { kind: e.kind, definitions: [o(e, t)] };
          e.hasOwnProperty('loc') && (n.loc = e.loc);
          var s = a[t] || new Set(),
            i = new Set(),
            r = new Set();
          for (
            s.forEach(function (e) {
              r.add(e);
            });
            r.size > 0;

          ) {
            var c = r;
            (r = new Set()),
              c.forEach(function (e) {
                i.has(e) ||
                  (i.add(e),
                  (a[e] || new Set()).forEach(function (e) {
                    r.add(e);
                  }));
              });
          }
          return (
            i.forEach(function (t) {
              var a = o(e, t);
              a && n.definitions.push(a);
            }),
            n
          );
        })(t, 'Floorplans'));
    },
  },
  t = {};
function n(a) {
  var o = t[a];
  if (void 0 !== o) return o.exports;
  var s = (t[a] = { exports: {} });
  return e[a](s, s.exports, n), s.exports;
}
(n.d = (e, t) => {
  for (var a in t)
    n.o(t, a) && !n.o(e, a) && Object.defineProperty(e, a, { enumerable: !0, get: t[a] });
}),
  (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t));
var a = {};
(() => {
  var e, t, o, s, i, r, c, d, l, h, u, p, m, g, f, w, y, I, T, E, v, C;
  n.d(a, { c: () => Fc }),
    (function (e) {
      let t, n, a, o;
      !(function (e) {
        e.PHASE_CHANGE = 'application.phasechange';
      })((t = e.Event || (e.Event = {}))),
        (function (e) {
          (e.UNINITIALIZED = 'appphase.uninitialized'),
            (e.WAITING = 'appphase.waiting'),
            (e.LOADING = 'appphase.loading'),
            (e.STARTING = 'appphase.starting'),
            (e.PLAYING = 'appphase.playing'),
            (e.ERROR = 'appphase.error');
        })((n = e.Phase || (e.Phase = {}))),
        (function (e) {
          (e.UNKNOWN = 'application.unknown'),
            (e.WEBVR = 'application.webvr'),
            (e.SHOWCASE = 'application.showcase'),
            (e.WORKSHOP = 'application.workshop');
        })((a = e.Application || (e.Application = {}))),
        (function (e) {
          e.RoomBounds = 'feature.roombounds';
        })((o = e.Feature || (e.Feature = {})));
    })(e || (e = {})),
    (function (e) {
      let t, n, a;
      !(function (e) {
        (e.IMAGE = 'image'),
          (e.PDF = 'pdf'),
          (e.VIDEO = 'video'),
          (e.RICH = 'rich'),
          (e.ZIP = 'zip'),
          (e.TEXT = 'text'),
          (e.AUDIO = 'audio'),
          (e.MODEL = 'model'),
          (e.APPLICATION = 'application');
      })((t = e.MediaType || (e.MediaType = {}))),
        (function (e) {
          (e.EXTERNAL = 'external'), (e.UPLOAD = 'upload'), (e.SANDBOX = 'sandbox');
        })((n = e.AttachmentCategory || (e.AttachmentCategory = {}))),
        (function (e) {
          (e.COMMENT = 'comment'), (e.MATTERTAG = 'mattertag');
        })((a = e.ParentType || (e.ParentType = {})));
    })(t || (t = {})),
    (function (e) {
      let t, n;
      !(function (e) {
        e.MOVE = 'camera.move';
      })((t = e.Event || (e.Event = {}))),
        (function (e) {
          (e.FORWARD = 'FORWARD'),
            (e.LEFT = 'LEFT'),
            (e.RIGHT = 'RIGHT'),
            (e.BACK = 'BACK'),
            (e.UP = 'UP'),
            (e.DOWN = 'DOWN');
        })((n = e.Direction || (e.Direction = {})));
    })(o || (o = {})),
    (function (e) {
      let t;
      !(function (e) {
        (e.CHANGE_START = 'floors.changestart'), (e.CHANGE_END = 'floors.changeend');
      })((t = e.Event || (e.Event = {})));
    })(s || (s = {})),
    (function (e) {
      let t;
      !(function (e) {
        (e.SUCCESS = 'astar.status.success'),
          (e.NO_PATH = 'astar.status.no_path'),
          (e.TIMEOUT = 'astar.status.timeout'),
          (e.NO_START_VERTEX = 'astar.status.no_start'),
          (e.NO_END_VERTEX = 'astar.status.no_end');
      })((t = e.AStarStatus || (e.AStarStatus = {})));
    })(i || (i = {})),
    (function (e) {
      let t;
      !(function (e) {
        e.POSITION_UPDATED = 'label.positionupdated';
      })((t = e.Event || (e.Event = {})));
    })(r || (r = {})),
    (function (e) {
      let t, n, a;
      !(function (e) {
        (e.WINDOW = 'link.creationpolicy.window'),
          (e.REFERRER = 'link.creationpolicy.referrer'),
          (e.MATTERPORT = 'link.creationpolicy.matterport');
      })((t = e.CreationPolicy || (e.CreationPolicy = {}))),
        (function (e) {
          (e.DEFAULT = 'link.openpolicy.default'),
            (e.NEW_WINDOW = 'link.openpolicy.newwindow'),
            (e.SAME_FRAME = 'link.openpolicy.sameframe'),
            (e.CURRENT_WINDOW = 'link.openpolicy.current');
        })((n = e.OpenPolicy || (e.OpenPolicy = {}))),
        (function (e) {
          (e.DEFAULT = 'link.destination.default'), (e.MATTERPORT = 'link.destination.matterport');
        })((a = e.DestinationPolicy || (e.DestinationPolicy = {})));
    })(c || (c = {})),
    (function (e) {
      let t, n, a, o, s;
      !(function (e) {
        (e.INSTANT = 'transition.instant'),
          (e.FLY = 'transition.fly'),
          (e.FADEOUT = 'transition.fade');
      })((t = e.Transition || (e.Transition = {}))),
        (function (e) {
          (e.NAVIGATION = 'tag.link.nav'),
            (e.MODEL = 'tag.link.model'),
            (e.EXT_LINK = 'tag.link.ext');
        })((n = e.LinkType || (e.LinkType = {}))),
        (function (e) {
          (e.NONE = 'tag.chunk.none'), (e.TEXT = 'tag.chunk.text'), (e.LINK = 'tag.chunk.link');
        })((a = e.DescriptionChunkType || (e.DescriptionChunkType = {}))),
        (function (e) {
          (e.HOVER = 'tag.hover'), (e.CLICK = 'tag.click'), (e.LINK_OPEN = 'tag.linkopen');
        })((o = e.Event || (e.Event = {}))),
        (function (e) {
          (e.NONE = 'mattertag.media.none'),
            (e.PHOTO = 'mattertag.media.photo'),
            (e.VIDEO = 'mattertag.media.video'),
            (e.RICH = 'mattertag.media.rich');
        })((s = e.MediaType || (e.MediaType = {})));
    })(d || (d = {})),
    (function (e) {
      let t, n, a;
      !(function (e) {
        (e.INSIDE = 'mode.inside'),
          (e.OUTSIDE = 'mode.outside'),
          (e.DOLLHOUSE = 'mode.dollhouse'),
          (e.FLOORPLAN = 'mode.floorplan'),
          (e.TRANSITIONING = 'mode.transitioning');
      })((t = e.Mode || (e.Mode = {}))),
        (function (e) {
          (e.CHANGE_START = 'viewmode.changestart'), (e.CHANGE_END = 'viewmode.changeend');
        })((n = e.Event || (e.Event = {}))),
        (function (e) {
          (e.INSTANT = 'transition.instant'),
            (e.FLY = 'transition.fly'),
            (e.FADEOUT = 'transition.fade');
        })((a = e.TransitionType || (e.TransitionType = {})));
    })(l || (l = {})),
    (function (e) {
      let t;
      !(function (e) {
        e.MODEL_LOADED = 'model.loaded';
      })((t = e.Event || (e.Event = {})));
    })(h || (h = {})),
    (function (e) {
      let t;
      !(function (e) {
        (e.NONE = 'intersectedobject.none'),
          (e.MODEL = 'intersectedobject.model'),
          (e.TAG = 'intersectedobject.tag'),
          (e.SWEEP = 'intersectedobject.sweep'),
          (e.UNKNOWN = 'intersectedobject.unknown');
      })((t = e.Colliders || (e.Colliders = {})));
    })(u || (u = {})),
    p || (p = {}),
    (function (e) {
      let t, n;
      !(function (e) {
        e.CAMERA = 'sensor.sensortype.camera';
      })((t = e.SensorType || (e.SensorType = {}))),
        (function (e) {
          (e.SPHERE = 'sensor.sourcetype.sphere'),
            (e.BOX = 'sensor.sourcetype.box'),
            (e.CYLINDER = 'sensor.sourcetype.cylinder');
        })((n = e.SourceType || (e.SourceType = {})));
    })(m || (m = {})),
    (function (e) {
      let t, n, a, o;
      !(function (e) {
        (e.ENTER = 'sweep.enter'), (e.EXIT = 'sweep.exit');
      })((t = e.Event || (e.Event = {}))),
        (function (e) {
          (e.INSTANT = 'transition.instant'),
            (e.FLY = 'transition.fly'),
            (e.FADEOUT = 'transition.fade');
        })((n = e.Transition || (e.Transition = {}))),
        (function (e) {
          (e.ALIGNED = 'aligned'), (e.UNALIGNED = 'unaligned');
        })((a = e.Alignment || (e.Alignment = {}))),
        (function (e) {
          (e.UNPLACED = 'unplaced'), (e.AUTO = 'auto'), (e.MANUAL = 'manual');
        })((o = e.Placement || (e.Placement = {})));
    })(g || (g = {})),
    (function (e) {
      let t;
      !(function (e) {
        (e.UNKNOWN = 'tag.attachment.unknown'),
          (e.APPLICATION = 'tag.attachment.application'),
          (e.AUDIO = 'tag.attachment.audio'),
          (e.IMAGE = 'tag.attachment.image'),
          (e.MODEL = 'tag.attachment.model'),
          (e.PDF = 'tag.attachment.pdf'),
          (e.RICH = 'tag.attachment.rich'),
          (e.TEXT = 'tag.attachment.text'),
          (e.VIDEO = 'tag.attachment.video'),
          (e.ZIP = 'tag.attachment.zip'),
          (e.SANDBOX = 'tag.attachment.sandbox');
      })((t = e.AttachmentType || (e.AttachmentType = {})));
    })(f || (f = {})),
    (function (e) {
      let t, n;
      !(function (e) {
        (e.STARTED = 'tour.started'),
          (e.STOPPED = 'tour.stopped'),
          (e.ENDED = 'tour.ended'),
          (e.STEPPED = 'tour.stepped');
      })((t = e.Event || (e.Event = {}))),
        (function (e) {
          (e.INACTIVE = 'tour.inactive'),
            (e.ACTIVE = 'tour.active'),
            (e.STOP_SCHEDULED = 'tour.stopscheduled');
        })((n = e.PlayState || (e.PlayState = {})));
    })(w || (w = {})),
    (function (e) {
      let t, n, a;
      !(function (e) {
        (e.OBJ_LOADER = 'mp.objLoader'),
          (e.FBX_LOADER = 'mp.fbxLoader'),
          (e.DAE_LOADER = 'mp.daeLoader'),
          (e.GLTF_LOADER = 'mp.gltfLoader'),
          (e.SCROLLING_TUBE = 'mp.scrollingTube'),
          (e.TRANSFORM_CONTROLS = 'mp.transformControls'),
          (e.LIGHTS_COMPONENT = 'mp.lights'),
          (e.POINT_LIGHT = 'mp.pointLight'),
          (e.DIRECTIONAL_LIGHT = 'mp.directionalLight'),
          (e.AMBIENT_LIGHT = 'mp.ambientLight'),
          (e.CAMERA = 'mp.camera'),
          (e.INPUT = 'mp.input'),
          (e.XR = 'mp.xr');
      })((t = e.Component || (e.Component = {}))),
        (function (e) {
          (e.CLICK = 'INTERACTION.CLICK'),
            (e.HOVER = 'INTERACTION.HOVER'),
            (e.DRAG = 'INTERACTION.DRAG'),
            (e.DRAG_BEGIN = 'INTERACTION.DRAG_BEGIN'),
            (e.DRAG_END = 'INTERACTION.DRAG_END'),
            (e.POINTER_MOVE = 'INTERACTION.POINTER_MOVE'),
            (e.POINTER_BUTTON = 'INTERACTION.POINTER_BUTTON'),
            (e.SCROLL = 'INTERACTION.SCROLL'),
            (e.KEY = 'INTERACTION.KEY'),
            (e.LONG_PRESS_START = 'INTERACTION.LONG_PRESS_START'),
            (e.LONG_PRESS_END = 'INTERACTION.LONG_PRESS_END'),
            (e.MULTI_SWIPE = 'INTERACTION.MULTI_SWIPE'),
            (e.MULTI_SWIPE_END = 'INTERACTION.MULTI_SWIPE_END'),
            (e.PINCH = 'INTERACTION.PINCH'),
            (e.PINCH_END = 'INTERACTION.PINCH_END'),
            (e.ROTATE = 'INTERACTION.ROTATE'),
            (e.ROTATE_END = 'INTERACTION.ROTATE_END');
        })((n = e.InteractionType || (e.InteractionType = {}))),
        (function (e) {
          (e.INPUT = 'input'), (e.OUTPUT = 'output'), (e.EVENT = 'event'), (e.EMIT = 'emit');
        })((a = e.PathType || (e.PathType = {})));
    })(y || (y = {})),
    (function (e) {
      (e[(e.BACKSPACE = 8)] = 'BACKSPACE'),
        (e[(e.TAB = 9)] = 'TAB'),
        (e[(e.RETURN = 13)] = 'RETURN'),
        (e[(e.SHIFT = 16)] = 'SHIFT'),
        (e[(e.CONTROL = 17)] = 'CONTROL'),
        (e[(e.ALT = 18)] = 'ALT'),
        (e[(e.ESCAPE = 27)] = 'ESCAPE'),
        (e[(e.SPACE = 32)] = 'SPACE'),
        (e[(e.HASH = 35)] = 'HASH'),
        (e[(e.LEFTARROW = 37)] = 'LEFTARROW'),
        (e[(e.UPARROW = 38)] = 'UPARROW'),
        (e[(e.RIGHTARROW = 39)] = 'RIGHTARROW'),
        (e[(e.DOWNARROW = 40)] = 'DOWNARROW'),
        (e[(e.DELETE = 46)] = 'DELETE'),
        (e[(e.ZERO = 48)] = 'ZERO'),
        (e[(e.ONE = 49)] = 'ONE'),
        (e[(e.TWO = 50)] = 'TWO'),
        (e[(e.THREE = 51)] = 'THREE'),
        (e[(e.FOUR = 52)] = 'FOUR'),
        (e[(e.FIVE = 53)] = 'FIVE'),
        (e[(e.SIX = 54)] = 'SIX'),
        (e[(e.SEVEN = 55)] = 'SEVEN'),
        (e[(e.EIGHT = 56)] = 'EIGHT'),
        (e[(e.NINE = 57)] = 'NINE'),
        (e[(e.AT = 64)] = 'AT'),
        (e[(e.A = 65)] = 'A'),
        (e[(e.B = 66)] = 'B'),
        (e[(e.C = 67)] = 'C'),
        (e[(e.D = 68)] = 'D'),
        (e[(e.E = 69)] = 'E'),
        (e[(e.F = 70)] = 'F'),
        (e[(e.G = 71)] = 'G'),
        (e[(e.H = 72)] = 'H'),
        (e[(e.I = 73)] = 'I'),
        (e[(e.J = 74)] = 'J'),
        (e[(e.K = 75)] = 'K'),
        (e[(e.L = 76)] = 'L'),
        (e[(e.M = 77)] = 'M'),
        (e[(e.N = 78)] = 'N'),
        (e[(e.O = 79)] = 'O'),
        (e[(e.P = 80)] = 'P'),
        (e[(e.Q = 81)] = 'Q'),
        (e[(e.R = 82)] = 'R'),
        (e[(e.S = 83)] = 'S'),
        (e[(e.T = 84)] = 'T'),
        (e[(e.U = 85)] = 'U'),
        (e[(e.V = 86)] = 'V'),
        (e[(e.W = 87)] = 'W'),
        (e[(e.X = 88)] = 'X'),
        (e[(e.Y = 89)] = 'Y'),
        (e[(e.Z = 90)] = 'Z'),
        (e[(e.SEMICOLON = 186)] = 'SEMICOLON'),
        (e[(e.PLUSEQUALS = 187)] = 'PLUSEQUALS'),
        (e[(e.COMMA = 188)] = 'COMMA'),
        (e[(e.DASHUNDERSCORE = 189)] = 'DASHUNDERSCORE'),
        (e[(e.PERIOD = 190)] = 'PERIOD'),
        (e[(e.OPENBRACKET = 219)] = 'OPENBRACKET');
    })(I || (I = {})),
    (function (e) {
      (e[(e.DOWN = 0)] = 'DOWN'), (e[(e.PRESSED = 1)] = 'PRESSED'), (e[(e.UP = 2)] = 'UP');
    })(T || (T = {})),
    (function (e) {
      (e[(e.PRIMARY = 0)] = 'PRIMARY'),
        (e[(e.MIDDLE = 1)] = 'MIDDLE'),
        (e[(e.SECONDARY = 2)] = 'SECONDARY'),
        (e[(e.BACK = 3)] = 'BACK'),
        (e[(e.FORWARD = 4)] = 'FORWARD'),
        (e[(e.COUNT = 5)] = 'COUNT');
    })(E || (E = {})),
    (function (e) {
      (e[(e.NONE = 0)] = 'NONE'),
        (e[(e.PRIMARY = 1)] = 'PRIMARY'),
        (e[(e.SECONDARY = 4)] = 'SECONDARY'),
        (e[(e.MIDDLE = 2)] = 'MIDDLE'),
        (e[(e.BACK = 8)] = 'BACK'),
        (e[(e.FORWARD = 16)] = 'FORWARD'),
        (e[(e.ALL = 31)] = 'ALL');
    })(v || (v = {}));
  class A {
    constructor(e) {
      this.directionMap = {
        [o.Direction.FORWARD]: e.FORWARD.clone(),
        [o.Direction.LEFT]: e.LEFT.clone(),
        [o.Direction.RIGHT]: e.RIGHT.clone(),
        [o.Direction.BACK]: e.BACK.clone(),
        [o.Direction.UP]: e.UP.clone(),
        [o.Direction.DOWN]: e.DOWN.clone(),
      };
    }
    toVector(e) {
      return this.directionMap[e];
    }
  }
  class S {
    constructor(e) {
      this.CwfViewmode = e;
    }
    toSdk(e, t, n) {
      switch (e) {
        case this.CwfViewmode.Panorama:
          return t ? l.Mode.INSIDE : l.Mode.OUTSIDE;
        case this.CwfViewmode.Dollhouse:
          return n ? l.Mode.FLOORPLAN : l.Mode.DOLLHOUSE;
        case this.CwfViewmode.Floorplan:
          return l.Mode.FLOORPLAN;
        case this.CwfViewmode.Transition:
          return l.Mode.TRANSITIONING;
        case this.CwfViewmode.Outdoor:
          return l.Mode.OUTSIDE;
        default:
          return l.Mode.INSIDE;
      }
    }
    fromSdk(e) {
      switch (e) {
        case l.Mode.INSIDE:
        case l.Mode.OUTSIDE:
          return this.CwfViewmode.Panorama;
        case l.Mode.DOLLHOUSE:
          return this.CwfViewmode.Dollhouse;
        case l.Mode.FLOORPLAN:
          return this.CwfViewmode.Floorplan;
        case l.Mode.TRANSITIONING:
          return this.CwfViewmode.Transition;
      }
    }
  }
  class b {
    constructor(e) {
      this.CommandMode = e;
    }
    toSdk(e) {
      switch (e) {
        case this.CommandMode.INSIDE:
          return l.Mode.INSIDE;
        case this.CommandMode.DOLLHOUSE:
          return l.Mode.DOLLHOUSE;
        case this.CommandMode.FLOORPLAN:
          return l.Mode.FLOORPLAN;
        case this.CommandMode.TRANSITIONING:
          return l.Mode.TRANSITIONING;
        case this.CommandMode.OUTSIDE:
          return l.Mode.OUTSIDE;
        default:
          return l.Mode.INSIDE;
      }
    }
    fromSdk(e) {
      switch (e) {
        case l.Mode.INSIDE:
          return this.CommandMode.INSIDE;
        case l.Mode.OUTSIDE:
          return this.CommandMode.OUTSIDE;
        case l.Mode.DOLLHOUSE:
          return this.CommandMode.DOLLHOUSE;
        case l.Mode.FLOORPLAN:
          return this.CommandMode.FLOORPLAN;
        case l.Mode.TRANSITIONING:
          return this.CommandMode.TRANSITIONING;
      }
    }
  }
  !(function (e) {
    (e.INSTANT = 'transition.instant'),
      (e.FLY = 'transition.fly'),
      (e.FADEOUT = 'transition.fade'),
      (e.MOVEFADE = 'transition.movefade'),
      (e.ORBIT = 'transition.orbit');
  })(C || (C = {}));
  class D {
    constructor(e) {
      (this.toSdkTransitionMap = {
        [e.Interpolate]: C.FLY,
        [e.FadeToBlack]: C.FADEOUT,
        [e.Instant]: C.INSTANT,
        [e.MoveToBlack]: C.MOVEFADE,
        [e.OrbitTo]: C.ORBIT,
      }),
        (this.fromSdkTransitionMap = {
          [C.FLY]: e.Interpolate,
          [C.FADEOUT]: e.FadeToBlack,
          [C.INSTANT]: e.Instant,
          [C.MOVEFADE]: e.MoveToBlack,
          [C.ORBIT]: e.OrbitTo,
        });
    }
    toSdkTransition(e) {
      return this.toSdkTransitionMap[e];
    }
    fromSdkTransition(e) {
      return this.fromSdkTransitionMap[e];
    }
  }
  class O {
    constructor(e) {
      (this.THREE = e), (this.tempEuler = new e.Euler());
    }
    quaternionToRotation(e, t) {
      const n = this.tempEuler.setFromQuaternion(e, O.eulerOrder),
        a = t || {};
      return (
        (a.x = this.THREE.MathUtils.radToDeg(n.x)),
        (a.y = this.THREE.MathUtils.radToDeg(n.y)),
        (a.z = this.THREE.MathUtils.radToDeg(n.z)),
        a
      );
    }
    rotationToQuaternion(e, t) {
      const n = t || new this.THREE.Quaternion();
      return (
        (this.tempEuler.x = this.THREE.MathUtils.degToRad(e.x)),
        (this.tempEuler.y = this.THREE.MathUtils.degToRad(e.y)),
        (this.tempEuler.z = this.THREE.MathUtils.degToRad(e.z || 0)),
        (this.tempEuler.order = O.eulerOrder),
        n.setFromEuler(this.tempEuler)
      );
    }
  }
  O.eulerOrder = 'YXZ';
  class N {
    constructor(e) {
      this.CwfSweepAlignmentType = e;
    }
    isSweepAligned(e, t) {
      if (!e || !t) return !1;
      const n = t && e.getSweep(t);
      return !!n && n.alignmentType === this.CwfSweepAlignmentType.ALIGNED;
    }
    isCurrentSweepAligned(e) {
      return this.isSweepAligned(e, e.currentSweep);
    }
  }
  class M {
    constructor(e) {
      this.sweepData = e;
    }
    getIdForSweep(e) {
      return e.id;
    }
    getSweepForId(e) {
      return this.sweepData.getSweep(e);
    }
    getIdFromCwfId(e) {
      const t = this.sweepData.getSweep(e);
      return this.getIdForSweep(t);
    }
  }
  class R {
    constructor(e) {
      this.floorData = e;
    }
    getIdForFloor(e) {
      return e.id;
    }
    getFloorForId(e) {
      return this.floorData.getFloor(e);
    }
    getIdFromCwfId(e) {
      const t = this.floorData.getFloor(e);
      return this.getIdForFloor(t);
    }
  }
  class P {
    constructor(e) {
      this.roomData = e;
    }
    getIdForRoom(e) {
      return e.id;
    }
    getRoomForId(e) {
      return this.roomData.get(e);
    }
    getIdFromCwfId(e) {
      const t = this.roomData.get(e);
      return this.getIdForRoom(t);
    }
  }
  class L {
    constructor() {
      this.observers = new Set();
    }
    observe(e) {
      this.observers.add(e);
      const t = this;
      return {
        renew() {
          t.observers.add(e);
        },
        cancel() {
          t.removeObserver(e);
        },
      };
    }
    removeObserver(e) {
      this.observers.delete(e);
    }
    notify() {
      for (const e of this.observers) e.notify();
    }
  }
  class x {
    constructor(...e) {
      (this.fulfilledOptionals = []), (this.observable = new L()), (this.dependencies = e || []);
    }
    static createWithOptionals(e, t) {
      const n = new x(...e);
      n.fulfilledOptionals.length = t.length;
      for (let e = 0; e < t.length; ++e) {
        let a;
        n.fulfilledOptionals[e] = { get: () => a };
        const o = t[e];
        Promise.all([o]).then(([e]) => {
          (a = e), n.notify();
        });
      }
      return n;
    }
    static getBuilder() {
      class e {
        constructor() {
          (this.dependencies = []), (this.optionals = []);
        }
        addDependencies(...t) {
          const n = new e(),
            a = [...this.dependencies, ...t];
          return (n.dependencies = a), (n.optionals = this.optionals), n;
        }
        addOptionals(...t) {
          const n = new e(),
            a = [...this.optionals, ...t];
          return (n.dependencies = this.dependencies), (n.optionals = a), n;
        }
        build() {
          return x.createWithOptionals(this.dependencies, this.optionals);
        }
      }
      return new e();
    }
    static get none() {
      return this._none;
    }
    async getDependencies() {
      return Promise.all(this.dependencies);
    }
    getOptionals() {
      return this.fulfilledOptionals;
    }
    onOptionalsFulfilled(e) {
      return this.observable.observe({ notify: e });
    }
    notify() {
      this.observable.notify();
    }
    static extend(e, ...t) {
      return new x(...e.dependencies, ...t);
    }
    static combine(e, t) {
      return new x(...e.dependencies, ...t.dependencies);
    }
  }
  x._none = new x();
  class _ {
    constructor(e, ...t) {
      (this.ctor = e), (this.args = t);
    }
    create(...e) {
      return new this.ctor(...this.args, ...e);
    }
  }
  const k = window.navigationStart || Date.now();
  var V;
  !(function (e) {
    (e[(e.ERROR = 0)] = 'ERROR'),
      (e[(e.WARN = 1)] = 'WARN'),
      (e[(e.INFO = 2)] = 'INFO'),
      (e[(e.DEBUG = 3)] = 'DEBUG');
  })(V || (V = {}));
  class U {
    constructor(e) {
      (this.timers = {}),
        (this.handlers = {
          [V.DEBUG]: console.debug,
          [V.INFO]: console.info,
          [V.WARN]: console.warn,
          [V.ERROR]: console.error,
        });
      const t = e.split(new RegExp('/|\\\\'));
      this.prefix = '[' + t[t.length - 1].replace('.js', '') + ']';
    }
    message(e) {
      if (U.level >= e && console) {
        return (this.handlers[e] ? this.handlers[e] : console.log).bind(console, this.getPrefix());
      }
      return () => {};
    }
    get debug() {
      return this.message(V.DEBUG);
    }
    get devInfo() {
      return () => {};
    }
    get debugInfo() {
      return this.debug;
    }
    get debugWarn() {
      return this.message(U.level >= V.DEBUG ? V.WARN : V.DEBUG);
    }
    get info() {
      return this.message(V.INFO);
    }
    get warn() {
      return this.message(V.WARN);
    }
    get error() {
      return this.message(V.ERROR);
    }
    time(e) {
      U.level >= V.DEBUG && (this.timers[e] = Date.now());
    }
    timeEnd(e) {
      if (U.level >= V.DEBUG) {
        const t = this.timers[e];
        if (!t) return;
        const n = (Date.now() - t) / 1e3;
        this.debug(e, n + 's');
      }
    }
    getPrefix() {
      const e = (Date.now() - k) / 1e3 + 's';
      return `${this.prefix} ${e}`;
    }
  }
  U.level = V.INFO;
  const F = new U('sdk command');
  class G {
    constructor(e) {
      this._executor = e;
    }
    static async create(e, t) {
      const n = await e.getDependencies(),
        a = e.getOptionals();
      return new G(t.create(...n, ...a));
    }
    get executor() {
      return this._executor;
    }
    validateInput(e, t) {
      return this.executor.validateInput(e, t);
    }
    exec(e, t) {
      const n = this.executor.validateInput(e, t);
      return this.executor.exec(n, t);
    }
  }
  function H(e, t, n) {
    return `'${e}' is expected to be a(n) ${t}; got '${JSON.stringify(n)}'`;
  }
  function B(e, t, n) {
    return e.validateInput(t, n);
  }
  function z(e, t, n) {
    return e.exec(t, n);
  }
  async function W(e, t) {
    return new (class {
      constructor(e) {
        this.command = e;
      }
      validateInput(e, t) {
        return B(this.command, e, t);
      }
      exec(e, n) {
        return F.warn(t), this.command.exec(e, n);
      }
    })(await e);
  }
  function j(e) {
    return !!e && 'string' == typeof e;
  }
  function $(e) {
    return 'string' == typeof e;
  }
  const q = [
    'dev-app.matterport.com',
    'dev-app.matterportvr.cn',
    'qa3-app.matterport.com',
    'qa3-app.matterportvr.cn',
    'gc1-app.matterport.com',
    'my.matterport.com',
    'my.matterportvr.cn',
    'showcase-next.matterport.com',
    'static.matterport.com',
    'static.matterportvr.cn',
    'static.matterport.us',
    'matterport.github.io',
    '127.0.0.1',
    'localhost',
  ];
  class K {
    constructor(e) {
      this.getModelViewsQuery = e;
    }
    validateInput(e, t) {
      return (
        j(e.spaceSid) || this.throw(H('spaceSid', 'string', e.spaceSid)), { spaceSid: e.spaceSid }
      );
    }
    async exec(e, t) {
      return await this.getModelViewsQuery(e.spaceSid);
    }
    throw(e) {
      throw Error('Api.getViews: ' + e);
    }
  }
  class Y {
    constructor(t) {
      (this.toSdkPhaseMap = {
        [t.UNINITIALIZED]: e.Phase.UNINITIALIZED,
        [t.WAITING]: e.Phase.WAITING,
        [t.LOADING]: e.Phase.LOADING,
        [t.STARTING]: e.Phase.STARTING,
        [t.PLAYING]: e.Phase.PLAYING,
        [t.ERROR]: e.Phase.ERROR,
      }),
        (this.fromSdkPhaseMap = {
          [e.Phase.UNINITIALIZED]: t.UNINITIALIZED,
          [e.Phase.WAITING]: t.WAITING,
          [e.Phase.LOADING]: t.LOADING,
          [e.Phase.STARTING]: t.STARTING,
          [e.Phase.PLAYING]: t.PLAYING,
          [e.Phase.ERROR]: t.ERROR,
        });
    }
    toSdkAppPhase(e) {
      return this.toSdkPhaseMap[e];
    }
    fromSdkAppPhase(e) {
      return this.fromSdkPhaseMap[e];
    }
  }
  class X {
    constructor(t) {
      (this.toSdkApplicationMap = {
        [t.SHOWCASE]: e.Application.SHOWCASE,
        [t.WORKSHOP]: e.Application.WORKSHOP,
        [t.WEBVR]: e.Application.WEBVR,
        [t.UNKNOWN]: e.Application.UNKNOWN,
      }),
        (this.fromSdkApplicationMap = {
          [e.Application.SHOWCASE]: t.SHOWCASE,
          [e.Application.WORKSHOP]: t.WORKSHOP,
          [e.Application.WEBVR]: t.WEBVR,
          [e.Application.UNKNOWN]: t.UNKNOWN,
        });
    }
    toSdkApplication(e) {
      return this.toSdkApplicationMap[e];
    }
    fromSdkApplication(e) {
      return this.fromSdkApplicationMap[e];
    }
  }
  class Z {
    constructor(e, t, n, a) {
      (this.dependencies = e),
        (this.optionals = t),
        (this.subscriptionFactory = n),
        (this.observers = new Set()),
        (this.currentData = a.create()),
        (this.freshDataCache = a.create());
    }
    static async create(e, t, n) {
      const a = await e.getDependencies();
      return new Z(a, e, t, n);
    }
    getData() {
      return this.currentData.data;
    }
    subscribe(e) {
      return (
        this.addObserver(e),
        new (class {
          constructor(e) {
            (this.sdkObservable = e), this.renew();
          }
          renew() {
            this.sdkObservable.addObserver(e);
          }
          cancel() {
            this.sdkObservable.removeObserver(e);
          }
        })(this)
      );
    }
    addObserver(e) {
      if (!this.observers.has(e)) {
        class t {
          constructor(e) {
            this.observable = e;
          }
          onChanged() {
            this.observable.onChanged();
          }
        }
        if ((this.observers.add(e), 1 === this.observers.size)) {
          const e = () => {
            const e = this.optionals.getOptionals();
            this.currentData.update(...this.dependencies, ...e),
              (this.changeSubscription = this.subscriptionFactory.create(
                new t(this),
                ...this.dependencies,
                ...e,
              ));
          };
          (this.dependencySubscription = this.optionals.onOptionalsFulfilled(() => {
            var t;
            null === (t = this.changeSubscription) || void 0 === t || t.cancel(), e();
          })),
            e();
        }
        e.dirty = !0;
      }
    }
    removeObserver(e) {
      0 !== this.observers.size &&
        (this.observers.delete(e),
        0 === this.observers.size &&
          (this.dependencySubscription.cancel(), this.changeSubscription.cancel()));
    }
    onChanged() {
      if (
        (this.freshDataCache.update(...this.dependencies, ...this.optionals.getOptionals()),
        !this.currentData.equals(this.freshDataCache))
      ) {
        this.currentData.copy(this.freshDataCache);
        for (const e of this.observers) e.dirty = !0;
      }
    }
  }
  const Q = (e) =>
      'propertyObservers' === e ||
      'changeObservers' === e ||
      'isObservable' === e ||
      'childChangeFunctions' === e ||
      'isObservableProxy' === e ||
      'diffRoot' === e ||
      'elementChangedHandlers' === e ||
      'knownKeysMap' === e ||
      'knownKeysList' === e ||
      'isVector2' === e ||
      'isVector3' === e ||
      'isQuaternion' === e ||
      'onPropertyChanged' === e ||
      'removeOnPropertyChanged' === e ||
      'onChanged' === e ||
      'target' === e,
    J = (e, t = []) => {
      if (void 0 !== e) {
        if (t.includes(e)) return Array.isArray(e) || ArrayBuffer.isView(e) ? [] : {};
        if (e instanceof Date) return new Date(e);
        if (null === e) return null;
        if (e.deepCopy) return e.deepCopy();
        if (e.isQuaternion) return { x: e.x, y: e.y, z: e.z, w: e.w };
        if ('object' == typeof e) {
          const n = Array.isArray(e) || ArrayBuffer.isView(e) ? [] : {};
          for (const a in e) {
            if (Q(a)) continue;
            const o = e[a];
            o instanceof Date
              ? (n[a] = new Date(o))
              : 'function' != typeof o &&
                (t.push(e), (n[a] = 'object' == typeof o ? J(o, t) : o), t.pop());
          }
          return n;
        }
        return e;
      }
    },
    ee = (e, t) => {
      if (null === e || 'object' != typeof e) return e !== t;
      if (!t) return !0;
      for (const n in t) if (!(n in e)) return !0;
      for (const n in e) if (ee(e[n], t[n])) return !0;
      return !1;
    };
  class te {
    create(e, t) {
      return t.onChanged(() => e.onChanged());
    }
  }
  class ne {
    constructor(t, n) {
      (this._data = {
        phase: e.Phase.UNINITIALIZED,
        phaseTimes: {},
        application: e.Application.SHOWCASE,
      }),
        (this.AppPhase = t.AppPhase),
        (this.appPhaseConverter = n.appPhaseConverter),
        (this.applicationConverter = n.applicationConverter);
    }
    get data() {
      return this._data;
    }
    equals(e) {
      return !ee(this, e);
    }
    copy(e) {
      (this._data.phase = e.data.phase),
        (function (e, t, ...n) {
          for (const a of n) e[a] = t[a];
        })(this.data.phaseTimes, e.data.phaseTimes),
        (this._data.application = e.data.application);
    }
    update(t) {
      (this._data.phase = this.appPhaseConverter.toSdkAppPhase(t.phase)),
        (this._data.application = this.applicationConverter.toSdkApplication(t.application)),
        (this._data.phaseTimes[e.Phase.WAITING] = t.phaseTimes[this.AppPhase.WAITING]),
        (this._data.phaseTimes[e.Phase.LOADING] = t.phaseTimes[this.AppPhase.LOADING]),
        (this._data.phaseTimes[e.Phase.PLAYING] = t.phaseTimes[this.AppPhase.PLAYING]),
        (this._data.phaseTimes[e.Phase.STARTING] = t.phaseTimes[this.AppPhase.STARTING]),
        (this._data.phaseTimes[e.Phase.UNINITIALIZED] = t.phaseTimes[this.AppPhase.UNINITIALIZED]),
        (this._data.phaseTimes[e.Phase.ERROR] = t.phaseTimes[this.AppPhase.ERROR]);
    }
  }
  class ae {
    get id() {
      return this.constructor.id;
    }
  }
  class oe extends ae {
    constructor() {
      super();
    }
  }
  oe.id = 'GET_APP_STATE';
  class se extends ae {
    constructor() {
      super();
    }
  }
  se.id = 'GET_APP_PHASE_TIMES';
  var ie;
  !(function (e) {
    (e.DefurnishView = 'defurnish_view'),
      (e.PresentedBy = 'presented_by'),
      (e.HighlightReel = 'highlight_reel'),
      (e.FloorPlan = 'floor_plan'),
      (e.RoomBounds = 'room_bounds'),
      (e.TourButtons = 'tour_buttons'),
      (e.Labels = 'labels'),
      (e.LabelsDollhouse = 'labels_dh'),
      (e.Measurements = 'measurements'),
      (e.FloorSelect = 'floor_select'),
      (e.SavedMeasurements = 'measurements_saved'),
      (e.Dollhouse = 'dollhouse'),
      (e.InstantTransitions = 'fast_transitions'),
      (e.TransitionSpeed = 'transition_speed'),
      (e.TransitionTime = 'transition_time'),
      (e.PanSpeed = 'pan_speed'),
      (e.DollhousePanSpeed = 'dollhouse_pan_speed'),
      (e.ZoomDuration = 'zoom_duration'),
      (e.PanAngle = 'pan_angle'),
      (e.PanDirection = 'pan_direction'),
      (e.Units = 'unit_type'),
      (e.DetailsEmail = 'contact_email'),
      (e.DetailsAddress = 'address'),
      (e.DetailsName = 'contact_name'),
      (e.DetailsSummary = 'model_summary'),
      (e.DetailsPhone = 'contact_phone'),
      (e.DetailsModelName = 'model_name'),
      (e.DetailsExternalUrl = 'external_url'),
      (e.BackgroundColor = 'background_color'),
      (e.SpaceSearch = 'space_search');
  })(ie || (ie = {}));
  function re(e) {
    const t = e.tryGetProperty(ie.RoomBounds, !1),
      n = e.tryGetProperty(ie.FloorPlan, !1) || e.tryGetProperty(ie.Dollhouse, !1);
    return t && n;
  }
  class ce {
    constructor(...e) {
      this.subs = e;
    }
    renew() {
      for (const e of this.subs) e.renew();
    }
    cancel() {
      for (const e of this.subs) e.cancel();
    }
  }
  class de {
    constructor() {
      (this.rooms = 0), (this.rbError = !1);
    }
    create(e, t, n) {
      return new ce(
        t.onChanged(() => this.throttleSettingsDataChanges(e, t)),
        n.onChanged(() => this.throttleRoomBoundDataChanges(e, n)),
      );
    }
    throttleRoomBoundDataChanges(e, t) {
      const n = t.rooms.size;
      this.rooms !== n && e.onChanged();
    }
    throttleSettingsDataChanges(e, t) {
      const n = t.tryGetProperty('SETTING_RB_ERROR_GETTING_USER_VIEW', !1);
      this.rbError !== n && e.onChanged();
    }
  }
  class le {
    constructor() {
      this._data = { [e.Feature.RoomBounds]: void 0 };
    }
    get data() {
      return this._data;
    }
    equals(e) {
      return Object.entries(e.data).every(([e, t]) => this.data[e] === t);
    }
    copy(e) {
      for (const [t, n] of Object.entries(e.data)) this.data[t] = n;
    }
    update(t, n) {
      const a = t.tryGetProperty('SETTING_RB_ERROR_GETTING_USER_VIEW', !1),
        o = n.rooms.size;
      this.data[e.Feature.RoomBounds] = re(t) && !a && o > 0;
    }
  }
  class he {
    constructor(e) {
      this.localeInterface = e;
    }
    validateInput(e, t) {
      return e;
    }
    async exec(e, t) {
      return this.localeInterface.languageCode;
    }
  }
  var ue, pe, me;
  !(function (e) {
    (e.POSTMESSAGE = 'postmessage'), (e.DIRECT = 'direct'), (e.WEBSOCKET = 'websocket');
  })(ue || (ue = {}));
  class ge {
    constructor(e) {
      this.localeInterface = e;
    }
    validateInput(e, t) {
      return e;
    }
    async exec(e, t) {
      return this.localeInterface.t.bind(this.localeInterface);
    }
  }
  !(function (e) {
    (e[(e.LOW = 0)] = 'LOW'),
      (e[(e.MEDIUM = 1)] = 'MEDIUM'),
      (e[(e.HIGH = 2)] = 'HIGH'),
      (e[(e.HIGHEST = 3)] = 'HIGHEST');
  })(pe || (pe = {})),
    (function (e) {
      (e[(e.PENDING = 0)] = 'PENDING'),
        (e[(e.SENDING = 1)] = 'SENDING'),
        (e[(e.FAILED = 2)] = 'FAILED'),
        (e[(e.DONE = 3)] = 'DONE');
    })(me || (me = {}));
  const fe = new WeakMap();
  class we {
    constructor({ retries: e = 0, concurrency: t = 6 } = {}) {
      (this.totalBytesDownloaded = 0),
        (this.queue = []),
        (this.retries = e),
        (this.concurrency = t);
    }
    get(e, t) {
      return this.request('GET', e, t);
    }
    head(e, t) {
      return this.request('HEAD', e, t);
    }
    options(e, t) {
      return this.request('OPTIONS', e, t);
    }
    post(e, t) {
      return this.request('POST', e, t);
    }
    put(e, t) {
      return this.request('PUT', e, t);
    }
    patch(e, t) {
      return this.request('PATCH', e, t);
    }
    delete(e, t) {
      return this.request('DELETE', e, t);
    }
    request(e, t, n) {
      const a = new ye(e, t, n);
      if (null == n ? void 0 : n.signal) {
        const e = () => {
          this.queue.includes(a) &&
            (a.status === me.SENDING && a.abort(),
            this.dequeue(a),
            a.onFail(new DOMException('Aborted', 'AbortError')));
        };
        n.signal.addEventListener('abort', e),
          fe.set(a, () => {
            var t;
            null === (t = n.signal) || void 0 === t || t.removeEventListener('abort', e),
              fe.delete(a);
          });
      }
      return this.enqueue(a), a.promise;
    }
    update() {
      let e;
      for (; (e = this.getNextPendingRequest()); ) this.sendRequest(e);
      for (; (e = this.getNextOverflowingGet()); ) e.abort(), (e.status = me.PENDING);
      this.updateTimeout = null;
    }
    enqueue(e) {
      let t = 0;
      for (t = 0; t < this.queue.length; t++) {
        if (this.queue[t].priority < e.priority) break;
      }
      this.queue.splice(t, 0, e),
        this.updateTimeout ||
          (this.updateTimeout = window.setTimeout(() => {
            this.update();
          }, 1));
    }
    dequeue(e) {
      var t;
      null === (t = fe.get(e)) || void 0 === t || t();
      const n = this.queue.indexOf(e);
      if (-1 === n) throw new Error("Can't dequeue request not in queue");
      this.queue.splice(n, 1), this.update();
    }
    getNextPendingRequest() {
      for (let e = 0; e < this.queue.length && e < this.concurrency; e++) {
        const t = this.queue[e];
        if (t.status === me.PENDING) return t;
      }
      return null;
    }
    getNextOverflowingGet() {
      for (let e = this.concurrency; e < this.queue.length; e++) {
        const t = this.queue[e];
        if (t.status === me.SENDING && t.priority !== pe.HIGHEST && 'GET' === t.method) return t;
      }
      return null;
    }
    shouldRetryStatusCode(e) {
      return !we.doNotRetryStatusCodes[e];
    }
    sendRequest(e) {
      (e.status = me.SENDING),
        e
          .send()
          .then((t) => {
            (e.status = me.DONE),
              this.dequeue(e),
              e.contentLength &&
                e.contentLength > 0 &&
                (this.totalBytesDownloaded += Number(e.contentLength)),
              e.onDone(t);
          })
          .catch((t) => {
            const n = null !== e.maxRetries ? e.maxRetries : this.retries;
            let a = e.sendAttempts < n;
            if ('object' == typeof t) {
              const e = t.status_code || 0;
              a = a && this.shouldRetryStatusCode(e);
            }
            a
              ? ((e.status = me.PENDING),
                this.update(),
                console.warn(`Retried ${e.url}`),
                console.warn(t))
              : ((e.status = me.FAILED),
                this.dequeue(e),
                console.warn(`Failed ${e.url}`),
                e.onFail(t));
          });
    }
  }
  we.doNotRetryStatusCodes = {
    400: !0,
    401: !0,
    403: !0,
    404: !0,
    405: !0,
    406: !0,
    410: !0,
    411: !0,
    414: !0,
    415: !0,
    421: !0,
    431: !0,
    451: !0,
  };
  class ye {
    constructor(e, t, n = {}) {
      (this.sendAttempts = 0),
        (this.status = me.PENDING),
        (this.contentLength = 0),
        (this.isAborting = !1),
        (this.url = t),
        (this.method = e),
        (this.auth = n.auth || null),
        (this.withCredentials = n.withCredentials || !1),
        (this.priority = n.priority || pe.MEDIUM),
        (this.responseType = n.responseType || null),
        (this.body = n.body || null),
        (this.headers = n.headers || {}),
        (this.maxRetries = n.maxRetries || null),
        (this.onProgress = n.onProgress),
        (this.promise = new Promise((e, t) => {
          (this.onDone = e), (this.onFail = t);
        }));
    }
    send() {
      const e = (this.xhr = (function (e, t, n) {
        let a;
        if ('undefined' != typeof XMLHttpRequest)
          (a = new XMLHttpRequest()), (a.withCredentials = n);
        else {
          if ('undefined' == typeof XDomainRequest)
            throw new Error(
              'No XMLHTTPRequest or XDomainRequest... are you trying to run me in node? :(',
            );
          a = new XDomainRequest();
        }
        return a.open(e, t, !0), a;
      })(this.method, this.url, this.withCredentials));
      if (this.responseType)
        if (
          'arraybuffer' === this.responseType ||
          'text' === this.responseType ||
          'json' === this.responseType ||
          'blob' === this.responseType
        )
          e.responseType = this.responseType;
        else {
          if ('image' !== this.responseType)
            throw new Error(
              'reponseType can only be one of "arraybuffer", "text", "json", "blob", "image"',
            );
          e.responseType = 'blob';
        }
      'json' === this.responseType && e.setRequestHeader('Accept', 'application/json'),
        this.auth && 'string' == typeof this.auth && e.setRequestHeader('Authorization', this.auth);
      for (const t in this.headers) e.setRequestHeader(t, this.headers[t]);
      return (
        this.body &&
          'object' == typeof this.body &&
          (this.body instanceof FormData ||
            ((this.body = JSON.stringify(this.body)),
            e.setRequestHeader('Content-Type', 'application/json'))),
        this.onProgress && (e.onprogress = this.onProgress),
        new Promise((t, n) => {
          (e.onreadystatechange = () => {
            if (4 === e.readyState) {
              if (200 === e.status || 201 === e.status || 204 === e.status)
                return this.parseResponse(this.xhr).then((e) => {
                  t(e);
                });
              if (!this.isAborting)
                return this.parseResponse(this.xhr)
                  .then((t) => {
                    n(Object.assign({ status_code: e.status }, t));
                  })
                  .catch(() => {
                    n({ status_code: e.status });
                  });
              this.isAborting = !1;
            }
          }),
            (e.onerror = function (e) {
              n(e);
            }),
            e.send(this.body),
            this.sendAttempts++;
        })
      );
    }
    parseResponse(e) {
      return new Promise((t, n) => {
        var a;
        try {
          if (!e)
            throw new Error(
              `No request received. Trying ${this.method} on ${this.url} and expecting ${this.responseType}, but request was ${this.xhr}`,
            );
          let n = e.response;
          if (
            ((this.contentLength = parseInt(
              null !== (a = e.getResponseHeader('Content-Length')) && void 0 !== a ? a : '0',
              10,
            )),
            'json' === this.responseType && 'object' != typeof n)
          )
            t(JSON.parse(e.responseText));
          else if (
            (200 !== e.status && 201 !== e.status && 204 !== e.status) ||
            'image' !== this.responseType
          )
            t(n);
          else {
            const e = URL.createObjectURL(n);
            (n = new Image()),
              (n.onload = function () {
                URL.revokeObjectURL(e), t(n);
              }),
              (n.src = e),
              (n.crossOrigin = 'Anonymous');
          }
        } catch (e) {
          n({ error: 'Payload was not valid JSON' });
        }
      });
    }
    abort() {
      if (null === this.xhr) throw new Error('Cannot abort unsent Request');
      (this.isAborting = !0), this.xhr.abort();
    }
  }
  class Ie {
    constructor() {
      (this.base = new Promise((e, t) => {
        (this.resolver = e), (this.rejecter = t);
      })),
        (this._promise = new Te(this.base, this)),
        (this.progressCallbacks = []);
    }
    then(e, t) {
      return this.base.then(e, t);
    }
    catch(e) {
      return this.base.catch(e);
    }
    resolve(e) {
      return this.resolver(e), this;
    }
    reject(e) {
      return this.rejecter(e), this;
    }
    notify(e) {
      for (const t of this.progressCallbacks) t(e);
    }
    progress(e) {
      return this.progressCallbacks.push(e), this;
    }
    promise() {
      return this._promise;
    }
    nativePromise() {
      return this.base;
    }
    static resolve() {
      const e = new Ie();
      return e.resolve(), e.promise();
    }
    static reject(e) {
      const t = new Ie();
      return t.reject(e), t.promise();
    }
    static all(e) {
      const t = [];
      for (const n of e) n.nativePromise ? t.push(n.nativePromise()) : t.push(n);
      const n = new Ie();
      return (
        Promise.all(t).then(
          (e) => n.resolve(e),
          (e) => n.reject(e),
        ),
        n.promise()
      );
    }
  }
  class Te {
    constructor(e, t) {
      (this.basePromise = e), (this.baseDeferred = t);
    }
    then(e, t) {
      return this.baseDeferred.then(e, t), this;
    }
    catch(e) {
      return this.baseDeferred.catch(e), this;
    }
    progress(e) {
      return this.baseDeferred.progress(e), this;
    }
    nativePromise() {
      return this.basePromise;
    }
  }
  const Ee = new U('asset.registerTexture');
  class ve {
    constructor(e, t, n) {
      (this.THREE = e),
        (this.loadImage = t),
        (this.scopedTextures = n),
        (this.svgLoader = new Ce(new we()));
    }
    validateInput(e, t) {
      const { textureId: n, textureSrc: a } = e;
      if (!j(n)) throw Error(`textureId ${n} is not a valid string`);
      if (!j(a)) throw Error(`textureSrc ${a} is not a valid string`);
      const o = this.scopedTextures.get(t.client.applicationKey);
      if (o) {
        if (o.map[n]) throw Error(n + ' already has a registered texture');
      }
      return { textureId: n, textureSrc: a };
    }
    async exec(e, t) {
      const { textureId: n, textureSrc: a } = e,
        o = this.scopedTextures.get(t.client.applicationKey) || { imagePromise: {}, map: {} };
      this.scopedTextures.set(t.client.applicationKey, o);
      const [s, i] = a.endsWith('.svg') ? this.loadSvgTexture(a) : this.loadImageTexture(a);
      o.imagePromise[n] = i;
      try {
        const e = await i;
        (s.image = e), (s.needsUpdate = !0), (o.map[n] = s);
      } catch (t) {
        throw (delete o.imagePromise[n], Error(`Failed to load ${e.textureSrc}`));
      }
    }
    loadImageTexture(e) {
      const t = new Ie(),
        n = this.loadImage(
          e,
          () => t.resolve(n.image),
          (e) => t.reject(e),
        );
      return [n, t.nativePromise()];
    }
    loadSvgTexture(e) {
      return [new this.THREE.Texture(), this.svgLoader.load(e)];
    }
  }
  class Ce {
    constructor(e) {
      this.queue = e;
    }
    async load(e) {
      const t = await this.queue.get(e, { responseType: 'text' }),
        n = document.createElement('div');
      n.innerHTML = t;
      const a = n.querySelector('svg');
      if (!a) throw Error('Failed trying to load ' + e + 'as an svg.');
      const o = a.getAttribute('width'),
        s = a.getAttribute('height');
      return (
        o || s
          ? (s &&
              !o &&
              (Ee.warn(e, 'does not have a defined width. Defaulting width equal to height'),
              a.setAttribute('width', s)),
            o &&
              !s &&
              (Ee.warn(e, 'does not have a defined height. Defaulting height equal to width'),
              a.setAttribute('height', o)))
          : (Ee.warn(e, 'does not have a defined size. Defaulting to a 128x128 resolution'),
            a.setAttribute('width', Ce.defaultResolution),
            a.setAttribute('height', Ce.defaultResolution)),
        new Promise((e) => {
          const t = new Image();
          (t.onload = () => e(t)),
            (t.src = URL.createObjectURL(new Blob([a.outerHTML], { type: 'image/svg+xml' })));
        })
      );
    }
  }
  Ce.defaultResolution = '128';
  const Ae = function (e) {
    let t = '';
    const n = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let a = 0; a < e; a++) t += n.charAt(Math.floor(Math.random() * n.length));
    return t;
  };
  (() => {
    const e = {};
  })();
  var Se,
    be,
    De,
    Oe,
    Ne,
    Me,
    Re,
    Pe,
    Le,
    xe,
    _e,
    ke,
    Ve,
    Ue,
    Fe,
    Ge,
    He,
    Be,
    ze,
    We,
    je,
    $e,
    qe,
    Ke,
    Ye,
    Xe,
    Ze,
    Qe,
    Je,
    et,
    tt,
    nt,
    at,
    ot,
    st,
    it,
    rt,
    ct,
    dt,
    lt,
    ht,
    ut,
    pt,
    mt,
    gt,
    ft,
    wt,
    yt,
    It,
    Tt,
    Et,
    vt,
    Ct,
    At,
    St,
    bt,
    Dt,
    Ot,
    Nt,
    Mt,
    Rt,
    Pt,
    Lt,
    xt,
    _t,
    kt,
    Vt,
    Ut,
    Ft,
    Gt,
    Ht,
    Bt,
    zt,
    Wt,
    jt,
    $t,
    qt,
    Kt,
    Yt,
    Xt,
    Zt,
    Qt,
    Jt,
    en,
    tn,
    nn,
    an,
    on,
    sn,
    rn,
    cn,
    dn,
    ln,
    hn,
    un,
    pn,
    mn,
    gn,
    fn,
    wn,
    yn,
    In,
    Tn,
    En,
    vn,
    Cn = n(635);
  !(function (e) {
    (e.NAME = 'NAME'),
      (e.ROLE = 'ROLE'),
      (e.TYPE = 'TYPE'),
      (e.USER_EMAIL = 'USER_EMAIL'),
      (e.USER_GROUP_NAME = 'USER_GROUP_NAME');
  })(Se || (Se = {})),
    (function (e) {
      (e.EMPTY = 'empty'), (e.PARSED = 'parsed'), (e.RAW = 'raw'), (e.VERIFIED = 'verified');
    })(be || (be = {})),
    (function (e) {
      (e.FULL = 'full'), (e.NONE = 'none'), (e.PARTIAL = 'partial');
    })(De || (De = {})),
    (function (e) {
      (e.FOREVER = 'FOREVER'), (e.LAST_7_DAYS = 'LAST_7_DAYS'), (e.LAST_30_DAYS = 'LAST_30_DAYS');
    })(Oe || (Oe = {})),
    (function (e) {
      (e.ESTIMATE = 'estimate'), (e.EXACT = 'exact'), (e.TRUNCATED = 'truncated');
    })(Ne || (Ne = {})),
    (function (e) {
      (e.COMPLETED = 'COMPLETED'),
        (e.FAILED = 'FAILED'),
        (e.OPENED = 'OPENED'),
        (e.PENDING = 'PENDING');
    })(Me || (Me = {})),
    (function (e) {
      (e.IMPRESSION = 'impression'), (e.MODELLOADED = 'modelLoaded');
    })(Re || (Re = {})),
    (function (e) {
      (e.LAST7DAYS = 'last7Days'), (e.LAST30DAYS = 'last30Days'), (e.LIFETIME = 'lifetime');
    })(Pe || (Pe = {})),
    (function (e) {
      (e.CREATED = 'created'),
        (e.IMPRESSIONS = 'impressions'),
        (e.NAME = 'name'),
        (e.UNIQUE_VISITORS = 'unique_visitors'),
        (e.VIEWS = 'views');
    })(Le || (Le = {})),
    (function (e) {
      (e.CAPTURE = 'capture'), (e.WORKSHOP = 'workshop');
    })(xe || (xe = {})),
    (function (e) {
      (e.LZMA = 'lzma'), (e.NONE = 'none');
    })(_e || (_e = {})),
    (function (e) {
      (e.AVAILABLE = 'available'), (e.LOCKED = 'locked'), (e.UNAVAILABLE = 'unavailable');
    })(ke || (ke = {})),
    (function (e) {
      (e.EXTERNAL = 'external'), (e.UPLOAD = 'upload');
    })(Ve || (Ve = {})),
    (function (e) {
      (e.IMAGE = 'image'), (e.PDF = 'pdf'), (e.RICH = 'rich'), (e.VIDEO = 'video'), (e.ZIP = 'zip');
    })(Ue || (Ue = {})),
    (function (e) {
      (e.PROVISIONED = 'provisioned'), (e.UPLOADED = 'uploaded');
    })(Fe || (Fe = {})),
    (function (e) {
      (e.LOCKED = 'locked'), (e.UNAVAILABLE = 'unavailable'), (e.UNLOCKED = 'unlocked');
    })(Ge || (Ge = {})),
    (function (e) {
      (e.V1 = 'v1'), (e.V2 = 'v2');
    })(He || (He = {})),
    (function (e) {
      (e.COMPLETED = 'completed'),
        (e.FAILED = 'failed'),
        (e.INPROGRESS = 'inprogress'),
        (e.ORDERED = 'ordered'),
        (e.PLACED = 'placed'),
        (e.PREVIEWABLE = 'previewable');
    })(Be || (Be = {})),
    (function (e) {
      (e.UNAVAILABLE = 'unavailable'),
        (e.UNKNOWN = 'unknown'),
        (e.UNLOCKED = 'unlocked'),
        (e.UNLOCKING = 'unlocking');
    })(ze || (ze = {})),
    (function (e) {
      (e.DOLLHOUSE = 'dollhouse'),
        (e.FLOORPLAN = 'floorplan'),
        (e.OUTDOOR = 'outdoor'),
        (e.PANORAMA = 'panorama'),
        (e.TRANSITION = 'transition'),
        (e.UNKNOWN = 'unknown');
    })(We || (We = {})),
    (function (e) {
      (e.WALL = 'wall'), (e.WINDOW = 'window');
    })(je || (je = {})),
    (function (e) {
      (e.HANDHELD = 'handheld'), (e.OTHER = 'other'), (e.PRO = 'pro'), (e.SPHERICAL = 'spherical');
    })($e || ($e = {})),
    (function (e) {
      (e.DUPLICATE = 'duplicate'), (e.FAIL = 'fail'), (e.REPLACE = 'replace'), (e.SKIP = 'skip');
    })(qe || (qe = {})),
    (function (e) {
      (e.CREATED = 'created'), (e.MODIFIED = 'modified');
    })(Ke || (Ke = {})),
    (function (e) {
      (e.FAST = 'fast'), (e.NORMAL = 'normal'), (e.URGENT = 'urgent');
    })(Ye || (Ye = {})),
    (function (e) {
      (e.ASPIRATIONAL = 'aspirational'),
        (e.CONVERSATIONAL = 'conversational'),
        (e.INFORMATIVE = 'informative');
    })(Xe || (Xe = {})),
    (function (e) {
      (e.KILOMETERS = 'kilometers'), (e.MILES = 'miles');
    })(Ze || (Ze = {})),
    (function (e) {
      (e.INVISIBLE = 'invisible'), (e.WALL = 'wall');
    })(Qe || (Qe = {})),
    (function (e) {
      e.CSV = 'CSV';
    })(Je || (Je = {})),
    (function (e) {
      (e.MATTERTAGS = 'Mattertags'), (e.NOTECOMMENTS = 'NoteComments'), (e.NOTES = 'Notes');
    })(et || (et = {})),
    (function (e) {
      (e.BLOCKED = 'blocked'),
        (e.DISABLED = 'disabled'),
        (e.GATED = 'gated'),
        (e.UNLOCKED = 'unlocked');
    })(tt || (tt = {})),
    (function (e) {
      (e.MAY = 'may'), (e.MUST = 'must'), (e.MUST_NOT = 'must_not');
    })(nt || (nt = {})),
    (function (e) {
      (e.ALPHA = 'alpha'),
        (e.COLORED_ROOMS = 'colored_rooms'),
        (e.MEASUREMENTS = 'measurements'),
        (e.PHOTOGRAMY = 'photogramy'),
        (e.SCHEMATIC = 'schematic');
    })(at || (at = {})),
    (function (e) {
      (e.ADMIN = 'Admin'),
        (e.FOLDERCREATOR = 'FolderCreator'),
        (e.FOLDERSHARES = 'FolderShares'),
        (e.USERGROUPFOLDERSHARES = 'UserGroupFolderShares');
    })(ot || (ot = {})),
    (function (e) {
      (e.ADDRESS = 'address'),
        (e.INTERNALID = 'internalId'),
        (e.MLSID = 'mlsId'),
        (e.MLSNAME = 'mlsName'),
        (e.STANDARD = 'standard');
    })(st || (st = {})),
    (function (e) {
      (e.USEREMAIL = 'UserEmail'), (e.USERGROUPID = 'UserGroupId'), (e.USERID = 'UserId');
    })(it || (it = {})),
    (function (e) {
      (e.ALL = 'all'), (e.ID = 'id'), (e.NAME = 'name');
    })(rt || (rt = {})),
    (function (e) {
      (e.CREATED = 'created'), (e.MODIFIED = 'modified'), (e.NAME = 'name');
    })(ct || (ct = {})),
    (function (e) {
      (e.CLIENT = 'client'),
        (e.GSV = 'gsv'),
        (e.PROCESSING = 'processing'),
        (e.UNKNOWN = 'unknown');
    })(dt || (dt = {})),
    (function (e) {
      (e.COMPLETE = 'COMPLETE'), (e.ERROR = 'ERROR'), (e.PENDING = 'PENDING');
    })(lt || (lt = {})),
    (function (e) {
      (e.REEL = 'reel'), (e.STORY = 'story');
    })(ht || (ht = {})),
    (function (e) {
      (e.CANCELLED = 'cancelled'),
        (e.COMPLETED = 'completed'),
        (e.CREATED = 'created'),
        (e.FAILED = 'failed'),
        (e.INPROGRESS = 'inprogress');
    })(ut || (ut = {})),
    (function (e) {
      (e.ANCHORLOCATION = 'AnchorLocation'),
        (e.HIGHLIGHTREEL = 'HighlightReel'),
        (e.LABEL = 'Label'),
        (e.MATTERTAG = 'Mattertag'),
        (e.MEASUREMENTPATH = 'MeasurementPath'),
        (e.MODELFLOOR = 'ModelFloor'),
        (e.MODELROOM = 'ModelRoom'),
        (e.NOTE = 'Note'),
        (e.OBJECTANNOTATION = 'ObjectAnnotation'),
        (e.ORDEREDLIST = 'OrderedList'),
        (e.PANORAMICIMAGELOCATION = 'PanoramicImageLocation'),
        (e.PHOTO = 'Photo');
    })(pt || (pt = {})),
    (function (e) {
      e.SHOWCASE = 'showcase';
    })(mt || (mt = {})),
    (function (e) {
      (e.PHOTO = 'photo'), (e.RICH = 'rich'), (e.VIDEO = 'video');
    })(gt || (gt = {})),
    (function (e) {
      (e.LINETYPE_2D = 'linetype_2D'), (e.LINETYPE_3D = 'linetype_3D');
    })(ft || (ft = {})),
    (function (e) {
      (e.DISABLED = 'disabled'), (e.MEASURE = 'measure'), (e.MEASUREANDVIEW = 'measureAndView');
    })(wt || (wt = {})),
    (function (e) {
      (e.FLOORS = 'floors'),
        (e.HIGHLIGHTREEL = 'highlightReel'),
        (e.IMAGE = 'image'),
        (e.LABELS = 'labels'),
        (e.MATTERTAGS = 'mattertags'),
        (e.MEASUREMENTPATHS = 'measurementPaths'),
        (e.ORDEREDLISTS = 'orderedLists'),
        (e.PLAYEROPTIONS = 'playerOptions'),
        (e.SWEEPS = 'sweeps');
    })(yt || (yt = {})),
    (function (e) {
      (e.FULL = 'full'), (e.PUBLIC = 'public'), (e.VIEWER = 'viewer');
    })(It || (It = {})),
    (function (e) {
      (e.ADMIN = 'Admin'),
        (e.MODELCREATOR = 'ModelCreator'),
        (e.MODELSHARES = 'ModelShares'),
        (e.USERGROUPMODELSHARES = 'UserGroupModelShares');
    })(Tt || (Tt = {})),
    (function (e) {
      (e.PASSWORD = 'password'),
        (e.PRIVATE = 'private'),
        (e.PUBLIC = 'public'),
        (e.UNLISTED = 'unlisted');
    })(Et || (Et = {})),
    (function (e) {
      (e.ACTIVE = 'active'),
        (e.ARCHIVED = 'archived'),
        (e.FLAGGED = 'flagged'),
        (e.PENDING = 'pending');
    })(vt || (vt = {})),
    (function (e) {
      (e.BLACK = 'black'), (e.GREY = 'grey'), (e.WHITE = 'white');
    })(Ct || (Ct = {})),
    (function (e) {
      (e.DEFAULT = 'default'), (e.MLS = 'mls'), (e.UNBRANDED = 'unbranded');
    })(At || (At = {})),
    (function (e) {
      (e.DESCRIPTION = 'description'), (e.SUMMARY = 'summary');
    })(St || (St = {})),
    (function (e) {
      (e.BUNDLE_COMPLETED = 'bundle_completed'),
        (e.BUNDLE_REQUESTED = 'bundle_requested'),
        (e.DELETED = 'deleted'),
        (e.INSERTED = 'inserted'),
        (e.PROCESSED = 'processed'),
        (e.REPLACED = 'replaced'),
        (e.UPDATED = 'updated'),
        (e.UPLOADED = 'uploaded');
    })(bt || (bt = {})),
    (function (e) {
      (e.ACTIVE = 'active'), (e.ARCHIVED = 'archived');
    })(Dt || (Dt = {})),
    (function (e) {
      (e.ID = 'id'), (e.INTERNALID = 'internalId'), (e.MLSID = 'mlsId');
    })(Ot || (Ot = {})),
    (function (e) {
      (e.DEFAULT = 'default'), (e.VR = 'vr');
    })(Nt || (Nt = {})),
    (function (e) {
      (e.COMPLETED = 'completed'),
        (e.FAILED = 'failed'),
        (e.PROCESSING = 'processing'),
        (e.STAGING = 'staging');
    })(Mt || (Mt = {})),
    (function (e) {
      (e.USEREMAIL = 'UserEmail'), (e.USERGROUPID = 'UserGroupId'), (e.USERID = 'UserId');
    })(Rt || (Rt = {})),
    (function (e) {
      (e.ACCESSVISIBILITY = 'accessVisibility'),
        (e.ADDRESS = 'address'),
        (e.CAMERA = 'camera'),
        (e.CAMERAMANUFACTURER = 'cameraManufacturer'),
        (e.CAMERAMODEL = 'cameraModel'),
        (e.DESCRIPTION = 'description'),
        (e.EXTENSIONTAG = 'extensiontag'),
        (e.GEODISTANCE = 'geoDistance'),
        (e.GEOREGION = 'geoRegion'),
        (e.ID = 'id'),
        (e.INTERNALID = 'internalId'),
        (e.MLSID = 'mlsId'),
        (e.MLSNAME = 'mlsName'),
        (e.NAME = 'name'),
        (e.STANDARD = 'standard'),
        (e.SUMMARY = 'summary'),
        (e.VISIONVERSION = 'visionVersion');
    })(Pt || (Pt = {})),
    (function (e) {
      (e.CREATED = 'created'),
        (e.INTERNALID = 'internalId'),
        (e.LAST7IMPRESSIONSEVENTCOUNT = 'last7ImpressionsEventCount'),
        (e.LAST7MODELSLOADEDEVENTCOUNT = 'last7ModelsLoadedEventCount'),
        (e.LAST7MODELSLOADEDUSERCOUNT = 'last7ModelsLoadedUserCount'),
        (e.LAST30IMPRESSIONSEVENTCOUNT = 'last30ImpressionsEventCount'),
        (e.LAST30MODELSLOADEDEVENTCOUNT = 'last30ModelsLoadedEventCount'),
        (e.LAST30MODELSLOADEDUSERCOUNT = 'last30ModelsLoadedUserCount'),
        (e.LIFETIMEIMPRESSIONSEVENTCOUNT = 'lifetimeImpressionsEventCount'),
        (e.LIFETIMEMODELSLOADEDEVENTCOUNT = 'lifetimeModelsLoadedEventCount'),
        (e.LIFETIMEMODELSLOADEDUSERCOUNT = 'lifetimeModelsLoadedUserCount'),
        (e.MLSID = 'mlsId'),
        (e.MODIFIED = 'modified'),
        (e.NAME = 'name'),
        (e.POSTALCODE = 'postalCode'),
        (e.SCORE = 'score');
    })(Lt || (Lt = {})),
    (function (e) {
      (e.COPY = 'copy'),
        (e.DEMO = 'demo'),
        (e.PROCESSING = 'processing'),
        (e.TRANSFER = 'transfer'),
        (e.UNKNOWN = 'unknown');
    })(xt || (xt = {})),
    (function (e) {
      (e.ACTIVATING = 'activating'),
        (e.ACTIVATION_PENDING = 'activation_pending'),
        (e.ACTIVE = 'active'),
        (e.FAILED = 'failed'),
        (e.INACTIVATING = 'inactivating'),
        (e.INACTIVATION_PENDING = 'inactivation_pending'),
        (e.INACTIVE = 'inactive'),
        (e.PENDING = 'pending'),
        (e.PROCESSING = 'processing'),
        (e.STAGING = 'staging');
    })(_t || (_t = {})),
    (function (e) {
      (e.ACTIVE = 'active'), (e.INACTIVE = 'inactive');
    })(kt || (kt = {})),
    (function (e) {
      (e.COPY = 'copy'), (e.DEMO = 'demo'), (e.ORIGINAL = 'original');
    })(Vt || (Vt = {})),
    (function (e) {
      (e.PRIVATE = 'private'), (e.PUBLIC = 'public');
    })(Ut || (Ut = {})),
    (function (e) {
      e.SERIAL = 'serial';
    })(Ft || (Ft = {})),
    (function (e) {
      (e.DOORWAY = 'doorway'), (e.OPENING = 'opening');
    })(Gt || (Gt = {})),
    (function (e) {
      (e.AUTO = 'auto'), (e.LEFT = 'left'), (e.RIGHT = 'right');
    })(Ht || (Ht = {})),
    (function (e) {
      (e.AUTO = 'auto'), (e.MANUAL = 'manual'), (e.UNPLACED = 'unplaced');
    })(Bt || (Bt = {})),
    (function (e) {
      (e.UPLOAD = 'upload'), (e.VISION = 'vision');
    })(zt || (zt = {})),
    (function (e) {
      (e.CYLINDRICAL = 'cylindrical'),
        (e.EQUIRECTANGULAR = 'equirectangular'),
        (e.SKYBOX = 'skybox');
    })(Wt || (Wt = {})),
    (function (e) {
      (e.COMMENT = 'comment'), (e.MATTERTAG = 'mattertag');
    })(jt || (jt = {})),
    (function (e) {
      (e.DISCOVER = 'discover'),
        (e.FOLDER = 'folder'),
        (e.GRANT = 'grant'),
        (e.MODEL = 'model'),
        (e.ORGANIZATION = 'organization'),
        (e.USAGE = 'usage'),
        (e.USER = 'user');
    })($t || ($t = {})),
    (function (e) {
      (e.SNAPSHOT = 'snapshot'), (e.TOUR = 'tour');
    })(qt || (qt = {})),
    (function (e) {
      (e.USER = 'user'), (e.VISION = 'vision');
    })(Kt || (Kt = {})),
    (function (e) {
      (e.ICON = 'icon'),
        (e.ORIGINAL = 'original'),
        (e.PRESENTATION = 'presentation'),
        (e.PREVIEW = 'preview'),
        (e.THUMBNAIL = 'thumbnail'),
        (e.WEB = 'web');
    })(Yt || (Yt = {})),
    (function (e) {
      (e.EQUIRECTANGULAR = 'equirectangular'), (e.PHOTO2D = 'photo2D');
    })(Xt || (Xt = {})),
    (function (e) {
      (e.AVAILABILITY = 'availability'),
        (e.FLAG = 'flag'),
        (e.QUOTA = 'quota'),
        (e.VALUE = 'value');
    })(Zt || (Zt = {})),
    (function (e) {
      (e.COMPLETE = 'complete'),
        (e.FAILED = 'failed'),
        (e.INPROGRESS = 'inprogress'),
        (e.STAGING = 'staging');
    })(Qt || (Qt = {})),
    (function (e) {
      (e.OPEN = 'open'), (e.RESOLVED = 'resolved');
    })(Jt || (Jt = {})),
    (function (e) {
      (e.BOUNDARYEDGE = 'boundaryEdge'), (e.BOUNDARYVERTEX = 'boundaryVertex'), (e.ROOM = 'room');
    })(en || (en = {})),
    (function (e) {
      (e.ALIGNED = 'aligned'), (e.FAILED = 'failed'), (e.UNALIGNED = 'unaligned');
    })(tn || (tn = {})),
    (function (e) {
      (e.ANCHOR = 'anchor'), (e.ID = 'id'), (e.LOCATION = 'location');
    })(nn || (nn = {})),
    (function (e) {
      (e.MESH = 'mesh'), (e.PANO = 'pano'), (e.UNKNOWN = 'unknown');
    })(an || (an = {})),
    (function (e) {
      (e.FACE_BLURRING = 'face_blurring'),
        (e.FIDUCIAL_DETECTION = 'fiducial_detection'),
        (e.FIDUCIAL_REMOVAL = 'fiducial_removal');
    })(on || (on = {})),
    (function (e) {
      (e.ADDRESS = 'ADDRESS'),
        (e.ALL = 'ALL'),
        (e.CREATED_BY = 'CREATED_BY'),
        (e.INTERNAL_ID = 'INTERNAL_ID'),
        (e.MLS_ID = 'MLS_ID'),
        (e.MLS_NAME = 'MLS_NAME');
    })(sn || (sn = {})),
    (function (e) {
      (e.DEMO = 'demo'),
        (e.DISCOVERABLE = 'discoverable'),
        (e.FLAGGED = 'flagged'),
        (e.INACTIVE = 'inactive');
    })(rn || (rn = {})),
    (function (e) {
      (e.DEFAULT = 'default'), (e.DISABLED = 'disabled'), (e.ENABLED = 'enabled');
    })(cn || (cn = {})),
    (function (e) {
      (e.FOLDER = 'Folder'), (e.MODEL = 'Model'), (e.ORGANIZATION = 'Organization');
    })(dn || (dn = {})),
    (function (e) {
      (e.USER = 'USER'), (e.USER_GROUP = 'USER_GROUP');
    })(ln || (ln = {})),
    (function (e) {
      (e.ASC = 'asc'), (e.DESC = 'desc');
    })(hn || (hn = {})),
    (function (e) {
      (e.ACCEPTED = 'accepted'),
        (e.DISMISSED = 'dismissed'),
        (e.REJECTED = 'rejected'),
        (e.UNREVIEWED = 'unreviewed');
    })(un || (un = {})),
    (function (e) {
      (e.HIGH = 'high'), (e.LOW = 'low');
    })(pn || (pn = {})),
    (function (e) {
      (e.AFTERNOON = 'afternoon'),
        (e.DAWN = 'dawn'),
        (e.DUSK = 'dusk'),
        (e.MORNING = 'morning'),
        (e.NIGHT = 'night');
    })(mn || (mn = {})),
    (function (e) {
      (e.ACCEPTED = 'accepted'),
        (e.CANCELLED = 'cancelled'),
        (e.INVALID = 'invalid'),
        (e.PENDING = 'pending'),
        (e.REJECTED = 'rejected');
    })(gn || (gn = {})),
    (function (e) {
      (e.FADE_TO_BLACK = 'fade_to_black'), (e.INSTANT = 'instant'), (e.INTERPOLATE = 'interpolate');
    })(fn || (fn = {})),
    (function (e) {
      (e.CAMERAUNSUPPORTED = 'cameraUnsupported'),
        (e.ENABLEMENTEXPIRED = 'enablementExpired'),
        (e.FEATUREBLOCKED = 'featureBlocked'),
        (e.ORGSETTINGSDISABLED = 'orgSettingsDisabled'),
        (e.PERMISSIONMISSINGUNLOCK = 'permissionMissingUnlock'),
        (e.PERMISSIONMISSINGVIEW = 'permissionMissingView'),
        (e.QUOTAEXCEEDED = 'quotaExceeded');
    })(wn || (wn = {})),
    (function (e) {
      (e.IMPERIAL = 'imperial'), (e.METRIC = 'metric');
    })(yn || (yn = {})),
    (function (e) {
      (e.CREATED = 'created'),
        (e.EMAIL = 'email'),
        (e.FIRST_NAME = 'first_name'),
        (e.LAST_NAME = 'last_name'),
        (e.MODIFIED = 'modified');
    })(In || (In = {})),
    (function (e) {
      (e.DOLLHOUSE = 'dollhouse'),
        (e.FLOORPLAN = 'floorplan'),
        (e.MESH = 'mesh'),
        (e.PANORAMA = 'panorama');
    })(Tn || (Tn = {})),
    (function (e) {
      (e.BASIC = 'basic'), (e.NONE = 'none'), (e.TOKEN = 'token');
    })(En || (En = {})),
    (function (e) {
      (e.CANCELED = 'Canceled'),
        (e.COMPLETED = 'Completed'),
        (e.CONTINUEDASNEW = 'ContinuedAsNew'),
        (e.FAILED = 'Failed'),
        (e.RUNNING = 'Running'),
        (e.TERMINATED = 'Terminated'),
        (e.TIMEDOUT = 'TimedOut'),
        (e.UNRECOGNIZED = 'Unrecognized'),
        (e.UNSPECIFIED = 'Unspecified');
    })(vn || (vn = {}));
  class An {
    constructor(e, t, n) {
      (this.floorData = e), (this.modelData = t), (this.apiClient = n);
    }
    validateInput(e) {
      const { sid: t } = e;
      if (!t) return { sid: this.modelData.model.sid };
      if (j(t)) return { sid: t };
      throw Error(`"${t}" is not a valid sid string`);
    }
    async exec(e, t) {
      var n, a, o, s, i, r, c, d, l;
      const h = this.floorData.getFloorIdMap(!1),
        u = await this.apiClient.query(Cn.Floorplans, { modelId: e.sid });
      (null ===
        (o =
          null ===
            (a = null === (n = null == u ? void 0 : u.data) || void 0 === n ? void 0 : n.model) ||
          void 0 === a
            ? void 0
            : a.assets) || void 0 === o
        ? void 0
        : o.floorplans) || this.throw('error fetching floorplans');
      const p = [];
      for (const e of null === (i = null === (s = u.data) || void 0 === s ? void 0 : s.model) ||
      void 0 === i
        ? void 0
        : i.assets.floorplans) {
        let t = !1,
          n = !1;
        for (const a of e.flags) a === at.PHOTOGRAMY && (t = !0), a === at.ALPHA && (n = !0);
        if (t && n) {
          const t = null === (r = e.url) || void 0 === r ? void 0 : r.search('vr_colorplan');
          if (t && -1 !== t) {
            const t = null === (c = null == e ? void 0 : e.floor) || void 0 === c ? void 0 : c.id;
            if (t) {
              const n = h[t];
              p[parseInt(n, 10)] = e;
            }
          }
        }
      }
      const m = [];
      for (const e of p)
        if (e.url) {
          const t = fetch(e.url).then((e) => e.arrayBuffer());
          m.push(t);
        }
      return {
        imageDataUrls: (await Promise.all([...m]).catch((e) => this.throw(e))).map((e) =>
          ((e) => {
            const t = [];
            for (let n = 0; n < e.length; n += 8192)
              t.push(String.fromCharCode.apply(null, e.subarray(n, n + 8192)));
            return btoa(t.join(''));
          })(new Uint8Array(e)),
        ),
        data: {
          height: p[0].height || 100,
          imageOriginX: (null === (d = p[0].origin) || void 0 === d ? void 0 : d.x) || 0,
          imageOriginY: (null === (l = p[0].origin) || void 0 === l ? void 0 : l.y) || 0,
          resolutionPpm: p[0].resolution || 100,
          width: p[0].width || 100,
        },
      };
    }
    throw(e) {
      throw Error('Asset.getVrColorplans: ' + e);
    }
  }
  class Sn {
    constructor(e) {
      this.attachmentRegistry = e;
    }
    validateInput(e, t) {
      return (
        j(e.id) || this.throw(H('tagId', 'string', e.id)),
        this.attachmentRegistry.get(t.client.applicationKey, e.id) ||
          this.throw(`${e.id} does not map to a valid asset`),
        e
      );
    }
    async exec(e, t) {
      const n = this.attachmentRegistry.get(t.client.applicationKey, e.id);
      return n || this.throw(`${e.id} does not map to a valid asset`), n;
    }
    throw(e) {
      throw Error('Asset.getAssetById: ' + e);
    }
  }
  class bn {
    constructor(e) {
      this.attachmentRegistry = e;
    }
    validateInput(e, t) {
      return e;
    }
    exec() {
      return this.attachmentRegistry.refresh();
    }
  }
  function Dn(e, t, n, a, o, s) {
    const { floorData: i, modelData: r, modelApiClient: c } = o;
    return {
      getVrColorplans: (function (e, t) {
        const n = G.create(t, new _(An));
        return (
          e.addAsyncCommandToInterface(
            { namespace: 'Asset', name: 'getVrColorplans', args: ['sid'], origins: q },
            n,
          ),
          n
        );
      })(e, new x(i, r, c)),
      registerTexture: (function (e, t, n, a) {
        const o = G.create(a, new _(ve, t, n.loadImage));
        return (
          e.addAsyncCommandToInterface(
            { namespace: 'Asset', name: 'registerTexture', args: ['textureId', 'textureSrc'] },
            o,
          ),
          o
        );
      })(e, t, n, new x(a)),
      getAssetById: (function (e, t) {
        const n = G.create(t, new _(Sn));
        return (
          e.addAsyncCommandToInterface(
            { namespace: 'Asset', name: 'getAssetById', args: ['id'], origins: q },
            n,
          ),
          n
        );
      })(e, new x(s)),
      refreshAssets: (function (e, t) {
        const n = G.create(t, new _(bn));
        return (
          e.addAsyncCommandToInterface(
            { namespace: 'Asset', name: 'refreshAssets', args: [], origins: q },
            n,
          ),
          n
        );
      })(e, new x(s)),
    };
  }
  class On extends ae {
    constructor() {
      super();
    }
  }
  On.id = 'GET_POSE';
  const Nn = (40 * Math.PI) / 180 / 1e3;
  class Mn extends ae {
    constructor(e) {
      super(), (this.payload = e);
    }
  }
  Mn.id = 'LOOK_AT_SCREEN_COORDS';
  const Rn = new U('broadcast.move');
  function Pn(e, t) {
    return Object.values(e).includes(t);
  }
  class Ln extends ae {
    constructor(e) {
      super(), (this.payload = e);
    }
  }
  Ln.id = 'MOVE_DIRECTION';
  class xn extends ae {
    constructor(e) {
      super(), (this.payload = { x: e.x, z: e.z });
    }
  }
  function _n(e, t) {
    (e.x = t.x), (e.y = t.y);
  }
  function kn(e, t) {
    _n(e, t), (e.z = t.z);
  }
  xn.id = 'PAN';
  class Vn extends Error {
    constructor(e, t) {
      var n;
      super(e instanceof Error ? e.message : e),
        (this.name = 'BaseException'),
        t && (this.code = t),
        e instanceof Error &&
          ((this.originalError = e),
          (n = e) && n instanceof Error && n.isMock && (this.isMock = !0));
    }
  }
  function Un(e, t) {
    const n = t.length;
    e.length = n;
    for (let a = 0; a < n; ++a) e[a] = t[a];
    return e;
  }
  class Fn extends Vn {
    constructor() {
      super('Cannot copy into an array of a different size'), (this.name = 'ArraySizeMismatch');
    }
  }
  const Gn = (e, t, n = 1e-5) => Math.abs(e - t) <= n,
    Hn = (e, t, n = 1e-5) => Gn(e.x, t.x, n) && Gn(e.y, t.y, n),
    Bn = (e, t, n = 1e-5) => Hn(e, t, n) && Gn(e.z, t.z, n);
  class zn {
    create(e, t, n, a) {
      const o = () => e.onChanged();
      return new ce(t.onChanged(o), n.onChanged(o), a.onChanged(o));
    }
  }
  class Wn {
    constructor(e, t) {
      (this._data = {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0 },
        projection: new Float32Array(16),
        sweep: '',
        mode: l.Mode.TRANSITIONING,
      }),
        (this.THREE = e),
        (this.viewmodeConverter = t),
        (this.tempEuler = new e.Euler());
    }
    get data() {
      return this._data;
    }
    equals(e) {
      const t = 1e-5;
      return (
        Bn(e._data.position, this._data.position, t) &&
        Hn(e._data.rotation, this._data.rotation, t) &&
        ((e, t, n = 1e-5) =>
          e.length === t.length && !Array.prototype.some.call(e, (e, a) => !Gn(e, t[a], n)))(
          e._data.projection,
          this._data.projection,
          t,
        ) &&
        e._data.sweep === this._data.sweep &&
        e._data.mode === this._data.mode
      );
    }
    update(e, t, n, a) {
      const o = this.tempEuler.setFromQuaternion(e.pose.rotation, 'YXZ'),
        s = t.currentSweep && t.isSweepUnaligned(t.currentSweep),
        i = n.isInside() ? e.pose.position : e.pose.fovCorrectedPosition();
      kn(this._data.position, i),
        (this._data.rotation.x = this.THREE.MathUtils.radToDeg(o.x)),
        (this._data.rotation.y = this.THREE.MathUtils.radToDeg(o.y)),
        (this._data.projection = Float32Array.from(
          e.pose.projection.asThreeMatrix4().transpose().elements,
        )),
        (this._data.sweep = t.currentSweepObject ? a.getIdForSweep(t.currentSweepObject) : ''),
        (this._data.mode = this.viewmodeConverter.toSdk(
          n.currentMode,
          !s,
          e.pose.isPitchFactorOrtho.value,
        ));
    }
    copy(e) {
      kn(this._data.position, e.data.position),
        _n(this._data.rotation, e.data.rotation),
        (function (e, t) {
          if (e.byteLength !== t.byteLength) throw new Fn();
          const n = t.length;
          for (let a = 0; a < n; ++a) e[a] = t[a];
        })(this._data.projection, e.data.projection),
        (this._data.sweep = e.data.sweep),
        (this._data.mode = e.data.mode);
    }
  }
  var jn, $n, qn, Kn, Yn;
  !(function (e) {
    (e.Desktop = 'desktop'),
      (e.Mobile = 'mobile'),
      (e.VrOrientOnly = 'xr.orientonly'),
      (e.VrWithController = 'xr.controller'),
      (e.VrWithTrackedController = 'xr.trackedcontroller');
  })(jn || (jn = {})),
    (function (e) {
      (e.None = 'interaction.none'),
        (e.Direct = 'interaction.direct'),
        (e.Key = 'interaction.key'),
        (e.Gui = 'interaction.gui'),
        (e.Mouse = 'interaction.mouse'),
        (e.Touch = 'interaction.touch'),
        (e.Pen = 'interaction.pen'),
        (e.XRController = 'interaction.xr.controller'),
        (e.XRGaze = 'interaction.xr.gaze'),
        (e.XRScreen = 'interaction.xr.screen');
    })($n || ($n = {})),
    (function (e) {
      (e[(e.Instant = 0)] = 'Instant'),
        (e[(e.FadeToBlack = 1)] = 'FadeToBlack'),
        (e[(e.Interpolate = 2)] = 'Interpolate'),
        (e[(e.MoveToBlack = 3)] = 'MoveToBlack'),
        (e[(e.OrbitTo = 4)] = 'OrbitTo');
    })(qn || (qn = {})),
    (function (e) {
      (e[(e.Full = 0)] = 'Full'),
        (e[(e.ClearToBlack = 1)] = 'ClearToBlack'),
        (e[(e.BlackToClear = 2)] = 'BlackToClear');
    })(Kn || (Kn = {})),
    (function (e) {
      (e[(e.Top = 1)] = 'Top'), (e[(e.Bottom = 2)] = 'Bottom');
    })(Yn || (Yn = {}));
  const Xn = Math.PI / 180;
  Math.PI;
  Object.freeze({
    camera: {
      transitionBlackoutTime: 300,
      transitionFadeTime: 800,
      baseTransitionTime: 200,
      transitionSpeed: 3,
      autoOrbitMinVelocity: 0.002,
      autoOrbitMaxVelocity: 0.08,
      autoOrbitTransitionTIme: 1e3,
      autoOrbitLowerPhiLimit: 30 * Xn,
      autoOrbitUpperPhiLimit: 90 * Xn,
    },
  }),
    jn.Desktop,
    qn.Interpolate,
    jn.Mobile,
    qn.Interpolate,
    jn.VrOrientOnly,
    qn.FadeToBlack,
    jn.VrWithController,
    qn.FadeToBlack,
    jn.VrWithTrackedController,
    qn.FadeToBlack;
  const Zn = 75 * Xn;
  class Qn extends ae {
    constructor(e) {
      super(),
        (this.payload = {
          xAngle: e.xAngle,
          yAngle: e.yAngle,
          zAngle: e.zAngle,
          rotationSpeed: e.rotationSpeed,
          clampYRotation: e.clampYRotation,
        });
    }
  }
  function Jn(e, t, n) {
    const a = new e.Euler(),
      o = new e.Euler();
    return async function (e, s, i, r) {
      if (i.currentMode !== t.Panorama)
        throw Error('Camera.setRotation is only available in Panorama mode');
      const c = r.xAngle % (0.5 * Math.PI),
        d = r.yAngle % (2 * Math.PI),
        l = e.pose.rotation;
      a.setFromQuaternion(l, 'YXZ');
      let h = d - a.y;
      return (
        Math.abs(h) > Math.PI && (h -= 2 * Math.sign(h) * Math.PI),
        o.set(c - a.x, h, 0, 'YXZ'),
        (o.y %= 2 * Math.PI),
        n(s, e, {
          xAngle: -o.y,
          yAngle: o.x,
          zAngle: 0,
          rotationSpeed: r.rotationSpeed,
          clampYRotation: !1,
        })
      );
    };
  }
  Qn.id = 'ROTATE';
  class ea extends Qn {}
  ea.id = 'SET_ORIENTATION';
  const ta = 0.7,
    na = 3,
    aa = function (e, t, n) {
      return Math.max(t, Math.min(e, n));
    };
  const oa = new U('command.zoom');
  class sa {
    constructor(e, t, n, a) {
      (this.cameraData = n),
        (this.viewmodeData = a),
        (this.Viewmode = e.Viewmode),
        (this.ZoomSetCommand = e.ZoomSetCommand),
        (this.issueCommand = t.issueCommand);
    }
    validateInput(e) {
      const t = e.zoomPct - 0;
      if (isNaN(t)) throw Error(t + ' is not a valid zoom level');
      return (
        t < ta &&
          na < t &&
          ((e.zoomPct = aa(t, ta, na)),
          oa.warn(t, `is outside the valid zoom range of [${ta}, ${na}]`)),
        e
      );
    }
    async exec(e, t) {
      return (
        ca(this.Viewmode, this.viewmodeData.currentMode),
        await this.issueCommand(new this.ZoomSetCommand(e.zoomPct)),
        this.cameraData.zoom()
      );
    }
  }
  class ia {
    constructor(e, t, n, a) {
      (this.cameraData = n),
        (this.viewmodeData = a),
        (this.Viewmode = e.Viewmode),
        (this.ZoomInCommand = e.ZoomInCommand),
        (this.issueCommand = t.issueCommand);
    }
    validateInput(e) {
      const t = e.zoomDelta - 0;
      if (isNaN(t)) throw Error(t + ' is not a valid zoom delta');
      return (e.zoomDelta = t || 0), e;
    }
    async exec(e, t) {
      return (
        ca(this.Viewmode, this.viewmodeData.currentMode),
        await this.issueCommand(new this.ZoomInCommand(e.zoomDelta)),
        this.cameraData.zoom()
      );
    }
  }
  class ra {
    constructor(e, t, n, a) {
      (this.viewmodeData = a),
        (this.Viewmode = e.Viewmode),
        (this.ZoomResetCommand = e.ZoomResetCommand),
        (this.issueCommand = t.issueCommand);
    }
    validateInput(e) {
      return e;
    }
    async exec(e, t) {
      ca(this.Viewmode, this.viewmodeData.currentMode),
        await this.issueCommand(new this.ZoomResetCommand());
    }
  }
  function ca(e, t) {
    if (t !== e.Panorama)
      throw Error('Zoom controls are currently only supported in Panorama mode');
  }
  class da {
    create(e, t) {
      return t.onChanged(() => e.onChanged());
    }
  }
  class la {
    constructor(e) {
      this._data = { level: 1 };
    }
    get data() {
      return this._data;
    }
    equals(e) {
      return this._data.level === e.data.level;
    }
    copy(e) {
      this._data.level = e.data.level;
    }
    update(e, t) {
      t.isInside() && (this._data.level = e.zoom());
    }
  }
  function ha(e, t) {
    const n = new e.Euler();
    return function (a, o, s, i, r) {
      const c = n.setFromQuaternion(o.pose.rotation, 'YXZ'),
        d = s.currentSweep && s.isSweepUnaligned(s.currentSweep);
      return (
        (a.position.x = o.pose.position.x),
        (a.position.y = o.pose.position.y),
        (a.position.z = o.pose.position.z),
        (a.rotation.x = e.MathUtils.radToDeg(c.x)),
        (a.rotation.y = e.MathUtils.radToDeg(c.y)),
        (a.projection = Float32Array.from(o.pose.projection.asThreeMatrix4().transpose().elements)),
        (a.sweep = s.currentSweepObject ? r.getIdForSweep(s.currentSweepObject) : ''),
        (a.mode = t.toSdk(i.currentMode, !d, o.pose.isPitchFactorOrtho.value)),
        a
      );
    };
  }
  class ua {
    constructor() {
      (this.wasInTransition = !1), (this.currentFloor = '');
    }
    create(e, t, n, a, o) {
      return new ce(
        t.makeFloorChangeSubscription(() => this.throttleCurrentFloorChanges(e, t)),
        a.onChanged(() => this.throttleCameraTranstionChanges(e, a, n, o)),
        n.onChanged(() => this.throttleCameraTranstionChanges(e, a, n, o)),
        o.onChanged(() => this.throttleCameraTranstionChanges(e, a, n, o)),
      );
    }
    throttleCameraTranstionChanges(e, t, n, a) {
      const o = t.transition.active || n.transition.active;
      o !== this.wasInTransition && ((this.wasInTransition = o), e.onChanged());
    }
    throttleCurrentFloorChanges(e, t) {
      const n = t.currentFloorId;
      n !== this.currentFloor && ((this.currentFloor = n), e.onChanged());
    }
  }
  class pa {
    constructor(e) {
      (this._data = { id: void 0, sequence: void 0, name: '' }),
        (this.SweepAlignmentType = e.SweepAlignmentType),
        (this.SweepPlacementType = e.SweepPlacementType);
    }
    get data() {
      return this._data;
    }
    equals(e) {
      const t = this.data,
        n = e.data;
      return t.id === n.id && t.sequence === n.sequence && t.name === n.name;
    }
    copy(e) {
      (this._data.id = e.data.id),
        (this._data.sequence = e.data.sequence),
        (this._data.name = e.data.name);
    }
    update(e, t, n, a, o) {
      const s = e.currentFloor,
        i = t.currentSweep && t.getSweep(t.currentSweep);
      (!a.isTourActive() && n.transition.active && !t.transitionActive) ||
      (function () {
        if (t.transitionActive && t.transition.to && t.transition.from) {
          const e = t.getSweep(t.transition.to),
            n = t.getSweep(t.transition.from);
          return e.floorId !== n.floorId;
        }
        return !1;
      })()
        ? ((this._data.id = ''), (this._data.sequence = void 0), (this._data.name = ''))
        : i &&
            i.alignmentType === this.SweepAlignmentType.UNALIGNED &&
            i.placementType === this.SweepPlacementType.UNPLACED
          ? ((this._data.id = void 0), (this._data.sequence = void 0), (this._data.name = ''))
          : s
            ? ((this._data.id = o.getIdFromCwfId(s.id)),
              (this._data.sequence = s.index),
              (this._data.name = s.name))
            : ((this._data.id = ''), (this._data.sequence = -1), (this._data.name = 'all'));
    }
  }
  class ma {
    constructor(e, t, n, a) {
      (this.dependencies = e),
        (this.optionals = t),
        (this.subscriptionFactory = n),
        (this.dataFactory = a),
        (this.dirty = !0),
        (this.observers = new Set()),
        (this.currentData = a.create(...e, ...t.getOptionals()));
      const o = new (class {
        constructor(e) {
          this.collection = e;
        }
        onChanged() {
          this.collection.dirty = !0;
          for (const e of this.collection.observers) e.onChanged();
        }
      })(this);
      (this.dependencySubscription = t.onOptionalsFulfilled(() => {
        var e;
        null === (e = this.changeSubscription) || void 0 === e || e.cancel(),
          (this.changeSubscription = this.subscriptionFactory.create(
            o,
            ...this.dependencies,
            ...this.optionals.getOptionals(),
          )),
          o.onChanged();
      })),
        (this.changeSubscription = this.subscriptionFactory.create(
          o,
          ...this.dependencies,
          ...this.optionals.getOptionals(),
        )),
        this.changeSubscription.cancel();
    }
    static async create(e, t, n) {
      const a = await e.getDependencies();
      return new ma(a, e, t, n);
    }
    getData() {
      return this.currentData.data;
    }
    subscribe(e) {
      const t = this.dependencies,
        n = this.optionals;
      const a = new (class {
        constructor(e) {
          (this.sdkCollection = e),
            (this.needsUpdate = !0),
            (this.diffRecord = { added: new Map(), removed: new Map(), updated: new Map() }),
            (this.dataView = e.dataFactory.create(...t, ...n.getOptionals()));
        }
        get dirty() {
          return this.needsUpdate;
        }
        readDiff() {
          const { added: t, removed: n, updated: a } = this.diffRecord;
          if ((t.clear(), n.clear(), a.clear(), !this.dirty)) return this.diffRecord;
          this.sdkCollection.update(e);
          const o = this.sdkCollection.currentData;
          for (const e in o.data)
            this.dataView.data.hasOwnProperty(e)
              ? this.dataView.isItemEqual(o, e) || a.set(e, o.data[e])
              : t.set(e, o.data[e]);
          for (const e in this.dataView.data)
            o.data.hasOwnProperty(e) || n.set(e, this.dataView.data[e]);
          return this.dataView.update(e), (this.needsUpdate = !1), this.diffRecord;
        }
        onChanged() {
          this.needsUpdate = !0;
        }
        renew() {
          this.sdkCollection.addObserver(this);
        }
        cancel() {
          this.sdkCollection.removeObserver(this);
        }
      })(this);
      return this.addObserver(a), a;
    }
    update(e) {
      this.dirty && this.observers.size > 0 && (this.currentData.update(e), (this.dirty = !1));
    }
    addObserver(e) {
      0 === this.observers.size &&
        (this.dependencySubscription.renew(), this.changeSubscription.renew(), (this.dirty = !0)),
        this.observers.add(e);
    }
    removeObserver(e) {
      this.observers.delete(e),
        0 === this.observers.size &&
          (this.dependencySubscription.cancel(),
          this.changeSubscription.cancel(),
          this.currentData.clear());
    }
  }
  class ga {
    create(e, t) {
      return t.onChanged(() => e.onChanged());
    }
  }
  class fa {
    constructor(e, t) {
      (this.floorData = e), (this.floorIdMap = t), (this._data = {});
    }
    get data() {
      return this._data;
    }
    isItemEqual(e, t) {
      const n = this.data[t],
        a = e.data[t];
      return n.id === a.id && n.name === a.name && n.sequence === a.sequence;
    }
    update() {
      for (const e of this.floorData.getCollection()) {
        const t = this.floorIdMap.getIdFromCwfId(e.id),
          n = this._data[t] || {};
        (n.id = t), (n.sequence = e.index), (n.name = e.name), (this._data[t] = n);
      }
      for (const e in this.data) {
        this.floorIdMap.getFloorForId(e) || delete this._data[e];
      }
    }
    clear() {
      this._data = {};
    }
  }
  class wa extends ae {}
  async function ya(e) {
    try {
      const { currentFloor: t, totalFloors: n } = e,
        a = e.getFloorNames();
      return { currentFloor: t ? t.index : -1, floorNames: a, totalFloors: n };
    } catch (e) {
      throw Error('no floors currently loaded');
    }
  }
  wa.id = 'GET_FLOORS_DATA';
  class Ia extends ae {
    constructor(e) {
      super(), (this.payload = e);
    }
  }
  Ia.id = 'MOVE_TO_FLOOR';
  class Ta {
    constructor(e, t, n) {
      (this.floorsViewData = n),
        (this.issueCommand = t.issueCommand),
        (this.ShowAllFloorsCommand = e.ShowAllFloorsCommand);
    }
    validateInput(e) {
      return e;
    }
    async exec(e, t) {
      try {
        await this.issueCommand(new this.ShowAllFloorsCommand({ moveCamera: !0 }));
        const e = this.floorsViewData.currentFloor;
        return e ? e.index : -1;
      } catch (e) {
        throw Error('Could not show all floors');
      }
    }
  }
  class Ea {
    constructor(e) {
      this.FloorsData = e;
    }
    validateInput(e) {
      return { invert: !!(null == e ? void 0 : e.invert) || !1 };
    }
    async exec(e, t) {
      return this.FloorsData.getFloorIdMap(e.invert);
    }
  }
  class va extends ae {}
  function Ca(e, t) {
    return function (n, a, o, s) {
      const i = o.getCollection(),
        r = [],
        c = new e.Vector2();
      for (const o of i) {
        t(n, o.position, c);
        const { id: i, index: d } = a.getFloor(o.floorId),
          l = s.getIdFromCwfId(i),
          h = J(o);
        r.push(
          Object.assign(Object.assign({}, h), {
            position: new e.Vector3().copy(o.position),
            screenPosition: c,
            floor: d,
            floorInfo: { id: l, sequence: d },
          }),
        );
      }
      return r;
    };
  }
  va.id = 'LABEL_GET';
  class Aa {
    create(e, t) {
      return t.onChanged(() => e.onChanged());
    }
  }
  class Sa {
    constructor(e, t, n) {
      (this.labelData = e), (this.floorsData = t), (this.floorIdMap = n), (this._data = {});
    }
    get data() {
      return this._data;
    }
    isItemEqual(e, t) {
      return !ee(this.data[t], e.data[t]);
    }
    update() {
      var e;
      for (const t of this.labelData.getCollection()) {
        const n = null !== (e = this.data[t.sid]) && void 0 !== e ? e : {};
        (n.position = t.position), (n.sid = t.sid), (n.text = t.text), (n.visible = t.visible);
        const a = this.floorsData.getFloor(t.floorId);
        (n.floorInfo = { id: this.floorIdMap.getIdFromCwfId(a.id), sequence: a.index }),
          (this.data[n.sid] = n);
      }
      for (const e in this.data) {
        this.labelData.getLabel(e) || delete this.data[e];
      }
    }
    clear() {
      this._data = {};
    }
  }
  class ba {
    constructor(e) {
      this.deepLinker = e;
    }
    validateInput(e) {
      return e;
    }
    async exec(e, t) {
      const n = this.deepLinker.creator.createLink();
      return decodeURIComponent(n.href);
    }
  }
  class Da {
    constructor(e) {
      this.deepLinker = e;
    }
    validateInput(e) {
      return e;
    }
    async exec(e, t) {
      const n = this.deepLinker.creator.createDeepLink();
      return decodeURIComponent(n.href);
    }
  }
  function Oa(e) {
    return !!e && 'object' == typeof e;
  }
  function Na(e) {
    return 'boolean' == typeof e;
  }
  function Ma(e, t, n, a) {
    switch (e) {
      case c.OpenPolicy.DEFAULT:
        n.handler.resetPolicy(t);
        break;
      case c.OpenPolicy.NEW_WINDOW:
        n.handler.setPolicy(t, n.handler.HandlingPolicy.NEW_WINDOW);
        break;
      case c.OpenPolicy.SAME_FRAME:
        n.handler.setPolicy(t, n.handler.HandlingPolicy.IN_FRAME);
        break;
      case c.OpenPolicy.CURRENT_WINDOW:
        n.handler.setPolicy(t, n.handler.HandlingPolicy.CUSTOM, (e) => {
          a.sendPrivateMessage('open link', { href: e });
        });
    }
  }
  class Ra {
    constructor(e, t, n) {
      (this.sdk = e), (this.deepLinker = t), (this.api = n);
    }
    validateInput(e) {
      if (!Pn(c.OpenPolicy, e.policy))
        throw Error(`Link.setModelLinkPolicy: ${e.policy} is not a valid Link.OpenPolicy`);
      if (!j(e.baseHref))
        throw Error('Link.setModelLinkPolicy: could not determine window.location');
      if (Pn(c.DestinationPolicy, e.destinationPolicy))
        return { policy: e.policy, baseHref: e.baseHref, destinationPolicy: e.destinationPolicy };
      const t = Oa(e.options) ? e.options.templateHref : void 0;
      if ((void 0 !== t && !j(t)) || (j(t) && new URL(e.baseHref).origin !== new URL(t).origin))
        throw Error(
          'Link.setModelLinkPolicy: setting the policy to a different domain is not supported',
        );
      return { policy: e.policy, baseHref: e.baseHref, options: { templateHref: t } };
    }
    async exec(e, t) {
      const n = Pa(e, this.api);
      (e.policy !== c.OpenPolicy.NEW_WINDOW && e.policy !== c.OpenPolicy.CURRENT_WINDOW) || !n
        ? Ma(e.policy, this.deepLinker.LinkType.MODEL, this.deepLinker, this.sdk)
        : this.deepLinker.handler.setPolicy(
            this.deepLinker.LinkType.MODEL,
            this.deepLinker.handler.HandlingPolicy.CUSTOM,
            (t) => {
              const a = new URLSearchParams(window.location.search),
                o = new URL(t).searchParams;
              a.set('m', o.get('m') || o.get('model') || '');
              const s = new URL(ka(n, a));
              s.searchParams.set('m', o.get('m') || o.get('model') || ''),
                this.sdk.sendPrivateMessage('open link', {
                  newWindow: e.policy === c.OpenPolicy.NEW_WINDOW,
                  href: decodeURIComponent(s.href),
                });
            },
          );
    }
  }
  function Pa(e, t) {
    var n;
    if (
      (function (e) {
        return !e.destinationPolicy;
      })(e)
    )
      return null === (n = e.options) || void 0 === n ? void 0 : n.templateHref;
    const a = t.getApi().baseUrl;
    return { [c.DestinationPolicy.DEFAULT]: '', [c.DestinationPolicy.MATTERPORT]: a + '/show/' }[
      e.destinationPolicy
    ];
  }
  class La {
    constructor(e, t, n) {
      (this.sdk = e), (this.deepLinker = t), (this.api = n);
    }
    validateInput(e) {
      if (!Pn(c.OpenPolicy, e.policy)) throw Error(`${e.policy} is not a valid Link.OpenPolicy`);
      if (!j(e.baseHref))
        throw Error('Link.setNavigationLinkPolicy: could not determine window.location');
      if (Pn(c.DestinationPolicy, e.destinationPolicy))
        return { policy: e.policy, baseHref: e.baseHref, destinationPolicy: e.destinationPolicy };
      const t = Oa(e.options) ? e.options.templateHref : void 0;
      if ((void 0 !== t && !j(t)) || (j(t) && new URL(e.baseHref).origin !== new URL(t).origin))
        throw Error(
          'Link.setNavigationLinkPolicy: setting the policy to a different domain is not supported',
        );
      return { policy: e.policy, baseHref: e.baseHref, options: { templateHref: t } };
    }
    async exec(e, t) {
      const n = Pa(e, this.api);
      (e.policy !== c.OpenPolicy.NEW_WINDOW && e.policy !== c.OpenPolicy.CURRENT_WINDOW) || !n
        ? Ma(e.policy, this.deepLinker.LinkType.NAVIGATION, this.deepLinker, this.sdk)
        : this.deepLinker.handler.setPolicy(
            this.deepLinker.LinkType.NAVIGATION,
            this.deepLinker.handler.HandlingPolicy.CUSTOM,
            (t) => {
              const a = new URLSearchParams(window.location.search),
                o = new URLSearchParams(t),
                s = new URL(ka(n, a));
              !(function (e, t) {
                const [n, a, o, s, i, r, c] = [
                  t.get('sm'),
                  t.get('sp'),
                  t.get('sq'),
                  t.get('sr'),
                  t.get('ss'),
                  t.get('sz'),
                  t.get('start'),
                ];
                j(n) && e.set('sm', n);
                j(a) && e.set('sp', a);
                j(o) && e.set('sq', o);
                j(s) && e.set('sr', s);
                j(i) && e.set('ss', i);
                j(r) && e.set('sz', r);
                j(c) && e.set('start', c);
              })(s.searchParams, o),
                s.searchParams.set('m', o.get('m') || o.get('model') || ''),
                this.sdk.sendPrivateMessage('open link', {
                  newWindow: e.policy === c.OpenPolicy.NEW_WINDOW,
                  href: decodeURIComponent(s.href),
                });
            },
          );
    }
  }
  class xa {
    constructor(e, t) {
      (this.sdk = e), (this.deepLinker = t);
    }
    validateInput(e) {
      if (!Pn(c.OpenPolicy, e.policy)) throw Error(`${e.policy} is not a valid Link.OpenPolicy`);
      return { policy: e.policy };
    }
    async exec(e, t) {
      Ma(e.policy, this.deepLinker.LinkType.SAME_ORIGIN, this.deepLinker, this.sdk);
    }
  }
  class _a {
    constructor(e, t) {
      (this.sdk = e), (this.deepLinker = t);
    }
    validateInput(e) {
      const { openInNewWindow: t } = e;
      if (!Na(t))
        throw Error(
          `${e.openInNewWindow} is expected to strictly be a boolean to avoid confusion about truth-y and false-y values.`,
        );
      return { openInNewWindow: t };
    }
    async exec(e, t) {
      e.openInNewWindow
        ? this.deepLinker.handler.setPolicy(
            this.deepLinker.LinkType.EXTERNAL,
            this.deepLinker.handler.HandlingPolicy.NEW_WINDOW,
          )
        : this.deepLinker.handler.setPolicy(
            this.deepLinker.LinkType.EXTERNAL,
            this.deepLinker.handler.HandlingPolicy.CUSTOM,
            (e) => {
              this.sdk.sendPrivateMessage('open link', { href: e });
            },
          );
    }
  }
  function ka(e, t) {
    const n = /\$\{([a-zA-Z]+)\}/,
      a = new URL(e);
    let o,
      s = decodeURI(a.pathname);
    for (; (o = s.match(n)); ) {
      const e = t.get(o[1]);
      s = s.replace(o[0], `${e}`);
    }
    for (a.pathname = s; (o = a.search.match(n)); ) {
      const e = t.get(o[1]);
      a.search =
        null !== e || '' === e
          ? a.search.replace(o[0], `${o[1]}=${e}`)
          : a.search.replace(o[0], `${o[1]}`);
    }
    return a.href;
  }
  function Va(e, t) {
    return !!Array.isArray(e) && e.every(t);
  }
  class Ua {
    constructor(e) {
      this.deepLinks = e;
    }
    validateInput(e) {
      const { policy: t, baseHref: n } = e;
      if (!Pn(c.CreationPolicy, t))
        throw Error(`Link.setShareLinkPolicy: ${e.policy} is not a valid Link.ShareLinkPolicy`);
      if (!j(n)) throw Error('Link.setShareLinkPolicy: Could not determine window.location');
      const a = Oa(e.options) && e.options.includeParams ? e.options.includeParams : [];
      if (!Va(a, j))
        throw Error("Link.setShareLinkPolicy: 'includeParams' expects an array of strings");
      return { policy: t, baseHref: this.validateBaseHref(t, n), options: { includeParams: a } };
    }
    validateBaseHref(e, t) {
      const n = /^https:\/\/([a-z0-9\-]*\.)*(matterport\.com|matterportvr\.cn)$/,
        a = /^https:\/\/static\.(matterport\.com|matterportvr\.cn)$/;
      return {
        [c.CreationPolicy.MATTERPORT]: function () {
          if (window.location.origin.match(n) && !window.location.origin.match(a))
            return window.location.href;
          const e = decodeURIComponent(
            new URLSearchParams(window.location.search.toLowerCase()).get('apihost') || '',
          );
          return e.match(n) ? e + '/show/' : 'https://my.matterport.com/show/';
        },
        [c.CreationPolicy.REFERRER]: function () {
          return t;
        },
        [c.CreationPolicy.WINDOW]: function () {
          return window.location.href;
        },
      }[e]();
    }
    async exec(e, t) {
      this.deepLinks.creator.setDefaultBaseHref(e.baseHref, e.options.includeParams);
    }
  }
  class Fa {
    constructor(e, t) {
      (this.toSdkMediaMap = {
        [e.PHOTO]: d.MediaType.PHOTO,
        [e.VIDEO]: d.MediaType.VIDEO,
        [e.RICH]: d.MediaType.RICH,
      }),
        (this.toSdkMediaFromChunk = {
          [t.error]: d.MediaType.NONE,
          [t.link]: d.MediaType.NONE,
          [t.none]: d.MediaType.NONE,
          [t.photo]: d.MediaType.PHOTO,
          [t.rich]: d.MediaType.RICH,
          [t.text]: d.MediaType.NONE,
          [t.video]: d.MediaType.VIDEO,
        });
    }
    toSdkMedia(e) {
      return this.toSdkMediaMap[e];
    }
    fromTagChunkType(e) {
      return this.toSdkMediaFromChunk[e];
    }
  }
  class Ga {
    constructor(e) {
      this.toSdkChunkTypeMap = {
        [e.error]: d.DescriptionChunkType.NONE,
        [e.link]: d.DescriptionChunkType.LINK,
        [e.none]: d.DescriptionChunkType.NONE,
        [e.photo]: d.DescriptionChunkType.NONE,
        [e.rich]: d.DescriptionChunkType.NONE,
        [e.text]: d.DescriptionChunkType.TEXT,
        [e.video]: d.DescriptionChunkType.NONE,
      };
    }
    toSdkChunkType(e) {
      return this.toSdkChunkTypeMap[e];
    }
  }
  class Ha {
    constructor(e) {
      this.toSdkLinkTypeMap = {
        [e.NAVIGATION]: d.LinkType.NAVIGATION,
        [e.MODEL]: d.LinkType.MODEL,
        [e.EXT_LINK]: d.LinkType.EXT_LINK,
      };
    }
    toSdkLinkType(e) {
      return this.toSdkLinkTypeMap[e];
    }
  }
  var Ba, za, Wa, ja, $a;
  !(function (e) {
    e.create = async function (e, n) {
      const a = await e.getDependencies();
      return new t(n.create(...a));
    };
    class t {
      constructor(e) {
        this.executor = e;
      }
      validateInput(e, t) {
        return this.executor.validateInput(e, t);
      }
      exec(e, t) {
        const n = this.executor.validateInput(e, t);
        return this.executor.exec(n, t);
      }
    }
  })(Ba || (Ba = {})),
    (function (e) {
      (e.FILE_TOO_LARGE = 'oversize'),
        (e.EMPTY_FILE = 'empty'),
        (e.OVER_QUOTA = 'overQuota'),
        (e.UPLOAD_FAILED = 'failed'),
        (e.PERMISSION_DENIED = 'permission');
    })(za || (za = {})),
    (function (e) {
      (e.EMBED_FAIL = 'embedFail'), (e.EMBED_SUCCESS = 'success');
    })(Wa || (Wa = {})),
    (function (e) {
      (e.IMAGE = 'image'),
        (e.PDF = 'pdf'),
        (e.VIDEO = 'video'),
        (e.RICH = 'rich'),
        (e.ZIP = 'zip'),
        (e.TEXT = 'text'),
        (e.AUDIO = 'audio'),
        (e.MODEL = 'model'),
        (e.APPLICATION = 'application');
    })(ja || (ja = {})),
    (function (e) {
      (e.EXTERNAL = 'external'), (e.UPLOAD = 'upload'), (e.SANDBOX = 'sandbox');
    })($a || ($a = {}));
  const qa = new U('expiring-resource'),
    Ka = new WeakMap();
  class Ya {
    constructor(e, t) {
      (this.value = e), (this.validUntil = t);
    }
    refreshFrom(e) {
      if (!e) return;
      (this.value = e.value), (this.validUntil = e.validUntil);
      const t = Ka.get(this);
      t && (t.resolve(), Ka.delete(this));
    }
    async get() {
      if (this.validUntil && this.onStale) {
        const e = Date.now();
        if (e + 6e4 + 1e4 > this.validUntil.getTime()) {
          let t = Ka.get(this);
          t || ((t = new Ie()), Ka.set(this, t), this.onStale()),
            e + 6e4 + 1e3 > this.validUntil.getTime() &&
              (qa.info('Stale resource, waiting for refresh'),
              await t.nativePromise(),
              qa.info('Refreshed resource'));
        }
      }
      return this.value;
    }
    getCurrentValue() {
      return this.value;
    }
  }
  function Xa(e = 11, t = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    let n = '';
    const a = window.crypto || window.msCrypto;
    let o;
    o = a ? a.getRandomValues(new Uint8Array(e)) : new Uint8Array(e).map(() => 255 * Math.random());
    for (let a = 0; a < e; a++) n += t.charAt(o[a] % t.length);
    return n;
  }
  var Za, Qa;
  !(function (e) {
    (e.Behance = 'behance'),
      (e.DailyMotion = 'dailymotion'),
      (e.FaceBook = 'facebook'),
      (e.Flickr = 'flickr'),
      (e.Giphy = 'giphy'),
      (e.GoogleMaps = 'google maps'),
      (e.Instagram = 'instagram'),
      (e.LinkedIn = 'linkedin'),
      (e.Matterport = 'matterport'),
      (e.MixCloud = 'mixcloud'),
      (e.Pinterest = 'pinterest'),
      (e.Reddit = 'reddit'),
      (e.SoundCloud = 'soundcloud'),
      (e.SketchFab = 'sketchfab'),
      (e.Spotify = 'spotify'),
      (e.Tenor = 'tenor'),
      (e.TikTok = 'tiktok'),
      (e.Twitch = 'twitch'),
      (e.Twitter = 'twitter'),
      (e.Tumblr = 'tumblr'),
      (e.Vimeo = 'vimeo'),
      (e.YouTube = 'youtube');
  })(Za || (Za = {})),
    (function (e) {
      (e.PHOTO = 'photo'), (e.VIDEO = 'video'), (e.LINK = 'link'), (e.RICH = 'rich');
    })(Qa || (Qa = {}));
  Error;
  Za.GoogleMaps;
  Za.Behance,
    Za.FaceBook,
    Za.GoogleMaps,
    Za.Instagram,
    Za.LinkedIn,
    Za.MixCloud,
    Za.Pinterest,
    Za.Reddit,
    Za.TikTok,
    Za.Twitter,
    Za.Twitch;
  var Ja;
  !(function (e) {
    (e.IMAGE = 'tag.attachment.image'),
      (e.RICH = 'tag.attachment.rich'),
      (e.VIDEO = 'tag.attachment.video');
  })(Ja || (Ja = {}));
  class eo {
    constructor(e, t, n, a) {
      (this.attachmentsModule = t),
        (this.pluginConfigData = a),
        (this.globalAttachments = new Map()),
        (this.perClientAttachments = new Map()),
        (this.clientAttachments = new Map()),
        (this.clientIds = new Set()),
        (this.attachmentDescriptors = new Map()),
        (this.observable = new L()),
        (this.oEmbed = n);
      for (const t of e.getTagList()) {
        const n = e.getTag(t);
        for (const e of n.fileAttachments)
          this.globalAttachments.set(e.id, e), this.autoRefreshExpiringAttachment(e);
        for (const e of n.externalAttachments)
          this.globalAttachments.set(e.id, e), this.setDescriptorUrl(e, e.src);
      }
      null == a ||
        a
          .getMdsResult()
          .then((e) => e.flatMap((e) => e.attachments))
          .then((e) => {
            e.forEach((e) => {
              this.globalAttachments.set(e.id, e), this.autoRefreshExpiringAttachment(e);
            });
          });
    }
    async refresh() {
      const e = await this.attachmentsModule.getAllAttachments();
      for (const t of e)
        this.globalAttachments.has(t.id) ||
          (this.globalAttachments.set(t.id, t), this.autoRefreshExpiringAttachment(t));
      if (this.pluginConfigData) {
        (await this.pluginConfigData.getMdsResult())
          .flatMap((e) => e.attachments)
          .forEach((e) => {
            this.globalAttachments.set(e.id, e), this.autoRefreshExpiringAttachment(e);
          });
      }
    }
    get(e, t) {
      return this.globalAttachments.get(t) || this.clientAttachments.get(t);
    }
    add(e, t) {
      const n = this.createIAttachment({ src: t.src, type: t.type });
      return (
        this.clientAttachments.set(n.id, n),
        this.setDescriptorUrl(n, t.src),
        this.clientIds.add(n.id),
        this.observable.notify(),
        n.id
      );
    }
    async addBySrc(e, t) {
      const n = await this.createOEmbedIAttachment(t);
      return (
        this.clientAttachments.set(n.id, n),
        this.setDescriptorUrl(n, t),
        this.clientIds.add(n.id),
        this.observable.notify(),
        n.id
      );
    }
    addSandbox(e, t) {
      const n = this.getUniqueId(),
        a = t.name || 'sandbox-' + n,
        o = {
          id: n,
          src: a,
          srcDoc: t.srcDoc,
          onLoad: t.sandboxLoadedHandler,
          category: $a.SANDBOX,
          mediaType: ja.RICH,
          parentType: jt.MATTERTAG,
          thumbnailUrl: new Ya('', null),
          url: new Ya('', null),
          created: new Date(),
          height: t.size.h,
          width: t.size.w,
        };
      return (
        this.clientAttachments.set(n, o),
        this.setDescriptorUrl(o, a),
        this.clientIds.add(n),
        this.observable.notify(),
        [n, o]
      );
    }
    has(e) {
      return this.globalAttachments.has(e) || this.clientIds.has(e);
    }
    *[Symbol.iterator](e) {
      for (const e of this.globalAttachments) yield e;
      for (const e of this.clientAttachments) yield e;
      if (e) {
        const t = this.perClientAttachments.get(e) || [];
        for (const e of t) yield e;
      }
    }
    *descriptors() {
      for (const e of this.attachmentDescriptors) yield e;
    }
    onChanged(e) {
      return this.observable.observe(e);
    }
    getUniqueId() {
      const e = Xa(10);
      return this.globalAttachments.has(e) || this.clientIds.has(e) ? this.getUniqueId() : e;
    }
    async autoRefreshExpiringAttachment(e) {
      const t = e.url,
        n = async () => {
          if (t.validUntil) {
            const a = t.validUntil.getTime() - Date.now(),
              o = a <= 0;
            if (o) {
              const n = await t.get();
              this.setDescriptorUrl(e, n), this.observable.notify();
            }
            setTimeout(n, o ? 0 : a);
          }
        },
        a = await t.get();
      this.setDescriptorUrl(e, a), n(), this.observable.notify();
    }
    setDescriptorUrl(e, t) {
      this.attachmentDescriptors.set(e.id, {
        id: e.id,
        src: t,
        type: this.getAttachmentType(e.mediaType),
      });
    }
    getAttachmentType(e) {
      return {
        [ja.APPLICATION]: f.AttachmentType.APPLICATION,
        [ja.AUDIO]: f.AttachmentType.AUDIO,
        [ja.IMAGE]: f.AttachmentType.IMAGE,
        [ja.MODEL]: f.AttachmentType.MODEL,
        [ja.PDF]: f.AttachmentType.PDF,
        [ja.RICH]: f.AttachmentType.RICH,
        [ja.TEXT]: f.AttachmentType.TEXT,
        [ja.VIDEO]: f.AttachmentType.VIDEO,
        [ja.ZIP]: f.AttachmentType.ZIP,
      }[e];
    }
    createIAttachment(e) {
      const t = { [Ja.IMAGE]: ja.IMAGE, [Ja.RICH]: ja.RICH, [Ja.VIDEO]: ja.VIDEO };
      return {
        id: this.getUniqueId(),
        mediaType: t[e.type],
        category: $a.EXTERNAL,
        src: e.src,
        parentType: jt.MATTERTAG,
        created: new Date(),
        height: 0,
        width: 0,
        thumbnailUrl: new Ya('', null),
        url: new Ya('', null),
        mimeType: '',
      };
    }
    async createOEmbedIAttachment(e) {
      const t = { [Qa.PHOTO]: ja.IMAGE, [Qa.RICH]: ja.RICH, [Qa.VIDEO]: ja.VIDEO },
        n = this.getUniqueId(),
        a = t[(await this.oEmbed.getOEmbedData(e)).type];
      if (!a) throw Error('unable to determine media type');
      return {
        id: n,
        mediaType: a,
        category: $a.EXTERNAL,
        src: e,
        parentType: jt.MATTERTAG,
        created: new Date(),
        height: 0,
        width: 0,
        thumbnailUrl: new Ya('', null),
        url: new Ya('', null),
        mimeType: '',
      };
    }
  }
  const to = {
    [d.MediaType.PHOTO]: Ja.IMAGE,
    [d.MediaType.RICH]: Ja.RICH,
    [d.MediaType.VIDEO]: Ja.VIDEO,
  };
  class no {
    constructor(e, t, n, a) {
      (this.tagAdd = e),
        (this.tagEditIcon = t),
        (this.tagAttach = n),
        (this.attachmentRegistry = a);
    }
    validateInput(e, t) {
      return {
        descriptors: this.tagAdd.validateInput(
          { descriptors: Array.isArray(e.descriptors) ? e.descriptors : [e.descriptors] },
          t,
        ).descriptors,
      };
    }
    async exec(e, t) {
      const n = Array.isArray(e.descriptors) ? e.descriptors : [e.descriptors],
        a = new Map();
      for (const e of n)
        if (e.media && e.media.type !== d.MediaType.NONE) {
          const n = this.attachmentRegistry.add(t.client.applicationKey, {
            src: e.media.src,
            type: to[e.media.type],
          });
          a.set(e.media.src, n);
        }
      const o = async (e) => {
          for (let a = 0; a < e.length; ++a) {
            const o = n[a];
            o.iconId && (await this.tagEditIcon.exec({ id: e[a], iconId: o.iconId }, t));
          }
        },
        s = async (e) => {
          for (let o = 0; o < e.length; ++o) {
            const s = n[o];
            if (s.media && s.media.type !== d.MediaType.NONE) {
              const n = a.get(s.media.src);
              n && this.tagAttach.exec({ tagId: e[o], attachmentIds: [n] }, t);
            }
          }
        };
      return this.tagAdd.exec({ descriptors: n }, t).then(async (e) => (await o(e), await s(e), e));
    }
  }
  function ao(e, t, n) {
    return ((n = n || {}).x = e[t].x), (n.y = e[t].y), (n.z = e[t].z), n;
  }
  function oo(e, t, n) {
    return ((n = n || {}).r = e[t].r), (n.g = e[t].g), (n.b = e[t].b), n;
  }
  class so {
    create(e, t) {
      return t.onChanged(() => e.onChanged());
    }
  }
  class io {
    constructor(e, t, n, a) {
      (this.mattertagData = t),
        (this.floorsData = n),
        (this.floorIdMap = a),
        (this._data = {}),
        (this.mediaConverter = e.mediaConverter);
    }
    get data() {
      return this._data;
    }
    isItemEqual(e, t) {
      return !ee(this.data[t], e.data[t]);
    }
    update() {
      for (const e of this.mattertagData.getTagList()) {
        const t = this.mattertagData.getTag(e),
          n = this.floorsData.getFloor(t.floorId),
          a = this.data[t.sid] || {};
        (a.sid = t.sid),
          (a.enabled = t.enabled),
          (a.anchorPosition = ao(t, 'anchorPosition', a.anchorPosition)),
          (a.stemVector = ao(t, 'stemVector', a.stemVector)),
          (a.stemVisible = t.stemVisible),
          (a.label = t.label),
          (a.description = t.description),
          (a.media = this.getMedia(t, a.media)),
          (a.color = oo(t, 'color', a.color)),
          (a.floorIndex = n ? n.index : -1),
          (a.floorInfo = a.floorInfo || {}),
          (a.floorInfo.id = this.floorIdMap.getIdFromCwfId(n.id)),
          (a.floorInfo.sequence = n.index),
          (this._data[t.sid] = a);
      }
      for (const e in this.data) {
        this.mattertagData.getTag(e) || delete this._data[e];
      }
    }
    clear() {
      this._data = {};
    }
    getMedia(e, t) {
      const n = e.externalAttachments.get(0),
        a = n ? this.mediaConverter.toSdkMedia(n.mediaType) : d.MediaType.NONE,
        o = n && a !== d.MediaType.NONE ? n.src : '';
      return ((t = t || {}).src = o), (t.type = a), t;
    }
  }
  class ro {
    constructor(e, t, n) {
      (this.tagEditBillboard = t),
        (this.tagAttach = n),
        ([this.mattertagData, this.attachmentRegistry] = e);
    }
    validateInput(e, t) {
      if (!Oa(e.properties))
        throw Error('Mattertag.editBillboard: editable properties is not an object');
      const n = B(this.tagEditBillboard, e, t),
        a = e.properties.media;
      if (a) {
        if (!Oa(a) || !Pn(d.MediaType, a.type))
          throw Error('Mattertag.editBillboard: media was not a valid media descriptor');
        if (a.type !== d.MediaType.NONE) {
          if (!j(a.src))
            throw Error(
              `Mattertag.editBillboard: media was of type "${a.type}" but has no src value`,
            );
          return {
            id: n.id,
            properties: Object.assign(Object.assign({}, n.properties), {
              media: { src: a.src, type: a.type },
            }),
          };
        }
        n.properties.media = { src: '', type: d.MediaType.NONE };
      }
      return n;
    }
    async exec(e, t) {
      const n = this.mattertagData.getTag(e.id),
        a = (() => {
          if (e.properties.media && e.properties.media.type !== d.MediaType.NONE)
            return this.attachmentRegistry.add(t.client.applicationKey, {
              src: e.properties.media.src,
              type: to[e.properties.media.type],
            });
        })(),
        o = this.mattertagData;
      return z(this.tagEditBillboard, e, t).then(() => {
        e.properties.media && (n.fileAttachments.replace([]), n.externalAttachments.replace([])),
          a && z(this.tagAttach, { tagId: n.sid, attachmentIds: [a] }, t),
          o.commit();
      });
    }
  }
  function co(e, t, n) {
    function a(e) {
      if (!e) return;
      return {
        label: e.label,
        type: n.toSdkLinkType(e.type),
        url: e.url,
        navigationData: e.navigationData,
      };
    }
    const o = [];
    for (const n of e) o.push({ type: t.toSdkChunkType(n.type), link: a(n.link), text: n.text });
    return o;
  }
  class lo {
    constructor(e, t, n, a) {
      (this.commands = e), (this.tagData = t), (this.floorData = n), (this.floorIdMap = a);
    }
    validateInput(e, t) {
      return e;
    }
    async exec(e, t) {
      return (function (e, t, n, a) {
        const o = [];
        return (
          e.iterate((e) => {
            const { id: s, index: i } = t.getFloor(e.floorId),
              r = n.getIdFromCwfId(s),
              c = e.externalAttachments.get(0),
              l = c ? a.mediaConverter.toSdkMedia(c.mediaType) : d.MediaType.NONE,
              h = c && l !== d.MediaType.NONE ? c.src : '';
            o.push({
              sid: e.sid,
              label: e.label,
              description: e.description,
              parsedDescription: co(e.parsedDescription, a.chunkTypeConverter, a.linkTypeConverter),
              mediaSrc: h,
              mediaType: l,
              media: { type: l, src: h },
              anchorPosition: {
                x: e.anchorPosition.x,
                y: e.anchorPosition.y,
                z: e.anchorPosition.z,
              },
              anchorNormal: { x: e.anchorNormal.x, y: e.anchorNormal.y, z: e.anchorNormal.z },
              color: { r: e.color.r, g: e.color.g, b: e.color.b },
              enabled: e.enabled,
              floorId: i,
              floorIndex: i,
              floorInfo: { id: r, sequence: i },
              stemVector: { x: e.stemVector.x, y: e.stemVector.y, z: e.stemVector.z },
              stemHeight: e.stemHeight,
              stemVisible: e.stemVisible,
            });
          }),
          o
        );
      })(this.tagData, this.floorData, this.floorIdMap, this.commands);
    }
  }
  class ho extends Vn {
    constructor(e) {
      super(
        'Expected tagId parameter to be of type string; got ' +
          (Array.isArray(e) ? 'Array' : typeof e),
      );
    }
  }
  class uo {
    constructor(e, t, n) {
      (this.mattertagsData = e), (this.attachmentRegistry = t), (this.registerSandbox = n);
    }
    validateInput(e, t) {
      var n, a;
      if (!j(e.tagId) || !this.mattertagsData.getTag(e.tagId)) throw new ho(e.tagId);
      const o = e.options || {};
      return (
        'string' == typeof (null === (n = o.size) || void 0 === n ? void 0 : n.w) &&
          (o.size.w = parseInt(o.size.w, 10)),
        'string' == typeof (null === (a = o.size) || void 0 === a ? void 0 : a.h) &&
          (o.size.h = parseInt(o.size.h, 10)),
        Object.assign(
          Object.assign(
            {},
            this.registerSandbox.validateInput(
              Object.assign(Object.assign({}, e), { options: o }),
              t,
            ),
          ),
          { tagId: e.tagId },
        )
      );
    }
    async exec(e, t) {
      const { clientId: n, html: a, options: o, tagId: s } = e,
        { sandboxId: i, attachmentId: r } = await this.registerSandbox.exec(
          { clientId: n, html: a, options: o },
          t,
        ),
        c = this.attachmentRegistry.get(t.client.applicationKey, r);
      return (
        c &&
          (function (e) {
            return 'onLoad' in e;
          })(c) &&
          this.mattertagsData.getTag(s).sandboxAttachments.replace([c]),
        { sandboxId: i, attachmentId: r }
      );
    }
  }
  class po {
    constructor(e) {
      this.tagRemove = e;
    }
    validateInput(e, t) {
      return { ids: B(this.tagRemove, { ids: Array.isArray(e.ids) ? e.ids : [e.ids] }, t).ids };
    }
    async exec(e, t) {
      return z(this.tagRemove, { ids: Array.isArray(e.ids) ? e.ids : [e.ids] }, t);
    }
  }
  const mo = {
    [d.Transition.FLY]: qn.Interpolate,
    [d.Transition.FADEOUT]: qn.FadeToBlack,
    [d.Transition.INSTANT]: qn.Instant,
  };
  class go {
    constructor(e, t, n, a, o, s) {
      (this.FocusOnPinInsideCommand = e),
        (this.OpenTagCommand = t),
        (this.issueCommand = n),
        (this.mattertagData = a),
        (this.tagsViewData = o),
        (this.annotationsViewData = s);
    }
    validateInput(e, t) {
      if (!j(e.id) || !this.mattertagData.getTag(e.id))
        throw Error(`${e.id} does not map to a valid Tag`);
      if (void 0 !== e.transitionType && !Pn(d.Transition, e.transitionType))
        throw Error(`${e.transitionType} does not match valid transition type`);
      return { id: e.id, transitionType: e.transitionType, force: !!e.force };
    }
    async exec(e, t) {
      const n = this.mattertagData.getTag(e.id);
      let a = mo[e.transitionType];
      return (
        void 0 === a && (a = qn.Interpolate),
        (this.tagsViewData.getCapabilities(e.id).focus || e.force) &&
          (await this.issueCommand(
            new this.FocusOnPinInsideCommand({
              pinPosition: Object.assign(Object.assign({}, n), {
                stemLength: n.stemHeight,
                stemNormal: n.stemVector,
              }),
              transition: a,
            }),
          ),
          (this.annotationsViewData.getCapabilities(e.id).preview || e.force) &&
            (await this.issueCommand(new this.OpenTagCommand(e.id)))),
        e.id
      );
    }
  }
  class fo {
    constructor(e, t) {
      (this.tagAllowAction = e), (this.annotationsViewData = t);
    }
    validateInput(e, t) {
      const n = B(this.tagAllowAction, { id: e.tagId, allow: {} }, t),
        a = { navigating: !1, opening: !1 };
      return (
        Oa(e.prevent) &&
          ((a.navigating = !!e.prevent.navigating), (a.opening = !!e.prevent.opening)),
        { tagId: n.id, prevent: a }
      );
    }
    exec(e, t) {
      const n = this.annotationsViewData.getCapabilities(e.tagId);
      return z(
        this.tagAllowAction,
        {
          id: e.tagId,
          allow: {
            navigating: !e.prevent.navigating,
            opening: !e.prevent.opening,
            docking: n.dock,
          },
        },
        t,
      );
    }
  }
  function wo(e, t, n, a, o, s) {
    e.addEnumToInterface({
      namespace: 'Mattertag',
      name: 'DescriptionChunkType',
      values: d.DescriptionChunkType,
    }),
      e.addEnumToInterface({ namespace: 'Mattertag', name: 'Event', values: d.Event }),
      e.addEnumToInterface({ namespace: 'Mattertag', name: 'LinkType', values: d.LinkType }),
      e.addEnumToInterface({ namespace: 'Mattertag', name: 'MediaType', values: d.MediaType }),
      e.addEnumToInterface({ namespace: 'Mattertag', name: 'Transition', values: d.Transition });
    const i = Object.assign(Object.assign({}, n), { mediaConverter: new yo(t.MediaType) }),
      [r, c, l, h, u, p] = s;
    !(function (e, t, n) {
      const a = ['', !1],
        o = (e) => ((a[0] = e.id), (a[1] = e.hovering), a);
      n.subscribe(t.PinHoverChangeMessage, (n) => {
        n.pinType === t.PinType.MATTERTAG && e.broadcast(d.Event.HOVER, o, n);
      });
      const s = [''],
        i = (e) => ((s[0] = e.id), s);
      n.subscribe(t.PinClickedMessage, (n) => {
        n.pinType === t.PinType.MATTERTAG && e.broadcast(d.Event.CLICK, i, n);
      });
    })(e, t, n),
      (function (e, t, n, a) {
        a.getDependencies().then(([a]) => {
          const o = ['', ''],
            s = (e) => {
              var t;
              return (
                (o[0] =
                  (null === (t = a.billboardAnnotation) || void 0 === t ? void 0 : t.id) || ''),
                (o[1] = e.url),
                o
              );
            };
          n.subscribe(t.MattertagLinkOpenedMessage, (t) => {
            e.broadcast(d.Event.LINK_OPEN, s, t);
          });
        });
      })(e, t, n, new x(l));
    const m = (function (e, t, n) {
        const a = Ba.create(new x(t.add, t.editIcon, t.attach, n), new _(no));
        return (
          e.addAsyncCommandToInterface(
            {
              namespace: 'Mattertag',
              name: 'add',
              args: ['descriptors'],
              options: { replay: !0, deprecated: 'Tag.add' },
            },
            a,
          ),
          a
        );
      })(e, o, p),
      g = (function (e, t, n) {
        const a = ma.create(n, new so(), new _(io, t));
        return e.addCollectionToInterface({ namespace: 'Mattertag', name: 'data' }, a), a;
      })(e, i, new x(r, h, u)),
      f = (function (e, t, n) {
        const a = G.create(new x(n.getDependencies(), t.editBillboard, t.attach), new _(ro));
        return (
          e.addAsyncCommandToInterface(
            {
              namespace: 'Mattertag',
              name: 'editBillboard',
              args: ['id', 'properties'],
              options: {
                replay: !0,
                deprecated:
                  '`Tag.editBillboard`, or `Tag.registerAttachment` and `Tag.attach` for media',
              },
            },
            a,
          ),
          a
        );
      })(e, o, new x(r, p)),
      w = (function (e, t) {
        return (
          e.addAsyncCommandToInterface(
            {
              namespace: 'Mattertag',
              name: 'editColor',
              args: ['id', 'color'],
              options: { replay: !0, deprecated: 'Tag.editColor' },
            },
            t,
          ),
          t
        );
      })(e, o.editColor),
      y = (function (e, t) {
        return (
          e.addAsyncCommandToInterface(
            {
              namespace: 'Mattertag',
              name: 'editIcon',
              args: ['id', 'iconId'],
              options: { replay: !0, deprecated: 'Tag.editIcon' },
            },
            t,
          ),
          t
        );
      })(e, o.editIcon),
      I = (function (e, t) {
        return (
          e.addAsyncCommandToInterface(
            {
              namespace: 'Mattertag',
              name: 'editOpacity',
              args: ['id', 'opacity'],
              options: { replay: !0, deprecated: 'Tag.editOpacity' },
            },
            t,
          ),
          t
        );
      })(e, o.editOpacity),
      T = (function (e, t) {
        return (
          e.addAsyncCommandToInterface(
            {
              namespace: 'Mattertag',
              name: 'editPosition',
              args: ['id', 'options'],
              options: { replay: !0, deprecated: 'Tag.editPosition' },
            },
            t,
          ),
          t
        );
      })(e, o.editPosition),
      E = (function (e, t) {
        return (
          e.addAsyncCommandToInterface(
            {
              namespace: 'Mattertag',
              name: 'editStem',
              args: ['id', 'stemParams'],
              options: { replay: !0, deprecated: 'Tag.editStem' },
            },
            t,
          ),
          t
        );
      })(e, o.editStem);
    !(function (e, t, n) {
      const a = G.create(n, new _(lo, t));
      e.addAsyncCommandToInterface(
        { namespace: 'Mattertag', name: 'getData', args: [], options: { deprecated: 'Tag.data' } },
        a,
      );
    })(e, i, new x(r, h, u));
    const v = (function (e, t, n) {
      const a = Ba.create(x.extend(n, t.registerSandbox), new _(uo));
      return (
        e.addCommandToInterface(
          {
            namespace: 'Mattertag',
            name: 'injectHTML',
            subRoutine: 'mattertag.inject',
            args: ['tagId', 'html', 'options'],
            options: { replay: !0, deprecated: 'Tag.registerSandbox and Tag.attaach' },
          },
          a,
        ),
        a
      );
    })(e, o, new x(r, p));
    !(function (e, t, n, a) {
      const o = G.create(a, new _(go, t.FocusOnPinInsideCommand, t.OpenTagCommand, n.issueCommand));
      e.addAsyncCommandToInterface(
        { namespace: 'Mattertag', name: 'navigateToTag', args: ['id', 'transitionType', 'force'] },
        o,
      );
    })(e, t, n, new x(r, c, l));
    const C = (function (e, t) {
      const n = G.create(t, new _(fo));
      return (
        e.addAsyncCommandToInterface(
          {
            namespace: 'Mattertag',
            name: 'preventAction',
            args: ['tagId', 'prevent'],
            options: { replay: !0, deprecated: 'Tag.allowAction' },
          },
          n,
        ),
        n
      );
    })(e, new x(o.allowAction, l));
    !(function (e, t) {
      e.addAsyncCommandToInterface(
        {
          namespace: 'Mattertag',
          name: 'registerIcon',
          args: ['textureId', 'textureSrc'],
          options: { deprecated: 'Asset.registerTexture' },
        },
        t,
      );
    })(e, a.registerTexture);
    return {
      data: g,
      add: m,
      editBillboard: f,
      editColor: w,
      editIcon: y,
      editOpacity: I,
      editPosition: T,
      editStem: E,
      inject: v,
      preventAction: C,
      remove: (function (e, t) {
        const n = G.create(new x(t), new _(po));
        return (
          e.addAsyncCommandToInterface(
            {
              namespace: 'Mattertag',
              name: 'remove',
              args: ['ids'],
              options: { replay: !0, deprecated: 'Tag.remove' },
            },
            n,
          ),
          n
        );
      })(e, o.remove),
      resetIcon: (function (e, t) {
        return (
          e.addAsyncCommandToInterface(
            {
              namespace: 'Mattertag',
              name: 'resetIcon',
              args: ['id'],
              options: { replay: !0, deprecated: 'Tag.resetIcon' },
            },
            t,
          ),
          t
        );
      })(e, o.resetIcon),
    };
  }
  class yo {
    constructor(e) {
      this.toSdkMediaMap = {
        [e.IMAGE]: d.MediaType.PHOTO,
        [e.VIDEO]: d.MediaType.VIDEO,
        [e.RICH]: d.MediaType.RICH,
        [e.APPLICATION]: d.MediaType.NONE,
        [e.AUDIO]: d.MediaType.NONE,
        [e.MODEL]: d.MediaType.NONE,
        [e.PDF]: d.MediaType.NONE,
        [e.TEXT]: d.MediaType.NONE,
        [e.ZIP]: d.MediaType.NONE,
      };
    }
    toSdkMedia(e) {
      return this.toSdkMediaMap[e];
    }
  }
  class Io extends ae {}
  Io.id = 'MEASUREMENTS_GET';
  const To = async (e, t) => {
    const n = [];
    for (const a of e.groups()) {
      const e = a.info,
        o = t.getFloor(e.floorId);
      for (let t = 1; t < a.count; t++) {
        const s = a.get(t - 1),
          i = a.get(t);
        n.push({
          sid: e.sid,
          label: e.text,
          floor: o.index,
          start: { x: s.x, y: s.y, z: s.z },
          end: { x: i.x, y: i.y, z: i.z },
        });
      }
    }
    return n;
  };
  class Eo {
    constructor(e) {
      this.CwfMeasuringPhase = e;
    }
    create(e, t) {
      let n = t.groupCount,
        a = t.phase;
      const o = () => {
        const o = t.groupCount,
          s = t.phase;
        (n === o && a !== this.CwfMeasuringPhase.EDITING) ||
          s !== this.CwfMeasuringPhase.IDLE ||
          (e.onChanged(), (n = o)),
          (a = s);
      };
      return new ce(t.onPhaseChanged(o), t.onSelectedGroupIndexChanged(o));
    }
  }
  class vo {
    constructor(e) {
      (this.measurementModeData = e), (this.data = {});
    }
    update() {
      for (const e of this.measurementModeData.groups()) this.createMeasurement(e);
      for (const e in this.data) {
        this.measurementModeData.getGroupInfoBySid(e) || delete this.data[e];
      }
    }
    isItemEqual(e, t) {
      return !ee(this.data[t], e.data[t]);
    }
    clear() {
      this.data = {};
    }
    createMeasurement(e) {
      const t = e.info.sid,
        n = this.data[t] || {},
        a = n.points || [];
      (n.label = e.info.text),
        (n.segmentLengths = e.segmentLengths),
        (n.totalLength = e.length),
        (function (e, t) {
          let n = 0;
          for (const a of t) {
            const t = e[n] || {};
            (t.x = a.x), (t.y = a.y), (t.z = a.z), (e[n] = t), ++n;
          }
          e.length = n;
        })(a, e),
        (n.sid = t),
        (n.points = a),
        (this.data[t] = n);
    }
  }
  class Co {
    create(e, t) {
      return t.onChanged(() => e.onChanged());
    }
  }
  class Ao {
    constructor() {
      this._data = { active: !1 };
    }
    get data() {
      return this._data;
    }
    equals(e) {
      return this._data.active === e.data.active;
    }
    copy(e) {
      this._data.active = e.data.active;
    }
    update(e) {
      this._data.active = e.modeActive();
    }
  }
  class So extends ae {
    constructor(e) {
      super(), (this.payload = { active: e });
    }
  }
  So.id = 'SDK_MEASUREMENT_TOGGLE';
  class bo extends Vn {
    constructor(e = 'Unhandled Transition Exception') {
      super(e), (this.name = 'TransitionException');
    }
  }
  class Do extends bo {
    constructor(e = 'Unhandled Viewmode Exception', t) {
      super(e), (this.originalError = t), (this.name = 'ViewmodeException');
    }
  }
  class Oo extends Do {
    constructor(e = 'Tried to start view-mode transition while another transition was active') {
      super(e), (this.name = 'ViewmodeActiveTransition');
    }
  }
  function No(e) {
    return 'number' == typeof e && !isNaN(e);
  }
  function Mo(e) {
    return e - 0;
  }
  function Ro(e, t, n) {
    return Math.max(t, Math.min(e, n));
  }
  function Po(e) {
    if (e && 'object' == typeof e && 'x' in e && 'y' in e && 'z' in e) {
      const t = e;
      return No(t.x) && No(t.y) && No(t.z);
    }
    return !1;
  }
  const Lo = new U('move-to-mode-command');
  class xo extends ae {
    constructor(e) {
      super(), (this.payload = e);
    }
  }
  xo.id = 'MOVE_TO_MODE';
  class _o {
    constructor(e, t, n, a) {
      (this.THREE = e),
        (this.viewmodeConverter = t),
        (this.conversion = n),
        (this.transitionTypeConverter = a);
    }
    validateMoveToModeInput(e) {
      if (!e) throw Error('Mode.moveTo -> no arguments provided -- mode is required');
      e.options || (e.options = {});
      const t = e.mode;
      if (!Pn(l.Mode, e.mode)) throw Error(`Mode.moveTo -> ${e.mode} is not a valid viewmode`);
      if (t === l.Mode.TRANSITIONING)
        throw Error(`Mode.moveTo -> ${e.mode} is not a valid viewmode`);
      e.options && e.options.rotation && (e.options.rotation.z = e.options.rotation.z || 0);
      const n = this.validatePayloadOptions(e.options);
      return {
        mode: this.viewmodeConverter.fromSdk(t),
        options: {
          transition: n.transition,
          position: n.position,
          rotation: n.rotation,
          zoom: n.zoom,
        },
      };
    }
    validatePayloadOptions(e) {
      let t, n, a, o;
      if (e) {
        if (
          e.transition &&
          ((a = this.transitionTypeConverter.fromSdkTransition(e.transition)), void 0 === a)
        )
          throw Error(`Mode.moveTo -> ${e.transition} is not a valid transition style`);
        e.rotation && Po(e.rotation) && (t = this.conversion.rotationToQuaternion(e.rotation)),
          e.position &&
            Po(e.position) &&
            (n = new this.THREE.Vector3(
              parseFloat(e.position.x),
              parseFloat(e.position.y),
              parseFloat(e.position.z),
            )),
          e.zoom && !isNaN(e.zoom) && (o = aa(e.zoom, 1, 30));
      }
      return { rotation: t, position: n, transition: a, zoom: o };
    }
  }
  class ko {
    create(e, t, n, a) {
      const o = () => e.onChanged();
      return new ce(a.pose.isPitchFactorOrtho.onChanged(o), n.onChanged(o), t.onChanged(o));
    }
  }
  class Vo {
    constructor(e, t) {
      (this._data = l.Mode.INSIDE), (this.viewmodeConverter = t.viewmodeConverter);
    }
    get data() {
      return this._data;
    }
    equals(e) {
      return this._data === e.data;
    }
    copy(e) {
      this._data = e.data;
    }
    update(e, t, n) {
      const a = t.currentSweep && t.isSweepAligned(t.currentSweep);
      this._data = this.viewmodeConverter.toSdk(
        e.currentMode,
        !!a,
        n.pose.isPitchFactorOrtho.value,
      );
    }
  }
  class Uo extends ae {}
  function Fo(e, t, n) {
    t.addBinding(Uo, async () => {
      const e = await n.getDependencies();
      return await (async function (e, n, a, o) {
        const s = { sid: '', sweeps: [], modelSupportsVr: !1 };
        try {
          const i = n.getSweepList(),
            r = e.model;
          return await t.makeModelData(r.sid, r.options.isVR, i, a, o, s), s;
        } catch (e) {
          throw Error('no model currently loaded');
        }
      })(...e);
    }),
      e.addCommandCreator({ namespace: 'Model', name: 'getData', args: [] }, () => new Uo());
  }
  Uo.id = 'GET_MODEL_DATA';
  class Go extends ae {}
  function Ho(e, t, n, a) {
    a.getDependencies().then((e) =>
      n.addBinding(Go, async () =>
        (function (e, n) {
          function a(e, t) {
            if (n.tryGetProperty(e, !0)) return t;
          }
          const o = e.model;
          return {
            sid: o.sid,
            name: a(t.OptionsKey.DetailsModelName, o.details.name),
            presentedBy: a(t.OptionsKey.PresentedBy, o.details.presentedBy),
            summary: a(t.OptionsKey.DetailsSummary, o.details.summary),
            description: a(t.OptionsKey.DetailsSummary, o.details.description),
            formattedAddress: a(t.OptionsKey.DetailsAddress, o.details.formattedAddress),
            contactEmail: a(t.OptionsKey.DetailsEmail, o.details.contact.email),
            contactName: a(t.OptionsKey.DetailsName, o.details.contact.name),
            phone: a(t.OptionsKey.DetailsPhone, o.details.contact.phone),
            formattedContactPhone: a(t.OptionsKey.DetailsPhone, o.details.contact.formattedPhone),
            externalUrl: a(t.OptionsKey.DetailsExternalUrl, o.details.externalUrl),
          };
        })(...e),
      ),
    ),
      e.addCommandCreator({ namespace: 'Model', name: 'getDetails', args: [] }, () => new Go());
  }
  Go.id = 'GET_MODEL_DETAILS';
  function Bo(e, t) {
    return async function (n, a, o, s, i, r) {
      r.sweeps = [];
      for (const n of o) {
        const a = n.floorId ? s.getFloor(n.floorId).index : -1;
        r.sweeps.push({
          uuid: i.getIdForSweep(n),
          sid: i.getIdForSweep(n),
          alignmentType: t.toSdkAlignment(n.alignmentType),
          placementType: t.toSdkPlacement(n.placementType),
          neighbors: await Promise.all(n.neighbours.map(async (e) => await i.getIdFromCwfId(e))),
          position:
            ((c = n),
            null !== c.position ? { x: c.position.x, y: c.position.y, z: c.position.z } : null),
          rotation: e.quaternionToRotation(n.rotation),
          floor: a,
        });
      }
      var c;
      return (r.sid = n), (r.modelSupportsVr = a), r;
    };
  }
  class zo {
    constructor(e) {
      this.tokenUpdater = e;
    }
    validateInput(e) {
      const { token: t } = e;
      if (!j(t)) throw Error();
      return { token: t };
    }
    async exec(e, t) {
      this.tokenUpdater.setToken(e.token);
    }
  }
  var Wo;
  !(function (e) {
    (e[(e.None = 0)] = 'None'),
      (e[(e.AnonymousFetch = 1)] = 'AnonymousFetch'),
      (e[(e.UserFetch = 2)] = 'UserFetch');
  })(Wo || (Wo = {}));
  const jo = ['$fetchLevel', '$canPlaceInGrid'];
  class $o {
    constructor(e) {
      this.pluginRegistry = e;
    }
    validateInput(e) {
      if (!Oa(e.key)) throw Error(e.key + ' is not a valid object');
      const t = e.key;
      if (!$(t.applicationKey)) throw Error(t.applicationKey + ' is not a valid string');
      if (!$(t.id)) throw Error(t.id + 'is not a valid string');
      if (!$(e.path)) throw Error(e.path + ' is not a valid string');
      return e;
    }
    async exec(e) {
      var t, n, a;
      let o = Wo.AnonymousFetch,
        s = !1;
      void 0 !== (null === (t = e.config) || void 0 === t ? void 0 : t.$fetchLevel)
        ? (o = Ro(e.config.$fetchLevel, Wo.None, Wo.UserFetch))
        : void 0 !== (null === (n = e.config) || void 0 === n ? void 0 : n.$canPlaceInGrid) &&
          (s = e.config.$canPlaceInGrid);
      const i = {};
      for (const t in e.config) jo.includes(t) || (i[t] = e.config[t]);
      const r = Object.assign(
        {},
        null === (a = e.metadata) || void 0 === a ? void 0 : a.peerDependencies,
      );
      return this.pluginRegistry.load({
        applicationKey: e.key.applicationKey,
        id: e.key.id || 'default',
        src: e.path,
        strict: !1,
        fetchLevel: o,
        canPlaceInGrid: s,
        config: i || {},
        peerDependencies: r,
      });
    }
  }
  class qo {
    constructor(e) {
      this.pluginRegistry = e;
    }
    validateInput(e) {
      if (!Oa(e.key)) throw Error(e.key + ' is not a valid object');
      if (!$(e.key.applicationKey)) throw Error(e.key + ' is not a valid string');
      return e;
    }
    async exec(e) {
      return this.pluginRegistry.unload(e.key);
    }
  }
  class Ko {
    create(e, t) {
      return t.onChanged(() => e.onChanged());
    }
  }
  class Yo {
    constructor(e, t) {
      (this.colliderTypes = t),
        (this.ZERO = new e.Vector3(0, 0, 0)),
        (this.tempVec = new e.Vector3()),
        (this._data = {
          position: { x: 0, y: 0, z: 0 },
          normal: { x: 0, y: 0, z: 0 },
          object: u.Colliders.NONE,
          floorId: void 0,
          floorIndex: void 0,
        });
    }
    get data() {
      return this._data;
    }
    equals(e) {
      const t = 1e-5,
        n = e.data.position,
        a = this._data.position,
        o = e.data.normal,
        s = this._data.normal;
      return Bn(n, a, t) && Bn(o, s, t) && e.data.object === this._data.object;
    }
    update(e, t, n, a, o) {
      const s = e.hit;
      s
        ? (kn(this._data.position, s.point),
          kn(this._data.normal, s.face.normal),
          (this._data.floorId = void 0),
          s.object instanceof this.colliderTypes.ModelColliderTarget
            ? ((this._data.object = u.Colliders.MODEL),
              (this._data.floorId = (function (e, t, n, a, o, s) {
                let i;
                const r = o.floorIdFromObject(e.object);
                if (r) return (i = t.getFloor(r)), i.index;
                s.copy(e.point);
                const c = a.meshSubGroupsFromPoint(s);
                if (!c.length) return;
                const d = n.getByMeshSubgroup(c[0]);
                if (!d) return;
                return (i = t.getFloor(d.floorId)), i.index;
              })(s, t, n, a, o, this.tempVec)))
            : s.object instanceof this.colliderTypes.PinHeadMesh ||
                s.object instanceof this.colliderTypes.InstancedPinHeads
              ? (this._data.object = u.Colliders.TAG)
              : s.object instanceof this.colliderTypes.PuckCollider
                ? (this._data.object = u.Colliders.SWEEP)
                : (this._data.object = u.Colliders.UNKNOWN))
        : (kn(this._data.position, this.ZERO),
          kn(this._data.normal, this.ZERO),
          (this._data.object = u.Colliders.NONE),
          (this._data.floorId = void 0)),
        (this._data.floorIndex = this._data.floorId);
    }
    copy(e) {
      kn(this._data.position, e.data.position),
        kn(this._data.normal, e.data.normal),
        (this._data.object = e.data.object),
        (this._data.floorId = e.data.floorId),
        (this._data.floorIndex = e.data.floorIndex);
    }
  }
  class Xo {
    constructor(e, t) {
      (this.cursorController = e), (this.textureAaps = t);
    }
    validateInput(e) {
      if (!j(e.textureId)) throw Error('textureId is not a valid string');
      return { textureId: e.textureId };
    }
    async exec(e, t) {
      const { textureId: n } = e,
        a = this.textureAaps.get(t.client.applicationKey).map[n];
      this.cursorController.setTexture(a);
    }
  }
  class Zo {
    constructor(e) {
      this.cursorController = e;
    }
    validateInput(e) {
      return e;
    }
    async exec(e, t) {
      this.cursorController.setTexture(null);
    }
  }
  class Qo {
    constructor(e) {
      this.cursorController = e;
    }
    validateInput(e) {
      (e = e || {}).props = e.props || {};
      const t = e.props;
      if (t.fadeIn) {
        const e = t.fadeIn;
        if (e.duration && (!No(e.duration) || e.duration <= 0))
          throw Error(
            `Pointer.setFadeProps: fadeIn.duration was specified but was not a valid duration; got ${e.duration}`,
          );
      }
      if (t.fadeOut) {
        const e = t.fadeOut;
        if (e.duration && (!No(e.duration) || e.duration <= 0))
          throw Error(
            `Pointer.setFadeProps: fadeOut.duration was specified but was not a valid duration; got ${e.duration}`,
          );
        if (e.delay && (!No(e.delay) || e.delay <= 0))
          throw Error(
            `Pointer.setFadeProps: fadeOut.delay was specified but was not a valid delay; got ${e.delay}`,
          );
      }
      return e;
    }
    async exec(e, t) {
      this.cursorController.setFadeProps(e.props);
    }
  }
  class Jo {
    constructor(e) {
      (this.cursorController = e), (this.visible = !0), (this.ruleAdded = !1);
    }
    isVisible() {
      return this.visible;
    }
    validateInput(e) {
      if (!Na(e.visible))
        throw Error(
          `Pointer.setVisible: visible was specified but was not a valid boolean; got ${e.visible}`,
        );
      return e;
    }
    async exec(e, t) {
      this.ruleAdded ||
        ((this.isVisible = this.isVisible.bind(this)),
        this.cursorController.addVisibilityRule(this.isVisible),
        (this.ruleAdded = !0)),
        (this.visible = e.visible);
    }
  }
  class es {
    constructor(e) {
      this.r3fModule = e;
    }
    validateInput(e) {
      return e;
    }
    async exec(e, t) {
      return this.r3fModule.registerExternalR3F(e.callbacks);
    }
  }
  const ts = new U('mpSdk.R3F.navigationToggle');
  class ns {
    constructor(e) {
      (this.enabled = !0),
        (this.userNavigationEnabled = () => this.enabled),
        e.addNavigationRule(this.userNavigationEnabled.bind(this));
    }
    validateInput(e) {
      return e;
    }
    async exec(e, t) {
      (this.enabled = e.enabled), ts.debug(e);
    }
  }
  class as {
    constructor(e, t, n, a, o) {
      (this.THREE = e),
        (this.cwfTypes = t),
        (this.commands = n),
        (this.navigation = a),
        (this.viewmodeData = o);
    }
    validateInput(e) {
      if (!e) throw Error('focus: no arguments provided -- "target" point|box is required');
      const t = e.target;
      if (
        !(function (e) {
          if (e && 'object' == typeof e && 'min' in e && 'max' in e) {
            const t = e;
            if (Po(t.min) && Po(t.max)) return !0;
          }
          return !1;
        })(t) &&
        !Po(t)
      )
        throw new Error('focus: invalid "target"');
      const n = e.options;
      if (n) {
        const { from: e, mode: t, transition: a } = n;
        if (e && !Po(e)) throw new Error('focus: "options.from" must be a Vector3|undefined');
        if (t) {
          if (void 0 === this.commands.viewmodeConverter.fromSdk(t))
            throw Error(`focus: ${t} is not a valid "options.mode"`);
        }
        let o = this.cwfTypes.CameraTransitionType.Interpolate;
        if (a && ((o = this.commands.cameraTransitionConverter.fromSdkTransition(a)), void 0 === o))
          throw Error(`focus: ${a} is not a valid "options.transition"`);
      }
      return e;
    }
    async exec(e, t) {
      const n = e.target,
        a = this.convertOptions(e);
      try {
        await this.navigation.focus(n, a);
      } catch (e) {
        console.warn('focus: unable to focus', e);
      }
    }
    convertOptions(e) {
      var t, n, a, o;
      const s = null === (t = e.options) || void 0 === t ? void 0 : t.mode,
        i = s
          ? this.commands.viewmodeConverter.fromSdk(s)
          : null !== (n = this.viewmodeData.currentMode) && void 0 !== n
            ? n
            : void 0,
        r = null === (a = e.options) || void 0 === a ? void 0 : a.from,
        c = r && Po(r) ? new this.THREE.Vector3(r.x, r.y, r.z) : void 0,
        d = null === (o = e.options) || void 0 === o ? void 0 : o.transition;
      return {
        from: c,
        mode: i,
        transition: d
          ? this.commands.cameraTransitionConverter.fromSdkTransition(d)
          : this.cwfTypes.CameraTransitionType.Interpolate,
      };
    }
  }
  const os = new U('mpSdk.R3F.controlsToggle');
  class ss {
    constructor(e) {
      (this.controls = e), (this.sub = null);
    }
    validateInput(e) {
      return e;
    }
    async exec(e, t) {
      if (
        (os.debug(e),
        this.sub && e.enabled && (this.sub.cancel(), (this.sub = null)),
        !this.sub && !e.enabled)
      ) {
        const e = this.controls.cameraPoseProxy;
        this.sub = e.newSession(new is());
      }
    }
  }
  class is {
    constructor() {}
    onAccessGranted(e) {
      os.debug('controls-block granted');
    }
    onAccessRevoked(e) {
      os.debug('controls-block revoked');
    }
  }
  class rs {
    constructor(e, t) {
      (this.captureCamera = e), (this.encodeRenderTarget = t);
    }
    async capture(e, t, n, a) {
      const { camera: o, scene: s } = t.getScene();
      return (
        o.getWorldPosition(this.captureCamera.position),
        o.getWorldQuaternion(this.captureCamera.quaternion),
        this.captureCamera.projectionMatrix.copy(o.projectionMatrix),
        (this.captureCamera.layers.mask = e.visibleObjects.mask),
        a.setSize(e.resolution.width, e.resolution.height),
        n.render(a.target, s, this.captureCamera),
        await this.encodeRenderTarget(a)
      );
    }
  }
  function cs(e) {
    return No(e) && e % 1 == 0;
  }
  const ds = new U('command.takeScreenshot');
  var ls, hs;
  !(function (e) {
    (e.Base64JPG = 'screenshot.base64.jpg'), (e.ArrayBufferJPG = 'screenshot.arraybuffer.jpg');
  })(ls || (ls = {}));
  class us {
    constructor(e, t, n, a, o, s) {
      (this.canvasData = a),
        (this.rendererModule = o),
        (this.renderToTexture = s),
        (this.RenderLayers = t.RenderLayers),
        (this.screenCapturer = e),
        (this.requestTarget = n.requestTarget),
        (this.getRenderLayer = n.getRenderLayer),
        (this.jpegAsBase64 = n.jpegAsBase64);
    }
    validateInput(e) {
      return {
        resolution: this.validateResolution(e.resolution, this.canvasData, this.rendererModule),
        visibleObjects: this.buildVisibilityOptions(e.visibleObjects),
        returnType: e.returnType === ls.ArrayBufferJPG ? ls.ArrayBufferJPG : ls.Base64JPG,
      };
    }
    async exec(e, t) {
      const n = await this.requestTarget(),
        a = await this.screenCapturer.capture(
          {
            resolution: e.resolution,
            visibleObjects: this.buildVisibilityLayers(e.visibleObjects),
          },
          this.rendererModule,
          this.renderToTexture,
          n,
        );
      return e.returnType === ls.ArrayBufferJPG ? a.buffer : this.jpegAsBase64(a);
    }
    validateResolution(e, t, n) {
      const a = { width: 0, height: 0 };
      if (!e) return (a.width = t.width), (a.height = t.height), a;
      if (
        !(function (e) {
          const t = e;
          return !!t && 'number' == typeof t.width && 'number' == typeof t.height;
        })(e)
      )
        throw Error(
          '"resolution" provided was not valid. Expected .width and .height to be numbers.',
        );
      (a.width = e.width), (a.height = e.height);
      const o = n.maxTextureSize;
      if (e.width <= 0 || e.width > o)
        throw Error('"resolution.width" provided was outside the valid range of [0, ' + o + ']');
      if (e.height <= 0 || e.height > o)
        throw Error('"resolution.height" provided was outside the valid range of [0, ' + o + ']');
      if (!cs(a.width)) {
        const e = Math.round(a.width);
        ds.info(`Integer width expected. Rounding from ${a.width} to ${e}`), (a.width = e);
      }
      if (!cs(a.height)) {
        const e = Math.round(a.height);
        ds.info(`Integer width expected. Rounding from ${a.height} to ${e}`), (a.height = e);
      }
      return a;
    }
    buildVisibilityOptions(e) {
      const t = e || {};
      return {
        measurements: !!t.measurements,
        mattertags: !!t.mattertags,
        sweeps: !!t.sweeps,
        views: !!t.views,
      };
    }
    buildVisibilityLayers(e) {
      const t = this.RenderLayers.ALL;
      return (
        e.mattertags || t.removeLayers(this.getRenderLayer('pins')),
        e.measurements || t.removeLayers(this.getRenderLayer('measurements')),
        e.sweeps || t.removeLayers(this.getRenderLayer('sweep-pucks')),
        e.views ||
          (t.removeLayers(this.getRenderLayer('sweep-portal-mesh')),
          t.removeLayers(this.getRenderLayer('sweep-pin-mesh'))),
        t
      );
    }
  }
  class ps {
    constructor(e, t, n, a, o, s, i, r) {
      (this.renderer = a),
        (this.renderToTexture = o),
        (this.viewmodeData = s),
        (this.sweepData = i),
        (this.sweepTextureLoader = r),
        (this.Viewmode = t.Viewmode),
        (this.requestTarget = n.requestTarget),
        (this.encodeRenderTarget = n.encodeRenderTarget),
        (this.jpegAsBase64 = n.jpegAsBase64),
        (this.getXmp = n.getXmp),
        (this.getOrientedAngleTo = n.getOrientedAngleTo),
        (this.forward = new e.Vector3(0, 0, -1)),
        (this.sweepForward = new e.Vector3()),
        (this.viewForward = new e.Vector3());
    }
    validateInput(e) {
      return e;
    }
    async exec(e, t) {
      if (!this.sweepData.currentSweep || this.viewmodeData.currentMode !== this.Viewmode.Panorama)
        throw new Error('Can only capture equirectangular projections while stationary in a sweep');
      const n = this.renderer.getScene().camera,
        a = this.sweepData.getSweep(this.sweepData.currentSweep),
        o = await this.sweepTextureLoader.load(a);
      this.sweepForward.copy(this.forward),
        this.sweepForward.copy(this.forward).applyQuaternion(a.rotation).setY(0);
      const s =
          this.getOrientedAngleTo(
            this.sweepForward,
            n.getWorldDirection(this.viewForward).setY(0),
          ) + Math.PI,
        i = await this.requestTarget();
      i.setSize(ps.equirectangularRes.width, ps.equirectangularRes.height),
        this.renderToTexture.renderEquirectangular(o, i.target, s);
      const r = await this.encodeRenderTarget(i, this.getXmp(i.width, i.height, 0, 0));
      return this.jpegAsBase64(r);
    }
  }
  ps.equirectangularRes = { width: 4096, height: 2048 };
  class ms {
    constructor(e, t) {
      (this.issueCommand = t.issueCommand),
        (this.GetScreenPositionCommand = e.GetScreenPositionCommand);
    }
    validateInput(e) {
      if (!Po(e.worldPosition))
        throw Error(
          `Renderer.getScreenPosition: 'worldPosition' was specified but was not a valid Vector3; got ${e.worldPosition}`,
        );
      return e;
    }
    async exec(e, t) {
      return await this.issueCommand(new this.GetScreenPositionCommand(e));
    }
  }
  class gs {
    constructor(e, t, n) {
      (this.floorsData = n),
        (this.GetFloorIntersectCommand = e.GetFloorIntersectCommand),
        (this.issueCommand = t.issueCommand);
    }
    validateInput(e) {
      if (
        !(function (e) {
          if (e && 'object' == typeof e && 'x' in e && 'y' in e) {
            const t = e;
            return No(t.x) && No(t.y);
          }
          return !1;
        })(e.screenPosition)
      )
        throw Error(
          `Renderer.getWorldPositionData: 'screenPosition' was not a valid Vector2; got ${e.screenPosition}`,
        );
      return e;
    }
    async exec(e, t) {
      const n = await this.issueCommand(new this.GetFloorIntersectCommand(e)),
        a = this.floorsData.getFloorAtIndex(n.floorIndex);
      return a
        ? { position: n.position, floorInfo: { id: a.id, sequence: a.index }, floor: n.floorIndex }
        : { position: n.position, floorInfo: { id: '', sequence: -1 }, floor: -1 };
    }
  }
  function fs(e, t, n, a, o, s, i) {
    (e.id = n.getIdFromCwfId(t.id)),
      (e.label = i && i.hasRoom(t.id) ? i.getRoomLabel(t.id, '') : ''),
      (e.bounds = e.bounds || {}),
      (e.bounds.min = ao(a.boundingBox, 'min', e.bounds.min)),
      (e.bounds.max = ao(a.boundingBox, 'max', e.bounds.max)),
      (e.floorInfo = (function (e, t, n, a) {
        a = a || {};
        try {
          const o = t.getFloor(e);
          (a.id = n.getIdFromCwfId(o.id)), (a.sequence = o.index);
        } catch (e) {
          (a.id = ''), (a.sequence = -1);
        }
        return a;
      })(t.floorId, o, s, e.floorInfo));
  }
  class ws {
    constructor() {
      (this.wasTransitioning360 = !1), (this.cameraPosition = { x: 0, y: 0, z: 0 });
    }
    create(e, t, n, a, o) {
      return new ce(
        a.onChanged(() => this.throttleCameraPositionChanges(e, a)),
        o.onChanged(() => this.throttleSweepChanges(e, o)),
      );
    }
    throttleCameraPositionChanges(e, t) {
      const n = t.pose.position;
      (n.x === this.cameraPosition.x &&
        n.y === this.cameraPosition.y &&
        n.z === this.cameraPosition.z) ||
        ((this.cameraPosition.x = n.x),
        (this.cameraPosition.y = n.y),
        (this.cameraPosition.z = n.z),
        e.onChanged());
    }
    throttleSweepChanges(e, t) {
      const n = t.transition;
      t.transitionActive
        ? (t.isSweepUnaligned(n.from) || t.isSweepUnaligned(n.to)) &&
          (this.wasTransitioning360 = !0)
        : this.wasTransitioning360 &&
          !t.isSweepUnaligned(t.currentSweep) &&
          (e.onChanged(), (this.wasTransitioning360 = !1));
    }
  }
  class ys {
    constructor() {
      this.currentRooms = { rooms: [] };
    }
    get data() {
      return this.currentRooms;
    }
    equals(e) {
      return (
        this.data.rooms.length === e.data.rooms.length &&
        this.currentRooms.rooms.every((t) => e.data.rooms.findIndex((e) => e.id === t.id) > -1)
      );
    }
    copy(e) {
      (this.currentRooms.rooms.length = e.data.rooms.length),
        Un(this.currentRooms.rooms, e.data.rooms);
    }
    update(e, t, n, a, o, s, i, r, c) {
      if (
        (o.isInside() && a.isSweepUnaligned(a.currentSweep)) ||
        (a.transitionActive &&
          (a.isSweepUnaligned(a.transition.to) || a.isSweepUnaligned(a.transition.from)))
      )
        return void (this.currentRooms.rooms.length = 0);
      const d = s.meshSubGroupsFromPoint(n.pose.position);
      this.currentRooms.rooms.length = 0;
      for (let n = 0; n < d.length; ++n) {
        const a = d[n],
          o = e.getByMeshSubgroup(a),
          l = s.meshGroups.rooms.get(a);
        if (!o || !l) continue;
        const h = this.currentRooms.rooms[n] || {};
        fs(h, o, i, l, t, r, c.get()), this.currentRooms.rooms.push(h);
      }
    }
  }
  class Is {
    constructor() {}
    create(e, t) {
      return { renew() {}, cancel() {} };
    }
  }
  class Ts {
    constructor(e, t, n, a, o, s) {
      (this.roomData = e),
        (this.floorData = t),
        (this.roomIdMap = n),
        (this.floorIdMap = a),
        (this.meshData = o),
        (this.roomBoundData = s),
        (this._data = {});
    }
    get data() {
      return this._data;
    }
    isItemEqual(e, t) {
      const n = this.data[t],
        a = e.data[t];
      return n.id === a.id && Bn(n.bounds.min, a.bounds.min) && Bn(n.bounds.max, a.bounds.max);
    }
    update() {
      for (const e of this.roomData.rooms()) {
        const t = this.meshData.meshGroups.rooms.get(e.meshSubgroup);
        if (!t) continue;
        const n = this.roomIdMap.getIdFromCwfId(e.id),
          a = this._data[n] || {};
        fs(a, e, this.roomIdMap, t, this.floorData, this.floorIdMap, this.roomBoundData.get()),
          (this._data[n] = a);
      }
      for (const e in this.data) {
        this.roomIdMap.getRoomForId(e) || delete this._data[e];
      }
    }
    clear() {
      this._data = {};
    }
  }
  class Es {
    constructor(e, t) {
      (this.RoomData = e), (this.FloorsData = t);
    }
    validateInput(e) {
      return { invert: !!(null == e ? void 0 : e.invert) || !1 };
    }
    async exec(e, t) {
      return this.RoomData.getRoomIdMap(this.FloorsData, e.invert);
    }
  }
  !(function (e) {
    (e.OUTPUT = 'output'), (e.INPUT = 'input'), (e.EVENT = 'event'), (e.EMIT = 'emit');
  })(hs || (hs = {}));
  class vs {
    constructor(e) {
      this.sceneModule = e;
    }
    validateInput(e) {
      if (!j(e.name)) throw Error(`Scene.register name ${e.name} is not a string`);
      if (!e.factory || 'function' != typeof e.factory)
        throw Error('Scene.register factory is not a function');
      return e;
    }
    async exec(e, t) {
      if (
        this.sceneModule.registerFactory(
          { scope: t.client.applicationKey, name: e.name },
          e.factory,
        )
      )
        return {
          dispose: () => {
            this.sceneModule.unregisterFactory(e.name, e.factory);
          },
        };
      throw Error('There was an error registering the scene component');
    }
  }
  class Cs {
    constructor(e) {
      this.sceneModule = e;
    }
    validateInput(e) {
      return e;
    }
    async exec(e, t) {
      return this.sceneModule
        .createNode(t.client.applicationKey, { owner: t.client.id })
        .publicFacade();
    }
  }
  class As extends ae {
    constructor(e) {
      super(), (this.payload = e);
    }
  }
  As.id = 'SCENE_QUERY';
  class Ss extends ae {
    constructor(e) {
      super(), (this.payload = e);
    }
  }
  Ss.id = 'SCENE_CONFIGURE';
  class bs extends ae {
    constructor(e) {
      super(), (this.payload = e);
    }
  }
  bs.id = 'SCENE_GETIMAGE';
  (class extends ae {
    constructor(e) {
      super(), (this.payload = e);
    }
  }).id = 'SCENE_EXPORT';
  class Ds {
    constructor(e) {
      this.sceneModule = e;
    }
    validateInput(e) {
      return e;
    }
    async exec(e, t) {
      return this.sceneModule.deserialize(t.client.applicationKey, e.text, t.client.id).object;
    }
  }
  const Os = new U('serialize');
  class Ns {
    constructor(e) {
      this.sceneModule = e;
    }
    validateInput(e) {
      return e;
    }
    async exec(e, t) {
      Array.isArray(e.objects) &&
        Os.warn(
          'Serializing an array of ISceneNodes is deprecated and may produce an unexpected result.                Serialization of the ISceneObject container should be done instead.',
        );
      return Array.isArray(e.objects)
        ? this.sceneModule.serializeNodeList(e.objects)
        : this.sceneModule.serialize(e.objects);
    }
  }
  class Ms {
    constructor(e) {
      this.sceneModule = e;
    }
    validateInput(e) {
      if (!No(e.count)) throw Error('count is not a valid number');
      return e;
    }
    async exec(e, t) {
      const n = [];
      for (let a = 0; a < e.count; a++) {
        const e = this.sceneModule.createNode(t.client.applicationKey, { owner: t.client.id });
        n.push(e.publicFacade());
      }
      return n;
    }
  }
  class Rs {
    constructor(e) {
      this.sceneModule = e;
    }
    validateInput(e) {
      if (!Va(e.components, Oa))
        throw Error('Scene.registerComponents array elements must be objects');
      for (const t of e.components) {
        if (!j(t.name)) throw Error(`Scene.registerComponents name ${t.name} is not a string`);
        if (!t.factory || 'function' != typeof t.factory)
          throw Error('Scene.registerComponents factory is not a function');
      }
      return e;
    }
    async exec(e, t) {
      const n = [];
      for (const a of e.components) {
        if (
          !this.sceneModule.registerFactory(
            { scope: t.client.applicationKey, name: a.name },
            a.factory,
          )
        )
          throw Error('There was an error registering a scene component');
        {
          const e = this.sceneModule,
            t = (function (t, n) {
              return {
                dispose: function () {
                  e.unregisterFactory(t, n);
                },
              };
            })(a.name, a.factory);
          n.push(t);
        }
      }
      return n;
    }
  }
  class Ps {
    constructor(e) {
      this.sceneModule = e;
    }
    validateInput(e) {
      if (!No(e.count)) throw Error('count is not a valid number');
      return e;
    }
    async exec(e, t) {
      const n = [];
      for (let a = 0; a < e.count; a++)
        n.push(
          this.sceneModule
            .createObject(t.client.applicationKey, { owner: t.client.id })
            .publicFacade(),
        );
      return n;
    }
  }
  (class extends ae {
    constructor(e) {
      super(), (this.payload = e);
    }
  }).id = 'SCENE_UNREGISTER_COMPONENTS';
  class Ls {
    constructor(e) {
      this.sceneModule = e;
    }
    validateInput(e) {
      if (((e = e || {}), !Array.isArray(e.components))) throw Error('components must be an array');
      return (e.components = e.components || []), e;
    }
    async exec(e) {
      for (const t of e.components) this.sceneModule.unregisterFactory(t.name, t.factory);
    }
  }
  class xs {
    constructor(e, t) {
      (this.sensorModule = e), (this.sensorMap = t);
    }
    validateInput(e) {
      if (!j(e.sensorId) || !this.sensorMap.has(e.sensorId))
        throw Error('dev error: this should not occur unless the sdk was not setup properly');
      if (!Na(e.show)) throw Error(`Sensor.showDebug: 'show' was not a boolean; got ${e.show}`);
      return { sensorId: e.sensorId, show: e.show };
    }
    async exec(e) {
      if (e.show) {
        const t = this.sensorMap.get(e.sensorId);
        this.sensorModule.setDebugSensor(t);
      } else this.sensorModule.setDebugSensor(null);
    }
  }
  class _s {
    constructor(e) {
      (this.sensor = e),
        (this.sourceMap = new Map()),
        (this.reverseSourceLookup = new Map()),
        (this.sourceId = 0),
        (this._data = {});
    }
    get data() {
      return this._data;
    }
    isItemEqual(e, t) {
      return e.data[t].inRange === this.data[t].inRange && e.data[t].inView === this.data[t].inView;
    }
    update() {
      for (const [e, t] of this.sensor.readings) {
        const n = this.addOrGetSourceId(e),
          a = this._data[n] || {};
        (a.inRange = t.inRange),
          (a.inView = t.inView),
          (a.distanceSquared = t.distanceSq),
          (a.direction = ao(t, 'direction', a.direction)),
          (this._data[n] = a);
      }
      for (const e in this.data) {
        const t = this.reverseSourceLookup.get(e);
        t &&
          !this.sensor.readings.get(t) &&
          (this.sourceMap.delete(t), this.reverseSourceLookup.delete(e), delete this._data[e]);
      }
    }
    clear() {
      this._data = {};
    }
    addOrGetSourceId(e) {
      const t = this.sourceMap.get(e);
      if (t) return t;
      const n = 'source-' + ++this.sourceId;
      return this.sourceMap.set(e, n), this.reverseSourceLookup.set(n, e), n;
    }
  }
  class ks {
    constructor() {
      this._data = { origin: { x: 0, y: 0, z: 0 }, forward: { x: 0, y: 0, z: -1 } };
    }
    get data() {
      return this._data;
    }
    equals(e) {
      const t = 1e-5;
      return Bn(this.data.origin, e.data.origin, t) && Bn(this.data.forward, e.data.forward, t);
    }
    copy(e) {
      kn(this._data.origin, e.data.origin), kn(this._data.forward, e.data.forward);
    }
    update(e) {
      kn(this._data.origin, e.frustum.origin), kn(this._data.forward, e.frustum.forward);
    }
  }
  class Vs {
    constructor(e, t, n, a, o) {
      (this.sdk = e),
        (this.sensorFactories = t),
        (this.sensors = n),
        (this.sensorMap = a),
        (this.removerMap = o);
    }
    validateInput(e) {
      if (!Pn(m.SensorType, e.type)) throw Error(e.type + ' is not a valid sensor type');
      return this.sensorFactories[e.type].validateInput(e);
    }
    async exec(e, t) {
      const n = this.sensorFactories[e.type].create(e, this.sensors),
        a = 'sensor-' + ++Vs.nextSensorId;
      this.sensorMap.set(a, n);
      const o = Z.create(new x(n), new Fs(), new _(ks)),
        s = this.sdk.addObservable(a, o),
        i = ma.create(new x(n), new Gs(), new _(_s)),
        r = this.sdk.addCollection(a, i);
      return (
        this.removerMap.set(a, {
          dispose() {
            s.dispose(), r.dispose();
          },
        }),
        { sensorId: a }
      );
    }
  }
  Vs.nextSensorId = 0;
  class Us {
    validateInput(e) {
      return e;
    }
    create(e, t) {
      return t.createCameraBoundSensor();
    }
  }
  class Fs {
    create(e, t) {
      return t.frustum.observe(new Hs(e));
    }
  }
  class Gs {
    create(e, t) {
      return t.onReadingsUpdated(new Hs(e));
    }
  }
  class Hs {
    constructor(e) {
      this.dependencyObserver = e;
    }
    notify() {
      this.dependencyObserver.onChanged();
    }
  }
  class Bs {
    constructor(e, t) {
      (this.sensorMap = e), (this.sourceMap = t);
    }
    validateInput(e) {
      if (!j(e.sensorId) || !this.sensorMap.has(e.sensorId))
        throw Error('dev error: this should not occur unless the sdk was not setup properly');
      if (!Va(e.sourceIds, j))
        throw Error('dev error: this should not occur unless the sdk was not setup properly');
      for (const t of e.sourceIds)
        if (!this.sourceMap.has(t))
          throw Error('dev error: this should not occur unless the sdk was not setup properly');
      return { sensorId: e.sensorId, sourceIds: e.sourceIds };
    }
    async exec(e) {
      const t = this.sensorMap.get(e.sensorId),
        n = e.sourceIds.map(this.sourceMap.get, this.sourceMap);
      t.addSource(...n);
    }
  }
  class zs {
    constructor(e, t) {
      (this.sensorMap = e), (this.removerMap = t);
    }
    validateInput(e) {
      if (!j(e.sensorId) || !this.sensorMap.has(e.sensorId))
        throw Error('dev error: this should not occur unless the sdk was not setup properly');
      return { sensorId: e.sensorId };
    }
    async exec(e) {
      this.removerMap.get(e.sensorId).dispose();
      this.sensorMap.get(e.sensorId).dispose();
    }
  }
  const Ws = { namespace: 'Sensor', name: 'createSensor', subRoutine: 'sensor.create', args: [] },
    js = {
      namespace: 'Sensor',
      name: 'createSource',
      subRoutine: 'source.create',
      args: ['type', 'options'],
    };
  class $s {
    constructor(e, t, n) {
      (this.radius = 1 / 0), (this.type = e.SPHERE), (this._volume = t);
    }
    get origin() {
      return this._volume.origin;
    }
    get volume() {
      return this._volume;
    }
    describeVolume() {
      return { origin: this._volume.origin, radius: this._volume.radius };
    }
  }
  const qs = Math.PI / 180;
  class Ks {
    constructor(e, t, n) {
      (this.type = e.BOX),
        (this._volume = t),
        (this.eulerCache = new n.Euler()),
        (this.quaternionCache = new n.Quaternion());
    }
    get origin() {
      return this._volume.origin;
    }
    get volume() {
      return this._volume;
    }
    describeVolume() {
      return {
        center: this._volume.center,
        size: this._volume.size,
        orientation: this.convertQuaternionToOrientation(this._volume.orientation),
      };
    }
    updateOrientation(e) {
      this.eulerCache.set(e.pitch * qs, e.yaw * qs, e.roll * qs, 'YXZ'),
        this.quaternionCache.setFromEuler(this.eulerCache),
        this._volume.updateOrientation(this.quaternionCache);
    }
    convertQuaternionToOrientation(e) {
      return (
        this.eulerCache
          .setFromQuaternion(this.quaternionCache.set(e.x, e.y, e.z, e.w))
          .reorder('YXZ'),
        { yaw: this.eulerCache.y * qs, pitch: this.eulerCache.x * qs, roll: this.eulerCache.z * qs }
      );
    }
  }
  class Ys {
    constructor(e, t, n) {
      (this.type = e.CYLINDER), (this._volume = t);
    }
    get origin() {
      return this._volume.origin;
    }
    get volume() {
      return this._volume;
    }
    describeVolume() {
      return {
        basePoint: this._volume.basePoint,
        height: this._volume.height,
        radius: this._volume.radius,
      };
    }
  }
  function Xs(e) {
    if (e && 'object' == typeof e && 'yaw' in e && 'pitch' in e && 'roll' in e) {
      const t = e;
      return No(t.yaw) && No(t.pitch) && No(t.roll);
    }
    return !1;
  }
  class Zs {
    constructor(e, t) {
      (this.sourceFactories = e), (this.sourceMap = t);
    }
    validateInput(e) {
      if (!Pn(m.SourceType, e.type)) throw Error(e.type + ' is not a valid source type');
      return this.sourceFactories[e.type].validateInput(e);
    }
    async exec(e) {
      const t = this.sourceFactories[e.type].create(e),
        n = 'source-' + ++Zs.nextSourceId;
      return this.sourceMap.set(n, t), { sourceId: n, type: e.type, volume: t.describeVolume() };
    }
  }
  Zs.nextSourceId = 0;
  class Qs {
    constructor(e, t, n) {
      (this.sourceType = e), (this.sphereVolumeFactory = t), (this.THREE = n);
    }
    validateInput(e) {
      if (Oa(e.options)) {
        if (e.options.origin && !Po(e.options.origin))
          throw Error(
            `Source.Box: 'origin' was specified but was not a valid Vector3; got ${e.options.origin}`,
          );
        if (e.options.radius && (!No(e.options.radius) || e.options.radius < 0))
          throw Error(
            `Source.Sphere: 'radius' was specified but was not a positive number or Infinity; got ${e.options.radius}`,
          );
      }
      const t = e.options || {};
      return {
        type: e.type,
        options: {
          origin: t.origin || { x: 0, y: 0, z: 0 },
          radius: t.hasOwnProperty('radius') ? t.radius : 1 / 0,
        },
      };
    }
    create(e) {
      const t = new $s(this.sourceType, new this.sphereVolumeFactory(), this.THREE),
        n = t.volume;
      return n.updateOrigin(e.options.origin), n.updateRadius(e.options.radius), t;
    }
  }
  class Js {
    constructor(e, t, n) {
      (this.sourceType = e), (this.boxVolumeFactory = t), (this.THREE = n);
    }
    validateInput(e) {
      if (Oa(e.options)) {
        if (e.options.center && !Po(e.options.center))
          throw Error(
            `Source.Box: 'center' was specified but was not a valid Vector3; got ${e.options.center}`,
          );
        if (
          e.options.size &&
          (!Po(e.options.size) ||
            e.options.size.x < 0 ||
            e.options.size.y < 0 ||
            e.options.size.z < 0)
        )
          throw Error(
            `Source.Box: 'size' was specified but was not a valid Vector3; got ${e.options.size}`,
          );
        if (e.options.orientation && !Xs(e.options.orientation))
          throw Error(
            `Source.Box: 'orientation' was specified but was not a valid Orientation; got ${e.options.orientation}`,
          );
      }
      const t = e.options || {};
      return {
        type: e.type,
        options: {
          center: t.center || { x: 0, y: 0, z: 0 },
          size: t.size || { x: 1 / 0, y: 1 / 0, z: 1 / 0 },
          orientation: t.orientation || { yaw: 0, pitch: 0, roll: 0 },
        },
      };
    }
    create(e) {
      const t = new Ks(this.sourceType, new this.boxVolumeFactory(), this.THREE),
        n = t.volume;
      return (
        n.updateCenter(e.options.center),
        n.updateDimensions(e.options.size),
        t.updateOrientation(e.options.orientation),
        t
      );
    }
  }
  class ei {
    constructor(e, t, n) {
      (this.sourceType = e), (this.cylinderVolumeFactory = t), (this.THREE = n);
    }
    validateInput(e) {
      if (Oa(e.options)) {
        if (e.options.basePoint && !Po(e.options.basePoint))
          throw Error(
            `Source.Cylinder: 'basePoint' was specified but was not a valid Vector3; got ${e.options.basePoint}`,
          );
        if (e.options.hasOwnProperty('height') && (!No(e.options.height) || e.options.height < 0))
          throw Error(
            `Source.Cylinder: 'height' was specified but was not a positive number or Infinity; got ${e.options.height}`,
          );
        if (e.options.hasOwnProperty('radius') && (!No(e.options.radius) || e.options.radius < 0))
          throw Error(
            `Source.Cylinder: 'radius' was specified but was not a positive number or Infinity; got ${e.options.radius}`,
          );
      }
      const t = e.options || {};
      return {
        type: e.type,
        options: {
          basePoint: t.basePoint || { x: 0, y: 0, z: 0 },
          height: t.hasOwnProperty('height') ? t.height : 1 / 0,
          radius: t.hasOwnProperty('radius') ? t.radius : 1 / 0,
        },
      };
    }
    create(e) {
      const t = new Ys(this.sourceType, new this.cylinderVolumeFactory(), this.THREE),
        n = t.volume;
      return (
        n.updateBasePoint(e.options.basePoint),
        n.updateHeight(e.options.height),
        n.updateRadius(e.options.radius),
        t
      );
    }
  }
  class ti {
    constructor(e, t) {
      (this.sourceUpdaters = e), (this.sourceMap = t);
    }
    validateInput(e) {
      if (!j(e.sourceId) || !this.sourceMap.has(e.sourceId))
        throw Error('dev error: this should not occur unless the sdk was not setup properly');
      const t = this.sourceMap.get(e.sourceId);
      return this.sourceUpdaters[t.type].validateInput(e);
    }
    async exec(e) {
      const t = this.sourceMap.get(e.sourceId);
      this.sourceUpdaters[t.type].update(e, t);
    }
  }
  class ni {
    validateInput(e) {
      if (!Oa(e.options)) throw Error('Source.Sphere.update: invalid options provided to .update');
      if (!Po(e.options.origin))
        throw Error(
          `Source.Sphere.update: 'origin' was specified but was not a valid Vector3; got ${e.options.origin}`,
        );
      if (!No(e.options.radius) || e.options.radius < 0)
        throw Error(
          `Source.Sphere.update: 'radius' was specified but was not a positive number or Infinity; got ${e.options.radius}`,
        );
      return e;
    }
    update(e, t) {
      const n = t.volume;
      n.updateOrigin(e.options.origin), n.updateRadius(e.options.radius), n.notify();
    }
  }
  class ai {
    validateInput(e) {
      if (!Oa(e.options)) throw Error('Source.Box.update: invalid options provided to .update');
      if (e.options.center && !Po(e.options.center))
        throw Error(
          `Source.Box.update: 'center' was specified but was not a valid Vector3; got ${e.options.center}`,
        );
      if (
        e.options.size &&
        !(
          Po(e.options.size) &&
          e.options.size.x >= 0 &&
          e.options.size.y >= 0 &&
          e.options.size.z >= 0
        )
      )
        throw Error(
          `Source.Box.update: 'size' was specified but was not a valid Vector3; got ${JSON.stringify(e.options.size)}\n        ${'object' == typeof e}`,
        );
      if (e.options.orientation && !Xs(e.options.orientation))
        throw Error(
          `Source.Box.update: 'orientation' was specified but was not a valid Orientation; got ${e.options.orientation}`,
        );
      return e;
    }
    update(e, t) {
      const n = t.volume;
      n.updateCenter(e.options.center),
        n.updateDimensions(e.options.size),
        t.updateOrientation(e.options.orientation),
        n.notify();
    }
  }
  class oi {
    validateInput(e) {
      if (!Oa(e.options))
        throw Error('Source.Cylinder.update: invalid options provided to .update');
      if (e.options.basePoint && !Po(e.options.basePoint))
        throw Error(
          `Source.Cylinder.update: 'basePoint' was specified but was not a valid Vector3; got ${e.options.basePoint}`,
        );
      if (e.options.hasOwnProperty('height') && (!No(e.options.height) || e.options.height < 0))
        throw Error(
          `Source.Cylinder.update: 'height' was specified but was not a positive number or Infinity; got ${e.options.height}`,
        );
      if (e.options.hasOwnProperty('radius') && (!No(e.options.radius) || e.options.radius < 0))
        throw Error(
          `Source.Cylinder: 'radius' was specified but was not a positive number or Infinity; got ${e.options.radius}`,
        );
      return e;
    }
    update(e, t) {
      const n = t.volume;
      n.updateBasePoint(e.options.basePoint),
        n.updateHeight(e.options.height),
        n.updateRadius(e.options.radius),
        n.notify();
    }
  }
  function si(e, t, n) {
    const a = new Map(),
      o = new Map();
    return function (s, i) {
      !(function (e, t, n, a) {
        const o = new Map(),
          s = G.create(new x(t, n), new _(Bs)),
          i = G.create(new x(t, o), new _(zs)),
          r = G.create(x.extend(a, t), new _(xs));
        e.addCommand('Sensor.addSource', s),
          e.addCommand('sensor.dispose', i),
          e.addCommand('sensor.showDebug', r);
        const c = { [m.SensorType.CAMERA]: new Us() },
          d = G.create(x.extend(a, t, o), new _(Vs, e, c));
        e.addCommandToInterface(Object.assign({}, Ws), d),
          e.addEnumToInterface({ namespace: 'Sensor', name: 'SensorType', values: m.SensorType });
      })(s, a, o, i),
        (function (e, t, n, a, o) {
          const s = new x(t),
            i = { [a.SPHERE]: new ni(), [a.BOX]: new ai(), [a.CYLINDER]: new oi() },
            r = G.create(s, new _(ti, i));
          e.addCommand('Sensor.updateSource', r);
          const c = {
              [m.SourceType.SPHERE]: new Qs(a, o.sphere, n),
              [m.SourceType.BOX]: new Js(a, o.box, n),
              [m.SourceType.CYLINDER]: new ei(a, o.cylinder, n),
            },
            d = G.create(s, new _(Zs, c));
          e.addCommandToInterface(Object.assign({}, js), d),
            e.addEnumToInterface({ namespace: 'Sensor', name: 'SourceType', values: m.SourceType });
        })(s, o, e, t, n);
    };
  }
  var ii;
  !(function (e) {
    e.FPS = 'stat.fps';
  })(ii || (ii = {}));
  class ri {
    constructor(e, t) {
      (this.perfStatInterval = 1e3),
        (this.elapsedTime = 0),
        (this.frameCount = 0),
        (this.lastCalcTime = 0),
        (this.fps = [0]),
        (this.waitForUpdate = e),
        (this.perfStatInterval = t.tryGetProperty('perfInterval', this.perfStatInterval));
    }
    async calcAndBroadcast(e) {
      await this.waitForUpdate();
      const t = Date.now(),
        n = t - this.lastCalcTime;
      (this.lastCalcTime = t),
        (this.elapsedTime += n),
        this.frameCount++,
        this.elapsedTime >= this.perfStatInterval &&
          ((this.fps[0] = (1e3 * this.frameCount) / this.elapsedTime),
          (this.elapsedTime = 0),
          (this.frameCount = 0),
          e.broadcast(ii.FPS, () => this.fps)),
        this.calcAndBroadcast(e);
    }
  }
  function ci(e, t = '', n = '') {
    let a = 'sdkStorage/';
    return t && t.length > 0 && (a = a + t + '/'), n && n.length > 0 && (a = a + n + '/'), a + e;
  }
  class di {
    constructor(e) {
      this.modelData = e;
    }
    validateInput(e) {
      const t = null == e ? void 0 : e.key;
      if (!t || 'string' != typeof t) throw Error(t + ' is not a valid key');
      return e;
    }
    async exec(e) {
      localStorage.setItem(ci(e.key, this.modelData.model.sid), JSON.stringify(e.data));
    }
  }
  class li {
    constructor(e) {
      this.modelData = e;
    }
    validateInput(e) {
      const t = null == e ? void 0 : e.key;
      if (!t || 'string' != typeof t) throw Error(t + ' is not a valid key');
      return { key: e.key };
    }
    async exec(e) {
      const t = localStorage.getItem(ci(e.key, this.modelData.model.sid));
      return t ? JSON.parse(t) : null;
    }
  }
  class hi {
    constructor(e) {
      this.modelData = e;
    }
    validateInput(e) {
      let t = null == e ? void 0 : e.modelId;
      if (null == t) t = this.modelData.model.sid;
      else if ('*' === t) t = '';
      else if ('string' != typeof t) throw Error(t + ' is not a valid key');
      return { modelId: t };
    }
    async exec(e) {
      const t = ci('', e.modelId),
        n = {};
      for (const [e, a] of Object.entries(localStorage))
        e.startsWith(t) && (n[e.slice(t.length)] = JSON.parse(a));
      return n;
    }
  }
  class ui {
    constructor(e) {
      this.modelData = e;
    }
    validateInput(e) {
      const t = null == e ? void 0 : e.key;
      if (!t || 'string' != typeof t) throw Error(t + ' is not a valid key');
      return { key: e.key };
    }
    async exec(e) {
      localStorage.removeItem(ci(e.key, this.modelData.model.sid));
    }
  }
  class pi {
    constructor(e, t) {
      (this.toSdkAlignmentMap = {
        [e.ALIGNED]: g.Alignment.ALIGNED,
        [e.UNALIGNED]: g.Alignment.UNALIGNED,
      }),
        (this.toSdkPlacementMap = {
          [t.UNPLACED]: g.Placement.UNPLACED,
          [t.AUTO]: g.Placement.AUTO,
          [t.MANUAL]: g.Placement.MANUAL,
        });
    }
    toSdkAlignment(e) {
      return this.toSdkAlignmentMap[e];
    }
    toSdkPlacement(e) {
      return this.toSdkPlacementMap[e];
    }
  }
  const mi = Object.freeze({
    signedUrlDefaultExpireTime: 24e4,
    signedUrlCheckInterval: 1e4,
    signedUrlRefreshBuffer: 15e3,
    visionTilingStartDate: new Date('8/26/2016'),
    visionTilingStartVersion: '1.1.407.13667',
    defurnishableStartDate: new Date('03/10/2023'),
    defurnishableStartVersion: '1.2.29221.4-gcac59bd3ec.REL_1425',
    epsilon: 1e-5,
    skyboxMeshGroup: '_group_skybox_',
    skysphereMeshGroup: '_group_skysphere_',
  });
  class gi {
    constructor() {
      (this.currentSweep = ''),
        (this.sweepTransitionActive = !1),
        (this.currentMode = null),
        (this.modeTransitionActive = !1);
    }
    create(e, t, n) {
      return new ce(
        t.onChanged(() => this.throttleSweepDataChanges(e, t)),
        n.onChanged(() => this.throttleViewmodeDataChanges(e, n)),
      );
    }
    throttleSweepDataChanges(e, t) {
      const n = t.currentSweep || '',
        a = t.transition.active && t.transition.to !== t.transition.from;
      (this.currentSweep === n && this.sweepTransitionActive === a) ||
        ((this.currentSweep = n), (this.sweepTransitionActive = a), e.onChanged());
    }
    throttleViewmodeDataChanges(e, t) {
      const n = t.currentMode,
        a = t.transition.active;
      (this.currentMode === n && this.modeTransitionActive === a) ||
        ((this.currentMode = n), (this.modeTransitionActive = a), e.onChanged());
    }
  }
  class fi {
    constructor(e, t) {
      (this.currentSweep = Object.assign(Object.assign({}, fi.empty), {
        floorInfo: Object.assign({}, fi.empty.floorInfo),
        neighbors: [],
        position: Object.assign({}, fi.empty.position),
        rotation: Object.assign({}, fi.empty.rotation),
      })),
        (this.Viewmode = e.Viewmode),
        (this.sweepPlacementConverter = t.sweepPlacementConverter);
    }
    get data() {
      return this.currentSweep;
    }
    equals(e) {
      const t = mi.epsilon;
      return (
        this.currentSweep.id === e.data.id &&
        this.currentSweep.enabled === e.data.enabled &&
        this.currentSweep.alignmentType === e.data.alignmentType &&
        this.currentSweep.placementType === e.data.placementType &&
        this.currentSweep.floorInfo.id === e.data.floorInfo.id &&
        this.currentSweep.floorInfo.sequence === e.data.floorInfo.sequence &&
        this.compareNeighbors(e.currentSweep) &&
        Bn(this.currentSweep.position, e.data.position, t) &&
        Bn(this.currentSweep.rotation, e.data.rotation, t)
      );
    }
    copy(e) {
      this.copySweep(e.data);
    }
    update(e, t, n, a, o) {
      const s = e.currentSweepObject;
      if (
        !s ||
        e.transition.active ||
        t.transition.active ||
        (!t.isInside() && t.currentMode !== this.Viewmode.Outdoor)
      )
        return void this.copySweep(fi.empty);
      let i;
      try {
        i = n.getFloor(s.floorId || '');
      } catch (e) {
        i = { id: void 0, index: void 0 };
      }
      const r = a.getIdForSweep(s);
      (this.currentSweep.uuid = s.uuid),
        (this.currentSweep.sid = r),
        (this.currentSweep.id = r),
        (this.currentSweep.enabled = s.enabled),
        (this.currentSweep.alignmentType = this.sweepPlacementConverter.toSdkAlignment(
          s.alignmentType,
        )),
        (this.currentSweep.placementType = this.sweepPlacementConverter.toSdkPlacement(
          s.placementType,
        )),
        (this.currentSweep.neighbors = [...s.neighbours]),
        kn(this.currentSweep.position, s.position),
        kn(this.currentSweep.rotation, s.rotation),
        this.currentSweep.alignmentType === g.Alignment.UNALIGNED &&
        this.currentSweep.placementType === g.Placement.UNPLACED
          ? ((this.currentSweep.floorInfo.id = void 0),
            (this.currentSweep.floorInfo.sequence = void 0))
          : ((this.currentSweep.floorInfo.id = i.id ? o.getIdFromCwfId(i.id) : i.id),
            (this.currentSweep.floorInfo.sequence = i.index));
    }
    copySweep(e) {
      (this.currentSweep.uuid = e.uuid),
        (this.currentSweep.sid = e.sid),
        (this.currentSweep.id = e.id),
        (this.currentSweep.enabled = e.enabled),
        (this.currentSweep.alignmentType = e.alignmentType),
        (this.currentSweep.placementType = e.placementType),
        (this.currentSweep.floorInfo.id = e.floorInfo.id),
        (this.currentSweep.floorInfo.sequence = e.floorInfo.sequence),
        (this.currentSweep.neighbors = [...e.neighbors]),
        kn(this.currentSweep.position, e.position),
        kn(this.currentSweep.rotation, e.rotation);
    }
    compareNeighbors(e) {
      const t = this.currentSweep.neighbors.length;
      for (let n = 0; n < t; ++n) if (this.currentSweep.neighbors[n] !== e.neighbors[n]) return !1;
      return t === e.neighbors.length;
    }
  }
  fi.empty = {
    uuid: '',
    sid: '',
    id: '',
    enabled: !1,
    alignmentType: g.Alignment.ALIGNED,
    placementType: g.Placement.UNPLACED,
    floorInfo: { id: void 0, sequence: void 0 },
    neighbors: [],
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
  };
  class wi {
    constructor(e, t, n, a) {
      (this.sweepData = n),
        (this.sweepIdMap = a),
        (this.NavigateToSweepCommand = e.NavigateToSweepCommand),
        (this.issueCommand = t.issueCommand),
        (this.cameraTransitionConverter = t.cameraTransitionConverter),
        (this.conversion = t.conversionUtils);
    }
    validateInputSweepId(e, t, n) {
      if (!e || !j(e)) throw Error(`Sweep.moveTo: 'sweep' was not a valid sweep id; got ${e}`);
      const a = n.getSweepForId(e);
      if (!a) throw Error(e + ' does not map to a valid sweep in this model');
      return a.id;
    }
    validateInputRotation(e) {
      if (!e) return;
      const t = Error(
        `Sweep.moveTo: 'options.rotation' was specified but was not a valid Rotation; got ${e}`,
      );
      if (e && !Oa(e)) throw t;
      const n = e || {},
        a = { x: Mo(n.x), y: Mo(n.y) };
      if (
        (n.z && (a.z = Mo(n.z)),
        !(function (e) {
          const t = e;
          return !!t && !('object' != typeof t || ('z' in t && !No(t.z))) && No(t.x) && No(t.y);
        })(a))
      )
        throw t;
      return a;
    }
    validateTransitionTime(e) {
      if (!e) return;
      const t = Error(
        `Sweep.moveTo: options.transitionTime was specified but was not a valid, positive time; got ${e}`,
      );
      if (!No(e) && !j(e)) throw t;
      const n = 'number' == typeof e ? e : Mo(e);
      if (!No(n) || n <= 0) throw t;
      return n;
    }
    validateInput(e) {
      const t = this.validateInputSweepId(e.sweep, this.sweepData, this.sweepIdMap),
        n = e.options || {},
        a = this.validateInputRotation(n.rotation),
        o = this.validateTransitionTime(n.transitionTime);
      if (n.transition && !Pn(C, n.transition))
        throw Error(
          `Sweep.moveTo: options.transition was specified but was not a valid transition type; got ${n.transition}`,
        );
      return { sweep: t, options: { rotation: a, transition: n.transition, transitionTime: o } };
    }
    async exec(e, t) {
      const n = e.options.rotation
          ? this.conversion.rotationToQuaternion(e.options.rotation)
          : void 0,
        a = e.options.transition,
        o = e.options.transition ? this.cameraTransitionConverter.fromSdkTransition(a) : void 0,
        s = e.options.transitionTime;
      return await this.issueCommand(
        new this.NavigateToSweepCommand({
          sweep: e.sweep,
          rotation: n,
          transition: o,
          transitionTime: s,
        }),
      );
    }
  }
  class yi {
    create(e, t) {
      return t.onChanged(() => e.onChanged());
    }
  }
  class Ii {
    constructor(e, t, n, a, o, s) {
      (this.sweepData = n),
        (this.floorsData = a),
        (this.sweepIdMap = o),
        (this.floorIdMap = s),
        (this._data = {}),
        (this.conversionUtils = e),
        (this.sweepPlacementConverter = t);
    }
    get data() {
      return this._data;
    }
    isItemEqual(e, t) {
      return !ee(this.data[t], e.data[t]);
    }
    update() {
      for (const e of this.sweepData.sweeps()) {
        const { id: t, index: n } = e.floorId
            ? this.floorsData.getFloor(e.floorId)
            : { id: '', index: -1 },
          a = t ? this.floorIdMap.getIdFromCwfId(t) : void 0,
          o = this.sweepIdMap.getIdFromCwfId(e.id),
          s = this.data[o] || {};
        (s.uuid = e.uuid),
          (s.sid = o),
          (s.id = o),
          (s.enabled = e.enabled),
          (s.alignmentType = this.sweepPlacementConverter.toSdkAlignment(e.alignmentType)),
          (s.neighbors = e.neighbours.map((e) => this.sweepIdMap.getIdFromCwfId(e))),
          (s.position = Ti(e, s.position)),
          (s.rotation = this.conversionUtils.quaternionToRotation(e.rotation, s.rotation)),
          (s.floorInfo = a ? { id: a, sequence: n } : { id: '', sequence: -1 }),
          (this.data[s.id] = s);
      }
      for (const e in this.data) {
        this.sweepIdMap.getSweepForId(e) || delete this.data[e];
      }
    }
    clear() {
      this._data = {};
    }
  }
  function Ti(e, t) {
    return ((t = t || {}).x = e.position.x), (t.y = e.position.y), (t.z = e.position.z), t;
  }
  class Ei {
    constructor(e) {
      this.sweepData = e;
    }
    validateInput(e) {
      return { invert: !!(null == e ? void 0 : e.invert) || !1 };
    }
    async exec(e, t) {
      return this.sweepData.getSweepIdMap(e.invert);
    }
  }
  class vi {
    constructor(e) {
      this.sweepData = e;
    }
    validateInput(e, t) {
      const n = null == e ? void 0 : e.id;
      if (!n) throw Error("Sweep.GetLabelFromIdExecutor: Missing input 'id' field");
      if (!$(n))
        throw Error(
          `Sweep.GetLabelFromIdExecutor: provided ${null == e ? void 0 : e.id} is not a valid string`,
        );
      return { id: n };
    }
    async exec(e, t) {
      var n, a;
      let o = null === (n = this.sweepData.getSweep(e.id)) || void 0 === n ? void 0 : n.index;
      return (
        void 0 === o &&
          (o =
            null === (a = this.sweepData.getSweepByUuid(e.id)) || void 0 === a ? void 0 : a.index),
        void 0 !== o ? (o + 1).toString() : null
      );
    }
  }
  class Ci {
    constructor(e, t, n) {
      (this.sweepData = e), (this.sweepViewData = t), (this.sweepIdMap = n);
    }
    validateInput(e) {
      return { sweepIds: Si(e.sweepIds, this.sweepData, this.sweepIdMap) };
    }
    async exec(e, t) {
      for (const t of e.sweepIds) bi(t, !0, this.sweepData, this.sweepViewData);
    }
  }
  class Ai {
    constructor(e, t, n) {
      (this.sweepData = e), (this.sweepViewData = t), (this.sweepIdMap = n);
    }
    validateInput(e) {
      return { sweepIds: Si(e.sweepIds, this.sweepData, this.sweepIdMap) };
    }
    async exec(e, t) {
      for (const t of e.sweepIds) bi(t, !1, this.sweepData, this.sweepViewData);
    }
  }
  function Si(e, t, n) {
    if (!Array.isArray(e)) throw Error();
    return e.map((e) =>
      (function (e, t, n) {
        if (!j(e)) throw Error(e + ' is not a valid string input');
        const a = n.getSweepForId(e);
        if (!a) throw Error(e + ' does not map to a valid sweep in this model');
        return a.id;
      })(e, 0, n),
    );
  }
  function bi(e, t, n, a) {
    a.setVisible(e, t);
    const o = n.getSweep(e);
    (o.enabled = t), o.commit();
  }
  class Di {
    constructor(e, t, n) {
      (this.sweepData = n),
        (this.SweepNeighborModifyCommand = e.SweepNeighborModifyCommand),
        (this.issueCommand = t.issueCommand);
    }
    validateInput(e, t) {
      const n = null == e ? void 0 : e.sweepId;
      if (!n) throw Error("Sweep.AddSweepNeighborsExecutor: Missing input 'sweepId' field");
      if (!$(n))
        throw Error(
          `Sweep.AddSweepNeighborsExecutor: provided "${null == e ? void 0 : e.sweepId}" is not a valid string`,
        );
      if (!this.sweepData.containsSweep(e.sweepId))
        throw Error(
          `Sweep.AddSweepNeighborsExecutor: provided sweep ID "${null == e ? void 0 : e.sweepId}" is not a valid V2 ID`,
        );
      const a = this.sweepData;
      const o = null == e ? void 0 : e.toAdd;
      if (
        !o ||
        !Va(o, function (e) {
          const t = a.containsSweep(e);
          return $(e) && t;
        })
      )
        throw Error('Sweep.AddSweepNeighborsExecutor: Invalid list of neighbors to add');
      return { sweepId: n, toAdd: o };
    }
    async exec(e, t) {
      const n = this.sweepData.getSweep(e.sweepId);
      return (
        await this.issueCommand(new this.SweepNeighborModifyCommand(n.id, e.toAdd)),
        this.sweepData.getSweep(e.sweepId).neighbours
      );
    }
  }
  class Oi {
    constructor(e, t, n) {
      (this.sweepData = n),
        (this.SweepNeighborModifyCommand = e.SweepNeighborModifyCommand),
        (this.issueCommand = t.issueCommand);
    }
    validateInput(e, t) {
      const n = null == e ? void 0 : e.sweepId;
      if (!n) throw Error("Sweep.RemoveSweepNeighborsExecutor: Missing input 'sweep' field");
      if (!$(n))
        throw Error(
          `Sweep.RemoveSweepNeighborsExecutor: provided "${null == e ? void 0 : e.sweepId}" is not a valid string`,
        );
      if (!this.sweepData.containsSweep(e.sweepId))
        throw Error(
          `Sweep.AddSweepNeighborsExecutor: provided sweep ID "${null == e ? void 0 : e.sweepId}" is not a valid V2 Sweep ID`,
        );
      const a = this.sweepData;
      const o = null == e ? void 0 : e.toRemove;
      if (
        !o ||
        !Va(o, function (e) {
          const t = a.getSweep(n).neighbours.includes(e);
          return $(e) && t;
        })
      )
        throw Error('Sweep.RemoveSweepNeighborsExecutor: Invalid list of neighbors to remove.');
      return { sweepId: n, toRemove: o };
    }
    async exec(e, t) {
      const n = this.sweepData.getSweep(e.sweepId);
      return (
        await this.issueCommand(new this.SweepNeighborModifyCommand(n.id, [], e.toRemove)),
        this.sweepData.getSweep(e.sweepId).neighbours
      );
    }
  }
  class Ni {
    create(e, t) {
      return t.onChanged({
        notify() {
          e.onChanged();
        },
      });
    }
  }
  class Mi {
    constructor(e) {
      (this.attachmentRegistry = e), (this._data = {});
    }
    get data() {
      return this._data;
    }
    isItemEqual(e, t) {
      return (
        this.data[t].id === e.data[t].id &&
        this.data[t].src === e.data[t].src &&
        this.data[t].type === e.data[t].type
      );
    }
    update() {
      for (const [, e] of this.attachmentRegistry.descriptors()) {
        const t = this._data[e.id] || {};
        (t.id = e.id), (t.src = e.src), (t.type = e.type), (this._data[e.id] = t);
      }
      for (const e in this.data) {
        this.attachmentRegistry.has(e) || delete this._data[e];
      }
    }
    clear() {
      this._data = {};
    }
  }
  class Ri {
    constructor(e, t) {
      (this.mattertagData = e), (this.attachmentRegistry = t), (this.attachmentCounts = new Map());
    }
    validateInput(e, t) {
      j(e.tagId) || this.throw(H('tagId', 'string', e.tagId)),
        this.mattertagData.getTag(e.tagId) || this.throw(`${e.tagId} does not map to a valid tag`),
        Va(e.attachmentIds, j) || this.throw(H('attachmentId', 'string or strings', e.tagId));
      for (const n of e.attachmentIds)
        this.attachmentRegistry.get(t.client.applicationKey, n) ||
          this.throw(`${n} does not map to a valid attachment`);
      return { tagId: e.tagId, attachmentIds: e.attachmentIds };
    }
    async exec(e, t) {
      for (const n of e.attachmentIds) {
        const a = this.attachmentRegistry.get(t.client.applicationKey, n);
        a || this.throw(`${n} does not map to a valid attachment`);
        const o = this.attachmentCounts.get(a) || 0;
        this.attachmentCounts.set(a, o + 1);
        const s = this.mattertagData.getTag(e.tagId);
        a.category === $a.UPLOAD
          ? s.fileAttachments.push(a)
          : a.category === $a.EXTERNAL
            ? s.externalAttachments.push(a)
            : a.category === $a.SANDBOX &&
              s.sandboxAttachments.push(
                Object.assign(Object.assign({}, a), {
                  src: a.src + `?id=${a.id}&parent=${e.tagId}&${o}`,
                }),
              );
      }
      this.mattertagData.commit();
    }
    throw(e) {
      throw Error('Tag.attach: ' + e);
    }
  }
  class Pi {
    constructor(e, t) {
      (this.mattertagData = e), (this.attachmentRegistry = t);
    }
    validateInput(e, t) {
      j(e.tagId) || this.throw(H('tagId', 'string', e.tagId)),
        this.mattertagData.getTag(e.tagId) || this.throw(`${e.tagId} does not map to a valid tag`),
        Va(e.attachmentIds, j) || this.throw(H('attachmentId', 'string or strings', e.tagId));
      for (const n of e.attachmentIds)
        this.attachmentRegistry.get(t.client.applicationKey, n) ||
          this.throw(`${n} does not map to a valid attachment`);
      return { tagId: e.tagId, attachmentIds: e.attachmentIds };
    }
    async exec(e, t) {
      for (const n of e.attachmentIds) {
        const a = this.attachmentRegistry.get(t.client.applicationKey, n);
        if (!a) return void this.throw(`${n} does not map to a valid attachment`);
        const o = this.mattertagData.getTag(e.tagId);
        a.category === $a.UPLOAD
          ? Li(o.fileAttachments, a.id)
          : a.category === $a.EXTERNAL
            ? Li(o.externalAttachments, a.id)
            : a.category === $a.SANDBOX && Li(o.sandboxAttachments, a.id);
      }
      this.mattertagData.commit();
    }
    throw(e) {
      throw Error('Tag.detach: ' + e);
    }
  }
  function Li(e, t) {
    const n = e.findIndex((e) => e.id === t);
    n >= 0 && e.splice(n, 1);
  }
  class xi {
    constructor(e) {
      (this.attachmentRegistry = e), (this.log = new U('tag.registerAttachment'));
    }
    validateInput(e) {
      const t = e.srcs;
      return (
        Va(t, $) ||
          (Va(t, this.validateDescriptor) &&
            this.log.warn(
              'Using attachment descriptors is deprecated and will be removed when Early Access closes.',
            ),
          this.throw(H('descriptors', 'Array of AttachmentDescriptors or strings', t))),
        { srcs: t }
      );
    }
    validateDescriptor(e, t) {
      return (
        Oa(e) || this.throw(`descriptor #${t} is not an object`),
        j(e.src) || this.throw(`descriptor[${t}].src is not a string`),
        (Pn(f.AttachmentType, e.type) && e.type !== f.AttachmentType.UNKNOWN) ||
          this.throw(`descriptor[${t}].type is not a valid attachment type`),
        e.type === f.AttachmentType.SANDBOX &&
          this.throw(
            `descriptor[${t}] has type ${f.AttachmentType.SANDBOX} and should be registered using 'Tag.registerSandbox' instead`,
          ),
        !0
      );
    }
    async exec(e, t) {
      const n = [];
      for (const a of e.srcs) {
        const e =
          'string' == typeof a
            ? await this.attachmentRegistry.addBySrc(t.client.applicationKey, a)
            : this.attachmentRegistry.add(t.client.applicationKey, a);
        n.push(e);
      }
      return n;
    }
    throw(e) {
      throw Error('Tag.registerAttachment: ' + e);
    }
  }
  (class extends ae {
    constructor(e) {
      super(), (this.payload = { tags: e });
    }
  }).id = 'MATTERTAG_DISC_POSITIONS';
  class _i extends ae {
    constructor(e) {
      super(), (this.payload = e);
    }
  }
  _i.id = 'ADD_MATTERTAG';
  (class extends ae {
    constructor(e) {
      super(), (this.payload = { sid: e });
    }
  }).id = 'DELETE_MATTERTAG';
  (class extends ae {
    constructor(e, t, n, a) {
      super(), (this.payload = { sid: e, standardOptions: t, mediaOptions: n, positionOptions: a });
    }
  }).id = 'MATTERTAG_EDIT';
  class ki extends ae {
    constructor(e, t, n = [], a) {
      super(), (this.payload = { id: e, properties: t, fileAttachments: n, embed: a });
    }
  }
  ki.id = 'MATTERTAG_NEW_SAVE';
  (class extends ae {
    constructor(e, t, n = [], a = [], o) {
      super(),
        (this.payload = {
          id: e,
          properties: t,
          pendingAttachments: n,
          removedAttachments: a,
          embed: o,
        });
    }
  }).id = 'MATTERTAG_SAVE';
  class Vi extends ae {
    constructor(e) {
      super(), (this.payload = { viewId: e });
    }
  }
  class Ui extends ae {
    constructor(e, t) {
      super(), (this.payload = { viewId: e, name: t });
    }
  }
  (class extends ae {}).id = 'MODEL_TO_LAYERED_COMMAND';
  (class extends ae {}).id = 'CHECK_FOR_PROXY_LAYER_COMMAND';
  (class extends ae {}).id = 'DISABLE_WORKSHOP_SESSION_COMMAND';
  (class extends Vi {}).id = 'MODEL_VIEW_SET_COMMAND';
  (class extends ae {
    constructor(e) {
      super(), (this.payload = { name: e });
    }
  }).id = 'USER_VIEW_ADD_COMMAND';
  (class extends Vi {}).id = 'VIEW_DELETE_COMMAND';
  (class extends Ui {}).id = 'VIEW_RENAME_COMMAND';
  (class extends ae {
    constructor(e, t) {
      super(), (this.payload = { viewId: e, enabled: t });
    }
  }).id = 'VIEW_TOGGLE_ENABLE_COMMAND';
  (class extends Ui {}).id = 'VIEW_DUPLICATE_COMMAND';
  (class extends ae {
    constructor(e) {
      super(), (this.payload = { confirmViewChange: e });
    }
  }).id = 'REGISTER_CONFIRM_VIEW_CHANGE';
  (class extends ae {
    constructor(e) {
      super(), (this.payload = e);
    }
  }).id = 'REGISTER_DUPLICATE_VIEW_HELPER_COMMAND';
  (class extends ae {
    constructor(e) {
      super(), (this.payload = e);
    }
  }).id = 'UNREGISTER_DUPLICATE_VIEW_HELPER_COMMAND';
  (class extends ae {
    constructor(e, t) {
      super(), (this.payload = { layerId: e, items: t });
    }
  }).id = 'LAYER_ITEMS_COPY_COMMAND';
  (class extends ae {
    constructor(e, t) {
      super(), (this.payload = { name: e, items: t });
    }
  }).id = 'LAYER_ITEMS_COPY_NEW_COMMAND';
  (class extends ae {
    constructor(e, t) {
      super(), (this.payload = { layerId: e, items: t });
    }
  }).id = 'LAYER_ITEMS_MOVE_COMMAND';
  (class extends ae {
    constructor(e) {
      super(), (this.payload = { items: e });
    }
  }).id = 'VIEW_ITEMS_DELETE_COMMAND';
  class Fi extends ae {
    constructor(e, t) {
      super(), (this.payload = { label: e, common: t });
    }
  }
  Fi.id = 'ADD_LAYER_COMMAND';
  (class extends ae {
    constructor(e) {
      super(), (this.payload = { layerProps: e });
    }
  }).id = 'ADD_INMEMORY_LAYER_COMMAND';
  (class extends ae {
    constructor(e, t) {
      super(), (this.payload = { layerId: e, label: t });
    }
  }).id = 'DATA_LAYER_DUPLICATE_COMMAND';
  (class extends ae {
    constructor(e) {
      super(), (this.payload = { layerId: e });
    }
  }).id = 'DELETE_LAYER_COMMAND';
  (class extends ae {
    constructor(e) {
      super(), (this.payload = { layerId: e });
    }
  }).id = 'REMOVE_LAYER_COMMAND';
  (class extends ae {
    constructor(e, t) {
      super(), (this.payload = { layerId: e, label: t });
    }
  }).id = 'RENAME_LAYER_COMMAND';
  (class extends ae {
    constructor(e, t) {
      super(), (this.payload = { layerId: e, visible: t });
    }
  }).id = 'LAYER_TOGGLE_VISIBLE_COMMAND';
  (class extends ae {
    constructor(e, t) {
      super(), (this.payload = { layerId: e, common: t });
    }
  }).id = 'LAYER_TOGGLE_COMMON_COMMAND';
  (class extends ae {
    constructor(e, t) {
      super(), (this.payload = { layerId: e, position: t });
    }
  }).id = 'SET_LAYER_POSITION_COMMAND';
  class Gi extends ae {
    constructor(e, t) {
      super(), (this.payload = { layerId: e, selected: t });
    }
  }
  Gi.id = 'LAYER_SELECT_COMMAND';
  (class extends ae {
    constructor(e, t) {
      super(), (this.payload = { layerId: e, on: t });
    }
  }).id = 'LAYER_TOGGLE_COMMAND';
  const Hi = new U('mattertag-util');
  function Bi(e, t, n, a) {
    const o = a.meshSubGroupsFromPoint(e);
    let s = 1 / 0,
      i = '';
    for (const t of n.rooms())
      if (o.includes(t.meshSubgroup)) {
        const n = a.meshGroups.rooms.get(t.meshSubgroup),
          o = e.y - ((null == n ? void 0 : n.boundingBox.min.y) || -1 / 0);
        o < s && ((s = o), (i = t.floorId));
      }
    try {
      return t.getFloor(i).index;
    } catch (e) {
      return Hi.debug('Unable to deduce floor index from position; defaulting to floor 0'), 0;
    }
  }
  const zi = new U('Subscription');
  class Wi {
    constructor(e, t, n = !1, a = '') {
      (this.startSubscription = e),
        (this.endSubscription = t),
        (this.id = a),
        (this.isSubbed = !1),
        n && this.renew();
    }
    renew() {
      this.isSubbed
        ? zi.debugWarn(`Duplicate subscription renew ${this.id}`)
        : (this.startSubscription(), (this.isSubbed = !0));
    }
    cancel() {
      this.isSubbed && (this.endSubscription(), (this.isSubbed = !1));
    }
    get active() {
      return this.isSubbed;
    }
  }
  function ji(e, t, n = !0, a = '') {
    return new Wi(e, t, n, a);
  }
  class $i {
    constructor() {
      (this.isObservable = !0),
        (this._dirtyObservable = !1),
        (this._activeObservable = !0),
        (this._observerNotifying = !1),
        (this._changeObservers = new Set()),
        (this._parentObservables = new Set()),
        (this._childObservables = new Set()),
        Object.defineProperties(this, {
          isObservable: { value: this.isObservable, writable: !1, enumerable: !1 },
          _dirtyObservable: { value: this._dirtyObservable, enumerable: !1 },
          _activeObservable: { value: this._activeObservable, enumerable: !1 },
          _observerNotifying: { value: this._observerNotifying, enumerable: !1 },
          _changeObservers: { value: this._changeObservers, writable: !1, enumerable: !1 },
          _childObservables: { value: this._childObservables, writable: !1, enumerable: !1 },
          _parentObservables: { value: this._parentObservables, writable: !1, enumerable: !1 },
        });
    }
    onChanged(e) {
      if (this._changeObservers.has(e))
        throw new Error(
          'This observer function is already observing this Observable, and double subscriptions are not supported.',
        );
      return ji(
        () => this._changeObservers.add(e),
        () => this.removeOnChanged(e),
        !0,
      );
    }
    removeOnChanged(e) {
      this._changeObservers.delete(e);
    }
    notifyObservers() {
      if (this._dirtyObservable && !this._observerNotifying && this._activeObservable) {
        this._observerNotifying = !0;
        for (const e of this._changeObservers) this.notifyObserver(e);
        (this._dirtyObservable = !1), (this._observerNotifying = !1);
      }
    }
    notifyObserver(e) {
      e(void 0);
    }
    notifyDown() {
      for (const e of this._childObservables) e.notifyDown();
      this.notifyObservers();
    }
    notifyUp() {
      for (const e of this._parentObservables) e.notifyUp();
      this.notifyObservers();
    }
    setDirty(e = !0) {
      this.setDirtyUp(), e && this.notifyUp();
    }
    setDirtyUp() {
      if (!this._dirtyObservable) {
        this._dirtyObservable = !0;
        for (const e of this._parentObservables) e.setDirtyUp();
      }
    }
    addChildObservable(e) {
      $i.isObservable(e) && (this._childObservables.add(e), e._parentObservables.add(this));
    }
    removeChildObservables(e) {
      $i.isObservable(e) && (this._childObservables.delete(e), e._parentObservables.delete(this));
    }
    atomic(e) {
      if (!this._activeObservable) return e();
      try {
        this.setActive(!1), e();
      } finally {
        this.setActive(!0);
      }
    }
    setActive(e) {
      const t = this._activeObservable;
      (this._activeObservable = e), !t && e && this.notifyObservers();
      for (const t of this._childObservables) t.setActive(e);
    }
    deepCopy() {
      throw Error('deepCopy is only implemented in subclasses of Observable');
    }
    static isObservable(e) {
      return e && e.isObservable;
    }
  }
  class qi extends $i {
    constructor(e) {
      super(), (this.value = e);
    }
    notifyObserver(e) {
      e(this.value);
    }
    get value() {
      return this._value;
    }
    set value(e) {
      this._value !== e &&
        (this.removeChildObservables(this._value),
        this.addChildObservable(e),
        (this._value = e),
        this.setDirty());
    }
    deepCopy() {
      return J(this._value);
    }
  }
  const Ki = new U('ProgressTracker');
  class Yi {
    constructor(e) {
      (this.totalTasks = e), (this.taskCompleted = 0), (this.percentCompleted = new qi(-1));
    }
    start() {
      Ki.debug('start'), (this.percentCompleted.value = 0);
    }
    notifyTaskCompleted() {
      this.taskCompleted >= this.totalTasks ||
        (this.taskCompleted++,
        (this.percentCompleted.value = this.taskCompleted / this.totalTasks),
        Ki.debug(`percent completed: ${this.percentCompleted.value}`));
    }
    forceComplete() {
      (this.percentCompleted.value = 1), Ki.debug(`forceComplete: ${this.percentCompleted.value}`);
    }
  }
  const Xi = new U('command.importTags');
  class Zi {
    constructor(e, t, n, a, o, s, i, r) {
      (this.sdkLayer = e),
        (this.THREE = t),
        (this.externals = n),
        (this.getTagsQuery = a),
        (this.mattertagsData = o),
        (this.floorsData = s),
        (this.roomData = i),
        (this.meshData = r);
    }
    validateInput(e, t) {
      if ((j(e.spaceSid) || this.throw(H('spaceSid', 'string', e.spaceSid)), !e.options))
        return { spaceSid: e.spaceSid, options: {} };
      const n = {};
      Oa(e.options) || this.throw('options is not an object');
      const a = e.options;
      return (
        a.progress &&
          ('function' == typeof a.progress
            ? (n.progress = a.progress)
            : this.throw('progress option is not a function')),
        { spaceSid: e.spaceSid, options: n }
      );
    }
    async exec(e, t) {
      const n = await this.getTagsQuery(e.spaceSid),
        a = [];
      for (const e of n)
        (e.sid = 'imported-' + e.sid), this.mattertagsData.getTag(e.sid) || a.push(e);
      const o = [],
        s = a.length + 1,
        i = new Yi(s),
        r = [];
      if (
        (e.options.progress && r.push(i.percentCompleted.onChanged(e.options.progress)),
        i.start(),
        !this.sdkLayer)
      )
        return Xi.warn('SDK Layers is not ready to be used.'), [];
      await this.externals.issueCommand(new Gi(this.sdkLayer.id, !0)), i.notifyTaskCompleted();
      for (const t of a) {
        const n = new this.THREE.Vector3(),
          a = new this.THREE.Vector3();
        n.set(t.anchorPosition.x, t.anchorPosition.y, t.anchorPosition.z),
          a.set(t.stemVector.x, t.stemVector.y, t.stemVector.z);
        const s = a.length();
        a.normalize();
        const i = Bi(n, this.floorsData, this.roomData, this.meshData),
          r = this.floorsData.getFloorAtIndex(i);
        r ||
          this.throw(
            `Could not add Tag ${t.sid} due to invalid floor position floorIndex: ${i} spaceId ${e.spaceSid}`,
          ),
          o.push({
            id: t.sid,
            positionOptions: { position: t.anchorPosition, normal: a, floorId: r.id },
            standardOptions: {
              label: t.label,
              description: t.description,
              stemVisible: t.stemVisible,
              stemHeight: s,
              color: t.color,
              icon: t.icon,
            },
            attachmentOptions: {
              fileAttachments: t.fileAttachments,
              externalAttachments: t.externalAttachments,
              refreshIds: [e.spaceSid],
            },
          });
      }
      r.push(
        this.mattertagsData.mattertags.onElementChanged({
          onAdded: () => {
            i.notifyTaskCompleted();
          },
        }),
      );
      const c = await this.externals.issueCommand(new _i(o));
      for (let e = 0; e < a.length; e++) {
        const t = a[e],
          n = this.mattertagsData.getTag(c[e]);
        n.enabled = t.enabled;
        for (const e of t.keywords) n.keywords.push(e);
      }
      return i.forceComplete(), r.forEach((e) => e.cancel()), c;
    }
    throw(e) {
      throw Error('Tag.importTags: ' + e);
    }
  }
  class Qi {
    create(e, t) {
      return t.onChanged(() => e.onChanged());
    }
  }
  class Ji {
    constructor(e, t, n, a, o, s) {
      (this.THREE = e),
        (this.mattertagData = t),
        (this.tagsViewData = n),
        (this.roomIdMap = a),
        (this.roomData = o),
        (this.meshData = s),
        (this._data = {});
    }
    get data() {
      return this._data;
    }
    isItemEqual(e, t) {
      return !ee(this.data[t], e.data[t]);
    }
    update() {
      const e = (e) => {
        const t = new this.THREE.Vector3().set(e.x, e.y, e.z);
        for (const e of this.roomData.rooms()) {
          const n = this.meshData.meshGroups.rooms.get(e.meshSubgroup);
          if (n && n.boundingBox.containsPoint(t)) return e;
        }
      };
      for (const t of this.tagsViewData.getOrderedTags()) {
        const n = this.mattertagData.getTag(t.id),
          a = this.data[n.sid] || {};
        if (
          ((a.id = n.sid),
          (a.anchorPosition = ao(n, 'anchorPosition', a.anchorPosition)),
          (a.stemVector = ao(n, 'stemVector', a.stemVector)),
          (a.stemVisible = n.stemVisible),
          (a.label = n.label),
          (a.description = n.description),
          (a.color = oo(n, 'color', a.color)),
          (a.keywords = Un(a.keywords || [], n.keywords)),
          (a.fontId = n.icon ? n.icon.split('_')[2] : ''),
          n.roomId)
        )
          a.roomId = this.roomIdMap.getIdFromCwfId(n.roomId);
        else {
          const t = e(a.anchorPosition);
          t && t.id && (a.roomId = this.roomIdMap.getIdFromCwfId(t.id));
        }
        const o = n.fileAttachments.map((e) => e.id),
          s = n.externalAttachments.map((e) => e.id),
          i = n.sandboxAttachments.map((e) => e.id);
        (a.attachments = [...o, ...s, ...i]), (this._data[n.sid] = a);
      }
      for (const e in this.data) {
        this.mattertagData.getTag(e) || delete this._data[e];
      }
    }
    clear() {
      this._data = {};
    }
  }
  function er(e) {
    if (e && 'object' == typeof e && 'r' in e && 'g' in e && 'b' in e) {
      const t = e;
      return No(t.r) && No(t.g) && No(t.b);
    }
    return !1;
  }
  const tr = new U('command.add');
  class nr {
    constructor(e, t, n, a, o, s, i, r, c, d, l, h) {
      (this.THREE = e),
        (this.issueCommand = t.issueCommand),
        (this.isMpFontId = t.isMpFontId),
        (this.mattertagsData = n),
        (this.tagAttach = a),
        (this.tagEditIcon = o),
        (this.tagEditOpacity = s),
        (this.attachmentRegistry = i),
        (this.iconMaps = r),
        (this.floorsData = d),
        (this.roomData = l),
        (this.meshData = h);
    }
    validateInput(e, t) {
      const { descriptors: n } = e;
      return (
        Va(n, (e, n) => this.validateDescriptor(e, n, t)) ||
          this.throw('descriptors is not an array'),
        { descriptors: n }
      );
    }
    validateDescriptor(e, t, n) {
      var a, o, s;
      if (
        (Oa(e) || this.throw(`descriptor #${t} is not an object`),
        Po(e.anchorPosition) || this.throw(`descriptor[${t}].anchorPosition is not vector`),
        Po(e.stemVector) || this.throw(`descriptor[${t}].stemVector is not vector`),
        void 0 === e.id || j(e.id) || this.throw(`descriptor[${t}].id is not a valid string`),
        void 0 === e.stemVisible ||
          Na(e.stemVisible) ||
          this.throw(`descriptor[${t}].stemVisible is not a boolean`),
        void 0 === e.label || $(e.label) || this.throw(`descriptor[${t}].label is not a string`),
        void 0 === e.description ||
          $(e.description) ||
          this.throw(`descriptor[${t}].description is not a string`),
        void 0 !== e.attachments)
      ) {
        Va(e.attachments, $) ||
          this.throw(`descriptor[${t}].attachments is not an array of strings`);
        for (let a = 0; a < e.attachments.length; ++a) {
          const o = e.attachments[a];
          this.attachmentRegistry.get(n.client.applicationKey, o) ||
            this.throw(`descriptor[${t}].attachment[${a}] does not map to a valid attachment`);
        }
      }
      return (
        void 0 === e.color || er(e.color) || this.throw(`descriptor[${t}].color is not a Color`),
        void 0 !== e.opacity &&
          (No(e.opacity) || this.throw(`descriptor[${t}].opacity is not a number`),
          (o = e.opacity),
          (s = 1),
          (0 <= o && o <= s) ||
            (tr.warn(`descriptor[${t}].opacity was clamped from ${e.opacity} to the range [0, 1]`),
            (e.opacity = Ro(e.opacity, 0, 1)))),
        void 0 === e.iconId ||
          j(e.iconId) ||
          this.throw(`descriptor[${t}].iconId is not a valid string`),
        (e.id = n.client.getOrClaimId(e.id)),
        e.id &&
          j(e.id) &&
          this.mattertagsData.getTag(e.id) &&
          this.throw(`descriptor[${t}].id (${e.id}) is already in use`),
        !e.iconId ||
          this.isMpFontId(e.iconId) ||
          (null === (a = this.iconMaps.get(n.client.applicationKey)) || void 0 === a
            ? void 0
            : a.imagePromise[e.iconId]) ||
          this.throw(`descriptor[${t}].iconId (${e.iconId}) does not map to a registered icon`),
        !0
      );
    }
    async exec(e, t) {
      const n = [],
        a = [];
      for (let t = 0; t < e.descriptors.length; t++) {
        const o = new this.THREE.Vector3(),
          s = new this.THREE.Vector3(),
          i = e.descriptors[t];
        o.set(i.anchorPosition.x, i.anchorPosition.y, i.anchorPosition.z),
          s.set(i.stemVector.x, i.stemVector.y, i.stemVector.z);
        const r = s.length();
        s.normalize();
        const c = Bi(o, this.floorsData, this.roomData, this.meshData),
          d = this.floorsData.getFloorAtIndex(c);
        d || this.throw(`Could not add Tag on invalid floor with index: ${c}`),
          n.push({
            id: i.id,
            positionOptions: { position: o, normal: s, floorId: d.id },
            standardOptions: {
              label: i.label,
              description: i.description,
              stemVisible: i.stemVisible,
              stemHeight: r,
              color: i.color,
            },
          }),
          i.attachments && a.push(t);
      }
      const o = await this.issueCommand(new _i(n));
      for (let n = 0; n < e.descriptors.length; n++) {
        const a = o[n],
          s = e.descriptors[n];
        void 0 !== s.opacity && (await this.tagEditOpacity.exec({ id: a, opacity: s.opacity }, t)),
          void 0 !== s.iconId && this.tagEditIcon.exec({ id: a, iconId: s.iconId }, t),
          s.attachments && this.tagAttach.exec({ tagId: a, attachmentIds: s.attachments }, t);
      }
      return o;
    }
    throw(e) {
      throw Error('Tag.add: ' + e);
    }
  }
  function ar(e, t) {
    return j(e) && !!t.getTag(e);
  }
  class or {
    constructor(e, t) {
      (this.externals = e), (this.mattertagsData = t);
    }
    validateInput(e, t) {
      var n;
      if (!ar(e.id, this.mattertagsData)) throw Error(`${e.id} does not map to a valid Tag`);
      if (void 0 !== e.options && !Oa(e.options)) throw Error(H('options', 'object', e.options));
      return {
        id: e.id,
        options: { force: !!(null === (n = e.options) || void 0 === n ? void 0 : n.force) },
      };
    }
    async exec(e, t) {
      await this.externals.issueCommand(
        new this.externals.OpenTagCommand(e.id, { forceOpen: e.options.force }),
      );
    }
  }
  var sr, ir;
  !(function (e) {
    (e.NOTE = 'note'), (e.TAG = 'tag'), (e.OBJECT = 'object');
  })(sr || (sr = {}));
  class rr {
    constructor(e, t) {
      (this.externals = e), (this.mattertagsData = t);
    }
    validateInput(e, t) {
      var n;
      if (!ar(e.id, this.mattertagsData)) throw Error(`${e.id} does not map to a valid Tag`);
      if (void 0 !== e.options && !Oa(e.options)) throw Error(H('options', 'object', e.options));
      return {
        id: e.id,
        options: { force: !!(null === (n = e.options) || void 0 === n ? void 0 : n.force) },
      };
    }
    async exec(e, t) {
      await this.externals.issueCommand(
        new this.externals.DockAnnotationCommand(e.id, sr.TAG, e.options.force),
      );
    }
  }
  class cr {
    constructor(e, t, n) {
      (this.externals = e), (this.mattertagsData = t), (this.tagsViewData = n);
    }
    validateInput(e, t) {
      if (!ar(e.id, this.mattertagsData)) throw Error(`${e.id} does not map to a valid Tag`);
      return { id: e.id };
    }
    async exec(e, t) {
      var n;
      (null === (n = this.tagsViewData.openTagView) || void 0 === n ? void 0 : n.id) === e.id &&
        (await this.externals.issueCommand(new this.externals.CloseTagCommand()));
    }
  }
  !(function (e) {
    (e.MATTERTAG = 'mattertag'), (e.NOTE = 'note'), (e.OBJECT = 'object');
  })(ir || (ir = {}));
  ir.MATTERTAG, ir.NOTE, ir.OBJECT;
  var dr, lr, hr, ur;
  !(function (e) {
    (e.DEFAULT = 'default'), (e.HIGHLIGHTED = 'highlighted'), (e.DIMMED = 'dimmed');
  })(dr || (dr = {})),
    (function (e) {
      (e.IDLE = 'idle'),
        (e.CREATING = 'creating'),
        (e.PRESSING = 'pressing'),
        (e.PLACING = 'placing'),
        (e.PLACED = 'placed');
    })(lr || (lr = {})),
    (function (e) {
      (e.UP = 'up'),
        (e.UP_LEFT = 'up-left'),
        (e.UP_RIGHT = 'up-right'),
        (e.DOWN = 'down'),
        (e.DOWN_LEFT = 'down-left'),
        (e.DOWN_RIGHT = 'down-right'),
        (e.LEFT = 'left'),
        (e.RIGHT = 'right');
    })(hr || (hr = {}));
  class pr {
    constructor() {
      (this.focusedPin = null), (this.selectedPin = null), (this.dockedAnnotation = null);
    }
    create(e, t, n) {
      return new ce(
        t.onChanged(() => this.throttlePinChanges(e, t)),
        n.onChanged(() => this.throttleAnnotationChanges(e, n)),
      );
    }
    throttlePinChanges(e, t) {
      var n, a;
      const o =
          null !== (a = null === (n = t.focusedPin) || void 0 === n ? void 0 : n.id) && void 0 !== a
            ? a
            : null,
        s = t.selectedPinId;
      (this.focusedPin === o && this.selectedPin === s) ||
        ((this.focusedPin = o), (this.selectedPin = s), e.onChanged());
    }
    throttleAnnotationChanges(e, t) {
      var n, a;
      const o =
        null !== (a = null === (n = t.dockedAnnotation) || void 0 === n ? void 0 : n.id) &&
        void 0 !== a
          ? a
          : null;
      this.dockedAnnotation !== o && ((this.dockedAnnotation = o), e.onChanged());
    }
  }
  class mr {
    constructor() {
      this._data = { hovered: null, selected: new Set(), docked: null };
    }
    get data() {
      return this._data;
    }
    equals(e) {
      return (
        this.data.hovered === e.data.hovered &&
        this.data.docked === e.data.docked &&
        ((t = this.data.selected),
        (n = e.data.selected),
        t.size === n.size && [...t].every((e) => n.has(e)))
      );
      var t, n;
    }
    update(e, t) {
      var n, a;
      const o = e.focusedPin,
        s = e.selectedPinId ? e.getPin(e.selectedPinId) : null,
        i =
          null !== (a = null === (n = t.dockedAnnotation) || void 0 === n ? void 0 : n.id) &&
          void 0 !== a
            ? a
            : null;
      (this._data.hovered = (null == o ? void 0 : o.pinType) === ir.MATTERTAG ? o.id : null),
        this._data.selected.clear(),
        s && s.pinType === ir.MATTERTAG && this._data.selected.add(s.id),
        (this._data.docked = i);
    }
    copy(e) {
      (this._data.hovered = e.data.hovered),
        (this._data.docked = e.data.docked),
        (function (e, t) {
          e.clear();
          for (const n of t) e.add(n);
        })(this._data.selected, e.data.selected);
    }
  }
  !(function (e) {
    (e.SETUP = 'sandbox.setup'),
      (e.TO_SANDBOX = 'sandbox.to.sandbox'),
      (e.TO_CLIENT = 'sandbox.to.client');
  })(ur || (ur = {}));
  Symbol.iterator;
  class gr {
    constructor() {
      this.values = new Map();
    }
    add(e, t) {
      this.getValuesAtKey(e).add(t);
    }
    remove(e, t) {
      const n = this.values.get(e);
      null == n || n.delete(t);
    }
    removeKey(e) {
      this.values.delete(e);
    }
    getValuesAtKey(e) {
      const t = this.values.get(e) || new Set();
      return this.values.set(e, t), t;
    }
    valuesPerKey(e) {
      return this.getValuesAtKey(e).size;
    }
    get keys() {
      return this.values.keys();
    }
    hasKey(e) {
      return this.values.has(e);
    }
    has(e, t) {
      var n;
      return !!(null === (n = this.values.get(e)) || void 0 === n ? void 0 : n.has(t));
    }
    *[Symbol.iterator]() {
      for (const [e, t] of this.values) for (const n of t) yield [e, n];
    }
  }
  class fr {
    constructor() {
      (this.usedIds = new Set()), this.usedIds.add(0);
    }
    generate() {
      let e;
      do {
        e = Math.floor(1e6 * Math.random());
      } while (this.usedIds.has(e));
      return this.usedIds.add(e), e;
    }
    isInUse(e) {
      return this.usedIds.has(e);
    }
  }
  class wr {
    constructor(e, t, n, a) {
      (this.sdk = e),
        (this.attachmentRegistry = t),
        (this.tagViewData = n),
        (this.iframeSrcDoc = a),
        (this.idGenerator = new fr()),
        (this.sandboxSubs = new Set());
    }
    validateInput(e) {
      if (!e.html || 'string' != typeof e.html) throw Error(e.html + ' is not valid html');
      if (!No(e.clientId)) throw Error('Unexpected error: unable to create iframe');
      const t = e.options || {},
        n = { on: 'on', off: 'off', send: 'send', tag: 'tag', docked: 'docked' };
      t.globalVariableMap &&
        (j(t.globalVariableMap.on) && (n.on = t.globalVariableMap.on),
        j(t.globalVariableMap.off) && (n.off = t.globalVariableMap.off),
        j(t.globalVariableMap.send) && (n.send = t.globalVariableMap.send),
        j(t.globalVariableMap.tag) && (n.tag = t.globalVariableMap.tag),
        j(t.globalVariableMap.docked) && (n.docked = t.globalVariableMap.docked));
      const a = { w: 0, h: 0 };
      if (t.size) {
        if (!(No(t.size.w) && t.size.w >= 0 && No(t.size.h) && t.size.h >= 0))
          throw Error(H('options.size', 'Size', t.size));
        (a.w = t.size.w), (a.h = t.size.h);
      }
      return {
        clientId: e.clientId,
        html: e.html,
        options: { name: t.name || '', globalVariableMap: n, size: a },
      };
    }
    async exec(e, t) {
      const n = this.idGenerator.generate(),
        a = (e) => {
          const a = (a) => {
            a.source === e &&
              a.data.sandboxId === n &&
              this.sdk.sendPrivateMessage(ur.TO_CLIENT, a.data, t.client.id);
          };
          window.addEventListener('message', a),
            this.sandboxSubs.add({
              dispose() {
                window.removeEventListener('message', a);
              },
            });
        },
        o = (e) => {
          const a = this.sdk.addPrivateMessageHandler({
            clientId: t.client.id,
            messageType: ur.TO_SANDBOX,
            onMessage(t) {
              t.sandboxId === n && e.postMessage(t, '*');
            },
          });
          this.sandboxSubs.add(a);
        },
        [s] = this.attachmentRegistry.addSandbox(t.client.applicationKey, {
          name: e.options.name,
          srcDoc: this.iframeSrcDoc,
          sandboxLoadedHandler: (t, s) => {
            var i;
            const r = t.contentWindow;
            for (const e of this.sandboxSubs) e.dispose();
            this.sandboxSubs.clear(),
              a(r),
              o(r),
              r.postMessage(
                {
                  type: ur.SETUP,
                  sandboxId: n,
                  customHTML: e.html,
                  parentTag: s,
                  docked:
                    (null === (i = this.tagViewData.dockedAnnotation) || void 0 === i
                      ? void 0
                      : i.id) === s,
                  globalVariableMap: e.options.globalVariableMap,
                },
                '*',
              );
          },
          size: e.options.size,
        });
      return { sandboxId: n, attachmentId: s };
    }
  }
  class yr {
    constructor(e, t, n, a, o) {
      (this.externalTypes = e),
        (this.externalCommands = t),
        (this.pinViewData = n),
        (this.tagsViewData = a),
        (this.annotationsViewData = o);
    }
    validateInput(e, t) {
      const n = e.id;
      (j(n) && this.pinViewData.getPin(n)) || this.throw(`${e.id} does not map to a valid tag`);
      const a = { opening: !1, navigating: !1, docking: !1, sharing: !1 };
      return (
        Oa(e.allow) &&
          ((a.opening = !!e.allow.opening),
          (a.navigating = !!e.allow.navigating),
          (a.docking = !!e.allow.docking),
          (a.sharing = !!e.allow.sharing)),
        { id: n, allow: a }
      );
    }
    async exec(e, t) {
      var n, a;
      const o = this.pinViewData.getPin(e.id);
      o
        ? (this.annotationsViewData.updateCapabilities(o.id, {
            dock: e.allow.docking,
            preview: e.allow.opening,
            share: e.allow.sharing,
          }),
          this.tagsViewData.updateCapabilities(o.id, { focus: !!e.allow.navigating }),
          ((!e.allow.docking &&
            (null === (n = this.annotationsViewData.dockedAnnotation) || void 0 === n
              ? void 0
              : n.id) === e.id) ||
            (!e.allow.opening &&
              (null === (a = this.annotationsViewData.selectedAnnotation) || void 0 === a
                ? void 0
                : a.id) === e.id)) &&
            this.externalCommands.issueCommand(
              new this.externalTypes.CloseAnnotationCommand(o.id, sr.TAG),
            ))
        : this.throw(`${e.id} does not map to a valid tag`);
    }
    throw(e) {
      throw Error('Tag.allowAction: ' + e);
    }
  }
  class Ir {
    constructor(e, t, n) {
      (this.mattertagData = n),
        (this.EditMattertagCommand = e.EditMattertagCommand),
        (this.issueCommand = t.issueCommand);
    }
    validateInput(e, t) {
      const { id: n } = e;
      return (
        j(n) || this.throw(H('id', 'string', n)),
        this.mattertagData.getTag(n) || this.throw(`${n} does not map to a valid tag`),
        { id: n, properties: this.validateProperties(e.properties) }
      );
    }
    validateProperties(e) {
      Oa(e) || this.throw("'properties' input is not an object");
      const { label: t, description: n } = e;
      return (
        void 0 === t || $(t) || this.throw(H('label', 'string (or undefined)', t)),
        void 0 === n || $(n) || this.throw(H('description', 'string (or undefined)', n)),
        { label: t, description: n }
      );
    }
    async exec(e, t) {
      try {
        await this.issueCommand(
          new this.EditMattertagCommand(e.id, {
            label: e.properties.label,
            description: e.properties.description,
          }),
        );
      } catch (e) {
        this.throw(e);
      }
    }
    throw(e) {
      throw Error('Tag.editBillboard: ' + e);
    }
  }
  class Tr {
    constructor(e, t, n, a) {
      (this.THREE = e),
        (this.EditMattertagCommand = t.EditMattertagCommand),
        (this.issueCommand = n.issueCommand),
        (this.mattertagData = a);
    }
    validateInput(e, t) {
      return (
        j(e.id) || this.throw(H('id', 'string', e.id)),
        this.mattertagData.getTag(e.id) || this.throw(`${e.id} does not map to a valid tag`),
        er(e.color) || this.throw(H('color', 'Color', e.color)),
        { id: e.id, color: e.color }
      );
    }
    async exec(e, t) {
      try {
        const t = new this.THREE.Color().setRGB(e.color.r, e.color.g, e.color.b);
        await this.issueCommand(new this.EditMattertagCommand(e.id, { color: t }));
      } catch (e) {
        this.throw(e);
      }
    }
    throw(e) {
      throw Error('Tag.editColor: ' + e);
    }
  }
  class Er {
    constructor(e, t, n, a, o, s, i) {
      (this.THREE = n),
        (this.isMpFontId = a),
        (this.mattertagData = o),
        (this.pinsModule = s),
        (this.iconMaps = i),
        (this.UpdatePinCommand = e.UpdatePinCommand),
        (this.issueCommand = t.issueCommand);
    }
    validateInput(e, t) {
      var n;
      j(e.id) || this.throw(H('id', 'string', e.id));
      this.mattertagData.getTag(e.id) || this.throw(`${e.id} does not map to a valid tag`),
        j(e.iconId) || this.throw(H('iconId', 'string', e.iconId));
      const a = this.isMpFontId(e.iconId);
      return (
        (null === (n = this.iconMaps.get(t.client.applicationKey)) || void 0 === n
          ? void 0
          : n.imagePromise[e.iconId]) ||
          a ||
          this.throw(`${e.iconId} does not map to a registered icon or font id`),
        { id: e.id, iconId: e.iconId }
      );
    }
    async exec(e, t) {
      const { id: n, iconId: a } = e,
        o = this.iconMaps.get(t.client.applicationKey);
      if (o && e.iconId in o.imagePromise) {
        let e;
        try {
          e = await o.imagePromise[a];
        } catch (e) {
          this.throw(e);
        }
        const t = o.map[a],
          s = e.naturalWidth / e.naturalHeight,
          i = new this.THREE.Vector3();
        s > 1 ? i.set(s, 1, 1) : i.set(1, 1 / s, 1),
          this.pinsModule.pinRenderer.setPinRenderOverrides(n, t, i);
      } else {
        (this.mattertagData.getTag(e.id).icon = e.iconId),
          await this.issueCommand(
            new this.UpdatePinCommand(e.id, ir.MATTERTAG, { icon: e.iconId }),
          );
      }
    }
    throw(e) {
      throw Error('Tag.editIcon: ' + e);
    }
  }
  class vr {
    constructor(e, t, n, a, o) {
      (this.cwfTypes = e),
        (this.closeTag = n),
        (this.mattertagData = a),
        (this.annotationsViewData = o),
        (this.issueCommand = t.issueCommand);
    }
    validateInput(e, t) {
      ($(e.id) && this.mattertagData.getTag(e.id)) ||
        this.throw(`${e.id} does not map to a valid tag`),
        (e.stemParams && Oa(e.stemParams)) || this.throw('invalid stem parameters objeect');
      const { stemHeight: n, stemVisible: a } = e.stemParams;
      return (
        void 0 === n || No(n) || this.throw(H('stemHeight', 'number', e.id)),
        void 0 === a || Na(a) || this.throw(H('stemVisibility', 'boolean', e.id)),
        { id: e.id, stemParams: { stemHeight: n, stemVisible: a } }
      );
    }
    async exec(e, t) {
      var n;
      const { stemHeight: a, stemVisible: o } = e.stemParams,
        s = {};
      void 0 !== a &&
        ((s.stemHeight = a),
        (null === (n = this.annotationsViewData.dockedAnnotation) || void 0 === n
          ? void 0
          : n.id) !== e.id && this.closeTag.exec({ id: e.id }, t)),
        void 0 !== o && (s.stemVisible = o),
        await this.issueCommand(new this.cwfTypes.EditMattertagCommand(e.id, s));
    }
    throw(e) {
      throw Error('Tag.editStem: ' + e);
    }
  }
  class Cr {
    constructor(e, t, n, a) {
      (this.ChangePinOpacityScaleCommand = e.ChangePinOpacityScaleCommand),
        (this.PinType = e.PinType),
        (this.issueCommand = t.issueCommand),
        (this.mattertagData = n),
        (this.pinsViewData = a);
    }
    validateInput(e, t) {
      return (
        j(e.id) || this.throw(H('id', 'string', e.id)),
        this.mattertagData.getTag(e.id) || this.throw(`${e.id} does not map to a valid tag`),
        (!No(e.opacity) || e.opacity < 0 || e.opacity > 1) &&
          this.throw("'opacity' should be a number in the range of [0, 1]"),
        { id: e.id, opacity: e.opacity }
      );
    }
    async exec(e, t) {
      await this.waitForTagView(e.id),
        await this.issueCommand(
          new this.ChangePinOpacityScaleCommand(e.id, this.PinType.MATTERTAG, e.opacity),
        );
    }
    async waitForTagView(e) {
      if (!this.pinsViewData.getPin(e))
        return new Promise((t) => {
          const n = this.pinsViewData.onPinUpdate({
            onAdded(a, o) {
              o === e && (n.cancel(), t());
            },
          });
        });
    }
    throw(e) {
      throw Error('Tag.editOpacity: ' + e);
    }
  }
  class Ar {
    constructor(e) {
      this.editPositions = e;
    }
    validateInput(e, t) {
      return this.editPositions.validateInput(
        { descriptors: [{ id: e.id, options: e.options }] },
        t,
      ).descriptors[0];
    }
    async exec(e, t) {
      this.editPositions.exec({ descriptors: [{ id: e.id, options: e.options }] }, t);
    }
  }
  class Sr {
    constructor(e, t, n, a) {
      (this.closeTag = e),
        (this.mattertagData = t),
        (this.annotationsViewData = n),
        (this.roomIdMap = a);
    }
    validateInput(e, t) {
      const { descriptors: n } = e;
      return (
        Va(n, (e, n) => this.validateDescriptor(e, n, t)) ||
          this.throw('descriptors is not an array'),
        { descriptors: n }
      );
    }
    validateDescriptor(e, t, n) {
      return (
        Oa(e) || this.throw(`descriptor #${t} is not an object`),
        void 0 === e.id || j(e.id) || this.throw(`descriptor[${t}].id is not a valid string`),
        this.validateOptions(e.options) || this.throw(`descriptor #${t}.options is not an object`),
        !0
      );
    }
    validateOptions(e) {
      return (
        (e && Oa(e)) || this.throw('invalid options provided'),
        {
          anchorPosition: this.validateVector3(
            e.anchorPosition,
            '`anchorPosition` was provided but not a valid Vector3',
          ),
          stemVector: this.validateVector3(
            e.stemVector,
            '`stemVector` was provided, but not a valid Vector3',
          ),
          roomId: this.validateRoomId(e.roomId),
        }
      );
    }
    validateVector3(e, t) {
      return void 0 === e || Po(e) || this.throw(t), e;
    }
    validateRoomId(e) {
      return (
        void 0 === e || j(e) || this.throw(H('roomId', 'string (or undefined)', e)),
        e && !this.roomIdMap.getRoomForId(e) && this.throw(`${e} does not map to a valid room`),
        e
      );
    }
    throw(e) {
      throw Error('Tag.editPositions: ' + e);
    }
    async exec(e, t) {
      this.mattertagData.atomic(() => {
        var n;
        for (const a of e.descriptors) {
          const { anchorPosition: e, stemVector: o } = a.options,
            s = this.mattertagData.getTag(a.id),
            i = a.options.roomId && this.roomIdMap.getRoomForId(a.options.roomId),
            r = i ? i.floorId : s.floorId,
            c = e ? s.anchorPosition.clone().set(e.x, e.y, e.z) : s.anchorPosition,
            d = o ? s.stemVector.clone().set(o.x, o.y, o.z) : s.stemVector,
            l = o ? d.length() : s.stemHeight;
          d.normalize(),
            (e || o) &&
              (null === (n = this.annotationsViewData.dockedAnnotation) || void 0 === n
                ? void 0
                : n.id) !== a.id &&
              this.closeTag.exec({ id: a.id }, t),
            s.atomic(() => {
              s.anchorPosition.set(c.x, c.y, c.z),
                s.anchorNormal.set(d.x, d.y, d.z),
                (s.floorId = r),
                (s.stemHeight = l),
                s.anchorPosition.set(c.x, c.y, c.z),
                s.stemVector.set(d.x, d.y, d.z),
                (s.floorId = r),
                s.commit();
            });
        }
      });
    }
  }
  class br {
    constructor(e, t, n) {
      (this.mattertagData = n), (this.cwfTypes = e), (this.issueCommand = t.issueCommand);
    }
    validateInput(e) {
      const t = e.ids;
      return Va(t, j) || this.throw("'ids' is expected to be a series of strings"), { ids: t };
    }
    async exec(e) {
      const t = [],
        n = [];
      for (const t of e.ids)
        n.push(this.issueCommand(new this.cwfTypes.CloseAnnotationCommand(t, sr.TAG)));
      return (
        await Promise.all(n),
        this.mattertagData.atomic(() => {
          for (const n of e.ids) this.mattertagData.removeTag(n), t.push(n);
        }),
        t
      );
    }
    throw(e) {
      throw Error('Tag.remove: ' + e);
    }
  }
  class Dr {
    constructor(e, t) {
      (this.mattertagData = e), (this.pinsModule = t);
    }
    validateInput(e, t) {
      return (
        j(e.id) || this.throw(H('id', 'string', e.id)),
        this.mattertagData.getTag(e.id) || this.throw(`${e.id} does not map to a valid tag`),
        { id: e.id }
      );
    }
    async exec(e, t) {
      const { id: n } = e;
      this.pinsModule.pinRenderer.setPinRenderOverrides(n, null, null);
    }
    throw(e) {
      throw Error(`Tag.resetIcon: ${e}`);
    }
  }
  Object.freeze({
    colors: [
      '#d44441',
      '#f44336',
      '#e91e63',
      '#f78da7',
      '#9c4b92',
      '#673ab7',
      '#03687d',
      '#03a9f4',
      '#00bcd4',
      '#417505',
      '#51a868',
      '#37d67a',
      '#cddc39',
      '#fbcd00',
      '#ffac17',
      '#ff6900',
      '#abb8c3',
      '#607d8b',
    ],
  });
  class Or {
    constructor(e, t) {
      (this.setting = e), (this.settingsData = t);
    }
    validateInput(e) {
      if (
        (void 0 === e.enable && (e.enable = !this.settingsData.tryGetProperty(this.setting, !0)),
        !Na(e.enable))
      )
        throw Error(H('enable', 'boolean or undefined', e.enable));
      return { enable: e.enable };
    }
    async exec(e) {
      this.settingsData.setProperty(this.setting, e.enable);
    }
  }
  class Nr extends ae {
    constructor(e, t, n) {
      super(), (this.payload = { parentId: e, parentType: t, src: n });
    }
  }
  Nr.id = 'EMBED_MEDIA';
  (class extends ae {
    constructor(e) {
      super(), (this.payload = { attachment: e });
    }
  }).id = 'LOAD_ATTACHMENT_EMBED';
  class Mr extends ae {
    constructor(e, t, n) {
      super(), (this.payload = { parentId: e, parentType: t, files: n });
    }
  }
  Mr.id = 'UPLOAD_ATTACHMENTS';
  (class extends ae {
    constructor(e, t, n) {
      super(), (this.payload = { parentId: e, parentType: t, prevParentId: n });
    }
  }).id = 'CONFIRM_ATTACHMENT_CHANGES';
  (class extends ae {
    constructor(e) {
      super(), (this.payload = { uploadId: e });
    }
  }).id = 'CANCEL_ATTACHMENT_UPLOAD';
  (class extends ae {}).id = 'CANCEL_ATTACHMENT_CHANGES';
  class Rr extends ae {
    constructor() {
      super();
    }
  }
  Rr.id = 'ATTACHMENTS_RESET_DATA';
  (class extends ae {
    constructor(e, t, n) {
      super(), (this.payload = { open: e, attachments: t, attachmentId: n });
    }
  }).id = 'TOGGLE_VIEW_ATTACHMENTS';
  (class extends ae {
    constructor(e) {
      super(), (this.payload = { attachment: e });
    }
  }).id = 'ATTACHMENT_REMOVE';
  (class extends ae {
    constructor(e) {
      super(), (this.payload = { id: e });
    }
  }).id = 'ATTACHMENT_REMOVE_FAILED_UPLOAD';
  (class extends ae {
    constructor(e) {
      super(), (this.payload = { id: e });
    }
  }).id = 'ATTACHMENT_DELETE';
  const Pr = new U('command.saveToLayer');
  class Lr {
    constructor(e, t, n, a) {
      (this.sdkLayer = e),
        (this.externalCommands = t),
        (this.remove = n),
        (this.mattertagsData = a);
    }
    validateInput(e, t) {
      const n = {};
      if (!e.options) return { options: n };
      if (!Oa(e.options)) throw Error('Tag.saveToLayer: options is not an object');
      const a = e.options;
      if (a.progress) {
        if ('function' != typeof a.progress)
          throw Error('Tag.saveToLayer: progress option is not a function');
        n.progress = a.progress;
      }
      return { options: n };
    }
    async exec(e, t) {
      if (null === this.sdkLayer)
        return Pr.warn('Layers must be enabled to use Tag.saveToLayer.'), [];
      const n = [];
      for (const e of this.mattertagsData) e.layerId === this.sdkLayer.id && n.push(e);
      if (0 === n.length) return [];
      const a = n.reduce((e, t) => e + t.fileAttachments.length + t.externalAttachments.length, 0),
        o = new Yi(n.length + a + 2);
      let s;
      e.options.progress && (s = o.percentCompleted.onChanged(e.options.progress)), o.start();
      const i = new Date().toLocaleString();
      await this.externalCommands.issueCommand(new Fi(`Imported ${i}`, !1)),
        o.notifyTaskCompleted();
      const r = [];
      for (const e of n)
        if (e.layerId === this.sdkLayer.id) {
          let t = Ae(11);
          for (; this.mattertagsData.getTag(t); ) t = Ae(11);
          const n = [];
          if (e.fileAttachments)
            for (const a of e.fileAttachments) {
              const e = await fetch(await a.url.get()),
                s = await e.blob(),
                i = new File([s], a.filename || 'image.jpg', { type: s.type }),
                r = await this.externalCommands.issueCommand(new Mr(t, jt.MATTERTAG, [i]));
              r[0].attachment && n.push(r[0].attachment), o.notifyTaskCompleted();
            }
          (e.fileAttachments.length = 0),
            n.forEach((t) => {
              e.fileAttachments.push(t);
            });
          let a = null;
          e.externalAttachments &&
            e.externalAttachments.length > 0 &&
            ((a = await this.externalCommands.issueCommand(
              new Nr(t, jt.MATTERTAG, e.externalAttachments.get(0).src),
            )),
            o.notifyTaskCompleted());
          try {
            await this.externalCommands.issueCommand(
              new ki(
                t,
                {
                  position: e.anchorPosition,
                  normal: e.anchorNormal,
                  roomId: e.roomId,
                  floorId: e.floorId,
                  color: Object.assign({}, e.color),
                  description: e.description,
                  label: e.label,
                  stemHeight: e.stemHeight,
                  stemVisible: e.stemVisible,
                  enabled: e.enabled,
                  keywords: e.keywords,
                  icon: e.icon,
                },
                n,
                a,
              ),
            ),
              r.push(e);
          } catch (n) {
            Pr.warn(`Could not save tag sid:${t} label: ${e.label}}, skipping it.`);
          }
          o.notifyTaskCompleted(), this.externalCommands.issueCommand(new Rr());
        }
      return (
        await this.remove.exec({ ids: r.map((e) => e.sid) }, t),
        o.notifyTaskCompleted(),
        o.forceComplete(),
        null == s || s.cancel(),
        r.map((e) => e.sid)
      );
    }
  }
  function xr(e, t, n, a, o, s, i, r, c, d, l) {
    const {
      mattertagData: h,
      pinsModule: u,
      meshData: p,
      floorData: m,
      pinViewData: g,
      annotationsViewData: w,
      tagsViewData: y,
      roomData: I,
      roomIdMap: T,
      settingsData: E,
    } = l;
    e.addEnumToInterface({ namespace: 'Tag', name: 'AttachmentType', values: f.AttachmentType });
    const v = (function (e, t) {
        const n = ma.create(t, new Ni(), new _(Mi));
        return e.addCollectionToInterface({ namespace: 'Tag', name: 'attachments' }, n), n;
      })(e, new x(s)),
      C = (function (e, t) {
        const n = G.create(t, new _(xi));
        return (
          e.addAsyncCommandToInterface(
            { namespace: 'Tag', name: 'registerAttachment', args: ['srcs'], varArg: !0 },
            n,
          ),
          n
        );
      })(e, new x(s)),
      A = (function (e, t) {
        const n = G.create(t, new _(wr, e));
        return (
          e.addAsyncCommandToInterface(
            {
              namespace: 'Tag',
              name: 'registerSandbox',
              args: ['html', 'options'],
              subRoutine: 'tag.registerSandbox',
            },
            n,
          ),
          n
        );
      })(e, new x(s, w, i)),
      S = (function (e, t) {
        const n = G.create(t, new _(Ri));
        return (
          e.addAsyncCommandToInterface(
            {
              namespace: 'Tag',
              name: 'attach',
              args: ['tagId', 'attachmentIds'],
              varArg: !0,
              options: { replay: !0 },
            },
            n,
          ),
          n
        );
      })(e, new x(h, s)),
      b = (function (e, t) {
        const n = G.create(t, new _(Pi));
        return (
          e.addAsyncCommandToInterface(
            {
              namespace: 'Tag',
              name: 'detach',
              args: ['tagId', 'attachmentIds'],
              varArg: !0,
              options: { replay: !0 },
            },
            n,
          ),
          n
        );
      })(e, new x(h, s)),
      D = (function (e, t) {
        const n = Z.create(t, new pr(), new _(mr));
        return e.addObservableToInterface({ namespace: 'Tag', name: 'openTags' }, n), n;
      })(e, new x(g, w)),
      O = (function (e, t, n) {
        const a = ma.create(n, new Qi(), new _(Ji, t));
        return (
          e.addCollectionToInterface(
            { namespace: 'Tag', name: 'data', elementFactory: 'tag.data' },
            a,
          ),
          a
        );
      })(e, t, new x(h, y, T, I, p)),
      N = (function (e, t, n, a) {
        const o = G.create(a, new _(or, Object.assign(Object.assign({}, t), n)));
        return (
          e.addAsyncCommandToInterface(
            { namespace: 'Tag', name: 'open', args: ['id', 'options'] },
            o,
          ),
          o
        );
      })(e, n, a, new x(h, y)),
      M = (function (e, t, n, a) {
        const o = G.create(a, new _(rr, Object.assign(Object.assign({}, t), n)));
        return (
          e.addAsyncCommandToInterface(
            { namespace: 'Tag', name: 'dock', args: ['id', 'options'] },
            o,
          ),
          o
        );
      })(e, n, a, new x(h, y)),
      R = (function (e, t, n, a) {
        const o = G.create(a, new _(cr, Object.assign(Object.assign({}, t), n)));
        return (
          e.addAsyncCommandToInterface({ namespace: 'Tag', name: 'close', args: ['id'] }, o), o
        );
      })(e, n, a, new x(h, y)),
      P = (function (e, t, n, a) {
        const o = G.create(a, new _(yr, t, n));
        return (
          e.addAsyncCommandToInterface(
            {
              namespace: 'Tag',
              name: 'allowAction',
              args: ['id', 'allow'],
              options: { replay: !0 },
            },
            o,
          ),
          o
        );
      })(e, n, a, new x(g, y, w)),
      L = (function (e, t, n, a) {
        const o = G.create(a, new _(Ir, t, n));
        return (
          e.addAsyncCommandToInterface(
            {
              namespace: 'Tag',
              name: 'editBillboard',
              args: ['id', 'properties'],
              options: { replay: !0 },
            },
            o,
          ),
          o
        );
      })(e, n, a, new x(h)),
      k = (function (e, t, n, a, o) {
        const s = G.create(o, new _(Tr, t, n, a));
        return (
          e.addAsyncCommandToInterface(
            { namespace: 'Tag', name: 'editColor', args: ['id', 'color'], options: { replay: !0 } },
            s,
          ),
          s
        );
      })(e, t, n, a, new x(h)),
      V = (function (e, t, n, a, o, s) {
        const i = G.create(s, new _(Er, t, n, a, o));
        return (
          e.addAsyncCommandToInterface(
            { namespace: 'Tag', name: 'editIcon', args: ['id', 'iconId'], options: { replay: !0 } },
            i,
          ),
          i
        );
      })(e, n, a, t, d, new x(h, u, o, y)),
      U = (function (e, t, n, a) {
        const o = G.create(a, new _(Cr, t, n));
        return (
          e.addAsyncCommandToInterface(
            {
              namespace: 'Tag',
              name: 'editOpacity',
              args: ['id', 'opacity'],
              options: { replay: !0 },
            },
            o,
          ),
          o
        );
      })(e, n, a, new x(h, g)),
      F = (function (e, t, n, a) {
        const o = G.create(a, new _(vr, t, n));
        return (
          e.addAsyncCommandToInterface(
            {
              namespace: 'Tag',
              name: 'editStem',
              args: ['id', 'stemParams'],
              options: { replay: !0 },
            },
            o,
          ),
          o
        );
      })(e, n, a, new x(R, h, w)),
      H = (function (e, t) {
        const n = G.create(t, new _(Sr));
        return (
          e.addAsyncCommandToInterface(
            {
              namespace: 'Tag',
              name: 'editPositions',
              args: ['descriptors'],
              varArg: !0,
              options: { replay: !0 },
            },
            n,
          ),
          n
        );
      })(e, new x(R, h, w, T)),
      B = (function (e, t) {
        const n = G.create(t, new _(Ar));
        return (
          e.addAsyncCommandToInterface(
            {
              namespace: 'Tag',
              name: 'editPosition',
              args: ['id', 'options'],
              options: { replay: !0 },
            },
            n,
          ),
          n
        );
      })(e, new x(H)),
      z = (function (e, t, n, a) {
        const o = G.create(a, new _(br, t, n));
        return (
          e.addAsyncCommandToInterface(
            {
              namespace: 'Tag',
              name: 'remove',
              args: ['ids'],
              varArg: !0,
              options: { replay: !0 },
            },
            o,
          ),
          o
        );
      })(e, n, a, new x(h)),
      W = (function (e, t) {
        const n = G.create(t, new _(Dr));
        return (
          e.addAsyncCommandToInterface(
            { namespace: 'Tag', name: 'resetIcon', args: ['id'], options: { replay: !0 } },
            n,
          ),
          n
        );
      })(e, new x(h, u)),
      j = (function (e, t, n, a) {
        const o = G.create(a, new _(nr, t, n));
        return (
          e.addAsyncCommandToInterface(
            {
              namespace: 'Tag',
              name: 'add',
              args: ['descriptors'],
              varArg: !0,
              options: { replay: !0 },
            },
            o,
          ),
          o
        );
      })(e, t, a, new x(h, S, V, U, s, o, y, m, I, p)),
      $ = (function (e, t, n, a, o, s) {
        const i = G.create(o, new _(Zi, t, n, a, s));
        return (
          e.addAsyncCommandToInterface(
            {
              namespace: 'Tag',
              name: 'importTags',
              args: ['spaceSid', 'options'],
              varArg: !1,
              origins: q,
              options: { replay: !1 },
            },
            i,
          ),
          i
        );
      })(e, c, t, a, new x(h, m, I, p), r),
      K = (function (e, t, n, a) {
        const o = G.create(a, new _(Lr, t, n));
        return (
          e.addAsyncCommandToInterface(
            {
              namespace: 'Tag',
              name: 'saveToLayer',
              args: ['options'],
              varArg: !1,
              origins: q,
              options: { replay: !1 },
            },
            o,
          ),
          o
        );
      })(e, c, a, new x(z, h)),
      Y = new x(E);
    return {
      attachments: v,
      registerAttachment: C,
      registerSandbox: A,
      attach: S,
      importTags: $,
      detach: b,
      data: O,
      openTags: D,
      add: j,
      open: N,
      dock: M,
      close: R,
      allowAction: P,
      editBillboard: L,
      editColor: k,
      editIcon: V,
      editOpacity: U,
      editStem: F,
      editPosition: B,
      editPositions: H,
      remove: z,
      resetIcon: W,
      toggleDocking: (function (e, t) {
        const n = G.create(t, new _(Or, 'TAG_BILLBOARD_DOCK'));
        return (
          e.addAsyncCommandToInterface(
            { namespace: 'Tag', name: 'toggleDocking', args: ['enable'] },
            n,
          ),
          n
        );
      })(e, Y),
      toggleNavControls: (function (e, t) {
        const n = G.create(t, new _(Or, 'TAG_NAV_OVERLAY'));
        return (
          e.addAsyncCommandToInterface(
            { namespace: 'Tag', name: 'toggleNavControls', args: ['enable'] },
            n,
          ),
          n
        );
      })(e, Y),
      toggleSharing: (function (e, t) {
        const n = G.create(t, new _(Or, 'TAG_BILLBOARD_SHARE'));
        return (
          e.addAsyncCommandToInterface(
            { namespace: 'Tag', name: 'toggleSharing', args: ['enable'] },
            n,
          ),
          n
        );
      })(e, Y),
      saveToLayer: K,
    };
  }
  class _r {
    constructor(e, t) {
      (this.tagsViewData = e), (this.layersData = t);
    }
    validateInput(e, t) {
      return {};
    }
    async exec(e, t) {
      const n = {};
      for (const e of this.tagsViewData.getCollection()) {
        const t = this.layersData.getLayer(e.layerId);
        n[e.id] = !!(null == t ? void 0 : t.toggled) || !e.layerId;
      }
      return n;
    }
  }
  class kr {
    validateInput(e) {
      if (!j(e.arg0))
        throw Error(`Stat.test: arg0 was specified but was not a valid string; got ${e.arg0}`);
      return e;
    }
    async exec(e, t) {
      return e.arg0;
    }
  }
  class Vr {
    create() {
      return ji(
        () => {},
        () => {},
      );
    }
  }
  class Ur {
    constructor() {
      this._data = {};
    }
    get data() {
      return this._data;
    }
    isItemEqual(e, t) {
      const n = this.data[t],
        a = e.data[t];
      return n.test === a.test;
    }
    update() {}
    clear() {
      this._data = {};
    }
  }
  var Fr;
  !(function (e) {
    (e.ENUM1 = 'test.enum1'), (e.ENUM2 = 'test.enum2');
  })(Fr || (Fr = {}));
  class Gr {
    validateInput(e) {
      return e;
    }
    async exec(e, t) {}
  }
  class Hr {
    create(e) {
      return ji(
        () => {},
        () => {},
      );
    }
  }
  class Br {
    constructor() {
      this._data = { testString: 'hello' };
    }
    get data() {
      return this._data;
    }
    equals(e) {
      return this._data.testString === e.data.testString;
    }
    copy(e) {
      this._data.testString = e.data.testString;
    }
    update() {}
  }
  function zr(e, t) {
    const { tagsViewData: n, layersData: a } = t,
      o = (function (e, t) {
        const n = ma.create(t, new Vr(), new _(Ur));
        return (
          e.addCollectionToInterface(
            { namespace: 'Test', name: 'directCollection', sdkTypes: [ue.DIRECT], origins: q },
            n,
          ),
          e.addCollectionToInterface(
            {
              namespace: 'Test',
              name: 'postMessageCollection',
              sdkTypes: [ue.POSTMESSAGE],
              origins: q,
            },
            n,
          ),
          n
        );
      })(e, x.none),
      s = (function (e, t) {
        const n = Z.create(t, new Hr(), new _(Br));
        return (
          e.addObservableToInterface(
            { namespace: 'Test', name: 'directObservable', sdkTypes: [ue.DIRECT], origins: q },
            n,
          ),
          e.addObservableToInterface(
            {
              namespace: 'Test',
              name: 'postMessageObservable',
              sdkTypes: [ue.POSTMESSAGE],
              origins: q,
            },
            n,
          ),
          n
        );
      })(e, x.none),
      i = (function (e, t) {
        const n = G.create(t, new _(_r));
        return (
          e.addAsyncCommandToInterface(
            { namespace: 'Test', name: 'getTagVisibility', args: [], origins: q },
            n,
          ),
          n
        );
      })(e, new x(n, a));
    return (
      (function (e) {
        e.addEnumToInterface({
          namespace: 'Test',
          name: 'directEnum',
          values: Fr,
          sdkTypes: [ue.DIRECT],
          origins: q,
        }),
          e.addEnumToInterface({
            namespace: 'Test',
            name: 'postMessageEnum',
            values: Fr,
            sdkTypes: [ue.POSTMESSAGE],
            origins: q,
          });
      })(e),
      (function (e, t) {
        const n = G.create(t, new _(kr));
        e.addCommandToInterface({ namespace: 'Test', name: 'echo', args: ['arg0'], origins: q }, n),
          e.addAsyncCommandToInterface(
            { namespace: 'Test', name: 'echoAsync', args: ['arg0'], origins: q },
            n,
          ),
          e.addCommandToInterface(
            { namespace: 'Test.Sub', name: 'echo', args: ['arg0'], origins: q },
            n,
          ),
          e.addAsyncCommandToInterface(
            { namespace: 'Test.Sub', name: 'echoAsync', args: ['arg0'], origins: q },
            n,
          ),
          e.addCommandToInterface(
            { namespace: 'Test.Sub.Sub2', name: 'echo', args: ['arg0'], origins: q },
            n,
          ),
          e.addAsyncCommandToInterface(
            { namespace: 'Test.Sub.Sub2', name: 'echoAsync', args: ['arg0'], origins: q },
            n,
          );
      })(e, x.none),
      (function (e, t) {
        const n = G.create(t, new _(Gr));
        e.addCommandToInterface(
          {
            namespace: 'Test',
            name: 'directCommand',
            args: [],
            sdkTypes: [ue.DIRECT],
            varArg: !1,
            origins: q,
          },
          n,
        ),
          e.addCommandToInterface(
            {
              namespace: 'Test',
              name: 'postMessageCommand',
              args: [],
              sdkTypes: [ue.POSTMESSAGE],
              varArg: !1,
              origins: q,
            },
            n,
          );
      })(e, x.none),
      { collection: o, observable: s, visibleTagsCheckCommand: i }
    );
  }
  const Wr = new U('sdk: tours');
  class jr {
    constructor(e, t) {
      (this.tourControls = e), (this.tourData = t);
    }
    validateInput(e) {
      return (
        void 0 !== e.index &&
          isNaN(e.index) &&
          (Wr.warn(e.index, 'is not a valid number'), (e.index = void 0)),
        void 0 !== e.steps &&
          isNaN(e.steps) &&
          (Wr.warn(e.steps, 'is not a valid number'), (e.steps = void 0)),
        e
      );
    }
    async exec(e) {
      if (0 === this.tourData.getSnapshotCount()) throw Error('No tour data found');
      if (!this.tourControls.canChangeTourLocation())
        throw Error(
          'TourStart ignored, cannot change location at this time, another transition is active',
        );
      try {
        this.tourControls.startTour(e.index, e.steps, e.loop);
      } catch (e) {
        throw Error(`Error occurred while starting tour - ${e}`);
      }
    }
  }
  class $r {
    constructor(e) {
      this.tourControls = e;
    }
    validateInput(e) {
      return e;
    }
    async exec(e) {
      try {
        await this.tourControls.stopTour();
      } catch (e) {
        throw Error(`Error occurred while stopping tour - ${e}`);
      }
    }
  }
  class qr {
    constructor(e, t) {
      (this.tourControls = e), (this.tourData = t);
    }
    validateInput(e) {
      const t = e.index;
      if (!No(t)) throw Error(t + ' is not a valid tour snapshot index');
      if (t < 0 || t > this.tourData.getSnapshotCount())
        throw Error(
          `${t} is outside of the range of tour snapshots: [0 , ${this.tourData.getSnapshotCount() - 1}]`,
        );
      return { index: t };
    }
    async exec(e) {
      if (0 === this.tourData.getSnapshotCount()) throw Error('No tour data found');
      if (!this.tourControls.canChangeTourLocation())
        throw Error(
          'TourStep ignored, cannot change location at this time, another transition is active',
        );
      try {
        this.tourControls.tourGoTo(e.index);
      } catch (e) {
        throw Error(`Error occurred while jumping to new tour location - ${e}`);
      }
    }
  }
  class Kr {
    constructor(e, t, n) {
      (this.forward = e), (this.tourControls = t), (this.tourData = n);
    }
    validateInput(e) {
      return e;
    }
    async exec(e) {
      if (0 === this.tourData.getSnapshotCount()) throw Error('No tour data found');
      if (!this.tourControls.canChangeTourLocation())
        throw Error(
          'TourStep ignored, cannot change location at this time, another transition is active',
        );
      try {
        this.forward ? this.tourControls.tourGoNext(!1) : this.tourControls.tourGoPrevious(!1);
      } catch (e) {
        throw Error(`Error while trying to travel to the next tour snapshot - ${e}`);
      }
    }
  }
  function Yr(e, t, n, a) {
    !(function (e, t, n) {
      t.addBinding(Xr, async () =>
        n.getDependencies().then(async ([n, a]) => {
          const o = await Promise.all(
            a.getEnabledSnapshots().map((n) =>
              (async function (e, t, n) {
                const a = !e.is360,
                  o = n.viewmodeConverter.toSdk(e.metadata.cameraMode, a);
                if (!o || o === n.commandModeConverter.toSdk(t.CommandViewmode.TRANSITIONING))
                  throw Error('Failed to convert snapshot, invalid viewmode');
                return {
                  sid: e.sid,
                  thumbnailUrl: await e.thumbnailUrl.get(),
                  imageUrl: await e.imageUrl.get(),
                  is360: e.is360,
                  name: e.name,
                  mode: o,
                  zoom: e.metadata.ssZoom,
                  position: e.metadata.cameraPosition,
                  rotation: n.conversionUtils.quaternionToRotation(e.metadata.cameraQuaternion),
                };
              })(n, e, t),
            ),
          );
          if (0 === o.length) throw Error('No tour data found');
          return o;
        }),
      );
    })(t, n, a),
      e.addCommandCreator({ namespace: 'Tour', name: 'getData', args: [] }, () => new Xr());
    const o = a,
      s = G.create(o, new _(jr)),
      i = G.create(o, new _($r)),
      r = G.create(o, new _(qr)),
      c = G.create(o, new _(Kr, !0)),
      d = G.create(o, new _(Kr, !1));
    e.addAsyncCommandToInterface({ namespace: 'Tour', name: 'start', args: ['index'] }, s),
      e.addCommandToInterface({ namespace: 'Tour', name: 'stop', args: [] }, i),
      e.addCommandToInterface({ namespace: 'Tour', name: 'step', args: ['index'] }, r),
      e.addCommandToInterface({ namespace: 'Tour', name: 'prev', args: [] }, c),
      e.addCommandToInterface({ namespace: 'Tour', name: 'next', args: [] }, d);
  }
  class Xr extends ae {}
  Xr.id = 'GET_TOUR_DATA';
  class Zr {
    create(e, t) {
      return t.onChanged(() => e.onChanged());
    }
  }
  class Qr {
    constructor() {
      this._data = { step: null };
    }
    get data() {
      return this._data;
    }
    equals(e) {
      return this._data.step === e.data.step;
    }
    copy(e) {
      this._data.step = e.data.step;
    }
    update(e) {
      var t;
      this._data.step =
        e.isTourActive() && null !== (t = e.getTourCurrentSnapshotSid()) && void 0 !== t ? t : null;
    }
  }
  class Jr {
    create(e, t) {
      return t.onChanged(() => e.onChanged());
    }
  }
  class ec {
    constructor(e) {
      (this._data = { current: w.PlayState.INACTIVE }),
        (this.tourStateConverter = e.tourStateConverter);
    }
    get data() {
      return this._data;
    }
    equals(e) {
      return this._data.current === e.data.current;
    }
    copy(e) {
      this._data.current = e.data.current;
    }
    update(e) {
      this._data.current = this.tourStateConverter.toSdkTourState(e.getTourState());
    }
  }
  class tc {
    constructor(e) {
      this.toSdkTourStateMap = {
        [e.Inactive]: w.PlayState.INACTIVE,
        [e.Active]: w.PlayState.ACTIVE,
        [e.StopScheduled]: w.PlayState.STOP_SCHEDULED,
      };
    }
    toSdkTourState(e) {
      return this.toSdkTourStateMap[e];
    }
  }
  class nc {
    create(e, t) {
      return t.onChanged(() => e.onChanged());
    }
  }
  class ac {
    constructor() {
      this._data = { from: null, to: null };
    }
    get data() {
      return this._data;
    }
    equals(e) {
      return this._data.from === e.data.from && this._data.to === e.data.to;
    }
    copy(e) {
      (this._data.from = e.data.from), (this._data.to = e.data.to);
    }
    update(e) {
      const t = this.hasEnded;
      if (((this.hasEnded = e.tourEnded), !t && this.hasEnded))
        return (this._data.from = null), void (this._data.to = null);
      const n = -1 === e.tourCurrentSnapshot ? null : e.getTourSnapshotSid(e.tourCurrentSnapshot),
        a = -1 === e.transition.toIndex ? null : e.getTourSnapshotSid(e.transition.toIndex);
      null !== a &&
        (n === a
          ? ((this._data.from = null), (this._data.to = null))
          : ((this._data.from = n), (this._data.to = a)));
    }
  }
  class oc {
    constructor() {
      this.layerSubscriptions = new Map();
    }
    create(e, t) {
      const n = t.onCurrentLayersChanged(() => {
        this.subscribeToLayers(e, t), e.onChanged();
      });
      return {
        renew: () => {
          n.renew();
          for (const [, e] of this.layerSubscriptions) e.renew();
        },
        cancel: () => {
          n.cancel();
          for (const [, e] of this.layerSubscriptions) e.cancel();
        },
      };
    }
    subscribeToLayers(e, t) {
      for (const n of t.getOrderedModelViews()) {
        if (n.enabled)
          for (const a of t.filterUserFacingLayers(n.layers))
            this.layerSubscriptions.has(a) ||
              this.layerSubscriptions.set(
                a,
                a.onChanged(() => e.onChanged()),
              );
        for (const n of t.inMemoryLayers)
          this.layerSubscriptions.has(n) ||
            this.layerSubscriptions.set(
              n,
              n.onChanged(() => e.onChanged()),
            );
      }
    }
  }
  class sc {
    constructor(e) {
      (this.layersData = e), (this._data = {});
    }
    get data() {
      return this._data;
    }
    isItemEqual(e, t) {
      return this.isLayerEqual(this.data[t], e.data[t]);
    }
    isLayerEqual(e, t) {
      return e.id === t.id && e.name === t.name && e.toggled === t.toggled;
    }
    update() {
      const e = new Set();
      for (const t of this.layersData.getOrderedModelViews())
        if (t.enabled)
          for (const n of this.layersData.filterUserFacingLayers(t.layers))
            (this._data[n.id] = { id: n.id, name: n.name, toggled: n.toggled }), e.add(n.id);
      for (const t of this.layersData.inMemoryLayers)
        (this._data[t.id] = { id: t.id, name: t.name, toggled: t.toggled }), e.add(t.id);
      for (const t in this.data) e.has(t) || delete this._data[t];
    }
    clear() {
      this._data = {};
    }
  }
  class ic {
    create(e, t) {
      return new ce(
        t.onModelViewsChanged(() => e.onChanged()),
        t.onCurrentLayersChanged(() => e.onChanged()),
      );
    }
  }
  class rc {
    constructor(e) {
      (this.layersData = e), (this._data = {});
    }
    get data() {
      return this._data;
    }
    isItemEqual(e, t) {
      return this.isViewEqual(this.data[t], e.data[t]);
    }
    isViewEqual(e, t) {
      return (
        e.id === t.id &&
        e.name === t.name &&
        e.layers.length === t.layers.length &&
        e.active === t.active &&
        e.layers.every((e, n) => {
          const a = t.layers[n];
          return e.id === a.id && e.name === a.name && e.toggled === a.toggled;
        })
      );
    }
    update() {
      for (const e of this.layersData.getOrderedModelViews())
        if (e.enabled) {
          const t = this._data[e.id] || {};
          (t.id = e.id), (t.name = e.name), (t.active = this.layersData.currentViewId === e.id);
          const n = this.layersData
            .filterUserFacingLayers(e.layers)
            .map((e) => ({ id: e.id, name: e.name, toggled: e.toggled }));
          (t.layers = Un(t.layers || [], n)), (this._data[e.id] = t);
        }
      for (const e in this.data)
        try {
          this.layersData.getView(e) || delete this._data[e];
        } catch (t) {
          delete this._data[e];
        }
    }
    clear() {
      this._data = {};
    }
  }
  class cc {
    constructor(e) {
      this.commands = e;
    }
    validateInput(e, t) {
      if (!j(e.name)) throw Error('an empty name is not allowed');
      return { name: e.name };
    }
    async exec(e, t) {
      const n = await this.commands.issueCommand(
        new this.commands.AddInMemoryLayerCommand({ name: e.name, toggled: !0, visible: !0 }),
      );
      return { id: n.id, name: n.name, toggled: !0 };
    }
  }
  var dc;
  !(function (e) {
    (e.ADD = 'view.add.layer'), (e.REMOVE = 'view.remove.layer');
  })(dc || (dc = {}));
  const lc = 'View.update',
    hc = 'View.activate',
    uc = 'Layer.toggle';
  class pc {
    constructor(e) {
      this.layersData = e;
    }
    validateInput(e, t) {
      if (!Pn(dc, e.op)) throw Error(`${e.op} is an unsupported operation`);
      if (!j(e.viewId)) throw Error(`${e.viewId} is not a valid view id`);
      const n = this.layersData.getView(e.viewId);
      if (!n) throw Error(`${e.viewId} does not map to a valid View`);
      if (!j(e.layerId)) throw Error(`${e.layerId} is not a valid layer id`);
      const a = this.layersData.inMemoryLayers.find((t) => t.id === e.layerId);
      if (!a)
        throw Error(
          `Only SDK created layers can be manipulated. ${e.layerId} does not map to an SDK-owned layer`,
        );
      return { op: e.op, view: n, layer: a };
    }
    async exec(e, t) {
      ({
        [dc.ADD]: (e, t) => {
          e.layers.push(t);
        },
        [dc.REMOVE]: (e, t) => {
          const n = e.layers.findIndex((e) => e.id === t.id);
          n >= 0 && e.layers.remove(n);
        },
      })[e.op](e.view, e.layer);
    }
  }
  class mc {
    constructor(e, t) {
      (this.commands = e), (this.layersData = t);
    }
    validateInput(e, t) {
      if (!j(e.viewId) || !this.layersData.getView(e.viewId))
        throw Error(`${e.viewId} does not map to a valid View`);
      return { viewId: e.viewId, returnToStart: !!e.returnToStart };
    }
    async exec(e, t) {
      e.returnToStart
        ? await this.commands.issueCommand(new this.commands.SetActiveModelViewCommand(e.viewId))
        : (await this.commands.issueCommand(new this.commands.SetMoveCameraOnViewChange(!1)),
          await this.commands.issueCommand(new this.commands.SetActiveModelViewCommand(e.viewId)),
          await this.commands.issueCommand(new this.commands.SetMoveCameraOnViewChange(!0)));
    }
  }
  class gc {
    create(e, t) {
      return t.onPropertyChanged('currentViewId', () => e.onChanged());
    }
  }
  class fc {
    constructor() {
      this._data = { id: '', name: '', active: !1, layers: [] };
    }
    get data() {
      return this._data;
    }
    copy(e) {
      (this._data.id = e.data.id),
        (this._data.name = e.data.name),
        (this._data.active = e.data.active),
        Un(this._data.layers, e.data.layers);
    }
    equals(e) {
      return (
        this.data.id === e.data.id &&
        this.data.name === e.data.name &&
        this.data.active === e.data.active &&
        this.data.layers.length === e.data.layers.length &&
        this._data.layers.every((e, t) => {
          const n = this.data.layers[t];
          return e.id === n.id && e.name === n.name && e.toggled === n.toggled;
        })
      );
    }
    update(e) {
      const t = e.getView(e.currentViewId);
      (this._data.id = t.id),
        (this._data.name = t.name),
        (this._data.active = e.currentViewId === this._data.id),
        Un(
          this._data.layers,
          e.filterUserFacingLayers(t.layers).map((e) => ({ id: e.id, name: e.name })),
        );
    }
  }
  class wc {
    constructor(e) {
      this.matcher = e;
    }
    static isValue(e) {
      return new wc(new yc(e));
    }
    static isType(e) {
      return new wc(new Ic(e));
    }
    static isInstanceOf(e) {
      return new wc(new Tc(e));
    }
    static is(e) {
      return new wc(new Ec(e));
    }
    static isAny() {
      return new wc(new vc());
    }
    compare(e) {
      return this.matcher.matches(e);
    }
  }
  class yc {
    constructor(e) {
      this.value = e;
    }
    matches(e) {
      return this.value === e;
    }
  }
  class Ic {
    constructor(e) {
      this.type = e;
    }
    matches(e) {
      return Object.getPrototypeOf(e).constructor === this.type;
    }
  }
  class Tc {
    constructor(e) {
      this.type = e;
    }
    matches(e) {
      if ('object' == typeof e) return e instanceof this.type;
      const t = this.type;
      switch (typeof e) {
        case 'number':
          return t === Number;
        case 'string':
          return t === String;
        case 'boolean':
          return t === Boolean;
        case 'function':
          return t === Function;
      }
      return !1;
    }
  }
  class Ec {
    constructor(e) {
      this.predicate = e;
    }
    matches(e) {
      return this.predicate(e);
    }
  }
  class vc {
    constructor() {}
    matches() {
      return !0;
    }
  }
  class Cc {
    constructor(e, t) {
      (this.sdk = e), (this.commandFilter = t), (this._data = new Map());
    }
    validateInput() {
      return {};
    }
    async exec() {
      return this.data;
    }
    get data() {
      return (this._data = new Map(this.sdk.registeredCommands(this.commandFilter))), this._data;
    }
  }
  class Ac {
    constructor(e, t) {
      (this.commands = e), (this.layersData = t);
    }
    validateInput(e, t) {
      if (!j(e.layerId)) throw Error(`${e.layerId} does not map to a valid Layer`);
      const n = this.layersData.getLayer(e.layerId);
      if (!n) throw Error(`${e.layerId} does not map to a valid Layer`);
      return { layer: n, activate: void 0 === e.activate ? void 0 : !!e.activate };
    }
    exec(e, t) {
      return void 0 !== e.activate
        ? this.commands.issueCommand(new this.commands.ToggleLayerCommand(e.layer.id, e.activate))
        : this.commands.issueCommand(
            new this.commands.ToggleLayerCommand(e.layer.id, !e.layer.toggled),
          );
    }
  }
  function Sc(e, t, n) {
    const a = new x(t.layersData),
      o = (function (e, t) {
        const n = Z.create(t, new gc(), new _(fc));
        return (
          e.addObservableToInterface(
            { namespace: 'View', name: 'current', objectFactory: 'View' },
            n,
          ),
          n
        );
      })(e, a),
      s = (function (e, t) {
        const n = ma.create(t, new ic(), new _(rc));
        return (
          e.addCollectionToInterface(
            { namespace: 'View', name: 'views', elementFactory: 'View' },
            n,
          ),
          n
        );
      })(e, a),
      i = (function (e, t) {
        const n = ma.create(t, new oc(), new _(sc));
        return (
          e.addCollectionToInterface(
            { namespace: 'View', name: 'layers', elementFactory: 'Layer' },
            n,
          ),
          n
        );
      })(e, a);
    !(function (e) {
      const t = wc.is((e) => {
          var t, n;
          return (
            !(null === (t = e.options) || void 0 === t ? void 0 : t.deprecated) &&
            !!(null === (n = e.options) || void 0 === n ? void 0 : n.replay)
          );
        }),
        n = Ba.create(x.none, new _(Cc, e, t));
      e.addCommand('Layer.interface', n);
    })(e);
    return {
      current: o,
      views: s,
      layers: i,
      updateView: (function (e, t) {
        const n = Ba.create(t, new _(pc));
        return e.addCommand(lc, n), n;
      })(e, a),
      activateView: (function (e, t, n) {
        const a = Ba.create(n, new _(mc, t));
        return e.addCommand(hc, a), a;
      })(e, n, a),
      createLayer: (function (e, t) {
        const n = Ba.create(x.none, new _(cc, t));
        return (
          e.addCommandToInterface(
            { namespace: 'View', name: 'createLayer', args: ['name'], subRoutine: 'Layer' },
            n,
          ),
          n
        );
      })(e, n),
      toggleLayer: (function (e, t, n) {
        const a = Ba.create(n, new _(Ac, t));
        return e.addCommand(uc, a), a;
      })(e, n, a),
    };
  }
  class bc {
    constructor(e, t, n, a) {
      (this.layersData = e),
        (this.commonLayer = t),
        (this.getCurrentLayer = n),
        (this.selectLayer = a),
        (this.layerToReset = null);
    }
    async intercept(e, t) {
      var n;
      this.layerToReset = null !== (n = this.getCurrentLayer()) && void 0 !== n ? n : null;
      const a = (t.layerId && this.layersData.findLayer(t.layerId)) || this.commonLayer;
      await this.selectLayer(a);
    }
    async postExec() {
      this.layerToReset && (await this.selectLayer(this.layerToReset));
    }
  }
  var Dc;
  !(function (e) {
    (e.DISABLED = 'disabled'),
      (e.VIEWS_OPTIONAL_OPT_IN = 'user_views'),
      (e.VIEWS_ENABLED = 'views_enabled'),
      (e.VIEWS_AND_LAYERS = 'views_layers'),
      (e.LAYERS_ONLY = 'layers');
  })(Dc || (Dc = {}));
  var Oc;
  !(function (e) {
    (e.DISABLED = '0'), (e.VIEWS_ENABLED = '2'), (e.VIEWS_AND_LAYERS = '3'), (e.LAYERS_ONLY = '4');
  })(Oc || (Oc = {}));
  class Nc {
    create(e, t, n) {
      const a = () => e.onChanged();
      return new ce(n.onChanged(a), t.onChanged(a));
    }
  }
  class Mc {
    constructor(e) {
      (this._data = { from: null, to: null }), (this.viewmodeConverter = e.viewmodeConverter);
    }
    get data() {
      return this._data;
    }
    equals(e) {
      return this._data.from === e._data.from && this._data.to === e._data.to;
    }
    copy(e) {
      this._data = { from: e._data.from, to: e._data.to };
    }
    update(e, t) {
      const n = t.currentSweep && t.isSweepAligned(t.currentSweep),
        a = t.transition.to && t.isSweepAligned(t.transition.to);
      this._data = e.transition.active
        ? {
            from: this.viewmodeConverter.toSdk(
              e.transition.from,
              !!n,
              e.transition.isFromPitchFactorOrtho,
            ),
            to: this.viewmodeConverter.toSdk(
              e.transition.to,
              !!a,
              e.transition.isToPitchFactorOrtho,
            ),
          }
        : { from: null, to: null };
    }
  }
  class Rc {
    create(e, t) {
      return t.onChanged(() => e.onChanged());
    }
  }
  class Pc {
    constructor(e) {
      (this.pluginData = e), (this._data = {});
    }
    get data() {
      return this._data;
    }
    isItemEqual(e, t) {
      const n = this.data[t],
        a = e.data[t];
      return n.applicationKey === a.applicationKey && n.id === a.id;
    }
    update() {
      for (const e of this.pluginData.plugins.entries())
        this._data[e[0]] = { applicationKey: e[1].applicationKey, id: e[1].id };
      for (const e in this.data) this.pluginData.plugins.has(e) || delete this._data[e];
    }
    clear() {
      this._data = {};
    }
  }
  function* Lc(e) {
    const t = [...e];
    for (let e = t.length - 1; e >= 0; --e) yield t[e];
  }
  const xc = new U('sdk history');
  class _c {
    constructor(e, t, n) {
      (this.sdk = e),
        (this.layersData = t),
        (this.commonLayer = n),
        (this.claimedIds = new Set()),
        (this.allRegisteredCommands = new Map()),
        (this.commandObservers = new Set()),
        (this.interceptors = new Set()),
        (this.commandInterceptors = new gr());
    }
    getOrClaimId(e, t) {
      const n = t || this.generateUniqueId();
      return this.claimedIds.add(n), n;
    }
    generateUniqueId() {
      let e = '';
      do {
        e = Xa(12);
      } while (this.claimedIds.has(e));
      return e;
    }
    connect(e, t) {
      return this.sdk.connect(e, t);
    }
    connectPlugin(e, t) {
      return this.sdk.connectPlugin(e, t);
    }
    getClientAuth(e) {
      return this.sdk.getClientAuth(e);
    }
    addEnumToInterface(e) {
      return this.sdk.addEnumToInterface(e);
    }
    addCommand(e, t, n) {
      return this.sdk.addCommand(e, t, n);
    }
    addCommandToInterface(e, t) {
      return this.sdk.addCommandToInterface(e, this.createCommandProxy(e, t));
    }
    addAsyncCommandToInterface(e, t) {
      return this.sdk.addAsyncCommandToInterface(e, this.createCommandProxy(e, t));
    }
    addObservable(e, t) {
      return this.sdk.addObservable(e, t);
    }
    addObservableToInterface(e, t) {
      return this.sdk.addObservableToInterface(e, t);
    }
    addCollection(e, t) {
      return this.sdk.addCollection(e, t);
    }
    addCollectionToInterface(e, t) {
      return this.sdk.addCollectionToInterface(e, t);
    }
    broadcast(e, t, n) {
      return this.sdk.broadcast(e, t, n);
    }
    sendPrivateMessage(e, t) {
      return this.sdk.sendPrivateMessage(e, t);
    }
    addPrivateMessageHandler(e) {
      return this.sdk.addPrivateMessageHandler(e);
    }
    addCommandCreator(e, t) {
      return this.sdk.addCommandCreator(e, t);
    }
    interceptCommands(e, ...t) {
      if (0 === t.length) this.interceptors.add(e);
      else for (const n of t) this.commandInterceptors.add(n, e);
    }
    async createCommandProxy(e, t) {
      var n;
      const a = new Vc(),
        o = new Set(),
        s = new Set(),
        i = {
          visitor: a,
          beforeExec: async (n, s, i, r) => {
            var c, d;
            if ((o.clear(), a.reset(), null == n ? void 0 : n.layerId)) {
              const e = this.layersData.findLayer(n.layerId);
              if (!e) throw Error(n.layerId + 'does not map to a valid layer');
              (this.layersData.getCurrentView().layers.find((t) => t === e) &&
                !this.layersData.commonInMemoryLayers.find((t) => t === e)) ||
                (a.stopPropagation('not ready to execute'), s.validateInput(i, n));
            }
            for (const t of this.interceptors) {
              if (!a.propagate) break;
              await (null === (c = t.intercept) || void 0 === c ? void 0 : c.call(t, e, n)),
                o.add(t);
            }
            for (const s of this.commandInterceptors.getValuesAtKey(t)) {
              if (!a.propagate) break;
              await (null === (d = s.intercept) || void 0 === d ? void 0 : d.call(s, e, n)),
                o.add(s);
            }
          },
          afterExec: async (n, i, r, c) => {
            var d, l, h, u, p;
            const m = async () => {
              xc.debug('executing', `${e.namespace}.${e.name}`, r);
              try {
                await c.exec(r, n);
              } catch (e) {
                xc.debugWarn(e);
              }
            };
            if (
              (null === (d = e.options) || void 0 === d ? void 0 : d.replay) &&
              !s.has(n.executionId)
            )
              if ((s.add(n.executionId), n.layerId)) {
                const e = this.layersData.findLayer(n.layerId);
                if (!e) throw Error(n.layerId + 'does not map to a valid layer');
                e.onApply(m);
              } else null === (l = this.commonLayer) || void 0 === l || l.onApply(m);
            if (a.propagate) {
              for (const e of Lc(this.commandInterceptors.getValuesAtKey(t)))
                await (null === (h = e.postExec) || void 0 === h ? void 0 : h.call(e));
              for (const e of Lc(this.interceptors))
                await (null === (u = e.postExec) || void 0 === u ? void 0 : u.call(e));
            } else for (const e of Lc(o)) null === (p = e.postExec) || void 0 === p || p.call(e);
          },
        },
        r = (e, t) => this.getOrClaimId(e, t);
      if (
        (this.allRegisteredCommands.set(`${e.namespace}.${e.name}`, e),
        this.triggerCommandObservers(e),
        null === (n = e.options) || void 0 === n ? void 0 : n.deprecated)
      ) {
        const n =
          `"${e.namespace}.${e.name}" is deprecated` +
          ($(e.options.deprecated) ? `; use ${e.options.deprecated}` : '');
        return new kc(i, r, await W(t, n));
      }
      return new kc(i, r, await t);
    }
    *registeredCommands(e) {
      for (const t of this.allRegisteredCommands) {
        const [, n] = t;
        e.compare(n) && (yield t);
      }
    }
    onCommandsUpdated(e, t) {
      const n = [e, t],
        a = {
          renew: () => this.commandObservers.add(n),
          cancel: () => this.commandObservers.delete(n),
        };
      return a.renew(), a;
    }
    triggerCommandObservers(e) {
      for (const [t, n] of this.commandObservers) n.compare(e) && t(e);
    }
  }
  class kc {
    constructor(e, t, n) {
      (this.hooks = e),
        (this.claimId = t),
        (this.command = n),
        (this.clientCache = new Map()),
        (this.contextCache = new Map());
    }
    async exec(e, t) {
      const n = this.getContextWithIdLookup(t);
      let a;
      return (
        await this.hooks.beforeExec(n, this.command, e, this),
        this.hooks.visitor.propagate && (a = await this.command.exec(e, n)),
        this.hooks.afterExec(n, this.command, e, this),
        a
      );
    }
    validateInput(e, t) {
      const n = this.getContextWithIdLookup(t);
      return this.command.validateInput(e, n);
    }
    getContextWithIdLookup(e) {
      const t = e.client,
        n =
          this.clientCache.get(t) ||
          Object.assign(Object.assign({}, t), { getOrClaimId: (e) => this.claimId(n, e) }),
        a =
          this.contextCache.get(e.executionId) ||
          Object.assign(Object.assign({}, e), { client: n });
      return this.clientCache.set(t, n), this.contextCache.set(e.executionId, a), a;
    }
  }
  class Vc {
    constructor() {
      (this.reason = ''), (this.propagate = !0);
    }
    stopPropagation(e) {
      (this.propagate = !1), (this.reason = e);
    }
    reset() {
      (this.reason = ''), (this.propagate = !0);
    }
  }
  const Uc = new U('SDK interface');
  async function Fc(t, n, a, i, d, p, m, f) {
    U.level = m.logLevel || V.INFO;
    const { THREE: I } = n,
      {
        api: T,
        appPhaseModule: E,
        locale: v,
        applicationData: L,
        cameraData: k,
        canvasData: F,
        deepLinks: H,
        floorData: B,
        floorViewData: z,
        labelData: j,
        layersData: $,
        mattertagData: Q,
        tagsViewData: J,
        measurementModeData: ee,
        meshData: ae,
        modelData: ie,
        annotationsViewData: re,
        raycasterData: ce,
        roomData: pe,
        roomBoundData: me,
        settingsData: fe,
        sweepData: we,
        sweepViewData: ye,
        tourData: Ie,
        viewmodeData: Te,
        attachmentsModule: Ee,
        commonControlsModule: ve,
        floorCasterModule: Ce,
        meshQuery: Ae,
        modelMeshModule: Se,
        navigationModule: be,
        plugin: De,
        pluginConfigData: Oe,
        renderToTextureModule: Ne,
        sceneModule: Me,
        sensorModule: Re,
        settingsModule: Pe,
        tourControlsModule: Le,
        webglRendererModule: xe,
        zoomControlModule: _e,
        sweepTextureLoader: ke,
        cursorController: Ve,
        pluginData: Ue,
        externalR3FModule: Fe,
      } = d,
      [Ge, He] = await Promise.all([$, fe]);
    let Be =
        He.tryGetProperty('data-layers-feature', !1) ||
        He.tryGetProperty('model-views-feature', !1),
      ze = null;
    try {
      ze = await i.issueCommand(
        new a.AddInMemoryLayerCommand({
          name: 'SDK Layer (Temporary)',
          visible: !0,
          toggled: !0,
          common: !0,
        }),
      );
    } catch (e) {
      (Be = !1),
        (ze = null),
        Uc.info('Error setting up layers. Views and Layers features will be disabled. -- ', e);
    }
    const We = new _c(t, Ge, ze),
      je = new O(I),
      $e = new S(a.Viewmode),
      qe = (function (e) {
        return async function (t, n, a) {
          const o = a.rotationSpeed;
          let s = a.yAngle;
          if (a.clampYRotation)
            if (n.pose.isPitchFactorOrtho.value) s = 0;
            else {
              const e = n.pose.phi() + a.yAngle - Zn;
              e > 0 && (s = Math.max(a.yAngle - e, 0));
            }
          let i = 0;
          const r = Math.abs(a.xAngle),
            c = Math.abs(s),
            d = Math.max(r, c);
          if (d >= Math.PI) {
            const e = d / Math.PI,
              t = Math.floor(e),
              n = r / e,
              a = c / e,
              o = r - n * t,
              s = c - a * t;
            i = Math.acos(Math.cos(n) * Math.cos(a)) * t + Math.acos(Math.cos(o) * Math.cos(s));
          } else i = Math.acos(Math.cos(Math.abs(a.xAngle)) * Math.cos(Math.abs(s)));
          if (i) {
            const n = new e.Vector2(-a.xAngle, s);
            return n.multiplyScalar(o / i), t.startRotateTransition(i / o, n, !1);
          }
        };
      })(I),
      Ke = new pi(a.SweepAlignmentType, a.SweepPlacementType),
      Ye = Object.assign(Object.assign({}, i), {
        conversionUtils: new O(I),
        directionConverter: new A(a.Vectors),
        getPose: ha(I, $e),
        rotateCamera: qe,
        orientCamera: Jn(I, a.Viewmode, qe),
        appPhaseConverter: new Y(a.AppPhase),
        applicationConverter: new X(a.Application),
        mediaConverter: new Fa(a.MattertagMediaType, a.TagDescriptionChunkType),
        chunkTypeConverter: new Ga(a.TagDescriptionChunkType),
        linkTypeConverter: new Ha(a.TagLinkType),
        sweepPlacementConverter: Ke,
        viewmodeConverter: $e,
        commandModeConverter: new b(a.CommandViewmode),
        cameraTransitionConverter: new D(a.CameraTransitionType),
        makeLabelData: Ca(I, i.worldToScreenPosition),
        makeModelData: Bo(je, Ke),
        sweepUtils: new N(a.SweepAlignmentType),
        tourStateConverter: new tc(a.TourState),
      }),
      Xe = (async function (e) {
        const t = await e;
        return new M(t);
      })(we),
      Ze = (async function (e) {
        const t = await e;
        return new R(t);
      })(B),
      Qe = (async function (e) {
        const t = await e;
        return new P(t);
      })(pe),
      Je = (async function (e, t, n, a) {
        const [o, s, i] = await Promise.all([e, t, a]);
        return new eo(o, s, n, i);
      })(Q, Ee, n.oEmbed, void 0),
      et = new Map();
    !(function (e, t) {
      const n = G.create(new x(), new _(K, t));
      e.addAsyncCommandToInterface(
        {
          namespace: 'API',
          name: 'getViews',
          args: ['spaceSid'],
          varArg: !1,
          origins: q,
          options: { replay: !1 },
        },
        n,
      );
    })(We, Ye.getModelViewsQuery),
      (function (t) {
        t.addEnumToInterface({ namespace: 'App', name: 'Phase', values: e.Phase }),
          t.addEnumToInterface({ namespace: 'App', name: 'Event', values: e.Event }),
          t.addEnumToInterface({ namespace: 'App', name: 'Feature', values: e.Feature }),
          t.addEnumToInterface({ namespace: 'App', name: 'Application', values: e.Application });
      })(We),
      (function (t, n, a) {
        const o = [void 0],
          s = (e) => ((o[0] = a.appPhaseConverter.toSdkAppPhase(e.phase)), o);
        a.subscribe(n.AppPhaseChangeMessage, (n) => {
          t.broadcast(e.Event.PHASE_CHANGE, s, n);
        });
      })(We, a, Ye),
      (function (e, t, n) {
        n.getDependencies().then(([e]) => {
          t.addBinding(oe, async () => {
            try {
              const n = e.getData();
              return {
                phase: t.appPhaseConverter.toSdkAppPhase(n.phase),
                application: t.applicationConverter.toSdkApplication(n.application),
              };
            } catch (e) {
              throw Error("Error: Can't get application data at this time");
            }
          });
        }),
          e.addCommandCreator({ namespace: 'App', name: 'getState', args: [] }, () => new oe());
      })(We, Ye, new x(E)),
      (function (t, n, a) {
        n.addBinding(se, async () => {
          const t = {
              [e.Phase.WAITING]: null,
              [e.Phase.LOADING]: null,
              [e.Phase.STARTING]: null,
              [e.Phase.PLAYING]: null,
              [e.Phase.ERROR]: null,
            },
            [o] = await a.getDependencies();
          for (const e in o.phaseTimes) {
            const a = Number(e);
            t[n.appPhaseConverter.toSdkAppPhase(a)] = o.phaseTimes[a];
          }
          return t;
        }),
          t.addCommandCreator({ namespace: 'App', name: 'getLoadTimes', args: [] }, () => new se());
      })(We, Ye, new x(L)),
      (function (e, t, n, a) {
        const o = Z.create(a, new te(), new _(ne, t, n));
        e.addObservableToInterface({ namespace: 'App', name: 'state' }, o);
      })(We, a, Ye, new x(L)),
      (function (e, t) {
        const n = Z.create(t, new de(), new _(le));
        e.addObservableToInterface({ namespace: 'App', name: 'features' }, n);
      })(We, new x(fe, me)),
      (function (e, t) {
        const n = G.create(t, new _(he));
        e.addCommandToInterface({ namespace: 'App.Locale', name: 'getLanguageCode', args: [] }, n);
      })(We, new x(v)),
      (function (e, t) {
        const n = G.create(t, new _(ge));
        e.addCommandToInterface(
          { namespace: 'App.Locale', name: 'getT', args: [], sdkTypes: [ue.DIRECT] },
          n,
        );
      })(We, new x(v));
    const tt = Dn(We, I, Ye, et, d, Je);
    !(function (e, t, n) {
      n.getDependencies().then(([e, n, a, o]) => {
        const s = {
          position: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0 },
          projection: new Float32Array(16),
          sweep: '',
          mode: l.Mode.TRANSITIONING,
        };
        t.addBinding(On, async () => t.getPose(s, e, n, a, o));
      }),
        e.addCommandCreator({ namespace: 'Camera', name: 'getPose', args: [] }, () => new On());
    })(We, Ye, new x(k, we, Te, Xe)),
      (function (e, t, n, a) {
        a.getDependencies().then(([e, a, o]) => {
          n.addBinding(Mn, async function (s = {}) {
            if (!o.isInside())
              throw Error('Camera.lookAtScreenCoords must be called from Inside mode');
            const i = n.screenPositionToNDC(s.x, s.y, a.width, a.height),
              r = new t.Vector3(0, 0, -1).applyQuaternion(a.pose.rotation),
              c = n.ndcToWorldPosition(a, new t.Vector2(i.x, i.y), 1).normalize(),
              d = r.clone().setY(0).angleTo(c.clone().setY(0)),
              l = Math.asin(c.y - r.y),
              h = d * Math.sign(i.x),
              u = l;
            return n.rotateCamera(e, a, {
              xAngle: h,
              yAngle: u,
              zAngle: 0,
              rotationSpeed: Nn,
              clampYRotation: !1,
            });
          });
        }),
          e.addCommandCreator(
            { namespace: 'Camera', name: 'lookAtScreenCoords', args: ['x', 'y'] },
            function (e = {}) {
              if (((e.x = e.x || 0), (e.y = e.y || 0), isNaN(e.x) || isNaN(e.y)))
                throw new Error(`${JSON.stringify(e)} does not contain valid screen coordinates`);
              return new Mn({ x: e.x, y: e.y });
            },
          );
      })(We, I, Ye, new x(ve, k, Te)),
      (function (e, t, n) {
        n.getDependencies().then(([n, a, s, i]) => {
          const r = [
              {
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0 },
                projection: new Float32Array(16),
                sweep: '',
                mode: l.Mode.TRANSITIONING,
              },
            ],
            c = (() => {
              let d = 0,
                l = !1;
              const h = () => (t.getPose(r[0], n, a, s, i), r);
              return () => {
                const t = Date.now(),
                  n = d + 100;
                if (t > n) {
                  (l = !1), (d = t);
                  try {
                    e.broadcast(o.Event.MOVE, h);
                  } catch (e) {
                    Rn.debug(
                      'failed to broadcast pose, one of the module dependencies are probably not loaded yet',
                    );
                  }
                } else l || (setTimeout(() => c(), n - t), (l = !0));
              };
            })();
          n.onChanged(c), s.onChanged(c);
        }),
          e.addEnumToInterface({ namespace: 'Camera', name: 'Event', values: o.Event });
      })(We, Ye, new x(k, we, Te, Xe)),
      (function (e, t, n) {
        n.getDependencies().then(([e]) =>
          t.addBinding(Ln, async (n) => {
            const a = n.direction;
            if (!Pn(o.Direction, n.direction))
              throw new Error(`${n.direction} is not a valid direction`);
            await e.navigateInLocalDirection(t.directionConverter.toVector(a));
          }),
        ),
          e.addEnumToInterface({ namespace: 'Camera', name: 'Direction', values: o.Direction }),
          e.addCommandCreator(
            { namespace: 'Camera', name: 'moveInDirection', args: ['direction'] },
            (e) => new Ln(e || {}),
          );
      })(We, Ye, new x(be)),
      (function (e, t, n, a) {
        a.getDependencies().then(([e, a]) => {
          n.addBinding(xn, async (n) => {
            const o = a.pose.position,
              s = n.x - o.x,
              i = n.z - o.z,
              r = new t.Vector2(s, i),
              c = r.length();
            r.setLength(0.005), await e.startTranslateTransition(c / 0.005, r, !1);
          });
        }),
          e.addCommandCreator({ namespace: 'Camera', name: 'pan', args: ['position'] }, (e) => {
            if (
              (((e = e || {}).position = e.position || {}),
              (e.position.x = e.position.x - 0),
              (e.position.z = e.position.z - 0),
              isNaN(e.position.x) || isNaN(e.position.z))
            )
              throw new Error(`${JSON.stringify(e)} does not contain a valid position to pan`);
            return new xn({ x: e.position.x, z: e.position.z });
          });
      })(We, I, Ye, new x(ve, k)),
      (function (e, t, n, a) {
        const o = Z.create(a, new zn(), new _(Wn, t, n.viewmodeConverter));
        e.addObservableToInterface({ namespace: 'Camera', name: 'pose' }, o);
      })(We, I, Ye, new x(k, we, Te, Xe)),
      (function (e, t, n, a) {
        const o = t.MathUtils.degToRad(80) / 1e3;
        a.getDependencies().then(([e, t, a]) => {
          n.addBinding(Qn, async (a) => await n.rotateCamera(e, t, a)),
            n.addBinding(ea, async (o) => await n.orientCamera(t, e, a, o));
        });
        const s = (e) => {
          const n = (e = e || {}).options || {},
            a = t.MathUtils.degToRad(e.xAngle || 0),
            s = t.MathUtils.degToRad(e.yAngle || 0),
            i = t.MathUtils.degToRad(e.zAngle || 0),
            r = !!e.clampYRotation;
          let c = o;
          if (n.speed) {
            if (isNaN(n.speed) || n.speed <= 0)
              throw new Error(`${JSON.stringify(n)} does not contain valid rotation speed`);
            c = t.MathUtils.degToRad(n.speed) / 1e3;
          }
          if (isNaN(a) || isNaN(s) || isNaN(i))
            throw new Error(`${JSON.stringify(e)} does not contain valid rotation angles`);
          return { xAngle: a, yAngle: s, zAngle: i, rotationSpeed: c, clampYRotation: r };
        };
        e.addCommandCreator(
          { namespace: 'Camera', name: 'rotate', args: ['xAngle', 'yAngle', 'options'] },
          (e) =>
            new Qn(
              s({
                xAngle: e.xAngle,
                yAngle: e.yAngle,
                zAngle: e.zAngle,
                options: e.options,
                clampYRotation: !0,
              }),
            ),
        ),
          e.addCommandCreator(
            { namespace: 'Camera', name: 'setRotation', args: ['rotation', 'options'] },
            (e) => {
              const t = (e = e || {}).rotation || {};
              return new ea(
                s({
                  xAngle: t.x,
                  yAngle: t.y,
                  zAngle: t.z,
                  options: e.options,
                  clampYRotation: !1,
                }),
              );
            },
          );
      })(We, I, Ye, new x(ve, k, Te)),
      (function (e, t, n, a) {
        const o = a,
          s = G.create(o, new _(sa, t, n)),
          i = G.create(o, new _(ia, t, n)),
          r = G.create(o, new _(ra, t, n));
        e.addCommandToInterface({ namespace: 'Camera', name: 'zoomTo', args: ['zoomPct'] }, s),
          e.addCommandToInterface({ namespace: 'Camera', name: 'zoomBy', args: ['zoomDelta'] }, i),
          e.addCommandToInterface({ namespace: 'Camera', name: 'zoomReset', args: [] }, r);
      })(We, a, Ye, new x(k, Te, _e)),
      (function (e, t, n) {
        const a = Z.create(n, new da(), new _(la, t));
        e.addObservableToInterface({ namespace: 'Camera', name: 'zoom' }, a);
      })(We, a, new x(k, Te)),
      (function (e, t, n) {
        const a = Z.create(n, new ua(), new _(pa, t));
        e.addObservableToInterface({ namespace: 'Floor', name: 'current' }, a);
      })(We, a, new x(z, we, k, Ie, Ze)),
      (function (e, t, n, a) {
        e.addEnumToInterface({ namespace: 'Floor', name: 'Event', values: s.Event }),
          a.getDependencies().then(([a]) => {
            const o = [-1, -1];
            function i(e) {
              if (a) {
                const t = e.to ? a.getFloor(e.to) : null,
                  n = e.from ? a.getFloor(e.from) : null;
                t && (o[0] = t.index), n && (o[1] = n.index);
              }
              return o;
            }
            const r = [-1, ''];
            function c(e) {
              if (a) {
                const t = e.floorId ? a.getFloor(e.floorId) : null;
                t && (r[0] = t.index);
              }
              return (r[1] = e.floorName), r;
            }
            n.subscribe(t.StartMoveToFloorMessage, (t) => e.broadcast(s.Event.CHANGE_START, i, t)),
              n.subscribe(t.EndMoveToFloorMessage, (t) => e.broadcast(s.Event.CHANGE_END, c, t));
          });
      })(We, a, Ye, new x(B)),
      (function (e, t) {
        const n = ma.create(t, new ga(), new _(fa));
        e.addCollectionToInterface({ namespace: 'Floor', name: 'data' }, n);
      })(We, new x(B, Ze)),
      (function (e, t, n) {
        t.addBinding(wa, async () => {
          const [e] = await n.getDependencies();
          return ya(e);
        }),
          e.addCommandCreator({ namespace: 'Floor', name: 'getData', args: [] }, () => new wa());
      })(We, Ye, new x(z)),
      (function (e, t, n, a) {
        a.getDependencies().then(([e]) =>
          n.addBinding(Ia, async (a) => {
            if ('number' != typeof a.floorIndex || a.floorIndex < 0)
              throw Error('floor index must be a non-negative number');
            try {
              const o = 'boolean' == typeof a.moveCamera && !a.moveCamera,
                s = o ? 250 : void 0;
              await n.issueCommand(new t.MoveToFloorIndexCommand(a.floorIndex, o, s));
              const i = e.currentFloor;
              return i ? i.index : -1;
            } catch (e) {
              throw Error(`Could not move to floor at index ${a.floorIndex}`);
            }
          }),
        ),
          e.addCommandCreator(
            { namespace: 'Floor', name: 'moveTo', args: ['floorIndex', 'moveCamera'] },
            (e) => new Ia(e),
          );
      })(We, a, Ye, new x(z)),
      (function (e, t, n, a) {
        const o = G.create(a, new _(Ta, t, n));
        e.addCommandToInterface({ namespace: 'Floor', name: 'showAll', args: ['moveCamera'] }, o);
      })(We, a, Ye, new x(z)),
      (function (e, t) {
        const n = G.create(t, new _(Ea));
        e.addCommandToInterface(
          { namespace: 'Floor.Conversion', name: 'createIdMap', args: ['invert'] },
          n,
        );
      })(We, new x(B)),
      (function (e, t, n) {
        t.addBinding(va, async () => t.makeLabelData(...(await n.getDependencies()))),
          e.addCommandCreator({ namespace: 'Label', name: 'getData', args: [] }, () => new va());
      })(We, Ye, new x(k, B, j, Ze)),
      (function (e, t, n, a) {
        e.addEnumToInterface({ namespace: 'Label', name: 'Event', values: r.Event }),
          a.getDependencies().then(([t, a, o, s, i]) => {
            const c = () => [n.makeLabelData(t, o, a, i)];
            t.onChanged((n) => {
              t.pose.isPitchFactorOrtho.value && e.broadcast(r.Event.POSITION_UPDATED, c, n);
            });
          });
      })(We, 0, Ye, new x(k, j, B, Te, Ze)),
      (function (e, t) {
        const n = ma.create(t, new Aa(), new _(Sa));
        e.addCollectionToInterface({ namespace: 'Label', name: 'data' }, n);
      })(We, new x(j, B, Ze)),
      (function (e, t) {
        const n = G.create(t, new _(ba));
        e.addAsyncCommandToInterface({ namespace: 'Link', name: 'createLink', args: [] }, n);
      })(We, new x(H)),
      (function (e, t) {
        const n = G.create(t, new _(Da));
        e.addAsyncCommandToInterface({ namespace: 'Link', name: 'createDeepLink', args: [] }, n);
      })(We, new x(H)),
      (function (e, t) {
        const n = G.create(t, new _(Ra, e)),
          a = G.create(t, new _(La, e)),
          o = G.create(t, new _(xa, e)),
          s = G.create(t, new _(_a, e));
        e.addEnumToInterface({ namespace: 'Link', name: 'OpenPolicy', values: c.OpenPolicy }),
          e.addEnumToInterface({
            namespace: 'Link',
            name: 'DestinationPolicy',
            values: c.DestinationPolicy,
          }),
          e.addAsyncCommandToInterface(
            {
              namespace: 'Link',
              name: 'setModelLinkPolicy',
              args: ['policy', 'baseHref'],
              subRoutine: 'link.setopenpolicy',
            },
            n,
          ),
          e.addAsyncCommandToInterface(
            {
              namespace: 'Link',
              name: 'setNavigationLinkPolicy',
              args: ['policy', 'baseHref'],
              subRoutine: 'link.setopenpolicy',
            },
            a,
          ),
          e.addAsyncCommandToInterface(
            { namespace: 'Link', name: 'setSameOriginLinkPolicy', args: ['policy'] },
            o,
          ),
          e.addAsyncCommandToInterface(
            { namespace: 'Link', name: 'setExternalLinkPolicy', args: ['openInNewWindow'] },
            s,
          );
      })(We, new x(H, p)),
      (function (e, t) {
        const n = G.create(t, new _(Ua));
        e.addEnumToInterface({
          namespace: 'Link',
          name: 'CreationPolicy',
          values: c.CreationPolicy,
        }),
          e.addAsyncCommandToInterface(
            {
              namespace: 'Link',
              name: 'setShareLinkPolicy',
              args: ['policy', 'baseHref', 'options'],
              subRoutine: 'link.setsharepolicy',
            },
            n,
          );
      })(We, new x(H));
    const nt = (async function () {
        const e = m.sandboxPath;
        return (await fetch(e)).text();
      })(),
      at = xr(
        We,
        I,
        a,
        Ye,
        et,
        Je,
        nt,
        Ye.getTagsQuery,
        ze,
        Ye.isMpFontId,
        Object.assign(Object.assign({}, d), { roomIdMap: Qe }),
      ),
      ot = wo(We, a, Object.assign(Object.assign({}, Ye), { getIframeSrcDoc: nt }), tt, at, [
        Q,
        J,
        re,
        B,
        Ze,
        Je,
      ]);
    !(function (e, t, n) {
      t.addBinding(Io, async () => {
        const [e, t] = await n.getDependencies();
        return To(e, t);
      }),
        e.addCommandCreator(
          { namespace: 'Measurements', name: 'getData', args: [] },
          () => new Io(),
        );
    })(We, Ye, new x(ee, B)),
      (function (e, t, n) {
        const a = ma.create(n, new Eo(t.MeasuringPhase), new _(vo));
        e.addCollectionToInterface({ namespace: 'Measurements', name: 'data' }, a);
      })(We, a, new x(ee)),
      (function (e, t) {
        const n = Z.create(t, new Co(), new _(Ao));
        e.addObservableToInterface({ namespace: 'Measurements', name: 'mode' }, n);
      })(We, new x(ee)),
      (function (e, t, n) {
        n.addBinding(So, async (e) =>
          n.issueCommand(new t.ToggleToolCommand(t.Tools.MEASUREMENTS, e.active)),
        ),
          e.addCommandCreator(
            { namespace: 'Measurements', name: 'toggleMode', args: ['active'] },
            (e) => new So(e.active),
          );
      })(We, a, Ye),
      (function (e, t, n, a) {
        e.addEnumToInterface({ namespace: 'Mode', name: 'Event', values: l.Event }),
          a.getDependencies().then(([a, o, s]) => {
            const i = [void 0, void 0],
              r = (e) => {
                const t = o.currentMode,
                  s = n.sweepUtils.isSweepAligned(a, e.fromSweep),
                  r = n.sweepUtils.isSweepAligned(a, e.toSweep);
                return (
                  (i[0] = n.viewmodeConverter.toSdk(t, s)),
                  (i[1] = n.viewmodeConverter.toSdk(t, r)),
                  i
                );
              };
            n.subscribe(t.EndMoveToSweepMessage, (t) => {
              n.sweepUtils.isSweepAligned(a, t.fromSweep) !==
                n.sweepUtils.isSweepAligned(a, t.toSweep) && e.broadcast(l.Event.CHANGE_END, r, t);
            });
            const c = [void 0, void 0],
              d = (e) => {
                const t = n.sweepUtils.isCurrentSweepAligned(a);
                return (
                  (c[0] = n.viewmodeConverter.toSdk(
                    e.fromMode,
                    t,
                    s.pose.isPitchFactorOrtho.value,
                  )),
                  (c[1] = n.viewmodeConverter.toSdk(e.toMode, t, s.pose.isPitchFactorOrtho.value)),
                  c
                );
              };
            n.subscribe(t.BeginSwitchViewmodeMessage, (t) =>
              e.broadcast(l.Event.CHANGE_START, d, t),
            );
            const h = [void 0, void 0],
              u = (e) => {
                const t = n.sweepUtils.isCurrentSweepAligned(a);
                return (
                  (h[0] = n.viewmodeConverter.toSdk(
                    e.fromMode,
                    t,
                    s.pose.isPitchFactorOrtho.value,
                  )),
                  (h[1] = n.viewmodeConverter.toSdk(e.toMode, t, s.pose.isPitchFactorOrtho.value)),
                  h
                );
              };
            n.subscribe(t.EndSwitchViewmodeMessage, (t) => e.broadcast(l.Event.CHANGE_END, u, t));
          });
      })(We, a, Ye, new x(we, Te, k)),
      (function (e, t, n, a, o) {
        a.addBinding(xo, async (e) => {
          try {
            e.options = e.options || {};
            let t = n.CameraTransitionType.Interpolate;
            const o = e.options.transition;
            return (
              void 0 === o || isNaN(o) || (t = o),
              await a.issueCommand(
                new n.ChangeViewmodeCommand(e.mode, t, {
                  position: e.options.position,
                  rotation: e.options.rotation,
                  zoom: e.options.zoom,
                }),
              ),
              e.mode
            );
          } catch (t) {
            const n =
              t instanceof Oo
                ? `Mode.moveTo -> Cannot move to ${e.mode} during a mode transition`
                : `Mode.moveTo -> Could not move to ${e.mode}`;
            if ((Lo.info(t, n), t instanceof Oo))
              throw Error(`Mode.moveTo -> Cannot move to ${e.mode} during a mode transition`);
            throw Error(`Mode.moveTo -> Could not move to ${e.mode}`);
          }
        });
        const s = new _o(t, a.commandModeConverter, a.conversionUtils, a.cameraTransitionConverter);
        e.addCommandCreator(
          { namespace: 'Mode', name: 'moveTo', args: ['mode', 'options'] },
          (e) => new xo(s.validateMoveToModeInput(e)),
        ),
          e.addEnumToInterface({ namespace: 'Mode', name: 'Mode', values: l.Mode }),
          e.addEnumToInterface({ namespace: 'Mode', name: 'TransitionType', values: C });
      })(We, I, a, Ye, new x()),
      (function (e, t, n, a) {
        const o = Z.create(a, new ko(), new _(Vo, t, n));
        e.addObservableToInterface({ namespace: 'Mode', name: 'current' }, o);
      })(We, a, Ye, new x(Te, we, k)),
      (function (e, t, n) {
        const a = Z.create(n, new Nc(), new _(Mc, t));
        e.addObservableToInterface({ namespace: 'Mode', name: 'transition' }, a);
      })(We, Ye, new x(Te, we)),
      Fo(We, Ye, new x(ie, we, B, Xe)),
      Ho(We, a, Ye, new x(ie, fe)),
      (function (e, t, n, a) {
        e.addEnumToInterface({ namespace: 'Model', name: 'Event', values: h.Event });
        const o = { sid: '', sweeps: [], modelSupportsVr: !1 },
          s = [o];
        a.getDependencies().then((a) => {
          n.subscribe(t.ModelDataLoadedMessage, async (t) => {
            const [i, r, c] = a;
            await n.makeModelData(t.sid, t.vrSupported, i.getSweepList(), r, c, o),
              e.broadcast(h.Event.MODEL_LOADED, () => s);
          });
        });
      })(We, a, Ye, new x(we, B, Xe)),
      (function (e, t) {
        const n = G.create(t, new _(zo));
        e.addCommand('OAuth.updateToken', n);
      })(We, new x(a.MpSdkAuthentication)),
      (function (e, t) {
        const n = ma.create(t, new Rc(), new _(Pc));
        e.addCollectionToInterface(
          { namespace: 'Plugin', name: 'data', sdkTypes: [ue.POSTMESSAGE], origins: q },
          n,
        );
      })(We, new x(Ue)),
      (function (e, t) {
        const n = G.create(t, new _($o));
        e.addAsyncCommandToInterface(
          {
            namespace: 'Plugin',
            name: 'load',
            args: ['key', 'path', 'config', 'metadata'],
            varArg: !1,
            sdkTypes: [ue.POSTMESSAGE],
            origins: q,
          },
          n,
        );
      })(We, new x(De)),
      (function (e, t) {
        const n = G.create(t, new _(qo));
        e.addAsyncCommandToInterface(
          {
            namespace: 'Plugin',
            name: 'unload',
            args: ['key'],
            varArg: !1,
            sdkTypes: [ue.POSTMESSAGE],
            origins: q,
          },
          n,
        );
      })(We, new x(De)),
      (function (e, t, n, a) {
        const o = Z.create(a, new Ko(), new _(Yo, t, n));
        e.addEnumToInterface({ namespace: 'Pointer', name: 'Colliders', values: u.Colliders }),
          e.addObservableToInterface({ namespace: 'Pointer', name: 'intersection' }, o);
      })(We, I, a, new x(ce, B, pe, ae, Ae)),
      (function (e, t, n) {
        const a = G.create(n, new _(Xo)),
          o = G.create(n, new _(Zo));
        e.addCommandToInterface(
          {
            namespace: 'Pointer',
            name: 'registerTexture',
            args: ['textureId', 'textureSrc'],
            varArg: !1,
          },
          t,
        ),
          e.addCommandToInterface(
            { namespace: 'Pointer', name: 'editTexture', args: ['textureId'], varArg: !1 },
            a,
          ),
          e.addCommandToInterface(
            { namespace: 'Pointer', name: 'resetTexture', args: [], varArg: !1 },
            o,
          );
      })(We, tt.registerTexture, new x(Ve, et)),
      (function (e, t) {
        const n = G.create(t, new _(Qo));
        e.addCommandToInterface(
          { namespace: 'Pointer', name: 'setFadeProps', args: ['props'], varArg: !1 },
          n,
        );
      })(We, new x(Ve)),
      (function (e, t) {
        const n = G.create(t, new _(Jo));
        e.addCommandToInterface(
          { namespace: 'Pointer', name: 'setVisible', args: ['visible'], varArg: !1 },
          n,
        );
      })(We, new x(Ve)),
      (function (e, t, n, a, o) {
        const s = new rs(new t.PerspectiveCamera(), a.encodeRenderTarget),
          i = new _(us, s, n, a),
          r = G.create(o, i),
          c = G.create(o, i);
        e.addCommandToInterface(
          {
            namespace: 'Renderer',
            name: 'takeScreenShot',
            args: ['resolution', 'visibleObjects', 'returnType'],
          },
          r,
        ),
          e.addCommandToInterface(
            {
              namespace: 'Camera',
              name: 'takeScreenShot',
              args: ['resolution', 'visibleObjects', 'returnType'],
            },
            W(c, '`Camera.takeScreenshot` is deprecated; use `Renderer.takeScreenshot` instead'),
          );
      })(We, I, a, Ye, new x(F, xe, Ne)),
      (function (e, t, n, a, o) {
        const s = G.create(o, new _(ps, t, n, a));
        e.addCommandToInterface(
          { namespace: 'Renderer', name: 'takeEquirectangular', args: [] },
          s,
        );
      })(We, I, a, Ye, new x(xe, Ne, Te, we, ke)),
      (function (e, t, n, a) {
        const o = G.create(a, new _(ms, t, n));
        e.addCommandToInterface(
          { namespace: 'Renderer', name: 'getScreenPosition', args: ['worldPosition'] },
          o,
        );
      })(We, a, Ye, new x(xe)),
      (function (e, t, n, a) {
        const o = G.create(a, new _(gs, t, n));
        e.addCommandToInterface(
          {
            namespace: 'Renderer',
            name: 'getWorldPositionData',
            args: ['screenPosition', 'height', 'includeHiddenFloors'],
          },
          o,
        );
      })(We, a, Ye, new x(B, Ce)),
      (function (e, t) {
        const n = G.create(t, new _(es));
        e.addAsyncCommandToInterface(
          { namespace: 'R3F', name: 'registerR3F', args: ['callbacks'], sdkTypes: [ue.DIRECT] },
          n,
        );
      })(We, new x(Fe)),
      (function (e, t, n, a, o) {
        e.addAsyncCommandToInterface(
          { namespace: 'R3F', name: 'focus', args: ['target', 'options'], sdkTypes: [ue.DIRECT] },
          G.create(o, new _(as, t, n, a)),
        );
      })(We, I, a, Ye, new x(be, Te)),
      (function (e, t) {
        const n = G.create(t, new _(ss));
        e.addAsyncCommandToInterface(
          { namespace: 'R3F', name: 'controlsToggle', args: ['enabled'], sdkTypes: [ue.DIRECT] },
          n,
        );
      })(We, new x(ve)),
      (function (e, t) {
        const n = G.create(t, new _(ns));
        e.addAsyncCommandToInterface(
          { namespace: 'R3F', name: 'navigationToggle', args: ['enabled'], sdkTypes: [ue.DIRECT] },
          n,
        );
      })(We, new x(be)),
      (function () {
        const e = x
          .getBuilder()
          .addDependencies(pe, B, k, we, Te, ae, Qe, Ze)
          .addOptionals(me)
          .build();
        !(function (e, t) {
          const n = Z.create(t, new ws(), new _(ys));
          e.addObservableToInterface(
            { namespace: 'Room', name: 'current', objectFactory: 'current.room' },
            n,
          );
        })(We, e);
        const t = x.getBuilder().addDependencies(pe, B, Qe, Ze, ae).addOptionals(me).build();
        !(function (e, t) {
          const n = ma.create(t, new Is(), new _(Ts));
          e.addCollectionToInterface(
            { namespace: 'Room', name: 'data', elementFactory: 'collection.room' },
            n,
          );
        })(We, t),
          (function (e, t) {
            const n = G.create(t, new _(Es));
            e.addCommandToInterface(
              { namespace: 'Room.Conversion', name: 'createIdMap', args: ['invert'] },
              n,
            );
          })(We, new x(pe, B));
      })(),
      (function (e, t, n, a, o, s, i) {
        (function (e) {
          e.addEnumToInterface({
            namespace: 'Scene',
            name: 'InteractionType',
            values: y.InteractionType,
            sdkTypes: [ue.DIRECT],
          }),
            e.addEnumToInterface({
              namespace: 'Scene',
              name: 'Component',
              values: y.Component,
              sdkTypes: [ue.DIRECT],
            }),
            e.addEnumToInterface({
              namespace: 'Scene',
              name: 'PathType',
              values: hs,
              sdkTypes: [ue.DIRECT],
            });
        })(e),
          (function (e, t) {
            const n = G.create(t, new _(vs));
            e.addAsyncCommandToInterface(
              {
                namespace: 'Scene',
                name: 'register',
                args: ['name', 'factory'],
                sdkTypes: [ue.DIRECT],
              },
              n,
            );
          })(e, new x(a)),
          (function (e, t) {
            const n = G.create(t, new _(Cs));
            e.addAsyncCommandToInterface(
              {
                namespace: 'Scene',
                name: 'createNode',
                args: [],
                varArg: !1,
                sdkTypes: [ue.DIRECT],
              },
              n,
            );
          })(e, new x(a)),
          (function (e, t, n) {
            t.addBinding(As, async (e) => {
              const [t] = await n.getDependencies();
              return t.sceneTags().getObjects(e.tags);
            }),
              e.addCommandCreator(
                { namespace: 'Scene', name: 'query', args: ['tags'], sdkTypes: [ue.DIRECT] },
                (e) => new As(e),
              );
          })(e, t, new x(a, o)),
          (function (e, t, n, a) {
            a.getDependencies().then(([e]) => {
              n.addBinding(Ss, async (n) => {
                n.callback(e.threeRenderer, t, e.getScene().effectComposer);
              });
            }),
              e.addCommandCreator(
                {
                  namespace: 'Scene',
                  name: 'configure',
                  args: ['callback'],
                  sdkTypes: [ue.DIRECT],
                },
                (e) => new Ss(e),
              );
          })(e, n, t, new x(s)),
          (function (e, t, n) {
            n.getDependencies().then(([e]) => {
              t.addBinding(bs, async (t) => e.getImageBitmap(t.path, t.width, t.height, t.options));
            }),
              e.addCommandCreator(
                {
                  namespace: 'Scene',
                  name: 'getImage',
                  args: ['path', 'width', 'height', 'options'],
                  sdkTypes: [ue.DIRECT],
                },
                (e) => new bs(e),
              );
          })(e, t, new x(i)),
          (function (e, t) {
            const n = G.create(t, new _(Ds));
            e.addAsyncCommandToInterface(
              {
                namespace: 'Scene',
                name: 'deserialize',
                args: ['text'],
                varArg: !1,
                sdkTypes: [ue.DIRECT],
              },
              n,
            );
          })(e, new x(a)),
          (function (e, t) {
            const n = G.create(t, new _(Ns));
            e.addCommandToInterface(
              {
                namespace: 'Scene',
                name: 'serialize',
                args: ['objects'],
                varArg: !1,
                sdkTypes: [ue.DIRECT],
              },
              n,
            );
          })(e, new x(a)),
          (function (e, t) {
            const n = G.create(t, new _(Ms));
            e.addAsyncCommandToInterface(
              {
                namespace: 'Scene',
                name: 'createNodes',
                args: ['count', 'userContext'],
                varArg: !1,
                sdkTypes: [ue.DIRECT],
              },
              n,
            );
          })(e, new x(a)),
          (function (e, t) {
            const n = G.create(t, new _(Rs));
            e.addAsyncCommandToInterface(
              {
                namespace: 'Scene',
                name: 'registerComponents',
                args: ['components'],
                sdkTypes: [ue.DIRECT],
              },
              n,
            );
          })(e, new x(a)),
          (function (e, t) {
            const n = G.create(t, new _(Ps));
            e.addAsyncCommandToInterface(
              {
                namespace: 'Scene',
                name: 'createObjects',
                args: ['count'],
                varArg: !1,
                sdkTypes: [ue.DIRECT],
              },
              n,
            );
          })(e, new x(a)),
          (function (e, t, n) {
            const a = G.create(n, new _(Ls));
            e.addCommandToInterface(
              {
                namespace: 'Scene',
                name: 'unregisterComponents',
                args: ['components'],
                varArg: !1,
                sdkTypes: [ue.DIRECT],
              },
              a,
            );
          })(e, 0, new x(a));
      })(We, Ye, I, Me, Se, xe, T),
      si(I, a.SourceType, a.sensorVolumes)(We, new x(Re)),
      (function (e, t, n, a) {
        n.addBinding(t.SettingGetCommand, async (e) => {
          const [t] = await a.getDependencies();
          return t.tryGetProperty(e.key, t.settingsData.getOverrideParam(e.key, void 0));
        }),
          e.addCommandCreator(
            { namespace: 'Settings', name: 'get', args: ['key'] },
            (e) => new t.SettingGetCommand(e.key),
          );
      })(We, a, Ye, new x(Pe)),
      (function (e, t, n, a) {
        n.addBinding(t.SettingUpdateCommand, async (e) => {
          if (!e.key || 'string' != typeof e.key) throw Error('Settings: invalid key');
          const [t] = await a.getDependencies();
          return t.updateSetting(e.key, e.value), t.tryGetProperty(e.key, void 0);
        }),
          e.addCommandCreator(
            { namespace: 'Settings', name: 'update', args: ['key', 'value'] },
            (e) => new t.SettingUpdateCommand(e.key, e.value),
          );
      })(We, a, Ye, new x(Pe)),
      (function (e, t, n) {
        n.getDependencies().then(([n]) => {
          new ri(t.waitForUpdate, n).calcAndBroadcast(e);
        }),
          e.addEnumToInterface({ namespace: 'Stat', name: 'Event', values: ii });
      })(We, Ye, new x(fe)),
      (function (e, t) {
        const n = G.create(t, new _(di));
        e.addAsyncCommandToInterface(
          { namespace: 'XStorage', name: 'setItem', args: ['key', 'data'], origins: q },
          n,
        );
      })(We, new x(ie)),
      (function (e, t) {
        const n = G.create(t, new _(li));
        e.addAsyncCommandToInterface(
          { namespace: 'XStorage', name: 'getItem', args: ['key'], origins: q },
          n,
        );
      })(We, new x(ie)),
      (function (e, t) {
        const n = G.create(t, new _(hi));
        e.addAsyncCommandToInterface(
          { namespace: 'XStorage', name: 'getAllItems', args: ['modelId'], origins: q },
          n,
        );
      })(We, new x(ie)),
      (function (e, t) {
        const n = G.create(t, new _(ui));
        e.addAsyncCommandToInterface(
          { namespace: 'XStorage', name: 'removeItem', args: ['key'], origins: q },
          n,
        );
      })(We, new x(ie)),
      (function (e) {
        e.addEnumToInterface({ namespace: 'Sweep', name: 'Transition', values: C }),
          e.addEnumToInterface({ namespace: 'Sweep', name: 'Alignment', values: g.Alignment }),
          e.addEnumToInterface({ namespace: 'Sweep', name: 'Placement', values: g.Placement });
      })(We),
      (function (e, t, n, a) {
        const o = Z.create(a, new gi(), new _(fi, t, n));
        e.addObservableToInterface({ namespace: 'Sweep', name: 'current' }, o);
      })(We, a, Ye, new x(we, Te, B, Xe, Ze)),
      (function (e, t, n, a) {
        e.addEnumToInterface({ namespace: 'Sweep', name: 'Event', values: g.Event });
        const o = ['', ''],
          s = () => o;
        n.subscribe(t.BeginMoveToSweepMessage, async (t) => {
          const n = await a;
          t.fromSweep &&
            t.fromSweep !== t.toSweep &&
            ((o[0] = t.fromSweep ? n.getIdFromCwfId(t.fromSweep) : t.fromSweep),
            (o[1] = n.getIdFromCwfId(t.toSweep)),
            e.broadcast(g.Event.EXIT, s, t));
        }),
          n.subscribe(t.BeginSwitchViewmodeMessage, (n) => {
            n.fromMode === t.Viewmode.Panorama &&
              n.toMode !== t.Viewmode.Panorama &&
              ((o[0] = i[1]), (o[1] = void 0), e.broadcast(g.Event.EXIT, s));
          });
        const i = ['', ''],
          r = () => i;
        n.subscribe(t.EndMoveToSweepMessage, async (t) => {
          const n = await a;
          (i[0] = t.fromSweep ? n.getIdFromCwfId(t.fromSweep) : t.fromSweep),
            (i[1] = n.getIdFromCwfId(t.toSweep)),
            e.broadcast(g.Event.ENTER, r);
        });
      })(We, a, Ye, Xe),
      (function (e, t, n, a) {
        const o = G.create(a, new _(wi, t, n));
        e.addEnumToInterface({ namespace: 'Sweep', name: 'Transition', values: C }),
          e.addCommandToInterface(
            { namespace: 'Sweep', name: 'moveTo', args: ['sweep', 'options'] },
            o,
          );
      })(We, a, Ye, new x(we, Xe, be)),
      (function (e, t) {
        const n = G.create(t, new _(Ei));
        e.addCommandToInterface(
          { namespace: 'Sweep.Conversion', name: 'createIdMap', args: ['invert'] },
          n,
        );
        const a = G.create(t, new _(vi));
        e.addCommandToInterface(
          { namespace: 'Sweep.Conversion', name: 'getLabelFromId', args: ['id'] },
          a,
        );
      })(We, new x(we)),
      (function (e, t, n) {
        const a = ma.create(n, new yi(), new _(Ii, t.conversionUtils, t.sweepPlacementConverter));
        e.addCollectionToInterface({ namespace: 'Sweep', name: 'data' }, a);
      })(We, Ye, new x(we, B, Xe, Ze)),
      (function (e, t) {
        const n = G.create(t, new _(Ci)),
          a = G.create(t, new _(Ai));
        e.addCommandToInterface(
          { namespace: 'Sweep', name: 'enable', args: ['sweepIds'], varArg: !0 },
          n,
        ),
          e.addCommandToInterface(
            { namespace: 'Sweep', name: 'disable', args: ['sweepIds'], varArg: !0 },
            a,
          );
      })(We, new x(we, ye, Xe)),
      (function (e, t, n, a) {
        const o = G.create(a, new _(Di, t, n));
        e.addCommandToInterface(
          { namespace: 'Sweep', name: 'addNeighbors', args: ['sweepId', 'toAdd'] },
          o,
        );
        const s = G.create(a, new _(Oi, t, n));
        e.addCommandToInterface(
          { namespace: 'Sweep', name: 'removeNeighbors', args: ['sweepId', 'toRemove'] },
          s,
        );
      })(We, a, Ye, new x(we)),
      zr(We, d),
      (function (e) {
        e.addEnumToInterface({ namespace: 'Tour', name: 'PlayState', values: w.PlayState });
      })(We),
      (function (e, t, n) {
        e.addEnumToInterface({ namespace: 'Tour', name: 'Event', values: w.Event }),
          n.subscribe(t.TourStartedMessage, () => e.broadcast(w.Event.STARTED)),
          n.subscribe(t.TourStoppedMessage, () => e.broadcast(w.Event.STOPPED)),
          n.subscribe(t.TourEndedMessage, () => e.broadcast(w.Event.ENDED));
        const a = [-1],
          o = (e) => ((a[0] = e.index), a);
        n.subscribe(t.TourSteppedMessage, (t) => e.broadcast(w.Event.STEPPED, o, t));
      })(We, a, Ye),
      Yr(We, a, Ye, new x(Le, Ie)),
      (function (e, t) {
        const n = Z.create(t, new Zr(), new _(Qr));
        e.addObservableToInterface({ namespace: 'Tour', name: 'currentStep' }, n);
      })(We, new x(Ie)),
      (function (e, t, n) {
        const a = Z.create(n, new Jr(), new _(ec, t));
        e.addObservableToInterface({ namespace: 'Tour', name: 'state' }, a);
      })(We, Ye, new x(Ie)),
      (function (e, t) {
        const n = Z.create(t, new nc(), new _(ac));
        e.addObservableToInterface({ namespace: 'Tour', name: 'transition' }, n);
      })(We, new x(Ie)),
      Be &&
        ze &&
        (Sc(We, d, {
          issueCommand: Ye.issueCommand,
          SetActiveModelViewCommand: a.SetActiveModelViewCommand,
          AddInMemoryLayerCommand: a.AddInMemoryLayerCommand,
          ToggleLayerCommand: a.ToggleLayerCommand,
          SetMoveCameraOnViewChange: a.SetMoveCameraOnViewChange,
        }),
        Be &&
          We.interceptCommands(
            new bc(
              Ge,
              ze,
              () => Ge.getActiveLayer(),
              (e) => i.issueCommand(new a.SelectLayerCommand(e.id, !0)),
            ),
            at.add,
            ot.add,
          ));
  }
  Uc.info('Showcase SDK interface version', '24.11.1_webgl-598-gae59c48b5b');
})();
var o = a.c;
export { o as setup };
