import S from '../src/index';

describe('Translate', () => {
  it('should add translate transformation to existing object', () => {
    expect(
      S.square().translate([1, 2, 3]),
    ).toEqual(

      {
        type: 'translate',
        params: { v: [ 1, 2, 3 ] },
        children: [ S.square() ],
      },
    );
    expect(
      S.square().translate_x(8),
    ).toEqual(

      {
        type: 'translate',
        params: { v: [ 8, 0, 0 ] },
        children: [ S.square() ],
      },
    );
    expect(
      S.square().translate_y(4),
    ).toEqual(

      {
        type: 'translate',
        params: { v: [ 0, 4, 0 ] },
        children: [ S.square() ],
      },
    );
    expect(
      S.cube().translate_z(6),
    ).toEqual(
      {
        type: 'translate',
        params: { v: [ 0, 0, 6 ] },
        children: [ S.cube() ],
      },
    );
  });
});

describe('Scale', () => {
  it('should add scale transformation to existing object', () => {
    expect(
      S.square().scale([5, 2, 3]),
    ).toEqual(

      {
        type: 'scale',
        params: { v: [ 5, 2, 3 ] },
        children: [ S.square() ],
      },
    );
    expect(
      S.square().scale_x(1.5),
    ).toEqual(

      {
        type: 'scale',
        params: { v: [ 1.5, 1, 1 ] },
        children: [ S.square() ],
      },
    );
    expect(
      S.square().scale_y(2),
    ).toEqual(

      {
        type: 'scale',
        params: { v: [ 1, 2, 1 ] },
        children: [ S.square() ],
      },
    );
    expect(
      S.square().scale_z(0.5),
    ).toEqual(
      {
        type: 'scale',
        params: { v: [ 1, 1, 0.5 ] },
        children: [ S.square() ],
      },
    );
  });
});

describe('Resize', () => {
  it('should add resie transformation to existing object', () => {
    expect(
      S.square().resize([5, 2, 3]),
    ).toEqual(

      {
        type: 'resize',
        params: { newsize: [ 5, 2, 3 ], auto: false },
        children: [ S.square() ],
      },
    );
    expect(
      S.square().resize([5, 2, 3], true),
    ).toEqual(
      {
        type: 'resize',
        params: { newsize: [ 5, 2, 3 ], auto: true },
        children: [ S.square() ],
      },
    );
  });
});

describe('Mirror', () => {
  it('should add mirror transformation to existing object', () => {
    expect(
      S.square().mirror([1, 0, 0]),
    ).toEqual(
      {
        type: 'mirror',
        params: { v: [ 1, 0, 0 ] },
        children: [ S.square() ],
      },
    );
    expect(
      S.square().mirror_x(),
    ).toEqual(
      {
        type: 'mirror',
        params: { v: [ 1, 0, 0 ] },
        children: [ S.square() ],
      },
    );
    expect(
      S.square().mirror_y(),
    ).toEqual(
      {
        type: 'mirror',
        params: { v: [ 0, 1, 0 ] },
        children: [ S.square() ],
      },
    );
    expect(
      S.square().mirror_z(),
    ).toEqual(
      {
        type: 'mirror',
        params: { v: [ 0, 0, 1 ] },
        children: [ S.square() ],
      },
    );
  });
});

describe('Color', () => {
  it('should add color transformation to existing object', () => {
    expect(
      S.square().color('cerulean'),
    ).toEqual(
      {
        type: 'color',
        params: { c: 'cerulean', alpha: 1 },
        children: [ S.square() ],
      },
    );
    expect(
      S.square().color('cerulean', 0.6),
    ).toEqual(
      {
        type: 'color',
        params: { c: 'cerulean', alpha: 0.6 },
        children: [ S.square() ],
      },
    );
  });
});

