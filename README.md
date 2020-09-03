# scad-js
> **scad-js** transpile your Javascript to **OpenSCAD** letting you create programmatic 3d solid models with the familiar javascript syntax.

**OpenSCAD** is an amazing software for creating solid 3D CAD objects, but modeling with the **OpenSCAD** language can be really cumbersome and limited.

**scad-js** overcomes these limitations with the power of Javascript.

## Getting started
First make sure you have **OpenSCAD** installed on your system, we will use it to visualize the model.

create a new file and copy the following sample to see how it works:


## Objects
The following will create a new primitive object with the specified parameters.

### Circle
**Arguments**
*r (Number)*: the radius of the circle (default: r = 1)
**Returns**
A circle object at the origin.
**Examples**
```
R.circle();
R.circle(10);
```

### Square
**Arguments**
*size (Array)*: two elements vector array: [x,y]  (default: size = [1, 1])
**Returns**
A rectangle object with dimensions of x and y at the origin.
**Examples**
```
R.square();
R.square([5, 10]);
```

### Sphere
**Arguments**
*r (Number)*: the radius of the sphere (default: r = 1)
**Returns**
A sphere object at the origin.
**Examples**
```
R.sphere();
R.sphere(10);
```

### Cube
**Arguments**
*size (Array)*: three elements vector array: [x, y, z]  (default: size = [1, 1, 1])
**Returns**
A cube object with dimensions of x, y and z at the origin.
**Examples**
```
R.cube();
R.cube([2, 4, 10]);
```

### Cylinder(Number, Number)
**Arguments**
*h(Number)*: the height of the cylinder (default: h = 1)
*r(Number)*: the radius of the cylinder (default: r = 1)
**Returns**
A cylinder object with height of h and the specified radius.
**Examples**
```
R.cylinder();
R.cube(6);
R.cube(10, 3);
```

### Cylinder(Number, Array)
**Arguments**
*h(Number)*: the height of the cylinder (default: r = 1)
*r(Array)*: twe elements vectory array specifing top and bottom radii: [r1, r2]
**Returns**
A cylinder object with height of h and the specified top and bottom radii.
**Examples**
```
R.cylinder();
R.cube(6);
R.cube(10, [4, 8]);
```

## Transformations
Transformations are functions that apply on existing objects and returns a new modified object, transformations can be applied on all objects (not only premitives) and can be chained together.

### translate
**Arguments**
*v (Array)*: Number type three elements vector array: [x, y, z]
**Returns**
A new object translated (moved) with the specified values.
**Examples**
```
R.cylinder().translate([1, 2, 5]);
```

### scale
**Arguments**
*v (Array)*: Number type three elements vector array: [x, y, z]
**Returns**
A new object scaled relatively with the specified values.
**Examples**
```
R.cube().scale([1, 0.5, 2]);
```

### resize
**Arguments**
*v (Array)*: Number type three elements vector array: [x, y, z]
**Returns**
A new object sized with the specified values.
**Examples**
```
R.cube([2, 4, 10]).resize([4, 8, 10]);
```

### mirror
**Arguments**
*v (Array)*: Number type three elements vector array: [x, y, z]
**Returns**
A new object mirrored on a plane through the origin on each axis that value isn't equal to 0 (act as boolean).
**Examples**
```
R.sphere().mirror([1, 0, 0]);
R.cylinder().mirror([0, 1, 1]);
```

### color
**Arguments**
*c (String)*: color name or hexvalue.
*alpha(Number)*: Number between 0 and 1.0 (default: 1.0)
**Returns**
A new object with the specified color.
**Examples**
```
R.square().color("darkblue");
R.square().color("#FF5733");
```

### rotate(v)
**Arguments**
*v(Array)*: array with 3 Number type elements with degree of rotation.
**Returns**
A new object with the specified rotations
**Examples**
```
R.cube().rotate([45, 90, 0]);
```

### rotate(a, v)
**Arguments**
*a(Number)*: a rotation factor that will multiply all axes.
*v(Array)*: three elements vertor array  will be [a * vx, a * vy, a * vz]
**Returns**
A new object with the specified rotations.
**Examples**
```
R.cylinder().rotate(45, [1, 0, 2]);
```

### radius_offset
**Arguments**
*r (Number)*: the value of the radius offset.
**Returns**
A new object with the specified radius offset.
**Examples**
```
R.square().radius_offset(8);
```

### delta_offset
**Arguments**
*r (Number)*: the value of the radius offset.
*chamfer (Boolean)*: this flag defines if edges should be chamfered (cut off with a straight line) or not (extended to their intersection).
**Returns**
A new object with the specified delta offset.
**Examples**
```
R.square().delta_offset(8);
R.square().delta_offset(8, true);
```

### projection
**Arguments**
*cut  (boolean)*: when true points above and below the plane are considered as well (creating a proper projection) (default: false)
**Returns**
A new 2D object representing the projection of the base object
**Examples**
```
R.cube().projection();
R.cube().projection(true);
```

### linear_extrude
**Arguments**
*height  (Number)*: 
*center (Boolean)*:
*convexity (Number)*:
*twist (Number)*:
*slices (Number)*:
*scale (Number/Array) :
**Returns**
A new 2D object representing the projection of the base object
**Examples**
```
R.circle().linear_extrude(10);
R.circle().linear_extrude(10, false);
R.circle().linear_extrude(10, true, 10);
R.circle().linear_extrude(10, true, 10, 360);
```

## Operations

### union
return all argument objects as a signle object.

### difference
returns a new object which is the subtraction of the second argument object and all the rest argumnet objects from the first argument object.

### interserction
returns a new object which is only the overlapping parts of all argument objects, only the area which is shared by all argument objects is retained.

### hull
returns the convex hull of all arguments objects

### minkowski
returns the minkowski sum of all arguments objects
