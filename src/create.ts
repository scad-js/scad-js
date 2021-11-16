import * as modifiers from './modifiers';
import { ScadCommand } from './ScadCommand';
import serialize from './serialize';
import * as transformations from './transformations';

type Method = (x: ScadCommand, ...args: any[]) => any;
type Prototype = Record<string, Method>;

const proto = thisify({
  ...modifiers,
  ...transformations,
  serialize,
});

export type ScadMethods = typeof proto;

export default function create<Name extends string, Params extends {}>(
  type: Name,
  params: Params
): any {
  return Object.assign(Object.create(proto), { type, ...params });
}

type Thisify<T extends Prototype> = {
  [P in keyof T]: ThisifyFunction<T[P]>;
};

function thisify<T extends Prototype>(target: T): Thisify<T> {
  const converted = Object.entries(target).map(([key, fn]) => [
    key,
    thisifyFunction(fn),
  ]);

  return Object.fromEntries(converted) as Thisify<T>;
}

type ThisifyFunction<F extends Method> = F extends (
  x: ScadCommand,
  ...args: infer P
) => infer R
  ? (...args: P) => R & ScadMethods
  : never;

function thisifyFunction<F extends Method>(fn: F) {
  return function (this: ScadCommand, ...args: any[]) {
    return fn(this, ...args);
  } as any;
}
