import { IShape, shape } from './internals';

export type Sphere = IShape<'sphere', { r: number }>;

export const sphere = (r = 1, other = {}) => shape('sphere', { r, ...other });
