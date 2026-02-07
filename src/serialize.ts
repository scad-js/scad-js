import type { ScadObject, ScadSpecialVariables } from './types';

const indent = (n: number): string => ' '.repeat(2 * n);

const stringify = (x: string | string[]): string => {
  if (typeof x === 'string') {
    return x === 'undef' || x.includes('$t') ? x : `"${x}"`;
  }
  if (Array.isArray(x)) {
    return `[${x.map((i) => stringify(i)).join(', ')}]`;
  }
  return String(x);
};

const paramsStr = (params: Record<string, any>): string =>
  Object.entries(params)
    .map(([k, v]) => `${k} = ${stringify(v)}`)
    .join(', ');

function serialize(this: ScadObject, vars: ScadSpecialVariables & Record<string, any> = {}, depth = 0): string {
  const { type, params = {}, children } = this;
  let output = Object.entries(vars)
    .map(([a, b]) => `${a} = ${stringify(b)};\n`)
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
