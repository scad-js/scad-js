import { ScadCommand } from '../ScadCommand';
import { Vector } from '../types';
import { ITransformation, transformation } from './internals';

interface Params {
  v: Vector;
}

export type Mirror = ITransformation<'mirror', Params>;

export const mirror = (target: ScadCommand, v: Params['v']) =>
  transformation('mirror', target, { v });

export const mirror_x = (target: ScadCommand) =>
  transformation('mirror', target, { v: [1, 0, 0] });

export const mirror_y = (target: ScadCommand) =>
  transformation('mirror', target, { v: [0, 1, 0] });

export const mirror_z = (target: ScadCommand) =>
  transformation('mirror', target, { v: [0, 0, 1] });
