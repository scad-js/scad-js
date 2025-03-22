import serialize from "./serialize.js";
import * as transformations from "./transformations.js";
import { create } from "./utils.js";

const modifier = (type, ...children) =>
  create(
    { ...transformations, ...modifiers, serialize },
    {
      type: `${type}union`,
      children,
    },
  );

const modifiers = {
  disable() {
    return modifier("*", this);
  },
  show_only() {
    return modifier("!", this);
  },
  debug() {
    return modifier("#", this);
  },
  background() {
    return modifier("%", this);
  },
};

export default modifiers;
