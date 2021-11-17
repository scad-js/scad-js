import assert from 'assert';
import { square, union } from '../src/index';

describe('disable', () => {
  const expected = {
    type: '*union',
    children: [square()],
  };

  it('should add disable modifier existing object', () => {
    assert.deepEqual(square().disable(), expected);
  });

  it('should be usable in operations', () => {
    assert.deepEqual(union(square().disable()), {
      type: 'union',
      children: [expected],
    });
  });
});

describe('show_only', () => {
  const expected = {
    type: '!union',
    children: [square()],
  };

  it('should add show_only modifier existing object', () => {
    assert.deepEqual(square().show_only(), expected);
  });

  it('should be usable in operations', () => {
    assert.deepEqual(union(square().show_only()), {
      type: 'union',
      children: [expected],
    });
  });
});

describe('debug', () => {
  const expected = {
    type: '#union',
    children: [square()],
  };

  it('should add debug modifier existing object', () => {
    assert.deepEqual(square().debug(), expected);
  });

  it('should be usable in operations', () => {
    assert.deepEqual(union(square().debug()), {
      type: 'union',
      children: [expected],
    });
  });
});

describe('background', () => {
  const expected = {
    type: '%union',
    children: [square()],
  };

  it('should add background modifier existing object', () => {
    assert.deepEqual(square().background(), expected);
  });

  it('should be usable in operations', () => {
    assert.deepEqual(union(square().background()), {
      type: 'union',
      children: [expected],
    });
  });
});
