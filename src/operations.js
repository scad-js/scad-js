const transformations = require('./transformations.js');
const serialize = require('./serialize.js');

const operation = (type) => function(...children) {
  return {
    type,
    params: {},
    children,
    ...transformations,
    serialize,
  };
};

const union = operation('union');
const difference = operation('difference');
const intersection = operation('difference');
const hull = operation('hull');
const minkowski = operation('minkowski');

module.exports = { union, difference, intersection, hull, minkowski };
