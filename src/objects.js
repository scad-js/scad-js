const transformations = require('./transformations.js');
const serialize = require('./serialize.js');

const object = function(type) {
  return function(params) {
    return {
      type,
      params,
      ...transformations,
      serialize,
    };
  }
};

const circle = object('circle'); // params: r, d
const square = object('square'); // params: size, center
const polygon = object('polygon'); // params: points, paths

const sphere = object('sphere'); // params: r, d;
const cube = object('cube'); // params: size, center;
const cylinder = object('cylinder'); // params: h, r, r1, r2, d, d1, d2, center
const polyhedron = object('polyhedron'); // params: points, faces, convexity

module.exports = { circle, square, polygon, sphere, cube, cylinder, polyhedron };
