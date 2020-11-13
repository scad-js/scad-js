const modifiers = require('./modifiers.js');
const serialize = require('./serialize.js');
const { create } = require('./utils.js');

const undef = 'undef';

const transformation = type => (obj, params) => create({ ...transformations, ...modifiers, serialize }, { type, params, children: [ obj ] });

const transformations = {
  translate (v) {
    return transformation('translate')(this, { v });
  },
  scale (v) {
    return transformation('scale')(this, { v });
  },
  resize (v, auto = false) {
    return transformation('resize')(this, { newsize: v, auto });
  },
  mirror (v) {
    return transformation('mirror')(this, { v });
  },
  color (c, alpha = 1) {
    return transformation('color')(this, { c, alpha });
  },
  rotate (a, v = undef) {
    return transformation('rotate')(this, { a, v });
  },
  radius_offset (r = undef) {
    return transformation('offset')(this, { r, delta : undef, chamfer: undef });
  },
  delta_offset (delta, chamfer = false) {
    return transformation('offset')(this, { r: undef, delta, chamfer });
  },
  projection (cut = false) {
    return transformation('projection')(this, { cut });
  },
  linear_extrude (height = undef, params = {}) {
    return transformation('linear_extrude')(this, {
      height,
      center: params.center || false,
      convexity: params.convexity || undef,
      twist: params.twist || undef,
      slices: params.slices || undef,
      scale: params.scale || 1,
      $fn: params.$fn || 20,
    });
  },
  rotate_extrude (angle = 360, params = {}) {
    return transformation('rotate_extrude')(this, {
      angle,
      convexity: params.convexity || 2,
      $fn: params.$fn || 10,
    });
  },
};

module.exports = transformations;
