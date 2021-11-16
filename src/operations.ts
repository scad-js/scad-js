import * as modifiers from './modifiers';
import serialize from './serialize';
import * as transformations from './transformations';
import { create } from './utils';

const operation =
  (type) =>
  (...children) =>
    create({ ...transformations, ...modifiers, serialize }, { type, children });

export const union = operation('union');
export const difference = operation('difference');
export const intersection = operation('intersection');
export const hull = operation('hull');
export const minkowski = operation('minkowski');
export const chain_hull = (...items) =>
  union(...items.map((cur, i, arr) => hull(cur, arr[i + 1])).slice(0, -1));
