const serialize = require('./serialize.js');
const modifiers = require('./modifiers.js');

const undef = 'undef';

const transformation = type => function(params) {
  return {
    type,
    params,
    children: [ this ],
    ...transformations,
    ...modifiers,
    serialize,
  };
};

const translate = function(v) {
  return transformation('translate').call(this, { v });
};
const scale = function(v) {
  return transformation('scale').call(this, { v });
};
const resize = function(v) {
  return transformation('resize').call(this, { v });
};
const mirror = function(v) {
  return transformation('mirror').call(this, { v });
};
const color = function(c, alpha = 1) {
  return transformation('color').call(this, { c, alpha });
};
const rotate = function(a, v = undef) {
  return transformation('rotate').call(this, { a, v });
};
const radius_offset = function(r = undef) {
  return transformation('offset').call(this, { r, delta: undef, chamfer: undef });
};
const delta_offset = function(delta, chamfer = false) {
  return transformation('offset').call(this, { r: undef, delta, chamfer });
};
const projection = function(cut = false) {
  return transformation('projection').call(this, { cut });
};

const linear_extrude = function(height = undef, center = undef, convexity = undef, twist = undef, slices = undef, scale = undef) {
  return transformation('linear_extrude').call(this, { height, center, convexity, twist, slices, scale });
};

const rotate_extrude = function(convexity = 2, angle = 360) {
  return transformation('rotate_extrude').call(this, { convexity, angle });
};

const transformations = {
  translate,
  rotate,
  scale,
  resize,
  mirror,
  color,
  radius_offset,
  delta_offset,
  projection,
  linear_extrude,
  rotate_extrude,
};

module.exports = transformations;
