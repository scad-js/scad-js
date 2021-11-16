export const undef = 'undef' as const;
export type undef = typeof undef;

export const $t = '$t';
export type $t = `${string}$t${string}`;

export type Vector2<T = number> = [T, T];
export type Vector3<T = number> = [T, T, T];

export type Vector<T = number> = Vector2<T> | Vector3<T>;
