<h1 align="center">
  <img src="https://i.imgur.com/IiI57LR.png" alt="scad-js" height="128"> SCAD-JS
</h1>

> **scad-js** transpile your TypeScript to **OpenSCAD** letting you create programmatic 3D solid models with the familiar TypeScript/JavaScript syntax.

<p align="center">
  <a href="https://www.npmjs.com/package/scad-js">
    <img alt="Latest release" src="https://img.shields.io/npm/v/scad-js?style=for-the-badge">
    <img alt="Codecov coverage" src="https://img.shields.io/codecov/c/github/scad-js/scad-js?style=for-the-badge">
    <img alt="Build passing" src="https://img.shields.io/travis/scad-js/scad-js?style=for-the-badge">
  </a>
  <a href="https://www.npmjs.com/package/scad-js">
    <img alt="scad-js demo" src="https://i.imgur.com/GhjNUxM.gif">
  </a>
</p>

**OpenSCAD** is an amazing software for creating solid 3D CAD objects, but modeling with the **OpenSCAD** language can be really cumbersome and limited.

**scad-js** overcomes these limitations with the power of TypeScript, providing full type safety for your 3D models.

## Getting started
First make sure you have [OpenSCAD](https://www.openscad.org/downloads.html) installed on your system, we will use it to visualize the model.

You can create a new project from scratch:

```bash
mkdir my-scad-project
cd my-scad-project
bun init -y
bun add scad-js typescript
```

Or clone the starter template:

```bash
git clone https://github.com/20lives/scad-js-starter.git my-scad-js-project
cd my-scad-js-project
bun install
```

## Using with TypeScript

Create a simple model with TypeScript:

```typescript
import { cube, sphere, cylinder, difference, union } from 'scad-js';
import * as fs from 'fs';

// Create a base cube
const base = cube(10).translate([0, 0, 0]);

// Create a sphere for the top
const top = sphere(3).translate([0, 0, 10]);

// Create cylindrical holes
const hole1 = cylinder(20, 1).translate([3, 3, -5]);
const hole2 = cylinder(20, 1).translate([-3, 3, -5]);
const hole3 = cylinder(20, 1).translate([3, -3, -5]);
const hole4 = cylinder(20, 1).translate([-3, -3, -5]);

// Combine everything using operations
const model = difference(
  union(base, top),
  hole1, hole2, hole3, hole4
);

// Serialize to OpenSCAD code
const scadCode = model.serialize();

// Save the result to a file
fs.writeFileSync('model.scad', scadCode);
```

Then run:

```bash
bun run your-model.ts
```

This will generate an OpenSCAD file that you can open and render.

## Documentation

For detailed documentation on how to use scad-js visit [scad-js-docs](https://github.com/scad-js/scad-js-docs), you can also look at the official [OpenSCAD Documentation](https://www.openscad.org/documentation.html) page.

## Type Safety

scad-js provides TypeScript definitions that help you catch errors early:

- Vector dimensions ([2D] or [3D]) are type-checked
- SCAD primitives and operations have correct parameter types
- Transformation methods are properly typed
- Intellisense support in most editors

## Examples

Here are some examples to help you get started with scad-js:

### Simple Example

This example demonstrates basic operations like union, difference, and combining primitive shapes:

```typescript
import { cube, sphere, cylinder, difference, union } from 'scad-js';
import * as fs from 'fs';

// Create a simple model with TypeScript
const createModel = (): string => {
  // Create a base cube
  const base = cube(10).translate([0, 0, 0]);
  
  // Create a sphere for the top
  const top = sphere(3).translate([0, 0, 10]);
  
  // Create cylindrical holes
  const hole1 = cylinder(20, 1).translate([3, 3, -5]);
  const hole2 = cylinder(20, 1).translate([-3, 3, -5]);
  const hole3 = cylinder(20, 1).translate([3, -3, -5]);
  const hole4 = cylinder(20, 1).translate([-3, -3, -5]);
  
  // Combine everything using operations
  const model = difference(
    union(base, top),
    hole1, hole2, hole3, hole4
  );
  
  // Serialize to OpenSCAD code
  return model.serialize();
};

// Generate the OpenSCAD code
const scadCode = createModel();

// Save the result to a file
fs.writeFileSync('model.scad', scadCode);
```

### Hollowed Cube (Simple Version)

A cube with a spherical cavity, created using a single sphere subtraction:

```typescript
import { cube, sphere, difference } from 'scad-js';
import * as fs from 'fs';

// Create a hollowed cube model using a simple sphere subtraction
const createHollowedCubeSimple = (): string => {
  // Size parameters
  const cubeSize = 20;
  const sphereRadius = 16; // Bigger than half the cube size to create large holes
  
  // Create the main cube
  const mainCube = cube(cubeSize);
  
  // Create the sphere
  const innerSphere = sphere(sphereRadius);
  
  // Combine using difference operation to cut out the sphere from the cube
  const model = difference(mainCube, innerSphere)
    .translate([-cubeSize/2, -cubeSize/2, -cubeSize/2]); // Center the model
  
  // Set color to yellow/gold
  const coloredModel = (model as any).color([1, 0.8, 0]);
  
  // Serialize to OpenSCAD code
  return coloredModel.serialize();
};

// Generate the OpenSCAD code
const scadCode = createHollowedCubeSimple();
fs.writeFileSync('hollowed-cube-simple.scad', scadCode);
```

### Hollowed Cube (Advanced Version)

A cube with circular holes on each face, created by removing six cylinders:

```typescript
import { cube, cylinder, difference } from 'scad-js';
import * as fs from 'fs';

// Create a hollowed cube model with circular holes on each face
const createHollowedCube = (): string => {
  // Size parameters
  const cubeSize = 20;
  const holeRadius = 7;
  const holeDepth = cubeSize / 2 + 1; // Make sure holes go through the cube
  
  // Create the main cube
  const mainCube = cube(cubeSize);
  
  // Create holes for each face
  // X-axis holes
  const holeX1 = (cylinder(holeDepth, holeRadius) as any)
    .rotate(90, [0, 1, 0]) // Rotate around Y axis
    .translate([-holeDepth/2, 0, 0]);
  
  const holeX2 = (cylinder(holeDepth, holeRadius) as any)
    .rotate(90, [0, 1, 0]) // Rotate around Y axis
    .translate([cubeSize-holeDepth/2, 0, 0]);
  
  // Y-axis holes
  const holeY1 = (cylinder(holeDepth, holeRadius) as any)
    .rotate(90, [1, 0, 0]) // Rotate around X axis
    .translate([0, -holeDepth/2, 0]);
  
  const holeY2 = (cylinder(holeDepth, holeRadius) as any)
    .rotate(90, [1, 0, 0]) // Rotate around X axis
    .translate([0, cubeSize-holeDepth/2, 0]);
  
  // Z-axis holes
  const holeZ1 = cylinder(holeDepth, holeRadius)
    .translate([0, 0, -holeDepth/2]);
  
  const holeZ2 = cylinder(holeDepth, holeRadius)
    .translate([0, 0, cubeSize-holeDepth/2]);
  
  // Combine everything using difference operation to cut out the holes
  const model = difference(
    mainCube,
    holeX1, holeX2,
    holeY1, holeY2,
    holeZ1, holeZ2
  )
  .translate([-cubeSize/2, -cubeSize/2, -cubeSize/2]); // Center the model
  
  // Set color to yellow/gold
  const coloredModel = (model as any).color([1, 0.8, 0]);
  
  // Serialize to OpenSCAD code
  return coloredModel.serialize();
};

// Generate the OpenSCAD code
const scadCode = createHollowedCube();
fs.writeFileSync('hollowed-cube.scad', scadCode);
```

### Gear Example

A more complex example showing how to create a gear with teeth and mounting holes:

```typescript
import { cube, cylinder, union, difference, rotate, translate } from 'scad-js';
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
  const teethArray = [];
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
writeFileSync('gear.scad', scadData);
```

### Running Examples

To run any of these examples:

```bash
bun run ./your-example.ts
```

This will generate an OpenSCAD file that you can open and render in OpenSCAD.

## Acknowledgements

This project was inspired by many other projects: [farrellm/scad-clj](https://github.com/farrellm/scad-clj), [OpenJSCAD.org](https://openjscad.org/), [tasn/scadjs](https://github.com/tasn/scadjs) and more... And of course it would not even exist without [OpenSCAD](https://www.openscad.org) itself.

## License

This project is open source and available under the [MIT License](LICENSE).
