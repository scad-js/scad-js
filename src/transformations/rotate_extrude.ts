import { ScadCommand } from '../ScadCommand';
import { ITransformation, transformation } from './internals';

type Params = {
  angle: number;
  convexity: number;
  $fn: number;
};

export type RotateExtrude = ITransformation<'rotate_extrude', Params>;

export const rotate_extrude = (
  target: ScadCommand,
  angle: Params['angle'] = 360,
  { convexity = 2, $fn = 10 }: Partial<Omit<Params, 'angle'>> = {}
) => transformation('rotate_extrude', target, { angle, convexity, $fn });
