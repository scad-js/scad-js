const transformations = require('./transformations.js');
const modifiers = require('./modifiers.js');
const serialize = require('./serialize.js');
const { create } = require('./utils.js');

const undef = 'undef';

const center = true;

const object = type => params => create({ ...transformations, ...modifiers, serialize }, { type, params });

module.exports = {
  circle: (r = 1, params = {}) => object('circle')({
    r,
    ...params,
  }),
  square: (size = [1, 1], params = {}) => object('square')({
    size,
    center,
    ...params,
  }),
  polygon: (points = undef, paths = undef, convexity = 1) => object('polygon')({
    points,
    paths,
    convexity,
  }),
  sphere: (r = 1, params = {}) => object('sphere')({
    r,
    ...params,
  }),
  cube: (size = [1, 1, 1], params = {}) => object('cube')({
    size,
    center,
    ...params,
  }),
  cylinder: (h = 1, r = 1, params = {}) => object('cylinder')({
    h,
    ...(Array.isArray(r) ? { r1: r[0], r2: r[1] } : { r }),
    center,
    ...params,
  }),
  polyhedron: (points = undef, paths = undef, convexity = 1) => object('polyhedron')({
    points,
    paths,
    convexity,
  }),
};
