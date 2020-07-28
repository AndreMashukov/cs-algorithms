const findLand = require('../../src/floodFill/findLand').default;

describe('findLand', () => {
  it('should return array of lands', async () => {
    const array = [
      [1, 1, 0, 1, 0],
      [1, 1, 0, 1, 0],
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 1, 1, 1],
    ];

    expect(findLand(array)).toEqual( [
      ['0_0', '0_1', '1_1', '1_0', '2_1', '3_1'], // land 1
      ['0_3', '1_3'], // land 2
      ['4_2', '4_3', '4_4'], // land 3
    ]);
  });

  it('should return array of lands', async () => {
    const array = [
      [1, 1, 0, 0, 1],
      [1, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
    ];

    expect(findLand(array)).toEqual( [
      ['0_0', '0_1', '1_1', '1_0', '2_1', '3_1'], // land 1
      ['0_4'], // land 2
    ]);
  });
});
