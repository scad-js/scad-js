import S from '../src/index';

describe('Circle', () => {
  it('should create circle with default radius', () => {
    expect(
      S.circle(),
    ).toEqual(
      { type: 'circle', params: { r: 1 } },
    );
  });
  it('should create circle with defined radius', () => {
    expect(
      S.circle(16),
    ).toEqual(

      { type: 'circle', params: { r: 16 } },
    );
  });
  it('should create circle with defined radius and optional params', () => {
    expect(
      S.circle(4, { $fn: 6 }),
    ).toEqual(
      { type: 'circle', params: { r: 4, '$fn': 6 } },
    );
    expect(
      S.circle(2, { $fn: 6, $fa: 5}), 
    ).toEqual(

      { type: 'circle', params: { r: 2, '$fa': 5, '$fn': 6 } },
    );
    expect(
      S.circle(1, { $fn: 6, $fa: 5, $fs: 4}),
    ).toEqual(

      { type: 'circle', params: { r: 1, '$fa': 5, '$fn': 6, '$fs': 4 } },
    );
  });
});

describe('Square', () => {
  it('should create a square with default size', () => {
    expect(
      S.square(),
    ).toEqual(

      { type: 'square', params: { size: [1, 1], center: true } },
    );
  });
  it('should create a square with defined size', () => {
    expect(
      S.square(4),
    ).toEqual(

      { type: 'square', params: { size: 4, center: true } },
    );
    expect(
      S.square([8, 3]),
    ).toEqual(

      { type: 'square', params: { size: [8, 3], center: true } },
    );
  });
  it('should create a square with defined size and not centered', () => {
    expect(
      S.square(8, { center: false }),
    ).toEqual(

      { type: 'square', params: { size: 8, center: false } },
    );
  });
});

describe('Polygon', () => {
  it('should create a polygon with default values', () => {
    expect(
      S.polygon(),
    ).toEqual(
      { type: 'polygon', params: { points: 'undef', paths: 'undef', convexity: 1 } },
    );
  });
  it('should create a polygon with defined points', () => {
    expect(
      S.polygon([[0, 0], [4, 5], [6, 8] ]),
    ).toEqual(
      { type: 'polygon', params: { points: [[0,0], [4, 5], [6, 8]] , paths: 'undef', convexity: 1 } },
    );
  });
  it('should create a polygon with defined points and paths', () => {
    expect(
      S.polygon([[0, 0], [4, 5], [6, 8] ], [ 0, 2, 1, 2, 0 ]),
    ).toEqual(
      { type: 'polygon', params: { points: [[0,0], [4, 5], [6, 8]] , paths: [0, 2, 1, 2, 0], convexity: 1 } },
    );
  });
  it('should create a polygon with defined points and paths', () => {
    expect(
      S.polygon([[0, 0], [4, 5], [6, 8] ], [ 0, 2, 1, 2, 0 ], 4),
    ).toEqual(
      { type: 'polygon', params: { points: [[0,0], [4, 5], [6, 8]] , paths: [0, 2, 1, 2, 0], convexity: 4 } },
    );
  });
});

describe('Sphere', () => {
  it('should create a sphere with default radius', () => {
    expect(
      S.sphere(), 
    ).toEqual(
      { type: 'sphere', params: { r: 1 } },
    );
  });
  it('should create a sphere with a defined radius', () => {
    expect(
      S.sphere(8), 
    ).toEqual(
      { type: 'sphere', params: { r: 8 } },
    );
    expect(
      S.sphere(8, { $fn: 4 }), 
    ).toEqual(
      { type: 'sphere', params: { r: 8, $fn: 4 } },
    );
  });
  it('should create a sphere with a defined radius', () => {
    expect(
      S.sphere(8, { $fn: 4 }),
    ).toEqual(
      { type: 'sphere', params: { r: 8, $fn: 4 } },
    );
    expect(
      S.sphere(8, { $fn: 4, $fa: 10 }), 
    ).toEqual(
      { type: 'sphere', params: { r: 8, $fa: 10, $fn: 4 } },
    );
    expect(
      S.sphere(8, { $fn: 4, $fa: 10, $fs: 2 }),
    ).toEqual(
      { type: 'sphere', params: { r: 8, $fa: 10, $fn: 4, $fs: 2 } },
    );
    expect(
      S.sphere(8, { $fn: 0, $fa: 0, $fs: 0 }),
    ).toEqual(
      { type: 'sphere', params: { r: 8, $fa: 0, $fn: 0, $fs: 0 } },
    );
  });
});

