import type { Chainable } from '../Chainable';
import { undef } from '../types';
import { ITransformation, transformation } from './internals';

type Params = {
  height: number | undef;
  center: boolean;
  convexity: undef;
  twist: undef;
  slices: undef;
  scale: number;
  $fn: number;
};

export type LinearExtrude = ITransformation<'linear_extrude', Params>;

export function linear_extrude(
  this: Chainable,
  height: Params['height'] = undef,
  {
    center = false,
    convexity = undef,
    twist = undef,
    slices = undef,
    scale = 1,
    $fn = 20,
  }: Partial<Omit<Params, 'height'>> = {}
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
