import type { Circle } from './circle';
import type { Cube } from './cube';
import type { Cylinder } from './cylinder';
import type { Polygon } from './polygon';
import type { Polyhedron } from './polyhedron';
import type { Sphere } from './sphere';
import type { Square } from './square';

export type Shape =
  | Circle
  | Cube
  | Cylinder
  | Polygon
  | Polyhedron
  | Sphere
  | Square;

export * from './circle';
export * from './cube';
export * from './cylinder';
export * from './polygon';
export * from './polyhedron';
export * from './sphere';
export * from './square';
