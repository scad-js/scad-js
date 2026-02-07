import { describe, expect, it } from 'vitest';
import * as S from '../src';

describe('Serialize', () => {
  it('should serialize an object with number value', () => {
    expect(S.square().serialize()).toBe('square(size = [1, 1], center = true);\n');
  });

  it('should serialize an object with animation value', () => {
    // Cast to any to allow string values for testing
    expect((S.square as any)('$t').serialize()).toBe('square(size = $t, center = true);\n');
  });

  it('should serialize an object with array animation value', () => {
    // Cast to any to allow string values for testing
    expect((S.cube as any)(['$t', '2 * $t', 5]).serialize()).toBe('cube(size = [$t, 2 * $t, 5], center = true);\n');
  });

  it('should serialize an object with color transformation', () => {
    expect(S.cube(8).color('green', 0.6).serialize()).toBe('color(c = "green", alpha = 0.6)\n' + '{\n' + '  cube(size = 8, center = true);\n' + '}\n');
  });

  it('should serialize an object with radius offset', () => {
    // Access radius_offset through the index signature to avoid type error
    const square = S.square();
    const result = (square as any).radius_offset(5).serialize();
    expect(result).toBe('offset(r = 5, delta = undef, chamfer = undef)\n' + '{\n' + '  square(size = [1, 1], center = true);\n' + '}\n');
  });

  it('should serialize a square with numeric size', () => {
    expect(S.square(5).serialize()).toBe('square(size = 5, center = true);\n');
  });

  it('should serialize an object with debug modifier', () => {
    expect(S.square(8).debug().serialize()).toBe('#union()\n{\n  square(size = 8, center = true);\n}\n');
  });

  it('should serialize a transformed object', () => {
    expect(S.square([4, 5]).translate([5, 6, 7]).serialize()).toBe('translate(v = [5, 6, 7])\n{\n  square(size = [4, 5], center = true);\n}\n');
  });

  it('should serialize an operation', () => {
    expect(S.union(S.sphere(), S.cube()).serialize()).toBe('union()\n' + '{\n' + '  sphere(r = 1);\n' + '  cube(size = [1, 1, 1], center = true);\n' + '}\n');
  });

  it('should handle serialize arguments', () => {
    expect(S.square(5).serialize({ $fn: 10, $fa: 10, $fs: 10 })).toBe('$fn = 10;\n' + '$fa = 10;\n' + '$fs = 10;\n' + 'square(size = 5, center = true);\n');
  });

  describe('nested array serialization', () => {
    it('should serialize polygon points as nested arrays', () => {
      const model = S.polygon([
        [0, 50],
        [50, -50],
        [-50, -50],
      ]);
      expect(model.serialize()).toBe('polygon(points = [[0, 50], [50, -50], [-50, -50]], paths = undef, convexity = 1);\n');
    });

    it('should serialize polygon with explicit paths as nested arrays', () => {
      const model = S.polygon(
        [
          [0, 0],
          [10, 0],
          [10, 10],
          [0, 10],
        ],
        [[0, 1, 2, 3]],
      );
      expect(model.serialize()).toBe('polygon(points = [[0, 0], [10, 0], [10, 10], [0, 10]], paths = [[0, 1, 2, 3]], convexity = 1);\n');
    });

    it('should serialize polygon with multiple paths', () => {
      const model = S.polygon(
        [
          [0, 0],
          [10, 0],
          [10, 10],
          [0, 10],
          [3, 3],
          [7, 3],
          [7, 7],
          [3, 7],
        ],
        [
          [0, 1, 2, 3],
          [4, 5, 6, 7],
        ],
      );
      expect(model.serialize()).toBe(
        'polygon(points = [[0, 0], [10, 0], [10, 10], [0, 10], [3, 3], [7, 3], [7, 7], [3, 7]], paths = [[0, 1, 2, 3], [4, 5, 6, 7]], convexity = 1);\n',
      );
    });

    it('should serialize polyhedron points and faces as nested arrays', () => {
      const model = S.polyhedron(
        [
          [0, 0, 0],
          [10, 0, 0],
          [5, 10, 0],
          [5, 5, 10],
        ],
        [
          [0, 1, 2],
          [0, 1, 3],
          [1, 2, 3],
          [0, 2, 3],
        ],
      );
      expect(model.serialize()).toBe(
        'polyhedron(points = [[0, 0, 0], [10, 0, 0], [5, 10, 0], [5, 5, 10]], paths = [[0, 1, 2], [0, 1, 3], [1, 2, 3], [0, 2, 3]], convexity = 1);\n',
      );
    });

    it('should serialize multmatrix with nested matrix array', () => {
      const matrix = [
        [1, 0, 0, 10],
        [0, 1, 0, 20],
        [0, 0, 1, 30],
        [0, 0, 0, 1],
      ];
      const model = S.cube(5).multmatrix(matrix);
      expect(model.serialize()).toBe('multmatrix(m = [[1, 0, 0, 10], [0, 1, 0, 20], [0, 0, 1, 30], [0, 0, 0, 1]])\n' + '{\n' + '  cube(size = 5, center = true);\n' + '}\n');
    });

    it('should serialize polygon with negative and decimal coordinates', () => {
      const model = S.polygon([
        [-1.5, 2.7],
        [3.14, -0.5],
        [0, 100],
      ]);
      expect(model.serialize()).toBe('polygon(points = [[-1.5, 2.7], [3.14, -0.5], [0, 100]], paths = undef, convexity = 1);\n');
    });

    it('should serialize polygon with single point', () => {
      const model = S.polygon([[5, 10]]);
      expect(model.serialize()).toBe('polygon(points = [[5, 10]], paths = undef, convexity = 1);\n');
    });

    it('should preserve flat arrays in non-nested parameters', () => {
      expect(S.cube([2, 3, 4]).serialize()).toBe('cube(size = [2, 3, 4], center = true);\n');
    });
  });

  it('should handle all OpenSCAD special variables', () => {
    const vars = {
      $fa: 12,
      $fs: 2,
      $fn: 50,
      $t: 0.5,
      $vpr: [30, 45, 60] as [number, number, number],
      $vpt: [10, 20, 30] as [number, number, number],
      $vpd: 140,
      $vpf: 22.5,
      $children: 3,
      $preview: true,
    };

    expect(S.cube(10).serialize(vars)).toBe(
      '$fa = 12;\n' +
        '$fs = 2;\n' +
        '$fn = 50;\n' +
        '$t = 0.5;\n' +
        '$vpr = [30, 45, 60];\n' +
        '$vpt = [10, 20, 30];\n' +
        '$vpd = 140;\n' +
        '$vpf = 22.5;\n' +
        '$children = 3;\n' +
        '$preview = true;\n' +
        'cube(size = 10, center = true);\n',
    );
  });
});
