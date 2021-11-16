import { Modifier } from './modifiers';
import { Operation } from './operations';
import { Shape } from './shapes';

export type ScadCommand = Shape | Modifier | Operation;
