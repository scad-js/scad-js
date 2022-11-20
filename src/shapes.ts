import { hull } from './operations';
import { Shape, undef, center, vector2d, vector3d }  from './utils';

const shape = (type: string) => (params: object) => new Shape({ type, params });

export function circle (r: number = 1, params: object = {}) {
  return shape('circle')({ r, ...params });
}

export function square (size: vector2d = [1, 1], params: object = {}) {
  return shape('square')({ size, center, ...params });
}

export function rounded_square (size = 1, radius = 0.125, _params: any = {}) {
  const { center : _center, ...params } = _params;
  const [x, y] = (typeof size == 'number') ? [size, size] : size;
  const maxRadius = Math.min(x, y) / 2;
  const r = radius > 0 && radius < maxRadius ? radius : maxRadius / 8;
  const square = hull(
    circle(r, params).translate([r, r]),
    circle(r, params).translate([x - r, r]),
    circle(r, params).translate([x - r, y - r]),
    circle(r, params).translate([r, y - r]),
  );
  return (_center == undefined ? center : _center) ? square.translate([ -x / 2, -y / 2]) : square;
}

export function polygon (points: number[][] | string = undef, paths: number[] | string = undef, convexity = 1) {
  return shape('polygon')({ points, paths, convexity });
}

export function sphere(r: number = 1, params = {}) {
  return shape('sphere')({ r, ...params });
}

export function cube (size: vector3d = [1, 1, 1], params = {}) {
  return shape('cube')({size, center, ...params});
}

export function cylinder(h: number = 1, r: vector2d = 1, params = {}) {
  return shape('cylinder')({
    h,
    ...(Array.isArray(r) ? { r1: r[0], r2: r[1] } : { r }),
    center,
    ...params,
  });
}

export function polyhedron(points: number[][] | string = undef, faces: number[] | string = undef, convexity = 1) {
  return shape('polyhedron')({ points, faces, convexity });
}

export function rounded_cube(size = 1, radius: number = 0.125, _params: any = {}) {
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
}

