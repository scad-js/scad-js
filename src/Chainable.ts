import * as modifiers from './modifiers';
import type { Operation } from './operations';
import { Serializable, serializable } from './Serializable';
import type { Shape } from './shapes/index';
import * as transformations from './transformations/index';

export type ChainTarget = Operation | Shape | transformations.Transformation;

// this has to be an interface because `type` would be duplicated in .d.ts files
export interface Chainable extends Serializable {
  background: typeof modifiers.background;
  debug: typeof modifiers.debug;
  disable: typeof modifiers.disable;
  show_only: typeof modifiers.show_only;
  color: typeof transformations.color;
  delta_offset: typeof transformations.delta_offset;
  linear_extrude: typeof transformations.linear_extrude;
  mirror: typeof transformations.mirror;
  mirror_x: typeof transformations.mirror_x;
  mirror_y: typeof transformations.mirror_y;
  mirror_z: typeof transformations.mirror_z;
  projection: typeof transformations.projection;
  radius_offset: typeof transformations.radius_offset;
  resize: typeof transformations.resize;
  rotate: typeof transformations.rotate;
  rotate_extrude: typeof transformations.rotate_extrude;
  rotate_x: typeof transformations.rotate_x;
  rotate_y: typeof transformations.rotate_y;
  rotate_z: typeof transformations.rotate_z;
  scale: typeof transformations.scale;
  scale_x: typeof transformations.scale_x;
  scale_y: typeof transformations.scale_y;
  scale_z: typeof transformations.scale_z;
  translate: typeof transformations.translate;
  translate_x: typeof transformations.translate_x;
  translate_y: typeof transformations.translate_y;
  translate_z: typeof transformations.translate_z;
}

const proto = serializable({
  ...modifiers,
  ...transformations,
});

export const isScadChainable = (x: any): x is Chainable =>
  proto.isPrototypeOf(x);

export function chain<T>(x: T): T & Chainable {
  return { ...x, __proto__: proto } as any;
}

// this ensures we didn't forget any method in the `Chainable` interface
const a: Chainable = null as any;
const mod: typeof modifiers = a;
const tra: typeof transformations = a;
