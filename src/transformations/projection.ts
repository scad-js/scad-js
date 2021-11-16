import { ScadCommand } from '../ScadCommand';
import { ITransformation, transformation } from './internals';

type Params = {
  cut: boolean;
};

export type Projection = ITransformation<'projection', Params>;

export const projection = (target: ScadCommand, cut: Params['cut'] = false) =>
  transformation('projection', target, { cut });
