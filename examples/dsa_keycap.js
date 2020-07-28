const S = require('../src/index.js');

const dsa_base = 15.4;
const das_top = 10;

const dsa_keycap_full = S.difference(
  S.hull(S.cube([dsa_base, dsa_base, 0.1]), S.cube([das_top, das_top, 0.1]).translate([0, 0, 5])),
  S.sphere(20.9).translate([0, 0, 24.6]),
);


const stem_height = 2; 
const half_cross = S.cube([1.15, 4, stem_height + 1]);
const stem_cross = S.union(
  half_cross,
  half_cross.rotate([0, 0, 90]),
);
const stem = S.difference(S.cylinder(stem_height, 3), stem_cross);

const dsa_keycap = S.union(
  S.difference(
    dsa_keycap_full,
    dsa_keycap_full.translate([0, 0, -1.5]).color("blue"),
  ),
  stem.translate([0, 0, 1.5]),
)

console.log(dsa_keycap.serialize());
