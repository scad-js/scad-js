import type { ChainTarget } from '../Chainable';
import { Vector } from '../types';
import { ITransformation, transformation } from './internals';

export type Resize = ITransformation<
  'resize',
  { newsize: Vector; auto: boolean }
>;

export function resize(this: ChainTarget, newsize: Vector, auto = false) {
  return transformation('resize', this, { newsize, auto });
}
