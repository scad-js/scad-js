const transformations = require('./transformations.js');
const modifiers = require('./modifiers.js');
const { hull } = require('./operations.js');
const serialize = require('./serialize.js');
const { create } = require('./utils.js');

const undef = 'undef';

const center = true;

const object = type => params => create({ ...transformations, ...modifiers, serialize }, { type, params });

const circle = (r = 1, params = {}) => object('circle')({
  r,
  ...params,
});

const square = (size = [1, 1], params = {}) => object('square')({
  size,
  center,
  ...params,
});

const rounded_square = (size = 1, radius = 0.125, _params = {}) => {
  const { center : _center, ...params } = _params;
  const [x, y] = typeof size == 'number' ? [size, size] : size;
  const maxRadius = Math.min(x, y) / 2;
  const r = radius > 0 && radius < maxRadius ? radius : maxRadius / 8;
  const square = hull(
    circle(r, params).translate([r, r]),
    circle(r, params).translate([x - r, r]),
    circle(r, params).translate([x - r, y - r]),
    circle(r, params).translate([r, y - r]),
  );
  return (_center == undefined ? center : _center) ? square.translate([ -x / 2, -y / 2]) : square;
};

const polygon = (points = undef, paths = undef, convexity = 1) => object('polygon')({
  points,
  paths,
  convexity,
});

const sphere = (r = 1, params = {}) => object('sphere')({
  r,
  ...params,
});

const cube = (size = [1, 1, 1], params = {}) => object('cube')({
  size,
  center,
  ...params,
});

const cylinder = (h = 1, r = 1, params = {}) => object('cylinder')({
  h,
  ...(Array.isArray(r) ? { r1: r[0], r2: r[1] } : { r }),
  center,
  ...params,
});

const polyhedron = (points = undef, paths = undef, convexity = 1) => object('polyhedron')({
  points,
  paths,
  convexity,
});

const rounded_cube = (size = 1, radius = 0.125, _params = {}) => {
  const { center : _center, ...params } = _params;
  const [x, y, z] = typeof size == 'number' ? [size, size, size] : size;
  const maxRadius = Math.min(x, y, z) / 2;
  const r = radius > 0 && radius < maxRadius ? radius : maxRadius / 8;
  const cube = hull(
    sphere(r, params).translate([r, r, r]),
    sphere(r, params).translate([x - r, r, r]),
    sphere(r, params).translate([x - r, y - r, r]),
    sphere(r, params).translate([r, y - r, r]),
    sphere(r, params).translate([r, r, z - r]),
    sphere(r, params).translate([x - r, r, z - r]),
    sphere(r, params).translate([x - r, y - r, z - r]),
    sphere(r, params).translate([r, y - r, z - r]),
  );
  return (_center == undefined ? center : _center) ? cube.translate([ -x / 2, -y / 2, -z / 2]) : cube;
};

module.exports = {
  circle,
  square,
  polygon,
  cube,
  cylinder,
  polyhedron,
  sphere,
  rounded_cube,
  rounded_square,
};
