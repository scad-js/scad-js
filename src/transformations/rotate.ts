import type { Chainable } from '../Chainable';
import { undef, Vector } from '../types';
import { ITransformation, transformation } from './internals';

type VectorOrNumber = Vector | number;

export type Rotate = ITransformation<
  'rotate',
  {
    v: Vector | undef;
  }
>;

export function rotate(
  this: Chainable,
  a: VectorOrNumber,
  v: Vector | undef = undef
) {
  return transformation('rotate', this, { a, v });
}

export function rotate_x(this: Chainable, a: VectorOrNumber) {
  return transformation('rotate', this, { a, v: [1, 0, 0] });
}

export function rotate_y(this: Chainable, a: VectorOrNumber) {
  return transformation('rotate', this, { a, v: [0, 1, 0] });
}

export function rotate_z(this: Chainable, a: VectorOrNumber) {
  return transformation('rotate', this, { a, v: [0, 0, 1] });
}
