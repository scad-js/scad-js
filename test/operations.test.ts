import S from '../src/index';

describe('Union', () => {
  it('Union all aruments together', () => {
    expect(
      S.union(),
    ).toEqual(
      { type: 'union', children: [  ] },
    );
    expect(
      S.union(S.cube()),
    ).toEqual(
      { type: 'union', children: [ S.cube() ] },
    );
    expect(
      S.union(S.cube(), S.sphere(), S.cylinder()),
    ).toEqual(
      { type: 'union', children: [ S.cube(), S.sphere(), S.cylinder() ] },
    );
  });
  it('difference all aruments together', () => {
    expect(
      S.difference(S.cube(), S.sphere(), S.cylinder()),
    ).toEqual(
      { type: 'difference', children: [ S.cube(), S.sphere(), S.cylinder() ] },
    );
  });
  it('intersection all aruments together', () => {
    expect(
      S.intersection(S.cube(), S.sphere(), S.cylinder()),
    ).toEqual(
      { type: 'intersection', children: [ S.cube(), S.sphere(), S.cylinder() ] },
    );
  });
  it('hull all aruments together', () => {
    expect(
      S.hull(S.cube(), S.sphere(), S.cylinder()),
    ).toEqual(
      { type: 'hull', children: [ S.cube(), S.sphere(), S.cylinder() ] },
    );
  });
  it('chain_hull all aruments together', () => {
    expect(
      S.chain_hull(S.cube(), S.sphere(), S.cylinder(), S.cube()),
    ).toEqual(
      { type: 'union', children: [
        { type: 'hull', children: [ S.cube(), S.sphere() ] },
        { type: 'hull', children: [ S.sphere(), S.cylinder() ] },
        { type: 'hull', children: [ S.cylinder(), S.cube() ] },
      ] },
    );
  });
  it('minkowski all aruments together', () => {
    expect(
      S.minkowski(S.cube(), S.sphere(), S.cylinder()),
    ).toEqual(
      { type: 'minkowski', children: [ S.cube(), S.sphere(), S.cylinder() ] },
    );
  });
});