const indent = (n: number) => ' '.repeat(2 * n);

const stringify = (x: object | string) => (typeof x == 'string')
  ? (x == 'undef' || x.includes('$t')) ? x : `"${x}"`
  : JSON.stringify(x).replace(/"/g, '').split(',').join(', ');

const paramsStr = (params: object) => Object.entries(params).map(([k, v]) => `${k} = ${stringify(v)}`).join(', ');

const serialize = function (vars = {}, depth = 0) {
  const {type, params = {}, children} = this;
  const output = Object.entries(vars).map(([a,b]) => `${a} = ${b};\n`).join('')
  + indent(depth) + `${type}(${paramsStr(params)})`;

  if (!children) {
    return output + ';\n';
  }

  return output + '\n' + indent(depth) + '{\n'
    + children.map((child: any) => serialize.call(child, {}, depth + 1)).join('')
    + indent(depth) + '}\n';
};

export default serialize;
