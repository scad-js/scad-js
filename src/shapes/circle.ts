import { IShape, shape } from './internals';

export type Circle = IShape<'circle', { r: number }>;

export const circle = (r: number = 1, other = {}) =>
  shape('circle', { r, ...other });
