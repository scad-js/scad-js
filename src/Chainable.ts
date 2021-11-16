import type { Operation } from './operations';
import type { Shape } from './shapes/index';
import type { Transformation } from './transformations/index';

export type Chainable = Operation | Shape | Transformation;
