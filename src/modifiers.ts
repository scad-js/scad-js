import type { Chainable } from './Chainable';
import { serializable } from './Serializable';

interface IModified<Name extends string> {
  type: Name;
  children: Chainable[];
}

export type Background = IModified<'%union'>;
export type Debug = IModified<'#union'>;
export type Disable = IModified<'*union'>;
export type ShowOnly = IModified<'!union'>;

export type Modifier = Disable | ShowOnly | Debug | Background;

const modifier = <Name extends Modifier['type']>(type: Name) => {
  type Result = Extract<Modifier, { type: Name }>;

  return function (this: Chainable, ...children: Chainable[]) {
    return serializable({ type, children: [this, ...children] } as Result);
  };
};

export const background = modifier('%union');
export const debug = modifier('#union');
export const disable = modifier('*union');
export const show_only = modifier('!union');
