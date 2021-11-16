import * as modifiers from './modifiers';
import { serialize } from './serialize';
import * as transformations from './transformations/index';

type ScadMethods = typeof proto;

const proto = {
  ...modifiers,
  ...transformations,
  serialize,
};

export function chain<T>(x: T): T & ScadMethods {
  return { ...x, __proto__: proto } as any;
}
