import { square } from '../src/index';

describe('disable', () => {
  it('should add disable modifier existing object', () => {
    expect(square().disable()).toEqual(
      {
        type: '*union',
        children: [ square() ],
      },
    );
  });
  it('should add show_only modifier existing object', () => {
    expect(square().show_only()).toEqual(
      {
        type: '!union',
        children: [ square() ],
      },
    );
  });
  it('should add debug modifier existing object', () => {
    expect(square().debug()).toEqual(
      {
        type: '#union',
        children: [ square() ],
      },
    );
  });
  it('should add background modifier existing object', () => {
    expect(square().background()).toEqual(
      {
        type: '%union',
        children: [ square() ],
      },
    );
  });
});
