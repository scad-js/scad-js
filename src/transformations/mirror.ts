import type { ChainTarget } from '../Chainable';
import { Vector } from '../types';
import { ITransformation, transformation } from './internals';

type Params = {
  v: Vector;
};

export type Mirror = ITransformation<'mirror', Params>;

export function mirror(this: ChainTarget, v: Params['v']) {
  return transformation('mirror', this, { v });
}

export function mirror_x(this: ChainTarget) {
  return transformation('mirror', this, { v: [1, 0, 0] });
}

export function mirror_y(this: ChainTarget) {
  return transformation('mirror', this, { v: [0, 1, 0] });
}

export function mirror_z(this: ChainTarget) {
  return transformation('mirror', this, { v: [0, 0, 1] });
}
