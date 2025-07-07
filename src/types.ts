export type Vector2D = [number, number];
export type Vector3D = [number, number, number];
export type Vector = number | Vector2D | Vector3D;

/**
 * OpenSCAD special variables
 * These are the built-in variables that control various aspects of OpenSCAD rendering
 */
export interface ScadSpecialVariables {
  /** Minimum angle (degrees) - controls the minimum angle for curved surfaces */
  $fa?: number;
  /** Minimum size (mm) - controls the minimum size of fragments */
  $fs?: number;
  /** Number of fragments - controls the number of fragments for curved surfaces */
  $fn?: number;
  /** Animation step (0-1) - used for animation, varies from 0 to 1 */
  $t?: number;
  /** Viewport rotation angles in degrees [x, y, z] */
  $vpr?: Vector3D;
  /** Viewport translation [x, y, z] */
  $vpt?: Vector3D;
  /** Viewport camera distance */
  $vpd?: number;
  /** Viewport camera field of view */
  $vpf?: number;
  /** Number of module children */
  $children?: number;
  /** True in F5 preview, false for F6 render */
  $preview?: boolean;
}

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
  | '*union'
  | '!union'
  | '#union'
  | '%union';

export type ScadType = ScadPrimitiveType | ScadOperationType | ScadTransformationType;

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

export interface ScadObject {
  type: ScadType;
  params?: ScadParams;
  children?: ScadObject[];

  translate: (v: Vector3D) => ScadObject;
  rotate: (a: Vector3D | number) => ScadObject;
  scale: (v: Vector3D) => ScadObject;
  resize: (newsize: Vector3D) => ScadObject;
  mirror: (v: Vector3D) => ScadObject;
  multmatrix: (m: number[][]) => ScadObject;
  color: (c: string | Vector3D | Vector2D, alpha?: number) => ScadObject;

  debug: () => ScadObject;
  background: () => ScadObject;
  root: () => ScadObject;
  disable: () => ScadObject;

  serialize: (vars?: ScadSpecialVariables & Record<string, any>) => string;
}
