const { cylinder, hull, union } = require('../src/index.js');

const wall = p => cylinder(20, 1)
  .rotate([p, 0, 0])
  .translate([0, 40, 0])
  .rotate([0, 0, 2 * p]);

const walls = [];

for (let i = 0; i <= 360; i += 5) {
  walls.push(hull(wall(i), wall(i + 5)));
}

console.log(union(...walls).serialize({ $fa: 200 }));
