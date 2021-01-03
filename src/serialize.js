const indent = n => ' '.repeat(2 * n);

const stringify = x => (typeof x == 'string')
  ? (x == 'undef' || x.includes('$t')) ? x : `"${x}"`
  : JSON.stringify(x).replace(/"/g, '').split(',').join(', ');

const paramsStr = params => Object.entries(params).map(x => `${x[0]} = ${stringify(x[1])}`).join(', ');

const serialize = function (vars = {}, depth = 0) {
  const {type, params = {}, children} = this;
  let output = Object.entries(vars).map(([a,b]) => `${a} = ${b};\n`).join('');
  output += `${indent(depth)}${type}(${paramsStr(params)})`;
  if (children) {
    output += `\n${indent(depth)}{\n`
      + children.map(child => serialize.call(child, {}, depth + 1)).join('')
      + `${indent(depth)}}\n`;
  }
  else {
    output += ';\n';
  }
  return output;
};

module.exports = serialize;
