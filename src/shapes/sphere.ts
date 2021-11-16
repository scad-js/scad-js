import { IShape, shape } from './internals';

type Params = {
  r: number;
};

export type Sphere = IShape<'sphere', Params>;

export const sphere = (r: Params['r'] = 1, other = {}) =>
  shape('sphere', { r, ...other });
