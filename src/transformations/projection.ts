import type { Chainable } from '../Chainable';
import { ITransformation, transformation } from './internals';

type Params = {
  cut: boolean;
};

export type Projection = ITransformation<'projection', Params>;

export function projection(this: Chainable, cut: Params['cut'] = false) {
  return transformation('projection', this, { cut });
}
