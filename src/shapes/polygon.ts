import { undef, Vector2 } from '../types';
import { IShape, shape } from './internals';

type PolygonPoints = Vector2[] | undef;
type PolygonPaths = number[] | undef;

export type Polygon = IShape<
  'polygon',
  {
    points: PolygonPoints;
    paths: PolygonPaths;
    convexity: number;
  }
>;

export const polygon = (
  points: PolygonPoints = undef,
  paths: PolygonPaths = undef,
  convexity = 1
) => shape('polygon', { points, paths, convexity });
