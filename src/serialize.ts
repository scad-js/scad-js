import type { Chainable } from './Chainable';
import { Shape } from './shapes/index';
import { Transformation } from './transformations/index';
import { $t, undef } from './types';

type Params = (Shape | Transformation)['params'] | {};
type ParamValue = Params[keyof Params];

const indent = (n: number) => ' '.repeat(2 * n);

export function serialize(this: Chainable, vars = {}, depth = 0): string {
  const params = 'params' in this ? this.params : null;

  const start = Object.entries(vars)
    .map(([a, b]) => `${a} = ${b};\n`)
    .join('');

  const output = `${start}${indent(depth)}${this.type}(${stringifyParams(
    params || {}
  )})`;

  if (!('children' in this)) {
    return `${output};\n`;
  }

  const children = this.children
    .map((child) => serialize.call(child, {}, depth + 1))
    .join('');

  return `${output}\n${indent(depth)}{\n${children}${indent(depth)}}\n`;
}

function stringify(x: string | undef | ParamValue) {
  if (typeof x == 'string') {
    return x === undef || x.includes($t) ? x : `"${x}"`;
  }

  return JSON.stringify(x).replace(/"/g, '').replace(/,/g, ', ');
}

function stringifyParams(params: Params) {
  return Object.entries(params)
    .map(([name, value]) => `${name} = ${stringify(value as ParamValue)}`)
    .join(', ');
}
