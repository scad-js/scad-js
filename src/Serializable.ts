import type { Modifier } from './modifiers';
import type { Operation } from './operations';
import { serialize } from './serialize';
import type { Shape } from './shapes/index';
import type { Transformation } from './transformations/index';

export type Serializable = Modifier | Operation | Shape | Transformation;

const proto = { serialize };

export function serializable<T>(x: T): T & typeof proto {
  return { ...x, __proto__: proto } as any;
}
