import { ScadCommand } from '../ScadCommand';
import { undef } from '../types';
import { ITransformation, transformation } from './internals';

type Params = {
  r: number | undef;
  delta: number | undef;
  chamfer: boolean | undef;
};

export type Offset = ITransformation<'offset', Params>;

export const radius_offset = (target: ScadCommand, r: Params['r'] = undef) =>
  transformation('offset', target, { r, delta: undef, chamfer: undef });

export const delta_offset = (
  target: ScadCommand,
  delta: Params['delta'],
  chamfer: Params['chamfer'] = false
) => transformation('offset', target, { r: undef, delta, chamfer });
