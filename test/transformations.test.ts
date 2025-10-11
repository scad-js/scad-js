import { describe, it, expect } from 'vitest';
import * as S from '../src';

describe('Transformations', () => {
  describe('translate', () => {
    it('should add translate transformation to existing object', () => {
      expect(S.square().translate([1, 2, 3])).toMatchObject({
        type: 'translate',
        params: { v: [1, 2, 3] },
        children: [S.square()],
      });
    });

    it('should translate along x-axis', () => {
      const square = S.square();
      expect(square.translate_x(8)).toMatchObject({
        type: 'translate',
        params: { v: [8, 0, 0] },
        children: [S.square()],
      });
    });

    it('should translate along y-axis', () => {
      const square = S.square();
      expect(square.translate_y(4)).toMatchObject({
        type: 'translate',
        params: { v: [0, 4, 0] },
        children: [S.square()],
      });
    });

    it('should translate along z-axis', () => {
      const cube = S.cube();
      expect(cube.translate_z(6)).toMatchObject({
        type: 'translate',
        params: { v: [0, 0, 6] },
        children: [S.cube()],
      });
    });
  });

  describe('scale', () => {
    it('should add scale transformation to existing object', () => {
      expect(S.square().scale([5, 2, 3])).toMatchObject({
        type: 'scale',
        params: { v: [5, 2, 3] },
        children: [S.square()],
      });
    });

    it('should scale along x-axis', () => {
      const square = S.square();
      expect(square.scale_x(1.5)).toMatchObject({
        type: 'scale',
        params: { v: [1.5, 1, 1] },
        children: [S.square()],
      });
    });

    it('should scale along y-axis', () => {
      const square = S.square();
      expect(square.scale_y(2)).toMatchObject({
        type: 'scale',
        params: { v: [1, 2, 1] },
        children: [S.square()],
      });
    });

    it('should scale along z-axis', () => {
      const square = S.square();
      expect(square.scale_z(0.5)).toMatchObject({
        type: 'scale',
        params: { v: [1, 1, 0.5] },
        children: [S.square()],
      });
    });
  });

  describe('resize', () => {
    it('should add resize transformation to existing object', () => {
      expect(S.square().resize([5, 2, 3])).toMatchObject({
        type: 'resize',
        params: { newsize: [5, 2, 3], auto: false },
        children: [S.square()],
      });
    });

    it('should resize with auto parameter', () => {
      const square = S.square();
      expect(square.resize([5, 2, 3], true)).toMatchObject({
        type: 'resize',
        params: { newsize: [5, 2, 3], auto: true },
        children: [S.square()],
      });
    });
  });

  describe('mirror', () => {
    it('should add mirror transformation to existing object', () => {
      expect(S.square().mirror([1, 0, 0])).toMatchObject({
        type: 'mirror',
        params: { v: [1, 0, 0] },
        children: [S.square()],
      });
    });

    it('should mirror along x-axis', () => {
      const square = S.square();
      expect(square.mirror_x()).toMatchObject({
        type: 'mirror',
        params: { v: [1, 0, 0] },
        children: [S.square()],
      });
    });

    it('should mirror along y-axis', () => {
      const square = S.square();
      expect(square.mirror_y()).toMatchObject({
        type: 'mirror',
        params: { v: [0, 1, 0] },
        children: [S.square()],
      });
    });

    it('should mirror along z-axis', () => {
      const square = S.square();
      expect(square.mirror_z()).toMatchObject({
        type: 'mirror',
        params: { v: [0, 0, 1] },
        children: [S.square()],
      });
    });
  });

  describe('color', () => {
    it('should add color transformation to existing object', () => {
      expect(S.square().color('cerulean')).toMatchObject({
        type: 'color',
        params: { c: 'cerulean', alpha: 1 },
        children: [S.square()],
      });
    });

    it('should add color with alpha value', () => {
      expect(S.square().color('cerulean', 0.6)).toMatchObject({
        type: 'color',
        params: { c: 'cerulean', alpha: 0.6 },
        children: [S.square()],
      });
    });
  });

  describe('rotate', () => {
    it('should add rotate transformation with vector', () => {
      expect(S.square().rotate([1, 0, 0])).toMatchObject({
        type: 'rotate',
        params: { a: [1, 0, 0], v: 'undef' },
        children: [S.square()],
      });
    });

    it('should add rotate transformation with angle and vector', () => {
      const square = S.square();
      expect(square.rotate(90, [1, 0, 0])).toMatchObject({
        type: 'rotate',
        params: { a: 90, v: [1, 0, 0] },
        children: [S.square()],
      });
    });

    it('should rotate around x-axis', () => {
      const square = S.square();
      expect(square.rotate_x(45)).toMatchObject({
        type: 'rotate',
        params: { a: 45, v: [1, 0, 0] },
        children: [S.square()],
      });
    });

    it('should rotate around y-axis', () => {
      const square = S.square();
      expect(square.rotate_y(90)).toMatchObject({
        type: 'rotate',
        params: { a: 90, v: [0, 1, 0] },
        children: [S.square()],
      });
    });

    it('should rotate around z-axis', () => {
      const square = S.square();
      expect(square.rotate_z(180)).toMatchObject({
        type: 'rotate',
        params: { a: 180, v: [0, 0, 1] },
        children: [S.square()],
      });
    });
  });

  describe('offset transformations', () => {
    it('should add radius_offset transformation with default values', () => {
      const square = S.square();
      expect(square.radius_offset()).toMatchObject({
        type: 'offset',
        params: { r: 'undef', delta: 'undef', chamfer: 'undef' },
        children: [S.square()],
      });
    });

    it('should add radius_offset transformation with specific radius', () => {
      const square = S.square();
      expect(square.radius_offset(5)).toMatchObject({
        type: 'offset',
        params: { r: 5, delta: 'undef', chamfer: 'undef' },
        children: [S.square()],
      });
    });

    it('should add delta_offset transformation with default chamfer', () => {
      const square = S.square();
      expect(square.delta_offset(8)).toMatchObject({
        type: 'offset',
        params: { r: 'undef', delta: 8, chamfer: false },
        children: [S.square()],
      });
    });

    it('should add delta_offset transformation with true chamfer', () => {
      const square = S.square();
      expect(square.delta_offset(8, true)).toMatchObject({
        type: 'offset',
        params: { r: 'undef', delta: 8, chamfer: true },
        children: [S.square()],
      });
    });
  });
  
  describe('projection', () => {
    it('should add projection transformation with default cut', () => {
      const square = S.square();
      expect(square.projection()).toMatchObject({
        type: 'projection',
        params: { cut: false },
        children: [S.square()],
      });
    });

    it('should add projection transformation with cut=true', () => {
      const square = S.square();
      expect(square.projection(true)).toMatchObject({
        type: 'projection',
        params: { cut: true },
        children: [S.square()],
      });
    });
  });
  
  describe('extrusions', () => {
    it('should add linear_extrude transformation with default values', () => {
      const square = S.square();
      expect(square.linear_extrude()).toMatchObject({
        type: 'linear_extrude',
        params: {
          height: 'undef',
          center: false,
          convexity: 'undef',
          twist: 'undef',
          slices: 'undef',
          scale: 1,
          $fn: 20,
        },
        children: [S.square()],
      });
    });

    it('should add linear_extrude transformation with height', () => {
      const square = S.square();
      expect(square.linear_extrude(5)).toMatchObject({
        type: 'linear_extrude',
        params: {
          height: 5,
          center: false,
          convexity: 'undef',
          twist: 'undef',
          slices: 'undef',
          scale: 1,
          $fn: 20,
        },
        children: [S.square()],
      });
    });

    it('should add linear_extrude transformation with additional parameters', () => {
      const square = S.square();
      expect(square.linear_extrude(5, { center: true, scale: 2 })).toMatchObject({
        type: 'linear_extrude',
        params: {
          height: 5,
          center: true,
          convexity: 'undef',
          twist: 'undef',
          slices: 'undef',
          scale: 2,
          $fn: 20,
        },
        children: [S.square()],
      });
    });

    it('should add rotate_extrude transformation with default values', () => {
      const square = S.square();
      expect(square.rotate_extrude()).toMatchObject({
        type: 'rotate_extrude',
        params: { angle: 360, convexity: 2, $fn: 10 },
        children: [S.square()],
      });
    });

    it('should add rotate_extrude transformation with angle and parameters', () => {
      const square = S.square();
      expect(square.rotate_extrude(180, { convexity: 4, $fn: 20 })).toMatchObject({
        type: 'rotate_extrude',
        params: { angle: 180, convexity: 4, $fn: 20 },
        children: [S.square()],
      });
    });
  });
}); 