const transformations = require('./transformations.js');
const modifiers = require('./modifiers.js');
const serialize = require('./serialize.js');
const { create } = require('./utils.js');

const operation =
  (type) =>
  (...children) =>
    create({ ...transformations, ...modifiers, serialize }, { type, children });
const union = operation('union');
const difference = operation('difference');
const intersection = operation('intersection');
const hull = operation('hull');
const minkowski = operation('minkowski');
const chain_hull = (...items) =>
  union(...items.map((cur, i, arr) => hull(cur, arr[i + 1])).slice(0, -1));

module.exports = {
  union,
  difference,
  intersection,
  hull,
  minkowski,
  chain_hull,
};
