import { IShape, shape } from './internals';

type Params = {
  r: number;
};

export type Circle = IShape<'circle', Params>;

export const circle = (r: Params['r'] = 1, other = {}) =>
  shape('circle', { r, ...other });