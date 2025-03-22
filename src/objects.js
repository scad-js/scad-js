import modifiers from "./modifiers.js";
import { hull, union } from "./operations.js";
import serialize from "./serialize.js";
import * as transformations from "./transformations.js";
import { create } from "./utils.js";

const undef = "undef";

const center = true;

const object = (type) => (params) =>
  create({ ...transformations, ...modifiers, serialize }, { type, params });

export const circle = (r = 1, params = {}) =>
  object("circle")({
    r,
    ...params,
  });

export const square = (size = [1, 1], params = {}) =>
  object("square")({
    size,
    center,
    ...params,
  });

export const rounded_square = (size = 1, radius = 0.125, _params = {}) => {
  const { center: _center, ...params } = _params;
  const [x, y] = typeof size === "number" ? [size, size] : size;
  const maxRadius = Math.min(x, y) / 2;
  const r = radius > 0 && radius < maxRadius ? radius : maxRadius / 8;
  const square = hull(
    circle(r, params).translate([r, r]),
    circle(r, params).translate([x - r, r]),
    circle(r, params).translate([x - r, y - r]),
    circle(r, params).translate([r, y - r]),
  );
  return (_center === undefined ? center : _center)
    ? square.translate([-x / 2, -y / 2])
    : square;
};

export const pill = (size = 1, _params = {}) => {
  const { center: _center, ...params } = _params;
  const [x, y] = typeof size === "number" ? [size, size] : size;

  if (x === y) return circle(x / 2);

  const [w, h] = x >= y ? [x, y] : [y, x];

  const edge = w / 2 - h / 2;
  const pill = union(
    square([w - h, h]),
    circle(h / 2, params).translate_x(edge),
    circle(h / 2, params).translate_x(-edge),
  );

  return x >= y ? pill : pill.rotate_z(90);
};

export const polygon = (points = undef, paths = undef, convexity = 1) =>
  object("polygon")({
    points,
    paths,
    convexity,
  });

export const triangle = (size = 1, convexity = 1) => {
  const [x, y] = typeof size === "number" ? [size, size] : size;

  return polygon(
    [
      [-x / 2, -y / 2],
      [x / 2, -y / 2],
      [0, y / 2],
    ],
    undefined,
    convexity,
  );
};

export const arc = (r = 1, angles = 45, _params = {}) => {
  let [start, end] =
    typeof angles === "number" ? [(angles / 2) * -1, angles / 2] : angles;
  if (end < start) end = 360 + end;

  const angle = end - start;

  const points = [[0, 0]];

  const { $fn = angle / 2, convexity = 1 } = _params;
  const step = angle / $fn;

  for (let a = start; a < end; a += step) {
    const rads = (a * Math.PI) / 180;
    points.push([r * Math.cos(rads), r * Math.sin(rads), a]);
  }

  const endRads = (end * Math.PI) / 180;
  points.push([r * Math.cos(endRads), r * Math.sin(endRads)]);

  return polygon(points, undefined, convexity);
};

export const sphere = (r = 1, params = {}) =>
  object("sphere")({
    r,
    ...params,
  });

export const cube = (size = [1, 1, 1], params = {}) =>
  object("cube")({
    size,
    center,
    ...params,
  });

export const cylinder = (h = 1, r = 1, params = {}) =>
  object("cylinder")({
    h,
    ...(Array.isArray(r) ? { r1: r[0], r2: r[1] } : { r }),
    center,
    ...params,
  });

export const polyhedron = (points = undef, paths = undef, convexity = 1) =>
  object("polyhedron")({
    points,
    paths,
    convexity,
  });

export const cone = (h = 1, r = 1, _params = {}) => {
  const { convexity = 1, ...params } = _params;
  return polygon(
    [
      [0, -h / 2],
      [r / 2, -h / 2],
      [0, h / 2],
    ],
    undefined,
    convexity,
  ).rotate_extrude(360, { ...params });
};

export const rounded_cube = (size = 1, radius = 0.125, _params = {}) => {
  const { center: _center, ...params } = _params;
  const [x, y, z] = typeof size === "number" ? [size, size, size] : size;
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
  return (_center === undefined ? center : _center)
    ? cube.translate([-x / 2, -y / 2, -z / 2])
    : cube;
};
