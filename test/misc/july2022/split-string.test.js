const { splitString } = require('../../../src/misc/july2022/split-string');

describe('misc.july2022.split-string', () => {
  it('should return 5', () => {
    const result = splitString.solution('xzxzx');
    expect(result).toEqual(5);
  });
  it('should return 30', () => {
    const result = splitString.solution('xzxzxzxzxz');
    expect(result).toEqual(30);
  });
  it('should return 24', () => {
    const result = splitString.solution('xxxxxxxxxx');
    expect(result).toEqual(24);
  });
  it('should return 387', () => {
    const result = splitString.solution('gfgfgfgfgfgfgfgfgfgfgfgfgfgfgf');
    expect(result).toEqual(387);
  });
});
