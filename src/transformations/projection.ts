import type { ChainTarget } from '../Chainable';
import { ITransformation, transformation } from './internals';

export type Projection = ITransformation<'projection', { cut: boolean }>;

export function projection(this: ChainTarget, cut = false) {
  return transformation('projection', this, { cut });
}
