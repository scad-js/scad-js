const serialize = require('./serialize.js');

const transformation = (type) => function(params) {
  return {
    type,
    params,
    children: [ this ],
    ...transformations,
    serialize,
  }
}

const translate = transformation('translate'); // params: v
const scale = transformation('scale'); // params: v
const resize = transformation('resize'); // params: v
const mirror = transformation('mirror'); // params: v
const color = transformation('color'); // params: c
const rotate = transformation('rotate'); // params: a, v
const offset = transformation('offset'); // params: r, delda, chamfer
const projection = transformation('projection'); // params: cut = false
const linear_extrude = transformation('linear_extrude'); // params: height, center, convexity, twist, slices, scale
const rotate_extrude = transformation('rotate_extrude'); // params: angle, convexity

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
