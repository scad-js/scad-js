<h1 align="center">
  scad-js
</h1>

> **scad-js** transpile your Javascript to **OpenSCAD** letting you create programmatic 3d solid models with the familiar javascript syntax.

<p align="center">
  <a href="https://www.npmjs.com/package/@dotcore64/scad-js">
    <img alt="scad-js demo" src="https://i.imgur.com/ksWVuYO.gif">
    <img alt="Latest release" src="https://img.shields.io/npm/v/@dotcore64/scad-js?style=for-the-badge">
  </a>
</p>

**OpenSCAD** is an amazing software for creating solid 3D CAD objects, but modeling with the **OpenSCAD** language can be really cumbersome and limited.

**scad-js** overcomes these limitations with the power of Javascript.

## Getting started
First make sure you have [OpenSCAD](https://www.openscad.org/downloads.html) installed on your system, we will use it to visualize the model.

clone [scad-js-starter](https://github.com/20lives/scad-js-starter):

```bash
git clone https://github.com/20lives/scad-js-starter.git my-scad-js-project
cd my-scad-js-project
```

install dependencies and run develpment script:

```bash
yarn # or npm install
yarn dev # or npm run dev
```

Now open `index.js` in your favourite text editor and start tinkering.


## Objects

The following will create a new primitive object with the specified parameters.

## `circle(radius[, options])`

| Parameter | Type   | Default   | Description        |
|-----------|--------|-----------|--------------------|
| radius    | Number | 1         | The circle radius. |
| options   | Object | see below |                    |

### options

```javascript
{
  $fn: 0, \\ minimum angle (in degrees) of each fragment.
  $fa: 12, \\ minimum circumferential length of each fragment.
  $fs: 2, \\ fixed number of fragments in 360 degrees. Values of 3 or more override $fa and $fs.
}
```

**Returns**

A new circle object.

**Examples**

```javascript
circle();
circle(10);
circle(6, { $fn: 20 });
```

## `square(size)`

| Parameter | Type            | Default | Description                                                        |
|-----------|-----------------|---------|--------------------------------------------------------------------|
| size      | Array \| Number | [1, 1]  | size of the rectangle, as a single Number or as two elements array |

**Returns**

A new rectangle object.

**Examples**

```javascript
square();
square(6);
square([5, 10]);
```

## `sphere(radius[, options])`

| Parameter | Type   | Default   | Description        |
|-----------|--------|-----------|--------------------|
| radius    | Number | 1         | The sphere radius. |
| options   | Object | see below |                    |

### options

```javascript
{
  $fn: 0, \\ minimum angle (in degrees) of each fragment.
  $fa: 12, \\ minimum circumferential length of each fragment.
  $fs: 2, \\ fixed number of fragments in 360 degrees. Values of 3 or more override $fa and $fs.
}
```

**Returns**

A new sphere object.

**Examples**

```javascript
sphere();
sphere(10);
sphere(10, { $fs: 4 });
```

## `cube(size)`


| Parameter | Type            | Default ---| Description                                                          |
|-----------|-----------------|------------|----------------------------------------------------------------------|
| size      | Array \| Number | [1, 1, 1]  | size of the rectangle, as a single Number or as three elements array |

**Returns**

A cube object with the provided dimensions at the origin.

**Examples**

```javascript
cube();
cube(6);
cube([2, 4, 10]);
```

## `cylinder(height, radius[, options])`

| Parameter | Type            | Default   | Description                                                                                |
|-----------|-----------------|-----------|--------------------------------------------------------------------------------------------|
| height    | Number          | 1         | height of the cylinder (or cone)                                                           |
| radius    | Number \| Array | 1         | radius of top and bottom of the cylinder, as number or as two element array: [bottom, top] |
| options   | Object          | see below |                                                                                            |

### options

```javascript
{
  $fn: 0, \\ minimum angle (in degrees) of each fragment.
  $fa: 12, \\ minimum circumferential length of each fragment.
  $fs: 2, \\ fixed number of fragments in 360 degrees. Values of 3 or more override $fa and $fs.
}
```

**Returns**

A cylinder (or a cone) object with the provided dimensions.

**Examples**

```javascript
cube();
cube(6);
cube([2, 4, 10]);
```

## `polygon(point[, paths, convexity])`

| Parameter | Type   | Default | Description                                                                                                                          |
|-----------|--------|---------|--------------------------------------------------------------------------------------------------------------------------------------|
| points    | Array  | undef   | the list of points as an Array of two elements arrays [ [x1, y1], [x2, y2] ]                                                         |
| paths     | Array  | undef   | The order to traverse the points. Uses indices from 0 to n-1. May be in a different order and use all or part, of the points listed. |
| convexity | Number | 1       | Integer number of "inward" curves.                                                                                                   |


**Returns**

A 2D shape from a the list of points.

**Examples**

```javascript
polygon([0,0],[100,0],[130,50]);
polygon([0,0],[40,20],[80,10], [0, 1, 2]);
polygon([0,0],[5,10],[25,40], [2, 0, 1, 2, 3]);
polygon([0,0],[5,10],[25,40], [2, 0, 1, 2, 3], 2);
```

## Operations
Operations are the results of interactions between two or more objects, specified below:

## `union([obj1, obj2, ...obj])`

**Returns**

Returns all arguments objects as a unified single new object.

**Examples**

```javascript
union(cube(), sphere());
union(cube(4), cylinder(3, 4));
union(cube(4), cylinder(3, 4), sphere());
```

## `difference([obj1, obj2, ...obj])`

**Returns**

returns a new object which is the subtraction of the second argument object and all the rest argumnet objects from the first argument object.

**Examples**

```javascript
difference(cube(), sphere());
difference(cube(2), sphere(3, 4));
difference(cube(4), cylinder(3, 4), sphere());
```

## `intersection([obj1, obj2, ...obj])`

**Returns**

returns a new object which is only the overlapping parts of all argument objects, only the area which is shared by all argument objects is retained.

**Examples**

```javascript
intersection(cube(), sphere());
intersection(cube(2), sphere(3, 4));
intersection(cube(4), cylinder(3, 4), sphere());
```

## `intersection([obj1, obj2, ...obj])`

**Returns**

returns a new object which is only the overlapping parts of all argument objects, only the area which is shared by all argument objects is retained.

**Examples**

```javascript
intersection(cube(), sphere());
intersection(cube(2), sphere(3, 4));
intersection(cube(4), cylinder(3, 4), sphere());
```

## `hull([obj1, obj2, ...obj])`

**Returns**

returns the convex hull of all arguments objects.

**Examples**

```javascript
hull(cube(), sphere());
hull(cube(2), sphere(3, 4));
hull(cube(4), cylinder(3, 4), sphere());
```

## `minkowski([obj1, obj2, ...obj])`

**Returns**

returns the minkowski sum of all arguments objects

**Examples**

```javascript
minkowski(cube(), sphere());
minkowski(cube(2), sphere(3, 4));
minkowski(cube(4), cylinder(3, 4), sphere());
```

## Transformations

Transformations are functions that apply on existing objects and returns a new modified object, transformations can be applied on all objects (not only premitives) and can be chained together.

## `translate(vector)`

| Parameter | Type  | Default   | Description                            |
|-----------|-------|-----------|----------------------------------------|
| vector    | Array | [0, 0, 0] | vector as a 3 elements array [x, y, z] |

**Returns**

A new object translated (moved) with the specified x, y, z values.

**Examples**

```javascript
object.translate([1, 2, 5]);
```

## `scale(vector)`

| Parameter | Type  | Default   | Description                            |
|-----------|-------|-----------|----------------------------------------|
| vector    | Array | [0, 0, 0] | vector as a 3 elements array [x, y, z] |

**Returns**

A new object scaled relatively with the specified x,y,z values.

**Examples**

```javascript
object.scale([1, 2, 5]);
```

## `resize(vector[, auto])`

| Parameter | Type    | Default   | Description                            |
|-----------|---------|-----------|----------------------------------------|
| vector    | Array   | [0, 0, 0] | vector as a 3 elements array [x, y, z] |
| auto      | Boolean | false     | auto-scales any 0-dimensions to match  |

**Returns**

A new object ith the specified x,y,z values as his size.

**Examples**

```javascript
object.resize([1, 2, 0]);
```

## `mirror(vector)`

| Parameter | Type    | Default   | Description                            |
|-----------|---------|-----------|----------------------------------------|
| vector    | Array   | [0, 0, 0] | vector as a 3 elements array [x, y, z] |

**Returns**

A new object mirrored on a plane through the origin on each axis that value isn't equal to 0 (act as boolean)

**Examples**

```javascript
object.mirror([1, 0, 0]);
```

## `color(color[, alpha])`

| Parameter | Type    | Default   | Description                            |
|-----------|---------|-----------|----------------------------------------|
| color     | String  |           | color name or hex value string         |
| alpha     | Number  |           | Alpha value between 0 to 1             |

**Returns**

A new object with the specified color.

**Examples**

```javascript
object.color('LightSkyBlue');
object.color('HotPink', 0.6);
object.color('#ff69b4');
```

## `rotate(vector)` | `rotate(factor, vector)`

| Parameter | Type    | Default   | Description                                              |
|-----------|---------|-----------|----------------------------------------------------------|
| vector    | Array   | [0, 0, 0] | vector as a 3 elements array [x, y, z]                   |
| factor    | Number  | 1         | if provided each element will be multiplide by the factor|

**Returns**

A new object rotated by the specified vector.

**Examples**

```javascript
object.rotate([45, 90, 0]);
object.rotate(45, [1, 0, 2]);
```

## `radius_offset(radius)`

| Parameter | Type   | Default   | Description                                                                         |
|-----------|--------|-----------|-------------------------------------------------------------------------------------|
| radius    | Number | 0         | the value to radius offset the polygon. When negative, the polygon is offset inward |

**Returns**

a new polygon with an offset as the specified radius.

**Examples**

```javascript
polygon.radius_offset(4);
polygon.radius_offset(-1);
```

## `delta_offset(delta[, chamfer])`

| Parameter | Type    | Default   | Description                                                                                                 |
|-----------|---------|-----------|-------------------------------------------------------------------------------------------------------------|
| delta     | Number  | 0         | the value to offset the polygon. When negative, the polygon is offset inward                                |
| chamfer   | Boolean | false     | defines if edges should be chamfered (cut off with a straight line) or not (extended to their intersection) |

**Returns**

a new polygon with an offset as the specified radius.

**Examples**

```javascript
polygon.delta_offset(4);
polygon.delta_offset(-2);
polygon.deltas_offset(5, true);
```

## `projection([cut])`

| Parameter | Type    | Default   | Description                                                       |
|-----------|---------|-----------|-------------------------------------------------------------------|
| cut       | Boolean | false     | when true points above and below the plane are considered as well |

**Returns**

a new polygon projected representing the base of the object.

**Examples**

```javascript
object.projection();
object.projection(true);
```

## `linear_extrude(height[, center, convexity, twist, slices, scale])`

| Parameter | Type            | Default | Description                                                                                                                     |
|-----------|-----------------|---------|---------------------------------------------------------------------------------------------------------------------------------|
| height    | Number          | 0       | extrusion                                                                                                                       |
| center    | boolean         | false   |  is false the linear extrusion Z range is from 0 to height; if it is true, the range is from -height/2 to height/2. |
| convexity | Number          |         |                                                                                                                                 |
| twist     | Number          |         | Number of degrees of through which the shape is extruded. twist = 360 extrudes through one revolution.                          |
| slices    | Number          | undef   | defines the number of intermediate points along the Z axis of the extrusion                                                     |
| scale     | Array \| Number | 1       | Scales the 2D shape by this value over the height of the extrusion. Scale can be a scalar or a vector:                          |

**Returns**

a new object extruded from the polygon.

**Examples**

```javascript
polygon.linear_extrude(10);
polygon.linear_extrude(5, true);
polygon.linear_extrude(10, true, 10);
```

## `rotate_extrude([convexity, angle])`

| Parameter | Type   | Default | Description                                                      |
|-----------|--------|---------|------------------------------------------------------------------|
| angle     | Number | 360     | the number of degrees to sweep, starting at the positive X axis. |
| convexity | Number |         |                                                                  |

**Returns**

a new object extruded from rotating the polygon aronud Z-axis.

**Examples**

```javascript
polygon.rotate_extrude();
polygon.rotate_extrude(270);
polygon.rotate_extrude(360, true);
```

## Modifiers

Modifier are used to change the appearance of objects, they are mostly used while debugging to include, exclude or highlight certain objects.

## `disable()`
Disable will ignore the object applied to, just like commenting it out.

```
object.disable();
```

## `show_only()`
show_only (Root) will ignore all objects execpt the object applied to.

```
object.show_only();
```

## `debug()`
Debug will change the color of the applied object to transparent pink but will not effect the model rendering.

```
object.debug();
```

## `background()`
Disable will ignore the object applied to when rendering, but will draw it as transparent gray

```
object.background();
```
