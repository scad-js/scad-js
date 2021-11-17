import type { Chainable } from '../Chainable';
import { ITransformation, transformation } from './internals';

type Extra = {
  convexity: number;
  $fn: number;
};

export type RotateExtrude = ITransformation<
  'rotate_extrude',
  { angle: number } & Extra
>;

export function rotate_extrude(
  this: Chainable,
  angle = 360,
  { convexity = 2, $fn = 10 }: Partial<Extra> = {}
) {
  return transformation('rotate_extrude', this, { angle, convexity, $fn });
}
