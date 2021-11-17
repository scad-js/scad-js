import { chain, Chainable } from '../Chainable';
import { Transformation } from './index';

export interface ITransformation<Name extends string, Params extends {}> {
  type: Name;
  params: Params;
  children: [Chainable];
}

export const transformation = <
  Name extends Transformation['type'],
  Type extends Extract<Transformation, { type: Name }>,
  Params extends Type['params']
>(
  type: Name,
  target: Chainable,
  params: Params
) => chain({ type, params, children: [target] } as Type);