describe('rotate', () => {
  it('should add rotate transformation to existing object', () => {
    expect(
      S.square().rotate([1, 0, 0]),
    ).toEqual(
      {
        type: 'rotate',
        params: { a: [ 1, 0, 0 ], v: 'undef' },
        children: [ S.square() ],
      },
    );
    expect(
      S.square().rotate(90, [1, 0, 0]),
    ).toEqual(
      {
        type: 'rotate',
        params: { a: 90, v: [ 1, 0, 0 ] },
        children: [ S.square() ],
      },
    );
    expect(
      S.square().rotate_x(45),
    ).toEqual(
      {
        type: 'rotate',
        params: { a: 45, v: [ 1, 0, 0 ] },
        children: [ S.square() ],
      },
    );
    expect(
      S.square().rotate_y(90),
    ).toEqual(
      {
        type: 'rotate',
        params: { a: 90, v: [ 0, 1, 0 ] },
        children: [ S.square() ],
      },
    );
    expect(
      S.square().rotate_z(180),
    ).toEqual(
      {
        type: 'rotate',
        params: { a: 180, v: [ 0, 0, 1 ] },
        children: [ S.square() ],
      },
    );
  });
});

describe('Radius offset', () => {
  it('should add radius_offset transformation to existing object', () => {
    expect(
      S.square().radius_offset(),
    ).toEqual(
      {
        type: 'offset',
        params: { r: 'undef', delta: 'undef', chamfer: 'undef' },
        children: [ S.square() ],
      },
    );
  });
  it('should add radius_offset transformation to existing object', () => {
    expect(
      S.square().radius_offset(5),
    ).toEqual(
      {
        type: 'offset',
        params: { r: 5, delta: 'undef', chamfer: 'undef' },
        children: [ S.square() ],
      },
    );
  });
});

describe('Delta offset', () => {
  it('should add delta_offset transformation to existing object', () => {
    expect(
      S.square().delta_offset(8),
    ).toEqual(
      {
        type: 'offset',
        params: { r: 'undef', delta: 8, chamfer: false },
        children: [ S.square() ],
      },
    );
    expect(
      S.square().delta_offset(8),
    ).toEqual(
      {
        type: 'offset',
        params: { r: 'undef', delta: 8, chamfer: false },
        children: [ S.square() ],
      },
    );
    expect(
      S.square().delta_offset(8, true),
    ).toEqual(
      {
        type: 'offset',
        params: { r: 'undef', delta: 8, chamfer: true },
        children: [ S.square() ],
      },
    );
  });
});

describe('Projection', () => {
  it('should add radius_offset transformation to existing object', () => {
    expect(
      S.square().projection(),
    ).toEqual(
      {
        type: 'projection',
        params: { cut: false },
        children: [ S.square() ],
      },
    );
    expect(
      S.square().projection(true),
    ).toEqual(
      {
        type: 'projection',
        params: { cut: true },
        children: [ S.square() ],
      },
    );
  });
});


describe('Linear extrude', () => {
  it('should add linear_extrude transformation to existing object', () => {
    expect(
      S.square().linear_extrude(),
    ).toEqual(
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
        children: [ S.square() ],
      },
    );
    expect(
      S.square().linear_extrude(5),
    ).toEqual(
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
        children: [ S.square() ],
      },
    );
    expect(
      S.square().linear_extrude(5, { center: true, scale: 2 } ),
    ).toEqual(
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
        children: [ S.square() ],
      },
    );
  });
});

describe('Rotate extrude', () => {
  it('should add linear_extrude transformation to existing object', () => {
    expect(
      S.square().rotate_extrude(),
    ).toEqual(
      {
        type: 'rotate_extrude',
        params: { angle: 360, convexity: 2, $fn: 10 },
        children: [ S.square() ],
      },
    );
    expect(
      S.square().rotate_extrude(180, { convexity: 4, $fn: 20 }),
    ).toEqual(
      {
        type: 'rotate_extrude',
        params: { angle: 180, convexity: 4, $fn: 20 },
        children: [ S.square() ],
      },
    );
  });
});
