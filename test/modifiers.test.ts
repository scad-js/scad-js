import assert from 'assert';
import { square } from '../src/index';

describe('disable', () => {
  it('should add disable modifier existing object', () => {
    assert.deepEqual(square().disable(), {
      type: '*union',
      children: [square()],
    });
  });
  it('should add show_only modifier existing object', () => {
    assert.deepEqual(square().show_only(), {
      type: '!union',
      children: [square()],
    });
  });
  it('should add debug modifier existing object', () => {
    assert.deepEqual(square().debug(), {
      type: '#union',
      children: [square()],
    });
  });
  it('should add background modifier existing object', () => {
    assert.deepEqual(square().background(), {
      type: '%union',
      children: [square()],
    });
  });
});
