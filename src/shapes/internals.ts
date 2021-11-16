import create, { ScadMethods } from '../create';
import type { Shape } from './index';

export const center = true;

export interface IShape<Name extends string, Params extends {}> {
  type: Name;
  params: Params;
}

export const shape = <
  Name extends Shape['type'],
  Params extends Extract<Shape, { type: Name }>['params']
>(
  type: Name,
  params: Params
): Shape & ScadMethods => create(type, { params });
