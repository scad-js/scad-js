import render from './render';
import serialize from './serialize';
import * as transformations from './transformations';
import type { ScadObject, ScadType } from './types';
import { create } from './utils';

const modifier = (typePrefix: string, ...children: ScadObject[]): ScadObject => {
  const type = `${typePrefix}union` as ScadType;
  return create({ ...transformations, ...modifiers, serialize, render }, { type, children });
};

const modifiers = {
  disable(this: ScadObject): ScadObject {
    return modifier('*', this);
  },
  root(this: ScadObject): ScadObject {
    return modifier('!', this);
  },
  debug(this: ScadObject): ScadObject {
    return modifier('#', this);
  },
  background(this: ScadObject): ScadObject {
    return modifier('%', this);
  },
};

export default modifiers;
