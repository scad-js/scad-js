import S from '../src/index';

describe('Serialize', () => {
  it('should serialize an object number value', () => {
    expect(
      S.square().serialize({ $fn: 6 }),
    ).toEqual(
      '$fn = 6;\nsquare(size = [1, 1], center = true);\n',
    );
  });
  it('should serialize an object with animation value', () => {
    expect(
      S.square('$t').serialize(),
    ).toEqual(
      'square(size = $t, center = true);\n',
    );
  });
  it('should serialize an object with array animation value', () => {
    expect(
      S.cube(['$t', '2 * $t', 5]).serialize(),
    ).toEqual(
      'cube(size = [$t, 2 * $t, 5], center = true);\n',
    );
  });
  it('should serialize an object with color transformation', () => {
    expect(
      S.cube(8).color('green', 0.6).serialize(),
    ).toEqual(
      'color(c = "green", alpha = 0.6)\n' +
      '{\n' +
      '  cube(size = 8, center = true);\n' +
      '}\n',
    );
  });
  it('should serialize an object number value', () => {
    expect(
      S.square().radius_offset(5).serialize(),
    ).toEqual(
      'offset(r = 5, delta = undef, chamfer = undef)\n' +
      '{\n' +
      '  square(size = [1, 1], center = true);\n' +
      '}\n',
    );
  });
  it('should serialize an object number value', () => {
    expect(
      S.square(5).serialize(),
    ).toEqual(
      'square(size = 5, center = true);\n',
    );
  });
  it('should serialize an object number value', () => {
    expect(
      S.square(8).debug().serialize(),
    ).toEqual(
      '#union()\n{\n  square(size = 8, center = true);\n}\n',
    );
  });
  it('should serialize a transformed object', () => {
    expect(
      S.square([4, 5]).translate([5, 6, 7]).serialize(),
    ).toEqual(
      'translate(v = [5, 6, 7])\n{\n  square(size = [4, 5], center = true);\n}\n',
    );
  });
  it('should serialize a operation', () => {
    expect(
      S.union(S.sphere(), S.cube()).serialize(),
    ).toEqual(
      'union()\n' +
      '{\n' +
      '  sphere(r = 1);\n' +
      '  cube(size = [1, 1, 1], center = true);\n' +
      '}\n',
    );
  });
});
