import type { ScadObject } from './types';

/**
 * Creates indentation string with specified level
 */
const indent = (n: number): string => ' '.repeat(2 * n);

/**
 * Converts a value to its OpenSCAD string representation
 */
const stringify = (x: any): string =>
  typeof x === 'string' ? (x === 'undef' || x.includes('$t') ? x : `"${x}"`) : JSON.stringify(x).replace(/"/g, '').split(',').join(', ');

/**
 * Converts object parameters to OpenSCAD parameter string
 */
const paramsStr = (params: Record<string, any>): string =>
  Object.entries(params)
    .map((x) => `${x[0]} = ${stringify(x[1])}`)
    .join(', ');

/**
 * Serializes a ScadObject to OpenSCAD code
 */
function serialize(this: ScadObject, vars: Record<string, any> = {}, depth = 0): string {
  const { type, params = {}, children } = this;
  let output = Object.entries(vars)
    .map(([a, b]) => `${a} = ${b};\n`)
    .join('');
  output += `${indent(depth)}${type}(${paramsStr(params)})`;

  if (children && children.length > 0) {
    output += `\n${indent(depth)}{\n${children.map((child) => serialize.call(child, {}, depth + 1)).join('')}${indent(depth)}}\n`;
  } else {
    output += ';\n';
  }

  return output;
}

export default serialize;
