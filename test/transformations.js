import assert from 'assert';
import { square, cube } from '../src/index.js';

describe('Translate', () => {
  it('should add translate transformation to existing object', () => {
    assert.deepEqual(
      square().translate([1, 2, 3]),
      {
        type: 'translate',
        params: { v: [1, 2, 3] },
        children: [square()],
      },
    );
    assert.deepEqual(
      square().translate_x(8),
      {
        type: 'translate',
        params: { v: [8, 0, 0] },
        children: [square()],
      },
    );
    assert.deepEqual(
      square().translate_y(4),
      {
        type: 'translate',
        params: { v: [0, 4, 0] },
        children: [square()],
      },
    );
    assert.deepEqual(
      cube().translate_z(6),
      {
        type: 'translate',
        params: { v: [0, 0, 6] },
        children: [cube()],
      },
    );
  });
});

describe('Scale', () => {
  it('should add scale transformation to existing object', () => {
    assert.deepEqual(
      square().scale([5, 2, 3]),
      {
        type: 'scale',
        params: { v: [5, 2, 3] },
        children: [square()],
      },
    );
    assert.deepEqual(
      square().scale_x(1.5),
      {
        type: 'scale',
        params: { v: [1.5, 1, 1] },
        children: [square()],
      },
    );
    assert.deepEqual(
      square().scale_y(2),
      {
        type: 'scale',
        params: { v: [1, 2, 1] },
        children: [square()],
      },
    );
    assert.deepEqual(
      square().scale_z(0.5),
      {
        type: 'scale',
        params: { v: [1, 1, 0.5] },
        children: [square()],
      },
    );
  });
});

describe('Resize', () => {
  it('should add resie transformation to existing object', () => {
    assert.deepEqual(
      square().resize([5, 2, 3]),
      {
        type: 'resize',
        params: { newsize: [5, 2, 3], auto: false },
        children: [square()],
      },
    );
    assert.deepEqual(
      square().resize([5, 2, 3], true),
      {
        type: 'resize',
        params: { newsize: [5, 2, 3], auto: true },
        children: [square()],
      },
    );
  });
});

describe('Mirror', () => {
  it('should add mirror transformation to existing object', () => {
    assert.deepEqual(
      square().mirror([1, 0, 0]),
      {
        type: 'mirror',
        params: { v: [1, 0, 0] },
        children: [square()],
      },
    );
    assert.deepEqual(
      square().mirror_x(),
      {
        type: 'mirror',
        params: { v: [1, 0, 0] },
        children: [square()],
      },
    );
    assert.deepEqual(
      square().mirror_y(),
      {
        type: 'mirror',
        params: { v: [0, 1, 0] },
        children: [square()],
      },
    );
    assert.deepEqual(
      square().mirror_z(),
      {
        type: 'mirror',
        params: { v: [0, 0, 1] },
        children: [square()],
      },
    );
  });
});

describe('Color', () => {
  it('should add color transformation to existing object', () => {
    assert.deepEqual(
      square().color('cerulean'),
      {
        type: 'color',
        params: { c: 'cerulean', alpha: 1 },
        children: [square()],
      },
    );
    assert.deepEqual(
      square().color('cerulean', 0.6),
      {
        type: 'color',
        params: { c: 'cerulean', alpha: 0.6 },
        children: [square()],
      },
    );
  });
});

describe('rotate', () => {
  it('should add rotate transformation to existing object', () => {
    assert.deepEqual(
      square().rotate([1, 0, 0]),
      {
        type: 'rotate',
        params: { a: [1, 0, 0], v: 'undef' },
        children: [square()],
      },
    );
    assert.deepEqual(
      square().rotate(90, [1, 0, 0]),
      {
        type: 'rotate',
        params: { a: 90, v: [1, 0, 0] },
        children: [square()],
      },
    );
    assert.deepEqual(
      square().rotate_x(45),
      {
        type: 'rotate',
        params: { a: 45, v: [1, 0, 0] },
        children: [square()],
      },
    );
    assert.deepEqual(
      square().rotate_y(90),
      {
        type: 'rotate',
        params: { a: 90, v: [0, 1, 0] },
        children: [square()],
      },
    );
    assert.deepEqual(
      square().rotate_z(180),
      {
        type: 'rotate',
        params: { a: 180, v: [0, 0, 1] },
        children: [square()],
      },
    );
  });
});

describe('Radius offset', () => {
  it('should add radius_offset transformation to existing object', () => {
    assert.deepEqual(
      square().radius_offset(),
      {
        type: 'offset',
        params: { r: 'undef', delta: 'undef', chamfer: 'undef' },
        children: [square()],
      },
    );
  });
  it('should add radius_offset transformation to existing object', () => {
    assert.deepEqual(
      square().radius_offset(5),
      {
        type: 'offset',
        params: { r: 5, delta: 'undef', chamfer: 'undef' },
        children: [square()],
      },
    );
  });
});

describe('Delta offset', () => {
  it('should add delta_offset transformation to existing object', () => {
    assert.deepEqual(
      square().delta_offset(8),
      {
        type: 'offset',
        params: { r: 'undef', delta: 8, chamfer: false },
        children: [square()],
      },
    );
    assert.deepEqual(
      square().delta_offset(8),
      {
        type: 'offset',
        params: { r: 'undef', delta: 8, chamfer: false },
        children: [square()],
      },
    );
    assert.deepEqual(
      square().delta_offset(8, true),
      {
        type: 'offset',
        params: { r: 'undef', delta: 8, chamfer: true },
        children: [square()],
      },
    );
  });
});

describe('Projection', () => {
  it('should add radius_offset transformation to existing object', () => {
    assert.deepEqual(
      square().projection(),
      {
        type: 'projection',
        params: { cut: false },
        children: [square()],
      },
    );
    assert.deepEqual(
      square().projection(true),
      {
        type: 'projection',
        params: { cut: true },
        children: [square()],
      },
    );
  });
});


describe('Linear extrude', () => {
  it('should add linear_extrude transformation to existing object', () => {
    assert.deepEqual(
      square().linear_extrude(),
      {
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
        children: [square()],
      },
    );
    assert.deepEqual(
      square().linear_extrude(5),
      {
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
        children: [square()],
      },
    );
    assert.deepEqual(
      square().linear_extrude(5, { center: true, scale: 2 }),
      {
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
        children: [square()],
      },
    );
  });
});

describe('Rotate extrude', () => {
  it('should add linear_extrude transformation to existing object', () => {
    assert.deepEqual(
      square().rotate_extrude(),
      {
        type: 'rotate_extrude',
        params: { angle: 360, convexity: 2, $fn: 10 },
        children: [square()],
      },
    );
    assert.deepEqual(
      square().rotate_extrude(180, { convexity: 4, $fn: 20 }),
      {
        type: 'rotate_extrude',
        params: { angle: 180, convexity: 4, $fn: 20 },
        children: [square()],
      },
    );
  });
});
