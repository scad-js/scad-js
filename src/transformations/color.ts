import type { Chainable } from '../Chainable';
import { ITransformation, transformation } from './internals';

export type Color = ITransformation<'color', { c: string; alpha: number }>;

export function color(this: Chainable, c: string, alpha = 1) {
  return transformation('color', this, { c, alpha });
}
