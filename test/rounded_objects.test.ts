import assert from 'assert';
import { rounded_cube, rounded_square } from '../src/index';

const test_rounded_square = (size = 1, r = 0.125) => ({
  type: 'translate',
  params: {
    v: [-size / 2, -size / 2],
  },
  children: [
    {
      type: 'hull',
      children: [
        {
          type: 'translate',
          params: {
            v: [r, r],
          },
          children: [
            {
              type: 'circle',
              params: { r },
            },
          ],
        },
        {
          type: 'translate',
          params: {
            v: [size - r, r],
          },
          children: [
            {
              type: 'circle',
              params: { r },
            },
          ],
        },
        {
          type: 'translate',
          params: {
            v: [size - r, size - r],
          },
          children: [{ type: 'circle', params: { r } }],
        },
        {
          type: 'translate',
          params: {
            v: [r, size - r],
          },
          children: [
            {
              type: 'circle',
              params: { r },
            },
          ],
        },
      ],
    },
  ],
});

const test_rounded_cube = (size = 1, r = 0.125) => ({
  type: 'translate',
  params: {
    v: [-size / 2, -size / 2, -size / 2],
  },
  children: [
    {
      type: 'hull',
      children: [
        {
          type: 'translate',
          params: {
            v: [r, r, r],
          },
          children: [
            {
              type: 'sphere',
              params: { r },
            },
          ],
        },
        {
          type: 'translate',
          params: {
            v: [size - r, r, r],
          },
          children: [
            {
              type: 'sphere',
              params: { r },
            },
          ],
        },
        {
          type: 'translate',
          params: {
            v: [size - r, size - r, r],
          },
          children: [
            {
              type: 'sphere',
              params: { r },
            },
          ],
        },
        {
          type: 'translate',
          params: {
            v: [r, size - r, r],
          },
          children: [
            {
              type: 'sphere',
              params: { r },
            },
          ],
        },
        {
          type: 'translate',
          params: {
            v: [r, r, size - r],
          },
          children: [
            {
              type: 'sphere',
              params: { r },
            },
          ],
        },
        {
          type: 'translate',
          params: {
            v: [size - r, r, size - r],
          },
          children: [
            {
              type: 'sphere',
              params: { r },
            },
          ],
        },
        {
          type: 'translate',
          params: {
            v: [size - r, size - r, size - r],
          },
          children: [
            {
              type: 'sphere',
              params: { r },
            },
          ],
        },
        {
          type: 'translate',
          params: {
            v: [r, size - r, size - r],
          },
          children: [
            {
              type: 'sphere',
              params: { r },
            },
          ],
        },
      ],
    },
  ],
});

describe('Rounded Cube', () => {
  it('should create a rounded cube with default size', () => {
    assert.deepEqual(rounded_cube(), test_rounded_cube());
  });
  it('should create a rounded cube with defined size', () => {
    assert.deepEqual(rounded_cube(12), test_rounded_cube(12));
  });
  it('should create a rounded cube with defined size and radius', () => {
    assert.deepEqual(rounded_cube(12, 0.25), test_rounded_cube(12, 0.25));
  });
  it('should create a rounded cube with defined size and oversized radius', () => {
    assert.deepEqual(rounded_cube(8, 12), test_rounded_cube(8, 0.5));
  });
  it('should create a rounded cube with defined size and undersized radius', () => {
    assert.deepEqual(rounded_cube(8, -1), test_rounded_cube(8, 0.5));
  });
});

describe('Rounded Square', () => {
  it('should create a rounded square with default size', () => {
    assert.deepEqual(rounded_square(), test_rounded_square());
  });
  it('should create a rounded square with defined size and radius', () => {
    assert.deepEqual(rounded_square(4, 0.2), test_rounded_square(4, 0.2));
  });
  it('should create a rounded square with defined size and oversized radius', () => {
    assert.deepEqual(rounded_square(10, 20), test_rounded_square(10, 0.625));
  });
  it('should create a rounded square with defined size and undersized radius', () => {
    assert.deepEqual(rounded_square(10, 0), test_rounded_square(10, 0.625));
  });
});
