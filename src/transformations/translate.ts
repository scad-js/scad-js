import type { Chainable } from '../Chainable';
import { Vector } from '../types';
import { ITransformation, transformation } from './internals';

type Params = {
  v: Vector;
};

export type Translate = ITransformation<'translate', Params>;

export function translate(this: Chainable, v: Params['v']) {
  return transformation('translate', this, { v });
}

export function translate_x(this: Chainable, x: number) {
  return transformation('translate', this, { v: [x, 0, 0] });
}

export function translate_y(this: Chainable, y: number) {
  return transformation('translate', this, { v: [0, y, 0] });
}

export function translate_z(this: Chainable, z: number) {
  return transformation('translate', this, { v: [0, 0, z] });
}
