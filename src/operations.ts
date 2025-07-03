import modifiers from './modifiers';
import serialize from './serialize';
import * as transformations from './transformations';
import type { ScadObject, ScadOperationType } from './types';
import { create } from './utils';

const operation =
  (type: ScadOperationType) =>
  (...children: ScadObject[]): ScadObject =>
    create({ ...transformations, ...modifiers, serialize }, { type, children });

export const union = operation('union');
export const difference = operation('difference');
export const intersection = operation('intersection');
export const hull = operation('hull');
export const minkowski = operation('minkowski');

export const chain_hull = (...items: ScadObject[]): ScadObject =>
  union(...items.map((cur, i, arr) => (i < arr.length - 1 ? hull(cur, arr[i + 1]!) : null)).filter((obj): obj is ScadObject => obj !== null));
