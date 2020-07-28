const assert = require('chai').assert;

const S = require('../src/index.js');

describe('Circle', () => {
  it('should create circle with default radius', () => {
    assert.equal(S.circle().serialize(),'circle(r = 1);\n');
  });
  it('should create circle with defined radius', () => {
    assert.equal(S.circle(4).serialize(), 'circle(r = 4);\n');
  });
});

describe('Square', () => {
  it('should create a square with default size', () => {
    assert.equal(S.square().serialize(), 'square(size = [1, 1], center = true);\n');
  });
  it('should create circle with defined single value', () => {
    assert.equal(S.square(8).serialize(), 'square(size = 8, center = true);\n');
  });
  it('should create circle with defined array value', () => {
    assert.equal(S.square([3, 4]).serialize(), 'square(size = [3, 4], center = true);\n');
  });
});

describe('Polygon', () => {
  it('should create a polygon with default values', () => {
    assert.equal(S.polygon().serialize(), 'polygon(points = undef, paths = undef, convexity = 1);\n');
  });
  it('should create a polygon with defineds points no paths', () => {
    assert.equal(S.polygon([[0, 0], [100, 0]]).serialize(), 'polygon(points = [[0, 0], [100, 0]], paths = undef, convexity = 1);\n');
  });
  it('should create a polygon with defineds points and paths', () => {
    assert.equal(S.polygon([[0, 0], [100, 0]], [[2, 3]]).serialize(), 'polygon(points = [[0, 0], [100, 0]], paths = [[2, 3]], convexity = 1);\n');
  });
});

describe('Sphere', () => {
  it('should create a sphere with default radius', () => {
    assert.equal(S.sphere().serialize(), 'sphere(r = 1);\n');
  });
  it('should create a sphere with defined radius', () => {
    assert.equal(S.sphere(6).serialize(), 'sphere(r = 6);\n');
  });
});

describe('Cube', () => {
  it('should create cube with default size', () => {
    assert.equal(S.cube().serialize(), 'cube(size = [1, 1, 1], center = true);\n');
  });
  it('should create cube with defined single value size', () => {
    assert.equal(S.cube(4).serialize(), 'cube(size = 4, center = true);\n');
  });
  it('should create cube with defined vector size', () => {
    assert.equal(S.cube([1, 2, 3]).serialize(), 'cube(size = [1, 2, 3], center = true);\n');
  });
});

describe('Cylinder', () => {
  it('should create a cylinder with default values', () => {
    assert.equal(S.cylinder().serialize(), 'cylinder(h = 1, r = 1, center = true);\n');
  });
  it('should create a cylinder with defined values', () => {
    assert.equal(S.cylinder(6, 3).serialize(), 'cylinder(h = 6, r = 3, center = true);\n');
  });
  it('should create a cylinder with defined values', () => {
    assert.equal(S.cylinder(6, [2, 4]).serialize(), 'cylinder(h = 6, r1 = 2, r2 = 4, center = true);\n');
  });
});

describe('Translate', () => {
  it('should add translate transformation to existing object', () => {
    assert.equal(S.circle().translate([2, 4, 8]).serialize(), 'translate(v = [2, 4, 8])\n{\n  circle(r = 1);\n}\n');
  });
});

describe('Scale', () => {
  it('should add scale transformation to existing object', () => {
    assert.equal(S.circle().scale([0, 4, 0]).serialize(), 'scale(v = [0, 4, 0])\n{\n  circle(r = 1);\n}\n');
  });
});

describe('Resize', () => {
  it('should add resize transformation to existing object', () => {
    assert.equal(S.circle().resize([5, 5, 5]).serialize(), 'resize(v = [5, 5, 5])\n{\n  circle(r = 1);\n}\n');
  });
});

describe('Mirror', () => {
  it('should add mirror transformation to existing object', () => {
    assert.equal(S.circle().mirror([1, 0, 0]).serialize(), 'mirror(v = [1, 0, 0])\n{\n  circle(r = 1);\n}\n');
  });
});

describe('Color', () => {
  it('should add color transformation to existing object', () => {
    assert.equal(S.circle().color('blue').serialize(), 'color(c = "blue", alpha = 1)\n{\n  circle(r = 1);\n}\n');
  });
});
