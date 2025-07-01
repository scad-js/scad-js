/**
 * Utility functions for scad-js
 */

/**
 * Creates a new object with the prototype chain set to the provided proto object
 * and assigns all properties from params to the new object
 */
export const create = <T extends object, U extends object>(proto: T, params: U): T & U => Object.assign(Object.create(proto), params);

/**
 * Placeholder for undefined values in OpenSCAD
 */
export const undef = 'undef';
