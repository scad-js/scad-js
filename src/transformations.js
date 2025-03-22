import modifiers from "./modifiers.js";
import serialize from "./serialize.js";
import * as transformations from "./transformations.js";
import { create } from "./utils.js";

const undef = "undef";

const transformation = (type) => (obj, params) =>
  create(
    { ...transformations, ...modifiers, serialize },
    { type, params, children: [obj] },
  );

export const translate = function (v) {
  return transformation("translate")(this, { v });
};

export const translate_x = function (x, multiplier = 1) {
  return transformation("translate")(this, { v: [x * multiplier, 0, 0] });
};

export const translate_y = function (y, multiplier = 1) {
  return transformation("translate")(this, { v: [0, y * multiplier, 0] });
};

export const translate_z = function (z, multiplier = 1) {
  return transformation("translate")(this, { v: [0, 0, z * multiplier] });
};

export const scale = function (v) {
  return transformation("scale")(this, { v });
};

export const scale_x = function (x) {
  return transformation("scale")(this, { v: [x, 1, 1] });
};

export const scale_y = function (y) {
  return transformation("scale")(this, { v: [1, y, 1] });
};

export const scale_z = function (z) {
  return transformation("scale")(this, { v: [1, 1, z] });
};

export const resize = function (v, auto = false) {
  return transformation("resize")(this, { newsize: v, auto });
};

export const mirror = function (v) {
  return transformation("mirror")(this, { v });
};

export const mirror_x = function () {
  return transformation("mirror")(this, { v: [1, 0, 0] });
};

export const mirror_y = function () {
  return transformation("mirror")(this, { v: [0, 1, 0] });
};

export const mirror_z = function () {
  return transformation("mirror")(this, { v: [0, 0, 1] });
};

export const color = function (c, alpha = 1) {
  return transformation("color")(this, { c, alpha });
};

export const rotate = function (a, v = undef) {
  return transformation("rotate")(this, { a, v });
};

export const rotate_x = function (a) {
  return transformation("rotate")(this, { a, v: [1, 0, 0] });
};

export const rotate_y = function (a) {
  return transformation("rotate")(this, { a, v: [0, 1, 0] });
};

export const rotate_z = function (a) {
  return transformation("rotate")(this, { a, v: [0, 0, 1] });
};

export const radius_offset = function (r = undef) {
  return transformation("offset")(this, { r, delta: undef, chamfer: undef });
};

export const delta_offset = function (delta, chamfer = false) {
  return transformation("offset")(this, { r: undef, delta, chamfer });
};

export const projection = function (cut = false) {
  return transformation("projection")(this, { cut });
};

export const linear_extrude = function (height = undef, params = {}) {
  return transformation("linear_extrude")(this, {
    height,
    center: params.center || false,
    convexity: params.convexity || undef,
    twist: params.twist || undef,
    slices: params.slices || undef,
    scale: params.scale || 1,
    $fn: params.$fn || 20,
  });
};

export const rotate_extrude = function (angle = 360, params = {}) {
  return transformation("rotate_extrude")(this, {
    angle,
    convexity: params.convexity || 2,
    $fn: params.$fn || 10,
  });
};
