import { undef, Vector3 } from '../types';
import { IShape, shape } from './internals';

type PolyhedronPoints = Vector3[] | undef;
type PolyhedronPaths = number[] | undef;

export type Polyhedron = IShape<
  'polyhedron',
  {
    points: PolyhedronPoints;
    paths: PolyhedronPaths;
    convexity: number;
  }
>;

export const polyhedron = (
  points: PolyhedronPoints = undef,
  paths: PolyhedronPaths = undef,
  convexity = 1
) => shape('polyhedron', { points, paths, convexity });
