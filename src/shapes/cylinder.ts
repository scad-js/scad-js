import { Vector2 } from '../types';
import { center, IShape, shape } from './internals';

type Params = { h: number; center: boolean } & (
  | { r: number }
  | { r1: number; r2: number }
);

export type Cylinder = IShape<'cylinder', Params>;

export const cylinder = (
  h: Params['h'] = 1,
  r: number | Vector2 = 1,
  other = {}
) =>
  shape('cylinder', {
    h,
    ...(Array.isArray(r) ? { r1: r[0], r2: r[1] } : { r }),
    center,
    ...other,
  });
