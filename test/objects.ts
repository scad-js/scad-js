const assert = require('assert');

const S = require('../src/index.js');

describe('Circle', () => {
  it('should create circle with default radius', () => {
    assert.deepEqual(
      S.circle(), 
      { type: 'circle', params: { r: 1 } },
    );
  });
  it('should create circle with defined radius', () => {
    assert.deepEqual(
      S.circle(16), 
      { type: 'circle', params: { r: 16 } },
    );
  });
  it('should create circle with defined radius and optional params', () => {
    assert.deepEqual(
      S.circle(4, { $fn: 6 }), 
      { type: 'circle', params: { r: 4, '$fn': 6 } },
    );
    assert.deepEqual(
      S.circle(2, { $fn: 6, $fa: 5}), 
      { type: 'circle', params: { r: 2, '$fa': 5, '$fn': 6 } },
    );
    assert.deepEqual(
      S.circle(1, { $fn: 6, $fa: 5, $fs: 4}), 
      { type: 'circle', params: { r: 1, '$fa': 5, '$fn': 6, '$fs': 4 } },
    );
  });
});

describe('Square', () => {
  it('should create a square with default size', () => {
    assert.deepEqual(
      S.square(),
      { type: 'square', params: { size: [1, 1], center: true } },
    );
  });
  it('should create a square with defined size', () => {
    assert.deepEqual(
      S.square(4),
      { type: 'square', params: { size: 4, center: true } },
    );
    assert.deepEqual(
      S.square([8, 3]),
      { type: 'square', params: { size: [8, 3], center: true } },
    );
  });
  it('should create a square with defined size and not centered', () => {
    assert.deepEqual(
      S.square(8, { center: false }),
      { type: 'square', params: { size: 8, center: false } },
    );
  });
});

describe('Polygon', () => {
  it('should create a polygon with default values', () => {
    assert.deepEqual(
      S.polygon(),
      { type: 'polygon', params: { points: 'undef', paths: 'undef', convexity: 1 } },
    );
  });
  it('should create a polygon with defined points', () => {
    assert.deepEqual(
      S.polygon([[0, 0], [4, 5], [6, 8] ]),
      { type: 'polygon', params: { points: [[0,0], [4, 5], [6, 8]] , paths: 'undef', convexity: 1 } },
    );
  });
  it('should create a polygon with defined points and paths', () => {
    assert.deepEqual(
      S.polygon([[0, 0], [4, 5], [6, 8] ], [ 0, 2, 1, 2, 0 ]),
      { type: 'polygon', params: { points: [[0,0], [4, 5], [6, 8]] , paths: [0, 2, 1, 2, 0], convexity: 1 } },
    );
  });
  it('should create a polygon with defined points and paths', () => {
    assert.deepEqual(
      S.polygon([[0, 0], [4, 5], [6, 8] ], [ 0, 2, 1, 2, 0 ], 4),
      { type: 'polygon', params: { points: [[0,0], [4, 5], [6, 8]] , paths: [0, 2, 1, 2, 0], convexity: 4 } },
    );
  });
});

describe('Sphere', () => {
  it('should create a sphere with default radius', () => {
    assert.deepEqual(
      S.sphere(), 
      { type: 'sphere', params: { r: 1 } },
    );
  });
  it('should create a sphere with a defined radius', () => {
    assert.deepEqual(
      S.sphere(8), 
      { type: 'sphere', params: { r: 8 } },
    );
    assert.deepEqual(
      S.sphere(8, { $fn: 4 }), 
      { type: 'sphere', params: { r: 8, $fn: 4 } },
    );
  });
  it('should create a sphere with a defined radius', () => {
    assert.deepEqual(
      S.sphere(8, { $fn: 4 }), 
      { type: 'sphere', params: { r: 8, $fn: 4 } },
    );
    assert.deepEqual(
      S.sphere(8, { $fn: 4, $fa: 10 }), 
      { type: 'sphere', params: { r: 8, $fa: 10, $fn: 4 } },
    );
    assert.deepEqual(
      S.sphere(8, { $fn: 4, $fa: 10, $fs: 2 }),
      { type: 'sphere', params: { r: 8, $fa: 10, $fn: 4, $fs: 2 } },
    );
    assert.deepEqual(
      S.sphere(8, { $fn: 0, $fa: 0, $fs: 0 }),
      { type: 'sphere', params: { r: 8, $fa: 0, $fn: 0, $fs: 0 } },
    );
  });
});

