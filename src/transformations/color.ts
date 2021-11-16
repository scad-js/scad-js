import type { ChainTarget } from '../Chainable';
import { ITransformation, transformation } from './internals';

export type Color = ITransformation<'color', { c: string; alpha: number }>;

export function color(this: ChainTarget, c: string, alpha = 1) {
  return transformation('color', this, { c, alpha });
}
