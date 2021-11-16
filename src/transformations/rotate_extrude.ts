import type { ChainTarget } from '../Chainable';
import { ITransformation, transformation } from './internals';

type Params = {
  angle: number;
  convexity: number;
  $fn: number;
};

export type RotateExtrude = ITransformation<'rotate_extrude', Params>;

export function rotate_extrude(
  this: ChainTarget,
  angle: Params['angle'] = 360,
  { convexity = 2, $fn = 10 }: Partial<Omit<Params, 'angle'>> = {}
) {
  return transformation('rotate_extrude', this, { angle, convexity, $fn });
}
