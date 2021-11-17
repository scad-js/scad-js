import { Vector2 } from '../types';
import { center, IShape, shape } from './internals';

type CylinderRadius = { r: number } | { r1: number; r2: number };

type Params = { h: number; center: boolean } & CylinderRadius;

export type Cylinder = IShape<'cylinder', Params>;

export const cylinder = (h = 1, r: number | Vector2 = 1, other = {}) => {
  const radius = Array.isArray(r)
    ? ({ r1: r[0], r2: r[1] } as CylinderRadius)
    : ({ r } as CylinderRadius);

  return shape('cylinder', {
    h,
    ...radius,
    center,
    ...other,
  });
};
