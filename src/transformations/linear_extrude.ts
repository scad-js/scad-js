import type { ChainTarget } from '../Chainable';
import { undef } from '../types';
import { ITransformation, transformation } from './internals';

type ExtrusionHeight = number | undef;

type Extra = {
  center: boolean;
  convexity: undef;
  twist: undef;
  slices: undef;
  scale: number;
  $fn: number;
};

export type LinearExtrude = ITransformation<
  'linear_extrude',
  { height: ExtrusionHeight } & Extra
>;

export function linear_extrude(
  this: ChainTarget,
  height: ExtrusionHeight = undef,
  {
    center = false,
    convexity = undef,
    twist = undef,
    slices = undef,
    scale = 1,
    $fn = 20,
  }: Partial<Extra> = {}
) {
  return transformation('linear_extrude', this, {
    height,
    center,
    convexity,
    twist,
    slices,
    scale,
    $fn,
  });
}
