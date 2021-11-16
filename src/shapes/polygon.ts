import { undef, Vector2 } from '../types';
import { IShape, shape } from './internals';

type Params = {
  points: Vector2[] | undef;
  paths: number[] | undef;
  convexity: number;
};

export type Polygon = IShape<'polygon', Params>;

export const polygon = (
  points: Params['points'] = undef,
  paths: Params['paths'] = undef,
  convexity: Params['convexity'] = 1
) => shape('polygon', { points, paths, convexity });
