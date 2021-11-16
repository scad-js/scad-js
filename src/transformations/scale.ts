import type { ChainTarget } from '../Chainable';
import { Vector } from '../types';
import { ITransformation, transformation } from './internals';

export type Scale = ITransformation<'scale', { v: Vector }>;

export function scale(this: ChainTarget, v: Vector) {
  return transformation('scale', this, { v });
}

export function scale_x(this: ChainTarget, x: number) {
  return transformation('scale', this, { v: [x, 1, 1] });
}

export function scale_y(this: ChainTarget, y: number) {
  return transformation('scale', this, { v: [1, y, 1] });
}

export function scale_z(this: ChainTarget, z: number) {
  return transformation('scale', this, { v: [1, 1, z] });
}
