import { ScadCommand } from '../ScadCommand';
import { ITransformation, transformation } from './internals';

interface Params {
  c: unknown;
  alpha: number;
}

export type Color = ITransformation<'color', Params>;

export const color = (
  target: ScadCommand,
  c: Params['c'],
  alpha: Params['alpha'] = 1
) => transformation('color', target, { c, alpha });