describe('Cube', () => {
  it('should create a cube with default size', () => {
    assert.deepEqual(
      S.cube(), 
      { type: 'cube', params: { size: [1, 1, 1], center: true } },
    );
  });
  it('should create a cube with defined size', () => {
    assert.deepEqual(
      S.cube(4), 
      { type: 'cube', params: { size: 4, center: true } },
    );
    assert.deepEqual(
      S.cube([4, 5, 6]), 
      { type: 'cube', params: { size: [4, 5, 6], center: true } },
    );
  });
  it('should create a cube with defined size not centered', () => {
    assert.deepEqual(
      S.cube(4, { center: false }), 
      { type: 'cube', params: { size: 4, center: false } },
    );
  });
});

describe('Cylinder', () => {
  it('should create a cylinder with default size', () => {
    assert.deepEqual(
      S.cylinder(), 
      { type: 'cylinder', params: { r: 1, h: 1, center: true } },
    );
  });
  it('should create a cylinder with defined size', () => {
    assert.deepEqual(
      S.cylinder(5, 4),
      { type: 'cylinder', params: { h: 5, r: 4, center: true } },
    );
    assert.deepEqual(
      S.cylinder(5, [3, 5]),
      { type: 'cylinder', params: { h: 5, r1: 3, r2: 5, center: true } },
    );
    assert.deepEqual(
      S.cylinder(5, [3, 5], { $fa: 4 }),
      { type: 'cylinder', params: { h: 5, r1: 3, r2: 5, center: true, $fa: 4 } },
    );
    assert.deepEqual(
      S.cylinder(5, [3, 5], { $fa: 3, $fn: 4, $fs: 5 }),
      { type: 'cylinder', params: { h: 5, r1: 3, r2: 5, center: true, $fa: 3, $fn: 4, $fs: 5  } },
    );
    assert.deepEqual(
      S.cylinder(5, [3, 5], { $fa: 0, $fn: 0, $fs: 0 }),
      { type: 'cylinder', params: { h: 5, r1: 3, r2: 5, center: true, $fa: 0, $fn: 0, $fs: 0   } },
    );
  });
  it('should create a cylinder with defined size and not centered', () => {
    assert.deepEqual(
      S.cylinder(5, 4, { center: false }),
      { type: 'cylinder', params: { h: 5, r: 4, center: false } },
    );
  });
});

describe('Polyhedron', () => {
  it('should create a polyhedron with default values', () => {
    assert.deepEqual(
      S.polyhedron(),
      { type: 'polyhedron', params: { points: 'undef', paths: 'undef', convexity: 1 } },
    );
  });
  it('should create a polyhedron with defined points', () => {
    assert.deepEqual(
      S.polyhedron([[0, 0, 0], [4, 5, 6], [6, 8, 7] ]),
      { type: 'polyhedron', params: { points: [[0,0, 0], [4, 5, 6], [6, 8, 7]] , paths: 'undef', convexity: 1 } },
    );
  });
  it('should create a polyhedron with defined points and paths', () => {
    assert.deepEqual(
      S.polyhedron([[0, 0, 0], [4, 5, 6], [6, 8, 7] ], [ 0, 2, 1, 2, 0 ]),
      { type: 'polyhedron', params: { points: [[0,0, 0], [4, 5, 6], [6, 8, 7]] , paths: [0, 2, 1, 2, 0], convexity: 1 } },
    );
  });
  it('should create a polyhedron with defined points and paths', () => {
    assert.deepEqual(
      S.polyhedron([[0, 0, 0], [4, 5, 0], [6, 8, 0] ], [ 0, 2, 1, 2, 0 ], 4),
      { type: 'polyhedron', params: { points: [[0,0, 0], [4, 5, 0], [6, 8, 0]] , paths: [0, 2, 1, 2, 0], convexity: 4 } },
    );
  });
});
