import serialize from './serialize';
import * as transformations from './transformations';
import { create } from './utils';

const modifier = (type, ...children) =>
  create(
    { ...transformations, ...modifiers, serialize },
    {
      type: type + 'union',
      children,
    }
  );

export const disable = (target) => modifier('*', target);
export const show_only = (target) => modifier('!', target);
export const debug = (target) => modifier('#', target);
export const background = (target) => modifier('%', target);
