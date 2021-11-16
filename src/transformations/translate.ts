import { ScadCommand } from '../ScadCommand';
import { Vector } from '../types';
import { ITransformation, transformation } from './internals';

type Params = {
  v: Vector;
};

export type Translate = ITransformation<'translate', Params>;

export const translate = (target: ScadCommand, v: Params['v']) =>
  transformation('translate', target, { v });

export const translate_x = (target: ScadCommand, x: number) =>
  transformation('translate', target, { v: [x, 0, 0] });

export const translate_y = (target: ScadCommand, y: number) =>
  transformation('translate', target, { v: [0, y, 0] });

export const translate_z = (target: ScadCommand, z: number) =>
  transformation('translate', target, { v: [0, 0, z] });
