import type { Chainable } from '../Chainable';
import { undef, Vector } from '../types';
import { ITransformation, transformation } from './internals';

type Params = {
  a: Vector | number;
  v: Vector | undef;
};

export type Rotate = ITransformation<'rotate', Params>;

export function rotate(
  this: Chainable,
  a: Params['a'],
  v: Params['v'] = undef
) {
  return transformation('rotate', this, { a, v });
}

export function rotate_x(this: Chainable, a: Params['a']) {
  return transformation('rotate', this, { a, v: [1, 0, 0] });
}

export function rotate_y(this: Chainable, a: Params['a']) {
  return transformation('rotate', this, { a, v: [0, 1, 0] });
}

export function rotate_z(this: Chainable, a: Params['a']) {
  return transformation('rotate', this, { a, v: [0, 0, 1] });
}
