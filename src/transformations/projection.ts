import type { ChainTarget } from '../Chainable';
import { ITransformation, transformation } from './internals';

type Params = {
  cut: boolean;
};

export type Projection = ITransformation<'projection', Params>;

export function projection(this: ChainTarget, cut: Params['cut'] = false) {
  return transformation('projection', this, { cut });
}
