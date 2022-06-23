const { ribbons } = require('../../../src/misc/june2022/ribbons');

describe('misc.june2022.ribbons', () => {
  // it('should return 4', () => {
  //   const numOfRibbons = ribbons.naive([5, 2, 7, 4, 9], 5);
  //   expect(numOfRibbons).toEqual(4);
  // });

  it('should return 2', () => {
    const numOfRibbons = ribbons.naive([1, 2, 3, 4, 9], 6);
    expect(numOfRibbons).toEqual(2);
  });

  // it('should return 5', () => {
  //   const numOfRibbons = ribbons.naive([1, 2, 5, 7, 15], 5);
  //   expect(numOfRibbons).toEqual(5);
  // });
});
