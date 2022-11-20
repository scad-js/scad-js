import { Shape }  from './utils';

const modifier = (type: string, ...children: Shape[]) => new Shape({ type: type + 'union', children });

export function disable() {
  return modifier('*', this);
}

export function show_only() {
  return modifier('!', this);
}

export function debug() {
  return modifier('#', this);
}

export function background() {
  return modifier('%', this);
}
