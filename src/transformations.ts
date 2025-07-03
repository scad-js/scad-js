import modifiers from './modifiers';
import serialize from './serialize';
import type { ScadObject, ScadType, Vector2D, Vector3D } from './types';
import { create, undef } from './utils';

const transformation =
  (type: string) =>
  (obj: ScadObject, params: Record<string, any>): ScadObject => {
    const scadType = type as ScadType;
    return create({ ...transformations, ...modifiers, serialize }, { type: scadType, params, children: [obj] });
  };

function translate(this: ScadObject, v: Vector3D): ScadObject {
  return transformation('translate')(this, { v });
}

function translate_x(this: ScadObject, x: number): ScadObject {
  return transformation('translate')(this, { v: [x, 0, 0] });
}

function translate_y(this: ScadObject, y: number): ScadObject {
  return transformation('translate')(this, { v: [0, y, 0] });
}

function translate_z(this: ScadObject, z: number): ScadObject {
  return transformation('translate')(this, { v: [0, 0, z] });
}

function scale(this: ScadObject, v: Vector3D): ScadObject {
  return transformation('scale')(this, { v });
}

function scale_x(this: ScadObject, x: number): ScadObject {
  return transformation('scale')(this, { v: [x, 1, 1] });
}

function scale_y(this: ScadObject, y: number): ScadObject {
  return transformation('scale')(this, { v: [1, y, 1] });
}

function scale_z(this: ScadObject, z: number): ScadObject {
  return transformation('scale')(this, { v: [1, 1, z] });
}

function resize(this: ScadObject, v: Vector3D, auto = false): ScadObject {
  return transformation('resize')(this, { newsize: v, auto });
}

function mirror(this: ScadObject, v: Vector3D): ScadObject {
  return transformation('mirror')(this, { v });
}

function mirror_x(this: ScadObject): ScadObject {
  return transformation('mirror')(this, { v: [1, 0, 0] });
}

function mirror_y(this: ScadObject): ScadObject {
  return transformation('mirror')(this, { v: [0, 1, 0] });
}

function mirror_z(this: ScadObject): ScadObject {
  return transformation('mirror')(this, { v: [0, 0, 1] });
}

function color(this: ScadObject, c: string | Vector2D | Vector3D, alpha = 1): ScadObject {
  return transformation('color')(this, { c, alpha });
}

function multmatrix(this: ScadObject, m: number[][]): ScadObject {
  return transformation('multmatrix')(this, { m });
}

function rotate(this: ScadObject, a: number | Vector3D, v: Vector3D | typeof undef = undef): ScadObject {
  return transformation('rotate')(this, { a, v });
}

function rotate_x(this: ScadObject, a: number): ScadObject {
  return transformation('rotate')(this, { a, v: [1, 0, 0] });
}

function rotate_y(this: ScadObject, a: number): ScadObject {
  return transformation('rotate')(this, { a, v: [0, 1, 0] });
}

function rotate_z(this: ScadObject, a: number): ScadObject {
  return transformation('rotate')(this, { a, v: [0, 0, 1] });
}

function radius_offset(this: ScadObject, r: number | typeof undef = undef): ScadObject {
  return transformation('offset')(this, { r, delta: undef, chamfer: undef });
}

function delta_offset(this: ScadObject, delta: number, chamfer = false): ScadObject {
  return transformation('offset')(this, { r: undef, delta, chamfer });
}

function projection(this: ScadObject, cut = false): ScadObject {
  return transformation('projection')(this, { cut });
}

function linear_extrude(this: ScadObject, height: number | typeof undef = undef, params: Record<string, any> = {}): ScadObject {
  return transformation('linear_extrude')(this, {
    height,
    center: params.center || false,
    convexity: params.convexity || undef,
    twist: params.twist || undef,
    slices: params.slices || undef,
    scale: params.scale || 1,
    $fn: params.$fn || 20,
  });
}

function rotate_extrude(this: ScadObject, angle = 360, params: Record<string, any> = {}): ScadObject {
  return transformation('rotate_extrude')(this, {
    angle,
    convexity: params.convexity || 2,
    $fn: params.$fn || 10,
  });
}

export const transformations = {
  translate,
  translate_x,
  translate_y,
  translate_z,
  scale,
  scale_x,
  scale_y,
  scale_z,
  resize,
  mirror,
  mirror_x,
  mirror_y,
  mirror_z,
  rotate,
  rotate_x,
  rotate_y,
  rotate_z,
  color,
  multmatrix,
  radius_offset,
  delta_offset,
  projection,
  linear_extrude,
  rotate_extrude,
};

export {
  translate,
  translate_x,
  translate_y,
  translate_z,
  scale,
  scale_x,
  scale_y,
  scale_z,
  resize,
  mirror,
  mirror_x,
  mirror_y,
  mirror_z,
  rotate,
  rotate_x,
  rotate_y,
  rotate_z,
  color,
  multmatrix,
  radius_offset,
  delta_offset,
  projection,
  linear_extrude,
  rotate_extrude,
};
