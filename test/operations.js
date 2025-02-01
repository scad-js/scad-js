import assert from 'node:assert';
import { describe, it } from 'node:test';
import { cube, cylinder, intersection, sphere, union, hull, minkowski, difference, chain_hull } from '../src/index.js';

describe('Union', () => {
  it('Union all aruments together', () => {
    assert.deepEqual(
      union(),
      { type: 'union', children: [] },
    );
    assert.deepEqual(
      union(cube()),
      { type: 'union', children: [cube()] },
    );
    assert.deepEqual(
      union(cube(), sphere(), cylinder()),
      { type: 'union', children: [cube(), sphere(), cylinder()] },
    );
  });
  it('difference all aruments together', () => {
    assert.deepEqual(
      difference(cube(), sphere(), cylinder()),
      { type: 'difference', children: [cube(), sphere(), cylinder()] },
    );
  });
  it('intersection all aruments together', () => {
    assert.deepEqual(
      intersection(cube(), sphere(), cylinder()),
      { type: 'intersection', children: [cube(), sphere(), cylinder()] },
    );
  });
  it('hull all aruments together', () => {
    assert.deepEqual(
      hull(cube(), sphere(), cylinder()),
      { type: 'hull', children: [cube(), sphere(), cylinder()] },
    );
  });
  it('chain_hull all aruments together', () => {
    assert.deepEqual(
      chain_hull(cube(), sphere(), cylinder(), cube()),
      {
        type: 'union', children: [
          { type: 'hull', children: [cube(), sphere()] },
          { type: 'hull', children: [sphere(), cylinder()] },
          { type: 'hull', children: [cylinder(), cube()] },
        ]
      },
    );
  });
  it('minkowski all aruments together', () => {
    assert.deepEqual(
      minkowski(cube(), sphere(), cylinder()),
      { type: 'minkowski', children: [cube(), sphere(), cylinder()] },
    );
  });
});
