const assert = require('assert');
const S = require('../src/index.js');

describe('Serialize', () => {
  it('should serialize an object number value', () => {
    assert.equal(
      S.square().serialize({ $fn: 6 }),
      '$fn = 6;\nsquare(size = [1, 1], center = true);\n',
    );
  });
  it('should serialize an object with animation value', () => {
    assert.equal(
      S.square('$t').serialize(),
      'square(size = $t, center = true);\n',
    );
  });
  it('should serialize an object with array animation value', () => {
    assert.equal(
      S.cube(['$t', '2 * $t', 5]).serialize(),
      'cube(size = [$t, 2 * $t, 5], center = true);\n',
    );
  });
  it('should serialize an object with color transformation', () => {
    assert.equal(
      S.cube(8).color('green', 0.6).serialize(),
      'color(c = "green", alpha = 0.6)\n' +
      '{\n' +
      '  cube(size = 8, center = true);\n' +
      '}\n',
    );
  });
  it('should serialize an object number value', () => {
    assert.equal(
      S.square().radius_offset(5).serialize(),
      'offset(r = 5, delta = undef, chamfer = undef)\n' +
      '{\n' +
      '  square(size = [1, 1], center = true);\n' +
      '}\n',
    );
  });
  it('should serialize an object number value', () => {
    assert.equal(
      S.square(5).serialize(),
      'square(size = 5, center = true);\n',
    );
  });
  it('should serialize an object number value', () => {
    assert.equal(
      S.square(8).debug().serialize(),
      '#union()\n{\n  square(size = 8, center = true);\n}\n',
    );
  });
  it('should serialize a transformed object', () => {
    assert.equal(
      S.square([4, 5]).translate([5, 6, 7]).serialize(),
      'translate(v = [5, 6, 7])\n{\n  square(size = [4, 5], center = true);\n}\n',
    );
  });
  it('should serialize a operation', () => {
    assert.equal(
      S.union(S.sphere(), S.cube()).serialize(),
      'union()\n' +
      '{\n' +
      '  sphere(r = 1);\n' +
      '  cube(size = [1, 1, 1], center = true);\n' +
      '}\n',
    );
  });
});
