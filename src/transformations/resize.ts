import type { ChainTarget } from '../Chainable';
import { Vector } from '../types';
import { ITransformation, transformation } from './internals';

type Params = {
  newsize: Vector;
  auto: boolean;
};

export type Resize = ITransformation<'resize', Params>;

export function resize(
  this: ChainTarget,
  v: Params['newsize'],
  auto: Params['auto'] = false
) {
  return transformation('resize', this, { newsize: v, auto });
}
