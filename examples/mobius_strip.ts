import { cylinder, hull, union, type ScadObject } from '../src';
import { writeFileSync } from 'fs';

const wall = (p: number) => cylinder(20, 1)
  .rotate([p, 0, 0])
  .translate([0, 40, 0])
  .rotate([0, 0, 2 * p]);

const walls: ScadObject[] = [];

for (let i = 0; i <= 360; i += 5) {
    walls.push(hull(wall(i), wall(i + 5)));
}

const mobiusStrip = union(...walls);

const scadData = mobiusStrip.serialize({ $fa: 50 });
const stlData = await mobiusStrip.render({ $fa: 50 });

writeFileSync('mobius_strip.scad', scadData);
writeFileSync('mobius_strip.stl', stlData);