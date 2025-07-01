import modifiers from './modifiers';
import serialize from './serialize';
import * as transformations from './transformations';
import type { ScadObject, ScadOperationType } from './types';
import { create } from './utils';

/**
 * Creates an operation that combines multiple objects
 */
const operation =
  (type: ScadOperationType) =>
  (...children: ScadObject[]): ScadObject =>
    create({ ...transformations, ...modifiers, serialize }, { type, children });

/**
 * Combines objects together (union operation)
 */
export const union = operation('union');

/**
 * Subtracts objects from the first object (difference operation)
 */
export const difference = operation('difference');

/**
 * Creates the intersection of objects (intersection operation)
 */
export const intersection = operation('intersection');

/**
 * Creates the convex hull of objects (hull operation)
 */
export const hull = operation('hull');

/**
 * Creates the Minkowski sum of objects (minkowski operation)
 */
export const minkowski = operation('minkowski');

/**
 * Creates a chain of hull operations between adjacent items
 */
export const chain_hull = (...items: ScadObject[]): ScadObject =>
  union(...items.map((cur, i, arr) => (i < arr.length - 1 ? hull(cur, arr[i + 1]!) : null)).filter((obj): obj is ScadObject => obj !== null));
