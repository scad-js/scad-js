const object = type => params => ({ type, params });

const circle = object('circle'); // params: r, d
const square = object('square'); // params: size, center
const polygon = object('polygon'); // params: points, paths

const sphere = object('sphere'); // params: r, d;
const cube = object('cube'); // params: size, center;
const cylinder = object('cylinder'); // params: h, r, r1, r2, d, d1, d2, center
const polyhedron = object('polyhedron'); // params: points, faces, convexity

module.exports = { circle, square, polygon, square, cube, cylinder, polyhedron };
