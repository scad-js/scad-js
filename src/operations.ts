import { chain, Chainable } from './Chainable';
import { HasSerialize } from './Serializable';

interface IOperation<Name extends string> {
  type: Name;
  children: Chainable[];
}

export type Union = IOperation<'union'>;
export type Difference = IOperation<'difference'>;
export type Intersection = IOperation<'intersection'>;
export type Hull = IOperation<'hull'>;
export type Minkowski = IOperation<'minkowski'>;
export type ChainHull = IOperation<'chain_hull'>;

export type Operation =
  | Union
  | Difference
  | Intersection
  | Hull
  | Minkowski
  | ChainHull;

const operation =
  <
    Name extends Operation['type'],
    Type extends Extract<Operation, { type: Name }>
  >(
    type: Name
  ) =>
  (...children: HasSerialize[]) =>
    chain({ type, children } as Type);

export const union = operation('union');
export const difference = operation('difference');
export const intersection = operation('intersection');
export const hull = operation('hull');
export const minkowski = operation('minkowski');

export const chain_hull = (...items: HasSerialize[]) =>
  union(...items.map((cur, i, arr) => hull(cur, arr[i + 1])).slice(0, -1));
