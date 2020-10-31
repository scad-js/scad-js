const transformations = require('./transformations.js');
const serialize = require('./serialize.js');
const { create } = require('./utils.js');

const modifier = (type, ...children) => create({ ...transformations, ...modifiers, serialize }, {
  type: type + 'union',
  children,
});

const modifiers = {
  disable () {
    return modifier('*', this);
  },
  show_only() {
    return modifier('!');
  },
  debug() {
    return modifier('#');
  },
  background() {
    return modifier('%');
  },
};


module.exports = modifiers;
