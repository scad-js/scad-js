import type { Chainable } from '../Chainable';
import { Vector } from '../types';
import { ITransformation, transformation } from './internals';

export type Mirror = ITransformation<'mirror', { v: Vector }>;

export function mirror(this: Chainable, v: Vector) {
  return transformation('mirror', this, { v });
}

export function mirror_x(this: Chainable) {
  return transformation('mirror', this, { v: [1, 0, 0] });
}

export function mirror_y(this: Chainable) {
  return transformation('mirror', this, { v: [0, 1, 0] });
}

export function mirror_z(this: Chainable) {
  return transformation('mirror', this, { v: [0, 0, 1] });
}
