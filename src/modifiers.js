const transformations = require('./transformations.js');
const serialize = require('./serialize.js');

const modifier = c => function() {
  return {
    type: c + 'union',
    params: {},
    children: [ this ],
    ...transformations,
    ...modifiers,
    serialize,
  };
};

const disable = modifier('*');
const show_only = modifier('!');
const debug = modifier('#');
const background = modifier('%');

const modifiers = { disable, show_only, debug, background };

module.exports = modifiers;
