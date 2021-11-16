import type { Chainable } from '../Chainable';
import { Vector } from '../types';
import { ITransformation, transformation } from './internals';

type Params = {
  v: Vector;
};

export type Scale = ITransformation<'scale', Params>;

export function scale(this: Chainable, v: Params['v']) {
  return transformation('scale', this, { v });
}

export function scale_x(this: Chainable, x: number) {
  return transformation('scale', this, { v: [x, 1, 1] });
}

export function scale_y(this: Chainable, y: number) {
  return transformation('scale', this, { v: [1, y, 1] });
}

export function scale_z(this: Chainable, z: number) {
  return transformation('scale', this, { v: [1, 1, z] });
}
