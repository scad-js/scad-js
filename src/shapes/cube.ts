import { $t, Vector3 } from '../types';
import { center, IShape, shape } from './internals';

type CubeSize = Vector3<number | $t> | number;

type Extra = {
  center: boolean;
};

export type Cube = IShape<'cube', { size: CubeSize } & Extra>;

export const cube = (size: CubeSize = [1, 1, 1], other: Partial<Extra> = {}) =>
  shape('cube', { size, center, ...other });
