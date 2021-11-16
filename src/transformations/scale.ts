import { ScadCommand } from '../ScadCommand';
import { Vector } from '../types';
import { ITransformation, transformation } from './internals';

type Params = {
  v: Vector;
};

export type Scale = ITransformation<'scale', Params>;

export const scale = (target: ScadCommand, v: Params['v']) =>
  transformation('scale', target, { v });

export const scale_x = (target: ScadCommand, x: number) =>
  transformation('scale', target, { v: [x, 1, 1] });

export const scale_y = (target: ScadCommand, y: number) =>
  transformation('scale', target, { v: [1, y, 1] });

export const scale_z = (target: ScadCommand, z: number) =>
  transformation('scale', target, { v: [1, 1, z] });
