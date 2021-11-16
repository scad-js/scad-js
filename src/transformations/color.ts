import type { ChainTarget } from '../Chainable';
import { ITransformation, transformation } from './internals';

type Params = {
  c: unknown;
  alpha: number;
};

export type Color = ITransformation<'color', Params>;

export function color(
  this: ChainTarget,
  c: Params['c'],
  alpha: Params['alpha'] = 1
) {
  return transformation('color', this, { c, alpha });
}
