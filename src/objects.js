const transformations = require('./transformations.js');
const modifiers = require('./modifiers.js');
const serialize = require('./serialize.js');

const fn = 0;
const fa = 12;
const fs = 2;

const undef = 'undef';

const center = true;

const object = type => params =>
  Object.assign(Object.create({ ...transformations, ...modifiers, serialize }), { type, params });

module.exports = {
  circle: (r = 1, params = {}) => object('circle')({
    r,
    $fn: params.$fn || fn,
    $fa: params.$fa || fa,
    $fs: params.$fs || fs,

  }),
  square: (size = [1, 1]) => object('square')({
    size,
    center,
  }),
  polygon: (points = undef, paths = undef, convexity = 1) => object('polygon')({
    points,
    paths,
    convexity,
  }),
  sphere: (r = 1, params = {}) => object('sphere')({
    r,
    $fn: params.$fn || fn,
    $fa: params.$fa || fa,
    $fs: params.$fs || fs,
  }),
  cube: (size = [1, 1, 1]) => object('cube')({
    size,
    center,
  }),
  cylinder: (h = 1, r = 1, params = {}) => object('cylinder')({
    h,
    ...(Array.isArray(r) ? { r1: r[0], r2: r[1] } : { r }),
    center,
    $fn: params.$fn || fn,
    $fa: params.$fa || fa,
    $fs: params.$fs || fs,
  }),
  polyhedron: (points = undef, paths = undef, convexity = 1) => object('polyhedron')({
    points,
    paths,
    convexity,
  }),
};
