import * as modifiers from './modifiers';
import type { Operation } from './operations';
import { serializable } from './Serializable';
import type { Shape } from './shapes/index';
import * as transformations from './transformations/index';

export type Chainable = Operation | Shape | transformations.Transformation;

const proto = serializable({
  ...modifiers,
  ...transformations,
});

type ScadMethods = typeof proto;

export function chain<T>(x: T): T & ScadMethods {
  return { ...x, __proto__: proto } as any;
}
