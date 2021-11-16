import create from './create';
import { ScadCommand } from './ScadCommand';

interface IModified<Name extends string> {
  type: Name;
  children: ScadCommand[];
}

export type Background = IModified<'%union'>;
export type Debugged = IModified<'#union'>;
export type Disabled = IModified<'*union'>;
export type OnlyShowed = IModified<'!union'>;

export type Modifier = Disabled | OnlyShowed | Debugged | Background;

const modifier =
  (type: Modifier['type']) =>
  (...children: ScadCommand[]): Modifier =>
    create(type, { children });

export const background = modifier('%union');
export const debug = modifier('#union');
export const disable = modifier('*union');
export const show_only = modifier('!union');
