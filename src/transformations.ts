import modifiers from './modifiers';
import serialize from './serialize';
import type { ScadObject, ScadType, Vector2D, Vector3D } from './types';
import { create, undef } from './utils';

/**
 * Create a transformation function for a ScadObject
 */
const transformation =
  (type: string) =>
  (obj: ScadObject, params: Record<string, any>): ScadObject => {
    const scadType = type as ScadType;
    return create({ ...transformations, ...modifiers, serialize }, { type: scadType, params, children: [obj] });
  };

/**
 * Translate an object by a vector
 */
function translate(this: ScadObject, v: Vector3D): ScadObject {
  return transformation('translate')(this, { v });
}

/**
 * Translate an object along the X axis
 */
function translate_x(this: ScadObject, x: number): ScadObject {
  return transformation('translate')(this, { v: [x, 0, 0] });
}

/**
 * Translate an object along the Y axis
 */
function translate_y(this: ScadObject, y: number): ScadObject {
  return transformation('translate')(this, { v: [0, y, 0] });
}

/**
 * Translate an object along the Z axis
 */
function translate_z(this: ScadObject, z: number): ScadObject {
  return transformation('translate')(this, { v: [0, 0, z] });
}

/**
 * Scale an object by a vector
 */
function scale(this: ScadObject, v: Vector3D): ScadObject {
  return transformation('scale')(this, { v });
}

/**
 * Scale an object along the X axis
 */
function scale_x(this: ScadObject, x: number): ScadObject {
  return transformation('scale')(this, { v: [x, 1, 1] });
}

/**
 * Scale an object along the Y axis
 */
function scale_y(this: ScadObject, y: number): ScadObject {
  return transformation('scale')(this, { v: [1, y, 1] });
}

/**
 * Scale an object along the Z axis
 */
function scale_z(this: ScadObject, z: number): ScadObject {
  return transformation('scale')(this, { v: [1, 1, z] });
}

/**
 * Resize an object to new dimensions
 */
function resize(this: ScadObject, v: Vector3D, auto = false): ScadObject {
  return transformation('resize')(this, { newsize: v, auto });
}

/**
 * Mirror an object along a vector
 */
function mirror(this: ScadObject, v: Vector3D): ScadObject {
  return transformation('mirror')(this, { v });
}

/**
 * Mirror an object along the X axis
 */
function mirror_x(this: ScadObject): ScadObject {
  return transformation('mirror')(this, { v: [1, 0, 0] });
}

/**
 * Mirror an object along the Y axis
 */
function mirror_y(this: ScadObject): ScadObject {
  return transformation('mirror')(this, { v: [0, 1, 0] });
}

/**
 * Mirror an object along the Z axis
 */
function mirror_z(this: ScadObject): ScadObject {
  return transformation('mirror')(this, { v: [0, 0, 1] });
}

/**
 * Color an object
 */
function color(this: ScadObject, c: string | Vector2D | Vector3D, alpha = 1): ScadObject {
  return transformation('color')(this, { c, alpha });
}

/**
 * Apply a matrix transformation to an object
 */
function multmatrix(this: ScadObject, m: number[][]): ScadObject {
  return transformation('multmatrix')(this, { m });
}

/**
 * Rotate an object
 */
function rotate(this: ScadObject, a: number | Vector3D, v: Vector3D | typeof undef = undef): ScadObject {
  return transformation('rotate')(this, { a, v });
}

/**
 * Rotate an object around the X axis
 */
function rotate_x(this: ScadObject, a: number): ScadObject {
  return transformation('rotate')(this, { a, v: [1, 0, 0] });
}

/**
 * Rotate an object around the Y axis
 */
function rotate_y(this: ScadObject, a: number): ScadObject {
  return transformation('rotate')(this, { a, v: [0, 1, 0] });
}

/**
 * Rotate an object around the Z axis
 */
function rotate_z(this: ScadObject, a: number): ScadObject {
  return transformation('rotate')(this, { a, v: [0, 0, 1] });
}

/**
 * Create an offset with a radius
 */
function radius_offset(this: ScadObject, r: number | typeof undef = undef): ScadObject {
  return transformation('offset')(this, { r, delta: undef, chamfer: undef });
}

/**
 * Create an offset with a delta
 */
function delta_offset(this: ScadObject, delta: number, chamfer = false): ScadObject {
  return transformation('offset')(this, { r: undef, delta, chamfer });
}

/**
 * Project a 3D object to 2D
 */
function projection(this: ScadObject, cut = false): ScadObject {
  return transformation('projection')(this, { cut });
}

/**
 * Create a linear extrusion
 */
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

/**
 * Create a rotation extrusion
 */
function rotate_extrude(this: ScadObject, angle = 360, params: Record<string, any> = {}): ScadObject {
  return transformation('rotate_extrude')(this, {
    angle,
    convexity: params.convexity || 2,
    $fn: params.$fn || 10,
  });
}

/**
 * All transformation functions
 */
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
