const indent = n => ' '.repeat(2 * n);

const stringify = x => JSON.stringify(x).split(',').join(', ');

const parseValue = value => Array.isArray(value) || typeof(value) == 'string' ? value == 'undef' ? 'undef' : stringify(value) : value;

const paramsStr = params => Object.entries(params).map(x => `${x[0]} = ${parseValue(x[1])}`).join(', ');

const serialize = function (depth = 0) {
  const {type, params = {}, children} = this;
  let output = `${indent(depth)}${type}(${paramsStr(params)})`;
  if (children) {
    output += `\n${indent(depth)}{\n`
      + children.map(child => serialize.call(child, depth + 1)).join('')
      + `${indent(depth)}}\n`;
  }
  else {
    output += ';\n';
  }
  return output;
};

module.exports = serialize;
