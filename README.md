<h1 align="center">
  <img src="https://i.imgur.com/IiI57LR.png" alt="scad-js" height="128"> SCAD-JS
</h1>

> **scad-js** transpile your TypeScript to **OpenSCAD** letting you create programmatic 3D solid models with the familiar TypeScript/JavaScript syntax.

<p align="center">
  <a href="https://www.npmjs.com/package/scad-js">
    <img alt="Latest release" src="https://img.shields.io/npm/v/scad-js?style=for-the-badge">
    <img alt="Codecov coverage" src="https://img.shields.io/codecov/c/github/scad-js/scad-js?style=for-the-badge">
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
git clone https://github.com/scad-js/scad-js-starter.git my-scad-js-project
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

// Or render directly to STL (requires openscad-wasm)
const stlData = await model.render();
fs.writeFileSync('model.stl', stlData);
```

Then run:

```bash
bun run your-model.ts
```

This will generate an OpenSCAD file that you can open and render, or directly generate an STL file.

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


### Parametric Tower Generator (Advanced)

This example showcases the true power of JavaScript for generative 3D modeling by creating complex architectural structures:

```typescript
import { cube, cylinder, sphere, union, difference, hull, type ScadObject } from 'scad-js';
import { writeFileSync } from 'fs';

// Tower configuration - easily customizable parameters
interface TowerConfig {
  floors: number;
  floorHeight: number;
  baseWidth: number;
  topWidth: number;
  windowsPerFloor: number;
  curveIntensity: number; // Creates organic curves
  balconyEveryNFloors: number;
}

const config: TowerConfig = {
  floors: 12,
  floorHeight: 4,
  baseWidth: 20,
  topWidth: 12,
  windowsPerFloor: 8,
  curveIntensity: 0.3,
  balconyEveryNFloors: 3
};

// Mathematical curve calculation for organic shapes
function calculateFloorWidth(floorIndex: number, totalFloors: number, baseWidth: number, topWidth: number, curveIntensity: number): number {
  const linearRatio = floorIndex / (totalFloors - 1);
  const curveOffset = Math.sin(linearRatio * Math.PI) * curveIntensity * (baseWidth - topWidth) * 0.3;
  const width = baseWidth + (topWidth - baseWidth) * linearRatio + curveOffset;
  return Math.max(width, topWidth * 0.8);
}

// Generate multiple tower variations from the same codebase
const towers = [
  { name: 'classic_tower', config: { ...config } },
  { name: 'curved_tower', config: { ...config, curveIntensity: 0.8, floors: 15 } },
  { name: 'modern_tower', config: { ...config, windowsPerFloor: 12, floors: 18 } }
];

// Generate all variations using JavaScript loops and math
towers.forEach(({ name, config }) => {
  const tower = generateParametricTower(config);
  writeFileSync(`${name}.scad`, tower.serialize({ $fn: 50 }));
});
```

**This example demonstrates:**
- 🔄 **Loops** for generating repetitive elements (floors, windows)
- 📐 **Mathematical calculations** for organic curves and precise positioning  
- 🎛️ **Conditional logic** for feature placement (balconies, decorative elements)
- 🧩 **Modular functions** for reusable components
- 📊 **Data structures** for managing complex geometry collections
- ⚙️ **Parameterization** for instant design variations
- 🎨 **Multiple outputs** from a single codebase

*This level of parametric modeling would be extremely difficult to achieve in pure OpenSCAD!*

### Functional Design Examples

**scad-js** excels at creating practical, real-world objects with complex engineering requirements:

#### 📱 Parametric Phone Stand

```typescript
// Customizable for any device size and viewing angle
const phoneStand = generatePhoneStand({
  phoneWidth: 75,
  standAngle: 60,          // Perfect viewing angle
  cableSlot: true,         // Charging cable management
  weightingHoles: true,    // Add coins for stability
  rubberGrips: true        // Non-slip base pads
});

// Generate multiple variations for different use cases
const variations = [
  { name: 'desk_work', angle: 45, depth: 60 },
  { name: 'video_calls', angle: 75, height: 70 },
  { name: 'bedside', angle: 55, compact: true }
];
```

#### 🖊️ Modular Pen Holder

```typescript
// Smart compartment arrangement with automatic layout
const penHolder = generatePenHolder({
  compartments: [
    { type: 'pen', quantity: 3 },
    { type: 'marker', quantity: 2 },
    { type: 'business_cards', quantity: 1 },
    { type: 'scissors', quantity: 1 }
  ],
  phoneSlot: true,         // Built-in phone stand
  drawerSlot: true,        // Hidden storage drawer
  cableManagement: true,   // Wire routing holes
  labelAreas: true         // Raised text areas
});
```

**Engineering features demonstrated:**
- 📐 **Precise angle calculations** for optimal viewing/ergonomics
- 🔧 **Engineering tolerances** for 3D printing requirements  
- 📱 **Multi-device compatibility** through parameterization
- 🎯 **Functional features** like cable management and stability
- 🏗️ **Modular design** with reusable components
- 📊 **Automatic layout algorithms** for optimal space usage

### Running Examples

To run any of these examples:

```bash
bun run ./examples/your-example.ts
```

This will generate OpenSCAD files that you can open and render in OpenSCAD, plus STL files ready for 3D printing.

## Acknowledgements

This project was inspired by many other projects: [farrellm/scad-clj](https://github.com/farrellm/scad-clj), [OpenJSCAD.org](https://openjscad.org/), [tasn/scadjs](https://github.com/tasn/scadjs) and more... And of course it would not even exist without [OpenSCAD](https://www.openscad.org) itself.

## License

This project is open source and available under the [MIT License](LICENSE).
