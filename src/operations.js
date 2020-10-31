const transformations = require('./transformations.js');
const modifiers = require('./modifiers.js');
const serialize = require('./serialize.js');

const operation = type => (...children) =>
  Object.assign(Object.create({ ...transformations, ...modifiers, serialize }), { type, children });

module.exports = {
  union: operation('union'),
  difference: operation('difference'),
  intersection: operation('intersection'),
  hull: operation('hull'),
  minkowski: operation('minkowski'),
};
