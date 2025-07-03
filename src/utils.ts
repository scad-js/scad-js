export const create = <T extends object, U extends object>(proto: T, params: U): T & U => Object.assign(Object.create(proto), params);
export const undef = 'undef';
