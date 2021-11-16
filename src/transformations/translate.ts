import type { ChainTarget } from '../Chainable';
import { Vector } from '../types';
import { ITransformation, transformation } from './internals';

export type Translate = ITransformation<'translate', { v: Vector }>;

export function translate(this: ChainTarget, v: Vector) {
  return transformation('translate', this, { v });
}

export function translate_x(this: ChainTarget, x: number) {
  return transformation('translate', this, { v: [x, 0, 0] });
}

export function translate_y(this: ChainTarget, y: number) {
  return transformation('translate', this, { v: [0, y, 0] });
}

export function translate_z(this: ChainTarget, z: number) {
  return transformation('translate', this, { v: [0, 0, z] });
}
