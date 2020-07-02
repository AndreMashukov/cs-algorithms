const cc = require('../../src/lcs/commonChild');

describe('commonChild test suite', () => {
  it('HARRY and SALLY => AY of length 2', async () => {
    expect(
        cc.commonChild('HARRY', 'SALLY'))
        .toEqual(2);
  });

  it('SHINCHAN and SALLY => NHA of length 3', async () => {
    expect(
        cc.commonChild('SHINCHAN', 'NOHARAAA'))
        .toEqual(3);
  });
});
