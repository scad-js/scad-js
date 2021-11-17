import type { Modifier } from './modifiers';
import type { Operation } from './operations';
import { serialize } from './serialize';
import type { Shape } from './shapes/index';
import type { Transformation } from './transformations/index';

export interface HasSerialize {
  serialize: typeof serialize;
}

export type Serializable = HasSerialize &
  (Modifier | Operation | Shape | Transformation);

const proto = { serialize };

export const isScadSerializable = (x: any): x is HasSerialize =>
  proto.isPrototypeOf(x);

export function serializable<T>(x: T): T & Serializable {
  return { ...x, __proto__: proto } as any;
}
