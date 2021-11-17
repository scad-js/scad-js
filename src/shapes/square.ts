import { $t, Vector2 } from '../types';
import { center, IShape, shape } from './internals';

type SquareSize = Vector2 | number | $t;

type Extra = {
  center: boolean;
};

export type Square = IShape<'square', { size: SquareSize } & Extra>;

export const square = (size: SquareSize = [1, 1], other: Partial<Extra> = {}) =>
  shape('square', { size, center, ...other });
