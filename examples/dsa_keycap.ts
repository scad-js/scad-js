import { cube, sphere, cylinder, hull, difference, union } from '../src';
import { writeFileSync } from 'fs';

const dsa_base = 15.4;
const das_top = 10;
const stem_height = 2;

const dsa_keycap_full = difference(
    hull(
          cube([dsa_base, dsa_base, 0.1]),
          cube([das_top, das_top, 0.1]).translate([0, 0, 5]),
        ),
    sphere(20.9).translate([0, 0, 24.6]),
);

const half_cross = cube([1.15, 4, stem_height + 1]);

const stem_cross = union(
    half_cross,
    half_cross.rotate([0, 0, 90]),
);
const stem = difference(cylinder(stem_height, 3), stem_cross);

const dsa_keycap = union(
    difference(
          dsa_keycap_full,
          dsa_keycap_full.translate([0, 0, -1.5]).color('blue'),
        ),
    stem.translate([0, 0, 1.5]),
);

const scadData = dsa_keycap.serialize({ $fn: 20 });
const stlData = await dsa_keycap.render({ $fn: 20 });

writeFileSync('dsa_keycap.scad', scadData);
writeFileSync('dsa_keycap.stl', stlData);