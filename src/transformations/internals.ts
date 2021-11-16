import { chain, ChainTarget } from '../Chainable';
import { Transformation } from './index';

export interface ITransformation<Name extends string, Params extends {}> {
  type: Name;
  params: Params;
  children: [ChainTarget];
}

export const transformation = <
  Name extends Transformation['type'],
  Type extends Extract<Transformation, { type: Name }>,
  Params extends Type['params']
>(
  type: Name,
  target: ChainTarget,
  params: Params
) => chain({ type, params, children: [target] } as Type);
