import assert from "node:assert";
import { describe, it } from "node:test";

import {
  arc,
  circle,
  cone,
  cube,
  cylinder,
  pill,
  polygon,
  polyhedron,
  rounded_cube,
  rounded_square,
  sphere,
  square,
  triangle,
} from "../src/index.js";
import {
  expectedArcDefault,
  expectedArcWithNegativeAngles,
  expectedArcWithPositiveAngles,
  expectedArcWithRadius,
  expectedArcWithSingleAngle,
} from "./fixtures.js";

describe("Circle", () => {
  it("should create circle with default radius", () => {
    assert.deepEqual(circle(), { type: "circle", params: { r: 1 } });
  });
  it("should create circle with defined radius", () => {
    assert.deepEqual(circle(16), { type: "circle", params: { r: 16 } });
  });
  it("should create circle with defined radius and optional params", () => {
    assert.deepEqual(circle(4, { $fn: 6 }), {
      type: "circle",
      params: { r: 4, $fn: 6 },
    });
    assert.deepEqual(circle(2, { $fn: 6, $fa: 5 }), {
      type: "circle",
      params: { r: 2, $fa: 5, $fn: 6 },
    });
    assert.deepEqual(circle(1, { $fn: 6, $fa: 5, $fs: 4 }), {
      type: "circle",
      params: { r: 1, $fa: 5, $fn: 6, $fs: 4 },
    });
  });
});

describe("Square", () => {
  it("should create a square with default size", () => {
    assert.deepEqual(square(), {
      type: "square",
      params: { size: [1, 1], center: true },
    });
  });
  it("should create a square with defined size", () => {
    assert.deepEqual(square(4), {
      type: "square",
      params: { size: 4, center: true },
    });
    assert.deepEqual(square([8, 3]), {
      type: "square",
      params: { size: [8, 3], center: true },
    });
  });
  it("should create a square with defined size and not centered", () => {
    assert.deepEqual(square(8, { center: false }), {
      type: "square",
      params: { size: 8, center: false },
    });
  });
});

describe("Arc", () => {
  it("should create an arc with default size", () => {
    assert.deepEqual(arc(), expectedArcDefault);
  });

  it("should create an arc with a given radius", () => {
    assert.deepEqual(arc(20), expectedArcWithRadius);
  });

  it("should create an arc with a single, centered angle", () => {
    assert.deepEqual(arc(undefined, 20), expectedArcWithSingleAngle);
  });

  it("should create an arc with a positive angles", () => {
    assert.deepEqual(arc(undefined, [0, 20]), expectedArcWithPositiveAngles);
  });

  it("should create an arc with a negative angles", () => {
    assert.deepEqual(arc(undefined, [320, 0]), expectedArcWithNegativeAngles);
  });

  it("should default to a point every 2 degrees", () => {
    const result = arc(undefined, 20);
    assert.equal(result.params.points.length, 12);
  });

  it("should create a fixed number of faces", () => {
    const result = arc(undefined, undefined, { $fn: 4 });
    assert.equal(result.params.points.length, 6);
  });

  it("should allow setting the polygon convexity", () => {
    const result = arc(undefined, undefined, { convexity: 2 });
    assert.equal(result.params.convexity, 2);
  });
});

describe("Triangle", () => {
  it("should create a triangle with default size", () => {
    assert.deepEqual(triangle(), {
      params: {
        convexity: 1,
        paths: "undef",
        points: [
          [-0.5, -0.5],
          [0.5, -0.5],
          [0, 0.5],
        ],
      },
      type: "polygon",
    });
  });

  it("should create a triangle with same width and height", () => {
    assert.deepEqual(triangle(5), {
      params: {
        convexity: 1,
        paths: "undef",
        points: [
          [-2.5, -2.5],
          [2.5, -2.5],
          [0, 2.5],
        ],
      },
      type: "polygon",
    });
  });

  it("should create a triangle with provided height and width", () => {
    assert.deepEqual(triangle([5, 3]), {
      params: {
        convexity: 1,
        paths: "undef",
        points: [
          [-2.5, -1.5],
          [2.5, -1.5],
          [0, 1.5],
        ],
      },
      type: "polygon",
    });
  });

  it("should create a triangle with provided convexity", () => {
    assert.deepEqual(triangle([5, 3], 0), {
      params: {
        convexity: 0,
        paths: "undef",
        points: [
          [-2.5, -1.5],
          [2.5, -1.5],
          [0, 1.5],
        ],
      },
      type: "polygon",
    });
  });
});

