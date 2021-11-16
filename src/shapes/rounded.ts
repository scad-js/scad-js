import { hull } from '../operations';
import { circle } from './circle';
import { center } from './internals';
import { sphere } from './sphere';

interface RoundedParams {
  center?: boolean;
}

export function rounded_square(
  size = 1,
  radius = 0.125,
  params: Partial<RoundedParams> = {}
) {
  const [x, y] = typeof size == 'number' ? [size, size] : size;
  const maxRadius = Math.min(x, y) / 2;
  const r = radius > 0 && radius < maxRadius ? radius : maxRadius / 8;
  const shouldCenter = params.center == null ? center : params.center;

  const square = hull(
    circle(r, params).translate([r, r]),
    circle(r, params).translate([x - r, r]),
    circle(r, params).translate([x - r, y - r]),
    circle(r, params).translate([r, y - r])
  );

  return shouldCenter ? square.translate([-x / 2, -y / 2]) : square;
}

export const rounded_cube = (
  size = 1,
  radius = 0.125,
  params: Partial<RoundedParams> = {}
) => {
  const [x, y, z] = typeof size == 'number' ? [size, size, size] : size;
  const maxRadius = Math.min(x, y, z) / 2;
  const r = radius > 0 && radius < maxRadius ? radius : maxRadius / 8;
  const shouldCenter = params.center == null ? center : params.center;

  const cube = hull(
    sphere(r, params).translate([r, r, r]),
    sphere(r, params).translate([x - r, r, r]),
    sphere(r, params).translate([x - r, y - r, r]),
    sphere(r, params).translate([r, y - r, r]),
    sphere(r, params).translate([r, r, z - r]),
    sphere(r, params).translate([x - r, r, z - r]),
    sphere(r, params).translate([x - r, y - r, z - r]),
    sphere(r, params).translate([r, y - r, z - r])
  );

  return shouldCenter ? cube.translate([-x / 2, -y / 2, -z / 2]) : cube;
};
