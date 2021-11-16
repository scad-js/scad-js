import type { ChainTarget } from '../Chainable';
import { undef } from '../types';
import { ITransformation, transformation } from './internals';

type Params = {
  r: number | undef;
  delta: number | undef;
  chamfer: boolean | undef;
};

export type Offset = ITransformation<'offset', Params>;

export function radius_offset(this: ChainTarget, r: Params['r'] = undef) {
  return transformation('offset', this, { r, delta: undef, chamfer: undef });
}

export function delta_offset(
  this: ChainTarget,
  delta: Params['delta'],
  chamfer: Params['chamfer'] = false
) {
  return transformation('offset', this, { r: undef, delta, chamfer });
}
