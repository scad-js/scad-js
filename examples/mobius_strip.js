const S = require('../src/index.js');

const wall = p => S.rotate({ a: [0, 0, 2 * p]}, S.translate({v: [0, 40, 0]}, S.rotate({a: [p, 0, 0]}, S.cylinder({ h: 20, r: 1}))));

const walls = [];

for (let i = 0; i <= 360; i += 5) {
  walls.push(S.hull(wall(i), wall(i + 5)));
}

const output = S.parse(S.union(...walls));

console.log(output);
