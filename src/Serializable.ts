import type { Modifier } from './modifiers';
import type { Operation } from './operations';
import { serialize } from './serialize';
import type { Shape } from './shapes/index';
import type { Transformation } from './transformations/index';

export type SerTarget = Modifier | Operation | Shape | Transformation;

export interface Serializable {
  serialize: typeof serialize;
}

const proto: Serializable = { serialize };

export function serializable<T>(x: T): T & Serializable {
  return { ...x, __proto__: proto } as any;
}
