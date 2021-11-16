import { ScadCommand } from '../ScadCommand';
import { Vector } from '../types';
import { ITransformation, transformation } from './internals';

type Params = {
  newsize: Vector;
  auto: boolean;
};

export type Resize = ITransformation<'resize', Params>;

export const resize = function (
  target: ScadCommand,
  v: Params['newsize'],
  auto: Params['auto'] = false
) {
  return transformation('resize', target, { newsize: v, auto });
};
