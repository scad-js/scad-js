import { Shape }  from './utils';

const operation = (type: string) => (...children: Shape[]) => new Shape({ type, children });

export const union = operation('union');
export const difference = operation('difference');
export const intersection = operation('intersection');
export const hull = operation('hull');
export const minkowski = operation('minkowski');
export const chain_hull = (...children: Shape[]) => union(...children.map((cur, i, arr) => hull(cur, arr[i + 1])).slice(0, -1));
