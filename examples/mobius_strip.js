const S = require('../src/index.js');

const wall = p => S.cylinder(20, 1)
  .rotate([p, 0, 0])
  .translate([0, 40, 0])
  .rotate([0, 0, 2 * p]);

const walls = [];

for (let i = 0; i <= 360; i += 5) {
  walls.push(S.hull(wall(i), wall(i + 5)));
}

console.log(S.union(...walls).serialize());
