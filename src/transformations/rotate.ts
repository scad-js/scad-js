import { ScadCommand } from '../ScadCommand';
import { undef, Vector } from '../types';
import { ITransformation, transformation } from './internals';

interface Params {
  a: Vector | number;
  v: Vector | undef;
}

export type Rotate = ITransformation<'rotate', Params>;

export const rotate = (
  target: ScadCommand,
  a: Params['a'],
  v: Params['v'] = undef
) => transformation('rotate', target, { a, v });

export const rotate_x = (target: ScadCommand, a: Params['a']) =>
  transformation('rotate', target, { a, v: [1, 0, 0] });

export const rotate_y = (target: ScadCommand, a: Params['a']) =>
  transformation('rotate', target, { a, v: [0, 1, 0] });

export const rotate_z = (target: ScadCommand, a: Params['a']) =>
  transformation('rotate', target, { a, v: [0, 0, 1] });
