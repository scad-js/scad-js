import { Shape, undef, vector3d }  from './utils';

const transformation = (type: string) => {
  return (obj: Shape[], params: object) => new Shape({ type, params, children: [ obj ] });
};

export function translate(v: vector3d) {
  return transformation('translate')(this, { v });
}

export function translate_x(x = 0) {
  return transformation('translate')(this, { v: [ x, 0, 0 ] });
}

export function translate_y(y = 0) {
  return transformation('translate')(this, { v: [ 0, y, 0 ] });
}

export function translate_z(z = 0) {
  return transformation('translate')(this, { v: [ 0, 0, z ] });
}

export function scale(v: vector3d) {
  return transformation('scale')(this, { v });
}

export function scale_x(x: number) {
  return transformation('scale')(this, { v: [x, 1, 1] });
}

export function scale_y(y: number) {
  return transformation('scale')(this, { v: [1, y, 1] });
}

export function scale_z(z: number) {
  return transformation('scale')(this, { v: [1, 1, z] });
}

export function resize(v: vector3d, auto = false) {
  return transformation('resize')(this, { newsize: v, auto });
}

export function mirror(v: vector3d) {
  return transformation('mirror')(this, { v });
}

export function mirror_x() {
  return transformation('mirror')(this, { v: [ 1, 0, 0] });
}

export function mirror_y() {
  return transformation('mirror')(this, { v: [ 0, 1, 0] });
}

export function mirror_z() {
  return transformation('mirror')(this, { v: [ 0, 0, 1] });
}

export function color(c: string, alpha = 1) {
  return transformation('color')(this, { c, alpha });
}

export function rotate(a: number, v = undef) {
  return transformation('rotate')(this, { a, v });
}

export function rotate_x(a: number) {
  return transformation('rotate')(this, { a, v: [ 1, 0, 0] });
}

export function rotate_y(a: number) {
  return transformation('rotate')(this, { a, v: [ 0, 1, 0] });
}

export function rotate_z(a: number) {
  return transformation('rotate')(this, { a, v: [ 0, 0, 1] });
}

export function radius_offset(r = undef) {
  return transformation('offset')(this, { r, delta : undef, chamfer: undef });
}

export function delta_offset(delta: any, chamfer = false) {
  return transformation('offset')(this, { r: undef, delta, chamfer });
}

export function projection(cut = false) {
  return transformation('projection')(this, { cut });
}

export const linear_extrude = function (height = undef, params: any = {}) {
  return transformation('linear_extrude')(this, {
    height,
    center: params.center || false,
    convexity: params.convexity || undef,
    twist: params.twist || undef,
    slices: params.slices || undef,
    scale: params.scale || 1,
    $fn: params.$fn || 20,
  });
};

export function rotate_extrude(angle = 360, params: any = {}) {
  return transformation('rotate_extrude')(this, {
    angle,
    convexity: params.convexity || 2,
    $fn: params.$fn || 10,
  });
}
