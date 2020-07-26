const transformations = require('./transformations.js');
const serialize = require('./serialize.js');

const center = true;
const undef = 'undef';

const object = type => params => ({
  type,
  params,
  ...transformations,
  serialize,
});

const circle = (r = 1) => object('circle')({ r });
const square = (size = [1, 1]) => object('square')({ size, center });
const polygon = (points = undef, paths = undef, convexity = 1) => object('polygon')({ points, paths, convexity });

const sphere = r => object('sphere')({ r });
const cube = (size = [1, 1, 1]) => object('cube')({ size, center});
const cylinder = (h, r) => object('cylinder')({ h, ...(Array.isArray(r) ? { r1: r[0], r2: r[1] } : { r }), center});
const polyhedron = (points = undef, faces = undef, convexity = 1) => object('polyhedron')({ points, faces, convexity });

module.exports = { circle, square, polygon, sphere, cube, cylinder, polyhedron };
