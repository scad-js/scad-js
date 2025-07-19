import modifiers from './modifiers';
import { hull } from './operations';
import render from './render';
import serialize from './serialize';
import * as transformations from './transformations';
import type { ScadObject, ScadPrimitiveType, Vector2D, Vector3D } from './types';
import { create, undef } from './utils';

const center = true;

const object =
  (type: ScadPrimitiveType) =>
  (params: Record<string, any>): ScadObject =>
    create({ ...transformations, ...modifiers, serialize, render }, { type, params });

export const circle = (r = 1, params: Record<string, any> = {}): ScadObject =>
  object('circle')({
    r,
    ...params,
  });

export const square = (size: Vector2D | number = [1, 1], params: Record<string, any> = {}): ScadObject =>
  object('square')({
    size,
    center,
    ...params,
  });

export const rounded_square = (size: Vector2D | number = 1, radius = 0.125, _params: Record<string, any> = {}): ScadObject => {
  const { center: _center, ...params } = _params;
  const [x, y] = typeof size === 'number' ? [size, size] : size;
  const maxRadius = Math.min(x, y) / 2;
  const r = radius > 0 && radius < maxRadius ? radius : maxRadius / 8;
  const square = hull(
    circle(r, params).translate([r, r, 0]),
    circle(r, params).translate([x - r, r, 0]),
    circle(r, params).translate([x - r, y - r, 0]),
    circle(r, params).translate([r, y - r, 0]),
  );
  return (_center === undefined ? center : _center) ? square.translate([-x / 2, -y / 2, 0]) : square;
};

export const polygon = (points: Vector2D[] = [], paths: number[][] | typeof undef = undef, convexity = 1): ScadObject =>
  object('polygon')({
    points,
    paths,
    convexity,
  });

export const sphere = (r = 1, params: Record<string, any> = {}): ScadObject =>
  object('sphere')({
    r,
    ...params,
  });

export const cube = (size: Vector3D | number = [1, 1, 1], params: Record<string, any> = {}): ScadObject =>
  object('cube')({
    size,
    center,
    ...params,
  });

export const cylinder = (h = 1, r: number | [number, number] = 1, params: Record<string, any> = {}): ScadObject =>
  object('cylinder')({
    h,
    ...(Array.isArray(r) ? { r1: r[0], r2: r[1] } : { r }),
    center,
    ...params,
  });

export const polyhedron = (points: Vector3D[] = [], paths: number[][] | typeof undef = undef, convexity = 1): ScadObject =>
  object('polyhedron')({
    points,
    paths,
    convexity,
  });

export const rounded_cube = (size: Vector3D | number = 1, radius = 0.125, _params: Record<string, any> = {}): ScadObject => {
  const { center: _center, ...params } = _params;
  const [x, y, z] = typeof size === 'number' ? [size, size, size] : size;
  const maxRadius = Math.min(x, y, z) / 2;
  const r = radius > 0 && radius < maxRadius ? radius : maxRadius / 8;
  const cube = hull(
    sphere(r, params).translate([r, r, r]),
    sphere(r, params).translate([x - r, r, r]),
    sphere(r, params).translate([x - r, y - r, r]),
    sphere(r, params).translate([r, y - r, r]),
    sphere(r, params).translate([r, r, z - r]),
    sphere(r, params).translate([x - r, r, z - r]),
    sphere(r, params).translate([x - r, y - r, z - r]),
    sphere(r, params).translate([r, y - r, z - r]),
  );
  return (_center === undefined ? center : _center) ? cube.translate([-x / 2, -y / 2, -z / 2]) : cube;
};
