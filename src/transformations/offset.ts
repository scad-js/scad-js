import type { Chainable } from '../Chainable';
import { undef } from '../types';
import { ITransformation, transformation } from './internals';

export type Offset = ITransformation<
  'offset',
  {
    r: number | undef;
    delta: number | undef;
    chamfer: boolean | undef;
  }
>;

export function radius_offset(this: Chainable, r: number | undef = undef) {
  return transformation('offset', this, { r, delta: undef, chamfer: undef });
}

export function delta_offset(this: Chainable, delta: number, chamfer = false) {
  return transformation('offset', this, { r: undef, delta, chamfer });
}
