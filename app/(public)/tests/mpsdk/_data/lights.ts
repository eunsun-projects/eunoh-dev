const lights = {
  version: '1.0',
  ambient: {
    enabled: true,
    color: { r: 1, g: 1, b: 1 },
    intensity: 0.4,
    name: 'amb',
    castShadow: true,
  },
  directional: {
    enabled: true,
    intensity: 0.5,
    color: { r: 1, g: 1, b: 1 },
    position: {
      x: 3,
      y: 5,
      z: -1,
    },
    target: {
      x: 2,
      y: 0,
      z: -1,
    },
    castShadow: true,
    debug: false,
  },
  point: {
    enabled: true,
    intensity: 1,
    color: { r: 1, g: 1, b: 1 },
    position: {
      x: 2,
      y: 4,
      z: -1,
    },
    distance: 0,
    decay: 1,
    castShadow: true,
    debug: false,
  },
};

export default lights;
