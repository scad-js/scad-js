const serialize = require('./serialize.js');

const undef = 'undef';

const transformation = type => function(params) {
  return {
    type,
    params,
    children: [ this ],
    ...transformations,
    serialize,
  }
}

const translate = function(v) {
  return transformation('translate').call(this, { v });
};
const scale = function(v) {
  return transformation('scale').call(this, { v });
}
const resize = function(v) {
  return transformation('resize').call(this, { v });
}
const mirror = function(v) {
  return transformation('mirror').call(this, { v });
}
const color = function(c, alpha = 1) {
  return transformation('color').call(this, { c, alpha });
}
const rotate = function(a, v = undef) {
  return transformation('rotate').call(this, { a, v });
}
const offset = function(r = undef, delta = undef, chamfer = undef) {
  return transformation('offset').call(this, { r, delta, chamfer });
}
const projection = function(cut = false) {
  return transformation('projection').call(this, { cut });
}

const linear_extrude = function(height, center, convexity, twist, slice, scale) {
  return transformation('linear_extrude').call(this, { height, center, convexity, twist, slice, scale });
}

const rotate_extrude = function(convexity = 2, angle = 360) {
  return transformation('rotate_extrude');
}

const transformations = {
  translate,
  rotate,
  scale,
  resize,
  mirror,
  color,
  offset,
  projection,
  linear_extrude,
  rotate_extrude,
}

module.exports = transformations;
