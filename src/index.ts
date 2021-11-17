import type { Modifier } from './modifiers';
import type { Operation } from './operations';
import type { Shape } from './shapes/index';
import type { Transformation } from './transformations/index';

export type Scad = Modifier | Operation | Shape | Transformation;

export { isScadChainable } from './Chainable';
export * from './operations';
export { isScadSerializable } from './Serializable';
export * from './shapes/index';
