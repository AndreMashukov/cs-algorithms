const calcBannerSize = require('../../src/ruby/banner').default;

describe('Banners', () => {
  it('should calculate min banner for [3, 1, 4]', () => {
    expect(calcBannerSize([3, 1, 4])).toEqual(10);
  });

  it('should calculate min banner for [5, 3, 2, 4],', () => {
    expect(calcBannerSize([5, 3, 2, 4])).toEqual(17);
  });

  it('should calculate min banner for [5, 3, 5, 2, 1],', () => {
    expect(calcBannerSize([5, 3, 5, 2, 1])).toEqual(19);
  });

  it('should calculate min banner for [7, 7, 3, 7, 7],', () => {
    expect(calcBannerSize([7, 7, 3, 7, 7])).toEqual(35);
  });

  it('should calculate min banner for [1, 1, 7, 6, 6, 6],', () => {
    expect(calcBannerSize([1, 1, 7, 6, 6, 6])).toEqual(30);
  });
});
