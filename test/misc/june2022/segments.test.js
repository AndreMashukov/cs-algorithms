const { segments } = require('../../../src/misc/june2022/segments');

describe('misc.june2022.segments', () => {
  it('should return 3', () => {
    const SEGMENTS = [
      [-1, 3],
      [-5, -3],
      [3, 5],
      [2, 4],
      [-3, -2],
      [-1, 4],
      [5, 5]
    ];
    const minNumberOfPoints = segments.naive(SEGMENTS);
    expect(minNumberOfPoints).toEqual(3);
  });
});

// Let's say that the segment [l, r] contains the point x
// if the point is located inside the segment, i.e. l ≤ x ≤ r.
// Your task is to find the minimal number of points
// that can be placed somewhere on the number line,
// so that each segment contains at least one point.

// segments = [[-1, 3],  // 3
//             [-5, -3], // -3
//             [3, 5],   // 3, 5
//             [2, 4],   // 3
//             [-3, -2], // -3
//             [-1, 4],  // 3
//             [5, 5]]   // 5

// https://www.geeksforgeeks.org/minimum-number-of-integers-required-such-that-each-segment-contains-at-least-one-of-them/
