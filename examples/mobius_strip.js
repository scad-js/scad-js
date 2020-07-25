const S = require('../src/index.js');

const wall = p => S.cylinder({ h: 20, r: 1 })
  .rotate({ a: [p, 0, 0]})
  .translate({v: [0, 40, 0]})
  .rotate({ a: [0, 0, 2 * p] });

const walls = [];

for (let i = 0; i <= 360; i += 5) {
  walls.push(S.hull(wall(i), wall(i + 5)));
}

console.log(S.union(...walls).serialize());
