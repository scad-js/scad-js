import S from '../src/index';

const rounded_square = (size = 1, r = 0.125) => ({
  type:'translate',
  params:{
    v: [ -size / 2, -size / 2 ],
  },
  children: [
    {
      type: 'hull',
      children: [
        {
          type: 'translate',
          params: {
            v: [ r, r ],
          },
          children: [
            {
              type: 'circle',
              params: { r },
            },
          ],
        },
        { type: 'translate',
          params: 
          {
            v: [ size - r, r ],
          },
          children: [
            {
              type: 'circle',
              params: { r },
            },
          ],
        },
        {
          type:'translate',
          params: {
            v: [ size -r, size -r ],
          }, children: [
            { type: 'circle',
              params: { r },
            },
          ],
        },
        {
          type: 'translate',
          params: {
            v: [ r, size - r],
          },
          children: [
            {
              type: 'circle',
              params:{ r },
            },
          ],
        },
      ],
    },
  ],
});

const rounded_cube = (size = 1, r = 0.125) => ({
  type: 'translate',
  params: {
    v: [ -size / 2, -size / 2, -size / 2 ],
  },
  children: [
    {
      type: 'hull',
      children: [
        {
          type: 'translate',
          params: {
            v: [ r, r, r ],
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
            v: [ size - r, r, r ],
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
            v: [ size - r, size - r, r ],
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
            v: [ r, size - r, r ],
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
            v: [ r, r, size - r ],
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
            v: [ size - r, r, size - r ],
          },
          children: [
            {
              type: 'sphere',
              'params': { r },
            },
          ],
        },
        {
          type: 'translate',
          params: {
            v: [ size - r, size - r, size - r ],
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
            v: [ r, size - r, size - r ],
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
    expect(
      S.rounded_cube(),
    ).toEqual(
      rounded_cube(),
    );
  });
  it('should create a rounded cube with defined size', () => {
    expect(
      S.rounded_cube(12),
    ).toEqual(
      rounded_cube(12),
    );
  });
  it('should create a rounded cube with defined size and radius', () => {
    expect(
      S.rounded_cube(12, 0.25),
    ).toEqual(
      rounded_cube(12, 0.25),
    );
  });
  it('should create a rounded cube with defined size and oversized radius', () => {
    expect(
      S.rounded_cube(8, 12),
    ).toEqual(
      rounded_cube(8, 0.5),
    );
  });
  it('should create a rounded cube with defined size and undersized radius', () => {
    expect(
      S.rounded_cube(8, -1),
    ).toEqual(
      rounded_cube(8, 0.5),
    );
  });
});

describe('Rounded Square', () => {
  it('should create a rounded square with default size', () => {
    expect(
      S.rounded_square(),
    ).toEqual(
      rounded_square(),
    );
  });
  it('should create a rounded square with defined size and radius', () => {
    expect(
      S.rounded_square(4, 0.2),
    ).toEqual(
      rounded_square(4, 0.2),
    );
  });
  it('should create a rounded square with defined size and oversized radius', () => {
    expect(
      S.rounded_square(10, 20),
    ).toEqual(
      rounded_square(10, 0.625),
    );
  });
  it('should create a rounded square with defined size and undersized radius', () => {
    expect(
      S.rounded_square(10, 0),
    ).toEqual(
      rounded_square(10, 0.625),
    );
  });
});
