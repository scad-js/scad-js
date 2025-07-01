import { describe, it, expect } from 'vitest';
import { circle, square, cube, sphere } from '../src/objects';

describe('Primitive Objects', () => {
  describe('circle', () => {
    it('should create a circle with default radius', () => {
      const result = circle();
      expect(result.type).toBe('circle');
      expect(result.params?.r).toBe(1);
    });

    it('should create a circle with specified radius', () => {
      const result = circle(5);
      expect(result.type).toBe('circle');
      expect(result.params?.r).toBe(5);
    });

    it('should create a circle with additional parameters', () => {
      const result = circle(2, { $fn: 100 });
      expect(result.type).toBe('circle');
      expect(result.params?.r).toBe(2);
      expect(result.params?.$fn).toBe(100);
    });
  });

  describe('square', () => {
    it('should create a square with default size', () => {
      const result = square();
      expect(result.type).toBe('square');
      expect(result.params?.size).toEqual([1, 1]);
      expect(result.params?.center).toBe(true);
    });

    it('should create a square with specified size as number', () => {
      const result = square(5);
      expect(result.type).toBe('square');
      expect(result.params?.size).toBe(5);
      expect(result.params?.center).toBe(true);
    });

    it('should create a square with specified size as array', () => {
      const result = square([3, 4]);
      expect(result.type).toBe('square');
      expect(result.params?.size).toEqual([3, 4]);
      expect(result.params?.center).toBe(true);
    });
  });

  describe('cube', () => {
    it('should create a cube with default size', () => {
      const result = cube();
      expect(result.type).toBe('cube');
      expect(result.params?.size).toEqual([1, 1, 1]);
      expect(result.params?.center).toBe(true);
    });

    it('should create a cube with specified size as number', () => {
      const result = cube(5);
      expect(result.type).toBe('cube');
      expect(result.params?.size).toBe(5);
      expect(result.params?.center).toBe(true);
    });

    it('should create a cube with specified size as array', () => {
      const result = cube([3, 4, 5]);
      expect(result.type).toBe('cube');
      expect(result.params?.size).toEqual([3, 4, 5]);
      expect(result.params?.center).toBe(true);
    });
  });

  describe('sphere', () => {
    it('should create a sphere with default radius', () => {
      const result = sphere();
      expect(result.type).toBe('sphere');
      expect(result.params?.r).toBe(1);
    });

    it('should create a sphere with specified radius', () => {
      const result = sphere(5);
      expect(result.type).toBe('sphere');
      expect(result.params?.r).toBe(5);
    });

    it('should create a sphere with additional parameters', () => {
      const result = sphere(2, { $fn: 100 });
      expect(result.type).toBe('sphere');
      expect(result.params?.r).toBe(2);
      expect(result.params?.$fn).toBe(100);
    });
  });
}); 