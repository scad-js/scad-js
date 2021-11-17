import type { Chainable } from '../Chainable';
import { Vector } from '../types';
import { ITransformation, transformation } from './internals';

export type Resize = ITransformation<
  'resize',
  { newsize: Vector; auto: boolean }
>;

export function resize(this: Chainable, newsize: Vector, auto = false) {
  return transformation('resize', this, { newsize, auto });
}
