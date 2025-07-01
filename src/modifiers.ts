import serialize from './serialize';
import * as transformations from './transformations';
import type { ScadObject, ScadType } from './types';
import { create } from './utils';

/**
 * Creates a modified version of a ScadObject with a specific modifier prefix
 */
const modifier = (typePrefix: string, ...children: ScadObject[]): ScadObject => {
  const type = `${typePrefix}union` as ScadType;
  return create(
    { ...transformations, ...modifiers, serialize },
    {
      type,
      children,
    },
  );
};

/**
 * Modifiers that can be applied to ScadObjects
 */
const modifiers = {
  /**
   * Disable the object (equivalent to * in OpenSCAD)
   */
  disable(this: ScadObject): ScadObject {
    return modifier('*', this);
  },

  /**
   * Show only this object (equivalent to ! in OpenSCAD)
   */
  root(this: ScadObject): ScadObject {
    return modifier('!', this);
  },

  /**
   * Show object in debug mode (equivalent to # in OpenSCAD)
   */
  debug(this: ScadObject): ScadObject {
    return modifier('#', this);
  },

  /**
   * Set as background (equivalent to % in OpenSCAD)
   */
  background(this: ScadObject): ScadObject {
    return modifier('%', this);
  },
};

export default modifiers;