describe('Cube', () => {
  it('should create a cube with default size', () => {
    expect(
      S.cube(),
    ).toEqual(
      { type: 'cube', params: { size: [1, 1, 1], center: true } },
    );
  });
  it('should create a cube with defined size', () => {
    expect(
      S.cube(4),
    ).toEqual(
      { type: 'cube', params: { size: 4, center: true } },
    );
    expect(
      S.cube([4, 5, 6]), 
    ).toEqual(
      { type: 'cube', params: { size: [4, 5, 6], center: true } },
    );
  });
  it('should create a cube with defined size not centered', () => {
    expect(
      S.cube(4, { center: false }),
    ).toEqual(
      { type: 'cube', params: { size: 4, center: false } },
    );
  });
});

describe('Cylinder', () => {
  it('should create a cylinder with default size', () => {
    expect(
      S.cylinder(),
    ).toEqual(
      { type: 'cylinder', params: { r: 1, h: 1, center: true } },
    );
  });
  it('should create a cylinder with defined size', () => {
    expect(
      S.cylinder(5, 4),
    ).toEqual(
      { type: 'cylinder', params: { h: 5, r: 4, center: true } },
    );
    expect(
      S.cylinder(5, [3, 5]),
    ).toEqual(
      { type: 'cylinder', params: { h: 5, r1: 3, r2: 5, center: true } },
    );
    expect(
      S.cylinder(5, [3, 5], { $fa: 4 }),
    ).toEqual(
      { type: 'cylinder', params: { h: 5, r1: 3, r2: 5, center: true, $fa: 4 } },
    );
    expect(
      S.cylinder(5, [3, 5], { $fa: 3, $fn: 4, $fs: 5 }),
    ).toEqual(
      { type: 'cylinder', params: { h: 5, r1: 3, r2: 5, center: true, $fa: 3, $fn: 4, $fs: 5  } },
    );
    expect(
      S.cylinder(5, [3, 5], { $fa: 0, $fn: 0, $fs: 0 }),
    ).toEqual(
      { type: 'cylinder', params: { h: 5, r1: 3, r2: 5, center: true, $fa: 0, $fn: 0, $fs: 0   } },
    );
  });
  it('should create a cylinder with defined size and not centered', () => {
    expect(
      S.cylinder(5, 4, { center: false }),
    ).toEqual(
      { type: 'cylinder', params: { h: 5, r: 4, center: false } },
    );
  });
});

describe('Polyhedron', () => {
  it('should create a polyhedron with default values', () => {
    expect(
      S.polyhedron(),
    ).toEqual(
      { type: 'polyhedron', params: { points: 'undef', faces: 'undef', convexity: 1 } },
    );
  });
  it('should create a polyhedron with defined points', () => {
    expect(
      S.polyhedron([[0, 0, 0], [4, 5, 6], [6, 8, 7] ]),
    ).toEqual(
      { type: 'polyhedron', params: { points: [[0,0, 0], [4, 5, 6], [6, 8, 7]] , faces: 'undef', convexity: 1 } },
    );
  });
  it('should create a polyhedron with defined points and paths', () => {
    expect(
      S.polyhedron([[0, 0, 0], [4, 5, 6], [6, 8, 7] ], [ 0, 2, 1, 2, 0 ]),
    ).toEqual(
      { type: 'polyhedron', params: { points: [[0,0, 0], [4, 5, 6], [6, 8, 7]] , faces: [0, 2, 1, 2, 0], convexity: 1 } },
    );
  });
  it('should create a polyhedron with defined points and paths', () => {
    expect(
      S.polyhedron([[0, 0, 0], [4, 5, 0], [6, 8, 0] ], [ 0, 2, 1, 2, 0 ], 4),
    ).toEqual(
      { type: 'polyhedron', params: { points: [[0,0, 0], [4, 5, 0], [6, 8, 0]] , faces: [0, 2, 1, 2, 0], convexity: 4 } },
    );
  });
});

