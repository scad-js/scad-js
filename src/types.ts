/**
 * Types for scad-js: Generate OpenSCAD solid models with TypeScript
 */

/**
 * Represents a 2D or 3D vector
 */
export type Vector2D = [number, number];
export type Vector3D = [number, number, number];
export type Vector = number | Vector2D | Vector3D;

/**
 * OpenSCAD primitives and operations
 */
export type ScadPrimitiveType = 'circle' | 'square' | 'polygon' | 'sphere' | 'cube' | 'cylinder' | 'polyhedron';

export type ScadOperationType = 'union' | 'difference' | 'intersection' | 'hull' | 'minkowski';

export type ScadTransformationType =
  | 'translate'
  | 'rotate'
  | 'scale'
  | 'resize'
  | 'mirror'
  | 'multmatrix'
  | 'color'
  | 'offset'
  | 'projection'
  | 'linear_extrude'
  | 'rotate_extrude'
  // Modifier types with prefixes
  | '*union'
  | '!union'
  | '#union'
  | '%union';

export type ScadType = ScadPrimitiveType | ScadOperationType | ScadTransformationType;

/**
 * Parameters for primitive objects
 */
export interface CircleParams {
  r: number;
  [key: string]: any;
}

export interface SquareParams {
  size: Vector2D | number;
  center: boolean;
  [key: string]: any;
}

export interface PolygonParams {
  points: Vector2D[];
  paths?: number[][];
  convexity?: number;
}

export interface SphereParams {
  r: number;
  [key: string]: any;
}

export interface CubeParams {
  size: Vector3D | number;
  center: boolean;
  [key: string]: any;
}

export interface CylinderParams {
  h: number;
  r?: number;
  r1?: number;
  r2?: number;
  center: boolean;
  [key: string]: any;
}

export interface PolyhedronParams {
  points: Vector3D[];
  paths?: number[][];
  convexity?: number;
}

export type ScadParams = CircleParams | SquareParams | PolygonParams | SphereParams | CubeParams | CylinderParams | PolyhedronParams | Record<string, any>;

/**
 * Transformation parameters
 */
export interface TranslateParams {
  v: Vector3D;
}

export interface RotateParams {
  a: Vector3D | number;
}

export interface ScaleParams {
  v: Vector3D;
}

export interface ResizeParams {
  newsize: Vector3D;
}

export interface MirrorParams {
  v: Vector3D;
}

export interface MultmatrixParams {
  m: number[][];
}

export interface ColorParams {
  c: string | Vector3D | Vector2D;
  alpha?: number;
}

/**
 * Scad object and operations
 */
export interface ScadObject {
  type: ScadType;
  params?: ScadParams;
  children?: ScadObject[];

  // Transformations
  translate: (v: Vector3D) => ScadObject;
  rotate: (a: Vector3D | number) => ScadObject;
  scale: (v: Vector3D) => ScadObject;
  resize: (newsize: Vector3D) => ScadObject;
  mirror: (v: Vector3D) => ScadObject;
  multmatrix: (m: number[][]) => ScadObject;
  color: (c: string | Vector3D | Vector2D, alpha?: number) => ScadObject;

  // Modifiers
  debug: () => ScadObject;
  background: () => ScadObject;
  root: () => ScadObject;
  disable: () => ScadObject;

  // Serialize
  serialize: () => string;
}
