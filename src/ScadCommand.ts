import { Modifier } from './modifiers';
import { Operation } from './operations';
import { Shape } from './shapes';
import { Transformation } from './transformations';

export type ScadCommand = Modifier | Operation | Shape | Transformation;
