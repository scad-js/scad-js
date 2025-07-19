import { cylinder, cube, difference, union } from '../src';
import { writeFileSync } from 'fs';

const cylinder1 = (x: number) => cylinder(12, x / 2);

const cy3 = (x: number) => union(
    cylinder1(x).rotate([90, 0, 0]),
    cylinder1(x).rotate([0, 90, 0]),
    cylinder1(x).rotate([0, 0, 90]),
);

const cutCube = (x: number) => difference(cube(x), cy3(x - 0.5));

const output = union(...[4, 6, 8, 10].map(x => cutCube(x)));

const scadData = output.serialize({$fn: 20});
const stlData = await output.render({$fn: 20});

writeFileSync('turners_cube.scad', scadData);
writeFileSync('turners_cube.stl', stlData);