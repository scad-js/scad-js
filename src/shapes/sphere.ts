import { IShape, shape } from './internals';

interface Params {
  r: number;
}

export type Sphere = IShape<'sphere', Params>;

export const sphere = (r: Params['r'] = 1, other = {}) =>
  shape('sphere', { r, ...other });
