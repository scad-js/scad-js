import create from '../create';
import { ScadCommand } from '../ScadCommand';
import { Transformation } from './index';

export interface ITransformation<Name extends string, Params extends {}> {
  type: Name;
  params: Params;
  children: [ScadCommand];
}

export const transformation = <
  Name extends Transformation['type'],
  Params extends Extract<Transformation, { type: Name }>['params']
>(
  type: Name,
  target: ScadCommand,
  params: Params
): Transformation => create(type, { params, children: [target] });
