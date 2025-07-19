import { cube, cylinder, difference, type ScadObject } from '../src';
import { writeFileSync } from 'fs'; 

// Create a hollowed cube model with circular holes on each face
const createHollowedCube = (): ScadObject => {
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
  
  return coloredModel;
};

// Generate the OpenSCAD code
const hollowedCube = createHollowedCube();
const scadData = hollowedCube.serialize();
const stlData = await hollowedCube.render();

writeFileSync('hollowed-cube.scad', scadData);
writeFileSync('hollowed-cube.stl', stlData);