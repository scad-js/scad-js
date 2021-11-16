import { chain } from '../chain';
import type { Shape } from './index';

export const center = true;

export interface IShape<Name extends string, Params extends {}> {
  type: Name;
  params: Params;
}

export const shape = <
  Name extends Shape['type'],
  Type extends Extract<Shape, { type: Name }>,
  Params extends Type['params']
>(
  type: Name,
  params: Params
) => chain({ type, params } as Type);