describe("Cone", () => {
  it("should create a cone with default size", () => {
    assert.deepEqual(cone(), {
      children: [
        {
          params: {
            convexity: 1,
            paths: "undef",
            points: [
              [0, -0.5],
              [0.5, -0.5],
              [0, 0.5],
            ],
          },
          type: "polygon",
        },
      ],
      params: {
        $fn: 10,
        angle: 360,
        convexity: 2,
      },
      type: "rotate_extrude",
    });
  });

  it("should create a cone with provided height and radius", () => {
    assert.deepEqual(cone(10, 20), {
      children: [
        {
          params: {
            convexity: 1,
            paths: "undef",
            points: [
              [0, -5],
              [10, -5],
              [0, 5],
            ],
          },
          type: "polygon",
        },
      ],
      params: {
        $fn: 10,
        angle: 360,
        convexity: 2,
      },
      type: "rotate_extrude",
    });

    it("should create a cone with provided convexity and params", () => {
      assert.deepEqual(cone(10, 20, { $fn: 25, convexity: 5 }), {
        children: [
          {
            params: {
              convexity: 5,
              paths: "undef",
              points: [
                [0, -5],
                [10, -5],
                [0, 5],
              ],
            },
            type: "polygon",
          },
        ],
        params: {
          $fn: 25,
          angle: 360,
          convexity: 2,
        },
        type: "rotate_extrude",
      });
    });
  });
});

