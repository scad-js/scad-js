import * as transformations from './transformations';
import * as modifiers from './modifiers';
import serialize from './serialize';

const proto = { ...transformations, ...modifiers, serialize };

export class Shape {
  [x: string]: any;
  constructor(params: object) {
    Object.entries(params).map(([k, v]) => {
      this[k] = v;
    });
  }
}

Object.setPrototypeOf(Shape.prototype, proto);

export const undef = 'undef';
export const center = true;

export type vector2d = string | number | [number | string, number | string];
export type vector3d = string | number | [number | string, number | string, number | string];