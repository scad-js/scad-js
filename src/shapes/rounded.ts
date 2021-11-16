// import { hull } from "../operations";
// import { circle } from "./circle";

// export const rounded_square = (size = 1, radius = 0.125, _params = {}) => {
//   const { center: _center, ...params } = _params;
//   const [x, y] = typeof size == 'number' ? [size, size] : size;
//   const maxRadius = Math.min(x, y) / 2;
//   const r = radius > 0 && radius < maxRadius ? radius : maxRadius / 8;
//   const square = hull(
//     circle(r, params).translate([r, r]),
//     circle(r, params).translate([x - r, r]),
//     circle(r, params).translate([x - r, y - r]),
//     circle(r, params).translate([r, y - r])
//   );
//   return (_center == undefined ? center : _center)
//     ? square.translate([-x / 2, -y / 2])
//     : square;
// };

// export const rounded_cube = (size = 1, radius = 0.125, _params = {}) => {
//   const { center: _center, ...params } = _params;
//   const [x, y, z] = typeof size == 'number' ? [size, size, size] : size;
//   const maxRadius = Math.min(x, y, z) / 2;
//   const r = radius > 0 && radius < maxRadius ? radius : maxRadius / 8;
//   const cube = hull(
//     sphere(r, params).translate([r, r, r]),
//     sphere(r, params).translate([x - r, r, r]),
//     sphere(r, params).translate([x - r, y - r, r]),
//     sphere(r, params).translate([r, y - r, r]),
//     sphere(r, params).translate([r, r, z - r]),
//     sphere(r, params).translate([x - r, r, z - r]),
//     sphere(r, params).translate([x - r, y - r, z - r]),
//     sphere(r, params).translate([r, y - r, z - r])
//   );
//   return (_center == undefined ? center : _center)
//     ? cube.translate([-x / 2, -y / 2, -z / 2])
//     : cube;
// };