describe("Rounded Square", () => {
  it("should create a rounded square with default size", () => {
    assert.deepEqual(rounded_square(), {
      type: "translate",
      params: { v: [-0.5, -0.5] },
      children: [
        {
          type: "hull",
          children: [
            {
              type: "translate",
              params: { v: [0.125, 0.125] },
              children: [{ type: "circle", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [0.875, 0.125] },
              children: [{ type: "circle", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [0.875, 0.875] },
              children: [{ type: "circle", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [0.125, 0.875] },
              children: [{ type: "circle", params: { r: 0.125 } }],
            },
          ],
        },
      ],
    });
  });
  it("should create a square with defined size", () => {
    assert.deepEqual(rounded_square(4), {
      type: "translate",
      params: { v: [-2, -2] },
      children: [
        {
          type: "hull",
          children: [
            {
              type: "translate",
              params: { v: [0.125, 0.125] },
              children: [{ type: "circle", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [3.875, 0.125] },
              children: [{ type: "circle", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [3.875, 3.875] },
              children: [{ type: "circle", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [0.125, 3.875] },
              children: [{ type: "circle", params: { r: 0.125 } }],
            },
          ],
        },
      ],
    });
    assert.deepEqual(rounded_square([8, 3]), {
      type: "translate",
      params: { v: [-4, -1.5] },
      children: [
        {
          type: "hull",
          children: [
            {
              type: "translate",
              params: { v: [0.125, 0.125] },
              children: [{ type: "circle", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [7.875, 0.125] },
              children: [{ type: "circle", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [7.875, 2.875] },
              children: [{ type: "circle", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [0.125, 2.875] },
              children: [{ type: "circle", params: { r: 0.125 } }],
            },
          ],
        },
      ],
    });
  });

  it("should create a square with defined size and not centered", () => {
    assert.deepEqual(rounded_square(8, { center: false }), {
      type: "translate",
      params: { v: [-4, -4] },
      children: [
        {
          type: "hull",
          children: [
            {
              type: "translate",
              params: { v: [0.5, 0.5] },
              children: [{ type: "circle", params: { r: 0.5 } }],
            },
            {
              type: "translate",
              params: { v: [7.5, 0.5] },
              children: [{ type: "circle", params: { r: 0.5 } }],
            },
            {
              type: "translate",
              params: { v: [7.5, 7.5] },
              children: [{ type: "circle", params: { r: 0.5 } }],
            },
            {
              type: "translate",
              params: { v: [0.5, 7.5] },
              children: [{ type: "circle", params: { r: 0.5 } }],
            },
          ],
        },
      ],
    });
  });
});

describe("Pill", () => {
  it("should create a pill with default size", () => {
    assert.deepEqual(pill(), {
      type: "circle",
      params: { r: 0.5 },
    });
  });

  const expectedpill = {
    type: "union",
    children: [
      { type: "square", params: { center: true, size: [4, 4] } },
      {
        type: "translate",
        children: [
          {
            params: {
              r: 2,
            },
            type: "circle",
          },
        ],
        params: {
          v: [2, 0, 0],
        },
      },
      {
        type: "translate",
        children: [
          {
            params: {
              r: 2,
            },
            type: "circle",
          },
        ],
        params: {
          v: [-2, 0, 0],
        },
      },
    ],
  };

  it("should create a circle if one size is provided", () => {
    assert.deepEqual(pill(8), {
      type: "circle",
      params: { r: 4 },
    });
  });

  it("should create a pill with in the x direction", () => {
    assert.deepEqual(pill([8, 4]), expectedpill);
  });

  it("should create a pill with in the y direction", () => {
    assert.deepEqual(pill([4, 8]), {
      type: "rotate",
      params: {
        a: 90,
        v: [0, 0, 1],
      },
      children: [expectedpill],
    });
  });
});

describe("Polygon", () => {
  it("should create a polygon with default values", () => {
    assert.deepEqual(polygon(), {
      type: "polygon",
      params: { points: "undef", paths: "undef", convexity: 1 },
    });
  });
  it("should create a polygon with defined points", () => {
    assert.deepEqual(
      polygon([
        [0, 0],
        [4, 5],
        [6, 8],
      ]),
      {
        type: "polygon",
        params: {
          points: [
            [0, 0],
            [4, 5],
            [6, 8],
          ],
          paths: "undef",
          convexity: 1,
        },
      },
    );
  });
  it("should create a polygon with defined points and paths", () => {
    assert.deepEqual(
      polygon(
        [
          [0, 0],
          [4, 5],
          [6, 8],
        ],
        [0, 2, 1, 2, 0],
      ),
      {
        type: "polygon",
        params: {
          points: [
            [0, 0],
            [4, 5],
            [6, 8],
          ],
          paths: [0, 2, 1, 2, 0],
          convexity: 1,
        },
      },
    );
  });
  it("should create a polygon with defined points and paths", () => {
    assert.deepEqual(
      polygon(
        [
          [0, 0],
          [4, 5],
          [6, 8],
        ],
        [0, 2, 1, 2, 0],
        4,
      ),
      {
        type: "polygon",
        params: {
          points: [
            [0, 0],
            [4, 5],
            [6, 8],
          ],
          paths: [0, 2, 1, 2, 0],
          convexity: 4,
        },
      },
    );
  });
});

describe("Sphere", () => {
  it("should create a sphere with default radius", () => {
    assert.deepEqual(sphere(), { type: "sphere", params: { r: 1 } });
  });
  it("should create a sphere with a defined radius", () => {
    assert.deepEqual(sphere(8), { type: "sphere", params: { r: 8 } });
    assert.deepEqual(sphere(8, { $fn: 4 }), {
      type: "sphere",
      params: { r: 8, $fn: 4 },
    });
  });
  it("should create a sphere with a defined radius", () => {
    assert.deepEqual(sphere(8, { $fn: 4 }), {
      type: "sphere",
      params: { r: 8, $fn: 4 },
    });
    assert.deepEqual(sphere(8, { $fn: 4, $fa: 10 }), {
      type: "sphere",
      params: { r: 8, $fa: 10, $fn: 4 },
    });
    assert.deepEqual(sphere(8, { $fn: 4, $fa: 10, $fs: 2 }), {
      type: "sphere",
      params: { r: 8, $fa: 10, $fn: 4, $fs: 2 },
    });
    assert.deepEqual(sphere(8, { $fn: 0, $fa: 0, $fs: 0 }), {
      type: "sphere",
      params: { r: 8, $fa: 0, $fn: 0, $fs: 0 },
    });
  });
});

describe("Cube", () => {
  it("should create a cube with default size", () => {
    assert.deepEqual(cube(), {
      type: "cube",
      params: { size: [1, 1, 1], center: true },
    });
  });
  it("should create a cube with defined size", () => {
    assert.deepEqual(cube(4), {
      type: "cube",
      params: { size: 4, center: true },
    });
    assert.deepEqual(cube([4, 5, 6]), {
      type: "cube",
      params: { size: [4, 5, 6], center: true },
    });
  });
  it("should create a cube with defined size not centered", () => {
    assert.deepEqual(cube(4, { center: false }), {
      type: "cube",
      params: { size: 4, center: false },
    });
  });
});

describe("Cylinder", () => {
  it("should create a cylinder with default size", () => {
    assert.deepEqual(cylinder(), {
      type: "cylinder",
      params: { r: 1, h: 1, center: true },
    });
  });
  it("should create a cylinder with defined size", () => {
    assert.deepEqual(cylinder(5, 4), {
      type: "cylinder",
      params: { h: 5, r: 4, center: true },
    });
    assert.deepEqual(cylinder(5, [3, 5]), {
      type: "cylinder",
      params: { h: 5, r1: 3, r2: 5, center: true },
    });
    assert.deepEqual(cylinder(5, [3, 5], { $fa: 4 }), {
      type: "cylinder",
      params: { h: 5, r1: 3, r2: 5, center: true, $fa: 4 },
    });
    assert.deepEqual(cylinder(5, [3, 5], { $fa: 3, $fn: 4, $fs: 5 }), {
      type: "cylinder",
      params: { h: 5, r1: 3, r2: 5, center: true, $fa: 3, $fn: 4, $fs: 5 },
    });
    assert.deepEqual(cylinder(5, [3, 5], { $fa: 0, $fn: 0, $fs: 0 }), {
      type: "cylinder",
      params: { h: 5, r1: 3, r2: 5, center: true, $fa: 0, $fn: 0, $fs: 0 },
    });
  });
  it("should create a cylinder with defined size and not centered", () => {
    assert.deepEqual(cylinder(5, 4, { center: false }), {
      type: "cylinder",
      params: { h: 5, r: 4, center: false },
    });
  });
});

describe("Polyhedron", () => {
  it("should create a polyhedron with default values", () => {
    assert.deepEqual(polyhedron(), {
      type: "polyhedron",
      params: { points: "undef", paths: "undef", convexity: 1 },
    });
  });
  it("should create a polyhedron with defined points", () => {
    assert.deepEqual(
      polyhedron([
        [0, 0, 0],
        [4, 5, 6],
        [6, 8, 7],
      ]),
      {
        type: "polyhedron",
        params: {
          points: [
            [0, 0, 0],
            [4, 5, 6],
            [6, 8, 7],
          ],
          paths: "undef",
          convexity: 1,
        },
      },
    );
  });
  it("should create a polyhedron with defined points and paths", () => {
    assert.deepEqual(
      polyhedron(
        [
          [0, 0, 0],
          [4, 5, 6],
          [6, 8, 7],
        ],
        [0, 2, 1, 2, 0],
      ),
      {
        type: "polyhedron",
        params: {
          points: [
            [0, 0, 0],
            [4, 5, 6],
            [6, 8, 7],
          ],
          paths: [0, 2, 1, 2, 0],
          convexity: 1,
        },
      },
    );
  });
  it("should create a polyhedron with defined points and paths", () => {
    assert.deepEqual(
      polyhedron(
        [
          [0, 0, 0],
          [4, 5, 0],
          [6, 8, 0],
        ],
        [0, 2, 1, 2, 0],
        4,
      ),
      {
        type: "polyhedron",
        params: {
          points: [
            [0, 0, 0],
            [4, 5, 0],
            [6, 8, 0],
          ],
          paths: [0, 2, 1, 2, 0],
          convexity: 4,
        },
      },
    );
  });
});

describe("Rounded Cube", () => {
  it("should create a cube with default size", () => {
    assert.deepEqual(rounded_cube(), {
      type: "translate",
      params: { v: [-0.5, -0.5, -0.5] },
      children: [
        {
          type: "hull",
          children: [
            {
              type: "translate",
              params: { v: [0.125, 0.125, 0.125] },
              children: [{ type: "sphere", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [0.875, 0.125, 0.125] },
              children: [{ type: "sphere", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [0.875, 0.875, 0.125] },
              children: [{ type: "sphere", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [0.125, 0.875, 0.125] },
              children: [{ type: "sphere", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [0.125, 0.125, 0.875] },
              children: [{ type: "sphere", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [0.875, 0.125, 0.875] },
              children: [{ type: "sphere", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [0.875, 0.875, 0.875] },
              children: [{ type: "sphere", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [0.125, 0.875, 0.875] },
              children: [{ type: "sphere", params: { r: 0.125 } }],
            },
          ],
        },
      ],
    });
  });
  it("should create a cube with defined size", () => {
    assert.deepEqual(rounded_cube(4), {
      type: "translate",
      params: { v: [-2, -2, -2] },
      children: [
        {
          type: "hull",
          children: [
            {
              type: "translate",
              params: { v: [0.125, 0.125, 0.125] },
              children: [{ type: "sphere", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [3.875, 0.125, 0.125] },
              children: [{ type: "sphere", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [3.875, 3.875, 0.125] },
              children: [{ type: "sphere", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [0.125, 3.875, 0.125] },
              children: [{ type: "sphere", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [0.125, 0.125, 3.875] },
              children: [{ type: "sphere", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [3.875, 0.125, 3.875] },
              children: [{ type: "sphere", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [3.875, 3.875, 3.875] },
              children: [{ type: "sphere", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [0.125, 3.875, 3.875] },
              children: [{ type: "sphere", params: { r: 0.125 } }],
            },
          ],
        },
      ],
    });
    assert.deepEqual(rounded_cube([4, 5, 6]), {
      type: "translate",
      params: { v: [-2, -2.5, -3] },
      children: [
        {
          type: "hull",
          children: [
            {
              type: "translate",
              params: { v: [0.125, 0.125, 0.125] },
              children: [{ type: "sphere", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [3.875, 0.125, 0.125] },
              children: [{ type: "sphere", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [3.875, 4.875, 0.125] },
              children: [{ type: "sphere", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [0.125, 4.875, 0.125] },
              children: [{ type: "sphere", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [0.125, 0.125, 5.875] },
              children: [{ type: "sphere", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [3.875, 0.125, 5.875] },
              children: [{ type: "sphere", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [3.875, 4.875, 5.875] },
              children: [{ type: "sphere", params: { r: 0.125 } }],
            },
            {
              type: "translate",
              params: { v: [0.125, 4.875, 5.875] },
              children: [{ type: "sphere", params: { r: 0.125 } }],
            },
          ],
        },
      ],
    });
  });
  it("should create a cube with defined size not centered", () => {
    assert.deepEqual(rounded_cube(4, { center: false }), {
      type: "translate",
      params: { v: [-2, -2, -2] },
      children: [
        {
          type: "hull",
          children: [
            {
              type: "translate",
              params: { v: [0.25, 0.25, 0.25] },
              children: [{ type: "sphere", params: { r: 0.25 } }],
            },
            {
              type: "translate",
              params: { v: [3.75, 0.25, 0.25] },
              children: [{ type: "sphere", params: { r: 0.25 } }],
            },
            {
              type: "translate",
              params: { v: [3.75, 3.75, 0.25] },
              children: [{ type: "sphere", params: { r: 0.25 } }],
            },
            {
              type: "translate",
              params: { v: [0.25, 3.75, 0.25] },
              children: [{ type: "sphere", params: { r: 0.25 } }],
            },
            {
              type: "translate",
              params: { v: [0.25, 0.25, 3.75] },
              children: [{ type: "sphere", params: { r: 0.25 } }],
            },
            {
              type: "translate",
              params: { v: [3.75, 0.25, 3.75] },
              children: [{ type: "sphere", params: { r: 0.25 } }],
            },
            {
              type: "translate",
              params: { v: [3.75, 3.75, 3.75] },
              children: [{ type: "sphere", params: { r: 0.25 } }],
            },
            {
              type: "translate",
              params: { v: [0.25, 3.75, 3.75] },
              children: [{ type: "sphere", params: { r: 0.25 } }],
            },
          ],
        },
      ],
    });
  });
});
