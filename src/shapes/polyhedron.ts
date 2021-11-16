import { undef, Vector3 } from '../types';
import { IShape, shape } from './internals';

interface Params {
  points: Vector3[] | undef;
  paths: number[] | undef;
  convexity: number;
}

export type Polyhedron = IShape<'polyhedron', Params>;

export const polyhedron = (
  points: Params['points'] = undef,
  paths: Params['paths'] = undef,
  convexity: Params['convexity'] = 1
) => shape('polyhedron', { points, paths, convexity });
