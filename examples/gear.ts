import { cube, cylinder, union, difference, rotate, translate, type ScadObject } from '../src';
import { writeFileSync } from 'fs';

// Gear parameters
const teeth = 20;
const toothWidth = 5;
const toothHeight = 4;
const innerRadius = 20;
const outerRadius = innerRadius + toothHeight;
const gearThickness = 8;

// Helper: create one tooth
function createTooth(angle) {
  const tooth = cube([toothWidth, toothHeight, gearThickness]);
  return tooth.translate([-(toothWidth / 2), innerRadius, 0]).rotate([0, 0, angle]);
}

// Generate all teeth
function createTeeth() {
  const angleStep = 360 / teeth;
  const teethArray: ScadObject[] = [];
  for (let i = 0; i < teeth; i++) {
    teethArray.push(createTooth(i * angleStep));
  }
  return union(...teethArray);
}

// Create main gear body
const gearBody = cylinder(gearThickness, innerRadius , { center: true });

// Create decorative ring
const decorativeRing = difference(
  cylinder(gearThickness, outerRadius + 4, { center: true }),
  cylinder(gearThickness, outerRadius + 2, { center: true })
);

// Create mounting holes
function createMountingHoles() {
  const holes = [];
  const holeRadius = 2;
  const holeDistance = innerRadius / 2;
  const holeCount = 6;
  const angleStep = 360 / holeCount;

  for (let i = 0; i < holeCount; i++) {
    const angleRad = (i * angleStep * Math.PI) / 180;
    const x = Math.cos(angleRad) * holeDistance;
    const y = Math.sin(angleRad) * holeDistance;
    const hole = cylinder(gearThickness * 2, holeRadius, { center: true }).translate([x, y, 0]);
    holes.push(hole);
  }

  return union(holes);
}

// Final assembly
const gear = difference(
  union(gearBody, createTeeth(), decorativeRing),
  createMountingHoles()
);

// Export to SCAD
const scadData = gear.serialize();
const stlData = await gear.render();

writeFileSync('gear.scad', scadData);
writeFileSync('gear.stl', stlData);