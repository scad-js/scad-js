const transformations = require('./transformations.js');
const modifiers = require('./modifiers.js');
const serialize = require('./serialize.js');
const { create } = require('./utils.js');

const fn = 0;
const fa = 12;
const fs = 2;

const undef = 'undef';

const center = true;

const object = type => params => create({ ...transformations, ...modifiers, serialize }, { type, params });

module.exports = {
  circle: (r = 1, params = {}) => object('circle')({
    r,
    $fn: params.$fn == undefined ? fn : params.$fn,
    $fa: params.$fa == undefined ? fa : params.$fa,
    $fs: params.$fs == undefined ? fs : params.$fs,
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
    $fn: params.$fn == undefined ? fn : params.$fn,
    $fa: params.$fa == undefined ? fa : params.$fa,
    $fs: params.$fs == undefined ? fs : params.$fs,
  }),
  cube: (size = [1, 1, 1]) => object('cube')({
    size,
    center,
  }),
  cylinder: (h = 1, r = 1, params = {}) => object('cylinder')({
    h,
    ...(Array.isArray(r) ? { r1: r[0], r2: r[1] } : { r }),
    center,
    $fn: params.$fn == undefined ? fn : params.$fn,
    $fa: params.$fa == undefined ? fa : params.$fa,
    $fs: params.$fs == undefined ? fs : params.$fs,
  }),
  polyhedron: (points = undef, paths = undef, convexity = 1) => object('polyhedron')({
    points,
    paths,
    convexity,
  }),
};
