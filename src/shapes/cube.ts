import { $t, Vector3 } from '../types';
import { center, IShape, shape } from './internals';

interface Params {
  size: Vector3<number | $t> | number;
  center: boolean;
}

export type Cube = IShape<'cube', Params>;

export const cube = (size: Params['size'] = [1, 1, 1], other = {}) =>
  shape('cube', { size, center, ...other });
