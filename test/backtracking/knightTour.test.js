const KnightTour = require('../../src/backtracking/KnightTour').default;

describe('knightTour', () => {
  it('should return matrix with moves', async () => {
    const knightTour = new KnightTour(8);
    expect(knightTour.solve()).toStrictEqual([
      [0, 59, 38, 33, 30, 17, 8, 63],
      [37, 34, 31, 60, 9, 62, 29, 16],
      [58, 1, 36, 39, 32, 27, 18, 7],
      [35, 48, 41, 26, 61, 10, 15, 28],
      [42, 57, 2, 49, 40, 23, 6, 19],
      [47, 50, 45, 54, 25, 20, 11, 14],
      [56, 43, 52, 3, 22, 13, 24, 5],
      [51, 46, 55, 44, 53, 4, 21, 12],
    ]);
  });
});