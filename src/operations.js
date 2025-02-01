import modifiers from "./modifiers.js";
import serialize from "./serialize.js";
import transformations from "./transformations.js";
import { create } from "./utils.js";

const operation =
  (type) =>
  (...children) =>
    create({ ...transformations, ...modifiers, serialize }, { type, children });

export const union = operation("union");
export const difference = operation("difference");
export const intersection = operation("intersection");
export const hull = operation("hull");
export const minkowski = operation("minkowski");
export const chain_hull = (...items) =>
  union(...items.map((cur, i, arr) => hull(cur, arr[i + 1])).slice(0, -1));

export default {
  union,
  difference,
  intersection,
  hull,
  minkowski,
  chain_hull,
};
