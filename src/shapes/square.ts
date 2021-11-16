import { $t, Vector2 } from '../types';
import { center, IShape, shape } from './internals';

interface Params {
  size: Vector2 | number | $t;
  center: boolean;
}

export type Square = IShape<'square', Params>;

export const square = (size: Params['size'] = [1, 1], other = {}) =>
  shape('square', { size, center, ...other });
