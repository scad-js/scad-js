const operation = type => (params, ...children) => ({type, params, children});
const paramLessOperation = type => (...children) => ({type, params: {}, children});

const translate = operation('translate'); // params: v
const rotate = operation('rotate'); // params: a, v
const scale = operation('scale'); // params: v
const resize = operation('resize'); // params: v
const mirror = operation('mirror'); // params: v
const color = operation('color'); // params: c
const offset = operation('offset'); // params: r, delda, chamfer
const projection = operation('projection'); // params: cut = false
const linear_extrude = operation('linear_extrude'); // params: height, center, convexity, twist, slices, scale
const rotate_extrude = operation('rotate_extrude'); // params: angle, convexity

const union = paramLessOperation('union');
const difference = paramLessOperation('difference');
const intersection = paramLessOperation('difference');
const hull = paramLessOperation('hull');
const minkowski = paramLessOperation('minkowski');

module.exports = {
  translate,
  rotate,
  scale,
  resize,
  mirror,
  color,
  offset,
  projection,
  union,
  difference,
  intersection,
  hull,
  minkowski,
  linear_extrude,
  rotate_extrude,
};
