const assert = require('assert');

const S = require('../src/index.js');

describe('Union', () => {
  it('Union all aruments together', () => {
    assert.deepEqual(
      S.union(),
      { type: 'union', children: [  ] },
    );
    assert.deepEqual(
      S.union(S.cube()),
      { type: 'union', children: [ S.cube() ] },
    );
    assert.deepEqual(
      S.union(S.cube(), S.sphere(), S.cylinder()),
      { type: 'union', children: [ S.cube(), S.sphere(), S.cylinder() ] },
    );
  });
  it('difference all aruments together', () => {
    assert.deepEqual(
      S.difference(S.cube(), S.sphere(), S.cylinder()),
      { type: 'difference', children: [ S.cube(), S.sphere(), S.cylinder() ] },
    );
  });
  it('intersection all aruments together', () => {
    assert.deepEqual(
      S.intersection(S.cube(), S.sphere(), S.cylinder()),
      { type: 'intersection', children: [ S.cube(), S.sphere(), S.cylinder() ] },
    );
  });
  it('hull all aruments together', () => {
    assert.deepEqual(
      S.hull(S.cube(), S.sphere(), S.cylinder()),
      { type: 'hull', children: [ S.cube(), S.sphere(), S.cylinder() ] },
    );
  });
  it('minkowski all aruments together', () => {
    assert.deepEqual(
      S.minkowski(S.cube(), S.sphere(), S.cylinder()),
      { type: 'minkowski', children: [ S.cube(), S.sphere(), S.cylinder() ] },
    );
  });
});
