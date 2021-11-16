import { ScadCommand } from '../ScadCommand';
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

export const linear_extrude = (
  target: ScadCommand,
  height: Params['height'] = undef,
  {
    center = false,
    convexity = undef,
    twist = undef,
    slices = undef,
    scale = 1,
    $fn = 20,
  }: Partial<Omit<Params, 'height'>> = {}
) =>
  transformation('linear_extrude', target, {
    height,
    center,
    convexity,
    twist,
    slices,
    scale,
    $fn,
  });
