const spaces = n => ' '.repeat(2 * n);

const parseValue = value => Array.isArray(value) ? `[${value.join(', ')}]` : value;

const concatParams = params => Object.entries(params).map(x => ` ${x[0]} = ${parseValue(x[1])}`).toString().slice(1);

const parse = ({type, params = {}, children}, depth = 0) => {
  let output = `${spaces(depth)}${type}(${concatParams(params)})`;
  if (children) {
    output += `\n${spaces(depth)}{\n`
      + children.reduce((acc, child) => acc + parse(child, depth + 1), '')
      + `${spaces(depth)}}\n`;
  }
  else {
    output += ';\n';
  }
  return output;
}

module.exports = parse;
