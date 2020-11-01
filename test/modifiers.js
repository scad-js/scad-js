const assert = require('assert');
const S = require('../src/index.js');

describe('disable', () => {
  it('should add disable modifier existing object', () => {
    assert.deepEqual(
      S.square().disable(),
      {
        type: '*union',
        children: [ S.square() ],
      },
    );
  });
  it('should add show_only modifier existing object', () => {
    assert.deepEqual(
      S.square().show_only(),
      {
        type: '!union',
        children: [ S.square() ],
      },
    );
  });
  it('should add debug modifier existing object', () => {
    assert.deepEqual(
      S.square().debug(),
      {
        type: '#union',
        children: [ S.square() ],
      },
    );
  });
  it('should add background modifier existing object', () => {
    assert.deepEqual(
      S.square().background(),
      {
        type: '%union',
        children: [ S.square() ],
      },
    );
  });
});
